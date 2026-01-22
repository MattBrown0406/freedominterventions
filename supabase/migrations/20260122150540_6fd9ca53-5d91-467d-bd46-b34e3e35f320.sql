-- Attach audit trigger for all write operations (INSERT, UPDATE, DELETE) on assessments table
-- Using the existing audit_assessment_changes() function which provides comprehensive logging

CREATE TRIGGER audit_assessments_changes_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.assessments
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_assessment_changes();

-- Add a comment documenting the security controls
COMMENT ON TABLE public.assessments IS 'Contains highly sensitive PHI/PII data. Access restricted via is_strict_admin() + rate limiting. All access logged to assessment_access_audit table.';

-- Ensure the audit table itself cannot be modified by anyone (immutable audit trail)
-- Drop existing policies if any and create strict ones
DROP POLICY IF EXISTS "No direct modifications to audit log" ON public.assessment_access_audit;
DROP POLICY IF EXISTS "Strict admins can view audit log" ON public.assessment_access_audit;

-- Only allow strict admins to read the audit log
CREATE POLICY "Strict admins can view audit log"
  ON public.assessment_access_audit
  FOR SELECT
  USING (is_strict_admin());

-- Block all direct INSERT/UPDATE/DELETE - only triggers and service role can write
CREATE POLICY "No direct modifications to audit log"
  ON public.assessment_access_audit
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- Enable RLS on audit table if not already
ALTER TABLE public.assessment_access_audit ENABLE ROW LEVEL SECURITY;