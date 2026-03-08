import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface BlogStats {
  totalPosts: number;
  totalViews: number;
  avgReadTime: number;
}

export const useBlogStats = () => {
  return useQuery({
    queryKey: ['blog-stats'],
    queryFn: async (): Promise<BlogStats> => {
      const { data, error, count } = await supabase
        .from('blog_posts')
        .select('view_count, read_time', { count: 'exact' })
        .eq('status', 'published');

      if (error) throw error;

      const totalViews = data?.reduce((sum, p) => sum + (p.view_count || 0), 0) ?? 0;
      const avgReadTime = data?.length
        ? Math.round(data.reduce((sum, p) => sum + (p.read_time || 0), 0) / data.length)
        : 0;

      return {
        totalPosts: count ?? data?.length ?? 0,
        totalViews,
        avgReadTime,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};
