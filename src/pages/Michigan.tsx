import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import WhatsAppChatButton from "@/components/WhatsAppChatButton";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { BreadcrumbSchema, LocalBusinessSchema, OrganizationSchema } from "@/components/StructuredData";

const Michigan = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Michigan", href: "/michigan" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Professional Interventionist in Michigan | Family Addiction Help"
        description="Need a professional interventionist in Michigan? Matt Brown helps families prepare drug and alcohol interventions and treatment entry. Call (458) 298-8000."
        canonical="https://freedominterventions.com/michigan"
        keywords="professional intervention Michigan, professional interventionist Michigan, Michigan addiction intervention, Michigan drug intervention, Michigan alcohol intervention, family intervention Michigan"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Michigan" state="MI" />
      <BreadcrumbSchema
        items={breadcrumbItems.map((item) => ({
          name: item.name,
          url: `https://freedominterventions.com${item.href}`,
        }))}
      />
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      <section className="pt-28 md:pt-32 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Michigan Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Professional Interventionist in Michigan for Families Facing Addiction
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              If your family keeps arguing, rescuing, or waiting while drug or alcohol use gets worse, the next step is a confidential call with Matt Brown. He helps Michigan families get aligned, prepare the intervention, and have treatment ready before approaching their loved one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/book-intervention-consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Confidential Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:+14582988000">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (458) 298-8000
                </a>
              </Button>
              <WhatsAppChatButton variant="solid" size="lg" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  What Should a Michigan Family Do Next?
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Do not stage a surprise confrontation. First, identify the relatives who must be aligned, document the pattern of harm, decide which boundaries the family can consistently hold, and make sure an appropriate treatment option is ready. If fentanyl, overdose risk, violence, or suicidal behavior is present, get professional safety guidance before gathering the family; call 911 for an immediate emergency.
              </p>
            </div>

            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Professional Intervention Services Across Michigan
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Freedom Interventions works with families from Detroit and Grand Rapids to Lansing, Ann Arbor, Flint, Traverse City, and the Upper Peninsula. The process includes family preparation, a structured intervention, treatment-entry planning, and clear next steps if help is refused.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Compassionate Family Support
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Addiction affects the whole family. Preparation helps relatives replace shame, threats, and inconsistent rescuing with a calm message, realistic boundaries, and a coordinated offer of treatment.
              </p>
            </div>

            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Begin Recovery Today
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                You do not need your loved one's agreement before the family starts preparing. A confidential consultation can clarify the risk, who should participate, what must be arranged before the intervention, and whether professional intervention is appropriate.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Talk With a Professional Interventionist About Your Michigan Family
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Call Matt Brown or book a confidential consultation to discuss the situation and leave with a clear next step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/book-intervention-consultation#booking">
                <Calendar className="mr-2 h-5 w-5" />
                Book Confidential Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:+14582988000">
                <Phone className="mr-2 h-5 w-5" />
                Call (458) 298-8000
              </a>
            </Button>
            <WhatsAppChatButton variant="dark" size="lg" />
          </div>
        </div>
      </section>

      {/* Family Intervention Link */}
      <section className="py-8 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground">Need help planning a family intervention?</p>
              <p className="text-sm text-muted-foreground">Learn how our family intervention services work — and what to expect.</p>
            </div>
            <Link to="/family-intervention" className="shrink-0">
              <Button variant="outline" className="gap-2 whitespace-nowrap">
                <Users className="h-4 w-4" />
                Family Intervention Services
              </Button>
            </Link>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Michigan;