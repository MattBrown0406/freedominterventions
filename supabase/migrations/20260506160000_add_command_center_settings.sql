CREATE TABLE IF NOT EXISTS public.admin_command_center_settings (
  id text PRIMARY KEY DEFAULT 'default',
  remote_sites jsonb NOT NULL DEFAULT '[]'::jsonb,
  openclaw_numbers jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_command_center_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Strict admins can manage command center settings" ON public.admin_command_center_settings;
CREATE POLICY "Strict admins can manage command center settings"
ON public.admin_command_center_settings
FOR ALL
TO authenticated
USING (public.is_strict_admin())
WITH CHECK (public.is_strict_admin());

DROP TRIGGER IF EXISTS set_admin_command_center_settings_updated_at ON public.admin_command_center_settings;
CREATE TRIGGER set_admin_command_center_settings_updated_at
BEFORE UPDATE ON public.admin_command_center_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
