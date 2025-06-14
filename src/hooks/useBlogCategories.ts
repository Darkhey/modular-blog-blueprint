
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
}

export const useBlogCategories = () => {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching blog categories:', error);
        throw error;
      }

      return data as BlogCategory[];
    }
  });
};

export const useBlogCategoryBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['blog-category', slug],
    queryFn: async () => {
      if (!slug) return null;

      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        // Return null if no category is found (e.g., 404)
        if (error.code === 'PGRST116') {
          console.warn(`No blog category found for slug: ${slug}`);
          return null;
        }
        // For other errors, re-throw
        console.error(`Error fetching blog category "${slug}":`, error);
        throw error;
      }

      return data as BlogCategory;
    },
    enabled: !!slug
  });
};
