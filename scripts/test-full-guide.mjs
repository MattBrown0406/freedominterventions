import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { chromium } from "playwright";
import { installFullGuide, removePilotSummary } from "./full-guide-fallback.mjs";

const artifact = process.argv[2] || "dist/intervention-toolkit.html";
const html = await readFile(artifact, "utf8");
const browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROME_PATH });
try {
  const context = await browser.newContext({ javaScriptEnabled: false });
  await context.route("**/*", route => route.abort());
  const page = await context.newPage();
  await page.setContent(html);
  const actual = await page.evaluate(() => {
    const main = document.querySelector("main");
    const normalize = s => s.replace(/\s+/g, " ").trim();
    const nodes = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).flatMap(s => {
      const data = JSON.parse(s.textContent); return data["@graph"] || [data];
    });
    return {
      mainCount: document.querySelectorAll("main").length,
      h1: Array.from(document.querySelectorAll("h1")).map(e => normalize(e.textContent)),
      h2: Array.from(document.querySelectorAll("main h2")).map(e => normalize(e.textContent)),
      text: normalize(main?.textContent || ""),
      links: Array.from(document.querySelectorAll("main a[href]")).map(e => e.getAttribute("href")),
      canonical: Array.from(document.querySelectorAll('link[rel="canonical"]')).map(e => e.getAttribute("href")),
      noscripts: document.querySelectorAll("noscript").length,
      organizations: nodes.filter(n => [].concat(n["@type"]).includes("Organization")),
    };
  });
  assert.equal(actual.mainCount, 1);
  assert.deepEqual(actual.h1, ["The Family Intervention Planning Guide"]);
  for (let i = 1; i <= 9; i++) assert.equal(actual.h2.filter(h => h.startsWith(`Section ${i}:`)).length, 1);
  assert(actual.text.includes("This toolkit does not replace professional intervention."));
  assert(actual.text.includes("High-risk situations require professional coordination, not improvisation."));
  assert(actual.text.includes("You are not required to sacrifice your safety or integrity to prove love."));
  for (const href of ["/family-intervention", "/contact"]) assert(actual.links.includes(href));
  assert.deepEqual(actual.canonical, ["https://freedominterventions.com/intervention-toolkit"]);
  assert.equal(actual.noscripts, 0);
  assert.equal(actual.organizations.length, 1);
  assert.equal(actual.organizations[0]["@id"], "https://freedominterventions.com/#organization");
  assert.equal(actual.organizations[0].sameAs, undefined);
  const fixture = '<div id="root"></div><noscript>old summary</noscript>';
  assert(!installFullGuide(fixture, "<main>reviewed</main>").includes("old summary"));
  assert.throws(() => installFullGuide("unexpected", "<main/>"));
  assert.equal(removePilotSummary(fixture, "/next-step"), fixture);
  assert(!removePilotSummary(fixture, "/interventionist").includes("old summary"));
  console.log(JSON.stringify({ artifact, passed: true, words: actual.text.split(/\s+/).length, headings: actual.h2, links: actual.links }, null, 2));
} finally {
  await browser.close();
}
