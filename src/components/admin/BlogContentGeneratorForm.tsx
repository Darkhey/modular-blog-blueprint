
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Image, X } from "lucide-react";
import { UnsplashImagePicker } from "./UnsplashImagePicker";
import { useBlogCategories } from "@/hooks/useBlogCategories";

interface BlogContentGeneratorFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  categorySlug: string;
  setCategorySlug: (slug: string) => void;
  articleLength: string;
  setArticleLength: (length: string) => void;
  autoPublish: boolean;
  setAutoPublish: (publish: boolean) => void;
  selectedImageUrl: string | null;
  setSelectedImageUrl: (url: string | null) => void;
  loading: boolean;
}

const BlogContentGeneratorForm = ({
  topic,
  setTopic,
  categorySlug,
  setCategorySlug,
  articleLength,
  setArticleLength,
  autoPublish,
  setAutoPublish,
  selectedImageUrl,
  setSelectedImageUrl,
  loading
}: BlogContentGeneratorFormProps) => {
  const { data: categories } = useBlogCategories();

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default BlogContentGeneratorForm;
