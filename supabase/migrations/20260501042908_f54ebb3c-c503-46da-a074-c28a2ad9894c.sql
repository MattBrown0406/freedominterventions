
-- discount_codes
CREATE TABLE public.discount_codes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code text NOT NULL UNIQUE,
  base_amount_cents integer NOT NULL,
  amount_cents integer NOT NULL,
  issued_to_name text,
  issued_to_email text,
  expires_at timestamptz,
  notes text,
  used_at timestamptz,
  used_by_email text,
  used_by_contract_id uuid,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.discount_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Strict admins can view discount codes"
  ON public.discount_codes FOR SELECT USING (public.is_strict_admin());
CREATE POLICY "Strict admins can insert discount codes"
  ON public.discount_codes FOR INSERT WITH CHECK (public.is_strict_admin());
CREATE POLICY "Strict admins can update discount codes"
  ON public.discount_codes FOR UPDATE USING (public.is_strict_admin()) WITH CHECK (public.is_strict_admin());
CREATE POLICY "Strict admins can delete discount codes"
  ON public.discount_codes FOR DELETE USING (public.is_strict_admin());
CREATE TRIGGER update_discount_codes_updated_at
  BEFORE UPDATE ON public.discount_codes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_discount_codes_code ON public.discount_codes(code);
CREATE INDEX idx_discount_codes_email ON public.discount_codes(issued_to_email);

-- crm_contacts
CREATE TABLE public.crm_contacts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  first_name text,
  last_name text,
  phone text,
  source text NOT NULL DEFAULT 'manual',
  notes text,
  last_contacted_at timestamptz,
  unsubscribed boolean NOT NULL DEFAULT false,
  unsubscribed_at timestamptz,
  unsubscribe_token text NOT NULL DEFAULT replace(gen_random_uuid()::text, '-', '') UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Strict admins can view crm contacts"
  ON public.crm_contacts FOR SELECT USING (public.is_strict_admin());
CREATE POLICY "Strict admins can insert crm contacts"
  ON public.crm_contacts FOR INSERT WITH CHECK (public.is_strict_admin());
CREATE POLICY "Strict admins can update crm contacts"
  ON public.crm_contacts FOR UPDATE USING (public.is_strict_admin()) WITH CHECK (public.is_strict_admin());
CREATE POLICY "Strict admins can delete crm contacts"
  ON public.crm_contacts FOR DELETE USING (public.is_strict_admin());
CREATE TRIGGER update_crm_contacts_updated_at
  BEFORE UPDATE ON public.crm_contacts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_crm_contacts_email ON public.crm_contacts(email);
CREATE INDEX idx_crm_contacts_source ON public.crm_contacts(source);
CREATE INDEX idx_crm_contacts_unsub_token ON public.crm_contacts(unsubscribe_token);

-- email_campaigns
CREATE TABLE public.email_campaigns (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject text NOT NULL,
  html_body text NOT NULL,
  text_body text,
  from_email text,
  from_name text,
  reply_to text,
  status text NOT NULL DEFAULT 'draft',
  recipient_count integer NOT NULL DEFAULT 0,
  sent_count integer NOT NULL DEFAULT 0,
  failed_count integer NOT NULL DEFAULT 0,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Strict admins can view campaigns"
  ON public.email_campaigns FOR SELECT USING (public.is_strict_admin());
CREATE POLICY "Strict admins can insert campaigns"
  ON public.email_campaigns FOR INSERT WITH CHECK (public.is_strict_admin());
CREATE POLICY "Strict admins can update campaigns"
  ON public.email_campaigns FOR UPDATE USING (public.is_strict_admin()) WITH CHECK (public.is_strict_admin());
CREATE POLICY "Strict admins can delete campaigns"
  ON public.email_campaigns FOR DELETE USING (public.is_strict_admin());
CREATE TRIGGER update_email_campaigns_updated_at
  BEFORE UPDATE ON public.email_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- email_campaign_sends
CREATE TABLE public.email_campaign_sends (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id uuid NOT NULL REFERENCES public.email_campaigns(id) ON DELETE CASCADE,
  contact_id uuid REFERENCES public.crm_contacts(id) ON DELETE SET NULL,
  email text NOT NULL,
  status text NOT NULL,
  error text,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.email_campaign_sends ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Strict admins can view campaign sends"
  ON public.email_campaign_sends FOR SELECT USING (public.is_strict_admin());
CREATE POLICY "Strict admins can insert campaign sends"
  ON public.email_campaign_sends FOR INSERT WITH CHECK (public.is_strict_admin());
CREATE POLICY "Strict admins can update campaign sends"
  ON public.email_campaign_sends FOR UPDATE USING (public.is_strict_admin()) WITH CHECK (public.is_strict_admin());
CREATE POLICY "Strict admins can delete campaign sends"
  ON public.email_campaign_sends FOR DELETE USING (public.is_strict_admin());
CREATE INDEX idx_campaign_sends_campaign ON public.email_campaign_sends(campaign_id);
