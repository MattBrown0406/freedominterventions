export interface SubstanceEntry {
  substance: string;
  ageFirstUsed: string;
  routeOfAdministration: string;
  frequency: string;
  lastUsed: string;
  currentlyUsing: boolean;
}

export interface TreatmentEntry {
  programName: string;
  programType: string;
  dateAttended: string;
  durationDays: string;
  successfulCompletion: boolean;
  aftercareFollowed: boolean;
  reasonForLeaving: string;
}

export interface FamilyMemberEntry {
  name: string;
  relationship: string;
  age: string;
  willingToParticipate: boolean;
  relationshipWithLovedOne: string;
  hasLeverage: boolean;
  leverageDetails: string;
}

export interface FamilyAddictionEntry {
  relationship: string;
  substanceOrBehavior: string;
  currentStatus: string;
  recoveryStatus: string;
}

export interface FamilyMentalHealthEntry {
  relationship: string;
  diagnosis: string;
  treatmentStatus: string;
}

export interface EnablingBehavior {
  behavior: string;
  whoEnables: string;
  frequency: string;
}

export interface BottomLine {
  familyMember: string;
  consequence: string;
  willingToFollow: boolean;
}

export interface AssessmentFormData {
  // Section 1: Contact Information
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactRelationship: string;
  bestDayToContact: string;
  bestTimeToContact: string;

  // Section 2: Individual Demographics
  fullName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  maritalStatus: string;
  employmentStatus: string;
  occupation: string;
  educationLevel: string;
  livingSituation: string;
  ethnicity: string;
  primaryLanguage: string;
  veteranStatus: string;
  insuranceCardFrontUrl: string;
  insuranceCardBackUrl: string;

  // Section 3: Comprehensive Substance Use History
  primarySubstances: string;
  substancesUsed: SubstanceEntry[];
  currentUsingSubstances: string;
  polysubstanceUse: string;
  ivDrugUse: string;
  overdoseHistory: string;
  overdoseDetails: string;
  naloxoneReversals: string;
  longestSobrietyPeriod: string;
  lastUseDate: string;
  typicalDailyUse: string;
  routeOfAdministration: string;
  blackoutsHistory: string;
  morningUse: string;
  usingAlone: string;
  hidingUse: string;
  frequency: string;
  durationOfUse: string;
  ageFirstUsed: string;
  useIncreased: string;

  // Section 4: DSM-V Criteria
  dsmBehaviors: Record<string, boolean>;
  dsmLargerAmounts: string;
  dsmDesireCutDown: string;
  dsmTimeSpent: string;
  dsmCravings: string;
  dsmFailureObligations: string;
  dsmContinuedUseProblems: string;
  dsmActivitiesGivenUp: string;
  dsmHazardousUse: string;
  dsmContinuedDespiteKnowledge: string;
  dsmTolerance: string;
  dsmWithdrawal: string;

  // Section 5: ASAM Dimension 1 - Withdrawal/Intoxication
  withdrawalSymptoms: string;
  withdrawalDescription: string;
  recentDetox: string;
  hospitalizedDetox: string;
  withdrawalMedications: string;
  withdrawalMedicationsList: string;
  currentIntoxicationLevel: string;
  seizureHistory: string;
  deliriumTremensHistory: string;
  withdrawalSeverity: string;
  medicalSupervisionNeeded: string;

  // Section 6: ASAM Dimension 2 - Biomedical
  healthIssues: string;
  healthIssuesList: string;
  recentERVisits: string;
  erVisitDetails: string;
  prescribedMedications: string;
  prescribedMedicationsList: string;
  chronicPain: string;
  chronicPainDetails: string;
  infectiousDiseases: string;
  infectiousDiseaseDetails: string;
  pregnancyStatus: string;
  physicalDisabilities: string;
  sleepProblems: string;
  appetiteChanges: string;
  primaryCarePhysician: string;
  lastPhysicalExam: string;

