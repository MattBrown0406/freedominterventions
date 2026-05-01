CREATE TABLE IF NOT EXISTS public.crm_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  first_name text,
  last_name text,
  phone text,
  source text NOT NULL DEFAULT 'manual',
  source_id uuid,
  tags text[] NOT NULL DEFAULT '{}'::text[],
  notes text,
  unsubscribed boolean NOT NULL DEFAULT false,
  unsubscribed_at timestamptz,
  unsubscribe_token uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  last_contacted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_crm_contacts_email ON public.crm_contacts (email);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_source ON public.crm_contacts (source);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_tags ON public.crm_contacts USING gin (tags);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_unsubscribe_token ON public.crm_contacts (unsubscribe_token);

ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Strict admins can manage crm contacts" ON public.crm_contacts;
CREATE POLICY "Strict admins can manage crm contacts"
ON public.crm_contacts
FOR ALL
TO authenticated
USING (public.is_strict_admin())
WITH CHECK (public.is_strict_admin());

CREATE TABLE IF NOT EXISTS public.email_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  html_body text NOT NULL,
  text_body text,
  from_name text NOT NULL DEFAULT 'Freedom Interventions',
  from_email text NOT NULL DEFAULT 'noreply@freedominterventions.com',
  reply_to text,
  status text NOT NULL DEFAULT 'draft',
  recipient_count integer NOT NULL DEFAULT 0,
  sent_count integer NOT NULL DEFAULT 0,
  failed_count integer NOT NULL DEFAULT 0,
  skipped_count integer NOT NULL DEFAULT 0,
  sent_at timestamptz,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Strict admins can manage email campaigns" ON public.email_campaigns;
CREATE POLICY "Strict admins can manage email campaigns"
ON public.email_campaigns
FOR ALL
TO authenticated
USING (public.is_strict_admin())
WITH CHECK (public.is_strict_admin());

