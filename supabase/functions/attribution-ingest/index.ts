import { createClient } from "https://esm.sh/@supabase/supabase-js@2.90.1";

// Machine-to-machine only. No browser CORS, no raw webhook payloads, no call-path dependency.
export async function authenticate(
  body: string,
  stamp: string,
  signature: string,
  secret: string,
  now = Date.now(),
): Promise<boolean> {
  if (
    !secret ||
    !/^\d{10}$/.test(stamp) ||
    Math.abs(now / 1000 - Number(stamp)) > 300 ||
    !/^[0-9a-f]{64}$/.test(signature)
  )
    return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  const bytes = Uint8Array.from(signature.match(/../g)!, (x) =>
    parseInt(x, 16),
  );
  return await crypto.subtle.verify(
    "HMAC",
    key,
    bytes,
    new TextEncoder().encode(`${stamp}.${body}`),
  );
}

export async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST")
    return new Response("Method not allowed", { status: 405 });
  const secret = Deno.env.get("ATTRIBUTION_INGEST_SECRET") ?? "";
  if (!secret) return new Response("Feed not configured", { status: 503 });
  if (Number(req.headers.get("content-length")) > 400000)
    return new Response("Too large", { status: 413 });
  const reader = req.body?.getReader();
  if (!reader) return new Response("Missing body", { status: 400 });
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.length;
    if (length > 400000) {
      await reader.cancel();
      return new Response("Too large", { status: 413 });
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let at = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, at);
    at += chunk.length;
  }
  const body = new TextDecoder().decode(bytes);
  if (
    !(await authenticate(
      body,
      req.headers.get("x-attribution-timestamp") ?? "",
      req.headers.get("x-attribution-signature") ?? "",
      secret,
    ))
  )
    return new Response("Unauthorized", { status: 401 });
  let p;
  try {
    p = JSON.parse(body);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }
  if (
    !p ||
    Array.isArray(p) ||
    Object.keys(p).sort().join(",") !==
      "end,feed,observed,rows,site,start,status"
  )
    return new Response("Invalid schema", { status: 400 });
  const db = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );
  const { data, error } = await db.rpc("ingest_attribution_snapshot", {
    p_feed: p.feed,
    p_site: p.site,
    p_status: p.status,
    p_start: p.start,
    p_end: p.end,
    p_observed: p.observed,
    p_rows: p.rows,
  });
  // Never log payloads, authorization, provider responses, or arbitrary database error details.
  if (error) return new Response("Snapshot rejected", { status: 400 });
  return Response.json({
    accepted: data === true,
    duplicate_or_older: data === false,
  });
}
if (import.meta.main) Deno.serve(handler);
