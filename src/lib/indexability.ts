const NOINDEX_ROUTES = new Set([
  "/404",
  "/admin",
  "/admin-login",
  "/after-consultation",
  "/assessment",
  "/booking",
  "/family-portal",
  "/intervention-agreement",
  "/reschedule",
  "/start-contract",
  "/unsubscribe",
]);

const NOINDEX_PREFIXES = ["/admin/"];

const normalizePath = (pathname: string) => {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
};

export function isNoIndexRoute(pathname: string): boolean {
  const normalized = normalizePath(pathname);
  return NOINDEX_ROUTES.has(normalized) || NOINDEX_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}
