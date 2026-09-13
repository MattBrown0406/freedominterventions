# Western service-area navigation — 2026-09-13

Status: source change; public publication must be confirmed separately in Lovable.

## Change

`src/pages/Interventionist.tsx` adds `WesternServiceAreas`. The component adds a visible, keyboard-accessible navigation section linking existing `/oregon`, `/washington`, `/idaho`, `/california`, `/nevada`, `/arizona`, `/utah`, `/portland-oregon`, `/bend-oregon`, `/spokane-washington`, `/boise-idaho`, and `/service-areas`.

Before: profile body had one contextual Oregon link and no comparable western-state/city navigation. After: one state/city navigation section. No page titles, H1s, medical body text, schema, canonical rules, routes, forms, phone numbers or backend code changed. These are service-area links, not claims of physical local offices.

## Evidence

Final GSC web data: Aug 15–Sep 11 versus Jul 18–Aug 14; baseline Jun 14–Sep 11 (90 days), collected Sep 13. All countries/devices. Raw request/response artifacts: `/root/pnw-seo-improvements/evidence/` (outside Git).

- `interventionist oregon` → `/interventionist`: 121 impressions, position 9.25; previous 109/3.32; baseline 337/5.73. `/bend-oregon` also appears (60/42), but overlap alone is not proof of harmful cannibalization. Desktop position also worsened (3.32 to 9.28), so mobile mix alone does not explain the decline.
- `interventions in boise` → `/boise-idaho`: 152 impressions, position 11.97; previous 145/11.16; baseline 326/11.52.
- `drug intervention spokane wa` → `/spokane-washington`: 64 impressions, position 49.83. `interventionist washington` primarily lands on `/interventionist` (88/64.70).
- `interventionist nevada` → `/nevada`: 47 impressions, position 22.47.
- `interventionist arizona` → **www** `/arizona`: 42 impressions, position 40.38.
- `drug intervention utah` → **www** `/utah`: 53 impressions, position 67.77. Provo's narrow query has 8 impressions at 8.25: preserve rather than overfit.
- California: no strong state-query sample; state URL inspection says discovered, not indexed. Arizona and Utah non-www inspections have the same status despite www query-page impressions. Strengthen canonical destination discovery; investigate host selection rather than inventing a ranking cause.

GSC query rows suppress private/rare queries. Zero reported query clicks is not zero site traffic. Page-level impressions cannot be summed as property impressions.

## Cooldowns and next review

This is one navigation experiment. `/interventionist` was already changed Aug 31; Boise metadata Aug 24; several state bodies Aug 2. Metadata cooldown: at least 28 days; body cooldown: at least 60 days. No metadata/body rewrites in this release. Observe navigation after verified publication for a stable 28-day window; tomorrow's existing job can collect and inspect other opportunities, not evaluate this as an overnight ranking result. No new job or scheduler changes made.

Sober Helpline remains unchanged. Its Nevada family-support page has a real secondary opportunity, but intervention-heavy queries, existing family-support positioning, and unsupported health/local-business claims merit human review before another copy experiment. Do not duplicate Freedom's intervention pages there.

## Verification

`node scripts/test-western-service-areas.mjs` against a local production preview checks all seven states, four city routes, twelve navigation anchors, canonical/robots/H1/title/schema, phone links, booking-route navigation, and no overflow at 390/768/1280px. External requests are blocked; no personal data or real form submission occurs.

Build installs required `npm install --no-package-lock` because the existing lockfile is out of sync. Keep package files unchanged. Full prerender must use a free `PRERENDER_PREVIEW_PORT`: the default 4274 is occupied on the VPS and the script can silently crawl an older preview. The final run uses 4397. Publication: Lovable project → Share → Publish, then check the visible navigation and target metadata on the public domain.
