import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import newMexicoBanner from "@/assets/new-mexico-crisis-banner.jpg";

const NewMexico = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Banner Image */}
      <section className="pt-20">
        <div className="w-full h-[300px] md:h-[400px] overflow-hidden">
          <img 
            src={newMexicoBanner} 
            alt="New Mexico desert landscape with mountains at sunset symbolizing hope and the path to recovery" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              New Mexico Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              New Mexico's Addiction Crisis: How Professional Interventionists Offer Families a Lifeline
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              New Mexico has consistently ranked among the highest states for drug overdose deaths per capita. With over 900 overdose deaths in 2023 and fentanyl devastating communities from Albuquerque to the rural pueblos, families across the Land of Enchantment desperately need help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:503-836-2136">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (503) 836-2136
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">900+</div>
              <div className="text-sm text-muted-foreground">Overdose Deaths in 2023</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">Top 5</div>
              <div className="text-sm text-muted-foreground">Highest Overdose Rate in U.S.</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">80%</div>
              <div className="text-sm text-muted-foreground">Fentanyl-Involved Deaths</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Intervention Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Scope of New Mexico's Addiction Challenges */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  The Scope of New Mexico's Addiction Challenges
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                New Mexico has long struggled with substance abuse, ranking first or second nationally for drug overdose deaths per capita for over a decade. The combination of poverty, limited healthcare access, generational trauma, and proximity to drug trafficking routes has created a perfect storm. Fentanyl has made an already dire situation catastrophic, with deaths tripling since 2019.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Rural communities face severe treatment shortages—many New Mexicans must travel hours to reach detox or residential programs. Native American communities have been devastated, with overdose rates far exceeding state averages. Urban areas like Albuquerque see open drug markets and encampments, while smaller cities like Las Cruces, Santa Fe, and Farmington struggle with methamphetamine and heroin.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                New Mexico's alcohol abuse rates also remain among the nation's highest, with alcohol-related deaths exceeding drug overdoses in many years. Many families face polysubstance addiction, complicating treatment needs and requiring specialized intervention approaches.
              </p>
            </div>

            {/* Why Families Need Intervention Support Now */}
            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Why New Mexico Families Need Intervention Support Now
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Addiction has torn through New Mexico families for generations, creating cycles of trauma that perpetuate substance abuse. Parents lose children to overdoses. Grandparents raise grandchildren while their own adult children disappear into addiction. Working families lose wage earners, deepening poverty that fuels more substance abuse.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The state's tight-knit communities and cultural emphasis on family can make seeking outside help feel like betrayal. Many families attempt interventions on their own, only to face denial, manipulation, or violence. Professional interventionists succeed where DIY attempts fail by bringing expertise, neutrality, and pre-arranged treatment options that remove barriers to immediate help.
              </p>
            </div>

            {/* How Interventionists Tailor Solutions */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  How Interventionists Tailor Solutions for New Mexico Families
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Interventionists begin with confidential family consultations, assessing addiction severity and understanding New Mexico's unique treatment landscape. We navigate the challenges of limited local resources, connecting families with appropriate programs in-state or arranging transport to facilities in Arizona, Colorado, Texas, or beyond.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Cultural sensitivity is essential in New Mexico. We respect the diverse backgrounds of families—Hispanic, Native American, Anglo, and others—adapting our approach to honor cultural values while addressing addiction directly. For families in tribal communities, we understand sovereign health systems and coordinate accordingly.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We address the specific challenges New Mexico families face: fentanyl-heroin combinations, methamphetamine psychosis, severe alcoholism, and the co-occurring mental health conditions common in underserved populations. Our aftercare planning ensures connections to local resources, 12-step communities, and ongoing support.
              </p>
            </div>

            {/* Proven Benefits and Real Impact */}
            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Proven Benefits and Real Impact
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Professional interventions achieve 80-90% success rates in getting loved ones into treatment—compared to less than 30% for unguided family attempts. In New Mexico, where treatment access is limited and fentanyl makes every day dangerous, this difference is life or death.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We've helped New Mexico families navigate everything from young adult heroin addiction in Albuquerque to alcohol dependency in rural ranching communities. Families report restored hope, ended enabling patterns, and the beginning of real healing after years of chaos and fear.
              </p>
            </div>

            {/* Barriers and Why Act Now */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Barriers and Why Act Now
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                New Mexico faces significant barriers to treatment: geographic isolation, underfunded healthcare systems, insurance gaps, and deep-rooted stigma. But waiting for the "right time" is deadly when fentanyl is involved. Professional interventionists know how to overcome these barriers, securing treatment beds, arranging transportation, and guiding families through the process.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                State and federal funding for treatment has increased, but demand far outpaces availability. Interventionists help families access the best available resources, whether local programs, out-of-state facilities, or specialized treatment for co-occurring disorders.
              </p>
            </div>

            {/* Why Seek Help */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Why Seek Professional Intervention in New Mexico
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Expert Assessment</h3>
                    <p className="text-muted-foreground">Comprehensive evaluation using proven clinical criteria to understand your loved one's specific needs.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Culturally Sensitive Approach</h3>
                    <p className="text-muted-foreground">Customized strategies respecting New Mexico's diverse cultural backgrounds and family values.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Treatment Coordination</h3>
                    <p className="text-muted-foreground">Connections to detox centers, inpatient rehabs, and outpatient programs in-state and throughout the Southwest.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Family Healing</h3>
                    <p className="text-muted-foreground">Support for the whole family to end enabling patterns, establish boundaries, and begin recovery together.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Aftercare Planning</h3>
                    <p className="text-muted-foreground">Collaboration with treatment teams for ongoing therapy, 12-step participation, and long-term recovery support.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            A Path Forward for New Mexico Families
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            New Mexico's addiction crisis takes hundreds of lives each year—but recovery is possible. Professional interventionists empower families, transforming despair into decisive treatment entry with 90% efficacy. Don't wait for the next overdose or arrest.
          </p>
          <p className="text-xl font-semibold mb-8">
            Hope starts with one structured step—yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/#booking">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:503-836-2136">
                <Phone className="mr-2 h-5 w-5" />
                Call (503) 836-2136
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewMexico;