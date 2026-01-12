import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SEOHead
        title="Page Not Found | Freedom Interventions"
        description="The page you're looking for doesn't exist. Return to our homepage or contact us for addiction intervention services."
        noindex={true}
      />
      <div className="text-center px-6">
        <h1 className="mb-4 text-6xl font-serif font-bold text-primary">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-foreground">Page Not Found</h2>
        <p className="mb-8 text-lg text-muted-foreground max-w-md mx-auto">
          The page you're looking for doesn't exist. Let us help you find what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="hero" size="lg">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>
          <a href="tel:+15038362136">
            <Button variant="outline" size="lg">
              <Phone className="mr-2 h-4 w-4" />
              Call (503) 836-2136
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
