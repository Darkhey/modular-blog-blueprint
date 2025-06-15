
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/hooks/useBlogPosts';

interface RelatedArticlesProps {
  relatedPosts: BlogPost[];
  topic: string;
}

const RelatedArticles = ({ relatedPosts, topic }: RelatedArticlesProps) => {
  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Weitere Artikel zu {topic}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {relatedPosts.map((relatedPost) => (
          <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-3">
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: relatedPost.topic_color }}
                >
                  {relatedPost.topic}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                <Link to={`/blog/${relatedPost.slug}`} className="hover:text-green-600 transition-colors">
                  {relatedPost.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">{relatedPost.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{relatedPost.read_time} Min. Lesezeit</span>
                <Link 
                  to={`/blog/${relatedPost.slug}`}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Weiterlesen →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
