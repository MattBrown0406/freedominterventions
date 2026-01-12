import jsPDF from "jspdf";
import { format } from "date-fns";

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
  ageAtTreatment?: string;
}

interface FamilyMemberEntry {
  name: string;
  relationship: string;
  age?: string;
  willingToParticipate: boolean;
  relationshipWithLovedOne?: string;
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
  details?: string;
}

interface Assessment {
  id: string;
  created_at: string;
  status: string;
  
  // Contact Information
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  contact_relationship: string | null;
  best_day_to_contact: string | null;
  best_time_to_contact: string | null;
  
  // Demographics
  loved_one_name: string;
  loved_one_age: number | null;
  loved_one_gender: string | null;
  date_of_birth: string | null;
  marital_status: string | null;
  employment_status: string | null;
  occupation: string | null;
  education_level: string | null;
  living_situation: string | null;
  veteran_status: string | null;
  primary_language: string | null;
  ethnicity: string | null;
  
  // Substance History
  primary_substances: string | null;
  substances_used: SubstanceEntry[] | null;
  polysubstance_use: string | null;
  iv_drug_use: string | null;
  overdose_history: string | null;
  overdose_details: string | null;
  naloxone_reversals: number | null;
  morning_use: string | null;
  using_alone: string | null;
  hiding_use: string | null;
  blackouts_history: string | null;
  age_first_used: number | null;
  duration_of_use: string | null;
  longest_sobriety_period: string | null;
  use_increased: string | null;
  typical_daily_use: string | null;
  last_use_date: string | null;
  frequency: string | null;
  route_of_administration: string | null;
  
  // DSM-5 Criteria
  dsm_behaviors: Record<string, boolean> | null;
  dsm_yes_count: number | null;
  severity_level: string | null;
  
  // Withdrawal & Medical (ASAM Dim 1 & 2)
  withdrawal_symptoms: string | null;
  withdrawal_description: string | null;
  withdrawal_severity: string | null;
  seizure_history: string | null;
  delirium_tremens_history: string | null;
  recent_detox: string | null;
  hospitalized_detox: string | null;
  withdrawal_medications: string | null;
  withdrawal_medications_list: string | null;
  medical_supervision_needed: string | null;
  health_issues: string | null;
  health_issues_list: string | null;
  recent_er_visits: string | null;
  er_visit_details: string | null;
  prescribed_medications: string | null;
  prescribed_medications_list: string | null;
  chronic_pain: string | null;
  chronic_pain_details: string | null;
  infectious_diseases: string | null;
  infectious_disease_details: string | null;
  pregnancy_status: string | null;
  physical_disabilities: string | null;
  sleep_problems: string | null;
  appetite_changes: string | null;
  primary_care_physician: string | null;
  last_physical_exam: string | null;
  
  // Mental Health (ASAM Dim 3)
  mental_health_signs: string | null;
  mental_health_details: string | null;
  psychiatric_history: string | null;
  psychiatric_details: string | null;
  current_mental_health_symptoms: string[] | null;
  mental_health_diagnoses: string[] | null;
  mental_health_medications: string[] | null;
  current_mental_health_treatment: string | null;
  suicide_ideation: string | null;
  suicide_ideation_details: string | null;
  suicide_attempts_history: string | null;
  suicide_attempts_details: string | null;
  self_harm_history: string | null;
  homicidal_ideation: string | null;
  trauma_history: string | null;
  trauma_details: string | null;
  ptsd_symptoms: string | null;
  eating_disorder_history: string | null;
  impulse_control_issues: string | null;
  cognitive_impairment: string | null;
  violence_history: string | null;
  violence_details: string | null;
  
  // Readiness to Change (ASAM Dim 4)
  stage_of_change: string | null;
  acknowledges_problem: string | null;
  motivation_level: string | null;
  willingness_to_change: string | null;
  previous_recovery_attempts: string | null;
  what_worked_before: string | null;
  what_didnt_work: string | null;
  treatment_goals: string | null;
  resistance_factors: string | null;
  
  // Relapse Potential (ASAM Dim 5)
  relapse_triggers: string[] | null;
  high_risk_situations: string | null;
  coping_skills: string | null;
  relapse_warning_signs: string | null;
  peer_support_recovery: string | null;
  twelve_step_involvement: string | null;
  sober_living_interest: string | null;
  prior_treatment: string | null;
  treatment_history: TreatmentEntry[] | null;
  current_triggers: string | null;
  
