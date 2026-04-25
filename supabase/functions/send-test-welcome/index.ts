import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FROM_EMAIL = "noreply@freedominterventions.com";
const FROM_NAME = "Freedom Interventions";
const SITE_URL = "https://freedominterventions.com";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { to = "matt@soberhelpline.com", name = "there" } = await req.json().catch(() => ({}));
    const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
    if (!sendgridApiKey) throw new Error("SENDGRID_API_KEY not configured");

    const subject = "Thank You for Choosing Freedom Interventions — Here's What Happens Next";

    const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:#f5f7fa;font-family:Arial,Helvetica,sans-serif;color:#1a2332;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f7fa;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
        <tr><td style="background-color:#1e3a8a;padding:28px 32px;text-align:center;">
          <h1 style="color:#fbbf24;margin:0;font-size:22px;letter-spacing:0.5px;">FREEDOM INTERVENTIONS</h1>
        </td></tr>
        <tr><td style="padding:36px 32px;">
          <h2 style="color:#1e3a8a;margin:0 0 18px;font-size:22px;">Thank You, ${name}</h2>
          <p style="font-size:16px;line-height:1.6;margin:0 0 18px;">
            Thank you for trusting Freedom Interventions to help your family. Reaching out for help is one of the hardest — and most courageous — steps a family can take, and I'm honored you've chosen me to walk alongside you.
          </p>
          <p style="font-size:16px;line-height:1.6;margin:0 0 24px;">
            Here's what to expect once your contract is executed and payment is received:
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border-left:4px solid #fbbf24;border-radius:4px;margin:0 0 24px;">
            <tr><td style="padding:20px 24px;">
              <h3 style="color:#1e3a8a;margin:0 0 14px;font-size:17px;">Next Steps</h3>
              <ol style="margin:0;padding-left:20px;font-size:15px;line-height:1.7;">
                <li style="margin-bottom:10px;"><strong>Gather your group of concerned loved ones.</strong> We'll schedule a Zoom meeting with everyone who will be involved so we can begin planning the intervention together.</li>
                <li style="margin-bottom:10px;"><strong>Planning meeting on Zoom.</strong> During that meeting, we'll finalize a date for the intervention and walk through the strategy as a team.</li>
                <li style="margin-bottom:10px;"><strong>Complete the family assessment.</strong> In the meantime, I'll ask you to fill out our assessment so I have as much detail as possible about your loved one. This helps me make the best treatment recommendations for their unique situation.</li>
              </ol>
            </td></tr>
          </table>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
            <tr>
              <td align="center" style="padding:8px;">
                <a href="${SITE_URL}/start-contract" style="display:inline-block;background-color:#1e3a8a;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;font-size:15px;">Review & Sign Contract</a>
              </td>
              <td align="center" style="padding:8px;">
                <a href="${SITE_URL}/self-assessment" style="display:inline-block;background-color:#fbbf24;color:#1e3a8a;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;font-size:15px;">Begin Family Assessment</a>
              </td>
            </tr>
          </table>

          <p style="font-size:15px;line-height:1.6;margin:0 0 14px;">
            If you have any questions before our first call, just reply to this email — I read every message personally.
          </p>
          <p style="font-size:15px;line-height:1.6;margin:24px 0 0;">
            With you in this,<br/>
            <strong>Matt Brown</strong><br/>
            <span style="color:#64748b;">Founder, Freedom Interventions</span>
          </p>
        </td></tr>
        <tr><td style="background-color:#f8fafc;padding:20px 32px;text-align:center;border-top:1px solid #e2e8f0;">
          <p style="font-size:12px;color:#64748b;margin:0;">Freedom Interventions · <a href="${SITE_URL}" style="color:#1e3a8a;text-decoration:none;">freedominterventions.com</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendgridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: FROM_EMAIL, name: FROM_NAME },
        subject,
        content: [{ type: "text/html", value: html }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`SendGrid failed: ${response.status} - ${errorText}`);
    }

    return new Response(JSON.stringify({ success: true, sentTo: to }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("send-test-welcome error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
