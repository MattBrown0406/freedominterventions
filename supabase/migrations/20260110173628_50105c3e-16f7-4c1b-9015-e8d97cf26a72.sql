-- Drop existing anonymous deny policies (they're PERMISSIVE which is less secure)
DROP POLICY IF EXISTS "Deny anonymous select on bookings" ON public.bookings;
DROP POLICY IF EXISTS "Deny anonymous insert on bookings" ON public.bookings;
DROP POLICY IF EXISTS "Deny anonymous update on bookings" ON public.bookings;
DROP POLICY IF EXISTS "Deny anonymous delete on bookings" ON public.bookings;

-- Recreate as RESTRICTIVE policies for stronger security
-- RESTRICTIVE policies are evaluated with AND logic, meaning they must ALL pass
CREATE POLICY "Block anonymous select on bookings"
ON public.bookings
AS RESTRICTIVE
FOR SELECT
TO anon
USING (false);

CREATE POLICY "Block anonymous insert on bookings"
ON public.bookings
AS RESTRICTIVE
FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "Block anonymous update on bookings"
ON public.bookings
AS RESTRICTIVE
FOR UPDATE
TO anon
USING (false)
WITH CHECK (false);

CREATE POLICY "Block anonymous delete on bookings"
ON public.bookings
AS RESTRICTIVE
FOR DELETE
TO anon
USING (false);