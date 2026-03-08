import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost, getMockFallbackPosts } from './useBlogPosts';

// Mock posts that should be treated as featured
const FEATURED_MOCK_SLUGS = [
  'sanierungsfahrplan-2025-optimale-reihenfolge',
  'altbau-ratgeber-2025',
];

export const useFeaturedPosts = (limit = 3) => {
  return useQuery({
    queryKey: ['featured-posts', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*, blog_authors(name)')
        .eq('is_featured', true)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching featured posts, using fallback:', error);
      }

      const supabasePosts = (data || []) as BlogPost[];
      const supabaseSlugs = new Set(supabasePosts.map(p => p.slug));

      // Add featured mock posts that don't exist in Supabase
      const mockFeatured = getMockFallbackPosts()
        .filter(p => FEATURED_MOCK_SLUGS.includes(p.slug) && !supabaseSlugs.has(p.slug));

      const merged = [...supabasePosts, ...mockFeatured];
      return merged.slice(0, limit);
    },
  });
};
