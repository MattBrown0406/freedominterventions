import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { GA_MEASUREMENT_ID, trackEvent } from "@/lib/analytics";
import { captureFunnelAttribution, getAnalyticsAttributionParams } from "@/lib/funnelAttribution";

const RouteAnalytics = () => {
  const location = useLocation();
  const hasTrackedInitialPage = useRef(false);

  useEffect(() => {
    if (/^\/(admin(?:-login)?|family-portal)(\/|$)/i.test(location.pathname)) return;
    captureFunnelAttribution();

    if (!hasTrackedInitialPage.current) {
      hasTrackedInitialPage.current = true;
      return;
    }

    const pagePath = `${location.pathname}${location.search}`;
    const pageLocation = window.location.href;

    // react-helmet (deferred) and lazily-loaded pages update document.title after
    // this effect runs, so wait for the title to settle before sending the view.
    let sent = false;
    let lastTitle = document.title;
    let quietTimer: ReturnType<typeof setTimeout> | undefined;

    const sendPageView = () => {
      if (sent) return;
      sent = true;
      observer.disconnect();
      clearTimeout(quietTimer);
      clearTimeout(maxTimer);
      window.removeEventListener("pagehide", sendPageView);

      if (typeof window.gtag === "function") {
        window.gtag("config", GA_MEASUREMENT_ID, {
          page_path: pagePath,
          page_location: pageLocation,
          page_title: lastTitle,
          ...getAnalyticsAttributionParams(),
        });
        return;
      }

      trackEvent("page_view", {
        page_path: pagePath,
        page_location: pageLocation,
        page_title: lastTitle,
      });
    };

    const observer = new MutationObserver(() => {
      if (document.title === lastTitle) return;
      lastTitle = document.title;
      // Route defaults and page-level SEO tags can each set a title; wait briefly for the last one.
      clearTimeout(quietTimer);
      quietTimer = setTimeout(sendPageView, 250);
    });
    observer.observe(document.head, { subtree: true, childList: true, characterData: true });
    const maxTimer = setTimeout(sendPageView, 1500);
    // Closing the tab / full-page navigation before the title settles still records the view.
    window.addEventListener("pagehide", sendPageView);

    // Navigating away before the title settles: send this view now (exactly once).
    return sendPageView;
  }, [location.pathname, location.search]);

  return null;
};

export default RouteAnalytics;
