import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-automation-secret",
};

type SupabaseClient = ReturnType<typeof createClient>;
type JsonValue = Record<string, unknown> | null;

interface ContactRow {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  source: string;
  source_attribution: JsonValue;
  lead_score: number;
  revenue_path: string | null;
  pipeline_status: string;
  next_action: string | null;
  next_action_due_at: string | null;
  last_engagement_at: string | null;
  created_at: string;
}

interface AssessmentRow {
  id: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  source_attribution: JsonValue;
  urgency_level: string | null;
  family_ready_intervention: string | null;
  created_at: string;
}

interface BookingRow {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  booking_type: string;
  status: string;
  amount_cents: number | null;
  source_attribution: JsonValue;
  created_at: string;
}

interface ContractRow {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  contract_type: string;
  status: string;
  amount_cents: number | null;
  source_attribution: JsonValue;
  created_at: string;
}

interface CallRow {
  id: string;
  source_attribution: JsonValue;
  phone_number: string;
  page_path: string;
  created_at: string;
}

interface FollowupRow {
  id: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  followup_reason: string;
  priority: string;
  status: string;
  source_attribution: JsonValue;
  due_at: string;
  created_at: string;
}

interface ChannelStats {
  source: string;
  leads: number;
  assessments: number;
  calls: number;
  consultations: number;
  paidConversions: number;
  revenueCents: number;
  highIntentLeads: number;
  followupsDue: number;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const formatUsd = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);

const formatDate = (value: string | null) => {
  if (!value) return "No due date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};

const asRecord = (value: JsonValue): Record<string, unknown> => {
  if (value && typeof value === "object" && !Array.isArray(value)) return value;
  return {};
};

const sourceKey = (value: JsonValue, fallback = "unknown") => {
  const source = asRecord(value);
  return String(source.source || source.utm_source || fallback);
};

const sourceFamily = (source: string) => {
  if (source.includes("no_more_enabling") || source.includes("nme")) return "no_more_enabling";
  if (source.includes("sober_helpline") || source.includes("family_squares")) return "sober_helpline";
  if (source.includes("party_wreckers")) return "party_wreckers";
  if (source.includes("openclaw")) return "openclaw";
  return source || "unknown";
};

const sourceTitle = (source: string) => {
  const labels: Record<string, string> = {
    no_more_enabling: "No More Enabling",
    sober_helpline: "Sober Helpline",
    party_wreckers: "Party Wreckers",
    openclaw: "OpenClaw / Phone",
    organic_google: "Google Organic",
    organic_bing: "Bing Organic",
    direct: "Direct",
    referral: "Referral",
    unknown: "Unknown",
  };
  return labels[source] || source.replaceAll("_", " ");
};

const fullName = (contact: ContactRow) => {
  const name = [contact.first_name, contact.last_name].filter(Boolean).join(" ").trim();
  return name || contact.email;
};

async function isAdminRequest(req: Request, supabase: SupabaseClient) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) return false;

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  const userId = userData?.user?.id;
  if (userError || !userId) return false;

  const { data: role } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  return Boolean(role);
}

async function requireAuthorized(req: Request, supabase: SupabaseClient) {
  const expectedSecret = Deno.env.get("FOLLOWUP_AUTOMATION_SECRET");
  const providedSecret = req.headers.get("x-automation-secret");
  if (expectedSecret && providedSecret === expectedSecret) return true;
  return isAdminRequest(req, supabase);
}

async function queryRows<T>(
  label: string,
  query: PromiseLike<{ data: T[] | null; error: { message?: string } | null }>,
  issues: string[],
) {
  const { data, error } = await query;
  if (error) {
    issues.push(`${label}: ${error.message || "could not be read"}`);
    return [] as T[];
  }
  return data ?? [];
}