  // Recovery Environment (ASAM Dim 6)
  stable_living: string | null;
  homeless_unstable: string | null;
  people_using_in_home: string | null;
  substances_accessible_home: string | null;
  relationship_with_using_friends: string | null;
  support_network: string | null;
  safe_housing_available: string | null;
  transportation_access: string | null;
  employment_barriers: string | null;
  legal_issues: string | null;
  legal_issues_details: string | null;
  pending_charges: string | null;
  probation_parole: string | null;
  dui_history: string | null;
  
  // Family System
  family_members_participating: FamilyMemberEntry[] | null;
  family_unity_level: string | null;
  family_communication_patterns: string | null;
  family_conflicts: string | null;
  family_conflicts_details: string | null;
  divorced_parents: string | null;
  blended_family: string | null;
  estranged_family_members: string | null;
  estranged_details: string | null;
  family_roles: string | null;
  codependency_patterns: string | null;
  boundaries_assessment: string | null;
  family_enabling: string | null;
  enabling_details: string | null;
  enabling_behaviors_list: Array<{ behavior: string; whoEnables: string; frequency: string }> | null;
  family_secrets: string | null;
  family_trauma_history: string | null;
  family_in_recovery: string | null;
  family_counseling_history: string | null;
  family_intervention_concerns: string | null;
  children_present: string | null;
  children_impacted: string | null;
  who_holds_leverage: string | null;
  bottom_lines: Array<{ familyMember: string; consequence: string; willingToFollow: boolean }> | null;
  
  // Family History
  family_addiction_history: FamilyHistoryEntry[] | null;
  generational_addiction_pattern: string | null;
  family_recovery_history: string | null;
  family_overdose_deaths: string | null;
  family_mental_health_history: FamilyHistoryEntry[] | null;
  family_suicide_history: string | null;
  family_psychiatric_hospitalizations: string | null;
  
  // Consequences
  financial_impact: string | null;
  financial_details: string | null;
  job_loss_due_to_use: string | null;
  relationship_losses: string | null;
  relationship_losses_details: string | null;
  custody_issues: string | null;
  child_welfare_involvement: string | null;
  dcf_involvement_details: string | null;
  debt_amount: string | null;
  bankruptcy: string | null;
  stolen_from_family: string | null;
  physical_altercations: string | null;
  arrests_history: string | null;
  arrests_details: string | null;
  accidents_due_to_use: string | null;
  health_consequences: string | null;
  
  // Intervention Planning
  family_ready_intervention: string | null;
  intervention_barriers: string | null;
  intervention_type_preference: string | null;
  best_approach: string | null;
  potential_objections: string | null;
  what_motivates_individual: string | null;
  treatment_preferences: string | null;
  geographic_preferences: string | null;
  insurance_information: string | null;
  budget_for_treatment: string | null;
  urgency_level: string | null;
  immediate_safety_concerns: string | null;
  additional_information: string | null;
  
  // Risk Assessment
  overall_risk_level: string | null;
  recommended_level_of_care: string | null;
  special_considerations: string | null;
  
  // Signature
  family_signature: string | null;
}

const DSM_CRITERIA_LABELS: Record<string, string> = {
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
  // Legacy question-based keys
  "Has your loved one used substances in larger amounts or for longer periods than they originally intended?": "Used larger amounts/longer",
  "Has your loved one expressed a desire to cut down or stop using but been unable to do so?": "Unable to cut down",
  "Does your loved one spend a significant amount of time obtaining, using, or recovering from substances?": "Time spent obtaining/using",
  "Does your loved one experience strong cravings or urges to use substances?": "Cravings/urges",
  "Has substance use caused your loved one to miss important family events, work responsibilities, or school obligations?": "Missed obligations",
  "Has your loved one continued using despite it causing problems in their relationships or social life?": "Continued despite problems",
  "Has your loved one given up or reduced participation in activities they once enjoyed because of substance use?": "Gave up activities",
  "Has your loved one engaged in risky behaviors while using, such as driving under the influence or unsafe sexual activity?": "Risky behaviors",
  "Has your loved one needed to use more of the substance to achieve the same effect they used to get with less (tolerance)?": "Tolerance",
  "Has your loved one experienced physical or emotional withdrawal symptoms when not using the substance?": "Withdrawal symptoms",
  "Has your loved one used substances specifically to avoid or relieve withdrawal symptoms?": "Used to avoid withdrawal",
  "Has substance use interfered with your loved one's ability to fulfill major responsibilities at work, school, or home?": "Failed major responsibilities",
  "Has your loved one experienced legal problems as a result of their substance use?": "Legal problems",
};

