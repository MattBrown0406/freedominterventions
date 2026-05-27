ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_booking_type_check;
ALTER TABLE public.bookings ADD CONSTRAINT bookings_booking_type_check CHECK (booking_type IN ('consultation', 'coaching', 'crisis-coaching', 'readiness-intensive', 'intervention-contract'));
NOTIFY pgrst, 'reload schema';