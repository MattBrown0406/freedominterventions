import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SITE = Deno.env.get("PUBLIC_SITE_URL") || "https://freedominterventions.com";
const FROM_EMAIL_DEFAULT = "noreply@freedominterventions.com";
const FROM_NAME_DEFAULT = "Freedom Interventions";
const REPLY_TO_DEFAULT = "matt@freedominterventions.com";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const escapeHtml = (value: string) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

function htmlToText(html: string) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function personalize(body: string, contact: { first_name: string | null; last_name?: string | null; email: string }) {
  return body
    .replace(/\{\{first_name\}\}/g, escapeHtml(contact.first_name || "there"))
    .replace(/\{\{last_name\}\}/g, escapeHtml(contact.last_name || ""))
    .replace(/\{\{email\}\}/g, escapeHtml(contact.email));
}

function wrapBranded(opts: { bodyHtml: string; ctaUrl?: string; ctaLabel?: string; unsubscribeUrl: string }) {
  const cta = opts.ctaUrl
    ? `<div style="margin:28px 0;text-align:center;"><a href="${escapeHtml(opts.ctaUrl)}" style="background:#1e3a5f;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;font-size:15px;">${escapeHtml(opts.ctaLabel || "Learn More")}</a></div>`
    : "";

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;color:#1f2937;">
      <div style="background:#1e3a5f;padding:24px;text-align:center;border-radius:8px 8px 0 0;color:#ffffff;">
        <div style="font-size:18px;font-weight:700;">Freedom Interventions</div>
      </div>
      <div style="padding:24px;font-size:15px;line-height:1.6;">
        ${opts.bodyHtml}
        ${cta}
      </div>
      <div style="padding:16px 24px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;line-height:1.5;">
        <p style="margin:0 0 6px;">Freedom Interventions</p>
        <p style="margin:0;">Don't want to receive these? <a href="${escapeHtml(opts.unsubscribeUrl)}" style="color:#1e3a5f;">Unsubscribe</a></p>
      </div>
    </div>
  `;
}

async function requireStrictAdmin(req: Request) {
  const authHeader = req.headers.get("authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) throw new HttpError("Unauthorized", 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
  const { data: userData, error: userError } = await userClient.auth.getUser();
  if (userError || !userData.user) throw new HttpError("Unauthorized", 401);
  const { data: isStrictAdmin, error: strictError } = await userClient.rpc("is_strict_admin");
  if (strictError || !isStrictAdmin) throw new HttpError("Forbidden", 403);

  return {
    admin: createClient(supabaseUrl, serviceRoleKey),
    userId: userData.user.id,
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
    if (!sendgridApiKey) return json({ error: "SENDGRID_API_KEY not configured" }, 500);
    const { admin, userId } = await requireStrictAdmin(req);
    const body = await req.json();

    const subject = String(body.subject ?? "").trim();
    const htmlBody = String(body.bodyHtml ?? "").trim();
    const ctaUrl = String(body.ctaUrl ?? "").trim();
    const ctaLabel = String(body.ctaLabel ?? "").trim();
    const source = String(body.source ?? "all");
    const sinceDays = Number(body.sinceDays) || 0;
    const testEmail = String(body.testEmail ?? "").trim().toLowerCase();

    if (!subject || subject.length > 200) return json({ error: "Subject is required" }, 400);
    if (!htmlBody || htmlBody.length > 100000) return json({ error: "Message body is required" }, 400);
    if (ctaUrl && !/^https?:\/\//i.test(ctaUrl)) return json({ error: "CTA URL must start with http(s)" }, 400);
    if (!["all", "contact", "assessment", "contract", "manual"].includes(source)) return json({ error: "Invalid audience" }, 400);
    if (sinceDays < 0 || sinceDays > 3650) return json({ error: "Since days must be 0-3650" }, 400);

    let recipients: Array<{ id: string; email: string; first_name: string | null; last_name: string | null; unsubscribe_token: string }> = [];
    if (testEmail) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testEmail)) return json({ error: "Test email is invalid" }, 400);
      recipients = [{ id: "test", email: testEmail, first_name: null, last_name: null, unsubscribe_token: "preview-token" }];
    } else {
      let query = admin
        .from("crm_contacts")
        .select("id, email, first_name, last_name, unsubscribe_token, source, created_at")
        .eq("unsubscribed", false);
      if (source !== "all") query = query.eq("source", source);
      if (sinceDays > 0) query = query.gte("created_at", new Date(Date.now() - sinceDays * 86400000).toISOString());
      const { data, error } = await query;
      if (error) return json({ error: "Failed to load recipients", detail: error.message }, 500);
      recipients = (data || []) as typeof recipients;
    }

    if (recipients.length === 0) return json({ error: "No recipients matched" }, 400);

    let campaignId: string | null = null;
    if (!testEmail) {
      const { data, error } = await admin
        .from("email_campaigns")
        .insert({
          subject,
          html_body: htmlBody,
          text_body: htmlToText(htmlBody),
          from_email: FROM_EMAIL_DEFAULT,
          from_name: FROM_NAME_DEFAULT,
          reply_to: REPLY_TO_DEFAULT,
          status: "sending",
          recipient_count: recipients.length,
          created_by: userId,
        })
        .select("id")
        .single();
      if (error || !data) return json({ error: "Failed to create campaign", detail: error?.message }, 500);
      campaignId = data.id;
    }

    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const recipient of recipients) {
      const unsubscribeUrl = recipient.id === "test"
        ? `${SITE}/unsubscribe?token=preview-token`
        : `${SITE}/unsubscribe?token=${encodeURIComponent(recipient.unsubscribe_token)}`;
      const personalizedBody = personalize(htmlBody, recipient);
      const finalHtml = wrapBranded({ bodyHtml: personalizedBody, ctaUrl, ctaLabel, unsubscribeUrl });

      try {
        const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${sendgridApiKey}` },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: recipient.email }], subject: testEmail ? `[TEST] ${subject}` : subject }],
            from: { email: FROM_EMAIL_DEFAULT, name: FROM_NAME_DEFAULT },
            reply_to: { email: REPLY_TO_DEFAULT },
            content: [
              { type: "text/plain", value: htmlToText(finalHtml) },
              { type: "text/html", value: finalHtml },
            ],
            tracking_settings: { subscription_tracking: { enable: false } },
          }),
        });

        if (response.ok) {
          sent++;
          if (campaignId) {
            await admin.from("email_campaign_sends").insert({
              campaign_id: campaignId,
              contact_id: recipient.id === "test" ? null : recipient.id,
              email: recipient.email,
              status: "sent",
              sent_at: new Date().toISOString(),
            });
            await admin.from("crm_contacts").update({ last_contacted_at: new Date().toISOString() }).eq("id", recipient.id);
          }
        } else {
          failed++;
          const detail = await response.text().catch(() => "");
          errors.push(`${recipient.email}: ${response.status} ${detail.slice(0, 200)}`);
          if (campaignId) {
            await admin.from("email_campaign_sends").insert({
              campaign_id: campaignId,
              contact_id: recipient.id === "test" ? null : recipient.id,
              email: recipient.email,
              status: "failed",
              error_message: detail.slice(0, 500),
            });
          }
        }
      } catch (error) {
        failed++;
        errors.push(`${recipient.email}: ${String(error).slice(0, 200)}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    if (campaignId) {
      await admin
        .from("email_campaigns")
        .update({
          status: failed === 0 ? "sent" : "sent_with_errors",
          sent_count: sent,
          failed_count: failed,
          sent_at: new Date().toISOString(),
        })
        .eq("id", campaignId);
    }

    return json({ success: true, test: Boolean(testEmail), campaignId, recipientCount: recipients.length, sent, failed, errors: errors.slice(0, 10) });
  } catch (error) {
    if (error instanceof HttpError) return json({ error: error.message }, error.status);
    const message = error instanceof Error ? error.message : "Unknown error";
    return json({ error: message }, 500);
  }
});
