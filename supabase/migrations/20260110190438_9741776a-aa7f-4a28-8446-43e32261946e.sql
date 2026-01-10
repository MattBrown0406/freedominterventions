-- Add comprehensive DSM-V and ASAM assessment fields to assessments table
-- This migration adds fields for a thorough clinical intake assessment

-- Section: Individual Demographics & History
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS date_of_birth date;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS marital_status text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS employment_status text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS occupation text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS education_level text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS living_situation text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS ethnicity text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS primary_language text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS veteran_status text;

-- Section: Comprehensive Substance Use History
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS substances_used jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS current_using_substances text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS polysubstance_use text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS iv_drug_use text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS overdose_history text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS overdose_details text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS naloxone_reversals integer;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS longest_sobriety_period text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS last_use_date text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS typical_daily_use text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS route_of_administration text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS blackouts_history text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS morning_use text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS using_alone text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS hiding_use text;

-- Section: DSM-V Criteria (expanded for detailed tracking)
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS dsm_larger_amounts text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS dsm_desire_cut_down text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS dsm_time_spent text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS dsm_cravings text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS dsm_failure_obligations text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS dsm_continued_use_problems text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS dsm_activities_given_up text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS dsm_hazardous_use text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS dsm_continued_despite_knowledge text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS dsm_tolerance text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS dsm_withdrawal text;

-- Section: ASAM Dimension 1 - Acute Intoxication/Withdrawal Potential
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS current_intoxication_level text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS seizure_history text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS delirium_tremens_history text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS withdrawal_severity text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS medical_supervision_needed text;

-- Section: ASAM Dimension 2 - Biomedical Conditions (enhanced)
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS chronic_pain text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS chronic_pain_details text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS infectious_diseases text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS infectious_disease_details text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS pregnancy_status text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS physical_disabilities text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS sleep_problems text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS appetite_changes text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS primary_care_physician text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS last_physical_exam text;

-- Section: ASAM Dimension 3 - Emotional/Behavioral/Cognitive (enhanced)
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS current_mental_health_symptoms jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS suicide_ideation text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS suicide_ideation_details text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS suicide_attempts_history text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS suicide_attempts_details text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS self_harm_history text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS homicidal_ideation text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS trauma_history text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS trauma_details text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS ptsd_symptoms text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS eating_disorder_history text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS impulse_control_issues text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS cognitive_impairment text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS current_mental_health_treatment text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS mental_health_medications jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS mental_health_diagnoses jsonb DEFAULT '[]'::jsonb;

-- Section: ASAM Dimension 4 - Readiness to Change (Stages of Change)
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS stage_of_change text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS acknowledges_problem text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS motivation_level text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS previous_recovery_attempts text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS what_worked_before text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS what_didnt_work text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS treatment_goals text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS resistance_factors text;

-- Section: ASAM Dimension 5 - Relapse/Continued Use Potential
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS relapse_triggers jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS high_risk_situations text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS coping_skills text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS relapse_warning_signs text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS peer_support_recovery text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS twelve_step_involvement text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS sober_living_interest text;

-- Section: ASAM Dimension 6 - Recovery Environment (enhanced)
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS people_using_in_home text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS substances_accessible_home text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS relationship_with_using_friends text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS safe_housing_available text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS transportation_access text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS employment_barriers text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS legal_issues text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS legal_issues_details text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS pending_charges text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS probation_parole text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS dui_history text;

-- Section: Family System Dynamics
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS family_members_participating jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS family_unity_level text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS family_communication_patterns text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS family_conflicts text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS family_conflicts_details text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS divorced_parents text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS blended_family text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS estranged_family_members text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS estranged_details text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS family_roles text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS codependency_patterns text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS boundaries_assessment text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS enabling_behaviors_list jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS family_secrets text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS family_trauma_history text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS family_in_recovery text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS family_counseling_history text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS family_intervention_concerns text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS who_holds_leverage text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS bottom_lines jsonb DEFAULT '[]'::jsonb;

-- Section: Family Mental Health History
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS family_mental_health_history jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS family_suicide_history text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS family_psychiatric_hospitalizations text;

-- Section: Family Addiction History
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS family_addiction_history jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS generational_addiction_pattern text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS family_recovery_history text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS family_overdose_deaths text;

-- Section: Consequences and Impact (detailed)
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS job_loss_due_to_use text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS relationship_losses text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS relationship_losses_details text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS custody_issues text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS dcf_involvement_details text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS debt_amount text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS bankruptcy text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS stolen_from_family text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS physical_altercations text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS arrests_history text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS arrests_details text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS accidents_due_to_use text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS health_consequences text;

-- Section: Intervention Planning
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS intervention_type_preference text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS best_approach text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS potential_objections text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS what_motivates_individual text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS treatment_preferences text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS geographic_preferences text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS insurance_information text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS budget_for_treatment text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS urgency_level text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS immediate_safety_concerns text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS additional_information text;

-- Section: Risk Assessment Summary
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS overall_risk_level text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS recommended_level_of_care text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS special_considerations text;