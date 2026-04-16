import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const NOTION_API_TOKEN = Deno.env.get("NOTION_API_TOKEN") ?? "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";
const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const CRM_DB_ID = "2bb286dad2cf81499fc8d8151ee033a8";
const TELEGRAM_CHAT_ID = "7932321341";
const NOTION_VERSION = "2022-06-28";

interface AssessmentRecord {
  id?: string;
  created_at?: string | null;
  contact_name?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  contact_relationship?: string | null;
  best_day_to_contact?: string | null;
  best_time_to_contact?: string | null;
  loved_one_name?: string | null;
  primary_substances?: string | null;
  dsm_yes_count?: number | null;
  severity_level?: string | null;
  withdrawal_symptoms?: string | null;
  seizure_history?: string | null;
  delirium_tremens_history?: string | null;
  suicide_ideation?: string | null;
  homicidal_ideation?: string | null;
  overdose_history?: string | null;
  violence_history?: string | null;
  physical_altercations?: string | null;
  immediate_safety_concerns?: string | null;
  who_holds_leverage?: string | null;
  family_unity_level?: string | null;
  family_enabling?: string | null;
  urgency_level?: string | null;
  insurance_information?: string | null;
  budget_for_treatment?: string | null;
  geographic_preferences?: string | null;
  mental_health_signs?: string | null;
  psychiatric_history?: string | null;
  mental_health_details?: string | null;
  psychiatric_details?: string | null;
  mental_health_diagnoses?: unknown;
  current_mental_health_symptoms?: unknown;
}

type WebhookPayload = {
  record?: AssessmentRecord;
  new?: AssessmentRecord;
  old_record?: AssessmentRecord;
  type?: string;
  table?: string;
};

function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function normalizeSeverity(value: unknown): string {
  const text = normalizeText(value);
  return text ? toTitleCase(text) : "Unspecified";
}

function isAffirmative(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value > 0;
  if (typeof value !== "string") return false;
  const normalized = value.trim().toLowerCase();
  return ["yes", "y", "true", "1", "present", "current", "active"].includes(normalized);
}

function hasMeaningfulText(value: unknown): boolean {
  return normalizeText(value) !== null;
}

function formatUnknown(value: unknown): string | null {
  if (value == null) return null;
  if (typeof value === "string") return normalizeText(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    const flattened = value
      .map((item) => formatUnknown(item))
      .filter((item): item is string => Boolean(item));
    return flattened.length ? flattened.join(", ") : null;
  }
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return null;
    }
  }
  return null;
}

function extractAssessmentRecord(payload: unknown): AssessmentRecord {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid webhook payload");
  }

  const candidate = payload as WebhookPayload & Record<string, unknown>;
  const record = candidate.record ?? candidate.new ?? ((candidate as Record<string, unknown>).data as Record<string, unknown> | undefined)?.record;

  if (record && typeof record === "object") {
    return record as AssessmentRecord;
  }

  return candidate as AssessmentRecord;
}

