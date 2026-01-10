-- Create a table for family reviews/testimonials
CREATE TABLE public.family_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_initial TEXT NOT NULL,
  city TEXT NOT NULL,
  review_text TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.family_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a review (public insert)
CREATE POLICY "Anyone can submit a review"
ON public.family_reviews
FOR INSERT
WITH CHECK (true);

-- Only approved reviews are publicly visible
CREATE POLICY "Only approved reviews are visible"
ON public.family_reviews
FOR SELECT
USING (approved = true);

-- Strict admins can view all reviews
CREATE POLICY "Admins can view all reviews"
ON public.family_reviews
FOR SELECT
USING (is_strict_admin());

-- Strict admins can update reviews (approve/reject)
CREATE POLICY "Admins can update reviews"
ON public.family_reviews
FOR UPDATE
USING (is_strict_admin())
WITH CHECK (is_strict_admin());

-- Strict admins can delete reviews
CREATE POLICY "Admins can delete reviews"
ON public.family_reviews
FOR DELETE
USING (is_strict_admin());