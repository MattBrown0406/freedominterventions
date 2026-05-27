-- Fix #2: include service_role in the EXECUTE grants.
--
-- The previous restore migration (20260527220832) only granted EXECUTE to
-- `authenticated`, but the square-booking edge function connects to Postgres
-- using SUPABASE_SERVICE_ROLE_KEY which authenticates as the `service_role`
-- Postgres role — not `authenticated`. Result: paid checkout still 500s with
-- "Failed to create booking before checkout" because service_role cannot
-- EXECUTE the audit trigger function that fires on booking INSERT.
--
-- This grants EXECUTE on the same five SECURITY DEFINER trigger functions
-- to the roles that actually invoke writes through edge functions:
--   - service_role  (edge functions using the service-role key)
--   - anon          (anonymous public-facing inserts: assessments form, etc.)
--   - PUBLIC        (belt-and-suspenders for any other Postgres role)
--
-- All five are SECURITY DEFINER functions whose bodies only write to internal
-- audit/notify tables — granting EXECUTE is safe.

GRANT EXECUTE ON FUNCTION public.audit_bookings_writes() TO anon, service_role, PUBLIC;
GRANT EXECUTE ON FUNCTION public.audit_assessments_writes() TO anon, service_role, PUBLIC;
GRANT EXECUTE ON FUNCTION public.audit_assessment_changes() TO anon, service_role, PUBLIC;
GRANT EXECUTE ON FUNCTION public.notify_assessment_to_notion() TO anon, service_role, PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO anon, service_role, PUBLIC;
