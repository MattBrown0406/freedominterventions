let scriptLoaded = false;

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-WCT7G4VSJP";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const initAnalytics = () => {
  if (typeof window === "undefined" || scriptLoaded) {
    return;
  }

  if (typeof window.gtag === "function") {
    scriptLoaded = true;
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: true });

  scriptLoaded = true;
};

export const trackEvent = (action: string, params: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", action, params);
    return;
  }

  if (import.meta.env.DEV) {
    console.debug(`[analytics] ${action}`, params);
  }
};
