import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const allowedExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".html", ".md", ".txt", ".xml"]);
const skippedDirectories = new Set([".git", "dist", "node_modules", ".lovable"]);
const canonicalE164 = "+14582988000";
const canonicalDisplay = "(458) 298-8000";
const forbiddenValues = [
  ["+145", "****", "8000"].join(""),
  ["(541)", "668-8084"].join(" "),
  ["541", "668", "8084"].join("-"),
  ["tel:458", "298", "8000"].join("-"),
  ["tel:458", "2988000"].join(""),
];

const failures = [];
let canonicalDialLinks = 0;
let canonicalDisplays = 0;

async function visit(directory) {
  for (const entry of await readdir(directory)) {
    if (skippedDirectories.has(entry)) continue;
    const path = join(directory, entry);
    const details = await stat(path);
    if (details.isDirectory()) {
      await visit(path);
      continue;
    }
    if (!allowedExtensions.has(extname(entry))) continue;

    const text = await readFile(path, "utf8");
    const shortPath = relative(root, path);
    for (const forbidden of forbiddenValues) {
      if (text.includes(forbidden)) failures.push(`${shortPath}: forbidden phone value`);
    }
    canonicalDialLinks += text.split(`tel:${canonicalE164}`).length - 1;
    canonicalDisplays += text.split(canonicalDisplay).length - 1;
  }
}

await visit(root);
if (canonicalDialLinks === 0) failures.push("No canonical Freedom Interventions tel link found");
if (canonicalDisplays === 0) failures.push("No canonical Freedom Interventions display number found");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Phone consistency passed: ${canonicalDialLinks} canonical tel links, ${canonicalDisplays} display occurrences.`);
