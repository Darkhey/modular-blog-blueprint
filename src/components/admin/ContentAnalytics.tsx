
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Eye, Heart, MessageCircle, TrendingUp, Clock, Users } from "lucide-react";

interface PostAnalytics {
  id: string;
  title: string;
  slug: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  published_at: string;
  read_time: number;
  topic: string;
}

interface TopicStats {
  topic: string;
  posts: number;
  total_views: number;
  avg_engagement: number;
}

const ContentAnalytics = () => {
  const [posts, setPosts] = useState<PostAnalytics[]>([]);
  const [topicStats, setTopicStats] = useState<TopicStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    
    // Calculate date range
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

    // Fetch post analytics
    const { data: postsData, error: postsError } = await supabase
      .from("blog_posts")
      .select("id, title, slug, view_count, like_count, comment_count, published_at, read_time, topic")
      .eq("status", "published")
      .gte("published_at", startDate.toISOString())
      .order("view_count", { ascending: false })
      .limit(20);

    if (!postsError && postsData) {
      setPosts(postsData);
      
      // Calculate topic statistics
      const topicMap = new Map<string, TopicStats>();
      postsData.forEach(post => {
        const existing = topicMap.get(post.topic) || {
          topic: post.topic,
          posts: 0,
          total_views: 0,
          avg_engagement: 0
        };
        
        existing.posts += 1;
        existing.total_views += post.view_count || 0;
        existing.avg_engagement += (post.like_count || 0) + (post.comment_count || 0);
        
        topicMap.set(post.topic, existing);
      });
      
      const topicStatsArray = Array.from(topicMap.values()).map(stat => ({
        ...stat,
        avg_engagement: stat.avg_engagement / stat.posts
      }));
      
      setTopicStats(topicStatsArray.sort((a, b) => b.total_views - a.total_views));
    }
    
    setLoading(false);
  };

  const totalViews = posts.reduce((sum, post) => sum + (post.view_count || 0), 0);
  const totalLikes = posts.reduce((sum, post) => sum + (post.like_count || 0), 0);
  const totalComments = posts.reduce((sum, post) => sum + (post.comment_count || 0), 0);
  const avgReadTime = posts.reduce((sum, post) => sum + post.read_time, 0) / posts.length || 0;

  if (loading) {
    return <div>Lade Analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Zeitraum:</span>
        {(['7d', '30d', '90d'] as const).map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1 text-sm rounded ${
              timeRange === range
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {range === '7d' ? '7 Tage' : range === '30d' ? '30 Tage' : '90 Tage'}
          </button>
        ))}
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Gesamtansichten</p>
                <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Likes</p>
                <p className="text-2xl font-bold">{totalLikes.toLocaleString()}</p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Kommentare</p>
                <p className="text-2xl font-bold">{totalComments.toLocaleString()}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">∅ Lesezeit</p>
                <p className="text-2xl font-bold">{Math.round(avgReadTime)} Min</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Top Artikel (nach Ansichten)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {posts.slice(0, 10).map((post, index) => (
              <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">#{index + 1}</Badge>
                  <div>
                    <h4 className="font-medium">{post.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.view_count || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {post.like_count || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {post.comment_count || 0}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge>{post.topic}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Topic Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance nach Themen</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topicStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="topic" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total_views" fill="#3B82F6" name="Ansichten" />
              <Bar dataKey="avg_engagement" fill="#10B981" name="∅ Engagement" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentAnalytics;
