import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";

import { Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const HipaaCompliance = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="HIPAA Compliance Statement"
        description="Freedom Interventions HIPAA compliance statement explaining client information protection, data handling practices, staff training, and incident response for addiction intervention services."
        canonical="https://freedominterventions.com/hipaa-compliance"
        noindex={false}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com/" },
          { name: "HIPAA Compliance", url: "https://freedominterventions.com/hipaa-compliance" }
        ]}
      />
      <Navbar />
      
      <main className="pt-24 md:pt-32">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-8">
              HIPAA Compliance Statement
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-lg text-foreground mb-8">
                <strong>Effective Date:</strong> February 27, 2026<br />
                <strong>Last Updated:</strong> February 27, 2026
              </p>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Our Commitment to Privacy Protection</h2>
                <p>
                  Freedom Interventions is deeply committed to protecting the privacy and confidentiality of individuals and families seeking addiction intervention services. While professional intervention services may not traditionally fall under HIPAA covered entity requirements, we have chosen to implement HIPAA-aware practices and maintain the highest standards of privacy protection.
                </p>
                <p>
                  Our founder, Matt Brown, understands that families facing addiction crises are sharing some of the most sensitive and personal information of their lives. We treat this responsibility with the utmost seriousness and have built our privacy practices around the gold standard of healthcare privacy protection.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">HIPAA Status and Applicability</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Understanding Our Role</h3>
                  <p className="text-blue-700">
                    Professional interventionists are typically not considered "covered entities" under HIPAA, as intervention services are consultative and educational rather than direct healthcare provision. However, Freedom Interventions voluntarily applies HIPAA-level privacy standards because we believe families deserve the highest level of privacy protection available.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-foreground">When HIPAA Does Apply</h3>
                <p>HIPAA regulations become applicable when we:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Coordinate directly with healthcare providers as a business associate</li>
                  <li>Handle protected health information (PHI) on behalf of treatment facilities</li>
                  <li>Facilitate communication between families and HIPAA-covered entities</li>
                  <li>Access treatment records with proper authorization</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Information We Protect</h2>
                
                <h3 className="text-xl font-semibold text-foreground">Types of Sensitive Information</h3>
                <p>We treat the following information with HIPAA-level protection standards:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Substance use and addiction history</li>
                  <li>Mental health information and concerns</li>
                  <li>Family dynamics and relationship details</li>
                  <li>Financial information related to treatment</li>
                  <li>Previous treatment history and outcomes</li>
                  <li>Medical conditions that may affect intervention planning</li>
                  <li>Legal issues related to substance use</li>
                  <li>Employment and housing situations</li>
                  <li>Personal identifiers and contact information</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">Special Categories</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    <strong>Extra Protection for:</strong> Information involving minors, domestic violence situations, legal proceedings, and co-occurring mental health conditions receives enhanced privacy protection and may require additional authorization steps.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Data Handling Practices</h2>
                
                <h3 className="text-xl font-semibold text-foreground">Physical Safeguards</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Secure storage of physical documents in locked filing cabinets</li>
                  <li>Restricted access to offices and work areas</li>
                  <li>Controlled access to computers and mobile devices</li>
                  <li>Secure disposal of documents using cross-cut shredding</li>
                  <li>Clean desk policy for confidential information</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">Technical Safeguards</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>End-to-end encryption for all digital communications</li>
                  <li>Secure, HIPAA-compliant database infrastructure (Supabase)</li>
                  <li>Multi-factor authentication for system access</li>
                  <li>Regular software updates and security patches</li>
                  <li>Automatic session timeouts and secure logout procedures</li>
                  <li>Encrypted backup systems with secure storage</li>
                  <li>Firewall and intrusion detection systems</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">Administrative Safeguards</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Privacy policies and procedures documentation</li>
                  <li>Staff training on confidentiality requirements</li>
                  <li>Role-based access controls for information systems</li>
                  <li>Regular privacy risk assessments</li>
                  <li>Incident response and breach notification procedures</li>
                  <li>Business associate agreements with vendors</li>
                  <li>Regular audits of privacy practices</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Staff Training and Certification</h2>
                
                <h3 className="text-xl font-semibold text-foreground">Privacy Training Requirements</h3>
                <p>All staff members receive comprehensive training on:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>HIPAA privacy and security principles</li>
                  <li>Confidentiality requirements specific to addiction intervention</li>
                  <li>Proper handling of sensitive client information</li>
                  <li>Secure communication practices</li>
                  <li>Incident recognition and reporting procedures</li>
                  <li>Professional boundaries and ethical considerations</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">Ongoing Education</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Annual HIPAA training updates</li>
                  <li>Privacy law changes and updates</li>
                  <li>Technology security training</li>
                  <li>Case-specific privacy considerations</li>
                  <li>Professional development in confidentiality standards</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Information Sharing Guidelines</h2>
                
                <h3 className="text-xl font-semibold text-foreground">Authorized Disclosures</h3>
                <p>We may share your information only in these circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>With your written authorization</li>
                  <li>To coordinate treatment with authorized providers</li>
                  <li>When required by law (court orders, mandatory reporting)</li>
                  <li>To prevent imminent harm to self or others</li>
                  <li>For payment and billing purposes (with consent)</li>
                  <li>With family members you've specifically authorized</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">Minimum Necessary Standard</h3>
                <p>
                  When sharing information is authorized, we follow the "minimum necessary" principle, sharing only the specific information required for the purpose, nothing more.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Client Rights and Protections</h2>
                
                <h3 className="text-xl font-semibold text-foreground">Your Privacy Rights</h3>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Request access to your personal information</li>
                  <li>Request corrections to inaccurate information</li>
                  <li>Request restrictions on how your information is used</li>
                  <li>Request confidential communications</li>
                  <li>Receive notification of privacy breaches</li>
                  <li>File complaints about privacy practices</li>
                  <li>Withdraw consent for information sharing (where applicable)</li>
                  <li>Receive a copy of this compliance statement</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">How to Exercise Your Rights</h3>
                <p>
                  To exercise any of these rights, contact us in writing using the information provided below. We will respond within 30 days and may need to verify your identity for security purposes.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Incident Response and Breach Notification</h2>
                
                <h3 className="text-xl font-semibold text-foreground">Breach Response Protocol</h3>
                <p>In the unlikely event of a privacy incident:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Immediate containment and assessment of the incident</li>
                  <li>Investigation to determine the scope and cause</li>
                  <li>Notification of affected clients within 60 days</li>
                  <li>Implementation of corrective measures</li>
                  <li>Documentation and reporting as required by law</li>
                  <li>Review and update of privacy practices as needed</li>
                </ol>

                <h3 className="text-xl font-semibold text-foreground">What We Will Tell You</h3>
                <p>Breach notifications will include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Description of what happened</li>
                  <li>Types of information involved</li>
                  <li>Steps being taken to address the incident</li>
                  <li>Recommended actions you can take to protect yourself</li>
                  <li>Contact information for questions</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Business Associate Relationships</h2>
                <p>
                  When we work with third-party vendors who may have access to client information, we ensure they meet our privacy standards through:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Signed business associate agreements</li>
                  <li>Privacy and security requirement compliance</li>
                  <li>Regular audits of vendor practices</li>
                  <li>Incident reporting requirements</li>
                  <li>Data destruction policies</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">Current Business Associates</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Supabase (database hosting) - SOC 2 Type II compliant</li>
                  <li>Square (payment processing) - PCI DSS compliant</li>
                  <li>Tawk.to (chat services) - with data encryption</li>
                  <li>Email providers with end-to-end encryption capabilities</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Data Retention and Disposal</h2>
                
                <h3 className="text-xl font-semibold text-foreground">Retention Schedules</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Active client records:</strong> Maintained during service period plus 7 years</li>
                  <li><strong>Consultation notes:</strong> Retained for 5 years after last contact</li>
                  <li><strong>Intervention documentation:</strong> Retained for 7 years</li>
                  <li><strong>Payment records:</strong> Retained per financial regulations (7 years)</li>
                  <li><strong>Correspondence:</strong> Retained for 3 years after last communication</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">Secure Disposal</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cross-cut shredding for physical documents</li>
                  <li>Secure digital deletion with multi-pass overwrites</li>
                  <li>Certificate of destruction for sensitive materials</li>
                  <li>Supervised disposal of storage devices</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Complaint Procedures</h2>
                <p>
                  If you believe your privacy rights have been violated, you may file a complaint:
                </p>
                
                <h3 className="text-xl font-semibold text-foreground">Internal Complaints</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact our Privacy Officer directly</li>
                  <li>Submit written complaints describing the concern</li>
                  <li>We will investigate and respond within 30 days</li>
                  <li>No retaliation for filing complaints in good faith</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground">External Complaints</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>U.S. Department of Health and Human Services, Office for Civil Rights</li>
                  <li>Oregon state privacy protection agencies</li>
                  <li>Professional licensing boards for interventionists</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Updates and Changes</h2>
                <p>
                  We reserve the right to modify our privacy practices and this compliance statement. Material changes will be posted on our website and communicated to active clients. The effective date at the top of this document indicates when changes were last made.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Contact Our Privacy Officer</h2>
                <p>
                  For questions about privacy practices, to exercise your rights, or to file complaints:
                </p>
                <div className="bg-card border border-border rounded-lg p-6 mt-4">
                  <p><strong>Freedom Interventions - Privacy Officer</strong><br />
                  Matt Brown, Professional Interventionist & Privacy Officer<br />
                  Email: matt@freedominterventions.com<br />
                  Phone: (541) 838-6009<br />
                  Website: https://freedominterventions.com</p>
                  
                  <p className="mt-4 font-semibold">For Privacy-Related Inquiries:</p>
                  <p>Please mark your communication as <span className="bg-yellow-100 px-2 py-1 rounded text-yellow-800 font-mono">"PRIVACY MATTER - CONFIDENTIAL"</span> to ensure proper routing and priority handling.</p>
                  
                  <p className="mt-4 text-sm text-muted-foreground">
                    Office Hours: Monday-Friday 8:00 AM - 6:00 PM Pacific Time<br />
                    Emergency Privacy Concerns: Available 24/7 by phone
                  </p>
                </div>
              </section>

              <section className="space-y-4 border-t border-border pt-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Our Promise to You</h3>
                  <p className="text-green-700">
                    At Freedom Interventions, protecting your privacy isn't just a legal obligation—it's a moral imperative. We understand that seeking help for addiction requires tremendous courage and trust. That trust is sacred to us, and we will never take it for granted. Every policy, procedure, and practice we implement is designed to honor that trust and protect the most sensitive aspects of your family's journey toward recovery.
                  </p>
                </div>
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

export default HipaaCompliance;