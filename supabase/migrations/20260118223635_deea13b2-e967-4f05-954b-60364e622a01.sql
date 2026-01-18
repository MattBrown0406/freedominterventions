-- Create storage bucket for insurance cards
INSERT INTO storage.buckets (id, name, public)
VALUES ('insurance-cards', 'insurance-cards', false)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policy for insurance card uploads (allow anyone to upload since this is a public form)
CREATE POLICY "Anyone can upload insurance cards"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'insurance-cards');

-- Allow the admin to view insurance cards
CREATE POLICY "Admins can view insurance cards"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'insurance-cards' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Add columns to assessments table for insurance card URLs
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS insurance_card_front_url text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS insurance_card_back_url text;