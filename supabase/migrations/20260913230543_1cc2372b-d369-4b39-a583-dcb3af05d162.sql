ALTER TABLE public.freedom_followup_queue
  ADD COLUMN IF NOT EXISTS first_opened_at timestamptz,
  ADD COLUMN IF NOT EXISTS last_opened_at timestamptz,
  ADD COLUMN IF NOT EXISTS open_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS replied_at timestamptz,
  ADD COLUMN IF NOT EXISTS reply_snippet text;

CREATE INDEX IF NOT EXISTS freedom_followup_queue_contact_email_idx
  ON public.freedom_followup_queue (contact_email);

CREATE OR REPLACE FUNCTION public.record_followup_open(_followup_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.freedom_followup_queue
  SET first_opened_at = COALESCE(first_opened_at, now()),
      last_opened_at = now(),
      open_count = open_count + 1
  WHERE id = _followup_id;
$$;

REVOKE ALL ON FUNCTION public.record_followup_open(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_followup_open(uuid) TO service_role;