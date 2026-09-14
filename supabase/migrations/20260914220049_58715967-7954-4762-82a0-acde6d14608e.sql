REVOKE EXECUTE ON FUNCTION public.is_family_portal_case_member(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_family_portal_case_member(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.is_family_portal_case_member(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_family_portal_case_member(uuid) TO service_role;