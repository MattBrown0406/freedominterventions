import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { installServiceAreas } from "./service-areas-fallback.mjs";

const locations = await readFile("src/data/locations.ts", "utf8");
const app = await readFile("src/App.tsx", "utf8");
const routes = [...locations.matchAll(/slug:\s*"([^"]+)"/g)].map(match => `/${match[1]}`);
assert.ok(routes.length > 0, "location data contract changed");
for (const file of ["dist/service-areas/index.html", "dist/service-areas.html"]) {
  const html = await readFile(file, "utf8");
  assert.match(html, /data-initial-content="service-areas-v1"/);
  assert.equal((html.match(/<main\b/g) ?? []).length, 1);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.doesNotMatch(html.split(/<body\b/)[1], /<noscript>/);
  assert.equal((html.match(/<title\b/g) ?? []).length, 1);
  assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1);
  assert.match(html, /rel="canonical" href="https:\/\/freedominterventions.com\/service-areas"/);
  assert.doesNotMatch(html, /content="noindex/);
  for (const route of routes) {
    assert.ok(app.includes(`path="${route}"`), `missing destination route ${route}`);
    assert.ok(html.includes(`href="${route}"`), `missing ${route} in ${file}`);
  }
  for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
}
assert.throws(() => installServiceAreas("invalid", "<main/>"), /empty client root/);
assert.equal(installServiceAreas('<head><noscript>font</noscript></head><body><div id="root"></div><noscript>old</noscript></body>', '<main>directory</main>'), '<head><noscript>font</noscript></head><body><div id="root" data-initial-content="service-areas-v1"><main>directory</main></div></body>');
console.log("PASS service-area raw discovery, single main/H1/head, canonical/indexability/schema, fail-closed installer");
