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
    const { postId, title, category } = await req.json();

    if (!postId || !title) {
      return new Response(
        JSON.stringify({ error: "postId and title are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Create prompt for image generation
    const imagePrompt = `Create a professional, evocative blog cover image for an addiction intervention and recovery service article titled "${title}". 
    
The image should:
- Be emotionally supportive and hopeful, not dark or triggering
- Feature abstract or symbolic imagery (like paths, light, hands reaching, nature scenes)
- Use warm, calming colors (golden light, soft blues, warm earth tones)
- Be suitable for a professional healthcare/intervention services website
- Convey themes of hope, family support, and recovery
- Category context: ${category || "addiction recovery"}
- 16:9 aspect ratio, ultra high resolution
- No text or words in the image`;

    console.log("Generating image for post:", postId, "with title:", title);

    // Call Lovable AI with Gemini image model
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [
          {
            role: "user",
            content: imagePrompt,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received");

    const imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!imageData) {
      throw new Error("No image generated from AI");
    }

    // Extract base64 data and convert to blob
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
    const imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    // Upload to Supabase Storage
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const fileName = `blog-covers/${postId}.jpg`;
    
    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(fileName, imageBytes, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;
    console.log("Image uploaded to:", publicUrl);

    // Update blog post with image URL
    const { error: updateError } = await supabase
      .from("blog_posts")
      .update({ image_url: publicUrl })
      .eq("id", postId);

    if (updateError) {
      console.error("Database update error:", updateError);
      throw new Error(`Failed to update blog post: ${updateError.message}`);
    }

    return new Response(
      JSON.stringify({ success: true, imageUrl: publicUrl }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating blog image:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
