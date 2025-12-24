-- Drop existing restrictive policies and replace with permissive ones
-- Restrictive policies only filter already-permitted rows; we need permissive policies to properly control access

DROP POLICY IF EXISTS "Strict admins can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Strict admins can update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Strict admins can delete bookings" ON public.bookings;
DROP POLICY IF EXISTS "No direct client inserts allowed" ON public.bookings;

-- Create permissive policies that explicitly grant access only to strict admins
CREATE POLICY "Only strict admins can view bookings" 
ON public.bookings 
FOR SELECT 
TO authenticated
USING (is_strict_admin());

CREATE POLICY "Only strict admins can insert bookings" 
ON public.bookings 
FOR INSERT 
TO authenticated
WITH CHECK (is_strict_admin());

CREATE POLICY "Only strict admins can update bookings" 
ON public.bookings 
FOR UPDATE 
TO authenticated
USING (is_strict_admin())
WITH CHECK (is_strict_admin());

CREATE POLICY "Only strict admins can delete bookings" 
ON public.bookings 
FOR DELETE 
TO authenticated
USING (is_strict_admin());