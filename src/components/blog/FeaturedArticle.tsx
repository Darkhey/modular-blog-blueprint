import { Award, ArrowRight, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFeaturedPosts } from '@/hooks/useFeaturedPosts';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedArticle = () => {
  const { data: featuredPosts, isLoading } = useFeaturedPosts(3);

  if (isLoading) {
    return (
      <div className="mb-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>
    );
  }

  if (!featuredPosts || featuredPosts.length === 0) return null;

  const [mainPost, ...secondaryPosts] = featuredPosts;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
        Aktuelle Highlights
      </h2>

      {/* Main featured article */}
      <Link to={`/blog/${mainPost.slug}`} className="block group mb-4">
        <div className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-primary/5 to-accent/10 hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col md:flex-row">
            {mainPost.hero_image_url && (
              <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                <img
                  src={mainPost.hero_image_url}
                  alt={mainPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            )}
            <div className={`p-6 flex flex-col justify-center ${mainPost.hero_image_url ? 'md:w-3/5' : 'w-full'}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  {mainPost.topic}
                </span>
                {mainPost.is_featured && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 flex items-center gap-1">
                    <Award className="h-3 w-3" /> Empfohlen
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {mainPost.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {mainPost.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {mainPost.read_time} Min. Lesezeit
                </span>
                <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Jetzt lesen <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Secondary featured articles */}
      {secondaryPosts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {secondaryPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="block group">
              <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-300">
                {post.hero_image_url && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={post.hero_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold uppercase text-primary">{post.topic}</span>
                  <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mt-1">
                    {post.title}
                  </h4>
                  <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.read_time} Min.
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedArticle;
