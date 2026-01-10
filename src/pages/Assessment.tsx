import { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { DSM_CRITERIA, MENTAL_HEALTH_SYMPTOMS, RELAPSE_TRIGGERS, ENABLING_BEHAVIORS, SUBSTANCES_LIST, ROUTES_OF_ADMINISTRATION, PHYSICAL_WITHDRAWAL_SYMPTOMS, PSYCHOLOGICAL_WITHDRAWAL_SYMPTOMS } from "@/components/assessment/types";

interface TreatmentEntry {
  programName: string;
  programType: string;
  dateAttended: string;
  durationDays: string;
  successfulCompletion: boolean;
  aftercareFollowed: boolean;
  reasonForLeaving: string;
}

interface SubstanceEntry {
  substance: string;
  ageFirstUsed: string;
  routeOfAdministration: string;
  frequency: string;
  lastUsed: string;
  currentlyUsing: boolean;
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
  condition: string;
  details: string;
}

const Assessment = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const totalSections = 12;

  // Complex state arrays
  const [treatmentHistory, setTreatmentHistory] = useState<TreatmentEntry[]>([]);
  const [substancesUsed, setSubstancesUsed] = useState<SubstanceEntry[]>([]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMemberEntry[]>([]);
  const [familyAddictionHistory, setFamilyAddictionHistory] = useState<FamilyHistoryEntry[]>([]);
  const [familyMentalHealthHistory, setFamilyMentalHealthHistory] = useState<FamilyHistoryEntry[]>([]);

  const [formData, setFormData] = useState({
    // Section 1: Contact Information
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactRelationship: "",
    bestDayToContact: "",
    bestTimeToContact: "",

    // Section 2: Demographics
    fullName: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    maritalStatus: "",
    employmentStatus: "",
    occupation: "",
    educationLevel: "",
    livingSituation: "",
    veteranStatus: "",
    primaryLanguage: "",

    // Section 3: Substance History
    primarySubstances: "",
    polysubstanceUse: "",
    ivDrugUse: "",
    overdoseHistory: "",
    overdoseDetails: "",
    naloxoneReversals: "",
    morningUse: "",
    usingAlone: "",
    hidingUse: "",
    blackoutsHistory: "",
    ageFirstUsed: "",
    durationOfUse: "",
    longestSobrietyPeriod: "",
    useIncreased: "",
    typicalDailyUse: "",
    lastUseDate: "",
    frequency: "",

    // Section 4: DSM-V Criteria
    dsmBehaviors: {} as Record<string, boolean>,

    // Section 5: Withdrawal/Medical (ASAM Dim 1 & 2)
    physicalWithdrawalSymptoms: [] as string[],
    psychologicalWithdrawalSymptoms: [] as string[],
    withdrawalDescription: "",
    seizureHistory: "",
    deliriumTremensHistory: "",
    recentDetox: "",
    hospitalizedDetox: "",
    withdrawalMedications: "",
    withdrawalMedicationsList: "",
    healthIssues: "",
    healthIssuesList: "",
    recentERVisits: "",
    erVisitDetails: "",
    prescribedMedications: "",
    prescribedMedicationsList: "",
    chronicPain: "",
    chronicPainDetails: "",
    infectiousDiseases: "",
    pregnancyStatus: "",
    sleepProblems: "",

    // Section 6: Mental Health (ASAM Dim 3)
    mentalHealthSigns: "",
    mentalHealthDetails: "",
    psychiatricHistory: "",
    psychiatricDetails: "",
    currentMentalHealthSymptoms: [] as string[],
    suicideIdeation: "",
    suicideIdeationDetails: "",
    suicideAttemptsHistory: "",
    selfHarmHistory: "",
    homicidalIdeation: "",
    traumaHistory: "",
    traumaDetails: "",
    ptsdSymptoms: "",
    mentalHealthDiagnoses: "",
    currentMentalHealthTreatment: "",

    // Section 7: Readiness to Change (ASAM Dim 4)
    stageOfChange: "",
    acknowledgesProblem: "",
    motivationLevel: "",
    willingnessToChange: "",
    whatWorkedBefore: "",
    whatDidntWork: "",
    treatmentGoals: "",
    resistanceFactors: "",

    // Section 8: Relapse Potential (ASAM Dim 5)
    relapseTriggers: [] as string[],
    highRiskSituations: "",
    copingSkills: "",
    relapseWarningSigns: "",
    peerSupportRecovery: "",
    twelveStepInvolvement: "",
    priorTreatment: "",
    currentTriggers: "",

    // Section 9: Recovery Environment (ASAM Dim 6)
    stableLiving: "",
    homelessUnstable: "",
    peopleUsingInHome: "",
    substancesAccessibleHome: "",
    supportNetwork: "",
    safeHousingAvailable: "",
    transportationAccess: "",
    legalIssues: "",
    legalIssuesDetails: "",
    pendingCharges: "",
    probationParole: "",
    duiHistory: "",

    // Section 10: Family System
    familyUnityLevel: "",
    familyCommunicationPatterns: "",
    familyConflicts: "",
    familyConflictsDetails: "",
    divorcedParents: "",
    estrangedFamilyMembers: "",
    estrangedDetails: "",
    codependencyPatterns: "",
    boundariesAssessment: "",
    familyEnabling: "",
    enablingDetails: "",
    familySecrets: "",
    familyTraumaHistory: "",
    childrenPresent: "",
    childrenImpacted: "",
    whoHoldsLeverage: "",

    // Section 11: Family History
    generationalAddictionPattern: "",
    familyRecoveryHistory: "",
    familyOverdoseDeaths: "",
    familySuicideHistory: "",
    familyPsychiatricHospitalizations: "",

    // Section 12: Consequences & Intervention Planning
    violenceHistory: "",
    violenceDetails: "",
    financialImpact: "",
    financialDetails: "",
    jobLossDueToUse: "",
    relationshipLosses: "",
    stolenFromFamily: "",
    arrestsHistory: "",
    arrestsDetails: "",
    childWelfareInvolvement: "",
    familyReadyIntervention: "",
    interventionBarriers: "",
    whatMotivatesIndividual: "",
    treatmentPreferences: "",
    geographicPreferences: "",
    insuranceInformation: "",
    budgetForTreatment: "",
    urgencyLevel: "",
    immediateSafetyConcerns: "",
    additionalInformation: "",
    familySignature: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDsmChange = (criterionId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dsmBehaviors: { ...prev.dsmBehaviors, [criterionId]: checked }
    }));
  };

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      currentMentalHealthSymptoms: checked 
        ? [...prev.currentMentalHealthSymptoms, symptom]
        : prev.currentMentalHealthSymptoms.filter(s => s !== symptom)
    }));
  };

  const handleTriggerChange = (trigger: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      relapseTriggers: checked 
        ? [...prev.relapseTriggers, trigger]
        : prev.relapseTriggers.filter(t => t !== trigger)
    }));
  };

  const handlePhysicalWithdrawalChange = (symptom: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      physicalWithdrawalSymptoms: checked 
        ? [...prev.physicalWithdrawalSymptoms, symptom]
        : prev.physicalWithdrawalSymptoms.filter(s => s !== symptom)
    }));
  };

  const handlePsychologicalWithdrawalChange = (symptom: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      psychologicalWithdrawalSymptoms: checked 
        ? [...prev.psychologicalWithdrawalSymptoms, symptom]
        : prev.psychologicalWithdrawalSymptoms.filter(s => s !== symptom)
    }));
  };

  const countDsmYes = () => Object.values(formData.dsmBehaviors).filter(v => v).length;
  
  const getSeverityLevel = (count: number) => {
    if (count >= 6) return { level: "Severe", color: "text-red-600" };
    if (count >= 4) return { level: "Moderate", color: "text-orange-600" };
    if (count >= 2) return { level: "Mild", color: "text-yellow-600" };
    return { level: "Below clinical threshold", color: "text-green-600" };
  };

  // Array manipulation helpers
  const addSubstance = () => setSubstancesUsed(prev => [...prev, { substance: "", ageFirstUsed: "", routeOfAdministration: "", frequency: "", lastUsed: "", currentlyUsing: false }]);
  const removeSubstance = (i: number) => setSubstancesUsed(prev => prev.filter((_, idx) => idx !== i));
  const updateSubstance = (i: number, field: keyof SubstanceEntry, value: any) => setSubstancesUsed(prev => prev.map((e, idx) => idx === i ? { ...e, [field]: value } : e));

  const addTreatment = () => setTreatmentHistory(prev => [...prev, { programName: "", programType: "", dateAttended: "", durationDays: "", successfulCompletion: false, aftercareFollowed: false, reasonForLeaving: "" }]);
  const removeTreatment = (i: number) => setTreatmentHistory(prev => prev.filter((_, idx) => idx !== i));
  const updateTreatment = (i: number, field: keyof TreatmentEntry, value: any) => setTreatmentHistory(prev => prev.map((e, idx) => idx === i ? { ...e, [field]: value } : e));

  const addFamilyMember = () => setFamilyMembers(prev => [...prev, { name: "", relationship: "", willingToParticipate: false, hasLeverage: false, leverageDetails: "" }]);
  const removeFamilyMember = (i: number) => setFamilyMembers(prev => prev.filter((_, idx) => idx !== i));
  const updateFamilyMember = (i: number, field: keyof FamilyMemberEntry, value: any) => setFamilyMembers(prev => prev.map((e, idx) => idx === i ? { ...e, [field]: value } : e));

  const addFamilyAddiction = () => setFamilyAddictionHistory(prev => [...prev, { relationship: "", condition: "", details: "" }]);
  const removeFamilyAddiction = (i: number) => setFamilyAddictionHistory(prev => prev.filter((_, idx) => idx !== i));
  const updateFamilyAddiction = (i: number, field: keyof FamilyHistoryEntry, value: string) => setFamilyAddictionHistory(prev => prev.map((e, idx) => idx === i ? { ...e, [field]: value } : e));

  const addFamilyMentalHealth = () => setFamilyMentalHealthHistory(prev => [...prev, { relationship: "", condition: "", details: "" }]);
  const removeFamilyMentalHealth = (i: number) => setFamilyMentalHealthHistory(prev => prev.filter((_, idx) => idx !== i));
  const updateFamilyMentalHealth = (i: number, field: keyof FamilyHistoryEntry, value: string) => setFamilyMentalHealthHistory(prev => prev.map((e, idx) => idx === i ? { ...e, [field]: value } : e));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const assessmentData = {
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone || null,
        contact_relationship: formData.contactRelationship || null,
        best_day_to_contact: formData.bestDayToContact || null,
        best_time_to_contact: formData.bestTimeToContact || null,
        loved_one_name: formData.fullName,
        loved_one_age: formData.age ? parseInt(formData.age) : null,
        loved_one_gender: formData.gender || null,
        date_of_birth: formData.dateOfBirth || null,
        marital_status: formData.maritalStatus || null,
        employment_status: formData.employmentStatus || null,
        occupation: formData.occupation || null,
        education_level: formData.educationLevel || null,
        living_situation: formData.livingSituation || null,
        veteran_status: formData.veteranStatus || null,
        primary_language: formData.primaryLanguage || null,
        primary_substances: formData.primarySubstances || null,
        substances_used: substancesUsed.length > 0 ? substancesUsed : null,
        polysubstance_use: formData.polysubstanceUse || null,
        iv_drug_use: formData.ivDrugUse || null,
        overdose_history: formData.overdoseHistory || null,
        overdose_details: formData.overdoseDetails || null,
        naloxone_reversals: formData.naloxoneReversals ? parseInt(formData.naloxoneReversals) : null,
        morning_use: formData.morningUse || null,
        using_alone: formData.usingAlone || null,
        hiding_use: formData.hidingUse || null,
        blackouts_history: formData.blackoutsHistory || null,
        age_first_used: formData.ageFirstUsed ? parseInt(formData.ageFirstUsed) : null,
        duration_of_use: formData.durationOfUse || null,
        longest_sobriety_period: formData.longestSobrietyPeriod || null,
        use_increased: formData.useIncreased || null,
        typical_daily_use: formData.typicalDailyUse || null,
        last_use_date: formData.lastUseDate || null,
        frequency: formData.frequency || null,
        dsm_behaviors: formData.dsmBehaviors,
        dsm_yes_count: countDsmYes(),
        severity_level: getSeverityLevel(countDsmYes()).level,
        withdrawal_symptoms: formData.physicalWithdrawalSymptoms.length > 0 || formData.psychologicalWithdrawalSymptoms.length > 0 
          ? JSON.stringify({ physical: formData.physicalWithdrawalSymptoms, psychological: formData.psychologicalWithdrawalSymptoms })
          : null,
        withdrawal_description: formData.withdrawalDescription || null,
        seizure_history: formData.seizureHistory || null,
        delirium_tremens_history: formData.deliriumTremensHistory || null,
        recent_detox: formData.recentDetox || null,
        hospitalized_detox: formData.hospitalizedDetox || null,
        withdrawal_medications: formData.withdrawalMedications || null,
        withdrawal_medications_list: formData.withdrawalMedicationsList || null,
        health_issues: formData.healthIssues || null,
        health_issues_list: formData.healthIssuesList || null,
        recent_er_visits: formData.recentERVisits || null,
        er_visit_details: formData.erVisitDetails || null,
        prescribed_medications: formData.prescribedMedications || null,
        prescribed_medications_list: formData.prescribedMedicationsList || null,
        chronic_pain: formData.chronicPain || null,
        chronic_pain_details: formData.chronicPainDetails || null,
        infectious_diseases: formData.infectiousDiseases || null,
        pregnancy_status: formData.pregnancyStatus || null,
        sleep_problems: formData.sleepProblems || null,
        mental_health_signs: formData.mentalHealthSigns || null,
        mental_health_details: formData.mentalHealthDetails || null,
        psychiatric_history: formData.psychiatricHistory || null,
        psychiatric_details: formData.psychiatricDetails || null,
        current_mental_health_symptoms: formData.currentMentalHealthSymptoms.length > 0 ? formData.currentMentalHealthSymptoms : null,
        suicide_ideation: formData.suicideIdeation || null,
        suicide_ideation_details: formData.suicideIdeationDetails || null,
        suicide_attempts_history: formData.suicideAttemptsHistory || null,
        self_harm_history: formData.selfHarmHistory || null,
        homicidal_ideation: formData.homicidalIdeation || null,
        trauma_history: formData.traumaHistory || null,
        trauma_details: formData.traumaDetails || null,
        ptsd_symptoms: formData.ptsdSymptoms || null,
        mental_health_diagnoses: formData.mentalHealthDiagnoses ? [formData.mentalHealthDiagnoses] : null,
        current_mental_health_treatment: formData.currentMentalHealthTreatment || null,
        stage_of_change: formData.stageOfChange || null,
        acknowledges_problem: formData.acknowledgesProblem || null,
        motivation_level: formData.motivationLevel || null,
        willingness_to_change: formData.willingnessToChange || null,
        what_worked_before: formData.whatWorkedBefore || null,
        what_didnt_work: formData.whatDidntWork || null,
        treatment_goals: formData.treatmentGoals || null,
        resistance_factors: formData.resistanceFactors || null,
        relapse_triggers: formData.relapseTriggers.length > 0 ? formData.relapseTriggers : null,
        high_risk_situations: formData.highRiskSituations || null,
        coping_skills: formData.copingSkills || null,
        relapse_warning_signs: formData.relapseWarningSigns || null,
        peer_support_recovery: formData.peerSupportRecovery || null,
        twelve_step_involvement: formData.twelveStepInvolvement || null,
        prior_treatment: formData.priorTreatment || null,
        treatment_history: treatmentHistory.length > 0 ? treatmentHistory : null,
        current_triggers: formData.currentTriggers || null,
        stable_living: formData.stableLiving || null,
        homeless_unstable: formData.homelessUnstable || null,
        people_using_in_home: formData.peopleUsingInHome || null,
        substances_accessible_home: formData.substancesAccessibleHome || null,
        support_network: formData.supportNetwork || null,
        safe_housing_available: formData.safeHousingAvailable || null,
        transportation_access: formData.transportationAccess || null,
        legal_issues: formData.legalIssues || null,
        legal_issues_details: formData.legalIssuesDetails || null,
        pending_charges: formData.pendingCharges || null,
        probation_parole: formData.probationParole || null,
        dui_history: formData.duiHistory || null,
        family_members_participating: familyMembers.length > 0 ? familyMembers : null,
        family_unity_level: formData.familyUnityLevel || null,
        family_communication_patterns: formData.familyCommunicationPatterns || null,
        family_conflicts: formData.familyConflicts || null,
        family_conflicts_details: formData.familyConflictsDetails || null,
        divorced_parents: formData.divorcedParents || null,
        estranged_family_members: formData.estrangedFamilyMembers || null,
        estranged_details: formData.estrangedDetails || null,
        codependency_patterns: formData.codependencyPatterns || null,
        boundaries_assessment: formData.boundariesAssessment || null,
        family_enabling: formData.familyEnabling || null,
        enabling_details: formData.enablingDetails || null,
        family_secrets: formData.familySecrets || null,
        family_trauma_history: formData.familyTraumaHistory || null,
        children_present: formData.childrenPresent || null,
        children_impacted: formData.childrenImpacted || null,
        who_holds_leverage: formData.whoHoldsLeverage || null,
        family_addiction_history: familyAddictionHistory.length > 0 ? familyAddictionHistory : null,
        generational_addiction_pattern: formData.generationalAddictionPattern || null,
        family_recovery_history: formData.familyRecoveryHistory || null,
        family_overdose_deaths: formData.familyOverdoseDeaths || null,
        family_mental_health_history: familyMentalHealthHistory.length > 0 ? familyMentalHealthHistory : null,
        family_suicide_history: formData.familySuicideHistory || null,
        family_psychiatric_hospitalizations: formData.familyPsychiatricHospitalizations || null,
        violence_history: formData.violenceHistory || null,
        violence_details: formData.violenceDetails || null,
        financial_impact: formData.financialImpact || null,
        financial_details: formData.financialDetails || null,
        job_loss_due_to_use: formData.jobLossDueToUse || null,
        relationship_losses: formData.relationshipLosses || null,
        stolen_from_family: formData.stolenFromFamily || null,
        arrests_history: formData.arrestsHistory || null,
        arrests_details: formData.arrestsDetails || null,
        child_welfare_involvement: formData.childWelfareInvolvement || null,
        family_ready_intervention: formData.familyReadyIntervention || null,
        intervention_barriers: formData.interventionBarriers || null,
        what_motivates_individual: formData.whatMotivatesIndividual || null,
        treatment_preferences: formData.treatmentPreferences || null,
        geographic_preferences: formData.geographicPreferences || null,
        insurance_information: formData.insuranceInformation || null,
        budget_for_treatment: formData.budgetForTreatment || null,
        urgency_level: formData.urgencyLevel || null,
        immediate_safety_concerns: formData.immediateSafetyConcerns || null,
        additional_information: formData.additionalInformation || null,
        family_signature: formData.familySignature || null,
      };

      const { error } = await supabase.functions.invoke("submit-assessment", { body: assessmentData });
      if (error) throw new Error(error.message);

      toast({
        title: "Assessment Submitted Successfully",
        description: "Thank you. We will review your comprehensive assessment and contact you within 24 hours.",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionTitles = [
    "Contact Information",
    "Demographics & Background",
    "Substance Use History",
    "DSM-V Diagnostic Criteria",
    "Medical & Withdrawal Risk",
    "Mental Health Assessment",
    "Readiness to Change",
    "Relapse Potential & History",
    "Recovery Environment",
    "Family System Dynamics",
    "Family History",
    "Consequences & Planning"
  ];

  const nextSection = () => setCurrentSection(prev => Math.min(prev + 1, totalSections));
  const prevSection = () => setCurrentSection(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Comprehensive Clinical Assessment | Freedom Interventions</title>
        <meta name="description" content="Complete our confidential DSM-V and ASAM-based assessment to help determine appropriate treatment placement and intervention approach." />
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-24">
        <section className="bg-primary/10 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Clinical Intake Assessment
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              DSM-V & ASAM Criteria-Based Evaluation for Professional Intervention Planning
            </p>
          </div>
        </section>

        {/* Progress Bar */}
        <div className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm border-b py-4">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Section {currentSection} of {totalSections}</span>
              <span className="text-sm font-medium text-primary">{Math.round((currentSection / totalSections) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${(currentSection / totalSections) * 100}%` }} />
            </div>
            <p className="text-sm font-medium mt-2">{sectionTitles[currentSection - 1]}</p>
          </div>
        </div>

        <section className="py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-sm">
                  This comprehensive assessment gathers clinical information based on DSM-V diagnostic criteria and ASAM placement dimensions. 
                  All information is strictly confidential and will be used only for treatment planning and intervention preparation.
                </p>
              </CardContent>
            </Card>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section 1: Contact Information */}
              {currentSection === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Section 1: Your Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactName">Your Full Name *</Label>
                        <Input id="contactName" value={formData.contactName} onChange={(e) => handleInputChange("contactName", e.target.value)} required />
                      </div>
                      <div>
                        <Label>Relationship to Individual *</Label>
                        <Select value={formData.contactRelationship} onValueChange={(v) => handleInputChange("contactRelationship", v)}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="spouse">Spouse/Partner</SelectItem>
                            <SelectItem value="child">Adult Child</SelectItem>
                            <SelectItem value="sibling">Sibling</SelectItem>
                            <SelectItem value="friend">Close Friend</SelectItem>
                            <SelectItem value="employer">Employer</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactEmail">Email Address *</Label>
                        <Input id="contactEmail" type="email" value={formData.contactEmail} onChange={(e) => handleInputChange("contactEmail", e.target.value)} required />
                      </div>
                      <div>
                        <Label htmlFor="contactPhone">Phone Number *</Label>
                        <Input id="contactPhone" type="tel" value={formData.contactPhone} onChange={(e) => handleInputChange("contactPhone", e.target.value)} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Best Day to Contact</Label>
                        <Select value={formData.bestDayToContact} onValueChange={(v) => handleInputChange("bestDayToContact", v)}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="today">Today - URGENT</SelectItem>
                            <SelectItem value="any">Any Day</SelectItem>
                            <SelectItem value="weekdays">Weekdays</SelectItem>
                            <SelectItem value="weekends">Weekends</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Best Time to Contact</Label>
                        <Select value={formData.bestTimeToContact} onValueChange={(v) => handleInputChange("bestTimeToContact", v)}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                            <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                            <SelectItem value="any">Any Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Section 2: Demographics */}
              {currentSection === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Section 2: Individual Demographics & Background</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="fullName">Full Legal Name *</Label>
                        <Input id="fullName" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} required />
                      </div>
                      <div>
                        <Label htmlFor="age">Age *</Label>
                        <Input id="age" type="number" value={formData.age} onChange={(e) => handleInputChange("age", e.target.value)} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={(e) => handleInputChange("dateOfBirth", e.target.value)} />
                      </div>
                      <div>
                        <Label>Gender</Label>
                        <Select value={formData.gender} onValueChange={(v) => handleInputChange("gender", v)}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="non-binary">Non-binary</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Marital Status</Label>
                        <Select value={formData.maritalStatus} onValueChange={(v) => handleInputChange("maritalStatus", v)}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="separated">Separated</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                            <SelectItem value="domestic-partnership">Domestic Partnership</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Employment Status</Label>
                        <Select value={formData.employmentStatus} onValueChange={(v) => handleInputChange("employmentStatus", v)}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="employed-full">Employed Full-time</SelectItem>
                            <SelectItem value="employed-part">Employed Part-time</SelectItem>
                            <SelectItem value="self-employed">Self-employed</SelectItem>
                            <SelectItem value="unemployed">Unemployed</SelectItem>
                            <SelectItem value="disabled">Disabled</SelectItem>
                            <SelectItem value="retired">Retired</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="occupation">Occupation/Profession</Label>
                      <Input id="occupation" value={formData.occupation} onChange={(e) => handleInputChange("occupation", e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Education Level</Label>
                        <Select value={formData.educationLevel} onValueChange={(v) => handleInputChange("educationLevel", v)}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="less-than-hs">Less than High School</SelectItem>
                            <SelectItem value="hs-diploma">High School/GED</SelectItem>
                            <SelectItem value="some-college">Some College</SelectItem>
                            <SelectItem value="associates">Associate's Degree</SelectItem>
                            <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                            <SelectItem value="masters">Master's Degree</SelectItem>
                            <SelectItem value="doctorate">Doctorate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Living Situation</Label>
                        <Select value={formData.livingSituation} onValueChange={(v) => handleInputChange("livingSituation", v)}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="own-home">Owns Home</SelectItem>
                            <SelectItem value="renting">Renting</SelectItem>
                            <SelectItem value="with-family">Living with Family</SelectItem>
                            <SelectItem value="homeless">Homeless</SelectItem>
                            <SelectItem value="sober-living">Sober Living</SelectItem>
                            <SelectItem value="shelter">Shelter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Veteran Status</Label>
                      <RadioGroup value={formData.veteranStatus} onValueChange={(v) => handleInputChange("veteranStatus", v)} className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="vet-no" /><Label htmlFor="vet-no" className="font-normal">Not a Veteran</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="vet-yes" /><Label htmlFor="vet-yes" className="font-normal">Veteran</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="active" id="vet-active" /><Label htmlFor="vet-active" className="font-normal">Active Duty</Label></div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Section 3: Substance History */}
              {currentSection === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Section 3: Comprehensive Substance Use History</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="primarySubstances">Primary Substance(s) of Concern *</Label>
                      <Textarea id="primarySubstances" placeholder="List all substances of concern" value={formData.primarySubstances} onChange={(e) => handleInputChange("primarySubstances", e.target.value)} required />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Detailed Substance History</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addSubstance}><Plus className="h-4 w-4 mr-1" /> Add Substance</Button>
                      </div>
                      {substancesUsed.length > 0 && (
                        <div className="border rounded-lg overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Substance</TableHead>
                                <TableHead>Age Started</TableHead>
                                <TableHead>Route</TableHead>
                                <TableHead>Frequency</TableHead>
                                <TableHead>Last Used</TableHead>
                                <TableHead className="text-center">Current</TableHead>
                                <TableHead></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {substancesUsed.map((entry, i) => (
                                <TableRow key={i}>
                                  <TableCell>
                                    <Select value={entry.substance} onValueChange={(v) => updateSubstance(i, "substance", v)}>
                                      <SelectTrigger className="w-[140px]"><SelectValue placeholder="Select" /></SelectTrigger>
                                      <SelectContent>{SUBSTANCES_LIST.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                                    </Select>
                                  </TableCell>
                                  <TableCell><Input type="number" className="w-16" value={entry.ageFirstUsed} onChange={(e) => updateSubstance(i, "ageFirstUsed", e.target.value)} /></TableCell>
                                  <TableCell>
                                    <Select value={entry.routeOfAdministration} onValueChange={(v) => updateSubstance(i, "routeOfAdministration", v)}>
                                      <SelectTrigger className="w-[100px]"><SelectValue placeholder="Route" /></SelectTrigger>
                                      <SelectContent>{ROUTES_OF_ADMINISTRATION.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                                    </Select>
                                  </TableCell>
                                  <TableCell>
                                    <Select value={entry.frequency} onValueChange={(v) => updateSubstance(i, "frequency", v)}>
                                      <SelectTrigger className="w-[100px]"><SelectValue placeholder="Freq" /></SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="daily-multiple">Multiple/day</SelectItem>
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="occasional">Occasional</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </TableCell>
                                  <TableCell><Input className="w-24" placeholder="e.g., Today" value={entry.lastUsed} onChange={(e) => updateSubstance(i, "lastUsed", e.target.value)} /></TableCell>
                                  <TableCell className="text-center"><Checkbox checked={entry.currentlyUsing} onCheckedChange={(c) => updateSubstance(i, "currentlyUsing", c)} /></TableCell>
                                  <TableCell><Button type="button" variant="ghost" size="sm" onClick={() => removeSubstance(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Polysubstance Use?</Label>
                        <RadioGroup value={formData.polysubstanceUse} onValueChange={(v) => handleInputChange("polysubstanceUse", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="poly-yes" /><Label htmlFor="poly-yes" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="poly-no" /><Label htmlFor="poly-no" className="font-normal">No</Label></div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label>IV Drug Use (injection)?</Label>
                        <RadioGroup value={formData.ivDrugUse} onValueChange={(v) => handleInputChange("ivDrugUse", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="current" id="iv-cur" /><Label htmlFor="iv-cur" className="font-normal">Current</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="past" id="iv-past" /><Label htmlFor="iv-past" className="font-normal">Past</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="never" id="iv-never" /><Label htmlFor="iv-never" className="font-normal">Never</Label></div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>History of Overdose?</Label>
                        <RadioGroup value={formData.overdoseHistory} onValueChange={(v) => handleInputChange("overdoseHistory", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="od-yes" /><Label htmlFor="od-yes" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="od-no" /><Label htmlFor="od-no" className="font-normal">No</Label></div>
                        </RadioGroup>
                      </div>
                      {formData.overdoseHistory === "yes" && (
                        <div>
                          <Label htmlFor="naloxoneReversals"># of Narcan/Naloxone Reversals</Label>
                          <Input id="naloxoneReversals" type="number" value={formData.naloxoneReversals} onChange={(e) => handleInputChange("naloxoneReversals", e.target.value)} />
                        </div>
                      )}
                    </div>

                    {formData.overdoseHistory === "yes" && (
                      <div>
                        <Label htmlFor="overdoseDetails">Overdose Details</Label>
                        <Textarea id="overdoseDetails" placeholder="Describe circumstances..." value={formData.overdoseDetails} onChange={(e) => handleInputChange("overdoseDetails", e.target.value)} />
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="ageFirstUsed">Age of First Use</Label>
                        <Input id="ageFirstUsed" type="number" value={formData.ageFirstUsed} onChange={(e) => handleInputChange("ageFirstUsed", e.target.value)} />
                      </div>
                      <div>
                        <Label>Duration of Problematic Use</Label>
                        <Select value={formData.durationOfUse} onValueChange={(v) => handleInputChange("durationOfUse", v)}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="less-6-months">Less than 6 months</SelectItem>
                            <SelectItem value="6-12-months">6-12 months</SelectItem>
                            <SelectItem value="1-2-years">1-2 years</SelectItem>
                            <SelectItem value="2-5-years">2-5 years</SelectItem>
                            <SelectItem value="5-10-years">5-10 years</SelectItem>
                            <SelectItem value="10-plus">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Longest Sobriety Period</Label>
                        <Select value={formData.longestSobrietyPeriod} onValueChange={(v) => handleInputChange("longestSobrietyPeriod", v)}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="never">Never sober</SelectItem>
                            <SelectItem value="days">Days</SelectItem>
                            <SelectItem value="weeks">Weeks</SelectItem>
                            <SelectItem value="months">1-6 months</SelectItem>
                            <SelectItem value="6-12-months">6-12 months</SelectItem>
                            <SelectItem value="1-plus-years">1+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="typicalDailyUse">Describe Typical Daily Use Pattern</Label>
                      <Textarea id="typicalDailyUse" placeholder="e.g., Drinks 12+ beers starting at noon..." value={formData.typicalDailyUse} onChange={(e) => handleInputChange("typicalDailyUse", e.target.value)} />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Section 4: DSM-V Criteria */}
              {currentSection === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Section 4: DSM-V Substance Use Disorder Criteria</CardTitle>
                    <p className="text-sm text-muted-foreground">Based on observations over the past 12 months. Check all that apply.</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {DSM_CRITERIA.map((criterion) => (
                      <div key={criterion.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id={criterion.id}
                            checked={formData.dsmBehaviors[criterion.id] || false}
                            onCheckedChange={(checked) => handleDsmChange(criterion.id, checked as boolean)}
                          />
                          <div>
                            <Label htmlFor={criterion.id} className="font-medium cursor-pointer">{criterion.criterion}</Label>
                            <p className="text-sm text-muted-foreground mt-1">{criterion.question}</p>
                            <p className="text-xs text-muted-foreground/70 mt-1 italic">{criterion.examples}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Separator className="my-4" />
                    
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="font-medium">Criteria Met: {countDsmYes()} / 11</p>
                      <p className="text-sm text-muted-foreground mt-1">DSM-V Severity: 2-3 = Mild, 4-5 = Moderate, 6+ = Severe</p>
                      <p className="font-medium mt-2">Indicated Severity: <span className={getSeverityLevel(countDsmYes()).color}>{getSeverityLevel(countDsmYes()).level}</span></p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Section 5: Medical/Withdrawal */}
              {currentSection === 5 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Section 5: Medical & Withdrawal Risk Assessment</CardTitle>
                    <p className="text-sm text-muted-foreground">ASAM Dimensions 1 & 2: Acute Intoxication/Withdrawal & Biomedical Conditions</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-semibold">Observable Physical Withdrawal Symptoms</Label>
                        <p className="text-sm text-muted-foreground mb-3">Check all symptoms you have observed in your loved one when they haven't used or are between uses:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {PHYSICAL_WITHDRAWAL_SYMPTOMS.map((symptom) => (
                            <div key={symptom} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`physical-${symptom}`}
                                checked={formData.physicalWithdrawalSymptoms.includes(symptom)}
                                onCheckedChange={(checked) => handlePhysicalWithdrawalChange(symptom, checked as boolean)}
                              />
                              <Label htmlFor={`physical-${symptom}`} className="font-normal text-sm cursor-pointer">{symptom}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <Label className="text-base font-semibold">Observable Psychological Withdrawal Symptoms</Label>
                        <p className="text-sm text-muted-foreground mb-3">Check all psychological/emotional symptoms you have observed:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {PSYCHOLOGICAL_WITHDRAWAL_SYMPTOMS.map((symptom) => (
                            <div key={symptom} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`psych-${symptom}`}
                                checked={formData.psychologicalWithdrawalSymptoms.includes(symptom)}
                                onCheckedChange={(checked) => handlePsychologicalWithdrawalChange(symptom, checked as boolean)}
                              />
                              <Label htmlFor={`psych-${symptom}`} className="font-normal text-sm cursor-pointer">{symptom}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {(formData.physicalWithdrawalSymptoms.length > 0 || formData.psychologicalWithdrawalSymptoms.length > 0) && (
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm font-medium">Selected symptoms: {formData.physicalWithdrawalSymptoms.length + formData.psychologicalWithdrawalSymptoms.length}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="withdrawalDescription">Additional details about withdrawal symptoms</Label>
                      <Textarea id="withdrawalDescription" placeholder="Describe timing, severity, duration of symptoms observed..." value={formData.withdrawalDescription} onChange={(e) => handleInputChange("withdrawalDescription", e.target.value)} />
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>History of seizures during withdrawal?</Label>
                        <RadioGroup value={formData.seizureHistory} onValueChange={(v) => handleInputChange("seizureHistory", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="sz-yes" /><Label htmlFor="sz-yes" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="sz-no" /><Label htmlFor="sz-no" className="font-normal">No</Label></div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label>History of delirium tremens (DTs)?</Label>
                        <RadioGroup value={formData.deliriumTremensHistory} onValueChange={(v) => handleInputChange("deliriumTremensHistory", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="dt-yes" /><Label htmlFor="dt-yes" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="dt-no" /><Label htmlFor="dt-no" className="font-normal">No</Label></div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label>Previous medical detox?</Label>
                        <RadioGroup value={formData.hospitalizedDetox} onValueChange={(v) => handleInputChange("hospitalizedDetox", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="hd-yes" /><Label htmlFor="hd-yes" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="hd-no" /><Label htmlFor="hd-no" className="font-normal">No</Label></div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div>
                      <Label>Known health issues?</Label>
                      <RadioGroup value={formData.healthIssues} onValueChange={(v) => handleInputChange("healthIssues", v)} className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="hi-yes" /><Label htmlFor="hi-yes" className="font-normal">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="hi-no" /><Label htmlFor="hi-no" className="font-normal">No</Label></div>
                      </RadioGroup>
                    </div>

                    {formData.healthIssues === "yes" && (
                      <div>
                        <Label htmlFor="healthIssuesList">Describe health conditions</Label>
                        <Textarea id="healthIssuesList" placeholder="Liver disease, heart problems, diabetes, infections, etc." value={formData.healthIssuesList} onChange={(e) => handleInputChange("healthIssuesList", e.target.value)} />
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Chronic pain issues?</Label>
                        <RadioGroup value={formData.chronicPain} onValueChange={(v) => handleInputChange("chronicPain", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="cp-yes" /><Label htmlFor="cp-yes" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="cp-no" /><Label htmlFor="cp-no" className="font-normal">No</Label></div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label>Recent ER visits/hospitalizations?</Label>
                        <RadioGroup value={formData.recentERVisits} onValueChange={(v) => handleInputChange("recentERVisits", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="er-yes" /><Label htmlFor="er-yes" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="er-no" /><Label htmlFor="er-no" className="font-normal">No</Label></div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div>
                      <Label>Current prescribed medications?</Label>
                      <RadioGroup value={formData.prescribedMedications} onValueChange={(v) => handleInputChange("prescribedMedications", v)} className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="pm-yes" /><Label htmlFor="pm-yes" className="font-normal">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="pm-no" /><Label htmlFor="pm-no" className="font-normal">No</Label></div>
                      </RadioGroup>
                    </div>

                    {formData.prescribedMedications === "yes" && (
                      <div>
                        <Label htmlFor="prescribedMedicationsList">List all medications and dosages</Label>
                        <Textarea id="prescribedMedicationsList" value={formData.prescribedMedicationsList} onChange={(e) => handleInputChange("prescribedMedicationsList", e.target.value)} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Section 6: Mental Health */}
              {currentSection === 6 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Section 6: Mental Health Assessment</CardTitle>
                    <p className="text-sm text-muted-foreground">ASAM Dimension 3: Emotional, Behavioral, and Cognitive Conditions</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                      <p className="text-sm">This section addresses sensitive topics including suicide and self-harm. Your honest answers help ensure safety.</p>
                    </div>

                    <div>
                      <Label>Signs of depression, anxiety, or mood disorders?</Label>
                      <RadioGroup value={formData.mentalHealthSigns} onValueChange={(v) => handleInputChange("mentalHealthSigns", v)} className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="mh-yes" /><Label htmlFor="mh-yes" className="font-normal">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="mh-no" /><Label htmlFor="mh-no" className="font-normal">No</Label></div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="mb-3 block">Current symptoms observed (check all that apply):</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {MENTAL_HEALTH_SYMPTOMS.map((symptom) => (
                          <div key={symptom} className="flex items-center space-x-2">
                            <Checkbox
                              id={symptom}
                              checked={formData.currentMentalHealthSymptoms.includes(symptom)}
                              onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                            />
                            <Label htmlFor={symptom} className="font-normal text-sm">{symptom}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Current suicidal thoughts or ideation?</Label>
                        <RadioGroup value={formData.suicideIdeation} onValueChange={(v) => handleInputChange("suicideIdeation", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="si-yes" /><Label htmlFor="si-yes" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="si-no" /><Label htmlFor="si-no" className="font-normal">No</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="unknown" id="si-unk" /><Label htmlFor="si-unk" className="font-normal">Unknown</Label></div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label>History of suicide attempts?</Label>
                        <RadioGroup value={formData.suicideAttemptsHistory} onValueChange={(v) => handleInputChange("suicideAttemptsHistory", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="sa-yes" /><Label htmlFor="sa-yes" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="sa-no" /><Label htmlFor="sa-no" className="font-normal">No</Label></div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>History of self-harm?</Label>
                        <RadioGroup value={formData.selfHarmHistory} onValueChange={(v) => handleInputChange("selfHarmHistory", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="sh-yes" /><Label htmlFor="sh-yes" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="sh-no" /><Label htmlFor="sh-no" className="font-normal">No</Label></div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label>Homicidal thoughts or threats?</Label>
                        <RadioGroup value={formData.homicidalIdeation} onValueChange={(v) => handleInputChange("homicidalIdeation", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="hi-yes2" /><Label htmlFor="hi-yes2" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="hi-no2" /><Label htmlFor="hi-no2" className="font-normal">No</Label></div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div>
                      <Label>History of trauma (abuse, neglect, violence, accidents, sexual, abandonment, PTSD)?</Label>
                      <RadioGroup value={formData.traumaHistory} onValueChange={(v) => handleInputChange("traumaHistory", v)} className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="trauma-yes" /><Label htmlFor="trauma-yes" className="font-normal">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="trauma-no" /><Label htmlFor="trauma-no" className="font-normal">No</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="suspected" id="trauma-sus" /><Label htmlFor="trauma-sus" className="font-normal">Suspected</Label></div>
                      </RadioGroup>
                    </div>

                    {formData.traumaHistory === "yes" && (
                      <div>
                        <Label htmlFor="traumaDetails">Describe trauma history (if known and comfortable sharing)</Label>
                        <Textarea id="traumaDetails" value={formData.traumaDetails} onChange={(e) => handleInputChange("traumaDetails", e.target.value)} />
                      </div>
                    )}

                    <div>
                      <Label>Psychiatric hospitalizations or diagnoses?</Label>
                      <RadioGroup value={formData.psychiatricHistory} onValueChange={(v) => handleInputChange("psychiatricHistory", v)} className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="psych-yes" /><Label htmlFor="psych-yes" className="font-normal">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="psych-no" /><Label htmlFor="psych-no" className="font-normal">No</Label></div>
                      </RadioGroup>
                    </div>

                    {formData.psychiatricHistory === "yes" && (
                      <div>
                        <Label htmlFor="psychiatricDetails">Describe diagnoses and hospitalizations</Label>
                        <Textarea id="psychiatricDetails" placeholder="e.g., Bipolar disorder, hospitalized twice for manic episodes..." value={formData.psychiatricDetails} onChange={(e) => handleInputChange("psychiatricDetails", e.target.value)} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Section 7: Readiness to Change */}
              {currentSection === 7 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Section 7: Readiness to Change</CardTitle>
                    <p className="text-sm text-muted-foreground">ASAM Dimension 4: Motivation and Treatment Acceptance</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Stage of Change (Prochaska & DiClemente Model)</Label>
                      <Select value={formData.stageOfChange} onValueChange={(v) => handleInputChange("stageOfChange", v)}>
                        <SelectTrigger className="mt-2"><SelectValue placeholder="Select stage" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="precontemplation">Precontemplation - Denies problem, no intention to change</SelectItem>
                          <SelectItem value="contemplation">Contemplation - Aware of problem, considering change</SelectItem>
                          <SelectItem value="preparation">Preparation - Ready to take action soon</SelectItem>
                          <SelectItem value="action">Action - Actively working on change</SelectItem>
                          <SelectItem value="maintenance">Maintenance - Sustaining change, preventing relapse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Does your loved one acknowledge they have a problem?</Label>
                      <RadioGroup value={formData.acknowledgesProblem} onValueChange={(v) => handleInputChange("acknowledgesProblem", v)} className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="full-denial" id="ack-deny" /><Label htmlFor="ack-deny" className="font-normal">Complete denial</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="partial" id="ack-partial" /><Label htmlFor="ack-partial" className="font-normal">Partially acknowledges</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="acknowledges" id="ack-yes" /><Label htmlFor="ack-yes" className="font-normal">Fully acknowledges</Label></div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Willingness to accept help (1-10 scale)</Label>
                      <Select value={formData.willingnessToChange} onValueChange={(v) => handleInputChange("willingnessToChange", v)}>
                        <SelectTrigger className="mt-2"><SelectValue placeholder="Select rating" /></SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <SelectItem key={n} value={n.toString()}>{n} {n <= 3 ? "(Very resistant)" : n <= 6 ? "(Ambivalent)" : "(Willing)"}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="whatWorkedBefore">What has worked in past recovery attempts?</Label>
                      <Textarea id="whatWorkedBefore" placeholder="Programs, approaches, supports that were helpful..." value={formData.whatWorkedBefore} onChange={(e) => handleInputChange("whatWorkedBefore", e.target.value)} />
                    </div>

                    <div>
                      <Label htmlFor="whatDidntWork">What has NOT worked in past attempts?</Label>
                      <Textarea id="whatDidntWork" placeholder="Approaches that failed, reasons for leaving treatment..." value={formData.whatDidntWork} onChange={(e) => handleInputChange("whatDidntWork", e.target.value)} />
                    </div>

                    <div>
                      <Label htmlFor="resistanceFactors">What resistance or objections do you anticipate?</Label>
                      <Textarea id="resistanceFactors" placeholder="Common excuses, fears, objections they may raise..." value={formData.resistanceFactors} onChange={(e) => handleInputChange("resistanceFactors", e.target.value)} />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Section 8: Relapse Potential */}
              {currentSection === 8 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Section 8: Relapse Potential & Treatment History</CardTitle>
                    <p className="text-sm text-muted-foreground">ASAM Dimension 5: Relapse, Continued Use, or Continued Problem Potential</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="mb-3 block">Known relapse triggers (check all that apply):</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {RELAPSE_TRIGGERS.map((trigger) => (
                          <div key={trigger} className="flex items-center space-x-2">
                            <Checkbox
                              id={trigger}
                              checked={formData.relapseTriggers.includes(trigger)}
                              onCheckedChange={(checked) => handleTriggerChange(trigger, checked as boolean)}
                            />
                            <Label htmlFor={trigger} className="font-normal text-sm">{trigger}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="highRiskSituations">Describe high-risk situations</Label>
                      <Textarea id="highRiskSituations" placeholder="People, places, events that trigger use..." value={formData.highRiskSituations} onChange={(e) => handleInputChange("highRiskSituations", e.target.value)} />
                    </div>

                    <div>
                      <Label>Prior treatment attempts?</Label>
                      <RadioGroup value={formData.priorTreatment} onValueChange={(v) => handleInputChange("priorTreatment", v)} className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="pt-yes" /><Label htmlFor="pt-yes" className="font-normal">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="pt-no" /><Label htmlFor="pt-no" className="font-normal">No</Label></div>
                      </RadioGroup>
                    </div>

                    {formData.priorTreatment === "yes" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Treatment History</Label>
                          <Button type="button" variant="outline" size="sm" onClick={addTreatment}><Plus className="h-4 w-4 mr-1" /> Add Program</Button>
                        </div>
                        {treatmentHistory.length > 0 && (
                          <div className="border rounded-lg overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Program Name</TableHead>
                                  <TableHead>Type</TableHead>
                                  <TableHead>Date</TableHead>
                                  <TableHead className="text-center">Completed</TableHead>
                                  <TableHead className="text-center">Aftercare</TableHead>
                                  <TableHead></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {treatmentHistory.map((entry, i) => (
                                  <TableRow key={i}>
                                    <TableCell><Input value={entry.programName} onChange={(e) => updateTreatment(i, "programName", e.target.value)} /></TableCell>
                                    <TableCell>
                                      <Select value={entry.programType} onValueChange={(v) => updateTreatment(i, "programType", v)}>
                                        <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="detox">Detox</SelectItem>
                                          <SelectItem value="residential">Residential</SelectItem>
                                          <SelectItem value="php">PHP</SelectItem>
                                          <SelectItem value="iop">IOP</SelectItem>
                                          <SelectItem value="outpatient">Outpatient</SelectItem>
                                          <SelectItem value="sober-living">Sober Living</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </TableCell>
                                    <TableCell><Input placeholder="e.g., Jan 2023" value={entry.dateAttended} onChange={(e) => updateTreatment(i, "dateAttended", e.target.value)} /></TableCell>
                                    <TableCell className="text-center"><Checkbox checked={entry.successfulCompletion} onCheckedChange={(c) => updateTreatment(i, "successfulCompletion", c)} /></TableCell>
                                    <TableCell className="text-center"><Checkbox checked={entry.aftercareFollowed} onCheckedChange={(c) => updateTreatment(i, "aftercareFollowed", c)} /></TableCell>
                                    <TableCell><Button type="button" variant="ghost" size="sm" onClick={() => removeTreatment(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </div>
                    )}

                    <div>
                      <Label>12-Step or peer support involvement?</Label>
                      <RadioGroup value={formData.twelveStepInvolvement} onValueChange={(v) => handleInputChange("twelveStepInvolvement", v)} className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="active" id="12s-active" /><Label htmlFor="12s-active" className="font-normal">Active</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="past" id="12s-past" /><Label htmlFor="12s-past" className="font-normal">Past involvement</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="resistant" id="12s-resist" /><Label htmlFor="12s-resist" className="font-normal">Resistant</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="never" id="12s-never" /><Label htmlFor="12s-never" className="font-normal">Never tried</Label></div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Section 9: Recovery Environment */}
              {currentSection === 9 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Section 9: Recovery Environment</CardTitle>
                    <p className="text-sm text-muted-foreground">ASAM Dimension 6: Recovery/Living Environment</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Stable housing?</Label>
                        <RadioGroup value={formData.stableLiving} onValueChange={(v) => handleInputChange("stableLiving", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="sl-yes" /><Label htmlFor="sl-yes" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="sl-no" /><Label htmlFor="sl-no" className="font-normal">No</Label></div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label>Others using substances in home?</Label>
                        <RadioGroup value={formData.peopleUsingInHome} onValueChange={(v) => handleInputChange("peopleUsingInHome", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="pui-yes" /><Label htmlFor="pui-yes" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="pui-no" /><Label htmlFor="pui-no" className="font-normal">No</Label></div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div>
                      <Label>Support network (sober family/friends)?</Label>
                      <RadioGroup value={formData.supportNetwork} onValueChange={(v) => handleInputChange("supportNetwork", v)} className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="strong" id="sn-strong" /><Label htmlFor="sn-strong" className="font-normal">Strong</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="weak" id="sn-weak" /><Label htmlFor="sn-weak" className="font-normal">Weak</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="none" id="sn-none" /><Label htmlFor="sn-none" className="font-normal">None</Label></div>
                      </RadioGroup>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Current legal issues?</Label>
                        <RadioGroup value={formData.legalIssues} onValueChange={(v) => handleInputChange("legalIssues", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="li-yes" /><Label htmlFor="li-yes" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="li-no" /><Label htmlFor="li-no" className="font-normal">No</Label></div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label>On probation or parole?</Label>
                        <RadioGroup value={formData.probationParole} onValueChange={(v) => handleInputChange("probationParole", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="pp-yes" /><Label htmlFor="pp-yes" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="pp-no" /><Label htmlFor="pp-no" className="font-normal">No</Label></div>
                        </RadioGroup>
                      </div>
                    </div>

                    {formData.legalIssues === "yes" && (
                      <div>
                        <Label htmlFor="legalIssuesDetails">Describe legal situation</Label>
                        <Textarea id="legalIssuesDetails" placeholder="Pending charges, court dates, etc." value={formData.legalIssuesDetails} onChange={(e) => handleInputChange("legalIssuesDetails", e.target.value)} />
                      </div>
                    )}

                    <div>
                      <Label>History of DUI/DWI?</Label>
                      <RadioGroup value={formData.duiHistory} onValueChange={(v) => handleInputChange("duiHistory", v)} className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="dui-yes" /><Label htmlFor="dui-yes" className="font-normal">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="dui-no" /><Label htmlFor="dui-no" className="font-normal">No</Label></div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Section 10: Family System */}
              {currentSection === 10 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Section 10: Family System Dynamics</CardTitle>
                    <p className="text-sm text-muted-foreground">Understanding family dynamics is critical for intervention planning</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Family Members Who May Participate in Intervention</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addFamilyMember}><Plus className="h-4 w-4 mr-1" /> Add Member</Button>
                      </div>
                      {familyMembers.length > 0 && (
                        <div className="border rounded-lg overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Relationship</TableHead>
                                <TableHead className="text-center">Willing</TableHead>
                                <TableHead className="text-center">Has Leverage</TableHead>
                                <TableHead>Leverage Details</TableHead>
                                <TableHead></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {familyMembers.map((member, i) => (
                                <TableRow key={i}>
                                  <TableCell><Input value={member.name} onChange={(e) => updateFamilyMember(i, "name", e.target.value)} /></TableCell>
                                  <TableCell><Input value={member.relationship} onChange={(e) => updateFamilyMember(i, "relationship", e.target.value)} /></TableCell>
                                  <TableCell className="text-center"><Checkbox checked={member.willingToParticipate} onCheckedChange={(c) => updateFamilyMember(i, "willingToParticipate", c)} /></TableCell>
                                  <TableCell className="text-center"><Checkbox checked={member.hasLeverage} onCheckedChange={(c) => updateFamilyMember(i, "hasLeverage", c)} /></TableCell>
                                  <TableCell><Input placeholder="e.g., finances, housing" value={member.leverageDetails} onChange={(e) => updateFamilyMember(i, "leverageDetails", e.target.value)} /></TableCell>
                                  <TableCell><Button type="button" variant="ghost" size="sm" onClick={() => removeFamilyMember(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label>Family Unity Level</Label>
                      <Select value={formData.familyUnityLevel} onValueChange={(v) => handleInputChange("familyUnityLevel", v)}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unified">Unified - All on same page</SelectItem>
                          <SelectItem value="mostly-unified">Mostly unified with minor disagreements</SelectItem>
                          <SelectItem value="divided">Divided - Significant disagreements</SelectItem>
                          <SelectItem value="conflicted">Highly conflicted - Major opposition</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Is family enabling the addiction?</Label>
                      <RadioGroup value={formData.familyEnabling} onValueChange={(v) => handleInputChange("familyEnabling", v)} className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="fe-yes" /><Label htmlFor="fe-yes" className="font-normal">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="some" id="fe-some" /><Label htmlFor="fe-some" className="font-normal">Some members</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="fe-no" /><Label htmlFor="fe-no" className="font-normal">No</Label></div>
                      </RadioGroup>
                    </div>

                    {(formData.familyEnabling === "yes" || formData.familyEnabling === "some") && (
                      <div>
                        <Label htmlFor="enablingDetails">Describe enabling behaviors</Label>
                        <Textarea id="enablingDetails" placeholder="e.g., Giving money, making excuses, providing housing without conditions..." value={formData.enablingDetails} onChange={(e) => handleInputChange("enablingDetails", e.target.value)} />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="whoHoldsLeverage">Who holds the most leverage? How?</Label>
                      <Textarea id="whoHoldsLeverage" placeholder="e.g., Mother controls finances, employer can terminate, spouse can file for divorce..." value={formData.whoHoldsLeverage} onChange={(e) => handleInputChange("whoHoldsLeverage", e.target.value)} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Children present in home (&lt;18)?</Label>
                        <RadioGroup value={formData.childrenPresent} onValueChange={(v) => handleInputChange("childrenPresent", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="cp2-yes" /><Label htmlFor="cp2-yes" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="cp2-no" /><Label htmlFor="cp2-no" className="font-normal">No</Label></div>
                        </RadioGroup>
                      </div>
                      {formData.childrenPresent === "yes" && (
                        <div>
                          <Label>Are children being impacted?</Label>
                          <RadioGroup value={formData.childrenImpacted} onValueChange={(v) => handleInputChange("childrenImpacted", v)} className="flex gap-4 mt-2">
                            <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="ci2-yes" /><Label htmlFor="ci2-yes" className="font-normal">Yes</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="ci2-no" /><Label htmlFor="ci2-no" className="font-normal">No</Label></div>
                          </RadioGroup>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="familyTraumaHistory">Family trauma or significant events impacting dynamics</Label>
                      <Textarea id="familyTraumaHistory" placeholder="Deaths, divorces, abuse history, financial losses, etc." value={formData.familyTraumaHistory} onChange={(e) => handleInputChange("familyTraumaHistory", e.target.value)} />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Section 11: Family History */}
              {currentSection === 11 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Section 11: Family Addiction & Mental Health History</CardTitle>
                    <p className="text-sm text-muted-foreground">Generational patterns inform treatment approach</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Family Addiction History</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addFamilyAddiction}><Plus className="h-4 w-4 mr-1" /> Add Entry</Button>
                      </div>
                      {familyAddictionHistory.length > 0 && (
                        <div className="border rounded-lg overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Relationship</TableHead>
                                <TableHead>Substance/Behavior</TableHead>
                                <TableHead>Status (active/recovery/deceased)</TableHead>
                                <TableHead></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {familyAddictionHistory.map((entry, i) => (
                                <TableRow key={i}>
                                  <TableCell><Input placeholder="e.g., Father, Grandfather" value={entry.relationship} onChange={(e) => updateFamilyAddiction(i, "relationship", e.target.value)} /></TableCell>
                                  <TableCell><Input placeholder="e.g., Alcohol, Opioids" value={entry.condition} onChange={(e) => updateFamilyAddiction(i, "condition", e.target.value)} /></TableCell>
                                  <TableCell><Input placeholder="e.g., In recovery 10 years" value={entry.details} onChange={(e) => updateFamilyAddiction(i, "details", e.target.value)} /></TableCell>
                                  <TableCell><Button type="button" variant="ghost" size="sm" onClick={() => removeFamilyAddiction(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label>Is there a generational pattern of addiction?</Label>
                      <RadioGroup value={formData.generationalAddictionPattern} onValueChange={(v) => handleInputChange("generationalAddictionPattern", v)} className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="gap-yes" /><Label htmlFor="gap-yes" className="font-normal">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="gap-no" /><Label htmlFor="gap-no" className="font-normal">No</Label></div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Any family overdose deaths?</Label>
                      <RadioGroup value={formData.familyOverdoseDeaths} onValueChange={(v) => handleInputChange("familyOverdoseDeaths", v)} className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="fod-yes" /><Label htmlFor="fod-yes" className="font-normal">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="fod-no" /><Label htmlFor="fod-no" className="font-normal">No</Label></div>
                      </RadioGroup>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Family Mental Health History</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addFamilyMentalHealth}><Plus className="h-4 w-4 mr-1" /> Add Entry</Button>
                      </div>
                      {familyMentalHealthHistory.length > 0 && (
                        <div className="border rounded-lg overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Relationship</TableHead>
                                <TableHead>Diagnosis</TableHead>
                                <TableHead>Treatment Status</TableHead>
                                <TableHead></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {familyMentalHealthHistory.map((entry, i) => (
                                <TableRow key={i}>
                                  <TableCell><Input placeholder="e.g., Mother, Sister" value={entry.relationship} onChange={(e) => updateFamilyMentalHealth(i, "relationship", e.target.value)} /></TableCell>
                                  <TableCell><Input placeholder="e.g., Bipolar, Depression" value={entry.condition} onChange={(e) => updateFamilyMentalHealth(i, "condition", e.target.value)} /></TableCell>
                                  <TableCell><Input placeholder="e.g., Medicated, untreated" value={entry.details} onChange={(e) => updateFamilyMentalHealth(i, "details", e.target.value)} /></TableCell>
                                  <TableCell><Button type="button" variant="ghost" size="sm" onClick={() => removeFamilyMentalHealth(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label>Family history of suicide?</Label>
                      <RadioGroup value={formData.familySuicideHistory} onValueChange={(v) => handleInputChange("familySuicideHistory", v)} className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="fsh-yes" /><Label htmlFor="fsh-yes" className="font-normal">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="fsh-no" /><Label htmlFor="fsh-no" className="font-normal">No</Label></div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Section 12: Consequences & Planning */}
              {currentSection === 12 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Section 12: Consequences & Intervention Planning</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>History of violence or aggression?</Label>
                        <RadioGroup value={formData.violenceHistory} onValueChange={(v) => handleInputChange("violenceHistory", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="vh-yes" /><Label htmlFor="vh-yes" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="vh-no" /><Label htmlFor="vh-no" className="font-normal">No</Label></div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label>Stolen from family?</Label>
                        <RadioGroup value={formData.stolenFromFamily} onValueChange={(v) => handleInputChange("stolenFromFamily", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="stf-yes" /><Label htmlFor="stf-yes" className="font-normal">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="stf-no" /><Label htmlFor="stf-no" className="font-normal">No</Label></div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div>
                      <Label>Financial impact (job loss, debt, bankruptcy)?</Label>
                      <RadioGroup value={formData.financialImpact} onValueChange={(v) => handleInputChange("financialImpact", v)} className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="severe" id="fi-severe" /><Label htmlFor="fi-severe" className="font-normal">Severe</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="moderate" id="fi-moderate" /><Label htmlFor="fi-moderate" className="font-normal">Moderate</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="minimal" id="fi-minimal" /><Label htmlFor="fi-minimal" className="font-normal">Minimal</Label></div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Is family ready for intervention?</Label>
                      <RadioGroup value={formData.familyReadyIntervention} onValueChange={(v) => handleInputChange("familyReadyIntervention", v)} className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="fri-yes" /><Label htmlFor="fri-yes" className="font-normal">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="mostly" id="fri-mostly" /><Label htmlFor="fri-mostly" className="font-normal">Mostly ready</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="unsure" id="fri-unsure" /><Label htmlFor="fri-unsure" className="font-normal">Unsure</Label></div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="whatMotivatesIndividual">What motivates this person? What do they care about?</Label>
                      <Textarea id="whatMotivatesIndividual" placeholder="Children, career, relationships, health, hobbies, reputation..." value={formData.whatMotivatesIndividual} onChange={(e) => handleInputChange("whatMotivatesIndividual", e.target.value)} />
                    </div>

                    <div>
                      <Label htmlFor="treatmentPreferences">Treatment preferences or requirements</Label>
                      <Textarea id="treatmentPreferences" placeholder="Gender-specific, faith-based, executive, etc." value={formData.treatmentPreferences} onChange={(e) => handleInputChange("treatmentPreferences", e.target.value)} />
                    </div>

                    <div>
                      <Label>Urgency Level</Label>
                      <Select value={formData.urgencyLevel} onValueChange={(v) => handleInputChange("urgencyLevel", v)}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="crisis">Crisis - Immediate danger</SelectItem>
                          <SelectItem value="urgent">Urgent - Within days</SelectItem>
                          <SelectItem value="soon">Soon - Within 1-2 weeks</SelectItem>
                          <SelectItem value="planning">Planning stage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="immediateSafetyConcerns">Any immediate safety concerns?</Label>
                      <Textarea id="immediateSafetyConcerns" placeholder="Access to weapons, active psychosis, threats, etc." value={formData.immediateSafetyConcerns} onChange={(e) => handleInputChange("immediateSafetyConcerns", e.target.value)} />
                    </div>

                    <div>
                      <Label htmlFor="additionalInformation">Additional information we should know</Label>
                      <Textarea id="additionalInformation" placeholder="Anything else that would help us understand the situation..." value={formData.additionalInformation} onChange={(e) => handleInputChange("additionalInformation", e.target.value)} className="min-h-[120px]" />
                    </div>

                    <Separator />

                    <div>
                      <Label htmlFor="familySignature">Your Full Name (Electronic Signature) *</Label>
                      <Input id="familySignature" value={formData.familySignature} onChange={(e) => handleInputChange("familySignature", e.target.value)} required />
                      <p className="text-sm text-muted-foreground mt-2">Date: {new Date().toLocaleDateString()}</p>
                    </div>

                    <Card className="bg-muted/50">
                      <CardContent className="pt-4">
                        <p className="text-xs text-muted-foreground">
                          <strong>Confidentiality:</strong> All information is protected per HIPAA requirements and used solely for treatment planning.
                        </p>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={prevSection} disabled={currentSection === 1}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                
                {currentSection < totalSections ? (
                  <Button type="button" onClick={nextSection}>
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Assessment"}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Assessment;
