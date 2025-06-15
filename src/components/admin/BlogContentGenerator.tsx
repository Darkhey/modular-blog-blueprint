
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Sparkles, FileText } from "lucide-react";
import { useBlogCategories } from "@/hooks/useBlogCategories";

interface BlogContentGeneratorProps {
  onArticleCreated: () => void;
}

const BlogContentGenerator = ({ onArticleCreated }: BlogContentGeneratorProps) => {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [articleLength, setArticleLength] = useState("medium");
  const [autoPublish, setAutoPublish] = useState(false);

  const { data: categories } = useBlogCategories();

  const generateArticle = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-content', {
        body: {
          topic: topic.trim() || null,
          categorySlug: categorySlug || null,
          articleLength,
          autoPublish
        }
      });

      if (error) throw error;

      if (data.success) {
        toast.success(
          `Artikel "${data.title}" erfolgreich ${data.status === 'published' ? 'veröffentlicht' : 'als Entwurf gespeichert'}!`
        );
        setTopic("");
        onArticleCreated();
      } else {
        throw new Error(data.error || "Unbekannter Fehler");
      }
    } catch (err) {
      console.error("Error generating article:", err);
      toast.error("Fehler beim Erstellen des Artikels: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const generateBulkArticles = async () => {
    if (!categories || categories.length === 0) {
      toast.error("Keine Kategorien verfügbar");
      return;
    }

    setLoading(true);
    const results = [];

    try {
      // Generate one article per category
      for (const category of categories.slice(0, 3)) { // Limit to 3 for demo
        const { data, error } = await supabase.functions.invoke('generate-blog-content', {
          body: {
            topic: null,
            categorySlug: category.slug,
            articleLength: "medium",
            autoPublish: false // Always draft for bulk
          }
        });

        if (error) {
          results.push({ category: category.name, success: false, error: error.message });
        } else if (data.success) {
          results.push({ category: category.name, success: true, title: data.title });
        }
      }

      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;

      toast.success(`${successful} Artikel erstellt, ${failed} fehlgeschlagen`);
      onArticleCreated();

    } catch (err) {
      toast.error("Fehler beim Bulk-Erstellen: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          KI-Content Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Thema (optional)</label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="z.B. Wärmepumpe 2025, Smart Home Trends..."
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Kategorie</label>
            <Select value={categorySlug} onValueChange={setCategorySlug} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder="Zufällige Kategorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Zufällige Kategorie</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Artikellänge</label>
            <Select value={articleLength} onValueChange={setArticleLength} disabled={loading}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Kurz (4-6 Min)</SelectItem>
                <SelectItem value="medium">Mittel (8-12 Min)</SelectItem>
                <SelectItem value="long">Lang (15-20 Min)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={autoPublish}
                onChange={(e) => setAutoPublish(e.target.checked)}
                disabled={loading}
                className="rounded"
              />
              <span className="text-sm">Sofort veröffentlichen</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            onClick={generateArticle} 
            disabled={loading}
            className="flex-1"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <FileText className="h-4 w-4 mr-2" />
            )}
            Artikel generieren
          </Button>
          
          <Button 
            onClick={generateBulkArticles} 
            disabled={loading}
            variant="outline"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2" />
            )}
            Bulk-Erstellung
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogContentGenerator;
