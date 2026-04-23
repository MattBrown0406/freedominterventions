import { useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema, OrganizationSchema, ServiceSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, BadgeDollarSign, CheckCircle2, Clock3, FileSignature, ShieldCheck } from "lucide-react";

const BASE_CONTRACT_AMOUNT = 9500;
const DISCOUNT_OPTIONS = [0, 500, 1000, 1500, 2000, 2500] as const;
const MAX_NOTES_LENGTH = 1200;

const contractSchema = z.object({
  clientName: z.string().trim().min(2, "Client name is required").max(100, "Keep the name under 100 characters"),
  clientEmail: z.string().trim().email("Enter a valid email address"),
  clientPhone: z.string().trim().min(7, "Phone is required").max(25, "Keep the phone number under 25 characters"),
  lovedOneName: z.string().trim().min(2, "Loved one name is required").max(100, "Keep the name under 100 characters"),
  relationship: z.string().trim().min(2, "Relationship is required").max(80, "Keep this under 80 characters"),
  discountAmount: z.string().refine((value) => DISCOUNT_OPTIONS.includes(Number(value) as (typeof DISCOUNT_OPTIONS)[number]), {
    message: "Choose a valid discount",
  }),
  referralSource: z.string().trim().max(120, "Keep this under 120 characters").optional(),
  notes: z.string().trim().max(MAX_NOTES_LENGTH, `Keep notes under ${MAX_NOTES_LENGTH} characters`).optional(),
});

type ContractFormData = z.infer<typeof contractSchema>;

