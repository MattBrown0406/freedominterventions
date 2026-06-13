
DROP POLICY IF EXISTS "Service role can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Service role can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Service role can delete blog images" ON storage.objects;

CREATE POLICY "Strict admins can upload blog images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'blog-images' AND public.is_strict_admin());

CREATE POLICY "Strict admins can update blog images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'blog-images' AND public.is_strict_admin())
  WITH CHECK (bucket_id = 'blog-images' AND public.is_strict_admin());

CREATE POLICY "Strict admins can delete blog images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'blog-images' AND public.is_strict_admin());
