-- Drop existing policies
DROP POLICY IF EXISTS "Admins can delete assessments" ON public.assessments;
DROP POLICY IF EXISTS "Admins can update assessments" ON public.assessments;
DROP POLICY IF EXISTS "Admins can view all assessments" ON public.assessments;
DROP POLICY IF EXISTS "No direct client inserts allowed" ON public.assessments;

-- Recreate policies with explicit authentication requirement
CREATE POLICY "Admins can view all assessments" 
ON public.assessments 
FOR SELECT 
TO authenticated
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update assessments" 
ON public.assessments 
FOR UPDATE 
TO authenticated
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete assessments" 
ON public.assessments 
FOR DELETE 
TO authenticated
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'admin'::app_role));

-- Keep insert blocked - assessments come through edge function only
CREATE POLICY "No direct client inserts allowed" 
ON public.assessments 
FOR INSERT 
WITH CHECK (false);