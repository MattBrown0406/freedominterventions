import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Phone, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { ItemListSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  usStates,
  usCities,
  canadianProvinces,
  usRegions,
  getStatesByRegion,
  getCitiesByState,
} from "@/data/locations";

const ServiceAreas = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRegions, setExpandedRegions] = useState<string[]>(Object.keys(usRegions));

  const toggleRegion = (region: string) => {
    setExpandedRegions(prev =>
      prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  const filteredStates = usStates.filter(state =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCities = usCities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProvinces = canadianProvinces.filter(province =>
    province.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasResults = filteredStates.length > 0 || filteredCities.length > 0 || filteredProvinces.length > 0;

  // Generate item list for schema
  const allLocations = [
    ...usStates.map(state => ({
      name: `${state.name} Intervention Services`,
      url: `https://freedominterventions.com/${state.slug}`,
    })),
    ...usCities.map(city => ({
      name: `${city.name}, ${city.stateAbbr} Intervention Services`,
      url: `https://freedominterventions.com/${city.slug}`,
    })),
    ...canadianProvinces.map(province => ({
      name: `${province.name} Intervention Services`,
      url: `https://freedominterventions.com/${province.slug}`,
    })),
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services Across the US & Canada | Freedom Interventions"
        description="Professional addiction intervention services available nationwide. Find intervention help in all 50 US states and Canadian provinces. 24/7 crisis support available."
        canonical="https://freedominterventions.com/service-areas"
        keywords="nationwide intervention services, addiction intervention near me, US intervention services, Canada intervention services, drug intervention all states, professional interventionist"
      />
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
        ]}
      />
      <ItemListSchema
        name="Freedom Interventions Service Areas"
        description="Professional addiction intervention services across the United States and Canada"
        items={allLocations}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Serving All 50 States & Canada
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
              Addiction Intervention Services Across North America
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              No matter where you are, help is available. Freedom Interventions provides
              professional addiction intervention services throughout the United States
              and Canada. Find your local service area below.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+14582988000">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: (541) 668-8084
                </Button>
              </a>
              <Link to="/assessment">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Schedule Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by state, city, or province..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {searchQuery && !hasResults ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">
                No locations found matching "{searchQuery}"
              </p>
              <p className="text-muted-foreground">
                Don't see your area? We serve all of North America.{" "}
                <a href="tel:+14582988000" className="text-primary hover:underline">
                  Call us directly
                </a>{" "}
                for assistance.
              </p>
            </div>
          ) : (
            <>
              {/* United States Section */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8 text-center">
                  United States
                </h2>

                {/* Regions */}
                <div className="space-y-6">
                  {Object.entries(usRegions).map(([region, stateNames]) => {
                    const regionStates = getStatesByRegion(region).filter(state =>
                      searchQuery ? filteredStates.some(fs => fs.slug === state.slug) : true
                    );

                    if (regionStates.length === 0) return null;

                    const isExpanded = expandedRegions.includes(region);

                    return (
                      <div key={region} className="border border-border rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleRegion(region)}
                          className="w-full flex items-center justify-between p-6 bg-card hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-primary" />
                            <h3 className="text-xl font-semibold text-foreground">{region}</h3>
                            <span className="text-sm text-muted-foreground">
                              ({regionStates.length} states)
                            </span>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="p-6 bg-background border-t border-border">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                              {regionStates.map(state => {
                                const stateCities = getCitiesByState(state.name).filter(city =>
                                  searchQuery ? filteredCities.some(fc => fc.slug === city.slug) : true
                                );

                                return (
                                  <div key={state.slug} className="space-y-2">
                                    <Link
                                      to={`/${state.slug}`}
                                      className="block font-medium text-foreground hover:text-primary transition-colors"
                                    >
                                      {state.name}
                                    </Link>
                                    {stateCities.length > 0 && (
                                      <div className="pl-3 border-l-2 border-primary/20 space-y-1">
                                        {stateCities.map(city => (
                                          <Link
                                            key={city.slug}
                                            to={`/${city.slug}`}
                                            className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                                          >
                                            {city.name}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Canada Section */}
              {(searchQuery ? filteredProvinces.length > 0 : true) && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8 text-center">
                    Canada
                  </h2>

                  <div className="border border-border rounded-xl p-6 bg-card">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {(searchQuery ? filteredProvinces : canadianProvinces).map(province => (
                        <Link
                          key={province.slug}
                          to={`/${province.slug}`}
                          className="flex items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors"
                        >
                          <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="font-medium text-foreground">{province.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Can't Find Your Area?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We serve all of North America and can travel to any location for intervention services.
              Contact us directly and we'll help you no matter where you are.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+14582988000">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  (541) 668-8084
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Contact Us Online
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50</div>
              <div className="text-muted-foreground">US States Served</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">30+</div>
              <div className="text-muted-foreground">Major Cities</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10</div>
              <div className="text-muted-foreground">Canadian Provinces</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Crisis Support</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceAreas;
