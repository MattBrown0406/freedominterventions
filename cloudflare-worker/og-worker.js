/**
 * Cloudflare Worker for Freedom Interventions
 * 
 * This worker serves SEO helpers at the edge while passing normal users
 * through to the origin:
 * - /sitemap.xml proxies the generated sitemap
 * - search crawlers get route-specific HTML for static/location pages
 * - social crawlers get share-friendly OG HTML for /blog/* posts
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Go to https://dash.cloudflare.com and create a free account
 * 2. Add your domain (freedominterventions.com) - Cloudflare will guide you through DNS setup
 * 3. Go to Workers & Pages > Create Application > Create Worker
 * 4. Paste this code and deploy
 * 5. Go to your Worker > Settings > Triggers > Add Route
 * 6. Add route: freedominterventions.com/* (Zone: freedominterventions.com)
 * 7. That's it! Search crawlers and social shares will now see optimized HTML.
 */

// Oregon location pages metadata for search engine pre-rendering
const LOCATION_META = {
  '/oregon': {
    title: 'Addiction Intervention Specialist in Oregon | Freedom Interventions',
    description: 'Oregon families facing addiction need expert help now. Matt Brown, certified intervention specialist with 20+ years experience, serves all of Oregon. Free consultation. Call (541) 838-6009.',
    canonical: 'https://freedominterventions.com/oregon',
    city: 'Oregon',
    state: 'Oregon',
  },
  '/portland-oregon': {
    title: 'Addiction Intervention Services in Portland, Oregon | Freedom Interventions',
    description: 'Portland families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Multnomah County. Free consultation. (541) 838-6009.',
    canonical: 'https://freedominterventions.com/portland-oregon',
    city: 'Portland',
    state: 'Oregon',
  },
  '/eugene-oregon': {
    title: 'Addiction Intervention Services in Eugene, Oregon | Freedom Interventions',
    description: 'Eugene families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Lane County. Free consultation. (541) 838-6009.',
    canonical: 'https://freedominterventions.com/eugene-oregon',
    city: 'Eugene',
    state: 'Oregon',
  },
  '/bend-oregon': {
    title: 'Bend Oregon Addiction Intervention Services | Freedom Interventions',
    description: 'Professional addiction intervention services in Bend, Oregon. Help your loved one find recovery from opioid, alcohol, and methamphetamine addiction. Free consultations available.',
    canonical: 'https://freedominterventions.com/bend-oregon',
    city: 'Bend',
    state: 'Oregon',
  },
  '/salem-oregon': {
    title: 'Addiction Intervention Services in Salem, Oregon | Freedom Interventions',
    description: 'Salem families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Marion County. Free consultation. (541) 838-6009.',
    canonical: 'https://freedominterventions.com/salem-oregon',
    city: 'Salem',
    state: 'Oregon',
  },
  '/medford-oregon': {
    title: 'Addiction Intervention Services in Medford, Oregon | Freedom Interventions',
    description: 'Medford families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Jackson County. Free consultation. (541) 838-6009.',
    canonical: 'https://freedominterventions.com/medford-oregon',
    city: 'Medford',
    state: 'Oregon',
  },
  '/hillsboro-oregon': {
    title: 'Addiction Intervention Services in Hillsboro, Oregon | Freedom Interventions',
    description: 'Hillsboro families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Washington County. Free consultation. (541) 838-6009.',
    canonical: 'https://freedominterventions.com/hillsboro-oregon',
    city: 'Hillsboro',
    state: 'Oregon',
  },
  '/beaverton-oregon': {
    title: 'Addiction Intervention Services in Beaverton, Oregon | Freedom Interventions',
    description: 'Beaverton families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Washington County. Free consultation. (541) 838-6009.',
    canonical: 'https://freedominterventions.com/beaverton-oregon',
    city: 'Beaverton',
    state: 'Oregon',
  },
  '/gresham-oregon': {
    title: 'Addiction Intervention Services in Gresham, Oregon | Freedom Interventions',
    description: 'Gresham families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Multnomah County. Free consultation. (541) 838-6009.',
    canonical: 'https://freedominterventions.com/gresham-oregon',
    city: 'Gresham',
    state: 'Oregon',
  },
  '/corvallis-oregon': {
    title: 'Addiction Intervention Services in Corvallis, Oregon | Freedom Interventions',
    description: 'Corvallis families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Benton County. Free consultation. (541) 838-6009.',
    canonical: 'https://freedominterventions.com/corvallis-oregon',
    city: 'Corvallis',
    state: 'Oregon',
  },
};

