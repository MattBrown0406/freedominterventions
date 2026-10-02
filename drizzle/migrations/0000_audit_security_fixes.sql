DROP POLICY IF EXISTS "Anyone can submit a review" ON public.family_reviews;
REVOKE INSERT ON public.family_reviews FROM anon, authenticated;
DROP POLICY IF EXISTS "Anyone can create abandoned cart records" ON public.abandoned_carts;
REVOKE INSERT ON public.abandoned_carts FROM anon, authenticated;
ALTER TABLE public.crm_contacts ADD COLUMN IF NOT EXISTS source_id uuid;
ALTER TABLE public.crm_contacts ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}';
ALTER TABLE public.email_campaigns ADD COLUMN IF NOT EXISTS sent_at timestamptz;
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS square_order_id text;
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS payment_link_id text,
  ADD COLUMN IF NOT EXISTS square_order_id text;
CREATE INDEX IF NOT EXISTS idx_contracts_square_order_id ON public.contracts (square_order_id);
CREATE INDEX IF NOT EXISTS idx_bookings_square_order_id ON public.bookings (square_order_id);
DROP POLICY IF EXISTS "Only strict admins can view bookings with rate limit" ON public.bookings;
DROP POLICY IF EXISTS "Only strict admins can view bookings" ON public.bookings;
CREATE POLICY "Only strict admins can view bookings"
  ON public.bookings FOR SELECT
  USING (public.is_strict_admin());
DROP POLICY IF EXISTS "Strict admins can view assessments with rate limit" ON public.assessments;
DROP POLICY IF EXISTS "Strict admins can view assessments" ON public.assessments;
CREATE POLICY "Strict admins can view assessments"
  ON public.assessments FOR SELECT
  USING (public.is_strict_admin());
REVOKE EXECUTE ON FUNCTION public.check_bookings_access_rate() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.check_assessment_access_rate() FROM PUBLIC, anon, authenticated;
DROP TRIGGER IF EXISTS audit_assessments_changes ON public.assessments;
DROP TRIGGER IF EXISTS audit_assessments_changes_trigger ON public.assessments;
DROP TRIGGER IF EXISTS audit_bookings_changes ON public.bookings;
DROP TRIGGER IF EXISTS audit_bookings_changes_trigger ON public.bookings;
DROP TRIGGER IF EXISTS on_assessment_insert_notify_notion ON public.assessments;
DROP POLICY IF EXISTS "Families insert messages for assigned cases" ON public.family_portal_messages;
CREATE POLICY "Families insert messages for assigned cases"
  ON public.family_portal_messages FOR INSERT TO authenticated
  WITH CHECK (
    public.is_family_portal_case_member(case_id)
    AND sender_user_id = auth.uid()
    AND is_read_by_admin = false
    AND admin_notified_at IS NULL
  );
ALTER TABLE public.discount_codes DROP CONSTRAINT IF EXISTS discount_codes_amount_cents_check;
DO $$
BEGIN
  CREATE UNIQUE INDEX IF NOT EXISTS bookings_contract_id_uniq
    ON public.bookings ((contract_metadata->>'contract_id'))
    WHERE contract_metadata ? 'contract_id';
EXCEPTION WHEN unique_violation THEN
  RAISE NOTICE 'bookings_contract_id_uniq not created: duplicate contract_id rows exist';
END $$;