import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import partyWreckersLogo from "@/assets/party-wreckers-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Interventionist", href: "/interventionist" },
    { name: "About", href: "/#about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo and text */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-start">
              <a href="/" className="flex items-center gap-2">
                <img src={logo} alt="Freedom Interventions" className="h-10 md:h-12 w-auto mix-blend-multiply border-2 border-foreground rounded-lg" />
                <span className="font-serif text-xl md:text-2xl font-semibold text-primary">
                  Freedom Interventions
                </span>
              </a>
              <div className="w-full border-t border-border/50 my-1"></div>
              <a href="/party-wreckers-podcast" className="flex items-center">
                <img src={partyWreckersLogo} alt="The Party Wreckers Podcast" className="h-6 md:h-8 w-auto" />
              </a>
            </div>
          </div>

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
            <a href="tel:+15038362136">
              <Button variant="hero" size="default">
                <Phone className="w-4 h-4 mr-2" />
                Get Help Now
              </Button>
            </a>
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
              <a href="tel:+15038362136">
                <Button variant="hero" size="default" className="mt-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Get Help Now
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