const pandaDocUrl = import.meta.env.VITE_PANDADOC_CONTRACT_URL || "https://app.pandadoc.com/s/mock-freedom-interventions-contract";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const StartContract = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContractFormData | null>(null);

  const form = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      lovedOneName: "",
      relationship: "",
      discountAmount: "0",
      referralSource: "",
      notes: "",
    },
  });

  const selectedDiscount = Number(form.watch("discountAmount") || "0");
  const finalAmount = useMemo(() => Math.max(BASE_CONTRACT_AMOUNT - selectedDiscount, 0), [selectedDiscount]);

  const onSubmit = async (data: ContractFormData) => {
    setIsLaunching(true);
    setSubmittedData(data);

    const payload = {
      ...data,
      baseAmount: BASE_CONTRACT_AMOUNT,
      discountAmount: Number(data.discountAmount),
      finalAmount,
      serviceName: "Freedom Interventions Standard Intervention Agreement",
    };

    try {
      const url = new URL(pandaDocUrl);
      url.searchParams.set("client_name", payload.clientName);
      url.searchParams.set("client_email", payload.clientEmail);
      url.searchParams.set("client_phone", payload.clientPhone);
      url.searchParams.set("loved_one_name", payload.lovedOneName);
      url.searchParams.set("relationship", payload.relationship);
      url.searchParams.set("base_amount", String(payload.baseAmount));
      url.searchParams.set("discount_amount", String(payload.discountAmount));
      url.searchParams.set("final_amount", String(payload.finalAmount));
      if (payload.referralSource) {
        url.searchParams.set("referral_source", payload.referralSource);
      }
      if (payload.notes) {
        url.searchParams.set("notes", payload.notes);
      }

      window.open(url.toString(), "_blank", "noopener,noreferrer");
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Start Your Agreement | Freedom Interventions"
        description="A private Freedom Interventions contract page where families can review the service, provide details, and continue into PandaDoc to complete, sign, and pay online."
        canonical="https://freedominterventions.com/start-contract"
        keywords="Freedom Interventions contract, intervention agreement, PandaDoc contract, sign and pay online"
      />
      <OrganizationSchema />
      <ServiceSchema
        name="Freedom Interventions Standard Agreement"
        description="A private intake and contract handoff page for Freedom Interventions clients to complete, sign, and pay online."
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
        <section className="relative pt-32 pb-20 bg-card">
          <div className="container px-6">
            <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
                  <FileSignature className="h-4 w-4" aria-hidden="true" />
                  Private client agreement portal
                </div>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                  Complete Your Freedom Interventions Agreement Online
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                  This page is designed to make the contract process simple. Your client can confirm the basic details here, then continue directly into PandaDoc to complete the full agreement, sign, and pay in one secure flow.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <BadgeDollarSign className="h-5 w-5 text-primary mb-3" />
                    <p className="font-semibold text-foreground">Standard fee</p>
                    <p className="text-sm text-muted-foreground">Base contract set at {currency.format(BASE_CONTRACT_AMOUNT)}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <ShieldCheck className="h-5 w-5 text-primary mb-3" />
                    <p className="font-semibold text-foreground">Discretionary discount</p>
                    <p className="text-sm text-muted-foreground">Apply a discount before handing off to contract and payment</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <Clock3 className="h-5 w-5 text-primary mb-3" />
                    <p className="font-semibold text-foreground">One-step finish</p>
                    <p className="text-sm text-muted-foreground">Client reviews, signs, and pays without leaving the process</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-background p-8 shadow-sm">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary mb-3">What this page does</p>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />Collects the core client details you need before the contract opens</li>
                  <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />Shows the standard {currency.format(BASE_CONTRACT_AMOUNT)} fee and any approved discount clearly</li>
                  <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />Hands the client into PandaDoc for the actual agreement, e-signature, and payment step</li>
                </ul>
                <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm text-muted-foreground">
                  This is a polished mock integration. Once we wire your live PandaDoc template ID, API key, and payment settings, this page can move from demo handoff to a fully live contract flow.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-6">
            <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="font-serif text-3xl font-semibold text-foreground mb-3">Start the contract process</h2>
                  <p className="text-muted-foreground">
                    Fill in the client information below. When you continue, the page opens the PandaDoc signing flow in a new tab with the pricing context and intake details attached.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="clientName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client full name</FormLabel>
                            <FormControl>
                              <Input placeholder="Full legal name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="clientEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="client@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="clientPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client phone</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="(555) 555-5555" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="relationship"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relationship to loved one</FormLabel>
                            <FormControl>
                              <Input placeholder="Mother, spouse, brother, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="lovedOneName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Loved one’s name</FormLabel>
                            <FormControl>
                              <Input placeholder="Person needing help" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="discountAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Approved discount</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select discount" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {DISCOUNT_OPTIONS.map((amount) => (
                                  <SelectItem key={amount} value={String(amount)}>
                                    {amount === 0 ? "No discount" : `${currency.format(amount)} discount`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="referralSource"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Referral source (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Therapist, former client, Google, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary mb-2">Amount due</p>
                        <p className="text-3xl font-bold text-foreground">{currency.format(finalAmount)}</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Base fee {currency.format(BASE_CONTRACT_AMOUNT)}
                          {selectedDiscount > 0 ? ` minus ${currency.format(selectedDiscount)} discretionary discount.` : "."}
                        </p>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Case notes for the contract (optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Anything the contract or intake flow should know before the client signs and pays"
                              className="min-h-[140px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <div className="text-right text-xs text-muted-foreground">
                            {(field.value?.length ?? 0)}/{MAX_NOTES_LENGTH}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="rounded-2xl border border-border bg-background p-5 text-sm text-muted-foreground">
                      By continuing, you are sending this client into the Freedom Interventions agreement flow. In the live version, PandaDoc will present the contract, collect the signature, and process payment in the same sequence.
                    </div>

                    <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isLaunching}>
                      {isLaunching ? "Opening PandaDoc..." : "Continue to contract, signature, and payment"}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                  </form>
                </Form>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-border bg-card p-8">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-5">How the live flow should work</h2>
                  <ol className="space-y-4 text-muted-foreground">
                    <li><span className="font-semibold text-foreground">1.</span> Matt or the family lands on this private page.</li>
                    <li><span className="font-semibold text-foreground">2.</span> The client confirms names, contact details, relationship, and any approved discount.</li>
                    <li><span className="font-semibold text-foreground">3.</span> PandaDoc opens the intervention agreement with variables prefilled from this intake.</li>
                    <li><span className="font-semibold text-foreground">4.</span> The client signs and pays without breaking the experience.</li>
                    <li><span className="font-semibold text-foreground">5.</span> Freedom Interventions receives completion confirmation and can trigger next-step onboarding.</li>
                  </ol>
                </div>

                <div className="rounded-3xl border border-border bg-card p-8">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-5">Recommended PandaDoc fields</h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Client legal name</li>
                    <li>• Client email and phone</li>
                    <li>• Loved one’s name</li>
                    <li>• Relationship to loved one</li>
                    <li>• Base fee</li>
                    <li>• Discount amount</li>
                    <li>• Final total due</li>
                    <li>• Payment block for card or ACH</li>
                    <li>• Signature and date</li>
                  </ul>
                </div>

                {submittedData ? (
                  <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary mb-3">Last handoff preview</p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><span className="font-semibold text-foreground">Client:</span> {submittedData.clientName}</p>
                      <p><span className="font-semibold text-foreground">Loved one:</span> {submittedData.lovedOneName}</p>
                      <p><span className="font-semibold text-foreground">Discount:</span> {currency.format(Number(submittedData.discountAmount))}</p>
                      <p><span className="font-semibold text-foreground">Final amount:</span> {currency.format(finalAmount)}</p>
                    </div>
                  </div>
                ) : null}

                <div className="rounded-3xl border border-border bg-background p-8 text-sm text-muted-foreground">
                  Need to talk first? <Link to="/contact" className="font-semibold text-primary hover:underline">Contact Matt directly</Link> before sending the agreement.
                </div>
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
