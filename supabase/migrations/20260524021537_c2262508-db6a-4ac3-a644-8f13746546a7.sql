
-- 1. Tighten user_roles: only strict admins (matt@) may insert/update/delete roles
DROP POLICY IF EXISTS "Only admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can delete roles" ON public.user_roles;

CREATE POLICY "Only strict admins can insert roles"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (public.is_strict_admin());

CREATE POLICY "Only strict admins can update roles"
ON public.user_roles FOR UPDATE TO authenticated
USING (public.is_strict_admin())
WITH CHECK (public.is_strict_admin());

CREATE POLICY "Only strict admins can delete roles"
ON public.user_roles FOR DELETE TO authenticated
USING (public.is_strict_admin());

-- 2. Insurance-cards storage: restrict uploads to a controlled path + admin lifecycle
DROP POLICY IF EXISTS "Anyone can upload insurance cards" ON storage.objects;

CREATE POLICY "Public can upload insurance card assets to uploads path"
ON storage.objects FOR INSERT TO public
WITH CHECK (
  bucket_id = 'insurance-cards'
  AND (storage.foldername(name))[1] = 'uploads'
  AND lower(storage.extension(name)) IN ('jpg','jpeg','png','webp','pdf')
);

CREATE POLICY "Strict admins can update insurance cards"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'insurance-cards' AND public.is_strict_admin())
WITH CHECK (bucket_id = 'insurance-cards' AND public.is_strict_admin());

CREATE POLICY "Strict admins can delete insurance cards"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'insurance-cards' AND public.is_strict_admin());

-- 3. call_analytics: replace permissive WITH CHECK (true) with basic validation
DROP POLICY IF EXISTS "Anyone can log call clicks" ON public.call_analytics;

CREATE POLICY "Anyone can log call clicks"
ON public.call_analytics FOR INSERT TO public
WITH CHECK (
  length(COALESCE(phone_number, '')) BETWEEN 1 AND 32
);

-- 4. Revoke EXECUTE on internal SECURITY DEFINER functions from client roles.
-- These are only used by triggers/policies; clients should never call them.
REVOKE EXECUTE ON FUNCTION public.notify_assessment_to_notion() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.check_assessment_access_rate() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.check_bookings_access_rate() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.audit_assessments_writes() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.audit_assessment_changes() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.audit_bookings_writes() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_strict_admin() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_assigned_to_assessment(uuid) FROM anon, authenticated, PUBLIC;
