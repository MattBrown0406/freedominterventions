import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { escapeHtml, sendResendEmail, sendSystemEmail } from "../_shared/resend.ts";
import { isServiceRoleRequest, unauthorized } from "../_shared/auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Server-to-server only. Every customer/booking detail is loaded from the bookings
// row; the request body only identifies the booking.
interface BookingConfirmationRequest {
  bookingId: string;
  isReschedule?: boolean;
}

const PACIFIC_TZ = "America/Los_Angeles";
const OWNER_ALERT_EMAIL = "matt@freedominterventions.com";
// Set by square-booking / contracts when a paid booking landed in a taken or past slot.
// Kept when the Zoom details are written (a reschedule moves it to a valid slot, so drops it).
const SLOT_CONFLICT_MARKER = "⚠️ SLOT CONFLICT – needs reschedule";

// Bookings store Pacific wall-clock date ("YYYY-MM-DD") and time ("HH:MM[:SS]").
function formatPacificDate(date: string): string {
  // Noon UTC on that calendar date, formatted in UTC, so the weekday/day never shifts.
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatPacificTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m || 0).padStart(2, "0")} ${ampm}`;
}

async function getZoomAccessToken(): Promise<string> {
  const accountId = Deno.env.get("ZOOM_ACCOUNT_ID");
  const clientId = Deno.env.get("ZOOM_CLIENT_ID");
  const clientSecret = Deno.env.get("ZOOM_CLIENT_SECRET");

  console.log("Zoom credentials check:", {
    hasAccountId: !!accountId,
    hasClientId: !!clientId,
    hasClientSecret: !!clientSecret,
    accountIdLength: accountId?.length || 0,
    clientIdLength: clientId?.length || 0,
  });

  if (!accountId || !clientId || !clientSecret) {
    throw new Error("Zoom credentials not configured - missing one or more: ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET");
  }

  const credentials = btoa(`${clientId}:${clientSecret}`);
  
  const tokenUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`;
  console.log("Requesting Zoom token from:", tokenUrl.replace(accountId, "REDACTED"));
  
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const responseText = await response.text();
  console.log("Zoom token response status:", response.status);
  
  if (!response.ok) {
    console.error("Zoom token error response:", responseText);
    throw new Error(`Failed to get Zoom access token: ${response.status} - ${responseText}`);
  }

  try {
    const data = JSON.parse(responseText);
    console.log("Zoom token received, expires in:", data.expires_in, "seconds");
    return data.access_token;
  } catch (e) {
    console.error("Failed to parse Zoom token response:", responseText);
    throw new Error("Invalid response from Zoom OAuth");
  }
}

async function createZoomMeeting(
  accessToken: string,
  topic: string,
  startTime: string,
  duration: number
): Promise<{ joinUrl: string; meetingId: string }> {
  const response = await fetch("https://api.zoom.us/v2/users/me/meetings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic,
      type: 2,
      // Local wall-clock time (no "Z"), interpreted by Zoom in the given timezone.
      start_time: startTime,
      duration,
      timezone: PACIFIC_TZ,
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        mute_upon_entry: true,
        waiting_room: true,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Zoom meeting creation error:", errorText);
    throw new Error(`Failed to create Zoom meeting: ${response.status}`);
  }

  const data = await response.json();
  return {
    joinUrl: data.join_url,
    meetingId: data.id.toString(),
  };
}

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  opts: { from?: string; replyTo?: string } = {}
): Promise<void> {
  console.log("Sending booking email via Resend to:", to);
  await sendResendEmail({
    to,
    subject,
    html,
    from: opts.from,
    replyTo: opts.replyTo || "matt@freedominterventions.com",
  });
  console.log("Booking email sent successfully via Resend");
}

