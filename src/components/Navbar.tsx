import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import partyWreckersLogo from "@/assets/party-wreckers-logo.png";
import TrackedPhoneLink from "./TrackedPhoneLink";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Interventionist", href: "/interventionist" },
    { name: "Assessment", href: "/assessment" },
    { name: "Blog", href: "/blog" },
    { name: "Testimonials", href: "/testimonials" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and text */}
          <a href="/" className="flex items-center gap-2 min-w-0">
            <img src={logo} alt="Freedom Interventions" className="h-10 md:h-12 w-auto mix-blend-multiply border-2 border-foreground rounded-lg flex-shrink-0" />
            <span className="font-serif text-base sm:text-xl md:text-2xl font-semibold text-primary truncate">
              Freedom Interventions
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
            <TrackedPhoneLink phoneNumber="+15418386009" metadata={{ location: 'navbar_desktop' }}>
              <Button variant="hero" size="default">
                <Phone className="w-4 h-4 mr-2" />
                Get Help Now
              </Button>
            </TrackedPhoneLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/party-wreckers-podcast"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <img src={partyWreckersLogo} alt="The Party Wreckers Podcast" className="h-6 w-auto" />
                <span className="font-lobster">The Party Wreckers Podcast</span>
              </a>
              <TrackedPhoneLink phoneNumber="+15418386009" metadata={{ location: 'navbar_mobile' }}>
                <Button variant="hero" size="default" className="mt-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Get Help Now
                </Button>
              </TrackedPhoneLink>
            </div>
          </div>
        )}
      </div>
      
      {/* Full-width border and partner logos - hidden on mobile */}
      <div className="border-t border-border/50 hidden md:block">
        <div className="container mx-auto px-6 py-1 flex justify-between items-center">
          <a 
            href="https://soberhelpline.com/monday-zoom-registration" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            <span className="font-semibold">Sober Helpline</span>
            <span className="text-muted-foreground">— Free Weekly Family Support Meetings</span>
          </a>
          <a href="/party-wreckers-podcast" className="inline-flex items-center gap-2">
            <img src={partyWreckersLogo} alt="The Party Wreckers Podcast" className="h-8 md:h-10 w-auto" />
            <span className="font-lobster text-sm md:text-base text-foreground">
              The Party Wreckers Podcast
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
