import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadMagnetRequest {
  name: string;
  email: string;
}

// Rate limiting map
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // Max 5 requests per hour per email
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(email);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(email, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }
  
  if (record.count >= RATE_LIMIT) {
    return true;
  }
  
  record.count++;
  return false;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email }: LeadMagnetRequest = await req.json();

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
      throw new Error("Invalid name");
    }
    if (!email || typeof email !== "string" || !email.includes("@") || email.length > 255) {
      throw new Error("Invalid email");
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Check rate limit
    if (isRateLimited(cleanEmail)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Sending lead magnet to:", cleanEmail);

    const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
    if (!sendgridApiKey) {
      throw new Error("SENDGRID_API_KEY not configured");
    }

    // Create the checklist email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Georgia, 'Times New Roman', serif; line-height: 1.6; color: #1a365d; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #1a365d; margin-bottom: 10px;">Your Intervention Planning Checklist</h1>
    <p style="color: #64748b;">From Freedom Interventions</p>
  </div>

  <p>Hi ${cleanName},</p>
  
  <p>Thank you for downloading our Intervention Planning Checklist. This is the same framework we use when helping families prepare for successful interventions.</p>

  <div style="background-color: #f8fafc; border-left: 4px solid #1a365d; padding: 20px; margin: 30px 0;">
    <h2 style="color: #1a365d; margin-top: 0; font-size: 20px;">📋 Intervention Planning Checklist</h2>
    
    <h3 style="color: #1a365d; margin-bottom: 10px;">Before the Intervention</h3>
    <ul style="padding-left: 20px;">
      <li>☐ Identify 3-5 committed family members/friends</li>
      <li>☐ Research treatment options (we can help with this)</li>
      <li>☐ Verify insurance coverage or budget</li>
      <li>☐ Choose a neutral, private location</li>
      <li>☐ Write personal impact letters (non-blaming, factual)</li>
      <li>☐ Define clear consequences if they refuse help</li>
      <li>☐ Plan logistics (bag packed, ride to treatment)</li>
      <li>☐ Consider hiring a professional interventionist</li>
    </ul>

    <h3 style="color: #1a365d; margin-bottom: 10px;">What to Say</h3>
    <ul style="padding-left: 20px;">
      <li>✓ "We love you and we're worried about you"</li>
      <li>✓ "We've seen [specific behavior] and it scares us"</li>
      <li>✓ "We've arranged for you to get help today"</li>
      <li>✓ "We need you to make a decision right now"</li>
    </ul>

    <h3 style="color: #1a365d; margin-bottom: 10px;">What to Avoid</h3>
    <ul style="padding-left: 20px;">
      <li>✗ Blaming or shaming language</li>
      <li>✗ Bringing up past arguments</li>
      <li>✗ Making threats you won't follow through on</li>
      <li>✗ Allowing the person to postpone the decision</li>
      <li>✗ Getting pulled into debates about the past</li>
    </ul>

    <h3 style="color: #1a365d; margin-bottom: 10px;">Treatment Selection Tips</h3>
    <ul style="padding-left: 20px;">
      <li>☐ Verify accreditation (Joint Commission, CARF)</li>
      <li>☐ Check staff credentials</li>
      <li>☐ Ask about their specific approach/philosophy</li>
      <li>☐ Understand the timeline (detox, residential, aftercare)</li>
      <li>☐ Ask about family involvement during treatment</li>
      <li>☐ Get clear pricing (avoid hidden fees)</li>
    </ul>

    <h3 style="color: #1a365d; margin-bottom: 10px;">Warning Signs to Watch For</h3>
    <ul style="padding-left: 20px;">
      <li>⚠️ Increased tolerance (needing more to get the same effect)</li>
      <li>⚠️ Withdrawal symptoms when not using</li>
      <li>⚠️ Failed attempts to cut down or stop</li>
      <li>⚠️ Neglecting responsibilities (work, family, health)</li>
      <li>⚠️ Continued use despite consequences</li>
      <li>⚠️ Isolation from family and friends</li>
      <li>⚠️ Financial problems or unexplained expenses</li>
      <li>⚠️ Changes in sleep, appetite, or appearance</li>
    </ul>
  </div>

  <div style="background-color: #1a365d; color: white; padding: 25px; border-radius: 8px; text-align: center; margin: 30px 0;">
    <h3 style="margin-top: 0;">Need Professional Help?</h3>
    <p style="margin-bottom: 20px;">Interventions are more successful with professional guidance. We've helped over 1,000 families.</p>
    <a href="https://freedominterventions.com" style="display: inline-block; background-color: white; color: #1a365d; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">Schedule a Free Consultation</a>
    <p style="margin-top: 15px; margin-bottom: 0; font-size: 18px;">📞 (541) 838-6009</p>
  </div>

  <p>Remember: The longer addiction continues, the harder it becomes to treat. If you're reading this, it may be time to act.</p>

  <p>We're here when you're ready.</p>

  <p style="margin-top: 30px;">
    Warmly,<br>
    <strong>Matt</strong><br>
    Freedom Interventions<br>
    <a href="tel:+15418386009" style="color: #1a365d;">(541) 838-6009</a>
  </p>

  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
  
  <p style="color: #94a3b8; font-size: 12px; text-align: center;">
    Freedom Interventions | Based in Oregon, Serving Families Nationwide<br>
    <a href="https://freedominterventions.com" style="color: #94a3b8;">freedominterventions.com</a>
  </p>
</body>
</html>
    `;

    // Send the email
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendgridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: cleanEmail, name: cleanName }] }],
        from: { email: "noreply@freedominterventions.com", name: "Freedom Interventions" },
        subject: "Your Intervention Planning Checklist",
        content: [{ type: "text/html", value: emailHtml }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SendGrid error:", errorText);
      throw new Error(`Failed to send email: ${response.status}`);
    }

    console.log("Lead magnet email sent successfully to:", cleanEmail);

    // Also notify Matt about new lead
    await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendgridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: "matt@freedominterventions.com" }] }],
        from: { email: "noreply@freedominterventions.com", name: "Freedom Interventions" },
        subject: `New Lead: ${cleanName} downloaded the checklist`,
        content: [{ 
          type: "text/html", 
          value: `
            <h2>New Lead Magnet Download</h2>
            <p><strong>Name:</strong> ${cleanName}</p>
            <p><strong>Email:</strong> ${cleanEmail}</p>
            <p><strong>Downloaded:</strong> Intervention Planning Checklist</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <hr>
            <p>Consider following up within 24-48 hours while they're actively researching.</p>
          `
        }],
      }),
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-lead-magnet:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
