
import { BlogPost } from '@/hooks/useBlogPosts';
import { siteConfig } from '@/config/site.config';
import BlogCard from '@/components/blog/BlogCard';

import { Search } from 'lucide-react';

interface BlogPostGridProps {
  posts: BlogPost[];
  isLoading: boolean;
  selectedTopic: string | null;
  searchQuery: string;
  onClearFilters: () => void;
}

const BlogPostGrid = ({ posts, isLoading, selectedTopic, searchQuery, onClearFilters }: BlogPostGridProps) => {
  if (isLoading) {
    return <div className="text-center py-12">Lade Artikel...</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="text-gray-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Keine Artikel gefunden
        </h3>
        <p className="text-gray-500 mb-6">
          Versuchen Sie andere Suchbegriffe oder wählen Sie eine andere Kategorie.
        </p>
        <button
          onClick={onClearFilters}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Alle Artikel anzeigen
        </button>
      </div>
    );
  }

  const topicName = selectedTopic ? siteConfig.contentTopics.find(t => t.id === selectedTopic)?.name : '';
  const title = selectedTopic 
    ? `Artikel zu "${topicName}"`
    : searchQuery 
    ? `Suchergebnisse für "${searchQuery}"`
    : 'Alle Ratgeber-Artikel';

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
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

export default BlogPostGrid;
