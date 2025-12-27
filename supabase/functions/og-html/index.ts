import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");
    const userAgent = req.headers.get("user-agent") || "";

    console.log("OG HTML request received", { slug, userAgent });

    if (!slug) {
      console.error("No slug provided");
      return new Response("Slug is required", { status: 400 });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("title, excerpt, image_url, slug")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (error) {
      console.error("Database error:", error);
      return new Response("Database error", { status: 500 });
    }

    if (!post) {
      console.error("Post not found for slug:", slug);
      return new Response("Post not found", { status: 404 });
    }

    console.log("Post found:", post.title);
    console.log("Image URL from DB:", post.image_url);

    const siteUrl = "https://freedominterventions.com";
    
    // Construct absolute image URL - handle various formats
    let imageUrl = "";
    if (post.image_url) {
      if (post.image_url.startsWith("http://") || post.image_url.startsWith("https://")) {
        imageUrl = post.image_url;
      } else if (post.image_url.startsWith("/")) {
        imageUrl = `${siteUrl}${post.image_url}`;
      } else {
        imageUrl = `${siteUrl}/${post.image_url}`;
      }
    }
    
    console.log("Final image URL:", imageUrl);
    
    const pageUrl = `${siteUrl}/blog/${post.slug}`;
    const escapedTitle = escapeHtml(post.title);
    const escapedExcerpt = escapeHtml(post.excerpt || "");

    // Detect social media / search crawlers.
    // IMPORTANT:
    // - On the backend function domain, responses may be delivered as text/plain to some browsers.
    // - That means if a HUMAN opens this URL, they can see raw HTML source.
    // Therefore we must be extremely strict: only serve OG HTML to true scrapers.
    const secFetchMode = (req.headers.get("sec-fetch-mode") || "").toLowerCase();
    const secFetchDest = (req.headers.get("sec-fetch-dest") || "").toLowerCase();
    const isBrowserNavigation = secFetchMode === "navigate" || secFetchDest === "document";

    // Heuristic: many in-app / real browsers send these headers; scrapers usually don't.
    const looksLikeBrowser =
      isBrowserNavigation ||
      req.headers.has("accept-language") ||
      req.headers.has("sec-fetch-site") ||
      req.headers.has("upgrade-insecure-requests") ||
      req.headers.has("sec-ch-ua");

    const isInAppBrowser = /(FBAN|FBAV|FB_IAB|Instagram|LinkedInApp|Twitter|Line\/|WhatsApp)/i.test(userAgent);
    const isBotUA = /(facebookexternalhit|facebot|Twitterbot|LinkedInBot|Slackbot|Discordbot|TelegramBot|Googlebot|bingbot|DuckDuckBot)/i.test(userAgent);

    // Serve OG HTML only when it's a bot UA AND it does not look like a browser.
    const isCrawler = isBotUA && !isInAppBrowser && !looksLikeBrowser;

    if (!isCrawler) {
      console.log("Non-crawler request, redirecting to:", pageUrl);
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          Location: pageUrl,
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex",
        },
      });
    }

    // Serve complete HTML with OG tags for social media crawlers
    // (Crawlers don't need to render the HTML; they parse tags.)
    const html = `<!DOCTYPE html>
<html lang="en" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapedTitle} | Freedom Interventions</title>
  <meta name="description" content="${escapedExcerpt}">
  <link rel="canonical" href="${pageUrl}">
  
  <!-- Open Graph / Facebook Meta Tags -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:title" content="${escapedTitle}">
  <meta property="og:description" content="${escapedExcerpt}">
  <meta property="og:site_name" content="Freedom Interventions">
  <meta property="og:locale" content="en_US">
  ${imageUrl ? `
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:secure_url" content="${imageUrl}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapedTitle}">
  ` : ""}
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:domain" content="freedominterventions.com">
  <meta name="twitter:url" content="${pageUrl}">
  <meta name="twitter:title" content="${escapedTitle}">
  <meta name="twitter:description" content="${escapedExcerpt}">
  ${imageUrl ? `<meta name="twitter:image" content="${imageUrl}">` : ""}
  
  <!-- LinkedIn specific -->
  <meta property="article:published_time" content="${new Date().toISOString()}">

  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .container {
      text-align: center;
      padding: 40px;
    }
    a {
      color: #2563eb;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .container {
      text-align: center;
      padding: 40px;
    }
    a {
      color: #2563eb;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <p>Redirecting to <a href="${pageUrl}">${escapedTitle}</a>...</p>
    <p><small>If you are not redirected, <a href="${pageUrl}">click here</a>.</small></p>
  </div>
</body>
</html>`;

    console.log("Returning HTML response with OG tags");

    return new Response(html, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/html; charset=utf-8",
        // Prevent platforms and browsers from reusing stale OG HTML.
        // Social networks still cache on their side, but this helps reduce unintended caching.
        "Cache-Control": "no-store, max-age=0",
        Pragma: "no-cache",
        "X-Robots-Tag": "noindex", // Prevent this page from being indexed
      },
    });
  } catch (error) {
    console.error("Error in og-html function:", error);
    return new Response("Internal server error", { status: 500 });
  }
});

function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
