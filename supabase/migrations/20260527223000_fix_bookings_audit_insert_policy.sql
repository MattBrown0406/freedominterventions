-- Fix #3: allow the audit trigger function to INSERT into bookings_access_audit.
--
-- Background: 20260122150627 added an "immutable audit trail" RLS policy:
--   FOR ALL ... USING (false) WITH CHECK (false)
-- on public.bookings_access_audit. The intent was good — block direct
-- client-side INSERT/UPDATE/DELETE on the audit log. BUT the FOR ALL clause
-- also blocks the SECURITY DEFINER trigger function `audit_bookings_writes()`
-- from inserting, because in Supabase's hosted Postgres the function owner
-- does not have BYPASSRLS by default. Result: every INSERT into the
-- `bookings` table fails because its AFTER INSERT trigger can't write the
-- audit row, and the whole transaction rolls back.
--
-- Fix: replace the catch-all "block everything" policy with one that ONLY
-- blocks UPDATE and DELETE (preserving immutability), and add a permissive
-- INSERT policy. Direct client INSERTs are still blocked by the absence of
-- INSERT grants to anon/authenticated on the table itself — only SECURITY
-- DEFINER triggers (which run with the function-owner's grants) can write.
--
-- Same pattern likely affects other audit/notify tables. Sweep:
--   - bookings_access_audit (this fix)
--   - assessment_access_audit if it exists (TBD by inspection)

-- Drop the over-broad policy
DROP POLICY IF EXISTS "No direct modifications to bookings audit log" ON public.bookings_access_audit;
DROP POLICY IF EXISTS "No direct client inserts allowed" ON public.bookings_access_audit;

-- Block UPDATE / DELETE so the audit trail stays immutable.
CREATE POLICY "Audit log is immutable - no updates"
  ON public.bookings_access_audit
  FOR UPDATE
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Audit log is immutable - no deletes"
  ON public.bookings_access_audit
  FOR DELETE
  USING (false);

-- Allow INSERT — the trigger function is the only writer, and SECURITY DEFINER
-- runs it as the function owner who has INSERT privilege on the table. Direct
-- client inserts are blocked by absence of INSERT grants to anon/authenticated.
CREATE POLICY "Audit log accepts trigger-driven inserts"
  ON public.bookings_access_audit
  FOR INSERT
  WITH CHECK (true);

-- Belt-and-suspenders: revoke INSERT from anon/authenticated explicitly so
-- direct client INSERTs cannot bypass the trigger pattern.
REVOKE INSERT ON public.bookings_access_audit FROM anon, authenticated, PUBLIC;
GRANT INSERT ON public.bookings_access_audit TO service_role;

-- Also ensure SELECT on the audit table stays admin-only (re-asserting prior intent).
DROP POLICY IF EXISTS "Strict admins can view booking audit" ON public.bookings_access_audit;
CREATE POLICY "Strict admins can view booking audit"
  ON public.bookings_access_audit
  FOR SELECT
  USING (public.is_strict_admin());
