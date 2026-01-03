import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site.config';

interface CategoryPageSEOProps {
  category: {
    name: string;
    description?: string | null;
    slug: string;
    color?: string | null;
  };
  postCount?: number;
}

const CategoryPageSEO = ({ category, postCount = 0 }: CategoryPageSEOProps) => {
  const title = `${category.name} - Ratgeber & Tipps | ${siteConfig.projectName}`;
  const description = category.description || 
    `Alles zum Thema ${category.name}: Praktische Tipps, aktuelle Fördermittel und Expertenratgeber für Ihre Sanierung.`;
  const canonicalUrl = `${siteConfig.siteUrl}/themen/${category.slug}`;
  const image = `${siteConfig.siteUrl}/og-default.jpg`;

  // CollectionPage structured data for category pages
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": category.name,
    "description": description,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": postCount,
      "itemListElement": []
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteConfig.siteUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Themen",
          "item": `${siteConfig.siteUrl}/themen`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": category.name,
          "item": canonicalUrl
        }
      ]
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={`${category.name}, Sanierung, Energieeffizienz, Fördermittel, Ratgeber`} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:site_name" content={siteConfig.projectName} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="de" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default CategoryPageSEO;
