/**
 * Cloudflare Worker for Freedom Interventions
 * 
 * This worker intercepts requests to /blog/* URLs and serves OG meta tags
 * to social media crawlers while passing normal users through to the origin.
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Go to https://dash.cloudflare.com and create a free account
 * 2. Add your domain (freedominterventions.com) - Cloudflare will guide you through DNS setup
 * 3. Go to Workers & Pages > Create Application > Create Worker
 * 4. Paste this code and deploy
 * 5. Go to your Worker > Settings > Triggers > Add Route
 * 6. Add route: freedominterventions.com/blog/* (Zone: freedominterventions.com)
 * 7. That's it! Social shares will now show your domain.
 */

// Oregon location pages metadata for search engine pre-rendering
const LOCATION_META = {
  '/oregon': {
    title: 'Addiction Intervention Specialist in Oregon | Freedom Interventions',
    description: 'Oregon families facing addiction need expert help now. Matt Brown, certified intervention specialist with 20+ years experience, serves all of Oregon. Free consultation. Call (541) 838-6009.',
    canonical: 'https://freedominterventions.com/oregon',
    city: 'Oregon',
    state: 'Oregon',
  },
  '/portland-oregon': {
    title: 'Addiction Intervention Services in Portland, Oregon | Freedom Interventions',
    description: 'Portland families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Multnomah County. Free consultation. (541) 838-6009.',
    canonical: 'https://freedominterventions.com/portland-oregon',
    city: 'Portland',
    state: 'Oregon',
  },
  '/eugene-oregon': {
    title: 'Addiction Intervention Services in Eugene, Oregon | Freedom Interventions',
    description: 'Eugene families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Lane County. Free consultation. (541) 838-6009.',
    canonical: 'https://freedominterventions.com/eugene-oregon',
    city: 'Eugene',
    state: 'Oregon',
  },
  '/bend-oregon': {
    title: 'Bend Oregon Addiction Intervention Services | Freedom Interventions',
    description: 'Professional addiction intervention services in Bend, Oregon. Help your loved one find recovery from opioid, alcohol, and methamphetamine addiction. Free consultations available.',
    canonical: 'https://freedominterventions.com/bend-oregon',
    city: 'Bend',
    state: 'Oregon',
  },
  '/salem-oregon': {
    title: 'Addiction Intervention Services in Salem, Oregon | Freedom Interventions',
    description: 'Salem families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Marion County. Free consultation. (541) 838-6009.',
    canonical: 'https://freedominterventions.com/salem-oregon',
    city: 'Salem',
    state: 'Oregon',
  },
  '/medford-oregon': {
    title: 'Addiction Intervention Services in Medford, Oregon | Freedom Interventions',
    description: 'Medford families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Jackson County. Free consultation. (541) 838-6009.',
    canonical: 'https://freedominterventions.com/medford-oregon',
    city: 'Medford',
    state: 'Oregon',
  },
  '/hillsboro-oregon': {
    title: 'Addiction Intervention Services in Hillsboro, Oregon | Freedom Interventions',
    description: 'Hillsboro families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Washington County. Free consultation. (541) 838-6009.',
    canonical: 'https://freedominterventions.com/hillsboro-oregon',
    city: 'Hillsboro',
    state: 'Oregon',
  },
  '/beaverton-oregon': {
    title: 'Addiction Intervention Services in Beaverton, Oregon | Freedom Interventions',
    description: 'Beaverton families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Washington County. Free consultation. (541) 838-6009.',
    canonical: 'https://freedominterventions.com/beaverton-oregon',
    city: 'Beaverton',
    state: 'Oregon',
  },
  '/gresham-oregon': {
    title: 'Addiction Intervention Services in Gresham, Oregon | Freedom Interventions',
    description: 'Gresham families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Multnomah County. Free consultation. (541) 838-6009.',
    canonical: 'https://freedominterventions.com/gresham-oregon',
    city: 'Gresham',
    state: 'Oregon',
  },
  '/corvallis-oregon': {
    title: 'Addiction Intervention Services in Corvallis, Oregon | Freedom Interventions',
    description: 'Corvallis families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Benton County. Free consultation. (541) 838-6009.',
    canonical: 'https://freedominterventions.com/corvallis-oregon',
    city: 'Corvallis',
    state: 'Oregon',
  },
};

