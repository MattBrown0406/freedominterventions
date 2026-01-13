import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { usStates, usCities, canadianProvinces, getCitiesByState } from "@/data/locations";

interface LocationLinksProps {
  currentLocation: string;
  locationType: "state" | "city" | "province";
  parentState?: string; // For city pages, the parent state name
}

// Define neighboring states for internal linking
const neighboringStates: Record<string, string[]> = {
  "Oregon": ["Washington", "California", "Idaho", "Nevada"],
  "Washington": ["Oregon", "Idaho", "Montana"],
  "California": ["Oregon", "Nevada", "Arizona"],
  "Idaho": ["Oregon", "Washington", "Montana", "Wyoming", "Utah", "Nevada"],
  "Nevada": ["California", "Oregon", "Idaho", "Utah", "Arizona"],
  "Arizona": ["California", "Nevada", "Utah", "Colorado", "New Mexico"],
  "Utah": ["Idaho", "Wyoming", "Colorado", "Arizona", "Nevada", "New Mexico"],
  "Colorado": ["Wyoming", "Nebraska", "Kansas", "Oklahoma", "New Mexico", "Arizona", "Utah"],
  "Texas": ["New Mexico", "Oklahoma", "Arkansas", "Louisiana"],
  "Florida": ["Georgia", "Alabama"],
  "New York": ["Pennsylvania", "New Jersey", "Connecticut", "Massachusetts", "Vermont"],
  "Pennsylvania": ["New York", "New Jersey", "Delaware", "Maryland", "West Virginia", "Ohio"],
  "Illinois": ["Wisconsin", "Iowa", "Missouri", "Kentucky", "Indiana"],
  "Ohio": ["Pennsylvania", "West Virginia", "Kentucky", "Indiana", "Michigan"],
  "Michigan": ["Ohio", "Indiana", "Wisconsin"],
  "Georgia": ["Florida", "Alabama", "Tennessee", "North Carolina", "South Carolina"],
  "Tennessee": ["Kentucky", "Virginia", "North Carolina", "Georgia", "Alabama", "Mississippi", "Arkansas", "Missouri"],
  "Alaska": ["Washington"], // By proximity
  "Hawaii": ["California"], // By proximity
  "Montana": ["North Dakota", "South Dakota", "Wyoming", "Idaho", "Washington"],
  "Wyoming": ["Montana", "South Dakota", "Nebraska", "Colorado", "Utah", "Idaho"],
  "New Mexico": ["Arizona", "Utah", "Colorado", "Oklahoma", "Texas"],
  "Minnesota": ["Wisconsin", "Iowa", "South Dakota", "North Dakota"],
  "Wisconsin": ["Minnesota", "Iowa", "Illinois", "Michigan"],
  "Iowa": ["Minnesota", "Wisconsin", "Illinois", "Missouri", "Nebraska", "South Dakota"],
  "Missouri": ["Iowa", "Illinois", "Kentucky", "Tennessee", "Arkansas", "Oklahoma", "Kansas", "Nebraska"],
  "Kansas": ["Nebraska", "Missouri", "Oklahoma", "Colorado"],
  "Nebraska": ["South Dakota", "Iowa", "Missouri", "Kansas", "Colorado", "Wyoming"],
  "Oklahoma": ["Kansas", "Missouri", "Arkansas", "Texas", "New Mexico", "Colorado"],
  "Arkansas": ["Missouri", "Tennessee", "Mississippi", "Louisiana", "Texas", "Oklahoma"],
  "Louisiana": ["Arkansas", "Mississippi", "Texas"],
  "Mississippi": ["Tennessee", "Alabama", "Louisiana", "Arkansas"],
  "Alabama": ["Tennessee", "Georgia", "Florida", "Mississippi"],
  "Kentucky": ["Indiana", "Ohio", "West Virginia", "Virginia", "Tennessee", "Missouri", "Illinois"],
  "Indiana": ["Michigan", "Ohio", "Kentucky", "Illinois"],
  "Virginia": ["Maryland", "West Virginia", "Kentucky", "Tennessee", "North Carolina"],
  "West Virginia": ["Pennsylvania", "Maryland", "Virginia", "Kentucky", "Ohio"],
  "North Carolina": ["Virginia", "Tennessee", "Georgia", "South Carolina"],
  "South Carolina": ["North Carolina", "Georgia"],
  "Maryland": ["Pennsylvania", "Delaware", "Virginia", "West Virginia"],
  "Delaware": ["Pennsylvania", "New Jersey", "Maryland"],
  "New Jersey": ["New York", "Pennsylvania", "Delaware"],
  "Connecticut": ["New York", "Massachusetts", "Rhode Island"],
  "Massachusetts": ["New York", "Connecticut", "Rhode Island", "New Hampshire", "Vermont"],
  "Rhode Island": ["Connecticut", "Massachusetts"],
  "Vermont": ["New York", "Massachusetts", "New Hampshire"],
  "New Hampshire": ["Vermont", "Massachusetts", "Maine"],
  "Maine": ["New Hampshire"],
  "North Dakota": ["Montana", "South Dakota", "Minnesota"],
  "South Dakota": ["North Dakota", "Montana", "Wyoming", "Nebraska", "Iowa", "Minnesota"],
};

