# Initial-HTML pilot and identity cleanup — September 14, 2026

Source change; **publication pending**, not a live release timestamp. Approval: next-SEO recommendations #2 (FI toolkit pilot; profile protected-copy parity), #6 (evidence preparation only), #7 (truthful brand identity).

## Scope

- `/intervention-toolkit`: deterministic build-time rendering of its existing React `<main>` into both clean-URL artifacts, before the optional Chromium pass. All nine sections, existing real links, checklist introduction and safety text come from the original component; no duplicate content dataset and no copy/title rewrite.
- Remove the competing noscript summary only on the toolkit and protected profile when full Chromium content exists. Toolkit is full even when the deployment environment skips Chromium; profile remains a protected baseline/parity check, not a new browser-independent profile pilot.
- Preserve profile biography byte-for-byte; use ProfilePage → existing static Person ID rather than a second conflicting Person/Organization object.
- Remove three related-brand homepages from FI Organization `sameAs`; no invented ownership/legal/office relationship or social URL. Keep the existing FI Organization and Matt Brown IDs.
- Preview startup now requires its own announced origin and strict port; an occupied port fails instead of reading a different checkout. Readiness failures identify the failing route.

## Protected

`/how-intervention-works`, `/service-areas`, `/next-step`, current title/description/canonical/robots contracts, private-guide isolation, sitemaps/legacy XML, analytics, central attribution/admin, authentication, phone, payments and Supabase/backend are unchanged. No crawler policy, GSC, DNS, schedule or publication changes. No additional author box.

Certification/practice-duration claims require primary evidence. The profile currently uses its sobriety counter in the practice-duration sentence; this is documented for owner review, **not silently rewritten**. External evidence sheet: `/root/fi-next-seo-implementation/claims-review.md`.

## Verification and observation

Run full `npm run build` with an installed Chromium and a dedicated free `PRERENDER_PREVIEW_PORT`; require its actual completion count, not just exit zero with ALLOW_PRERENDER_SKIP. Run `scripts/test-full-guide.mjs` against both the pre-browser fallback and final artifact, `scripts/test-full-guide-runtime.mjs` for raw `.html`/`index.html`/extensionless parity, mobile/desktop and SPA checks, TypeScript and scoped lint. Reports are outside the repository under `/root/fi-next-seo-implementation/`.

After Lovable Share → Publish, verify full sections in the **public response body**, not only hydrated DOM; inspect stable schema IDs and one canonical. Record actual publication time then apply normal observation periods (28 days metadata; 60 days body experiments). This is a narrow rendering/semantic correction, not permission for a new keyword/title or health-copy round. No automatic cooldown ledger/scheduler claim is made.
