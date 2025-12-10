-- Drop existing RESTRICTIVE policies on assessments
DROP POLICY IF EXISTS "Admins can view all assessments" ON public.assessments;
DROP POLICY IF EXISTS "Admins can update assessments" ON public.assessments;
DROP POLICY IF EXISTS "Admins can delete assessments" ON public.assessments;
DROP POLICY IF EXISTS "No direct client inserts allowed" ON public.assessments;

-- Create PERMISSIVE policies for admin-only access
-- Only authenticated admin users can SELECT
CREATE POLICY "Admins can view all assessments" 
ON public.assessments 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only authenticated admin users can UPDATE
CREATE POLICY "Admins can update assessments" 
ON public.assessments 
FOR UPDATE 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only authenticated admin users can DELETE
CREATE POLICY "Admins can delete assessments" 
ON public.assessments 
FOR DELETE 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Block all direct client inserts (must go through edge function)
-- Using a restrictive policy with false blocks all inserts
CREATE POLICY "No direct client inserts allowed" 
ON public.assessments 
FOR INSERT 
TO authenticated, anon
WITH CHECK (false);