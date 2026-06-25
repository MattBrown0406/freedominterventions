// Shared, durable rate limiting backed by public.check_rate_limit().
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
 * Returns true when allowed, false when over the limit.
 * Fails OPEN on any DB error so a transient issue never blocks a legitimate submission.
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
