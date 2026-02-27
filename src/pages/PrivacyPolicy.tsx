import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Privacy Policy"
        description="Freedom Interventions privacy policy covering data collection, Supabase usage, call tracking, booking data, cookies, third-party services, HIPAA-aware practices, and user rights."
        canonical="https://freedominterventions.com/privacy-policy"
        noindex={false}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com/" },
          { name: "Privacy Policy", url: "https://freedominterventions.com/privacy-policy" }
        ]}
      />
      <Navbar />
      
      <main className="pt-24 md:pt-32">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-8">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-lg text-foreground mb-8">
                <strong>Effective Date:</strong> February 27, 2026<br />
                <strong>Last Updated:</strong> February 27, 2026
              </p>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Our Commitment to Your Privacy</h2>
                <p>
                  Freedom Interventions is committed to protecting the privacy and confidentiality of individuals and families seeking addiction intervention services. This Privacy Policy explains how we collect, use, protect, and disclose information when you use our website, services, or contact us for assistance.
                </p>
                <p>
                  As a healthcare-adjacent service provider, we adhere to stringent privacy standards and implement HIPAA-aware practices, even though intervention services may not fall under traditional covered entity requirements. Your trust is paramount to our mission of helping families find hope and recovery.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-foreground">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact information (name, email address, phone number, mailing address)</li>
                  <li>Assessment and consultation responses</li>
                  <li>Booking and appointment data</li>
                  <li>Communication records (calls, emails, chat messages)</li>
                  <li>Payment information (processed securely through Square)</li>
                  <li>Family situation and addiction-related information shared during consultations</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">Technical Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Device information (type, operating system, browser)</li>
                  <li>IP address and location data</li>
                  <li>Website usage analytics and behavior patterns</li>
                  <li>Call tracking data (call duration, source, device used)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide intervention services and consultations</li>
                  <li>Schedule and manage appointments</li>
                  <li>Communicate about your case and provide follow-up support</li>
                  <li>Process payments and maintain financial records</li>
                  <li>Improve our services and website functionality</li>
                  <li>Ensure safety and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                  <li>Send service updates and educational resources (with consent)</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Data Storage and Security</h2>
                
                <h3 className="text-xl font-semibold text-foreground">Supabase Infrastructure</h3>
                <p>
                  Our primary database is hosted on Supabase, a secure, enterprise-grade platform that provides:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>End-to-end encryption for data in transit and at rest</li>
                  <li>Row-level security (RLS) for data access control</li>
                  <li>Regular security audits and compliance certifications</li>
                  <li>Automated backups and disaster recovery</li>
                  <li>SOC 2 Type II compliance</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">Additional Security Measures</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Role-based access controls for staff members</li>
                  <li>Regular security training for all personnel</li>
                  <li>Secure communication channels for sensitive information</li>
                  <li>Password policies and multi-factor authentication</li>
                  <li>Regular security assessments and updates</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Third-Party Services</h2>
                <p>We work with trusted third-party providers to deliver our services:</p>
                
                <h3 className="text-xl font-semibold text-foreground">Square (Payment Processing)</h3>
                <p>
                  Payment information is processed securely through Square. We do not store credit card information on our servers. Square maintains PCI DSS compliance and handles all payment security requirements.
                </p>

                <h3 className="text-xl font-semibold text-foreground">Tawk.to (Live Chat)</h3>
                <p>
                  Our website chat feature is powered by Tawk.to. Chat conversations are encrypted and stored securely. Personal health information should not be shared through chat - use phone consultations for sensitive discussions.
                </p>

                <h3 className="text-xl font-semibold text-foreground">Analytics and Tracking</h3>
                <p>
                  We use analytics tools to improve our services and understand how families find us. All data is anonymized where possible and used solely for service improvement purposes.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Cookies and Tracking Technologies</h2>
                <p>We use cookies and similar technologies for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Essential website functionality</li>
                  <li>User preferences and settings</li>
                  <li>Analytics and performance monitoring</li>
                  <li>Call tracking for consultation attribution</li>
                  <li>Security and fraud prevention</li>
                </ul>
                <p>
                  You can control cookie settings through your browser, though some functionality may be limited if essential cookies are disabled.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Information Sharing and Disclosure</h2>
                <p>We do not sell, trade, or rent personal information. We may share information only in these limited circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>With your explicit consent</li>
                  <li>To provide requested services (e.g., coordinating with treatment facilities)</li>
                  <li>When required by law or legal process</li>
                  <li>To protect safety in emergency situations</li>
                  <li>With service providers under strict confidentiality agreements</li>
                  <li>In connection with a business transfer (with continued privacy protections)</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Data Retention</h2>
                <p>
                  We retain personal information only as long as necessary to provide services and meet legal obligations:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Active client records: Maintained during service period plus 7 years</li>
                  <li>Assessment and consultation data: Retained for 3 years</li>
                  <li>Payment records: Retained per tax and financial regulations (typically 7 years)</li>
                  <li>Website analytics: Anonymized data retained for 2 years</li>
                  <li>Call tracking data: Retained for 1 year for service improvement</li>
                </ul>
                <p>
                  Data is securely deleted or anonymized when retention periods expire.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your information (subject to legal and service requirements)</li>
                  <li>Restrict processing of your information</li>
                  <li>Withdraw consent where processing is based on consent</li>
                  <li>Receive a copy of your information in a portable format</li>
                  <li>File a complaint with appropriate regulatory authorities</li>
                </ul>
                <p>
                  To exercise these rights, contact us using the information below. We will respond within 30 days and may need to verify your identity for security purposes.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Special Protections for Minors</h2>
                <p>
                  Our website and services are not directed to children under 18. We do not knowingly collect personal information from minors without parental consent. If we become aware that we have inadvertently collected information from a minor, we will take steps to delete it promptly.
                </p>
                <p>
                  When intervention services involve minors, additional privacy protections apply, and we work with parents or legal guardians to ensure appropriate consent and confidentiality.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibud text-foreground">International Users</h2>
                <p>
                  If you are accessing our services from outside the United States, please note that your information may be transferred to and processed in the United States, where privacy laws may differ. By using our services, you consent to this transfer and processing.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. Material changes will be posted prominently on our website, and we may notify active clients directly. Your continued use of our services after changes take effect constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Contact Us</h2>
                <p>
                  For questions about this Privacy Policy or to exercise your privacy rights, please contact us:
                </p>
                <div className="bg-card border border-border rounded-lg p-6 mt-4">
                  <p><strong>Freedom Interventions</strong><br />
                  Matt Brown, Professional Interventionist<br />
                  Email: matt@freedominterventions.com<br />
                  Phone: (541) 838-6009<br />
                  Website: https://freedominterventions.com</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    <strong>Privacy Officer:</strong> For privacy-specific inquiries, please mark your communication as "PRIVACY REQUEST" to ensure proper routing and priority handling.
                  </p>
                </div>
              </section>

              <section className="space-y-4 border-t border-border pt-8">
                <p className="text-sm text-muted-foreground italic">
                  This Privacy Policy was prepared with care to ensure transparency and compliance with applicable privacy laws, including consideration of HIPAA principles for healthcare-adjacent services. We are committed to maintaining the highest standards of privacy protection for families seeking help with addiction intervention services.
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

export default PrivacyPolicy;