# Freedom Interventions GSC Impressions-to-Clicks Plan

## Working Diagnosis

Google is already finding FreedomInterventions.com for valuable non-branded searches, but most non-branded impressions are not turning into clicks yet.

The screenshots show a clear split:

- Branded searches are getting clicks: "matt brown interventionist", "freedom interventions", "matt brown".
- Service/location searches are getting impressions but little to no click-through: "minneapolis professional interventions", "drug intervention in boise", "interventionist oregon", "alcohol intervention oregon", "drug interventionist washington", "fentanyl treatment fort worth", "professional interventionist south dakota", "drug intervention iowa", "drug intervention louisiana", "family intervention".

The repo already has page coverage for most of these searches:

- `/minneapolis-minnesota`
- `/boise-idaho`
- `/oregon`
- `/washington`
- `/fort-worth-texas`
- `/north-carolina`
- `/south-dakota`
- `/iowa`
- `/louisiana`
- `/family-intervention`

The problem is less "we need more pages" and more "the pages Google is showing need to look like the obvious result for the exact query."

## Main Repo Findings

1. The service-area footprint is broad, but many titles/H1s are written like broad informational pages instead of direct service matches.
   Example: the Minneapolis page title is "Minneapolis Minnesota Addiction Intervention Services", while the high-impression query is "minneapolis professional interventions". The H1 leads with "Twin Cities Addiction Crisis", which may feel less direct in a search result.

2. Several older state pages, including Iowa and Louisiana, do not have page-level `SEOHead` entries and rely on fallback metadata. That is weaker and less controlled for search snippets.

3. Exact high-impression terms are mostly absent from visible page copy. Searches like "drug intervention in boise", "interventionist oregon", and "professional interventionist south dakota" should appear naturally in title/H1/body copy, not just hidden keywords.

4. The site already has structured data, sitemap generation, service-area pages, and strong conversion infrastructure. The first move should be focused CTR/snippet optimization, not a broad rebuild.

## Priority Query Clusters

### Tier 1: Highest Immediate Opportunity

1. Minneapolis professional interventions
   - 3 months: 829 impressions, 0 clicks
   - Target page: `/minneapolis-minnesota`
   - Action: rewrite title/H1/meta around "professional interventionist in Minneapolis" and "professional interventions for Twin Cities families".

2. Family intervention
   - 3 months: 291 impressions, 0 clicks
   - Target page: `/family-intervention`
   - Action: make snippet more concrete: what it is, who leads it, free consultation, phone number, nationwide service.

3. Drug intervention in Boise
   - 3 months: 267 impressions, 0 clicks
   - Target page: `/boise-idaho`
   - Action: make title match the query directly and add "drug intervention in Boise" above the fold.

4. Professional interventionist Oregon / Interventionist Oregon / Alcohol intervention Oregon
   - 3 months: 230+ impressions on one query, plus repeated 7-day and 28-day impressions
   - Target page: `/oregon`
   - Action: shift title/H1 from generic "services in Oregon" to "Oregon interventionist for drug and alcohol addiction".

5. Professional interventionist North Carolina
   - 3 months: 209 impressions, 0 clicks
   - Target page: `/north-carolina`
   - Action: same direct interventionist/service framing.

### Tier 2: Next Batch

6. Professional interventionist South Dakota
   - Target page: `/south-dakota`

7. Drug intervention Iowa
   - Target page: `/iowa`
   - Needs page-level SEOHead.

8. Drug intervention Louisiana
   - Target page: `/louisiana`
   - Needs page-level SEOHead.

9. Drug interventionist Washington
   - Target page: `/washington`

10. Fentanyl treatment Fort Worth
   - Target page: `/fort-worth-texas`
   - Important nuance: searcher may be looking for treatment, not only intervention. Snippet should say Matt helps families plan fentanyl intervention and treatment entry, not imply Freedom Interventions is a treatment center.

## Proposed Title and Meta Direction

Use direct, plain, high-intent titles. Avoid making every title start with "Addiction Intervention Services in..." because that blends into the page set and may invite Google title rewrites.

Recommended pattern:

`Professional Interventionist in {Location} | Drug & Alcohol Intervention Help`

