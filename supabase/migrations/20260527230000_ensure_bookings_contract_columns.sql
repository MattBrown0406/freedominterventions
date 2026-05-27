-- Fix #4 (the actual root cause): ensure intervention-contract columns exist on bookings.
--
-- Root cause confirmed via diagnostic logging in square-booking edge function:
--   PostgREST error PGRST204 "Could not find the 'contract_metadata' column of
--   'bookings' in the schema cache."
--
-- The April migration 20260425113000_add_intervention_contract_checkout.sql added
-- five columns to bookings (discount_code, discount_cents, contract_pdf_path,
-- contract_pdf_url, contract_metadata). Either that migration never applied to
-- production, or PostgREST's schema cache is stale.
--
-- This migration is fully idempotent: re-running ADD COLUMN IF NOT EXISTS does
-- nothing if the columns already exist. Then we ask PostgREST to reload its
-- schema cache so any stale cache state is cleared.
--
-- If this fixes the bug → April migration didn't apply, we just applied it now.
-- If this doesn't fix the bug → columns existed all along, cache was stale —
-- the NOTIFY at the end forces a reload.

ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS discount_code text,
  ADD COLUMN IF NOT EXISTS discount_cents integer,
  ADD COLUMN IF NOT EXISTS contract_pdf_path text,
  ADD COLUMN IF NOT EXISTS contract_pdf_url text,
  ADD COLUMN IF NOT EXISTS contract_metadata jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Also re-apply the booking_type CHECK constraint from that April migration
-- in case it didn't land either (would manifest as a different CHECK error
-- on intervention-contract bookings, not PGRST204, but belt-and-suspenders).
ALTER TABLE public.bookings
  DROP CONSTRAINT IF EXISTS bookings_booking_type_check;

ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_booking_type_check
  CHECK (booking_type IN ('consultation', 'coaching', 'crisis-coaching', 'readiness-intensive', 'intervention-contract'));

-- Force PostgREST to reload its schema cache so the new columns are visible
-- to edge functions and clients. PostgREST listens for this notification.
NOTIFY pgrst, 'reload schema';
