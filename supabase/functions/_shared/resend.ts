export interface ResendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string | string[];
}

const DEFAULT_FROM = "Matt Brown <matt@freedominterventions.com>";
const SYSTEM_FROM = "Freedom Interventions <noreply@freedominterventions.com>";

export function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
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

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendResendEmail(opts: ResendEmailOptions): Promise<string | null> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");

  const payload: Record<string, unknown> = {
    from: opts.from || DEFAULT_FROM,
    to: Array.isArray(opts.to) ? opts.to : [opts.to],
    subject: opts.subject,
    html: opts.html,
    text: opts.text || htmlToText(opts.html),
  };

  if (opts.replyTo) payload.reply_to = opts.replyTo;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "FreedomInterventionsSupabase/1.0",
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();
  if (!response.ok) {
    console.error("Resend error:", response.status, responseText);
    throw new Error(`Failed to send email via Resend: ${response.status} - ${responseText}`);
  }

  try {
    const data = JSON.parse(responseText);
    return data.id || null;
  } catch {
    return null;
  }
}

export async function sendSystemEmail(opts: Omit<ResendEmailOptions, "from">): Promise<string | null> {
  return sendResendEmail({ ...opts, from: SYSTEM_FROM });
}
