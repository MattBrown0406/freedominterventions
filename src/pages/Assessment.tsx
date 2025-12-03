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

const Assessment = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [treatmentHistory, setTreatmentHistory] = useState<TreatmentEntry[]>([]);
  
  const [formData, setFormData] = useState({
    // Section 1
    fullName: "",
    age: "",
    gender: "",
    primarySubstances: "",
    frequency: "",
    durationOfUse: "",
    ageFirstUsed: "",
    useIncreased: "",
    
    // Section 2
    dsmBehaviors: {} as Record<string, boolean>,
    
    // Section 3
    withdrawalSymptoms: "",
    withdrawalDescription: "",
    recentDetox: "",
    hospitalizedDetox: "",
    withdrawalMedications: "",
    withdrawalMedicationsList: "",
    
    // Section 4
    healthIssues: "",
    healthIssuesList: "",
    recentERVisits: "",
    erVisitDetails: "",
    prescribedMedications: "",
    prescribedMedicationsList: "",
    
    // Section 5
    mentalHealthSigns: "",
    mentalHealthDetails: "",
    psychiatricHistory: "",
    psychiatricDetails: "",
    violenceHistory: "",
    violenceDetails: "",
    
    // Section 6
    stableLiving: "",
    homelessUnstable: "",
    familyEnabling: "",
    enablingDetails: "",
    childrenPresent: "",
    childrenImpacted: "",
    supportNetwork: "",
    
    // Section 7
    priorTreatment: "",
    currentTriggers: "",
    willingnessToChange: "",
    
    // Section 8
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
      const { error } = await supabase.functions.invoke("send-contact-message", {
        body: {
          name: formData.familySignature || "Assessment Form",
          email: "assessment@freedominterventions.com",
          phone: "",
          message: `
FAMILY SUBSTANCE USE INTAKE QUESTIONNAIRE

SECTION 1: LOVED ONE'S BASIC INFORMATION
Full Name: ${formData.fullName}
Age: ${formData.age}
Gender: ${formData.gender}
Primary Substance(s): ${formData.primarySubstances}
Frequency: ${formData.frequency}
Duration of Use: ${formData.durationOfUse}
Age First Used: ${formData.ageFirstUsed}
Use Increased Over Time: ${formData.useIncreased}

SECTION 2: USE PATTERNS AND SEVERITY (DSM-5 CRITERIA)
${dsmBehaviors.map(b => `${b}: ${formData.dsmBehaviors[b] ? 'Yes' : 'No'}`).join('\n')}
Total Yes Responses: ${countYesResponses()}/13
Severity Level: ${getSeverityLevel(countYesResponses())}

SECTION 3: WITHDRAWAL AND MEDICAL RISKS
Withdrawal Symptoms Observed: ${formData.withdrawalSymptoms}
Description: ${formData.withdrawalDescription}
Recent Detox Attempts: ${formData.recentDetox}
Hospitalized for Detox: ${formData.hospitalizedDetox}
Withdrawal Medications: ${formData.withdrawalMedications} - ${formData.withdrawalMedicationsList}

SECTION 4: BIOMEDICAL CONDITIONS
Known Health Issues: ${formData.healthIssues} - ${formData.healthIssuesList}
Recent ER Visits: ${formData.recentERVisits} - ${formData.erVisitDetails}
Prescribed Medications: ${formData.prescribedMedications} - ${formData.prescribedMedicationsList}

SECTION 5: EMOTIONAL/BEHAVIORAL RISKS
Mental Health Signs: ${formData.mentalHealthSigns} - ${formData.mentalHealthDetails}
Psychiatric History: ${formData.psychiatricHistory} - ${formData.psychiatricDetails}
Violence/Self-Harm/Trauma History: ${formData.violenceHistory} - ${formData.violenceDetails}

SECTION 6: FAMILY/SOCIAL ENVIRONMENT
Stable Living Situation: ${formData.stableLiving}
Homeless or Unstable Housing: ${formData.homelessUnstable}
Family Enabling: ${formData.familyEnabling} - ${formData.enablingDetails}
Children Present (<18): ${formData.childrenPresent}
Children Impacted: ${formData.childrenImpacted}
Support Network: ${formData.supportNetwork}

SECTION 7: RELAPSE/RECOVERY ENVIRONMENT
Prior Treatment Attempts: ${formData.priorTreatment}
Treatment History:
${formatTreatmentHistory()}
Current Triggers/Stressors: ${formData.currentTriggers}
Willingness to Change (1-10): ${formData.willingnessToChange}

SECTION 8: FAMILY IMPACT AND READINESS
Financial Impact: ${formData.financialImpact} - ${formData.financialDetails}
Child Welfare Involvement: ${formData.childWelfareInvolvement}
Family Ready for Intervention: ${formData.familyReadyIntervention}
Barriers: ${formData.interventionBarriers}

Family Signature: ${formData.familySignature}
Date: ${new Date().toLocaleDateString()}
          `,
        },
      });

      if (error) throw error;

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

      <main className="flex-grow">
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
              {/* Section 1: Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 1: Loved One's Basic Information</CardTitle>
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

              {/* Section 2: DSM-5 Criteria */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 2: Use Patterns and Severity (DSM-5 Criteria Indicators)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Rate the loved one's behaviors in the past 12 months (Family observations):
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

              {/* Section 3: Withdrawal and Medical Risks */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 3: Withdrawal and Medical Risks</CardTitle>
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

              {/* Section 4: Biomedical Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 4: Biomedical Conditions</CardTitle>
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

              {/* Section 5: Emotional/Behavioral Risks */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 5: Emotional/Behavioral Risks</CardTitle>
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

              {/* Section 6: Family/Social Environment */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 6: Family/Social Environment</CardTitle>
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

              {/* Section 7: Relapse/Recovery Environment */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 7: Relapse/Recovery Environment</CardTitle>
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

              {/* Section 8: Family Impact and Readiness */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 8: Family Impact and Readiness</CardTitle>
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
