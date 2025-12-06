-- Fix assessments table RLS policies - change from RESTRICTIVE to PERMISSIVE
-- RESTRICTIVE policies require ALL to pass AND at least one PERMISSIVE policy
-- With only RESTRICTIVE policies, all access is denied by default

-- Drop all existing policies
DROP POLICY IF EXISTS "Admins can delete assessments" ON public.assessments;
DROP POLICY IF EXISTS "Admins can update assessments" ON public.assessments;
DROP POLICY IF EXISTS "Admins can view all assessments" ON public.assessments;
DROP POLICY IF EXISTS "Anyone can submit assessments" ON public.assessments;

-- Recreate as PERMISSIVE policies (default - at least one must pass to grant access)

-- SELECT: Only authenticated admins can view sensitive health information
CREATE POLICY "Admins can view all assessments"
ON public.assessments
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- INSERT: Allow public submissions (required for intake form)
-- This is intentional - families need to submit without logging in
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