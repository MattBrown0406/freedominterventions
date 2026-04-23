ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS agreement_version TEXT,
  ADD COLUMN IF NOT EXISTS agreement_signed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS agreement_signer_name TEXT,
  ADD COLUMN IF NOT EXISTS agreement_text TEXT,
  ADD COLUMN IF NOT EXISTS agreement_accepted BOOLEAN NOT NULL DEFAULT false;
