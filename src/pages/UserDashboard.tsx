
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const UserDashboard = () => {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth", { replace: true });
        return;
      }
      
      setSession(session);
      
      const { data, error } = await supabase
        .from("profiles")
        .select("username, role")
        .eq("id", session.user.id)
        .maybeSingle();
      
      if (data) {
        setProfile(data);
        
        if (data.role === 'admin') {
          navigate("/admin", { replace: true });
          return;
        }
      }
      
      setLoading(false);
    };
    
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        toast.info("Sie wurden ausgeloggt.");
        navigate("/auth", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const onLogout = async () => {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-xl text-gray-500 animate-pulse">Lade Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <div className="text-gray-500 text-sm">
              Willkommen, {profile?.username || session?.user?.email}
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full mb-4" onClick={() => navigate('/admin')}>
              Admin Dashboard
            </Button>
            <Button className="w-full" variant="secondary" onClick={onLogout}>
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
