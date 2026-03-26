import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import oregonBanner from "@/assets/oregon-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const MauiHawaii = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Hawaii", href: "/hawaii" },
    { name: "Maui", href: "/maui-hawaii" },
  ];

  const otherIslands = [
    { name: "Oahu", href: "/oahu-hawaii" },
    { name: "Big Island", href: "/big-island-hawaii" },
    { name: "Kauai", href: "/kauai-hawaii" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services on Maui, Hawaii | Freedom Interventions"
        description="Professional addiction intervention services on Maui, Hawaii. Alcohol, meth, and post-wildfire trauma-driven addiction. Matt Brown serves all of Maui County. Free consultation. Call (541) 838-6009."
        keywords="Maui addiction intervention, Maui drug intervention, Hawaii intervention specialist Maui, Lahaina addiction, Maui interventionist, alcohol addiction Maui, Maui County substance abuse"
        canonical="https://freedominterventions.com/maui-hawaii"
      />
      <LocalBusinessSchema location="Maui" state="Hawaii" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={oregonBanner}
          alt="Maui Hawaii addiction intervention services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              <MapPin className="h-4 w-4" />
              Maui, Hawaii — Maui County
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Addiction Intervention on Maui: When Paradise Becomes a Prison
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Maui's tourism economy normalizes alcohol consumption and masks addiction behind an affluent vacation culture. The 2023 Lahaina wildfire added a new layer of trauma, grief, and substance use to communities already struggling. Matt Brown provides professional intervention services across all of Maui County — including Lahaina, Kahului, Kihei, and Hana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:541-838-6009">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (541) 838-6009
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  The Hidden Side of Maui's Addiction Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Maui sees approximately 165,000 residents living alongside millions of annual visitors. The island's economy is built on hospitality — and hospitality means alcohol is everywhere, always, and always justified. For families watching a loved one deteriorate, the social normalization of drinking makes it harder to name what they're seeing.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">~165K</div>
                <p className="text-muted-foreground">Maui County residents — tourism economy shapes addiction culture</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">2023</div>
                <p className="text-muted-foreground">Lahaina wildfire — trauma, grief, and PTSD driving substance use surge</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Alcohol</div>
                <p className="text-muted-foreground">Most normalized substance on Maui — heavily tied to tourism and hospitality culture</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lahaina Wildfire Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Lahaina's Wildfire Trauma and the Substance Use Surge
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The August 2023 Lahaina wildfire — the deadliest U.S. wildfire in over a century — devastated a community that was already navigating addiction challenges. More than 100 people died. Thousands lost their homes, their livelihoods, and in many cases their entire sense of place and community.
                  </p>
                  <p>
                    Trauma and substance use are deeply connected. Research consistently shows that rates of alcohol use, prescription drug misuse, and illicit drug use rise significantly in the months and years following community-level disasters. Lahaina's survivors are carrying grief, PTSD, financial stress, and displacement — all potent risk factors.
                  </p>
                  <p>
                    Families on Maui whose loved ones were struggling before the fire may now be dealing with a situation that has dramatically worsened. And families whose loved ones seemed fine before August 2023 may now be watching addiction emerge as a response to unbearable loss.
                  </p>
                  <p>
                    Matt Brown provides compassionate, trauma-informed intervention services. Getting help isn't a betrayal of someone's grief — it's the most loving thing a family can do.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tourism and Alcohol Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  When Vacation Culture Becomes a Mask
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Maui's wealthy tourism economy creates a unique addiction dynamic. Alcohol is tied to celebration, relaxation, and social identity in a way that makes it nearly impossible for families to separate normal from disordered. Someone drinking heavily every day can point to the culture around them and say "everyone drinks like this here."
                  </p>
                  <p>
                    High-income families on Maui often face the additional barrier of being able to financially sustain an addiction for years — privately funding the problem while publicly maintaining appearances. By the time the family seeks help, years of enabling may have created deeply entrenched patterns.
                  </p>
                  <p>
                    Matt Brown helps Maui families see through these rationalizations — not with judgment, but with clarity. He helps them understand how enabling works, where the family system has accommodated addiction, and what it actually takes to shift the dynamic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  How Freedom Interventions Helps Maui Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown travels to Maui and works with your family through the entire intervention process — preparation, execution, and follow-up. With 20+ years of experience and 22 years of personal recovery, he brings both professional expertise and lived understanding.
                  </p>
                  <p>
                    <strong className="text-foreground">Trauma-Informed Approach:</strong> Especially relevant for Lahaina-area families, Matt integrates trauma awareness into every aspect of the intervention process — understanding that grief and loss can fuel addiction in ways that require a different conversation.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Navigation:</strong> Maui's treatment options are more limited than Oahu's. Matt helps families evaluate Aloha House and other local resources, and when appropriate, connects families with high-quality mainland programs that can address co-occurring trauma and addiction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Maui Addiction Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background p-5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-1">Aloha House</h3>
                <p className="text-sm text-muted-foreground mb-2">Maui County's primary nonprofit residential and outpatient substance abuse treatment provider</p>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> alohahouse.us
                </span>
              </div>
              <div className="bg-background p-5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-1">Maui Memorial Medical Center</h3>
                <p className="text-sm text-muted-foreground mb-2">Hospital-based behavioral health services including crisis stabilization and detox</p>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> mauihealth.org
                </span>
              </div>
              <div className="bg-background p-5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-1">Mental Health Kokua</h3>
                <p className="text-sm text-muted-foreground mb-2">Community mental health services including co-occurring substance use disorder treatment on Maui</p>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> mentalhealthkokua.org
                </span>
              </div>
              <div className="bg-background p-5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-1">Maui County Alcohol & Drug Abuse Division</h3>
                <p className="text-sm text-muted-foreground mb-2">County-administered substance abuse prevention and treatment coordination</p>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> mauicounty.gov
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 italic">
              Resource listings are for informational purposes only. Freedom Interventions does not receive referral fees from any provider.
            </p>
          </div>
        </div>
      </section>

      {/* Other Islands */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-4">Serving All Hawaiian Islands</h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/hawaii" className="px-4 py-2 bg-card border border-border rounded-lg text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                ← Hawaii (State Overview)
              </Link>
              {otherIslands.map((island) => (
                <Link key={island.name} to={island.href} className="px-4 py-2 bg-card border border-border rounded-lg text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  {island.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Maui Families: Help Is Available
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Whether your loved one's addiction predates the wildfire or emerged in the aftermath, professional intervention is the most direct path to getting them help. Call now for a free, confidential consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/#booking">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:541-838-6009">
                <Phone className="mr-2 h-5 w-5" />
                Call (541) 838-6009
              </a>
            </Button>
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

export default MauiHawaii;
