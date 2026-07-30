import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import partyWreckersLogo from "@/assets/party-wreckers-logo.jpg";
import soberHelplineLogo from "@/assets/sober-helpline-logo.png";
import TrackedPhoneLink from "./TrackedPhoneLink";
import { Link } from "react-router-dom";
import AppStoreBadge from "@/components/AppStoreBadge";

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
  { name: "Contact", href: "/contact" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Start Here", href: "/start-here" },
  { name: "How It Works", href: "/family-intervention#process" },
  { name: "About Matt", href: "/interventionist" },
  { name: "Assessment", href: "/assessment" },
  { name: "Contact", href: "/contact" },
];

const Dropdown = ({ label, items, dark = false }: { label: string; items: { name: string; href: string }[]; dark?: boolean }) => (
  <div className="relative group">
    <button
      type="button"
      aria-haspopup="menu"
      className={`inline-flex items-center gap-1 transition-colors duration-200 font-medium ${dark ? "text-slate-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5ad55]" : "text-muted-foreground hover:text-primary"}`}
    >
      {label}
      <ChevronDown className="w-4 h-4" />
    </button>
    <div className="absolute left-0 top-full pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition-opacity">
      <div role="menu" className="min-w-[220px] rounded-2xl border border-border bg-background shadow-xl p-2">
        {items.map((item) => (
          <Link role="menuitem" key={item.href} to={item.href} className="block px-4 py-3 rounded-xl text-sm text-muted-foreground hover:bg-accent/40 hover:text-primary transition-colors">
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

const MobileSection = ({ label, items, isOpen, onToggle, onNavigate }: { label: string; items: { name: string; href: string }[]; isOpen: boolean; onToggle: () => void; onNavigate: () => void }) => (
  <div className="border border-border/60 rounded-xl overflow-hidden">
    <button type="button" aria-expanded={isOpen} onClick={onToggle} className="w-full px-4 py-3 bg-card flex items-center justify-between text-left font-medium text-foreground">
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

const Navbar = ({ dark = false }: { dark?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const desktopLinkClass = dark
    ? "text-slate-200 hover:text-white transition-colors duration-200 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5ad55]"
    : "text-muted-foreground hover:text-primary transition-colors duration-200 font-medium";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${dark ? "bg-[#071c3e]/95 border-b border-white/10" : "bg-background/90"}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/" className="flex items-center gap-2 min-w-0">
            <img src={logo} alt="Freedom Interventions" className={`h-10 md:h-12 w-auto border rounded-lg flex-shrink-0 ${dark ? "border-[#d5ad55]/80" : "mix-blend-multiply border-foreground"}`} width={266} height={295} />
            <span className={`font-serif text-base sm:text-xl md:text-2xl font-semibold truncate ${dark ? "text-white" : "text-primary"}`}>Freedom Interventions</span>
          </a>

          <div className={dark ? "hidden min-[1200px]:flex items-center gap-6" : "hidden md:flex items-center gap-6"}>
            <Link to="/" className={desktopLinkClass}>Home</Link>
            <Link to="/start-here" className={desktopLinkClass}>Start Here</Link>
            <Dropdown label="Services" items={servicesLinks} dark={dark} />
            <Link to="/family-intervention#process" className={desktopLinkClass}>How It Works</Link>
            <Link to="/interventionist" className={desktopLinkClass}>About Matt</Link>
            <Dropdown label="Resources" items={resourceLinks} dark={dark} />
            {!dark && <Link to="/assessment" className={desktopLinkClass}>Assessment</Link>}
            {!dark && <Link to="/contact" className={desktopLinkClass}>Contact</Link>}
            <TrackedPhoneLink phoneNumber="+14582988000" metadata={{ location: "navbar_desktop" }}>
              <Button variant="hero" size="default" className={dark ? "bg-white text-[#071c3e] hover:bg-slate-100" : undefined}>
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </TrackedPhoneLink>
          </div>

          <button className={`${dark ? "min-[1200px]:hidden" : "md:hidden"} p-2 ${dark ? "text-white" : "text-foreground"}`} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className={`${dark ? "min-[1200px]:hidden" : "md:hidden"} py-4 border-t border-border/50 animate-fade-up space-y-3`}>
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
            <a href="https://soberhelpline.com/monday-zoom-registration" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2 flex items-center gap-2 px-4" onClick={() => setIsOpen(false)}>
              <img src={soberHelplineLogo} alt="Sober Helpline" className="h-6 w-auto" />
              <span>Free Weekly Family Support</span>
            </a>
            <a
              href="https://apps.apple.com/app/id6744403069"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 text-foreground font-medium"
              onClick={() => setIsOpen(false)}
            >
              <div>
                <div className="text-sm font-semibold">FamilyBridge</div>
                <div className="text-xs text-muted-foreground">AI support for families</div>
              </div>
              <div className="ml-auto">
                <AppStoreBadge height={28} />
              </div>
            </a>
            <a href="/party-wreckers-podcast" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2 flex items-center gap-2 px-4" onClick={() => setIsOpen(false)}>
              <img src={partyWreckersLogo} alt="The Party Wreckers Podcast" className="h-6 w-auto" width={1024} height={1024} />
              <span className="font-lobster">The Party Wreckers Podcast</span>
            </a>
            <TrackedPhoneLink phoneNumber="+14582988000" metadata={{ location: "navbar_mobile" }}>
              <Button variant="hero" size="default" className="mt-2 w-full">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </TrackedPhoneLink>
          </div>
        )}
      </div>

      {!dark && (
        <div className="border-t border-border/50 hidden md:block">
          <div className="container mx-auto px-6 py-1 flex justify-between items-center">
            <a href="https://soberhelpline.com/monday-zoom-registration" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <img src={soberHelplineLogo} alt="Sober Helpline" className="h-8 md:h-10 w-auto" />
              <span className="text-muted-foreground">Free Weekly Family Support Meetings</span>
            </a>
            <AppStoreBadge height={30} />
            <a href="/party-wreckers-podcast" className="inline-flex items-center gap-2">
              <img src={partyWreckersLogo} alt="The Party Wreckers Podcast" className="h-8 md:h-10 w-auto" width={1024} height={1024} />
              <span className="font-lobster text-sm md:text-base text-foreground">The Party Wreckers Podcast</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
