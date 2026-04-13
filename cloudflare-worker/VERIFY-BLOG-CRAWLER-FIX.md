# Verify Blog Crawler Fix After Deploy

Use this checklist after deploying the `cloudflare-worker/og-worker.js` crawler fix.

## Goal

Confirm that:

1. **Search crawlers** (Googlebot, Bingbot) get the **real blog page HTML**
2. **Social crawlers** (Facebook, LinkedIn, Twitter/X) still get the **OG preview HTML**
3. Responses vary correctly by user agent
4. No stale `noindex` or redirect behavior remains

## Pick a real blog URL

Replace `<slug>` below with a real published post slug.

Example:

```bash
URL="https://freedominterventions.com/blog/<slug>"
```

## 1) Normal browser request should return the real page

```bash
curl -I "$URL"
curl -s "$URL" | head -n 40
```

### Expected

- `200 OK`
- normal app/page HTML
- **no** OG-only stub response
- **no** `meta refresh`
- **no** `X-Robots-Tag: noindex`

## 2) Googlebot should get the real blog page, not the OG stub

```bash
curl -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" -s "$URL" | head -n 60
```

### Expected

- real page HTML, not just share-preview markup
- **no** `meta refresh`
- **no** thin OG-only body

Optional header check:

```bash
curl -I -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" "$URL"
```

## 3) Bingbot should also get the real blog page

```bash
curl -A "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)" -s "$URL" | head -n 60
```

### Expected

- same behavior as Googlebot
- real page HTML
- no OG-only stub

## 4) Social crawlers should still get preview HTML

### Facebook

```bash
curl -A "facebookexternalhit/1.1" -s "$URL" | head -n 60
curl -I -A "facebookexternalhit/1.1" "$URL"
```

### LinkedIn

```bash
curl -A "LinkedInBot/1.0" -s "$URL" | head -n 60
```

### Twitter/X

```bash
curl -A "Twitterbot/1.0" -s "$URL" | head -n 60
```

### Expected

- OG preview HTML is returned
- title / description / image tags are present
- response includes:

```text
Vary: User-Agent
```

## 5) Confirm the old bad behaviors are gone

Run these checks against the normal browser response and the Googlebot response.

```bash
curl -s "$URL" | rg -n "refresh|og:image|noindex"
curl -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" -s "$URL" | rg -n "refresh|og:image|noindex"
```

### Expected

- no `meta refresh`
- no `noindex`
- OG tags can exist on the real page, but the response should not be just the thin OG worker stub

## 6) Search Console verification

In Google Search Console:

1. Inspect the same blog URL
2. Run **Test Live URL**
3. Confirm Google sees indexable content
4. Request indexing if needed

## 7) What counts as success

The fix is working if all of the following are true:

- browser request returns the real page
- Googlebot returns the real page
- Bingbot returns the real page
- social bots return OG preview HTML
- `Vary: User-Agent` is present on social-bot responses
- no `meta refresh`
- no `X-Robots-Tag: noindex`

## 8) If something is wrong

### If Googlebot still gets OG-only HTML
- worker bot detection is still too broad
- re-check the search crawler allow/pass-through logic in `cloudflare-worker/og-worker.js`

### If social bots get the full app instead of OG HTML
- social crawler detection may be broken or too narrow
- re-check the social crawler matching logic

### If headers look inconsistent
- check Cloudflare cache behavior
- verify `Vary: User-Agent` is present where needed
- purge cache and retest

## Notes

- This checklist verifies deployed behavior, not just local code.
- Local `vite build` can pass even if deploy/runtime behavior is still wrong.
- Local `npm run build` currently also runs `react-snap`, which has separate existing failures and should not be used as the sole signal for this worker verification.
