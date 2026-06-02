-- Fix 1: Restrict bookings_access_audit INSERT to service_role; SECURITY DEFINER triggers bypass RLS anyway
DROP POLICY IF EXISTS "Audit log accepts trigger-driven inserts" ON public.bookings_access_audit;
CREATE POLICY "Service role only inserts to bookings audit"
ON public.bookings_access_audit
FOR INSERT
TO service_role
WITH CHECK (true);

-- Fix 2: Tighten freedom_funnel_events SELECT to is_strict_admin
DROP POLICY IF EXISTS "Strict admins can view freedom funnel events" ON public.freedom_funnel_events;
CREATE POLICY "Strict admins can view freedom funnel events"
ON public.freedom_funnel_events
FOR SELECT
TO authenticated
USING (is_strict_admin());

-- Fix 3: Storage insurance-cards SELECT must use is_strict_admin()
DROP POLICY IF EXISTS "Admins can view insurance cards" ON storage.objects;
CREATE POLICY "Strict admins can view insurance cards"
ON storage.objects
FOR SELECT
USING (bucket_id = 'insurance-cards' AND is_strict_admin());