const STATIC_ROUTE_META = {
  '/': {
    title: 'Professional Addiction Interventionist | Freedom Interventions',
    description: 'Matt Brown has 20+ years experience helping families through professional addiction interventions. Free consultation: (541) 838-6009. Nationwide service.',
    heading: 'Professional Addiction Interventionist',
    body: 'Freedom Interventions helps families move from fear and confusion into a clear plan for intervention, treatment planning, and family recovery support.',
  },
  '/contact': {
    title: 'Contact Freedom Interventions | Free Addiction Intervention Consultation',
    description: 'Schedule a free, confidential consultation with Matt Brown. Professional addiction intervention services available nationwide. Call (541) 838-6009.',
    heading: 'Contact Freedom Interventions',
    body: 'Talk directly with Matt Brown about what is happening in your family and what next step makes sense.',
  },
  '/start-here': {
    title: 'Start Here | Addiction Intervention Help for Families',
    description: 'Not sure what your family needs next? Choose a clear path to a call, free consultation, crisis coaching, or intervention readiness support.',
    heading: 'Not Sure What to Do Next?',
    body: 'Start here if your family needs a simple next step: call Matt, book a free consultation, schedule crisis coaching, or begin intervention readiness support.',
  },
  '/testimonials': {
    title: 'Intervention Success Stories & Testimonials | Freedom Interventions',
    description: 'Real stories from families who found hope through professional intervention. Read testimonials from families Matt Brown has helped over 20+ years.',
    heading: 'Intervention Success Stories',
    body: 'Families share what changed when they stopped carrying the crisis alone and got professional intervention guidance.',
  },
  '/assessment': {
    title: 'Free Addiction Assessment | Freedom Interventions',
    description: 'Take our free addiction assessment to understand your situation. Confidential, no obligation. Get personalized guidance for your family\'s next steps.',
    heading: 'Free Addiction Assessment',
    body: 'Answer a few confidential questions so your family can understand risk, urgency, and the next step that fits the situation.',
  },
  '/self-assessment': {
    title: 'Addiction Self-Assessment Tool | Freedom Interventions',
    description: 'Confidential self-assessment for substance use. Answer honestly, get clarity on where you stand, and explore next steps.',
    heading: 'Addiction Self-Assessment Tool',
    body: 'A private self-assessment can help clarify whether substance use has crossed into patterns that need outside help.',
  },
  '/intervention-faq': {
    title: 'Intervention FAQ | Common Questions Answered | Freedom Interventions',
    description: 'Common questions about addiction intervention answered. What to expect, how it works, outcomes, costs, and how to get started.',
    heading: 'Intervention FAQ',
    body: 'Learn what happens before, during, and after a professional intervention so the family can make an informed decision.',
  },
  '/interventionist': {
    title: 'About Matt Brown | Professional Interventionist',
    description: 'Meet Matt Brown, a professional interventionist with 20+ years experience, personal recovery, and direct family intervention experience.',
    heading: 'About Matt Brown',
    body: 'Matt Brown brings professional intervention experience, personal recovery, and direct family guidance to serious addiction situations.',
  },
  '/substance-guide': {
    title: 'Substance Guide | Drug & Alcohol Information | Freedom Interventions',
    description: 'Comprehensive guide to substances of abuse: alcohol, opioids, methamphetamine, cocaine, benzodiazepines, and more. What families need to know.',
    heading: 'Substance Guide',
    body: 'Families can learn what different substances do, what warning signs to watch for, and when professional help is needed.',
  },
  '/family-intervention': {
    title: 'Family Intervention Services | Freedom Interventions',
    description: 'Professional family intervention services with preparation, treatment planning, intervention facilitation, and aftercare guidance.',
    heading: 'Family Intervention Services',
    body: 'A professional intervention gives the family structure, language, treatment options, and a calm plan before the conversation happens.',
  },
  '/crisis-support': {
    title: 'Crisis Support | Immediate Addiction Help for Families',
    description: 'Immediate addiction crisis support for families who need calm guidance, treatment direction, and a clear next step.',
    heading: 'Crisis Support for Families',
    body: 'When addiction is escalating quickly, families need a calm plan and a professional voice before the situation gets worse.',
  },
  '/aftercare-guidance': {
    title: 'Aftercare Guidance | Freedom Interventions',
    description: 'Post-treatment aftercare guidance for families preparing for discharge, relapse risks, boundaries, and recovery support.',
    heading: 'Aftercare Guidance',
    body: 'Recovery does not end at admission. Families need structure for discharge, relapse planning, boundaries, and long-term support.',
  },
  '/treatment-planning': {
    title: 'Treatment Planning | Freedom Interventions',
    description: 'Treatment planning support for families choosing addiction treatment options, placement, logistics, and next steps.',
    heading: 'Treatment Planning',
    body: 'Freedom Interventions helps families compare treatment options and prepare the path before the window for help closes.',
  },
  '/intervention-toolkit': {
    title: 'Family Intervention Toolkit | Free Resources | Freedom Interventions',
    description: 'Free intervention toolkit for families. Resources, worksheets, and guidance to help you prepare for a conversation about addiction.',
    heading: 'Family Intervention Toolkit',
    body: 'Families can use these resources to prepare for difficult conversations and avoid making crisis decisions alone.',
  },
  '/service-areas': {
    title: 'Service Areas | Nationwide Intervention Services | Freedom Interventions',
    description: 'Freedom Interventions serves all 50 states and Canada. Professional addiction intervention services available wherever your family needs help.',
    heading: 'Nationwide Intervention Services',
    body: 'Freedom Interventions supports families across the United States and Canada with intervention, treatment planning, and family guidance.',
  },
  '/party-wreckers-podcast': {
    title: 'The Party Wreckers Podcast | Freedom Interventions',
    description: 'The Party Wreckers Podcast: real conversations about addiction, intervention, and recovery with host Matt Brown.',
    heading: 'The Party Wreckers Podcast',
    body: 'Real conversations about addiction, family systems, intervention, and recovery hosted by Matt Brown.',
  },
  '/blog': {
    title: 'Addiction Intervention Blog | Expert Insights | Freedom Interventions',
    description: 'Expert articles on addiction intervention, family education, recovery support, and substance abuse. Written by interventionist Matt Brown.',
    heading: 'Addiction Intervention Blog',
    body: 'Read expert guidance for families navigating addiction, intervention decisions, treatment planning, and recovery support.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Freedom Interventions',
    description: 'Freedom Interventions privacy policy covering data collection, usage, cookies, third-party services, and your rights.',
    heading: 'Privacy Policy',
    body: 'How Freedom Interventions handles website information, privacy, and data protection.',
  },
  '/terms-of-service': {
    title: 'Terms of Service | Freedom Interventions',
    description: 'Terms of service for Freedom Interventions website and professional addiction intervention services.',
    heading: 'Terms of Service',
    body: 'Terms that apply to using the Freedom Interventions website and related services.',
  },
  '/hipaa-compliance': {
    title: 'HIPAA Compliance | Freedom Interventions',
    description: 'Learn about Freedom Interventions\' commitment to HIPAA compliance and protecting your health information privacy.',
    heading: 'HIPAA Compliance',
    body: 'Freedom Interventions is committed to protecting sensitive family and health-related information.',
  },
};