  // Section 7: ASAM Dimension 3 - Emotional/Behavioral/Cognitive
  mentalHealthSigns: string;
  mentalHealthDetails: string;
  psychiatricHistory: string;
  psychiatricDetails: string;
  violenceHistory: string;
  violenceDetails: string;
  currentMentalHealthSymptoms: string[];
  suicideIdeation: string;
  suicideIdeationDetails: string;
  suicideAttemptsHistory: string;
  suicideAttemptsDetails: string;
  selfHarmHistory: string;
  homicidalIdeation: string;
  traumaHistory: string;
  traumaDetails: string;
  ptsdSymptoms: string;
  eatingDisorderHistory: string;
  impulseControlIssues: string;
  cognitiveImpairment: string;
  currentMentalHealthTreatment: string;
  mentalHealthMedications: string[];
  mentalHealthDiagnoses: string[];

  // Section 8: ASAM Dimension 4 - Readiness to Change
  stageOfChange: string;
  acknowledgesProblem: string;
  motivationLevel: string;
  previousRecoveryAttempts: string;
  whatWorkedBefore: string;
  whatDidntWork: string;
  treatmentGoals: string;
  resistanceFactors: string;
  willingnessToChange: string;

  // Section 9: ASAM Dimension 5 - Relapse Potential
  relapseTriggers: string[];
  highRiskSituations: string;
  copingSkills: string;
  relapseWarningSigns: string;
  peerSupportRecovery: string;
  twelveStepInvolvement: string;
  soberLivingInterest: string;

  // Section 10: ASAM Dimension 6 - Recovery Environment
  stableLiving: string;
  homelessUnstable: string;
  supportNetwork: string;
  peopleUsingInHome: string;
  substancesAccessibleHome: string;
  relationshipWithUsingFriends: string;
  safeHousingAvailable: string;
  transportationAccess: string;
  employmentBarriers: string;
  legalIssues: string;
  legalIssuesDetails: string;
  pendingCharges: string;
  probationParole: string;
  duiHistory: string;

  // Section 11: Treatment History
  priorTreatment: string;
  treatmentHistory: TreatmentEntry[];
  currentTriggers: string;

  // Section 12: Family System Dynamics
  familyMembersParticipating: FamilyMemberEntry[];
  familyUnityLevel: string;
  familyCommunicationPatterns: string;
  familyConflicts: string;
  familyConflictsDetails: string;
  divorcedParents: string;
  blendedFamily: string;
  estrangedFamilyMembers: string;
  estrangedDetails: string;
  familyRoles: string;
  codependencyPatterns: string;
  boundariesAssessment: string;
  enablingBehaviorsList: EnablingBehavior[];
  familySecrets: string;
  familyTraumaHistory: string;
  familyInRecovery: string;
  familyCounselingHistory: string;
  familyInterventionConcerns: string;
  whoHoldsLeverage: string;
  bottomLines: BottomLine[];
  familyEnabling: string;
  enablingDetails: string;
  childrenPresent: string;
  childrenImpacted: string;

  // Section 13: Family Mental Health History
  familyMentalHealthHistory: FamilyMentalHealthEntry[];
  familySuicideHistory: string;
  familyPsychiatricHospitalizations: string;

  // Section 14: Family Addiction History
  familyAddictionHistory: FamilyAddictionEntry[];
  generationalAddictionPattern: string;
  familyRecoveryHistory: string;
  familyOverdoseDeaths: string;

  // Section 15: Consequences and Impact
  financialImpact: string;
  financialDetails: string;
  jobLossDueToUse: string;
  relationshipLosses: string;
  relationshipLossesDetails: string;
  custodyIssues: string;
  childWelfareInvolvement: string;
  dcfInvolvementDetails: string;
  debtAmount: string;
  bankruptcy: string;
  stolenFromFamily: string;
  physicalAltercations: string;
  arrestsHistory: string;
  arrestsDetails: string;
  accidentsDueToUse: string;
  healthConsequences: string;

