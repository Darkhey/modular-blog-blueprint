import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  topic: string;
  topic_color: string;
  published_at: string;
  read_time: number;
  slug: string;
  seo_title?: string;
  seo_description?: string;
  keywords?: string[];
  difficulty?: number;
  savings_potential?: string;
  payback_time?: string;
  funding_available?: string;
  effort_level?: string;
  key_benefits?: string[];
  important_notice?: string;
  table_of_contents?: { id: string; title: string }[];
  costs?: { item: string; costPerSqm: string; totalCost: string; funding: string }[];
}

export const useBlogPosts = (topic?: string) => {
  return useQuery({
    queryKey: ['blog-posts', topic],
    queryFn: async () => {
      let query = (supabase.from('blog_posts') as any) // HACK: Bypass incorrect type definitions
        .select('*')
        .order('published_at', { ascending: false });

      if (topic) {
        query = query.eq('topic', topic);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }

      return data as BlogPost[];
    }
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await (supabase.from('blog_posts') as any) // HACK: Bypass incorrect type definitions
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching blog post:', error);
        throw error;
      }

      return data as BlogPost;
    },
    enabled: !!slug
  });
};