const US_STATES = {
  'alabama': 'Alabama', 'alaska': 'Alaska', 'arizona': 'Arizona', 'arkansas': 'Arkansas',
  'california': 'California', 'colorado': 'Colorado', 'connecticut': 'Connecticut', 'delaware': 'Delaware',
  'florida': 'Florida', 'georgia': 'Georgia', 'hawaii': 'Hawaii', 'idaho': 'Idaho',
  'illinois': 'Illinois', 'indiana': 'Indiana', 'iowa': 'Iowa', 'kansas': 'Kansas',
  'kentucky': 'Kentucky', 'louisiana': 'Louisiana', 'maine': 'Maine', 'maryland': 'Maryland',
  'massachusetts': 'Massachusetts', 'michigan': 'Michigan', 'minnesota': 'Minnesota', 'mississippi': 'Mississippi',
  'missouri': 'Missouri', 'montana': 'Montana', 'nebraska': 'Nebraska', 'nevada': 'Nevada',
  'new-hampshire': 'New Hampshire', 'new-jersey': 'New Jersey', 'new-mexico': 'New Mexico', 'new-york': 'New York',
  'north-carolina': 'North Carolina', 'north-dakota': 'North Dakota', 'ohio': 'Ohio', 'oklahoma': 'Oklahoma',
  'oregon': 'Oregon', 'pennsylvania': 'Pennsylvania', 'rhode-island': 'Rhode Island',
  'south-carolina': 'South Carolina', 'south-dakota': 'South Dakota', 'tennessee': 'Tennessee',
  'texas': 'Texas', 'utah': 'Utah', 'vermont': 'Vermont', 'virginia': 'Virginia',
  'washington': 'Washington', 'west-virginia': 'West Virginia', 'wisconsin': 'Wisconsin', 'wyoming': 'Wyoming',
};

