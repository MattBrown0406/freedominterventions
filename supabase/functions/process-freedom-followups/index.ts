import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { escapeHtml, sendResendEmail } from "../_shared/resend.ts";
import { isServiceOrAdmin, unauthorized } from "../_shared/auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-automation-secret",
};

interface FollowupRow {
  id: string;
  lead_type: string;
  lead_id: string | null;
  contact_email: string;
  contact_name: string;
  recipient_type: "lead" | "owner";
  followup_reason: string;
  priority: string;
  due_at: string;
  subject: string;
  body_html: string;
  created_at: string;
}

function openPixel(followupId: string) {
  const baseUrl = Deno.env.get("SUPABASE_URL");
  if (!baseUrl) return "";
  const src = `${baseUrl}/functions/v1/track-followup-open?id=${encodeURIComponent(followupId)}`;
  return `<img src="${src}" alt="" width="1" height="1" style="display:block;width:1px;height:1px;border:0;opacity:0;" />`;
}

const SITE_URL = "https://freedominterventions.com";
// priority is a text column, so ORDER BY sorts alphabetically (urgent, normal, high); rank in code instead.
const PRIORITY_RANK: Record<string, number> = { urgent: 0, high: 1, normal: 2 };

function wrapEmail(body: string, trackingPixel = "", unsubscribeToken: string | null = null) {
  // Same link format as send-campaign / the /unsubscribe page.
  const unsubscribeLine = unsubscribeToken
    ? `<br><a href="${escapeHtml(`${SITE_URL}/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`)}" style="color:#6b7280;">Unsubscribe</a>`
    : "";
  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#1f2937;line-height:1.6;">
      ${body}
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0 14px;">
      <p style="font-size:12px;color:#6b7280;">
        Freedom Interventions · Matt Brown · <a href="tel:+14582988000" style="color:#1e40af;">458-298-8000</a>${unsubscribeLine}
      </p>
      ${trackingPixel}
    </div>
  `;
}

async function sendEmail(row: FollowupRow, unsubscribeToken: string | null) {
  const isOwner = row.recipient_type === "owner";
  const toEmail = isOwner ? "matt@freedominterventions.com" : row.contact_email;
  await sendResendEmail({
    to: toEmail,
    subject: row.subject,
    // Only track opens on emails going out to families, never on internal owner alerts.
    html: wrapEmail(row.body_html, isOwner ? "" : openPixel(row.id), isOwner ? null : unsubscribeToken),
    replyTo: "matt@freedominterventions.com",
  });
}

async function shouldSkipBecauseConverted(supabase: any, row: FollowupRow) {
  if (row.followup_reason === "assessment_confirmation" || row.followup_reason === "contact_message_confirmation") {
    return false;
  }

  if (row.followup_reason === "consultation_assessment_prompt") {
    const { data } = await supabase
      .from("assessments")
      .select("id")
      .eq("contact_email", row.contact_email)
      .gte("created_at", row.created_at)
      .limit(1);
    return Boolean(data?.length);
  }

  const [{ data: bookings }, { data: contracts }] = await Promise.all([
    supabase
      .from("bookings")
      .select("id")
      .eq("customer_email", row.contact_email)
      .gte("created_at", row.created_at)
      .limit(1),
    supabase
      .from("contracts")
      .select("id")
      .eq("client_email", row.contact_email)
      .gte("created_at", row.created_at)
      .limit(1),
  ]);

  return Boolean(bookings?.length || contracts?.length);
}

/** Lead has replied to any follow-up in this lead's sequence (or, without a lead_id, to this address). */
async function leadHasReplied(supabase: any, row: FollowupRow) {
  let query = supabase
    .from("freedom_followup_queue")
    .select("id")
    .not("replied_at", "is", null)
    .limit(1);
  query = row.lead_id
    ? query.eq("lead_type", row.lead_type).eq("lead_id", row.lead_id)
    : query.eq("contact_email", row.contact_email);
  const { data, error } = await query;
  if (error) throw new Error(`Reply check failed: ${error.message}`);
  return Boolean(data?.length);
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Fail closed: cron (service-role bearer and/or x-automation-secret) or a strict admin.
  if (!(await isServiceOrAdmin(req, "FOLLOWUP_AUTOMATION_SECRET"))) {
    return unauthorized(corsHeaders);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    let followupId: string | null = null;
    try {
      const body = await req.json();
      if (body && typeof body.followupId === "string") followupId = body.followupId;
    } catch (_) {
      // no body
    }

    let query = supabase
      .from("freedom_followup_queue")
      .select("*")
      .eq("status", "pending");

    if (followupId) {
      // Manual "send now": ignore the scheduled due date
      query = query.eq("id", followupId);
    } else {
      query = query.lte("due_at", new Date().toISOString());
    }

    const { data: candidates, error } = await query
      .order("due_at", { ascending: true })
      .limit(200);

    if (error) throw error;

    const rows = ((candidates || []) as FollowupRow[])
      .sort((a, b) =>
        (PRIORITY_RANK[a.priority] ?? 3) - (PRIORITY_RANK[b.priority] ?? 3) ||
        a.due_at.localeCompare(b.due_at)
      )
      .slice(0, 25);

    const results = { processed: 0, sent: 0, skipped: 0, failed: 0 };
    const skip = async (row: FollowupRow, reason: string) => {
      await supabase
        .from("freedom_followup_queue")
        .update({ status: "skipped", sent_at: null, error_message: reason })
        .eq("id", row.id);
      results.skipped++;
    };

    for (const row of rows) {
      // Atomically claim the row (pending -> done) so overlapping cron runs or a double-click
      // can't send it twice. On skip/failure the status is corrected below.
      const { data: claimed, error: claimError } = await supabase
        .from("freedom_followup_queue")
        .update({ status: "done", sent_at: new Date().toISOString(), error_message: null })
        .eq("id", row.id)
        .eq("status", "pending")
        .select("id");
      if (claimError) {
        console.error(`Follow-up ${row.id} claim failed:`, claimError.message);
        continue;
      }
      if (!claimed?.length) continue; // claimed by another run

      results.processed++;
      try {
        let unsubscribeToken: string | null = null;
        if (row.recipient_type !== "owner") {
          const { data: contact, error: contactError } = await supabase
            .from("crm_contacts")
            .select("unsubscribed, unsubscribe_token")
            .eq("email", row.contact_email.toLowerCase().trim())
            .maybeSingle();
          if (contactError) throw new Error(`Contact lookup failed: ${contactError.message}`);
          if (contact?.unsubscribed) {
            await skip(row, "Skipped because contact unsubscribed");
            continue;
          }
          unsubscribeToken = contact?.unsubscribe_token ?? null;

          if (await leadHasReplied(supabase, row)) {
            await skip(row, "Skipped because lead already replied");
            continue;
          }
        }

        if (await shouldSkipBecauseConverted(supabase, row)) {
          await skip(row, "Skipped because lead converted or completed the next step");
          continue;
        }

        await sendEmail(row, unsubscribeToken);
        results.sent++;
      } catch (sendError) {
        const message = sendError instanceof Error ? sendError.message : "Unknown follow-up error";
        console.error(`Follow-up ${row.id} failed:`, message);
        await supabase
          .from("freedom_followup_queue")
          .update({ status: "failed", sent_at: null, error_message: message })
          .eq("id", row.id);
        results.failed++;
      }
    }

    return new Response(JSON.stringify({ success: true, ...results }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("process-freedom-followups error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