function buildChannelStats(
  contacts: ContactRow[],
  assessments: AssessmentRow[],
  bookings: BookingRow[],
  contracts: ContractRow[],
  calls: CallRow[],
  followups: FollowupRow[],
) {
  const map = new Map<string, ChannelStats>();
  const get = (rawSource: string) => {
    const source = sourceFamily(rawSource);
    const existing = map.get(source);
    if (existing) return existing;
    const next: ChannelStats = {
      source,
      leads: 0,
      assessments: 0,
      calls: 0,
      consultations: 0,
      paidConversions: 0,
      revenueCents: 0,
      highIntentLeads: 0,
      followupsDue: 0,
    };
    map.set(source, next);
    return next;
  };

  contacts.forEach((contact) => {
    const stats = get(sourceKey(contact.source_attribution, contact.source));
    stats.leads += 1;
    if ((contact.lead_score || 0) >= 50 || ["consultation_booked", "readiness_intensive", "contract_sent", "contract_signed"].includes(contact.pipeline_status)) {
      stats.highIntentLeads += 1;
    }
  });

  assessments.forEach((assessment) => get(sourceKey(assessment.source_attribution, "assessment")).assessments += 1);
  calls.forEach((call) => get(sourceKey(call.source_attribution, "call")).calls += 1);
  followups.forEach((followup) => get(sourceKey(followup.source_attribution, "followup")).followupsDue += 1);

  bookings.forEach((booking) => {
    const stats = get(sourceKey(booking.source_attribution, "booking"));
    if (booking.booking_type === "consultation") stats.consultations += 1;
    if (booking.status === "confirmed" && booking.booking_type !== "consultation") {
      stats.paidConversions += 1;
      stats.revenueCents += booking.amount_cents || 0;
    }
  });

  contracts.forEach((contract) => {
    const stats = get(sourceKey(contract.source_attribution, "contract"));
    if (contract.status === "paid") {
      stats.paidConversions += 1;
      stats.revenueCents += contract.amount_cents || 0;
    }
  });

  return [...map.values()].sort((a, b) => {
    if (b.revenueCents !== a.revenueCents) return b.revenueCents - a.revenueCents;
    return b.highIntentLeads + b.consultations + b.calls - (a.highIntentLeads + a.consultations + a.calls);
  });
}

function renderMetric(label: string, value: string) {
  return `
    <td style="padding:14px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb;">
      <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.04em;">${escapeHtml(label)}</div>
      <div style="font-size:24px;font-weight:700;color:#111827;margin-top:4px;">${escapeHtml(value)}</div>
    </td>
  `;
}

function renderLeadList(contacts: ContactRow[]) {
  if (!contacts.length) return `<p style="color:#6b7280;">No high-priority leads need attention from this week's window.</p>`;

  return `
    <ol style="padding-left:20px;margin:12px 0;">
      ${contacts.map((contact) => `
        <li style="margin:0 0 12px;">
          <strong>${escapeHtml(fullName(contact))}</strong>
          <span style="color:#6b7280;">(${escapeHtml(sourceTitle(sourceFamily(sourceKey(contact.source_attribution, contact.source))))}, score ${escapeHtml(contact.lead_score)})</span><br>
          <span>${escapeHtml(contact.phone || contact.email)}</span><br>
          <span style="color:#6b7280;">${escapeHtml(contact.next_action || "Call or text with a direct next step")} · ${escapeHtml(formatDate(contact.next_action_due_at))}</span>
        </li>
      `).join("")}
    </ol>
  `;
}

function renderFollowups(followups: FollowupRow[]) {
  if (!followups.length) return `<p style="color:#6b7280;">No pending follow-ups are due right now.</p>`;

  return `
    <ul style="padding-left:20px;margin:12px 0;">
      ${followups.slice(0, 8).map((followup) => `
        <li style="margin:0 0 8px;">
          <strong>${escapeHtml(followup.contact_name || followup.contact_email)}</strong>
          <span style="color:#6b7280;">${escapeHtml(followup.priority)} · ${escapeHtml(followup.followup_reason)} · due ${escapeHtml(formatDate(followup.due_at))}</span>
        </li>
      `).join("")}
    </ul>
  `;
}

