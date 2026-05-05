import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { GA_MEASUREMENT_ID, trackEvent } from "@/lib/analytics";
import { captureFunnelAttribution, getAnalyticsAttributionParams } from "@/lib/funnelAttribution";

const RouteAnalytics = () => {
  const location = useLocation();
  const hasTrackedInitialPage = useRef(false);

  useEffect(() => {
    captureFunnelAttribution();

    if (!hasTrackedInitialPage.current) {
      hasTrackedInitialPage.current = true;
      return;
    }

    const pagePath = `${location.pathname}${location.search}`;
    const pageLocation = window.location.href;

    if (typeof window.gtag === "function") {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pagePath,
        page_location: pageLocation,
        page_title: document.title,
        ...getAnalyticsAttributionParams(),
      });
      return;
    }

    trackEvent("page_view", {
      page_path: pagePath,
      page_location: pageLocation,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  return null;
};

export default RouteAnalytics;