// Search engine bot detection (distinct from social crawlers)
const SEARCH_CRAWLER_USER_AGENTS = [
  'Googlebot',
  'Googlebot-Mobile',
  'Googlebot-Image',
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

function generateLocationHtml(meta) {
  const { title, description, canonical, city, state } = meta;
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeCity = escapeHtml(city);
  const safeState = escapeHtml(state);

  const localBusinessSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Freedom Interventions',
    description: `Professional addiction intervention services in ${city}, ${state}.`,
    url: canonical,
    telephone: '+15418386009',
    areaServed: {
      '@type': 'Place',
      name: `${city}, ${state}`,
    },
    founder: {
      '@type': 'Person',
      name: 'Matt Brown',
      jobTitle: 'Certified Intervention Specialist',
    },
    priceRange: 'Contact for pricing',
    serviceType: 'Addiction Intervention Services',
  });

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://freedominterventions.com' },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: 'https://freedominterventions.com/service-areas' },
      { '@type': 'ListItem', position: 3, name: state === 'Oregon' && city !== 'Oregon' ? state : city, item: state === 'Oregon' && city !== 'Oregon' ? 'https://freedominterventions.com/oregon' : canonical },
      ...(city !== 'Oregon' ? [{ '@type': 'ListItem', position: 4, name: city, item: canonical }] : []),
    ],
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDesc}">
  <link rel="canonical" href="${canonical}">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDesc}">
  <meta property="og:site_name" content="Freedom Interventions">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${safeTitle}">
  <meta name="twitter:description" content="${safeDesc}">

  <!-- Structured Data: LocalBusiness -->
  <script type="application/ld+json">${localBusinessSchema}</script>

  <!-- Structured Data: BreadcrumbList -->
  <script type="application/ld+json">${breadcrumbSchema}</script>
</head>
<body>
  <header>
    <nav>
      <a href="https://freedominterventions.com">Freedom Interventions</a> &rsaquo;
      <a href="https://freedominterventions.com/service-areas">Service Areas</a> &rsaquo;
      ${city !== 'Oregon' ? `<a href="https://freedominterventions.com/oregon">Oregon</a> &rsaquo;` : ''}
      <span>${safeCity}</span>
    </nav>
  </header>
  <main>
    <h1>${safeTitle}</h1>
    <p>${safeDesc}</p>
    <section>
      <h2>Professional Addiction Intervention in ${safeCity}, ${safeState}</h2>
      <p>Matt Brown is a certified intervention specialist with over 20 years of experience helping families throughout ${safeState} navigate addiction crises. Freedom Interventions provides compassionate, evidence-based intervention services with a 90%+ success rate for treatment entry.</p>
      <p>If your family is facing a substance use crisis in ${safeCity}, do not wait. Professional intervention dramatically increases the likelihood of your loved one accepting treatment and achieving lasting recovery.</p>
      <h2>Why Choose a Professional Interventionist?</h2>
      <ul>
        <li>Certified, experienced intervention specialist with 20+ years in ${safeState}</li>
        <li>Evidence-based ARISE and CRAFT intervention models</li>
        <li>Pre-arranged treatment placement before the intervention</li>
        <li>Comprehensive family coaching to end enabling behaviors</li>
        <li>Ongoing aftercare coordination for sustained recovery</li>
        <li>Free initial consultation &mdash; no commitment required</li>
      </ul>
      <h2>Contact Freedom Interventions</h2>
      <p>Call us now at <a href="tel:+15418386009">(541) 838-6009</a> for a free, confidential consultation. We serve ${safeCity} and all of ${safeState}.</p>
      <p><a href="https://freedominterventions.com/#booking">Schedule your free consultation online</a></p>
    </section>
  </main>
</body>
</html>`;
}

const SUPABASE_URL = 'https://rizfkjgwhcpwiryyqejx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpemZramd3aGNwd2lyeXlxZWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NTA1NTQsImV4cCI6MjA4MDIyNjU1NH0.7FENiqyiZCFTXJWzlNpxu7Jtf0JROfJAK44oAWHZeH4';
const SITE_URL = 'https://freedominterventions.com';

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
    console.error('Supabase fetch error:', response.status);
    return null;
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

function generateOgHtml(post, pageUrl) {
  const title = escapeHtml(post.title);
  const description = escapeHtml(post.excerpt || '');
  const imageUrl = buildImageUrl(post.image_url);

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

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent') || '';

    // Serve dynamic sitemap from edge function
    if (url.pathname === '/sitemap.xml') {
      try {
        const sitemapResponse = await fetch(
          `${SUPABASE_URL}/functions/v1/generate-sitemap`,
          {
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            },
          }
        );
        if (sitemapResponse.ok) {
          const xml = await sitemapResponse.text();
          return new Response(xml, {
            status: 200,
            headers: {
              'Content-Type': 'application/xml; charset=utf-8',
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }
      } catch (e) {
        console.error('Sitemap proxy error:', e);
      }
      // Fall through to origin if edge function fails
      return fetch(request);
    }

    // Handle Oregon location pages for search crawlers
    const locationMeta = LOCATION_META[url.pathname];
    if (locationMeta && isSearchCrawler(userAgent)) {
      console.log(`Search crawler detected for location page: ${url.pathname}`);
      try {
        const html = generateLocationHtml(locationMeta);
        return new Response(html, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=86400',
            'X-Prerendered': 'true',
          },
        });
      } catch (error) {
        console.error('Location prerender error:', error);
        return fetch(request);
      }
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
    const slug = pathParts[1];

    // Skip if it's a static asset request
    if (slug.includes('.')) {
      return fetch(request);
    }

    // Search bots should get the real blog page so they can index actual content.
    if (isSearchCrawler(userAgent)) {
      return fetch(request);
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

      const pageUrl = `${SITE_URL}/blog/${post.slug}`;
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
