
import { BlogPost } from '@/hooks/useBlogPosts';
import { siteConfig } from '@/config/site.config';
import BlogCard from '@/components/blog/BlogCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useInView } from '@/hooks/useInView';

import { Search } from 'lucide-react';

interface BlogPostGridProps {
  posts: BlogPost[];
  isLoading: boolean;
  selectedTopic: string | null;
  searchQuery: string;
  onClearFilters: () => void;
}

const BlogPostGrid = ({ posts, isLoading, selectedTopic, searchQuery, onClearFilters }: BlogPostGridProps) => {
  const { ref, isInView } = useInView();

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden border border-border/60">
              <Skeleton className="h-48 w-full rounded-none" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 glass rounded-2xl border border-border/60">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="text-muted-foreground w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Keine Artikel gefunden
        </h3>
        <p className="text-muted-foreground mb-6">
          Versuchen Sie andere Suchbegriffe oder wählen Sie eine andere Kategorie.
        </p>
        <button
          onClick={onClearFilters}
          className="px-5 py-2.5 gradient-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
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
    <div ref={ref}>
      <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={isInView ? 'animate-fade-in' : 'opacity-0'}
            style={{ animationDelay: `${(index % 4) * 80}ms` }}
          >
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostGrid;
