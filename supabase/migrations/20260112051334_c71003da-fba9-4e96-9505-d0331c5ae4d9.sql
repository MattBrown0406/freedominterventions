-- Address linter warning: permissive RLS policy WITH CHECK (true)
-- Keep public review submission, but require basic non-empty fields.

DROP POLICY IF EXISTS "Anyone can submit a review" ON public.family_reviews;

CREATE POLICY "Anyone can submit a review"
ON public.family_reviews
FOR INSERT
WITH CHECK (
  length(coalesce(first_name, '')) > 0
  AND length(coalesce(last_initial, '')) > 0
  AND length(coalesce(city, '')) > 0
  AND length(coalesce(review_text, '')) > 0
);
