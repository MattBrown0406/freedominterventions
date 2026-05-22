import { Link } from "react-router-dom";
import { ArrowRight, Calendar, CheckCircle2, ClipboardCheck, FileSignature, Phone, ShieldCheck, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { BreadcrumbSchema, OrganizationSchema, WebPageSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "After the Consultation", href: "/after-consultation" },
];

const nextStepPaths = [
  {
    icon: Calendar,
    title: "Free consultation only",
    body: "If the situation needs clarity but not paid help yet, Matt will tell you what to watch, what not to do, and when to reach back out.",
    cta: "Book the free consult",
    href: "/?type=consultation#booking",
  },
  {
    icon: ClipboardCheck,
    title: "Family Readiness Intensive",
    body: "If the family needs a structured plan before deciding on a full intervention, the intensive gives you 90 minutes with Matt plus 7 days of direct follow-up support.",
    cta: "Review the intensive",
    href: "/family-readiness-intensive",
  },
  {
    icon: FileSignature,
    title: "Full intervention engagement",
    body: "If refusal, risk, and family division are already intervention-level, Matt can move the family into treatment coordination, preparation, facilitation, and follow-through.",
    cta: "See intervention services",
    href: "/family-intervention",
  },
];

const fullEngagement = [
  "Family alignment and decision-maker preparation",
  "Treatment recommendations matched to the person, crisis level, and family resources",
  "Boundary and bottom-line planning before the intervention",
  "Intervention facilitation with Matt leading the process",
  "Treatment admission, transport, and handoff coordination when needed",
  "Family follow-through after the intervention so old patterns do not quietly return",
];

const AfterConsultation = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="What Happens After the Free Consultation | Freedom Interventions"
        description="Understand what happens after a free consultation with Matt Brown: coaching, Family Readiness Intensive, or full professional intervention planning."
        canonical="https://freedominterventions.com/after-consultation"
        keywords="after intervention consultation, hire interventionist next steps, family readiness intensive, professional intervention planning"
      />
      <OrganizationSchema />
      <WebPageSchema
        name="What Happens After the Free Consultation"
        description="A clear explanation of the next steps after a family consultation with Freedom Interventions."
        url="https://freedominterventions.com/after-consultation"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com/" },
          { name: "After the Consultation", url: "https://freedominterventions.com/after-consultation" },
        ]}
      />
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      <main className="pt-20 md:pt-24">
        <section className="border-b border-border bg-card py-16 md:py-24">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <ShieldCheck className="h-4 w-4" />
                Clear next steps before a paid decision
              </div>
              <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-6xl">
                What Happens After the Free Consultation?
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                The first call is not a sales script. It is a triage conversation. Matt listens for safety risk, treatment refusal, family division, logistics, and whether the family has enough leverage to move.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <TrackedPhoneLink phoneNumber="+15416688084" metadata={{ location: "after_consultation_hero" }}>
                  <Button size="xl" variant="hero">
                    <Phone className="h-5 w-5" />
                    Call Now
                  </Button>
                </TrackedPhoneLink>
                <Button asChild size="xl" variant="hero-outline">
                  <Link to="/?type=consultation#booking">
                    <Calendar className="h-5 w-5" />
                    Book Free Consultation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                The call usually leads to one of three paths
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                The goal is to match the level of help to the level of risk. Some families need guidance. Some need structure. Some need a professional intervention process.
              </p>
            </div>
            <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
              {nextStepPaths.map((path) => {
                const Icon = path.icon;
                return (
                  <Link key={path.title} to={path.href} className="rounded-lg border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-3 font-serif text-2xl font-bold text-foreground">{path.title}</h3>
                    <p className="mb-6 leading-relaxed text-muted-foreground">{path.body}</p>
                    <span className="inline-flex items-center gap-2 font-semibold text-primary">
                      {path.cta}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Users className="h-4 w-4" />
                Full intervention engagement
              </div>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                If it is intervention-level, the family needs more than advice.
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                A full intervention engagement is for families where the risk is high, the loved one is refusing help, and the family needs Matt to help coordinate treatment, prepare decision makers, lead the room, and support follow-through.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                The consultation helps determine whether that level of service is appropriate. If it is not, Matt will say so. If it is, the family should know what they are stepping into before the next crisis.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="mb-5 text-xl font-bold text-foreground">What the full process can include</h3>
              <div className="grid gap-3">
                {fullEngagement.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-md border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-muted-foreground">
                Most full intervention engagements are discussed after the consultation because travel, urgency, treatment logistics, and family complexity all matter.
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              You do not need to know which path is right before you call.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              That is what the consultation is for. Bring the facts, the fears, and the parts of the story that do not make sense yet.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <TrackedPhoneLink phoneNumber="+15416688084" metadata={{ location: "after_consultation_final" }}>
                <Button size="xl" variant="hero">
                  <Phone className="h-5 w-5" />
                  Call Matt
                </Button>
              </TrackedPhoneLink>
              <Button asChild size="xl" variant="hero-outline">
                <Link to="/intervention-readiness">
                  <ClipboardCheck className="h-5 w-5" />
                  Check Readiness
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AfterConsultation;
