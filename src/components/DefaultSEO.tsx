import { useLocation } from "react-router-dom";
import SEOHead from "./SEOHead";

const BASE_URL = "https://freedominterventions.com";

// Static route metadata
const staticRouteMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Professional Addiction Interventionist | Freedom Interventions",
    description: "Matt Brown has 20+ years experience helping families through professional addiction interventions. Free consultation: (541) 838-6009. Nationwide service.",
  },
  "/contact": {
    title: "Contact Freedom Interventions | Free Addiction Intervention Consultation",
    description: "Schedule a free, confidential consultation with Matt Brown. Professional addiction intervention services available nationwide. Call (541) 838-6009.",
  },
  "/testimonials": {
    title: "Intervention Success Stories & Testimonials | Freedom Interventions",
    description: "Read real stories from families who found hope through professional addiction intervention. Over 1000 families helped with 90%+ success rate.",
  },
  "/assessment": {
    title: "Free Addiction Assessment | Freedom Interventions",
    description: "Complete a confidential addiction assessment to help our team understand your situation. Professional guidance from an experienced interventionist.",
  },
  "/self-assessment": {
    title: "Addiction Self-Assessment Tool | Freedom Interventions",
    description: "Take a free, confidential self-assessment to evaluate substance use concerns. Get immediate feedback and professional guidance. Call (541) 838-6009.",
  },
  "/intervention-faq": {
    title: "Intervention FAQ — Common Questions Answered | Freedom Interventions",
    description: "Answers to common questions about addiction interventions: cost, success rates, process, and what to expect. Free consultation: (541) 838-6009.",
  },
  "/interventionist": {
    title: "About Matt Brown — Professional Interventionist | Freedom Interventions",
    description: "Matt Brown is a professional interventionist with 20+ years experience and 22 years of personal recovery. Over 1,000 interventions conducted nationwide.",
  },
  "/substance-guide": {
    title: "Substance Guide — Drug & Alcohol Information | Freedom Interventions",
    description: "Comprehensive guide to substances of abuse including alcohol, opioids, fentanyl, methamphetamine, and more. Learn the signs and risks.",
  },
  "/family-intervention": {
    title: "Family Intervention Services | Freedom Interventions",
    description: "Professional family intervention services to help your loved one accept treatment. Compassionate, structured approach with 90%+ success rate.",
  },
  "/crisis-support": {
    title: "Crisis Support — Immediate Addiction Help | Freedom Interventions",
    description: "24/7 crisis support for families dealing with addiction emergencies. Immediate professional guidance available. Call (541) 838-6009 now.",
  },
  "/aftercare-guidance": {
    title: "Aftercare Guidance — Post-Treatment Support | Freedom Interventions",
    description: "Post-treatment aftercare guidance for lasting recovery. Sober living, support groups, and family recovery resources. Call (541) 838-6009.",
  },
  "/treatment-planning": {
    title: "Treatment Planning — Finding the Right Program | Freedom Interventions",
    description: "Expert treatment planning to find the right rehab program. Detox, inpatient, outpatient, and sober living placement. Free consultation available.",
  },
  "/intervention-toolkit": {
    title: "Family Intervention Toolkit — Free Resources | Freedom Interventions",
    description: "Free intervention toolkit with guides, checklists, and resources for families preparing for an addiction intervention. Download now.",
  },
  "/service-areas": {
    title: "Service Areas — Nationwide Intervention Services | Freedom Interventions",
    description: "Professional addiction intervention services in all 50 US states and Canadian provinces. Find local intervention help. Call (541) 838-6009.",
  },
  "/party-wreckers-podcast": {
    title: "The Party Wreckers Podcast | Freedom Interventions",
    description: "Listen to The Party Wreckers Podcast — real conversations about addiction, recovery, and intervention with Matt Brown and guests.",
  },
  "/blog": {
    title: "Addiction Intervention Blog — Expert Insights | Freedom Interventions",
    description: "Expert articles on addiction intervention, family education, recovery support, and substance abuse. Written by interventionist Matt Brown.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Freedom Interventions",
    description: "Freedom Interventions privacy policy covering data collection, usage, cookies, third-party services, and your rights.",
  },
  "/terms-of-service": {
    title: "Terms of Service | Freedom Interventions",
    description: "Terms of service for Freedom Interventions website and professional addiction intervention services.",
  },
  "/hipaa-compliance": {
    title: "HIPAA Compliance | Freedom Interventions",
    description: "Learn about Freedom Interventions' commitment to HIPAA compliance and protecting your health information privacy.",
  },
};

// US states list for pattern matching
const usStates: Record<string, string> = {
  "alabama": "Alabama", "alaska": "Alaska", "arizona": "Arizona", "arkansas": "Arkansas",
  "california": "California", "colorado": "Colorado", "connecticut": "Connecticut", "delaware": "Delaware",
  "florida": "Florida", "georgia": "Georgia", "hawaii": "Hawaii", "idaho": "Idaho",
  "illinois": "Illinois", "indiana": "Indiana", "iowa": "Iowa", "kansas": "Kansas",
  "kentucky": "Kentucky", "louisiana": "Louisiana", "maine": "Maine", "maryland": "Maryland",
  "massachusetts": "Massachusetts", "michigan": "Michigan", "minnesota": "Minnesota", "mississippi": "Mississippi",
  "missouri": "Missouri", "montana": "Montana", "nebraska": "Nebraska", "nevada": "Nevada",
  "new-hampshire": "New Hampshire", "new-jersey": "New Jersey", "new-mexico": "New Mexico", "new-york": "New York",
  "north-carolina": "North Carolina", "north-dakota": "North Dakota", "ohio": "Ohio", "oklahoma": "Oklahoma",
  "oregon": "Oregon", "pennsylvania": "Pennsylvania", "rhode-island": "Rhode Island",
  "south-carolina": "South Carolina", "south-dakota": "South Dakota", "tennessee": "Tennessee",
  "texas": "Texas", "utah": "Utah", "vermont": "Vermont", "virginia": "Virginia",
  "washington": "Washington", "west-virginia": "West Virginia", "wisconsin": "Wisconsin", "wyoming": "Wyoming",
};

