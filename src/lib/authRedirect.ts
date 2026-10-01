// Captures the Supabase auth redirect type (invite / recovery) from the URL hash
// at boot. supabase-js (implicit flow) consumes and clears the hash during its
// async init, which can finish before lazily-loaded pages mount, so this module
// is imported first from main.tsx and read later by the page that needs it.

export type AuthRedirectType = "invite" | "recovery";

type CapturedAuthRedirect = {
  type: AuthRedirectType | null;
  errorDescription: string | null;
};

const capture = (): CapturedAuthRedirect => {
  if (typeof window === "undefined") return { type: null, errorDescription: null };
  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : "";
  if (!hash) return { type: null, errorDescription: null };
  const params = new URLSearchParams(hash);
  const rawType = params.get("type");
  const type =
    params.get("access_token") && (rawType === "invite" || rawType === "recovery")
      ? rawType
      : null;
  return { type, errorDescription: params.get("error_description") };
};

let captured: CapturedAuthRedirect = capture();

/** Returns the redirect captured at boot (if any). */
export const getAuthRedirect = (): CapturedAuthRedirect => captured;

/** Clears the captured redirect once it has been handled. */
export const clearAuthRedirect = () => {
  captured = { type: null, errorDescription: null };
};
