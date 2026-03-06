import { Helmet } from "react-helmet";

// Organization Schema
export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://freedominterventions.com/#organization",
        name: "Freedom Interventions",
        alternateName: "Freedom Interventions LLC",
        url: "https://freedominterventions.com",
        logo: "https://freedominterventions.com/favicon.jpeg",
        image: "https://freedominterventions.com/favicon.jpeg",
        description:
          "Professional addiction intervention services helping families guide loved ones toward recovery. Over 20 years of experience serving all 50 states and Canada.",
        telephone: "+1-541-838-6009",
        email: "matt@freedominterventions.com",
        foundingDate: "2004",
        founder: {
          "@type": "Person",
          name: "Matt Brown",
          jobTitle: "Professional Interventionist",
          description: "Drug & alcohol interventionist with over 20 years of experience and 22 years of personal recovery. Has conducted over 1,000 professional interventions.",
          knowsAbout: ["Addiction Intervention", "Drug Intervention", "Alcohol Intervention", "Family Intervention", "Substance Abuse", "Recovery"],
        },
        address: {
          "@type": "PostalAddress",
          addressRegion: "OR",
          addressCountry: "US",
        },
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Canada" },
        ],
        serviceType: [
          "Addiction Intervention",
          "Drug Intervention",
          "Alcohol Intervention",
          "Family Intervention",
          "Crisis Intervention",
          "Treatment Planning",
        ],
        priceRange: "$$$$",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
        sameAs: [
          "https://soberhelpline.com",
          "https://nomoreenabling.com",
          "https://partywreckers.com",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Intervention Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Free Consultation",
                description: "Complimentary phone consultation to discuss your situation",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Family Intervention",
                description: "Professional intervention services to help families guide loved ones to treatment",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Treatment Planning",
                description: "Comprehensive treatment planning and placement services",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://freedominterventions.com/#website",
        url: "https://freedominterventions.com",
        name: "Freedom Interventions",
        publisher: { "@id": "https://freedominterventions.com/#organization" },
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// LocalBusiness Schema for location pages
export const LocalBusinessSchema = ({ location, state }: { location: string; state: string }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Freedom Interventions - ${location}`,
    description: `Professional addiction intervention services in ${location}, ${state}. Helping families guide loved ones toward recovery.`,
    telephone: "+1-541-838-6009",
    email: "matt@freedominterventions.com",
    url: "https://freedominterventions.com",
    image: "https://freedominterventions.com/favicon.jpeg",
    address: {
      "@type": "PostalAddress",
      addressLocality: location,
      addressRegion: state,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: location,
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// FAQ Schema
interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSchema = ({ faqs }: { faqs: FAQItem[] }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Article Schema for blog posts
export const ArticleSchema = ({
  title,
  description,
  image,
  datePublished,
  dateModified,
  url,
}: {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  url: string;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image || "https://freedominterventions.com/favicon.jpeg",
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    url: url,
    author: {
      "@type": "Person",
      name: "Matt Brown",
      url: "https://freedominterventions.com/interventionist",
    },
    publisher: {
      "@type": "Organization",
      name: "Freedom Interventions",
      logo: {
        "@type": "ImageObject",
        url: "https://freedominterventions.com/favicon.jpeg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// BreadcrumbList Schema
export const BreadcrumbSchema = ({
  items,
}: {
  items: { name: string; url: string }[];
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// ItemList Schema for location directories
export const ItemListSchema = ({
  name,
  description,
  items,
}: {
  name: string;
  description: string;
  items: { name: string; url: string }[];
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: name,
    description: description,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Person Schema for Matt Brown
export const PersonSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Matt Brown",
    jobTitle: "Professional Interventionist",
    description:
      "Professional interventionist since 2004. Over 20 years sober, helping hundreds of families navigate addiction recovery.",
    url: "https://freedominterventions.com/interventionist",
    image: "https://freedominterventions.com/favicon.jpeg",
    worksFor: {
      "@type": "Organization",
      name: "Freedom Interventions",
      url: "https://freedominterventions.com",
    },
    knowsAbout: [
      "Addiction Intervention",
      "Substance Abuse Treatment",
      "Family Counseling",
      "Recovery Support",
    ],
    alumniOf: [],
    sameAs: [],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Service Schema for service pages
export const ServiceSchema = ({
  name,
  description,
  url,
  serviceType,
}: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    url: url,
    serviceType: serviceType || "Addiction Intervention",
    provider: {
      "@type": "ProfessionalService",
      name: "Freedom Interventions",
      url: "https://freedominterventions.com",
      telephone: "+1-541-838-6009",
      email: "matt@freedominterventions.com",
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Families dealing with addiction",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Aggregate Rating Schema for reviews
export const AggregateRatingSchema = ({
  ratingValue,
  reviewCount,
  bestRating = "5",
  worstRating = "1",
}: {
  ratingValue: string;
  reviewCount: number;
  bestRating?: string;
  worstRating?: string;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Freedom Interventions",
    url: "https://freedominterventions.com",
    telephone: "+1-541-838-6009",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      reviewCount: reviewCount.toString(),
      bestRating: bestRating,
      worstRating: worstRating,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Speakable Schema for AI/Voice assistants
export const SpeakableSchema = ({
  name,
  description,
  url,
  speakableSelectors,
}: {
  name: string;
  description: string;
  url: string;
  speakableSelectors?: string[];
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: name,
    description: description,
    url: url,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: speakableSelectors || ["h1", "h2", ".speakable-content"],
    },
    publisher: {
      "@type": "Organization",
      name: "Freedom Interventions",
      url: "https://freedominterventions.com",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Location FAQ Schema for state/city pages
export const LocationFAQSchema = ({ 
  location, 
  locationType = "state" 
}: { 
  location: string; 
  locationType?: "state" | "city" | "province";
}) => {
  const faqs = [
    {
      question: `What is a professional intervention in ${location}?`,
      answer: `A professional intervention is a structured, compassionate conversation facilitated by a trained interventionist to help someone in ${location} struggling with addiction accept treatment. The process includes family preparation, development of an intervention strategy, facilitated conversation, and immediate treatment placement if accepted.`,
    },
    {
      question: `How much does addiction intervention cost in ${location}?`,
      answer: `Intervention costs vary based on the complexity of the situation, travel requirements, and specific services needed. Freedom Interventions offers a free initial consultation to assess your situation and discuss options. Call (541) 838-6009 for a confidential consultation.`,
    },
    {
      question: `What is the success rate for interventions in ${location}?`,
      answer: `Professional interventions have a 90%+ success rate in getting individuals to accept treatment when conducted properly. Key factors include proper family preparation, unified messaging, pre-arranged treatment, and professional facilitation.`,
    },
    {
      question: `How quickly can an intervention be arranged in ${location}?`,
      answer: `In crisis situations, interventions can be arranged within 24-72 hours. Standard preparation typically takes 1-2 weeks for optimal results. Freedom Interventions serves all of ${location} and can coordinate treatment placement nationwide.`,
    },
    {
      question: `What types of addiction does Freedom Interventions address in ${location}?`,
      answer: `Freedom Interventions addresses all substance use disorders including alcohol addiction, opioid and fentanyl addiction, methamphetamine addiction, cocaine addiction, prescription drug misuse, and co-occurring mental health disorders throughout ${location}.`,
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// How-To Schema for intervention process
export const HowToSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Conduct a Professional Addiction Intervention",
    description: "Step-by-step guide to planning and conducting a professional intervention for someone struggling with addiction.",
    totalTime: "P14D",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "Varies - Free consultation available",
    },
    step: [
      {
        "@type": "HowToStep",
        name: "Contact a Professional Interventionist",
        text: "Call Freedom Interventions at (541) 838-6009 for a free consultation. Discuss your situation and determine if professional intervention is appropriate.",
        url: "https://freedominterventions.com/#booking",
      },
      {
        "@type": "HowToStep",
        name: "Family Assessment and Preparation",
        text: "Work with the interventionist to gather information, identify participating family members, and educate everyone about addiction and the intervention process.",
      },
      {
        "@type": "HowToStep",
        name: "Develop Impact Statements",
        text: "Each family member writes a letter expressing love, specific examples of how addiction has affected them, and a request for the person to accept treatment.",
      },
      {
        "@type": "HowToStep",
        name: "Arrange Treatment in Advance",
        text: "Research and secure a treatment placement before the intervention. The interventionist helps identify appropriate facilities and verify insurance coverage.",
      },
      {
        "@type": "HowToStep",
        name: "Establish Boundaries and Consequences",
        text: "Family members decide what boundaries they will implement if treatment is refused. These are shared during the intervention.",
      },
      {
        "@type": "HowToStep",
        name: "Conduct the Intervention",
        text: "The interventionist facilitates the meeting where family members share their statements. The goal is for the person to accept treatment immediately.",
      },
      {
        "@type": "HowToStep",
        name: "Transport to Treatment",
        text: "If treatment is accepted, the person is transported directly to the treatment facility. Bags should be packed in advance.",
      },
      {
        "@type": "HowToStep",
        name: "Family Follow-Up",
        text: "Continue working with the interventionist and engage in family recovery resources. Healing is a process for the entire family.",
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
