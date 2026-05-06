# Lovable Prompt: Cross-Site Revenue Report Endpoints

Build the backend pieces needed for the Freedom Interventions admin "Command Center" to pull upstream funnel data from No More Enabling and Sober Helpline. Supabase is managed inside Lovable.

## Goal

Create two report-only edge functions that return the last 30 days of funnel activity in a shared shape. These functions should be safe for the Freedom admin dashboard to call with a private report secret, and they should not change any public forms, registration flows, Zoom registration behavior, email delivery, or existing lead capture logic.

## Shared Security

- Deploy both functions with `verify_jwt = false`.
- Require an `x-report-secret` header.
- Compare the header to the matching Supabase secret:
  - No More Enabling: `NME_REPORT_SECRET`
  - Sober Helpline: `SOBER_HELPLINE_REPORT_SECRET`
- If the secret is missing or incorrect, return HTTP 401 with `{ "error": "Unauthorized" }`.
- Use service-role access inside the function only for read-only aggregation.
- Do not expose raw email addresses, names, phone numbers, or private lead notes in the response.

## Response Shape

Both functions should return:

```json
{
  "window_days": 30,
  "totals": {
    "events": 0,
    "page_views": 0,
    "revenue_intent_clicks": 0,
    "consultation_requests": 0,
    "intervention_readiness_clicks": 0,
    "advertiser_inquiries": 0,
    "registrations": 0
  },
  "by_event": [{ "name": "event_name", "count": 0 }],
  "top_pages": [{ "name": "/page-path", "count": 0 }],
  "top_destinations": [{ "name": "destination_or_cta", "count": 0 }],
  "latest_events": [
    {
      "event_name": "event_name",
      "page_path": "/page-path",
      "destination": "destination_or_cta",
      "created_at": "2026-05-06T00:00:00.000Z"
    }
  ]
}
```

## No More Enabling Function

Create/deploy `nme-revenue-report`.

Aggregate from the existing No More Enabling tables:

- `funnel_events`
- `consultation_leads`
- `advertiser_inquiries`

Map totals this way:

- `events`: all `funnel_events` in the window
- `page_views`: events named `page_view`
- `revenue_intent_clicks`: events that indicate consultation, assessment, advertiser, Sober Helpline, Family Bridge, Freedom Interventions, Party Wreckers, or phone intent
- `consultation_requests`: `consultation_leads` created in the window
- `intervention_readiness_clicks`: funnel events for readiness/intervention CTAs
- `advertiser_inquiries`: `advertiser_inquiries` created in the window

For `top_pages`, use `page_path` if present, otherwise any page/location field in event metadata. For `top_destinations`, use `destination`, `cta`, `offer`, or a similar metadata field when present.

## Sober Helpline Function

Create/deploy `sober-helpline-revenue-report`.

Aggregate from existing Sober Helpline tables:

- `conversion_events`
- the existing Family Squares / Monday Zoom registration table
- any Family Squares follow-up queue table if present

Map totals this way:

- `events`: all `conversion_events` in the window
- `page_views`: events named `page_view`
- `revenue_intent_clicks`: events for booking a session, intervention readiness, Freedom Interventions, NME bridge, coaching, Family Squares next-step, or phone intent
- `registrations`: Family Squares / Zoom registrations created in the window
- `consultation_requests`: session/coaching booking requests if there is an existing table for them; otherwise count matching conversion events
- `intervention_readiness_clicks`: readiness/intervention CTA events
- `advertiser_inquiries`: 0 unless an advertiser table exists

For `top_pages`, use `page_path`, `current_path`, or equivalent event metadata. For `top_destinations`, use `destination`, `cta`, `revenue_path`, or equivalent metadata.

## Verification

After deployment, verify:

- Calling each function without `x-report-secret` returns 401.
- Calling each function with the correct secret returns 200 and the response shape above.
- Existing forms and registration flows still work:
  - Sober Helpline `/family-squares` registration still creates a registration and preserves Zoom behavior.
  - No More Enabling consultation and advertiser forms still submit successfully.
- No private contact data is returned by either report function.

Return the live function URLs and the exact secret names used so they can be entered into the Freedom admin Command Center.
