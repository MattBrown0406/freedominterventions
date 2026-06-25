import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { escapeHtml, sendSystemEmail } from "../_shared/resend.ts";
import { enqueueSpineEvent, extractUtm } from "../_shared/spine.ts";
import { checkRateLimit, getClientIp } from "../_shared/rateLimit.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactMessageRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  pagePath?: string;
  sourceAttribution?: Record<string, unknown>;
  // Honeypot: a hidden form field that real users never fill in. Bots do.
  company?: string;
}

const SITE_URL = "https://freedominterventions.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validationError(payload: ContactMessageRequest): string | null {
  if (typeof payload.name !== "string" || payload.name.trim().length === 0 || payload.name.length > 120) {
    return "A valid name is required.";
  }
  if (typeof payload.email !== "string" || payload.email.length > 255 || !EMAIL_RE.test(payload.email)) {
    return "A valid email address is required.";
  }
  if (typeof payload.message !== "string" || payload.message.trim().length === 0 || payload.message.length > 5000) {
    return "A message is required.";
  }
  if (payload.phone != null && (typeof payload.phone !== "string" || payload.phone.length > 40)) {
    return "Invalid phone number.";
  }
  return null;
}


function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

async function storeLeadAndQueueFollowups(payload: ContactMessageRequest) {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) return;

  const supabase = createClient(supabaseUrl, serviceKey);
  const sourceAttribution = payload.sourceAttribution && typeof payload.sourceAttribution === "object"
    ? payload.sourceAttribution
    : {};

  const { data: messageRow, error: messageError } = await supabase
    .from("contact_messages")
    .insert({
      name: payload.name,
      email: payload.email.toLowerCase().trim(),
      phone: payload.phone || null,
      message: payload.message,
      page_path: payload.pagePath || null,
      source_attribution: sourceAttribution,
    })
    .select("id")
    .single();

  if (messageError) {
    console.error("Failed to store contact message:", messageError);
    return;
  }

  const nameParts = payload.name.trim().split(/\s+/);
  const first = nameParts[0] || null;
  const last = nameParts.slice(1).join(" ") || null;
  await supabase.from("crm_contacts").upsert({
    email: payload.email.toLowerCase().trim(),
    first_name: first,
    last_name: last,
    phone: payload.phone || null,
    source: "contact_message",
    source_id: messageRow.id,
    source_attribution: sourceAttribution,
    lead_score: 35,
    revenue_path: "free_consultation",
    pipeline_status: "new",
    next_action: "Reply to contact message or invite to consultation",
    next_action_due_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    last_engagement_at: new Date().toISOString(),
  }, { onConflict: "email" });

  const consultUrl = `${SITE_URL}/?type=consultation#booking`;
  const readinessUrl = `${SITE_URL}/intervention-readiness?source=contact_followup&utm_source=freedom_followup&utm_medium=email&utm_campaign=intervention_readiness`;
  const rows = [
    {
      lead_type: "contact_message",
      lead_id: messageRow.id,
      contact_email: payload.email.toLowerCase().trim(),
      contact_name: payload.name,
      contact_phone: payload.phone || null,
      followup_reason: "contact_message_confirmation",
      priority: "normal",
      sequence_step: 1,
      subject: `${firstName(payload.name)}, I received your message`,
      body_html: `
        <p>Hi ${escapeHtml(firstName(payload.name))},</p>
        <p>I received your message through Freedom Interventions. When families reach out, it usually means things have already been heavy for a while, so I do not want you sitting in uncertainty.</p>
        <p>If you need a clear first step, you can book a free consultation here:</p>
        <p><a href="${consultUrl}">Book a free consultation</a></p>
        <p>If this is moving fast, call me directly at <a href="tel:5416688084">541-668-8084</a>.</p>
        <p>- Matt Brown<br>Freedom Interventions</p>
      `,
      source_attribution: sourceAttribution,
      due_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    },
    {
      lead_type: "contact_message",
      lead_id: messageRow.id,
      contact_email: payload.email.toLowerCase().trim(),
      contact_name: payload.name,
      contact_phone: payload.phone || null,
      followup_reason: "contact_message_second_touch",
      priority: "normal",
      sequence_step: 2,
      subject: "Still need help deciding the next step?",
      body_html: `
        <p>Hi ${escapeHtml(firstName(payload.name))},</p>
        <p>I wanted to follow up in case the situation has changed since you reached out. A short consultation can help sort whether your family needs coaching, treatment planning, a Family Readiness Intensive, or intervention preparation.</p>
        <p>If refusal, relapse, safety risk, or family division are the main issues, this page may help you decide whether the situation has moved past general support:</p>
        <p><a href="${readinessUrl}">Check intervention readiness</a></p>
        <p><a href="${consultUrl}">Choose a free consultation time</a></p>
        <p>- Matt</p>
      `,
      source_attribution: sourceAttribution,
      due_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    },
    {
      lead_type: "contact_message",
      lead_id: messageRow.id,
      contact_email: payload.email.toLowerCase().trim(),
      contact_name: payload.name,
      contact_phone: payload.phone || null,
      followup_reason: "contact_message_readiness_path",
      priority: "normal",
      sequence_step: 3,
      subject: "If waiting is starting to feel dangerous",
      body_html: `
        <p>Hi ${escapeHtml(firstName(payload.name))},</p>
        <p>Families often wait because they do not want to overreact. But if the same crisis keeps repeating, the practical question becomes: what has waiting already cost?</p>
        <p>The first conversation is meant to clarify the right level of help, not pressure you into the wrong one.</p>
        <p><a href="${consultUrl}">Book a free consultation</a></p>
        <p>Or call me directly at <a href="tel:5416688084">541-668-8084</a>.</p>
        <p>- Matt</p>
      `,
      source_attribution: sourceAttribution,
      due_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const { error: queueError } = await supabase.from("freedom_followup_queue").insert(rows);
  if (queueError) console.error("Failed to queue contact followups:", queueError);

  await enqueueSpineEvent("lead_captured", {
    email: payload.email.toLowerCase().trim(),
    phone: payload.phone || null,
    name: payload.name,
    utm: extractUtm(sourceAttribution as Record<string, any>),
    props: { source: "contact_form" },
  }, supabase);
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: ContactMessageRequest = await req.json();
    const { name, email, phone, message, pagePath, sourceAttribution } = payload;

    // Honeypot: silently accept (200) so bots don't learn they were filtered,
    // but do no work — no email, no DB writes, no queued follow-ups.
    if (typeof payload.company === "string" && payload.company.trim().length > 0) {
      console.log("Contact message rejected: honeypot triggered");
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Input validation.
    const invalid = validationError(payload);
    if (invalid) {
      return new Response(JSON.stringify({ error: invalid }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Durable rate limit: max 5 contact submissions per hour per IP.
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (supabaseUrl && serviceKey) {
      const rlClient = createClient(supabaseUrl, serviceKey);
      const allowed = await checkRateLimit(rlClient, `contact:${getClientIp(req)}`, 5, 60 * 60);
      if (!allowed) {
        return new Response(
          JSON.stringify({ error: "Too many messages. Please try again later." }),
          { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } },
        );
      }
    }

    console.log("Processing contact message from:", email);

    // Send email to Matt
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1e40af;">New Contact Form Submission</h1>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Contact Details</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        </div>
        
        <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Message</h2>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
        
        <p style="color: #666; font-size: 14px;">This message was sent from the Freedom Interventions website contact form.</p>
      </div>
    `;

    console.log("Sending contact notification via Resend");

    await sendSystemEmail({
      to: "matt@freedominterventions.com",
      replyTo: email,
      subject: `Contact Form: Message from ${name}`,
      html: emailHtml,
    });

    console.log("Contact notification sent successfully via Resend");

    await storeLeadAndQueueFollowups({ name, email, phone, message, pagePath, sourceAttribution });

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-message:", error);
    return new Response(
      JSON.stringify({ error: "Unable to send your message. Please try again later." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
