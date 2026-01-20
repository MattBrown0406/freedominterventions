-- Add new columns to family_reviews for professional reviewers and star ratings
ALTER TABLE public.family_reviews
ADD COLUMN reviewer_type TEXT NOT NULL DEFAULT 'family',
ADD COLUMN last_name TEXT,
ADD COLUMN profession TEXT,
ADD COLUMN company TEXT,
ADD COLUMN state TEXT,
ADD COLUMN rating INTEGER NOT NULL DEFAULT 5;

-- Add constraint for rating values
ALTER TABLE public.family_reviews
ADD CONSTRAINT rating_range CHECK (rating >= 1 AND rating <= 5);

-- Add constraint for reviewer_type values
ALTER TABLE public.family_reviews
ADD CONSTRAINT reviewer_type_valid CHECK (reviewer_type IN ('family', 'professional'));