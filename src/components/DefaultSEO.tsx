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
  "/start-here": {
    title: "Start Here | Addiction Intervention Help for Families",
    description: "Not sure what your family needs next? Choose a clear path to a call, free consultation, crisis coaching, or intervention readiness support.",
  },
  "/testimonials": {
    title: "Intervention Success Stories & Testimonials | Freedom Interventions",
    description: "Real stories from families who found hope through professional intervention. Read testimonials from families Matt Brown has helped over 20+ years.",
  },
  "/assessment": {
    title: "Free Addiction Assessment | Freedom Interventions",
    description: "Take our free addiction assessment to understand your situation. Confidential, no obligation. Get personalized guidance for your family's next steps.",
  },
  "/self-assessment": {
    title: "Addiction Self-Assessment Tool | Freedom Interventions",
    description: "Confidential self-assessment for substance use. Answer honestly, get clarity on where you stand, and explore next steps.",
  },
  "/intervention-faq": {
    title: "Intervention FAQ — Common Questions Answered | Freedom Interventions",
    description: "Common questions about addiction intervention answered. What to expect, how it works, outcomes, costs, and how to get started.",
  },
  "/intervention-answers": {
    title: "Addiction Intervention Answers for Families | Freedom Interventions",
    description: "Clear answers for families deciding whether addiction has become intervention-level, what to do first, and when to call Freedom Interventions.",
  },
  "/interventionist": {
    title: "About Matt Brown — Professional Interventionist | Freedom Interventions",
    description: "Meet Matt Brown — professional interventionist with 20+ years experience, 22 years of personal recovery, and over 1,000 interventions conducted.",
  },
  "/substance-guide": {
    title: "Substance Guide — Drug & Alcohol Information | Freedom Interventions",
    description: "Comprehensive guide to substances of abuse: alcohol, opioids, methamphetamine, cocaine, benzodiazepines, and more. What families need to know.",
  },
  "/family-intervention": {
    title: "Family Intervention Services | Help a Loved One Accept Treatment",
    description: "Family intervention services led by Matt Brown. Plan a drug or alcohol intervention, treatment entry, and family boundaries. Call (541) 838-6009.",
  },
  "/minneapolis-minnesota": {
    title: "Minneapolis Professional Interventionist | Drug & Alcohol Intervention Help",
    description: "Need professional interventions in Minneapolis? Matt Brown helps Twin Cities families plan drug, alcohol, and fentanyl interventions. Call (541) 838-6009.",
  },
  "/boise-idaho": {
    title: "Drug Intervention in Boise, Idaho | Professional Family Intervention Help",
    description: "Need a drug intervention in Boise? Matt Brown helps Treasure Valley families plan treatment entry, boundaries, and next steps. Call (541) 838-6009.",
  },
  "/oregon": {
    title: "Oregon Interventionist for Drug & Alcohol Addiction | Freedom Interventions",
    description: "Need an Oregon interventionist? Matt Brown helps families plan drug, alcohol, and fentanyl interventions with treatment entry. Call (541) 838-6009.",
  },
  "/washington": {
    title: "Drug Interventionist in Washington | Family Intervention Help",
    description: "Need a drug interventionist in Washington? Matt Brown helps families plan intervention, treatment entry, and boundaries. Call (541) 838-6009.",
  },
  "/north-carolina": {
    title: "Professional Interventionist in North Carolina | Drug & Alcohol Help",
    description: "Need a professional interventionist in North Carolina? Matt Brown helps families plan drug, alcohol, and fentanyl interventions. Call (541) 838-6009.",
  },
  "/south-dakota": {
    title: "Professional Interventionist in South Dakota | Drug & Alcohol Help",
    description: "Need a professional interventionist in South Dakota? Matt Brown helps families plan drug, alcohol, meth, and fentanyl interventions. Call (541) 838-6009.",
  },
  "/iowa": {
    title: "Drug Intervention in Iowa | Professional Interventionist for Families",
    description: "Need a drug intervention in Iowa? Matt Brown helps families plan treatment entry, boundaries, and intervention next steps. Call (541) 838-6009.",
  },
  "/louisiana": {
    title: "Drug Intervention in Louisiana | Family Intervention Help",
    description: "Need a drug intervention in Louisiana? Matt Brown helps families plan treatment entry, boundaries, and next steps. Call (541) 838-6009.",
  },
  "/fort-worth-texas": {
    title: "Fentanyl Intervention Help in Fort Worth | Treatment Planning Support",
    description: "Fort Worth fentanyl intervention and treatment planning help for families. Matt Brown helps move loved ones toward care. Call (541) 838-6009.",
  },
  "/crisis-support": {
    title: "Crisis Support — Immediate Addiction Help | Freedom Interventions",
    description: "In crisis right now? Immediate resources and guidance for families facing an addiction emergency. You're not alone — help is available.",
  },
  "/aftercare-guidance": {
    title: "Aftercare Guidance — Post-Treatment Support | Freedom Interventions",
    description: "Treatment is just the beginning. Aftercare guidance for families: what to expect, how to support recovery, and how to protect your own wellbeing.",
  },
  "/treatment-planning": {
    title: "Treatment Planning — Finding the Right Program | Freedom Interventions",
    description: "Navigate the treatment process with confidence. How to find the right program, what to look for, and how to plan for your loved one's recovery.",
  },
  "/intervention-toolkit": {
    title: "Family Intervention Toolkit — Free Resources | Freedom Interventions",
    description: "Free intervention toolkit for families. Resources, worksheets, and guidance to help you prepare for a conversation about addiction.",
  },
  "/service-areas": {
    title: "Service Areas — Nationwide Intervention Services | Freedom Interventions",
    description: "Freedom Interventions serves all 50 states and Canada. Professional addiction intervention services available wherever your family needs help.",
  },
  "/party-wreckers-podcast": {
    title: "The Party Wreckers Podcast | Freedom Interventions",
    description: "The Party Wreckers Podcast — real conversations about addiction, intervention, and recovery with host Matt Brown.",
  },
  "/blog": {
    title: "Addiction Intervention Blog — Expert Insights | Freedom Interventions",
    description: "Expert articles on addiction intervention, family education, recovery support, and substance abuse. Written by interventionist Matt Brown.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Freedom Interventions",
    description: "Freedom Interventions privacy policy covering data collection, usage, cookies, third-party services, and your rights.",
  },
  "/terms": {
    title: "Terms and SMS Policy | Freedom Interventions",
    description: "Terms, service disclaimers, and SMS messaging policy for requested Freedom Interventions follow-up texts and booking links.",
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
      description: `Professional drug & alcohol intervention services in ${stateName}. Over 20 years experience helping families build clear treatment plans. Free consultation: (541) 838-6009.`,
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
