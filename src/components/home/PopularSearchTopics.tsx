import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

interface TopicLink {
  query: string;
  impressions: number;
  slug: string;
  title: string;
}

const tokens = (value: string) =>
  value
    .toLowerCase()
    .split(/[^a-zäöüß0-9]+/)
    .filter((t) => t.length > 3);

/**
 * Shows what people actually search for (Search Console) and links each
 * query to the article that fits it best.
 */
const usePopularSearchTopics = (limit = 8) =>
  useQuery({
    queryKey: ['popular-search-topics', limit],
    staleTime: 30 * 60 * 1000,
    queryFn: async (): Promise<TopicLink[]> => {
      const [{ data: stats }, { data: posts }] = await Promise.all([
        supabase
          .from('search_console_stats')
          .select('query, impressions, clicks')
          .eq('dimension', 'query')
          .order('impressions', { ascending: false })
          .limit(120),
        supabase
          .from('blog_posts')
          .select('slug, title, focus_keyword, topic')
          .eq('status', 'published')
          .limit(300),
      ]);

      if (!stats?.length || !posts?.length) return [];

      const result: TopicLink[] = [];
      const usedQueries = new Set<string>();

      for (const row of stats) {
        const query = String((row as any).query || '').trim();
        if (!query || usedQueries.has(query.toLowerCase())) continue;

        const qTokens = tokens(query);
        if (qTokens.length === 0) continue;

        let best: { slug: string; title: string; score: number } | null = null;
        for (const post of posts as any[]) {
          const haystack = `${post.title} ${post.focus_keyword || ''} ${post.topic || ''}`.toLowerCase();
          const score = qTokens.reduce(
            (acc, token) => acc + (haystack.includes(token) ? token.length : 0),
            0,
          );
          if (score > 0 && (!best || score > best.score)) {
            best = { slug: post.slug, title: post.title, score };
          }
        }

        if (best && best.score >= 8) {
          usedQueries.add(query.toLowerCase());
          result.push({
            query,
            impressions: Number((row as any).impressions || 0),
            slug: best.slug,
            title: best.title,
          });
        }
        if (result.length >= limit) break;
      }

      return result;
    },
  });

const PopularSearchTopics = () => {
  const { data, isLoading } = usePopularSearchTopics();

  if (!isLoading && (!data || data.length === 0)) return null;

  return (
    <section className="py-14 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-2">
          <Search className="w-5 h-5 text-primary" />
          <span className="text-sm font-bold uppercase tracking-wider text-primary">
            Aus der Google-Suche
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          Meistgesuchte Themen
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {data?.map((item) => (
              <Link
                key={item.query}
                to={`/blog/${item.slug}`}
                className="group glass rounded-xl p-4 flex items-start justify-between gap-2 hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 hover:no-underline"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {item.query}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{item.title}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularSearchTopics;
