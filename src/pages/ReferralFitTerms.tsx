import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { Link } from "react-router-dom";

const ReferralFitTerms = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="ReferralFit Terms of Use (EULA)"
        description="End user license agreement for the ReferralFit app: who may use it, what it is for, data ownership, acceptable use, and limits of liability."
        canonical="https://freedominterventions.com/referralfit/terms"
        noindex={false}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com/" },
          { name: "ReferralFit Terms of Use", url: "https://freedominterventions.com/referralfit/terms" },
        ]}
      />
      <Navbar />

      <main className="pt-24 md:pt-32">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-4">
              ReferralFit App
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-8">
              ReferralFit Terms of Use
            </h1>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
              <p className="text-lg text-foreground">
                <strong>Effective Date:</strong> September 19, 2026<br />
                <strong>Last Updated:</strong> September 19, 2026
              </p>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">1. Agreement</h2>
                <p>
                  These Terms of Use are an end user license agreement between you and Freedom Interventions ("we", "us")
                  for the ReferralFit mobile application (the "App"). By signing in to the App you agree to these Terms and
                  to the <Link to="/referralfit/privacy" className="text-primary underline">ReferralFit Privacy Policy</Link>.
                  If you are using the App on behalf of a practice, you confirm that you are authorized to bind that practice.
                </p>
                <p>
                  These Terms are in addition to Apple's Licensed Application End User License Agreement. Where they conflict,
                  these Terms govern your relationship with us; Apple's terms govern your relationship with Apple.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">2. What the App is, and is not</h2>
                <p>
                  ReferralFit is a record-keeping tool for intervention practices, treatment-placement specialists, and family
                  coaches. It helps a practice track referral partners, family cases, referrals, and follow-ups.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>It does not provide medical, clinical, or legal advice, and it does not assess, diagnose, or recommend a level of care for any person. Matching and directory features are organizational aids; every placement decision is the professional's own.</li>
                  <li>It is not a crisis service. If someone is in immediate danger, call 911. For a suicidal or mental-health crisis in the United States, call or text 988.</li>
                  <li>Directory listings and benchmark figures are provided for convenience. Program details, insurance participation, and availability change often; verify them directly before relying on them.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">3. Accounts</h2>
                <p>
                  Accounts are created by us for a practice's staff. There is no fee to create an account or to use the App.
                  You are responsible for keeping your credentials confidential and for all activity under your account.
                  Tell us promptly if you believe an account has been compromised.
                </p>
                <p>
                  You must be at least 18 years old and using the App in a professional capacity.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">4. Your data</h2>
                <p>
                  Everything your practice enters into its workspace — partners, cases, notes, documents — belongs to your
                  practice. We do not claim ownership of it. You grant us only the limited license needed to store it, sync it
                  between your devices and team members, and display it to you.
                </p>
                <p>
                  Your practice is responsible for the information it records about other people. Enter only what you are
                  permitted to collect and keep under the professional, licensing, and privacy obligations that apply to you,
                  and obtain any consents those obligations require. If your practice is a HIPAA covered entity or business
                  associate, do not use the App for protected health information unless a business associate agreement with
                  us is in place.
                </p>
                <p>
                  If your practice suggests a partner to the shared directory, you confirm that the details you submit are
                  accurate to your knowledge and that you have the right to share them.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">5. Acceptable use</h2>
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>use the App for anything unlawful, or to store information you have no right to hold;</li>
                  <li>attempt to access another practice's workspace or any data not intended for you;</li>
                  <li>probe, scan, reverse-engineer, or interfere with the App or the services behind it;</li>
                  <li>submit false or misleading listings to the shared directory;</li>
                  <li>use the App to market to, or solicit, families whose information was entered by another practice.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">6. Third-party links</h2>
                <p>
                  The App can hold links to your practice's own records in Square or PandaDoc. Those services are governed by
                  their own terms. We do not process payments, and the App never asks for payment details.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">7. License and updates</h2>
                <p>
                  We grant you a personal, non-transferable, revocable license to use the App on Apple devices you own or
                  control, as permitted by Apple's usage rules. We may release updates that change or remove features. We
                  may suspend or end access to the App if you breach these Terms, or discontinue the App with reasonable notice
                  and an opportunity to export your data.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">8. Disclaimers and limitation of liability</h2>
                <p>
                  The App is provided "as is" and "as available". We do not warrant that it will be uninterrupted, error-free,
                  or fit for a particular purpose. Keep your own records of anything critical.
                </p>
                <p>
                  To the fullest extent permitted by law, Freedom Interventions is not liable for indirect, incidental,
                  consequential, or special damages, or for any loss of data, arising from your use of the App. Because the App
                  is provided free of charge, our total liability for any claim relating to it is limited to one hundred US
                  dollars ($100).
                </p>
                <p>
                  Apple is not responsible for the App, its content, or any claim relating to it, and has no obligation to
                  provide maintenance or support for it. Apple and its subsidiaries are third-party beneficiaries of these
                  Terms and may enforce them against you.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">9. General</h2>
                <p>
                  These Terms are governed by the laws of the State of Oregon, without regard to conflict-of-law rules. If any
                  part of these Terms is found unenforceable, the rest remains in effect. We may update these Terms; material
                  changes will be announced in the App or by email, and continued use after the change means you accept it.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">10. Contact</h2>
                <p>
                  Freedom Interventions<br />
                  Bend, Oregon<br />
                  <a href="mailto:matt@freedominterventions.com" className="text-primary underline">matt@freedominterventions.com</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReferralFitTerms;
