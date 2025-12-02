-- Add UPDATE policy for rescheduling - requires matching email
CREATE POLICY "Customers can update their own bookings"
ON public.bookings
FOR UPDATE
USING (false)  -- Cannot update via RLS directly
WITH CHECK (false);

-- Note: Updates will be done via edge function with service_role key
-- The edge function will validate email matches before allowing reschedule