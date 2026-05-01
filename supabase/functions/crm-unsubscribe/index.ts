import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "GET" && req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(supabaseUrl, serviceRoleKey);
  const url = new URL(req.url);
  let token = url.searchParams.get("token") || "";

  if (req.method === "POST") {
    const body = await req.json().catch(() => ({}));
    token = String(body.token || token);
  }

  if (!/^[0-9a-f-]{36}$/i.test(token)) return json({ error: "Invalid unsubscribe token" }, 400);

  const { data: contact, error } = await admin
    .from("crm_contacts")
    .select("id, email, unsubscribed")
    .eq("unsubscribe_token", token)
    .maybeSingle();
  if (error || !contact) return json({ error: "Unsubscribe link not found" }, 404);

  if (req.method === "GET") {
    return json({ email: contact.email, alreadyUnsubscribed: contact.unsubscribed });
  }

  if (!contact.unsubscribed) {
    const { error: updateError } = await admin
      .from("crm_contacts")
      .update({ unsubscribed: true, unsubscribed_at: new Date().toISOString() })
      .eq("id", contact.id);
    if (updateError) return json({ error: "Failed to unsubscribe" }, 500);
  }

  return json({ success: true, email: contact.email });
});
