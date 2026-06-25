import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { checkRateLimit, getClientIp } from "../_shared/rateLimit.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Durable rate limiting: max 5 submissions per hour per IP (see _shared/rateLimit.ts).
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW_SECONDS = 60 * 60;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIP = getClientIp(req);

    console.log(`Testimonial submission from IP: ${clientIP}`);

    const rlClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const allowed = await checkRateLimit(rlClient, `testimonial:${clientIP}`, RATE_LIMIT, RATE_LIMIT_WINDOW_SECONDS);
    if (!allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    
    // Validate required fields
    if (!body.first_name || typeof body.first_name !== "string" || body.first_name.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "First name is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (!body.last_initial || typeof body.last_initial !== "string" || body.last_initial.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Last initial is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!body.city || typeof body.city !== "string" || body.city.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "City is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!body.review_text || typeof body.review_text !== "string" || body.review_text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Review text is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Sanitize and prepare data
    const testimonialData = {
      first_name: body.first_name.trim().slice(0, 50),
      last_initial: body.last_initial.trim().slice(0, 1).toUpperCase(),
      city: body.city.trim().slice(0, 100),
      review_text: body.review_text.trim().slice(0, 2000),
      reviewer_type: body.reviewer_type === "professional" ? "professional" : "family",
      rating: typeof body.rating === "number" ? Math.min(Math.max(body.rating, 1), 5) : 5,
      last_name: body.last_name?.trim().slice(0, 50) || null,
      profession: body.profession?.trim().slice(0, 100) || null,
      company: body.company?.trim().slice(0, 100) || null,
      state: body.state?.trim().slice(0, 50) || null,
      approved: false, // Always start unapproved
    };

    console.log(`Inserting testimonial from: ${testimonialData.first_name} ${testimonialData.last_initial}.`);

    const { data, error: dbError } = await supabase
      .from("family_reviews")
      .insert(testimonialData)
      .select("id")
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save testimonial" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Testimonial saved successfully with ID: ${data.id}`);

    // Send email notification
    try {
      const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
      if (sendgridApiKey) {
        console.log("Sending testimonial notification via SendGrid");

        const isProfessional = testimonialData.reviewer_type === "professional";
        const reviewerName = isProfessional 
          ? `${testimonialData.first_name} ${testimonialData.last_name || ""}`
          : `${testimonialData.first_name} ${testimonialData.last_initial}.`;
        
        const locationInfo = isProfessional 
          ? `${testimonialData.city}, ${testimonialData.state || ""}`
          : testimonialData.city;

        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .header { background: #1e3a5f; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; }
              .review-box { background: #f9f9f9; border-left: 4px solid #1e3a5f; padding: 15px; margin: 20px 0; }
              .stars { color: #fbbf24; font-size: 20px; }
              .footer { text-align: center; padding: 20px; color: #666; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>⭐ New Testimonial Submitted</h1>
              <p>Submitted ${new Date().toLocaleString('en-US', { timeZone: 'America/Denver' })}</p>
            </div>
            
            <div class="content">
              <p><strong>Reviewer:</strong> ${reviewerName}</p>
              <p><strong>Type:</strong> ${isProfessional ? "Professional" : "Family Member"}</p>
              <p><strong>Location:</strong> ${locationInfo}</p>
              ${isProfessional ? `<p><strong>Position:</strong> ${testimonialData.profession} at ${testimonialData.company}</p>` : ""}
              <p><strong>Rating:</strong> <span class="stars">${"★".repeat(testimonialData.rating)}${"☆".repeat(5 - testimonialData.rating)}</span></p>
              
              <div class="review-box">
                <p><em>"${testimonialData.review_text}"</em></p>
              </div>
              
              <p style="background: #fef3c7; padding: 10px; border-radius: 5px;">
                <strong>⚠️ Action Required:</strong> This testimonial needs your approval before it will be visible on the website.
              </p>
            </div>
            
            <div class="footer">
              <p><a href="https://freedominterventions.com/admin" style="background: #1e3a5f; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Review in Admin Dashboard</a></p>
              <br>
              <p>Freedom Interventions Testimonial System</p>
            </div>
          </body>
          </html>
        `;

        const emailResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sendgridApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: "matt@freedominterventions.com" }] }],
            from: { email: "noreply@freedominterventions.com", name: "Freedom Interventions" },
            subject: `New Testimonial from ${reviewerName} (${testimonialData.rating}⭐)`,
            content: [{ type: "text/html", value: emailHtml }],
          }),
        });

        if (emailResponse.ok) {
          console.log("Email sent successfully via SendGrid");
        } else {
          const errorText = await emailResponse.text();
          console.error("SendGrid API error:", errorText);
        }
      } else {
        console.log("SENDGRID_API_KEY not configured, skipping email notification");
      }
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error processing testimonial:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
