import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { fitSeoDescription, markHelmetManagedTags } from "./helmet-markup.mjs";
import { canonicalRouteAliases } from "./seo-routes.mjs";
import { recordBuildWarning } from "./build-warnings.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const indexFile = path.join(distDir, "index.html");
// Pristine Vite shell snapshotted by generate-static-fallbacks.mjs before it
// rewrites dist/index.html with the home page fallback.
const spaShellFile = path.join(distDir, "spa-shell.html");
const envFile = path.join(root, ".env");
const BASE_URL = "https://freedominterventions.com";

const gscMetadataOverrides = {
  "why-professional-interventions-work": {
    title: "Professional Interventions: Why They Work | Freedom Interventions",
    description:
      "Learn how professional interventions align families, prepare treatment, reduce conflict, and create a clear next step when a loved one refuses help.",
  },
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const loadEnv = async () => {
  const env = {
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_PUBLISHABLE_KEY: process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  };

  if (existsSync(envFile)) {
    const raw = await readFile(envFile, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const index = trimmed.indexOf("=");
      if (index === -1) continue;
      const key = trimmed.slice(0, index).trim();
      let value = trimmed.slice(index + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      env[key] = env[key] || value;
    }
  }

  return env;
};

const absoluteUrl = (value, fallback = `${BASE_URL}/og-share.jpg`) => {
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/")) return `${BASE_URL}${value}`;
  return `${BASE_URL}/${value}`;
};

const imageType = (url) => {
  const clean = url.split("?")[0].toLowerCase();
  if (clean.endsWith(".png")) return "image/png";
  if (clean.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
};

// Attribute-tolerant: also matches tags carrying data-react-helmet or other attributes.
const stripManagedHeadTags = (html) =>
  html
    .replace(/[ \t]*<meta\b[^>]*\bname="(?:description|robots|title)"[^>]*>\n?/gi, "")
    .replace(/[ \t]*<link\b[^>]*\brel="canonical"[^>]*>\n?/gi, "")
    .replace(/[ \t]*<meta\b[^>]*\bproperty="(?:og|article):[^"]+"[^>]*>\n?/gi, "")
    .replace(/[ \t]*<meta\b[^>]*\bname="twitter:[^"]+"[^>]*>\n?/gi, "");

const toPlainText = (value = "") => String(value)
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/\s+/g, " ")
  .trim();

const fallbackHtml = ({ title, excerpt, content, imageUrl, canonical }) => `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #1a365d; margin-bottom: 20px;">${escapeHtml(title)}</h1>
        <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(title)}" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 20px;">
        <p>${escapeHtml(excerpt)}</p>
        <article><p>${escapeHtml(toPlainText(content))}</p></article>
        <p><a href="${escapeHtml(canonical)}" style="color: #2c5282;">Read this article on Freedom Interventions</a></p>
        <div style="background: #f7fafc; padding: 20px; margin: 20px 0; border-left: 4px solid #2c5282;">
          <p><strong>Phone:</strong> <a href="tel:+14582988000" style="color: #2c5282;">(458) 298-8000</a></p>
          <p><strong>Email:</strong> <a href="mailto:matt@freedominterventions.com" style="color: #2c5282;">matt@freedominterventions.com</a></p>
        </div>
      </div>
`;

// Target the body content fallback, not the font-stylesheet <noscript> in <head>
// (same selector as generate-static-fallbacks.mjs).
const replaceNoscript = (html, metadata) =>
  html.replace(
    /<noscript>\s*<div style="max-width:[\s\S]*?<\/div>\s*<\/noscript>/,
    `<noscript>${fallbackHtml(metadata)}    </noscript>`,
  );

const upsertHead = (html, post) => {
  const route = `/blog/${post.slug}`;
  const canonical = `${BASE_URL}${canonicalRouteAliases.get(route) ?? route}`;
  const imageUrl = absoluteUrl(post.image_url);
  const metadataOverride = gscMetadataOverrides[post.slug];
  const rawTitle = metadataOverride?.title || post.title;
  const rawDescription = metadataOverride?.description || post.excerpt || "";
  const title = rawTitle.includes("Freedom Interventions") ? rawTitle : `${rawTitle} | Freedom Interventions`;
  const description = fitSeoDescription(rawDescription);
  const published = post.published_at || post.created_at;
  const modified = post.updated_at || published;
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: rawTitle,
    description,
    image: imageUrl,
    datePublished: published,
    dateModified: modified,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "Freedom Interventions", url: BASE_URL },
    publisher: { "@type": "Organization", name: "Freedom Interventions", url: BASE_URL },
  }).replaceAll("<", "\\u003c");

  const tags = [
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`,
    `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${escapeHtml(canonical)}">`,
    `<meta property="og:site_name" content="Freedom Interventions">`,
    `<meta property="og:locale" content="en_US">`,
    `<meta property="og:image" content="${escapeHtml(imageUrl)}">`,
    `<meta property="og:image:secure_url" content="${escapeHtml(imageUrl)}">`,
    `<meta property="og:image:type" content="${imageType(imageUrl)}">`,
    `<meta property="og:image:alt" content="${escapeHtml(rawTitle)}">`,
    published ? `<meta property="article:published_time" content="${escapeHtml(published)}">` : "",
    modified ? `<meta property="article:modified_time" content="${escapeHtml(modified)}">` : "",
    post.category ? `<meta property="article:section" content="${escapeHtml(post.category)}">` : "",
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    `<meta name="twitter:image" content="${escapeHtml(imageUrl)}">`,
    `<meta name="twitter:image:alt" content="${escapeHtml(rawTitle)}">`,
    `<meta name="twitter:site" content="@freedominterventions">`,
    `<script type="application/ld+json">${articleSchema}</script>`,
  ].filter(Boolean).join("\n    ");

  const withCleanHead = stripManagedHeadTags(html).replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  return replaceNoscript(withCleanHead.replace("</title>", `</title>\n    ${tags}`), {
    title: rawTitle,
    excerpt: description,
    content: post.content || "",
    imageUrl,
    canonical,
  });
};

