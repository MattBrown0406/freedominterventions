DROP POLICY IF EXISTS "Anyone can read availability for booking" ON public.availability_settings;
CREATE POLICY "Only strict admins can read availability" ON public.availability_settings FOR SELECT TO authenticated USING (public.is_strict_admin());
DROP POLICY IF EXISTS "Public can upload insurance card assets to uploads path" ON storage.objects;