  // Section 16: Intervention Planning
  familyReadyIntervention: string;
  interventionBarriers: string;
  interventionTypePreference: string;
  bestApproach: string;
  potentialObjections: string;
  whatMotivatesIndividual: string;
  treatmentPreferences: string;
  geographicPreferences: string;
  insuranceInformation: string;
  budgetForTreatment: string;
  urgencyLevel: string;
  immediateSafetyConcerns: string;
  additionalInformation: string;

  // Section 17: Risk Assessment
  overallRiskLevel: string;
  recommendedLevelOfCare: string;
  specialConsiderations: string;

  // Signature
  familySignature: string;
}

export const DSM_CRITERIA = [
  {
    id: "larger_amounts",
    criterion: "1. Taking larger amounts or using over longer periods",
    question: "Has your loved one used substances in larger amounts or for longer periods than they originally intended?",
    examples: "Examples: Started with 'just one drink' but ends up drinking all night; planned to use 'just this once' but continued for days/weeks"
  },
  {
    id: "desire_cut_down",
    criterion: "2. Persistent desire or unsuccessful efforts to cut down",
    question: "Has your loved one expressed a desire to cut down or stop using but been unable to do so?",
    examples: "Examples: Made promises to quit, set limits that were broken, tried to moderate without success"
  },
  {
    id: "time_spent",
    criterion: "3. Great deal of time spent obtaining, using, or recovering",
    question: "Does your loved one spend a significant amount of time obtaining, using, or recovering from substances?",
    examples: "Examples: Whole days spent obtaining drugs, using, or 'sleeping it off'; neglecting other activities"
  },
  {
    id: "cravings",
    criterion: "4. Craving or strong desire to use",
    question: "Does your loved one experience strong cravings or urges to use substances?",
    examples: "Examples: Talks about needing to use, becomes agitated when substances aren't available, obsessive thoughts about using"
  },
  {
    id: "failure_obligations",
    criterion: "5. Failure to fulfill major role obligations",
    question: "Has substance use caused your loved one to miss important family events, work responsibilities, or school obligations?",
    examples: "Examples: Missing work, getting fired, failing classes, missing children's events, neglecting household duties"
  },
  {
    id: "continued_despite_problems",
    criterion: "6. Continued use despite social/interpersonal problems",
    question: "Has your loved one continued using despite it causing problems in their relationships or social life?",
    examples: "Examples: Fighting with spouse, estrangement from family, losing friendships, damaged trust"
  },
  {
    id: "activities_given_up",
    criterion: "7. Important activities given up or reduced",
    question: "Has your loved one given up or reduced participation in activities they once enjoyed because of substance use?",
    examples: "Examples: No longer exercises, stopped hobbies, withdrew from social activities, lost interest in career"
  },
  {
    id: "hazardous_use",
    criterion: "8. Recurrent use in hazardous situations",
    question: "Has your loved one engaged in risky behaviors while using, such as driving under the influence or unsafe sexual activity?",
    examples: "Examples: DUIs, operating machinery while impaired, mixing substances dangerously, risky sexual behavior"
  },
  {
    id: "continued_despite_knowledge",
    criterion: "9. Continued use despite knowledge of physical/psychological problems",
    question: "Has your loved one continued using despite knowing it's causing or worsening physical or mental health problems?",
    examples: "Examples: Drinking despite liver problems, using despite worsening depression, ignoring doctor's warnings"
  },
  {
    id: "tolerance",
    criterion: "10. Tolerance (needing more for same effect)",
    question: "Has your loved one needed to use more of the substance to achieve the same effect they used to get with less?",
    examples: "Examples: Drinking more to feel drunk, needing larger doses of pills, escalating amounts over time"
  },
  {
    id: "withdrawal",
    criterion: "11. Withdrawal symptoms or use to avoid withdrawal",
    question: "Has your loved one experienced physical or emotional withdrawal symptoms when not using, or used specifically to avoid withdrawal?",
    examples: "Examples: Shaking, sweating, nausea, anxiety, using 'just to feel normal', morning use to stop shaking"
  }
];

