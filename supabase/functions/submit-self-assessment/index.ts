import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { sendSystemEmail, escapeHtml } from "../_shared/resend.ts";
import { enqueueSpineEvent, extractUtm } from "../_shared/spine.ts";
import { checkRateLimit, getClientIp } from "../_shared/rateLimit.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://freedominterventions.com";
const VALID_CATEGORIES = ["early", "turning_point", "urgent"] as const;
type ResultCategory = (typeof VALID_CATEGORIES)[number];

function firstName(name: string) {
  return String(name || "there").trim().split(/\s+/)[0] || "there";
}

function scoreLead(category: ResultCategory, safetyFlag: boolean, hasPhone: boolean) {
  let score = category === "urgent" ? 75 : category === "turning_point" ? 55 : 30;
  if (safetyFlag) score += 15;
  if (hasPhone) score += 5;
  return Math.min(score, 100);
}

function buildFollowups(
  leadId: string,
  body: {
    contact_name: string;
    contact_email: string;
    contact_phone: string | null;
    result_category: ResultCategory;
    safety_flag: boolean;
    source_attribution: Record<string, unknown>;
  },
  priority: "normal" | "high" | "urgent",
) {
  const first = firstName(body.contact_name);
  const consultUrl = `${SITE_URL}/?type=consultation&name=${encodeURIComponent(body.contact_name)}&email=${encodeURIComponent(body.contact_email)}${body.contact_phone ? `&phone=${encodeURIComponent(body.contact_phone)}` : ""}#booking`;
  const coachingUrl = `${SITE_URL}/?type=crisis-coaching#booking`;
  const readinessUrl = `${SITE_URL}/intervention-readiness?source=self_assessment_followup&utm_source=freedom_followup&utm_medium=email&utm_campaign=self_assessment`;

  const base = {
    lead_type: "self_assessment",
    lead_id: leadId,
    contact_email: body.contact_email,
    contact_name: body.contact_name,
    contact_phone: body.contact_phone,
    priority,
    source_attribution: body.source_attribution,
  };

  const categoryIntro: Record<ResultCategory, string> = {
    early:
      "<p>Your answers suggest your family may still be in an early phase. That is genuinely good news — the earlier a family gets guidance, the more options stay open.</p><p>The most useful next step at this stage is usually a free consultation, so we can talk through what you are seeing and whether simple structure and boundaries are enough for now.</p>",
    turning_point:
      "<p>Your answers land in the range I see most often right before things escalate: the family knows something is wrong, but nobody agrees on how serious it is or what to do next.</p><p>For families in this range, a crisis coaching session is usually the right move — one structured call that turns the confusion into a working plan for the next hard conversation.</p>",
    urgent:
      "<p>Your answers suggest this situation has likely outgrown informal solutions. That does not mean you failed — it means the addiction is organized, and the response now needs to be organized too.</p><p>Please do not wait on email. Call me directly at <a href=\"tel:5416688084\">541-668-8084</a>. If a call is not possible yet, the intervention readiness path is where to start.</p>",
  };

  const categoryCta: Record<ResultCategory, string> = {
    early: `<p><a href="${consultUrl}">Book a free consultation</a></p>`,
    turning_point: `<p><a href="${coachingUrl}">Book a crisis coaching session</a> or <a href="${consultUrl}">start with a free consultation</a></p>`,
    urgent: `<p><a href="${readinessUrl}">Review the intervention readiness path</a> or <a href="${consultUrl}">book a free consultation</a></p>`,
  };

  return [
    {
      ...base,
      followup_reason: "self_assessment_results",
      sequence_step: 1,
      subject: `${first}, your family assessment results and next step`,
      body_html: `
        <p>Hi ${escapeHtml(first)},</p>
        <p>Thank you for completing the "Is It Time for an Intervention?" assessment. Answering those questions honestly takes courage.</p>
        ${categoryIntro[body.result_category]}
        ${categoryCta[body.result_category]}
        <p>If there is immediate danger, call 911. If suicide is a concern, call or text 988.</p>
        <p>- Matt Brown<br>Freedom Interventions<br><a href="tel:5416688084">541-668-8084</a></p>
      `,
      due_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    },
    {
      ...base,
      followup_reason: "self_assessment_next_step",
      sequence_step: 2,
      subject: "The question families ask me after the assessment",
      body_html: `
        <p>Hi ${escapeHtml(first)},</p>
        <p>The most common question after the assessment is: "Is it really bad enough to involve a professional?"</p>
        <p>Here is what twenty years of this work has taught me: families almost never overreact. They wait. And waiting usually costs leverage — it becomes easier for everyone to drift back into rescuing, minimizing, or arguing.</p>
        <p>You do not need to decide on an intervention today. You just need a clearer plan than the one you have now.</p>
        ${categoryCta[body.result_category]}
        <p>- Matt</p>
      `,
      due_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      ...base,
      followup_reason: "self_assessment_escalation",
      sequence_step: 3,
      subject: "If anything has changed since the assessment",
      body_html: `
        <p>Hi ${escapeHtml(first)},</p>
        <p>Checking in once more. These situations can change quickly — a new crisis, a treatment window opening, the family finally agreeing something has to happen.</p>
        <p>If anything has shifted, call me at <a href="tel:5416688084">541-668-8084</a> or grab a time here:</p>
        <p><a href="${consultUrl}">Book a free consultation</a></p>
        <p>- Matt</p>
      `,
      due_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIP = getClientIp(req);
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const allowed = await checkRateLimit(supabase, `self_assessment:${clientIP}`, 5, 3600);
    if (!allowed) {
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json();

    const contactName = typeof body.contact_name === "string" ? body.contact_name.trim().slice(0, 200) : "";
    const contactEmail = typeof body.contact_email === "string" ? body.contact_email.trim().toLowerCase().slice(0, 255) : "";
    const contactPhone = typeof body.contact_phone === "string" && body.contact_phone.trim() ? body.contact_phone.trim().slice(0, 40) : null;
    const contactRelationship = typeof body.contact_relationship === "string" && body.contact_relationship.trim() ? body.contact_relationship.trim().slice(0, 100) : null;
    const resultCategory = VALID_CATEGORIES.includes(body.result_category) ? (body.result_category as ResultCategory) : null;
    const safetyFlag = body.safety_flag === true;
    const responses = body.responses && typeof body.responses === "object" ? body.responses : {};
    const score = Number.isFinite(body.score) ? Math.max(0, Math.min(60, Math.round(body.score))) : 0;
    const percentage = Number.isFinite(body.percentage) ? Math.max(0, Math.min(100, body.percentage)) : 0;
    const sourceAttribution = body.source_attribution && typeof body.source_attribution === "object" ? body.source_attribution : {};

    if (!contactName) {
      return new Response(JSON.stringify({ error: "Name is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactEmail || !emailRegex.test(contactEmail)) {
      return new Response(JSON.stringify({ error: "A valid email is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resultCategory) {
      return new Response(JSON.stringify({ error: "Invalid result category" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const leadRow = {
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      contact_relationship: contactRelationship,
      responses,
      score,
      percentage,
      result_category: resultCategory,
      safety_flag: safetyFlag,
      source_attribution: sourceAttribution,
    };

    const { data, error: dbError } = await supabase
      .from("self_assessment_leads")
      .insert(leadRow)
      .select("id")
      .single();

    if (dbError) {
      console.error("self_assessment_leads insert failed:", dbError);
      return new Response(JSON.stringify({ error: "Failed to save assessment" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const leadScore = scoreLead(resultCategory, safetyFlag, !!contactPhone);
    const priority: "normal" | "high" | "urgent" = leadScore >= 80 ? "urgent" : leadScore >= 60 ? "high" : "normal";
    const nameParts = contactName.split(/\s+/);

    // CRM upsert (mirrors send-lead-magnet pattern)
    try {
      await supabase.from("crm_contacts").upsert({
        email: contactEmail,
        first_name: nameParts[0] || null,
        last_name: nameParts.slice(1).join(" ") || null,
        phone: contactPhone,
        source: "self_assessment",
        source_attribution: sourceAttribution,
        lead_score: leadScore,
        revenue_path: leadScore >= 70 ? "intervention_or_readiness" : "consultation_or_coaching",
        pipeline_status: "new",
        next_action: safetyFlag
          ? "SAFETY FLAG — call this self-assessment lead first"
          : resultCategory === "urgent"
            ? "Call this self-assessment lead today"
            : "Review self-assessment and invite to consultation or coaching",
        next_action_due_at: new Date(Date.now() + (leadScore >= 70 ? 30 : 240) * 60 * 1000).toISOString(),
        last_engagement_at: new Date().toISOString(),
      }, { onConflict: "email" });
    } catch (crmError) {
      console.error("CRM upsert failed (self_assessment):", crmError);
    }

    // Follow-up sequence
    try {
      const rows = buildFollowups(data.id, {
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        result_category: resultCategory,
        safety_flag: safetyFlag,
        source_attribution: sourceAttribution,
      }, priority);
      const { error: queueError } = await supabase.from("freedom_followup_queue").insert(rows);
      if (queueError) console.error("Failed to queue self-assessment followups:", queueError);
    } catch (followupError) {
      console.error("Self-assessment followup build failed:", followupError);
    }

    // Spine event (never blocks)
    try {
      await enqueueSpineEvent("lead_captured", {
        email: contactEmail,
        phone: contactPhone,
        name: contactName,
        utm: extractUtm(sourceAttribution as Record<string, any>),
        props: {
          lead_source: "self_assessment",
          result_category: resultCategory,
          safety_flag: safetyFlag,
          score,
        },
      }, supabase);
    } catch (spineError) {
      console.error("Spine enqueue failed (self_assessment):", spineError);
    }

    // Owner alert for urgent / safety-flagged leads
    if (safetyFlag || resultCategory === "urgent") {
      try {
        await sendSystemEmail({
          to: "matt@freedominterventions.com",
          subject: safetyFlag
            ? `SAFETY FLAG self-assessment lead: ${contactName}`
            : `Urgent self-assessment lead: ${contactName}`,
          html: `
            <h2>${safetyFlag ? "Safety-flagged" : "Urgent"} self-assessment submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(contactName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(contactEmail)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(contactPhone || "not provided")}</p>
            <p><strong>Relationship:</strong> ${escapeHtml(contactRelationship || "not provided")}</p>
            <p><strong>Tier:</strong> ${escapeHtml(resultCategory)} · <strong>Score:</strong> ${score}/60 (${Math.round(percentage)}%)</p>
            <p><strong>Safety flag:</strong> ${safetyFlag ? "YES — overdose/near-miss or suicidal-thinking answers at Often/Almost Always" : "no"}</p>
            <p><a href="${SITE_URL}/admin">Open admin dashboard</a></p>
          `,
        });
      } catch (emailError) {
        console.error("Owner alert email failed (self_assessment):", emailError);
      }
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("submit-self-assessment error:", error);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