export const generateAssessmentPdf = (assessment: Assessment): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 15;

  const addPageIfNeeded = (requiredSpace: number = 15): boolean => {
    if (yPos + requiredSpace > 275) {
      doc.addPage();
      yPos = 15;
      return true;
    }
    return false;
  };

  const addSectionHeader = (title: string, color: [number, number, number] = [30, 64, 175]) => {
    addPageIfNeeded(25);
    yPos += 3;
    
    // Section background
    doc.setFillColor(color[0], color[1], color[2]);
    doc.roundedRect(margin, yPos - 4, contentWidth, 10, 2, 2, "F");
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), margin + 4, yPos + 2);
    yPos += 12;
    
    // Reset text color
    doc.setTextColor(51, 51, 51);
  };

  const addSubHeader = (title: string) => {
    addPageIfNeeded(12);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 64, 175);
    doc.text(title, margin, yPos);
    yPos += 6;
    doc.setTextColor(51, 51, 51);
  };

  const addField = (label: string, value: string | number | null | undefined, options?: { inline?: boolean; highlight?: boolean }) => {
    if (value === null || value === undefined || value === "" || value === "N/A") return;
    
    addPageIfNeeded(10);
    const displayValue = String(value);
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 100, 100);
    
    const labelText = `${label}:`;
    doc.text(labelText, margin, yPos);
    
    doc.setFont("helvetica", "normal");
    
    if (options?.highlight) {
      doc.setTextColor(180, 50, 50);
    } else {
      doc.setTextColor(51, 51, 51);
    }
    
    const labelWidth = doc.getTextWidth(labelText) + 2;
    
    if (options?.inline !== false && displayValue.length < 60) {
      doc.text(displayValue, margin + labelWidth, yPos);
      yPos += 5;
    } else {
      yPos += 4;
      const lines = doc.splitTextToSize(displayValue, contentWidth - 5);
      lines.forEach((line: string) => {
        addPageIfNeeded(5);
        doc.text(line, margin + 3, yPos);
        yPos += 4;
      });
      yPos += 1;
    }
  };

  const addYesNoField = (label: string, value: string | null | undefined) => {
    if (!value) return;
    const isYes = value.toLowerCase() === "yes";
    addField(label, value, { highlight: isYes, inline: true });
  };

  const addArrayField = (label: string, values: string[] | null | undefined) => {
    if (!values || values.length === 0) return;
    addField(label, values.join(", "), { inline: false });
  };

  const addDivider = () => {
    yPos += 2;
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 4;
  };

  // ========== HEADER ==========
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, pageWidth, 35, "F");
  
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("COMPREHENSIVE FAMILY ASSESSMENT", pageWidth / 2, 14, { align: "center" });
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Freedom Interventions | Confidential Clinical Document", pageWidth / 2, 22, { align: "center" });
  doc.text(`Generated: ${format(new Date(), "MMMM d, yyyy 'at' h:mm a")}`, pageWidth / 2, 28, { align: "center" });
  
  yPos = 42;

  // ========== QUICK SUMMARY BOX ==========
  const severityColor: [number, number, number] = assessment.severity_level === "Severe" 
    ? [220, 38, 38] 
    : assessment.severity_level === "Moderate" 
      ? [234, 88, 12] 
      : assessment.severity_level === "Mild" 
        ? [202, 138, 4] 
        : [22, 163, 74];

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, yPos, contentWidth, 35, 3, 3, "F");
  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(margin, yPos, contentWidth, 35, 3, 3, "S");
  
  yPos += 8;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 41, 59);
  doc.text(`${assessment.loved_one_name}${assessment.loved_one_age ? `, Age ${assessment.loved_one_age}` : ""}`, margin + 5, yPos);
  
  // Severity badge
  const badgeX = pageWidth - margin - 45;
  doc.setFillColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.roundedRect(badgeX, yPos - 5, 40, 8, 2, 2, "F");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(assessment.severity_level?.toUpperCase() || "PENDING", badgeX + 20, yPos, { align: "center" });
  
  yPos += 7;
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`Submitted: ${format(new Date(assessment.created_at), "MMMM d, yyyy")} | DSM-5 Criteria: ${assessment.dsm_yes_count || 0}/11 met`, margin + 5, yPos);
  
  yPos += 6;
  doc.text(`Primary Substances: ${assessment.primary_substances || "Not specified"}`, margin + 5, yPos);
  
  yPos += 6;
  doc.text(`Family Contact: ${assessment.contact_name} (${assessment.contact_relationship || "N/A"}) | ${assessment.contact_phone || assessment.contact_email}`, margin + 5, yPos);
  
  yPos += 12;

  // ========== SECTION 1: CONTACT INFORMATION ==========
  addSectionHeader("Contact Information", [59, 130, 246]);
  addField("Name", assessment.contact_name);
  addField("Email", assessment.contact_email);
  addField("Phone", assessment.contact_phone);
  addField("Relationship", assessment.contact_relationship);
  addField("Best Day", assessment.best_day_to_contact);
  addField("Best Time", assessment.best_time_to_contact);

  // ========== SECTION 2: DEMOGRAPHICS ==========
  addSectionHeader("Demographics & Background", [59, 130, 246]);
  addField("Full Name", assessment.loved_one_name);
  addField("Age", assessment.loved_one_age);
  addField("Gender", assessment.loved_one_gender);
  addField("Date of Birth", assessment.date_of_birth);
  addField("Marital Status", assessment.marital_status);
  addField("Employment", assessment.employment_status);
  addField("Occupation", assessment.occupation);
  addField("Education", assessment.education_level);
  addField("Living Situation", assessment.living_situation);
  addField("Veteran Status", assessment.veteran_status);
  addField("Primary Language", assessment.primary_language);
  addField("Ethnicity", assessment.ethnicity);

  // ========== SECTION 3: SUBSTANCE USE HISTORY ==========
  addSectionHeader("Substance Use History", [220, 38, 38]);
  addField("Primary Substances", assessment.primary_substances);
  addField("Frequency", assessment.frequency);
  addField("Duration of Use", assessment.duration_of_use);
  addField("Age First Used", assessment.age_first_used);
  addField("Last Use Date", assessment.last_use_date);
  addField("Typical Daily Use", assessment.typical_daily_use);
  addField("Route of Administration", assessment.route_of_administration);
  addYesNoField("Polysubstance Use", assessment.polysubstance_use);
  addYesNoField("IV Drug Use", assessment.iv_drug_use);
  addYesNoField("Use Has Increased", assessment.use_increased);
  addYesNoField("Morning Use", assessment.morning_use);
  addYesNoField("Using Alone", assessment.using_alone);
  addYesNoField("Hiding Use", assessment.hiding_use);
  addYesNoField("Blackouts History", assessment.blackouts_history);
  addField("Longest Sobriety", assessment.longest_sobriety_period);
  
  // Overdose history
  addDivider();
  addSubHeader("Overdose History");
  addYesNoField("Overdose History", assessment.overdose_history);
  if (assessment.overdose_details) addField("Details", assessment.overdose_details, { inline: false });
  addField("Naloxone Reversals", assessment.naloxone_reversals);
  
  // Substances used table
  if (assessment.substances_used && assessment.substances_used.length > 0) {
    addDivider();
    addSubHeader("Detailed Substance Use");
    assessment.substances_used.forEach((sub, idx) => {
      addPageIfNeeded(20);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(51, 51, 51);
      doc.text(`${idx + 1}. ${sub.substance}`, margin, yPos);
      yPos += 4;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      const details = [];
      if (sub.ageFirstUsed) details.push(`Started: age ${sub.ageFirstUsed}`);
      if (sub.routeOfAdministration) details.push(`Route: ${sub.routeOfAdministration}`);
      if (sub.frequency) details.push(`Freq: ${sub.frequency}`);
      if (sub.lastUsed) details.push(`Last: ${sub.lastUsed}`);
      details.push(sub.currentlyUsing ? "Currently using" : "Not currently using");
      doc.text(details.join(" | "), margin + 5, yPos);
      yPos += 5;
    });
  }

  // ========== SECTION 4: DSM-5 CRITERIA ==========
  addSectionHeader(`DSM-5 Diagnostic Criteria (${assessment.dsm_yes_count || 0}/11 Met)`, [147, 51, 234]);
  
  if (assessment.dsm_behaviors) {
    Object.entries(assessment.dsm_behaviors).forEach(([key, met]) => {
      addPageIfNeeded(6);
      const label = DSM_CRITERIA_LABELS[key] || key.substring(0, 50);
      doc.setFontSize(9);
      doc.setFont("helvetica", met ? "bold" : "normal");
      doc.setTextColor(met ? 180 : 120, met ? 50 : 120, met ? 50 : 120);
      doc.text(`${met ? "✓" : "○"} ${label}`, margin + 2, yPos);
      yPos += 5;
    });
  }
  
  addPageIfNeeded(15);
  yPos += 3;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, yPos - 3, contentWidth, 12, 2, 2, "F");
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.text(`Severity Classification: ${assessment.severity_level || "Pending"} (2-3 = Mild, 4-5 = Moderate, 6+ = Severe)`, margin + 4, yPos + 4);
  yPos += 14;

  // ========== SECTION 5: WITHDRAWAL & MEDICAL RISKS ==========
  addSectionHeader("Withdrawal & Medical Risks (ASAM Dim 1 & 2)", [234, 88, 12]);
  
  addSubHeader("Withdrawal Assessment");
  if (assessment.withdrawal_symptoms) {
    try {
      const symptoms = JSON.parse(assessment.withdrawal_symptoms);
      if (symptoms.physical?.length > 0) {
        addField("Physical Symptoms", symptoms.physical.join(", "), { inline: false });
      }
      if (symptoms.psychological?.length > 0) {
        addField("Psychological Symptoms", symptoms.psychological.join(", "), { inline: false });
      }
    } catch {
      addField("Withdrawal Symptoms", assessment.withdrawal_symptoms);
    }
  }
  addField("Description", assessment.withdrawal_description, { inline: false });
  addField("Withdrawal Severity", assessment.withdrawal_severity);
  addYesNoField("Seizure History", assessment.seizure_history);
  addYesNoField("Delirium Tremens History", assessment.delirium_tremens_history);
  addYesNoField("Recent Detox (past 30 days)", assessment.recent_detox);
  addYesNoField("Hospitalized for Detox", assessment.hospitalized_detox);
  addYesNoField("Requires Medical Supervision", assessment.medical_supervision_needed);
  if (assessment.withdrawal_medications === "yes") {
    addField("Withdrawal Medications", assessment.withdrawal_medications_list);
  }
  
  addDivider();
  addSubHeader("Medical Conditions");
  addYesNoField("Health Issues", assessment.health_issues);
  if (assessment.health_issues_list) addField("Details", assessment.health_issues_list, { inline: false });
  addYesNoField("Recent ER Visits", assessment.recent_er_visits);
  if (assessment.er_visit_details) addField("ER Details", assessment.er_visit_details, { inline: false });
  addYesNoField("Prescribed Medications", assessment.prescribed_medications);
  if (assessment.prescribed_medications_list) addField("Medications", assessment.prescribed_medications_list, { inline: false });
  addYesNoField("Chronic Pain", assessment.chronic_pain);
  if (assessment.chronic_pain_details) addField("Pain Details", assessment.chronic_pain_details, { inline: false });
  addYesNoField("Infectious Diseases", assessment.infectious_diseases);
  if (assessment.infectious_disease_details) addField("Disease Details", assessment.infectious_disease_details, { inline: false });
  addField("Pregnancy Status", assessment.pregnancy_status);
  addField("Physical Disabilities", assessment.physical_disabilities);
  addField("Sleep Problems", assessment.sleep_problems);
  addField("Appetite Changes", assessment.appetite_changes);
  addField("Primary Care Physician", assessment.primary_care_physician);
  addField("Last Physical Exam", assessment.last_physical_exam);

  // ========== SECTION 6: MENTAL HEALTH ==========
  addSectionHeader("Mental Health Assessment (ASAM Dim 3)", [139, 92, 246]);
  
  addSubHeader("Current Symptoms & History");
  addYesNoField("Mental Health Signs Present", assessment.mental_health_signs);
  if (assessment.mental_health_details) addField("Details", assessment.mental_health_details, { inline: false });
  addArrayField("Current Symptoms", assessment.current_mental_health_symptoms);
  addArrayField("Diagnoses", assessment.mental_health_diagnoses);
  addArrayField("Mental Health Medications", assessment.mental_health_medications);
  addField("Current Treatment", assessment.current_mental_health_treatment);
  
  addDivider();
  addSubHeader("Psychiatric History");
  addYesNoField("Psychiatric History", assessment.psychiatric_history);
  if (assessment.psychiatric_details) addField("Details", assessment.psychiatric_details, { inline: false });
  addField("Eating Disorder History", assessment.eating_disorder_history);
  addField("Impulse Control Issues", assessment.impulse_control_issues);
  addField("Cognitive Impairment", assessment.cognitive_impairment);
  
  addDivider();
  addSubHeader("⚠ Safety Assessment");
  addYesNoField("Suicidal Ideation", assessment.suicide_ideation);
  if (assessment.suicide_ideation_details) addField("SI Details", assessment.suicide_ideation_details, { inline: false, highlight: true });
  addYesNoField("Suicide Attempts History", assessment.suicide_attempts_history);
  if (assessment.suicide_attempts_details) addField("Attempt Details", assessment.suicide_attempts_details, { inline: false, highlight: true });
  addYesNoField("Self-Harm History", assessment.self_harm_history);
  addYesNoField("Homicidal Ideation", assessment.homicidal_ideation);
  
  addDivider();
  addSubHeader("Trauma & Violence");
  addYesNoField("Trauma History", assessment.trauma_history);
  if (assessment.trauma_details) addField("Details", assessment.trauma_details, { inline: false });
  addField("PTSD Symptoms", assessment.ptsd_symptoms);
  addYesNoField("Violence History", assessment.violence_history);
  if (assessment.violence_details) addField("Violence Details", assessment.violence_details, { inline: false });

  // ========== SECTION 7: READINESS TO CHANGE ==========
  addSectionHeader("Readiness to Change (ASAM Dim 4)", [16, 185, 129]);
  addField("Stage of Change", assessment.stage_of_change);
  addYesNoField("Acknowledges Problem", assessment.acknowledges_problem);
  addField("Motivation Level", assessment.motivation_level ? `${assessment.motivation_level}/10` : null);
  addField("Willingness to Change", assessment.willingness_to_change ? `${assessment.willingness_to_change}/10` : null);
  addField("Previous Recovery Attempts", assessment.previous_recovery_attempts);
  addField("What Worked Before", assessment.what_worked_before, { inline: false });
  addField("What Didn't Work", assessment.what_didnt_work, { inline: false });
  addField("Treatment Goals", assessment.treatment_goals, { inline: false });
  addField("Resistance Factors", assessment.resistance_factors, { inline: false });

  // ========== SECTION 8: RELAPSE POTENTIAL ==========
  addSectionHeader("Relapse Potential (ASAM Dim 5)", [236, 72, 153]);
  addArrayField("Known Triggers", assessment.relapse_triggers);
  addField("High-Risk Situations", assessment.high_risk_situations, { inline: false });
  addField("Current Triggers", assessment.current_triggers, { inline: false });
  addField("Coping Skills", assessment.coping_skills, { inline: false });
  addField("Warning Signs", assessment.relapse_warning_signs, { inline: false });
  addField("Peer Support in Recovery", assessment.peer_support_recovery);
  addField("12-Step Involvement", assessment.twelve_step_involvement);
  addField("Sober Living Interest", assessment.sober_living_interest);
  
  // Treatment history
  if (assessment.treatment_history && assessment.treatment_history.length > 0) {
    addDivider();
    addSubHeader("Treatment History");
    assessment.treatment_history.forEach((t, idx) => {
      addPageIfNeeded(18);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(51, 51, 51);
      doc.text(`${idx + 1}. ${t.programName}${t.programType ? ` (${t.programType})` : ""}`, margin, yPos);
      yPos += 4;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      const details = [];
      if (t.dateAttended) details.push(`Date: ${t.dateAttended}`);
      if (t.durationDays) details.push(`${t.durationDays} days`);
      details.push(t.successfulCompletion ? "Completed" : "Not completed");
      if (t.aftercareFollowed !== undefined) details.push(t.aftercareFollowed ? "Aftercare followed" : "No aftercare");
      doc.text(details.join(" | "), margin + 5, yPos);
      yPos += 4;
      if (t.reasonForLeaving) {
        doc.text(`Reason for leaving: ${t.reasonForLeaving}`, margin + 5, yPos);
        yPos += 4;
      }
      yPos += 2;
    });
  }

  // ========== SECTION 9: RECOVERY ENVIRONMENT ==========
  addSectionHeader("Recovery Environment (ASAM Dim 6)", [20, 184, 166]);
  
  addSubHeader("Living Situation");
  addField("Stable Living", assessment.stable_living);
  addYesNoField("Homeless/Unstable Housing", assessment.homeless_unstable);
  addYesNoField("People Using in Home", assessment.people_using_in_home);
  addYesNoField("Substances Accessible in Home", assessment.substances_accessible_home);
  addField("Relationship with Using Friends", assessment.relationship_with_using_friends);
  addField("Support Network", assessment.support_network);
  addYesNoField("Safe Housing Available", assessment.safe_housing_available);
  addField("Transportation Access", assessment.transportation_access);
  addField("Employment Barriers", assessment.employment_barriers);
  
  addDivider();
  addSubHeader("Legal Issues");
  addYesNoField("Legal Issues", assessment.legal_issues);
  if (assessment.legal_issues_details) addField("Details", assessment.legal_issues_details, { inline: false });
  addYesNoField("Pending Charges", assessment.pending_charges);
  addYesNoField("Probation/Parole", assessment.probation_parole);
  addField("DUI History", assessment.dui_history);

  // ========== SECTION 10: FAMILY SYSTEM DYNAMICS ==========
  addSectionHeader("Family System Dynamics", [245, 158, 11]);
  
  addField("Family Unity Level", assessment.family_unity_level);
  addField("Communication Patterns", assessment.family_communication_patterns);
  addYesNoField("Family Conflicts", assessment.family_conflicts);
  if (assessment.family_conflicts_details) addField("Conflict Details", assessment.family_conflicts_details, { inline: false });
  addYesNoField("Divorced Parents", assessment.divorced_parents);
  addYesNoField("Blended Family", assessment.blended_family);
  addYesNoField("Estranged Family Members", assessment.estranged_family_members);
  if (assessment.estranged_details) addField("Estrangement Details", assessment.estranged_details, { inline: false });
  addField("Family Roles", assessment.family_roles);
  addField("Codependency Patterns", assessment.codependency_patterns);
  addField("Boundaries Assessment", assessment.boundaries_assessment);
  addField("Family Secrets", assessment.family_secrets);
  addField("Family Trauma History", assessment.family_trauma_history);
  addYesNoField("Family in Recovery", assessment.family_in_recovery);
  addField("Family Counseling History", assessment.family_counseling_history);
  addField("Intervention Concerns", assessment.family_intervention_concerns, { inline: false });
  
  addDivider();
  addSubHeader("Children & Enabling");
  addYesNoField("Children Present", assessment.children_present);
  if (assessment.children_impacted) addField("Children Impacted", assessment.children_impacted, { inline: false });
  addYesNoField("Family Enabling", assessment.family_enabling);
  if (assessment.enabling_details) addField("Enabling Details", assessment.enabling_details, { inline: false });
  addField("Who Holds Leverage", assessment.who_holds_leverage, { inline: false });
  
  // Family members participating
  if (assessment.family_members_participating && assessment.family_members_participating.length > 0) {
    addDivider();
    addSubHeader("Family Members for Intervention");
    assessment.family_members_participating.forEach((fm, idx) => {
      addPageIfNeeded(12);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(51, 51, 51);
      doc.text(`${idx + 1}. ${fm.name} (${fm.relationship})`, margin, yPos);
      yPos += 4;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      const details = [];
      details.push(fm.willingToParticipate ? "Willing to participate" : "May not participate");
      if (fm.hasLeverage) details.push("Has leverage");
      if (fm.leverageDetails) details.push(fm.leverageDetails);
      doc.text(details.join(" | "), margin + 5, yPos);
      yPos += 5;
    });
  }
  
  // Bottom lines
  if (assessment.bottom_lines && assessment.bottom_lines.length > 0) {
    addDivider();
    addSubHeader("Bottom Lines / Consequences");
    assessment.bottom_lines.forEach((bl, idx) => {
      addPageIfNeeded(10);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 51, 51);
      doc.text(`${idx + 1}. ${bl.familyMember}: "${bl.consequence}" ${bl.willingToFollow ? "(committed)" : "(uncertain)"}`, margin + 2, yPos);
      yPos += 5;
    });
  }

  // ========== SECTION 11: FAMILY HISTORY ==========
  addSectionHeader("Family History", [249, 115, 22]);
  
  addSubHeader("Addiction History");
  addField("Generational Pattern", assessment.generational_addiction_pattern);
  addField("Family Recovery History", assessment.family_recovery_history);
  addYesNoField("Family Overdose Deaths", assessment.family_overdose_deaths);
  
  if (assessment.family_addiction_history && assessment.family_addiction_history.length > 0) {
    addPageIfNeeded(15);
    assessment.family_addiction_history.forEach((fh, idx) => {
      addPageIfNeeded(8);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 51, 51);
      const details = [fh.relationship];
      if (fh.substanceOrBehavior) details.push(fh.substanceOrBehavior);
      if (fh.currentStatus) details.push(fh.currentStatus);
      if (fh.recoveryStatus) details.push(fh.recoveryStatus);
      doc.text(`${idx + 1}. ${details.join(" - ")}`, margin + 2, yPos);
      yPos += 5;
    });
  }
  
  addDivider();
  addSubHeader("Mental Health History");
  addYesNoField("Family Suicide History", assessment.family_suicide_history);
  addYesNoField("Family Psychiatric Hospitalizations", assessment.family_psychiatric_hospitalizations);
  
  if (assessment.family_mental_health_history && assessment.family_mental_health_history.length > 0) {
    addPageIfNeeded(15);
    assessment.family_mental_health_history.forEach((fh, idx) => {
      addPageIfNeeded(8);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 51, 51);
      const details = [fh.relationship];
      if (fh.diagnosis) details.push(fh.diagnosis);
      if (fh.treatmentStatus) details.push(fh.treatmentStatus);
      doc.text(`${idx + 1}. ${details.join(" - ")}`, margin + 2, yPos);
      yPos += 5;
    });
  }

  // ========== SECTION 12: CONSEQUENCES & IMPACT ==========
  addSectionHeader("Consequences & Impact", [239, 68, 68]);
  
  addSubHeader("Financial Impact");
  addField("Financial Impact", assessment.financial_impact);
  if (assessment.financial_details) addField("Details", assessment.financial_details, { inline: false });
  addField("Debt Amount", assessment.debt_amount);
  addYesNoField("Bankruptcy", assessment.bankruptcy);
  addYesNoField("Job Loss Due to Use", assessment.job_loss_due_to_use);
  addYesNoField("Stolen from Family", assessment.stolen_from_family);
  
  addDivider();
  addSubHeader("Relationships & Legal");
  addYesNoField("Relationship Losses", assessment.relationship_losses);
  if (assessment.relationship_losses_details) addField("Details", assessment.relationship_losses_details, { inline: false });
  addYesNoField("Custody Issues", assessment.custody_issues);
  addYesNoField("Child Welfare Involvement", assessment.child_welfare_involvement);
  if (assessment.dcf_involvement_details) addField("DCF Details", assessment.dcf_involvement_details, { inline: false });
  addYesNoField("Physical Altercations", assessment.physical_altercations);
  addYesNoField("Arrests History", assessment.arrests_history);
  if (assessment.arrests_details) addField("Arrest Details", assessment.arrests_details, { inline: false });
  addYesNoField("Accidents Due to Use", assessment.accidents_due_to_use);
  addField("Health Consequences", assessment.health_consequences, { inline: false });

  // ========== SECTION 13: INTERVENTION PLANNING ==========
  addSectionHeader("Intervention Planning", [99, 102, 241]);
  
  addYesNoField("Family Ready for Intervention", assessment.family_ready_intervention);
  addField("Intervention Barriers", assessment.intervention_barriers, { inline: false });
  addField("Intervention Type Preference", assessment.intervention_type_preference);
  addField("Best Approach", assessment.best_approach, { inline: false });
  addField("Potential Objections", assessment.potential_objections, { inline: false });
  addField("What Motivates Individual", assessment.what_motivates_individual, { inline: false });
  
  addDivider();
  addSubHeader("Treatment Planning");
  addField("Treatment Preferences", assessment.treatment_preferences, { inline: false });
  addField("Geographic Preferences", assessment.geographic_preferences);
  addField("Insurance Information", assessment.insurance_information);
  addField("Budget for Treatment", assessment.budget_for_treatment);
  addField("Urgency Level", assessment.urgency_level);
  
  if (assessment.immediate_safety_concerns) {
    addDivider();
    addSubHeader("⚠ IMMEDIATE SAFETY CONCERNS");
    doc.setTextColor(220, 38, 38);
    addField("Concerns", assessment.immediate_safety_concerns, { inline: false, highlight: true });
    doc.setTextColor(51, 51, 51);
  }

  // ========== SECTION 14: RISK ASSESSMENT ==========
  if (assessment.overall_risk_level || assessment.recommended_level_of_care || assessment.special_considerations) {
    addSectionHeader("Clinical Risk Assessment", [190, 24, 93]);
    addField("Overall Risk Level", assessment.overall_risk_level);
    addField("Recommended Level of Care", assessment.recommended_level_of_care);
    addField("Special Considerations", assessment.special_considerations, { inline: false });
  }

  // ========== ADDITIONAL INFORMATION ==========
  if (assessment.additional_information) {
    addSectionHeader("Additional Information", [107, 114, 128]);
    addField("Notes", assessment.additional_information, { inline: false });
  }

  // ========== SIGNATURE ==========
  addPageIfNeeded(25);
  yPos += 5;
  doc.setDrawColor(180, 180, 180);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(51, 51, 51);
  doc.text("Family Member Signature:", margin, yPos);
  yPos += 6;
  doc.setFont("helvetica", "italic");
  doc.text(assessment.family_signature || "[Not provided]", margin + 5, yPos);

  // ========== FOOTER ON ALL PAGES ==========
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${totalPages} | CONFIDENTIAL - Freedom Interventions | Assessment ID: ${assessment.id.substring(0, 8)}`,
      pageWidth / 2,
      287,
      { align: "center" }
    );
  }

  // Save
  const safeName = assessment.loved_one_name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
  const fileName = `assessment-${safeName}-${format(new Date(assessment.created_at), "yyyy-MM-dd")}.pdf`;
  doc.save(fileName);
};
