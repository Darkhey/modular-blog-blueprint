
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getSessionAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (!session) {
        navigate("/auth", { replace: true });
        return;
      }

      // Profile holen und Rolle prüfen
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

      // User ist Admin, lade den Rest der Daten
      setProfile(p);
      setIsAuthorized(true);

      const { count: blogCount } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true });
      setBlogCount(blogCount ?? null);

      const { count: userCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });
      setUserCount(userCount ?? null);

      setLoading(false);
    };

    getSessionAndProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        toast.info("Sie wurden ausgeloggt.");
        navigate("/auth", { replace: true });
      }
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const onLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    navigate("/", { replace: true });
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="text-xl text-gray-500 animate-pulse">Überprüfe Berechtigung...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
            <div className="text-gray-500 text-sm">
              Willkommen, {profile?.email || session?.user?.email} <br />
              {profile?.role ? `Rolle: ${profile.role}` : ""}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6 text-center mb-8">
              <div>
                <div className="text-lg font-semibold">{userCount ?? "—"}</div>
                <div className="text-gray-500">Nutzer</div>
              </div>
              <div>
                <div className="text-lg font-semibold">{blogCount ?? "—"}</div>
                <div className="text-gray-500">Blogartikel</div>
              </div>
            </div>
            {/* Navigation for blog admin */}
            <Button
              className="w-full mb-4"
              variant="default"
              onClick={() => navigate("/admin/blog")}
            >
              Blogartikel verwalten
            </Button>
            <Button variant="secondary" className="w-full" onClick={onLogout}>
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
