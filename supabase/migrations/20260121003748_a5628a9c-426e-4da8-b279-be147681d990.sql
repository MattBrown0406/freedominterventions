-- Update check_bookings_access_rate to also LOG the access (not just count)
CREATE OR REPLACE FUNCTION public.check_bookings_access_rate()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  access_count integer;
BEGIN
  -- First, log this access attempt
  INSERT INTO public.bookings_access_audit (
    actor_user_id,
    actor_email,
    action,
    booking_id,
    metadata,
    ip,
    user_agent
  ) VALUES (
    auth.uid(),
    auth.jwt() ->> 'email',
    'read',
    NULL, -- NULL for bulk reads, specific ID logged elsewhere if single read
    jsonb_build_object('access_type', 'rls_check'),
    current_setting('request.headers', true)::json ->> 'x-forwarded-for',
    current_setting('request.headers', true)::json ->> 'user-agent'
  );
  
  -- Count accesses in last 5 minutes
  SELECT COUNT(*) INTO access_count
  FROM public.bookings_access_audit
  WHERE actor_user_id = auth.uid()
    AND created_at > NOW() - INTERVAL '5 minutes';
  
  -- Allow max 50 accesses per 5 minutes (stricter than assessments due to PII)
  IF access_count > 50 THEN
    RAISE EXCEPTION 'Rate limit exceeded for bookings access';
  END IF;
  
  RETURN true;
END;
$function$;

-- Ensure the write audit trigger is attached to bookings table
DROP TRIGGER IF EXISTS trg_audit_bookings_writes ON public.bookings;

CREATE TRIGGER trg_audit_bookings_writes
  AFTER INSERT OR UPDATE OR DELETE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_bookings_writes();

-- Add comment for documentation
COMMENT ON FUNCTION public.check_bookings_access_rate() IS 'Rate limits AND logs all bookings table read access. Part of PII protection for customer data.';