DROP POLICY IF EXISTS "No direct modifications to bookings audit log" ON public.bookings_access_audit;
DROP POLICY IF EXISTS "No direct client inserts allowed" ON public.bookings_access_audit;

CREATE POLICY "Audit log is immutable - no updates"
  ON public.bookings_access_audit
  FOR UPDATE
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Audit log is immutable - no deletes"
  ON public.bookings_access_audit
  FOR DELETE
  USING (false);

CREATE POLICY "Audit log accepts trigger-driven inserts"
  ON public.bookings_access_audit
  FOR INSERT
  WITH CHECK (true);

REVOKE INSERT ON public.bookings_access_audit FROM anon, authenticated, PUBLIC;
GRANT INSERT ON public.bookings_access_audit TO service_role;

DROP POLICY IF EXISTS "Strict admins can view booking audit" ON public.bookings_access_audit;
CREATE POLICY "Strict admins can view booking audit"
  ON public.bookings_access_audit
  FOR SELECT
  USING (public.is_strict_admin());