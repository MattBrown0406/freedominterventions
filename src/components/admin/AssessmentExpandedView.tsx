import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, User, Pill, Brain, Heart, Home, Users, Scale, Target, Shield, CreditCard, ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SubstanceEntry {
  substance: string;
  ageFirstUsed: string;
  routeOfAdministration: string;
  frequency: string;
  lastUsed: string;
  currentlyUsing: boolean;
}

interface TreatmentEntry {
  programName: string;
  programType?: string;
  dateAttended: string;
  durationDays?: string;
  successfulCompletion: boolean;
  aftercareFollowed?: boolean;
  reasonForLeaving?: string;
}

interface FamilyMemberEntry {
  name: string;
  relationship: string;
  willingToParticipate: boolean;
  hasLeverage: boolean;
  leverageDetails: string;
}

interface FamilyHistoryEntry {
  relationship: string;
  condition?: string;
  substanceOrBehavior?: string;
  diagnosis?: string;
  currentStatus?: string;
  recoveryStatus?: string;
  treatmentStatus?: string;
}

interface BottomLine {
  familyMember: string;
  consequence: string;
  willingToFollow: boolean;
}

// Using 'any' for assessment since the full type is very large
interface AssessmentExpandedViewProps {
  assessment: any;
}

const DSM_CRITERIA_MAP: Record<string, string> = {
  "larger_amounts": "Used larger amounts or longer than intended",
  "desire_cut_down": "Persistent desire or unsuccessful efforts to cut down",
  "time_spent": "Great deal of time obtaining, using, or recovering",
  "cravings": "Craving or strong desire to use",
  "failure_obligations": "Failure to fulfill major role obligations",
  "continued_despite_problems": "Continued use despite social/interpersonal problems",
  "activities_given_up": "Important activities given up or reduced",
  "hazardous_use": "Recurrent use in hazardous situations",
  "continued_despite_knowledge": "Continued use despite physical/psychological problems",
  "tolerance": "Tolerance (needing more for same effect)",
  "withdrawal": "Withdrawal symptoms or use to avoid withdrawal",
};

// Legacy question-based keys
const LEGACY_DSM_LABELS = [
  { q: "Has your loved one used substances in larger amounts or for longer periods than they originally intended?", l: "Used larger amounts/longer" },
  { q: "Has your loved one expressed a desire to cut down or stop using but been unable to do so?", l: "Unable to cut down" },
  { q: "Does your loved one spend a significant amount of time obtaining, using, or recovering from substances?", l: "Time spent obtaining/using" },
  { q: "Does your loved one experience strong cravings or urges to use substances?", l: "Cravings/urges" },
  { q: "Has substance use caused your loved one to miss important family events, work responsibilities, or school obligations?", l: "Missed obligations" },
  { q: "Has your loved one continued using despite it causing problems in their relationships or social life?", l: "Continued despite problems" },
  { q: "Has your loved one given up or reduced participation in activities they once enjoyed because of substance use?", l: "Gave up activities" },
  { q: "Has your loved one engaged in risky behaviors while using, such as driving under the influence or unsafe sexual activity?", l: "Risky behaviors" },
  { q: "Has your loved one needed to use more of the substance to achieve the same effect they used to get with less (tolerance)?", l: "Tolerance" },
  { q: "Has your loved one experienced physical or emotional withdrawal symptoms when not using the substance?", l: "Withdrawal symptoms" },
  { q: "Has your loved one used substances specifically to avoid or relieve withdrawal symptoms?", l: "Used to avoid withdrawal" },
  { q: "Has substance use interfered with your loved one's ability to fulfill major responsibilities at work, school, or home?", l: "Failed major responsibilities" },
  { q: "Has your loved one experienced legal problems as a result of their substance use?", l: "Legal problems" },
];

