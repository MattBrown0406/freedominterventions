import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import aftercareBanner from "@/assets/aftercare-guidance-banner.jpg";

const AftercareGuidance = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={aftercareBanner}
          alt="Peaceful path through a park symbolizing the journey of long-term recovery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>

      <main className="container mx-auto px-6 py-12 md:py-20">
        <article className="max-w-4xl mx-auto">
          <header className="mb-12">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Our Services
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground">
              The Critical Role of Aftercare in Preventing Relapse After Addiction Treatment
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Following aftercare recommendations upon discharge from treatment dramatically lowers relapse rates, with studies showing 40-60% of individuals relapsing without structured follow-up, compared to under 15% after five years of consistent adherence including AA meetings and social support. Interventionists collaborate with treatment teams to customize these plans, ensuring AA attendance, therapeutic services, and social connections drive long-term recovery.
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">
                High Relapse Risks Without Aftercare
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Relapse rates soar without aftercare: up to 85% within 30 days post-inpatient discharge and 40-75% within 3-6 months if plans are ignored. Individuals remitting without help face 60% relapse over 16 years, versus 43% for those in treatment or AA. Aftercare bridges this gap by reinforcing skills learned in treatment, countering triggers like stress or isolation that fuel 73% relapse in unsupported rehabs.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Skipping recommendations leaves vulnerability to the "abstinence violation effect," where one slip spirals into full return without therapeutic intervention or peer accountability.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">
                Essential AA Meeting Attendance
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Regular AA meeting attendance halves relapse risk, with frequent participants twice as likely to achieve one-year sobriety and showing 22% lower relapse when paired with treatment. Dose-response data confirms more meetings yield higher abstinence: weekly or greater attendance post-treatment correlates with significant reductions in use. AA provides spiritual structure, step work, and sponsorship vital for early recovery when isolation threatens 40-60% of discharges.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Interventionists embed AA schedules into discharge plans, verifying local meetings and sponsoring commitments to sustain momentum beyond treatment walls.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">
                Therapeutic Services for Ongoing Healing
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Therapeutic services like outpatient counseling, IOP, and family therapy are non-negotiable, boosting treatment retention and self-efficacy while addressing co-occurring issues driving 45-56% relapse in first-year outpatients. Continued therapy teaches coping, reduces stress, and improves outcomes, with supported individuals reporting more abstinent days and quality of life.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Professionals recommend weekly sessions initially, tapering as stability grows, ensuring emotional tools endure life's pressures that undo 50% of untreated remitters.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">
                The Social Component of Long-Term Recovery
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Social support is recovery's backbone: strong networks cut relapse by enhancing accountability, reducing distress, and expanding sober circles, with high AA involvement building quality friendships that predict sustained sobriety. Peer groups like AA or recovery homes foster belonging, where shared experiences lower use severity and boost well-being—unsupported recoverees face higher psychological strain.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Family involvement via Al-Anon strengthens communication, while community ties via sober living prevent isolation-fueled slips affecting 73% without post-discharge networks. Social bonds, more than willpower alone, drive 75% long-term AA attendance linked to abstinence.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">
                Interventionist's Collaboration with Treatment Teams
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Experienced interventionists partner with discharge planners to tailor aftercare, reviewing progress notes to match needs like AA frequency or therapy intensity. They secure sober living placements, transportation to meetings, and family contracts enforcing attendance, monitoring compliance for 6-12 months to adjust for risks.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This teamwork ensures seamless transitions, with interventionists mediating between teams and families to uphold recommendations, slashing readmission by aligning social, therapeutic, and 12-step elements.
              </p>
            </section>

            <section className="mb-12 bg-card p-6 md:p-8 rounded-xl border border-border/50">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-6">
                Practical Steps to Follow Aftercare
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">Attend 90 AA meetings in 90 days minimum, tracking via apps or sponsors for accountability.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">Schedule weekly therapy or IOP immediately post-discharge, prioritizing dual-diagnosis if needed.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">Build social networks through sober living, AA home groups, and family support meetings.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">Review plan monthly with interventionist and treatment team, documenting milestones and triggers.</span>
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <p className="text-lg text-foreground font-medium leading-relaxed">
                Adhering to aftercare—AA meetings, therapy, and social support—transforms 40-60% relapse odds into lasting freedom, with interventionist oversight ensuring every detail supports the individual's path. Families united in this commitment rewrite outcomes from statistics to success stories.
              </p>
            </section>
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 md:p-12 bg-primary/5 rounded-2xl border border-primary/20 text-center">
            <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">
              Ready to Plan for Lasting Recovery?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our experienced team works directly with treatment providers to create comprehensive aftercare plans that support long-term sobriety for your loved one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/#contact">
                  <Calendar className="w-5 h-5" />
                  Schedule a Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <a href="tel:+15038362136">
                  <Phone className="w-5 h-5" />
                  Call (503) 836-2136
                </a>
              </Button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default AftercareGuidance;
