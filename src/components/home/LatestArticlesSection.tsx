import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, Sparkles } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { Skeleton } from '@/components/ui/skeleton';
import { useInView } from '@/hooks/useInView';

import heizungImg from '@/assets/blog-hero-heizung.jpg';
import daemmungImg from '@/assets/blog-hero-daemmung.jpg';
import solarImg from '@/assets/blog-hero-solar.jpg';
import foerdermittelImg from '@/assets/blog-hero-foerdermittel.jpg';
import sanierungsfahrplanImg from '@/assets/sanierungsfahrplan-hero.jpg';
import waermepumpeImg from '@/assets/blog-hero-waermepumpe.jpg';
import fensterImg from '@/assets/blog-hero-fenster.jpg';
import smarthomeImg from '@/assets/blog-hero-smarthome.jpg';

const topicImageMap: [string, string][] = [
  ['Fenster', fensterImg],
  ['Smart', smarthomeImg],
  ['Wärmepumpe', waermepumpeImg],
  ['Heizung', heizungImg],
  ['Dämmung', daemmungImg],
  ['Solar', solarImg],
  ['Photovoltaik', solarImg],
  ['Förder', foerdermittelImg],
  ['KfW', foerdermittelImg],
  ['BAFA', foerdermittelImg],
];

const getImage = (post: any) => {
  const searchText = `${post.title} ${post.topic}`;
  for (const [keyword, img] of topicImageMap) {
    if (searchText.includes(keyword)) return img;
  }
  return post.hero_image_url || post.cover_url || sanierungsfahrplanImg;
};

const isNew = (date: string) =>
  date && (Date.now() - new Date(date).getTime()) < 7 * 24 * 60 * 60 * 1000;

const LatestArticlesSection = () => {
  const { data: posts, isLoading } = useBlogPosts(undefined, 4);
  const { ref, isInView } = useInView();

  if (!isLoading && (!posts || posts.length === 0)) return null;

  return (
    <section ref={ref} className="py-16 bg-secondary/30">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold uppercase tracking-wider text-primary">
                Frisch veröffentlicht
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Neueste Artikel & Ratgeber
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline self-start sm:self-auto"
          >
            Alle Artikel ansehen <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts?.map((post, i) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className={`group block hover:no-underline ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <article className="glass rounded-2xl h-full flex flex-col overflow-hidden hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
                  <div className="relative w-full h-40 overflow-hidden">
                    <img
                      src={getImage(post)}
                      alt={(post as any).image_alt || post.title}
                      width={640}
                      height={360}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />

                    <span
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
                      style={{ backgroundColor: post.topic_color }}
                    >
                      {post.topic}
                    </span>
                    {isNew(post.published_at) && (
                      <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-900">
                        NEU
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} />
                        {new Date(post.published_at).toLocaleDateString('de-DE')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} />
                        {post.read_time} Min.
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestArticlesSection;
