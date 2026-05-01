import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema, OrganizationSchema, ServiceSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowRight, BadgeDollarSign, CheckCircle2, Clock3, FileSignature, Lock, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  formatUsdFromCents,
  INTERVENTION_CONTRACT_TEXT,
  INTERVENTION_CONTRACT_VERSION,
  normalizeDiscountCode,
  resolveDiscountCents,
  STANDARD_INTERVENTION_FEE_CENTS,
} from "@/lib/contracts";
import { generateContractPdf } from "@/utils/generateContractPdf";

const MAX_NOTES_LENGTH = 1200;

const contractSchema = z.object({
  clientName: z.string().trim().min(2, "Client name is required").max(100, "Keep the name under 100 characters"),
  clientEmail: z.string().trim().email("Enter a valid email address"),
  clientPhone: z.string().trim().min(7, "Phone is required").max(25, "Keep the phone number under 25 characters"),
  lovedOneName: z.string().trim().min(2, "Loved one name is required").max(100, "Keep the name under 100 characters"),
  lovedOneDateOfBirth: z.string().trim().optional(),
  relationship: z.string().trim().min(2, "Relationship is required").max(80, "Keep this under 80 characters"),
  referralSource: z.string().trim().max(120, "Keep this under 120 characters").optional(),
  discountCode: z.string().trim().max(40, "Keep the discount code under 40 characters").optional(),
  signerName: z.string().trim().min(2, "Type your full legal name to sign").max(100, "Keep the signer name under 100 characters"),
  notes: z.string().trim().max(MAX_NOTES_LENGTH, `Keep notes under ${MAX_NOTES_LENGTH} characters`).optional(),
  accepted: z.boolean().refine((value) => value === true, { message: "You must accept the agreement before continuing." }),
});

type ContractFormData = z.infer<typeof contractSchema>;

const buildAgreementText = (data: ContractFormData, finalAmountCents: number, discountCents: number, normalizedDiscountCode: string) => {
  const header = [
    INTERVENTION_CONTRACT_TEXT,
    "",
    "--- CLIENT-SPECIFIC TERMS ---",
    `Client Name: ${data.clientName}`,
    `Client Email: ${data.clientEmail}`,
    `Client Phone: ${data.clientPhone}`,
    `Loved One Name: ${data.lovedOneName}`,
    `Relationship to Loved One: ${data.relationship}`,
    `Loved One Date of Birth: ${data.lovedOneDateOfBirth?.trim() || "Not provided"}`,
    `Referral Source: ${data.referralSource?.trim() || "Not provided"}`,
    `Base Intervention Fee: ${formatUsdFromCents(STANDARD_INTERVENTION_FEE_CENTS)}`,
    `Discount Code: ${normalizedDiscountCode || "None"}`,
    `Discount Applied: ${formatUsdFromCents(discountCents)}`,
    `Final Intervention Fee Due: ${formatUsdFromCents(finalAmountCents)}`,
    `Signed By: ${data.signerName}`,
    `Case Notes: ${data.notes?.trim() || "None"}`,
  ];

  return header.join("\n");
};

