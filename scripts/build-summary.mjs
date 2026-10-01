// Prints a prominent end-of-build summary of skipped/degraded SEO steps.
// Never fails the build: skips stay allowed (the publishing host may lack
// Chromium or Supabase env), but they must not be silent.
import { readBuildWarnings, clearBuildWarnings } from "./build-warnings.mjs";

const warnings = readBuildWarnings();
clearBuildWarnings();

if (!warnings.length) {
  console.log("✅ Build SEO summary: all fallback and prerender steps completed.");
} else {
  const bar = "=".repeat(78);
  console.warn(`\n${bar}`);
  console.warn(`⚠️  BUILD SEO SUMMARY: ${warnings.length} step(s) skipped or degraded`);
  console.warn("   This build may ship static fallbacks instead of fully prerendered pages.");
  console.warn(bar);
  for (const { step, message } of warnings) console.warn(` - [${step}] ${message}`);
  console.warn(`${bar}\n`);
}
