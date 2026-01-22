-- Create call_analytics table to track phone click events
CREATE TABLE public.call_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  page_url TEXT NOT NULL,
  page_path TEXT NOT NULL,
  phone_number TEXT NOT NULL DEFAULT '541-838-6009',
  referrer TEXT,
  user_agent TEXT,
  screen_width INTEGER,
  screen_height INTEGER,
  device_type TEXT,
  session_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.call_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for tracking clicks from non-authenticated users)
CREATE POLICY "Anyone can log call clicks"
  ON public.call_analytics
  FOR INSERT
  WITH CHECK (true);

-- Only strict admins can view analytics
CREATE POLICY "Only strict admins can view call analytics"
  ON public.call_analytics
  FOR SELECT
  USING (is_strict_admin());

-- Prevent updates and deletes
CREATE POLICY "No updates to call analytics"
  ON public.call_analytics
  FOR UPDATE
  USING (false);

CREATE POLICY "No deletes from call analytics"
  ON public.call_analytics
  FOR DELETE
  USING (false);

-- Add index for common queries
CREATE INDEX idx_call_analytics_created_at ON public.call_analytics(created_at DESC);
CREATE INDEX idx_call_analytics_page_path ON public.call_analytics(page_path);

-- Add comment
COMMENT ON TABLE public.call_analytics IS 'Tracks phone number click events for conversion analytics. Anonymous inserts allowed, read access restricted to strict admins.';