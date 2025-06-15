
import { Button } from "@/components/ui/button";
import { Loader2, FileText, Sparkles } from "lucide-react";

interface BlogContentGeneratorActionsProps {
  onGenerateArticle: () => void;
  onGenerateBulkArticles: () => void;
  loading: boolean;
}

const BlogContentGeneratorActions = ({
  onGenerateArticle,
  onGenerateBulkArticles,
  loading
}: BlogContentGeneratorActionsProps) => {
  return (
    <div className="flex gap-3 pt-4">
      <Button 
        onClick={onGenerateArticle} 
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
        onClick={onGenerateBulkArticles} 
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
  );
};

export default BlogContentGeneratorActions;
