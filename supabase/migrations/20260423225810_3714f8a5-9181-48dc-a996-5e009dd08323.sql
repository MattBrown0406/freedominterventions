ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS agreement_version text,
  ADD COLUMN IF NOT EXISTS agreement_signed_at timestamptz,
  ADD COLUMN IF NOT EXISTS agreement_signer_name text,
  ADD COLUMN IF NOT EXISTS agreement_text text,
  ADD COLUMN IF NOT EXISTS agreement_accepted boolean NOT NULL DEFAULT false;