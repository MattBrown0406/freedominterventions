let scriptLoaded = false;

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const initAnalytics = () => {
  if (typeof window === "undefined" || scriptLoaded || !measurementId) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: true });

  scriptLoaded = true;
};

export const trackEvent = (action: string, params: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function" && measurementId) {
    window.gtag("event", action, params);
    return;
  }

  if (import.meta.env.DEV) {
    console.debug(`[analytics] ${action}`, params);
  }
};
