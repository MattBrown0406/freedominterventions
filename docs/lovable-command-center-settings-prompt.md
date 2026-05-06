# Lovable Prompt: Freedom Command Center Settings

Apply the new Freedom Interventions backend migration that creates durable admin-only settings for the Command Center.

## Migration

Apply:

`supabase/migrations/20260506160000_add_command_center_settings.sql`

This creates:

- `admin_command_center_settings`
- `remote_sites jsonb`
- `openclaw_numbers jsonb`
- strict-admin-only RLS for all reads/writes

## Verification

After applying the migration:

- The Freedom admin Command Center should be able to save report URLs/secrets and OpenClaw numbers using the **Save Settings** button.
- The same admin user should be able to reload those values with **Load Saved**.
- Non-admin users should not be able to read or update `admin_command_center_settings`.
- Do not change public pages, forms, booking, contracts, payment, email, or assessment behavior.

No edge function is required for this step.
