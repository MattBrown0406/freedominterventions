-- Tighten access to highly sensitive assessment data (PII/PHI)
-- Goal: Only strict admins can read/update assessments; eliminate assigned-staff table access.

-- Assessments table
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Remove broader policies
DROP POLICY IF EXISTS "Authorized users can view assessments" ON public.assessments;
DROP POLICY IF EXISTS "Authorized users can update assessments" ON public.assessments;

-- Keep existing strict-admin policies for insert/delete if present, but ensure strict admin-only read/update
DROP POLICY IF EXISTS "Strict admins can view assessments" ON public.assessments;
DROP POLICY IF EXISTS "Strict admins can update assessments" ON public.assessments;

CREATE POLICY "Strict admins can view assessments"
ON public.assessments
FOR SELECT
USING (public.is_strict_admin());

CREATE POLICY "Strict admins can update assessments"
ON public.assessments
FOR UPDATE
USING (public.is_strict_admin())
WITH CHECK (public.is_strict_admin());

-- (Optional hardening) Ensure INSERT/DELETE are strict-admin only (idempotent)
DROP POLICY IF EXISTS "Only strict admins can insert assessments" ON public.assessments;
DROP POLICY IF EXISTS "Only strict admins can delete assessments" ON public.assessments;

CREATE POLICY "Only strict admins can insert assessments"
ON public.assessments
FOR INSERT
WITH CHECK (public.is_strict_admin());

CREATE POLICY "Only strict admins can delete assessments"
ON public.assessments
FOR DELETE
USING (public.is_strict_admin());
