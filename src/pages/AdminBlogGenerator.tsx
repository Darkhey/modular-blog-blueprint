import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import BlogContentGenerator from "@/components/admin/BlogContentGenerator";

const AdminBlogGenerator = () => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/auth", { replace: true });
        return;
      }

      const { data: p, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error || !p || p.role !== "admin") {
        toast.error("Zugriff verweigert", {
          description: "Sie sind kein Administrator.",
        });
        navigate("/", { replace: true });
        return;
      }

      setProfile(p);
    };

    init();
  }, [navigate]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="text-xl text-gray-500 animate-pulse">Überprüfe Berechtigung...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-2xl mx-auto py-10 px-2">
        <Card>
          <CardHeader>
            <CardTitle>Automatische Blogerstellung</CardTitle>
          </CardHeader>
          <CardContent>
            <BlogContentGenerator onArticleCreated={() => {}} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminBlogGenerator;