const CANADIAN_PROVINCES = {
  'british-columbia': 'British Columbia', 'alberta': 'Alberta', 'ontario': 'Ontario',
  'quebec': 'Quebec', 'manitoba': 'Manitoba', 'saskatchewan': 'Saskatchewan',
  'nova-scotia': 'Nova Scotia', 'new-brunswick': 'New Brunswick',
  'newfoundland-labrador': 'Newfoundland & Labrador', 'prince-edward-island': 'Prince Edward Island',
};

const CITY_PAGES = {
  'portland-oregon': { city: 'Portland', state: 'Oregon' },
  'seattle-washington': { city: 'Seattle', state: 'Washington' },
  'eugene-oregon': { city: 'Eugene', state: 'Oregon' },
  'san-francisco-california': { city: 'San Francisco', state: 'California' },
  'los-angeles-california': { city: 'Los Angeles', state: 'California' },
  'phoenix-arizona': { city: 'Phoenix', state: 'Arizona' },
  'austin-texas': { city: 'Austin', state: 'Texas' },
  'dallas-texas': { city: 'Dallas', state: 'Texas' },
  'las-vegas-nevada': { city: 'Las Vegas', state: 'Nevada' },
  'salt-lake-city-utah': { city: 'Salt Lake City', state: 'Utah' },
  'boise-idaho': { city: 'Boise', state: 'Idaho' },
  'denver-colorado': { city: 'Denver', state: 'Colorado' },
  'chicago-illinois': { city: 'Chicago', state: 'Illinois' },
  'minneapolis-minnesota': { city: 'Minneapolis', state: 'Minnesota' },
  'kansas-city-missouri': { city: 'Kansas City', state: 'Missouri' },
  'houston-texas': { city: 'Houston', state: 'Texas' },
  'new-orleans-louisiana': { city: 'New Orleans', state: 'Louisiana' },
  'detroit-michigan': { city: 'Detroit', state: 'Michigan' },
  'miami-florida': { city: 'Miami', state: 'Florida' },
  'nashville-tennessee': { city: 'Nashville', state: 'Tennessee' },
  'indianapolis-indiana': { city: 'Indianapolis', state: 'Indiana' },
  'spokane-washington': { city: 'Spokane', state: 'Washington' },
  'bend-oregon': { city: 'Bend', state: 'Oregon' },
  'philadelphia-pennsylvania': { city: 'Philadelphia', state: 'Pennsylvania' },
  'baltimore-maryland': { city: 'Baltimore', state: 'Maryland' },
  'anchorage-alaska': { city: 'Anchorage', state: 'Alaska' },
  'knoxville-tennessee': { city: 'Knoxville', state: 'Tennessee' },
  'columbus-ohio': { city: 'Columbus', state: 'Ohio' },
  'omaha-nebraska': { city: 'Omaha', state: 'Nebraska' },
  'oklahoma-city-oklahoma': { city: 'Oklahoma City', state: 'Oklahoma' },
};

// Search engine bot detection (distinct from social crawlers)
const SEARCH_CRAWLER_USER_AGENTS = [
  'Googlebot',
  'Googlebot-Mobile',
  'Googlebot-Image',
  'bingbot',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'Slurp',
  'AhrefsBot',
  'SemrushBot',
  'MJ12bot',
];

