
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, Pause, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { toast } from "sonner";

interface ScheduledPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
  scheduled_for?: string;
}

const ScheduledPublishing = () => {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<string>("");
  const [scheduleDateTime, setScheduleDateTime] = useState("");

  useEffect(() => {
    fetchScheduledPosts();
    // Set up real-time subscription for schedule changes
    const subscription = supabase
      .channel('scheduled_posts')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'blog_posts' }, () => {
        fetchScheduledPosts();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchScheduledPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, status, published_at, scheduled_for")
      .or("status.eq.scheduled,status.eq.draft")
      .order("published_at", { ascending: true });

    if (!error && data) {
      setScheduledPosts(data);
    }
    setLoading(false);
  };

  const schedulePost = async () => {
    if (!selectedPost || !scheduleDateTime) {
      toast.error("Bitte wählen Sie einen Artikel und ein Datum aus");
      return;
    }

    const { error } = await supabase
      .from("blog_posts")
      .update({
        status: 'scheduled',
        published_at: new Date(scheduleDateTime).toISOString(),
        scheduled_for: new Date(scheduleDateTime).toISOString()
      })
      .eq("id", selectedPost);

    if (error) {
      toast.error("Fehler beim Planen des Artikels");
    } else {
      toast.success("Artikel erfolgreich geplant");
      setSelectedPost("");
      setScheduleDateTime("");
      fetchScheduledPosts();
    }
  };

  const unschedulePost = async (postId: string) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({
        status: 'draft',
        scheduled_for: null
      })
      .eq("id", postId);

    if (error) {
      toast.error("Fehler beim Entfernen der Planung");
    } else {
      toast.success("Planung entfernt");
      fetchScheduledPosts();
    }
  };

  const publishNow = async (postId: string) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({
        status: 'published',
        published_at: new Date().toISOString()
      })
      .eq("id", postId);

    if (error) {
      toast.error("Fehler beim Veröffentlichen");
    } else {
      toast.success("Artikel veröffentlicht");
      fetchScheduledPosts();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div>Lade geplante Artikel...</div>;
  }

  const draftPosts = scheduledPosts.filter(p => p.status === 'draft');
  const scheduledOnlyPosts = scheduledPosts.filter(p => p.status === 'scheduled');

  return (
    <div className="space-y-6">
      {/* Schedule New Post */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Artikel planen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Artikel auswählen</label>
            <select
              value={selectedPost}
              onChange={(e) => setSelectedPost(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Artikel auswählen --</option>
              {draftPosts.map(post => (
                <option key={post.id} value={post.id}>
                  {post.title}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Veröffentlichungsdatum</label>
            <Input
              type="datetime-local"
              value={scheduleDateTime}
              onChange={(e) => setScheduleDateTime(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
          
          <Button onClick={schedulePost} disabled={!selectedPost || !scheduleDateTime}>
            <Clock className="h-4 w-4 mr-2" />
            Artikel planen
          </Button>
        </CardContent>
      </Card>

      {/* Scheduled Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>Geplante Artikel ({scheduledOnlyPosts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {scheduledOnlyPosts.length === 0 ? (
            <p className="text-gray-500">Keine geplanten Artikel vorhanden.</p>
          ) : (
            <div className="space-y-3">
              {scheduledOnlyPosts.map(post => (
                <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{post.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                      {post.published_at && (
                        <span className="text-sm text-gray-500">
                          Geplant für: {format(new Date(post.published_at), 'dd.MM.yyyy HH:mm', { locale: de })}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => publishNow(post.id)}
                    >
                      <Play className="h-4 w-4" />
                      Jetzt veröffentlichen
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => unschedulePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Planung entfernen
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduledPublishing;
