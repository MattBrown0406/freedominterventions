-- Add the free 'aftercare-planning' booking type (Aftercare Planning Call).
-- Reached via /?type=aftercare-planning#booking from the aftercare guidance
-- page; intentionally not shown in the main booking type picker.

ALTER TABLE public.bookings
  DROP CONSTRAINT IF EXISTS bookings_booking_type_check;

ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_booking_type_check
  CHECK (booking_type IN (
    'consultation',
    'coaching',
    'crisis-coaching',
    'readiness-intensive',
    'intervention-contract',
    'aftercare-planning'
  ));

NOTIFY pgrst, 'reload schema';
