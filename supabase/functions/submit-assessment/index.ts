import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { sendResendEmail, sendSystemEmail } from "../_shared/resend.ts";
import { enqueueSpineEvent, extractUtm } from "../_shared/spine.ts";
import { checkRateLimit, getClientIp } from "../_shared/rateLimit.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://freedominterventions.com";

function escapeHtml(value: string) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function includesYes(value: unknown) {
  return typeof value === "string" && /\b(yes|true|high|urgent|immediate|active|current|critical)\b/i.test(value);
}

function scoreAssessment(data: Record<string, any>) {
  let score = 25;
  if (/urgent|high|immediate|critical/i.test(data.urgency_level || "")) score += 25;
  if ((data.dsm_yes_count || 0) >= 6) score += 20;
  if (includesYes(data.overdose_history)) score += 20;
  if (includesYes(data.suicide_ideation) || includesYes(data.suicide_attempts_history)) score += 25;
  if (includesYes(data.violence_history)) score += 15;
  if (includesYes(data.immediate_safety_concerns)) score += 20;
  if (includesYes(data.family_ready_intervention)) score += 15;
  if (data.contact_phone) score += 5;
  return Math.min(score, 100);
}

async function queueAssessmentFollowups(supabase: ReturnType<typeof createClient>, assessmentId: string, assessmentData: Record<string, any>) {
  const sourceAttribution = assessmentData.source_attribution && typeof assessmentData.source_attribution === "object"
    ? assessmentData.source_attribution
    : {};
  const leadScore = scoreAssessment(assessmentData);
  const priority = leadScore >= 80 ? "urgent" : leadScore >= 60 ? "high" : "normal";
  const firstName = String(assessmentData.contact_name || "there").trim().split(/\s+/)[0] || "there";
  const consultUrl = `${SITE_URL}/?type=consultation&name=${encodeURIComponent(assessmentData.contact_name || "")}&email=${encodeURIComponent(assessmentData.contact_email || "")}${assessmentData.contact_phone ? `&phone=${encodeURIComponent(assessmentData.contact_phone)}` : ""}#booking`;
  const readinessUrl = `${SITE_URL}/intervention-readiness?source=assessment_followup&utm_source=freedom_followup&utm_medium=email&utm_campaign=intervention_readiness`;

  await supabase
    .from("crm_contacts")
    .update({
      source_attribution: sourceAttribution,
      lead_score: leadScore,
      revenue_path: leadScore >= 75 ? "intervention_or_readiness" : "consultation_or_coaching",
      pipeline_status: "new",
      next_action: leadScore >= 75 ? "Call this assessment lead first" : "Review assessment and invite to consultation",
      next_action_due_at: new Date(Date.now() + (leadScore >= 75 ? 30 : 180) * 60 * 1000).toISOString(),
      last_engagement_at: new Date().toISOString(),
    })
    .eq("email", assessmentData.contact_email);

  const rows = [
    {
      lead_type: "assessment",
      lead_id: assessmentId,
      contact_email: assessmentData.contact_email,
      contact_name: assessmentData.contact_name,
      contact_phone: assessmentData.contact_phone || null,
      followup_reason: "assessment_confirmation",
      priority,
      sequence_step: 1,
      subject: `${firstName}, I received your family assessment`,
      body_html: `
        <p>Hi ${escapeHtml(firstName)},</p>
        <p>I received your family assessment. Thank you for taking the time to lay out what is happening. That information helps me understand urgency, safety, treatment history, and where the family may need to get aligned.</p>
        <p>If things are escalating or you need answers sooner, you can book a free consultation here:</p>
        <p><a href="${consultUrl}">Book a free consultation</a></p>
        <p>If there is immediate danger, call 911 or local emergency services. For intervention planning or family strategy, you can call me directly at <a href="tel:5416688084">541-668-8084</a>.</p>
        <p>- Matt Brown<br>Freedom Interventions</p>
      `,
      source_attribution: sourceAttribution,
      due_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    },
    {
      lead_type: "assessment",
      lead_id: assessmentId,
      contact_email: assessmentData.contact_email,
      contact_name: assessmentData.contact_name,
      contact_phone: assessmentData.contact_phone || null,
      followup_reason: "assessment_next_step",
      priority,
      sequence_step: 2,
      subject: "The next step is getting the family aligned",
      body_html: `
        <p>Hi ${escapeHtml(firstName)},</p>
        <p>After a family submits an assessment, the next useful move is usually getting clear on whether this calls for a free consultation, a crisis coaching session, a Family Readiness Intensive, or a full intervention process.</p>
        <p>On the first call, we are looking for the real category of the problem: safety risk, treatment refusal, family division, logistics, or a boundary pattern that keeps collapsing.</p>
        <p>If you have not already scheduled, this is the easiest starting point:</p>
        <p><a href="${consultUrl}">Choose a free consultation time</a></p>
        <p>- Matt</p>
      `,
      source_attribution: sourceAttribution,
      due_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      lead_type: "assessment",
      lead_id: assessmentId,
      contact_email: assessmentData.contact_email,
      contact_name: assessmentData.contact_name,
      contact_phone: assessmentData.contact_phone || null,
      followup_reason: "assessment_escalation",
      priority,
      sequence_step: 3,
      subject: "If the situation changed, do not wait",
      body_html: `
        <p>Hi ${escapeHtml(firstName)},</p>
        <p>I wanted to check back once more. These situations can change quickly, and families often wait longer than they should because nobody wants to overreact.</p>
        <p>If your loved one is refusing help, the family is divided, or the risk is rising, waiting usually costs leverage. It becomes easier for everyone to drift back into rescuing, threatening, minimizing, or arguing.</p>
        <p>You can review the intervention readiness path here:</p>
        <p><a href="${readinessUrl}">Check intervention readiness</a></p>
        <p>Or call me at <a href="tel:5416688084">541-668-8084</a> or use this consultation link:</p>
        <p><a href="${consultUrl}">Book a free consultation</a></p>
        <p>- Matt</p>
      `,
      source_attribution: sourceAttribution,
      due_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    },
    {
      lead_type: "assessment",
      lead_id: assessmentId,
      contact_email: assessmentData.contact_email,
      contact_name: assessmentData.contact_name,
      contact_phone: assessmentData.contact_phone || null,
      followup_reason: "assessment_readiness_close_path",
      priority,
      sequence_step: 4,
      subject: "What happens if this really is intervention-level?",
      body_html: `
        <p>Hi ${escapeHtml(firstName)},</p>
        <p>If this situation is intervention-level, the first step is not a surprise confrontation. It is preparation: family alignment, treatment options, boundaries, logistics, and a clear plan for resistance.</p>
        <p>That is what the readiness path is designed to sort. If it is not the right level of help, I will tell you that. If it is, the family should know before the next crisis makes the decision for you.</p>
        <p><a href="${readinessUrl}">Review the intervention readiness path</a></p>
        <p><a href="${consultUrl}">Book a free consultation</a></p>
        <p>- Matt</p>
      `,
      source_attribution: sourceAttribution,
      due_at: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const { error } = await supabase.from("freedom_followup_queue").insert(rows);
  if (error) console.error("Failed to queue assessment followups:", error);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = getClientIp(req);

    console.log(`Assessment submission attempt from IP: ${clientIP}`);

    // Build service-role client up front (used by rate limiter and insert)
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Durable rate limit: 3 per hour per IP
    const allowed = await checkRateLimit(supabase, `assessment:${clientIP}`, 3, 3600);
    if (!allowed) {
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

    // (Supabase client already initialized above for rate limiting)

    // Prepare assessment data - pass through all fields
    const assessmentData = {
      contact_name: body.contact_name?.trim().slice(0, 200),
      contact_email: body.contact_email?.trim().toLowerCase().slice(0, 255),
      contact_phone: body.contact_phone || null,
      contact_relationship: body.contact_relationship || null,
      best_day_to_contact: body.best_day_to_contact || null,
      best_time_to_contact: body.best_time_to_contact || null,
      loved_one_name: body.loved_one_name?.trim().slice(0, 200),
      loved_one_age: body.loved_one_age || null,
      loved_one_gender: body.loved_one_gender || null,
      date_of_birth: body.date_of_birth || null,
      marital_status: body.marital_status || null,
      employment_status: body.employment_status || null,
      occupation: body.occupation || null,
      education_level: body.education_level || null,
      living_situation: body.living_situation || null,
      veteran_status: body.veteran_status || null,
      primary_language: body.primary_language || null,
      insurance_card_front_url: body.insurance_card_front_url || null,
      insurance_card_back_url: body.insurance_card_back_url || null,
      primary_substances: body.primary_substances || null,
      substances_used: body.substances_used || null,
      polysubstance_use: body.polysubstance_use || null,
      iv_drug_use: body.iv_drug_use || null,
      overdose_history: body.overdose_history || null,
      overdose_details: body.overdose_details || null,
      naloxone_reversals: body.naloxone_reversals || null,
      morning_use: body.morning_use || null,
      using_alone: body.using_alone || null,
      hiding_use: body.hiding_use || null,
      blackouts_history: body.blackouts_history || null,
      age_first_used: body.age_first_used || null,
      duration_of_use: body.duration_of_use || null,
      longest_sobriety_period: body.longest_sobriety_period || null,
      use_increased: body.use_increased || null,
      typical_daily_use: body.typical_daily_use || null,
      last_use_date: body.last_use_date || null,
      frequency: body.frequency || null,
      dsm_behaviors: body.dsm_behaviors || {},
      dsm_yes_count: body.dsm_yes_count || 0,
      severity_level: body.severity_level || null,
      withdrawal_symptoms: body.withdrawal_symptoms || null,
      withdrawal_description: body.withdrawal_description || null,
      seizure_history: body.seizure_history || null,
      delirium_tremens_history: body.delirium_tremens_history || null,
      recent_detox: body.recent_detox || null,
      hospitalized_detox: body.hospitalized_detox || null,
      withdrawal_medications: body.withdrawal_medications || null,
      withdrawal_medications_list: body.withdrawal_medications_list || null,
      health_issues: body.health_issues || null,
      health_issues_list: body.health_issues_list || null,
      recent_er_visits: body.recent_er_visits || null,
      er_visit_details: body.er_visit_details || null,
      prescribed_medications: body.prescribed_medications || null,
      prescribed_medications_list: body.prescribed_medications_list || null,
      chronic_pain: body.chronic_pain || null,
      chronic_pain_details: body.chronic_pain_details || null,
      infectious_diseases: body.infectious_diseases || null,
      pregnancy_status: body.pregnancy_status || null,
      sleep_problems: body.sleep_problems || null,
      mental_health_signs: body.mental_health_signs || null,
      mental_health_details: body.mental_health_details || null,
      psychiatric_history: body.psychiatric_history || null,
      psychiatric_details: body.psychiatric_details || null,
      current_mental_health_symptoms: body.current_mental_health_symptoms || null,
      suicide_ideation: body.suicide_ideation || null,
      suicide_ideation_details: body.suicide_ideation_details || null,
      suicide_attempts_history: body.suicide_attempts_history || null,
      self_harm_history: body.self_harm_history || null,
      homicidal_ideation: body.homicidal_ideation || null,
      trauma_history: body.trauma_history || null,
      trauma_details: body.trauma_details || null,
      ptsd_symptoms: body.ptsd_symptoms || null,
      mental_health_diagnoses: body.mental_health_diagnoses || null,
      current_mental_health_treatment: body.current_mental_health_treatment || null,
      stage_of_change: body.stage_of_change || null,
      acknowledges_problem: body.acknowledges_problem || null,
      motivation_level: body.motivation_level || null,
      willingness_to_change: body.willingness_to_change || null,
      what_worked_before: body.what_worked_before || null,
      what_didnt_work: body.what_didnt_work || null,
      treatment_goals: body.treatment_goals || null,
      resistance_factors: body.resistance_factors || null,
      relapse_triggers: body.relapse_triggers || null,
      high_risk_situations: body.high_risk_situations || null,
      coping_skills: body.coping_skills || null,
      relapse_warning_signs: body.relapse_warning_signs || null,
      peer_support_recovery: body.peer_support_recovery || null,
      twelve_step_involvement: body.twelve_step_involvement || null,
      prior_treatment: body.prior_treatment || null,
      treatment_history: body.treatment_history || null,
      current_triggers: body.current_triggers || null,
      stable_living: body.stable_living || null,
      homeless_unstable: body.homeless_unstable || null,
      people_using_in_home: body.people_using_in_home || null,
      substances_accessible_home: body.substances_accessible_home || null,
      support_network: body.support_network || null,
      safe_housing_available: body.safe_housing_available || null,
      transportation_access: body.transportation_access || null,
      legal_issues: body.legal_issues || null,
      legal_issues_details: body.legal_issues_details || null,
      pending_charges: body.pending_charges || null,
      probation_parole: body.probation_parole || null,
      dui_history: body.dui_history || null,
      family_members_participating: body.family_members_participating || null,
      family_unity_level: body.family_unity_level || null,
      family_communication_patterns: body.family_communication_patterns || null,
      family_conflicts: body.family_conflicts || null,
      family_conflicts_details: body.family_conflicts_details || null,
      divorced_parents: body.divorced_parents || null,
      estranged_family_members: body.estranged_family_members || null,
      estranged_details: body.estranged_details || null,
      codependency_patterns: body.codependency_patterns || null,
      boundaries_assessment: body.boundaries_assessment || null,
      family_enabling: body.family_enabling || null,
      enabling_details: body.enabling_details || null,
      family_secrets: body.family_secrets || null,
      family_trauma_history: body.family_trauma_history || null,
      children_present: body.children_present || null,
      children_impacted: body.children_impacted || null,
      who_holds_leverage: body.who_holds_leverage || null,
      family_addiction_history: body.family_addiction_history || null,
      generational_addiction_pattern: body.generational_addiction_pattern || null,
      family_recovery_history: body.family_recovery_history || null,
      family_overdose_deaths: body.family_overdose_deaths || null,
      family_mental_health_history: body.family_mental_health_history || null,
      family_suicide_history: body.family_suicide_history || null,
      family_psychiatric_hospitalizations: body.family_psychiatric_hospitalizations || null,
      violence_history: body.violence_history || null,
      violence_details: body.violence_details || null,
      financial_impact: body.financial_impact || null,
      financial_details: body.financial_details || null,
      job_loss_due_to_use: body.job_loss_due_to_use || null,
      relationship_losses: body.relationship_losses || null,
      stolen_from_family: body.stolen_from_family || null,
      arrests_history: body.arrests_history || null,
      arrests_details: body.arrests_details || null,
      child_welfare_involvement: body.child_welfare_involvement || null,
      family_ready_intervention: body.family_ready_intervention || null,
      intervention_barriers: body.intervention_barriers || null,
      what_motivates_individual: body.what_motivates_individual || null,
      treatment_preferences: body.treatment_preferences || null,
      geographic_preferences: body.geographic_preferences || null,
      insurance_information: body.insurance_information || null,
      budget_for_treatment: body.budget_for_treatment || null,
      urgency_level: body.urgency_level || null,
      immediate_safety_concerns: body.immediate_safety_concerns || null,
      additional_information: body.additional_information || null,
      family_signature: body.family_signature || null,
      source_attribution: (body.source_attribution || body.sourceAttribution || {}) && typeof (body.source_attribution || body.sourceAttribution || {}) === "object"
        ? (body.source_attribution || body.sourceAttribution || {})
        : {},
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

    try {
      await queueAssessmentFollowups(supabase, data.id, assessmentData);
    } catch (followupError) {
      console.error("Assessment followup queue failed:", followupError);
    }

    // Spine: forward NON-SENSITIVE summary to the hub (additive — never blocks).
    try {
      await enqueueSpineEvent(
        "assessment_completed",
        {
          email: assessmentData.contact_email ?? null,
          phone: assessmentData.contact_phone ?? null,
          name: assessmentData.contact_name ?? null,
          utm: extractUtm(body),
          props: { score: scoreAssessment(body) },
        },
        supabase,
      );
    } catch (spineError) {
      console.error("Spine enqueue failed (assessment_completed):", spineError);
    }

    // Send email notifications via Resend
    try {
      console.log("Sending assessment notifications via Resend");

        // Parse withdrawal symptoms if present
        let withdrawalInfo = "None reported";
        if (assessmentData.withdrawal_symptoms) {
          try {
            const symptoms = JSON.parse(assessmentData.withdrawal_symptoms);
            const physical = symptoms.physical?.length ? symptoms.physical.join(", ") : "None";
            const psychological = symptoms.psychological?.length ? symptoms.psychological.join(", ") : "None";
            withdrawalInfo = `Physical: ${physical}<br>Psychological: ${psychological}`;
          } catch {
            withdrawalInfo = assessmentData.withdrawal_symptoms;
          }
        }

        // Format treatment history
        let treatmentInfo = "None reported";
        if (assessmentData.treatment_history && Array.isArray(assessmentData.treatment_history)) {
          treatmentInfo = assessmentData.treatment_history.map((t: any) => 
            `${t.programName || "Unknown"} (${t.programType || "Unknown"}) - Age ${t.ageAtTreatment || "?"}, ${t.successfulCompletion ? "Completed" : "Did not complete"}, ${t.aftercareFollowed ? "Followed aftercare" : "Did not follow aftercare"}`
          ).join("<br>");
        }

        // Determine urgency styling
        const isHighUrgency = assessmentData.urgency_level === "critical" || 
                              assessmentData.suicide_ideation === "yes" || 
                              assessmentData.immediate_safety_concerns;
        const urgencyColor = isHighUrgency ? "#dc2626" : "#059669";
        const urgencyText = isHighUrgency ? "⚠️ HIGH PRIORITY" : "Standard";

        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .header { background: #1e3a5f; color: white; padding: 20px; text-align: center; }
              .urgency { background: ${urgencyColor}; color: white; padding: 10px; text-align: center; font-weight: bold; }
              .section { margin: 20px 0; padding: 15px; background: #f9f9f9; border-radius: 8px; }
              .section h3 { color: #1e3a5f; margin-top: 0; border-bottom: 2px solid #1e3a5f; padding-bottom: 5px; }
              .label { font-weight: bold; color: #555; }
              .value { margin-left: 10px; }
              .warning { background: #fef2f2; border-left: 4px solid #dc2626; padding: 10px; margin: 10px 0; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>📋 New Comprehensive Assessment</h1>
              <p>Submitted ${new Date().toLocaleString('en-US', { timeZone: 'America/Denver' })}</p>
            </div>
            
            <div class="urgency">${urgencyText} - Severity: ${assessmentData.severity_level || "Not assessed"} (${assessmentData.dsm_yes_count}/11 DSM criteria)</div>
            
            ${isHighUrgency ? `
            <div class="warning">
              <strong>⚠️ Safety Concerns Noted:</strong><br>
              ${assessmentData.suicide_ideation === "yes" ? "• Suicidal ideation reported<br>" : ""}
              ${assessmentData.immediate_safety_concerns ? `• ${assessmentData.immediate_safety_concerns}` : ""}
            </div>
            ` : ""}
            
            <div class="section">
              <h3>👤 Individual Information</h3>
              <p><span class="label">Name:</span> <span class="value">${assessmentData.loved_one_name}</span></p>
              <p><span class="label">Age:</span> <span class="value">${assessmentData.loved_one_age || "Not provided"}</span></p>
              <p><span class="label">Gender:</span> <span class="value">${assessmentData.loved_one_gender || "Not provided"}</span></p>
              <p><span class="label">Employment:</span> <span class="value">${assessmentData.employment_status || "Not provided"}</span></p>
              <p><span class="label">Living Situation:</span> <span class="value">${assessmentData.living_situation || "Not provided"}</span></p>
            </div>
            
            <div class="section">
              <h3>📞 Contact Information</h3>
              <p><span class="label">Contact Name:</span> <span class="value">${assessmentData.contact_name}</span></p>
              <p><span class="label">Relationship:</span> <span class="value">${assessmentData.contact_relationship || "Not specified"}</span></p>
              <p><span class="label">Email:</span> <span class="value"><a href="mailto:${assessmentData.contact_email}">${assessmentData.contact_email}</a></span></p>
              <p><span class="label">Phone:</span> <span class="value">${assessmentData.contact_phone || "Not provided"}</span></p>
              <p><span class="label">Best Time:</span> <span class="value">${assessmentData.best_day_to_contact || "Any day"} - ${assessmentData.best_time_to_contact || "Any time"}</span></p>
            </div>
            
            <div class="section">
              <h3>💊 Substance Use Summary</h3>
              <p><span class="label">Primary Substances:</span> <span class="value">${assessmentData.primary_substances || "Not specified"}</span></p>
              <p><span class="label">Duration:</span> <span class="value">${assessmentData.duration_of_use || "Not specified"}</span></p>
              <p><span class="label">IV Drug Use:</span> <span class="value">${assessmentData.iv_drug_use || "Not specified"}</span></p>
              <p><span class="label">Overdose History:</span> <span class="value">${assessmentData.overdose_history || "Not specified"}</span></p>
              <p><span class="label">Longest Sobriety:</span> <span class="value">${assessmentData.longest_sobriety_period || "Not specified"}</span></p>
            </div>
            
            <div class="section">
              <h3>⚕️ Withdrawal & Medical</h3>
              <p><span class="label">Seizure History:</span> <span class="value">${assessmentData.seizure_history || "Not specified"}</span></p>
              <p><span class="label">Delirium Tremens:</span> <span class="value">${assessmentData.delirium_tremens_history || "Not specified"}</span></p>
              <p><span class="label">Withdrawal Symptoms:</span><br>${withdrawalInfo}</p>
            </div>
            
            <div class="section">
              <h3>🧠 Mental Health</h3>
              <p><span class="label">Psychiatric History:</span> <span class="value">${assessmentData.psychiatric_history || "Not specified"}</span></p>
              <p><span class="label">Trauma History:</span> <span class="value">${assessmentData.trauma_history || "Not specified"}</span></p>
              <p><span class="label">Suicide Ideation:</span> <span class="value">${assessmentData.suicide_ideation || "Not specified"}</span></p>
              <p><span class="label">Suicide Attempts:</span> <span class="value">${assessmentData.suicide_attempts_history || "Not specified"}</span></p>
            </div>
            
            <div class="section">
              <h3>📚 Treatment History</h3>
              <p><span class="label">Prior Treatment:</span> <span class="value">${assessmentData.prior_treatment || "Not specified"}</span></p>
              <p>${treatmentInfo}</p>
            </div>
            
            <div class="section">
              <h3>👨‍👩‍👧‍👦 Family Dynamics</h3>
              <p><span class="label">Family Unity:</span> <span class="value">${assessmentData.family_unity_level || "Not assessed"}</span></p>
              <p><span class="label">Ready for Intervention:</span> <span class="value">${assessmentData.family_ready_intervention || "Not specified"}</span></p>
              <p><span class="label">Intervention Barriers:</span> <span class="value">${assessmentData.intervention_barriers || "None noted"}</span></p>
              <p><span class="label">Who Holds Leverage:</span> <span class="value">${assessmentData.who_holds_leverage || "Not specified"}</span></p>
            </div>
            
            <div class="section">
              <h3>🎯 Intervention Planning</h3>
              <p><span class="label">Stage of Change:</span> <span class="value">${assessmentData.stage_of_change || "Not assessed"}</span></p>
              <p><span class="label">Urgency Level:</span> <span class="value">${assessmentData.urgency_level || "Not specified"}</span></p>
              <p><span class="label">Treatment Preferences:</span> <span class="value">${assessmentData.treatment_preferences || "None specified"}</span></p>
              <p><span class="label">Geographic Preferences:</span> <span class="value">${assessmentData.geographic_preferences || "None specified"}</span></p>
              <p><span class="label">Budget:</span> <span class="value">${assessmentData.budget_for_treatment || "Not specified"}</span></p>
              <p><span class="label">Insurance:</span> <span class="value">${assessmentData.insurance_information || "Not provided"}</span></p>
            </div>
            
            ${assessmentData.additional_information ? `
            <div class="section">
              <h3>📝 Additional Information</h3>
              <p>${assessmentData.additional_information}</p>
            </div>
            ` : ""}
            
            <div class="footer">
              <p><strong>View the full assessment in the admin dashboard:</strong></p>
              <p><a href="https://freedominterventions.com/admin" style="background: #1e3a5f; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Admin Dashboard</a></p>
              <br>
              <p>Freedom Interventions Assessment System</p>
            </div>
          </body>
          </html>
        `;

        const emailSubject = `${isHighUrgency ? "⚠️ URGENT: " : ""}New Assessment: ${assessmentData.loved_one_name} (${assessmentData.severity_level || "Unassessed"})`;

        await sendSystemEmail({
          to: "matt@freedominterventions.com",
          replyTo: assessmentData.contact_email,
          subject: emailSubject,
          html: emailHtml,
        });

        const firstName = String(assessmentData.contact_name || "there").trim().split(/\s+/)[0] || "there";
        const consultUrl = `${SITE_URL}/?type=consultation&name=${encodeURIComponent(assessmentData.contact_name || "")}&email=${encodeURIComponent(assessmentData.contact_email || "")}${assessmentData.contact_phone ? `&phone=${encodeURIComponent(assessmentData.contact_phone)}` : ""}#booking`;
        const clientHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; color: #1f2937; line-height: 1.6;">
            <h1 style="color: #1e3a5f;">I received your family assessment</h1>
            <p>Hi ${escapeHtml(firstName)},</p>
            <p>I received your assessment. Thank you for taking the time to lay out what is happening. I’ll review it personally and look for the clearest next step for your family.</p>
            <p>This assessment helps me understand urgency, safety concerns, treatment history, family alignment, and where leverage may or may not exist.</p>
            <p>If this is escalating or you need answers sooner, book a free consultation here:</p>
            <p><a href="${consultUrl}" style="display:inline-block;background:#1e3a5f;color:#fff;padding:12px 20px;text-decoration:none;border-radius:6px;">Book a free consultation</a></p>
            <p>If there is immediate danger, call 911 or local emergency services. For intervention planning or family strategy, call or text me directly at <a href="tel:5416688084">541-668-8084</a>.</p>
            <p>- Matt Brown<br>Freedom Interventions</p>
          </div>
        `;

        await sendResendEmail({
          to: assessmentData.contact_email,
          subject: `${firstName}, I received your family assessment`,
          html: clientHtml,
          replyTo: "matt@freedominterventions.com",
        });

        console.log("Assessment notifications sent successfully via Resend");
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
