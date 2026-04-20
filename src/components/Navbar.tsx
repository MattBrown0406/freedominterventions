import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import partyWreckersLogo from "@/assets/party-wreckers-logo.jpg";
import soberHelplineLogo from "@/assets/sober-helpline-logo.png";
import TrackedPhoneLink from "./TrackedPhoneLink";
import { Link } from "react-router-dom";

const servicesLinks = [
  { name: "Family Intervention", href: "/family-intervention" },
  { name: "Crisis Support", href: "/crisis-support" },
  { name: "Treatment Planning", href: "/treatment-planning" },
  { name: "Aftercare Guidance", href: "/aftercare-guidance" },
];

const resourceLinks = [
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/intervention-faq" },
  { name: "Substance Guide", href: "/substance-guide" },
  { name: "Assessment", href: "/assessment" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "How It Works", href: "/family-intervention#process" },
  { name: "About Matt", href: "/interventionist" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

const Dropdown = ({ label, items }: { label: string; items: { name: string; href: string }[] }) => (
  <div className="relative group">
    <button className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors duration-200 font-medium">
      {label}
      <ChevronDown className="w-4 h-4" />
    </button>
    <div className="absolute left-0 top-full pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
      <div className="min-w-[220px] rounded-2xl border border-border bg-background shadow-xl p-2">
        {items.map((item) => (
          <Link key={item.href} to={item.href} className="block px-4 py-3 rounded-xl text-sm text-muted-foreground hover:bg-accent/40 hover:text-primary transition-colors">
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

const MobileSection = ({ label, items, isOpen, onToggle, onNavigate }: { label: string; items: { name: string; href: string }[]; isOpen: boolean; onToggle: () => void; onNavigate: () => void }) => (
  <div className="border border-border/60 rounded-xl overflow-hidden">
    <button onClick={onToggle} className="w-full px-4 py-3 bg-card flex items-center justify-between text-left font-medium text-foreground">
      {label}
      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
    {isOpen && (
      <div className="bg-background border-t border-border/60">
        {items.map((item) => (
          <Link key={item.href} to={item.href} className="block px-4 py-3 text-muted-foreground hover:text-primary hover:bg-accent/30 transition-colors" onClick={onNavigate}>
            {item.name}
          </Link>
        ))}
      </div>
    )}
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/" className="flex items-center gap-2 min-w-0">
            <img src={logo} alt="Freedom Interventions" className="h-10 md:h-12 w-auto mix-blend-multiply border-2 border-foreground rounded-lg flex-shrink-0" width={266} height={295} />
            <span className="font-serif text-base sm:text-xl md:text-2xl font-semibold text-primary truncate">Freedom Interventions</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium">Home</Link>
            <Dropdown label="Services" items={servicesLinks} />
            <Link to="/family-intervention#process" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium">How It Works</Link>
            <Link to="/interventionist" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium">About Matt</Link>
            <Dropdown label="Resources" items={resourceLinks} />
            <Link to="/self-assessment" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium">Assessment</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium">Contact</Link>
            <TrackedPhoneLink phoneNumber="+15418386009" metadata={{ location: "navbar_desktop" }}>
              <Button variant="hero" size="default">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </TrackedPhoneLink>
          </div>

          <button className="md:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-up space-y-3">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className="block px-4 py-3 rounded-xl bg-card text-foreground font-medium" onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            ))}
            <MobileSection
              label="Services"
              items={servicesLinks}
              isOpen={openSection === "services"}
              onToggle={() => setOpenSection(openSection === "services" ? null : "services")}
              onNavigate={() => setIsOpen(false)}
            />
            <MobileSection
              label="Resources"
              items={resourceLinks}
              isOpen={openSection === "resources"}
              onToggle={() => setOpenSection(openSection === "resources" ? null : "resources")}
              onNavigate={() => setIsOpen(false)}
            />
            <a href="/party-wreckers-podcast" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2 flex items-center gap-2 px-4" onClick={() => setIsOpen(false)}>
              <img src={partyWreckersLogo} alt="The Party Wreckers Podcast" className="h-6 w-auto" width={1024} height={1024} />
              <span className="font-lobster">The Party Wreckers Podcast</span>
            </a>
            <TrackedPhoneLink phoneNumber="+15418386009" metadata={{ location: "navbar_mobile" }}>
              <Button variant="hero" size="default" className="mt-2 w-full">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </TrackedPhoneLink>
          </div>
        )}
      </div>

      <div className="border-t border-border/50 hidden md:block">
        <div className="container mx-auto px-6 py-1 flex justify-between items-center">
          <a href="https://soberhelpline.com/monday-zoom-registration" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            <img src={soberHelplineLogo} alt="Sober Helpline" className="h-8 md:h-10 w-auto" />
            <span className="text-muted-foreground">Free Weekly Family Support Meetings</span>
          </a>
          <a href="/party-wreckers-podcast" className="inline-flex items-center gap-2">
            <img src={partyWreckersLogo} alt="The Party Wreckers Podcast" className="h-8 md:h-10 w-auto" width={1024} height={1024} />
            <span className="font-lobster text-sm md:text-base text-foreground">The Party Wreckers Podcast</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
