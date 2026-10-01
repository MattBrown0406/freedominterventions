import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fitSeoDescription, fitSeoTitle, markHelmetManagedTags } from "./helmet-markup.mjs";
import { excludedSitemapRoutes, canonicalRouteAliases } from "./seo-routes.mjs";
import { COST_ANSWER_ROUTE, costAnswerMetadata, answerMetadata } from "./answer-fallback.mjs";
import { pageFallbackSources, pageFallbackMetadata } from "./page-fallback.mjs";
import { FULL_GUIDE_ROUTE, renderFullGuide, installFullGuide } from "./full-guide-fallback.mjs";
import { SERVICE_AREAS_ROUTE, renderServiceAreas, installServiceAreas } from "./service-areas-fallback.mjs";

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
const locationsFile = path.join(root, "src", "data", "locations.ts");
const indexFile = path.join(distDir, "index.html");
// Pristine Vite index.html (generic title, no canonical). Captured before any
// generator rewrites dist/index.html with the home page fallback/prerender.
// Fallback generators use it as their template, and the Cloudflare Worker
// serves it instead of the home document for URLs with no generated file.
const spaShellFile = path.join(distDir, "spa-shell.html");
const BASE_URL = "https://freedominterventions.com";

const staticMetadata = {
  "/next-step": {
    title: "Not ready to call? | Freedom Interventions",
    description: "Make a private next-step plan for understanding addiction support, preparing a family conversation, or finding urgent help. No sign-up required.",
    heading: "Make a plan for your next step",
    body: "Enable JavaScript to use this guide without sharing your choices. For immediate danger or suspected overdose, call 911 in the US or Canada. For a suicide crisis, call or text 988. This guide is not monitored and does not replace urgent help.",
  },
  "/": {
    title: "Professional Addiction Interventionist | Freedom Interventions",
    description:
      "Matt Brown has 20+ years experience helping families through professional addiction interventions. Free consultation: (458) 298-8000. Nationwide service.",
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
    title: "Family Intervention Services | Help a Loved One Accept Treatment",
    description:
      "Family intervention services led by Matt Brown. Plan a drug or alcohol intervention, treatment entry, and family boundaries. Call (458) 298-8000.",
    heading:
      "Family Intervention Services to Help a Loved One Accept Treatment",
    body: "Matt Brown helps families plan the conversation, line up treatment, and set boundaries before addiction gets another chance to negotiate.",
  },
  "/minneapolis-minnesota": {
    title: "Minneapolis Professional Interventions | Call Matt Brown",
    description:
      "Need a professional intervention in Minneapolis? Get a confidential family plan, treatment options, and direct help from Matt Brown. Call (458) 298-8000.",
    heading:
      "Professional Interventions in Minneapolis for Families Facing Addiction",
    body: "Freedom Interventions helps Twin Cities families prepare the intervention, line up treatment, and stop reacting crisis by crisis.",
  },
  "/boise-idaho": {
    title: "Drug Interventions in Boise | Confidential Family Help",
    description:
      "Planning a drug intervention in Boise? Get a confidential family plan, treatment options, and direct help from Matt Brown. Call (458) 298-8000.",
    heading: "Drug Intervention in Boise for Families Who Need a Real Plan",
    body: "Freedom Interventions helps Boise families prepare the intervention, line up treatment, and stop the cycle of rescuing, arguing, and waiting.",
  },
  "/oregon": {
    title:
      "Oregon Interventionist for Drug & Alcohol Addiction | Freedom Interventions",
    description:
      "Need an Oregon interventionist? Matt Brown helps families plan drug, alcohol, and fentanyl interventions with treatment entry. Call (458) 298-8000.",
    heading: "Oregon Interventionist for Drug, Alcohol, and Fentanyl Addiction",
    body: "Matt Brown helps families across Oregon prepare the intervention, coordinate treatment, and stop the cycle of panic and repeated crisis.",
  },
  "/nevada": {
    title: "Nevada Interventionist | Drug & Alcohol Family Help",
    description:
      "Need an interventionist in Nevada? Matt Brown helps families prepare drug and alcohol interventions and treatment entry. Call (458) 298-8000.",
    heading:
      "Professional Interventionist in Nevada for Families Facing Addiction",
    body: "If a loved one keeps refusing help, Matt Brown helps Nevada families assess the risk, prepare the intervention, coordinate treatment, and stop reacting crisis by crisis.",
  },
  "/alaska": {
    title:
      "Interventionist Alaska | Family Addiction Help | Freedom Interventions",
    description:
      "Need an interventionist in Alaska? Matt Brown helps families plan drug, alcohol, meth, and fentanyl interventions and treatment travel. Call (458) 298-8000.",
    heading:
      "Professional Interventionist in Alaska for Families Facing Addiction",
    body: "Matt Brown helps Alaska families prepare the intervention, coordinate appropriate treatment, and plan travel before the family conversation happens.",
  },
  "/washington": {
    title: "Drug Interventionist in Washington | Family Intervention Help",
    description:
      "Need a drug interventionist in Washington? Matt Brown helps families plan intervention, treatment entry, and boundaries. Call (458) 298-8000.",
    heading:
      "Drug Interventionist in Washington for Families Who Need Structure",
    body: "Matt Brown helps Washington families prepare drug, alcohol, and fentanyl interventions, coordinate treatment, and hold clear boundaries.",
  },
  "/north-carolina": {
    title:
      "Professional Interventionist in North Carolina | Drug & Alcohol Help",
    description:
      "Need a professional interventionist in North Carolina? Matt Brown helps families plan drug, alcohol, and fentanyl interventions. Call (458) 298-8000.",
    heading:
      "Professional Interventionist in North Carolina for Drug and Alcohol Addiction",
    body: "Matt Brown helps North Carolina families prepare the intervention, line up treatment, and stop the cycle of panic, rescuing, and relapse.",
  },
  "/south-dakota": {
    title: "Professional Interventionist in South Dakota | Drug & Alcohol Help",
    description:
      "Need a professional interventionist in South Dakota? Matt Brown helps families plan drug, alcohol, meth, and fentanyl interventions. Call (458) 298-8000.",
    heading:
      "Professional Interventionist in South Dakota for Drug and Alcohol Addiction",
    body: "Matt Brown helps South Dakota families prepare the intervention, coordinate treatment, and stop living at addiction's pace.",
  },
  "/iowa": {
    title:
      "Drug Intervention in Iowa | Professional Interventionist for Families",
    description:
      "Need a drug intervention in Iowa? Matt Brown helps families plan treatment entry, boundaries, and intervention next steps. Call (458) 298-8000.",
    heading: "Drug Intervention in Iowa for Families Who Need a Real Plan",
    body: "Freedom Interventions helps Iowa families prepare drug and alcohol interventions, line up treatment, and set boundaries.",
  },
  "/louisiana": {
    title: "Drug Intervention in Louisiana | Family Intervention Help",
    description:
      "Need a drug intervention in Louisiana? Matt Brown helps families plan treatment entry, boundaries, and next steps. Call (458) 298-8000.",
    heading: "Drug Intervention in Louisiana for Families Who Need Help Now",
    body: "Freedom Interventions helps Louisiana families prepare the intervention, coordinate treatment entry, and stop reacting from crisis to crisis.",
  },
  "/fort-worth-texas": {
    title:
      "Fentanyl Intervention Help in Fort Worth | Treatment Planning Support",
    description:
      "Fort Worth fentanyl intervention and treatment planning help for families. Matt Brown helps move loved ones toward care. Call (458) 298-8000.",
    heading: "Fentanyl Intervention and Treatment Planning Help in Fort Worth",
    body: "Freedom Interventions helps Fort Worth families plan fentanyl intervention, treatment entry, and urgent next steps.",
  },
  "/contact": {
    title:
      "Contact Freedom Interventions | Free Addiction Intervention Consultation",
    description:
      "Schedule a free, confidential consultation with Matt Brown. Professional addiction intervention services available nationwide. Call (458) 298-8000.",
    heading: "Contact Freedom Interventions",
    body: "Talk directly with Matt Brown about what is happening in your family and what next step makes sense.",
  },
  "/interventionist": {
    title: "Oregon Interventionist Matt Brown | Freedom Interventions",
    description:
      "Oregon-based interventionist Matt Brown helps families prepare for drug and alcohol treatment. 20+ years experience. Call (458) 298-8000.",
    heading: "Matt Brown: Oregon Interventionist for Families in Crisis",
    body: "Matt Brown brings professional intervention experience, personal recovery, and direct family guidance to serious addiction situations.",
  },
  "/intervention-answers": {
    title:
      "Addiction Intervention Answers for Families | Freedom Interventions",
    description:
      "Clear answers for families deciding whether addiction has become intervention-level, what to do first, and when to call Freedom Interventions.",
    heading: "Addiction Intervention Answers",
    body: "Freedom Interventions gives families direct answers about intervention readiness, treatment refusal, cost, preparation, and the safest next step.",
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
  const interventionAnswerContent = await readFile(
    interventionAnswersFile,
    "utf8",
  );
  const appRoutes = [...appContent.matchAll(/path="([^"]+)"/g)].map(
    (match) => match[1],
  );
  const interventionAnswerRoutes = [
    ...interventionAnswerContent.matchAll(/slug:\s*"([^"]+)"/g),
  ].map((match) => `/intervention-answers/${match[1]}`);

  return [...new Set([...appRoutes, ...interventionAnswerRoutes, ...canonicalRouteAliases.keys()])]
    .filter((route) => !route.includes(":"))
    .filter((route) => !route.includes("*"));
};

