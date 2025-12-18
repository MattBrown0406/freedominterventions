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
      assessments: {
        Row: {
          age_first_used: number | null
          best_day_to_contact: string | null
          best_time_to_contact: string | null
          child_welfare_involvement: string | null
          children_impacted: string | null
          children_present: string | null
          contact_email: string
          contact_name: string
          contact_phone: string | null
          contact_relationship: string | null
          created_at: string
          current_triggers: string | null
          dsm_behaviors: Json | null
          dsm_yes_count: number | null
          duration_of_use: string | null
          enabling_details: string | null
          er_visit_details: string | null
          family_enabling: string | null
          family_ready_intervention: string | null
          family_signature: string | null
          financial_details: string | null
          financial_impact: string | null
          frequency: string | null
          health_issues: string | null
          health_issues_list: string | null
          homeless_unstable: string | null
          hospitalized_detox: string | null
          id: string
          intervention_barriers: string | null
          loved_one_age: number | null
          loved_one_gender: string | null
          loved_one_name: string
          mental_health_details: string | null
          mental_health_signs: string | null
          notes: string | null
          prescribed_medications: string | null
          prescribed_medications_list: string | null
          primary_substances: string | null
          prior_treatment: string | null
          psychiatric_details: string | null
          psychiatric_history: string | null
          recent_detox: string | null
          recent_er_visits: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          severity_level: string | null
          stable_living: string | null
          status: string | null
          support_network: string | null
          treatment_history: Json | null
          updated_at: string
          use_increased: string | null
          violence_details: string | null
          violence_history: string | null
          willingness_to_change: string | null
          withdrawal_description: string | null
          withdrawal_medications: string | null
          withdrawal_medications_list: string | null
          withdrawal_symptoms: string | null
        }
        Insert: {
          age_first_used?: number | null
          best_day_to_contact?: string | null
          best_time_to_contact?: string | null
          child_welfare_involvement?: string | null
          children_impacted?: string | null
          children_present?: string | null
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          contact_relationship?: string | null
          created_at?: string
          current_triggers?: string | null
          dsm_behaviors?: Json | null
          dsm_yes_count?: number | null
          duration_of_use?: string | null
          enabling_details?: string | null
          er_visit_details?: string | null
          family_enabling?: string | null
          family_ready_intervention?: string | null
          family_signature?: string | null
          financial_details?: string | null
          financial_impact?: string | null
          frequency?: string | null
          health_issues?: string | null
          health_issues_list?: string | null
          homeless_unstable?: string | null
          hospitalized_detox?: string | null
          id?: string
          intervention_barriers?: string | null
          loved_one_age?: number | null
          loved_one_gender?: string | null
          loved_one_name: string
          mental_health_details?: string | null
          mental_health_signs?: string | null
          notes?: string | null
          prescribed_medications?: string | null
          prescribed_medications_list?: string | null
          primary_substances?: string | null
          prior_treatment?: string | null
          psychiatric_details?: string | null
          psychiatric_history?: string | null
          recent_detox?: string | null
          recent_er_visits?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          severity_level?: string | null
          stable_living?: string | null
          status?: string | null
          support_network?: string | null
          treatment_history?: Json | null
          updated_at?: string
          use_increased?: string | null
          violence_details?: string | null
          violence_history?: string | null
          willingness_to_change?: string | null
          withdrawal_description?: string | null
          withdrawal_medications?: string | null
          withdrawal_medications_list?: string | null
          withdrawal_symptoms?: string | null
        }
        Update: {
          age_first_used?: number | null
          best_day_to_contact?: string | null
          best_time_to_contact?: string | null
          child_welfare_involvement?: string | null
          children_impacted?: string | null
          children_present?: string | null
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          contact_relationship?: string | null
          created_at?: string
          current_triggers?: string | null
          dsm_behaviors?: Json | null
          dsm_yes_count?: number | null
          duration_of_use?: string | null
          enabling_details?: string | null
          er_visit_details?: string | null
          family_enabling?: string | null
          family_ready_intervention?: string | null
          family_signature?: string | null
          financial_details?: string | null
          financial_impact?: string | null
          frequency?: string | null
          health_issues?: string | null
          health_issues_list?: string | null
          homeless_unstable?: string | null
          hospitalized_detox?: string | null
          id?: string
          intervention_barriers?: string | null
          loved_one_age?: number | null
          loved_one_gender?: string | null
          loved_one_name?: string
          mental_health_details?: string | null
          mental_health_signs?: string | null
          notes?: string | null
          prescribed_medications?: string | null
          prescribed_medications_list?: string | null
          primary_substances?: string | null
          prior_treatment?: string | null
          psychiatric_details?: string | null
          psychiatric_history?: string | null
          recent_detox?: string | null
          recent_er_visits?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          severity_level?: string | null
          stable_living?: string | null
          status?: string | null
          support_network?: string | null
          treatment_history?: Json | null
          updated_at?: string
          use_increased?: string | null
          violence_details?: string | null
          violence_history?: string | null
          willingness_to_change?: string | null
          withdrawal_description?: string | null
          withdrawal_medications?: string | null
          withdrawal_medications_list?: string | null
          withdrawal_symptoms?: string | null
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
          status: string
          updated_at: string
        }
        Insert: {
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
          status?: string
          updated_at?: string
        }
        Update: {
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
          status?: string
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
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
