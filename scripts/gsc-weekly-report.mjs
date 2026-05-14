import { createServer } from "node:http";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { google } from "googleapis";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const secretsDir = process.env.GSC_SECRETS_DIR || "/Users/matthewbrown/Secrets";
const tokenPath = process.env.GSC_TOKEN_PATH || path.join(secretsDir, "freedominterventions-gsc-token.json");
const reportsDir = process.env.GSC_REPORTS_DIR || "/Users/matthewbrown/Desktop/FreedomInterventions GSC Reports";
const scope = "https://www.googleapis.com/auth/webmasters.readonly";

const targetClusters = [
  {
    name: "Minneapolis professional interventions",
    terms: ["minneapolis", "professional intervention"],
    pageHints: ["minneapolis-minnesota"],
  },
  {
    name: "Family intervention",
    terms: ["family intervention"],
    pageHints: ["family-intervention"],
  },
  {
    name: "Drug intervention in Boise",
    terms: ["boise", "drug intervention"],
    pageHints: ["boise-idaho"],
  },
  {
    name: "Oregon interventionist / alcohol intervention",
    terms: ["oregon"],
    anyTerms: ["interventionist", "alcohol intervention", "professional intervention"],
    pageHints: ["oregon"],
  },
  {
    name: "Washington drug interventionist",
    terms: ["washington"],
    anyTerms: ["drug interventionist", "drug intervention", "interventionist"],
    pageHints: ["washington"],
  },
  {
    name: "North Carolina professional interventionist",
    terms: ["north carolina"],
    anyTerms: ["professional interventionist", "interventionist"],
    pageHints: ["north-carolina"],
  },
  {
    name: "South Dakota professional interventionist",
    terms: ["south dakota"],
    anyTerms: ["professional interventionist", "interventionist"],
    pageHints: ["south-dakota"],
  },
  {
    name: "Drug intervention Iowa",
    terms: ["iowa", "drug intervention"],
    pageHints: ["iowa"],
  },
  {
    name: "Drug intervention Louisiana",
    terms: ["louisiana", "drug intervention"],
    pageHints: ["louisiana"],
  },
  {
    name: "Fentanyl treatment Fort Worth",
    terms: ["fort worth"],
    anyTerms: ["fentanyl treatment", "fentanyl intervention", "opioid"],
    pageHints: ["fort-worth-texas"],
  },
];

const parseArgs = () => {
  const args = new Map();
  for (const arg of process.argv.slice(2)) {
    const [key, value = "true"] = arg.replace(/^--/, "").split("=");
    args.set(key, value);
  }
  return args;
};

const toDate = (date) => date.toISOString().slice(0, 10);

const subtractDays = (date, days) => {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() - days);
  return next;
};

const pct = (value) => `${(Number(value || 0) * 100).toFixed(2)}%`;

const num = (value) => Number(value || 0).toLocaleString("en-US");

const round = (value, places = 1) => Number(value || 0).toFixed(places);

const findClientSecret = async () => {
  const configured = process.env.GSC_CLIENT_SECRET_PATH;
  if (configured && existsSync(configured)) return configured;

  const files = await readdir(secretsDir);
  const match = files.find((file) => /^client_secret_.*\.json$/i.test(file));
  if (!match) {
    throw new Error(`No client_secret_*.json file found in ${secretsDir}`);
  }
  return path.join(secretsDir, match);
};

const readClient = async () => {
  const clientSecretPath = await findClientSecret();
  const raw = JSON.parse(await readFile(clientSecretPath, "utf8"));
  const credentials = raw.installed || raw.web;
  if (!credentials?.client_id || !credentials?.client_secret) {
    throw new Error("OAuth client file is missing client_id or client_secret.");
  }
  return credentials;
};

const waitForOAuthCode = async (oauth2Client, openBrowser = true) => {
  const server = createServer();

  const codePromise = new Promise((resolve, reject) => {
    server.on("request", (req, res) => {
      try {
        const url = new URL(req.url || "/", oauth2Client.redirectUri);
        const code = url.searchParams.get("code");
        const error = url.searchParams.get("error");

        if (error) {
          res.writeHead(400, { "content-type": "text/plain" });
          res.end(`Authorization failed: ${error}`);
          reject(new Error(error));
          return;
        }

        if (!code) {
          res.writeHead(404, { "content-type": "text/plain" });
          res.end("No OAuth code found.");
          return;
        }

        res.writeHead(200, { "content-type": "text/plain" });
        res.end("Search Console authorization complete. You can close this tab and return to Codex.");
        resolve(code);
      } catch (error) {
        reject(error);
      }
    });
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  oauth2Client.redirectUri = `http://127.0.0.1:${port}/oauth2callback`;

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [scope],
  });

  console.log("\nOpen this URL to authorize Search Console access:\n");
  console.log(authUrl);
  console.log("");

  if (openBrowser && process.platform === "darwin") {
    const { spawn } = await import("node:child_process");
    spawn("open", [authUrl], { stdio: "ignore", detached: true }).unref();
  }

  try {
    return await codePromise;
  } finally {
    server.close();
  }
};

