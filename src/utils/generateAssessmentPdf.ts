import jsPDF from "jspdf";
import { format } from "date-fns";

interface Assessment {
  id: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  contact_relationship: string | null;
  best_day_to_contact: string | null;
  best_time_to_contact: string | null;
  loved_one_name: string;
  loved_one_age: number | null;
  loved_one_gender: string | null;
  primary_substances: string | null;
  severity_level: string | null;
  dsm_yes_count: number | null;
  status: string;
  created_at: string;
  dsm_behaviors: Record<string, boolean> | null;
  withdrawal_symptoms: string | null;
  withdrawal_description: string | null;
  recent_detox: string | null;
  hospitalized_detox: string | null;
  withdrawal_medications: string | null;
  withdrawal_medications_list: string | null;
  health_issues: string | null;
  health_issues_list: string | null;
  recent_er_visits: string | null;
  er_visit_details: string | null;
  prescribed_medications: string | null;
  prescribed_medications_list: string | null;
  mental_health_signs: string | null;
  mental_health_details: string | null;
  psychiatric_history: string | null;
  psychiatric_details: string | null;
  violence_history: string | null;
  violence_details: string | null;
  stable_living: string | null;
  homeless_unstable: string | null;
  family_enabling: string | null;
  enabling_details: string | null;
  children_present: string | null;
  children_impacted: string | null;
  support_network: string | null;
  prior_treatment: string | null;
  treatment_history: Array<{ programName: string; dateAttended: string; successfulCompletion: boolean }> | null;
  current_triggers: string | null;
  willingness_to_change: string | null;
  financial_impact: string | null;
  financial_details: string | null;
  child_welfare_involvement: string | null;
  family_ready_intervention: string | null;
  intervention_barriers: string | null;
  family_signature: string | null;
  frequency: string | null;
  duration_of_use: string | null;
  age_first_used: number | null;
  use_increased: string | null;
}

const dsmBehaviorLabels = [
  "Used larger amounts or longer than intended",
  "Wanted to cut down but couldn't",
  "Spent excessive time obtaining/using/recovering",
  "Cravings or strong urges to use",
  "Missed family/work obligations due to use",
  "Continued despite social/relationship problems",
  "Gave up important activities for use",
  "Risky use (driving, unsafe sex, etc.)",
  "Tolerance (needs more for same effect)",
  "Withdrawal symptoms (physical/emotional)",
  "Used to relieve withdrawal",
  "Failed to fulfill major role obligations",
  "Legal problems related to use",
];

const dsmBehaviorQuestions = [
  "Has your loved one used substances in larger amounts or for longer periods than they originally intended?",
  "Has your loved one expressed a desire to cut down or stop using but been unable to do so?",
  "Does your loved one spend a significant amount of time obtaining, using, or recovering from substances?",
  "Does your loved one experience strong cravings or urges to use substances?",
  "Has substance use caused your loved one to miss important family events, work responsibilities, or school obligations?",
  "Has your loved one continued using despite it causing problems in their relationships or social life?",
  "Has your loved one given up or reduced participation in activities they once enjoyed because of substance use?",
  "Has your loved one engaged in risky behaviors while using, such as driving under the influence or unsafe sexual activity?",
  "Has your loved one needed to use more of the substance to achieve the same effect they used to get with less (tolerance)?",
  "Has your loved one experienced physical or emotional withdrawal symptoms when not using the substance?",
  "Has your loved one used substances specifically to avoid or relieve withdrawal symptoms?",
  "Has substance use interfered with your loved one's ability to fulfill major responsibilities at work, school, or home?",
  "Has your loved one experienced legal problems as a result of their substance use?",
];

