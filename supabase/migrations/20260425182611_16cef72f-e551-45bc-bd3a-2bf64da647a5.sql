UPDATE public.blog_posts
SET content = replace(
  content,
  'At Freedom Interventions, Matt Brown, CIP works with families — not just the person struggling — to help you find footing, set sustainable boundaries, and decide on next steps.',
  'At Freedom Interventions, Matt Brown, CIP works with families — not just the person struggling — to help you find footing, <a href="/blog/how-to-set-boundaries-addicted-loved-one">set sustainable boundaries</a>, and decide on next steps.'
)
WHERE slug = 'reclaim-your-life-self-care-families-addiction';

UPDATE public.blog_posts
SET content = replace(
  content,
  'At Freedom Interventions, we work with families — not just the person struggling with addiction. Whether you need a crisis coaching session to think through what to do next, or a Family Readiness Intensive to build a real plan with a week of follow-up support, Matt is here. You don''t have to figure this out alone.',
  'At Freedom Interventions, we work with families — not just the person struggling with addiction. Whether you need a <a href="/#booking">crisis coaching session</a> to think through what to do next, or a <a href="/family-readiness-intensive">Family Readiness Intensive</a> to build a real plan with a week of follow-up support, Matt is here. You don''t have to figure this out alone.'
)
WHERE slug = 'reclaim-your-life-self-care-families-addiction';