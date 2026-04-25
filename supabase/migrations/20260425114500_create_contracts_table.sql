CREATE TABLE IF NOT EXISTS public.contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_type text NOT NULL CHECK (contract_type IN ('intervention', 'readiness-intensive')),
  status text NOT NULL DEFAULT 'signed' CHECK (status IN ('signed', 'signed-awaiting-payment', 'paid', 'cancelled')),
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_phone text,
  signer_name text NOT NULL,
  signed_at timestamptz NOT NULL DEFAULT now(),
  agreement_text text NOT NULL,
  agreement_version text NOT NULL,
  amount_cents integer,
  discount_code text,
  discount_cents integer,
  payment_id text,
  payment_link_id text,
  contract_pdf_path text,
  contract_pdf_url text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_contracts_type_signed_at ON public.contracts (contract_type, signed_at DESC);
CREATE INDEX IF NOT EXISTS idx_contracts_client_email ON public.contracts (client_email);

DROP POLICY IF EXISTS "Only strict admins can view contracts" ON public.contracts;
DROP POLICY IF EXISTS "Only strict admins can insert contracts" ON public.contracts;
DROP POLICY IF EXISTS "Only strict admins can update contracts" ON public.contracts;
DROP POLICY IF EXISTS "Only strict admins can delete contracts" ON public.contracts;

CREATE POLICY "Only strict admins can view contracts"
ON public.contracts
FOR SELECT
TO authenticated
USING (is_strict_admin());

CREATE POLICY "Only strict admins can insert contracts"
ON public.contracts
FOR INSERT
TO authenticated
WITH CHECK (is_strict_admin());

CREATE POLICY "Only strict admins can update contracts"
ON public.contracts
FOR UPDATE
TO authenticated
USING (is_strict_admin())
WITH CHECK (is_strict_admin());

CREATE POLICY "Only strict admins can delete contracts"
ON public.contracts
FOR DELETE
TO authenticated
USING (is_strict_admin());

DROP TRIGGER IF EXISTS update_contracts_updated_at ON public.contracts;
CREATE TRIGGER update_contracts_updated_at
BEFORE UPDATE ON public.contracts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
