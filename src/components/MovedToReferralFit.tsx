import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = { name: string; target: string };

// ReferralFit's privacy policy and terms moved to referralfit.com on
// 2026-11-08 (referralfit.com is now the only published copy). These routes
// stay so old links keep working: earlier app versions and the App Store
// listing point here. People are sent on to referralfit.com; the build's
// prerender (Playwright sets navigator.webdriver) and crawlers get this page
// with noindex and a link instead.
const MovedToReferralFit = ({ name, target }: Props) => {
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.webdriver) return;
    window.location.replace(target);
  }, [target]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pt-24 md:pt-32">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">
              The {name} has moved
            </h1>
            <p className="text-lg text-muted-foreground">
              It is now at{" "}
              <a href={target} className="text-primary underline">
                {target.replace(/^https:\/\//, "")}
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MovedToReferralFit;
