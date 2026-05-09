CREATE TABLE IF NOT EXISTS public.freedom_funnel_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  page_path TEXT,
  page_title TEXT,
  referrer TEXT,
  source TEXT,
  target_href TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.freedom_funnel_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Strict admins can view freedom funnel events" ON public.freedom_funnel_events;

CREATE POLICY "Strict admins can view freedom funnel events"
ON public.freedom_funnel_events
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS idx_freedom_funnel_events_event_name
ON public.freedom_funnel_events (event_name);

CREATE INDEX IF NOT EXISTS idx_freedom_funnel_events_page_path
ON public.freedom_funnel_events (page_path);

CREATE INDEX IF NOT EXISTS idx_freedom_funnel_events_created_at
ON public.freedom_funnel_events (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_freedom_funnel_events_metadata
ON public.freedom_funnel_events USING gin (metadata);
