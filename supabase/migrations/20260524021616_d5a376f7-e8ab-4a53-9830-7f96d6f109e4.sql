
-- Restore EXECUTE on functions referenced from RLS policies.
-- Policies evaluate as the calling role, which needs EXECUTE on referenced functions.
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_strict_admin() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_assigned_to_assessment(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_assessment_access_rate() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_bookings_access_rate() TO anon, authenticated;
