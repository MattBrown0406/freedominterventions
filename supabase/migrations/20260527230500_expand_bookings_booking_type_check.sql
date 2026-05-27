-- Fix #5 (final): expand the booking_type CHECK constraint.
--
-- Root cause confirmed via diagnostic logging:
--   PostgreSQL error code 23514 (CHECK constraint violation) on every paid
--   booking insert that uses booking_type='crisis-coaching'.
--
-- The original CHECK constraint from 20251202210221_778c10e1 was:
--   CHECK (booking_type IN ('consultation', 'coaching'))
--
-- The April migration 20260425113000_add_intervention_contract_checkout.sql
-- was supposed to expand it to also allow:
--   crisis-coaching, readiness-intensive, intervention-contract
-- but that migration never landed in production. Lovable's rewrite of my
-- previous fix migration (20260527223735) only added the missing columns
-- and dropped my CHECK constraint update.
--
-- This is the actual fix. Once applied, paid crisis-coaching bookings will
-- pass the CHECK and the square-booking edge function will successfully
-- return a Square Checkout URL.

ALTER TABLE public.bookings
  DROP CONSTRAINT IF EXISTS bookings_booking_type_check;

ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_booking_type_check
  CHECK (booking_type IN (
    'consultation',
    'coaching',
    'crisis-coaching',
    'readiness-intensive',
    'intervention-contract'
  ));

-- Force PostgREST schema cache reload for completeness
NOTIFY pgrst, 'reload schema';
