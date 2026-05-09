import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { createClient } from '@supabase/supabase-js';

const defaultChromeExecutablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const appFile = path.join(root, 'src', 'App.tsx');
const interventionAnswersFile = path.join(root, 'src', 'data', 'interventionAnswers.ts');
const envFile = path.join(root, '.env');
const previewPort = Number(process.env.PRERENDER_PREVIEW_PORT || 4273);
const previewOrigin = `http://127.0.0.1:${previewPort}`;

const loadEnv = async () => {
  const env = {
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_PUBLISHABLE_KEY: process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  };

  if (existsSync(envFile)) {
    const raw = await readFile(envFile, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const index = trimmed.indexOf('=');
      if (index === -1) continue;
      const key = trimmed.slice(0, index).trim();
      let value = trimmed.slice(index + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      env[key] = env[key] || value;
    }
  }

  if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_PUBLISHABLE_KEY) {
    throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY for prerender blog route discovery.');
  }

  return env;
};

const getStaticRoutes = async () => {
  const appContent = await readFile(appFile, 'utf8');
  const answerContent = await readFile(interventionAnswersFile, 'utf8');
  const appRoutes = [...appContent.matchAll(/path="([^"]+)"/g)].map((match) => match[1]);
  const interventionAnswerRoutes = [...answerContent.matchAll(/slug:\s*"([^"]+)"/g)]
    .map((match) => `/intervention-answers/${match[1]}`);

  return [...new Set([...appRoutes, ...interventionAnswerRoutes])]
    .filter((route) => !route.includes(':'))
    .filter((route) => !route.includes('*'))
    .filter((route) => !route.startsWith('/admin'))
    .filter((route) => !['/404', '/reschedule'].includes(route));
};

const getBlogRoutes = async (env) => {
  const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(({ slug }) => `/blog/${slug}`);
};

const toOutputPath = (route) => {
  if (route === '/') return path.join(distDir, 'index.html');
  const cleanRoute = route.replace(/^\//, '').replace(/\/+$/, '');
  return path.join(distDir, cleanRoute, 'index.html');
};

const waitForAppReady = async (page, route) => {
  try {
    await page.waitForLoadState('networkidle', { timeout: 10000 });
  } catch {
    // some pages keep background work alive, so fall back to content checks
  }

  await page.waitForFunction(() => {
    const root = document.querySelector('#root');
    return !!root && root.textContent && root.textContent.trim().length > 0;
  }, { timeout: 30000 });

  if (route === '/blog') {
    await page.waitForFunction(() => /\bBlog\b/.test(document.body.innerText), { timeout: 30000 });
  }

  if (route.startsWith('/blog/')) {
    await page.waitForFunction(() => /Back to Blog/.test(document.body.innerText), { timeout: 30000 });
  }

  await page.waitForTimeout(500);
};

const startPreviewServer = () => {
  const child = spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', String(previewPort)], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: process.env,
  });

  const ready = (async () => {
    for (let attempt = 0; attempt < 120; attempt += 1) {
      if (child.exitCode !== null) {
        throw new Error(`vite preview exited early with code ${child.exitCode}`);
      }

      try {
        const response = await fetch(previewOrigin);
        if (response.ok) return;
      } catch {
        // wait and retry
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    throw new Error('Timed out waiting for vite preview server');
  })();

  return { child, ready };
};

const resolveChromiumLaunchOptions = () => {
  const configuredExecutablePath = process.env.PLAYWRIGHT_CHROME_PATH || process.env.CHROME_BIN;
  if (configuredExecutablePath) {
    return { headless: true, executablePath: configuredExecutablePath };
  }

  if (existsSync(defaultChromeExecutablePath)) {
    return { headless: true, executablePath: defaultChromeExecutablePath };
  }

  return { headless: true };
};

const loadChromium = async () => {
  const playwright = await import('playwright');
  return playwright.chromium;
};

const main = async () => {
  if (!existsSync(distDir)) throw new Error('dist directory does not exist. Run vite build first.');

  // Check if Playwright browsers are available before attempting to launch
  let chromium;
  try {
    chromium = await loadChromium();
    const testBrowser = await chromium.launch(resolveChromiumLaunchOptions());
    await testBrowser.close();
  } catch (e) {
    const message = 'Playwright/Chrome is required for prerendering SEO pages. Set ALLOW_PRERENDER_SKIP=true only for local development.';
    if (process.env.ALLOW_PRERENDER_SKIP === 'true') {
      console.warn(`⚠️  ${message}`);
      console.warn('   Skipping prerender because ALLOW_PRERENDER_SKIP=true.');
      return;
    }
    throw new Error(message);
  }

  const env = await loadEnv();
  const [staticRoutes, blogRoutes] = await Promise.all([getStaticRoutes(), getBlogRoutes(env)]);
  const routes = [...new Set([...staticRoutes, ...blogRoutes])];

  const { child, ready } = startPreviewServer();
  const browser = await chromium.launch(resolveChromiumLaunchOptions());

  try {
    await ready;

    for (const route of routes) {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(30000);
      page.setDefaultTimeout(30000);

      const url = `${previewOrigin}${route}`;
      const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
      if (!response || !response.ok()) {
        await page.close();
        throw new Error(`Failed to load ${route}: ${response?.status()}`);
      }

      await waitForAppReady(page, route);

      const html = await page.content();
      const outputPath = toOutputPath(route);
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, `<!DOCTYPE html>\n${html}`, 'utf8');
      await page.close();
    }

    if (existsSync(path.join(distDir, '200.html'))) {
      await rm(path.join(distDir, '200.html'), { force: true });
    }

    console.log(`✅ Prerendered ${routes.length} routes (${blogRoutes.length} blog posts)`);
  } finally {
    await browser.close();
    child.kill('SIGTERM');
  }
};

await main();
