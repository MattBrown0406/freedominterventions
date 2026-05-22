import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
  if (!sendgridApiKey) {
    throw new Error("SENDGRID_API_KEY not configured");
  }

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
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
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

    const todayStr = in23Hours.toISOString().split("T")[0];
    const tomorrowStr = in25Hours.toISOString().split("T")[0];

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
      // Construct the full booking datetime in PST context
      const bookingDateTime = new Date(`${booking.booking_date}T${booking.booking_time}`);
      const hoursUntilBooking = (bookingDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

      // Only send reminder if the booking is between 23-25 hours away
      if (hoursUntilBooking < 23 || hoursUntilBooking > 25) {
        continue;
      }

      const formattedDate = bookingDateTime.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedTime = bookingDateTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      const appointmentType = booking.booking_type === "consultation"
        ? "Free Consultation (30 minutes)"
        : "Coaching Session (1 hour)";

      // Extract Zoom link from notes if available
      const zoomMatch = booking.notes?.match(/Join URL: (https:\/\/[^\s,]+)/);
      const zoomUrl = zoomMatch ? zoomMatch[1] : null;

      const zoomSection = zoomUrl
        ? `
          <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e40af; margin-top: 0;">Your Zoom Link</h2>
            <p>Click below to join your meeting at the scheduled time:</p>
            <a href="${zoomUrl}" style="display: inline-block; background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Join Zoom Meeting</a>
            <p style="margin-top: 15px; font-size: 14px; color: #666;">Or copy this link: ${zoomUrl}</p>
          </div>
        `
        : "";

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1e40af;">Appointment Reminder</h1>
          <p>Dear ${booking.customer_name},</p>
          <p>This is a friendly reminder that your appointment with Freedom Interventions is <strong>tomorrow</strong>.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e40af; margin-top: 0;">Appointment Details</h2>
            <p><strong>Type:</strong> ${appointmentType}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime} (Pacific Time)</p>
          </div>
          
          ${zoomSection}
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px;"><strong>Need to reschedule?</strong> Visit our website or contact us at (541) 668-8084.</p>
          </div>
          
          <p>We look forward to speaking with you!</p>
          <p>Best regards,<br>Freedom Interventions Team</p>
        </div>
      `;

      try {
        await sendEmail(
          booking.customer_email,
          `Reminder: Your ${booking.booking_type === "consultation" ? "Consultation" : "Coaching Session"} is Tomorrow - Freedom Interventions`,
          emailHtml
        );

        // Also notify Matt
        await sendEmail(
          "matt@freedominterventions.com",
          `Reminder: ${booking.customer_name}'s ${booking.booking_type === "consultation" ? "Consultation" : "Coaching Session"} is Tomorrow`,
          `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #1e40af;">Upcoming Appointment Reminder</h1>
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Client:</strong> ${booking.customer_name}</p>
                <p><strong>Email:</strong> ${booking.customer_email}</p>
                <p><strong>Type:</strong> ${appointmentType}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time:</strong> ${formattedTime} (Pacific Time)</p>
              </div>
              ${zoomSection}
            </div>
          `
        );

        // Mark as reminded
        await supabase
          .from("bookings")
          .update({ reminder_sent: true })
          .eq("id", booking.id);

        remindedCount++;
        console.log(`Reminder sent for booking ${booking.id} (${booking.customer_name})`);
      } catch (emailError) {
        console.error(`Failed to send reminder for booking ${booking.id}:`, emailError);
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
