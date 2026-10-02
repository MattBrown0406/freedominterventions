-- Bug/security audit fixes (2026-10-01). Idempotent: safe to re-run.

-- 1. Testimonials: anyone could INSERT directly via PostgREST with approved=true,
--    publishing fake reviews on the homepage. Submissions go through the
--    submit-testimonial Edge Function (service role), so close direct inserts.
DROP POLICY IF EXISTS "Anyone can submit a review" ON public.family_reviews;
REVOKE INSERT ON public.family_reviews FROM anon, authenticated;

-- 2. Abandoned carts: anon could insert carts with any email/name (and backdated
--    created_at), which the hourly recovery cron then emailed from Matt's address.
--    Cart capture now goes through the square-booking Edge Function (service role).
DROP POLICY IF EXISTS "Anyone can create abandoned cart records" ON public.abandoned_carts;
REVOKE INSERT ON public.abandoned_carts FROM anon, authenticated;

-- 3. CRM columns the Edge Functions write but production never received (the
--    hand-written 20260501120000 migration failed before adding them), causing
--    every crm_contacts upsert from those functions to fail silently.
ALTER TABLE public.crm_contacts ADD COLUMN IF NOT EXISTS source_id uuid;
ALTER TABLE public.crm_contacts ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}';
ALTER TABLE public.email_campaigns ADD COLUMN IF NOT EXISTS sent_at timestamptz;

-- 3b. Square order tracking columns. The hand-written 20260430120000 migration
--     that adds them never ran in production (verified: PostgREST 42703), so
--     paid bookings/contracts could not store or verify their Square order and
--     payments were never confirmed.
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS square_order_id text;
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS payment_link_id text,
  ADD COLUMN IF NOT EXISTS square_order_id text;
CREATE INDEX IF NOT EXISTS idx_contracts_square_order_id ON public.contracts (square_order_id);
CREATE INDEX IF NOT EXISTS idx_bookings_square_order_id ON public.bookings (square_order_id);

-- 4. Admin SELECT policies on bookings/assessments called VOLATILE functions that
--    INSERT an audit row per evaluated row and raise after 50/100 rows. That
--    errors inside PostgREST's read-only GET transactions and caps admin reads.
--    Keep the strict-admin check; write auditing stays on the triggers below.
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

-- These were granted to anon; anon calls were unthrottled audit-table writes.
REVOKE EXECUTE ON FUNCTION public.check_bookings_access_rate() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.check_assessment_access_rate() FROM PUBLIC, anon, authenticated;

-- 5. Duplicate audit triggers (same function attached twice) wrote every change
--    two or three times. Keep one trigger per audit function.
DROP TRIGGER IF EXISTS audit_assessments_changes ON public.assessments;          -- dup of trg_audit_assessments_writes
DROP TRIGGER IF EXISTS audit_assessments_changes_trigger ON public.assessments;  -- dup of audit_assessment_changes_trigger
DROP TRIGGER IF EXISTS audit_bookings_changes ON public.bookings;                -- dup of trg_audit_bookings_writes
DROP TRIGGER IF EXISTS audit_bookings_changes_trigger ON public.bookings;        -- dup of trg_audit_bookings_writes

-- 6. The Notion sync trigger sent a NULL Authorization header, which only worked
--    because assessment-to-notion had no auth. submit-assessment now invokes it
--    server-side with the service role, so the trigger is removed.
DROP TRIGGER IF EXISTS on_assessment_insert_notify_notion ON public.assessments;

-- 7. Family portal: members could insert messages pre-marked as read / notified,
--    hiding them from the admin. Messages normally go through the family-portal
--    Edge Function; this closes the direct-insert path.
DROP POLICY IF EXISTS "Families insert messages for assigned cases" ON public.family_portal_messages;
CREATE POLICY "Families insert messages for assigned cases"
  ON public.family_portal_messages FOR INSERT TO authenticated
  WITH CHECK (
    public.is_family_portal_case_member(case_id)
    AND sender_user_id = auth.uid()
    AND is_read_by_admin = false
    AND admin_notified_at IS NULL
  );

-- 8. Insurance-card uploads are anonymous; enforce size/type server-side
--    (the 10 MB limit was client-side only).
UPDATE storage.buckets
SET file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
WHERE id = 'insurance-cards';

-- 9. Admin "prospect contract" quotes with a custom base price and $0 discount
--    need a zero-amount code row (prod's table has no such CHECK; this only
--    affects environments built from the hand-written 20260501120000 file).
ALTER TABLE public.discount_codes DROP CONSTRAINT IF EXISTS discount_codes_amount_cents_check;

-- 10. One Readiness Intensive booking per paid contract (the webhook and the
--     customer redirect can both fulfill a payment; the code handles 23505).
--     Skipped with a notice if legacy duplicate rows already exist.
DO $$
BEGIN
  CREATE UNIQUE INDEX IF NOT EXISTS bookings_contract_id_uniq
    ON public.bookings ((contract_metadata->>'contract_id'))
    WHERE contract_metadata ? 'contract_id';
EXCEPTION WHEN unique_violation THEN
  RAISE NOTICE 'bookings_contract_id_uniq not created: duplicate contract_id rows exist';
END $$;
