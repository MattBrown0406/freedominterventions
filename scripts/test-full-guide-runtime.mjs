import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
const port = process.env.SEO_TEST_PORT || "4496";
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["node_modules/vite/bin/vite.js", "preview", "--strictPort", "--host", "127.0.0.1", "--port", port]);
let ready = false;
server.stdout.on("data", d => { if (d.toString().includes(origin)) ready = true; });
server.stderr.on("data", d => process.stderr.write(d));
let browser;
const report = { origin, at: new Date().toISOString(), routes: [], destinations: [] };
const extract = () => {
  const norm = s => s.replace(/\s+/g, " ").trim();
  const main = document.querySelector("main");
  const nodes = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).flatMap(s => {
    const data = JSON.parse(s.textContent); return data["@graph"] || [data];
  });
  return {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content,
    canonical: Array.from(document.querySelectorAll('link[rel="canonical"]')).map(e => e.href),
    robots: Array.from(document.querySelectorAll('meta[name="robots"]')).map(e => e.content),
    mainCount: document.querySelectorAll("main").length,
    h1: Array.from(document.querySelectorAll("h1")).map(e => norm(e.textContent)),
    headings: Array.from(document.querySelectorAll("main h1,main h2,main h3,main h4")).map(e => [e.tagName,norm(e.textContent)]),
    text: norm(main?.textContent || ""),
    links: Array.from(document.querySelectorAll("main a[href]")).map(e => [norm(e.textContent),e.getAttribute("href")]),
    org: nodes.filter(n => [].concat(n["@type"]).includes("Organization")),
    people: nodes.filter(n => n["@type"] === "Person"),
    profiles: nodes.filter(n => n["@type"] === "ProfilePage"),
    width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
    loading: /Loading[.…]/.test(document.querySelector("#root")?.textContent || ""),
    summary: document.querySelectorAll("noscript").length,
    developmentAssets: Array.from(document.querySelectorAll("[src],link[href]")).filter(e => /^\/(src|@fs|@vite)\//.test(e.getAttribute("src") || e.getAttribute("href") || "")).length,
  };
};
try {
  for (let n=0; !ready; n++) {
    assert(server.exitCode === null, "preview exited before ready"); assert(n<120,"preview timeout");
    await new Promise(r=>setTimeout(r,250));
  }
  assert((await fetch(origin)).ok);
  browser = await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROME_PATH});
  for (const route of ["intervention-toolkit","interventionist"]) {
    assert.equal(await readFile(`dist/${route}.html`,"utf8"),await readFile(`dist/${route}/index.html`,"utf8"));
    let initial;
    for (const suffix of [".html","/index.html",""]) {
      const ctx=await browser.newContext({javaScriptEnabled:false});
      const p=await ctx.newPage();
      assert.equal((await p.goto(`${origin}/${route}${suffix}`)).status(),200);
      const data=await p.evaluate(extract);
      assert.equal(data.mainCount,1); assert.equal(data.h1.length,1); assert.equal(data.canonical.length,1);
      assert.equal(data.org.length,1); assert.equal(data.people.length,1); assert.equal(data.summary,0);
      assert.equal(data.developmentAssets,0); assert.equal(data.org[0].sameAs,undefined);
      if(initial) assert.equal(data.text,initial.text); else initial=data;
      report.routes.push({route,suffix,mode:"raw",...data}); await ctx.close();
    }
    for (const width of [390,1280]) {
      const ctx=await browser.newContext({viewport:{width,height:900}});
      await ctx.route("**/*",r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());
      const p=await ctx.newPage(); const errors=[];p.on("pageerror",e=>errors.push(e.message));
      await p.goto(`${origin}/${route}`,{waitUntil:"networkidle"});
      await p.waitForTimeout(1000); const data=await p.evaluate(extract);
      assert.equal(data.text,initial.text,"full raw/hydrated main word parity");
      assert.deepEqual(data.headings,initial.headings); assert.deepEqual(data.links,initial.links);
      assert.equal(data.title,initial.title); assert.equal(data.description,initial.description);
      assert.deepEqual(data.canonical,initial.canonical); assert.equal(data.canonical.length,1);
      assert.equal(data.mainCount,1); assert.equal(data.org.length,1); assert.equal(data.people.length,1);
      assert.equal(data.org[0].sameAs,undefined); assert(data.scrollWidth<=width,`${route} overflow at ${width}`);
      if(route==="interventionist") assert.equal(data.profiles.length,1);
      assert.equal(errors.length,0); report.routes.push({route,mode:"hydrated",errors,...data});
      await ctx.close();
    }
  }
  const ctx=await browser.newContext();
  await ctx.route("**/*",r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());
  const p=await ctx.newPage();
  for(const target of ["/family-intervention","/contact","/oregon","/book-intervention-consultation#booking"]){
    await p.goto(origin+target,{waitUntil:"networkidle"});await p.waitForTimeout(300);
    assert(!/Page Not Found|Post not found/.test(await p.locator("body").innerText()));
    if(target.includes("#")) assert.equal(await p.locator("#booking").count(),1);
    report.destinations.push({target,h1:await p.locator("h1").allTextContents(),passed:true});
  }
  // SPA head ownership: route away and back without a new document.
  await p.goto(origin+"/intervention-toolkit",{waitUntil:"networkidle"});
  await p.locator('main a[href="/family-intervention"]').click(); await p.waitForTimeout(700);
  await p.goBack();await p.waitForTimeout(700);
  assert.equal(await p.locator('link[rel="canonical"]').count(),1);
  assert.equal(await p.locator('link[rel="canonical"]').getAttribute("href"),"https://freedominterventions.com/intervention-toolkit");
  report.spa=true;
  await writeFile(process.env.SEO_TEST_REPORT || "../runtime-verification.json",JSON.stringify(report,null,2));
  console.log(JSON.stringify({passed:true,checks:report.routes.length,destinations:report.destinations.length,words:report.routes.filter(r=>r.mode==="raw"&&r.suffix==="").map(r=>[r.route,r.text.split(/\s+/).length]),spa:report.spa},null,2));
} finally {
  await browser?.close(); server.kill("SIGTERM");
}
