
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BlogPostEditForm from "@/components/admin/BlogPostEditForm";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
};

const AdminBlogPosts = () => {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editPostId, setEditPostId] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fetch session/profile
  useEffect(() => {
    const getSessionAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (!session) {
        navigate("/auth", { replace: true });
        return;
      }
      const { data: p, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();
      
      if (error || !p || p.role !== 'admin') {
        toast.error("Zugriff verweigert", { description: "Sie sind kein Administrator." });
        navigate("/", { replace: true });
        return;
      }
      setProfile(p);
    };
    getSessionAndProfile();
  }, [navigate]);

  // Fetch blog posts
  useEffect(() => {
    if (!profile) return;
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, status, published_at")
        .order('published_at', { ascending: false });
      if (error) {
        toast.error("Fehler beim Laden der Blogartikel");
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [profile, showEditor]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="text-xl text-gray-500 animate-pulse">Überprüfe Berechtigung...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-10 px-2">
        <Card>
          <CardHeader>
            <CardTitle>Blogartikel verwalten</CardTitle>
            <div className="text-sm text-gray-500">
              Admin: {profile?.email}
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => { setEditPostId(null); setShowEditor(true); }}
              variant="default"
              className="mb-4"
            >
              + Neuer Blogartikel
            </Button>
            {loading ? (
              <div>Lade Blogartikel...</div>
            ) : (
              <ul className="divide-y">
                {posts.length === 0 && <li className="py-3">Noch keine Blogartikel vorhanden.</li>}
                {posts.map(bp => (
                  <li key={bp.id} className="py-3 flex justify-between items-center gap-3">
                    <div>
                      <div className="font-semibold">{bp.title}</div>
                      <div className="text-xs text-gray-400">/{bp.slug} &middot; {bp.status} {bp.published_at ? `&middot; ${new Date(bp.published_at).toLocaleDateString()}` : ""}</div>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => { setEditPostId(bp.id); setShowEditor(true); }}
                    >
                      Bearbeiten
                    </Button>
                  </li>
                ))}
              </ul>
            )}
            {showEditor && (
              <BlogPostEditForm
                postId={editPostId}
                onClose={() => { setShowEditor(false); setEditPostId(null); }}
                onSaved={() => { setShowEditor(false); setEditPostId(null); toast.success("Gespeichert."); }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminBlogPosts;
