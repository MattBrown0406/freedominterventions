-- Clean up conflicting SELECT policies on assessments table
-- Drop all existing SELECT policies and replace with one clear admin-only policy

DROP POLICY IF EXISTS "Admins can view all assessments" ON public.assessments;
DROP POLICY IF EXISTS "Authenticated admins can view assessments" ON public.assessments;
DROP POLICY IF EXISTS "Deny anonymous access to assessments" ON public.assessments;
DROP POLICY IF EXISTS "Deny public access to assessments" ON public.assessments;

-- Create single, clear admin-only SELECT policy
-- Uses restrictive approach: only authenticated admins can access
CREATE POLICY "Only authenticated admins can view assessments" 
ON public.assessments 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));