# Freedom booking maintenance gate — SOURCE ONLY handoff

## Status and boundaries

Implementation candidate, **independent review and explicit maintenance-window approval required before use**. Nothing here authorizes deployment, a main merge/push, live payments, meetings, emails, or record repair. No frontend/banner/form change. Correct Square webhook is **ACTIVE according to the user**; retain it. Do not modify the disabled incorrect subscription `wbhk_da06ce4a595540899a865128a6d33079`. Never touch recovered booking `9160a31c-3f14-496e-b61b-331903d49e5f` as a test or reconciliation target.

Fresh fetched main: `54660ab7ea207e1e76780cf310738a3fa85c8111`.
Guard-only stage: branch `fix/booking-maintenance-legacy`, commit `1e67e95`.
Guarded final stage: branch `fix/booking-maintenance-final`; exact commit is in the accompanying manifest. Final stage ports the selected reliability files from `d984d6253fab5c94adfedcd2ffdf7e207c7fe221` onto fresh main, preserving main's existing Drizzle migration, snapshots, types and historical Supabase notes migration. It does NOT merge/delete that history or import the temporary unconditional-503 replacement entrypoints.

## Independently checked official documentation (2026-10-14)

- Supabase hosted worker lifetime: Free 150 seconds / paid 400 seconds wall clock. A worker can serve multiple requests and background tasks. Request-idle 150 seconds is NOT worker lifetime: https://supabase.com/docs/guides/functions/limits.md
- Background tasks remain bounded by worker limits, even after the HTTP response: https://supabase.com/docs/guides/functions/background-tasks.md
- Deployment documentation describes successful deployment and worldwide distribution; it does **not** specify an atomic global cutover, propagation upper bound, or an active-execution inventory: https://supabase.com/docs/guides/functions/deploy.md
- Square non-2xx/no timely response retries have a finite horizon (up to 24 hours from the originating event, exponential backoff, then discarded), not unlimited retention: https://developer.squareup.com/docs/webhooks/overview
- Supabase changelog inspected; forthcoming TLS cipher restriction is unrelated to this gate: https://supabase.com/changelog/cbc-tls-ciphers-deprecated

**Platform assumption, not independently established guarantee:** Lovable reports that deployment swaps new requests to the new revision. This plan pragmatically relies on that behavior plus the actual host's maximum worker lifetime, operator deployment/version evidence, and provider reconciliation. This is a bounded operational assumption, NOT formal proof of an all-region drain. Do not silently apply Supabase-hosted 400 seconds to a different Lovable/self-hosted runtime: confirm the actual execution host, plan/limits and any override first. If Lovable cannot confirm the applicable maximum lifetime or deployment cutover completion, get that bounded fact from platform support before scheduling the window; no infinite execution-inventory exercise is required.

## Gate design / failure policy

Only new table: `public.booking_maintenance_control`, singleton `id=true`, boolean `enabled=false` by default. RLS enabled, no public policies, PUBLIC/anon/authenticated privileges revoked. `service_role` has SELECT only (not UPDATE/INSERT/DELETE/TRUNCATE); owner SQL toggles the flag. No HTTP toggle endpoint or request/header/query override exists.

All non-OPTIONS business paths in `contracts`, `square-booking`, `square-webhook`, `send-booking-confirmation` are gated, including reads, checkout creation/payment-return verification, fulfillment, reschedule, direct service calls and nested calls. Whole-entrypoint gating intentionally avoids a fragile per-action allowlist; availability/lookup calls also return 503 during hold. This is a booking-endpoint hold, not a whole-site shutdown. Existing external Square checkout links can still be paid; those payments need later reconciliation.

- Fresh primary API read on each request, selecting only `enabled`; no local cache. Only explicit boolean false permits work.
- True, missing/malformed row, SQL/PostgREST error, client-construction exception or 3-second read timeout: generic 503, `Retry-After: 60`, no-store, no business/provider calls.
- OPTIONS stays 200 with stage marker and no DB/provider calls. It is not an accepted webhook event.
- Square method/signature verification remains before gate; invalid/missing signature is 401, unavailable verification configuration 500. Valid held events return 503 **even if otherwise ignorable**, never maintenance 200.
- Confirmation service-role authorization remains before gate; unauthorized request stays 401. Booking/contracts action-specific authorization remains unchanged inside its existing action, after admission. A hold returning 503 instead of running that auth does not authorize anything.
- `X-Booking-Gate-Build` on OPTIONS/held replies identifies `booking-gate-legacy-v1` vs `booking-gate-reliability-v1`. It identifies sampled function code, not global routing or schema readiness. Combine it with deployment revision IDs and exact bundle/commit evidence.
- A request already past the read can finish after toggle; no cancellation/fencing of admitted legacy requests is claimed. Provider IO already sent may finish after the worker dies. Nested invocations read again; a parent can have committed payment/booking state before a held child fails. Reconcile these partial states.
- Runtime service-role credentials are read-only for this control, but privileged SQL operators can change it. Freeze manual/admin SQL writers and verify any other scheduled/direct booking or provider writers are paused or out of scope during the window. Four guarded functions do not protect arbitrary external writers.

