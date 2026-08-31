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
    const exists = url.includes("known-article");
    return new Response(JSON.stringify(exists ? [{
      title: "Known Article",
      excerpt: "Known article excerpt",
      image_url: "/og-share.jpg",
      slug: "known-article",
    }] : []), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  originFetches.push(url);
  return new Response("ORIGIN", { status: 200 });
};

const request = (pathname, userAgent = "Googlebot") => new Request(`https://freedominterventions.com${pathname}`, {
  headers: { "user-agent": userAgent },
});

const redirect = await worker.fetch(request("/schedule?source=test"));
assert.equal(redirect.status, 301);
assert.equal(redirect.headers.get("location"), "https://freedominterventions.com/book?source=test");

const unknown = await worker.fetch(request("/definitely-not-a-real-page"));
assert.equal(unknown.status, 404);
assert.match(unknown.headers.get("x-robots-tag") || "", /noindex/);

for (const resource of ["/robots.txt", "/favicon.jpeg", "/assets/index-abc.js"]) {
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

console.log(JSON.stringify({ redirects: 2, noindex404s: 2, resourcePassThroughs: 3, upstreamFailOpen: true, sitemapOrigin: true }));
