import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory rate limiting (resets on function restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // Max 3 submissions per hour per IP
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }
  
  if (record.count >= RATE_LIMIT) {
    return true;
  }
  
  record.count++;
  return false;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown";
    
    console.log(`Assessment submission attempt from IP: ${clientIP}`);

    // Check rate limit
    if (isRateLimited(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    
    // Validate required fields
    if (!body.contact_name || typeof body.contact_name !== "string" || body.contact_name.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Contact name is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (!body.contact_email || typeof body.contact_email !== "string") {
      return new Response(
        JSON.stringify({ error: "Contact email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.contact_email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (!body.loved_one_name || typeof body.loved_one_name !== "string" || body.loved_one_name.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Loved one's name is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate field lengths
    if (body.contact_name.length > 200) {
      return new Response(
        JSON.stringify({ error: "Contact name is too long" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (body.contact_email.length > 255) {
      return new Response(
        JSON.stringify({ error: "Email is too long" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role for insert
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Sanitize and prepare assessment data
    const assessmentData = {
      contact_name: body.contact_name?.trim().slice(0, 200),
      contact_email: body.contact_email?.trim().toLowerCase().slice(0, 255),
      contact_phone: body.contact_phone?.trim().slice(0, 50) || null,
      contact_relationship: body.contact_relationship?.trim().slice(0, 100) || null,
      best_day_to_contact: body.best_day_to_contact?.slice(0, 50) || null,
      best_time_to_contact: body.best_time_to_contact?.slice(0, 50) || null,
      loved_one_name: body.loved_one_name?.trim().slice(0, 200),
      loved_one_age: body.loved_one_age ? Math.min(Math.max(parseInt(body.loved_one_age) || 0, 0), 150) : null,
      loved_one_gender: body.loved_one_gender?.slice(0, 50) || null,
      primary_substances: body.primary_substances?.trim().slice(0, 500) || null,
      frequency: body.frequency?.slice(0, 100) || null,
      duration_of_use: body.duration_of_use?.slice(0, 100) || null,
      age_first_used: body.age_first_used ? Math.min(Math.max(parseInt(body.age_first_used) || 0, 0), 150) : null,
      use_increased: body.use_increased?.slice(0, 50) || null,
      dsm_behaviors: body.dsm_behaviors || {},
      dsm_yes_count: typeof body.dsm_yes_count === "number" ? Math.min(Math.max(body.dsm_yes_count, 0), 13) : 0,
      severity_level: body.severity_level?.slice(0, 50) || null,
      withdrawal_symptoms: body.withdrawal_symptoms?.slice(0, 50) || null,
      withdrawal_description: body.withdrawal_description?.trim().slice(0, 1000) || null,
      recent_detox: body.recent_detox?.slice(0, 50) || null,
      hospitalized_detox: body.hospitalized_detox?.trim().slice(0, 500) || null,
      withdrawal_medications: body.withdrawal_medications?.slice(0, 50) || null,
      withdrawal_medications_list: body.withdrawal_medications_list?.trim().slice(0, 500) || null,
      health_issues: body.health_issues?.slice(0, 50) || null,
      health_issues_list: body.health_issues_list?.trim().slice(0, 1000) || null,
      recent_er_visits: body.recent_er_visits?.slice(0, 50) || null,
      er_visit_details: body.er_visit_details?.trim().slice(0, 1000) || null,
      prescribed_medications: body.prescribed_medications?.slice(0, 50) || null,
      prescribed_medications_list: body.prescribed_medications_list?.trim().slice(0, 1000) || null,
      mental_health_signs: body.mental_health_signs?.slice(0, 50) || null,
      mental_health_details: body.mental_health_details?.trim().slice(0, 1000) || null,
      psychiatric_history: body.psychiatric_history?.slice(0, 50) || null,
      psychiatric_details: body.psychiatric_details?.trim().slice(0, 1000) || null,
      violence_history: body.violence_history?.slice(0, 50) || null,
      violence_details: body.violence_details?.trim().slice(0, 1000) || null,
      stable_living: body.stable_living?.slice(0, 50) || null,
      homeless_unstable: body.homeless_unstable?.trim().slice(0, 500) || null,
      family_enabling: body.family_enabling?.slice(0, 50) || null,
      enabling_details: body.enabling_details?.trim().slice(0, 1000) || null,
      children_present: body.children_present?.slice(0, 50) || null,
      children_impacted: body.children_impacted?.trim().slice(0, 1000) || null,
      support_network: body.support_network?.trim().slice(0, 1000) || null,
      prior_treatment: body.prior_treatment?.slice(0, 50) || null,
      treatment_history: body.treatment_history || null,
      current_triggers: body.current_triggers?.trim().slice(0, 1000) || null,
      willingness_to_change: body.willingness_to_change?.slice(0, 50) || null,
      financial_impact: body.financial_impact?.slice(0, 50) || null,
      financial_details: body.financial_details?.trim().slice(0, 1000) || null,
      child_welfare_involvement: body.child_welfare_involvement?.trim().slice(0, 500) || null,
      family_ready_intervention: body.family_ready_intervention?.slice(0, 50) || null,
      intervention_barriers: body.intervention_barriers?.trim().slice(0, 1000) || null,
      family_signature: body.family_signature?.trim().slice(0, 200) || null,
    };

    console.log(`Inserting assessment for: ${assessmentData.loved_one_name}`);

    const { data, error: dbError } = await supabase
      .from("assessments")
      .insert(assessmentData)
      .select("id")
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save assessment" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Assessment saved successfully with ID: ${data.id}`);

    // Send email notification via SendGrid (non-blocking)
    try {
      const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
      if (sendgridApiKey) {
        console.log("Sending assessment notification via SendGrid");
        
        const emailResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sendgridApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: "matt@freedominterventions.com" }] }],
            from: { email: "noreply@freedominterventions.com", name: "Freedom Interventions" },
            subject: `New Assessment: ${assessmentData.loved_one_name}`,
            content: [{
              type: "text/html",
              value: `
                <h2>New Assessment Submitted</h2>
                <p><strong>Loved One:</strong> ${assessmentData.loved_one_name}</p>
                <p><strong>Contact:</strong> ${assessmentData.contact_name} (${assessmentData.contact_email})</p>
                <p><strong>Phone:</strong> ${assessmentData.contact_phone || "Not provided"}</p>
                <p><strong>Best time to reach:</strong> ${assessmentData.best_day_to_contact || "Any day"} - ${assessmentData.best_time_to_contact || "Any time"}</p>
                <p><strong>Severity Level:</strong> ${assessmentData.severity_level} (${assessmentData.dsm_yes_count}/13 criteria)</p>
                <br>
                <p>View full assessment in the admin dashboard.</p>
              `,
            }],
          }),
        });

        if (emailResponse.ok) {
          console.log("Email notification sent via SendGrid");
        } else {
          const errorText = await emailResponse.text();
          console.error("SendGrid error:", errorText);
        }
      }
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
      // Don't fail the request if email fails
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error processing assessment:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
