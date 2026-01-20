-- Update SELECT policy to include rate limiting (function already exists)
DROP POLICY IF EXISTS "Strict admins can view assessments" ON public.assessments;
CREATE POLICY "Strict admins can view assessments with rate limit"
ON public.assessments
FOR SELECT
USING (is_strict_admin() AND check_assessment_access_rate());