or:

`Drug Intervention in {Location} | Matt Brown, Professional Interventionist`

Example rewrites:

- Minneapolis: `Minneapolis Professional Interventionist | Drug & Alcohol Intervention Help`
- Boise: `Drug Intervention in Boise, Idaho | Professional Family Intervention Help`
- Oregon: `Oregon Interventionist for Drug & Alcohol Addiction | Freedom Interventions`
- Washington: `Drug Interventionist in Washington | Family Intervention Help`
- South Dakota: `Professional Interventionist in South Dakota | Drug & Alcohol Help`
- Iowa: `Drug Intervention in Iowa | Professional Interventionist for Families`
- Louisiana: `Drug Intervention in Louisiana | Family Intervention Help`
- Fort Worth: `Fentanyl Intervention Help in Fort Worth | Treatment Planning Support`
- Family Intervention: `Family Intervention Services | Help a Loved One Accept Treatment`

Description pattern:

`Matt Brown helps {location} families plan drug, alcohol, and fentanyl interventions, treatment entry, and next steps. 20+ years experience. Confidential consultation: (541) 668-8084.`

Keep descriptions under roughly 155-160 characters when possible, but do not over-optimize for character count at the cost of clarity.

## Page Edit Checklist

For each priority page:

1. Update `SEOHead` title and description to match the actual query cluster.
2. Align the H1 with the title so Google has less reason to rewrite the title.
3. Put the exact service phrase naturally in the first paragraph.
4. Add a short "When to call an interventionist in {Location}" section.
5. Add a short "Drug, alcohol, and fentanyl intervention help" section where relevant.
6. Add 3 practical FAQs with schema where the page does not already have FAQ schema.
7. Strengthen above-the-fold CTA copy: "Call Matt directly" plus "Schedule confidential consultation".
8. Add internal links from `/family-intervention`, `/interventionist`, and `/service-areas` to the priority pages.
9. Make sure the page does not imply a physical local office where there is not one. Phrase as serving families in the location.

## Technical Cleanup

1. Add page-level `SEOHead` to high-impression pages that do not have it, starting with `/iowa` and `/louisiana`.
2. Reduce metadata drift by generating default city/state metadata from `src/data/locations.ts` instead of maintaining a partial city list inside `DefaultSEO`.
3. Keep the sitemap generator as-is, but run it after any route or priority metadata changes.
4. Verify the built/prerendered HTML for the priority URLs contains the intended title, meta description, canonical, and schema.
5. After deploy, request indexing in Search Console for the 10 priority URLs.

## Measurement Plan

Before edits:

- Export Search Console query + page data for the last 3 months.
- Mark current impressions, clicks, CTR, and average position for each priority query/page.

After deploy:

- Week 1: verify indexing and snippet changes, but do not judge performance too early.
- Week 2: compare 7-day CTR for the edited pages against the previous 7-day baseline.
- Week 4: compare 28-day CTR, clicks, and impressions.

Primary KPI:

- Non-branded clicks from the 10 priority query clusters.

Secondary KPIs:

- CTR for service-area pages.
- Clicks to phone/book consultation from organic landing pages.
- GSC average position only as context, not the main success metric.

## Recommended Execution Order

1. Get a full GSC export with query + landing page data.
2. Confirm which URL Google is showing for each high-impression query.
3. Implement the first five page/snippet rewrites:
   - `/minneapolis-minnesota`
   - `/family-intervention`
   - `/boise-idaho`
   - `/oregon`
   - `/north-carolina`
4. Implement technical cleanup for `/iowa`, `/louisiana`, and fallback metadata.
5. Implement second batch:
   - `/south-dakota`
   - `/iowa`
   - `/louisiana`
   - `/washington`
   - `/fort-worth-texas`
6. Build and verify rendered SEO output.
7. Deploy, submit priority URLs in Search Console, and annotate the change date.
8. Review results after 14 and 28 days.

## Decision for Review

Recommended decision: do not create more location pages yet. First, improve the pages that are already earning impressions. If CTR improves, then expand the same pattern to the next set of high-impression queries. If CTR does not improve but average position is low, the next move is content depth/internal authority rather than title testing.
