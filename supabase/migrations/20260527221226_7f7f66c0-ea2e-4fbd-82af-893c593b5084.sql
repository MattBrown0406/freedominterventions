GRANT EXECUTE ON FUNCTION public.audit_bookings_writes() TO anon, service_role, PUBLIC;
GRANT EXECUTE ON FUNCTION public.audit_assessments_writes() TO anon, service_role, PUBLIC;
GRANT EXECUTE ON FUNCTION public.audit_assessment_changes() TO anon, service_role, PUBLIC;
GRANT EXECUTE ON FUNCTION public.notify_assessment_to_notion() TO anon, service_role, PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO anon, service_role, PUBLIC;