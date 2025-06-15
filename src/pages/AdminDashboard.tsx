
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const [session, setSession] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUserEmail(session?.user?.email ?? null);
      if (!session) navigate("/auth", { replace: true });
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUserEmail(session?.user?.email ?? null);
      if (!session) {
        navigate("/auth", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchProfileAndCounts = async () => {
      setLoading(true);
      // Profile holen
      if (session?.user?.id) {
        const { data: p } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .maybeSingle();
        setProfile(p);
      }
      // Artikel/Blog Einträge zählen
      const { count: blogCount } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true });
      setBlogCount(blogCount ?? null);

      // User zählen über profiles-Tabelle
      const { count: userCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });
      setUserCount(userCount ?? null);

      setLoading(false);
    };
    if (session?.user) fetchProfileAndCounts();
  }, [session?.user]);

  const onLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="text-xl text-gray-500 animate-pulse">Lade Dashboard...</span>
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
              Willkommen, {userEmail} <br />
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
