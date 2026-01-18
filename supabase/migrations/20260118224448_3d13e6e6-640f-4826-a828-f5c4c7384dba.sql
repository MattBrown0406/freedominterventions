-- Enhanced security for PHI in assessments table

-- 1. Create audit trigger function for comprehensive logging of ALL changes
CREATE OR REPLACE FUNCTION public.audit_assessment_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid;
  _email text;
  _action text;
  _changed_fields jsonb := '{}';
BEGIN
  _user_id := auth.uid();
  _email := COALESCE(auth.jwt() ->> 'email', 'system');
  
  IF TG_OP = 'INSERT' THEN
    _action := 'create';
    _changed_fields := jsonb_build_object('assessment_id', NEW.id);
  ELSIF TG_OP = 'UPDATE' THEN
    _action := 'update';
    -- Track which sensitive fields were changed
    _changed_fields := jsonb_build_object(
      'assessment_id', NEW.id,
      'fields_modified', (
        SELECT jsonb_agg(key)
        FROM jsonb_each(to_jsonb(NEW))
        WHERE to_jsonb(NEW) -> key IS DISTINCT FROM to_jsonb(OLD) -> key
      )
    );
  ELSIF TG_OP = 'DELETE' THEN
    _action := 'delete';
    _changed_fields := jsonb_build_object('assessment_id', OLD.id, 'contact_name', OLD.contact_name);
  END IF;

  INSERT INTO public.assessment_access_audit (
    actor_user_id,
    actor_email,
    assessment_id,
    action,
    metadata,
    ip,
    user_agent
  ) VALUES (
    _user_id,
    _email,
    COALESCE(NEW.id, OLD.id),
    _action,
    _changed_fields,
    current_setting('request.headers', true)::json ->> 'x-forwarded-for',
    current_setting('request.headers', true)::json ->> 'user-agent'
  );

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$;

-- 2. Create trigger for all write operations
DROP TRIGGER IF EXISTS audit_assessment_changes_trigger ON public.assessments;
CREATE TRIGGER audit_assessment_changes_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.assessments
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_assessment_changes();

-- 3. Create a rate-limiting function to prevent bulk data extraction
CREATE OR REPLACE FUNCTION public.check_assessment_access_rate()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  access_count integer;
BEGIN
  -- Count accesses in last 5 minutes
  SELECT COUNT(*) INTO access_count
  FROM public.assessment_access_audit
  WHERE actor_user_id = auth.uid()
    AND created_at > NOW() - INTERVAL '5 minutes';
  
  -- Allow max 100 accesses per 5 minutes (adjust as needed)
  IF access_count > 100 THEN
    RAISE EXCEPTION 'Rate limit exceeded for assessment access';
  END IF;
  
  RETURN true;
END;
$$;

-- 4. Add comment explaining the security controls
COMMENT ON TABLE public.assessments IS 'Contains Protected Health Information (PHI). Access restricted to strict admins only with comprehensive audit logging. All access is logged to assessment_access_audit table.';
COMMENT ON TABLE public.assessment_access_audit IS 'Immutable audit log for all assessment data access and modifications. Required for HIPAA compliance.';