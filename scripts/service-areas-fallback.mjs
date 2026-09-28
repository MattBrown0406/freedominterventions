import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";

export const SERVICE_AREAS_ROUTE = "/service-areas";

// Render the actual existing directory; never maintain a second link/copy list.
// No effects, analytics or form submissions run during server rendering.
export async function renderServiceAreas(root) {
  const { createServer } = await import("vite");
  const server = await createServer({ root, server: { middlewareMode: true }, appType: "custom" });
  try {
    const { default: Page } = await server.ssrLoadModule("/src/pages/ServiceAreas.tsx");
    const rendered = renderToStaticMarkup(React.createElement(StaticRouter,
      { location: SERVICE_AREAS_ROUTE }, React.createElement(Page)));
    const mains = rendered.match(/<main\b[^>]*>[\s\S]*?<\/main>/g) ?? [];
    if (mains.length !== 1 || !mains[0].includes('id="service-areas-content"')) {
      throw new Error("Service-area main contract changed");
    }
    for (const route of ["/boise-idaho", "/alaska", "/minneapolis-minnesota"]) {
      if (!mains[0].includes(`href="${route}"`)) throw new Error(`Missing existing service-area link: ${route}`);
    }
    if (/\b(?:src|href)="\/(?:src|@fs|@vite)\//.test(mains[0])) {
      throw new Error("Service-area directory contains unresolved build assets");
    }
    return mains[0];
  } finally {
    await server.close();
  }
}

export function installServiceAreas(html, main) {
  if (!html.includes('<div id="root"></div>')) throw new Error("Expected empty client root");
  return html.replace('<div id="root"></div>', `<div id="root" data-initial-content="service-areas-v1">${main}</div>`)
    .replace(/(<body\b[^>]*>[\s\S]*?)<noscript>[\s\S]*?<\/noscript>/, "$1");
}