export const MENTAL_HEALTH_SYMPTOMS = [
  "Depression/persistent sadness",
  "Anxiety/panic attacks",
  "Mood swings/irritability",
  "Paranoia/suspiciousness",
  "Hallucinations (seeing/hearing things)",
  "Delusions (false beliefs)",
  "Memory problems",
  "Difficulty concentrating",
  "Insomnia/sleep disturbance",
  "Excessive sleep",
  "Social withdrawal/isolation",
  "Loss of interest in activities",
  "Agitation/restlessness",
  "Impulsive behavior",
  "Self-destructive behavior",
  "Obsessive thoughts",
  "Compulsive behaviors"
];

export const RELAPSE_TRIGGERS = [
  "Stress",
  "Boredom",
  "Loneliness",
  "Anger/frustration",
  "Anxiety",
  "Depression",
  "Celebrations/parties",
  "Relationship conflicts",
  "Financial problems",
  "Work problems",
  "Chronic pain",
  "Sleep problems",
  "Environmental cues (places/people)",
  "Traumatic memories",
  "Overconfidence in recovery"
];

export const ENABLING_BEHAVIORS = [
  "Giving money",
  "Paying bills/rent",
  "Providing housing",
  "Making excuses for behavior",
  "Covering up consequences",
  "Calling in sick to work for them",
  "Bailing out of jail",
  "Paying legal fees",
  "Providing transportation to obtain substances",
  "Drinking/using with them",
  "Minimizing the problem",
  "Avoiding confrontation",
  "Taking over their responsibilities"
];

export const SUBSTANCES_LIST = [
  "Alcohol",
  "Heroin",
  "Fentanyl",
  "Other opioids (Oxycodone, Hydrocodone, etc.)",
  "Cocaine/Crack",
  "Methamphetamine",
  "Benzodiazepines (Xanax, Valium, etc.)",
  "Cannabis/Marijuana",
  "Prescription stimulants (Adderall, etc.)",
  "MDMA/Ecstasy",
  "Hallucinogens (LSD, mushrooms)",
  "Synthetic cannabinoids (K2/Spice)",
  "Kratom",
  "Inhalants",
  "GHB",
  "Ketamine",
  "Tobacco/Nicotine",
  "Gambling (behavioral)",
  "Other"
];

export const ROUTES_OF_ADMINISTRATION = [
  "Oral (swallowing)",
  "Smoking",
  "Snorting/intranasal",
  "Injection (IV)",
  "Injection (IM/subcutaneous)",
  "Sublingual (under tongue)",
  "Transdermal (patches)",
  "Rectal",
  "Multiple routes"
];

export const PHYSICAL_WITHDRAWAL_SYMPTOMS = [
  "Tremors/shaking (hands, body)",
  "Sweating (excessive perspiration)",
  "Nausea/vomiting",
  "Diarrhea/stomach cramps",
  "Rapid heart rate/palpitations",
  "Elevated blood pressure",
  "Fever/chills",
  "Muscle aches/pains",
  "Headaches",
  "Loss of appetite",
  "Fatigue/exhaustion",
  "Insomnia/difficulty sleeping",
  "Hypersomnia (sleeping too much)",
  "Dilated pupils",
  "Runny nose/watery eyes",
  "Goosebumps/skin crawling sensations",
  "Yawning (excessive)",
  "Seizures",
  "Coordination problems/unsteady gait",
  "Restless legs/body movements"
];

export const PSYCHOLOGICAL_WITHDRAWAL_SYMPTOMS = [
  "Anxiety/nervousness",
  "Agitation/irritability",
  "Restlessness/inability to sit still",
  "Depression/low mood",
  "Mood swings",
  "Difficulty concentrating",
  "Memory problems/confusion",
  "Cravings (intense urges to use)",
  "Panic attacks",
  "Paranoia/suspiciousness",
  "Hallucinations (seeing/hearing things)",
  "Disorientation/confusion",
  "Nightmares/vivid dreams",
  "Emotional numbness",
  "Suicidal thoughts",
  "Anger outbursts",
  "Social withdrawal",
  "Loss of motivation/anhedonia",
  "Racing thoughts",
  "Feeling of impending doom"
];
