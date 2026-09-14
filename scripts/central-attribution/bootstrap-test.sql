-- Disposable isolated fixture DB only. Production auth helper contract reproduced from source.
create schema auth;
create function auth.uid() returns uuid language sql stable as $$ select (nullif(current_setting('request.jwt.claims',true),'')::jsonb->>'sub')::uuid $$;
create function auth.jwt() returns jsonb language sql stable as $$ select nullif(current_setting('request.jwt.claims',true),'')::jsonb $$;
create type public.app_role as enum ('admin','user');
create table public.user_roles(user_id uuid,role public.app_role);
create function public.has_role(id uuid,r public.app_role) returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.user_roles where user_id=id and role=r) $$;
create function public.is_strict_admin() returns boolean language sql stable security definer set search_path=public as $$ select auth.uid() is not null and public.has_role(auth.uid(),'admin'::public.app_role) and coalesce(auth.jwt()->>'email','')='matt@freedominterventions.com' $$;
grant usage on schema auth,public to anon,authenticated,service_role;
insert into public.user_roles values('11111111-1111-4111-8111-111111111111','admin');
