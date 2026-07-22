DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Strict admin or self can view roles" ON public.user_roles
FOR SELECT USING (public.is_strict_admin() OR user_id = auth.uid());