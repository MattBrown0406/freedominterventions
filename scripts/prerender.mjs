import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { markHelmetManagedTags } from "./helmet-markup.mjs";
import { SITE_URL, canonicalRouteAliases, excludedSitemapRoutes } from "./seo-routes.mjs";
import { removePilotSummary } from "./full-guide-fallback.mjs";
import { recordBuildWarning } from "./build-warnings.mjs";

const defaultChromeExecutablePath =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const appFile = path.join(root, "src", "App.tsx");
const interventionAnswersFile = path.join(
  root,
  "src",
  "data",
  "interventionAnswers.ts",
);
const envFile = path.join(root, ".env");
const previewPort = Number(process.env.PRERENDER_PREVIEW_PORT || 4274);
const previewOrigin = `http://127.0.0.1:${previewPort}`;
const heavyAssetPattern =
  /\.(png|jpe?g|webp|gif|svg|ico|woff2?|ttf|otf|mp4|webm|mov)(\?.*)?$/i;
// Prerendering must never record real analytics/page views.
const analyticsRequestPattern =
  /^https?:\/\/(?:[^/]+\.)?(?:googletagmanager\.com|google-analytics\.com|clarity\.ms)(?:[/:?]|$)|\/functions\/v1\/track-freedom-event\b/i;
const injectedAnalyticsScriptSelector =
  'script[src*="googletagmanager.com"], script[src*="google-analytics.com"], script[src*="clarity.ms"]';
const readinessTimeoutMs = Number(process.env.PRERENDER_READY_TIMEOUT_MS || 30000);
const maxConsecutiveReadinessFailures = 10;

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
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      env[key] = env[key] || value;
    }
  }

  if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_PUBLISHABLE_KEY) {
    throw new Error(
      "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY for prerender blog route discovery.",
    );
  }

  return env;
};

const getStaticRoutes = async () => {
  const appContent = await readFile(appFile, "utf8");
  const answerContent = await readFile(interventionAnswersFile, "utf8");
  const appRoutes = [...appContent.matchAll(/path="([^"]+)"/g)].map(
    (match) => match[1],
  );
  const interventionAnswerRoutes = [
    ...answerContent.matchAll(/slug:\s*"([^"]+)"/g),
  ].map((match) => `/intervention-answers/${match[1]}`);

  return [...new Set([...appRoutes, ...interventionAnswerRoutes, ...canonicalRouteAliases.keys()])]
    .filter((route) => !route.includes(":"))
    .filter((route) => !route.includes("*"));
};

const getBlogRoutes = async (env) => {
  const supabase = createClient(
    env.VITE_SUPABASE_URL,
    env.VITE_SUPABASE_PUBLISHABLE_KEY,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );

  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(({ slug }) => `/blog/${slug}`);
};

const toOutputPaths = (route) => {
  if (route === "/") return [path.join(distDir, "index.html")];

  const cleanRoute = route.replace(/^\//, "").replace(/\/+$/, "");
  return [
    path.join(distDir, cleanRoute, "index.html"),
    path.join(distDir, `${cleanRoute}.html`),
  ];
};

const expectedCanonical = (route) => {
  const target = canonicalRouteAliases.get(route) ?? route;
  return target === "/" ? SITE_URL : `${SITE_URL}${target.toLowerCase()}`;
};

// Wait for route-specific content, not just any text: the Suspense loader
// ("Loading...") and the Navbar "Blog" link must not count as ready.
const waitForAppReady = async (page, route) => {
  try {
    await page.waitForLoadState("networkidle", { timeout: 2500 });
  } catch {
    // some pages keep background work alive, so fall back to content checks quickly
  }

  await page.waitForFunction(
    ({ strict, canonical, isBlogIndex, isBlogPost }) => {
      const root = document.querySelector("#root");
      const text = root?.textContent?.trim() || "";
      if (!text || /^Loading\.*$/i.test(text)) return false;
      // Private/noindex routes (admin, redirects, 404) only need a rendered app.
      if (!strict) return true;

      const heading = [...root.querySelectorAll("h1")].some((h1) => {
        const value = h1.textContent?.trim() || "";
        return value && !/^Loading\b/i.test(value);
      });
      if (!heading) return false;

      const canonicals = document.head.querySelectorAll('link[rel="canonical"]');
      if (canonicals.length !== 1 || canonicals[0].getAttribute("href") !== canonical) return false;

      if (isBlogIndex) {
        const postLinks = [...root.querySelectorAll('a[href^="/blog/"]')]
          .filter((link) => !link.closest("nav, header, footer"));
        if (!postLinks.length) return false;
      }
      if (isBlogPost && !/Back to Blog/.test(document.body.innerText)) return false;
      return true;
    },
    {
      strict: !excludedSitemapRoutes.has(route),
      canonical: expectedCanonical(route),
      isBlogIndex: route === "/blog",
      isBlogPost: route.startsWith("/blog/"),
    },
    { timeout: readinessTimeoutMs },
  );

  await page.waitForTimeout(150);
};

const startPreviewServer = () => {
  const child = spawn(
    "npx",
    ["vite", "preview", "--strictPort", "--host", "127.0.0.1", "--port", String(previewPort)],
    {
      cwd: root,
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    },
  );

  let previewStarted = false;
  child.stdout.on("data", (chunk) => {
    if (chunk.toString().includes(previewOrigin)) previewStarted = true;
  });
  child.stderr.on("data", (chunk) => process.stderr.write(chunk));
  const ready = (async () => {
    for (let attempt = 0; attempt < 120; attempt += 1) {
      if (child.exitCode !== null) {
        throw new Error(
          `vite preview exited early with code ${child.exitCode}`,
        );
      }

      try {
        if (previewStarted) {
          const response = await fetch(previewOrigin);
          if (response.ok) return;
        }
      } catch {
        // wait and retry
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    throw new Error("Timed out waiting for vite preview server");
  })();

  return { child, ready };
};

const stopPreviewServer = async (child) => {
  if (!child || child.exitCode !== null) return;
  child.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => child.once("exit", resolve)),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]);
  if (child.exitCode === null) child.kill("SIGKILL");
};