function isSearchCrawler(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return SEARCH_CRAWLER_USER_AGENTS.some(bot => ua.includes(bot.toLowerCase()));
}

function generateLocationHtml(meta) {
  const { title, description, canonical, city, state } = meta;
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeCity = escapeHtml(city);
  const safeState = escapeHtml(state);

  const localBusinessSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Freedom Interventions',
    description: `Professional addiction intervention services in ${city}, ${state}.`,
    url: canonical,
    telephone: '+15418386009',
    areaServed: {
      '@type': 'Place',
      name: `${city}, ${state}`,
    },
    founder: {
      '@type': 'Person',
      name: 'Matt Brown',
      jobTitle: 'Certified Intervention Specialist',
    },
    priceRange: 'Contact for pricing',
    serviceType: 'Addiction Intervention Services',
  });

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://freedominterventions.com' },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: 'https://freedominterventions.com/service-areas' },
      { '@type': 'ListItem', position: 3, name: state === 'Oregon' && city !== 'Oregon' ? state : city, item: state === 'Oregon' && city !== 'Oregon' ? 'https://freedominterventions.com/oregon' : canonical },
      ...(city !== 'Oregon' ? [{ '@type': 'ListItem', position: 4, name: city, item: canonical }] : []),
    ],
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDesc}">
  <link rel="canonical" href="${canonical}">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDesc}">
  <meta property="og:site_name" content="Freedom Interventions">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${safeTitle}">
  <meta name="twitter:description" content="${safeDesc}">

  <!-- Structured Data: LocalBusiness -->
  <script type="application/ld+json">${localBusinessSchema}</script>

  <!-- Structured Data: BreadcrumbList -->
  <script type="application/ld+json">${breadcrumbSchema}</script>
</head>
<body>
  <header>
    <nav>
      <a href="https://freedominterventions.com">Freedom Interventions</a> &rsaquo;
      <a href="https://freedominterventions.com/service-areas">Service Areas</a> &rsaquo;
      ${city !== 'Oregon' ? `<a href="https://freedominterventions.com/oregon">Oregon</a> &rsaquo;` : ''}
      <span>${safeCity}</span>
    </nav>
  </header>
  <main>
    <h1>${safeTitle}</h1>
    <p>${safeDesc}</p>
    <section>
      <h2>Professional Addiction Intervention in ${safeCity}, ${safeState}</h2>
      <p>Matt Brown is a certified intervention specialist with over 20 years of experience helping families throughout ${safeState} navigate addiction crises. Freedom Interventions provides compassionate, evidence-based intervention services with a 90%+ success rate for treatment entry.</p>
      <p>If your family is facing a substance use crisis in ${safeCity}, do not wait. Professional intervention dramatically increases the likelihood of your loved one accepting treatment and achieving lasting recovery.</p>
      <h2>Why Choose a Professional Interventionist?</h2>
      <ul>
        <li>Certified, experienced intervention specialist with 20+ years in ${safeState}</li>
        <li>Evidence-based ARISE and CRAFT intervention models</li>
        <li>Pre-arranged treatment placement before the intervention</li>
        <li>Comprehensive family coaching to end enabling behaviors</li>
        <li>Ongoing aftercare coordination for sustained recovery</li>
        <li>Free initial consultation &mdash; no commitment required</li>
      </ul>
      <h2>Contact Freedom Interventions</h2>
      <p>Call us now at <a href="tel:+15418386009">(541) 838-6009</a> for a free, confidential consultation. We serve ${safeCity} and all of ${safeState}.</p>
      <p><a href="https://freedominterventions.com/#booking">Schedule your free consultation online</a></p>
    </section>
  </main>
