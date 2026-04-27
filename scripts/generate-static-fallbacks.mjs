import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const appFile = path.join(root, "src", "App.tsx");
const indexFile = path.join(distDir, "index.html");
const BASE_URL = "https://freedominterventions.com";

const staticMetadata = {
  "/": {
    title: "Professional Addiction Interventionist | Freedom Interventions",
    description:
      "Matt Brown has 20+ years experience helping families through professional addiction interventions. Free consultation: (541) 838-6009. Nationwide service.",
    heading: "Professional Addiction Interventionist",
    body: "Freedom Interventions helps families move from fear and confusion into a clear plan for intervention, treatment planning, and family recovery support.",
  },
  "/start-here": {
    title: "Start Here | Addiction Intervention Help for Families",
    description:
      "Not sure what your family needs next? Choose a clear path to a call, free consultation, crisis coaching, or intervention readiness support.",
    heading: "Not Sure What to Do Next?",
    body: "Start here if your family needs a simple next step: call Matt, book a free consultation, schedule crisis coaching, or begin intervention readiness support.",
  },
  "/family-intervention": {
    title: "Family Intervention Services | Freedom Interventions",
    description:
      "Professional family intervention services with preparation, treatment planning, intervention facilitation, and aftercare guidance.",
    heading: "Family Intervention Services",
    body: "A professional intervention gives the family structure, language, treatment options, and a calm plan before the conversation happens.",
  },
  "/contact": {
    title: "Contact Freedom Interventions | Free Addiction Intervention Consultation",
    description:
      "Schedule a free, confidential consultation with Matt Brown. Professional addiction intervention services available nationwide. Call (541) 838-6009.",
    heading: "Contact Freedom Interventions",
    body: "Talk directly with Matt Brown about what is happening in your family and what next step makes sense.",
  },
  "/interventionist": {
    title: "About Matt Brown | Professional Interventionist",
    description:
      "Meet Matt Brown, a professional interventionist with 20+ years experience, personal recovery, and direct family intervention experience.",
    heading: "About Matt Brown",
    body: "Matt Brown brings professional intervention experience, personal recovery, and direct family guidance to serious addiction situations.",
  },
  "/crisis-support": {
    title: "Crisis Support | Immediate Addiction Help for Families",
    description:
      "Immediate addiction crisis support for families who need calm guidance, treatment direction, and a clear next step.",
    heading: "Crisis Support for Families",
    body: "When addiction is escalating quickly, families need a calm plan and a professional voice before the situation gets worse.",
  },
  "/treatment-planning": {
    title: "Treatment Planning | Freedom Interventions",
    description:
      "Treatment planning support for families choosing addiction treatment options, placement, logistics, and next steps.",
    heading: "Treatment Planning",
    body: "Freedom Interventions helps families compare treatment options and prepare the path before the window for help closes.",
  },
  "/aftercare-guidance": {
    title: "Aftercare Guidance | Freedom Interventions",
    description:
      "Post-treatment aftercare guidance for families preparing for discharge, relapse risks, boundaries, and recovery support.",
    heading: "Aftercare Guidance",
    body: "Recovery does not end at admission. Families need structure for discharge, relapse planning, boundaries, and long-term support.",
  },
};

const usStates = new Set([
  "alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware",
  "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky",
  "louisiana", "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi",
  "missouri", "montana", "nebraska", "nevada", "new-hampshire", "new-jersey", "new-mexico",
  "new-york", "north-carolina", "north-dakota", "ohio", "oklahoma", "oregon", "pennsylvania",
  "rhode-island", "south-carolina", "south-dakota", "tennessee", "texas", "utah", "vermont",
  "virginia", "washington", "west-virginia", "wisconsin", "wyoming",
]);

