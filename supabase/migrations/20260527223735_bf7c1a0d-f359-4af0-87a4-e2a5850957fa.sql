ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS discount_code TEXT,
  ADD COLUMN IF NOT EXISTS discount_cents BIGINT,
  ADD COLUMN IF NOT EXISTS contract_pdf_path TEXT,
  ADD COLUMN IF NOT EXISTS contract_pdf_url TEXT,
  ADD COLUMN IF NOT EXISTS contract_metadata JSONB;

NOTIFY pgrst, 'reload schema';