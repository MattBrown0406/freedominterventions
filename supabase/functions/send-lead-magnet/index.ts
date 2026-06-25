import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { sendResendEmail, sendSystemEmail } from "../_shared/resend.ts";
import { enqueueSpineEvent, extractUtm } from "../_shared/spine.ts";
import { checkRateLimit } from "../_shared/rateLimit.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadMagnetRequest {
  name: string;
  email: string;
  phone?: string;
  urgency?: string;
  leadMagnet?: string;
  source?: string;
  pagePath?: string;
  sourceAttribution?: Record<string, unknown>;
}

const SITE_URL = "https://freedominterventions.com";

// Durable rate limiting: max 5 requests per hour per email (see _shared/rateLimit.ts).
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW_SECONDS = 60 * 60;

function escapeHtml(value: unknown) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

function urgencyLabel(value: string | undefined) {
  const labels: Record<string, string> = {
    not_sure: "Not sure what level of help fits",
    safety_or_overdose: "Safety, overdose, or disappearance risk",
    refusing_treatment: "Refusing or delaying treatment",
    family_divided: "Family is divided or enabling keeps repeating",
    ready_for_intervention: "Family may be ready for intervention planning",
  };
  return labels[value || ""] || value || "Not specified";
}

async function storeLeadAndQueueFollowups(payload: LeadMagnetRequest, cleanName: string, cleanEmail: string, cleanPhone: string | null) {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) return;

  const supabase = createClient(supabaseUrl, serviceKey);
  const sourceAttribution = payload.sourceAttribution && typeof payload.sourceAttribution === "object"
    ? {
      ...payload.sourceAttribution,
      source: payload.source || payload.sourceAttribution.source || "lead_magnet",
      lead_magnet: payload.leadMagnet || "intervention_readiness_checklist",
      urgency: payload.urgency || "not_sure",
      page_path: payload.pagePath || null,
    }
    : {
      source: payload.source || "lead_magnet",
      lead_magnet: payload.leadMagnet || "intervention_readiness_checklist",
      urgency: payload.urgency || "not_sure",
      page_path: payload.pagePath || null,
    };

  const nameParts = cleanName.split(/\s+/);
  const leadScore = payload.urgency === "safety_or_overdose" ? 70 :
    payload.urgency === "ready_for_intervention" ? 65 :
    payload.urgency === "refusing_treatment" ? 55 :
    payload.urgency === "family_divided" ? 45 : 35;

  await supabase.from("crm_contacts").upsert({
    email: cleanEmail,
    first_name: nameParts[0] || null,
    last_name: nameParts.slice(1).join(" ") || null,
    phone: cleanPhone,
    source: "lead_magnet",
    source_attribution: sourceAttribution,
    lead_score: leadScore,
    revenue_path: leadScore >= 60 ? "intervention_or_readiness" : "consultation_or_coaching",
    pipeline_status: "new",
    next_action: leadScore >= 60 ? "Review checklist lead and offer readiness/consultation path" : "Send checklist and invite to consultation",
    next_action_due_at: new Date(Date.now() + (leadScore >= 60 ? 60 : 240) * 60 * 1000).toISOString(),
    last_engagement_at: new Date().toISOString(),
  }, { onConflict: "email" });

  const first = firstName(cleanName);
  const consultUrl = `${SITE_URL}/?type=consultation&name=${encodeURIComponent(cleanName)}&email=${encodeURIComponent(cleanEmail)}${cleanPhone ? `&phone=${encodeURIComponent(cleanPhone)}` : ""}#booking`;
  const decisionUrl = `${SITE_URL}/which-help-do-we-need?source=checklist_followup&utm_source=freedom_followup&utm_medium=email&utm_campaign=intervention_readiness_checklist`;

  const rows = [
    {
      lead_type: "contact_message",
      contact_email: cleanEmail,
      contact_name: cleanName,
      contact_phone: cleanPhone,
      followup_reason: "lead_magnet_checklist_confirmation",
      priority: leadScore >= 60 ? "high" : "normal",
      sequence_step: 1,
      subject: `${first}, your intervention readiness checklist`,
      body_html: `
        <p>Hi ${escapeHtml(first)},</p>
        <p>I sent the intervention readiness checklist. If the situation is moving quickly, do not wait on email. Call me directly at <a href="tel:5416688084">541-668-8084</a>.</p>
        <p>If you are not sure which level of help fits, this page will route you to the safest next step:</p>
        <p><a href="${decisionUrl}">Choose the right help path</a></p>
        <p>- Matt Brown<br>Freedom Interventions</p>
      `,
      source_attribution: sourceAttribution,
      due_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    },
    {
      lead_type: "contact_message",
      contact_email: cleanEmail,
      contact_name: cleanName,
      contact_phone: cleanPhone,
      followup_reason: "lead_magnet_checklist_consult",
      priority: leadScore >= 60 ? "high" : "normal",
      sequence_step: 2,
      subject: "Do you need help deciding the next move?",
      body_html: `
        <p>Hi ${escapeHtml(first)},</p>
        <p>Families often download a checklist because they are trying to avoid making the wrong move. That is wise. It is also easy to wait too long.</p>
        <p>If there is treatment refusal, overdose concern, family division, or a pattern that keeps repeating, a consultation can help sort whether this is coaching, readiness work, or intervention planning.</p>
        <p><a href="${consultUrl}">Book a free consultation</a></p>
        <p>- Matt</p>
      `,
      source_attribution: sourceAttribution,
      due_at: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const { error } = await supabase.from("freedom_followup_queue").insert(rows);
  if (error) console.error("Failed to queue lead magnet followups:", error);

  await enqueueSpineEvent("checklist_downloaded", {
    email: cleanEmail,
    phone: cleanPhone,
    name: cleanName,
    utm: extractUtm(sourceAttribution as Record<string, any>),
    props: { urgency: payload.urgency || null, lead_magnet: payload.leadMagnet || "intervention_readiness_checklist" },
  }, supabase);
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: LeadMagnetRequest = await req.json();
    const { name, email, phone } = payload;

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
      throw new Error("Invalid name");
    }
    if (!email || typeof email !== "string" || !email.includes("@") || email.length > 255) {
      throw new Error("Invalid email");
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = typeof phone === "string" && phone.trim().length > 0 ? phone.trim().slice(0, 40) : null;

    // Check rate limit (durable, cross-instance)
    const rlUrl = Deno.env.get("SUPABASE_URL");
    const rlKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (rlUrl && rlKey) {
      const allowed = await checkRateLimit(
        createClient(rlUrl, rlKey),
        `lead-magnet:${cleanEmail}`,
        RATE_LIMIT,
        RATE_LIMIT_WINDOW_SECONDS,
      );
      if (!allowed) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again later." }),
          { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    }

    console.log("Sending lead magnet to:", cleanEmail);

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

  <p>Hi ${escapeHtml(cleanName)},</p>
  
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
    <a href="${SITE_URL}/which-help-do-we-need" style="display: inline-block; background-color: white; color: #1a365d; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">Choose the Right Next Step</a>
    <p style="margin-top: 15px; margin-bottom: 0; font-size: 18px;">📞 (541) 668-8084</p>
  </div>

  <p>Remember: The longer addiction continues, the harder it becomes to treat. If you're reading this, it may be time to act.</p>

  <p>We're here when you're ready.</p>

  <p style="margin-top: 30px;">
    Warmly,<br>
    <strong>Matt</strong><br>
    Freedom Interventions<br>
    <a href="tel:+15416688084" style="color: #1a365d;">(541) 668-8084</a>
  </p>

  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
  
  <p style="color: #94a3b8; font-size: 12px; text-align: center;">
    Freedom Interventions | Based in Oregon, Serving Families Nationwide<br>
    <a href="${SITE_URL}" style="color: #94a3b8;">freedominterventions.com</a>
  </p>
</body>
</html>
    `;

    // Send the email
    await sendResendEmail({
      to: cleanEmail,
      subject: `${firstName(cleanName)}, your intervention checklist is ready`,
      html: emailHtml,
      replyTo: "matt@freedominterventions.com",
    });

    console.log("Lead magnet email sent successfully to:", cleanEmail);

    // Also notify Matt about new lead
    await sendSystemEmail({
      to: "matt@freedominterventions.com",
      replyTo: cleanEmail,
      subject: `New Lead: ${cleanName} downloaded the checklist`,
      html: `
        <h2>New Lead Magnet Download</h2>
        <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(cleanPhone || "Not provided")}</p>
        <p><strong>Urgency:</strong> ${escapeHtml(urgencyLabel(payload.urgency))}</p>
        <p><strong>Source:</strong> ${escapeHtml(payload.source || "lead_magnet")}</p>
        <p><strong>Page:</strong> ${escapeHtml(payload.pagePath || "Unknown")}</p>
        <p><strong>Downloaded:</strong> Intervention Planning Checklist</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p>Consider following up within 24-48 hours while they're actively researching.</p>
      `,
    });

    await storeLeadAndQueueFollowups(payload, cleanName, cleanEmail, cleanPhone);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error in send-lead-magnet:", error);
    const message = error instanceof Error ? error.message : "Unknown lead magnet error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