## Staged operator procedure (not executed)

Record UTC times and monotonic elapsed measurements; keep deployment changes frozen except these stages. Keep the correct Square webhook active and signature configuration unchanged. Define a short maintenance window and a reconciliation owner; alert well before the oldest pending event approaches Square's retry horizon.

1. **Preflight/review.** Independent review both patches, read actual deployed revision IDs for all four functions, confirm source artifacts readable, confirm host maximum lifetime `L`, cutover semantics, exact project, current schema/history, configured internal auth and runtime service-role SELECT. Preserve current revisions for rollback. Record baseline Square payment backlog and narrow affected booking IDs (excluding recovered booking above). Identify cron/admin writers and disallow competing deployment/rollback. Approve the outage separately.
2. **Apply only control migration** `supabase/migrations/20261014182908_booking_maintenance_control.sql`. It defaults OFF, so no planned hold yet. Verify exact singleton false, RLS and grants. This migration intentionally errors if already applied; inspect history/table instead of blindly rerunning or overwriting an enabled flag. Do not run unrestricted `db push`: live client-notes columns were already applied through Drizzle; historical non-idempotent constraints must NOT be replayed, renamed or deleted.
3. **Deploy guard-only legacy stage to all four functions**, including shared dependency, while OFF. Do not deploy final ledger-aware code yet. Record per-function source revision/bundle and platform deployment completion. Use harmless OPTIONS checks for stage header, not real booking requests. No function's missing gate can be masked by another function's 503.
4. **Enable hold** with owner SQL below, then perform a separate committed readback. Record `T_hold_readback` and the latest confirmed guard deployment cutover `T_guard`. Check all four held responses (only approved synthetic no-effect probes; no real event/booking). Invalid webhook signature must still be 401; approved valid signed synthetic event must be 503. If probes are not authorized, use deployment evidence plus the local tests, explicitly record the lack of a live held-response probe. Do not pretend OPTIONS verifies the DB read.
5. **First bounded wait:** from `max(T_guard, T_hold_readback)`, measure elapsed time strictly greater than `L + agreed operational margin`. Example only after confirmed hosted paid bound: `L=400s`, margin 60s, require elapsed **greater than 460s**. This covers unguarded workers started before the assumed cutover and requests admitted before hold. Track actual elapsed, not a nominal sleep. Deployment changes, unexpected old-stage arrivals or evidence contradicting routing reset the boundary and require reassessment. No provider work is allowed just because the timer expired.
6. **Reconcile provider ambiguity while held.** Narrow window includes pre-hold in-flight work and queued paid events. Read Square current payment/order/refund state, Zoom meeting IDs/history and Resend acceptance/message records **per recipient and occurrence**. Worker exit, absent logs, a DB Zoom URL, or legacy notes are not proof that all owner/client emails were accepted or not accepted. Unknown outcome remains unknown; don't clear markers, recreate meetings, mass-resend, or declare handled. If providers cannot establish outcomes, isolate those bookings for explicit manual resolution before reopening; do not automatically replay them. Compare payment backlog against DB fulfillment; include preexisting paid orders whose callbacks failed mid-hold. Reconciliation mutations require separate approval and verified exact records; this handoff supplies no bulk repair SQL.
7. **Apply only unapplied reliability delta** `supabase/migrations/20261014160900_paid_booking_delivery_state.sql` while held, checking production migration history first. The filename predates the control migration: use explicitly scoped approved SQL/history recording, not a wholesale chronological migration replay. Verify ledger/claim/trigger/RLS and notes preservation. Do not reapply already-live notes migrations. No historical record is automatically marked emailed based on a link.
8. **Deploy final guarded handlers/shared dependencies to all four functions**, while flag remains true. Confirm exact final commit/bundles, each deployment revision ID, OPTIONS `booking-gate-reliability-v1`, flag true readback and approved valid held response if authorized. Do not assume deploying one function atomically updated the others.
9. **Second bounded wait before reopen:** measure more than `L + margin` from the latest confirmed final-stage cutover, while the flag stays true. Otherwise an old guard-only worker could receive/serve requests after reopening and ignore the new ledger. This second wait is essential even if the first wait/reconciliation passed. Repeat provider/backlog review if new evidence appears; preserve unresolved claims. If source revision/cutover cannot be confirmed, leave held and resolve that specific uncertainty.
10. **Reopen** only after schema/four-function stage checks, both measured waits, reconciliation disposition, independent review and release approval: owner UPDATE false, separate committed readback, then monitor natural traffic/retry outcomes. No new live payment/Zoom/email test is authorized by this document. Browser callers are not guaranteed to retry automatically; track affected clients/bookings for authorized follow-up. Square retry expiry or uncertain acceptance requires explicit operator handling, never a claim that no events can be lost.