const outputPaths = (slug) => [
  path.join(distDir, "blog", slug, "index.html"),
  path.join(distDir, "blog", `${slug}.html`),
];

const main = async () => {
  if (!existsSync(indexFile)) throw new Error("dist/index.html not found. Run vite build first.");

  const env = await loadEnv();
  if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_PUBLISHABLE_KEY) {
    recordBuildWarning("blog-share-fallbacks", "SKIPPED: missing VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY; /blog/<slug> raw HTML falls back to the SPA document.");
    return;
  }

  const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, content, image_url, category, published_at, updated_at, created_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    if (process.env.BLOG_SHARE_FALLBACK_STRICT === "true") throw error;
    recordBuildWarning("blog-share-fallbacks", `SKIPPED: Supabase query failed (${error.message || "unknown error"}); /blog/<slug> raw HTML falls back to the SPA document. Set BLOG_SHARE_FALLBACK_STRICT=true to fail instead.`);
    return;
  }

  // Never use dist/index.html once generate-static-fallbacks has rewritten it
  // into the home page; its home canonical/title would leak into every post.
  const template = await readFile(existsSync(spaShellFile) ? spaShellFile : indexFile, "utf8");
  if (/data-react-helmet=|rel="canonical"/i.test(template)) {
    if (process.env.BLOG_SHARE_FALLBACK_STRICT === "true") throw new Error("Blog share fallback template is not the pristine Vite shell.");
    recordBuildWarning("blog-share-fallbacks", "SKIPPED: template is not the pristine Vite shell (dist/spa-shell.html missing?). Run vite build, then generate-static-fallbacks first.");
    return;
  }
  for (const post of posts ?? []) {
    if (!post.slug || !post.title) continue;
    const html = markHelmetManagedTags(upsertHead(template, post));
    for (const destination of outputPaths(post.slug)) {
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, html, "utf8");
    }
  }

  console.log(`✅ Blog social share fallbacks generated for ${(posts ?? []).length} articles`);
};

await main();
