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

const SUPABASE_URL = 'https://rizfkjgwhcpwiryyqejx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpemZramd3aGNwd2lyeXlxZWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NTA1NTQsImV4cCI6MjA4MDIyNjU1NH0.7FENiqyiZCFTXJWzlNpxu7Jtf0JROfJAK44oAWHZeH4';
const SITE_URL = 'https://freedominterventions.com';

// Social media crawler detection
const CRAWLER_USER_AGENTS = [
  'facebookexternalhit',
  'Facebot',
  'Twitterbot',
  'LinkedInBot',
  'Slackbot',
  'Discordbot',
  'TelegramBot',
  'WhatsApp',
  'Googlebot',
  'bingbot',
  'DuckDuckBot',
  'Applebot',
  'PinterestBot',
];

function isCrawler(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some(crawler => ua.includes(crawler.toLowerCase()));
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
  
  <!-- Redirect for any browser that renders this -->
  <meta http-equiv="refresh" content="0; url=${pageUrl}">
  <link rel="canonical" href="${pageUrl}">
</head>
<body>
  <p>Redirecting to <a href="${pageUrl}">${title}</a>...</p>
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

    // Only intercept /blog/* paths
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

    // Only serve OG HTML to crawlers
    if (!isCrawler(userAgent)) {
      return fetch(request);
    }

    console.log(`Crawler detected: ${userAgent.substring(0, 50)} for slug: ${slug}`);

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
          'X-Robots-Tag': 'noindex',
        },
      });
    } catch (error) {
      console.error('Worker error:', error);
      return fetch(request);
    }
  },
};
