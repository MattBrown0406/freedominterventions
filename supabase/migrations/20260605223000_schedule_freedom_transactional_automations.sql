-- Schedule Freedom Interventions transactional automations.
-- These jobs call Edge Functions with the service-role JWT from vault, so they are not
-- dependent on a human clicking "Run" in the admin dashboard.

CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Avoid duplicate jobs if this migration is re-applied in a branch/db refresh.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'freedom-process-followups-every-30m') THEN
    PERFORM cron.unschedule('freedom-process-followups-every-30m');
  END IF;
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'freedom-booking-reminders-hourly') THEN
    PERFORM cron.unschedule('freedom-booking-reminders-hourly');
  END IF;
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'freedom-abandoned-cart-recovery-hourly') THEN
    PERFORM cron.unschedule('freedom-abandoned-cart-recovery-hourly');
  END IF;
END $$;

SELECT cron.schedule(
  'freedom-process-followups-every-30m',
  '*/30 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://rizfkjgwhcpwiryyqejx.supabase.co/functions/v1/process-freedom-followups',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'SUPABASE_SERVICE_ROLE_KEY' LIMIT 1),
      'x-automation-secret', COALESCE((SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'FOLLOWUP_AUTOMATION_SECRET' LIMIT 1), '')
    ),
    body := jsonb_build_object('source', 'pg_cron', 'job', 'freedom-process-followups-every-30m')
  );
  $$
);

SELECT cron.schedule(
  'freedom-booking-reminders-hourly',
  '5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://rizfkjgwhcpwiryyqejx.supabase.co/functions/v1/send-booking-reminder',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'SUPABASE_SERVICE_ROLE_KEY' LIMIT 1)
    ),
    body := jsonb_build_object('source', 'pg_cron', 'job', 'freedom-booking-reminders-hourly')
  );
  $$
);

SELECT cron.schedule(
  'freedom-abandoned-cart-recovery-hourly',
  '15 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://rizfkjgwhcpwiryyqejx.supabase.co/functions/v1/recover-abandoned-carts',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'SUPABASE_SERVICE_ROLE_KEY' LIMIT 1)
    ),
    body := jsonb_build_object('source', 'pg_cron', 'job', 'freedom-abandoned-cart-recovery-hourly')
  );
  $$
);
