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
import { Plus, Trash2 } from "lucide-react";

interface TreatmentEntry {
  programName: string;
  dateAttended: string;
  successfulCompletion: boolean;
}

const dsmBehaviors = [
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

const Assessment = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [treatmentHistory, setTreatmentHistory] = useState<TreatmentEntry[]>([]);
  
  const [formData, setFormData] = useState({
    // Section 1: Contact Information
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactRelationship: "",
    bestDayToContact: "",
    bestTimeToContact: "",
    
    // Section 2: Loved One's Basic Information
    fullName: "",
    age: "",
    gender: "",
    primarySubstances: "",
    frequency: "",
    durationOfUse: "",
    ageFirstUsed: "",
    useIncreased: "",
    
    // Section 3
    dsmBehaviors: {} as Record<string, boolean>,
    
    // Section 4
    withdrawalSymptoms: "",
    withdrawalDescription: "",
    recentDetox: "",
    hospitalizedDetox: "",
    withdrawalMedications: "",
    withdrawalMedicationsList: "",
    
    // Section 5
    healthIssues: "",
    healthIssuesList: "",
    recentERVisits: "",
    erVisitDetails: "",
    prescribedMedications: "",
    prescribedMedicationsList: "",
    
    // Section 6
    mentalHealthSigns: "",
    mentalHealthDetails: "",
    psychiatricHistory: "",
    psychiatricDetails: "",
    violenceHistory: "",
    violenceDetails: "",
    
    // Section 7
    stableLiving: "",
    homelessUnstable: "",
    familyEnabling: "",
    enablingDetails: "",
    childrenPresent: "",
    childrenImpacted: "",
    supportNetwork: "",
    
    // Section 8
    priorTreatment: "",
    currentTriggers: "",
    willingnessToChange: "",
    
    // Section 9
    financialImpact: "",
    financialDetails: "",
    childWelfareInvolvement: "",
    familyReadyIntervention: "",
    interventionBarriers: "",
    
    // Signature
    familySignature: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDsmChange = (behavior: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dsmBehaviors: { ...prev.dsmBehaviors, [behavior]: checked }
    }));
  };

  const countYesResponses = () => {
    return Object.values(formData.dsmBehaviors).filter(v => v).length;
  };

  const getSeverityLevel = (count: number) => {
    if (count >= 6) return "Severe";
    if (count >= 4) return "Moderate";
    if (count >= 2) return "Mild";
    return "Below threshold";
  };

  const addTreatmentEntry = () => {
    setTreatmentHistory(prev => [...prev, { programName: "", dateAttended: "", successfulCompletion: false }]);
  };

  const removeTreatmentEntry = (index: number) => {
    setTreatmentHistory(prev => prev.filter((_, i) => i !== index));
  };

  const updateTreatmentEntry = (index: number, field: keyof TreatmentEntry, value: string | boolean) => {
    setTreatmentHistory(prev => prev.map((entry, i) => 
      i === index ? { ...entry, [field]: value } : entry
    ));
  };

  const formatTreatmentHistory = () => {
    if (treatmentHistory.length === 0) return "None reported";
    return treatmentHistory.map((entry, i) => 
      `${i + 1}. ${entry.programName || "Unknown"} - ${entry.dateAttended || "Date unknown"} - ${entry.successfulCompletion ? "Completed" : "Not completed"}`
    ).join('\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database
      const assessmentData = {
        // Section 1: Contact Information
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone || null,
        contact_relationship: formData.contactRelationship || null,
        best_day_to_contact: formData.bestDayToContact || null,
        best_time_to_contact: formData.bestTimeToContact || null,
        
        // Section 2: Loved One's Basic Information
        loved_one_name: formData.fullName,
        loved_one_age: formData.age ? parseInt(formData.age) : null,
        loved_one_gender: formData.gender || null,
        primary_substances: formData.primarySubstances || null,
        frequency: formData.frequency || null,
        duration_of_use: formData.durationOfUse || null,
        age_first_used: formData.ageFirstUsed ? parseInt(formData.ageFirstUsed) : null,
        use_increased: formData.useIncreased || null,
        
        // Section 3: DSM-5 Criteria
        dsm_behaviors: formData.dsmBehaviors,
        dsm_yes_count: countYesResponses(),
        severity_level: getSeverityLevel(countYesResponses()),
        
        // Section 4: Withdrawal and Medical Risks
        withdrawal_symptoms: formData.withdrawalSymptoms || null,
        withdrawal_description: formData.withdrawalDescription || null,
        recent_detox: formData.recentDetox || null,
        hospitalized_detox: formData.hospitalizedDetox || null,
        withdrawal_medications: formData.withdrawalMedications || null,
        withdrawal_medications_list: formData.withdrawalMedicationsList || null,
        
        // Section 5: Biomedical Conditions
        health_issues: formData.healthIssues || null,
        health_issues_list: formData.healthIssuesList || null,
        recent_er_visits: formData.recentERVisits || null,
        er_visit_details: formData.erVisitDetails || null,
        prescribed_medications: formData.prescribedMedications || null,
        prescribed_medications_list: formData.prescribedMedicationsList || null,
        
        // Section 6: Emotional/Behavioral Risks
        mental_health_signs: formData.mentalHealthSigns || null,
        mental_health_details: formData.mentalHealthDetails || null,
        psychiatric_history: formData.psychiatricHistory || null,
        psychiatric_details: formData.psychiatricDetails || null,
        violence_history: formData.violenceHistory || null,
        violence_details: formData.violenceDetails || null,
        
        // Section 7: Family/Social Environment
        stable_living: formData.stableLiving || null,
        homeless_unstable: formData.homelessUnstable || null,
        family_enabling: formData.familyEnabling || null,
        enabling_details: formData.enablingDetails || null,
        children_present: formData.childrenPresent || null,
        children_impacted: formData.childrenImpacted || null,
        support_network: formData.supportNetwork || null,
        
        // Section 8: Relapse/Recovery Environment
        prior_treatment: formData.priorTreatment || null,
        treatment_history: treatmentHistory.length > 0 ? treatmentHistory : null,
        current_triggers: formData.currentTriggers || null,
        willingness_to_change: formData.willingnessToChange || null,
        
        // Section 9: Family Impact and Readiness
        financial_impact: formData.financialImpact || null,
        financial_details: formData.financialDetails || null,
        child_welfare_involvement: formData.childWelfareInvolvement || null,
        family_ready_intervention: formData.familyReadyIntervention || null,
        intervention_barriers: formData.interventionBarriers || null,
        
        // Signature
        family_signature: formData.familySignature || null,
      };

      const { error: dbError } = await supabase
        .from("assessments")
        .insert(assessmentData as never);

      if (dbError) throw dbError;

      // Also send email notification
      await supabase.functions.invoke("send-contact-message", {
        body: {
          name: formData.contactName || "Assessment Form",
          email: "assessment@freedominterventions.com",
          phone: formData.contactPhone || "",
          message: `New assessment submitted for ${formData.fullName}.\n\nContact: ${formData.contactName} (${formData.contactEmail})\nBest time to reach: ${formData.bestDayToContact || "Any day"} - ${formData.bestTimeToContact || "Any time"}\n\nSeverity Level: ${getSeverityLevel(countYesResponses())} (${countYesResponses()}/13 criteria)\n\nView full assessment in the admin dashboard.`,
        },
      });

      toast({
        title: "Assessment Submitted",
        description: "Thank you. We will review your assessment and contact you soon.",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Family Substance Use Assessment | Freedom Interventions</title>
        <meta
          name="description"
          content="Complete our confidential family substance use intake questionnaire to help inform ASAM level of care placement and professional intervention planning."
        />
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Family Substance Use Intake Questionnaire
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              For Professional Interventionist Use Only
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="mb-8">
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  This tool gathers key information from families to inform ASAM level of care placement 
                  and DSM-5 substance use disorder assessment. Not a diagnostic instrument—requires 
                  professional interpretation. Complete honestly; responses remain confidential.
                </p>
              </CardContent>
            </Card>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 1: Your Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Your Full Name</Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactRelationship">Relationship to Loved One</Label>
                      <Input
                        id="contactRelationship"
                        placeholder="e.g., Parent, Spouse, Sibling"
                        value={formData.contactRelationship}
                        onChange={(e) => handleInputChange("contactRelationship", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactEmail">Email Address</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">Phone Number</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Best Day to Contact</Label>
                      <Select
                        value={formData.bestDayToContact}
                        onValueChange={(v) => handleInputChange("bestDayToContact", v)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select a day" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="monday">Monday</SelectItem>
                          <SelectItem value="tuesday">Tuesday</SelectItem>
                          <SelectItem value="wednesday">Wednesday</SelectItem>
                          <SelectItem value="thursday">Thursday</SelectItem>
                          <SelectItem value="friday">Friday</SelectItem>
                          <SelectItem value="saturday">Saturday</SelectItem>
                          <SelectItem value="sunday">Sunday</SelectItem>
                          <SelectItem value="any">Any Day</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Best Time to Contact</Label>
                      <Select
                        value={formData.bestTimeToContact}
                        onValueChange={(v) => handleInputChange("bestTimeToContact", v)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                          <SelectItem value="evening">Evening (5 PM - 7 PM)</SelectItem>
                          <SelectItem value="any">Any Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2: Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 2: Loved One's Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Input
                      id="gender"
                      value={formData.gender}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="primarySubstances">Primary Substance(s) Used</Label>
                    <Input
                      id="primarySubstances"
                      value={formData.primarySubstances}
                      onChange={(e) => handleInputChange("primarySubstances", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label>Frequency of Use</Label>
                    <RadioGroup
                      value={formData.frequency}
                      onValueChange={(v) => handleInputChange("frequency", v)}
                      className="flex flex-wrap gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily" id="freq-daily" />
                        <Label htmlFor="freq-daily" className="font-normal">Daily</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekly" id="freq-weekly" />
                        <Label htmlFor="freq-weekly" className="font-normal">Weekly</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="freq-monthly" />
                        <Label htmlFor="freq-monthly" className="font-normal">Monthly</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Duration of Regular Use</Label>
                    <RadioGroup
                      value={formData.durationOfUse}
                      onValueChange={(v) => handleInputChange("durationOfUse", v)}
                      className="flex flex-wrap gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="less-than-1" id="dur-1" />
                        <Label htmlFor="dur-1" className="font-normal">Less than 1 year</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1-5" id="dur-2" />
                        <Label htmlFor="dur-2" className="font-normal">1-5 years</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5-plus" id="dur-3" />
                        <Label htmlFor="dur-3" className="font-normal">5+ years</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ageFirstUsed">Age First Used</Label>
                      <Input
                        id="ageFirstUsed"
                        type="number"
                        value={formData.ageFirstUsed}
                        onChange={(e) => handleInputChange("ageFirstUsed", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Has Use Increased Over Time?</Label>
                      <RadioGroup
                        value={formData.useIncreased}
                        onValueChange={(v) => handleInputChange("useIncreased", v)}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="inc-yes" />
                          <Label htmlFor="inc-yes" className="font-normal">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="inc-no" />
                          <Label htmlFor="inc-no" className="font-normal">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: DSM-5 Criteria */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 3: Use Patterns and Severity (DSM-5 Criteria Indicators)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Confirm your loved one's behaviors in the past 12 months (Family observations):
                  </p>
                  
                  <div className="space-y-3">
                    {dsmBehaviors.map((behavior) => (
                      <div key={behavior} className="flex items-start space-x-3">
                        <Checkbox
                          id={behavior}
                          checked={formData.dsmBehaviors[behavior] || false}
                          onCheckedChange={(checked) => handleDsmChange(behavior, checked as boolean)}
                        />
                        <Label htmlFor={behavior} className="font-normal leading-tight cursor-pointer">
                          {behavior}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-medium">
                      Yes Responses: {countYesResponses()} / 13
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      DSM-5 threshold: 2+ = Mild; 4+ = Moderate; 6+ = Severe
                    </p>
                    <p className="font-medium mt-2">
                      Indicated Severity: <span className="text-primary">{getSeverityLevel(countYesResponses())}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 4: Withdrawal and Medical Risks */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 4: Withdrawal and Medical Risks</CardTitle>
                  <p className="text-sm text-muted-foreground">ASAM Dimension 1 - Acute Intoxication/Withdrawal</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Observed withdrawal symptoms (sweats, shakes, nausea, seizures)?</Label>
                    <RadioGroup
                      value={formData.withdrawalSymptoms}
                      onValueChange={(v) => handleInputChange("withdrawalSymptoms", v)}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="ws-yes" />
                        <Label htmlFor="ws-yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="ws-no" />
                        <Label htmlFor="ws-no" className="font-normal">No</Label>
                      </div>
                    </RadioGroup>
                    {formData.withdrawalSymptoms === "yes" && (
                      <Textarea
                        placeholder="Please describe..."
                        value={formData.withdrawalDescription}
                        onChange={(e) => handleInputChange("withdrawalDescription", e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Recent detox attempts?</Label>
                      <RadioGroup
                        value={formData.recentDetox}
                        onValueChange={(v) => handleInputChange("recentDetox", v)}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="rd-yes" />
                          <Label htmlFor="rd-yes" className="font-normal">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="rd-no" />
                          <Label htmlFor="rd-no" className="font-normal">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label>Hospitalized for detox?</Label>
                      <RadioGroup
                        value={formData.hospitalizedDetox}
                        onValueChange={(v) => handleInputChange("hospitalizedDetox", v)}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="hd-yes" />
                          <Label htmlFor="hd-yes" className="font-normal">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="hd-no" />
                          <Label htmlFor="hd-no" className="font-normal">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div>
                    <Label>Current medications for withdrawal?</Label>
                    <RadioGroup
                      value={formData.withdrawalMedications}
                      onValueChange={(v) => handleInputChange("withdrawalMedications", v)}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="wm-yes" />
                        <Label htmlFor="wm-yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="wm-no" />
                        <Label htmlFor="wm-no" className="font-normal">No</Label>
                      </div>
                    </RadioGroup>
                    {formData.withdrawalMedications === "yes" && (
                      <Input
                        placeholder="List medications..."
                        value={formData.withdrawalMedicationsList}
                        onChange={(e) => handleInputChange("withdrawalMedicationsList", e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Section 5: Biomedical Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 5: Biomedical Conditions</CardTitle>
                  <p className="text-sm text-muted-foreground">ASAM Dimension 2</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Known health issues (liver disease, heart problems, infections)?</Label>
                    <RadioGroup
                      value={formData.healthIssues}
                      onValueChange={(v) => handleInputChange("healthIssues", v)}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="hi-yes" />
                        <Label htmlFor="hi-yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="hi-no" />
                        <Label htmlFor="hi-no" className="font-normal">No</Label>
                      </div>
                    </RadioGroup>
                    {formData.healthIssues === "yes" && (
                      <Input
                        placeholder="Please describe..."
                        value={formData.healthIssuesList}
                        onChange={(e) => handleInputChange("healthIssuesList", e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </div>

                  <div>
                    <Label>Recent ER visits/hospitalizations?</Label>
                    <RadioGroup
                      value={formData.recentERVisits}
                      onValueChange={(v) => handleInputChange("recentERVisits", v)}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="er-yes" />
                        <Label htmlFor="er-yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="er-no" />
                        <Label htmlFor="er-no" className="font-normal">No</Label>
                      </div>
                    </RadioGroup>
                    {formData.recentERVisits === "yes" && (
                      <Input
                        placeholder="Please describe..."
                        value={formData.erVisitDetails}
                        onChange={(e) => handleInputChange("erVisitDetails", e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </div>

                  <div>
                    <Label>Current prescribed medications?</Label>
                    <RadioGroup
                      value={formData.prescribedMedications}
                      onValueChange={(v) => handleInputChange("prescribedMedications", v)}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="pm-yes" />
                        <Label htmlFor="pm-yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="pm-no" />
                        <Label htmlFor="pm-no" className="font-normal">No</Label>
                      </div>
                    </RadioGroup>
                    {formData.prescribedMedications === "yes" && (
                      <Textarea
                        placeholder="Please list medication names and dosages if known..."
                        value={formData.prescribedMedicationsList}
                        onChange={(e) => handleInputChange("prescribedMedicationsList", e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Section 6: Emotional/Behavioral Risks */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 6: Emotional/Behavioral Risks</CardTitle>
                  <p className="text-sm text-muted-foreground">ASAM Dimensions 3 & 4</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Signs of depression, anxiety, suicidal thoughts?</Label>
                    <RadioGroup
                      value={formData.mentalHealthSigns}
                      onValueChange={(v) => handleInputChange("mentalHealthSigns", v)}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="mh-yes" />
                        <Label htmlFor="mh-yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="mh-no" />
                        <Label htmlFor="mh-no" className="font-normal">No</Label>
                      </div>
                    </RadioGroup>
                    {formData.mentalHealthSigns === "yes" && (
                      <Input
                        placeholder="Please describe..."
                        value={formData.mentalHealthDetails}
                        onChange={(e) => handleInputChange("mentalHealthDetails", e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </div>

                  <div>
                    <Label>Psychiatric hospitalizations or diagnoses?</Label>
                    <RadioGroup
                      value={formData.psychiatricHistory}
                      onValueChange={(v) => handleInputChange("psychiatricHistory", v)}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="ph-yes" />
                        <Label htmlFor="ph-yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="ph-no" />
                        <Label htmlFor="ph-no" className="font-normal">No</Label>
                      </div>
                    </RadioGroup>
                    {formData.psychiatricHistory === "yes" && (
                      <Textarea
                        placeholder="Please provide dates of hospitalizations and any official medical diagnoses given..."
                        value={formData.psychiatricDetails}
                        onChange={(e) => handleInputChange("psychiatricDetails", e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </div>

                  <div>
                    <Label>History of violence, self-harm, or trauma?</Label>
                    <RadioGroup
                      value={formData.violenceHistory}
                      onValueChange={(v) => handleInputChange("violenceHistory", v)}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="vh-yes" />
                        <Label htmlFor="vh-yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="vh-no" />
                        <Label htmlFor="vh-no" className="font-normal">No</Label>
                      </div>
                    </RadioGroup>
                    {formData.violenceHistory === "yes" && (
                      <Textarea
                        placeholder="Please provide details about any history of violence, self-harm, or trauma. Keep your description to 3-5 short sentences..."
                        value={formData.violenceDetails}
                        onChange={(e) => handleInputChange("violenceDetails", e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Section 7: Family/Social Environment */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 7: Family/Social Environment</CardTitle>
                  <p className="text-sm text-muted-foreground">ASAM Dimension 5</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Living situation stable?</Label>
                      <RadioGroup
                        value={formData.stableLiving}
                        onValueChange={(v) => handleInputChange("stableLiving", v)}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="sl-yes" />
                          <Label htmlFor="sl-yes" className="font-normal">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="sl-no" />
                          <Label htmlFor="sl-no" className="font-normal">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label>Homeless or unstable housing?</Label>
                      <RadioGroup
                        value={formData.homelessUnstable}
                        onValueChange={(v) => handleInputChange("homelessUnstable", v)}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="hu-yes" />
                          <Label htmlFor="hu-yes" className="font-normal">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="hu-no" />
                          <Label htmlFor="hu-no" className="font-normal">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div>
                    <Label>Family enabling or supporting use?</Label>
                    <RadioGroup
                      value={formData.familyEnabling}
                      onValueChange={(v) => handleInputChange("familyEnabling", v)}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="fe-yes" />
                        <Label htmlFor="fe-yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="fe-no" />
                        <Label htmlFor="fe-no" className="font-normal">No</Label>
                      </div>
                    </RadioGroup>
                    {formData.familyEnabling === "yes" && (
                      <Input
                        placeholder="Please describe..."
                        value={formData.enablingDetails}
                        onChange={(e) => handleInputChange("enablingDetails", e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Children present (&lt;18)?</Label>
                      <RadioGroup
                        value={formData.childrenPresent}
                        onValueChange={(v) => handleInputChange("childrenPresent", v)}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="cp-yes" />
                          <Label htmlFor="cp-yes" className="font-normal">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="cp-no" />
                          <Label htmlFor="cp-no" className="font-normal">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    {formData.childrenPresent === "yes" && (
                      <div>
                        <Label>Children impacted (neglect/safety risks)?</Label>
                        <RadioGroup
                          value={formData.childrenImpacted}
                          onValueChange={(v) => handleInputChange("childrenImpacted", v)}
                          className="flex gap-4 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="ci-yes" />
                            <Label htmlFor="ci-yes" className="font-normal">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="ci-no" />
                            <Label htmlFor="ci-no" className="font-normal">No</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Support network (sober family/friends)?</Label>
                    <RadioGroup
                      value={formData.supportNetwork}
                      onValueChange={(v) => handleInputChange("supportNetwork", v)}
                      className="flex flex-wrap gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="strong" id="sn-strong" />
                        <Label htmlFor="sn-strong" className="font-normal">Strong</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weak" id="sn-weak" />
                        <Label htmlFor="sn-weak" className="font-normal">Weak</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="sn-none" />
                        <Label htmlFor="sn-none" className="font-normal">None</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Section 8: Relapse/Recovery Environment */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 8: Relapse/Recovery Environment</CardTitle>
                  <p className="text-sm text-muted-foreground">ASAM Dimension 6</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Prior treatment attempts?</Label>
                      <RadioGroup
                        value={formData.priorTreatment}
                        onValueChange={(v) => handleInputChange("priorTreatment", v)}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="pt-yes" />
                          <Label htmlFor="pt-yes" className="font-normal">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="pt-no" />
                          <Label htmlFor="pt-no" className="font-normal">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {formData.priorTreatment === "yes" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Treatment History</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addTreatmentEntry}>
                          <Plus className="h-4 w-4 mr-1" /> Add Program
                        </Button>
                      </div>
                      
                      {treatmentHistory.length > 0 && (
                        <div className="border rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name of Program</TableHead>
                                <TableHead>Date Attended</TableHead>
                                <TableHead className="text-center">Successful Completion</TableHead>
                                <TableHead className="w-12"></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {treatmentHistory.map((entry, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    <Input
                                      placeholder="Program name"
                                      value={entry.programName}
                                      onChange={(e) => updateTreatmentEntry(index, "programName", e.target.value)}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Input
                                      placeholder="e.g., Jan 2023"
                                      value={entry.dateAttended}
                                      onChange={(e) => updateTreatmentEntry(index, "dateAttended", e.target.value)}
                                    />
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Checkbox
                                      checked={entry.successfulCompletion}
                                      onCheckedChange={(checked) => updateTreatmentEntry(index, "successfulCompletion", checked as boolean)}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeTreatmentEntry(index)}
                                    >
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                      
                      {treatmentHistory.length === 0 && (
                        <p className="text-sm text-muted-foreground">Click "Add Program" to enter treatment history.</p>
                      )}
                    </div>
                  )}

                  <div>
                    <Label htmlFor="currentTriggers">Current triggers/stressors (job loss, relationships)?</Label>
                    <Textarea
                      id="currentTriggers"
                      value={formData.currentTriggers}
                      onChange={(e) => handleInputChange("currentTriggers", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Willingness to change (1-10 scale)</Label>
                    <Select
                      value={formData.willingnessToChange}
                      onValueChange={(v) => handleInputChange("willingnessToChange", v)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a rating" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <SelectItem key={n} value={n.toString()}>
                            {n} {n <= 3 ? "(Low)" : n <= 6 ? "(Moderate)" : "(High)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Section 9: Family Impact and Readiness */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 9: Family Impact and Readiness</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Financial impact (debts, job loss)?</Label>
                    <RadioGroup
                      value={formData.financialImpact}
                      onValueChange={(v) => handleInputChange("financialImpact", v)}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="fi-yes" />
                        <Label htmlFor="fi-yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="fi-no" />
                        <Label htmlFor="fi-no" className="font-normal">No</Label>
                      </div>
                    </RadioGroup>
                    {formData.financialImpact === "yes" && (
                      <Input
                        placeholder="Please describe..."
                        value={formData.financialDetails}
                        onChange={(e) => handleInputChange("financialDetails", e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </div>

                  <div>
                    <Label>Child welfare involvement?</Label>
                    <RadioGroup
                      value={formData.childWelfareInvolvement}
                      onValueChange={(v) => handleInputChange("childWelfareInvolvement", v)}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="cw-yes" />
                        <Label htmlFor="cw-yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="cw-no" />
                        <Label htmlFor="cw-no" className="font-normal">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Family ready for intervention?</Label>
                    <RadioGroup
                      value={formData.familyReadyIntervention}
                      onValueChange={(v) => handleInputChange("familyReadyIntervention", v)}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="fr-yes" />
                        <Label htmlFor="fr-yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="fr-no" />
                        <Label htmlFor="fr-no" className="font-normal">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="interventionBarriers">Barriers to intervention?</Label>
                    <Textarea
                      id="interventionBarriers"
                      value={formData.interventionBarriers}
                      onChange={(e) => handleInputChange("interventionBarriers", e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Signature */}
              <Card>
                <CardHeader>
                  <CardTitle>Family Signature</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="familySignature">Your Full Name (Electronic Signature)</Label>
                    <Input
                      id="familySignature"
                      value={formData.familySignature}
                      onChange={(e) => handleInputChange("familySignature", e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Date: {new Date().toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <Card className="bg-muted/50">
                <CardContent className="pt-6 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    <strong>Confidentiality Notice:</strong> All information provided in this questionnaire 
                    is strictly confidential and protected in accordance with HIPAA (Health Insurance Portability 
                    and Accountability Act) requirements. Your personal health information will only be used 
                    for the purpose of professional evaluation and treatment planning, and will not be disclosed 
                    to any third party without your written consent, except as required by law.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Disclaimer:</strong> This intake supports professional evaluation only and is not for self-diagnosis.
                  </p>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Assessment"}
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Assessment;
