# Consent-only next-step follow-up relay

This dedicated service receives optional follow-up requests from the three public
`/next-step` guides and delivers them to Matt's configured Telegram chat. It does
not use existing contact endpoints because those may enqueue marketing or CRM
follow-up sequences. No Supabase schema, mobile app, or existing contact automation
is changed.

## Visitor contract

- No relay call while using the guide. Opening the form requests a signed spam-protection token only.
- Name, selected phone/email contact, and optional note are sent only after explicit submit and required contact consent.
- Guide choices require a second, unchecked-by-default opt-in. The form previews the exact shared text; the API rejects guide content without consent.
- Clear unsent fields on cancel, guide Back/reset, navigation, and refresh. Already delivered messages are not retracted.
- No email/newsletter signup or automated follow-up sequence. The receiving business is identified as Matt Brown at Freedom Interventions for all brands.
- Telegram inbox delivery is not confirmation Matt has read or acted on a request. The form is not an emergency service and makes no response-time promise.

## Service

Public HTTPS: `https://followup.187.77.196.68.sslip.io`

- `GET /health`: service identity and configured readiness, no sensitive values.
- `POST /v1/challenge`: exact allowlisted Origin; short-lived signed token bound to origin and hashed client peer.
- `POST /v1/follow-up`: validated, consented contact request. Success only after Telegram echoes the expected chat, exact text, and message ID.
- No public read/list/admin interface; no publicly bound Docker host port.
- One container, non-root UID 10001, read-only image, restricted capabilities, persistent rate/idempotency state.
- Anti-abuse controls: 8KB body limit, bounded fields, honeypot, 2-second minimum form age, 15-minute token validity, 30 challenge/attempt requests per IP per hour, 5 sends per IP/hour, 100 sends/day globally. These are spam controls, NOT proof a visitor is human. CORS is not authentication.
- Traefik must be the only public ingress. `TRUST_PROXY=1` uses the rightmost proxy-appended X-Forwarded-For entry, never the caller-controlled leftmost entry.
- SQLite stores keyed request digests, random IDs, state/message IDs, and hashed-peer rate counters only. No contact details, notes, or guide text are persisted by the relay. Metadata older than seven days and expired rate counters are pruned on subsequent database use. Telegram retains submitted messages under its own retention rules.
- Unknown provider outcomes do NOT automatically retry. Same-token replay returns success only for a confirmed delivery; ambiguous/sending states return an honest error. Known provider rejection permits a same-body retry.
- Access logging is disabled; application error handling never logs payloads or secret-bearing provider URLs.

## Deployment

Canonical source: this directory in the Freedom Interventions repository.

Secrets (outside Git): `/root/.hermes/secrets/next_step_followup.env`
Required names: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `FOLLOWUP_SECRET` (32+ chars).
Data directory: `/root/next-step-followup-data`, owned by 10001:10001, mode 0700.
Do not print expanded Compose configuration; it includes secrets.

```sh
docker compose -p next-step-followup build
docker compose -p next-step-followup run --rm --no-deps -e DATA_DIR=/tmp/test -e TRUST_PROXY=0 followup-relay python -m unittest -v test_app
docker compose -p next-step-followup up -d
curl --fail https://followup.187.77.196.68.sslip.io/health
```

Verify source hashes inside the running image after deployment. Keep the dedicated
env file if rotating the Telegram bot token; changing Hermes's env alone does not
update this container. To roll back, deploy the previously verified image/source;
do not delete the rate/idempotency volume.

## Verification and website release

Backend: `python -m unittest -v test_app` (uses synthetic data and mocked Telegram).
Frontend: each site has `scripts/test-followup.mjs URL fi|nme|sh`; all requests to the
relay are mocked in that suite. Existing `test-next-step.mjs` continues proving
ordinary guide use makes no submission or backend call. Use production Vite builds
for CSS/print and dynamic import isolation, not only dev mode.

One real HTTPS test used the locally built Freedom bundle under its intended
browser origin and the live relay. Telegram notification and duplicate suppression
were verified; no real client's data was used. The public website bundle remains a
separate Lovable Share → Publish operation. A working relay is not proof that the
form is visible on any public site.
