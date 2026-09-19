import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { Link } from "react-router-dom";

const ReferralFitPrivacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="ReferralFit Privacy Policy"
        description="How the ReferralFit app for intervention practices collects, stores, and protects workspace data, and what is never shared between practices."
        canonical="https://freedominterventions.com/referralfit/privacy"
        noindex={false}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com/" },
          { name: "ReferralFit Privacy Policy", url: "https://freedominterventions.com/referralfit/privacy" },
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
              ReferralFit Privacy Policy
            </h1>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
              <p className="text-lg text-foreground">
                <strong>Effective Date:</strong> September 19, 2026<br />
                <strong>Last Updated:</strong> September 19, 2026
              </p>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Who this policy covers</h2>
                <p>
                  ReferralFit is a mobile application published by Freedom Interventions ("we", "us") for professional
                  addiction-intervention practices, treatment-placement specialists, and family coaches. It helps a practice
                  keep track of its referral partners, the families it is working with, and the next step for each.
                </p>
                <p>
                  This policy applies to the ReferralFit app and the account data behind it. It does not cover the
                  Freedom Interventions website or our intervention services, which are governed by our
                  main <Link to="/privacy-policy" className="text-primary underline">Privacy Policy</Link>.
                </p>
                <p>
                  ReferralFit is a tool for professionals. It is not a crisis service and is not offered to the public.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Information the app stores</h2>

                <h3 className="text-xl font-semibold text-foreground">Account information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The email address and password used to sign in. Passwords are stored only as a salted hash by our authentication provider; we never see them.</li>
                  <li>The name of the practice's workspace and which accounts belong to it.</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">Workspace data entered by the practice</h3>
                <p>
                  Everything below is entered by the practice's own staff and belongs to that practice. We store it so it
                  can be synced between the practice's devices and team members.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Referral partners: programs, facilities, and colleagues, with contact details, levels of care, insurance and network notes, and a log of contacts ("touches").</li>
                  <li>Cases: the families a practice is helping, including contact names and phone numbers, a timeline of calls and emails, notes, next steps, and documents or photos the practice chooses to attach.</li>
                  <li>Referrals sent and received, and saved matching profiles describing what a family needs.</li>
                  <li>Optional links to the practice's own invoices or agreements in Square or PandaDoc. ReferralFit stores only the link and a status; it does not process payments or store payment details.</li>
                </ul>
                <p>
                  Case records can contain sensitive information about real people. Practices are responsible for
                  entering only what they are permitted to record under their own professional and legal obligations.
                </p>

                <h3 className="text-xl font-semibold text-foreground">Device permissions</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Photos / camera roll:</strong> used only when you choose to attach a document to a case. The app does not scan or upload your library.</li>
                  <li><strong>Notifications:</strong> reminders for follow-ups and a daily briefing. They are generated on your device; declining them does not affect any feature.</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">What we do not collect</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>No advertising identifiers, no ad networks, no third-party analytics or tracking SDKs.</li>
                  <li>No location, contacts, microphone, or health data.</li>
                  <li>No data is sold, and nothing is used for advertising.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Each practice's workspace is private</h2>
                <p>
                  A practice's partners, cases, notes, and documents are visible only to accounts that practice has invited
                  into its workspace. Other practices using ReferralFit cannot see them, and the database enforces this
                  separation on every record. Freedom Interventions staff do not access a practice's workspace data.
                </p>
                <p>
                  Two things are shared by design, and only when a practice chooses to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Directory listings.</strong> A practice may suggest one of its partners for the shared program directory. Only the partner's public details (name, location, levels of care, contact information) are submitted; the practice's own notes and history stay private.</li>
                  <li><strong>Benchmarks.</strong> Aggregate, de-identified counts (for example, how many referrals were placed within a period) may be used to show a practice how its activity compares. Nothing in benchmarks identifies a practice, a family, or a partner.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Where data is stored and who processes it</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Supabase</strong> (hosted on Amazon Web Services in the United States) stores account and workspace data, including attached documents in a private storage bucket. Data is encrypted in transit and at rest.</li>
                  <li><strong>Expo Application Services</strong> delivers app updates. Update checks send the app version and an installation identifier; they do not include workspace data.</li>
                  <li><strong>Apple</strong> provides the App Store and TestFlight distribution under its own privacy terms.</li>
                </ul>
                <p>
                  Your sign-in session is kept in your device's secure storage (Keychain on iOS). A copy of your workspace is
                  cached on the device so the app works offline; signing out clears it.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">How long we keep data</h2>
                <p>
                  Workspace data is kept for as long as the practice's account is active. When a practice asks us to close
                  its account, we delete its workspace, including attached documents, within 30 days, except where we are
                  required by law to retain a record.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Your choices and rights</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You can view, edit, and delete any partner, case, referral, or document in your workspace at any time from within the app.</li>
                  <li>You can remove team members from your workspace, or ask us to close the workspace entirely.</li>
                  <li>You can turn notifications off in iOS Settings without losing any feature.</li>
                  <li>You may request a copy of your workspace data, or its deletion, by contacting us at the address below. We respond within 30 days.</li>
                </ul>
                <p>
                  Individuals whose information a practice has entered into ReferralFit (for example, a family member listed as a
                  case contact) should direct requests to that practice, which controls the record. We will assist the practice
                  in honoring the request.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Children</h2>
                <p>
                  ReferralFit is for licensed and professional adult users. We do not knowingly create accounts for anyone
                  under 18.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Security</h2>
                <p>
                  We use email-and-password authentication, row-level security on every workspace table, private document
                  storage with short-lived signed links, and encrypted connections. No system is perfectly secure; if we
                  learn of a breach affecting your workspace, we will notify the practice's account holder without undue delay.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Changes to this policy</h2>
                <p>
                  If we change how ReferralFit handles data, we will update this page and the "Last Updated" date, and notify
                  account holders by email for material changes.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Contact</h2>
                <p>
                  Freedom Interventions<br />
                  Bend, Oregon<br />
                  <a href="mailto:matt@freedominterventions.com" className="text-primary underline">matt@freedominterventions.com</a>
                </p>
                <p>
                  See also the <Link to="/referralfit/terms" className="text-primary underline">ReferralFit Terms of Use</Link>.
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

export default ReferralFitPrivacy;