CREATE TABLE IF NOT EXISTS public.email_campaign_sends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid NOT NULL REFERENCES public.email_campaigns(id) ON DELETE CASCADE,
  contact_id uuid REFERENCES public.crm_contacts(id) ON DELETE SET NULL,
  email text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  error_message text,
  sendgrid_message_id text,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_email_campaign_sends_campaign ON public.email_campaign_sends (campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_campaign_sends_contact ON public.email_campaign_sends (contact_id);

ALTER TABLE public.email_campaign_sends ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Strict admins can view email campaign sends" ON public.email_campaign_sends;
CREATE POLICY "Strict admins can view email campaign sends"
ON public.email_campaign_sends
FOR SELECT
TO authenticated
USING (public.is_strict_admin());

CREATE TABLE IF NOT EXISTS public.discount_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  base_amount_cents integer NOT NULL DEFAULT 950000 CHECK (base_amount_cents > 0),
  amount_cents integer NOT NULL CHECK (amount_cents > 0),
  issued_to_name text,
  issued_to_email text,
  expires_at timestamptz,
  used_at timestamptz,
  used_by_email text,
  used_by_contract_id uuid,
  notes text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_discount_codes_code ON public.discount_codes (code);
CREATE INDEX IF NOT EXISTS idx_discount_codes_used_at ON public.discount_codes (used_at);

ALTER TABLE public.discount_codes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Strict admins can manage discount codes" ON public.discount_codes;
CREATE POLICY "Strict admins can manage discount codes"
ON public.discount_codes
FOR ALL
TO authenticated
USING (public.is_strict_admin())
WITH CHECK (public.is_strict_admin());

DROP TRIGGER IF EXISTS set_crm_contacts_updated_at ON public.crm_contacts;
CREATE TRIGGER set_crm_contacts_updated_at
BEFORE UPDATE ON public.crm_contacts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS set_email_campaigns_updated_at ON public.email_campaigns;
CREATE TRIGGER set_email_campaigns_updated_at
BEFORE UPDATE ON public.email_campaigns
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS set_discount_codes_updated_at ON public.discount_codes;
CREATE TRIGGER set_discount_codes_updated_at
BEFORE UPDATE ON public.discount_codes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.upsert_crm_contact(
  p_email text,
  p_first_name text,
  p_last_name text,
  p_phone text,
  p_source text,
  p_source_id uuid
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_email IS NULL OR length(trim(p_email)) = 0 THEN
    RETURN;
  END IF;

  INSERT INTO public.crm_contacts (email, first_name, last_name, phone, source, source_id)
  VALUES (lower(trim(p_email)), p_first_name, p_last_name, p_phone, p_source, p_source_id)
  ON CONFLICT (email) DO UPDATE SET
    first_name = COALESCE(public.crm_contacts.first_name, EXCLUDED.first_name),
    last_name = COALESCE(public.crm_contacts.last_name, EXCLUDED.last_name),
    phone = COALESCE(public.crm_contacts.phone, EXCLUDED.phone),
    source = COALESCE(public.crm_contacts.source, EXCLUDED.source),
    source_id = COALESCE(public.crm_contacts.source_id, EXCLUDED.source_id),
    updated_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.crm_sync_from_assessment()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_first text;
  v_last text;
  v_parts text[];
BEGIN
  IF NEW.contact_name IS NOT NULL THEN
    v_parts := regexp_split_to_array(trim(NEW.contact_name), '\s+');
    v_first := v_parts[1];
    IF array_length(v_parts, 1) > 1 THEN
      v_last := array_to_string(v_parts[2:array_length(v_parts, 1)], ' ');
    END IF;
  END IF;

  PERFORM public.upsert_crm_contact(
    NEW.contact_email, v_first, v_last, NEW.contact_phone, 'assessment', NEW.id
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'CRM sync from assessment failed: %', SQLERRM;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_crm_sync_assessment ON public.assessments;
CREATE TRIGGER trg_crm_sync_assessment
AFTER INSERT ON public.assessments
FOR EACH ROW EXECUTE FUNCTION public.crm_sync_from_assessment();

CREATE OR REPLACE FUNCTION public.crm_sync_from_contract()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_first text;
  v_last text;
  v_parts text[];
  v_name text;
BEGIN
  v_name := COALESCE(NEW.client_name, NEW.signer_name);
  IF v_name IS NOT NULL THEN
    v_parts := regexp_split_to_array(trim(v_name), '\s+');
    v_first := v_parts[1];
    IF array_length(v_parts, 1) > 1 THEN
      v_last := array_to_string(v_parts[2:array_length(v_parts, 1)], ' ');
    END IF;
  END IF;

  PERFORM public.upsert_crm_contact(
    NEW.client_email, v_first, v_last, NEW.client_phone, 'contract', NEW.id
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'CRM sync from contract failed: %', SQLERRM;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_crm_sync_contract ON public.contracts;
CREATE TRIGGER trg_crm_sync_contract
AFTER INSERT ON public.contracts
FOR EACH ROW EXECUTE FUNCTION public.crm_sync_from_contract();

INSERT INTO public.crm_contacts (email, first_name, last_name, phone, source, source_id, created_at)
SELECT
  lower(trim(a.contact_email)),
  split_part(trim(a.contact_name), ' ', 1),
  NULLIF(regexp_replace(trim(a.contact_name), '^\S+\s*', ''), ''),
  a.contact_phone,
  'assessment',
  a.id,
  a.created_at
FROM public.assessments a
WHERE a.contact_email IS NOT NULL AND length(trim(a.contact_email)) > 0
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.crm_contacts (email, first_name, last_name, phone, source, source_id, created_at)
SELECT
  lower(trim(c.client_email)),
  split_part(trim(COALESCE(c.client_name, c.signer_name)), ' ', 1),
  NULLIF(regexp_replace(trim(COALESCE(c.client_name, c.signer_name)), '^\S+\s*', ''), ''),
  c.client_phone,
  'contract',
  c.id,
  c.created_at
FROM public.contracts c
WHERE c.client_email IS NOT NULL AND length(trim(c.client_email)) > 0
ON CONFLICT (email) DO NOTHING;
