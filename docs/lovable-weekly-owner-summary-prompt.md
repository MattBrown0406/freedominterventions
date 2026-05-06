# Lovable Prompt: Freedom Weekly Owner Email

Deploy the Freedom Interventions weekly owner email backend and schedule it. Supabase is managed inside Lovable.

## Goal

Send Matt a weekly revenue summary email from Freedom Interventions that shows:

- New Freedom leads
- High-intent leads
- Tracked calls
- Consultations
- Paid conversions
- Tracked revenue
- Best source/channel to work first
- Highest-priority leads to call
- Pending follow-ups due

This must not change public pages, assessment submission, booking, contracts, payment, Zoom, or lead capture behavior.

## Deploy Edge Function

Deploy:

`supabase/functions/send-weekly-owner-summary/index.ts`

Set:

```toml
[functions.send-weekly-owner-summary]
verify_jwt = false
```

The function supports two safe access paths:

- Logged-in admin invocation from the Freedom admin Command Center.
- Scheduled cron invocation with the existing `FOLLOWUP_AUTOMATION_SECRET` passed as `x-automation-secret`.

## Required Secrets

Confirm these Supabase secrets exist:

- `SENDGRID_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `FOLLOWUP_AUTOMATION_SECRET`

Optional:

- `OWNER_EMAIL=matt@freedominterventions.com`

If `OWNER_EMAIL` is not set, the function defaults to `matt@freedominterventions.com`.

## Schedule Cron

Create or replace a weekly cron that calls the function every Monday at 6:00 AM Pacific.

Use 13:00 UTC for the current daylight-time schedule:

```sql
select cron.schedule(
  'send-weekly-owner-summary-weekly',
  '0 13 * * 1',
  $$
  select
    net.http_post(
      url := 'https://rizfkjgwhcpwiryyqejx.supabase.co/functions/v1/send-weekly-owner-summary',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-automation-secret', '<FOLLOWUP_AUTOMATION_SECRET>'
      ),
      body := jsonb_build_object('source', 'weekly_cron')
    );
  $$
);
```

Replace `<FOLLOWUP_AUTOMATION_SECRET>` with the actual secret value stored in Lovable/Supabase.

## Verification

After deployment:

1. Call the function without admin auth and without `x-automation-secret`; it should return 401.
2. Call the function with the correct `x-automation-secret`; it should return 200 and send the weekly email.
3. Log in as admin, open Freedom Command Center, and click **Email Summary Now**; it should return success and send the email.
4. Confirm the response includes `window_days`, `totals`, `top_channel`, and `data_issues`.
5. Confirm public forms, booking, contracts, payments, and assessment submission still work.
