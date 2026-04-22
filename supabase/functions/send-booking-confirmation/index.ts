import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingConfirmationRequest {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  bookingType: string;
  bookingDate: string;
  bookingTime: string;
  durationMinutes?: number;
  isReschedule?: boolean;
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
      start_time: startTime,
      duration,
      timezone: "America/Los_Angeles",
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
  html: string
): Promise<void> {
  const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
  if (!sendgridApiKey) {
    throw new Error("SENDGRID_API_KEY not configured");
  }

  console.log("Sending email via SendGrid to:", to);

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sendgridApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: "noreply@freedominterventions.com", name: "Freedom Interventions" },
      subject,
      content: [{ type: "text/html", value: html }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("SendGrid error:", errorText);
    throw new Error(`Failed to send email: ${response.status} - ${errorText}`);
  }

  console.log("Email sent successfully via SendGrid");
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      bookingId,
      customerName,
      customerEmail,
      bookingType,
      bookingDate,
      bookingTime,
      durationMinutes = bookingType === 'consultation' ? 15 : bookingType === 'readiness-intensive' ? 90 : 60,
      isReschedule = false,
    }: BookingConfirmationRequest = await req.json();

    console.log("Processing booking confirmation for:", customerEmail);

    // Format the meeting time for Zoom (ISO 8601)
    const meetingDateTime = new Date(`${bookingDate}T${bookingTime}`);
    const zoomStartTime = meetingDateTime.toISOString();

    // Get Zoom access token and create meeting
    const accessToken = await getZoomAccessToken();
    console.log("Got Zoom access token");

    const meetingTopic = bookingType === "consultation" 
      ? `Freedom Interventions - Free Consultation with ${customerName}`
      : bookingType === "readiness-intensive"
      ? `Freedom Interventions - Family Readiness Intensive with ${customerName}`
      : `Freedom Interventions - Coaching Session with ${customerName}`;

    const { joinUrl, meetingId } = await createZoomMeeting(
      accessToken,
      meetingTopic,
      zoomStartTime,
      durationMinutes
    );
    console.log("Created Zoom meeting:", meetingId);

    // Format date for email
    const formattedDate = meetingDateTime.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = meetingDateTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const appointmentType = bookingType === "consultation" 
      ? "Free Consultation (15 minutes)" 
      : bookingType === "readiness-intensive"
      ? "Family Readiness Intensive (90-minute Zoom session, $2,500, plus 7 days of follow-up support by Zoom, phone, text, or email)"
      : "Coaching Session (1 hour - $150)";

    const emailTitle = isReschedule 
      ? "Your Appointment Has Been Rescheduled!"
      : "Your Appointment is Confirmed!";

    const emailSubject = isReschedule
      ? `Rescheduled: Your ${bookingType === "consultation" ? "Consultation" : bookingType === "readiness-intensive" ? "Family Readiness Intensive" : "Coaching Session"} - Freedom Interventions`
      : `Your ${bookingType === "consultation" ? "Consultation" : bookingType === "readiness-intensive" ? "Family Readiness Intensive" : "Coaching Session"} is Confirmed - Freedom Interventions`;

    // Send confirmation email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1e40af;">${emailTitle}</h1>
        <p>Dear ${customerName},</p>
        <p>${isReschedule 
          ? "Your appointment with Freedom Interventions has been successfully rescheduled." 
          : "Thank you for booking with Freedom Interventions. Your appointment has been confirmed."}</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Appointment Details</h2>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
          <p><strong>Type:</strong> ${appointmentType}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${formattedTime} (Pacific Time)</p>
        </div>
        
        <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Join Your Meeting</h2>
          <p>Click the button below to join your Zoom meeting at the scheduled time:</p>
          <a href="${joinUrl}" style="display: inline-block; background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 10px;">Join Zoom Meeting</a>
          <p style="margin-top: 15px; font-size: 14px; color: #666;">Or copy this link: ${joinUrl}</p>
        </div>
        
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px;"><strong>Need to reschedule?</strong> Use your Booking ID above along with your email address at our reschedule page.</p>
        </div>

        ${bookingType === "readiness-intensive" ? `
        <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #065f46; margin-top: 0;">What Happens After the Intensive</h2>
          <p style="margin-bottom: 10px;">Customer service is a priority. After your 90-minute Zoom session, you will receive 7 days of follow-up support.</p>
          <ul style="margin: 0; padding-left: 20px; color: #374151;">
            <li>Follow-up by Zoom</li>
            <li>Follow-up by phone</li>
            <li>Follow-up by text</li>
            <li>Follow-up by email</li>
          </ul>
        </div>
        ` : ""}
        
        <p>If you have any questions, please contact us at:</p>
        <ul>
          <li>Phone: (541) 838-6009</li>
          <li>Email: matt@freedominterventions.com</li>
        </ul>
        
        <p>We look forward to speaking with you!</p>
        <p>Best regards,<br>Freedom Interventions Team</p>
      </div>
    `;

    // Send confirmation email to customer
    await sendEmail(
      customerEmail,
      emailSubject,
      emailHtml
    );

    // Send notification email to Matt
    const adminNotificationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1e40af;">New Booking ${isReschedule ? '(Rescheduled)' : 'Received'}</h1>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Booking Details</h2>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
          <p><strong>Client Name:</strong> ${customerName}</p>
          <p><strong>Client Email:</strong> ${customerEmail}</p>
          <p><strong>Type:</strong> ${appointmentType}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${formattedTime} (Pacific Time)</p>
        </div>
        
        <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Zoom Meeting</h2>
          <p><a href="${joinUrl}" style="display: inline-block; background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Join Zoom Meeting</a></p>
          <p style="margin-top: 15px; font-size: 14px; color: #666;">Meeting ID: ${meetingId}</p>
        </div>
      </div>
    `;

    await sendEmail(
      "matt@freedominterventions.com",
      `New ${bookingType === "consultation" ? "Consultation" : bookingType === "readiness-intensive" ? "Family Readiness Intensive" : "Coaching Session"} Booking - ${customerName}`,
      adminNotificationHtml
    );

    console.log("Email sent successfully");

    // Update booking with Zoom meeting info
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase
      .from("bookings")
      .update({ 
        notes: `Zoom Meeting ID: ${meetingId}, Join URL: ${joinUrl}` 
      })
      .eq("id", bookingId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        zoomJoinUrl: joinUrl,
        meetingId 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-confirmation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
