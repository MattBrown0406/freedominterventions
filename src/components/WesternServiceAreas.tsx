import { Link } from "react-router-dom";
import { usStates, usCities } from "@/data/locations";

// Existing service-area pages only; do not imply a local office.
const states = ["Oregon", "Washington", "Idaho", "California", "Nevada", "Arizona", "Utah"];
const featuredCitySlugs = new Set(["portland-oregon", "bend-oregon", "spokane-washington", "boise-idaho"]);
const linkClass = "text-primary underline underline-offset-4 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const WesternServiceAreas = () => (
  <section aria-labelledby="western-service-areas" className="py-12 border-t border-border bg-muted/30">
    <div className="container mx-auto px-6 max-w-5xl">
      <h2 id="western-service-areas" className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
        Explore Intervention Service Areas in the Western US
      </h2>
      <p className="text-muted-foreground mb-6">
        Looking for information for your family’s location? Explore the state and city service-area pages below.
      </p>
      <nav aria-label="Western US intervention service areas">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {states.map(name => {
            const state = usStates.find(item => item.name === name)!;
            const cities = usCities.filter(city => city.state === name && featuredCitySlugs.has(city.slug));
            return (
              <li key={state.slug}>
                <Link to={`/${state.slug}`} className={`${linkClass} font-semibold`}>{state.name} intervention services</Link>
                {cities.length > 0 && (
                  <ul className="mt-3 space-y-3">
                    {cities.map(city => (
                      <li key={city.slug}><Link to={`/${city.slug}`} className={linkClass}>{city.name} intervention services</Link></li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-8"><Link to="/service-areas" className={linkClass}>View all US and Canada service areas</Link></p>
      </nav>
    </div>
  </section>
);

export default WesternServiceAreas;
