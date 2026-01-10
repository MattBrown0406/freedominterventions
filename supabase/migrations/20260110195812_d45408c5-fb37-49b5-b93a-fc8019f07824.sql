-- Drop existing assessments policies that may cause issues
DROP POLICY IF EXISTS "Block anonymous select on assessments" ON public.assessments;
DROP POLICY IF EXISTS "Block anonymous insert on assessments" ON public.assessments;
DROP POLICY IF EXISTS "Block anonymous update on assessments" ON public.assessments;
DROP POLICY IF EXISTS "Block anonymous delete on assessments" ON public.assessments;
DROP POLICY IF EXISTS "Strict admins can delete assessments" ON public.assessments;
DROP POLICY IF EXISTS "Only strict admins can insert assessments" ON public.assessments;
DROP POLICY IF EXISTS "Assigned staff or strict admins can view assessments" ON public.assessments;
DROP POLICY IF EXISTS "Assigned staff or strict admins can update assessments" ON public.assessments;

-- Create clean PERMISSIVE policies for authenticated users only
-- Only strict admins or assigned staff can view assessments
CREATE POLICY "Authorized users can view assessments"
ON public.assessments
FOR SELECT
TO authenticated
USING (is_strict_admin() OR is_assigned_to_assessment(id));

-- Only strict admins can insert new assessments
CREATE POLICY "Only strict admins can insert assessments"
ON public.assessments
FOR INSERT
TO authenticated
WITH CHECK (is_strict_admin());

-- Only strict admins or assigned staff can update assessments
CREATE POLICY "Authorized users can update assessments"
ON public.assessments
FOR UPDATE
TO authenticated
USING (is_strict_admin() OR is_assigned_to_assessment(id))
WITH CHECK (is_strict_admin() OR is_assigned_to_assessment(id));

-- Only strict admins can delete assessments
CREATE POLICY "Only strict admins can delete assessments"
ON public.assessments
FOR DELETE
TO authenticated
USING (is_strict_admin());