import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
}

const SITE_URL = "https://freedominterventions.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
        <p>If this is moving fast, call me directly at <a href="tel:5418386009">541-838-6009</a>.</p>
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
        <p>Or call me directly at <a href="tel:5418386009">541-838-6009</a>.</p>
        <p>- Matt</p>
      `,
      source_attribution: sourceAttribution,
      due_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const { error: queueError } = await supabase.from("freedom_followup_queue").insert(rows);
  if (queueError) console.error("Failed to queue contact followups:", queueError);
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message, pagePath, sourceAttribution }: ContactMessageRequest = await req.json();

    console.log("Processing contact message from:", email);

    const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
    if (!sendgridApiKey) {
      throw new Error("SENDGRID_API_KEY not configured");
    }

    // Send email to Matt
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1e40af;">New Contact Form Submission</h1>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Contact Details</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        </div>
        
        <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Message</h2>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        
        <p style="color: #666; font-size: 14px;">This message was sent from the Freedom Interventions website contact form.</p>
      </div>
    `;

    console.log("Sending email via SendGrid");

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendgridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: "matt@freedominterventions.com" }] }],
        from: { email: "noreply@freedominterventions.com", name: "Freedom Interventions" },
        reply_to: { email: email, name: name },
        subject: `Contact Form: Message from ${name}`,
        content: [{ type: "text/html", value: emailHtml }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SendGrid error:", errorText);
      throw new Error(`Failed to send email: ${response.status} - ${errorText}`);
    }

    console.log("Email sent successfully via SendGrid");

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
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
