// Owner alerts for booking/payment problems a family is waiting on (paid but not
// confirmed, payment not matched, checkout link failed). Telegram (same bot/chat
// as crisis-assessment alerts) plus an email to Matt.
//
// Never throws and never blocks the caller's own work. Each `key` alerts at most
// once per ALERT_WINDOW_SECONDS so Square webhook retries don't repeat it; the
// dedupe fails open (sends) if the rate-limit check itself errors.
import { escapeHtml, sendSystemEmail } from "./resend.ts";
import { checkRateLimit } from "./rateLimit.ts";

const OWNER_EMAIL = "matt@freedominterventions.com";
const DEFAULT_TELEGRAM_CHAT_ID = "7932321341";
const ALERT_WINDOW_SECONDS = 6 * 60 * 60;
const SEND_TIMEOUT_MS = 5000;

export type OwnerAlert = {
  /** Stable identity of the problem, e.g. `webhook-fulfill:<orderId>`. */
  key: string;
  /** One line: what went wrong. */
  subject: string;
  /** Facts Matt needs to act (ids, amounts, contact). No client notes or health data. */
  details: Record<string, unknown>;
  /** What to do about it. */
  action?: string;
};

const withTimeout = <T,>(promise: Promise<T>): Promise<T> =>
  Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("owner alert timeout")), SEND_TIMEOUT_MS)),
  ]);

export async function sendOwnerAlert(supabase: unknown, alert: OwnerAlert): Promise<void> {
  try {
    const allowed = await checkRateLimit(supabase, `owner-alert:${alert.key}`, 1, ALERT_WINDOW_SECONDS);
    if (!allowed) {
      console.warn("Owner alert suppressed (already sent recently):", alert.key);
      return;
    }

    const entries = Object.entries(alert.details).filter(([, value]) => value !== undefined && value !== null && value !== "");
    const text = [
      `⚠️ ${alert.subject}`,
      ...entries.map(([label, value]) => `${label}: ${String(value)}`),
      alert.action ? `\nWhat to do: ${alert.action}` : "",
    ].filter(Boolean).join("\n");

    const tasks: Promise<unknown>[] = [];

    const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    if (botToken) {
      const chatId = Deno.env.get("TELEGRAM_CHAT_ID") || DEFAULT_TELEGRAM_CHAT_ID;
      tasks.push(withTimeout(
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
        }).then(async (response) => {
          if (!response.ok) throw new Error(`Telegram ${response.status}: ${await response.text()}`);
        }),
      ));
    }

    const html = `
      <h2>${escapeHtml(alert.subject)}</h2>
      <table cellpadding="4">${entries.map(([label, value]) =>
        `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(String(value))}</td></tr>`).join("")}</table>
      ${alert.action ? `<p><strong>What to do:</strong> ${escapeHtml(alert.action)}</p>` : ""}
      <p style="color:#666;font-size:12px">Automatic alert from freedominterventions.com. Repeats of this alert are suppressed for 6 hours.</p>
    `;
    tasks.push(withTimeout(sendSystemEmail({ to: OWNER_EMAIL, subject: `[Action needed] ${alert.subject}`, html })));

    const results = await Promise.allSettled(tasks);
    for (const result of results) {
      if (result.status === "rejected") console.error("Owner alert channel failed:", alert.key, result.reason);
    }
  } catch (error) {
    console.error("Owner alert failed:", alert.key, error);
  }
}
