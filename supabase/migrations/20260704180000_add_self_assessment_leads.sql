-- Self-assessment lead capture.
--
-- The /self-assessment quiz previously rendered results entirely client-side:
-- no lead capture, no persistence, no follow-up. This migration adds:
--   1. A table to store quiz submissions (answers, score, tier, safety flag).
--   2. 'self_assessment' as an allowed lead_type in freedom_followup_queue
--      so quiz leads can enter the existing follow-up automation.

CREATE TABLE IF NOT EXISTS public.self_assessment_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  contact_relationship text,
  responses jsonb NOT NULL DEFAULT '{}'::jsonb,
  score integer NOT NULL DEFAULT 0,
  percentage numeric NOT NULL DEFAULT 0,
  result_category text NOT NULL CHECK (result_category IN ('early', 'turning_point', 'urgent')),
  safety_flag boolean NOT NULL DEFAULT false,
  source_attribution jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_self_assessment_leads_email
  ON public.self_assessment_leads (contact_email);

CREATE INDEX IF NOT EXISTS idx_self_assessment_leads_created_at
  ON public.self_assessment_leads (created_at DESC);

-- Service-role access only (edge functions). No anon/authenticated policies.
ALTER TABLE public.self_assessment_leads ENABLE ROW LEVEL SECURITY;

-- Allow quiz leads into the follow-up queue.
ALTER TABLE public.freedom_followup_queue
  DROP CONSTRAINT IF EXISTS freedom_followup_queue_lead_type_check;

ALTER TABLE public.freedom_followup_queue
  ADD CONSTRAINT freedom_followup_queue_lead_type_check
  CHECK (lead_type IN (
    'assessment',
    'self_assessment',
    'contact_message',
    'consultation',
    'paid_booking',
    'contract',
    'abandoned_cart'
  ));

NOTIFY pgrst, 'reload schema';
