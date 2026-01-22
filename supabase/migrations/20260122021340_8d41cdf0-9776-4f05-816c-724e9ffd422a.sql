-- Allow strict admins to update and delete testimonials
CREATE POLICY "Admins can update testimonials"
ON public.family_reviews
FOR UPDATE
TO authenticated
USING (public.is_strict_admin())
WITH CHECK (public.is_strict_admin());

CREATE POLICY "Admins can delete testimonials"
ON public.family_reviews
FOR DELETE
TO authenticated
USING (public.is_strict_admin());