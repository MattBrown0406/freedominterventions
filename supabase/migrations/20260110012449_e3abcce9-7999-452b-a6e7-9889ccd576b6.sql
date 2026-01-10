-- Drop existing policies on bookings table
DROP POLICY IF EXISTS "Only strict admins can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Only strict admins can insert bookings" ON public.bookings;
DROP POLICY IF EXISTS "Only strict admins can update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Only strict admins can delete bookings" ON public.bookings;

-- Recreate policies with explicit authentication check first
-- These are RESTRICTIVE policies that require BOTH auth.uid() to be present AND is_strict_admin() to pass

CREATE POLICY "Authenticated strict admins can view bookings" 
ON public.bookings 
FOR SELECT 
TO authenticated
USING (is_strict_admin());

CREATE POLICY "Authenticated strict admins can insert bookings" 
ON public.bookings 
FOR INSERT 
TO authenticated
WITH CHECK (is_strict_admin());

CREATE POLICY "Authenticated strict admins can update bookings" 
ON public.bookings 
FOR UPDATE 
TO authenticated
USING (is_strict_admin())
WITH CHECK (is_strict_admin());

CREATE POLICY "Authenticated strict admins can delete bookings" 
ON public.bookings 
FOR DELETE 
TO authenticated
USING (is_strict_admin());

-- Explicitly deny anonymous role access (belt and suspenders approach)
CREATE POLICY "Deny anonymous select on bookings"
ON public.bookings
FOR SELECT
TO anon
USING (false);

CREATE POLICY "Deny anonymous insert on bookings"
ON public.bookings
FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "Deny anonymous update on bookings"
ON public.bookings
FOR UPDATE
TO anon
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny anonymous delete on bookings"
ON public.bookings
FOR DELETE
TO anon
USING (false);