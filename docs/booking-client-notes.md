# Private client booking notes — implementation and release gate

Base: fresh `origin/main` `e0c691f4129f82cf749581b7600c1dd812f8d48f`.
Worktree: `/root/fi-booking-notes-fix`, branch `fix/client-booking-notes`.
Source-only change: no production writes, deployment, push, real booking or email resend.

## Contract

- Optional, labeled textarea on the booking details step (all session types), 5,000 UTF-16 code-unit browser/server limit. Keep draft on Back and payment errors; clear on Book Another Session. Replay masking attributes are included. Notes are not copied into browser storage or URLs.
- `clientNotes` is a top-level creation input, not attribution, agreement text, PDF metadata, payment description or Zoom data.
- Shared validator rejects non-string, oversized and null-byte input with a generic HTTP 400 before booking/payment/storage/notification work; absent/null/whitespace-only becomes SQL NULL. Nonblank original text, Unicode, whitespace and line endings are preserved, not summarized or stripped.
- Additive nullable `client_notes` columns on `bookings` and `contracts`, each with a 5,000 PostgreSQL-character CHECK (the JS limit is more conservative for surrogate-pair Unicode). No historical backfill: `bookings.notes` remains operational Zoom/lease/conflict state and is not evidence of historical client text.
- Owner booking email renders the independently loaded `client_notes`, escaping HTML and preserving newlines, or explicitly says **No notes provided** for an empty value. No change to recipients. Client emails and all subjects exclude notes.
- Creation responses now explicitly select safe fields rather than returning newly introduced private columns through `.select()`.
- Existing strict-admin RLS/policies and grants are unchanged. Live catalog/RLS verification is a release prerequisite, not established by these local tests.

## Path audit

| Path | Notes behavior |
|---|---|
| `BookingCalendar` free consultation / aftercare | Top-level `clientNotes` → `square-booking/create-booking` → `bookings.client_notes` → confirmation by ID |
| Paid crisis coaching / legacy direct paid checkout | `create-checkout-link` persists notes on pending booking before redirect. Square receives only its existing allowlisted payment fields |
| Readiness Intensive contract checkout | `contracts/create-contract` stages notes in `contracts.client_notes`; browser payment verification and webhook share fulfillment that copies them into the new booking |
| `square-booking/verify-booking-payment` / `fulfill-paid-booking` | Status/payment updates preserve client notes; confirmation reloads stored value |
| `contracts/mark-paid` / `fulfill-paid-contract` | Explicit paid-contract projection includes private notes internally; copy only on insert, never overwrite an existing booking on retry |
| `square-webhook` | Existing narrow status/payment updates retain notes; invokes the same trusted fulfillers. No code change required |
| `lookup-booking` / `reschedule-booking` | Public projections omit notes. Reschedule updates only time/reminder state, and confirmation reloads original notes |
| Confirmation claim, rollback, stale-claim recovery, duplicate handling | Continue operating exclusively on `notes`. `client_notes` is only read for the owner email |
| Abandoned carts / recovery, reminders, followups, weekly summary, CRM, Notion, Mailchimp, Spine | Existing explicit payloads/projections do not acquire client notes; no notes in these paths |
| Signed/paid contract notifications and contract PDF | Remain unchanged; session background is delivered in the owner **booking** notification after fulfillment, not the client agreement |
| Admin booking reads/edits | Existing authorized table access can read the new column; edits use explicit patches and do not clear it. No admin redesign included |
| Booking audit trigger | Records changed-column names, not new notes content. No public notes reader introduced |

## Reproduce local checks

```sh
node scripts/test-booking-client-notes.mjs
python scripts/test-booking-client-notes-db.py
npm run build:client
npx tsc --noEmit -p tsconfig.app.json
npx tsc --noEmit -p tsconfig.node.json
/root/.deno/bin/deno check --no-lock \
  supabase/functions/square-booking/index.ts \
  supabase/functions/contracts/index.ts \
  supabase/functions/send-booking-confirmation/index.ts \
  supabase/functions/square-webhook/index.ts
```

Browser gate (two terminals; fixture values only):

```sh
VITE_SUPABASE_URL=https://fixture.invalid VITE_SUPABASE_PUBLISHABLE_KEY=fixture-only \
  npm run dev -- --host 127.0.0.1 --port 4319 --strictPort
node scripts/test-booking-client-notes-browser.mjs
```

Use installed Playwright Chromium or install with `PLAYWRIGHT_SKIP_BROWSER_GC=1 npx playwright install chromium --only-shell`.

### Executed results

- **19 actual-handler tests passed** with in-memory Supabase and synthetic Square/Zoom/email IO. Covers text/blank/omitted inputs on free, paid and FRI paths; multiline/Unicode/HTML escaping, size/type/null-byte rejection, narrow responses, owner-only rendering, reschedule, duplicate retry, failed-email rollback/recovery, and cryptographically signed synthetic Square webhooks for coaching and FRI.
- **3 rendered mobile browser paths passed**: consultation, coaching, FRI. Real React component; fake network. Verified draft retention on Back, creation payload, mask/label/limit semantics, absence from unrelated requests/browser storage, and reset. No browser JavaScript errors.
- **PostgreSQL 17 delta gate passed** in a unique network-isolated disposable container: pre-existing rows/operational markers unchanged; null default; exact Unicode/multiline storage; operational-update preservation; paid-contract transfer; 5,000 accepted / 5,001 rejected; RLS/policy catalog unchanged. Container/volume removed. This is a minimal-schema migration test, **not full historical migration replay or live Supabase RLS verification**.
- **Production client build and both TypeScript projects passed.** Used `build:client` to avoid unrelated generated sitemap/prerender churn.
- **Deno check passed** for three changed handlers plus the unchanged webhook. No Deno lockfile changed.
- Regression RED established by loading baseline handlers read-only with `AUDIT_BASELINE_REF=e0c691f4129f82cf749581b7600c1dd812f8d48f`: fails because original notes are not persisted.
- Repository lint remains at **56 existing errors / 17 warnings**. ESLint API comparison against baseline verifies identical diagnostics on every changed existing TS/TSX file; new helper is lint-clean. No unrelated lint repair attempted.
- `npm ci` is blocked by pre-existing package/lock mismatch (including Supabase version). Tests used isolated `npm install --ignore-scripts --package-lock=false --no-audit --no-fund`; package and lock files unchanged. Therefore these are not frozen-lock CI results.
- New migration generated with installed Supabase CLI: `20261012205827_add_private_client_booking_notes.sql`. Its prefix is unique and sorts last in this snapshot.

## Authorized deployment still needed

1. Independent review; reconcile newer remote changes before eventual merge. Confirm production schema/migration history and strict-admin-only reads on both tables. No historical client recovery inferred.
2. Apply `supabase/migrations/20261012205827_add_private_client_booking_notes.sql` **before** deploying functions (the new SELECTs require the columns).
3. Deploy `square-booking`, `contracts`, `send-booking-confirmation`, including `_shared/clientNotes.ts`. No webhook code deployment is required by this diff.
4. Publish the frontend separately through the site's normal Lovable release workflow.
5. With explicit authorization, run synthetic live free/coaching/FRI appointments and inspect persisted notes plus the actual delivered owner email, including blank, multiline/HTML-like input and reschedule. Confirm no notes in client emails, subjects, Square, Zoom or analytics. Do not use a real client's record as a test.

Existing owner-email failure handling is unchanged: it logs a failure, while a later duplicate confirmation with an existing Zoom marker skips email. This patch preserves notes but does not redesign notification retry/idempotency. Unsent historical owner messages are not repaired by applying this patch.
