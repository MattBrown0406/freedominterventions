-- Apply this delta ONLY before the guard-only functions; does not touch bookings.
CREATE TABLE public.booking_maintenance_control (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  enabled boolean NOT NULL DEFAULT false
);
ALTER TABLE public.booking_maintenance_control ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.booking_maintenance_control FROM PUBLIC, anon, authenticated, service_role;
-- Runtime can read only. Toggles require the database owner/operator, not an HTTP API.
GRANT SELECT ON TABLE public.booking_maintenance_control TO service_role;
INSERT INTO public.booking_maintenance_control (id, enabled) VALUES (true, false);