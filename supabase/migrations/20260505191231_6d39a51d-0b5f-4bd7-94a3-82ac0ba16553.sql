ALTER TABLE public.assessments
  ADD COLUMN IF NOT EXISTS source_attribution jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS source_attribution jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.abandoned_carts
  ADD COLUMN IF NOT EXISTS source_attribution jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.contracts
  ADD COLUMN IF NOT EXISTS source_attribution jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.call_analytics
  ADD COLUMN IF NOT EXISTS source_attribution jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.crm_contacts
  ADD COLUMN IF NOT EXISTS source_attribution jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS lead_score integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS revenue_path text,
  ADD COLUMN IF NOT EXISTS pipeline_status text NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS next_action text,
  ADD COLUMN IF NOT EXISTS next_action_due_at timestamptz,
  ADD COLUMN IF NOT EXISTS last_engagement_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_assessments_source_attribution
  ON public.assessments USING gin (source_attribution);
CREATE INDEX IF NOT EXISTS idx_bookings_source_attribution
  ON public.bookings USING gin (source_attribution);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_source_attribution
  ON public.abandoned_carts USING gin (source_attribution);
CREATE INDEX IF NOT EXISTS idx_contracts_source_attribution
  ON public.contracts USING gin (source_attribution);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_revenue_path
  ON public.crm_contacts (revenue_path);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_pipeline_status
  ON public.crm_contacts (pipeline_status);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_next_action_due_at
  ON public.crm_contacts (next_action_due_at);

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  page_path text,
  source_attribution jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
  ON public.contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email
  ON public.contact_messages (lower(email));
CREATE INDEX IF NOT EXISTS idx_contact_messages_status
  ON public.contact_messages (status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_source_attribution
  ON public.contact_messages USING gin (source_attribution);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Strict admins can manage contact messages" ON public.contact_messages;
CREATE POLICY "Strict admins can manage contact messages"
ON public.contact_messages
FOR ALL
TO authenticated
USING (public.is_strict_admin())
WITH CHECK (public.is_strict_admin());

DROP TRIGGER IF EXISTS set_contact_messages_updated_at ON public.contact_messages;
CREATE TRIGGER set_contact_messages_updated_at
BEFORE UPDATE ON public.contact_messages
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.freedom_followup_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_type text NOT NULL CHECK (lead_type IN ('assessment', 'contact_message', 'consultation', 'paid_booking', 'contract', 'abandoned_cart')),
  lead_id uuid,
  contact_email text NOT NULL,
  contact_name text NOT NULL,
  contact_phone text,
  recipient_type text NOT NULL DEFAULT 'lead' CHECK (recipient_type IN ('lead', 'owner')),
  followup_reason text NOT NULL,
  priority text NOT NULL DEFAULT 'normal' CHECK (priority IN ('normal', 'high', 'urgent')),
  sequence_step integer NOT NULL DEFAULT 1,
  subject text NOT NULL,
  body_html text NOT NULL,
  source_attribution jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'skipped', 'failed')),
  due_at timestamptz NOT NULL DEFAULT now(),
  sent_at timestamptz,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_freedom_followup_queue_status_due
  ON public.freedom_followup_queue (status, due_at);
CREATE INDEX IF NOT EXISTS idx_freedom_followup_queue_lead
  ON public.freedom_followup_queue (lead_type, lead_id);
CREATE INDEX IF NOT EXISTS idx_freedom_followup_queue_email
  ON public.freedom_followup_queue (lower(contact_email));
CREATE INDEX IF NOT EXISTS idx_freedom_followup_queue_priority
  ON public.freedom_followup_queue (priority);

ALTER TABLE public.freedom_followup_queue ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Strict admins can manage freedom followups" ON public.freedom_followup_queue;
CREATE POLICY "Strict admins can manage freedom followups"
ON public.freedom_followup_queue
FOR ALL
TO authenticated
USING (public.is_strict_admin())
WITH CHECK (public.is_strict_admin());

DROP TRIGGER IF EXISTS set_freedom_followup_queue_updated_at ON public.freedom_followup_queue;
CREATE TRIGGER set_freedom_followup_queue_updated_at
BEFORE UPDATE ON public.freedom_followup_queue
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();