function buildEmailHtml(params: {
  start: Date;
  end: Date;
  totals: {
    leads: number;
    highIntentLeads: number;
    calls: number;
    consultations: number;
    paidConversions: number;
    revenueCents: number;
    assessments: number;
    followupsDue: number;
  };
  channelStats: ChannelStats[];
  topLeads: ContactRow[];
  dueFollowups: FollowupRow[];
  dataIssues: string[];
}) {
  const bestChannel = params.channelStats[0];
  const range = `${params.start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${params.end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  const rows = params.channelStats.slice(0, 6).map((row) => `
    <tr>
      <td style="padding:10px;border-bottom:1px solid #e5e7eb;"><strong>${escapeHtml(sourceTitle(row.source))}</strong></td>
      <td style="padding:10px;border-bottom:1px solid #e5e7eb;text-align:right;">${row.leads}</td>
      <td style="padding:10px;border-bottom:1px solid #e5e7eb;text-align:right;">${row.highIntentLeads}</td>
      <td style="padding:10px;border-bottom:1px solid #e5e7eb;text-align:right;">${row.calls}</td>
      <td style="padding:10px;border-bottom:1px solid #e5e7eb;text-align:right;">${row.consultations}</td>
      <td style="padding:10px;border-bottom:1px solid #e5e7eb;text-align:right;">${formatUsd(row.revenueCents)}</td>
    </tr>
  `).join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:760px;margin:0 auto;padding:24px;color:#1f2937;line-height:1.55;">
      <p style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;margin:0 0 8px;">Freedom Interventions Weekly Owner Email</p>
      <h1 style="font-size:28px;line-height:1.2;margin:0 0 8px;color:#111827;">Revenue summary for ${escapeHtml(range)}</h1>
      <p style="margin:0 0 22px;color:#4b5563;">
        ${bestChannel
          ? `${escapeHtml(sourceTitle(bestChannel.source))} is the first channel to inspect this week based on revenue and intent.`
          : "There is not enough attributed data yet to name a first channel."}
      </p>

      <table role="presentation" style="width:100%;border-spacing:8px;margin:0 -8px 22px;">
        <tr>
          ${renderMetric("New leads", params.totals.leads.toLocaleString())}
          ${renderMetric("High intent", params.totals.highIntentLeads.toLocaleString())}
          ${renderMetric("Calls", params.totals.calls.toLocaleString())}
        </tr>
        <tr>
          ${renderMetric("Consultations", params.totals.consultations.toLocaleString())}
          ${renderMetric("Paid closes", params.totals.paidConversions.toLocaleString())}
          ${renderMetric("Tracked revenue", formatUsd(params.totals.revenueCents))}
        </tr>
      </table>

      <h2 style="font-size:20px;margin:24px 0 8px;color:#111827;">Call First</h2>
      ${renderLeadList(params.topLeads)}

      <h2 style="font-size:20px;margin:24px 0 8px;color:#111827;">Follow-Ups Due</h2>
      ${renderFollowups(params.dueFollowups)}

      <h2 style="font-size:20px;margin:24px 0 8px;color:#111827;">Channel Breakdown</h2>
      ${params.channelStats.length ? `
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr style="color:#6b7280;text-align:right;">
              <th style="padding:10px;text-align:left;border-bottom:1px solid #d1d5db;">Channel</th>
              <th style="padding:10px;border-bottom:1px solid #d1d5db;">Leads</th>
              <th style="padding:10px;border-bottom:1px solid #d1d5db;">Intent</th>
              <th style="padding:10px;border-bottom:1px solid #d1d5db;">Calls</th>
              <th style="padding:10px;border-bottom:1px solid #d1d5db;">Consults</th>
              <th style="padding:10px;border-bottom:1px solid #d1d5db;">Revenue</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      ` : `<p style="color:#6b7280;">No attributed channel activity was found in this window.</p>`}

      ${params.dataIssues.length ? `
        <div style="margin-top:24px;padding:14px;border-radius:8px;background:#fffbeb;border:1px solid #f59e0b;color:#92400e;">
          <strong>Data note:</strong> ${escapeHtml(params.dataIssues.join("; "))}
        </div>
      ` : ""}

      <div style="margin-top:28px;padding:16px;border-radius:8px;background:#eff6ff;border:1px solid #bfdbfe;">
        <strong>Best next move:</strong>
        ${bestChannel
          ? `Work ${escapeHtml(sourceTitle(bestChannel.source))} leads first, then clear pending follow-ups before the next ad/content push.`
          : "Refresh attribution and make sure the upstream report secrets are connected in Command Center."}
      </div>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0 14px;">
      <p style="font-size:12px;color:#6b7280;">Freedom Interventions · Matt Brown · <a href="tel:5418386009" style="color:#1e40af;">541-838-6009</a></p>
    </div>
  `;
}

