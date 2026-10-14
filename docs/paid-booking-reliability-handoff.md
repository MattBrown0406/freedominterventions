# Paid-booking reliability — local release handoff

Base: fresh `origin/main` **3e7f3690cabd7b9512a9b03164c0211dfa685caf**.
Worktree: `/root/fi-paid-booking-reliability`, branch `fix/paid-booking-reliability`.
No deployment, push, production writes, real Zoom/email calls, or changes to Rich's booking.

## Demonstrated fixes

- Lovable's OPEN-order fallback existed only in `square-booking`; contracts still required COMPLETED. Both browser handlers and the signed webhook now use `_shared/squarePayment.ts`: fetch current Square order AND payment; require exact IDs/order binding, configured location, USD, exact stored amount, COMPLETED payment and no refund. COMPLETED order alone no longer bypasses refund checks. API failures remain retryable; unrelated merchant events are acknowledged without a provider lookup. Browser re-entry revalidates current payment rather than trusting a confirmed/paid row.
- Existing webhook signature uses the exact raw body and configured notification URL. No credential names or authentication requirements changed. Only `payment.created` and `payment.updated` trigger this flow.
- The old Join URL early-return and swallowed owner-email error stranded notifications. New `booking_deliveries` records separately track the meeting and each recipient. Persist Zoom before sending; retry only unsent recipients, with stable Resend idempotency keys. A busy delivery lease is a retryable failure, not false success.
- Claim RPC is service-only, invoker-security, atomic. Delivery table has RLS and no anon/authenticated grants. Lease-token writes are fenced. Ordinary booking notes and `client_notes` are preserved; old operational Zoom references are replaced. A booking revision increments only when date/time changes, allowing reschedule back to a previously used slot without reusing a deleted meeting or old email status.
- OAuth failures retry safely. Explicit Zoom 401/403/429 creation rejection permits a later retry. Ambiguous Zoom POST failures or lost persistence after provider success are BLOCKED for operator reconciliation, not retried into duplicate meetings.
- Contract booking uniqueness is enforced, not silently skipped. Removed unsafe post-insert duplicate deletion; database reread failures request retry.

## Deployment dependencies / order (NOT performed)

1. Review the local commit and authorize source delivery separately. Do not deploy from the dirty user checkout. Confirm the existing client-notes migration is applied; fresh main already includes that source work.
2. Apply `supabase/migrations/20261014160900_paid_booking_delivery_state.sql` **transactionally before any changed functions**. Verify `bookings.confirmation_revision`, trigger, `booking_deliveries`, grants/RLS and `claim_booking_delivery`. It creates/enforces `bookings_contract_id_uniq`; if historical duplicate contract mappings exist, migration must fail until separately authorized reference-preserving reconciliation. Do not delete bookings automatically.
3. Deploy exactly `send-booking-confirmation`, `square-booking`, `contracts`, `square-webhook`, including shared `bookingDelivery.ts`, `squarePayment.ts`, and `resend.ts`. Existing gateway config remains unchanged. Confirm each function starts, auth rejection works, and deployed revision is this commit. No frontend change is required.
4. Parent separately provisions Square subscription. Verify configured notification URL exactly equals the registered URL and signature key belongs to that subscription. Existing Square token must have order/payment read permissions for the configured location. Do not print credentials.
5. With separate authorization, use synthetic sandbox bookings to verify signed no-browser payment, both browser/webhook orderings, owner failure/retry, and rescheduling. Do not use an actual client's booking as a test. Production integration remains unverified here.

## Recovery / limitations (do not claim closed)

- Square's webhook retries and explicit service-only confirmation/fulfillment calls drive recovery. **No new scheduler or indefinite drain was installed**. Missing webhook delivery, retry exhaustion, and old paid-but-pending records require an authorized reconciliation run. Browser is no longer required when a valid subscribed event arrives.
- Legacy bookings with a Join URL have unknown historical email delivery. Default processing returns `legacyDeliveryUnknown: true` without resending. After inspecting Resend history, an authorized service caller can invoke `send-booking-confirmation` with `{bookingId, recoverLegacy:true, legacyClientNotified:true|false, legacyOwnerNotified:true|false}`. Both booleans are mandatory and mean independently verified acceptance. Owner-only recovery uses `true,false`. This is a real email-sending action; do not run it for Rich or any client without separate authorization.
- `creation_started=true` with no persisted `join_url` needs Zoom reconciliation. Locate the actual meeting, then have an authorized operator repair the exact delivery row; only reset creation_started after verifying no meeting was created. Never clear it blindly.
- Resend keys expire after 24 hours. Pending sends older than 23 hours fail closed for provider-history reconciliation. Provider acceptance is recorded, not inbox delivery; bounces are outside this patch. Payload changes under the same key may require review rather than another send.
- No refund/cancellation/dispute lifecycle synchronization is added. Current refunds block subsequent browser/webhook fulfillment, but do not cancel previously created meetings or change already-confirmed booking status. A refund concurrent with fulfillment is not transactionally locked across Square and Postgres.
- Contract-paid notification, Spine events, slot-conflict alerts and abandoned-cart recovery retain existing best-effort behavior; this patch's durable delivery covers booking confirmation and owner booking emails only. Invalid FRI metadata remains an operator case. Old Zoom deletion is best-effort. A concurrent reschedule during an in-flight email can still require operator review; DB writes check date/time/revision and notes but remote sends are not a database transaction.
- Existing OPEN orders without accessible tender payment IDs can still fail browser verification; the signed webhook's payment ID provides authoritative lookup independently.

## Verification performed locally

- `deno check --no-lock` on all four changed entrypoints.
- `deno test --no-lock --allow-env supabase/functions/paid-booking-reliability_test.ts`: **21 passed, 0 failed**. Imports actual production handlers and shared helpers; provider fetch and Supabase IO are synthetic. Nested webhook → booking/contracts → confirmation invokes execute those real handlers. Runtime tests have **no network permission**.
- Actual disposable PostgreSQL 17: migration applied over a minimal fixture; `supabase/tests/paid_delivery_state.sql` passed privilege, lease, stale-token, reschedule revision, notes, and unique-contract assertions. Two concurrent database sessions produced exactly one claim winner.
- These are migration-delta checks, **not a complete historical migration replay or full application build**. No frontend changes. Supabase project access and deployed schema were not tested.

Reproduce handler tests:

```sh
/root/.deno/bin/deno check --no-lock supabase/functions/{square-webhook,square-booking,contracts,send-booking-confirmation}/index.ts
/root/.deno/bin/deno test --no-lock --allow-env supabase/functions/paid-booking-reliability_test.ts
```

For SQL delta tests use a **new disposable database only**, with Supabase roles present: run `supabase/tests/paid_delivery_fixture.sql`, the new migration, then `supabase/tests/paid_delivery_state.sql` using `psql -v ON_ERROR_STOP=1`. Never apply the fixture to a real application database.

Provider/API references reviewed: Resend `docs/dashboard/emails/idempotency-keys.md` (24-hour keys), Supabase `docs/guides/functions/auth.md` and `changelog.md`. Existing legacy service-bearer authentication is preserved; no auth SDK migration is included.
