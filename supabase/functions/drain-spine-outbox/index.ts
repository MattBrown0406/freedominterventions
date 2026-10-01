import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { isServiceOrAdmin, unauthorized } from "../_shared/auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_ATTEMPTS = 6;
const BATCH_SIZE = 50;
// A row stuck in 'sending' longer than this (crashed run) becomes claimable again.
const STALE_CLAIM_MS = 15 * 60 * 1000;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (!(await isServiceOrAdmin(req))) return unauthorized(corsHeaders);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const hubUrl = Deno.env.get("HUB_INGEST_URL");
  const hubKey = Deno.env.get("HUB_INGEST_KEY");

  if (!supabaseUrl || !serviceKey) {
    return new Response(JSON.stringify({ error: "Supabase env missing" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (!hubUrl || !hubKey) {
    return new Response(JSON.stringify({ error: "HUB_INGEST_URL / HUB_INGEST_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  // Fetch pending, retryable-failed, or stale-claimed rows. While a row is 'sending',
  // sent_at holds the claim time.
  const staleBefore = new Date(Date.now() - STALE_CLAIM_MS).toISOString();
  const { data: rows, error: fetchError } = await supabase
    .from("spine_outbox")
    .select("id, event_name, payload, status, attempts")
    .or(
      `status.eq.pending,and(status.eq.failed,attempts.lt.${MAX_ATTEMPTS}),` +
        `and(status.eq.sending,attempts.lt.${MAX_ATTEMPTS},sent_at.lt."${staleBefore}")`,
    )
    .order("created_at", { ascending: true })
    .limit(BATCH_SIZE);

  if (fetchError) {
    return new Response(JSON.stringify({ error: fetchError.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const results = { processed: 0, sent: 0, failed: 0 };

  for (const row of rows ?? []) {
    // Atomically claim the row so overlapping runs never post the same event twice:
    // only the run whose conditional update matches (unchanged status + attempts) proceeds.
    const attempts = (row.attempts ?? 0) + 1;
    const { data: claimed, error: claimError } = await supabase
      .from("spine_outbox")
      .update({ status: "sending", attempts, sent_at: new Date().toISOString() })
      .eq("id", row.id)
      .eq("status", row.status)
      .eq("attempts", row.attempts ?? 0)
      .select("id");
    if (claimError) {
      console.error("spine_outbox claim failed:", claimError.message);
      continue;
    }
    if (!claimed || claimed.length === 0) continue; // another run took it

    results.processed++;
    try {
      const resp = await fetch(hubUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${hubKey}`,
        },
        body: JSON.stringify({
          event: row.event_name,
          ...row.payload,
        }),
      });

      if (resp.ok) {
        await supabase
          .from("spine_outbox")
          .update({
            status: "sent",
            sent_at: new Date().toISOString(),
            last_error: null,
          })
          .eq("id", row.id);
        results.sent++;
      } else {
        const text = await resp.text().catch(() => "");
        await supabase
          .from("spine_outbox")
          .update({
            status: "failed",
            sent_at: null,
            last_error: `HTTP ${resp.status}: ${text.slice(0, 500)}`,
          })
          .eq("id", row.id);
        results.failed++;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      await supabase
        .from("spine_outbox")
        .update({
          status: "failed",
          sent_at: null,
          last_error: message.slice(0, 500),
        })
        .eq("id", row.id);
      results.failed++;
    }
  }

  return new Response(JSON.stringify({ success: true, ...results }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
