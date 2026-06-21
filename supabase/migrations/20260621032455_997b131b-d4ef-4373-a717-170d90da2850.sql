
CREATE TABLE public.spine_outbox (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  payload jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  attempts int NOT NULL DEFAULT 0,
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  sent_at timestamptz
);

GRANT ALL ON public.spine_outbox TO service_role;

ALTER TABLE public.spine_outbox ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_spine_outbox_pending ON public.spine_outbox (status, created_at) WHERE status IN ('pending','failed');
