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
  durationMinutes: number;
}

async function getZoomAccessToken(): Promise<string> {
  const accountId = Deno.env.get("ZOOM_ACCOUNT_ID");
  const clientId = Deno.env.get("ZOOM_CLIENT_ID");
  const clientSecret = Deno.env.get("ZOOM_CLIENT_SECRET");

  if (!accountId || !clientId || !clientSecret) {
    throw new Error("Zoom credentials not configured");
  }

  const credentials = btoa(`${clientId}:${clientSecret}`);
  
  const response = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Zoom token error:", errorText);
    throw new Error(`Failed to get Zoom access token: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
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
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY not configured");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Freedom Interventions <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend error:", errorText);
    throw new Error(`Failed to send email: ${response.status}`);
  }

  const data = await response.json();
  console.log("Email sent:", data);
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
      durationMinutes,
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
      ? "Free Consultation (30 minutes)" 
      : "Coaching Session (1 hour - $150)";

    // Send confirmation email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1e40af;">Your Appointment is Confirmed!</h1>
        <p>Dear ${customerName},</p>
        <p>Thank you for booking with Freedom Interventions. Your appointment has been confirmed.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Appointment Details</h2>
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
        
        <p>If you need to reschedule or have any questions, please contact us at:</p>
        <ul>
          <li>Phone: (503) 836-2136</li>
          <li>Email: matt@freedominterventions.com</li>
        </ul>
        
        <p>We look forward to speaking with you!</p>
        <p>Best regards,<br>Freedom Interventions Team</p>
      </div>
    `;

    await sendEmail(
      customerEmail,
      `Your ${bookingType === "consultation" ? "Consultation" : "Coaching Session"} is Confirmed - Freedom Interventions`,
      emailHtml
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
