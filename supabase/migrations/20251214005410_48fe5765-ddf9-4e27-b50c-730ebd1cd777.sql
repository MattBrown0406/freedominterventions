-- Add explicit deny-all policy for public role on assessments as a failsafe
-- This ensures absolutely no unauthenticated access regardless of other policy states
CREATE POLICY "Deny public access to assessments" 
ON public.assessments 
FOR SELECT 
TO public
USING (false);

-- Add explicit deny policy for anonymous access on bookings table
CREATE POLICY "Deny anonymous access to bookings" 
ON public.bookings 
FOR SELECT 
TO anon
USING (false);

-- Add explicit deny-all policy for public role on bookings as a failsafe
CREATE POLICY "Deny public access to bookings" 
ON public.bookings 
FOR SELECT 
TO public
USING (false);