function getSubmissionDate(record: AssessmentRecord): Date {
  const candidate = normalizeText(record.created_at);
  const parsed = candidate ? new Date(candidate) : new Date();
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function inferState(value: string | null): string | null {
  if (!value) return null;

  const normalized = ` ${value.toLowerCase().replace(/[^a-z]/g, " ").replace(/\s+/g, " ").trim()} `;
  const states: Array<[string, string[]]> = [
    ["Alabama", ["alabama", "al"]],
    ["Alaska", ["alaska", "ak"]],
    ["Arizona", ["arizona", "az"]],
    ["Arkansas", ["arkansas", "ar"]],
    ["California", ["california", "ca"]],
    ["Colorado", ["colorado", "co"]],
    ["Connecticut", ["connecticut", "ct"]],
    ["Delaware", ["delaware", "de"]],
    ["Florida", ["florida", "fl"]],
    ["Georgia", ["georgia", "ga"]],
    ["Hawaii", ["hawaii", "hi"]],
    ["Idaho", ["idaho", "id"]],
    ["Illinois", ["illinois", "il"]],
    ["Indiana", ["indiana", "in"]],
    ["Iowa", ["iowa", "ia"]],
    ["Kansas", ["kansas", "ks"]],
    ["Kentucky", ["kentucky", "ky"]],
    ["Louisiana", ["louisiana", "la"]],
    ["Maine", ["maine", "me"]],
    ["Maryland", ["maryland", "md"]],
    ["Massachusetts", ["massachusetts", "ma"]],
    ["Michigan", ["michigan", "mi"]],
    ["Minnesota", ["minnesota", "mn"]],
    ["Mississippi", ["mississippi", "ms"]],
    ["Missouri", ["missouri", "mo"]],
    ["Montana", ["montana", "mt"]],
    ["Nebraska", ["nebraska", "ne"]],
    ["Nevada", ["nevada", "nv"]],
    ["New Hampshire", ["new hampshire", "nh"]],
    ["New Jersey", ["new jersey", "nj"]],
    ["New Mexico", ["new mexico", "nm"]],
    ["New York", ["new york", "ny"]],
    ["North Carolina", ["north carolina", "nc"]],
    ["North Dakota", ["north dakota", "nd"]],
    ["Ohio", ["ohio", "oh"]],
    ["Oklahoma", ["oklahoma", "ok"]],
    ["Oregon", ["oregon", "or"]],
    ["Pennsylvania", ["pennsylvania", "pa"]],
    ["Rhode Island", ["rhode island", "ri"]],
    ["South Carolina", ["south carolina", "sc"]],
    ["South Dakota", ["south dakota", "sd"]],
    ["Tennessee", ["tennessee", "tn"]],
    ["Texas", ["texas", "tx"]],
    ["Utah", ["utah", "ut"]],
    ["Vermont", ["vermont", "vt"]],
    ["Virginia", ["virginia", "va"]],
    ["Washington", ["washington", "wa"]],
    ["West Virginia", ["west virginia", "wv"]],
    ["Wisconsin", ["wisconsin", "wi"]],
    ["Wyoming", ["wyoming", "wy"]],
  ];

  for (const [state, needles] of states) {
    if (needles.some((needle) => normalized.includes(` ${needle} `))) {
      return state;
    }
  }

  return null;
}

function buildDiagnoses(record: AssessmentRecord): string {
  const parts: string[] = [];
  const dsmCount = record.dsm_yes_count ?? 0;
  const severity = normalizeSeverity(record.severity_level);
  parts.push(`DSM-5 criteria met: ${dsmCount}/11 (${severity})`);

  const mhSigns = normalizeText(record.mental_health_signs);
  if (mhSigns) parts.push(`Mental health signs: ${mhSigns}`);

  const psychHistory = normalizeText(record.psychiatric_history);
  if (psychHistory) parts.push(`Psychiatric history: ${psychHistory}`);

  const diagnoses = formatUnknown(record.mental_health_diagnoses);
  if (diagnoses) parts.push(`Diagnoses reported: ${diagnoses}`);

  const mhSymptoms = formatUnknown(record.current_mental_health_symptoms);
  if (mhSymptoms) parts.push(`Current symptoms: ${mhSymptoms}`);

  const mhDetails = normalizeText(record.mental_health_details);
  if (mhDetails) parts.push(`Mental health details: ${mhDetails}`);

  const psychDetails = normalizeText(record.psychiatric_details);
  if (psychDetails) parts.push(`Psychiatric details: ${psychDetails}`);

  return parts.join(" | ");
}

function calculateAsamLevel(record: AssessmentRecord): string {
  const severity = normalizeSeverity(record.severity_level).toLowerCase();
  const hasWithdrawalSymptoms = hasMeaningfulText(record.withdrawal_symptoms);

  if (isAffirmative(record.seizure_history) || isAffirmative(record.delirium_tremens_history)) {
    return "ASAM 4.0 — Medical Detox Required";
  }
  if (severity === "severe" && hasWithdrawalSymptoms) {
    return "ASAM 3.7";
  }
  if (severity === "severe") {
    return "ASAM 3.5";
  }
  if (severity === "moderate") {
    return "ASAM 2.5";
  }
  if (severity === "mild") {
    return "ASAM 1.0-2.1";
  }

  return "ASAM level requires review";
}

function buildRedFlags(record: AssessmentRecord): string[] {
  const flags: string[] = [];
  if (isAffirmative(record.suicide_ideation)) flags.push("suicide ideation");
  if (isAffirmative(record.homicidal_ideation)) flags.push("homicidal ideation");
  if (isAffirmative(record.seizure_history)) flags.push("seizure history");
  if (isAffirmative(record.delirium_tremens_history)) flags.push("DTs");
  if (isAffirmative(record.overdose_history)) flags.push("overdose history");
  if (isAffirmative(record.violence_history) || isAffirmative(record.physical_altercations)) flags.push("violence history");
  if (isAffirmative(record.immediate_safety_concerns) || hasMeaningfulText(record.immediate_safety_concerns)) flags.push("immediate safety concerns");
  return flags;
}

function buildPipelineNotes(record: AssessmentRecord, asamLevel: string): string {
  const sections: string[] = [];
  sections.push(`DSM-5 severity: ${(record.dsm_yes_count ?? 0)}/11 criteria = ${normalizeSeverity(record.severity_level)}`);
  sections.push(`ASAM recommendation: ${asamLevel}`);

  const redFlags = buildRedFlags(record);
  sections.push(`Red flags: ${redFlags.length ? redFlags.join(", ") : "None noted"}`);

  const familyDynamics = [
    `Leverage: ${normalizeText(record.who_holds_leverage) ?? "Not provided"}`,
    `Family unity: ${normalizeText(record.family_unity_level) ?? "Not provided"}`,
    `Family enabling: ${normalizeText(record.family_enabling) ?? "Not provided"}`,
    `Urgency: ${normalizeText(record.urgency_level) ?? "Not provided"}`,
  ].join(" | ");
  sections.push(`Key family dynamics: ${familyDynamics}`);

  sections.push(`Insurance: ${normalizeText(record.insurance_information) ?? "Not provided"} | Budget: ${normalizeText(record.budget_for_treatment) ?? "Not provided"}`);
  sections.push(`Geographic preference: ${normalizeText(record.geographic_preferences) ?? "Not provided"}`);

  return sections.join("\n");
}

function buildTelegramMessage(record: AssessmentRecord, asamLevel: string, notionCreated: boolean): string {
  const redFlags = buildRedFlags(record);
  return [
    `🆕 NEW ASSESSMENT — ${normalizeText(record.loved_one_name) ?? "Unknown"}`,
    "",
    `Severity: ${normalizeSeverity(record.severity_level)} (${record.dsm_yes_count ?? 0}/11 DSM criteria)`,
    `ASAM: ${asamLevel}`,
    `Urgency: ${normalizeText(record.urgency_level) ?? "Not provided"}`,
    `Submitted by: ${normalizeText(record.contact_name) ?? "Unknown"} (${normalizeText(record.contact_relationship) ?? "Unknown"})`,
    `Phone: ${normalizeText(record.contact_phone) ?? "Not provided"}`,
    `Best time to reach: ${[normalizeText(record.best_day_to_contact), normalizeText(record.best_time_to_contact)].filter(Boolean).join(" ") || "Not provided"}`,
    "",
    `🚨 Red Flags: ${redFlags.length ? redFlags.join(", ") : "None noted"}`,
    "",
    notionCreated ? "Notion record created. Building case file now." : "Notion record failed. Manual review needed.",
  ].join("\n");
}

function richText(content: string) {
  return [{ text: { content: content.slice(0, 2000) } }];
}

async function createNotionRecord(record: AssessmentRecord): Promise<{ pageId: string | null; asamLevel: string }> {
  const submissionDate = getSubmissionDate(record);
  const followUpDate = addDays(submissionDate, 2);
  const asamLevel = calculateAsamLevel(record);
  const aiName = `${normalizeText(record.contact_name) ?? "Unknown"} (${normalizeText(record.contact_relationship) ?? "Unknown"}) | ${normalizeText(record.contact_email) ?? "No email"} | ${normalizeText(record.contact_phone) ?? "No phone"}`;
  const nextStep = `Review assessment and call ${normalizeText(record.contact_name) ?? "contact"} at ${normalizeText(record.contact_phone) ?? "no phone on file"}. Best time: ${[normalizeText(record.best_day_to_contact), normalizeText(record.best_time_to_contact)].filter(Boolean).join(" ") || "Not provided"}`;
  const state = inferState(normalizeText(record.geographic_preferences));

  const properties: Record<string, unknown> = {
    "Name": {
      title: [{ text: { content: (normalizeText(record.loved_one_name) ?? "Unknown").slice(0, 2000) } }],
    },
    "Phone": {
      phone_number: normalizeText(record.contact_phone),
    },
    "Email": {
      email: normalizeText(record.contact_email),
    },
    "Stage": {
      select: { name: "New Lead" },
    },
    "Service Type": {
      select: { name: "Intervention" },
    },
    "Follow-Up Date": {
      date: { start: formatDate(followUpDate) },
    },
    "Last Contact": {
      date: { start: formatDate(submissionDate) },
    },
    "A.I. Name": {
      rich_text: richText(aiName),
    },
    "Substances/Behaviors": {
      rich_text: richText(normalizeText(record.primary_substances) ?? "Not provided"),
    },
    "Diagnoses": {
      rich_text: richText(buildDiagnoses(record)),
    },
    "Pipeline Notes": {
      rich_text: richText(buildPipelineNotes(record, asamLevel)),
    },
    "Next Step": {
      rich_text: richText(nextStep),
    },
  };

  if (state) {
    properties["State"] = {
      select: { name: state },
    };
  }

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${NOTION_API_TOKEN}`,
      "Content-Type": "application/json",
      "Notion-Version": NOTION_VERSION,
    },
    body: JSON.stringify({
      parent: { database_id: CRM_DB_ID },
      properties,
    }),
  });

  if (!response.ok) {
    console.error("Notion create error:", await response.text());
    return { pageId: null, asamLevel };
  }

  const data = await response.json();
  return { pageId: data.id ?? null, asamLevel };
}

async function sendTelegramNotification(message: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN) {
    console.error("TELEGRAM_BOT_TOKEN not configured");
    return false;
  }

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    }),
  });

  if (!response.ok) {
    console.error("Telegram send error:", await response.text());
    return false;
  }

  return true;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ success: false, error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let notionPageId: string | null = null;
  let notionSuccess = false;
  let telegramSuccess = false;
  let notionError: string | null = null;
  let telegramError: string | null = null;

  try {
    if (!NOTION_API_TOKEN) {
      throw new Error("NOTION_API_TOKEN not configured");
    }

    const payload = await req.json();
    const record = extractAssessmentRecord(payload);
    const asamLevel = calculateAsamLevel(record);

    console.log("Processing assessment-to-notion webhook", {
      assessmentId: record.id,
      lovedOne: record.loved_one_name,
      email: record.contact_email,
    });

    try {
      const notionResult = await createNotionRecord(record);
      notionPageId = notionResult.pageId;
      notionSuccess = Boolean(notionPageId);
      if (!notionSuccess) {
        notionError = "Failed to create Notion record";
      }
    } catch (error) {
      notionError = error instanceof Error ? error.message : "Unknown Notion error";
      console.error("assessment-to-notion Notion failure", notionError);
    }

    try {
      const telegramMessage = buildTelegramMessage(record, asamLevel, notionSuccess);
      telegramSuccess = await sendTelegramNotification(telegramMessage);
      if (!telegramSuccess) {
        telegramError = "Failed to send Telegram notification";
      }
    } catch (error) {
      telegramError = error instanceof Error ? error.message : "Unknown Telegram error";
      console.error("assessment-to-notion Telegram failure", telegramError);
    }

    return new Response(JSON.stringify({
      success: true,
      notion: {
        success: notionSuccess,
        pageId: notionPageId,
        error: notionError,
      },
      telegram: {
        success: telegramSuccess,
        error: telegramError,
      },
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("assessment-to-notion fatal error", errorMessage);

    return new Response(JSON.stringify({
      success: true,
      notion: {
        success: notionSuccess,
        pageId: notionPageId,
        error: notionError ?? errorMessage,
      },
      telegram: {
        success: telegramSuccess,
        error: telegramError,
      },
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