### Exact owner SQL (run only after release approval)

```sql
-- Enable; execute and commit this first (not inside a read-only transaction).
UPDATE public.booking_maintenance_control SET enabled = true WHERE id = true
RETURNING id, enabled;
-- Expected exactly one row. Then a NEW request/transaction:
SELECT id, enabled, clock_timestamp() AS observed_at
FROM public.booking_maintenance_control WHERE id = true;
-- Must be exactly one row, enabled=true. Save timestamp and elapsed boundary.

-- Reopen only at step 10; execute/commit, then NEW request readback:
UPDATE public.booking_maintenance_control SET enabled = false WHERE id = true
RETURNING id, enabled;
SELECT id, enabled, clock_timestamp() AS observed_at
FROM public.booking_maintenance_control WHERE id = true;
```

Do not execute both toggle sections as one script. Readback SELECT for a toggle must be a separate request after commit, not just the UPDATE RETURNING. An absent row is an incident (fail closed), not permission to insert false automatically.

```sql
-- Read-only ACL evidence, no secrets or booking data:
SELECT relrowsecurity FROM pg_class
WHERE oid = 'public.booking_maintenance_control'::regclass;
SELECT grantee, privilege_type FROM information_schema.role_table_grants
WHERE table_schema='public' AND table_name='booking_maintenance_control'
ORDER BY grantee, privilege_type;
SELECT count(*) AS control_rows, bool_and(enabled) AS held
FROM public.booking_maintenance_control;
```

### Failure / rollback

Any deployment/schema/provider uncertainty: leave/set flag true and read back. Never rollback to an unguarded function or drop the control to restore access; missing schema intentionally causes 503. Keep a known guarded, held revision. Once ledger-aware code has run, do not reopen guard-only legacy code against partially migrated data: retain the gate and roll forward or prepare a separately reviewed compatible rollback. Gate read outage is an intentional availability loss; diagnose DB/auth/schema and restore explicit false only after safety checks, not a request-header bypass. Do not disable the valid Square subscription to simulate maintenance.

## Files and verification

Stage 1: four `supabase/functions/{contracts,square-booking,square-webhook,send-booking-confirmation}/index.ts`; shared `bookingMaintenance.ts`; control migration; `booking-maintenance_test.ts`; `scripts/test-booking-maintenance-db.py`.
Stage 2: final four handlers, shared `bookingMaintenance.ts`, reliability `bookingDelivery.ts`, `squarePayment.ts`, `resend.ts`; reliability migration/tests and `scripts/test-paid-dispatch-concurrency.py`, `scripts/test-reschedule-dispatch-ui.mjs`; this handoff. No frontend source changed.

Executed locally:
- Guard-only: **31 Deno tests passed** with type checking; covers all declared actions and future action, fresh flag read, malformed/missing/error/throw/timeout, signed/unsigned webhook, service auth, OPTIONS and zero provider IO on held admission.
- Final guarded reliability: **58 Deno tests passed** (31 gate + 27 reliability), type checked. Includes paused admitted Zoom IO continuing after hold, blocked new request, and parent webhook partial commit with held nested fulfillment returning retryable failure. Synthetic DB/provider IO only, no network permission for test execution.
- Maintenance DB migration delta: **19 PostgreSQL assertions passed** for default, singleton, RLS, anon/auth/service privileges and owner toggles; rerun on both stages in disposable own containers.
- Final reliability: **10 PostgreSQL gates passed**, including actual lock waits, stale snapshots, ambiguity, claim expiry and SQL privilege/revision assertions. Synthetic empty database, not production data/full historical migration replay.
- Actual extracted reschedule UI callback test passed; no frontend changed. `git diff --check` passed.

Commands:
```sh
deno test --no-lock --allow-env --allow-read --allow-import supabase/functions/booking-maintenance_test.ts
# final stage adds:
deno test --no-lock --allow-env --allow-read --allow-import supabase/functions/paid-booking-reliability_test.ts
python scripts/test-booking-maintenance-db.py
# disposable loopback PostgreSQL ONLY; psycopg installed in separate test venv:
PAID_TEST_DSN='<local disposable DSN>' python scripts/test-paid-dispatch-concurrency.py
node scripts/test-reschedule-dispatch-ui.mjs
```

Not established: live host maximum/overrides, global cutover guarantee, production migration/schema/grants/version readback, provider history/acceptance, retry delivery, live integration or independent review. These are operator/review prerequisites, not silently completed checks.