</body>
</html>`;
}

function titleCase(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getStaticRouteMeta(pathname) {
  if (STATIC_ROUTE_META[pathname]) {
    return STATIC_ROUTE_META[pathname];
  }

  const slug = pathname.replace(/^\//, '');
  if (!slug || slug.includes('.') || pathname.startsWith('/blog/')) {
    return null;
  }

  if (CITY_PAGES[slug]) {
    const { city, state } = CITY_PAGES[slug];
    return {
      title: `Drug & Alcohol Interventionist in ${city}, ${state} | Freedom Interventions`,
      description: `Need an addiction interventionist in ${city}? Matt Brown provides professional intervention services with 20+ years experience. Call (541) 838-6009.`,
      heading: `Addiction Intervention Services in ${city}, ${state}`,
      body: `Freedom Interventions helps families in ${city}, ${state} prepare for addiction intervention, treatment planning, and a clear next step.`,
    };
  }

  if (US_STATES[slug]) {
    const state = US_STATES[slug];
    return {
      title: `Addiction Intervention Services in ${state} | Freedom Interventions`,
      description: `Professional drug & alcohol intervention services in ${state}. Over 20 years experience helping families build clear treatment plans. Free consultation: (541) 838-6009.`,
      heading: `Addiction Intervention Services in ${state}`,
      body: `Freedom Interventions helps families across ${state} prepare for addiction intervention, treatment planning, and family recovery support.`,
    };
  }

  if (CANADIAN_PROVINCES[slug]) {
    const province = CANADIAN_PROVINCES[slug];
    return {
      title: `Addiction Intervention Services in ${province} | Freedom Interventions`,
      description: `Professional addiction intervention services in ${province}, Canada. Over 20 years experience helping families. Free consultation: (541) 838-6009.`,
      heading: `Addiction Intervention Services in ${province}`,
      body: `Freedom Interventions helps families in ${province} prepare for intervention, treatment planning, and family support.`,
    };
  }

  const formatted = titleCase(slug);
  return {
    title: `${formatted} | Freedom Interventions`,
    description: 'Professional addiction intervention services, family support, and treatment planning guidance. Free consultation: (541) 838-6009.',
    heading: formatted,
    body: 'Freedom Interventions helps families dealing with addiction find clarity, structure, and a real next step.',
  };
}

function generateStaticRouteHtml(meta, pageUrl) {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const heading = escapeHtml(meta.heading || meta.title);
  const body = escapeHtml(meta.body || meta.description);
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: meta.title,
    description: meta.description,
    url: pageUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Freedom Interventions',
      url: SITE_URL,
      logo: `${SITE_URL}/og-share.jpg`,
      telephone: '+15418386009',
    },
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${pageUrl}">

  <meta property="og:type" content="website">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${SITE_URL}/og-share.jpg">
  <meta property="og:site_name" content="Freedom Interventions">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${SITE_URL}/og-share.jpg">

  <script type="application/ld+json">${schema}</script>
</head>
<body>
  <main>
    <h1>${heading}</h1>
    <p>${body}</p>
    <section>
      <h2>Confidential Help for Families</h2>
      <p>Matt Brown works directly with families facing addiction, crisis decisions, treatment planning, and intervention preparation.</p>
      <ul>
        <li>Certified Intervention Professional</li>
        <li>20+ years of experience</li>
        <li>Family intervention, crisis coaching, treatment planning, and aftercare guidance</li>
        <li>Nationwide and Canada service areas</li>
      </ul>
      <p><a href="tel:+15418386009">(541) 838-6009</a></p>
      <p><a href="${SITE_URL}/start-here">Start Here</a></p>
      <p><a href="${pageUrl}">View the full page</a></p>
    </section>
  </main>
</body>
</html>`;
}

const SUPABASE_URL = 'https://rizfkjgwhcpwiryyqejx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpemZramd3aGNwd2lyeXlxZWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NTA1NTQsImV4cCI6MjA4MDIyNjU1NH0.7FENiqyiZCFTXJWzlNpxu7Jtf0JROfJAK44oAWHZeH4';
const SITE_URL = 'https://freedominterventions.com';

// Social preview crawler detection (search bots should see the real page, not the OG stub)
const SOCIAL_CRAWLER_USER_AGENTS = [
  'facebookexternalhit',
  'Facebot',
  'Twitterbot',
  'LinkedInBot',
  'Slackbot',
  'Discordbot',
  'TelegramBot',
  'WhatsApp',
  'PinterestBot',
];

