import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Terms and SMS Policy | Freedom Interventions"
        description="Freedom Interventions terms, service disclaimers, booking policies, privacy references, and SMS messaging terms for requested follow-up texts."
        canonical="https://freedominterventions.com/terms"
        noindex={false}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com/" },
          { name: "Terms and SMS Policy", url: "https://freedominterventions.com/terms" },
        ]}
      />
      <Navbar />

      <main className="pt-24 md:pt-32">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-4">
              Legal / SMS Policy
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-8">
              Terms and SMS Policy
            </h1>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
              <p className="text-lg text-foreground">
                <strong>Effective Date:</strong> May 11, 2026<br />
                <strong>Last Updated:</strong> July 14, 2026
              </p>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Agreement to Terms</h2>
                <p>
                  By using the Freedom Interventions website, contacting Freedom Interventions, booking a consultation or coaching session, or receiving requested follow-up communications, you agree to these Terms and SMS Policy. If you do not agree, please do not use the website or services.
                </p>
                <p>
                  Freedom Interventions provides professional addiction intervention consultation, family coaching, treatment planning support, and related guidance. These services are educational, consultative, and supportive in nature.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Not Medical or Emergency Care</h2>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <p className="text-orange-800 font-semibold mb-2">Important disclaimer</p>
                  <p className="text-orange-700">
                    Freedom Interventions does not provide medical treatment, psychiatric care, diagnosis, detox services, or emergency services. If you are facing an immediate medical emergency or safety crisis, call 911. If there is a suicide or mental health crisis in the United States, call or text 988. For substance-use treatment resources, SAMHSA is available at 1-800-662-4357.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Booking and Payment</h2>
                <p>
                  Paid coaching or consultation sessions may require advance payment. Booking links may direct you to a secure third-party payment or scheduling provider. By booking a paid session, you agree to provide accurate information and pay the listed fee for the selected service.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Free consultations, when available, are offered for initial fit and next-step discussion.</li>
                  <li>Paid crisis coaching sessions are consultative and do not guarantee a specific outcome.</li>
                  <li>Zoom or meeting details may be sent after booking and payment are completed.</li>
                  <li>Cancellation or rescheduling terms may vary by service and will be discussed when applicable.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">SMS Messaging Terms</h2>
                <p>
                  Freedom Interventions sends customer-care SMS text messages only after a person gives explicit consent. Messages may include requested consultation or registration links, secure coaching payment links, appointment and Zoom details, reminders, callback coordination, and follow-up related to an existing inquiry.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Verbal opt-in:</strong> During an inbound call, Freedom Interventions identifies the messaging program, explains the message categories and expected frequency, states that message and data rates may apply, explains HELP and STOP, provides these Terms and our Privacy Policy, states that consent is not a condition of purchase, and asks for a yes-or-no response. We send SMS only after a clear affirmative response.</li>
                  <li><strong>No inferred consent:</strong> Calling us, providing a phone number, submitting a request, booking, or purchasing does not by itself opt you in. Consent to SMS is not a condition of purchasing any product or service.</li>
                  <li><strong>Message frequency:</strong> Message frequency varies, typically 1–4 messages per request or appointment.</li>
                  <li><strong>Costs:</strong> Message and data rates may apply.</li>
                  <li><strong>Opt-out:</strong> Reply STOP to cancel SMS messages.</li>
                  <li><strong>Help:</strong> Reply HELP for help, or contact us at matt@freedominterventions.com or (541) 668-8084.</li>
                  <li><strong>Carriers:</strong> Mobile carriers are not liable for delayed or undelivered messages.</li>
                  <li><strong>Privacy:</strong> We do not sell or share mobile information, SMS opt-in data, or consent with third parties or affiliates for their marketing or promotional purposes. We share it only with service providers necessary to deliver the requested messages.</li>
                </ul>
                <p>
                  Example message: Freedom Interventions: Here is the consultation information you requested: [link]. Msg frequency varies. Msg &amp; data rates may apply. Reply HELP for help or STOP to opt out.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Privacy</h2>
                <p>
                  Your privacy matters. We use information you provide to respond to your inquiry, coordinate services, process bookings, and provide requested follow-up. For more detail, please review our <Link to="/privacy-policy" className="text-primary underline">Privacy Policy</Link>.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">User Responsibilities</h2>
                <p>By using the website or services, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate information about your situation and contact details.</li>
                  <li>Use the website and services lawfully and respectfully.</li>
                  <li>Seek medical, psychiatric, legal, or emergency help when appropriate.</li>
                  <li>Understand that recovery, treatment engagement, and intervention outcomes cannot be guaranteed.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Limitation of Liability</h2>
                <p>
                  Freedom Interventions provides consultation and support based on experience and professional judgment, but addiction and family crisis situations involve many variables outside our control. To the fullest extent permitted by law, Freedom Interventions is not liable for indirect, incidental, consequential, or special damages, and total liability is limited to the amount paid for the specific service at issue.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Changes to These Terms</h2>
                <p>
                  We may update these Terms and SMS Policy from time to time. Updates will be posted on this page with a revised “Last Updated” date. Continued use of the website or services after changes are posted means you accept the updated terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Contact</h2>
                <p>
                  Freedom Interventions<br />
                  Matt Brown<br />
                  Email: <a href="mailto:matt@freedominterventions.com" className="text-primary underline">matt@freedominterventions.com</a><br />
                  Phone: <a href="tel:+14582988000" className="text-primary underline">(541) 668-8084</a>
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

export default Terms;
