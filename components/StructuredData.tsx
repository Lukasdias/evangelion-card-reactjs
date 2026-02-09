import React from "react";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Evangelion Title Card Generator",
    description: "Create authentic Neon Genesis Evangelion episode title cards with customizable text, fonts, and effects.",
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
      url: "https://evangelion-card-generator.vercel.app",
    },
    featureList: [
      "Customizable text content",
      "Multiple font styles (Serif and Sans-serif)",
      "Text alignment options",
      "Glow effects",
      "Export to PNG",
      "Responsive design",
      "MAGI System terminal interface",
    ],
    screenshot: {
      "@type": "ImageObject",
      url: "https://evangelion-card-generator.vercel.app/og-image.png",
    },
    softwareVersion: "1.0.0",
    datePublished: "2024-01-01",
    dateModified: "2024-01-01",
    inLanguage: "en",
    keywords: "Evangelion, Neon Genesis Evangelion, title card, episode card, generator, anime, meme",
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://evangelion-card-generator.vercel.app",
      },
    ],
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MAGI System",
    url: "https://evangelion-card-generator.vercel.app",
    logo: "https://evangelion-card-generator.vercel.app/logo.png",
    sameAs: [
      "https://github.com/yourusername/evangelion-card-generator",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
    </>
  );
}
