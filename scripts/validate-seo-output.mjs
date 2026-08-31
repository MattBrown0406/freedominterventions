import fs from "node:fs";
import path from "node:path";
import { SITE_URL, excludedSitemapRoutes, canonicalRouteAliases } from "./seo-routes.mjs";

const root = process.cwd();
const distDir = path.join(root, "dist");
const sitemap = fs.readFileSync(path.join(root, "public/sitemap.xml"), "utf8");
const robotsTxt = fs.readFileSync(path.join(root, "public/robots.txt"), "utf8");
const workerSource = fs.readFileSync(path.join(root, "cloudflare-worker/og-worker.js"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const lastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]);
const issues = [];

const extractAll = (html, regex) => [...html.matchAll(regex)].map((match) => match[1]?.trim() ?? "");
const decodeHtml = (value) => value
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", '"')
  .replaceAll("&#39;", "'")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">");
const outputPath = (route) => route === "/"
  ? path.join(distDir, "index.html")
  : path.join(distDir, route.replace(/^\//, ""), "index.html");

if (urls.length !== new Set(urls).size) issues.push("Sitemap contains duplicate URLs.");
if (urls.length !== lastmods.length) issues.push(`Sitemap has ${urls.length} URLs but ${lastmods.length} lastmod values.`);
if (urls.some((url) => !url.startsWith(`${SITE_URL}/`))) issues.push("Sitemap contains a noncanonical host or protocol.");
if (lastmods.some((date) => !/^\d{4}-\d{2}-\d{2}$/.test(date))) issues.push("Sitemap contains an invalid lastmod date.");
const today = new Date().toISOString().slice(0, 10);
if (lastmods.some((date) => date > today)) issues.push("Sitemap contains a future lastmod date.");
if (!robotsTxt.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) issues.push("robots.txt does not advertise the canonical sitemap.");
const workerRouteBlock = workerSource.match(/const PUBLIC_STATIC_PATHS = new Set\(\[([\s\S]*?)\]\);/)?.[1] || "";
const workerRoutes = new Set([...workerRouteBlock.matchAll(/'([^']+)'/g)].map((match) => match[1]));
for (const route of urls.map((url) => new URL(url).pathname).filter((route) => !route.startsWith("/blog/"))) {
  if (!workerRoutes.has(route)) issues.push(`Cloudflare Worker public-route allowlist is missing ${route}.`);
}
if (workerSource.includes("functions/v1/generate-sitemap")) issues.push("Cloudflare Worker still overrides the versioned static sitemap.");

const titleMap = new Map();
const descriptionMap = new Map();
for (const url of urls) {
  const route = new URL(url).pathname;
  const file = outputPath(route);
  if (!fs.existsSync(file)) {
    issues.push(`${route}: missing prerendered HTML.`);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const titles = extractAll(html, /<title[^>]*>([\s\S]*?)<\/title>/g);
  const descriptions = extractAll(html, /<meta\s+name="description"\s+content="([^"]*)"[^>]*>/g);
  const canonicals = extractAll(html, /<link\s+rel="canonical"\s+href="([^"]*)"[^>]*>/g);
  const ogUrls = extractAll(html, /<meta\s+property="og:url"\s+content="([^"]*)"[^>]*>/g);
  const robots = extractAll(html, /<meta\s+name="robots"\s+content="([^"]*)"[^>]*>/g);
  const h1s = extractAll(html, /<h1[^>]*>([\s\S]*?)<\/h1>/g).map((value) => value.replace(/<[^>]+>/g, "").trim());

  if (titles.length !== 1 || !titles[0]) issues.push(`${route}: expected one nonempty title, found ${titles.length}.`);
  if (descriptions.length !== 1 || !descriptions[0]) issues.push(`${route}: expected one nonempty description, found ${descriptions.length}.`);
  if (canonicals.length !== 1 || canonicals[0] !== url.replace(/\/$/, route === "/" ? "" : "/")) issues.push(`${route}: canonical mismatch (${canonicals.join(", ") || "missing"}).`);
  if (ogUrls.length !== 1 || ogUrls[0] !== canonicals[0]) issues.push(`${route}: og:url mismatch.`);
  if (robots.length !== 1 || robots[0].toLowerCase().includes("noindex")) issues.push(`${route}: sitemap route is noindex or lacks one robots tag.`);
  if (!h1s.length || !h1s[0]) issues.push(`${route}: missing nonempty H1.`);
  const preserveMeasuredTitle =
    route.startsWith("/blog/") ||
    ["/boise-idaho", "/interventionist", "/minneapolis-minnesota"].includes(route) ||
    /^(Addiction Intervention Services|Professional Interventionist|Drug & Alcohol Interventionist) (in|on) /i.test(decodeHtml(titles[0] || ""));
  if (titles[0] && !preserveMeasuredTitle && decodeHtml(titles[0]).length > 60) issues.push(`${route}: title exceeds 60 characters.`);
  if (descriptions[0] && decodeHtml(descriptions[0]).length > 160) issues.push(`${route}: description exceeds 160 characters.`);

  if (titles[0]) titleMap.set(titles[0], [...(titleMap.get(titles[0]) || []), route]);
  if (descriptions[0]) descriptionMap.set(descriptions[0], [...(descriptionMap.get(descriptions[0]) || []), route]);

  const schemaTypes = [];
  for (const [, raw] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const value = JSON.parse(raw);
      const walk = (entry) => {
        if (Array.isArray(entry)) return entry.forEach(walk);
        if (!entry || typeof entry !== "object") return;
        if (entry["@type"]) schemaTypes.push(...(Array.isArray(entry["@type"]) ? entry["@type"] : [entry["@type"]]));
        if (entry["@graph"]) walk(entry["@graph"]);
      };
      walk(value);
    } catch (error) {
      issues.push(`${route}: invalid JSON-LD (${error.message}).`);
    }
  }
  if (route.startsWith("/blog/") && !schemaTypes.includes("Article")) issues.push(`${route}: blog page lacks Article schema.`);
}

