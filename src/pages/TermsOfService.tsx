import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";

import { Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Terms of Service"
        description="Freedom Interventions terms of service covering service limitations, liability, booking policies, cancellation terms, intellectual property, and governing law for addiction intervention services."
        canonical="https://freedominterventions.com/terms-of-service"
        noindex={false}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com/" },
          { name: "Terms of Service", url: "https://freedominterventions.com/terms-of-service" }
        ]}
      />
      <Navbar />
      
      <main className="pt-24 md:pt-32">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-8">
              Terms of Service
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-lg text-foreground mb-8">
                <strong>Effective Date:</strong> February 27, 2026<br />
                <strong>Last Updated:</strong> February 27, 2026
              </p>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Agreement to Terms</h2>
                <p>
                  By accessing or using the Freedom Interventions website, services, or contacting us for consultation, you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, please do not use our services.
                </p>
                <p>
                  These Terms constitute a legally binding agreement between you and Freedom Interventions, operated by Matt Brown, a professional interventionist with over 20 years of experience in addiction intervention services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Nature of Services</h2>
                
                <h3 className="text-xl font-semibold text-foreground">Intervention Services</h3>
                <p>
                  Freedom Interventions provides professional addiction intervention services, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Family consultation and assessment</li>
                  <li>Intervention planning and facilitation</li>
                  <li>Crisis support and guidance</li>
                  <li>Treatment placement assistance</li>
                  <li>Aftercare planning and support</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">Not Medical Treatment</h3>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <p className="text-orange-800 font-semibold mb-2">IMPORTANT DISCLAIMER:</p>
                  <p className="text-orange-700">
                    Intervention services are <strong>not medical treatment</strong> and do not constitute healthcare. While interventionists work closely with medical and mental health professionals, intervention services are educational, consultative, and supportive in nature. Our services are not a substitute for professional medical care, psychiatric treatment, or addiction medicine.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Professional Qualifications and Limitations</h2>
                <p>
                  Matt Brown is a Certified Intervention Professional (CIP) with over 20 years of experience and 22+ years of personal recovery. However, users should understand:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Intervention services complement but do not replace medical or psychiatric care</li>
                  <li>We do not diagnose mental health or substance use disorders</li>
                  <li>We do not prescribe medications or provide medical treatment</li>
                  <li>We do not guarantee specific outcomes or recovery outcomes</li>
                  <li>Each situation is unique, and results may vary significantly</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Booking and Payment Terms</h2>
                
                <h3 className="text-xl font-semibold text-foreground">Service Packages</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Free Consultation:</strong> Initial assessment and service discussion at no cost</li>
                  <li><strong>Paid Coaching Sessions:</strong> Extended planning and preparation services</li>
                  <li><strong>Intervention Services:</strong> Full intervention facilitation and support</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">Payment Processing</h3>
                <p>
                  Payments are processed securely through Square. By booking paid services, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate billing information</li>
                  <li>Pay all charges associated with your selected services</li>
                  <li>Accept responsibility for any fees charged by your financial institution</li>
                  <li>Notify us immediately of any billing discrepancies</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">Cancellation and Refund Policy</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Consultation Cancellations:</strong> Must provide 24 hours advance notice</li>
                  <li><strong>Coaching Session Cancellations:</strong> Full refund if cancelled 48+ hours in advance; 50% refund if cancelled 24-48 hours in advance; no refund for less than 24 hours notice</li>
                  <li><strong>Intervention Service Cancellations:</strong> Refund policies vary based on advance notice and services already provided; discussed during initial consultation</li>
                  <li><strong>Emergency Situations:</strong> Cancellation policies may be modified in genuine emergency situations</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">User Responsibilities</h2>
                <p>By using our services, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete information about your situation</li>
                  <li>Follow safety guidelines and recommendations</li>
                  <li>Respect the professional boundaries of Matt and any coordinating providers</li>
                  <li>Maintain confidentiality of other participants in group sessions</li>
                  <li>Use our services lawfully and ethically</li>
                  <li>Notify us of any changes that may affect service delivery</li>
                  <li>Engage medical professionals for medical concerns</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Prohibited Uses</h2>
                <p>You may not use our services or website to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Engage in illegal activities or encourage others to do so</li>
                  <li>Harass, threaten, or abuse staff or other clients</li>
                  <li>Share false or misleading information</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use automated systems to access our website</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Violate privacy or confidentiality of others</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Limitation of Liability</h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <p className="text-red-800 font-semibold mb-2">IMPORTANT LIABILITY LIMITATIONS:</p>
                  <div className="text-red-700 space-y-2">
                    <p>
                      Freedom Interventions provides professional consultation and support services but cannot guarantee specific outcomes. Addiction is a complex medical condition with many variables beyond our control.
                    </p>
                    <p>
                      <strong>TO THE FULLEST EXTENT PERMITTED BY LAW:</strong>
                    </p>
                    <ul className="list-disc pl-6 mt-2">
                      <li>We disclaim all warranties, express or implied</li>
                      <li>Our liability is limited to the amount paid for services</li>
                      <li>We are not liable for indirect, consequential, or special damages</li>
                      <li>We are not responsible for actions taken by individuals with addiction</li>
                      <li>Users assume responsibility for implementation of recommendations</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Emergency Situations</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <p className="text-yellow-800 font-semibold mb-2">EMERGENCY PROTOCOLS:</p>
                  <div className="text-yellow-700 space-y-2">
                    <p>
                      <strong>If you are experiencing a medical emergency or mental health crisis:</strong>
                    </p>
                    <ul className="list-disc pl-6">
                      <li>Call 911 immediately</li>
                      <li>Contact the National Suicide Prevention Lifeline: 988</li>
                      <li>Go to your nearest emergency room</li>
                      <li>Call the SAMHSA National Helpline: 1-800-662-4357</li>
                    </ul>
                    <p>
                      Intervention services are not emergency medical or mental health services. While we provide crisis support, we are not equipped to handle acute medical or psychiatric emergencies.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Confidentiality and Privacy</h2>
                <p>
                  We maintain strict confidentiality standards as outlined in our Privacy Policy. However, confidentiality may be limited in certain situations:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Imminent danger to self or others</li>
                  <li>Suspected child or elder abuse</li>
                  <li>Legal requirements or court orders</li>
                  <li>With your written consent for coordination of care</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Intellectual Property</h2>
                <p>
                  All content on our website, including text, graphics, logos, and materials provided during services, are protected by copyright and other intellectual property laws. You may not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Reproduce or distribute our content without permission</li>
                  <li>Use our materials for commercial purposes</li>
                  <li>Modify or create derivative works</li>
                  <li>Remove copyright or proprietary notices</li>
                </ul>
                <p>
                  You may use information provided during your services for personal family purposes only.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Termination</h2>
                <p>
                  Either party may terminate services with appropriate notice:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You may discontinue services at any time</li>
                  <li>We may terminate services for violation of terms, safety concerns, or non-payment</li>
                  <li>Termination does not relieve payment obligations for services already provided</li>
                  <li>Post-termination, confidentiality obligations continue</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Insurance and Coverage</h2>
                <p>
                  Many insurance plans provide coverage for intervention services. However:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Coverage varies significantly by plan and provider</li>
                  <li>You are responsible for verifying your coverage</li>
                  <li>We can provide documentation to support reimbursement requests</li>
                  <li>Payment is due regardless of insurance coverage decisions</li>
                  <li>Some services may not be covered by insurance</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Dispute Resolution</h2>
                <p>
                  We encourage open communication to resolve any concerns. For formal disputes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact us directly to attempt resolution</li>
                  <li>Disputes will be governed by Oregon state law</li>
                  <li>Venue for legal proceedings is Oregon courts</li>
                  <li>Arbitration may be available for certain disputes</li>
                  <li>You may have additional rights under consumer protection laws</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Changes to Terms</h2>
                <p>
                  We may update these Terms periodically. Material changes will be posted on our website with the updated effective date. Continued use of our services after changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Professional Standards</h2>
                <p>
                  Freedom Interventions operates under the ethical guidelines and standards of:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Association of Intervention Specialists (AIS)</li>
                  <li>Network of Independent Interventionists (NII)</li>
                  <li>Certified Intervention Professional (CIP) standards</li>
                  <li>Professional standards for client confidentiality and care</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Contact Information</h2>
                <p>
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-card border border-border rounded-lg p-6 mt-4">
                  <p><strong>Freedom Interventions</strong><br />
                  Matt Brown, Professional Interventionist<br />
                  Email: matt@freedominterventions.com<br />
                  Phone: (541) 838-6009<br />
                  Website: https://freedominterventions.com</p>
                </div>
              </section>

              <section className="space-y-4 border-t border-border pt-8">
                <p className="text-sm text-muted-foreground italic">
                  These Terms of Service have been prepared to ensure clear understanding of our services, limitations, and mutual responsibilities. We are committed to providing professional, ethical intervention services while protecting the rights and safety of all parties involved.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

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

export default TermsOfService;