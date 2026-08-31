import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { SITE_URL, excludedSitemapRoutes, canonicalRouteAliases } from "./seo-routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const appPath = join(root, "src/App.tsx");
const answersPath = join(root, "src/data/interventionAnswers.ts");
const outputPath = join(root, "public/sitemap.xml");
const envPath = join(root, ".env");
const routeManifest = JSON.parse(readFileSync(join(__dirname, "route-manifest.json"), "utf8"));
const appSource = readFileSync(appPath, "utf8");
const answerSource = readFileSync(answersPath, "utf8");
const today = new Date().toISOString().slice(0, 10);

const loadEnv = () => {
  const env = {
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_PUBLISHABLE_KEY: process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  };
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const index = trimmed.indexOf("=");
      if (index < 0) continue;
      const key = trimmed.slice(0, index).trim();
      let value = trimmed.slice(index + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
      if (key in env && !env[key]) env[key] = value;
    }
  }
  return env;
};

const env = loadEnv();
if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_PUBLISHABLE_KEY) {
  throw new Error("Sitemap generation requires VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY so published blog URLs are never silently omitted.");
}

const manifestMap = new Map(routeManifest.map((route) => [route.path, route]));
const staticRoutes = [...new Set([...appSource.matchAll(/path="([^"]+)"/g)].map((match) => match[1]))]
  .filter((route) => route.startsWith("/"))
  .filter((route) => !route.includes(":"))
  .filter((route) => !route.includes("*"))
  .filter((route) => !excludedSitemapRoutes.has(route))
  .filter((route) => !canonicalRouteAliases.has(route));
const answerRoutes = [...answerSource.matchAll(/slug:\s*"([^"]+)"/g)]
  .map((match) => `/intervention-answers/${match[1]}`);

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const { data: posts, error: postsError } = await supabase
  .from("blog_posts")
  .select("slug, published_at, updated_at, created_at")
  .eq("published", true)
  .order("published_at", { ascending: false });
if (postsError) throw postsError;

const blogDates = new Map();
for (const post of posts ?? []) {
  if (!post.slug) continue;
  const route = `/blog/${post.slug}`;
  if (canonicalRouteAliases.has(route)) continue;
  const date = String(post.updated_at || post.published_at || post.created_at || "").slice(0, 10);
  blogDates.set(route, /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : today);
}

const gitDateCache = new Map();
const gitLastModified = (sourcePath) => {
  if (!sourcePath) return today;
  if (gitDateCache.has(sourcePath)) return gitDateCache.get(sourcePath);
  const result = spawnSync("git", ["log", "-1", "--format=%cs", "--", sourcePath], {
    cwd: root,
    encoding: "utf8",
  });
  const value = result.status === 0 ? result.stdout.trim() : "";
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : today;
  gitDateCache.set(sourcePath, date);
  return date;
};

const componentFiles = new Map();
for (const [, component, pageFile] of appSource.matchAll(/import\s+([A-Za-z0-9_]+)\s+from\s+["']\.\/pages\/([^"']+)["']/g)) {
  componentFiles.set(component, `src/pages/${pageFile}.tsx`);
}
for (const [, component, pageFile] of appSource.matchAll(/const\s+([A-Za-z0-9_]+)\s*=\s*lazy\(\(\)\s*=>\s*import\(["']\.\/pages\/([^"']+)["']\)\)/g)) {
  componentFiles.set(component, `src/pages/${pageFile}.tsx`);
}
const routeSourceFiles = new Map();
for (const [, route, component] of appSource.matchAll(/<Route\s+path="([^"]+)"[\s\S]{0,180}?element=\{<([A-Za-z0-9_]+)/g)) {
  routeSourceFiles.set(route, componentFiles.get(component) || "src/App.tsx");
}

const answersDate = gitLastModified("src/data/interventionAnswers.ts");
const routes = [...new Set([...staticRoutes, ...answerRoutes, ...blogDates.keys()])]
  .sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));

const lastModifiedFor = (route) => {
  if (blogDates.has(route)) return blogDates.get(route);
  if (route.startsWith("/intervention-answers/")) return answersDate;
  return gitLastModified(routeSourceFiles.get(route) || "src/App.tsx");
};

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => {
  const configured = manifestMap.get(route);
  const priority = configured?.priority ?? (route.startsWith("/blog/") ? "0.7" : "0.7");
  const changefreq = configured?.changefreq ?? (route.startsWith("/blog/") ? "monthly" : "monthly");
  return `  <url>\n    <loc>${SITE_URL}${route}</loc>\n    <lastmod>${lastModifiedFor(route)}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}).join("\n")}\n</urlset>\n`;

writeFileSync(outputPath, xml);
console.log(`✅ Sitemap generated with ${routes.length} URLs (${blogDates.size} published blog posts) -> ${relative(root, outputPath)}`);
