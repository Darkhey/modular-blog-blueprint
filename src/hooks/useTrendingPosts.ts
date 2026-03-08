import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from './useBlogPosts';

export const useTrendingPosts = (limit = 3) => {
  return useQuery({
    queryKey: ['trending-posts', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('view_count', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as BlogPost[];
    },
    staleTime: 5 * 60 * 1000,
  });
};
