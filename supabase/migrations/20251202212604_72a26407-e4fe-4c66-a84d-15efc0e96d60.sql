-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view bookings" ON public.bookings;

-- Create a restrictive SELECT policy - only service role can read (for backend operations)
-- No authenticated users exist in this app, so we don't need user-specific policies
CREATE POLICY "Only service role can view bookings"
ON public.bookings
FOR SELECT
USING (false);

-- Note: The INSERT policy remains as-is since public booking creation is intentional
-- The edge function uses service_role key which bypasses RLS