const getAuthClient = async ({ reauth = false, openBrowser = true } = {}) => {
  const credentials = await readClient();
  const oauth2Client = new google.auth.OAuth2(credentials.client_id, credentials.client_secret);

  if (!reauth && existsSync(tokenPath)) {
    oauth2Client.setCredentials(JSON.parse(await readFile(tokenPath, "utf8")));
    return oauth2Client;
  }

  const code = await waitForOAuthCode(oauth2Client, openBrowser);
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  await mkdir(path.dirname(tokenPath), { recursive: true });
  await writeFile(tokenPath, JSON.stringify(tokens, null, 2), "utf8");
  console.log(`Saved OAuth token to ${tokenPath}`);
  return oauth2Client;
};

const querySearchAnalytics = async (service, siteUrl, requestBody) => {
  const response = await service.searchanalytics.query({ siteUrl, requestBody });
  return response.data.rows || [];
};

const selectSiteUrl = async (service, requestedSiteUrl) => {
  if (requestedSiteUrl) return requestedSiteUrl;

  const response = await service.sites.list();
  const sites = response.data.siteEntry || [];
  const matches = sites.filter((site) => /freedominterventions\.com/i.test(site.siteUrl || ""));

  if (matches.length === 0) {
    throw new Error("No Search Console property matching freedominterventions.com was found for this Google account.");
  }

  const domain = matches.find((site) => site.siteUrl === "sc-domain:freedominterventions.com");
  const https = matches.find((site) => site.siteUrl === "https://freedominterventions.com/");
  return (domain || https || matches[0]).siteUrl;
};

const matchCluster = (row, cluster) => {
  const query = String(row.keys?.[0] || "").toLowerCase();
  const page = String(row.keys?.[1] || "").toLowerCase();
  const hasTerms = cluster.terms.every((term) => query.includes(term));
  const hasAny = !cluster.anyTerms || cluster.anyTerms.some((term) => query.includes(term));
  const hasPage = !cluster.pageHints || cluster.pageHints.some((hint) => page.includes(hint));
  return hasTerms && hasAny && hasPage;
};

const aggregateRows = (rows) => {
  const totals = rows.reduce(
    (acc, row) => {
      acc.clicks += row.clicks || 0;
      acc.impressions += row.impressions || 0;
      acc.positionWeighted += (row.position || 0) * (row.impressions || 0);
      return acc;
    },
    { clicks: 0, impressions: 0, positionWeighted: 0 },
  );

  return {
    clicks: totals.clicks,
    impressions: totals.impressions,
    ctr: totals.impressions ? totals.clicks / totals.impressions : 0,
    position: totals.impressions ? totals.positionWeighted / totals.impressions : 0,
  };
};

const topRows = (rows, limit = 10) =>
  rows
    .slice()
    .sort((a, b) => (b.clicks || 0) - (a.clicks || 0) || (b.impressions || 0) - (a.impressions || 0))
    .slice(0, limit);

const opportunityRows = (rows, limit = 10) =>
  rows
    .filter((row) => (row.impressions || 0) >= 10)
    .slice()
    .sort((a, b) => (b.impressions || 0) - (a.impressions || 0))
    .slice(0, limit);

const rowTable = (rows, headers, mapper) => {
  const lines = [`| ${headers.join(" | ")} |`, `| ${headers.map(() => "---").join(" | ")} |`];
  for (const row of rows) lines.push(`| ${mapper(row).join(" | ")} |`);
  return lines.join("\n");
};

