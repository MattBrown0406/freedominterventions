import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rssUrl = "https://feeds.buzzsprout.com/1941777.rss";
    const response = await fetch(rssUrl);
    const xml = await response.text();

    // Parse RSS XML to extract episodes
    const episodes: Array<{
      title: string;
      description: string;
      pubDate: string;
      audioUrl: string;
      duration: string;
      episodeNumber: string;
    }> = [];

    // Extract items using regex (simple XML parsing)
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const titleRegex = /<title>([^<]*)<\/title>/;
    const descRegex = /<itunes:summary><!\[CDATA\[([\s\S]*?)\]\]><\/itunes:summary>|<itunes:summary><!--\[CDATA\[([\s\S]*?)\]\]--><\/itunes:summary>/;
    const pubDateRegex = /<pubdate>([^<]*)<\/pubdate>/i;
    const enclosureRegex = /url="([^"]*\.mp3[^"]*)"/;
    const durationRegex = /<itunes:duration>([^<]*)<\/itunes:duration>/;
    const episodeRegex = /<itunes:episode>([^<]*)<\/itunes:episode>/;

    let match;
    while ((match = itemRegex.exec(xml)) !== null && episodes.length < 5) {
      const itemContent = match[1];
      
      const titleMatch = itemContent.match(titleRegex);
      const descMatch = itemContent.match(descRegex);
      const pubDateMatch = itemContent.match(pubDateRegex);
      const audioMatch = itemContent.match(enclosureRegex);
      const durationMatch = itemContent.match(durationRegex);
      const episodeMatch = itemContent.match(episodeRegex);

      if (titleMatch) {
        const durationSeconds = durationMatch ? parseInt(durationMatch[1]) : 0;
        const minutes = Math.floor(durationSeconds / 60);
        const seconds = durationSeconds % 60;
        const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        episodes.push({
          title: titleMatch[1],
          description: (descMatch?.[1] || descMatch?.[2] || "").substring(0, 300) + "...",
          pubDate: pubDateMatch?.[1] || "",
          audioUrl: audioMatch?.[1] || "",
          duration: formattedDuration,
          episodeNumber: episodeMatch?.[1] || "",
        });
      }
    }

    return new Response(JSON.stringify({ episodes }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching podcast episodes:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch episodes" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