const StartContract = () => {
  const { toast } = useToast();
  const [isLaunching, setIsLaunching] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState<{
    clientName: string;
    lovedOneName: string;
    finalAmountCents: number;
    discountCode: string;
  } | null>(null);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const form = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      lovedOneName: "",
      relationship: "",
      lovedOneDateOfBirth: "",
      referralSource: "",
      discountCode: "",
      signerName: "",
      notes: "",
      accepted: false,
    },
  });

  const watchedDiscountCode = form.watch("discountCode") || "";
  const normalizedDiscountCode = normalizeDiscountCode(watchedDiscountCode);
  const discountCents = useMemo(() => resolveDiscountCents(watchedDiscountCode), [watchedDiscountCode]);
  const finalAmountCents = useMemo(
    () => Math.max(STANDARD_INTERVENTION_FEE_CENTS - discountCents, 0),
    [discountCents]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const contractStatus = params.get("contract_status");
    const returnedContractId = params.get("contract_id");

    if (contractStatus === "success") {
      if (returnedContractId) {
        supabase.functions.invoke("contracts", {
          body: {
            action: "mark-paid",
            contractId: returnedContractId,
          },
        }).then(({ error }) => {
          if (error) throw error;
          setPaymentComplete(true);
          window.history.replaceState({}, "", window.location.pathname);
        }).catch((error) => {
          console.error("Failed to verify contract payment:", error);
          toast({
            title: "Payment verification pending",
            description: "Square did not confirm the payment yet. If you completed checkout, please contact Freedom Interventions.",
            variant: "destructive",
          });
        });
      }
    }
  }, [toast]);

  const onSubmit = async (data: ContractFormData) => {
    setIsLaunching(true);
    const agreementText = buildAgreementText(data, finalAmountCents, discountCents, normalizedDiscountCode);
    const agreementSignedAt = new Date().toISOString();

    try {
      const pdfBlob = generateContractPdf({
        contractTitle: "Freedom Interventions Services Agreement",
        contractVersion: INTERVENTION_CONTRACT_VERSION,
        clientName: data.clientName.trim(),
        clientEmail: data.clientEmail.trim().toLowerCase(),
        clientPhone: data.clientPhone.trim(),
        signerName: data.signerName.trim(),
        signedAt: agreementSignedAt,
        bookingTypeLabel: "Intervention Contract",
        amountLabel: formatUsdFromCents(finalAmountCents),
        discountCode: normalizedDiscountCode || undefined,
        discountLabel: discountCents > 0 ? formatUsdFromCents(discountCents) : undefined,
        metadata: {
          "Loved One": data.lovedOneName.trim(),
          "Loved One DOB": data.lovedOneDateOfBirth?.trim() || "Not provided",
          "Relationship": data.relationship.trim(),
          "Referral Source": data.referralSource?.trim() || "Not provided",
          "Notes": data.notes?.trim() || "None",
        },
        agreementText,
      });

      const pdfBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1] || "");
        };
        reader.onerror = () => reject(new Error("Failed to encode contract PDF."));
        reader.readAsDataURL(pdfBlob);
      });

      const contractId = crypto.randomUUID();
      const pdfPath = `intervention/${contractId}.pdf`;
      const bookingDate = new Date().toISOString().slice(0, 10);
      const contractResponse = await supabase.functions.invoke("contracts", {
        body: {
          action: "create-contract",
          contractType: "intervention",
          clientEmail: data.clientEmail.trim().toLowerCase(),
          clientName: data.clientName.trim(),
          clientPhone: data.clientPhone.trim(),
          signerName: data.signerName.trim(),
          signedAt: agreementSignedAt,
          agreementText,
          agreementVersion: INTERVENTION_CONTRACT_VERSION,
          amountCents: finalAmountCents,
          discountCode: normalizedDiscountCode || null,
          discountCents,
          contractPdfPath: pdfPath,
          contractPdfBase64: pdfBase64,
          metadata: {
            lovedOneName: data.lovedOneName.trim(),
            lovedOneDateOfBirth: data.lovedOneDateOfBirth?.trim() || null,
            relationship: data.relationship.trim(),
            referralSource: data.referralSource?.trim() || null,
            notes: data.notes?.trim() || null,
            baseFeeCents: STANDARD_INTERVENTION_FEE_CENTS,
            createdDate: bookingDate,
            localContractId: contractId,
          },
        },
      });
      if (contractResponse.error) throw contractResponse.error;

      const savedContractId = contractResponse.data?.contract?.id;
      if (!savedContractId) throw new Error("Contract record was created without an ID.");

      const checkoutResponse = await supabase.functions.invoke("contracts", {
        body: {
          action: "create-payment-link",
          customerEmail: data.clientEmail.trim().toLowerCase(),
          customerName: data.clientName.trim(),
          contractId: savedContractId,
          redirectPath: `/start-contract?contract_status=success&contract_id=${savedContractId}`,
          note: `Intervention Agreement for ${data.clientName.trim()}`,
        },
      });

      if (checkoutResponse.error) throw checkoutResponse.error;
      if (!checkoutResponse.data?.checkoutUrl) throw new Error("Hosted payment link was not returned.");

      setSubmittedSummary({
        clientName: data.clientName.trim(),
        lovedOneName: data.lovedOneName.trim(),
        finalAmountCents,
        discountCode: normalizedDiscountCode,
      });

      window.location.href = checkoutResponse.data.checkoutUrl;
    } catch (error) {
      console.error("Contract checkout error:", error);
      toast({
        title: "Couldn’t start checkout",
        description: error instanceof Error ? error.message : "Please try again. If this keeps happening, copy the browser console error and the exact step where it failed.",
        variant: "destructive",
      });
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Start Your Agreement | Freedom Interventions"
        description="Review and sign the Freedom Interventions agreement online, apply an approved discount code, and complete payment securely through Square checkout."
        canonical="https://freedominterventions.com/start-contract"
        keywords="Freedom Interventions contract, intervention agreement, electronic signature, Square checkout"
      />
      <OrganizationSchema />
      <ServiceSchema
        name="Freedom Interventions Standard Agreement"
        description="A private agreement and payment flow for Freedom Interventions clients to sign online and complete payment through Square checkout."
        url="https://freedominterventions.com/start-contract"
        serviceType="Intervention agreement"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com/" },
          { name: "Start Contract", url: "https://freedominterventions.com/start-contract" },
        ]}
      />
      <Navbar />

      <main>
        <section className="relative bg-card pb-20 pt-32">
          <div className="container px-6">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <FileSignature className="h-4 w-4" aria-hidden="true" />
                  Private client agreement portal
                </div>
                <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                  Sign the Intervention Agreement and Pay Online
                </h1>
                <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
                  Families can review the full intervention agreement here, sign electronically, and complete payment through secure Square-hosted checkout.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <BadgeDollarSign className="mb-3 h-5 w-5 text-primary" />
                    <p className="font-semibold text-foreground">Standard fee</p>
                    <p className="text-sm text-muted-foreground">{formatUsdFromCents(STANDARD_INTERVENTION_FEE_CENTS)}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <ShieldCheck className="mb-3 h-5 w-5 text-primary" />
                    <p className="font-semibold text-foreground">Signed before checkout</p>
                    <p className="text-sm text-muted-foreground">The signed agreement text is stored with the booking record</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <Clock3 className="mb-3 h-5 w-5 text-primary" />
                    <p className="font-semibold text-foreground">One clean flow</p>
                    <p className="text-sm text-muted-foreground">Review, sign, and pay without leaving the process</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-background p-8 shadow-sm">
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">What this page does</p>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />Collects the core client and case details before payment</li>
                  <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />Lets the signer review the full agreement before continuing</li>
                  <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />Generates and stores a signed PDF contract for admin review</li>
                </ul>
                <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm text-muted-foreground">
                  Square processes payment on its secure hosted checkout page. Freedom Interventions does not collect card details directly on this page.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-6">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="mb-3 font-serif text-3xl font-semibold text-foreground">Start the contract process</h2>
                  <p className="text-muted-foreground">
                    Fill in the family details, review the agreement in full, sign electronically, and continue to Square checkout.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField control={form.control} name="clientName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client full name</FormLabel>
                          <FormControl><Input placeholder="Full legal name" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="clientEmail" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client email</FormLabel>
                          <FormControl><Input type="email" placeholder="client@email.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField control={form.control} name="clientPhone" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client phone</FormLabel>
                          <FormControl><Input type="tel" placeholder="(555) 555-5555" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="relationship" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relationship to loved one</FormLabel>
                          <FormControl><Input placeholder="Mother, spouse, brother, etc." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                      <FormField control={form.control} name="lovedOneName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loved one’s name</FormLabel>
                          <FormControl><Input placeholder="Person needing help" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="lovedOneDateOfBirth" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loved one’s date of birth (optional)</FormLabel>
                          <FormControl><Input type="date" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="referralSource" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Referral source (optional)</FormLabel>
                          <FormControl><Input placeholder="Therapist, former client, Google, etc." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField control={form.control} name="discountCode" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Private code (if provided)</FormLabel>
                          <FormControl><Input placeholder="Enter code" {...field} /></FormControl>
                          <p className="text-xs text-muted-foreground">Leave blank unless you were given a code directly.</p>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                        <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-primary">Amount due</p>
                        <p className="text-3xl font-bold text-foreground">{formatUsdFromCents(finalAmountCents)}</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Standard fee {formatUsdFromCents(STANDARD_INTERVENTION_FEE_CENTS)}
                          {discountCents > 0 ? ` adjusted to ${formatUsdFromCents(finalAmountCents)}.` : "."}
                        </p>
                      </div>
                    </div>

                    <FormField control={form.control} name="notes" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Case notes for the contract (optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Anything the contract or intake flow should know before payment"
                            className="min-h-[140px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <div className="text-right text-xs text-muted-foreground">{(field.value?.length ?? 0)}/{MAX_NOTES_LENGTH}</div>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <div className="rounded-2xl border border-border bg-background p-5 text-sm text-muted-foreground">
                      <p className="font-medium text-foreground">Review the agreement</p>
                      <p className="mt-2">Please read the full agreement below before signing and continuing to payment.</p>
                    </div>

                    <div className="rounded-2xl border border-border bg-background p-5">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-foreground">Intervention Services Agreement</p>
                          <p className="text-sm text-muted-foreground">Version {INTERVENTION_CONTRACT_VERSION}</p>
                        </div>
                      </div>
                      <Textarea value={buildAgreementText(form.getValues(), finalAmountCents, discountCents, normalizedDiscountCode)} readOnly className="min-h-[420px] resize-none text-sm leading-6 bg-muted/40" />
                    </div>

                    <div className="rounded-2xl border border-border bg-background p-5 text-sm text-muted-foreground">
                      <p className="font-medium text-foreground">Electronic signature</p>
                      <p className="mt-2">Type your full legal name exactly as you want it recorded on the agreement.</p>
                    </div>

                    <FormField control={form.control} name="signerName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Signer full legal name</FormLabel>
                        <FormControl><Input placeholder="Type full legal name to sign" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="accepted" render={({ field }) => (
                      <FormItem>
                        <div className="flex items-start gap-3 rounded-2xl border border-border p-5">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} />
                          </FormControl>
                          <div>
                            <FormLabel className="font-medium text-foreground">
                              I have reviewed this agreement, understand the fee is non-refundable after signing, and agree to continue to Square checkout.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </div>
                      </FormItem>
                    )} />

                    <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isLaunching}>
                      {isLaunching ? "Opening Square checkout..." : "Continue to secure signature + payment"}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                  </form>
                </Form>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-border bg-card p-8">
                  <h2 className="mb-5 font-serif text-2xl font-semibold text-foreground">Agreement summary</h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Standard intervention fee: {formatUsdFromCents(STANDARD_INTERVENTION_FEE_CENTS)}</li>
                    <li>• The full agreement is reviewed before signature and payment</li>
                    <li>• Agreement becomes part of the stored contract record after signing</li>
                    <li>• Payment is completed on secure Square-hosted checkout</li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-border bg-card p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2"><Lock className="h-5 w-5 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Square hosted checkout</h3>
                      <p className="text-sm text-muted-foreground">Card details are entered on Square’s secure payment page.</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    After you sign and continue, you’ll be redirected to Square to complete the payment. Once payment is complete, Freedom Interventions can review the signed agreement in the admin dashboard.
                  </p>
                </div>

                {paymentComplete ? (
                  <div className="rounded-3xl border border-emerald-300 bg-emerald-50 p-8">
                    <p className="mb-2 text-lg font-semibold text-emerald-900">Payment received</p>
                    <p className="text-sm text-emerald-800">
                      The agreement was signed and the payment flow completed successfully. The contract record is now stored in the admin dashboard.
                    </p>
                  </div>
                ) : null}

                {submittedSummary ? (
                  <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">Last handoff preview</p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><span className="font-semibold text-foreground">Client:</span> {submittedSummary.clientName}</p>
                      <p><span className="font-semibold text-foreground">Loved one:</span> {submittedSummary.lovedOneName}</p>
                      <p><span className="font-semibold text-foreground">Discount code:</span> {submittedSummary.discountCode || "None"}</p>
                      <p><span className="font-semibold text-foreground">Final amount:</span> {formatUsdFromCents(submittedSummary.finalAmountCents)}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StartContract;