function isSocialCrawler(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return SOCIAL_CRAWLER_USER_AGENTS.some(crawler => ua.includes(crawler.toLowerCase()));
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function fetchBlogPost(slug) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=title,excerpt,image_url,slug`,
    {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );

  if (!response.ok) {
    console.error('Supabase fetch error:', response.status);
    return null;
  }

  const data = await response.json();
  return data.length > 0 ? data[0] : null;
}

function buildImageUrl(imageUrl) {
  if (!imageUrl) return `${SITE_URL}/favicon.jpeg`;
  
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Handle relative paths
  if (imageUrl.startsWith('/')) {
    return `${SITE_URL}${imageUrl}`;
  }
  
  return `${SITE_URL}/${imageUrl}`;
}

function generateOgHtml(post, pageUrl) {
  const title = escapeHtml(post.title);
  const description = escapeHtml(post.excerpt || '');
  const imageUrl = buildImageUrl(post.image_url);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Freedom Interventions</title>
  <meta name="description" content="${description}">
  
  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Freedom Interventions">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${imageUrl}">
  
  <link rel="canonical" href="${pageUrl}">
</head>
<body>
  <p><a href="${pageUrl}">${title}</a></p>
</body>
</html>`;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent') || '';

    // Temporary diagnostics: confirms whether this worker is attached to the domain.
    if (url.pathname === '/worker-health') {
      return new Response('Freedom Interventions worker active', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
          'X-Worker-Health': 'ok',
        },
      });
    }

    // Serve dynamic sitemap from edge function
    if (url.pathname === '/sitemap.xml') {
      try {
        const sitemapResponse = await fetch(
          `${SUPABASE_URL}/functions/v1/generate-sitemap`,
          {
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            },
          }
        );
        if (sitemapResponse.ok) {
          const xml = await sitemapResponse.text();
          return new Response(xml, {
            status: 200,
            headers: {
              'Content-Type': 'application/xml; charset=utf-8',
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }
      } catch (e) {
        console.error('Sitemap proxy error:', e);
      }
      // Fall through to origin if edge function fails
      return fetch(request);
    }

    // Handle Oregon location pages for search crawlers
    const locationMeta = LOCATION_META[url.pathname];
    if (locationMeta && isSearchCrawler(userAgent)) {
      console.log(`Search crawler detected for location page: ${url.pathname}`);
      try {
        const html = generateLocationHtml(locationMeta);
        return new Response(html, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=86400',
            'X-Prerendered': 'true',
          },
        });
      } catch (error) {
        console.error('Location prerender error:', error);
        return fetch(request);
      }
    }

    // Serve route-specific metadata and fallback content to search crawlers.
    // Normal visitors still get the Lovable app from the origin.
    const staticRouteMeta = getStaticRouteMeta(url.pathname);
    if (staticRouteMeta && isSearchCrawler(userAgent)) {
      console.log(`Search crawler detected for static page: ${url.pathname}`);
      try {
        const pageUrl = `${SITE_URL}${url.pathname === '/' ? '' : url.pathname}`;
        const html = generateStaticRouteHtml(staticRouteMeta, pageUrl);
        return new Response(html, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=86400',
            'Vary': 'User-Agent',
            'X-Prerendered': 'true',
          },
        });
      } catch (error) {
        console.error('Static route prerender error:', error);
        return fetch(request);
      }
    }

    // Only intercept /blog/* paths for OG tags
    if (!url.pathname.startsWith('/blog/')) {
      return fetch(request);
    }

    // Extract slug from /blog/[slug]
    const pathParts = url.pathname.split('/').filter(Boolean);
    if (pathParts.length < 2 || pathParts[0] !== 'blog') {
      return fetch(request);
    }
    const slug = pathParts[1];

    // Skip if it's a static asset request
    if (slug.includes('.')) {
      return fetch(request);
    }

    // Search bots should get the real blog page so they can index actual content.
    if (isSearchCrawler(userAgent)) {
      return fetch(request);
    }

    // Only serve the OG HTML stub to social preview crawlers.
    if (!isSocialCrawler(userAgent)) {
      return fetch(request);
    }

    console.log(`Social crawler detected: ${userAgent.substring(0, 50)} for slug: ${slug}`);

    try {
      const post = await fetchBlogPost(slug);

      if (!post) {
        console.log(`Post not found for slug: ${slug}`);
        return fetch(request);
      }

      const pageUrl = `${SITE_URL}/blog/${post.slug}`;
      const html = generateOgHtml(post, pageUrl);

      return new Response(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          'Vary': 'User-Agent',
        },
      });
    } catch (error) {
      console.error('Worker error:', error);
      return fetch(request);
    }
  },
};
