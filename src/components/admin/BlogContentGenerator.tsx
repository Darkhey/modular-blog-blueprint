
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Sparkles, FileText, Image, X } from "lucide-react";
import { useBlogCategories } from "@/hooks/useBlogCategories";
import { UnsplashImagePicker } from "./UnsplashImagePicker";

interface BlogContentGeneratorProps {
  onArticleCreated: () => void;
}

const BlogContentGenerator = ({ onArticleCreated }: BlogContentGeneratorProps) => {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [articleLength, setArticleLength] = useState("medium");
  const [autoPublish, setAutoPublish] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const { data: categories } = useBlogCategories();

  useEffect(() => {
    if (!topic) {
      setSelectedImageUrl(null);
    }
  }, [topic]);

  const generateArticle = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-content', {
        body: {
          topic: topic.trim() || null,
          categorySlug: categorySlug || null,
          articleLength,
          autoPublish,
          imageUrl: selectedImageUrl,
        }
      });

      if (error) throw error;

      if (data.success) {
        toast.success(
          `Artikel "${data.title}" erfolgreich ${data.status === 'published' ? 'veröffentlicht' : 'als Entwurf gespeichert'}!`,
          {
            description: data.image_url ? "Mit Titelbild" : "Fallback-Bild verwendet"
          }
        );
        setTopic("");
        setSelectedImageUrl(null);
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

      toast.success(`${successful} Artikel erstellt, ${failed} fehlgeschlagen`, {
        description: "Alle Artikel mit automatischen Titelbildern"
      });
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
          <span className="ml-2 text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
            <Image className="h-3 w-3" />
            Auto-Bilder
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Image className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Automatische & manuelle Bildauswahl</h4>
              <p className="text-sm text-blue-700 mt-1">
                Jeder Artikel erhält automatisch ein Titelbild. Du kannst auch manuell ein Bild über die Unsplash-Suche auswählen.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div>
            <label className="block text-sm font-medium mb-2">Thema (optional)</label>
            <div className="flex gap-2">
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="z.B. Wärmepumpe 2025, Smart Home Trends..."
                disabled={loading}
              />
              <UnsplashImagePicker
                initialQuery={topic}
                onImageSelect={setSelectedImageUrl}
              >
                <Button variant="outline" disabled={!topic.trim() || loading} title="Titelbild manuell auswählen">
                  <Image />
                </Button>
              </UnsplashImagePicker>
            </div>
            {selectedImageUrl && (
              <div className="mt-2 relative w-32 h-20 bg-gray-100 rounded-md">
                <img src={selectedImageUrl} alt="Vorausgewähltes Bild" className="rounded-md object-cover w-full h-full" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-black/50 hover:bg-black/70"
                  onClick={() => setSelectedImageUrl(null)}
                >
                  <X className="h-4 w-4 text-white" />
                </Button>
              </div>
            )}
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
