export const STANDARD_INTERVENTION_FEE_CENTS = 950000;
export const STANDARD_INTERVENTION_FEE_DOLLARS = STANDARD_INTERVENTION_FEE_CENTS / 100;

export const INTERVENTION_DISCOUNT_CODES: Record<string, number> = {
  SAVE500: 50000,
  SAVE1000: 100000,
  SAVE1500: 150000,
  SAVE2000: 200000,
  SAVE2500: 250000,
};

export const INTERVENTION_CONTRACT_VERSION = "2026.04.25";

export const INTERVENTION_CONTRACT_TEXT = `INTERVENTION SERVICES AGREEMENT

Version: ${INTERVENTION_CONTRACT_VERSION}

Parties
This Intervention Services Agreement (the "Agreement") is entered into between Freedom Interventions ("Interventionist") and the financially responsible party who signs this Agreement ("Client"). The person for whom intervention-related services are being sought is referred to as the "Participant." The Participant is not a signatory unless separately identified as Client.

Purpose
Client is engaging Interventionist to provide professional intervention-related consulting and support services for the Participant. Client understands that intervention services are intended to improve the family's readiness, communication, planning, and treatment coordination, but do not guarantee any specific outcome, including treatment admission, sobriety, relapse prevention, or treatment completion.

Services
Unless otherwise agreed in writing, services may include:
1. Pre-intervention consultation, planning, rehearsal, and family preparation;
2. Recommendations regarding treatment options and logistical next steps;
3. Coordination related to intervention execution;
4. Conducting the intervention itself, if appropriate;
5. Transport coordination or accompaniment if separately agreed;
6. Limited post-intervention follow-up and family guidance.

No Medical or Legal Services
Interventionist is not providing medical care, psychiatric treatment, psychotherapy, legal advice, emergency response services, or a guarantee of treatment placement. Client agrees to seek emergency services by calling 911 or the appropriate crisis/emergency provider if an urgent medical, psychiatric, or safety emergency exists.

Client Responsibilities
Client agrees to:
1. Provide accurate information to the best of Client's knowledge;
2. Act in good faith and cooperate with planning instructions;
3. Avoid undermining, sabotaging, or prematurely disclosing the intervention plan when instructed not to do so;
4. Understand that Participant retains free will and may refuse treatment or recommendations;
5. Remain financially responsible for all fees and approved expenses under this Agreement.

Fees and Payment
1. The standard intervention fee is $9,500.00.
2. If a valid discount code is applied and accepted by Interventionist's system, the discount amount reduces the fee shown in this Agreement and at checkout.
3. The intervention fee is earned in exchange for reserving availability, planning, consultation, preparation, and intervention-related professional services, and is non-refundable once this Agreement is signed.
4. Full payment is due before substantive planning begins unless Interventionist agrees otherwise in writing.
5. Additional in-person days or services outside the included scope may be billed separately at rates disclosed in writing.

Travel and Additional Expenses
Unless expressly included in writing, travel, lodging, airfare, rental car, mileage, parking, tolls, and similar out-of-pocket expenses are separate from the intervention fee. Client is responsible for approved travel-related expenses actually incurred. Interventionist may require advance payment for estimated travel costs.

Cancellation and Non-Refundability
Because Interventionist commits professional time, scheduling capacity, and preparation resources immediately upon execution, the intervention fee is non-refundable after signing. If Client cancels, materially delays, withholds needed cooperation, compromises the intervention plan, or otherwise prevents performance, all amounts paid remain non-refundable.

Termination
Interventionist may suspend or terminate services if, in Interventionist's reasonable judgment:
1. Safety concerns arise;
2. Client materially breaches this Agreement;
3. Client or family materially fails to follow necessary planning instructions;
4. Material information was withheld or misrepresented;
5. Continued services become unsafe, unethical, or impracticable.
Except in the case of Interventionist's gross negligence or willful misconduct, Client agrees that such termination will not create liability for Interventionist and will not make the fee refundable.

No Guarantees / Risk Acknowledgment
Client understands that intervention services involve uncertainty, emotional difficulty, and risks associated with Participant behavior, family dynamics, treatment refusal, relapse, discharge, or non-compliance. Interventionist makes no representation or warranty that the Participant will accept help, enter treatment, stay in treatment, or maintain recovery.

Privacy and Communications
Interventionist will handle information in a professionally responsible manner and will use reasonable efforts to respect applicable privacy obligations. Client understands that treatment providers and others may require signed releases before sharing protected information. Interventionist cannot guarantee disclosure from third parties without appropriate consent.

Release / Limitation / Indemnity
To the fullest extent permitted by law, Client releases and agrees to hold harmless Interventionist and Interventionist's agents from claims, losses, or damages arising from Participant conduct, family conduct, third-party acts, treatment-provider decisions, or the inherent uncertainties of intervention services, except to the extent caused by Interventionist's gross negligence or willful misconduct. Client further agrees to indemnify Interventionist against third-party claims arising from Client's or Participant's conduct related to the services, except to the extent caused by Interventionist's gross negligence or willful misconduct.

Dispute Resolution / Governing Law
This Agreement is governed by Oregon law, without regard to conflict-of-law principles. Any dispute arising out of or relating to this Agreement shall be resolved by binding arbitration before a single arbitrator under applicable AAA rules in Deschutes County, Oregon, unless the parties agree otherwise in writing. If the arbitration provision is found unenforceable, exclusive venue shall lie in the state or federal courts located in Oregon. The prevailing party is entitled to recover reasonable attorneys' fees and costs to the extent permitted by law.

General Terms
1. This Agreement is the entire agreement between the parties regarding the subject matter hereof.
2. Any amendment must be in writing.
3. If any provision is held unenforceable, the remaining provisions remain in effect.
4. Electronic signatures and records are binding.

Acknowledgment
By signing, Client confirms that Client has read this Agreement, understands it, had the opportunity to ask questions, and voluntarily agrees to its terms.`;

export function normalizeDiscountCode(code: string) {
  return code.trim().toUpperCase();
}

export function resolveDiscountCents(code: string) {
  const normalized = normalizeDiscountCode(code);
  return INTERVENTION_DISCOUNT_CODES[normalized] ?? 0;
}

export function formatUsdFromCents(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
