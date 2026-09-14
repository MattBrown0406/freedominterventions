# Central attribution — controlled release

**Main integration authorized; not published or remotely deployed.** The user explicitly requested pushing main before running the migration. Backend access to Freedom's project `rizfkjgwhcpwiryyqejx` previously returned HTTP 403; no production migration or Edge deployment was performed by this release. The exact Lovable project is `dcb1167a-1709-40df-a59a-3f779d6703f9`. Until the central RPC is available, an exact `PGRST202` missing-`public.get_central_attribution` response displays a configuration notice and the unchanged original Attribution component. Permission/JWT/network/other SQL errors do not trigger fallback. Retry switches to the aggregate view once the RPC succeeds. Main synchronization is not publication.

## Contract

The central aggregate view reads only `get_central_attribution`; the temporary legacy fallback retains the original FI operational queries and their existing permissions, behind the existing admin route. SQL independently requires the existing `is_strict_admin()` helper (server Auth identity, admin role and exact approved email), not user-editable metadata. No Google credentials or service-role keys enter React. Tables have RLS, admin SELECT only, service-only ingestion, constrained metric/brand/channel values and no free-form payload column.

`collect.py` uses the *running worker's* called-number map and read-only SQLite projection. It requests only called business number, call time, and six Boolean operational measures. No caller ID, event payload, reason, intent, transcript, recording, CRM identity or case detail leaves SQLite. Counts are per persisted call; repeated events inside one call count once. UTC timestamps are converted to Pacific dates. Missing called numbers remain unknown. This is worker-arrival coverage, not all carrier attempts.

LiveKit's current announce-then-bridge flow allows a human **or voicemail** to answer. `warm_transfer_bridged` proves bridge completion, not that Matt personally answered or a voicemail was left. Website phone clicks are not calls. No call/visitor joins or unique-person totals are calculated.

GA4 uses existing `/opt/seo-ctr` read-only OAuth and request retry helpers. Properties: Freedom 545973139, Sober Helpline 545963354, NME 545966789. Queries request only date, sessions, engagedSessions with All/Organic/exact ChatGPT filters. Every requested day is emitted after complete provider rowCount/timezone validation. No users, URLs, queries, arbitrary campaign labels or events are requested. Other properties are explicitly not connected. Existing consent status is unverified; no new tracking is added.

Each successful feed snapshot contains a full fixed daily matrix. Database uniqueness plus advisory transaction locks and observed_at ordering make retries idempotent and reject stale overwrites. A rolling 28-day recomputation catches late call events within that window. No historical rows are deleted. Source failures preserve last-known data and update status; coverage and last-success timestamps stay visible. Reconciliation outside the bounded window requires a reviewed run (maximum 90 days).

## Local commands

```
/usr/local/lib/hermes-agent/venv/bin/python3 scripts/central-attribution/collect.py --days 28 --output /root/central-attribution-dashboard/source-aggregates.json
python -m unittest discover -s scripts/central-attribution -v
npx deno@2.9.6 test --allow-env supabase/functions/attribution-ingest/index_test.ts
npx tsc --noEmit -p tsconfig.app.json
node scripts/central-attribution/test-dashboard-fallback.cjs
npm run build:client
```

Database tests target only disposable DB `central_attribution_qa` in an existing local PostgreSQL 17 container. Initialize the test Auth/helper baseline from the accompanying evidence bootstrap SQL and apply the new migration. This is migration-delta validation, **not** proof of clean replay of the entire historical FI chain. No production users are created for tests. Browser QA used an intercepted RPC and an actual read-only aggregate snapshot; it was explicitly labeled LOCAL QA.

## Release order — requires FI project authorization

1. Verify access and authoritative current production schema/helper definitions, migration history and grants on the exact project. Reconcile latest main and run full-chain migration validation against a schema-only isolated environment. Never use broad `db push` to apply unrelated pending migrations.
2. Apply only the reviewed additive migration; verify catalog RLS/grants and anonymous, ordinary-user and strict-admin behavior on the actual target.
3. Generate a random high-entropy `ATTRIBUTION_INGEST_SECRET` through approved secret tooling. Store it only as an Edge secret and mode-0600 host EnvironmentFile. No browser secret, source-code value or chat paste. Deploy `attribution-ingest` separately. JWT gateway is disabled because this is machine HMAC authentication: timestamp + exact body SHA-256 signature, five-minute validity, body limit, fixed target and SQL service-only privileges. It is **not** a LiveKit provider webhook; existing voice/webhooks stay untouched.
4. Run the collector with `--push` and the environment secret. Read back the exact daily keys/values and statuses via an authorized admin API, not merely HTTP success. Compare with local aggregate output. Exercise signed request, tampering, stale replay, source failure, and new/late snapshot cases end to end.
5. Install the included narrowly scoped hourly service/timer only after successful live read-back; verify timer state and one actual scheduled run. Do not edit the existing Monday SEO jobs. Units are templates and have **not** been installed/enabled.
6. Source integration to main is authorized before the migration with the temporary legacy fallback. Only after backend verification and full build/admin QA, use Lovable **Share → Publish** on the exact project. Verify the authenticated `/admin` Attribution tab, phone business filters, 7/28/custom date windows, coverage, and desktop/mobile/keyboard behavior live. User-applied SQL does not deploy the Edge function, provision secrets, or start collection.

## Remaining limitations and separate integration work

- Existing FI CRM/assessment/booking/contract/contact/follow-up records are not copied into these aggregates without production schema/access verification. Operational tabs remain in the app. This branch does not claim unified leads, registrations, bookings or revenue yet.
- Existing Cross-Site Revenue tab fetches configured reports directly from the browser using a stored report secret. Do **not** reuse that pattern. FI code exposes an `admin_command_center_settings` configuration; SH and NME have `sober-helpline-revenue-report` / `nme-revenue-report` functions. Their actual production connection state and safe output contract require authorized verification before building server-only adapters.
- Party Wreckers GA4 property access is unknown (prior GSC 403 is not GA4 evidence). FamilyBridge and AyudaSobria are included in the phone map and coverage cards, but their web analytics/operational feeds are not verified.
- Historical website consent/URL minimization remains a separate release gate. Direct admin/admin-login/family-portal loads skip GA4/Clarity initialization and route/custom tracking calls. A public-to-private SPA transition now forces a fresh document before mounting private screens; the local browser verified reload and absent tracker scripts. This is private-screen isolation, not a complete sitewide consent/privacy fix.
- npm ci fails because main's manifest and lockfile are already inconsistent. `npm install --no-package-lock --ignore-scripts` was used without lockfile changes. npm reports existing dependency vulnerabilities; no forced upgrades were made.
- The initial feature-branch prerender exceeded its execution window. The main-integration rerun completed successfully with existing Chromium on a dedicated available preview port: full `npm run build`, 406 prerendered routes including 177 blog posts. TypeScript, 12 collector tests, 7 Edge authentication tests and 8 fallback component-contract tests passed. Live authenticated QA and full historical migration-chain validation remain outstanding; generated build/sitemap artifacts are not part of the main source commit.
