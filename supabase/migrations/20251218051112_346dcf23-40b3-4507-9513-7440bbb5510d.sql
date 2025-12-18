-- Defense-in-depth for highly sensitive assessments access

-- 1) Add a stricter admin check that also validates the authenticated email
-- This reduces risk from accidental role misassignment or privilege escalation.
CREATE OR REPLACE FUNCTION public.is_strict_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    auth.uid() IS NOT NULL
    AND public.has_role(auth.uid(), 'admin'::public.app_role)
    AND COALESCE((auth.jwt() ->> 'email'), '') = 'matt@freedominterventions.com'
$$;

-- 2) Ensure assessments policies rely on the strict check
DROP POLICY IF EXISTS "Only authenticated admins can view assessments" ON public.assessments;
DROP POLICY IF EXISTS "Admins can update assessments" ON public.assessments;
DROP POLICY IF EXISTS "Admins can delete assessments" ON public.assessments;

CREATE POLICY "Strict admins can view assessments"
ON public.assessments
FOR SELECT
TO authenticated
USING (public.is_strict_admin());

CREATE POLICY "Strict admins can update assessments"
ON public.assessments
FOR UPDATE
TO authenticated
USING (public.is_strict_admin())
WITH CHECK (public.is_strict_admin());

CREATE POLICY "Strict admins can delete assessments"
ON public.assessments
FOR DELETE
TO authenticated
USING (public.is_strict_admin());

-- Keep: No direct client inserts allowed (WITH CHECK false)