const resolveChromiumLaunchOptions = () => {
  const configuredExecutablePath =
    process.env.PLAYWRIGHT_CHROME_PATH || process.env.CHROME_BIN;
  if (configuredExecutablePath) {
    return { headless: true, executablePath: configuredExecutablePath };
  }

  if (existsSync(defaultChromeExecutablePath)) {
    return { headless: true, executablePath: defaultChromeExecutablePath };
  }

  return { headless: true };
};

const loadChromium = async () => {
  const playwright = await import("playwright");
  return playwright.chromium;
};

const main = async () => {
  if (!existsSync(distDir))
    throw new Error("dist directory does not exist. Run vite build first.");

  // Check if Playwright browsers are available before attempting to launch
  let chromium;
  try {
    chromium = await loadChromium();
    const testBrowser = await chromium.launch(resolveChromiumLaunchOptions());
    await testBrowser.close();
  } catch (e) {
    const message =
      "Playwright/Chrome is required for prerendering SEO pages. Set ALLOW_PRERENDER_SKIP=true only for local development.";
    if (process.env.ALLOW_PRERENDER_SKIP === "true") {
      recordBuildWarning(
        "prerender",
        `SKIPPED ENTIRELY: ${message} (${e?.message?.split("\n")[0] || e}). ALLOW_PRERENDER_SKIP=true, so this build ships static fallbacks only (no rendered page content).`,
      );
      return;
    }
    throw new Error(message);
  }

  const env = await loadEnv();
  const [staticRoutes, blogRoutes] = await Promise.all([
    getStaticRoutes(),
    getBlogRoutes(env),
  ]);
  const routes = [...new Set([...staticRoutes, ...blogRoutes])];

  const { child, ready } = startPreviewServer();
  const browser = await chromium.launch(resolveChromiumLaunchOptions());
  const context = await browser.newContext();
  await context.route(heavyAssetPattern, (route) => route.abort());
  await context.route((url) => analyticsRequestPattern.test(url.href), (route) => route.abort());

  try {
    await ready;
    console.log(
      `Prerendering ${routes.length} routes (${blogRoutes.length} blog posts)`,
    );

    const notReady = [];
    let consecutiveFailures = 0;
    let aborted = false;
    let rendered = 0;
    for (const [index, route] of routes.entries()) {
      if (index === 0 || index % 25 === 0 || index === routes.length - 1) {
        console.log(`  ${index + 1}/${routes.length}: ${route}`);
      }

      const page = await context.newPage();
      page.setDefaultNavigationTimeout(30000);
      page.setDefaultTimeout(30000);

      const url = `${previewOrigin}${route}`;
      const response = await page.goto(url, { waitUntil: "domcontentloaded" });
      if (!response || !response.ok()) {
        await page.close();
        throw new Error(`Failed to load ${route}: ${response?.status()}`);
      }

      try {
        await waitForAppReady(page, route);
      } catch {
        // Keep the existing static fallback rather than writing a loader or
        // half-rendered snapshot over it.
        notReady.push(route);
        consecutiveFailures += 1;
        console.warn(`⚠️  Prerender not ready for ${route}; keeping its static fallback.`);
        await page.close();
        if (consecutiveFailures >= maxConsecutiveReadinessFailures) {
          aborted = true;
          break;
        }
        continue;
      }
      consecutiveFailures = 0;

      await page.evaluate((selector) => {
        document.querySelectorAll(selector).forEach((node) => node.remove());
      }, injectedAnalyticsScriptSelector);
      const html = markHelmetManagedTags(removePilotSummary(await page.content(), route));
      // page.content() already serializes the doctype.
      const output = /^\s*<!doctype/i.test(html) ? html : `<!DOCTYPE html>\n${html}`;
      const outputPaths = toOutputPaths(route);
      for (const outputPath of outputPaths) {
        await mkdir(path.dirname(outputPath), { recursive: true });
        await writeFile(outputPath, output, "utf8");
      }
      rendered += 1;
      await page.close();
    }

    if (notReady.length) {
      recordBuildWarning(
        "prerender",
        `${notReady.length} route(s) never became ready and kept their static fallback: ${notReady.slice(0, 20).join(", ")}${notReady.length > 20 ? ", ..." : ""}`,
      );
    }
    if (aborted) {
      recordBuildWarning(
        "prerender",
        `ABORTED after ${maxConsecutiveReadinessFailures} consecutive readiness failures; remaining routes kept their static fallbacks.`,
      );
    }

    if (existsSync(path.join(distDir, "200.html"))) {
      await rm(path.join(distDir, "200.html"), { force: true });
    }

    console.log(
      `✅ Prerendered ${rendered}/${routes.length} routes (${blogRoutes.length} blog posts discovered)`,
    );
  } finally {
    await context.close();
    await browser.close();
    await stopPreviewServer(child);
  }
};

await main();
process.exit(0);
