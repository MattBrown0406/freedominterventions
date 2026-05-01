ALTER TABLE public.contracts
  ADD COLUMN IF NOT EXISTS square_order_id text;

ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS payment_link_id text,
  ADD COLUMN IF NOT EXISTS square_order_id text;

CREATE INDEX IF NOT EXISTS idx_contracts_square_order_id ON public.contracts (square_order_id);
CREATE INDEX IF NOT EXISTS idx_bookings_square_order_id ON public.bookings (square_order_id);
