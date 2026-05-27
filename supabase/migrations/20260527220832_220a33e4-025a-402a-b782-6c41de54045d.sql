GRANT EXECUTE ON FUNCTION public.audit_bookings_writes() TO authenticated;
GRANT EXECUTE ON FUNCTION public.audit_assessments_writes() TO authenticated;
GRANT EXECUTE ON FUNCTION public.audit_assessment_changes() TO authenticated;
GRANT EXECUTE ON FUNCTION public.notify_assessment_to_notion() TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO authenticated;