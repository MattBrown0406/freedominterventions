-- Add explicit RESTRICTIVE policies to block anonymous access to assessments table
-- This provides defense-in-depth for sensitive health data

CREATE POLICY "Block anonymous select on assessments"
ON public.assessments
AS RESTRICTIVE
FOR SELECT
TO anon
USING (false);

CREATE POLICY "Block anonymous insert on assessments"
ON public.assessments
AS RESTRICTIVE
FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "Block anonymous update on assessments"
ON public.assessments
AS RESTRICTIVE
FOR UPDATE
TO anon
USING (false)
WITH CHECK (false);

CREATE POLICY "Block anonymous delete on assessments"
ON public.assessments
AS RESTRICTIVE
FOR DELETE
TO anon
USING (false);