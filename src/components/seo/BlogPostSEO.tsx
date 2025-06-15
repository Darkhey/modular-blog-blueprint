
import { Helmet } from 'react-helmet-async';
import { BlogPost } from '@/hooks/useBlogPosts';

interface BlogPostSEOProps {
  post: BlogPost;
  canonicalUrl: string;
}

const BlogPostSEO = ({ post, canonicalUrl }: BlogPostSEOProps) => {
  const seoTitle = post.seo_title || `${post.title} | Sanieren & Sparen`;
  const seoDescription = post.seo_description || post.excerpt;
  const keywords = post.keywords?.join(', ') || `${post.topic}, Sanierung, Energieeffizienz`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": "/photo-1518005020951-eccb494ad742.jpg", // Default image for doors/windows
    "author": {
      "@type": "Organization",
      "name": "Sanieren & Sparen"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sanieren & Sparen",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sanieren-sparen.de/logo.png"
      }
    },
    "datePublished": post.published_at,
    "dateModified": post.published_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "articleSection": post.topic,
    "keywords": keywords,
    "timeRequired": `PT${post.read_time}M`,
    "about": [
      {
        "@type": "Thing",
        "name": post.topic
      }
    ]
  };

  // FAQ structured data if the post contains FAQs
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Welche Türarten gibt es?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es gibt Haustüren, Zimmertüren, Schiebe- und Falttüren sowie spezielle Sicherheitstüren mit verschiedenen Materialien und Eigenschaften."
        }
      },
      {
        "@type": "Question", 
        "name": "Was kostet eine neue Haustür?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die Kosten für eine neue Haustür variieren je nach Material und Ausstattung zwischen 800€ und 5.000€ inklusive Einbau."
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Sanieren & Sparen Redaktion" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content="/photo-1518005020951-eccb494ad742.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:site_name" content="Sanieren & Sparen" />
      <meta property="article:published_time" content={post.published_at} />
      <meta property="article:modified_time" content={post.published_at} />
      <meta property="article:section" content={post.topic} />
      <meta property="article:tag" content={keywords} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content="/photo-1518005020951-eccb494ad742.jpg" />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="de" />
      <meta name="geo.region" content="DE" />
      <meta name="geo.country" content="Deutschland" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqData)}
      </script>
    </Helmet>
  );
};

export default BlogPostSEO;
