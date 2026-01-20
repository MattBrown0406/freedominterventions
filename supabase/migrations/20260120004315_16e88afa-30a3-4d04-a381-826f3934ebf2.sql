-- Add rate limiting function for bookings access (mirrors assessment rate limiting)
CREATE OR REPLACE FUNCTION public.check_bookings_access_rate()
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
  FROM public.bookings_access_audit
  WHERE actor_user_id = auth.uid()
    AND created_at > NOW() - INTERVAL '5 minutes';
  
  -- Allow max 50 accesses per 5 minutes (stricter than assessments due to PII)
  IF access_count > 50 THEN
    RAISE EXCEPTION 'Rate limit exceeded for bookings access';
  END IF;
  
  RETURN true;
END;
$$;

-- Update SELECT policy to include rate limiting
DROP POLICY IF EXISTS "Only strict admins can view bookings" ON public.bookings;
CREATE POLICY "Only strict admins can view bookings with rate limit"
ON public.bookings
FOR SELECT
USING (is_strict_admin() AND check_bookings_access_rate());