async function sendOwnerEmail(subject: string, html: string) {
  const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
  if (!sendgridApiKey) throw new Error("SENDGRID_API_KEY not configured");

  const ownerEmail = Deno.env.get("OWNER_EMAIL") || "matt@freedominterventions.com";
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sendgridApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: ownerEmail }] }],
      from: { email: "matt@freedominterventions.com", name: "Freedom Interventions" },
      reply_to: { email: "matt@freedominterventions.com", name: "Matt Brown" },
      subject,
      content: [{ type: "text/html", value: html }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`SendGrid failed: ${response.status} - ${errorText}`);
  }
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceKey) throw new Error("Supabase environment is not configured");

    const supabase = createClient(supabaseUrl, serviceKey);
    const authorized = await requireAuthorized(req, supabase);
    if (!authorized) return json({ error: "Unauthorized" }, 401);

    const end = new Date();
    const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
    const since = start.toISOString();
    const now = end.toISOString();
    const dataIssues: string[] = [];

    const [contacts, assessments, bookings, contracts, calls, dueFollowups] = await Promise.all([
      queryRows<ContactRow>(
        "CRM contacts",
        supabase
          .from("crm_contacts")
          .select("id,email,first_name,last_name,phone,source,source_attribution,lead_score,revenue_path,pipeline_status,next_action,next_action_due_at,last_engagement_at,created_at")
          .gte("created_at", since)
          .order("lead_score", { ascending: false })
          .limit(500),
        dataIssues,
      ),
      queryRows<AssessmentRow>(
        "assessments",
        supabase
          .from("assessments")
          .select("id,contact_name,contact_email,contact_phone,source_attribution,urgency_level,family_ready_intervention,created_at")
          .gte("created_at", since)
          .order("created_at", { ascending: false })
          .limit(500),
        dataIssues,
      ),
      queryRows<BookingRow>(
        "bookings",
        supabase
          .from("bookings")
          .select("id,customer_name,customer_email,customer_phone,booking_type,status,amount_cents,source_attribution,created_at")
          .gte("created_at", since)
          .order("created_at", { ascending: false })
          .limit(500),
        dataIssues,
      ),
      queryRows<ContractRow>(
        "contracts",
        supabase
          .from("contracts")
          .select("id,client_name,client_email,client_phone,contract_type,status,amount_cents,source_attribution,created_at")
          .gte("created_at", since)
          .order("created_at", { ascending: false })
          .limit(500),
        dataIssues,
      ),
      queryRows<CallRow>(
        "call tracking",
        supabase
          .from("call_analytics")
          .select("id,source_attribution,phone_number,page_path,created_at")
          .gte("created_at", since)
          .order("created_at", { ascending: false })
          .limit(500),
        dataIssues,
      ),
      queryRows<FollowupRow>(
        "follow-ups",
        supabase
          .from("freedom_followup_queue")
          .select("id,contact_name,contact_email,contact_phone,followup_reason,priority,status,source_attribution,due_at,created_at")
          .eq("status", "pending")
          .lte("due_at", now)
          .order("priority", { ascending: false })
          .order("due_at", { ascending: true })
          .limit(50),
        dataIssues,
      ),
    ]);

    const channelStats = buildChannelStats(contacts, assessments, bookings, contracts, calls, dueFollowups);
    const totals = channelStats.reduce(
      (acc, row) => ({
        leads: acc.leads + row.leads,
        assessments: acc.assessments + row.assessments,
        calls: acc.calls + row.calls,
        consultations: acc.consultations + row.consultations,
        paidConversions: acc.paidConversions + row.paidConversions,
        revenueCents: acc.revenueCents + row.revenueCents,
        highIntentLeads: acc.highIntentLeads + row.highIntentLeads,
        followupsDue: acc.followupsDue + row.followupsDue,
      }),
      { leads: 0, assessments: 0, calls: 0, consultations: 0, paidConversions: 0, revenueCents: 0, highIntentLeads: 0, followupsDue: 0 },
    );

    const topLeads = contacts
      .filter((contact) => contact.pipeline_status !== "closed" && contact.pipeline_status !== "lost")
      .sort((a, b) => (b.lead_score || 0) - (a.lead_score || 0))
      .slice(0, 10);

    const subjectDate = end.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const html = buildEmailHtml({
      start,
      end,
      totals,
      channelStats,
      topLeads,
      dueFollowups,
      dataIssues,
    });

    await sendOwnerEmail(`Freedom weekly revenue summary - ${subjectDate}`, html);

    return json({
      success: true,
      window_days: 7,
      sent_to: Deno.env.get("OWNER_EMAIL") || "matt@freedominterventions.com",
      totals,
      top_channel: channelStats[0]?.source ?? null,
      data_issues: dataIssues,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown weekly owner summary error";
    console.error("send-weekly-owner-summary error:", message);
    return json({ error: message }, 500);
  }
});