const createReport = ({ siteUrl, startDate, endDate, queryRows, pageRows, queryPageRows }) => {
  const total = aggregateRows(pageRows);
  const clusterRows = targetClusters.map((cluster) => ({
    cluster: cluster.name,
    ...aggregateRows(queryPageRows.filter((row) => matchCluster(row, cluster))),
  }));

  const topQueries = topRows(queryRows);
  const topPages = topRows(pageRows);
  const opportunities = opportunityRows(queryPageRows);
  const noClickOpportunities = opportunityRows(queryPageRows.filter((row) => !row.clicks), 12);

  const report = `# GSC Weekly Report

Property: \`${siteUrl}\`

Date range: ${startDate} to ${endDate}

## Executive Read

- Total organic search clicks: ${num(total.clicks)}
- Total impressions: ${num(total.impressions)}
- CTR: ${pct(total.ctr)}
- Average position: ${round(total.position)}

The main business question is whether non-branded search impressions are becoming phone calls, emails, or booked appointments. This report tracks the search side. GA4/event data should be connected next to close the loop on lead actions.

## Priority Query Clusters

${rowTable(clusterRows, ["Cluster", "Clicks", "Impressions", "CTR", "Avg Pos"], (row) => [
  row.cluster,
  num(row.clicks),
  num(row.impressions),
  pct(row.ctr),
  round(row.position),
])}

## Top Queries By Clicks

${rowTable(topQueries, ["Query", "Clicks", "Impressions", "CTR", "Avg Pos"], (row) => [
  row.keys?.[0] || "",
  num(row.clicks),
  num(row.impressions),
  pct(row.ctr),
  round(row.position),
])}

## Top Pages By Clicks

${rowTable(topPages, ["Page", "Clicks", "Impressions", "CTR", "Avg Pos"], (row) => [
  row.keys?.[0] || "",
  num(row.clicks),
  num(row.impressions),
  pct(row.ctr),
  round(row.position),
])}

## High-Impression Opportunities

${rowTable(opportunities, ["Query", "Page", "Clicks", "Impressions", "CTR", "Avg Pos"], (row) => [
  row.keys?.[0] || "",
  row.keys?.[1] || "",
  num(row.clicks),
  num(row.impressions),
  pct(row.ctr),
  round(row.position),
])}

## Zero-Click Opportunities

${rowTable(noClickOpportunities, ["Query", "Page", "Impressions", "Avg Pos"], (row) => [
  row.keys?.[0] || "",
  row.keys?.[1] || "",
  num(row.impressions),
  round(row.position),
])}

## Recommended Next Action

1. If a priority cluster has impressions but CTR below 1%, rewrite the title/meta/H1 around that query.
2. If CTR is healthy but calls/bookings are low, adjust above-the-fold copy and CTA placement.
3. If average position is worse than 15, build supporting internal links or add content depth before changing the snippet again.
4. If a page is getting clicks from the wrong query intent, split or refocus the page.
`;

  return { report, clusterRows, topQueries, topPages, opportunities, noClickOpportunities, total };
};

const main = async () => {
  const args = parseArgs();
  const now = new Date();
  const endDate = args.get("end") || toDate(subtractDays(now, 2));
  const days = Number(args.get("days") || 7);
  const startDate = args.get("start") || toDate(subtractDays(new Date(`${endDate}T00:00:00Z`), days - 1));

  const auth = await getAuthClient({
    reauth: args.has("reauth"),
    openBrowser: !args.has("no-open"),
  });
  const service = google.searchconsole({ version: "v1", auth });
  const siteUrl = await selectSiteUrl(service, args.get("site") || process.env.GSC_SITE_URL);

  const baseRequest = {
    startDate,
    endDate,
    rowLimit: Number(args.get("rowLimit") || 25000),
    searchType: "web",
  };

  const [queryRows, pageRows, queryPageRows] = await Promise.all([
    querySearchAnalytics(service, siteUrl, { ...baseRequest, dimensions: ["query"] }),
    querySearchAnalytics(service, siteUrl, { ...baseRequest, dimensions: ["page"] }),
    querySearchAnalytics(service, siteUrl, { ...baseRequest, dimensions: ["query", "page"] }),
  ]);

  const result = createReport({ siteUrl, startDate, endDate, queryRows, pageRows, queryPageRows });
  await mkdir(reportsDir, { recursive: true });
  const reportPath = path.join(reportsDir, `${endDate}-weekly-gsc-report.md`);
  const dataPath = path.join(reportsDir, `${endDate}-weekly-gsc-data.json`);

  await writeFile(reportPath, result.report, "utf8");
  await writeFile(
    dataPath,
    JSON.stringify(
      {
        siteUrl,
        startDate,
        endDate,
        generatedAt: new Date().toISOString(),
        ...result,
        report: undefined,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(`Wrote ${reportPath}`);
  console.log(`Wrote ${dataPath}`);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
