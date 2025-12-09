import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactMessageRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message }: ContactMessageRequest = await req.json();

    console.log("Processing contact message from:", email);

    const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
    if (!sendgridApiKey) {
      throw new Error("SENDGRID_API_KEY not configured");
    }

    // Send email to Matt
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1e40af;">New Contact Form Submission</h1>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Contact Details</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        </div>
        
        <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Message</h2>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        
        <p style="color: #666; font-size: 14px;">This message was sent from the Freedom Interventions website contact form.</p>
      </div>
    `;

    console.log("Sending email via SendGrid");

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendgridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: "matt@freedominterventions.com" }] }],
        from: { email: "noreply@freedominterventions.com", name: "Freedom Interventions" },
        reply_to: { email: email, name: name },
        subject: `Contact Form: Message from ${name}`,
        content: [{ type: "text/html", value: emailHtml }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SendGrid error:", errorText);
      throw new Error(`Failed to send email: ${response.status} - ${errorText}`);
    }

    console.log("Email sent successfully via SendGrid");

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-message:", error);
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
