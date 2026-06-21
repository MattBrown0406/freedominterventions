import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { enqueueSpineEvent } from "../_shared/spine.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SITE = Deno.env.get("PUBLIC_SITE_URL") || "https://freedominterventions.com";
const FROM_EMAIL = "noreply@freedominterventions.com";
const FROM_NAME = "Freedom Interventions";
const REPLY_TO = "matt@freedominterventions.com";

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

const formatUsd = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const part = (length: number) =>
    Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  return `FREEDOM-${part(4)}-${part(4)}`;
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

    const recipientName = String(body.recipientName ?? "").trim();
    const recipientEmail = String(body.recipientEmail ?? "").trim().toLowerCase();
    const baseAmountCents = Math.round(Number(body.baseAmountCents));
    const discountAmountCents = Math.round(Number(body.discountAmountCents) || 0);
    const expiresInDays = Math.round(Number(body.expiresInDays) || 30);
    const personalNote = String(body.personalNote ?? "").trim();
    const previewOnly = Boolean(body.previewOnly);
    const previewEmail = String(body.previewEmail ?? "").trim().toLowerCase();

    if (!recipientName || recipientName.length > 200) return json({ error: "Recipient name is required" }, 400);
    if (!emailRegex.test(recipientEmail)) return json({ error: "Recipient email is invalid" }, 400);
    if (!Number.isFinite(baseAmountCents) || baseAmountCents < 100 || baseAmountCents > 10000000) {
      return json({ error: "Contract amount must be between $1 and $100,000" }, 400);
    }
    if (!Number.isFinite(discountAmountCents) || discountAmountCents < 0 || discountAmountCents >= baseAmountCents) {
      return json({ error: "Discount must be at least $0 and less than the contract amount" }, 400);
    }
    if (expiresInDays < 1 || expiresInDays > 365) return json({ error: "Expiration must be 1-365 days" }, 400);
    if (personalNote.length > 1000) return json({ error: "Personal note is too long" }, 400);
    if (previewEmail && !emailRegex.test(previewEmail)) return json({ error: "Preview email is invalid" }, 400);

    let code: string | null = null;
    let codeId: string | null = null;
    let expiresAt: string | null = null;

    if (discountAmountCents > 0 && !previewOnly) {
      expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString();
      for (let index = 0; index < 5; index++) {
        const candidate = generateCode();
        const { data, error } = await admin
          .from("discount_codes")
          .insert({
            code: candidate,
            base_amount_cents: baseAmountCents,
            amount_cents: discountAmountCents,
            issued_to_name: recipientName,
            issued_to_email: recipientEmail,
            expires_at: expiresAt,
            notes: personalNote || null,
            created_by: userId,
          })
          .select("id, code")
          .single();

        if (!error && data) {
          code = data.code;
          codeId = data.id;
          break;
        }
        if (error && !String(error.message).includes("duplicate")) {
          return json({ error: "Failed to create discount code", detail: error.message }, 500);
        }
      }
      if (!code) return json({ error: "Failed to generate a unique discount code" }, 500);
    } else if (discountAmountCents > 0) {
      code = "FREEDOM-PRVW";
    }

    const finalAmountCents = Math.max(baseAmountCents - discountAmountCents, 0);
    const contractUrl = code
      ? `${SITE}/start-contract?code=${encodeURIComponent(code)}`
      : `${SITE}/start-contract`;
    const firstName = recipientName.split(/\s+/)[0] || recipientName;
    const discountLine = discountAmountCents > 0
      ? `<tr><td style="padding:4px 0;color:#155e75;">Personal adjustment${code ? ` (${escapeHtml(code)})` : ""}</td><td style="padding:4px 0;text-align:right;color:#155e75;">-${escapeHtml(formatUsd(discountAmountCents))}</td></tr>`
      : "";

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;color:#1f2937;">
        <div style="background:#1e3a5f;padding:24px;text-align:center;border-radius:8px 8px 0 0;color:#ffffff;">
          <div style="font-size:18px;font-weight:700;">Freedom Interventions</div>
          <div style="font-size:12px;letter-spacing:1.5px;margin-top:8px;text-transform:uppercase;">Private Client Agreement</div>
        </div>
        <div style="padding:24px;">
          <h2 style="color:#1e3a5f;margin-top:0;">Hi ${escapeHtml(firstName)}, your intervention agreement is ready</h2>
          <p style="font-size:15px;line-height:1.6;">Thank you for trusting Freedom Interventions. Your personalized agreement is ready to review, sign electronically, and complete through secure Square checkout.</p>
          ${personalNote ? `<div style="margin:20px 0;padding:16px 18px;background:#f8fafc;border-left:4px solid #1e3a5f;border-radius:6px;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(personalNote)}</div>` : ""}
          <div style="margin:24px 0;padding:20px;background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;">
            <h3 style="margin:0 0 10px;color:#1e3a5f;font-size:16px;">Agreement Amount</h3>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:4px 0;">Intervention services</td><td style="padding:4px 0;text-align:right;">${escapeHtml(formatUsd(baseAmountCents))}</td></tr>
              ${discountLine}
              <tr style="border-top:2px solid #1e3a5f;"><td style="padding:8px 0 0;font-weight:bold;">Total due at signing</td><td style="padding:8px 0 0;text-align:right;font-weight:bold;font-size:16px;">${escapeHtml(formatUsd(finalAmountCents))}</td></tr>
            </table>
          </div>
          <div style="margin:28px 0;text-align:center;">
            <a href="${escapeHtml(contractUrl)}" style="background:#1e3a5f;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;font-size:15px;">Review &amp; Sign Agreement</a>
          </div>
          <p style="font-size:14px;line-height:1.6;">Reply directly to this email with any questions.</p>
          <p style="font-size:14px;">Matt Brown<br/>Freedom Interventions</p>
        </div>
      </div>
    `;

    const sendTo = previewOnly && previewEmail ? previewEmail : recipientEmail;
    const subject = previewOnly
      ? "[PREVIEW] Your Freedom Interventions agreement"
      : "Your Freedom Interventions agreement";

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${sendgridApiKey}` },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: sendTo }], subject }],
        from: { email: FROM_EMAIL, name: FROM_NAME },
        reply_to: { email: REPLY_TO },
        content: [{ type: "text/html", value: previewOnly ? `<p><strong>PREVIEW:</strong> no prospect was contacted.</p>${html}` : html }],
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      if (codeId && !previewOnly) await admin.from("discount_codes").delete().eq("id", codeId);
      return json({ error: "Failed to send email", detail }, 502);
    }

    const nameParts = recipientName.split(/\s+/);
    const { data: existingContact } = await admin
      .from("crm_contacts")
      .select("id, notes")
      .eq("email", recipientEmail)
      .maybeSingle();
    if (existingContact) {
      await admin
        .from("crm_contacts")
        .update({
          first_name: nameParts[0] || null,
          last_name: nameParts.slice(1).join(" ") || null,
          notes: personalNote || existingContact.notes || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingContact.id);
    } else {
      await admin.from("crm_contacts").insert({
        email: recipientEmail,
        first_name: nameParts[0] || null,
        last_name: nameParts.slice(1).join(" ") || null,
        source: "manual",
        notes: personalNote || null,
      });
    }

    if (!previewOnly) {
      try {
        await enqueueSpineEvent(
          "contract_sent",
          {
            email: recipientEmail,
            name: recipientName,
            props: {
              final_amount_cents: finalAmountCents,
              base_amount_cents: baseAmountCents,
              discount_amount_cents: discountAmountCents,
              has_discount_code: Boolean(code),
            },
          },
          admin,
        );
      } catch (spineError) {
        console.error("Spine enqueue failed (contract_sent):", spineError);
      }
    }

    return json({
      success: true,
      sentTo: sendTo,
      preview: previewOnly,
      code: previewOnly ? null : code,
      expiresAt: previewOnly ? null : expiresAt,
      finalAmountCents,
    });
  } catch (error) {
    if (error instanceof HttpError) return json({ error: error.message }, error.status);
    const message = error instanceof Error ? error.message : "Unknown error";
    return json({ error: message }, 500);
  }
});
