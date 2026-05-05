export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      abandoned_carts: {
        Row: {
          amount_cents: number
          booking_date: string | null
          booking_time: string | null
          booking_type: string
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          id: string
          recovered_at: string | null
          recovery_email_sent_at: string | null
          source_attribution: Json
          status: string
          updated_at: string
        }
        Insert: {
          amount_cents: number
          booking_date?: string | null
          booking_time?: string | null
          booking_type: string
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          id?: string
          recovered_at?: string | null
          recovery_email_sent_at?: string | null
          source_attribution?: Json
          status?: string
          updated_at?: string
        }
        Update: {
          amount_cents?: number
          booking_date?: string | null
          booking_time?: string | null
          booking_type?: string
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          id?: string
          recovered_at?: string | null
          recovery_email_sent_at?: string | null
          source_attribution?: Json
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      assessment_access_audit: {
        Row: {
          action: string
          actor_email: string | null
          actor_user_id: string | null
          assessment_id: string | null
          created_at: string
          id: string
          ip: string | null
          metadata: Json
          user_agent: string | null
        }
        Insert: {
          action: string
          actor_email?: string | null
          actor_user_id?: string | null
          assessment_id?: string | null
          created_at?: string
          id?: string
          ip?: string | null
          metadata?: Json
          user_agent?: string | null
        }
        Update: {
          action?: string
          actor_email?: string | null
          actor_user_id?: string | null
          assessment_id?: string | null
          created_at?: string
          id?: string
          ip?: string | null
          metadata?: Json
          user_agent?: string | null
        }
        Relationships: []
      }
      assessment_case_assignments: {
        Row: {
          assessment_id: string
          created_at: string
          created_by: string | null
          id: string
          user_id: string
        }
        Insert: {
          assessment_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          user_id: string
        }
        Update: {
          assessment_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_case_assignments_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          accidents_due_to_use: string | null
          acknowledges_problem: string | null
          additional_information: string | null
          age_first_used: number | null
          appetite_changes: string | null
          arrests_details: string | null
          arrests_history: string | null
          bankruptcy: string | null
          best_approach: string | null
          best_day_to_contact: string | null
          best_time_to_contact: string | null
          blackouts_history: string | null
          blended_family: string | null
          bottom_lines: Json | null
          boundaries_assessment: string | null
          budget_for_treatment: string | null
          child_welfare_involvement: string | null
          children_impacted: string | null
          children_present: string | null
          chronic_pain: string | null
          chronic_pain_details: string | null
          codependency_patterns: string | null
          cognitive_impairment: string | null
          contact_email: string
          contact_name: string
          contact_phone: string | null
          contact_relationship: string | null
          coping_skills: string | null
          created_at: string
          current_intoxication_level: string | null
          current_mental_health_symptoms: Json | null
          current_mental_health_treatment: string | null
          current_triggers: string | null
          current_using_substances: string | null
          custody_issues: string | null
          date_of_birth: string | null
          dcf_involvement_details: string | null
          debt_amount: string | null
          delirium_tremens_history: string | null
          divorced_parents: string | null
          dsm_activities_given_up: string | null
          dsm_behaviors: Json | null
          dsm_continued_despite_knowledge: string | null
          dsm_continued_use_problems: string | null
          dsm_cravings: string | null
          dsm_desire_cut_down: string | null
          dsm_failure_obligations: string | null
          dsm_hazardous_use: string | null
          dsm_larger_amounts: string | null
          dsm_time_spent: string | null
          dsm_tolerance: string | null
          dsm_withdrawal: string | null
          dsm_yes_count: number | null
          dui_history: string | null
          duration_of_use: string | null
          eating_disorder_history: string | null
          education_level: string | null
          employment_barriers: string | null
          employment_status: string | null
          enabling_behaviors_list: Json | null
          enabling_details: string | null
          er_visit_details: string | null
          estranged_details: string | null
          estranged_family_members: string | null
          ethnicity: string | null
          family_addiction_history: Json | null
          family_communication_patterns: string | null
          family_conflicts: string | null
          family_conflicts_details: string | null
          family_counseling_history: string | null
          family_enabling: string | null
          family_in_recovery: string | null
          family_intervention_concerns: string | null
          family_members_participating: Json | null
          family_mental_health_history: Json | null
          family_overdose_deaths: string | null
          family_psychiatric_hospitalizations: string | null
          family_ready_intervention: string | null
          family_recovery_history: string | null
          family_roles: string | null
          family_secrets: string | null
          family_signature: string | null
          family_suicide_history: string | null
          family_trauma_history: string | null
          family_unity_level: string | null
          financial_details: string | null
          financial_impact: string | null
          frequency: string | null
          generational_addiction_pattern: string | null
          geographic_preferences: string | null
          health_consequences: string | null
          health_issues: string | null
          health_issues_list: string | null
          hiding_use: string | null
          high_risk_situations: string | null
          homeless_unstable: string | null
          homicidal_ideation: string | null
          hospitalized_detox: string | null
          id: string
          immediate_safety_concerns: string | null
          impulse_control_issues: string | null
          infectious_disease_details: string | null
          infectious_diseases: string | null
          insurance_card_back_url: string | null
          insurance_card_front_url: string | null
          insurance_information: string | null
          intervention_barriers: string | null
          intervention_type_preference: string | null
          iv_drug_use: string | null
          job_loss_due_to_use: string | null
          last_physical_exam: string | null
          last_use_date: string | null
          legal_issues: string | null
          legal_issues_details: string | null
          living_situation: string | null
          longest_sobriety_period: string | null
          loved_one_age: number | null
          loved_one_gender: string | null
          loved_one_name: string
          marital_status: string | null
          medical_supervision_needed: string | null
          mental_health_details: string | null
          mental_health_diagnoses: Json | null
          mental_health_medications: Json | null
          mental_health_signs: string | null
          morning_use: string | null
          motivation_level: string | null
          naloxone_reversals: number | null
          notes: string | null
          occupation: string | null
          overall_risk_level: string | null
          overdose_details: string | null
          overdose_history: string | null
          peer_support_recovery: string | null
          pending_charges: string | null
          people_using_in_home: string | null
          physical_altercations: string | null
          physical_disabilities: string | null
          polysubstance_use: string | null
          potential_objections: string | null
          pregnancy_status: string | null
          prescribed_medications: string | null
          prescribed_medications_list: string | null
          previous_recovery_attempts: string | null
          primary_care_physician: string | null
          primary_language: string | null
          primary_substances: string | null
          prior_treatment: string | null
          probation_parole: string | null
          psychiatric_details: string | null
          psychiatric_history: string | null
          ptsd_symptoms: string | null
          recent_detox: string | null
          recent_er_visits: string | null
          recommended_level_of_care: string | null
          relapse_triggers: Json | null
          relapse_warning_signs: string | null
          relationship_losses: string | null
          relationship_losses_details: string | null
          relationship_with_using_friends: string | null
          resistance_factors: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          route_of_administration: string | null
          safe_housing_available: string | null
          seizure_history: string | null
          self_harm_history: string | null
          severity_level: string | null
          sleep_problems: string | null
          sober_living_interest: string | null
          source_attribution: Json
          special_considerations: string | null
          stable_living: string | null
          stage_of_change: string | null
          status: string | null
          stolen_from_family: string | null
          substances_accessible_home: string | null
          substances_used: Json | null
          suicide_attempts_details: string | null
          suicide_attempts_history: string | null
          suicide_ideation: string | null
          suicide_ideation_details: string | null
          support_network: string | null
          transportation_access: string | null
          trauma_details: string | null
          trauma_history: string | null
          treatment_goals: string | null
          treatment_history: Json | null
          treatment_preferences: string | null
          twelve_step_involvement: string | null
          typical_daily_use: string | null
          updated_at: string
          urgency_level: string | null
          use_increased: string | null
          using_alone: string | null
          veteran_status: string | null
          violence_details: string | null
          violence_history: string | null
          what_didnt_work: string | null
          what_motivates_individual: string | null
          what_worked_before: string | null
          who_holds_leverage: string | null
          willingness_to_change: string | null
          withdrawal_description: string | null
          withdrawal_medications: string | null
          withdrawal_medications_list: string | null
          withdrawal_severity: string | null
          withdrawal_symptoms: string | null
        }
        Insert: {
          accidents_due_to_use?: string | null
          acknowledges_problem?: string | null
          additional_information?: string | null
          age_first_used?: number | null
          appetite_changes?: string | null
          arrests_details?: string | null
          arrests_history?: string | null
          bankruptcy?: string | null
          best_approach?: string | null
          best_day_to_contact?: string | null
          best_time_to_contact?: string | null
          blackouts_history?: string | null
          blended_family?: string | null
          bottom_lines?: Json | null
          boundaries_assessment?: string | null
          budget_for_treatment?: string | null
          child_welfare_involvement?: string | null
          children_impacted?: string | null
          children_present?: string | null
          chronic_pain?: string | null
          chronic_pain_details?: string | null
          codependency_patterns?: string | null
          cognitive_impairment?: string | null
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          contact_relationship?: string | null
          coping_skills?: string | null
          created_at?: string
          current_intoxication_level?: string | null
          current_mental_health_symptoms?: Json | null
          current_mental_health_treatment?: string | null
          current_triggers?: string | null
          current_using_substances?: string | null
          custody_issues?: string | null
          date_of_birth?: string | null
          dcf_involvement_details?: string | null
          debt_amount?: string | null
          delirium_tremens_history?: string | null
          divorced_parents?: string | null
          dsm_activities_given_up?: string | null
          dsm_behaviors?: Json | null
          dsm_continued_despite_knowledge?: string | null
          dsm_continued_use_problems?: string | null
          dsm_cravings?: string | null
          dsm_desire_cut_down?: string | null
          dsm_failure_obligations?: string | null
          dsm_hazardous_use?: string | null
          dsm_larger_amounts?: string | null
          dsm_time_spent?: string | null
          dsm_tolerance?: string | null
          dsm_withdrawal?: string | null
          dsm_yes_count?: number | null
          dui_history?: string | null
          duration_of_use?: string | null
          eating_disorder_history?: string | null
          education_level?: string | null
          employment_barriers?: string | null
          employment_status?: string | null
          enabling_behaviors_list?: Json | null
          enabling_details?: string | null
          er_visit_details?: string | null
          estranged_details?: string | null
          estranged_family_members?: string | null
          ethnicity?: string | null
          family_addiction_history?: Json | null
          family_communication_patterns?: string | null
          family_conflicts?: string | null
          family_conflicts_details?: string | null
          family_counseling_history?: string | null
          family_enabling?: string | null
          family_in_recovery?: string | null
          family_intervention_concerns?: string | null
          family_members_participating?: Json | null
          family_mental_health_history?: Json | null
          family_overdose_deaths?: string | null
          family_psychiatric_hospitalizations?: string | null
          family_ready_intervention?: string | null
          family_recovery_history?: string | null
          family_roles?: string | null
          family_secrets?: string | null
          family_signature?: string | null
          family_suicide_history?: string | null
          family_trauma_history?: string | null
          family_unity_level?: string | null
          financial_details?: string | null
          financial_impact?: string | null
          frequency?: string | null
          generational_addiction_pattern?: string | null
          geographic_preferences?: string | null
          health_consequences?: string | null
          health_issues?: string | null
          health_issues_list?: string | null
          hiding_use?: string | null
          high_risk_situations?: string | null
          homeless_unstable?: string | null
          homicidal_ideation?: string | null
          hospitalized_detox?: string | null
          id?: string
          immediate_safety_concerns?: string | null
          impulse_control_issues?: string | null
          infectious_disease_details?: string | null
          infectious_diseases?: string | null
          insurance_card_back_url?: string | null
          insurance_card_front_url?: string | null
          insurance_information?: string | null
          intervention_barriers?: string | null
          intervention_type_preference?: string | null
          iv_drug_use?: string | null
          job_loss_due_to_use?: string | null
          last_physical_exam?: string | null
          last_use_date?: string | null
          legal_issues?: string | null
          legal_issues_details?: string | null
          living_situation?: string | null
          longest_sobriety_period?: string | null
          loved_one_age?: number | null
          loved_one_gender?: string | null
          loved_one_name: string
          marital_status?: string | null
          medical_supervision_needed?: string | null
          mental_health_details?: string | null
          mental_health_diagnoses?: Json | null
          mental_health_medications?: Json | null
          mental_health_signs?: string | null
          morning_use?: string | null
          motivation_level?: string | null
          naloxone_reversals?: number | null
          notes?: string | null
          occupation?: string | null
          overall_risk_level?: string | null
          overdose_details?: string | null
          overdose_history?: string | null
          peer_support_recovery?: string | null
          pending_charges?: string | null
          people_using_in_home?: string | null
          physical_altercations?: string | null
          physical_disabilities?: string | null
          polysubstance_use?: string | null
          potential_objections?: string | null
          pregnancy_status?: string | null
          prescribed_medications?: string | null
          prescribed_medications_list?: string | null
          previous_recovery_attempts?: string | null
          primary_care_physician?: string | null
          primary_language?: string | null
          primary_substances?: string | null
          prior_treatment?: string | null
          probation_parole?: string | null
          psychiatric_details?: string | null
          psychiatric_history?: string | null
          ptsd_symptoms?: string | null
          recent_detox?: string | null
          recent_er_visits?: string | null
          recommended_level_of_care?: string | null
          relapse_triggers?: Json | null
          relapse_warning_signs?: string | null
          relationship_losses?: string | null
          relationship_losses_details?: string | null
          relationship_with_using_friends?: string | null
          resistance_factors?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          route_of_administration?: string | null
          safe_housing_available?: string | null
          seizure_history?: string | null
          self_harm_history?: string | null
          severity_level?: string | null
          sleep_problems?: string | null
          sober_living_interest?: string | null
          source_attribution?: Json
          special_considerations?: string | null
          stable_living?: string | null
          stage_of_change?: string | null
          status?: string | null
          stolen_from_family?: string | null
          substances_accessible_home?: string | null
          substances_used?: Json | null
          suicide_attempts_details?: string | null
          suicide_attempts_history?: string | null
          suicide_ideation?: string | null
          suicide_ideation_details?: string | null
          support_network?: string | null
          transportation_access?: string | null
          trauma_details?: string | null
          trauma_history?: string | null
          treatment_goals?: string | null
          treatment_history?: Json | null
          treatment_preferences?: string | null
          twelve_step_involvement?: string | null
          typical_daily_use?: string | null
          updated_at?: string
          urgency_level?: string | null
          use_increased?: string | null
          using_alone?: string | null
          veteran_status?: string | null
          violence_details?: string | null
          violence_history?: string | null
          what_didnt_work?: string | null
          what_motivates_individual?: string | null
          what_worked_before?: string | null
          who_holds_leverage?: string | null
          willingness_to_change?: string | null
          withdrawal_description?: string | null
          withdrawal_medications?: string | null
          withdrawal_medications_list?: string | null
          withdrawal_severity?: string | null
          withdrawal_symptoms?: string | null
        }
        Update: {
          accidents_due_to_use?: string | null
          acknowledges_problem?: string | null
          additional_information?: string | null
          age_first_used?: number | null
          appetite_changes?: string | null
          arrests_details?: string | null
          arrests_history?: string | null
          bankruptcy?: string | null
          best_approach?: string | null
          best_day_to_contact?: string | null
          best_time_to_contact?: string | null
          blackouts_history?: string | null
          blended_family?: string | null
          bottom_lines?: Json | null
          boundaries_assessment?: string | null
          budget_for_treatment?: string | null
          child_welfare_involvement?: string | null
          children_impacted?: string | null
          children_present?: string | null
          chronic_pain?: string | null
          chronic_pain_details?: string | null
          codependency_patterns?: string | null
          cognitive_impairment?: string | null
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          contact_relationship?: string | null
          coping_skills?: string | null
          created_at?: string
          current_intoxication_level?: string | null
          current_mental_health_symptoms?: Json | null
          current_mental_health_treatment?: string | null
          current_triggers?: string | null
          current_using_substances?: string | null
          custody_issues?: string | null
          date_of_birth?: string | null
          dcf_involvement_details?: string | null
          debt_amount?: string | null
          delirium_tremens_history?: string | null
          divorced_parents?: string | null
          dsm_activities_given_up?: string | null
          dsm_behaviors?: Json | null
          dsm_continued_despite_knowledge?: string | null
          dsm_continued_use_problems?: string | null
          dsm_cravings?: string | null
          dsm_desire_cut_down?: string | null
          dsm_failure_obligations?: string | null
          dsm_hazardous_use?: string | null
          dsm_larger_amounts?: string | null
          dsm_time_spent?: string | null
          dsm_tolerance?: string | null
          dsm_withdrawal?: string | null
          dsm_yes_count?: number | null
          dui_history?: string | null
          duration_of_use?: string | null
          eating_disorder_history?: string | null
          education_level?: string | null
          employment_barriers?: string | null
          employment_status?: string | null
          enabling_behaviors_list?: Json | null
          enabling_details?: string | null
          er_visit_details?: string | null
          estranged_details?: string | null
          estranged_family_members?: string | null
          ethnicity?: string | null
          family_addiction_history?: Json | null
          family_communication_patterns?: string | null
          family_conflicts?: string | null
          family_conflicts_details?: string | null
          family_counseling_history?: string | null
          family_enabling?: string | null
          family_in_recovery?: string | null
          family_intervention_concerns?: string | null
          family_members_participating?: Json | null
          family_mental_health_history?: Json | null
          family_overdose_deaths?: string | null
          family_psychiatric_hospitalizations?: string | null
          family_ready_intervention?: string | null
          family_recovery_history?: string | null
          family_roles?: string | null
          family_secrets?: string | null
          family_signature?: string | null
          family_suicide_history?: string | null
          family_trauma_history?: string | null
          family_unity_level?: string | null
          financial_details?: string | null
          financial_impact?: string | null
          frequency?: string | null
          generational_addiction_pattern?: string | null
          geographic_preferences?: string | null
          health_consequences?: string | null
          health_issues?: string | null
          health_issues_list?: string | null
          hiding_use?: string | null
          high_risk_situations?: string | null
          homeless_unstable?: string | null
          homicidal_ideation?: string | null
          hospitalized_detox?: string | null
          id?: string
          immediate_safety_concerns?: string | null
          impulse_control_issues?: string | null
          infectious_disease_details?: string | null
          infectious_diseases?: string | null
          insurance_card_back_url?: string | null
          insurance_card_front_url?: string | null
          insurance_information?: string | null
          intervention_barriers?: string | null
          intervention_type_preference?: string | null
          iv_drug_use?: string | null
          job_loss_due_to_use?: string | null
          last_physical_exam?: string | null
          last_use_date?: string | null
          legal_issues?: string | null
          legal_issues_details?: string | null
          living_situation?: string | null
          longest_sobriety_period?: string | null
          loved_one_age?: number | null
          loved_one_gender?: string | null
          loved_one_name?: string
          marital_status?: string | null
          medical_supervision_needed?: string | null
          mental_health_details?: string | null
          mental_health_diagnoses?: Json | null
          mental_health_medications?: Json | null
          mental_health_signs?: string | null
          morning_use?: string | null
          motivation_level?: string | null
          naloxone_reversals?: number | null
          notes?: string | null
          occupation?: string | null
          overall_risk_level?: string | null
          overdose_details?: string | null
          overdose_history?: string | null
          peer_support_recovery?: string | null
          pending_charges?: string | null
          people_using_in_home?: string | null
          physical_altercations?: string | null
          physical_disabilities?: string | null
          polysubstance_use?: string | null
          potential_objections?: string | null
          pregnancy_status?: string | null
          prescribed_medications?: string | null
          prescribed_medications_list?: string | null
          previous_recovery_attempts?: string | null
          primary_care_physician?: string | null
          primary_language?: string | null
          primary_substances?: string | null
          prior_treatment?: string | null
          probation_parole?: string | null
          psychiatric_details?: string | null
          psychiatric_history?: string | null
          ptsd_symptoms?: string | null
          recent_detox?: string | null
          recent_er_visits?: string | null
          recommended_level_of_care?: string | null
          relapse_triggers?: Json | null
          relapse_warning_signs?: string | null
          relationship_losses?: string | null
          relationship_losses_details?: string | null
          relationship_with_using_friends?: string | null
          resistance_factors?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          route_of_administration?: string | null
          safe_housing_available?: string | null
          seizure_history?: string | null
          self_harm_history?: string | null
          severity_level?: string | null
          sleep_problems?: string | null
          sober_living_interest?: string | null
          source_attribution?: Json
          special_considerations?: string | null
          stable_living?: string | null
          stage_of_change?: string | null
          status?: string | null
          stolen_from_family?: string | null
          substances_accessible_home?: string | null
          substances_used?: Json | null
          suicide_attempts_details?: string | null
          suicide_attempts_history?: string | null
          suicide_ideation?: string | null
          suicide_ideation_details?: string | null
          support_network?: string | null
          transportation_access?: string | null
          trauma_details?: string | null
          trauma_history?: string | null
          treatment_goals?: string | null
          treatment_history?: Json | null
          treatment_preferences?: string | null
          twelve_step_involvement?: string | null
          typical_daily_use?: string | null
          updated_at?: string
          urgency_level?: string | null
          use_increased?: string | null
          using_alone?: string | null
          veteran_status?: string | null
          violence_details?: string | null
          violence_history?: string | null
          what_didnt_work?: string | null
          what_motivates_individual?: string | null
          what_worked_before?: string | null
          who_holds_leverage?: string | null
          willingness_to_change?: string | null
          withdrawal_description?: string | null
          withdrawal_medications?: string | null
          withdrawal_medications_list?: string | null
          withdrawal_severity?: string | null
          withdrawal_symptoms?: string | null
        }
        Relationships: []
      }
      availability_settings: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          is_available: boolean
          start_time: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          is_available?: boolean
          start_time: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          is_available?: boolean
          start_time?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          category: string
          content: string
          created_at: string
          excerpt: string
          id: string
          image_url: string | null
          published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          excerpt: string
          id?: string
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          agreement_accepted: boolean
          agreement_signed_at: string | null
          agreement_signer_name: string | null
          agreement_text: string | null
          agreement_version: string | null
          amount_cents: number | null
          booking_date: string
          booking_time: string
          booking_type: string
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          duration_minutes: number
          id: string
          notes: string | null
          payment_id: string | null
          reminder_sent: boolean
          source_attribution: Json
          status: string
          updated_at: string
        }
        Insert: {
          agreement_accepted?: boolean
          agreement_signed_at?: string | null
          agreement_signer_name?: string | null
          agreement_text?: string | null
          agreement_version?: string | null
          amount_cents?: number | null
          booking_date: string
          booking_time: string
          booking_type: string
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          duration_minutes?: number
          id?: string
          notes?: string | null
          payment_id?: string | null
          reminder_sent?: boolean
          source_attribution?: Json
          status?: string
          updated_at?: string
        }
        Update: {
          agreement_accepted?: boolean
          agreement_signed_at?: string | null
          agreement_signer_name?: string | null
          agreement_text?: string | null
          agreement_version?: string | null
          amount_cents?: number | null
          booking_date?: string
          booking_time?: string
          booking_type?: string
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          duration_minutes?: number
          id?: string
          notes?: string | null
          payment_id?: string | null
          reminder_sent?: boolean
          source_attribution?: Json
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookings_access_audit: {
        Row: {
          action: string
          actor_email: string | null
          actor_user_id: string | null
          booking_id: string | null
          created_at: string
          id: string
          ip: string | null
          metadata: Json
          user_agent: string | null
        }
        Insert: {
          action: string
          actor_email?: string | null
          actor_user_id?: string | null
          booking_id?: string | null
          created_at?: string
          id?: string
          ip?: string | null
          metadata?: Json
          user_agent?: string | null
        }
        Update: {
          action?: string
          actor_email?: string | null
          actor_user_id?: string | null
          booking_id?: string | null
          created_at?: string
          id?: string
          ip?: string | null
          metadata?: Json
          user_agent?: string | null
        }
        Relationships: []
      }
      call_analytics: {
        Row: {
          created_at: string
          device_type: string | null
          id: string
          metadata: Json | null
          page_path: string
          page_url: string
          phone_number: string
          referrer: string | null
          screen_height: number | null
          screen_width: number | null
          session_id: string | null
          source_attribution: Json
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          device_type?: string | null
          id?: string
          metadata?: Json | null
          page_path: string
          page_url: string
          phone_number?: string
          referrer?: string | null
          screen_height?: number | null
          screen_width?: number | null
          session_id?: string | null
          source_attribution?: Json
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          device_type?: string | null
          id?: string
          metadata?: Json | null
          page_path?: string
          page_url?: string
          phone_number?: string
          referrer?: string | null
          screen_height?: number | null
          screen_width?: number | null
          session_id?: string | null
          source_attribution?: Json
          user_agent?: string | null
        }
        Relationships: []
      }
      case_documents: {
        Row: {
          ai_summary: string | null
          client_name: string
          created_at: string
          doc_type: string
          file_path: string | null
          file_size: number | null
          file_url: string | null
          id: string
          mime_type: string | null
          notes: string | null
          notion_case_id: string
          title: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          ai_summary?: string | null
          client_name: string
          created_at?: string
          doc_type: string
          file_path?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          mime_type?: string | null
          notes?: string | null
          notion_case_id: string
          title: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          ai_summary?: string | null
          client_name?: string
          created_at?: string
          doc_type?: string
          file_path?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          mime_type?: string | null
          notes?: string | null
          notion_case_id?: string
          title?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          page_path: string | null
          phone: string | null
          source_attribution: Json
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          page_path?: string | null
          phone?: string | null
          source_attribution?: Json
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          page_path?: string | null
          phone?: string | null
          source_attribution?: Json
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      contracts: {
        Row: {
          agreement_text: string
          agreement_version: string
          amount_cents: number | null
          client_email: string
          client_name: string
          client_phone: string | null
          contract_pdf_path: string | null
          contract_pdf_url: string | null
          contract_type: string
          created_at: string
          discount_cents: number | null
          discount_code: string | null
          id: string
          metadata: Json
          payment_id: string | null
          payment_link_id: string | null
          signed_at: string
          signer_name: string
          source_attribution: Json
          status: string
          updated_at: string
        }
        Insert: {
          agreement_text: string
          agreement_version: string
          amount_cents?: number | null
          client_email: string
          client_name: string
          client_phone?: string | null
          contract_pdf_path?: string | null
          contract_pdf_url?: string | null
          contract_type: string
          created_at?: string
          discount_cents?: number | null
          discount_code?: string | null
          id?: string
          metadata?: Json
          payment_id?: string | null
          payment_link_id?: string | null
          signed_at?: string
          signer_name: string
          source_attribution?: Json
          status?: string
          updated_at?: string
        }
        Update: {
          agreement_text?: string
          agreement_version?: string
          amount_cents?: number | null
          client_email?: string
          client_name?: string
          client_phone?: string | null
          contract_pdf_path?: string | null
          contract_pdf_url?: string | null
          contract_type?: string
          created_at?: string
          discount_cents?: number | null
          discount_code?: string | null
          id?: string
          metadata?: Json
          payment_id?: string | null
          payment_link_id?: string | null
          signed_at?: string
          signer_name?: string
          source_attribution?: Json
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      crm_contacts: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_contacted_at: string | null
          last_engagement_at: string | null
          last_name: string | null
          lead_score: number
          next_action: string | null
          next_action_due_at: string | null
          notes: string | null
          phone: string | null
          pipeline_status: string
          revenue_path: string | null
          source: string
          source_attribution: Json
          unsubscribe_token: string
          unsubscribed: boolean
          unsubscribed_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_contacted_at?: string | null
          last_engagement_at?: string | null
          last_name?: string | null
          lead_score?: number
          next_action?: string | null
          next_action_due_at?: string | null
          notes?: string | null
          phone?: string | null
          pipeline_status?: string
          revenue_path?: string | null
          source?: string
          source_attribution?: Json
          unsubscribe_token?: string
          unsubscribed?: boolean
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_contacted_at?: string | null
          last_engagement_at?: string | null
          last_name?: string | null
          lead_score?: number
          next_action?: string | null
          next_action_due_at?: string | null
          notes?: string | null
          phone?: string | null
          pipeline_status?: string
          revenue_path?: string | null
          source?: string
          source_attribution?: Json
          unsubscribe_token?: string
          unsubscribed?: boolean
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      discount_codes: {
        Row: {
          amount_cents: number
          base_amount_cents: number
          code: string
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          issued_to_email: string | null
          issued_to_name: string | null
          notes: string | null
          updated_at: string
          used_at: string | null
          used_by_contract_id: string | null
          used_by_email: string | null
        }
        Insert: {
          amount_cents: number
          base_amount_cents: number
          code: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          issued_to_email?: string | null
          issued_to_name?: string | null
          notes?: string | null
          updated_at?: string
          used_at?: string | null
          used_by_contract_id?: string | null
          used_by_email?: string | null
        }
        Update: {
          amount_cents?: number
          base_amount_cents?: number
          code?: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          issued_to_email?: string | null
          issued_to_name?: string | null
          notes?: string | null
          updated_at?: string
          used_at?: string | null
          used_by_contract_id?: string | null
          used_by_email?: string | null
        }
        Relationships: []
      }
      email_campaign_sends: {
        Row: {
          campaign_id: string
          contact_id: string | null
          created_at: string
          email: string
          error: string | null
          id: string
          sent_at: string | null
          status: string
        }
        Insert: {
          campaign_id: string
          contact_id?: string | null
          created_at?: string
          email: string
          error?: string | null
          id?: string
          sent_at?: string | null
          status: string
        }
        Update: {
          campaign_id?: string
          contact_id?: string | null
          created_at?: string
          email?: string
          error?: string | null
          id?: string
          sent_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_campaign_sends_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaign_sends_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaigns: {
        Row: {
          created_at: string
          created_by: string | null
          failed_count: number
          from_email: string | null
          from_name: string | null
          html_body: string
          id: string
          recipient_count: number
          reply_to: string | null
          sent_count: number
          status: string
          subject: string
          text_body: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          failed_count?: number
          from_email?: string | null
          from_name?: string | null
          html_body: string
          id?: string
          recipient_count?: number
          reply_to?: string | null
          sent_count?: number
          status?: string
          subject: string
          text_body?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          failed_count?: number
          from_email?: string | null
          from_name?: string | null
          html_body?: string
          id?: string
          recipient_count?: number
          reply_to?: string | null
          sent_count?: number
          status?: string
          subject?: string
          text_body?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      family_reviews: {
        Row: {
          approved: boolean | null
          city: string
          company: string | null
          created_at: string
          first_name: string
          id: string
          last_initial: string
          last_name: string | null
          profession: string | null
          rating: number
          review_text: string
          reviewer_type: string
          state: string | null
        }
        Insert: {
          approved?: boolean | null
          city: string
          company?: string | null
          created_at?: string
          first_name: string
          id?: string
          last_initial: string
          last_name?: string | null
          profession?: string | null
          rating?: number
          review_text: string
          reviewer_type?: string
          state?: string | null
        }
        Update: {
          approved?: boolean | null
          city?: string
          company?: string | null
          created_at?: string
          first_name?: string
          id?: string
          last_initial?: string
          last_name?: string | null
          profession?: string | null
          rating?: number
          review_text?: string
          reviewer_type?: string
          state?: string | null
        }
        Relationships: []
      }
      freedom_followup_queue: {
        Row: {
          body_html: string
          contact_email: string
          contact_name: string
          contact_phone: string | null
          created_at: string
          due_at: string
          error_message: string | null
          followup_reason: string
          id: string
          lead_id: string | null
          lead_type: string
          priority: string
          recipient_type: string
          sent_at: string | null
          sequence_step: number
          source_attribution: Json
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          body_html: string
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          created_at?: string
          due_at?: string
          error_message?: string | null
          followup_reason: string
          id?: string
          lead_id?: string | null
          lead_type: string
          priority?: string
          recipient_type?: string
          sent_at?: string | null
          sequence_step?: number
          source_attribution?: Json
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          body_html?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          created_at?: string
          due_at?: string
          error_message?: string | null
          followup_reason?: string
          id?: string
          lead_id?: string | null
          lead_type?: string
          priority?: string
          recipient_type?: string
          sent_at?: string | null
          sequence_step?: number
          source_attribution?: Json
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_assessment_access_rate: { Args: never; Returns: boolean }
      check_bookings_access_rate: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_assigned_to_assessment: {
        Args: { _assessment_id: string }
        Returns: boolean
      }
      is_strict_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
