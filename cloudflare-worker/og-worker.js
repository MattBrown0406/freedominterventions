/**
 * Cloudflare Worker for Freedom Interventions
 * 
 * This worker runs in front of the origin and passes normal users through:
 * - legacy URLs and trailing slashes get a single 301 to the canonical path
 * - /sitemap.xml is served from the origin's versioned static sitemap
 * - search crawlers get the same prerendered origin HTML as users, but get a
 *   real noindex 404 for paths that are not in PUBLIC_STATIC_PATHS or that are
 *   not a published /blog/<slug> post (keep PUBLIC_STATIC_PATHS in sync with
 *   src/App.tsx; scripts/check-worker-routes.mjs fails the build on drift)
 * - social crawlers get share-friendly OG HTML for /blog/* posts
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Go to https://dash.cloudflare.com and create a free account
 * 2. Add your domain (freedominterventions.com) - Cloudflare will guide you through DNS setup
 * 3. Go to Workers & Pages > Create Application > Create Worker
 * 4. Paste this code and deploy
 * 5. Go to your Worker > Settings > Triggers > Add Route
 * 6. Add route: freedominterventions.com/* (Zone: freedominterventions.com)
 * 7. That's it! Search crawlers and social shares will now see optimized HTML.
 */

// Search engine bot detection (distinct from social crawlers)
const SEARCH_CRAWLER_USER_AGENTS = [
  'Googlebot',
  'Googlebot-Mobile',
  'Googlebot-Image',
  // Search Console "Test live URL"/URL Inspection and other Google fetchers.
  'Google-InspectionTool',
  'GoogleOther',
  'bingbot',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'Slurp',
  'AhrefsBot',
  'SemrushBot',
  'MJ12bot',
];

function isSearchCrawler(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return SEARCH_CRAWLER_USER_AGENTS.some(bot => ua.includes(bot.toLowerCase()));
}

const SUPABASE_URL = 'https://rizfkjgwhcpwiryyqejx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpemZramd3aGNwd2lyeXlxZWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NTA1NTQsImV4cCI6MjA4MDIyNjU1NH0.7FENiqyiZCFTXJWzlNpxu7Jtf0JROfJAK44oAWHZeH4';
const SITE_URL = 'https://freedominterventions.com';
const EDGE_REDIRECTS = new Map([
  ['/about', '/what-makes-matt-different'],
  ['/booking', '/book'],
  ['/schedule', '/book'],
  ['/relapse-after-treatment', '/it-didnt-stick'],
  ['/services', '/which-help-do-we-need'],
  ['/split-house', '/two-households'],
  ['/divorced-parents', '/two-households'],
  ['/blog/how-addiction-progresses-before-families-realize', '/blog/when-families-realize-situation-no-longer-wait-and-see'],
  ['/blog/addiction-progression-families-notice-late', '/blog/when-families-realize-situation-no-longer-wait-and-see'],
  ['/blog/addiction-no-single-breaking-point', '/blog/addiction-family-crisis-without-breaking-point'],
  ['/blog/boundaries-emotional-fatigue', '/blog/strong-boundaries-reduce-emotional-fatigue'],
  ['/blog/castle-boundaries-healthy-limits', '/blog/family-boundaries-castle-metaphor'],
  ['/blog/dual-diagnosis-mental-health-addiction', '/blog/hidden-driver-addiction-untreated-mental-health-dual-diagnosis'],
  ['/blog/early-recovery-balance-growth', '/blog/finding-balance-early-recovery'],
  ['/blog/emotional-avoidance-addiction', '/blog/emotional-avoidance-addiction-family-enabling'],
  ['/blog/high-functioning-addiction-hidden-crisis', '/blog/high-functioning-addiction-success-hides-problem'],
  ['/blog/how-to-talk-to-loved-one-about-addiction', '/blog/talk-to-loved-one-about-addiction'],
  ['/blog/legal-consequences-treatment-leverage', '/blog/legal-consequences-leverage-treatment'],
  ['/blog/love-turns-monitoring-addiction-family', '/blog/love-turns-constant-monitoring-addiction-family'],
  ['/blog/parental-addiction-intervention', '/blog/professional-interventionist-parental-addiction'],
  ['/blog/rebuilding-trust-after-addiction', '/blog/rebuilding-trust-after-addiction-how-healing-really-happens'],
  ['/blog/sports-betting-addiction-hidden-crisis', '/blog/sports-betting-apps-fueling-gambling-addiction'],
  ['/blog/why-professional-interventions-work-for-families', '/blog/why-professional-interventions-work'],
  ['/blog/preparing-for-an-intervention', '/blog/how-to-prepare-for-an-intervention'],
  ['/blog/waiting-for-right-time-addiction-risk', '/blog/waiting-for-the-right-time-addiction-risk'],
]);

