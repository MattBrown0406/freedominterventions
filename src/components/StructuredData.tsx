import { Helmet } from "react-helmet";

// Organization Schema
export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://freedominterventions.com/#organization",
    name: "Freedom Interventions",
    alternateName: "Freedom Interventions LLC",
    url: "https://freedominterventions.com",
    logo: "https://freedominterventions.com/favicon.jpeg",
    image: "https://freedominterventions.com/favicon.jpeg",
    description:
      "Professional addiction intervention services helping families guide loved ones toward recovery. Over 20 years of experience with 1000+ families helped.",
    telephone: "+1-503-836-2136",
    email: "matt@freedominterventions.com",
    foundingDate: "2004",
    founder: {
      "@type": "Person",
      name: "Matt Brown",
      jobTitle: "Professional Interventionist",
      description: "Professional interventionist since 2004 with over 20 years of experience",
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
      "Family Intervention",
      "Crisis Support",
      "Treatment Planning",
      "Aftercare Guidance",
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [],
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
    telephone: "+1-503-836-2136",
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
