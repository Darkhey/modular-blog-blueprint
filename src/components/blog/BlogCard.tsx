import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlogPosts';

const topicFallbackImages: Record<string, string> = {
  'Heizung': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
  'Dämmung': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
  'Solar': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
  'Fenster': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
  'Fördermittel': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
};

const getImage = (post: BlogPost) =>
  post.hero_image_url || post.cover_url ||
  Object.entries(topicFallbackImages).find(([key]) => post.topic?.includes(key))?.[1] ||
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const isNew = post.published_at && (Date.now() - new Date(post.published_at).getTime()) < 7 * 24 * 60 * 60 * 1000;

  return (
    <article className="group bg-card rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <Link to={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden">
        <img
          src={getImage(post)}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="text-white text-sm font-medium flex items-center gap-1">
            Weiterlesen <ArrowRight className="w-4 h-4" />
          </span>
        </div>
        {/* Topic Badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
            style={{ backgroundColor: post.topic_color }}
          >
            {post.topic}
          </span>
          {isNew && (
            <span className="px-2 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-900">NEU</span>
          )}
        </div>
      </Link>

      <div className="p-5">
        <h2 className="text-lg font-bold text-card-foreground mb-2 line-clamp-2">
          <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h2>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {new Date(post.published_at).toLocaleDateString('de-DE')}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {post.read_time} Min.
            </span>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="text-primary font-semibold hover:underline"
          >
            Lesen →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
