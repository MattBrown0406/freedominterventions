-- Add explicit policy to deny all anonymous/public access to assessments table
-- This ensures no unauthenticated users can ever read sensitive health data

CREATE POLICY "Deny anonymous access to assessments" 
ON public.assessments 
FOR SELECT 
TO anon
USING (false);

-- Also add a permissive policy for authenticated admins (since current policies are restrictive)
-- This works together with the restrictive admin check
CREATE POLICY "Authenticated admins can view assessments" 
ON public.assessments 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));