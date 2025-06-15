
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Edit, Eye } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";
import { de } from "date-fns/locale";

interface ScheduledPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
  scheduled_for?: string | null;
}

const ContentCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScheduledPosts();
  }, [currentDate]);

  const fetchScheduledPosts = async () => {
    setLoading(true);
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);

    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, status, published_at, scheduled_for")
      .gte("published_at", start.toISOString())
      .lte("published_at", end.toISOString())
      .order("published_at");

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  const getPostsForDay = (day: Date) => {
    return posts.filter(post => 
      post.published_at && isSameDay(new Date(post.published_at), day)
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Content-Calendar
        </CardTitle>
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
          >
            ← Vorheriger Monat
          </Button>
          <h3 className="text-lg font-semibold">
            {format(currentDate, 'MMMM yyyy', { locale: de })}
          </h3>
          <Button
            variant="outline"
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
          >
            Nächster Monat →
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
            <div key={day} className="text-center font-medium text-gray-500 p-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {getDaysInMonth().map(day => {
            const dayPosts = getPostsForDay(day);
            const isCurrentDay = isToday(day);
            
            return (
              <div
                key={day.toISOString()}
                className={`min-h-[100px] p-2 border rounded-lg ${
                  isCurrentDay ? 'bg-blue-50 border-blue-200' : 'bg-white'
                }`}
              >
                <div className={`text-sm font-medium ${isCurrentDay ? 'text-blue-600' : ''}`}>
                  {format(day, 'd')}
                </div>
                <div className="space-y-1 mt-1">
                  {dayPosts.map(post => (
                    <div
                      key={post.id}
                      className="text-xs p-1 rounded bg-gradient-to-r from-green-100 to-blue-100"
                    >
                      <div className="font-medium truncate">{post.title}</div>
                      <Badge className={`text-xs ${getStatusColor(post.status)}`}>
                        {post.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCalendar;
