
import { BlogPost } from '@/hooks/useBlogPosts';
import BlogPostContentSEO from './BlogPostContentSEO';
import HeizungModernisierungContentSEO from './HeizungModernisierungContentSEO';
import FensterTuerenContentSEO from './FensterTuerenContentSEO';
import SolarenergieContentSEO from './SolarenergieContentSEO';
import InArticleAd from '@/components/ads/InArticleAd';

interface ArticleBodyProps {
  post: BlogPost;
}

const ArticleBody = ({ post }: ArticleBodyProps) => {
  // Split content for ad placement
  const contentParts = post.content.split('</p>');
  const midPoint = Math.floor(contentParts.length / 2);
  const firstHalf = contentParts.slice(0, midPoint).join('</p>') + '</p>';
  const secondHalf = contentParts.slice(midPoint).join('</p>');

  return (
    <div className="space-y-8">
      {/* Erste Hälfte des Artikels */}
      <div 
        className="prose prose-lg max-w-4xl mx-auto"
        dangerouslySetInnerHTML={{ __html: firstHalf }}
      />
      
      {/* In-Article Ad */}
      <InArticleAd />
      
      {/* Zweite Hälfte des Artikels */}
      <div 
        className="prose prose-lg max-w-4xl mx-auto"
        dangerouslySetInnerHTML={{ __html: secondHalf }}
      />
      
      {/* Zusätzliche SEO-Inhalte je nach Artikel-Typ */}
      {post.slug.includes('daemmstoffe-vergleich') && (
        <BlogPostContentSEO post={post} />
      )}
      
      {post.slug.includes('heizung-modernisieren') && (
        <HeizungModernisierungContentSEO post={post} />
      )}
      
      {post.slug.includes('fenster') && (
        <FensterTuerenContentSEO post={post} />
      )}
      
      {post.slug.includes('solar') && (
        <SolarenergieContentSEO post={post} />
      )}
    </div>
  );
};

export default ArticleBody;
