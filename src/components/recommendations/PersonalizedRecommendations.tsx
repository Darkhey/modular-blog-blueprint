
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Eye, ThumbsUp } from "lucide-react";
import { BlogPost } from "@/hooks/useBlogPosts";
import BlogCard from "@/components/blog/BlogCard";

interface RecommendationEngine {
  userInterests: string[];
  viewHistory: string[];
  recommendations: BlogPost[];
}

const PersonalizedRecommendations = () => {
  const [recommendations, setRecommendations] = useState<BlogPost[]>([]);
  const [trending, setTrending] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateRecommendations();
    fetchTrendingArticles();
  }, []);

  const generateRecommendations = async () => {
    // Get user's reading history from localStorage
    const viewHistory = JSON.parse(localStorage.getItem('articleViews') || '[]');
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    
    // Extract interests from history
    const interests = [...viewHistory, ...searchHistory].slice(0, 10);
    
    if (interests.length === 0) {
      // Show popular articles for new users
      const { data } = await supabase
        .from("blog_posts")
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
        .eq('status', 'published')
        .order('view_count', { ascending: false })
        .limit(6);
      
      if (data) setRecommendations(data);
      setLoading(false);
      return;
    }

    // Generate ML-style recommendations based on interests
    const { data, error } = await supabase
      .from("blog_posts")
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
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (!error && data) {
      // Score articles based on user interests
      const scoredArticles = data.map(post => ({
        ...post,
        score: calculateRecommendationScore(post, interests, viewHistory)
      }))
      .filter(post => !viewHistory.includes(post.slug))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

      setRecommendations(scoredArticles);
    }
    
    setLoading(false);
  };

  const calculateRecommendationScore = (post: any, interests: string[], viewHistory: string[]): number => {
    let score = 0;
    
    // Topic matching
    interests.forEach(interest => {
      if (post.topic.toLowerCase().includes(interest.toLowerCase())) score += 10;
      if (post.title.toLowerCase().includes(interest.toLowerCase())) score += 8;
      if (post.keywords?.some((k: string) => k.toLowerCase().includes(interest.toLowerCase()))) score += 6;
    });
    
    // Recency boost
    const daysOld = (new Date().getTime() - new Date(post.published_at).getTime()) / (1000 * 60 * 60 * 24);
    if (daysOld < 7) score += 5;
    else if (daysOld < 30) score += 2;
    
    // Engagement boost
    score += (post.view_count || 0) * 0.1;
    score += (post.like_count || 0) * 0.5;
    
    // Difficulty matching (prefer similar difficulty to viewed articles)
    if (post.difficulty && post.difficulty <= 3) score += 2;
    
    return score;
  };

  const fetchTrendingArticles = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select(`
        *,
        blog_authors(name)
      `)
      .eq('status', 'published')
      .gte('published_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order('view_count', { ascending: false })
      .limit(3);
    
    if (data) setTrending(data);
  };

  const trackView = (slug: string, topic: string) => {
    const views = JSON.parse(localStorage.getItem('articleViews') || '[]');
    const newViews = [slug, topic, ...views.filter((v: string) => v !== slug)].slice(0, 20);
    localStorage.setItem('articleViews', JSON.stringify(newViews));
  };

  if (loading) {
    return <div>Lade Empfehlungen...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Personalized Recommendations */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Für Sie empfohlen
            </CardTitle>
            <p className="text-sm text-gray-600">
              Basierend auf Ihren Interessen und Ihrem Leseverhalten
            </p>
          </CardHeader>
          <CardContent>
            {recommendations.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recommendations.map(post => (
                  <div 
                    key={post.id}
                    onClick={() => trackView(post.slug, post.topic)}
                  >
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Lesen Sie ein paar Artikel, um personalisierte Empfehlungen zu erhalten.
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Trending This Week */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Trending diese Woche
            </CardTitle>
            <p className="text-sm text-gray-600">
              Die meistgelesenen Artikel der letzten 7 Tage
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trending.map((post, index) => (
                <div 
                  key={post.id} 
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => trackView(post.slug, post.topic)}
                >
                  <Badge variant="outline" className="font-bold">
                    #{index + 1}
                  </Badge>
                  <div className="flex-1">
                    <h4 className="font-medium hover:text-blue-600">{post.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.view_count || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {post.like_count || 0}
                      </span>
                      <Badge variant="outline">{post.topic}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default PersonalizedRecommendations;
