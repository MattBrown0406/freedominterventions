// Shared authorization helpers for Edge Functions.
//
// Many functions are deployed with verify_jwt = false (or accept the public anon
// key), so each privileged function must authorize the caller itself. These
// helpers FAIL CLOSED: a missing env var or unparseable token denies access.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function bearerToken(req: Request): string {
  return (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "").trim();
}

export function timingSafeEqual(a: string, b: string): boolean {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function jwtRole(token: string): string | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const json = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
    return (JSON.parse(json)?.role as string) ?? null;
  } catch {
    return null;
  }
}

/**
 * True when the caller presented a service-role credential: either the exact
 * SUPABASE_SERVICE_ROLE_KEY this function sees, or another service-role/secret
 * key (e.g. the copy pg_cron reads from Vault) that Supabase Auth accepts for an
 * admin-only call. Anon keys and user JWTs are rejected without a network call.
 */
export async function isServiceRoleRequest(req: Request): Promise<boolean> {
  const token = bearerToken(req);
  if (!token) return false;

  const envKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  if (timingSafeEqual(token, envKey)) return true;

  const looksPrivileged = token.startsWith("sb_secret_") || jwtRole(token) === "service_role";
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  if (!looksPrivileged || !supabaseUrl) return false;

  try {
    const client = createClient(supabaseUrl, token, { auth: { persistSession: false } });
    const { error } = await client.auth.admin.listUsers({ page: 1, perPage: 1 });
    return !error;
  } catch {
    return false;
  }
}

/** True when the caller is a signed-in user for whom is_strict_admin() is true. */
export async function isStrictAdminRequest(req: Request): Promise<boolean> {
  const token = bearerToken(req);
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!token || !supabaseUrl || !anonKey) return false;
  try {
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false },
    });
    const { data: userData, error: userError } = await userClient.auth.getUser(token);
    if (userError || !userData?.user) return false;
    const { data, error } = await userClient.rpc("is_strict_admin");
    return !error && data === true;
  } catch {
    return false;
  }
}

/** True when header `x-automation-secret` matches the named env secret. Unset secret => false. */
export function hasAutomationSecret(req: Request, envName: string): boolean {
  const expected = Deno.env.get(envName) ?? "";
  return timingSafeEqual(req.headers.get("x-automation-secret") ?? "", expected);
}

/** Service role, matching automation secret (optional), or strict admin. */
export async function isServiceOrAdmin(req: Request, secretEnvName?: string): Promise<boolean> {
  if (secretEnvName && hasAutomationSecret(req, secretEnvName)) return true;
  if (await isServiceRoleRequest(req)) return true;
  return await isStrictAdminRequest(req);
}

export function unauthorized(corsHeaders: Record<string, string>): Response {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
