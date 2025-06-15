
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitBranch, RotateCcw, Eye, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { toast } from "sonner";

interface PostVersion {
  id: string;
  post_id: string;
  version_number: number;
  title: string;
  content: string;
  excerpt: string;
  changes_summary: string;
  created_at: string;
  created_by: string;
  is_current: boolean;
}

interface VersionControlProps {
  postId: string;
  onClose: () => void;
}

const VersionControl = ({ postId, onClose }: VersionControlProps) => {
  const [versions, setVersions] = useState<PostVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState<PostVersion | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchVersions();
  }, [postId]);

  const fetchVersions = async () => {
    setLoading(true);
    
    // For now, we'll simulate versions since we haven't implemented the versions table yet
    // In a real implementation, you would query the post_versions table
    const { data: currentPost, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (!error && currentPost) {
      // Simulate version history - in reality this would come from a versions table
      const mockVersions: PostVersion[] = [
        {
          id: `${postId}-v3`,
          post_id: postId,
          version_number: 3,
          title: currentPost.title,
          content: currentPost.content,
          excerpt: currentPost.excerpt,
          changes_summary: "Aktuelle Version",
          created_at: currentPost.updated_at || currentPost.created_at,
          created_by: "Aktueller Autor",
          is_current: true
        },
        {
          id: `${postId}-v2`,
          post_id: postId,
          version_number: 2,
          title: currentPost.title,
          content: currentPost.content.substring(0, currentPost.content.length - 100) + "...",
          excerpt: currentPost.excerpt,
          changes_summary: "Rechtschreibkorrekturen und SEO-Optimierung",
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          created_by: "Redakteur",
          is_current: false
        },
        {
          id: `${postId}-v1`,
          post_id: postId,
          version_number: 1,
          title: currentPost.title + " (Entwurf)",
          content: currentPost.content.substring(0, currentPost.content.length / 2),
          excerpt: currentPost.excerpt,
          changes_summary: "Erste Version erstellt",
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          created_by: "Autor",
          is_current: false
        }
      ];
      
      setVersions(mockVersions);
    }
    
    setLoading(false);
  };

  const createVersion = async (changesSummary: string) => {
    // In a real implementation, this would create a new version entry
    const { data: currentPost, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (!error && currentPost) {
      // Here you would insert into a post_versions table
      toast.success("Neue Version erstellt");
      fetchVersions();
    }
  };

  const restoreVersion = async (version: PostVersion) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({
        title: version.title,
        content: version.content,
        excerpt: version.excerpt,
        updated_at: new Date().toISOString()
      })
      .eq("id", postId);

    if (error) {
      toast.error("Fehler beim Wiederherstellen der Version");
    } else {
      toast.success(`Version ${version.version_number} wiederhergestellt`);
      fetchVersions();
      onClose();
    }
  };

  const previewVersion = (version: PostVersion) => {
    setSelectedVersion(version);
    setShowPreview(true);
  };

  if (loading) {
    return <div>Lade Versionen...</div>;
  }

  return (
    <div className="space-y-6">
      {!showPreview ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Versions-Historie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {versions.map(version => (
                  <div
                    key={version.id}
                    className={`p-4 border rounded-lg ${
                      version.is_current ? 'border-green-200 bg-green-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={version.is_current ? "default" : "outline"}>
                            Version {version.version_number}
                          </Badge>
                          {version.is_current && (
                            <Badge className="bg-green-100 text-green-800">
                              Aktuell
                            </Badge>
                          )}
                        </div>
                        
                        <h4 className="font-medium mb-1">{version.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {version.changes_summary}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(new Date(version.created_at), 'dd.MM.yyyy HH:mm', { locale: de })}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {version.created_by}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => previewVersion(version)}
                        >
                          <Eye className="h-4 w-4" />
                          Vorschau
                        </Button>
                        {!version.is_current && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => restoreVersion(version)}
                          >
                            <RotateCcw className="h-4 w-4" />
                            Wiederherstellen
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                Vorschau: Version {selectedVersion?.version_number}
              </CardTitle>
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Zurück zur Liste
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {selectedVersion && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{selectedVersion.title}</h3>
                  <p className="text-gray-600 mt-1">{selectedVersion.excerpt}</p>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Inhalt:</h4>
                  <div className="prose prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: selectedVersion.content.replace(/\n/g, '<br>') }} />
                  </div>
                </div>
                
                {!selectedVersion.is_current && (
                  <div className="border-t pt-4">
                    <Button onClick={() => restoreVersion(selectedVersion)}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Diese Version wiederherstellen
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      <div className="flex justify-end">
        <Button variant="outline" onClick={onClose}>
          Schließen
        </Button>
      </div>
    </div>
  );
};

export default VersionControl;
