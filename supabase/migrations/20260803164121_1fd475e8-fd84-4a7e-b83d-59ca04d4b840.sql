DROP POLICY IF EXISTS "Anyone can submit a signed contract" ON public.contracts;
REVOKE INSERT ON public.contracts FROM anon;
GRANT ALL ON public.contracts TO service_role;