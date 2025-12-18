-- Defense-in-depth for highly sensitive assessments: audit logging + server-side access pattern

-- 1) Audit log table
CREATE TABLE IF NOT EXISTS public.assessment_access_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  actor_user_id uuid,
  actor_email text,
  action text NOT NULL,
  assessment_id uuid,
  ip text,
  user_agent text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);

ALTER TABLE public.assessment_access_audit ENABLE ROW LEVEL SECURITY;

-- 2) Default-deny: no direct client inserts
DROP POLICY IF EXISTS "No direct client inserts allowed" ON public.assessment_access_audit;
CREATE POLICY "No direct client inserts allowed"
ON public.assessment_access_audit
FOR INSERT
WITH CHECK (false);

-- 3) Strict admins can view audit logs
DROP POLICY IF EXISTS "Strict admins can view assessment audit" ON public.assessment_access_audit;
CREATE POLICY "Strict admins can view assessment audit"
ON public.assessment_access_audit
FOR SELECT
TO authenticated
USING (public.is_strict_admin());

-- 4) Strict admins can delete audit logs (optional, keep minimal)
DROP POLICY IF EXISTS "Strict admins can delete assessment audit" ON public.assessment_access_audit;
CREATE POLICY "Strict admins can delete assessment audit"
ON public.assessment_access_audit
FOR DELETE
TO authenticated
USING (public.is_strict_admin());

-- 5) Add audit trigger for UPDATE/DELETE on assessments (captures writes even if UI bypasses functions)
CREATE OR REPLACE FUNCTION public.audit_assessments_writes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (TG_OP = 'UPDATE') THEN
    INSERT INTO public.assessment_access_audit (
      actor_user_id,
      actor_email,
      action,
      assessment_id,
      metadata
    ) VALUES (
      auth.uid(),
      auth.jwt() ->> 'email',
      'update',
      NEW.id,
      jsonb_build_object('changed_columns', (SELECT jsonb_agg(key) FROM jsonb_each(to_jsonb(NEW)) e(key, val) WHERE to_jsonb(OLD) -> key IS DISTINCT FROM val))
    );
    RETURN NEW;
  ELSIF (TG_OP = 'DELETE') THEN
    INSERT INTO public.assessment_access_audit (
      actor_user_id,
      actor_email,
      action,
      assessment_id,
      metadata
    ) VALUES (
      auth.uid(),
      auth.jwt() ->> 'email',
      'delete',
      OLD.id,
      '{}'::jsonb
    );
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_audit_assessments_writes ON public.assessments;
CREATE TRIGGER trg_audit_assessments_writes
AFTER UPDATE OR DELETE ON public.assessments
FOR EACH ROW
EXECUTE FUNCTION public.audit_assessments_writes();