const titleCase = (slug) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const getRoutes = async () => {
  const appContent = await readFile(appFile, "utf8");
  return [...new Set([...appContent.matchAll(/path="([^"]+)"/g)].map((match) => match[1]))]
    .filter((route) => !route.includes(":"))
    .filter((route) => !route.includes("*"))
    .filter((route) => !route.startsWith("/admin"))
    .filter((route) => !["/404", "/reschedule"].includes(route));
};

const getMetadata = (route) => {
  if (staticMetadata[route]) return staticMetadata[route];

  const slug = route.replace(/^\//, "");
  const name = titleCase(slug);

  if (usStates.has(slug)) {
    return {
      title: `Addiction Intervention Services in ${name} | Freedom Interventions`,
      description: `${name} families dealing with addiction can get professional intervention support, treatment planning, and family guidance from Freedom Interventions.`,
      heading: `Addiction Intervention Services in ${name}`,
      body: `Freedom Interventions helps families across ${name} prepare for addiction intervention, treatment planning, and the next right step.`,
    };
  }

  if (slug.includes("-")) {
    return {
      title: `Addiction Intervention Services in ${name} | Freedom Interventions`,
      description: `Professional addiction intervention services for families in ${name}. Get confidential family guidance and treatment planning support.`,
      heading: `Addiction Intervention Services in ${name}`,
      body: `Families in ${name} can contact Freedom Interventions for professional addiction intervention guidance, treatment planning, and family support.`,
    };
  }

  return {
    title: `${name} | Freedom Interventions`,
    description: `Freedom Interventions provides professional addiction intervention services, family support, and treatment planning guidance.`,
    heading: name,
    body: `Freedom Interventions helps families dealing with addiction find clarity, structure, and a real next step.`,
  };
};

const fallbackHtml = ({ heading, body }) => `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #1a365d; margin-bottom: 20px;">${escapeHtml(heading)}</h1>
        <p>${escapeHtml(body)}</p>
        <h2 style="color: #2c5282; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Confidential Help for Families</h2>
        <p>Matt Brown works directly with families facing addiction, crisis decisions, treatment planning, and intervention preparation.</p>
        <ul>
          <li>Certified Intervention Professional</li>
          <li>20+ years of experience</li>
          <li>Family intervention, crisis coaching, treatment planning, and aftercare guidance</li>
          <li>Nationwide and Canada service areas</li>
        </ul>
        <div style="background: #f7fafc; padding: 20px; margin: 20px 0; border-left: 4px solid #2c5282;">
          <p><strong>Phone:</strong> <a href="tel:+15418386009" style="color: #2c5282;">(541) 838-6009</a></p>
          <p><strong>Email:</strong> <a href="mailto:matt@freedominterventions.com" style="color: #2c5282;">matt@freedominterventions.com</a></p>
          <p><strong>Start Here:</strong> <a href="https://freedominterventions.com/start-here" style="color: #2c5282;">Find the right next step</a></p>
        </div>
      </div>
`;

const upsertHead = (html, route, metadata) => {
  const canonical = `${BASE_URL}${route === "/" ? "" : route}`;
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const canonicalTag = `<link rel="canonical" href="${canonical}">`;
  const metaTags = [
    `<meta name="description" content="${description}">`,
    canonicalTag,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${BASE_URL}/og-share.jpg">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
  ].join("\n    ");

  return html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?">\n?/g, "")
    .replace(/<link rel="canonical" href=".*?">\n?/g, "")
    .replace("</title>", `</title>\n    ${metaTags}`);
};

const replaceNoscript = (html, metadata) =>
  html.replace(/<noscript>\s*<div style="max-width:[\s\S]*?<\/div>\s*<\/noscript>/, `<noscript>${fallbackHtml(metadata)}    </noscript>`);

const outputPath = (route) => {
  if (route === "/") return indexFile;
  return path.join(distDir, route.replace(/^\//, ""), "index.html");
};

const main = async () => {
  if (!existsSync(indexFile)) throw new Error("dist/index.html not found. Run vite build first.");

  const template = await readFile(indexFile, "utf8");
  const routes = await getRoutes();

  for (const route of routes) {
    const metadata = getMetadata(route);
    const html = replaceNoscript(upsertHead(template, route, metadata), metadata);
    const destination = outputPath(route);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, html, "utf8");
  }

  console.log(`✅ Static SEO fallbacks generated for ${routes.length} routes`);
};

await main();