const PUBLIC_STATIC_PATHS = new Set([
  // Publicly usable, but intentionally noindexed; crawlers must read its robots tag.
  '/next-step',
  '/',
  '/aftercare-guidance',
  '/alabama',
  '/alaska',
  '/alberta',
  '/albuquerque-new-mexico',
  '/anaheim-california',
  '/anchorage-alaska',
  '/arizona',
  '/arkansas',
  '/aurora-colorado',
  '/austin-texas',
  '/baltimore-maryland',
  '/beaverton-oregon',
  '/before-you-call',
  '/bellevue-washington',
  '/bend-oregon',
  '/big-island-hawaii',
  '/blog',
  '/boise-idaho',
  '/book',
  '/book-intervention-consultation',
  '/british-columbia',
  '/california',
  '/chandler-arizona',
  '/chicago-illinois',
  '/colorado',
  '/colorado-springs-colorado',
  '/columbus-ohio',
  '/connecticut',
  '/contact',
  '/corvallis-oregon',
  '/crisis-support',
  '/dallas-texas',
  '/delaware',
  '/denver-colorado',
  '/detroit-michigan',
  '/el-paso-texas',
  '/eugene-oregon',
  '/everett-washington',
  '/family-intervention',
  '/family-readiness-intensive',
  '/florida',
  '/fort-collins-colorado',
  '/fort-worth-texas',
  '/from-no-more-enabling',
  '/from-sober-helpline',
  '/georgia',
  '/gresham-oregon',
  '/hawaii',
  '/henderson-nevada',
  '/hillsboro-oregon',
  '/hipaa-compliance',
  '/houston-texas',
  '/how-intervention-works',
  '/idaho',
  '/illinois',
  '/indiana',
  '/indianapolis-indiana',
  '/intervention-answers',
  '/intervention-answers/can-intervention-happen-if-they-are-high',
  '/intervention-answers/can-you-do-intervention-without-rock-bottom',
  '/intervention-answers/does-family-need-to-agree',
  '/intervention-answers/does-intervention-still-work-if-they-are-angry',
  '/intervention-answers/emergency-intervention-help',
  '/intervention-answers/how-fast-can-intervention-happen',
  '/intervention-answers/how-much-does-intervention-cost',
  '/intervention-answers/how-to-convince-someone-to-go-to-rehab',
  '/intervention-answers/how-to-set-boundaries-with-addicted-adult-child',
  '/intervention-answers/intervention-for-alcoholic-parent',
  '/intervention-answers/intervention-for-fentanyl-use',
  '/intervention-answers/interventionist-near-me',
  '/intervention-answers/is-consultation-confidential',
  '/intervention-answers/should-i-stop-giving-money-to-addict',
  '/intervention-answers/what-boundaries-after-intervention',
  '/intervention-answers/what-does-interventionist-do-first',
  '/intervention-answers/what-happens-before-intervention',
  '/intervention-answers/what-if-they-refuse-rehab',
  '/intervention-answers/what-if-they-refuse-treatment',
  '/intervention-answers/what-signs-mean-intervention-level',
  '/intervention-answers/what-to-say-to-someone-who-needs-rehab',
  '/intervention-answers/when-to-call-interventionist',
  '/intervention-cost',
  '/intervention-faq',
  '/intervention-readiness',
  '/intervention-toolkit',
  '/interventionist',
  '/iowa',
  '/irvine-california',
  '/it-didnt-stick',
  '/kansas',
  '/kansas-city-missouri',
  '/kauai-hawaii',
  '/kentucky',
  '/knoxville-tennessee',
  '/las-cruces-new-mexico',
  '/las-vegas-nevada',
  '/long-beach-california',
  '/los-angeles-california',
  '/louisiana',
  '/maine',
  '/manitoba',
  '/maryland',
  '/massachusetts',
  '/maui-hawaii',
  '/medford-oregon',
  '/meridian-idaho',
  '/mesa-arizona',
  '/miami-florida',
  '/michigan',
  '/minneapolis-minnesota',
  '/minnesota',
  '/mississippi',
  '/missouri',
  '/montana',
  '/nampa-idaho',
  '/nashville-tennessee',
  '/nebraska',
  '/nevada',
  '/new-brunswick',
  '/new-hampshire',
  '/new-jersey',
  '/new-mexico',
  '/new-orleans-louisiana',
  '/new-york',
  '/newfoundland-labrador',
  '/north-carolina',
  '/north-dakota',
  '/nova-scotia',
  '/oahu-hawaii',
  '/oakland-california',
  '/ogden-utah',
  '/ohio',
  '/oklahoma',
  '/oklahoma-city-oklahoma',
  '/olympia-washington',
  '/omaha-nebraska',
  '/ontario',
  '/orange-county-california',
  '/oregon',
  '/overland-park-kansas',
  '/party-wreckers-podcast',
  '/pasadena-california',
  '/pennsylvania',
  '/philadelphia-pennsylvania',
  '/phoenix-arizona',
  '/plano-texas',
  '/portland-oregon',
  '/prince-edward-island',
  '/privacy-policy',
  '/provo-utah',
  '/quebec',
  '/referralfit/privacy',
  '/referralfit/terms',
  '/reno-nevada',
  '/rhode-island',
  '/sacramento-california',
  '/salem-oregon',
  '/salt-lake-city-utah',
  '/san-antonio-texas',
  '/san-francisco-california',
  '/san-jose-california',
  '/santa-fe-new-mexico',
  '/saskatchewan',
  '/scottsdale-arizona',
  '/seattle-washington',
  '/self-assessment',
  '/service-areas',
  '/south-carolina',
  '/south-dakota',
  '/spokane-washington',
  '/start-here',
  '/substance-guide',
  '/tacoma-washington',
  '/tennessee',
  '/terms',
  '/terms-of-service',
  '/testimonials',
  '/texas',
  '/topeka-kansas',
  '/treatment-planning',
  '/tucson-arizona',
  '/two-households',
  '/utah',
  '/vancouver-washington',
  '/vermont',
  '/virginia',
  '/washington',
  '/west-virginia',
  '/what-if-they-refuse-treatment',
  '/what-makes-matt-different',
  '/when-is-it-time-for-an-intervention',
  '/which-help-do-we-need',
  '/wichita-kansas',
  '/wisconsin',
  '/wyoming',
  '/yakima-washington',
]);

