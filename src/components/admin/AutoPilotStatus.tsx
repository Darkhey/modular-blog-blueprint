import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Loader2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Sparkles,
  History,
} from "lucide-react";
import { toast } from "sonner";

interface GenerationRun {
  id: string;
  mode: string;
  category: string | null;
  focus_keyword: string | null;
  status: string;
  error_message: string | null;
  post_slug: string | null;
  post_title: string | null;
  created_at: string;
}

const STALE_HOURS = 36;

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const AutoPilotStatus = () => {
  const [lastPost, setLastPost] = useState<any>(null);
  const [runs, setRuns] = useState<GenerationRun[]>([]);
  const [loading, setLoading] = useState<null | "create" | "refresh">(null);
  const [fetching, setFetching] = useState(true);

  const fetchStatus = async () => {
    setFetching(true);
    const [{ data: post }, { data: runData }] = await Promise.all([
      supabase
        .from("blog_posts")
        .select("title, slug, published_at, topic, hero_image_url")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from("blog_generation_runs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10),
    ]);
    setLastPost(post);
    setRuns((runData as GenerationRun[]) || []);
    setFetching(false);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const triggerGeneration = async (mode: "create" | "refresh") => {
    setLoading(mode);
    try {
      const { data, error } = await supabase.functions.invoke("auto-generate-daily-post", {
        body: { mode },
      });

      if (error) throw error;

      if (data?.success) {
        toast.success(
          data.mode === "refresh"
            ? `Artikel aufgefrischt: "${data.title}"`
            : `Neuer Artikel erstellt: "${data.title}"`,
          { description: data.category ? `Kategorie: ${data.category}` : undefined },
        );
        fetchStatus();
      } else {
        throw new Error(data?.error || "Unbekannter Fehler");
      }
    } catch (err) {
      console.error("Auto-generate error:", err);
      toast.error("Fehler: " + (err as Error).message);
      fetchStatus();
    } finally {
      setLoading(null);
    }
  };

  const latestRun = runs[0];
  const lastSuccess = runs.find((r) => r.status === "success");
  const hoursSinceSuccess = lastSuccess
    ? (Date.now() - new Date(lastSuccess.created_at).getTime()) / 3_600_000
    : Infinity;
  const hasProblem =
    (latestRun && latestRun.status !== "success") ||
    (runs.length > 0 && hoursSinceSuccess > STALE_HOURS);

  return (
    <Card className="mb-6 border-dashed border-2 border-primary/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Bot className="h-5 w-5 text-primary" />
          Auto-Pilot
          <Badge variant="outline" className="ml-auto text-xs">
            Täglich 07:00 & 17:00 UTC
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasProblem && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm">
            <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="font-semibold text-destructive">Auto-Pilot steht</p>
              <p className="text-muted-foreground break-words">
                {latestRun && latestRun.status !== "success"
                  ? latestRun.error_message || `Letzter Lauf: ${latestRun.status}`
                  : `Seit über ${STALE_HOURS} Stunden kein erfolgreicher Lauf.`}
              </p>
              {latestRun?.status === "credits_exhausted" && (
                <p className="text-muted-foreground mt-1">
                  Bitte Credits im Lovable-Workspace aufladen.
                </p>
              )}
            </div>
          </div>
        )}

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button
            onClick={() => triggerGeneration("create")}
            disabled={loading !== null}
            variant="outline"
            size="sm"
          >
            {loading === "create" ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2" />
            )}
            Neuen Artikel generieren
          </Button>
          <Button
            onClick={() => triggerGeneration("refresh")}
            disabled={loading !== null}
            variant="outline"
            size="sm"
          >
            {loading === "refresh" ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Artikel auffrischen
          </Button>
        </div>

        {runs.length > 0 && (
          <div className="space-y-2">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <History className="h-3.5 w-3.5" />
              Letzte Läufe
            </p>
            <ul className="divide-y divide-border rounded-lg border border-border">
              {runs.map((run) => (
                <li key={run.id} className="flex items-start gap-2 p-2.5 text-xs">
                  {run.status === "success" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600 mt-0.5 shrink-0" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 text-destructive mt-0.5 shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-muted-foreground">{formatDateTime(run.created_at)}</span>
                      <Badge variant="secondary" className="text-[10px]">
                        {run.mode === "refresh" ? "Refresh" : "Neu"}
                      </Badge>
                      {run.category && (
                        <span className="text-muted-foreground">{run.category}</span>
                      )}
                      {run.focus_keyword && (
                        <span className="text-muted-foreground italic">„{run.focus_keyword}“</span>
                      )}
                    </div>
                    {run.post_title && <p className="font-medium truncate">{run.post_title}</p>}
                    {run.error_message && (
                      <p className="text-destructive break-words">{run.error_message}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AutoPilotStatus;
