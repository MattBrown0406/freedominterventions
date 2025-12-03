import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  const footerLinks = {
    services: [
      { name: "Family Intervention", href: "/family-intervention", isRoute: true },
      { name: "Crisis Support", href: "/crisis-support", isRoute: true },
      { name: "Treatment Planning", href: "/treatment-planning", isRoute: true },
      { name: "Aftercare Guidance", href: "/aftercare-guidance", isRoute: true },
    ],
    company: [
      { name: "Our Team", href: "/interventionist", isRoute: true },
      { name: "Testimonials", href: "#" },
      { name: "Contact", href: "#contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "HIPAA Compliance", href: "#" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2">
              <img src={logo} alt="Freedom Interventions" className="h-[10.5rem] w-auto mix-blend-multiply" />
            </a>
            <p className="text-muted-foreground max-w-xs">
              Guiding families toward hope and recovery with compassionate, professional intervention services.
            </p>
            <div className="space-y-2 pt-2">
              <a href="tel:+15038362136" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span>(503) 836-2136</span>
              </a>
              <a href="mailto:matt@freedominterventions.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span>matt@freedominterventions.com</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Freedom Interventions. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Licensed & Insured • Confidential Services
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