// Social preview crawler detection (search bots should see the real page, not the OG stub)
const SOCIAL_CRAWLER_USER_AGENTS = [
  'facebookexternalhit',
  'Facebot',
  'Twitterbot',
  'LinkedInBot',
  'Slackbot',
  'Discordbot',
  'TelegramBot',
  'WhatsApp',
  'PinterestBot',
];

function isSocialCrawler(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return SOCIAL_CRAWLER_USER_AGENTS.some(crawler => ua.includes(crawler.toLowerCase()));
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function fetchBlogPost(slug) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=title,excerpt,image_url,slug`,
    {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Supabase fetch error: ${response.status}`);
  }

  const data = await response.json();
  return data.length > 0 ? data[0] : null;
}

function buildImageUrl(imageUrl) {
  if (!imageUrl) return `${SITE_URL}/favicon.jpeg`;
  
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Handle relative paths
  if (imageUrl.startsWith('/')) {
    return `${SITE_URL}${imageUrl}`;
  }
  
  return `${SITE_URL}/${imageUrl}`;
}

function generateOgHtml(post, rawPageUrl) {
  const title = escapeHtml(post.title);
  const description = escapeHtml(post.excerpt || '');
  const imageUrl = escapeHtml(buildImageUrl(post.image_url));
  const pageUrl = escapeHtml(rawPageUrl);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Freedom Interventions</title>
  <meta name="description" content="${description}">
  
  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Freedom Interventions">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${imageUrl}">
  
  <link rel="canonical" href="${pageUrl}">
</head>
<body>
  <p><a href="${pageUrl}">${title}</a></p>
</body>
</html>`;
}

function notFoundResponse() {
  return new Response('Not Found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
      'Vary': 'User-Agent',
    },
  });
}

// The origin's SPA fallback for files that were not generated at build time
// (e.g. a post published after the last build) is the prerendered home page.
// Never hand crawlers home-page metadata on another URL; serve the neutral
// build-time shell (dist/spa-shell.html) instead and let the app render.
const SPA_SHELL_PATH = '/spa-shell.html';

function isHomeDocument(html) {
  for (const [tag] of html.matchAll(/<link\b[^>]*>/gi)) {
    if (!/\brel=["']canonical["']/i.test(tag)) continue;
    const href = tag.match(/\bhref=["']([^"']*)["']/i)?.[1];
    return href === SITE_URL || href === `${SITE_URL}/`;
  }
  return false;
}

async function fetchPageWithoutHomeFallback(request, url) {
  const response = await fetch(request);
  if (url.pathname === '/' || !response.ok) return response;
  if (!(response.headers.get('content-type') || '').includes('text/html')) return response;
  try {
    if (!isHomeDocument(await response.clone().text())) return response;
    const shell = await fetch(`${url.origin}${SPA_SHELL_PATH}`);
    if (!shell.ok) return response;
    const headers = new Headers(shell.headers);
    headers.set('Vary', 'User-Agent');
    return new Response(shell.body, { status: 200, headers });
  } catch (error) {
    console.error('SPA shell fallback error:', error);
    return response;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent') || '';

    // Normalize trailing slashes before the redirect lookup so legacy URLs
    // like /about/ resolve in a single 301 instead of a two-hop chain.
    const normalizedPath = url.pathname.replace(/\/+$/, '') || '/';
    const redirectTarget = EDGE_REDIRECTS.get(normalizedPath);
    if (redirectTarget || normalizedPath !== url.pathname) {
      return Response.redirect(`${SITE_URL}${redirectTarget || normalizedPath}${url.search}`, 301);
    }

    // The neutral SPA shell is an implementation file, never a landing page.
    if (url.pathname === SPA_SHELL_PATH) {
      const shell = await fetch(request);
      const headers = new Headers(shell.headers);
      headers.set('X-Robots-Tag', 'noindex');
      return new Response(shell.body, { status: shell.status, headers });
    }

    // Temporary diagnostics: confirms whether this worker is attached to the domain.
    if (url.pathname === '/worker-health') {
      return new Response('Freedom Interventions worker active', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
          'X-Worker-Health': 'ok',
        },
      });
    }

    // The versioned static sitemap is authoritative and includes published
    // Supabase blog posts plus reliable per-page lastmod dates.
    if (url.pathname === '/sitemap.xml') {
      return fetch(request);
    }

    // Search crawlers use the same versioned, prerendered origin HTML as users.
    // This avoids crawler-only content and keeps metadata in one implementation.
    const isPageRequest = !/\.[a-z0-9]{1,8}$/i.test(url.pathname);
    if (
      isSearchCrawler(userAgent) &&
      isPageRequest &&
      !PUBLIC_STATIC_PATHS.has(url.pathname) &&
      !url.pathname.startsWith('/blog/')
    ) {
      return notFoundResponse();
    }

    // Only intercept /blog/* paths for OG tags
    if (!url.pathname.startsWith('/blog/')) {
      return fetch(request);
    }

    // Extract slug from /blog/[slug]
    const pathParts = url.pathname.split('/').filter(Boolean);
    if (pathParts.length < 2 || pathParts[0] !== 'blog') {
      return fetch(request);
    }
    // Posts live at exactly /blog/<slug>; deeper paths are never real pages.
    if (pathParts.length > 2) {
      return isSearchCrawler(userAgent) && isPageRequest ? notFoundResponse() : fetch(request);
    }
    const slug = pathParts[1];

    // Skip if it's a static asset request
    if (slug.includes('.')) {
      return fetch(request);
    }

    // Search bots get the real prerendered article. Validate the slug first so
    // nonexistent blog URLs return a real noindex 404 instead of an SPA 200.
    if (isSearchCrawler(userAgent)) {
      let post;
      try {
        post = await fetchBlogPost(slug);
      } catch (error) {
        console.error('Blog slug validation error:', error);
        return fetch(request);
      }
      if (post) return fetchPageWithoutHomeFallback(request, url);
      return notFoundResponse();
    }

    // Only serve the OG HTML stub to social preview crawlers.
    if (!isSocialCrawler(userAgent)) {
      return fetch(request);
    }

    console.log(`Social crawler detected: ${userAgent.substring(0, 50)} for slug: ${slug}`);

    try {
      const post = await fetchBlogPost(slug);

      if (!post) {
        console.log(`Post not found for slug: ${slug}`);
        return fetch(request);
      }

      const pageUrl = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`;
      const html = generateOgHtml(post, pageUrl);

      return new Response(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          'Vary': 'User-Agent',
        },
      });
    } catch (error) {
      console.error('Worker error:', error);
      return fetch(request);
    }
  },
};
