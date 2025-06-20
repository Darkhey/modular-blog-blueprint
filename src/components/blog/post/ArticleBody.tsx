
import { BlogPost } from '@/hooks/useBlogPosts';
import BlogPostContentSEO from './BlogPostContentSEO';
import HeizungModernisierungContentSEO from './HeizungModernisierungContentSEO';
import FensterTuerenContentSEO from './FensterTuerenContentSEO';
import SolarenergieContentSEO from './SolarenergieContentSEO';

interface ArticleBodyProps {
  post: BlogPost;
}

const ArticleBody = ({ post }: ArticleBodyProps) => {
  return (
    <div className="space-y-8">
      {/* Hauptartikel-Content zuerst */}
      <div 
        className="prose prose-lg max-w-4xl mx-auto"
        dangerouslySetInnerHTML={{ __html: post.content }}
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
