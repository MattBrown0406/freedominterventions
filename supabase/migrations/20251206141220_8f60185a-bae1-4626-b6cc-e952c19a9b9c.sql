-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to blog images
CREATE POLICY "Blog images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'blog-images');

-- Allow service role to upload blog images (edge functions use service role)
CREATE POLICY "Service role can upload blog images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'blog-images');

-- Allow service role to update/overwrite blog images
CREATE POLICY "Service role can update blog images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'blog-images');

-- Allow service role to delete blog images
CREATE POLICY "Service role can delete blog images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'blog-images');