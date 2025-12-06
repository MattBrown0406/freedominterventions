-- Drop existing RESTRICTIVE policies and recreate as PERMISSIVE for proper behavior
DROP POLICY IF EXISTS "Admins can delete assessments" ON public.assessments;
DROP POLICY IF EXISTS "Admins can update assessments" ON public.assessments;
DROP POLICY IF EXISTS "Admins can view all assessments" ON public.assessments;
DROP POLICY IF EXISTS "Anyone can submit assessments" ON public.assessments;

-- Recreate as PERMISSIVE policies (default behavior - at least one must pass)
-- This ensures proper access control

-- SELECT: Only authenticated admins can view assessments
CREATE POLICY "Admins can view all assessments"
ON public.assessments
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- INSERT: Allow public submissions (required for assessment form)
-- The form is public-facing for families seeking help
CREATE POLICY "Anyone can submit assessments"
ON public.assessments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- UPDATE: Only admins can update assessments
CREATE POLICY "Admins can update assessments"
ON public.assessments
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- DELETE: Only admins can delete assessments
CREATE POLICY "Admins can delete assessments"
ON public.assessments
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));