import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// Must run before any module loads the Supabase client (which clears the URL hash).
import "@/lib/authRedirect";

const container = document.getElementById("root")!;

// A fresh document isolates the guide from analytics/replay and application integrations.
const isNextStep = /^\/next-step\/*$/i.test(window.location.pathname);

// Only show a placeholder when there is no pre-rendered page content; never
// replace real content with "Loading…" while the app downloads.
if (!container.textContent?.trim()) {
  container.innerHTML = '<p role="status">Loading…</p>';
}

// Keep separate dynamic-import call sites so Vite assigns the correct
// CSS/dependency preload list to each branch instead of reusing the normal app's list.
const loadPage: Promise<React.ComponentType> = isNextStep
  ? import("./pages/NextStep").then((module) => module.default)
  : import("./App").then(async (module) => {
      // Load the current route's page chunk before the first render so the page
      // appears in one step instead of App -> "Loading..." -> page.
      await module.preloadRoute(window.location.pathname);
      return module.default;
    });

if (!isNextStep) {
  void import("@/lib/analytics").then(({ initAnalytics }) => initAnalytics());
}

loadPage.then(
  (Page) => {
    createRoot(container).render(
      <React.StrictMode>
        <Page />
      </React.StrictMode>
    );
    document.dispatchEvent(new Event("render-event"));
  },
  (error) => {
    // A failed chunk download (flaky mobile network, stale deploy) would leave a
    // blank page; give the family a way forward instead.
    console.error("App failed to load:", error);
    container.innerHTML =
      '<div role="alert" style="max-width:32rem;margin:15vh auto;padding:1.5rem;font-family:system-ui,sans-serif;text-align:center;line-height:1.5">' +
      '<p style="font-size:1.125rem;font-weight:600">This page didn\'t finish loading.</p>' +
      '<p><a href="">Reload the page</a> or call Matt directly at ' +
      '<a href="tel:+14582988000">(458) 298-8000</a>.</p></div>';
  }
);
