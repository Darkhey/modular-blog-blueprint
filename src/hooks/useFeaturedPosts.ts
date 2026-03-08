import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from './useBlogPosts';

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
        console.error('Error fetching featured posts:', error);
        throw error;
      }

      return data as BlogPost[];
    },
  });
};
