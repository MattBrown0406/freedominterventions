// Shared CRM contact upsert that never downgrades an existing contact.
//
// Public forms (contact, lead magnet, assessments, bookings) used to upsert
// crm_contacts on email and overwrite pipeline_status / lead_score / source,
// so e.g. a contract_signed client who later downloaded a checklist dropped back
// to "new". This helper inserts new contacts as before, but for existing ones it
// only fills empty fields, raises the score, and advances the stage.
import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

// Funnel order (matches RevenuePipelineManager.tsx); later = further along.
const STAGE_ORDER = [
  "new",
  "contacted",
  "consultation_booked",
  "paid_booking_started",
  "readiness_intensive",
  "contract_sent",
  "contract_signed",
  "paid",
];
const REOPENABLE = new Set(["lost", "closed"]);

export interface CrmContactInput {
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  source: string;
  source_id?: string | null;
  source_attribution?: Record<string, unknown>;
  lead_score: number;
  revenue_path?: string | null;
  pipeline_status: string;
  next_action?: string | null;
  next_action_due_at?: string | null;
}

function stageRank(stage: string | null | undefined): number {
  return stage ? STAGE_ORDER.indexOf(stage) : -1;
}

export async function upsertCrmContact(
  supabase: SupabaseClient,
  input: CrmContactInput,
): Promise<{ id: string | null; error: string | null }> {
  const email = input.email.toLowerCase().trim();
  const now = new Date().toISOString();

  const { data: existing, error: selectError } = await supabase
    .from("crm_contacts")
    .select("id, first_name, last_name, phone, lead_score, pipeline_status, next_action")
    .eq("email", email)
    .maybeSingle();
  if (selectError) return { id: null, error: selectError.message };

  if (!existing) {
    const row: Record<string, unknown> = {
      email,
      first_name: input.first_name ?? null,
      last_name: input.last_name ?? null,
      phone: input.phone ?? null,
      source: input.source,
      source_attribution: input.source_attribution ?? {},
      lead_score: input.lead_score,
      revenue_path: input.revenue_path ?? null,
      pipeline_status: input.pipeline_status,
      next_action: input.next_action ?? null,
      next_action_due_at: input.next_action_due_at ?? null,
      last_engagement_at: now,
    };
    if (input.source_id) row.source_id = input.source_id;
    const { data, error } = await supabase.from("crm_contacts").insert(row).select("id").single();
    if (!error) return { id: data?.id ?? null, error: null };
    // Lost a race with a concurrent insert for the same email: fall through to update.
    if (error.code !== "23505") return { id: null, error: error.message };
    return upsertCrmContact(supabase, input);
  }

  const currentStage = existing.pipeline_status as string;
  const advances =
    REOPENABLE.has(currentStage) ||
    (stageRank(currentStage) >= 0 && stageRank(input.pipeline_status) > stageRank(currentStage));

  const patch: Record<string, unknown> = {
    last_engagement_at: now,
    lead_score: Math.max(existing.lead_score ?? 0, input.lead_score),
  };
  if (!existing.first_name && input.first_name) patch.first_name = input.first_name;
  if (!existing.last_name && input.last_name) patch.last_name = input.last_name;
  if (!existing.phone && input.phone) patch.phone = input.phone;
  if (advances) {
    patch.pipeline_status = input.pipeline_status;
    if (input.revenue_path) patch.revenue_path = input.revenue_path;
  }
  if (advances || !existing.next_action) {
    if (input.next_action !== undefined) patch.next_action = input.next_action;
    if (input.next_action_due_at !== undefined) patch.next_action_due_at = input.next_action_due_at;
  }

  const { error } = await supabase.from("crm_contacts").update(patch).eq("id", existing.id);
  return { id: existing.id, error: error?.message ?? null };
}