export const generateAssessmentPdf = (assessment: Assessment): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 20;

  const addPageIfNeeded = (requiredSpace: number = 20) => {
    if (yPos + requiredSpace > 270) {
      doc.addPage();
      yPos = 20;
    }
  };

  const addSectionHeader = (title: string) => {
    addPageIfNeeded(20);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(51, 51, 51);
    doc.text(title, margin, yPos);
    yPos += 8;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos - 3, pageWidth - margin, yPos - 3);
  };

  const addField = (label: string, value: string | null | undefined, inline: boolean = false) => {
    addPageIfNeeded(10);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 100, 100);
    doc.text(`${label}:`, margin, yPos);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 51, 51);
    const displayValue = value || "N/A";
    const labelWidth = doc.getTextWidth(`${label}: `);
    
    if (inline && displayValue.length < 50) {
      doc.text(displayValue, margin + labelWidth, yPos);
      yPos += 6;
    } else {
      yPos += 5;
      const lines = doc.splitTextToSize(displayValue, contentWidth - 5);
      doc.text(lines, margin + 5, yPos);
      yPos += lines.length * 4 + 3;
    }
  };

  // Header
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 41, 59);
  doc.text("Family Assessment Report", margin, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text("Freedom Interventions - Confidential", margin, yPos);
  yPos += 5;
  doc.text(`Generated: ${format(new Date(), "MMMM d, yyyy 'at' h:mm a")}`, margin, yPos);
  yPos += 12;

  // Assessment Info Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, yPos, contentWidth, 25, 3, 3, "F");
  yPos += 8;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(51, 51, 51);
  doc.text(`Subject: ${assessment.loved_one_name}${assessment.loved_one_age ? ` (Age ${assessment.loved_one_age})` : ""}`, margin + 5, yPos);
  yPos += 6;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Submitted: ${format(new Date(assessment.created_at), "MMMM d, yyyy 'at' h:mm a")}`, margin + 5, yPos);
  yPos += 6;
  doc.text(`Status: ${assessment.status.toUpperCase()} | Severity: ${assessment.severity_level || "Not assessed"} (${assessment.dsm_yes_count || 0}/13 criteria)`, margin + 5, yPos);
  yPos += 15;

  // Contact Information
  addSectionHeader("Contact Information");
  addField("Name", assessment.contact_name, true);
  addField("Email", assessment.contact_email, true);
  addField("Phone", assessment.contact_phone, true);
  addField("Relationship", assessment.contact_relationship, true);
  addField("Best Day to Contact", assessment.best_day_to_contact, true);
  addField("Best Time to Contact", assessment.best_time_to_contact, true);
  yPos += 5;

  // Loved One's Information
  addSectionHeader("Loved One's Information");
  addField("Gender", assessment.loved_one_gender, true);
  addField("Primary Substances", assessment.primary_substances);
  addField("Frequency of Use", assessment.frequency, true);
  addField("Duration of Use", assessment.duration_of_use, true);
  addField("Age First Used", assessment.age_first_used?.toString(), true);
  addField("Use Has Increased", assessment.use_increased, true);
  yPos += 5;

  // DSM-5 Criteria
  addSectionHeader(`DSM-5 Criteria (${assessment.dsm_yes_count || 0}/13 Met)`);
  doc.setFontSize(8);
  dsmBehaviorQuestions.forEach((question, index) => {
    addPageIfNeeded(6);
    const met = assessment.dsm_behaviors?.[question] || false;
    doc.setFont("helvetica", met ? "bold" : "normal");
    doc.setTextColor(met ? 180 : 120, met ? 50 : 120, met ? 50 : 120);
    doc.text(`${met ? "✓" : "○"} ${dsmBehaviorLabels[index]}`, margin, yPos);
    yPos += 5;
  });
  yPos += 5;

  // Withdrawal & Medical Risks
  addSectionHeader("Withdrawal & Medical Risks");
  addField("Withdrawal Symptoms", assessment.withdrawal_symptoms, true);
  if (assessment.withdrawal_description) {
    addField("Description", assessment.withdrawal_description);
  }
  addField("Recent Detox", assessment.recent_detox, true);
  addField("Hospitalized for Detox", assessment.hospitalized_detox, true);
  addField("Withdrawal Medications", 
    assessment.withdrawal_medications + (assessment.withdrawal_medications_list ? ` - ${assessment.withdrawal_medications_list}` : ""), true);
  yPos += 5;

  // Biomedical Conditions
  addSectionHeader("Biomedical Conditions");
  addField("Health Issues", 
    assessment.health_issues + (assessment.health_issues_list ? ` - ${assessment.health_issues_list}` : ""));
  addField("Recent ER Visits", 
    assessment.recent_er_visits + (assessment.er_visit_details ? ` - ${assessment.er_visit_details}` : ""));
  addField("Prescribed Medications", 
    assessment.prescribed_medications + (assessment.prescribed_medications_list ? ` - ${assessment.prescribed_medications_list}` : ""));
  yPos += 5;

  // Emotional/Behavioral Risks
  addSectionHeader("Emotional/Behavioral Risks");
  addField("Mental Health Signs", 
    assessment.mental_health_signs + (assessment.mental_health_details ? ` - ${assessment.mental_health_details}` : ""));
  addField("Psychiatric History", 
    assessment.psychiatric_history + (assessment.psychiatric_details ? ` - ${assessment.psychiatric_details}` : ""));
  addField("Violence/Self-Harm/Trauma", 
    assessment.violence_history + (assessment.violence_details ? ` - ${assessment.violence_details}` : ""));
  yPos += 5;

  // Family/Social Environment
  addSectionHeader("Family/Social Environment");
  addField("Stable Living", assessment.stable_living, true);
  addField("Homeless/Unstable Housing", assessment.homeless_unstable, true);
  addField("Family Enabling", 
    assessment.family_enabling + (assessment.enabling_details ? ` - ${assessment.enabling_details}` : ""));
  addField("Children Present", assessment.children_present, true);
  if (assessment.children_present === "yes") {
    addField("Children Impacted", assessment.children_impacted);
  }
  addField("Support Network", assessment.support_network, true);
  yPos += 5;

  // Relapse/Recovery Environment
  addSectionHeader("Relapse/Recovery Environment");
  addField("Prior Treatment", assessment.prior_treatment, true);
  if (assessment.treatment_history && assessment.treatment_history.length > 0) {
    addPageIfNeeded(20);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 100, 100);
    doc.text("Treatment History:", margin, yPos);
    yPos += 5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 51, 51);
    assessment.treatment_history.forEach((t) => {
      addPageIfNeeded(6);
      doc.text(`• ${t.programName} - ${t.dateAttended} (${t.successfulCompletion ? "Completed" : "Not completed"})`, margin + 5, yPos);
      yPos += 5;
    });
    yPos += 3;
  }
  addField("Current Triggers", assessment.current_triggers);
  addField("Willingness to Change", assessment.willingness_to_change ? `${assessment.willingness_to_change}/10` : null, true);
  yPos += 5;

  // Family Impact & Readiness
  addSectionHeader("Family Impact & Readiness");
  addField("Financial Impact", 
    assessment.financial_impact + (assessment.financial_details ? ` - ${assessment.financial_details}` : ""));
  addField("Child Welfare Involvement", assessment.child_welfare_involvement, true);
  addField("Family Ready for Intervention", assessment.family_ready_intervention, true);
  addField("Intervention Barriers", assessment.intervention_barriers);
  yPos += 5;

  // Signature
  addPageIfNeeded(15);
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 8;
  addField("Signed by", assessment.family_signature, true);

  // Footer on each page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${totalPages} | CONFIDENTIAL - Freedom Interventions`,
      pageWidth / 2,
      285,
      { align: "center" }
    );
  }

  // Save
  const fileName = `assessment-${assessment.loved_one_name.toLowerCase().replace(/\s+/g, "-")}-${format(new Date(assessment.created_at), "yyyy-MM-dd")}.pdf`;
  doc.save(fileName);
};
