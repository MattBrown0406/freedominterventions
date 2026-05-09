export interface InterventionAnswer {
  slug: string;
  question: string;
  shortAnswer: string;
  category: string;
  deeperAnswer: string[];
  signs?: string[];
  nextStepLabel: string;
  nextStepHref: string;
  related: string[];
  keywords: string[];
}

export const interventionAnswers: InterventionAnswer[] = [
  {
    slug: "when-to-call-interventionist",
    question: "When should a family call a professional interventionist?",
    shortAnswer:
      "Call when addiction is creating safety risk, repeated treatment refusal, overdose concern, family division, or a pattern where every family conversation turns into bargaining, promises, or crisis management.",
    category: "Intervention readiness",
    deeperAnswer: [
      "A family does not need to wait until everyone agrees or until the situation becomes catastrophic. The first call is not a commitment to hold an intervention. It is a way to understand whether the family needs emergency support, readiness work, treatment planning, coaching, or a formal intervention.",
      "If the family has already tried reasoning, pleading, ultimatums, money help, consequences, or treatment suggestions and the pattern keeps repeating, outside structure is usually worth considering.",
    ],
    signs: [
      "Treatment has been refused or repeatedly delayed.",
      "There have been overdoses, medical scares, dangerous withdrawal, violence, or threats.",
      "Family members disagree so much that no plan holds.",
      "The person says they will get help but keeps backing out.",
    ],
    nextStepLabel: "Talk through intervention readiness",
    nextStepHref: "/intervention-readiness",
    related: ["what-does-interventionist-do-first", "what-if-they-refuse-treatment", "how-fast-can-intervention-happen"],
    keywords: ["when to call interventionist", "addiction intervention readiness", "family intervention help"],
  },
  {
    slug: "what-does-interventionist-do-first",
    question: "What does an interventionist do first?",
    shortAnswer:
      "The first job is assessment, family alignment, treatment planning, and deciding whether intervention is the safest fit. A good interventionist does not rush straight into confrontation.",
    category: "Process",
    deeperAnswer: [
      "Before any intervention conversation happens, the interventionist needs to understand risk, substance use, treatment history, family dynamics, mental health concerns, logistics, and who needs to be involved.",
      "The early work often determines whether the intervention succeeds. Families need a unified message, a realistic treatment plan, and a clear understanding of what they will do if the person says yes or no.",
    ],
    signs: [
      "The family is split about what to do.",
      "Treatment options have not been evaluated yet.",
      "Everyone is reacting to crisis instead of following a plan.",
    ],
    nextStepLabel: "See how intervention works",
    nextStepHref: "/how-intervention-works",
    related: ["when-to-call-interventionist", "does-family-need-to-agree", "what-happens-before-intervention"],
    keywords: ["what does an interventionist do", "intervention process first step", "family intervention planning"],
  },
  {
    slug: "what-if-they-refuse-treatment",
    question: "What if my loved one refuses treatment during an intervention?",
    shortAnswer:
      "A refusal is not the end of the process. The family still needs to follow through, keep the treatment door open, and stop protecting the addiction from consequences.",
    category: "Treatment refusal",
    deeperAnswer: [
      "Families often fear that if the person refuses, the intervention has failed. In reality, a well-planned intervention changes the family system whether the answer is immediate or delayed.",
      "The most important moment after a refusal is what the family does next. If everyone collapses back into old rescue patterns, the addiction learns that nothing changed. If the family stays aligned, treatment can remain possible later.",
    ],
    signs: [
      "They say they will think about it but avoid a decision.",
      "They blame the family and try to divide people.",
      "They leave, threaten distance, or demand that everything go back to normal.",
    ],
    nextStepLabel: "Read the refusal plan",
    nextStepHref: "/what-if-they-refuse-treatment",
    related: ["does-intervention-still-work-if-they-are-angry", "can-you-do-intervention-without-rock-bottom", "what-boundaries-after-intervention"],
    keywords: ["what if they refuse treatment", "intervention refusal", "addiction treatment refusal family"],
  },
  {
    slug: "how-much-does-intervention-cost",
    question: "How much does an addiction intervention cost?",
    shortAnswer:
      "Intervention cost depends on urgency, travel, preparation, treatment planning, family complexity, and follow-up needs. The right first step is a confidential call before assuming a full intervention is required.",
    category: "Cost",
    deeperAnswer: [
      "A professional intervention is not only the meeting itself. The cost usually reflects assessment, planning, family preparation, treatment coordination, travel if needed, facilitation, and post-intervention support.",
      "Some families need readiness work or treatment planning before they need a full intervention. A first call helps determine the right level of support rather than overbuilding or underbuilding the plan.",
    ],
    nextStepLabel: "Understand intervention cost",
    nextStepHref: "/intervention-cost",
    related: ["what-does-interventionist-do-first", "how-fast-can-intervention-happen", "is-consultation-confidential"],
    keywords: ["intervention cost", "how much does addiction intervention cost", "professional intervention pricing"],
  },
  {
    slug: "can-you-do-intervention-without-rock-bottom",
    question: "Can you do an intervention before rock bottom?",
    shortAnswer:
      "Yes. Waiting for rock bottom can mean waiting for avoidable damage. Intervention is often most useful when the pattern is clear and the family is ready to stop cushioning it.",
    category: "Intervention readiness",
    deeperAnswer: [
      "Rock bottom is not a reliable clinical milestone. It usually means the family has reached the limit of what it can keep absorbing.",
      "If consequences are escalating, treatment is being avoided, and the family keeps reorganizing around the addiction, it is reasonable to get guidance before something worse happens.",
    ],
    signs: [
      "The family keeps saying it is not bad enough yet.",
      "Every new consequence becomes the new normal.",
      "People are afraid that action will make things worse, even though waiting already is.",
    ],
    nextStepLabel: "Check if it is time",
    nextStepHref: "/when-is-it-time-for-an-intervention",
    related: ["when-to-call-interventionist", "what-signs-mean-intervention-level", "does-family-need-to-agree"],
    keywords: ["intervention before rock bottom", "when is addiction bad enough", "family intervention timing"],
  },
  {
    slug: "does-family-need-to-agree",
    question: "Does the whole family need to agree before calling an interventionist?",
    shortAnswer:
      "No. The whole family does not need to agree before the first call. The first call can clarify who is ready, who matters most, and what alignment is realistically possible.",
    category: "Family alignment",
    deeperAnswer: [
      "Many families are divided at the beginning. Some people minimize the addiction, some are exhausted, some are angry, and some are afraid of making the wrong move.",
      "Part of intervention work is helping the family stop working at cross purposes. The first call can identify whether enough of the right people are ready to build a plan.",
    ],
    signs: [
      "One parent wants action and the other wants to wait.",
      "Siblings disagree about boundaries or money.",
      "The addicted person uses family division to avoid change.",
    ],
    nextStepLabel: "Start with readiness work",
    nextStepHref: "/family-readiness-intensive",
    related: ["what-does-interventionist-do-first", "what-boundaries-after-intervention", "when-to-call-interventionist"],
    keywords: ["family disagreement intervention", "does family need to agree for intervention", "family readiness intervention"],
  },
  {
    slug: "how-fast-can-intervention-happen",
    question: "How quickly can an addiction intervention happen?",
    shortAnswer:
      "Some crisis situations can move within 24 to 72 hours, but a safer standard plan often takes several days to a week or more depending on treatment placement, family readiness, and travel.",
    category: "Urgency",
    deeperAnswer: [
      "Speed matters when risk is high, but speed without planning can create a chaotic conversation that does not lead anywhere real.",
      "The timeline depends on immediate danger, availability of treatment, who needs to be involved, and whether the family can stay aligned under pressure.",
    ],
    signs: [
      "There is an urgent treatment window.",
      "The person is at high risk of overdose, withdrawal, or disappearance.",
      "The family needs help deciding whether this is emergency, crisis coaching, or planned intervention.",
    ],
    nextStepLabel: "Get crisis guidance",
    nextStepHref: "/crisis-support",
    related: ["when-to-call-interventionist", "what-happens-before-intervention", "is-consultation-confidential"],
    keywords: ["how fast can intervention happen", "urgent addiction intervention", "crisis intervention addiction"],
  },
  {
    slug: "what-happens-before-intervention",
    question: "What happens before an addiction intervention?",
    shortAnswer:
      "Before an intervention, the family shares history, identifies risks, chooses participants, prepares statements, sets boundaries, and lines up a treatment plan so the conversation has somewhere to go.",
    category: "Process",
    deeperAnswer: [
      "The preparation is often more important than the meeting. Families need to know what they are asking for, what treatment option is available, and what they will do if the answer is yes or no.",
      "This is where the family stops improvising. Everyone gets clear on the message, the order of the conversation, logistics, and follow-through.",
    ],
    nextStepLabel: "Review the intervention process",
    nextStepHref: "/how-intervention-works",
    related: ["what-does-interventionist-do-first", "what-boundaries-after-intervention", "how-fast-can-intervention-happen"],
    keywords: ["what happens before intervention", "intervention preparation", "family intervention planning"],
  },
  {
    slug: "what-boundaries-after-intervention",
    question: "What boundaries should families hold after an intervention?",
    shortAnswer:
      "Families should hold boundaries around money, housing, legal rescue, secrecy, active use in the home, and treatment follow-through. The exact boundary depends on the case, but it must be real.",
    category: "Boundaries",
    deeperAnswer: [
      "Intervention without follow-through teaches the addiction that the family can still be pressured into old roles. Boundaries are not punishments. They are the family refusing to keep funding, hiding, or stabilizing the addiction.",
      "The healthiest boundaries keep love available while ending rescue. The person should know what support remains available for recovery and what support is no longer available for active addiction.",
    ],
    nextStepLabel: "Plan aftercare and follow-through",
    nextStepHref: "/aftercare-guidance",
    related: ["what-if-they-refuse-treatment", "does-family-need-to-agree", "can-you-do-intervention-without-rock-bottom"],
    keywords: ["boundaries after intervention", "family boundaries addiction", "after intervention follow through"],
  },
  {
    slug: "is-consultation-confidential",
    question: "Is the first intervention consultation confidential?",
    shortAnswer:
      "Yes. A first consultation is confidential and focused on understanding the situation, safety, treatment history, family dynamics, and whether professional intervention is the right next step.",
    category: "First call",
    deeperAnswer: [
      "Families often worry that calling makes the situation official or commits them to action. It does not. The call is a private place to tell the truth about what has been happening and get a direct read on next steps.",
      "If intervention is not the right fit, Matt can say that. The goal is clarity, not pressure.",
    ],
    nextStepLabel: "Before you call",
    nextStepHref: "/before-you-call",
    related: ["when-to-call-interventionist", "how-much-does-intervention-cost", "does-family-need-to-agree"],
    keywords: ["confidential intervention consultation", "first call interventionist", "private addiction intervention consultation"],
  },
  {
    slug: "does-intervention-still-work-if-they-are-angry",
    question: "Can intervention still work if my loved one gets angry?",
    shortAnswer:
      "Yes. Anger is common and does not mean the intervention failed. The question is whether the family stays calm, clear, and aligned instead of reacting back into the old pattern.",
    category: "Resistance",
    deeperAnswer: [
      "Addiction often uses anger, blame, shame, and pressure to pull the family away from the plan. A professional interventionist helps the room stay grounded when emotion rises.",
      "The goal is not to win an argument. The goal is to hold a clear, loving, unified request and a real treatment option while refusing to keep participating in the addiction.",
    ],
    nextStepLabel: "Prepare for resistance",
    nextStepHref: "/how-intervention-works",
    related: ["what-if-they-refuse-treatment", "what-boundaries-after-intervention", "what-does-interventionist-do-first"],
    keywords: ["angry during intervention", "intervention resistance", "what if loved one gets angry intervention"],
  },
  {
    slug: "what-signs-mean-intervention-level",
    question: "What signs mean addiction has become intervention-level?",
    shortAnswer:
      "Intervention-level signs include escalating risk, repeated refusal, overdose or withdrawal danger, family division, severe consequences, and a pattern where ordinary conversations no longer change behavior.",
    category: "Intervention readiness",
    deeperAnswer: [
      "Intervention-level does not mean hopeless. It means the family needs more structure than another emotional conversation.",
      "When addiction keeps moving the line, families often normalize each new consequence. Naming the signs helps the family stop waiting for clarity that may never arrive on its own.",
    ],
    signs: [
      "Ordinary talks have stopped working.",
      "Safety, work, legal, health, money, or parenting consequences are escalating.",
      "Treatment is refused or repeatedly postponed.",
      "The family is exhausted, divided, or afraid to act.",
    ],
    nextStepLabel: "Use the readiness page",
    nextStepHref: "/intervention-readiness",
    related: ["when-to-call-interventionist", "can-you-do-intervention-without-rock-bottom", "how-fast-can-intervention-happen"],
    keywords: ["intervention level addiction signs", "signs intervention is needed", "family addiction crisis signs"],
  },
];

export const interventionAnswerPath = (answer: InterventionAnswer) => `/intervention-answers/${answer.slug}`;

export const getInterventionAnswer = (slug: string | undefined) =>
  interventionAnswers.find((answer) => answer.slug === slug);

export const getRelatedInterventionAnswers = (answer: InterventionAnswer) =>
  answer.related
    .map((slug) => interventionAnswers.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is InterventionAnswer => Boolean(candidate));
