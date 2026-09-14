
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";

// Deliberately one public pilot. Render the reviewed component, not a second
// hand-maintained copy of its health prose. Effects/forms are never executed.
export const FULL_GUIDE_ROUTE = "/intervention-toolkit";
export async function renderFullGuide(root) {
  const { createServer } = await import("vite");
  const server = await createServer({ root, server: { middlewareMode: true }, appType: "custom" });
  try {
    const { default: Guide } = await server.ssrLoadModule("/src/pages/InterventionToolkit.tsx");
    const rendered = renderToStaticMarkup(React.createElement(StaticRouter,
      { location: FULL_GUIDE_ROUTE }, React.createElement(Guide)));
    const mains = rendered.match(/<main\b[^>]*>[\s\S]*?<\/main>/g) ?? [];
    if (mains.length !== 1 || !mains[0].includes("Section 9: Preparing for the Next Step")) {
      throw new Error("Full guide source contract changed: expected complete planning main");
    }
    // The main currently has no imported images. Fail rather than publish Vite
    // development asset paths if that changes; navigation/footer stay client-owned.
    if (/\b(?:src|href)="\/(?:src|@fs|@vite)\//.test(mains[0])) {
      throw new Error("Guide contains an unresolved build asset");
    }
    return mains[0];
  } finally {
    await server.close();
  }
}

export function installFullGuide(html, main) {
  if (!html.includes('<div id="root"></div>')) throw new Error("Expected empty client root before full guide generation");
  return html.replace('<div id="root"></div>', `<div id="root" data-initial-content="full-guide-v1">${main}</div>`)
    .replace(/<noscript>[\s\S]*?<\/noscript>/g, "");
}

// Full browser output must not retain the old second, summary-only article.
export function removePilotSummary(html, route) {
  return [FULL_GUIDE_ROUTE, "/interventionist"].includes(route)
    ? html.replace(/<noscript>[\s\S]*?<\/noscript>/g, "") : html;
}
