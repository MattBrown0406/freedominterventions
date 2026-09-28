# 2026-09-28 — Service-area initial HTML discovery (review branch only)

## Scope and evidence
- Exact source base: 1ab4b87b47f14be1599a8bc0a6e70a3c5ccafb56.
- Changed route: `/service-areas`; change kind: technical rendering only.
- Live raw route had only summary/contact anchors; all existing regional directory links appeared after JavaScript. Independent readbacks: `/root/seo-page-one-review/fi-live-service-areas.json` and `fi-live-evidence.json`.
- Existing destination priorities from fresh GSC: `/boise-idaho` (`interventions in boise`, 105 impressions / 0 clicks / 11.96 position), `/alaska` (`alcohol interventionist alaska`, 31 / 0 / 16.45), `/minneapolis-minnesota` (`minneapolis professional interventions`, 382 / 0 / 6.36). Window: 2026-08-29 through 2026-09-25. Full comparison is outside this repository at `/root/seo-page-one-review/fi.md` and `fi.json`.

## Technical change, not a new link or copy campaign
- Wrap the existing ServiceAreas content in one semantic main.
- Server-render that exact component into initial route HTML, removing only the redundant body fallback. Preserve head font fallback, metadata, schema, directory data, link destinations and labels, page copy, health/crisis wording and interactive behavior.
- Shared generator invokes this only for `/service-areas`; both extensionless-hosting artifacts are generated. No target-page edits, no new geographic pages, no title rewrite, no source/metadata/schema policy changes.
- This is a narrow raw-versus-settled rendering correction, not permission to override any destination's 28-day metadata/link or 60-day body cooldown.

## Review/publication and observation
- Prepared under explicit user authorization for proactive low-risk review-branch implementation. Requires human review and separate hosting publication. No main push or live publication.
- `publishedAt: null`; no post-release baseline is claimed. On actual publication, verify exact public `/service-areas` raw and settled HTML, then record technical release date. Preserve destination and unrelated history.
- Evaluate discovery and exact destination query-page metrics after 28 complete final GSC days; do not interpret this as a promised ranking increase. One major variable only. No patient/client/analytics identifiers included.

## Verification
- Baseline and changed client builds/static generation, exact source-prose preservation, raw link/canonical/indexability/schema checks, mobile and desktop read-only browser checks, and targeted lint/diff gates are recorded in the external report.
- Raw discovery test: `node scripts/test-service-areas-fallback.mjs` after build; this regression failed on baseline.
- No generated sitemap, dependencies, policy, central controller or protected-winner source is part of this change.
