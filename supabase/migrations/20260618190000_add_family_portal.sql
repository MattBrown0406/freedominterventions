-- Family portal for Freedom Interventions client case status and messaging.

CREATE TABLE IF NOT EXISTS public.family_portal_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_name text NOT NULL,
  primary_contact_name text NOT NULL,
  primary_contact_email text NOT NULL,
  primary_contact_phone text,
  loved_one_name text,
  status text NOT NULL DEFAULT 'Intake started',
  phase text NOT NULL DEFAULT 'Intake',
  next_step text,
  next_step_due_at timestamptz,
  summary text,
  risk_level text NOT NULL DEFAULT 'standard',
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.family_portal_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES public.family_portal_cases(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'family',
  invited_at timestamptz,
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(case_id, email),
  UNIQUE(case_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.family_portal_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES public.family_portal_cases(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text NOT NULL,
  update_type text NOT NULL DEFAULT 'case_update',
  is_visible_to_family boolean NOT NULL DEFAULT true,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.family_portal_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES public.family_portal_cases(id) ON DELETE CASCADE,
  sender_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  sender_name text NOT NULL,
  sender_email text NOT NULL,
  message text NOT NULL,
  is_read_by_admin boolean NOT NULL DEFAULT false,
  admin_notified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_family_portal_cases_active_updated ON public.family_portal_cases(is_active, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_family_portal_members_user ON public.family_portal_members(user_id);
CREATE INDEX IF NOT EXISTS idx_family_portal_members_email ON public.family_portal_members(lower(email));
CREATE INDEX IF NOT EXISTS idx_family_portal_updates_case_created ON public.family_portal_updates(case_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_family_portal_messages_case_created ON public.family_portal_messages(case_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_family_portal_messages_unread ON public.family_portal_messages(is_read_by_admin, created_at DESC);

CREATE OR REPLACE FUNCTION public.touch_family_portal_case_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS family_portal_cases_touch_updated_at ON public.family_portal_cases;
CREATE TRIGGER family_portal_cases_touch_updated_at
BEFORE UPDATE ON public.family_portal_cases
FOR EACH ROW
EXECUTE FUNCTION public.touch_family_portal_case_updated_at();

CREATE OR REPLACE FUNCTION public.is_family_portal_case_member(case_uuid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.family_portal_members m
    WHERE m.case_id = case_uuid
      AND m.user_id = auth.uid()
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_family_portal_case_member(uuid) TO authenticated;

ALTER TABLE public.family_portal_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_portal_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_portal_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_portal_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins manage family portal cases" ON public.family_portal_cases;
CREATE POLICY "Admins manage family portal cases"
ON public.family_portal_cases
FOR ALL
TO authenticated
USING (public.is_strict_admin())
WITH CHECK (public.is_strict_admin());

DROP POLICY IF EXISTS "Families can view assigned cases" ON public.family_portal_cases;
CREATE POLICY "Families can view assigned cases"
ON public.family_portal_cases
FOR SELECT
TO authenticated
USING (is_active AND public.is_family_portal_case_member(id));

DROP POLICY IF EXISTS "Admins manage family portal members" ON public.family_portal_members;
CREATE POLICY "Admins manage family portal members"
ON public.family_portal_members
FOR ALL
TO authenticated
USING (public.is_strict_admin())
WITH CHECK (public.is_strict_admin());

DROP POLICY IF EXISTS "Families can view their memberships" ON public.family_portal_members;
CREATE POLICY "Families can view their memberships"
ON public.family_portal_members
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.is_family_portal_case_member(case_id));

DROP POLICY IF EXISTS "Admins manage family portal updates" ON public.family_portal_updates;
CREATE POLICY "Admins manage family portal updates"
ON public.family_portal_updates
FOR ALL
TO authenticated
USING (public.is_strict_admin())
WITH CHECK (public.is_strict_admin());

DROP POLICY IF EXISTS "Families view visible portal updates" ON public.family_portal_updates;
CREATE POLICY "Families view visible portal updates"
ON public.family_portal_updates
FOR SELECT
TO authenticated
USING (is_visible_to_family AND public.is_family_portal_case_member(case_id));

DROP POLICY IF EXISTS "Admins manage family portal messages" ON public.family_portal_messages;
CREATE POLICY "Admins manage family portal messages"
ON public.family_portal_messages
FOR ALL
TO authenticated
USING (public.is_strict_admin())
WITH CHECK (public.is_strict_admin());

DROP POLICY IF EXISTS "Families view messages for assigned cases" ON public.family_portal_messages;
CREATE POLICY "Families view messages for assigned cases"
ON public.family_portal_messages
FOR SELECT
TO authenticated
USING (public.is_family_portal_case_member(case_id));

DROP POLICY IF EXISTS "Families insert messages for assigned cases" ON public.family_portal_messages;
CREATE POLICY "Families insert messages for assigned cases"
ON public.family_portal_messages
FOR INSERT
TO authenticated
WITH CHECK (public.is_family_portal_case_member(case_id) AND sender_user_id = auth.uid());
