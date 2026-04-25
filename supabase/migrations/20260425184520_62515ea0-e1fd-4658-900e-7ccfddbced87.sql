
CREATE TABLE IF NOT EXISTS public.contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_type text NOT NULL,
  status text NOT NULL DEFAULT 'signed-awaiting-payment',
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

CREATE POLICY "Anyone can submit a signed contract"
  ON public.contracts FOR INSERT
  TO public
  WITH CHECK (
    length(coalesce(client_name, '')) > 0
    AND length(coalesce(client_email, '')) > 0
    AND length(coalesce(signer_name, '')) > 0
    AND length(coalesce(agreement_text, '')) > 0
    AND length(coalesce(agreement_version, '')) > 0
    AND contract_type IN ('intervention', 'readiness-intensive')
  );

CREATE POLICY "Strict admins can view contracts"
  ON public.contracts FOR SELECT
  TO public
  USING (public.is_strict_admin());

CREATE POLICY "Strict admins can update contracts"
  ON public.contracts FOR UPDATE
  TO public
  USING (public.is_strict_admin())
  WITH CHECK (public.is_strict_admin());

CREATE POLICY "Strict admins can delete contracts"
  ON public.contracts FOR DELETE
  TO public
  USING (public.is_strict_admin());

CREATE TRIGGER update_contracts_updated_at
  BEFORE UPDATE ON public.contracts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_contracts_signed_at ON public.contracts (signed_at DESC);
CREATE INDEX IF NOT EXISTS idx_contracts_client_email ON public.contracts (client_email);

INSERT INTO storage.buckets (id, name, public)
VALUES ('contracts', 'contracts', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Strict admins can read contract PDFs"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'contracts' AND public.is_strict_admin());

CREATE POLICY "Strict admins can manage contract PDFs"
  ON storage.objects FOR ALL
  TO public
  USING (bucket_id = 'contracts' AND public.is_strict_admin())
  WITH CHECK (bucket_id = 'contracts' AND public.is_strict_admin());
