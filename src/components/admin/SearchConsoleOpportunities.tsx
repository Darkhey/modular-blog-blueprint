import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Search, Sparkles, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface Opportunity {
  query: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  potential: number;
}

const useOpportunities = () =>
  useQuery({
    queryKey: ["search-console-opportunities"],
    staleTime: 10 * 60 * 1000,
    queryFn: async (): Promise<Opportunity[]> => {
      const [{ data: stats }, { data: posts }] = await Promise.all([
        supabase
          .from("search_console_stats")
          .select("query, impressions, clicks, ctr, position")
          .eq("dimension", "query")
          .gte("impressions", 5)
          .order("impressions", { ascending: false })
          .limit(300),
        supabase.from("blog_posts").select("title, focus_keyword").eq("status", "published"),
      ]);

      const covered = (posts || []).map((p: any) =>
        `${p.title || ""} ${p.focus_keyword || ""}`.toLowerCase(),
      );

      const rows = (stats || [])
        .filter((row: any) => row.query)
        .filter((row: any) => !covered.some((c) => c.includes(String(row.query).toLowerCase())))
        .map((row: any) => {
          const impressions = Number(row.impressions || 0);
          const position = Number(row.position || 0);
          // Impressions weighted by how much headroom the current position leaves.
          const headroom = position > 3 ? Math.min(1, (position - 3) / 20) : 0.1;
          return {
            query: row.query as string,
            impressions,
            clicks: Number(row.clicks || 0),
            ctr: Number(row.ctr || 0),
            position,
            potential: impressions * headroom,
          };
        })
        .sort((a, b) => b.potential - a.potential)
        .slice(0, 25);

      return rows;
    },
  });

const SearchConsoleOpportunities = () => {
  const { data, isLoading, refetch } = useOpportunities();
  const [running, setRunning] = useState<string | null>(null);

  const createArticle = async (query: string) => {
    setRunning(query);
    try {
      const { data: result, error } = await supabase.functions.invoke(
        "auto-generate-daily-post",
        { body: { mode: "create", focus_keyword: query } },
      );
      if (error) throw error;
      if (!result?.success) throw new Error(result?.error || "Unbekannter Fehler");
      toast.success(`Artikel erstellt: "${result.title}"`);
      refetch();
    } catch (err) {
      toast.error("Fehler: " + (err as Error).message);
    } finally {
      setRunning(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-5 w-5 text-primary" />
          Search-Console-Chancen
        </CardTitle>
        <CardDescription>
          Suchanfragen mit Impressionen, für die es noch keinen passenden Artikel gibt – sortiert
          nach Potenzial.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : !data || data.length === 0 ? (
          <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            Noch keine Search-Console-Daten synchronisiert oder alle Top-Queries sind abgedeckt.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {data.map((row) => (
              <li
                key={row.query}
                className="flex flex-col sm:flex-row sm:items-center gap-2 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{row.query}</p>
                  <div className="flex flex-wrap gap-2 mt-1 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-[10px]">
                      {Math.round(row.impressions)} Impressionen
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      Pos. {row.position.toFixed(1)}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      {Math.round(row.clicks)} Klicks
                    </Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={running !== null}
                  onClick={() => createArticle(row.query)}
                >
                  {running === row.query ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="h-4 w-4 mr-2" />
                  )}
                  Artikel dazu erstellen
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchConsoleOpportunities;
