// Issues a one-time signed upload URL for an insurance card image.
// The server picks the object path, so clients can't write anywhere else in the bucket.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { checkRateLimit, getClientIp } from "../_shared/rateLimit.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const EXTS = ["jpg", "jpeg", "png", "webp", "pdf"];

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  try {
    const body = await req.json().catch(() => ({}));
    const side = body?.side;
    const ext = String(body?.ext || "").toLowerCase();
    if ((side !== "front" && side !== "back") || !EXTS.includes(ext)) {
      return json({ error: "Invalid request" }, 400);
    }
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const allowed = await checkRateLimit(supabase, `insurance-upload:${getClientIp(req)}`, 10, 600);
    if (!allowed) return json({ error: "Too many uploads. Please try again later." }, 429);

    const path = `uploads/${crypto.randomUUID()}-${side}.${ext}`;
    const { data, error } = await supabase.storage.from("insurance-cards").createSignedUploadUrl(path);
    if (error || !data) {
      console.error("createSignedUploadUrl failed:", error?.message);
      return json({ error: "Could not prepare upload" }, 500);
    }
    return json({ path: data.path, token: data.token });
  } catch (e) {
    console.error("insurance-card-upload-url error:", e);
    return json({ error: "Could not prepare upload" }, 500);
  }
});
