import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { escapeHtml, sendResendEmail } from "../_shared/resend.ts";
import { isServiceOrAdmin, unauthorized } from "../_shared/auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  await sendResendEmail({
    to,
    subject,
    html,
    replyTo: "matt@freedominterventions.com",
  });
}

const PACIFIC_TZ = "America/Los_Angeles";

// Minutes Pacific time is offset from UTC at the given instant (e.g. -420 during PDT).
function pacificOffsetMinutes(at: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC_TZ,
    hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(at);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"), get("second"));
  return Math.round((asUtc - at.getTime()) / 60000);
}

// Bookings store Pacific wall-clock date/time; convert to the real instant (DST-aware).
function pacificWallTimeToInstant(date: string, time: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const wallAsUtc = Date.UTC(y, m - 1, d, hh, mm);
  let offset = pacificOffsetMinutes(new Date(wallAsUtc));
  let instant = wallAsUtc - offset * 60000;
  const corrected = pacificOffsetMinutes(new Date(instant));
  if (corrected !== offset) {
    offset = corrected;
    instant = wallAsUtc - offset * 60000;
  }
  return new Date(instant);
}

// Calendar date (YYYY-MM-DD) in Pacific time for an instant.
function pacificDateString(at: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PACIFIC_TZ, year: "numeric", month: "2-digit", day: "2-digit",
  }).format(at);
}

function formatPacificDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC", weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}

function formatPacificTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m || 0).padStart(2, "0")} ${ampm}`;
}

// Mirrors the offers in src/components/BookingCalendar.tsx (OFFERS).
function getReminderMeta(bookingType: string): { typeLine: string; noun: string } {
  switch (bookingType) {
    case "consultation":
      return { typeLine: "Free Consultation (15 minutes)", noun: "Consultation" };
    case "crisis-coaching":
    case "coaching":
      return { typeLine: "Crisis Coaching Session (60 minutes)", noun: "Crisis Coaching Session" };
    case "readiness-intensive":
      return { typeLine: "Family Readiness Intensive (90 minutes)", noun: "Family Readiness Intensive" };
    case "aftercare-planning":
      return { typeLine: "Aftercare Planning Call (30 minutes)", noun: "Aftercare Planning Call" };
    default:
      return { typeLine: "Appointment", noun: "Appointment" };
  }
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // pg_cron sends a service-role bearer; the admin UI sends a strict-admin JWT.
  if (!(await isServiceOrAdmin(req))) {
    return unauthorized(corsHeaders);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Find confirmed bookings happening in the next 24 hours that haven't had a reminder sent
    // We check for bookings between 23 and 25 hours from now to account for the hourly cron window
    const now = new Date();
    const in23Hours = new Date(now.getTime() + 23 * 60 * 60 * 1000);
    const in25Hours = new Date(now.getTime() + 25 * 60 * 60 * 1000);

    // booking_date is a Pacific calendar date.
    const todayStr = pacificDateString(in23Hours);
    const tomorrowStr = pacificDateString(in25Hours);

    // Get bookings in the date range that haven't been reminded
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("status", "confirmed")
      .eq("reminder_sent", false)
      .in("booking_date", [todayStr, tomorrowStr]);

    if (error) {
      console.error("Error fetching bookings:", error);
      throw new Error("Failed to fetch upcoming bookings");
    }

    if (!bookings || bookings.length === 0) {
      console.log("No upcoming bookings need reminders");
      return new Response(JSON.stringify({ reminded: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let remindedCount = 0;

    for (const booking of bookings) {
      // booking_date/booking_time are Pacific wall-clock values.
      const bookingTime = String(booking.booking_time).slice(0, 5);
      const bookingDateTime = pacificWallTimeToInstant(booking.booking_date, bookingTime);
      const hoursUntilBooking = (bookingDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

      // Only send reminder if the booking is between 23-25 hours away
      if (hoursUntilBooking < 23 || hoursUntilBooking > 25) {
        continue;
      }

      // Claim atomically so overlapping runs never double-send.
      const { data: claimed, error: claimError } = await supabase
        .from("bookings")
        .update({ reminder_sent: true })
        .eq("id", booking.id)
        .eq("reminder_sent", false)
        .eq("status", "confirmed")
        .select("id");
      if (claimError) {
        console.error(`Failed to claim reminder for booking ${booking.id}:`, claimError);
        continue;
      }
      if (!claimed || claimed.length === 0) continue;

      const formattedDate = formatPacificDate(booking.booking_date);
      const formattedTime = formatPacificTime(bookingTime);
      const meta = getReminderMeta(booking.booking_type);
      const appointmentType = meta.typeLine;

      // Extract Zoom link from notes if available
      const zoomMatch = booking.notes?.match(/Join URL: (https:\/\/[^\s,]+)/);
      const zoomUrl = zoomMatch ? zoomMatch[1] : null;
      const safeZoomUrl = zoomUrl ? escapeHtml(zoomUrl) : "";

      const zoomSection = zoomUrl
        ? `
          <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e40af; margin-top: 0;">Your Zoom Link</h2>
            <p>Click below to join your meeting at the scheduled time:</p>
            <a href="${safeZoomUrl}" style="display: inline-block; background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Join Zoom Meeting</a>
            <p style="margin-top: 15px; font-size: 14px; color: #666;">Or copy this link: ${safeZoomUrl}</p>
          </div>
        `
        : "";

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1e40af;">Appointment Reminder</h1>
          <p>Dear ${escapeHtml(booking.customer_name)},</p>
          <p>This is a friendly reminder that your appointment with Freedom Interventions is <strong>tomorrow</strong>.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e40af; margin-top: 0;">Appointment Details</h2>
            <p><strong>Type:</strong> ${escapeHtml(appointmentType)}</p>
            <p><strong>Date:</strong> ${escapeHtml(formattedDate)}</p>
            <p><strong>Time:</strong> ${escapeHtml(formattedTime)} (Pacific Time)</p>
          </div>
          
          ${zoomSection}
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px;"><strong>Need to reschedule?</strong> Visit our website or contact us at (458) 298-8000.</p>
          </div>
          
          <p>We look forward to speaking with you!</p>
          <p>Best regards,<br>Freedom Interventions Team</p>
        </div>
      `;

      try {
        await sendEmail(
          booking.customer_email,
          `Reminder: Your ${meta.noun} is Tomorrow - Freedom Interventions`,
          emailHtml
        );
      } catch (emailError) {
        console.error(`Failed to send reminder for booking ${booking.id}:`, emailError);
        // Release the claim so the next hourly run can retry.
        await supabase.from("bookings").update({ reminder_sent: false }).eq("id", booking.id);
        continue;
      }

      remindedCount++;
      console.log(`Reminder sent for booking ${booking.id}`);

      // Also notify Matt (failure here must not cause the customer to be re-sent)
      try {
        await sendEmail(
          "matt@freedominterventions.com",
          `Reminder: ${String(booking.customer_name).replace(/[\r\n]+/g, " ")}'s ${meta.noun} is Tomorrow`,
          `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #1e40af;">Upcoming Appointment Reminder</h1>
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Client:</strong> ${escapeHtml(booking.customer_name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(booking.customer_email)}</p>
                <p><strong>Type:</strong> ${escapeHtml(appointmentType)}</p>
                <p><strong>Date:</strong> ${escapeHtml(formattedDate)}</p>
                <p><strong>Time:</strong> ${escapeHtml(formattedTime)} (Pacific Time)</p>
              </div>
              ${zoomSection}
            </div>
          `
        );
      } catch (adminEmailError) {
        console.error(`Failed to send admin reminder for booking ${booking.id}:`, adminEmailError);
      }
    }

    console.log(`Sent ${remindedCount} reminders`);

    return new Response(JSON.stringify({ reminded: remindedCount }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-booking-reminder:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