// Canadian provinces
const canadianProvinces: Record<string, string> = {
  "british-columbia": "British Columbia", "alberta": "Alberta", "ontario": "Ontario",
  "quebec": "Quebec", "manitoba": "Manitoba", "saskatchewan": "Saskatchewan",
  "nova-scotia": "Nova Scotia", "new-brunswick": "New Brunswick",
  "newfoundland-labrador": "Newfoundland & Labrador", "prince-edward-island": "Prince Edward Island",
};

// City pages mapping: slug -> { city, state }
const cityPages: Record<string, { city: string; state: string }> = {
  "portland-oregon": { city: "Portland", state: "Oregon" },
  "seattle-washington": { city: "Seattle", state: "Washington" },
  "eugene-oregon": { city: "Eugene", state: "Oregon" },
  "san-francisco-california": { city: "San Francisco", state: "California" },
  "los-angeles-california": { city: "Los Angeles", state: "California" },
  "phoenix-arizona": { city: "Phoenix", state: "Arizona" },
  "austin-texas": { city: "Austin", state: "Texas" },
  "dallas-texas": { city: "Dallas", state: "Texas" },
  "las-vegas-nevada": { city: "Las Vegas", state: "Nevada" },
  "salt-lake-city-utah": { city: "Salt Lake City", state: "Utah" },
  "boise-idaho": { city: "Boise", state: "Idaho" },
  "denver-colorado": { city: "Denver", state: "Colorado" },
  "chicago-illinois": { city: "Chicago", state: "Illinois" },
  "minneapolis-minnesota": { city: "Minneapolis", state: "Minnesota" },
  "kansas-city-missouri": { city: "Kansas City", state: "Missouri" },
  "houston-texas": { city: "Houston", state: "Texas" },
  "new-orleans-louisiana": { city: "New Orleans", state: "Louisiana" },
  "detroit-michigan": { city: "Detroit", state: "Michigan" },
  "miami-florida": { city: "Miami", state: "Florida" },
  "nashville-tennessee": { city: "Nashville", state: "Tennessee" },
  "indianapolis-indiana": { city: "Indianapolis", state: "Indiana" },
  "spokane-washington": { city: "Spokane", state: "Washington" },
  "bend-oregon": { city: "Bend", state: "Oregon" },
  "philadelphia-pennsylvania": { city: "Philadelphia", state: "Pennsylvania" },
  "baltimore-maryland": { city: "Baltimore", state: "Maryland" },
  "anchorage-alaska": { city: "Anchorage", state: "Alaska" },
  "knoxville-tennessee": { city: "Knoxville", state: "Tennessee" },
  "columbus-ohio": { city: "Columbus", state: "Ohio" },
  "omaha-nebraska": { city: "Omaha", state: "Nebraska" },
  "oklahoma-city-oklahoma": { city: "Oklahoma City", state: "Oklahoma" },
};

function getRouteMetadata(pathname: string): { title: string; description: string } | null {
  // Check static routes first
  if (staticRouteMetadata[pathname]) {
    return staticRouteMetadata[pathname];
  }

  const slug = pathname.replace(/^\//, "");

  // Check city pages
  if (cityPages[slug]) {
    const { city, state } = cityPages[slug];
    return {
      title: `Drug & Alcohol Interventionist in ${city}, ${state} | Freedom Interventions`,
      description: `Need an addiction interventionist in ${city}? Matt Brown provides professional intervention services with 20+ years experience. Call (541) 838-6009.`,
    };
  }

  // Check US states
  if (usStates[slug]) {
    const stateName = usStates[slug];
    return {
      title: `Addiction Intervention Services in ${stateName} | Freedom Interventions`,
      description: `Professional drug & alcohol intervention services in ${stateName}. Over 20 years experience, 90%+ success rate. Free consultation: (541) 838-6009.`,
    };
  }

  // Check Canadian provinces
  if (canadianProvinces[slug]) {
    const provinceName = canadianProvinces[slug];
    return {
      title: `Addiction Intervention Services in ${provinceName} | Freedom Interventions`,
      description: `Professional addiction intervention services in ${provinceName}, Canada. Over 20 years experience helping families. Free consultation: (541) 838-6009.`,
    };
  }

  // Skip blog routes (BlogPost.tsx handles its own SEO)
  if (pathname.startsWith("/blog/")) {
    return null;
  }

  // Fallback for unknown routes
  const formatted = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  
  if (formatted) {
    return {
      title: `${formatted} | Freedom Interventions`,
      description: `Professional addiction intervention services. Over 20 years experience helping families. Free consultation: (541) 838-6009.`,
    };
  }

  return null;
}

/**
 * DefaultSEO provides route-based fallback metadata for pages that don't
 * include their own SEOHead. Pages with their own SEOHead will override
 * these defaults via react-helmet's last-rendered-wins behavior.
 */
const DefaultSEO = () => {
  const location = useLocation();
  const metadata = getRouteMetadata(location.pathname);

  if (!metadata) return null;

  return (
    <SEOHead
      title={metadata.title}
      description={metadata.description}
    />
  );
};

export default DefaultSEO;