// Map booking type → display label, duration and email "Type" line.
// Mirrors the offers in src/components/BookingCalendar.tsx (OFFERS) and
// square-booking BOOKING_FEES_CENTS / BOOKING_DURATION_MINUTES.
function getBookingMeta(bookingType: string): { label: string; defaultDuration: number; emailNoun: string; typeLine: string; known: boolean } {
  switch (bookingType) {
    case 'consultation':
      return { label: 'Free Consultation', defaultDuration: 15, emailNoun: 'Consultation', typeLine: 'Free Consultation (15 minutes)', known: true };
    case 'crisis-coaching':
    case 'coaching': // legacy fallback
      return { label: 'Crisis Coaching Session', defaultDuration: 60, emailNoun: 'Crisis Coaching Session', typeLine: 'Crisis Coaching Session (60 minutes - $150)', known: true };
    case 'readiness-intensive':
      return { label: 'Family Readiness Intensive', defaultDuration: 90, emailNoun: 'Family Readiness Intensive', typeLine: 'Family Readiness Intensive (90 minutes - $2,500)', known: true };
    case 'aftercare-planning':
      return { label: 'Aftercare Planning Call', defaultDuration: 30, emailNoun: 'Aftercare Planning Call', typeLine: 'Aftercare Planning Call (30 minutes - free)', known: true };
    default:
      return { label: 'Appointment', defaultDuration: 60, emailNoun: 'Appointment', typeLine: 'Appointment', known: false };
  }
}

async function deleteZoomMeeting(accessToken: string, meetingId: string): Promise<void> {
  try {
    const res = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log("Deleted previous Zoom meeting", meetingId, "status:", res.status);
  } catch (e) {
    console.error("Failed to delete previous Zoom meeting:", e);
  }
}

type ConfirmationAlertContext = {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  bookingType: string;
  bookingDate: string;
  bookingTime: string;
  isReschedule: boolean;
};

