import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
  "intervention_readiness_choice",
  "start_here_choice",
  "revenue_path_triage_click",
  "contact_message_sent",
  "cta_free_consult_click",
  "mobile_free_consult_click",
  "booking_type_selected",
  "booking_lead_captured",
  "consultation_booked",
  "checkout_started",
  "booking_payment_completed",
  "contract_signed",
]);

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

const cleanMetadata = (value: unknown) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
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
    const source = cleanText(metadata.source || metadata.utm_source || body.source, 120);

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

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
