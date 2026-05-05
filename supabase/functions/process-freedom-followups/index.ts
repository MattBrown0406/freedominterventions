import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
  subject: string;
  body_html: string;
  created_at: string;
}

function wrapEmail(body: string) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#1f2937;line-height:1.6;">
      ${body}
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0 14px;">
      <p style="font-size:12px;color:#6b7280;">
        Freedom Interventions · Matt Brown · <a href="tel:5418386009" style="color:#1e40af;">541-838-6009</a>
      </p>
    </div>
  `;
}

async function sendEmail(row: FollowupRow) {
  const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
  if (!sendgridApiKey) throw new Error("SENDGRID_API_KEY not configured");

  const toEmail = row.recipient_type === "owner" ? "matt@freedominterventions.com" : row.contact_email;
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sendgridApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: toEmail }] }],
      from: { email: "matt@freedominterventions.com", name: "Matt Brown — Freedom Interventions" },
      reply_to: { email: "matt@freedominterventions.com", name: "Matt Brown" },
      subject: row.subject,
      content: [{ type: "text/html", value: wrapEmail(row.body_html) }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`SendGrid failed: ${response.status} - ${errorText}`);
  }
}

async function shouldSkipBecauseConverted(supabase: ReturnType<typeof createClient>, row: FollowupRow) {
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

async function isAdminRequest(req: Request, supabase: ReturnType<typeof createClient>) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) return false;

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  const userId = userData?.user?.id;
  if (userError || !userId) return false;

  const { data: role } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  return Boolean(role);
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const expectedSecret = Deno.env.get("FOLLOWUP_AUTOMATION_SECRET");
    if (expectedSecret && req.headers.get("x-automation-secret") !== expectedSecret) {
      const admin = await isAdminRequest(req, supabase);
      if (!admin) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const { data: rows, error } = await supabase
      .from("freedom_followup_queue")
      .select("*")
      .eq("status", "pending")
      .lte("due_at", new Date().toISOString())
      .order("priority", { ascending: false })
      .order("due_at", { ascending: true })
      .limit(25);

    if (error) throw error;

    const results = { processed: 0, sent: 0, skipped: 0, failed: 0 };

    for (const row of (rows || []) as FollowupRow[]) {
      results.processed++;
      try {
        if (await shouldSkipBecauseConverted(supabase, row)) {
          await supabase
            .from("freedom_followup_queue")
            .update({ status: "skipped", error_message: "Skipped because lead converted or completed the next step" })
            .eq("id", row.id);
          results.skipped++;
          continue;
        }

        await sendEmail(row);
        await supabase
          .from("freedom_followup_queue")
          .update({ status: "sent", sent_at: new Date().toISOString(), error_message: null })
          .eq("id", row.id);
        results.sent++;
      } catch (sendError) {
        const message = sendError instanceof Error ? sendError.message : "Unknown follow-up error";
        console.error(`Follow-up ${row.id} failed:`, message);
        await supabase
          .from("freedom_followup_queue")
          .update({ status: "failed", error_message: message })
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
