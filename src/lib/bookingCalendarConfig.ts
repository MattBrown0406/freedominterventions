export type BookingType = 'consultation' | 'crisis-coaching' | 'readiness-intensive' | 'aftercare-planning';
export type PaidReturnType = BookingType | 'fri-contract';

export interface OfferConfig {
  label: string;
  durationMinutes: number;
  priceCents: number; // 0 for free
  priceLabel: string;
  shortName: string; // used in summaries
  description: string;
}

export const OFFERS: Record<BookingType, OfferConfig> = {
  'consultation': {
    label: 'Free Consultation',
    durationMinutes: 15,
    priceCents: 0,
    priceLabel: 'Free',
    description: "A 15-minute Zoom call. Not every family needs an intervention—we'll assess your situation and explore the right next step.",
    shortName: 'Free Consultation (15 min)',
  },
  'crisis-coaching': {
    label: 'Crisis Coaching Session',
    durationMinutes: 60,
    priceCents: 15000,
    priceLabel: '$150',
    description: "A 60-minute Zoom session with you and any concerned loved ones. Walk away with an actionable plan to change your family's circumstances.",
    shortName: 'Crisis Coaching Session (60 min)',
  },
  'aftercare-planning': {
    label: 'Aftercare Planning Call',
    durationMinutes: 30,
    priceCents: 0,
    priceLabel: 'Free',
    description: "A free 30-minute call for families whose loved one is entering or leaving treatment. We map the aftercare structure your family needs and discuss ongoing support options.",
    shortName: 'Aftercare Planning Call (30 min)',
  },
  'readiness-intensive': {
    label: 'Family Readiness Intensive',
    durationMinutes: 90,
    priceCents: 250000,
    priceLabel: '$2,500',
    description: "A 90-minute Zoom intensive plus 7 days of follow-up support by Zoom, phone, text, or email. The complete family readiness package.",
    shortName: 'Family Readiness Intensive (90 min)',
  },
};

export const FRI_AGREEMENT_VERSION = "fri-v1";
export const FRI_AGREEMENT_TEXT = `FAMILY READINESS INTENSIVE AGREEMENT

Freedom Interventions
Matt Brown
FreedomInterventions.com
(458) 298-8000

This Family Readiness Intensive Agreement ("Agreement") is entered into by and between Freedom Interventions ("Consultant") and the undersigned client ("Client").

1. Services
Client is engaging Consultant for a Family Readiness Intensive focused on evaluating the family system, current crisis dynamics, intervention readiness, communication strategy, boundary guidance, and immediate next-step recommendations relating to a loved one struggling with substance use or related behavioral health concerns.

The Family Readiness Intensive includes:
• one 90-minute consultation session, typically by Zoom unless otherwise arranged
• review of the family situation and relevant background shared by Client
• strategic guidance and recommendations
• up to 7 days of reasonable follow-up support by phone, Zoom, text, or email, at Consultant’s discretion and subject to scheduling availability

2. Fee
The fee for the Family Readiness Intensive is $2,500.00.

Client understands and agrees that this fee is earned in exchange for Consultant reserving time, providing specialized professional guidance, and making availability and follow-up support available to Client.

3. Payment Terms
Payment is due in full at the time of signing unless otherwise stated in writing by Consultant.

No services are guaranteed to begin until this Agreement is signed and payment has been successfully processed.

4. No Guarantee of Outcome
Client understands that Consultant does not and cannot guarantee any specific outcome, including but not limited to:
• that a loved one will accept help
• that a loved one will enter treatment
• that a family intervention will occur
• that any particular relationship, treatment, or recovery result will follow

Consultant agrees only to provide professional guidance, experience-based recommendations, and agreed support services.

5. Nonrefundable Fee
Client acknowledges that the Family Readiness Intensive requires Consultant to reserve time, prepare for the matter, provide specialized advisory services, and make follow-up availability available.

Accordingly, all fees paid under this Agreement are nonrefundable once the Agreement is signed and payment is processed, including in circumstances where:
• Client later decides not to proceed
• Client does not attend or fully participate
• Client believes the family is not ready
• the loved one refuses help or treatment
• the family elects not to move forward with any further services

Client agrees not to initiate a chargeback, payment dispute, or reversal based on dissatisfaction with outcome alone where Consultant has made the agreed professional time, guidance, and support available.

6. Scheduling and Rescheduling
Consultant will make reasonable efforts to schedule the session promptly. If Client needs to reschedule, Client agrees to provide as much notice as possible. Consultant will make reasonable efforts to accommodate a rescheduled session, but availability is not guaranteed on Client’s preferred timeline.

7. Client Responsibility
Client agrees to provide accurate information to the best of their knowledge and to participate honestly and in good faith. Client understands that the quality of strategic guidance may depend in part on the completeness and accuracy of the information provided.

8. Not Medical or Legal Advice
Consultant does not provide medical care, psychiatric treatment, legal advice, or emergency services. If there is an immediate safety risk, medical emergency, overdose concern, or psychiatric crisis, Client should contact 911 or appropriate emergency services immediately.

9. Confidentiality
Consultant will use reasonable discretion regarding information shared by Client, subject to legal, ethical, safety, and practical limitations. Electronic communications and virtual meetings carry inherent privacy and security risks that cannot be entirely eliminated.

10. Entire Agreement
This Agreement reflects the entire understanding between the parties regarding the Family Readiness Intensive and supersedes prior discussions relating to this specific service, unless modified in writing.

11. Acceptance
By signing below, Client acknowledges that Client has read this Agreement, understands it, and agrees to its terms, including the nonrefundable nature of the fee.`;
