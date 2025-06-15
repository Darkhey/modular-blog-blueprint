
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
  table_of_contents?: any;
  costs: any;
  // Optional: Tags als Teil der BlogPosts (Array)
  blog_post_tags?: {
    tag_id: string;
    blog_tags?: {
      id: string;
      slug: string;
      name: string;
    };
  }[];
}

export const useBlogPosts = (topic?: string, limit?: number, tag?: string) => {
  return useQuery({
    queryKey: ['blog-posts', topic, limit, tag],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          blog_post_tags (
            tag_id,
            blog_tags (
              id,
              slug,
              name
            )
          )
        `)
        .order('published_at', { ascending: false });

      if (topic) {
        query = query.eq('topic', topic);
      }

      if (tag) {
        // Nur blog_posts mit passendem Tag auswählen
        query = query.contains('keywords', [tag]);
      }

      if (limit) {
        query = query.limit(limit);
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
      const { data, error } = await supabase
        .from('blog_posts')
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
