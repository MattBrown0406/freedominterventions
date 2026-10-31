import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { isServiceOrAdmin } from "../_shared/auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-automation-secret",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    if (!(await isServiceOrAdmin(req, "FOLLOWUP_AUTOMATION_SECRET"))) {
      return json({ error: "Unauthorized" }, 401);
    }

    const body = await req.json().catch(() => ({}));
    const followupId = typeof body?.followupId === "string" ? body.followupId : null;
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : null;
    const snippet = typeof body?.snippet === "string" ? body.snippet.slice(0, 500) : null;
    const repliedAt = new Date().toISOString();

    if (!followupId && !email) {
      return json({ error: "followupId or email is required" }, 400);
    }

    let updated: { id: string }[] | null = null;

    if (followupId) {
      const { data, error } = await supabase
        .from("freedom_followup_queue")
        .update({ replied_at: repliedAt, reply_snippet: snippet })
        .eq("id", followupId)
        .select("id");
      if (error) throw error;
      updated = data;
    } else {
      // Attribute the reply to the most recent email actually sent to this address.
      const { data: latest, error: findError } = await supabase
        .from("freedom_followup_queue")
        .select("id")
        // Case-insensitive exact match: escape LIKE wildcards (`_`, `%`) so
        // a_b@x.com cannot match axb@x.com.
        .ilike("contact_email", email!.replace(/[\\%_]/g, "\\$&"))
        .not("sent_at", "is", null)
        .order("sent_at", { ascending: false })
        .limit(1);
      if (findError) throw findError;
      if (!latest?.length) return json({ success: false, matched: 0, reason: "No sent follow-up for that address" });

      const { data, error } = await supabase
        .from("freedom_followup_queue")
        .update({ replied_at: repliedAt, reply_snippet: snippet })
        .eq("id", latest[0].id)
        .select("id");
      if (error) throw error;
      updated = data;
    }

    return json({ success: true, matched: updated?.length ?? 0, replied_at: repliedAt });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("log-followup-reply error:", message);
    return json({ error: message }, 500);
  }
});
