-- Durable, cross-instance rate limiting for public Edge Functions.
CREATE TABLE IF NOT EXISTS public.rate_limit_buckets (
  bucket_key text PRIMARY KEY,
  hit_count int NOT NULL DEFAULT 0,
  window_started_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.rate_limit_buckets ENABLE ROW LEVEL SECURITY;
-- No policies on purpose: only service_role (which bypasses RLS) touches this table.

CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_key text,
  p_max_hits int,
  p_window_seconds int
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_now timestamptz := now();
  v_count int;
BEGIN
  INSERT INTO public.rate_limit_buckets AS b (bucket_key, hit_count, window_started_at)
  VALUES (p_key, 1, v_now)
  ON CONFLICT (bucket_key) DO UPDATE SET
    hit_count = CASE
      WHEN b.window_started_at < v_now - make_interval(secs => p_window_seconds) THEN 1
      ELSE b.hit_count + 1
    END,
    window_started_at = CASE
      WHEN b.window_started_at < v_now - make_interval(secs => p_window_seconds) THEN v_now
      ELSE b.window_started_at
    END
  RETURNING b.hit_count INTO v_count;

  RETURN v_count <= p_max_hits;
END;
$$;

REVOKE ALL ON FUNCTION public.check_rate_limit(text, int, int) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, int, int) TO service_role;
