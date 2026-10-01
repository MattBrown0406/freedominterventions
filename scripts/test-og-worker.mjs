import assert from "node:assert/strict";
import worker from "../cloudflare-worker/og-worker.js";
import { markHelmetManagedTags } from "./helmet-markup.mjs";

const marked = markHelmetManagedTags('<meta name="theme-color" content="#fff" /><link rel="canonical" href="https://example.com" />');
assert(!marked.includes('/ data-react-helmet'));
assert.match(marked, /<meta name="theme-color" content="#fff" data-react-helmet="true">/);
assert.match(marked, /<link rel="canonical" href="https:\/\/example.com" data-react-helmet="true">/);

const originFetches = [];
globalThis.fetch = async (input) => {
  const url = typeof input === "string" ? input : input.url;
  if (url.includes("/rest/v1/blog_posts")) {
    if (url.includes("error-article")) return new Response("upstream error", { status: 503 });
    const slug = ["known-article", "late-article"].find((candidate) => url.includes(candidate));
    return new Response(JSON.stringify(slug ? [{
      title: "Known <Article>",
      excerpt: "Known article excerpt",
      image_url: slug === "known-article" ? '/og-share.jpg?x="><script>' : "/og-share.jpg",
      slug,
    }] : []), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  originFetches.push(url);
  if (url.endsWith("/spa-shell.html")) return new Response("SHELL", { status: 200, headers: { "Content-Type": "text/html" } });
  if (url.endsWith("/blog/late-article")) {
    return new Response('<html><head><link rel="canonical" href="https://freedominterventions.com" data-react-helmet="true"></head></html>', {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
  return new Response("ORIGIN", { status: 200 });
};

const request = (pathname, userAgent = "Googlebot") => new Request(`https://freedominterventions.com${pathname}`, {
  headers: { "user-agent": userAgent },
});

const redirect = await worker.fetch(request("/schedule?source=test"));
assert.equal(redirect.status, 301);
assert.equal(redirect.headers.get("location"), "https://freedominterventions.com/book?source=test");

const legacySlash = await worker.fetch(request("/about/?source=test"));
assert.equal(legacySlash.status, 301);
assert.equal(legacySlash.headers.get("location"), "https://freedominterventions.com/what-makes-matt-different?source=test");

const unknown = await worker.fetch(request("/definitely-not-a-real-page"));
assert.equal(unknown.status, 404);
assert.match(unknown.headers.get("x-robots-tag") || "", /noindex/);

for (const resource of ["/robots.txt", "/favicon.jpeg", "/assets/index-abc.js", "/post-sitemap.xml", "/next-step"]) {
  const response = await worker.fetch(request(resource));
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "ORIGIN");
}

const trailingSlash = await worker.fetch(request("/oregon/?source=test"));
assert.equal(trailingSlash.status, 301);
assert.equal(trailingSlash.headers.get("location"), "https://freedominterventions.com/oregon?source=test");

const knownStatic = await worker.fetch(request("/oregon"));
assert.equal(knownStatic.status, 200);
assert.equal(await knownStatic.text(), "ORIGIN");

const knownAnswer = await worker.fetch(request("/intervention-answers/can-intervention-happen-if-they-are-high"));
assert.equal(knownAnswer.status, 200);
assert.equal(await knownAnswer.text(), "ORIGIN");

for (const route of ["/referralfit/privacy", "/referralfit/terms"]) {
  const response = await worker.fetch(request(route));
  assert.equal(response.status, 200, route);
  assert.equal(await response.text(), "ORIGIN");
}

const inspectionTool = await worker.fetch(request("/definitely-not-a-real-page", "Mozilla/5.0 (compatible; Google-InspectionTool/1.0;)"));
assert.equal(inspectionTool.status, 404);

const nestedBlog = await worker.fetch(request("/blog/known-article/extra"));
assert.equal(nestedBlog.status, 404);

const lateBlog = await worker.fetch(request("/blog/late-article"));
assert.equal(lateBlog.status, 200);
assert.equal(await lateBlog.text(), "SHELL");

const shellDirect = await worker.fetch(request("/spa-shell.html"));
assert.match(shellDirect.headers.get("x-robots-tag") || "", /noindex/);

const socialShare = await worker.fetch(request("/blog/known-article", "facebookexternalhit/1.1"));
const socialHtml = await socialShare.text();
assert.equal(socialShare.status, 200);
assert(!socialHtml.includes('"><script>'), "OG attributes must be escaped");
assert(!socialHtml.includes("<Article>"), "OG text must be escaped");

const unknownBlog = await worker.fetch(request("/blog/missing-article"));
assert.equal(unknownBlog.status, 404);
assert.match(unknownBlog.headers.get("x-robots-tag") || "", /noindex/);

const knownBlog = await worker.fetch(request("/blog/known-article"));
assert.equal(knownBlog.status, 200);
assert.equal(await knownBlog.text(), "ORIGIN");

const unavailableBlogLookup = await worker.fetch(request("/blog/error-article"));
assert.equal(unavailableBlogLookup.status, 200);
assert.equal(await unavailableBlogLookup.text(), "ORIGIN");

const sitemap = await worker.fetch(request("/sitemap.xml"));
assert.equal(sitemap.status, 200);
assert.equal(await sitemap.text(), "ORIGIN");
assert(originFetches.some((url) => url.endsWith("/sitemap.xml")));

console.log(JSON.stringify({ redirects: 3, noindex404s: 4, resourcePassThroughs: 5, upstreamFailOpen: true, sitemapOrigin: true, spaShellFallback: true, ogEscaped: true }));
