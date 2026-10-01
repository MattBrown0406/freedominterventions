import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { checkRateLimit, getClientIp } from "../_shared/rateLimit.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const allowedEvents = new Set([
  "page_view",
  "phone_call_click",
  "intervention_answer_view",
  "intervention_answer_click",
  "intervention_answer_hub_click",
  "intervention_answer_cluster_click",
  "intervention_answer_service_link_click",
  "decision_path_choice",
  "lead_magnet_submit",
  "intervention_readiness_choice",
  "start_here_choice",
  "revenue_path_triage_click",
  "cta_money_path_click",
  "contact_message_sent",
  "cta_free_consult_click",
  "mobile_free_consult_click",
  "booking_type_selected",
  "booking_lead_captured",
  "consultation_booked",
  "checkout_started",
  "booking_payment_completed",
  "contract_signed",
  // Remaining trackEvent() names sent by src/
  "assessment_click",
  "assessment_submitted",
  "booking_details_validation_failed",
  "callback_request_submitted",
  "cta_book_call",
  "cta_call",
  "cta_view_testimonials",
  "nme_bridge_choice",
  "resource_click",
  "self_assessment_cta",
  "self_assessment_lead_captured",
  "self_assessment_results_viewed",
  "self_assessment_safety_continue",
  "self_assessment_safety_interstitial",
  "self_assessment_section_complete",
  "sober_helpline_bridge_choice",
  "whatsapp_click",
]);

const MAX_METADATA_BYTES = 4096;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const cleanText = (value: unknown, maxLength = 500) => {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  if (!cleaned) return null;
  return cleaned.slice(0, maxLength);
};

const cleanMetadata = (value: unknown): Record<string, unknown> | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  // Reject oversized blobs rather than storing arbitrary payloads.
  if (new TextEncoder().encode(JSON.stringify(value)).length > MAX_METADATA_BYTES) return null;
  return value as Record<string, unknown>;
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceKey) throw new Error("Supabase environment is not configured");

    const body = await req.json().catch(() => ({}));
    const eventName = cleanText(body.event_name, 120);
    if (!eventName || !allowedEvents.has(eventName)) {
      return json({ error: "Unsupported event" }, 400);
    }

    const metadata = cleanMetadata(body.metadata);
    if (metadata === null) {
      return json({ error: "Metadata too large" }, 413);
    }
    const source = cleanText(metadata.source || metadata.utm_source || body.source, 120);

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Generous per-IP cap: real visitors fire a handful of events per page.
    const allowed = await checkRateLimit(supabase, `track-event:${getClientIp(req)}`, 300, 3600);
    if (!allowed) {
      return json({ error: "Too many events" }, 429);
    }

    const { error } = await supabase.from("freedom_funnel_events").insert({
      event_name: eventName,
      page_path: cleanText(body.page_path || metadata.page_path, 300),
      page_title: cleanText(body.page_title, 300),
      referrer: cleanText(body.referrer || metadata.referrer, 800),
      source,
      target_href: cleanText(body.target_href || metadata.target_href, 500),
      metadata,
    });

    if (error) throw error;

    return json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown tracking error";
    console.error("track-freedom-event error:", message);
    return json({ error: message }, 500);
  }
});
