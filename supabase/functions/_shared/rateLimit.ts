// Shared, durable rate limiting backed by the public.check_rate_limit() Postgres
// function (see migration 20260624000000_add_durable_rate_limiting.sql).
//
// Unlike a per-instance in-memory Map(), this is shared across all concurrently
// running Edge Function instances and survives cold starts.
import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

/** Best-effort client IP from common proxy headers. */
export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Returns true when the request is allowed, false when the limit is exceeded.
 *
 * Fails OPEN (returns true) on any database error so a transient DB issue never
 * blocks a legitimate booking / payment / assessment submission.
 *
 * @param key            unique bucket key, e.g. `contact:${ip}`
 * @param maxHits        max requests allowed within the window
 * @param windowSeconds  rolling window length in seconds
 */
export async function checkRateLimit(
  supabase: SupabaseClient,
  key: string,
  maxHits: number,
  windowSeconds: number,
): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc("check_rate_limit", {
      p_key: key,
      p_max_hits: maxHits,
      p_window_seconds: windowSeconds,
    });
    if (error) {
      console.error("check_rate_limit RPC error (failing open):", error.message);
      return true;
    }
    return data === true;
  } catch (err) {
    console.error("check_rate_limit threw (failing open):", err);
    return true;
  }
}
