import { Link } from 'react-router-dom';
import { useFeaturedPosts } from '@/hooks/useFeaturedPosts';
import { Skeleton } from '@/components/ui/skeleton';
import { useInView } from '@/hooks/useInView';
import { ArrowRight } from 'lucide-react';

import heizungImg from '@/assets/blog-hero-heizung.jpg';
import daemmungImg from '@/assets/blog-hero-daemmung.jpg';
import solarImg from '@/assets/blog-hero-solar.jpg';
import sanierungsfahrplanImg from '@/assets/sanierungsfahrplan-hero.jpg';

const topicFallbackImages: Record<string, string> = {
  'Heizung': heizungImg,
  'Dämmung': daemmungImg,
  'Solar': solarImg,
  'Fenster': 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop',
};

const getImage = (post: any) =>
  post.hero_image_url || post.cover_url ||
  Object.entries(topicFallbackImages).find(([key]) => post.topic?.includes(key))?.[1] ||
  sanierungsfahrplanImg;

const DynamicFeaturedGuides = () => {
  const { data: posts, isLoading } = useFeaturedPosts(4);
  const { ref, isInView } = useInView();

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container max-w-5xl mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!posts?.length) return null;

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="container max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3 text-foreground">Top-Ratgeber für Ihr Sanierungsprojekt</h2>
        <p className="text-center text-muted-foreground mb-10">Unsere wichtigsten Anleitungen für Ihre Planung.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, i) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className={`group block hover:no-underline ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="glass rounded-2xl h-full flex flex-col overflow-hidden hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
                <div className="w-full h-36 overflow-hidden">
                  <img
                    src={getImage(post)}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span
                    className="text-xs font-bold uppercase mb-2 self-start px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: post.topic_color }}
                  >
                    {post.topic}
                  </span>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                  <span className="text-primary font-semibold mt-auto flex items-center gap-1 text-sm group-hover:underline">
                    Zum Ratgeber <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicFeaturedGuides;
