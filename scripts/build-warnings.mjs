// Collects skipped/degraded build steps so build-summary.mjs can print one
// prominent report at the end of `npm run build`. The ledger lives in dist/
// (recreated by every vite build) and is removed by build-summary.mjs.
import { appendFileSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ledgerFile = path.join(root, "dist", ".build-warnings.jsonl");

export const recordBuildWarning = (step, message) => {
  console.warn(`⚠️  [${step}] ${message}`);
  try {
    mkdirSync(path.dirname(ledgerFile), { recursive: true });
    appendFileSync(ledgerFile, `${JSON.stringify({ step, message })}\n`);
  } catch {
    // The console warning above is still printed.
  }
};

export const readBuildWarnings = () => {
  if (!existsSync(ledgerFile)) return [];
  return readFileSync(ledgerFile, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
};

export const clearBuildWarnings = () => rmSync(ledgerFile, { force: true });
