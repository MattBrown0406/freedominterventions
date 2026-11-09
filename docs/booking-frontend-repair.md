# Booking frontend regression gates

These are frontend-only repairs. No database/function deployment is included.

## Local verification

Install the repository's locked dependencies, build, and serve the built app on loopback. Tests intercept **all** external requests; provider data and reads are synthetic. The recovery-record Next test (SH mode only) fulfills a synthetic POST inside Playwright, never forwards it. No checkout, email, meeting, or real booking is created.

```sh
npx tsc -p tsconfig.app.json --noEmit
npm run lint
npm run build
npm run preview -- --host 127.0.0.1 --port 4311
# In another terminal; CHROMIUM can select an installed unconfined browser.
SITE=fi ORIGIN=http://127.0.0.1:4311 EVIDENCE=/path/to/evidence CHROMIUM=/path/to/chrome node tests/booking-browser.mjs
TZ=UTC node tests/booking-summary.mjs
for zone in UTC America/Los_Angeles America/New_York Europe/London; do TZ="$zone" node tests/booking-time.mjs; done
```

The browser matrix covers 320/390/768/1024/1440px, holiday click, repeated same-page consult, native hash and query-only navigation, all four offers, query attribution preservation, UTC date rollover, both US DST transition days across four viewer zones, availability HTTP/network failures, successful empty results, and retry. Summary tests render the actual component (UI primitive doubles; effects disabled) in details/agreement/payment/confirmation states. Time tests additionally cover London's DST transition days and nonexistent spring-forward wall time. This is not a payment or notification delivery test.

The booking component owns scroll/focus **after its own mount**: a global hash handler can find an outgoing route's calendar and focus an element that is about to disappear. Recovery date/time links now recheck availability and ask the visitor to choose a returned time, rather than bypassing a failed read. Only consumed booking query keys are cleared; attribution and unrelated parameters survive.

The canonical provider date/time remains unchanged in backend payloads. Visible summaries and generated agreement metadata derive both date and time from the same appointment instant, with separately labeled Pacific provider time. Confirmation rendering is tested, but real payment-return verification and fulfillment remain separate release gates.

Full-repository lint has existing errors outside this delta; compare against the pinned main baseline rather than disabling rules. If prerender cannot find Playwright's bundled browser, use the repository's `PLAYWRIGHT_CHROME_PATH` override and inspect the final prerender count, not just npm's exit status.
