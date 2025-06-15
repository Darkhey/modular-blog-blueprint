
import { Image } from "lucide-react";

const BlogContentGeneratorInfo = () => {
  return (
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
  );
};

export default BlogContentGeneratorInfo;
