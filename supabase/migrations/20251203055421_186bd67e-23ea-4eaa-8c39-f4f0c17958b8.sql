-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create assessments table to store form submissions
CREATE TABLE public.assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Section 1: Contact Information
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    contact_relationship TEXT,
    best_day_to_contact TEXT,
    best_time_to_contact TEXT,
    
    -- Section 2: Loved One's Basic Information
    loved_one_name TEXT NOT NULL,
    loved_one_age INTEGER,
    loved_one_gender TEXT,
    primary_substances TEXT,
    frequency TEXT,
    duration_of_use TEXT,
    age_first_used INTEGER,
    use_increased TEXT,
    
    -- Section 3: DSM-5 Criteria
    dsm_behaviors JSONB DEFAULT '{}',
    dsm_yes_count INTEGER DEFAULT 0,
    severity_level TEXT,
    
    -- Section 4: Withdrawal and Medical Risks
    withdrawal_symptoms TEXT,
    withdrawal_description TEXT,
    recent_detox TEXT,
    hospitalized_detox TEXT,
    withdrawal_medications TEXT,
    withdrawal_medications_list TEXT,
    
    -- Section 5: Biomedical Conditions
    health_issues TEXT,
    health_issues_list TEXT,
    recent_er_visits TEXT,
    er_visit_details TEXT,
    prescribed_medications TEXT,
    prescribed_medications_list TEXT,
    
    -- Section 6: Emotional/Behavioral Risks
    mental_health_signs TEXT,
    mental_health_details TEXT,
    psychiatric_history TEXT,
    psychiatric_details TEXT,
    violence_history TEXT,
    violence_details TEXT,
    
    -- Section 7: Family/Social Environment
    stable_living TEXT,
    homeless_unstable TEXT,
    family_enabling TEXT,
    enabling_details TEXT,
    children_present TEXT,
    children_impacted TEXT,
    support_network TEXT,
    
    -- Section 8: Relapse/Recovery Environment
    prior_treatment TEXT,
    treatment_history JSONB DEFAULT '[]',
    current_triggers TEXT,
    willingness_to_change TEXT,
    
    -- Section 9: Family Impact and Readiness
    financial_impact TEXT,
    financial_details TEXT,
    child_welfare_involvement TEXT,
    family_ready_intervention TEXT,
    intervention_barriers TEXT,
    
    -- Signature and metadata
    family_signature TEXT,
    status TEXT DEFAULT 'new',
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES auth.users(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on assessments
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit an assessment (public insert)
CREATE POLICY "Anyone can submit assessments"
ON public.assessments
FOR INSERT
WITH CHECK (true);

-- Policy: Only admins can view assessments
CREATE POLICY "Admins can view all assessments"
ON public.assessments
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Policy: Only admins can update assessments
CREATE POLICY "Admins can update assessments"
ON public.assessments
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy: Only admins can delete assessments
CREATE POLICY "Admins can delete assessments"
ON public.assessments
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_assessments_updated_at
BEFORE UPDATE ON public.assessments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Policy for user_roles: admins can view all roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR user_id = auth.uid());