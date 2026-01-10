-- Drop existing bookings policies that may cause issues
DROP POLICY IF EXISTS "Block anonymous delete on bookings" ON public.bookings;
DROP POLICY IF EXISTS "Block anonymous select on bookings" ON public.bookings;
DROP POLICY IF EXISTS "Block anonymous insert on bookings" ON public.bookings;
DROP POLICY IF EXISTS "Block anonymous update on bookings" ON public.bookings;
DROP POLICY IF EXISTS "Authenticated strict admins can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Authenticated strict admins can insert bookings" ON public.bookings;
DROP POLICY IF EXISTS "Authenticated strict admins can update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Authenticated strict admins can delete bookings" ON public.bookings;

-- Create clean PERMISSIVE policies that only allow strict admins
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