import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const indexFile = path.join(distDir, "index.html");
const envFile = path.join(root, ".env");
const BASE_URL = "https://freedominterventions.com";

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

const stripManagedHeadTags = (html) =>
  html
    .replace(/<meta name="description" content="[^"]*"\s*\/?>\n?/gi, "")
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>\n?/gi, "")
    .replace(/<meta property="og:[^"]+" content="[^"]*"\s*\/?>\n?/gi, "")
    .replace(/<meta name="twitter:[^"]+" content="[^"]*"\s*\/?>\n?/gi, "")
    .replace(/<meta property="article:[^"]+" content="[^"]*"\s*\/?>\n?/gi, "");

const fallbackHtml = ({ title, excerpt, imageUrl, canonical }) => `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #1a365d; margin-bottom: 20px;">${escapeHtml(title)}</h1>
        <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(title)}" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 20px;">
        <p>${escapeHtml(excerpt)}</p>
        <p><a href="${escapeHtml(canonical)}" style="color: #2c5282;">Read this article on Freedom Interventions</a></p>
        <div style="background: #f7fafc; padding: 20px; margin: 20px 0; border-left: 4px solid #2c5282;">
          <p><strong>Phone:</strong> <a href="tel:+14582988000" style="color: #2c5282;">(541) 668-8084</a></p>
          <p><strong>Email:</strong> <a href="mailto:matt@freedominterventions.com" style="color: #2c5282;">matt@freedominterventions.com</a></p>
        </div>
      </div>
`;

const replaceNoscript = (html, metadata) =>
  html.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>${fallbackHtml(metadata)}    </noscript>`);

const upsertHead = (html, post) => {
  const canonical = `${BASE_URL}/blog/${post.slug}`;
  const imageUrl = absoluteUrl(post.image_url);
  const title = post.title.includes("Freedom Interventions") ? post.title : `${post.title} | Freedom Interventions`;
  const description = (post.excerpt || "").length > 160 ? `${post.excerpt.slice(0, 157)}...` : post.excerpt || "";
  const published = post.published_at || post.created_at;
  const modified = post.updated_at || published;

  const tags = [
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:site_name" content="Freedom Interventions">`,
    `<meta property="og:locale" content="en_US">`,
    `<meta property="og:image" content="${escapeHtml(imageUrl)}">`,
    `<meta property="og:image:secure_url" content="${escapeHtml(imageUrl)}">`,
    `<meta property="og:image:type" content="${imageType(imageUrl)}">`,
    `<meta property="og:image:alt" content="${escapeHtml(post.title)}">`,
    published ? `<meta property="article:published_time" content="${escapeHtml(published)}">` : "",
    modified ? `<meta property="article:modified_time" content="${escapeHtml(modified)}">` : "",
    post.category ? `<meta property="article:section" content="${escapeHtml(post.category)}">` : "",
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    `<meta name="twitter:image" content="${escapeHtml(imageUrl)}">`,
    `<meta name="twitter:image:alt" content="${escapeHtml(post.title)}">`,
    `<meta name="twitter:site" content="@freedominterventions">`,
  ].filter(Boolean).join("\n    ");

  const withCleanHead = stripManagedHeadTags(html).replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  return replaceNoscript(withCleanHead.replace("</title>", `</title>\n    ${tags}`), {
    title: post.title,
    excerpt: description,
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
    console.warn("Skipping blog share fallbacks: missing Supabase environment variables.");
    return;
  }

  const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, image_url, category, published_at, updated_at, created_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    if (process.env.BLOG_SHARE_FALLBACK_STRICT === "true") throw error;
    console.warn(`Skipping blog share fallbacks: ${error.message || "Supabase query failed"}.`);
    return;
  }

  const template = await readFile(indexFile, "utf8");
  for (const post of posts ?? []) {
    if (!post.slug || !post.title) continue;
    const html = upsertHead(template, post);
    for (const destination of outputPaths(post.slug)) {
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, html, "utf8");
    }
  }

  console.log(`✅ Blog social share fallbacks generated for ${(posts ?? []).length} articles`);
};

await main();