// Real locations only: states, cities, and provinces from src/data/locations.ts,
// plus "<place>-<us-state>" routes (e.g. /oahu-hawaii) not listed there.
// Every other slug is a regular page and must never be treated as a place.
const getLocations = async () => {
  const source = await readFile(locationsFile, "utf8");
  const states = new Map();
  const places = new Map();
  for (const [, body] of source.matchAll(/\{([^{}]*\bslug:\s*"[^"]+"[^{}]*)\}/g)) {
    const field = (name) => body.match(new RegExp(`\\b${name}:\\s*"([^"]+)"`))?.[1];
    const slug = field("slug");
    const name = field("name");
    if (!slug || !name) continue;
    if (field("region")) states.set(slug, name);
    places.set(slug, field("state") ? `${name}, ${field("state")}` : name);
  }
  if (!states.size || !places.size) {
    throw new Error("src/data/locations.ts format changed; update getLocations in generate-static-fallbacks.mjs.");
  }
  return { states, places };
};

const locationName = (slug, { states, places }) => {
  if (places.has(slug)) return places.get(slug);
  for (const [stateSlug, stateName] of states) {
    const prefix = slug.endsWith(`-${stateSlug}`) ? slug.slice(0, -stateSlug.length - 1) : "";
    if (prefix && !prefix.includes("/")) return `${titleCase(prefix)}, ${stateName}`;
  }
  return null;
};

// Route -> page component source file, for reading literal <SEOHead> props.
const getRouteSourceFiles = (appContent) => {
  const componentFiles = new Map();
  for (const [, component, pageFile] of appContent.matchAll(/import\s+([A-Za-z0-9_]+)\s+from\s+["']\.\/pages\/([^"']+)["']/g)) {
    componentFiles.set(component, `src/pages/${pageFile}.tsx`);
  }
  for (const [, component, pageFile] of appContent.matchAll(/const\s+([A-Za-z0-9_]+)\s*=\s*lazy\(\(\)\s*=>\s*import\(["']\.\/pages\/([^"']+)["']\)\)/g)) {
    componentFiles.set(component, `src/pages/${pageFile}.tsx`);
  }
  const routeFiles = new Map();
  for (const [, route, component] of appContent.matchAll(/<Route\s+path="([^"]+)"[\s\S]{0,180}?element=\{<([A-Za-z0-9_]+)/g)) {
    if (componentFiles.has(component)) routeFiles.set(route, componentFiles.get(component));
  }
  return routeFiles;
};

const seoHeadMetadata = async (sourceFile) => {
  const file = sourceFile && path.join(root, sourceFile);
  if (!file || !existsSync(file)) return null;
  const head = (await readFile(file, "utf8")).match(/<SEOHead\s([\s\S]*?)\/>/)?.[1];
  const literal = (name) => head?.match(new RegExp(`\\b${name}="([^"]+)"`))?.[1]?.replace(/\s+/g, " ").trim();
  const title = literal("title");
  const description = literal("description");
  if (!title || !description) return null;
  return {
    title: title.includes("Freedom Interventions") ? title : `${title} | Freedom Interventions`,
    description,
    heading: title.replace(/\s*\|\s*Freedom Interventions$/, ""),
    body: description,
  };
};

const getMetadata = async (route, context) => {
  if (staticMetadata[route]) return staticMetadata[route];

  const slug = route.replace(/^\//, "");

  if (route.startsWith("/intervention-answers/")) {
    const answer = answerMetadata(context.answerSource, slug.slice("intervention-answers/".length));
    if (answer) return answer;
  }

  const location = locationName(slug, context.locations);
  if (location && context.locations.states.has(slug)) {
    return {
      title: `Addiction Intervention Services in ${location} | Freedom Interventions`,
      description: `${location} families dealing with addiction can get professional intervention support, treatment planning, and family guidance from Freedom Interventions.`,
      heading: `Addiction Intervention Services in ${location}`,
      body: `Freedom Interventions helps families across ${location} prepare for addiction intervention, treatment planning, and the next right step.`,
    };
  }

  if (location) {
    return {
      title: `Addiction Intervention Services in ${location} | Freedom Interventions`,
      description: `Professional addiction intervention services for families in ${location}. Get confidential family guidance and treatment planning support.`,
      heading: `Addiction Intervention Services in ${location}`,
      body: `Families in ${location} can contact Freedom Interventions for professional addiction intervention guidance, treatment planning, and family support.`,
    };
  }

  const fromSeoHead = await seoHeadMetadata(context.routeSourceFiles.get(route));
  if (fromSeoHead) return fromSeoHead;

  const name = titleCase(slug.split("/").pop() || "Home");
  return {
    title: `${name} | Freedom Interventions`,
    description: `${name}: Freedom Interventions provides professional addiction intervention services, family support, and treatment planning guidance.`,
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
          <p><strong>Phone:</strong> <a href="tel:+14582988000" style="color: #2c5282;">(458) 298-8000</a></p>
          <p><strong>Email:</strong> <a href="mailto:matt@freedominterventions.com" style="color: #2c5282;">matt@freedominterventions.com</a></p>
          <p><strong>Start Here:</strong> <a href="https://freedominterventions.com/start-here" style="color: #2c5282;">Find the right next step</a></p>
        </div>
      </div>
`;

const upsertHead = (html, route, metadata) => {
  const canonicalPath = canonicalRouteAliases.get(route) ?? route;
  const canonical = `${BASE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;
  const noindex = excludedSitemapRoutes.has(route) && !canonicalRouteAliases.has(route);
  // Mirrors SEOHead. Only real locations (see getMetadata) get these titles.
  const preserveMeasuredTitle =
    ["/boise-idaho", "/interventionist", "/minneapolis-minnesota"].includes(route) ||
    /^(Addiction Intervention Services|Professional Interventionist|Drug & Alcohol Interventionist) (in|on) /i.test(metadata.title);
  const title = escapeHtml(preserveMeasuredTitle ? metadata.title : fitSeoTitle(metadata.title));
  const description = escapeHtml(fitSeoDescription(metadata.description));
  const canonicalTag = `<link rel="canonical" href="${canonical}">`;
  const metaTags = [
    `<meta name="description" content="${description}">`,
    `<meta name="robots" content="${noindex ? (route === "/next-step" ? "noindex, follow" : "noindex, nofollow") : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}">`,
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
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?">\n?/g, "")
    .replace(/<meta name="robots" content=".*?">\n?/g, "")
    .replace(/<link rel="canonical" href=".*?">\n?/g, "")
    .replace("</title>", `</title>\n    ${metaTags}`);
};

const replaceNoscript = (html, metadata) =>
  html.replace(
    /<noscript>\s*<div style="max-width:[\s\S]*?<\/div>\s*<\/noscript>/,
    `<noscript>${fallbackHtml(metadata)}    </noscript>`,
  );

const outputPaths = (route) => {
  if (route === "/") return [indexFile];

  const cleanRoute = route.replace(/^\//, "").replace(/\/+$/, "");
  return [
    path.join(distDir, cleanRoute, "index.html"),
    path.join(distDir, `${cleanRoute}.html`),
  ];
};

const main = async () => {
  if (!existsSync(indexFile))
    throw new Error("dist/index.html not found. Run vite build first.");

  // Snapshot the pristine Vite shell once; reruns without a fresh vite build
  // keep using the original snapshot instead of an already-rewritten index.
  if (!existsSync(spaShellFile)) await copyFile(indexFile, spaShellFile);
  const template = await readFile(spaShellFile, "utf8");
  const fullGuide = await renderFullGuide(root);
  const serviceAreas = await renderServiceAreas(root);
  const routes = await getRoutes();
  const answerSource = await readFile(interventionAnswersFile, "utf8");
  staticMetadata[COST_ANSWER_ROUTE] = costAnswerMetadata(answerSource);
  const context = {
    answerSource,
    locations: await getLocations(),
    routeSourceFiles: getRouteSourceFiles(await readFile(appFile, "utf8")),
  };

  for (const [route, sourceFile] of Object.entries(pageFallbackSources)) {
    staticMetadata[route] = pageFallbackMetadata(await readFile(path.join(root, sourceFile), "utf8"), route);
  }

  for (const route of routes) {
    const metadata = await getMetadata(route, context);
    let html = markHelmetManagedTags(replaceNoscript(
      upsertHead(route === "/next-step"
        ? template.replace(/<link\b[^>]*href="https:\/\/fonts\.(?:googleapis|gstatic)\.com[^>]*>/g, "")
        : template, route, metadata),
      metadata,
    ));
    if (route === FULL_GUIDE_ROUTE) html = installFullGuide(html, fullGuide);
    if (route === SERVICE_AREAS_ROUTE) html = installServiceAreas(html, serviceAreas);
    const destinations = outputPaths(route);
    for (const destination of destinations) {
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, html, "utf8");
    }
  }

  console.log(`✅ Static SEO fallbacks generated for ${routes.length} routes`);
};

await main();
