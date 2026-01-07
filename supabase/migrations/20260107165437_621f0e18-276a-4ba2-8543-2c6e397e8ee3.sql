-- Create bookings access audit table
CREATE TABLE public.bookings_access_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  actor_user_id uuid,
  actor_email text,
  action text NOT NULL,
  booking_id uuid,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.bookings_access_audit ENABLE ROW LEVEL SECURITY;

-- Only strict admins can view audit logs
CREATE POLICY "Strict admins can view booking audit"
ON public.bookings_access_audit
FOR SELECT
USING (is_strict_admin());

-- No direct client inserts allowed (only via trigger)
CREATE POLICY "No direct client inserts allowed"
ON public.bookings_access_audit
FOR INSERT
WITH CHECK (false);

-- Create audit trigger function for bookings
CREATE OR REPLACE FUNCTION public.audit_bookings_writes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    INSERT INTO public.bookings_access_audit (
      actor_user_id,
      actor_email,
      action,
      booking_id,
      metadata
    ) VALUES (
      auth.uid(),
      auth.jwt() ->> 'email',
      'insert',
      NEW.id,
      jsonb_build_object('customer_email', NEW.customer_email, 'booking_date', NEW.booking_date)
    );
    RETURN NEW;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO public.bookings_access_audit (
      actor_user_id,
      actor_email,
      action,
      booking_id,
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
    INSERT INTO public.bookings_access_audit (
      actor_user_id,
      actor_email,
      action,
      booking_id,
      metadata
    ) VALUES (
      auth.uid(),
      auth.jwt() ->> 'email',
      'delete',
      OLD.id,
      jsonb_build_object('customer_email', OLD.customer_email, 'booking_date', OLD.booking_date)
    );
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Create trigger for bookings audit
CREATE TRIGGER audit_bookings_changes
AFTER INSERT OR UPDATE OR DELETE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.audit_bookings_writes();