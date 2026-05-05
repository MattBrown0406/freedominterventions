export interface FunnelAttribution {
  session_id: string;
  source: string;
  source_detail: string | null;
  first_landing_page: string;
  first_landing_url: string;
  first_referrer: string | null;
  first_touch_at: string;
  landing_page: string;
  current_url: string;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;
  last_touch_at: string;
}

const ATTRIBUTION_KEY = "freedom_funnel_attribution";
const SESSION_KEY = "freedom_funnel_session_id";

const isBrowser = () => typeof window !== "undefined";

const safeStorageGet = (storage: Storage, key: string) => {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
};

const safeStorageSet = (storage: Storage, key: string, value: string) => {
  try {
    storage.setItem(key, value);
  } catch {
    // Attribution should never block a family from getting help.
  }
};

const readStoredAttribution = (): FunnelAttribution | null => {
  if (!isBrowser()) return null;
  const raw = safeStorageGet(window.localStorage, ATTRIBUTION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as FunnelAttribution;
  } catch {
    return null;
  }
};

const getSessionId = () => {
  if (!isBrowser()) return "server";
  const stored = safeStorageGet(window.sessionStorage, SESSION_KEY);
  if (stored) return stored;

  const next = crypto.randomUUID();
  safeStorageSet(window.sessionStorage, SESSION_KEY, next);
  return next;
};

const getParam = (params: URLSearchParams, key: string) => {
  const value = params.get(key);
  return value && value.trim().length > 0 ? value.trim().slice(0, 200) : null;
};

const sourceFromKnownPath = (pathname: string) => {
  if (pathname === "/from-sober-helpline") return "sober_helpline";
  if (pathname === "/from-no-more-enabling") return "no_more_enabling";
  return null;
};

const sourceFromReferrer = (referrer: string | null) => {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (host.includes("soberhelpline.com")) return "sober_helpline";
    if (host.includes("nomoreenabling.com")) return "no_more_enabling";
    if (host.includes("familybridgeapp.com")) return "family_bridge";
    if (host.includes("partywreckers.com")) return "party_wreckers";
    if (host.includes("google.")) return "organic_google";
    if (host.includes("bing.")) return "organic_bing";
    if (host.includes("facebook.") || host.includes("instagram.")) return "social_meta";
    return "referral";
  } catch {
    return "referral";
  }
};

const resolveSource = (params: URLSearchParams, pathname: string, referrer: string | null, stored: FunnelAttribution | null) => {
  const explicitSource = getParam(params, "source") || getParam(params, "utm_source");
  if (explicitSource) return explicitSource;

  const pathSource = sourceFromKnownPath(pathname);
  if (pathSource) return pathSource;

  const referrerSource = sourceFromReferrer(referrer);
  if (referrerSource) return referrerSource;

  return stored?.source || "direct";
};

export const captureFunnelAttribution = (): FunnelAttribution | null => {
  if (!isBrowser()) return null;

  const stored = readStoredAttribution();
  const params = new URLSearchParams(window.location.search);
  const now = new Date().toISOString();
  const referrer = document.referrer || null;
  const source = resolveSource(params, window.location.pathname, referrer, stored);
  const attribution: FunnelAttribution = {
    session_id: getSessionId(),
    source,
    source_detail: sourceFromKnownPath(window.location.pathname) || sourceFromReferrer(referrer),
    first_landing_page: stored?.first_landing_page || window.location.pathname,
    first_landing_url: stored?.first_landing_url || window.location.href,
    first_referrer: stored?.first_referrer || referrer,
    first_touch_at: stored?.first_touch_at || now,
    landing_page: window.location.pathname,
    current_url: window.location.href,
    referrer,
    utm_source: getParam(params, "utm_source") || stored?.utm_source || null,
    utm_medium: getParam(params, "utm_medium") || stored?.utm_medium || null,
    utm_campaign: getParam(params, "utm_campaign") || stored?.utm_campaign || null,
    utm_content: getParam(params, "utm_content") || stored?.utm_content || null,
    utm_term: getParam(params, "utm_term") || stored?.utm_term || null,
    gclid: getParam(params, "gclid") || stored?.gclid || null,
    fbclid: getParam(params, "fbclid") || stored?.fbclid || null,
    last_touch_at: now,
  };

  safeStorageSet(window.localStorage, ATTRIBUTION_KEY, JSON.stringify(attribution));
  return attribution;
};

export const getFunnelAttribution = (): FunnelAttribution | null => {
  return captureFunnelAttribution() || readStoredAttribution();
};

export const getAnalyticsAttributionParams = () => {
  const attribution = getFunnelAttribution();
  if (!attribution) return {};

  return {
    attribution_source: attribution.source,
    attribution_session_id: attribution.session_id,
    attribution_landing_page: attribution.first_landing_page,
    attribution_current_page: attribution.landing_page,
    utm_source: attribution.utm_source || undefined,
    utm_medium: attribution.utm_medium || undefined,
    utm_campaign: attribution.utm_campaign || undefined,
  };
};
