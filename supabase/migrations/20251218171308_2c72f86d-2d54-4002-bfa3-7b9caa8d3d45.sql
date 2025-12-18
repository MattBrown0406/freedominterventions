-- Make assessment audit trail append-only (no deletes)

DROP POLICY IF EXISTS "Strict admins can delete assessment audit" ON public.assessment_access_audit;

-- No DELETE policy means deletes are denied under RLS.
