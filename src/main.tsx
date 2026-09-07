import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// A fresh document isolates the guide from analytics/replay and application integrations.
const isNextStep = /^\/next-step\/*$/i.test(window.location.pathname);
const Page = lazy(() => isNextStep ? import("./pages/NextStep") : import("./App"));
if (!isNextStep) {
  void import("@/lib/analytics").then(({ initAnalytics }) => initAnalytics());
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<p role="status">Loading…</p>}><Page /></Suspense>
  </React.StrictMode>
);

document.dispatchEvent(new Event("render-event"));