const SectionHeader = ({ title, icon: Icon, variant = "default" }: { title: string; icon?: any; variant?: "default" | "danger" | "warning" | "success" }) => {
  const variantClasses = {
    default: "bg-primary/10 text-primary border-primary/20",
    danger: "bg-destructive/10 text-destructive border-destructive/20",
    warning: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    success: "bg-green-500/10 text-green-600 border-green-500/20",
  };
  
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-md border ${variantClasses[variant]} mb-3`}>
      {Icon && <Icon className="w-4 h-4" />}
      <h4 className="font-semibold text-sm uppercase tracking-wide">{title}</h4>
    </div>
  );
};

const Field = ({ label, value, highlight = false }: { label: string; value: any; highlight?: boolean }) => {
  if (value === null || value === undefined || value === "" || value === "N/A") return null;
  
  const displayValue = Array.isArray(value) ? value.join(", ") : String(value);
  
  return (
    <div className="py-1">
      <span className="text-muted-foreground text-sm">{label}: </span>
      <span className={`text-sm ${highlight ? "text-destructive font-medium" : ""}`}>{displayValue}</span>
    </div>
  );
};

const YesNoField = ({ label, value, details }: { label: string; value: string | null; details?: string | null }) => {
  if (!value) return null;
  const isYes = value.toLowerCase() === "yes";
  
  return (
    <div className="py-1">
      <span className="text-muted-foreground text-sm">{label}: </span>
      <span className={`text-sm ${isYes ? "text-destructive font-medium" : ""}`}>{value}</span>
      {details && <span className="text-sm text-muted-foreground"> — {details}</span>}
    </div>
  );
};

// Insurance Card Viewer component for admins
const InsuranceCardViewer = ({ frontPath, backPath }: { frontPath?: string; backPath?: string }) => {
  const [frontUrl, setFrontUrl] = useState<string | null>(null);
  const [backUrl, setBackUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      try {
        if (frontPath) {
          const { data } = await supabase.storage
            .from('insurance-cards')
            .createSignedUrl(frontPath, 3600); // 1 hour expiry
          if (data?.signedUrl) setFrontUrl(data.signedUrl);
        }
        if (backPath) {
          const { data } = await supabase.storage
            .from('insurance-cards')
            .createSignedUrl(backPath, 3600);
          if (data?.signedUrl) setBackUrl(data.signedUrl);
        }
      } catch (error) {
        console.error('Error fetching insurance card URLs:', error);
      }
      setLoading(false);
    };

    fetchUrls();
  }, [frontPath, backPath]);

  if (!frontPath && !backPath) return null;

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading insurance cards...</span>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
      <div className="flex items-center gap-2 mb-3">
        <CreditCard className="h-4 w-4 text-primary" />
        <span className="font-medium text-sm">Insurance Cards</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {frontUrl && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Front of Card</p>
            <a href={frontUrl} target="_blank" rel="noopener noreferrer">
              <img 
                src={frontUrl} 
                alt="Insurance card front" 
                className="rounded-md border shadow-sm max-h-48 object-contain hover:opacity-90 transition-opacity cursor-pointer"
              />
            </a>
            <Button variant="outline" size="sm" asChild>
              <a href={frontUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                View Full Size
              </a>
            </Button>
          </div>
        )}
        {backUrl && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Back of Card</p>
            <a href={backUrl} target="_blank" rel="noopener noreferrer">
              <img 
                src={backUrl} 
                alt="Insurance card back" 
                className="rounded-md border shadow-sm max-h-48 object-contain hover:opacity-90 transition-opacity cursor-pointer"
              />
            </a>
            <Button variant="outline" size="sm" asChild>
              <a href={backUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                View Full Size
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const AssessmentExpandedView = ({ assessment }: AssessmentExpandedViewProps) => {
  // Parse withdrawal symptoms if JSON
  let withdrawalSymptoms = { physical: [] as string[], psychological: [] as string[] };
  if (assessment.withdrawal_symptoms) {
    try {
      withdrawalSymptoms = JSON.parse(assessment.withdrawal_symptoms);
    } catch {
      // Not JSON, use as-is
    }
  }
  
  // Get DSM criteria display
  const getDsmLabel = (key: string): string => {
    if (DSM_CRITERIA_MAP[key]) return DSM_CRITERIA_MAP[key];
    const legacy = LEGACY_DSM_LABELS.find(l => l.q === key);
    if (legacy) return legacy.l;
    return key.substring(0, 40) + "...";
  };
  
  return (
    <div className="mt-4 pt-4 border-t space-y-6">
      {/* Demographics & Background */}
      <div>
        <SectionHeader title="Demographics & Background" icon={User} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 text-sm">
          <Field label="Gender" value={assessment.loved_one_gender} />
          <Field label="Date of Birth" value={assessment.date_of_birth} />
          <Field label="Marital Status" value={assessment.marital_status} />
          <Field label="Employment" value={assessment.employment_status} />
          <Field label="Occupation" value={assessment.occupation} />
          <Field label="Education" value={assessment.education_level} />
          <Field label="Living Situation" value={assessment.living_situation} />
          <Field label="Veteran Status" value={assessment.veteran_status} />
          <Field label="Primary Language" value={assessment.primary_language} />
          <Field label="Ethnicity" value={assessment.ethnicity} />
        </div>
      </div>

      <Separator />

      {/* Substance Use History */}
      <div>
        <SectionHeader title="Substance Use History" icon={Pill} variant="danger" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 text-sm">
          <Field label="Primary Substances" value={assessment.primary_substances} />
          <Field label="Frequency" value={assessment.frequency} />
          <Field label="Duration" value={assessment.duration_of_use} />
          <Field label="Age First Used" value={assessment.age_first_used} />
          <Field label="Last Use Date" value={assessment.last_use_date} />
          <Field label="Typical Daily Use" value={assessment.typical_daily_use} />
          <Field label="Route of Administration" value={assessment.route_of_administration} />
          <Field label="Longest Sobriety" value={assessment.longest_sobriety_period} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 mt-2">
          <YesNoField label="Polysubstance Use" value={assessment.polysubstance_use} />
          <YesNoField label="IV Drug Use" value={assessment.iv_drug_use} />
          <YesNoField label="Use Increased" value={assessment.use_increased} />
          <YesNoField label="Morning Use" value={assessment.morning_use} />
          <YesNoField label="Using Alone" value={assessment.using_alone} />
          <YesNoField label="Hiding Use" value={assessment.hiding_use} />
          <YesNoField label="Blackouts" value={assessment.blackouts_history} />
        </div>
        
        {/* Overdose History */}
        {(assessment.overdose_history === "yes" || assessment.naloxone_reversals) && (
          <div className="mt-3 p-3 bg-destructive/10 rounded-md">
            <p className="text-destructive font-medium text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Overdose History
            </p>
            <YesNoField label="Overdose History" value={assessment.overdose_history} details={assessment.overdose_details} />
            <Field label="Naloxone Reversals" value={assessment.naloxone_reversals} highlight />
          </div>
        )}
        
        {/* Detailed Substances */}
        {assessment.substances_used && assessment.substances_used.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium mb-2">Detailed Substance History:</p>
            <div className="space-y-2">
              {(assessment.substances_used as SubstanceEntry[]).map((sub, idx) => (
                <div key={idx} className="text-sm bg-muted/50 p-2 rounded">
                  <span className="font-medium">{sub.substance}</span>
                  <span className="text-muted-foreground"> — Started: age {sub.ageFirstUsed || "?"} | Route: {sub.routeOfAdministration || "?"} | Freq: {sub.frequency || "?"} | Last: {sub.lastUsed || "?"} | {sub.currentlyUsing ? "Currently using" : "Not currently using"}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* DSM-5 Criteria */}
      <div>
        <SectionHeader 
          title={`DSM-5 Criteria (${assessment.dsm_yes_count || 0}/11 Met) — ${assessment.severity_level || "Pending"}`} 
          icon={Scale}
          variant={assessment.severity_level === "Severe" ? "danger" : assessment.severity_level === "Moderate" ? "warning" : "default"}
        />
        {assessment.dsm_behaviors && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
            {Object.entries(assessment.dsm_behaviors as Record<string, boolean>).map(([key, met]) => (
              <div key={key} className="flex items-center gap-2">
                <span className={met ? "text-destructive" : "text-muted-foreground"}>
                  {met ? "✓" : "○"}
                </span>
                <span className={met ? "font-medium" : "text-muted-foreground"}>
                  {getDsmLabel(key)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Withdrawal & Medical Risks */}
      <div>
        <SectionHeader title="Withdrawal & Medical Risks" icon={Heart} variant="warning" />
        
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Withdrawal Assessment:</p>
          {withdrawalSymptoms.physical?.length > 0 && (
            <Field label="Physical Symptoms" value={withdrawalSymptoms.physical} />
          )}
          {withdrawalSymptoms.psychological?.length > 0 && (
            <Field label="Psychological Symptoms" value={withdrawalSymptoms.psychological} />
          )}
          {!withdrawalSymptoms.physical?.length && !withdrawalSymptoms.psychological?.length && assessment.withdrawal_symptoms && (
            <Field label="Symptoms" value={assessment.withdrawal_symptoms} />
          )}
          <Field label="Description" value={assessment.withdrawal_description} />
          <Field label="Severity" value={assessment.withdrawal_severity} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4">
            <YesNoField label="Seizure History" value={assessment.seizure_history} />
            <YesNoField label="Delirium Tremens" value={assessment.delirium_tremens_history} />
            <YesNoField label="Recent Detox" value={assessment.recent_detox} />
            <YesNoField label="Hospitalized Detox" value={assessment.hospitalized_detox} />
            <YesNoField label="Medical Supervision Needed" value={assessment.medical_supervision_needed} />
          </div>
          {assessment.withdrawal_medications === "yes" && (
            <Field label="Withdrawal Medications" value={assessment.withdrawal_medications_list} />
          )}
        </div>
        
        <div>
          <p className="text-sm font-medium mb-2">Medical Conditions:</p>
          <YesNoField label="Health Issues" value={assessment.health_issues} details={assessment.health_issues_list} />
          <YesNoField label="Recent ER Visits" value={assessment.recent_er_visits} details={assessment.er_visit_details} />
          <YesNoField label="Prescribed Medications" value={assessment.prescribed_medications} details={assessment.prescribed_medications_list} />
          <YesNoField label="Chronic Pain" value={assessment.chronic_pain} details={assessment.chronic_pain_details} />
          <YesNoField label="Infectious Diseases" value={assessment.infectious_diseases} details={assessment.infectious_disease_details} />
          <Field label="Pregnancy Status" value={assessment.pregnancy_status} />
          <Field label="Physical Disabilities" value={assessment.physical_disabilities} />
          <Field label="Sleep Problems" value={assessment.sleep_problems} />
          <Field label="Appetite Changes" value={assessment.appetite_changes} />
          <Field label="Primary Care Physician" value={assessment.primary_care_physician} />
          <Field label="Last Physical Exam" value={assessment.last_physical_exam} />
        </div>
      </div>

      <Separator />

      {/* Mental Health Assessment */}
      <div>
        <SectionHeader title="Mental Health Assessment" icon={Brain} />
        
        <div className="mb-4">
          <YesNoField label="Mental Health Signs" value={assessment.mental_health_signs} details={assessment.mental_health_details} />
          {assessment.current_mental_health_symptoms?.length > 0 && (
            <Field label="Current Symptoms" value={assessment.current_mental_health_symptoms} />
          )}
          {assessment.mental_health_diagnoses?.length > 0 && (
            <Field label="Diagnoses" value={assessment.mental_health_diagnoses} />
          )}
          {assessment.mental_health_medications?.length > 0 && (
            <Field label="Medications" value={assessment.mental_health_medications} />
          )}
          <Field label="Current Treatment" value={assessment.current_mental_health_treatment} />
        </div>
        
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Psychiatric History:</p>
          <YesNoField label="Psychiatric History" value={assessment.psychiatric_history} details={assessment.psychiatric_details} />
          <Field label="Eating Disorder History" value={assessment.eating_disorder_history} />
          <Field label="Impulse Control Issues" value={assessment.impulse_control_issues} />
          <Field label="Cognitive Impairment" value={assessment.cognitive_impairment} />
        </div>
        
        {/* Safety Assessment */}
        {(assessment.suicide_ideation === "yes" || assessment.suicide_attempts_history === "yes" || assessment.homicidal_ideation === "yes") && (
          <div className="p-3 bg-destructive/10 rounded-md border border-destructive/20">
            <p className="text-destructive font-medium text-sm flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4" />
              ⚠️ Safety Concerns
            </p>
            <YesNoField label="Suicidal Ideation" value={assessment.suicide_ideation} details={assessment.suicide_ideation_details} />
            <YesNoField label="Suicide Attempts" value={assessment.suicide_attempts_history} details={assessment.suicide_attempts_details} />
            <YesNoField label="Self-Harm History" value={assessment.self_harm_history} />
            <YesNoField label="Homicidal Ideation" value={assessment.homicidal_ideation} />
          </div>
        )}
        
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Trauma & Violence:</p>
          <YesNoField label="Trauma History" value={assessment.trauma_history} details={assessment.trauma_details} />
          <Field label="PTSD Symptoms" value={assessment.ptsd_symptoms} />
          <YesNoField label="Violence History" value={assessment.violence_history} details={assessment.violence_details} />
        </div>
      </div>

      <Separator />

      {/* Readiness to Change */}
      <div>
        <SectionHeader title="Readiness to Change" icon={Target} variant="success" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
          <Field label="Stage of Change" value={assessment.stage_of_change} />
          <YesNoField label="Acknowledges Problem" value={assessment.acknowledges_problem} />
          <Field label="Motivation Level" value={assessment.motivation_level ? `${assessment.motivation_level}/10` : null} />
          <Field label="Willingness to Change" value={assessment.willingness_to_change ? `${assessment.willingness_to_change}/10` : null} />
          <Field label="Previous Recovery Attempts" value={assessment.previous_recovery_attempts} />
        </div>
        <Field label="What Worked Before" value={assessment.what_worked_before} />
        <Field label="What Didn't Work" value={assessment.what_didnt_work} />
        <Field label="Treatment Goals" value={assessment.treatment_goals} />
        <Field label="Resistance Factors" value={assessment.resistance_factors} />
      </div>

      <Separator />

      {/* Relapse Potential */}
      <div>
        <SectionHeader title="Relapse Potential & Treatment History" />
        
        {assessment.relapse_triggers?.length > 0 && (
          <div className="mb-2">
            <span className="text-sm text-muted-foreground">Known Triggers: </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {(assessment.relapse_triggers as string[]).map((trigger, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">{trigger}</Badge>
              ))}
            </div>
          </div>
        )}
        
        <Field label="High-Risk Situations" value={assessment.high_risk_situations} />
        <Field label="Current Triggers" value={assessment.current_triggers} />
        <Field label="Coping Skills" value={assessment.coping_skills} />
        <Field label="Warning Signs" value={assessment.relapse_warning_signs} />
        <Field label="Peer Support in Recovery" value={assessment.peer_support_recovery} />
        <Field label="12-Step Involvement" value={assessment.twelve_step_involvement} />
        <Field label="Sober Living Interest" value={assessment.sober_living_interest} />
        
        {/* Treatment History */}
        {assessment.treatment_history && assessment.treatment_history.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium mb-2">Treatment History:</p>
            <div className="space-y-2">
              {(assessment.treatment_history as TreatmentEntry[]).map((t, idx) => (
                <div key={idx} className="text-sm bg-muted/50 p-2 rounded">
                  <span className="font-medium">{t.programName}</span>
                  {t.programType && <span className="text-muted-foreground"> ({t.programType})</span>}
                  <span className="text-muted-foreground"> — {t.dateAttended}</span>
                  {t.durationDays && <span className="text-muted-foreground"> | {t.durationDays} days</span>}
                  <span className={t.successfulCompletion ? "text-green-600" : "text-orange-600"}>
                    {" "}| {t.successfulCompletion ? "Completed" : "Not completed"}
                  </span>
                  {t.aftercareFollowed !== undefined && (
                    <span className="text-muted-foreground"> | {t.aftercareFollowed ? "Aftercare followed" : "No aftercare"}</span>
                  )}
                  {t.reasonForLeaving && <div className="text-muted-foreground text-xs mt-1">Reason: {t.reasonForLeaving}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Recovery Environment */}
      <div>
        <SectionHeader title="Recovery Environment" icon={Home} />
        
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Living Situation:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4">
            <Field label="Stable Living" value={assessment.stable_living} />
            <YesNoField label="Homeless/Unstable" value={assessment.homeless_unstable} />
            <YesNoField label="People Using in Home" value={assessment.people_using_in_home} />
            <YesNoField label="Substances Accessible" value={assessment.substances_accessible_home} />
            <Field label="Relationship with Using Friends" value={assessment.relationship_with_using_friends} />
            <Field label="Support Network" value={assessment.support_network} />
            <YesNoField label="Safe Housing Available" value={assessment.safe_housing_available} />
            <Field label="Transportation Access" value={assessment.transportation_access} />
            <Field label="Employment Barriers" value={assessment.employment_barriers} />
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-2">Legal Issues:</p>
          <YesNoField label="Legal Issues" value={assessment.legal_issues} details={assessment.legal_issues_details} />
          <YesNoField label="Pending Charges" value={assessment.pending_charges} />
          <YesNoField label="Probation/Parole" value={assessment.probation_parole} />
          <Field label="DUI History" value={assessment.dui_history} />
        </div>
      </div>

      <Separator />

      {/* Family System */}
      <div>
        <SectionHeader title="Family System Dynamics" icon={Users} />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 mb-4">
          <Field label="Family Unity Level" value={assessment.family_unity_level} />
          <Field label="Communication Patterns" value={assessment.family_communication_patterns} />
          <YesNoField label="Family Conflicts" value={assessment.family_conflicts} details={assessment.family_conflicts_details} />
          <YesNoField label="Divorced Parents" value={assessment.divorced_parents} />
          <YesNoField label="Blended Family" value={assessment.blended_family} />
          <YesNoField label="Estranged Members" value={assessment.estranged_family_members} details={assessment.estranged_details} />
          <Field label="Family Roles" value={assessment.family_roles} />
          <Field label="Codependency Patterns" value={assessment.codependency_patterns} />
          <Field label="Boundaries Assessment" value={assessment.boundaries_assessment} />
          <Field label="Family Secrets" value={assessment.family_secrets} />
          <Field label="Family Trauma History" value={assessment.family_trauma_history} />
          <YesNoField label="Family in Recovery" value={assessment.family_in_recovery} />
          <Field label="Family Counseling History" value={assessment.family_counseling_history} />
        </div>
        
        <div className="mb-4">
          <YesNoField label="Children Present" value={assessment.children_present} />
          {assessment.children_impacted && <Field label="Children Impacted" value={assessment.children_impacted} />}
          <YesNoField label="Family Enabling" value={assessment.family_enabling} details={assessment.enabling_details} />
          <Field label="Who Holds Leverage" value={assessment.who_holds_leverage} />
          <Field label="Intervention Concerns" value={assessment.family_intervention_concerns} />
        </div>
        
        {/* Family Members Participating */}
        {assessment.family_members_participating && assessment.family_members_participating.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium mb-2">Family Members for Intervention:</p>
            <div className="space-y-2">
              {(assessment.family_members_participating as FamilyMemberEntry[]).map((fm, idx) => (
                <div key={idx} className="text-sm bg-muted/50 p-2 rounded flex items-center gap-2 flex-wrap">
                  <span className="font-medium">{fm.name}</span>
                  <Badge variant="outline">{fm.relationship}</Badge>
                  {fm.willingToParticipate && <Badge variant="secondary" className="text-xs">Willing</Badge>}
                  {fm.hasLeverage && <Badge className="text-xs bg-primary/20 text-primary">Has Leverage</Badge>}
                  {fm.leverageDetails && <span className="text-muted-foreground text-xs">— {fm.leverageDetails}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Bottom Lines */}
        {assessment.bottom_lines && assessment.bottom_lines.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium mb-2">Bottom Lines / Consequences:</p>
            <div className="space-y-2">
              {(assessment.bottom_lines as BottomLine[]).map((bl, idx) => (
                <div key={idx} className="text-sm bg-orange-500/10 p-2 rounded border border-orange-500/20">
                  <span className="font-medium">{bl.familyMember}:</span>
                  <span className="ml-2">"{bl.consequence}"</span>
                  <Badge variant={bl.willingToFollow ? "default" : "secondary"} className="ml-2 text-xs">
                    {bl.willingToFollow ? "Committed" : "Uncertain"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Family History */}
      <div>
        <SectionHeader title="Family History" />
        
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Addiction History:</p>
          <Field label="Generational Pattern" value={assessment.generational_addiction_pattern} />
          <Field label="Family Recovery History" value={assessment.family_recovery_history} />
          <YesNoField label="Family Overdose Deaths" value={assessment.family_overdose_deaths} />
          
          {assessment.family_addiction_history && assessment.family_addiction_history.length > 0 && (
            <div className="space-y-1 mt-2">
              {(assessment.family_addiction_history as FamilyHistoryEntry[]).map((fh, idx) => (
                <div key={idx} className="text-sm text-muted-foreground">
                  • {fh.relationship}: {fh.substanceOrBehavior || fh.condition} {fh.currentStatus && `(${fh.currentStatus})`} {fh.recoveryStatus && `— ${fh.recoveryStatus}`}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <p className="text-sm font-medium mb-2">Mental Health History:</p>
          <YesNoField label="Family Suicide History" value={assessment.family_suicide_history} />
          <YesNoField label="Family Psychiatric Hospitalizations" value={assessment.family_psychiatric_hospitalizations} />
          
          {assessment.family_mental_health_history && assessment.family_mental_health_history.length > 0 && (
            <div className="space-y-1 mt-2">
              {(assessment.family_mental_health_history as FamilyHistoryEntry[]).map((fh, idx) => (
                <div key={idx} className="text-sm text-muted-foreground">
                  • {fh.relationship}: {fh.diagnosis || fh.condition} {fh.treatmentStatus && `(${fh.treatmentStatus})`}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Consequences & Impact */}
      <div>
        <SectionHeader title="Consequences & Impact" variant="danger" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <div>
            <p className="text-sm font-medium mb-2">Financial Impact:</p>
            <Field label="Financial Impact" value={assessment.financial_impact} />
            <Field label="Details" value={assessment.financial_details} />
            <Field label="Debt Amount" value={assessment.debt_amount} />
            <YesNoField label="Bankruptcy" value={assessment.bankruptcy} />
            <YesNoField label="Job Loss" value={assessment.job_loss_due_to_use} />
            <YesNoField label="Stolen from Family" value={assessment.stolen_from_family} />
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">Relationships & Legal:</p>
            <YesNoField label="Relationship Losses" value={assessment.relationship_losses} details={assessment.relationship_losses_details} />
            <YesNoField label="Custody Issues" value={assessment.custody_issues} />
            <YesNoField label="Child Welfare Involvement" value={assessment.child_welfare_involvement} details={assessment.dcf_involvement_details} />
            <YesNoField label="Physical Altercations" value={assessment.physical_altercations} />
            <YesNoField label="Arrests" value={assessment.arrests_history} details={assessment.arrests_details} />
            <YesNoField label="Accidents Due to Use" value={assessment.accidents_due_to_use} />
            <Field label="Health Consequences" value={assessment.health_consequences} />
          </div>
        </div>
      </div>

      <Separator />

      {/* Intervention Planning */}
      <div>
        <SectionHeader title="Intervention Planning" icon={Shield} variant="success" />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 mb-4">
          <YesNoField label="Family Ready" value={assessment.family_ready_intervention} />
          <Field label="Intervention Type Preference" value={assessment.intervention_type_preference} />
          <Field label="Urgency Level" value={assessment.urgency_level} />
          <Field label="Budget for Treatment" value={assessment.budget_for_treatment} />
          <Field label="Geographic Preferences" value={assessment.geographic_preferences} />
          <Field label="Insurance Information" value={assessment.insurance_information} />
        </div>

        {/* Insurance Card Images */}
        {(assessment.insurance_card_front_url || assessment.insurance_card_back_url) && (
          <InsuranceCardViewer
            frontPath={assessment.insurance_card_front_url}
            backPath={assessment.insurance_card_back_url}
          />
        )}
        
        <Field label="Best Approach" value={assessment.best_approach} />
        <Field label="Potential Objections" value={assessment.potential_objections} />
        <Field label="What Motivates Individual" value={assessment.what_motivates_individual} />
        <Field label="Treatment Preferences" value={assessment.treatment_preferences} />
        <Field label="Intervention Barriers" value={assessment.intervention_barriers} />
        
        {assessment.immediate_safety_concerns && (
          <div className="mt-3 p-3 bg-destructive/10 rounded-md border border-destructive/20">
            <p className="text-destructive font-medium text-sm flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4" />
              ⚠️ Immediate Safety Concerns
            </p>
            <p className="text-sm">{assessment.immediate_safety_concerns}</p>
          </div>
        )}
      </div>

      {/* Risk Assessment */}
      {(assessment.overall_risk_level || assessment.recommended_level_of_care || assessment.special_considerations) && (
        <>
          <Separator />
          <div>
            <SectionHeader title="Clinical Risk Assessment" variant="warning" />
            <Field label="Overall Risk Level" value={assessment.overall_risk_level} />
            <Field label="Recommended Level of Care" value={assessment.recommended_level_of_care} />
            <Field label="Special Considerations" value={assessment.special_considerations} />
          </div>
        </>
      )}

      {/* Additional Information */}
      {assessment.additional_information && (
        <>
          <Separator />
          <div>
            <SectionHeader title="Additional Information" />
            <p className="text-sm">{assessment.additional_information}</p>
          </div>
        </>
      )}

      {/* Signature */}
      <Separator />
      <div className="pt-2">
        <p className="text-sm">
          <span className="text-muted-foreground font-medium">Signed by: </span>
          <span className="italic">{assessment.family_signature || "Not provided"}</span>
        </p>
      </div>
    </div>
  );
};

export default AssessmentExpandedView;
