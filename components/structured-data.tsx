export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Evangelion Title Card Generator",
    description:
      "Create authentic Neon Genesis Evangelion episode title cards with customizable text, fonts, and effects.",
    applicationCategory: "DesignApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "MAGI System",
    },
    publisher: {
      "@type": "Organization",
      name: "NERV",
    },
    inLanguage: "en",
    datePublished: "2024-01-01",
    softwareVersion: "1.0.0",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
