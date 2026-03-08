import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Loader2, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const AutoPilotStatus = () => {
  const [lastPost, setLastPost] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchLatestAutoPost = async () => {
    setFetching(true);
    const { data } = await supabase
      .from("blog_posts")
      .select("title, slug, published_at, topic, hero_image_url")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setLastPost(data);
    setFetching(false);
  };

  useEffect(() => {
    fetchLatestAutoPost();
  }, []);

  const triggerGeneration = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("auto-generate-daily-post", {
        body: {},
      });

      if (error) throw error;

      if (data?.success) {
        toast.success(`Neuer Artikel erstellt: "${data.title}"`, {
          description: `Kategorie: ${data.category}`,
        });
        fetchLatestAutoPost();
      } else {
        throw new Error(data?.error || "Unbekannter Fehler");
      }
    } catch (err) {
      console.error("Auto-generate error:", err);
      toast.error("Fehler: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6 border-dashed border-2 border-primary/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Bot className="h-5 w-5 text-primary" />
          Auto-Pilot
          <Badge variant="outline" className="ml-auto text-xs">
            Täglich 07:00 UTC
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {fetching ? (
          <p className="text-sm text-muted-foreground">Lade...</p>
        ) : lastPost ? (
          <div className="flex items-start gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">{lastPost.title}</p>
              <p className="text-muted-foreground text-xs">
                {lastPost.topic} · {new Date(lastPost.published_at).toLocaleDateString("de-DE")}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            Noch keine automatisch generierten Artikel
          </div>
        )}

        <Button
          onClick={triggerGeneration}
          disabled={loading}
          variant="outline"
          size="sm"
          className="w-full"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Jetzt generieren
        </Button>
      </CardContent>
    </Card>
  );
};

export default AutoPilotStatus;
