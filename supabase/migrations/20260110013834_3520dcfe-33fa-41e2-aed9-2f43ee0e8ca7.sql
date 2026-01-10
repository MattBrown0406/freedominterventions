-- Create table to explicitly authorize specific staff to access specific assessments
CREATE TABLE IF NOT EXISTS public.assessment_case_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid,
  UNIQUE (assessment_id, user_id)
);

-- Enable RLS
ALTER TABLE public.assessment_case_assignments ENABLE ROW LEVEL SECURITY;

-- Policies: strict admins can manage assignments
DROP POLICY IF EXISTS "Strict admins can view assessment assignments" ON public.assessment_case_assignments;
DROP POLICY IF EXISTS "Strict admins can insert assessment assignments" ON public.assessment_case_assignments;
DROP POLICY IF EXISTS "Strict admins can update assessment assignments" ON public.assessment_case_assignments;
DROP POLICY IF EXISTS "Strict admins can delete assessment assignments" ON public.assessment_case_assignments;

CREATE POLICY "Strict admins can view assessment assignments"
ON public.assessment_case_assignments
FOR SELECT
TO authenticated
USING (public.is_strict_admin());

CREATE POLICY "Strict admins can insert assessment assignments"
ON public.assessment_case_assignments
FOR INSERT
TO authenticated
WITH CHECK (public.is_strict_admin());

CREATE POLICY "Strict admins can update assessment assignments"
ON public.assessment_case_assignments
FOR UPDATE
TO authenticated
USING (public.is_strict_admin())
WITH CHECK (public.is_strict_admin());

CREATE POLICY "Strict admins can delete assessment assignments"
ON public.assessment_case_assignments
FOR DELETE
TO authenticated
USING (public.is_strict_admin());

-- Helper function to check assignment without causing RLS recursion
CREATE OR REPLACE FUNCTION public.is_assigned_to_assessment(_assessment_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() IS NOT NULL
  AND EXISTS (
    SELECT 1
    FROM public.assessment_case_assignments a
    WHERE a.assessment_id = _assessment_id
      AND a.user_id = auth.uid()
  );
$$;

-- Tighten assessments access: require either strict admin OR explicit assignment
-- Replace existing policies on assessments
DROP POLICY IF EXISTS "Only strict admins can view assessments" ON public.assessments;
DROP POLICY IF EXISTS "Only strict admins can update assessments" ON public.assessments;
DROP POLICY IF EXISTS "Only strict admins can delete assessments" ON public.assessments;
-- Keep insert policy as strict admin (all creation happens via backend function/service role)

CREATE POLICY "Assigned staff or strict admins can view assessments"
ON public.assessments
FOR SELECT
TO authenticated
USING (public.is_strict_admin() OR public.is_assigned_to_assessment(id));

CREATE POLICY "Assigned staff or strict admins can update assessments"
ON public.assessments
FOR UPDATE
TO authenticated
USING (public.is_strict_admin() OR public.is_assigned_to_assessment(id))
WITH CHECK (public.is_strict_admin() OR public.is_assigned_to_assessment(id));

CREATE POLICY "Strict admins can delete assessments"
ON public.assessments
FOR DELETE
TO authenticated
USING (public.is_strict_admin());

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_assessment_case_assignments_assessment_id
  ON public.assessment_case_assignments(assessment_id);

CREATE INDEX IF NOT EXISTS idx_assessment_case_assignments_user_id
  ON public.assessment_case_assignments(user_id);
