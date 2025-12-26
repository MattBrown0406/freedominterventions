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

    console.log("OG HTML request received for slug:", slug);

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

    // Serve complete HTML with all necessary OG tags for social media crawlers
    // The key is providing a complete HTML document that crawlers can parse
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

  <!--
    IMPORTANT:
    Do NOT use meta-refresh redirects here.
    Some social crawlers follow redirects and then read OG tags from the final page (our SPA),
    which results in missing preview title/image.

    Instead:
    - Crawlers get a stable HTML document with OG tags.
    - Human visitors get a fast JavaScript redirect.
  -->
  <script>
    // Redirect for human visitors (most crawlers don't execute JS)
    setTimeout(() => {
      window.location.replace("${pageUrl}");
    }, 50);
  </script>
  <noscript>
    <meta http-equiv="refresh" content="0;url=${pageUrl}">
  </noscript>
  
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
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "X-Robots-Tag": "noindex", // Prevent this redirect page from being indexed
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
