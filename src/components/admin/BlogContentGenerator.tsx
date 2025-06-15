
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Sparkles, Image } from "lucide-react";
import { useBlogCategories } from "@/hooks/useBlogCategories";
import BlogContentGeneratorForm from "./BlogContentGeneratorForm";
import BlogContentGeneratorActions from "./BlogContentGeneratorActions";
import BlogContentGeneratorInfo from "./BlogContentGeneratorInfo";

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
        <BlogContentGeneratorInfo />
        
        <BlogContentGeneratorForm
          topic={topic}
          setTopic={setTopic}
          categorySlug={categorySlug}
          setCategorySlug={setCategorySlug}
          articleLength={articleLength}
          setArticleLength={setArticleLength}
          autoPublish={autoPublish}
          setAutoPublish={setAutoPublish}
          selectedImageUrl={selectedImageUrl}
          setSelectedImageUrl={setSelectedImageUrl}
          loading={loading}
        />

        <BlogContentGeneratorActions
          onGenerateArticle={generateArticle}
          onGenerateBulkArticles={generateBulkArticles}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
};

export default BlogContentGenerator;
