// Fails when the Cloudflare Worker's crawler allowlist (PUBLIC_STATIC_PATHS)
// drifts from the indexable routes declared in src/App.tsx. A route missing
// from the allowlist is served to Googlebot as a 404 by the worker.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { excludedSitemapRoutes, canonicalRouteAliases } from "./seo-routes.mjs";

// Allowlisted on purpose even though they are not indexable: crawlers must be
// able to fetch them to read their robots noindex tag.
const intentionallyAllowlistedNoindexRoutes = new Set(["/next-step"]);

export const findWorkerRouteDrift = (root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")) => {
  const appSource = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
  const answerSource = fs.readFileSync(path.join(root, "src/data/interventionAnswers.ts"), "utf8");
  const workerSource = fs.readFileSync(path.join(root, "cloudflare-worker/og-worker.js"), "utf8");

  const workerBlock = workerSource.match(/const PUBLIC_STATIC_PATHS = new Set\(\[([\s\S]*?)\]\);/)?.[1];
  if (!workerBlock) return ["Could not find PUBLIC_STATIC_PATHS in cloudflare-worker/og-worker.js."];
  const workerRoutes = new Set([...workerBlock.matchAll(/'([^']+)'/g)].map((match) => match[1]));

  const appRoutes = [...new Set([...appSource.matchAll(/path="([^"]+)"/g)].map((match) => match[1]))]
    .filter((route) => route.startsWith("/") && !route.includes(":") && !route.includes("*"));
  const answerRoutes = [...answerSource.matchAll(/slug:\s*"([^"]+)"/g)]
    .map((match) => `/intervention-answers/${match[1]}`);
  const indexableRoutes = [...appRoutes, ...answerRoutes]
    .filter((route) => !excludedSitemapRoutes.has(route))
    .filter((route) => !canonicalRouteAliases.has(route));
  const knownRoutes = new Set([...appRoutes, ...answerRoutes]);

  const issues = [];
  for (const route of indexableRoutes) {
    if (!workerRoutes.has(route)) issues.push(`Worker PUBLIC_STATIC_PATHS is missing indexable App route ${route} (Googlebot would get a 404).`);
  }
  for (const route of workerRoutes) {
    if (!knownRoutes.has(route)) issues.push(`Worker PUBLIC_STATIC_PATHS lists ${route}, which is not a route in src/App.tsx.`);
    else if (excludedSitemapRoutes.has(route) && !intentionallyAllowlistedNoindexRoutes.has(route)) {
      issues.push(`Worker PUBLIC_STATIC_PATHS lists excluded/noindex route ${route}.`);
    }
  }
  return issues;
};

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  const issues = findWorkerRouteDrift();
  if (issues.length) {
    const hint = "Update PUBLIC_STATIC_PATHS in cloudflare-worker/og-worker.js (then redeploy the worker) or scripts/seo-routes.mjs.";
    // In the production build (--warn) drift must not block a publish: report it
    // loudly in the end-of-build summary instead. Standalone runs still fail.
    if (process.argv.includes("--warn")) {
      const { recordBuildWarning } = await import("./build-warnings.mjs");
      for (const issue of issues) recordBuildWarning("worker-routes", `${issue} — ${hint}`);
    } else {
      console.error("❌ Cloudflare Worker route allowlist drift:");
      for (const issue of issues) console.error(`   - ${issue}`);
      console.error(`   ${hint}`);
      process.exit(1);
    }
  } else {
    console.log("✅ Cloudflare Worker route allowlist matches src/App.tsx");
  }
}