// Canadian province neighbors
const neighboringProvinces: Record<string, string[]> = {
  "British Columbia": ["Alberta"],
  "Alberta": ["British Columbia", "Saskatchewan"],
  "Saskatchewan": ["Alberta", "Manitoba"],
  "Manitoba": ["Saskatchewan", "Ontario"],
  "Ontario": ["Manitoba", "Quebec"],
  "Quebec": ["Ontario", "New Brunswick", "Newfoundland and Labrador"],
  "New Brunswick": ["Quebec", "Nova Scotia", "Prince Edward Island"],
  "Nova Scotia": ["New Brunswick", "Prince Edward Island"],
  "Prince Edward Island": ["New Brunswick", "Nova Scotia"],
  "Newfoundland and Labrador": ["Quebec"],
};

const LocationLinks = ({ currentLocation, locationType, parentState }: LocationLinksProps) => {
  // Get cities in this state (for state pages)
  const citiesInState = locationType === "state" ? getCitiesByState(currentLocation) : [];
  
  // Get neighboring states/provinces
  const neighbors = locationType === "province" 
    ? (neighboringProvinces[currentLocation] || [])
    : (neighboringStates[currentLocation] || neighboringStates[parentState || ""] || []);
  
  // Get parent state info for city pages
  const parentStateData = parentState 
    ? usStates.find(s => s.name === parentState)
    : null;
  
  // Get nearby cities for city pages (other cities in same state)
  const nearbyCities = locationType === "city" && parentState
    ? getCitiesByState(parentState).filter(c => c.name !== currentLocation)
    : [];

  // Get neighboring state data
  const neighboringStateData = neighbors
    .map(name => usStates.find(s => s.name === name) || canadianProvinces.find(p => p.name === name))
    .filter(Boolean);

  if (citiesInState.length === 0 && neighboringStateData.length === 0 && !parentStateData && nearbyCities.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              {locationType === "city" ? "More Locations" : "Explore Nearby Service Areas"}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* For State Pages: Cities in this state */}
            {locationType === "state" && citiesInState.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Cities in {currentLocation}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {citiesInState.map(city => (
                    <Link
                      key={city.slug}
                      to={`/${city.slug}`}
                      className="inline-flex items-center gap-1 px-3 py-2 bg-background border border-border rounded-lg hover:border-primary hover:text-primary transition-colors text-sm"
                    >
                      {city.name}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* For City Pages: Parent State */}
            {locationType === "city" && parentStateData && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Statewide Services
                </h3>
                <Link
                  to={`/${parentStateData.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">{parentState} Intervention Services</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Link>
              </div>
            )}

            {/* For City Pages: Other Cities in Same State */}
            {locationType === "city" && nearbyCities.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Other {parentState} Cities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {nearbyCities.map(city => (
                    <Link
                      key={city.slug}
                      to={`/${city.slug}`}
                      className="inline-flex items-center gap-1 px-3 py-2 bg-background border border-border rounded-lg hover:border-primary hover:text-primary transition-colors text-sm"
                    >
                      {city.name}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Neighboring States/Provinces */}
            {neighboringStateData.length > 0 && (
              <div className={locationType === "city" && nearbyCities.length > 0 ? "md:col-span-2" : ""}>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {locationType === "province" ? "Neighboring Provinces" : "Neighboring States"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {neighboringStateData.map(location => (
                    <Link
                      key={location?.slug}
                      to={`/${location?.slug}`}
                      className="inline-flex items-center gap-1 px-3 py-2 bg-background border border-border rounded-lg hover:border-primary hover:text-primary transition-colors text-sm"
                    >
                      {location?.name}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Service Areas Hub Link */}
          <div className="mt-8 pt-6 border-t border-border">
            <Link
              to="/service-areas"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              <MapPin className="w-4 h-4" />
              View All Service Areas Across the US & Canada
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationLinks;
