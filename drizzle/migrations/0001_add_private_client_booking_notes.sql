-- Client background is independent of bookings.notes (Zoom leases/URLs/conflicts).
-- Do not backfill from operational notes: historical client text cannot be inferred.
-- Nullable/additive for old clients and existing rows. Existing strict-admin RLS stays intact.
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS client_notes text;
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS client_notes text;

-- Contracts stage Readiness Intensive notes until verified payment creates the booking.
-- Constraints also protect writes that bypass Edge Function validation.
ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_client_notes_length CHECK (char_length(client_notes) <= 5000);
ALTER TABLE public.contracts
  ADD CONSTRAINT contracts_client_notes_length CHECK (char_length(client_notes) <= 5000);

COMMENT ON COLUMN public.bookings.client_notes IS
  'Private client-supplied session background; owner booking email only. Never use for Zoom operational state.';
COMMENT ON COLUMN public.contracts.client_notes IS
  'Private client-supplied session background staged until paid Readiness Intensive booking fulfillment.';
