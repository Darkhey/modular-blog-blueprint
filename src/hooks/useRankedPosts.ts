import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost, getMockFallbackPosts } from './useBlogPosts';

/**
 * Ranks published articles by a blended score:
 * - Search Console performance of the article URL (clicks + impressions)
 * - on-site popularity (view_count)
 * - freshness (recent articles get a decaying bonus)
 * - editorial flag (is_featured)
 *
 * Used for the dynamic homepage highlights so the front page always shows
 * what actually performs, not a hardcoded article.
 */
export interface RankedPost extends BlogPost {
  score: number;
}

const daysSince = (iso?: string) =>
  iso ? (Date.now() - new Date(iso).getTime()) / 86_400_000 : 9999;

export const useRankedPosts = (limit = 4) => {
  return useQuery({
    queryKey: ['ranked-posts', limit],
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<RankedPost[]> => {
      const [{ data: posts, error }, { data: stats }] = await Promise.all([
        supabase
          .from('blog_posts')
          .select('*, blog_authors(name)')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(120),
        supabase
          .from('search_console_stats')
          .select('page, clicks, impressions, position')
          .eq('dimension', 'page')
          .limit(500),
      ]);

      if (error) console.error('Error fetching posts for ranking:', error);

      const base = ((posts || []) as BlogPost[]).length
        ? ((posts || []) as BlogPost[])
        : getMockFallbackPosts();

      const perf = new Map<string, { clicks: number; impressions: number }>();
      for (const row of stats || []) {
        const page: string = (row as any).page || '';
        const match = page.match(/\/blog\/([^/?#]+)/);
        if (!match) continue;
        const current = perf.get(match[1]) || { clicks: 0, impressions: 0 };
        perf.set(match[1], {
          clicks: current.clicks + Number((row as any).clicks || 0),
          impressions: current.impressions + Number((row as any).impressions || 0),
        });
      }

      const ranked = base.map((post) => {
        const p = perf.get(post.slug);
        const searchScore = p ? p.clicks * 12 + p.impressions * 0.6 : 0;
        const viewScore = Math.min(60, (post.view_count || 0) * 0.5);
        const age = daysSince(post.published_at);
        const freshness = age < 45 ? 40 * (1 - age / 45) : 0;
        const editorial = post.is_featured ? 25 : 0;
        const completeness = (post.faq ? 6 : 0) + (post.hero_image_url ? 4 : 0);
        return {
          ...post,
          score: searchScore + viewScore + freshness + editorial + completeness,
        };
      });

      return ranked.sort((a, b) => b.score - a.score).slice(0, limit);
    },
  });
};
