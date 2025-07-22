
import { BlogPost } from '@/hooks/useBlogPosts';
import BlogCard from '@/components/blog/BlogCard';

import { siteConfig } from '@/config/site.config';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CategoryArticleListProps {
  posts: BlogPost[];
  isLoading: boolean;
  categoryName: string;
}

const CategoryCTA = () => (
  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border mb-8">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Kostenlose Beratung gewünscht?
        </h3>
        <p className="text-gray-600">
          Lassen Sie sich von unseren Experten beraten und finden Sie die beste Lösung für Ihr Zuhause.
        </p>
      </div>
      <Button className="bg-green-600 hover:bg-green-700">
        Jetzt beraten lassen
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
  </div>
);

const CategoryArticleList = ({ posts, isLoading, categoryName }: CategoryArticleListProps) => {
  if (isLoading) {
    return <div>Lade Artikel...</div>;
  }
  
  if (!posts || posts.length === 0) {
    return (
      <div className="text-gray-600 text-center mt-6 p-8 bg-white rounded-lg border">
        <h3 className="text-lg font-semibold">Keine Artikel gefunden</h3>
        <p>Zu diesem Thema gibt es aktuell noch keine Artikel oder Ihre Suche ergab keine Treffer.</p>
      </div>
    );
  }

  return (
    <div>
      <CategoryCTA />
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Aktuelle Artikel zu {categoryName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <div key={post.id}>
            <BlogCard post={post} />
            {/* Auto Ads every 4 articles - handled via AdSense dashboard */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryArticleList;