// Best-effort owner alert when this run claimed a confirmed booking but the customer never
// got their Zoom link. Never throws.
async function alertOwnerConfirmationFailed(ctx: ConfirmationAlertContext, error: unknown): Promise<void> {
  try {
    const errorMessage = error instanceof Error ? error.message : String(error);
    await sendSystemEmail({
      to: OWNER_ALERT_EMAIL,
      subject: `Booking confirmation failed — send Zoom link manually - ${ctx.customerName.replace(/[\r\n]+/g, " ")}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #b91c1c;">Booking confirmation failed — send Zoom link manually</h1>
          <p>The booking is confirmed, but the ${ctx.isReschedule ? "reschedule " : ""}confirmation (Zoom meeting + customer email) could not be sent.${ctx.isReschedule ? " The booking still has the Zoom link for the previous time." : ""}</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Booking ID:</strong> ${escapeHtml(ctx.bookingId)}</p>
            <p><strong>Client Name:</strong> ${escapeHtml(ctx.customerName)}</p>
            <p><strong>Client Email:</strong> ${escapeHtml(ctx.customerEmail)}</p>
            <p><strong>Type:</strong> ${escapeHtml(ctx.bookingType)}</p>
            <p><strong>Date:</strong> ${escapeHtml(ctx.bookingDate)}</p>
            <p><strong>Time:</strong> ${escapeHtml(ctx.bookingTime)} (Pacific Time)</p>
          </div>
          <p><strong>Error:</strong> ${escapeHtml(errorMessage)}</p>
        </div>
      `,
    });
  } catch (alertError) {
    console.error("Failed to send confirmation-failure alert:", alertError);
  }
}

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only our own Edge Functions (service-role bearer) may trigger confirmations.
  if (!(await isServiceRoleRequest(req))) {
    return unauthorized(corsHeaders);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  let bookingId = "";
  let claimMarker: string | null = null;
  let notesBeforeClaim: string | null = null;
  let accessToken: string | null = null;
  let newMeetingId: string | null = null;
  let customerEmailSent = false;
  let alertContext: ConfirmationAlertContext | null = null;

  // Release our claim (and remove a meeting we created but never delivered) so a
  // later retry can succeed instead of seeing a permanent "pending" marker.
  const rollback = async () => {
    if (newMeetingId && accessToken && !customerEmailSent) {
      await deleteZoomMeeting(accessToken, newMeetingId);
    }
    if (claimMarker && bookingId && !customerEmailSent) {
      const { error: releaseError } = await supabase
        .from("bookings")
        .update({ notes: notesBeforeClaim, updated_at: new Date().toISOString() })
        .eq("id", bookingId)
        .eq("notes", claimMarker);
      if (releaseError) console.error("Failed to release Zoom claim:", releaseError);
    }
  };

  try {
    const body: BookingConfirmationRequest = await req.json();
    bookingId = typeof body?.bookingId === "string" ? body.bookingId.trim() : "";
    const isReschedule = body?.isReschedule === true;
    if (!bookingId) return jsonResponse({ error: "bookingId is required" }, 400);

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("id, customer_name, customer_email, booking_type, booking_date, booking_time, duration_minutes, status, notes")
      .eq("id", bookingId)
      .maybeSingle();

    if (bookingError) {
      console.error("Failed to load booking:", bookingError);
      return jsonResponse({ error: "Unable to send booking confirmation. Please try again later." }, 500);
    }
    if (!booking) return jsonResponse({ error: "Booking not found" }, 404);
    if (booking.status !== "confirmed") {
      console.log("Refusing confirmation for non-confirmed booking:", bookingId, booking.status);
      return jsonResponse({ error: "Booking is not confirmed" }, 409);
    }

    const customerName: string = booking.customer_name;
    const customerEmail: string = booking.customer_email;
    const bookingType: string = booking.booking_type;
    const bookingDate: string = booking.booking_date;
    const bookingTime: string = String(booking.booking_time).slice(0, 5);

    const meta = getBookingMeta(bookingType);
    // For known session types, the canonical length always wins — a paid
    // coaching session must never go out as a 15-minute meeting.
    const effectiveDuration = meta.known
      ? meta.defaultDuration
      : (typeof booking.duration_minutes === 'number' && booking.duration_minutes > 0
        ? booking.duration_minutes
        : meta.defaultDuration);

    console.log("Processing booking confirmation for booking:", bookingId, "type:", bookingType);

    // ---- Idempotency guard -------------------------------------------------
    // Several paths can invoke this function for the same booking (square-booking
    // verify, square-webhook, contracts). Without a claim, each one would
    // create its own Zoom meeting, producing duplicate appointments.
    const existingNotes: string = booking.notes ?? "";
    const alreadyHasMeeting = existingNotes.includes("Join URL:");
    const previousMeetingId = existingNotes.match(/Zoom Meeting ID:\s*(\d+)/)?.[1] ?? null;

    if (alreadyHasMeeting && !isReschedule) {
      console.log("Booking already has a Zoom meeting; skipping duplicate creation:", bookingId);
      return jsonResponse({
        success: true,
        duplicate: true,
        zoomJoinUrl: existingNotes.match(/Join URL:\s*(\S+)/)?.[1] ?? null,
        meetingId: previousMeetingId,
      });
    }

    // A concurrent invocation may already be mid-flight. Its marker does not
    // contain "Join URL:" yet, so it must be detected explicitly. Claims older
    // than 10 minutes are treated as abandoned and may be retried.
    const pendingClaimAt = existingNotes.match(/Zoom meeting pending \(claimed ([^)]+)\)/)?.[1] ?? null;
    const CLAIM_TTL_MS = 10 * 60 * 1000;
    if (pendingClaimAt) {
      const claimAge = Date.now() - new Date(pendingClaimAt).getTime();
      if (Number.isFinite(claimAge) && claimAge < CLAIM_TTL_MS) {
        console.log("Zoom creation already in flight for booking:", bookingId);
        return jsonResponse({ success: true, duplicate: true, pending: true });
      }
      console.log("Stale Zoom claim detected; retrying booking:", bookingId);
    }

    // Compare-and-swap on the exact notes value we just read: only one
    // concurrent invocation can win this update. On a reschedule the previous
    // meeting details are kept in the marker so a rollback can restore them.
    const marker = `Zoom meeting pending (claimed ${new Date().toISOString()})`;
    let claimQuery = supabase
      .from("bookings")
      .update({ notes: marker, updated_at: new Date().toISOString() })
      .eq("id", bookingId);
    claimQuery = booking.notes == null
      ? claimQuery.is("notes", null)
      : claimQuery.eq("notes", existingNotes);
    const { data: claimed, error: claimError } = await claimQuery.select("id");

    if (claimError) {
      console.error("Failed to claim booking for Zoom creation:", claimError);
      return jsonResponse({ error: "Unable to send booking confirmation. Please try again later." }, 500);
    }
    if (!claimed || claimed.length === 0) {
      console.log("Another invocation already claimed this booking:", bookingId);
      return jsonResponse({ success: true, duplicate: true });
    }
    claimMarker = marker;
    alertContext = {
      bookingId,
      customerName: String(booking.customer_name ?? ""),
      customerEmail: String(booking.customer_email ?? ""),
      bookingType: String(booking.booking_type ?? ""),
      bookingDate: String(booking.booking_date ?? ""),
      bookingTime: String(booking.booking_time ?? "").slice(0, 5),
      isReschedule,
    };
    // Restore a real meeting reference on failure, but never a stale pending marker.
    notesBeforeClaim = pendingClaimAt ? null : booking.notes;

    // Zoom wants local wall-clock time (no "Z") plus the timezone field.
    const zoomStartTime = `${bookingDate}T${bookingTime}:00`;

    // Get Zoom access token and create the NEW meeting first; the old one (on a
    // reschedule) is only deleted once the new one exists and has been emailed.
    accessToken = await getZoomAccessToken();
    console.log("Got Zoom access token");

    const meetingTopic = `Freedom Interventions - ${meta.label} with ${customerName}`;

    const { joinUrl, meetingId } = await createZoomMeeting(
      accessToken,
      meetingTopic,
      zoomStartTime,
      effectiveDuration
    );
    newMeetingId = meetingId;
    console.log("Created Zoom meeting:", meetingId);

    // Format date/time for email (already Pacific wall-clock values)
    const formattedDate = formatPacificDate(bookingDate);
    const formattedTime = formatPacificTime(bookingTime);
    const appointmentType = meta.typeLine;

    const emailTitle = isReschedule
      ? "Your Appointment Has Been Rescheduled!"
      : "Your Appointment is Confirmed!";

    const emailSubject = isReschedule
      ? `Rescheduled: Your ${meta.emailNoun} - Freedom Interventions`
      : `Your ${meta.emailNoun} is Confirmed - Freedom Interventions`;

    // Family Readiness Intensive special block
    const intensiveBlock = bookingType === 'readiness-intensive'
      ? `
        <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 16px 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #065f46; margin: 0 0 8px;">Includes 7 Days of Follow-Up Support</h3>
          <p style="margin: 0; font-size: 14px; color: #064e3b;">
            For 7 days following your 90-minute Zoom session, you'll have direct access to Matt by
            <strong>Zoom, phone, text, or email</strong> as you put your family's plan into action.
          </p>
        </div>`
      : '';

    // Send confirmation email
    const safeCustomerName = escapeHtml(customerName);
    const safeJoinUrl = escapeHtml(encodeURI(joinUrl));
    const safeBookingId = escapeHtml(bookingId);
    const safeAppointmentType = escapeHtml(appointmentType);
    const safeDate = escapeHtml(formattedDate);
    const safeTime = escapeHtml(formattedTime);
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1e40af;">${emailTitle}</h1>
        <p>Hi ${safeCustomerName},</p>
        <p>${isReschedule
          ? "Your appointment with me has been successfully rescheduled."
          : "I’m looking forward to meeting with you. This call is a chance to slow things down, get clear about what is actually happening, and talk through the next right step for your family."}</p>
        <p>You do not need to have everything figured out before we meet. Just come ready to be honest about what is going on.</p>

        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Appointment Details</h2>
          <p><strong>Booking ID:</strong> ${safeBookingId}</p>
          <p><strong>Type:</strong> ${safeAppointmentType}</p>
          <p><strong>Date:</strong> ${safeDate}</p>
          <p><strong>Time:</strong> ${safeTime} (Pacific Time)</p>
        </div>

        ${intensiveBlock}

        <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Join Your Meeting</h2>
          <p>Click the button below to join your Zoom meeting at the scheduled time:</p>
          <a href="${safeJoinUrl}" style="display: inline-block; background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 10px;">Join Zoom Meeting</a>
          <p style="margin-top: 15px; font-size: 14px; color: #666;">Or copy this link: ${escapeHtml(joinUrl)}</p>
        </div>

        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px;"><strong>Need to reschedule?</strong> Use your Booking ID above along with your email address at our reschedule page.</p>
        </div>

        <p>If you have any questions, please contact us at:</p>
        <ul>
          <li>Phone: (458) 298-8000</li>
          <li>Email: matt@freedominterventions.com</li>
        </ul>

        <p>I’m looking forward to speaking with you.</p>
        <p>- Matt Brown<br>Freedom Interventions</p>
      </div>
    `;

    // Send confirmation email to customer
    await sendEmail(
      customerEmail,
      emailSubject,
      emailHtml
    );
    customerEmailSent = true;

    // Store the new Zoom meeting on the booking (releases our claim marker).
    const { error: zoomUpdateError } = await supabase
      .from("bookings")
      .update({
        notes: `Zoom Meeting ID: ${meetingId}, Join URL: ${joinUrl}` +
          (!isReschedule && existingNotes.includes(SLOT_CONFLICT_MARKER) ? `\n${SLOT_CONFLICT_MARKER}` : ""),
        updated_at: new Date().toISOString(),
      })
      .eq("id", bookingId);

    if (zoomUpdateError) {
      console.error("Failed to store Zoom details on booking:", zoomUpdateError);
    }

    // On a reschedule, remove the old meeting now that the new one exists.
    if (isReschedule && previousMeetingId && previousMeetingId !== meetingId) {
      await deleteZoomMeeting(accessToken, previousMeetingId);
    }

    // Send notification email to Matt (failure here must not roll back the customer's meeting)
    const adminIntensiveNote = bookingType === 'readiness-intensive'
      ? `<p style="margin: 8px 0 0; font-size: 13px; color: #065f46;"><strong>Includes 7 days of follow-up support</strong> by Zoom, phone, text, or email.</p>`
      : '';

    const adminNotificationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1e40af;">New Booking ${isReschedule ? '(Rescheduled)' : 'Received'}</h1>

        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Booking Details</h2>
          <p><strong>Booking ID:</strong> ${safeBookingId}</p>
          <p><strong>Client Name:</strong> ${safeCustomerName}</p>
          <p><strong>Client Email:</strong> ${escapeHtml(customerEmail)}</p>
          <p><strong>Type:</strong> ${safeAppointmentType}</p>
          <p><strong>Date:</strong> ${safeDate}</p>
          <p><strong>Time:</strong> ${safeTime} (Pacific Time)</p>
          ${adminIntensiveNote}
        </div>

        <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Zoom Meeting</h2>
          <p><a href="${safeJoinUrl}" style="display: inline-block; background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Join Zoom Meeting</a></p>
          <p style="margin-top: 15px; font-size: 14px; color: #666;">Meeting ID: ${escapeHtml(meetingId)}</p>
        </div>
      </div>
    `;

    try {
      await sendEmail(
        "matt@freedominterventions.com",
        `New ${meta.emailNoun} Booking - ${customerName.replace(/[\r\n]+/g, " ")}`,
        adminNotificationHtml
      );
    } catch (adminEmailError) {
      console.error("Failed to send admin booking notification:", adminEmailError);
    }

    console.log("Email sent successfully");

    return jsonResponse({
      success: true,
      zoomJoinUrl: joinUrl,
      meetingId,
    });
  } catch (error: any) {
    console.error("Error in send-booking-confirmation:", error);
    await rollback();
    // Only when this run actually claimed the booking and the customer never got the link
    // (not on "already sent" / "claimed by another run" skips).
    if (alertContext && !customerEmailSent) {
      await alertOwnerConfirmationFailed(alertContext, error);
    }
    return jsonResponse({ error: "Unable to send booking confirmation. Please try again later." }, 500);
  }
};

serve(handler);
