
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { mockBlogPosts } from '@/data/mockBlogPosts';

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
  hero_image_url?: string;
  cover_url?: string;
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
  blog_authors?: {
    name: string;
  } | null;
  // Optional: Tags als Teil der BlogPosts (Array)
  blog_post_tags?: {
    tag_id: string;
    blog_tags?: {
      id: string;
      slug: string;
      name: string;
    };
  }[];
  // New fields for enhanced content management
  status?: string;
  scheduled_for?: string;
  view_count?: number;
  like_count?: number;
  comment_count?: number;
  is_featured?: boolean;
}

// Convert mock camelCase data to snake_case BlogPost format
const convertMockPost = (mock: any): BlogPost => ({
  id: mock.id,
  title: mock.title,
  excerpt: mock.excerpt,
  content: mock.content,
  topic: mock.topic,
  topic_color: mock.topicColor,
  published_at: mock.publishedAt,
  read_time: mock.readTime,
  slug: mock.slug,
  hero_image_url: mock.heroImageUrl,
  cover_url: mock.coverUrl,
  seo_title: mock.seoTitle,
  seo_description: mock.seoDescription,
  keywords: mock.keywords,
  difficulty: mock.difficulty,
  savings_potential: mock.savingsPotential,
  payback_time: mock.paybackTime,
  funding_available: mock.fundingAvailable,
  effort_level: mock.effortLevel,
  key_benefits: mock.keyBenefits,
  important_notice: mock.importantNotice,
  table_of_contents: mock.tableOfContents,
  costs: mock.costs,
  status: 'published',
});

const getMockFallbackPosts = (): BlogPost[] =>
  mockBlogPosts.map(convertMockPost);

export const useBlogPosts = (topic?: string, limit?: number, tag?: string) => {
  return useQuery({
    queryKey: ['blog-posts', topic, limit, tag],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          blog_authors(name),
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
        query = query.contains('keywords', [tag]);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching blog posts, using fallback:', error);
        // Fallback to mock data
        let fallback = getMockFallbackPosts();
        if (topic) fallback = fallback.filter(p => p.topic === topic);
        if (tag) fallback = fallback.filter(p => p.keywords?.includes(tag));
        if (limit) fallback = fallback.slice(0, limit);
        return fallback;
      }

      // Merge: add mock posts that don't exist in Supabase
      const supabaseSlugs = new Set((data || []).map((p: any) => p.slug));
      let mockFallbacks = getMockFallbackPosts().filter(p => !supabaseSlugs.has(p.slug));
      if (topic) mockFallbacks = mockFallbacks.filter(p => p.topic === topic);
      if (tag) mockFallbacks = mockFallbacks.filter(p => p.keywords?.includes(tag));

      const merged = [...(data as BlogPost[]), ...mockFallbacks]
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

      return limit ? merged.slice(0, limit) : merged;
    }
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*, blog_authors(name)')
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

// New hook for analytics and admin features
export const useBlogPostAnalytics = (timeRange: '7d' | '30d' | '90d' = '30d') => {
  return useQuery({
    queryKey: ['blog-post-analytics', timeRange],
    queryFn: async () => {
      const endDate = new Date();
      const startDate = new Date();
      
      switch (timeRange) {
        case '7d':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(endDate.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(endDate.getDate() - 90);
          break;
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, view_count, like_count, comment_count, published_at, read_time, topic, status')
        .eq('status', 'published')
        .gte('published_at', startDate.toISOString())
        .order('view_count', { ascending: false });

      if (error) {
        console.error('Error fetching blog post analytics:', error);
        throw error;
      }

      return data as BlogPost[];
    }
  });
};
