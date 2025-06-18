import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BlogPostEditForm from "@/components/admin/BlogPostEditForm";
import BlogContentGenerator from "@/components/admin/BlogContentGenerator";
import ContentManagementTabs from "@/components/admin/ContentManagementTabs";
import { Eye, GitBranch } from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
  view_count?: number;
};

const AdminBlogPosts = () => {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [showContentManagement, setShowContentManagement] = useState(false);
  const [selectedPostForVersions, setSelectedPostForVersions] = useState<string>("");

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
  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, status, published_at, view_count")
      .order('created_at', { ascending: false });
    if (error) {
      toast.error("Fehler beim Laden der Blogartikel");
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!profile) return;
    fetchPosts();
  }, [profile, showEditor]);

  const handleArticleCreated = () => {
    fetchPosts(); // Refresh the list
  };

  const openVersionControl = (postId: string) => {
    setSelectedPostForVersions(postId);
    setShowContentManagement(true);
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="text-xl text-gray-500 animate-pulse">Überprüfe Berechtigung...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-6xl mx-auto py-10 px-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Blogartikel verwalten</CardTitle>
                <div className="text-sm text-gray-500">
                  Admin: {profile?.email}
                </div>
              </div>
              <Button
                onClick={() => setShowContentManagement(!showContentManagement)}
                variant={showContentManagement ? "default" : "outline"}
              >
                {showContentManagement ? "Artikel-Liste" : "Content-Management"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {!showContentManagement ? (
              <>
                {/* AI Content Generator */}
                <BlogContentGenerator onArticleCreated={handleArticleCreated} />
                
                {/* Manual creation button */}
                <Button 
                  onClick={() => { setEditPostId(null); setShowEditor(true); }}
                  variant="outline"
                  className="mb-4"
                >
                  + Manuell erstellen
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
                          <div className="text-xs text-gray-400 flex items-center gap-2">
                            /{bp.slug} &middot; {bp.status} 
                            {bp.published_at ? ` &middot; ${new Date(bp.published_at).toLocaleDateString()}` : ""}
                            {typeof bp.view_count === 'number' && (
                              <span className="flex items-center gap-1">
                                &middot; <Eye className="h-3 w-3" /> {bp.view_count}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openVersionControl(bp.id)}
                          >
                            <GitBranch className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => { setEditPostId(bp.id); setShowEditor(true); }}
                          >
                            Bearbeiten
                          </Button>
                        </div>
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
              </>
            ) : (
              <ContentManagementTabs selectedPostId={selectedPostForVersions} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminBlogPosts;
