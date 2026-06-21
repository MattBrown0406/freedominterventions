-- Schedule drain-spine-outbox to forward queued events to the hub every 5 minutes.
-- Follows the same pg_cron + pg_net pattern as the other scheduled automations.

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'freedom-drain-spine-outbox') THEN
    PERFORM cron.unschedule('freedom-drain-spine-outbox');
  END IF;
END $$;

SELECT cron.schedule(
  'freedom-drain-spine-outbox',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://rizfkjgwhcpwiryyqejx.supabase.co/functions/v1/drain-spine-outbox',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'SUPABASE_SERVICE_ROLE_KEY' LIMIT 1)
    ),
    body := jsonb_build_object('source', 'pg_cron', 'job', 'freedom-drain-spine-outbox')
  );
  $$
);
