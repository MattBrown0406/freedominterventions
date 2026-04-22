-- Create abandoned_carts table for tracking incomplete paid bookings
CREATE TABLE public.abandoned_carts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  booking_type text NOT NULL,
  booking_date date,
  booking_time time,
  amount_cents integer NOT NULL,
  status text NOT NULL DEFAULT 'pending', -- pending, recovered, recovery_sent, expired
  recovery_email_sent_at timestamp with time zone,
  recovered_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Index for cron queries (find pending carts older than 1hr)
CREATE INDEX idx_abandoned_carts_status_created ON public.abandoned_carts(status, created_at);
CREATE INDEX idx_abandoned_carts_email ON public.abandoned_carts(customer_email);

-- Trigger to auto-update updated_at
CREATE TRIGGER update_abandoned_carts_updated_at
  BEFORE UPDATE ON public.abandoned_carts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.abandoned_carts ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (capture from booking form, no auth required)
CREATE POLICY "Anyone can create abandoned cart records"
  ON public.abandoned_carts
  FOR INSERT
  TO public
  WITH CHECK (
    length(COALESCE(customer_email, '')) > 0
    AND length(COALESCE(customer_name, '')) > 0
    AND booking_type IN ('crisis-coaching', 'readiness-intensive')
  );

-- Only strict admins can view
CREATE POLICY "Only strict admins can view abandoned carts"
  ON public.abandoned_carts
  FOR SELECT
  TO public
  USING (is_strict_admin());

-- Only strict admins can update (for marking recovered manually)
CREATE POLICY "Only strict admins can update abandoned carts"
  ON public.abandoned_carts
  FOR UPDATE
  TO public
  USING (is_strict_admin())
  WITH CHECK (is_strict_admin());

-- Only strict admins can delete
CREATE POLICY "Only strict admins can delete abandoned carts"
  ON public.abandoned_carts
  FOR DELETE
  TO public
  USING (is_strict_admin());