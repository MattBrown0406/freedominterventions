-- Remove the public INSERT policy since assessments now go through the edge function
DROP POLICY IF EXISTS "Anyone can submit assessments" ON public.assessments;

-- Create a restrictive policy that only allows service role to insert
-- (The edge function uses service role key which bypasses RLS, so this effectively blocks all client-side inserts)
CREATE POLICY "No direct client inserts allowed" 
ON public.assessments 
FOR INSERT 
WITH CHECK (false);