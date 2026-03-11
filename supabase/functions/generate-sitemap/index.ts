const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SITE_URL = 'https://freedominterventions.com';

// All static pages with their priorities and change frequencies
const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/family-intervention', priority: '0.8', changefreq: 'monthly' },
  { path: '/treatment-planning', priority: '0.8', changefreq: 'monthly' },
  { path: '/aftercare-guidance', priority: '0.8', changefreq: 'monthly' },
  { path: '/crisis-support', priority: '0.8', changefreq: 'monthly' },
  { path: '/interventionist', priority: '0.8', changefreq: 'monthly' },
  { path: '/testimonials', priority: '0.7', changefreq: 'monthly' },
  { path: '/assessment', priority: '0.8', changefreq: 'monthly' },
  { path: '/self-assessment', priority: '0.7', changefreq: 'monthly' },
  { path: '/substance-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/intervention-faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/intervention-toolkit', priority: '0.7', changefreq: 'monthly' },
  { path: '/service-areas', priority: '0.7', changefreq: 'monthly' },
  { path: '/party-wreckers-podcast', priority: '0.6', changefreq: 'weekly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
  { path: '/hipaa-compliance', priority: '0.3', changefreq: 'yearly' },
  // US States
  { path: '/alabama', priority: '0.6', changefreq: 'monthly' },
  { path: '/alaska', priority: '0.6', changefreq: 'monthly' },
  { path: '/arizona', priority: '0.6', changefreq: 'monthly' },
  { path: '/arkansas', priority: '0.6', changefreq: 'monthly' },
  { path: '/california', priority: '0.7', changefreq: 'monthly' },
  { path: '/colorado', priority: '0.6', changefreq: 'monthly' },
  { path: '/connecticut', priority: '0.6', changefreq: 'monthly' },
  { path: '/delaware', priority: '0.6', changefreq: 'monthly' },
  { path: '/florida', priority: '0.7', changefreq: 'monthly' },
  { path: '/georgia', priority: '0.6', changefreq: 'monthly' },
  { path: '/hawaii', priority: '0.6', changefreq: 'monthly' },
  { path: '/idaho', priority: '0.6', changefreq: 'monthly' },
  { path: '/illinois', priority: '0.6', changefreq: 'monthly' },
  { path: '/indiana', priority: '0.6', changefreq: 'monthly' },
  { path: '/iowa', priority: '0.6', changefreq: 'monthly' },
  { path: '/kansas', priority: '0.6', changefreq: 'monthly' },
  { path: '/kentucky', priority: '0.6', changefreq: 'monthly' },
  { path: '/louisiana', priority: '0.6', changefreq: 'monthly' },
  { path: '/maine', priority: '0.6', changefreq: 'monthly' },
  { path: '/maryland', priority: '0.6', changefreq: 'monthly' },
  { path: '/massachusetts', priority: '0.6', changefreq: 'monthly' },
  { path: '/michigan', priority: '0.6', changefreq: 'monthly' },
  { path: '/minnesota', priority: '0.6', changefreq: 'monthly' },
  { path: '/mississippi', priority: '0.6', changefreq: 'monthly' },
  { path: '/missouri', priority: '0.6', changefreq: 'monthly' },
  { path: '/montana', priority: '0.6', changefreq: 'monthly' },
  { path: '/nebraska', priority: '0.6', changefreq: 'monthly' },
  { path: '/nevada', priority: '0.6', changefreq: 'monthly' },
  { path: '/new-hampshire', priority: '0.6', changefreq: 'monthly' },
  { path: '/new-jersey', priority: '0.6', changefreq: 'monthly' },
  { path: '/new-mexico', priority: '0.6', changefreq: 'monthly' },
  { path: '/new-york', priority: '0.6', changefreq: 'monthly' },
  { path: '/north-carolina', priority: '0.6', changefreq: 'monthly' },
  { path: '/north-dakota', priority: '0.6', changefreq: 'monthly' },
  { path: '/ohio', priority: '0.6', changefreq: 'monthly' },
  { path: '/oklahoma', priority: '0.6', changefreq: 'monthly' },
  { path: '/oregon', priority: '0.7', changefreq: 'monthly' },
  { path: '/pennsylvania', priority: '0.6', changefreq: 'monthly' },
  { path: '/rhode-island', priority: '0.6', changefreq: 'monthly' },
  { path: '/south-carolina', priority: '0.6', changefreq: 'monthly' },
  { path: '/south-dakota', priority: '0.6', changefreq: 'monthly' },
  { path: '/tennessee', priority: '0.6', changefreq: 'monthly' },
  { path: '/texas', priority: '0.7', changefreq: 'monthly' },
  { path: '/utah', priority: '0.6', changefreq: 'monthly' },
  { path: '/vermont', priority: '0.6', changefreq: 'monthly' },
  { path: '/virginia', priority: '0.6', changefreq: 'monthly' },
  { path: '/washington', priority: '0.6', changefreq: 'monthly' },
  { path: '/west-virginia', priority: '0.6', changefreq: 'monthly' },
  { path: '/wisconsin', priority: '0.6', changefreq: 'monthly' },
  { path: '/wyoming', priority: '0.6', changefreq: 'monthly' },
  // Cities
  { path: '/anchorage-alaska', priority: '0.6', changefreq: 'monthly' },
  { path: '/austin-texas', priority: '0.6', changefreq: 'monthly' },
  { path: '/baltimore-maryland', priority: '0.6', changefreq: 'monthly' },
  { path: '/bend-oregon', priority: '0.6', changefreq: 'monthly' },
  { path: '/boise-idaho', priority: '0.6', changefreq: 'monthly' },
  { path: '/chicago-illinois', priority: '0.6', changefreq: 'monthly' },
  { path: '/columbus-ohio', priority: '0.6', changefreq: 'monthly' },
  { path: '/dallas-texas', priority: '0.6', changefreq: 'monthly' },
  { path: '/denver-colorado', priority: '0.6', changefreq: 'monthly' },
  { path: '/detroit-michigan', priority: '0.6', changefreq: 'monthly' },
  { path: '/eugene-oregon', priority: '0.6', changefreq: 'monthly' },
  { path: '/houston-texas', priority: '0.6', changefreq: 'monthly' },
  { path: '/indianapolis-indiana', priority: '0.6', changefreq: 'monthly' },
  { path: '/kansas-city-missouri', priority: '0.6', changefreq: 'monthly' },
  { path: '/knoxville-tennessee', priority: '0.6', changefreq: 'monthly' },
  { path: '/las-vegas-nevada', priority: '0.6', changefreq: 'monthly' },
  { path: '/los-angeles-california', priority: '0.6', changefreq: 'monthly' },
  { path: '/miami-florida', priority: '0.6', changefreq: 'monthly' },
  { path: '/minneapolis-minnesota', priority: '0.6', changefreq: 'monthly' },
  { path: '/nashville-tennessee', priority: '0.6', changefreq: 'monthly' },
  { path: '/new-orleans-louisiana', priority: '0.6', changefreq: 'monthly' },
  { path: '/oklahoma-city-oklahoma', priority: '0.6', changefreq: 'monthly' },
  { path: '/omaha-nebraska', priority: '0.6', changefreq: 'monthly' },
  { path: '/philadelphia-pennsylvania', priority: '0.6', changefreq: 'monthly' },
  { path: '/phoenix-arizona', priority: '0.6', changefreq: 'monthly' },
  { path: '/portland-oregon', priority: '0.7', changefreq: 'monthly' },
  { path: '/salt-lake-city-utah', priority: '0.6', changefreq: 'monthly' },
  { path: '/san-francisco-california', priority: '0.6', changefreq: 'monthly' },
  { path: '/seattle-washington', priority: '0.6', changefreq: 'monthly' },
  { path: '/spokane-washington', priority: '0.6', changefreq: 'monthly' },
  // Canadian Provinces
  { path: '/ontario', priority: '0.5', changefreq: 'monthly' },
  { path: '/quebec', priority: '0.5', changefreq: 'monthly' },
  { path: '/british-columbia', priority: '0.5', changefreq: 'monthly' },
  { path: '/alberta', priority: '0.5', changefreq: 'monthly' },
  { path: '/manitoba', priority: '0.5', changefreq: 'monthly' },
  { path: '/saskatchewan', priority: '0.5', changefreq: 'monthly' },
  { path: '/nova-scotia', priority: '0.5', changefreq: 'monthly' },
  { path: '/new-brunswick', priority: '0.5', changefreq: 'monthly' },
  { path: '/newfoundland-labrador', priority: '0.5', changefreq: 'monthly' },
  { path: '/prince-edward-island', priority: '0.5', changefreq: 'monthly' },
];

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all published blog posts
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }

    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Add static pages
    for (const page of STATIC_PAGES) {
      xml += `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    }

    // Add blog posts dynamically
    if (posts) {
      for (const post of posts) {
        const lastmod = post.updated_at
          ? new Date(post.updated_at).toISOString().split('T')[0]
          : today;
        xml += `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      }
    }

    xml += `</urlset>`;

    return new Response(xml, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response('Error generating sitemap', {
      status: 500,
      headers: corsHeaders,
    });
  }
});
