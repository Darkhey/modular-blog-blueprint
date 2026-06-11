import { Link } from 'react-router-dom';
import { ArrowRight, Newspaper, Clock } from 'lucide-react';
import { useRelatedPosts, BlogPost } from '@/hooks/useBlogPosts';

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

const getImage = (post: BlogPost) => {
  const searchText = `${post.title} ${post.topic}`;
  for (const [keyword, img] of topicImageMap) {
    if (searchText.includes(keyword)) return img;
  }
  return post.hero_image_url || post.cover_url || sanierungsfahrplanImg;
};

interface RelatedArticlesProps {
  currentSlug: string;
  topic?: string;
  keywords?: string[] | null;
  className?: string;
}

const RelatedArticles = ({ currentSlug, topic, keywords, className }: RelatedArticlesProps) => {
  const { data: posts, isLoading } = useRelatedPosts(currentSlug, topic, keywords, 3);

  if (isLoading || !posts || posts.length === 0) return null;

  return (
    <section
      aria-labelledby="related-articles-heading"
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8 ${className ?? ''}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Newspaper className="h-5 w-5" />
        </div>
        <h2 id="related-articles-heading" className="text-2xl font-bold text-gray-900">
          Das könnte Sie auch interessieren
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group block hover:no-underline rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
          >
            <div className="relative h-32 overflow-hidden">
              <img
                src={getImage(post)}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span
                className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[11px] font-semibold text-white shadow-sm"
                style={{ backgroundColor: post.topic_color }}
              >
                {post.topic}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {post.read_time} Min.
                </span>
                <span className="flex items-center gap-1 text-primary font-semibold">
                  Lesen <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
