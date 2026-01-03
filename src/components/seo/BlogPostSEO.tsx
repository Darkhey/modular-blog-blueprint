
import { Helmet } from 'react-helmet-async';
import { BlogPost } from '@/hooks/useBlogPosts';
import { siteConfig } from '@/config/site.config';

interface BlogPostSEOProps {
  post: BlogPost;
  canonicalUrl: string;
}

const BlogPostSEO = ({ post, canonicalUrl }: BlogPostSEOProps) => {
  const seoTitle = post.seo_title || `${post.title} | ${siteConfig.projectName}`;
  const seoDescription = post.seo_description || post.excerpt;
  const keywords = post.keywords?.join(', ') || `${post.topic}, Sanierung, Energieeffizienz`;
  const image = post.hero_image_url || post.cover_url || `${siteConfig.siteUrl}/logo.png`;
  const publisherLogo = `${siteConfig.siteUrl}/logo.png`;
  
  // Calculate word count for reading time estimate
  const wordCount = post.content?.split(/\s+/).length || 0;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": image,
    "author": {
      "@type": "Person",
      "name": post.blog_authors?.name || `${siteConfig.projectName} Redaktion`,
      "url": siteConfig.siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.projectName,
      "logo": {
        "@type": "ImageObject",
        "url": publisherLogo
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
    "wordCount": wordCount,
    "timeRequired": `PT${post.read_time}M`,
    "inLanguage": "de-DE",
    "about": [
      {
        "@type": "Thing",
        "name": post.topic
      }
    ]
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
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
        "name": "Blog",
        "item": `${siteConfig.siteUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.topic,
        "item": `${siteConfig.siteUrl}/themen/${post.topic.toLowerCase().replace(/\s+/g, '-')}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": post.title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={post.blog_authors?.name || `${siteConfig.projectName} Redaktion`} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:site_name" content={siteConfig.projectName} />
      <meta property="article:published_time" content={post.published_at} />
      <meta property="article:modified_time" content={post.published_at} />
      <meta property="article:section" content={post.topic} />
      <meta property="article:tag" content={keywords} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="de" />
      <meta name="geo.region" content="DE" />
      <meta name="geo.country" content="Deutschland" />

      {/* Structured Data - Article */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Structured Data - Breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
    </Helmet>
  );
};

export default BlogPostSEO;
