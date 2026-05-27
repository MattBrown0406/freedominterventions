-- Fix: restore EXECUTE on audit_bookings_writes() so the bookings INSERT trigger can fire.
--
-- Bug introduced by 20260524021537 which revoked EXECUTE from anon/authenticated/PUBLIC
-- on a set of SECURITY DEFINER functions. That's correct for functions that are only
-- called directly by clients, but `audit_bookings_writes` is invoked indirectly via
-- the `audit_bookings_changes` AFTER INSERT trigger on `public.bookings`. Revoking
-- EXECUTE from PUBLIC breaks every booking insert — including those made by edge
-- functions using the service_role key — because trigger execution checks EXECUTE
-- on the role calling the INSERT, regardless of SECURITY DEFINER on the function.
--
-- Symptom: paid-session checkout fails with "Edge Function returned a non-2xx status
-- code" / 500 "Failed to create booking before checkout" on the production site.
--
-- Same issue may bite `audit_assessments_writes` and `notify_assessment_to_notion`
-- which were revoked in the same commit, so we restore those too for safety. They
-- run as SECURITY DEFINER and only write to internal audit/notify tables.
--
-- 20260524021616 only restored EXECUTE on the policy-referenced functions
-- (has_role, is_strict_admin, is_assigned_to_assessment, check_*_access_rate)
-- and missed the trigger functions.

GRANT EXECUTE ON FUNCTION public.audit_bookings_writes() TO anon, authenticated, service_role, PUBLIC;
GRANT EXECUTE ON FUNCTION public.audit_assessments_writes() TO anon, authenticated, service_role, PUBLIC;
GRANT EXECUTE ON FUNCTION public.audit_assessment_changes() TO anon, authenticated, service_role, PUBLIC;
GRANT EXECUTE ON FUNCTION public.notify_assessment_to_notion() TO anon, authenticated, service_role, PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO anon, authenticated, service_role, PUBLIC;
