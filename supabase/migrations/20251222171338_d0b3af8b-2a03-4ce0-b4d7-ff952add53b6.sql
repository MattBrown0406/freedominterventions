-- Drop the conflicting/redundant policies
DROP POLICY IF EXISTS "Deny anonymous access to bookings" ON public.bookings;
DROP POLICY IF EXISTS "Deny public access to bookings" ON public.bookings;

-- Drop existing admin policies to replace with stricter versions
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can delete bookings" ON public.bookings;

-- Create stricter policies using is_strict_admin() which verifies both role AND email
CREATE POLICY "Strict admins can view bookings" 
ON public.bookings 
FOR SELECT 
USING (is_strict_admin());

CREATE POLICY "Strict admins can update bookings" 
ON public.bookings 
FOR UPDATE 
USING (is_strict_admin())
WITH CHECK (is_strict_admin());

CREATE POLICY "Strict admins can delete bookings" 
ON public.bookings 
FOR DELETE 
USING (is_strict_admin());