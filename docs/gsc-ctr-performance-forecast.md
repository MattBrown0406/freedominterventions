# Expected Performance After CTR Rewrite

## What Changed

I rewrote the pages that matched the highest-value Search Console impressions from the screenshots. The changes were aimed at turning non-branded impressions into clicks, then making the next action obvious: call, book, or contact.

Pages changed:

- `/minneapolis-minnesota`
- `/family-intervention`
- `/boise-idaho`
- `/oregon`
- `/washington`
- `/north-carolina`
- `/south-dakota`
- `/iowa`
- `/louisiana`
- `/fort-worth-texas`

Supporting files changed:

- `src/components/DefaultSEO.tsx`
- `scripts/generate-static-fallbacks.mjs`

Primary changes:

- Rewrote titles around the actual query language from Search Console.
- Rewrote meta descriptions to say what the searcher gets and to include the phone number.
- Rewrote H1s and first paragraphs to match the query intent.
- Changed primary CTA language from generic scheduling language to `Book Confidential Consultation` and `Call Matt Now`.
- Added location FAQ schema to Minneapolis, Boise, and Fort Worth.
- Added page-level SEO/schema to Iowa and Louisiana, which were previously relying on fallback metadata.
- Added internal links from the family intervention page to the priority location pages.

## Search Terms Used for Forecast

These are the impression opportunities visible in the screenshots and used for the forecast:

- `minneapolis professional interventions`
- `family intervention`
- `drug intervention in boise`
- `professional interventionist oregon`
- `interventionist oregon`
- `alcohol intervention oregon`
- `professional interventionist north carolina`
- `professional interventionist south dakota`
- `drug intervention iowa`
- `drug intervention louisiana`
- `drug interventionist washington`
- `fentanyl treatment fort worth`

## Baseline Read

Branded terms are already working:

- `matt brown interventionist`: 33 clicks from 146 impressions over 3 months.
- `freedom interventions`: 10 clicks from 23 impressions over 3 months.

Non-branded service/location terms were the problem:

- `minneapolis professional interventions`: 829 impressions, 0 clicks over 3 months.
- `family intervention`: 291 impressions, 0 clicks over 3 months.
- `drug intervention in boise`: 267 impressions, 0 clicks over 3 months.
- `professional interventionist oregon`: 230 impressions, 0 clicks over 3 months.
- `professional interventionist north carolina`: 209 impressions, 0 clicks over 3 months.

That tells me Google sees topical relevance, but searchers were not getting a strong enough reason to choose the result.

## Expected 28-Day Performance

Assumption: same approximate impression volume as the screenshot periods, no major ranking change, Google updates titles/snippets within 1-3 weeks.

Approximate monthly non-branded impression pool from the target terms: 950-1,050 impressions.

Conservative case:

- CTR: 1.5%
- Expected clicks: 14-16 per 28 days
- Expected calls/emails/booked consults: 1-2 per 28 days

Expected case:

- CTR: 3.0%
- Expected clicks: 28-32 per 28 days
- Expected calls/emails/booked consults: 3-5 per 28 days

Strong case:

- CTR: 5.0%
- Expected clicks: 48-52 per 28 days
- Expected calls/emails/booked consults: 5-8 per 28 days

My working expectation is the middle case: about 30 additional non-branded clicks per month from these terms once Google refreshes the snippets.

## Expected 90-Day Performance

If impressions stay similar to the last 3 months and CTR improves into the 2.5-4% range:

- Expected non-branded clicks: 75-125 over 90 days.
- Expected calls/emails/booked consults: 8-18 over 90 days.

If Google also improves ranking because page relevance and internal linking are clearer:

- Expected non-branded clicks: 125-180 over 90 days.
- Expected calls/emails/booked consults: 15-27 over 90 days.

I would not forecast more aggressively until we have average position and landing-page data from the full GSC export.

## Query-by-Query Expectations

| Query cluster | Prior visible performance | Expected result after changes |
| --- | ---: | --- |
| Minneapolis professional interventions | 829 impressions / 0 clicks in 3 months | Should become the biggest click mover. Expect 8-15 clicks/month if impressions hold. |
| Family intervention | 291 impressions / 0 clicks in 3 months | Better title and stronger intent match. Expect 3-6 clicks/month. |
| Drug intervention in Boise | 267 impressions / 0 clicks in 3 months | Direct query match now. Expect 3-5 clicks/month. |
| Oregon interventionist / alcohol intervention Oregon | Strong repeated impressions, 0 clicks | Better state-page match. Expect 5-10 clicks/month combined. |
| North Carolina interventionist | 209 impressions / 0 clicks in 3 months | Better direct-match title. Expect 2-4 clicks/month. |
| Iowa / Louisiana drug intervention | 58-60 impressions in 28 days, 0 clicks | Now have page-level SEO. Expect 2-4 clicks/month combined at first. |
| Washington drug interventionist | 18 impressions in 7 days, 0 clicks | If that pace holds, expect 2-4 clicks/month. |
| Fort Worth fentanyl treatment | 17 impressions in 7 days, 0 clicks | Important because intent is urgent. Expect fewer clicks, but higher conversion value. |

## Conversion Expectations

Not every organic click should be treated equally. These are high-intent, family-in-crisis searches, so conversion should be judged by action quality, not raw traffic.

Expected action rates from non-branded clicks:

- Phone click or direct call intent: 5-10%
- Booking page click or booked appointment: 3-6%
- Email/contact form action: 1-3%
- Total measurable lead action: 8-15%

The best-performing pages should be:

1. `/minneapolis-minnesota`
2. `/family-intervention`
3. `/oregon`
4. `/boise-idaho`
5. `/fort-worth-texas`

Fort Worth may not generate the most clicks, but `fentanyl treatment fort worth` is likely one of the highest-urgency searches.

## What to Watch in Search Console

Review at 14 days:

- Did Google pick up the new titles?
- Are impressions stable?
- Did CTR move above 1% on the priority terms?

Review at 28 days:

- Did non-branded clicks increase?
- Which rewritten snippets got the most lift?
- Are searchers landing on the intended page?

Review at 90 days:

- Did Google reward tighter relevance with better average position?
- Did call/book/email events increase from organic landing pages?
- Which page pattern should be rolled out to the rest of the location set?

## Recommendation

Let these changes run for at least 28 days before doing another broad rewrite. The next best move is not more guessing. The next best move is measurement:

- GSC query + page export.
- Organic landing-page conversion events.
- Phone clicks from the rewritten pages.
- Booking clicks from the rewritten pages.
- Contact/email actions from the rewritten pages.

If CTR rises but leads do not, the page copy is getting the click but not closing the action. If CTR does not rise, the snippets still are not compelling enough or the average position is too low to matter.
