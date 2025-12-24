-- Drop existing restrictive policies and replace with permissive ones
DROP POLICY IF EXISTS "Strict admins can view assessments" ON public.assessments;
DROP POLICY IF EXISTS "Strict admins can update assessments" ON public.assessments;
DROP POLICY IF EXISTS "Strict admins can delete assessments" ON public.assessments;
DROP POLICY IF EXISTS "No direct client inserts allowed" ON public.assessments;

-- Create permissive policies that explicitly grant access only to strict admins
CREATE POLICY "Only strict admins can view assessments" 
ON public.assessments 
FOR SELECT 
TO authenticated
USING (is_strict_admin());

CREATE POLICY "Only strict admins can insert assessments" 
ON public.assessments 
FOR INSERT 
TO authenticated
WITH CHECK (is_strict_admin());

CREATE POLICY "Only strict admins can update assessments" 
ON public.assessments 
FOR UPDATE 
TO authenticated
USING (is_strict_admin())
WITH CHECK (is_strict_admin());

CREATE POLICY "Only strict admins can delete assessments" 
ON public.assessments 
FOR DELETE 
TO authenticated
USING (is_strict_admin());