for (const [title, routes] of titleMap) if (routes.length > 1) issues.push(`Duplicate title on ${routes.join(", ")}: ${title}`);
for (const [description, routes] of descriptionMap) if (routes.length > 1) issues.push(`Duplicate description on ${routes.join(", ")}.`);

const sitemapRoutes = new Set(urls.map((url) => new URL(url).pathname));
for (const route of excludedSitemapRoutes) {
  if (sitemapRoutes.has(route)) issues.push(`Excluded route remains in sitemap: ${route}`);
  const file = outputPath(route);
  if (!fs.existsSync(file) || canonicalRouteAliases.has(route)) continue;
  const html = fs.readFileSync(file, "utf8");
  const robots = extractAll(html, /<meta\s+name="robots"\s+content="([^"]*)"[^>]*>/g);
  if (robots.length !== 1 || !robots[0].toLowerCase().includes("noindex")) issues.push(`${route}: private/transactional route lacks one noindex tag.`);
}

for (const [route, primary] of canonicalRouteAliases) {
  if (sitemapRoutes.has(route)) issues.push(`Canonical alias remains in sitemap: ${route}`);
  const file = outputPath(route);
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8");
  const canonicals = extractAll(html, /<link\s+rel="canonical"\s+href="([^"]*)"[^>]*>/g);
  const expected = `${SITE_URL}${primary}`;
  if (canonicals.length !== 1 || canonicals[0] !== expected) issues.push(`${route}: expected canonical ${expected}.`);
}

const result = {
  sitemapUrls: urls.length,
  blogUrls: urls.filter((url) => url.includes("/blog/")).length,
  interventionAnswerUrls: urls.filter((url) => url.includes("/intervention-answers/")).length,
  uniqueLastmodDates: new Set(lastmods).size,
  titleCount: titleMap.size,
  descriptionCount: descriptionMap.size,
  excludedRoutesChecked: excludedSitemapRoutes.size,
  canonicalAliasesChecked: canonicalRouteAliases.size,
  issues,
};
console.log(JSON.stringify(result, null, 2));
if (issues.length) process.exit(1);
