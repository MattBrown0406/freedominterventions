-- Attach audit trigger for all write operations (INSERT, UPDATE, DELETE) on bookings table
-- Using the existing audit_bookings_writes() function

CREATE TRIGGER audit_bookings_changes_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_bookings_writes();

-- Add documentation comment
COMMENT ON TABLE public.bookings IS 'Contains customer PII (names, emails, phones). Access restricted via is_strict_admin() + rate limiting. All access logged to bookings_access_audit table.';

-- Ensure the bookings audit table cannot be modified directly (immutable audit trail)
DROP POLICY IF EXISTS "No direct modifications to bookings audit log" ON public.bookings_access_audit;

-- Block all direct UPDATE/DELETE on audit table
CREATE POLICY "No direct modifications to bookings audit log"
  ON public.bookings_access_audit
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- Enable RLS on bookings audit table if not already
ALTER TABLE public.bookings_access_audit ENABLE ROW LEVEL SECURITY;