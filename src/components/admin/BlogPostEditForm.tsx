
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface BlogPostEditFormProps {
  postId: string | null;
  onClose: () => void;
  onSaved: () => void;
}

const initialState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  topic: "",
  topic_color: "#00B386",
  published_at: "",
  status: "draft"
};

export default function BlogPostEditForm({ postId, onClose, onSaved }: BlogPostEditFormProps) {
  const [data, setData] = useState<typeof initialState>(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postId) {
      // Load blog post
      setLoading(true);
      supabase.from("blog_posts").select("*").eq("id", postId).single().then(({ data, error }) => {
        if (error) {
          toast.error("Fehler beim Laden.");
        } else if (data) {
          setData({
            ...initialState,
            ...data,
            published_at: data.published_at ? data.published_at.slice(0, 16) : ""
          });
        }
        setLoading(false);
      });
    } else {
      setData(initialState);
    }
  }, [postId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...data,
      published_at: data.published_at ? new Date(data.published_at).toISOString() : null
    };
    let dbres;
    if (postId) {
      dbres = await supabase.from("blog_posts").update(payload).eq("id", postId);
    } else {
      dbres = await supabase.from("blog_posts").insert([payload]);
    }
    setLoading(false);
    if (dbres.error) {
      toast.error("Fehler beim Speichern: " + dbres.error.message);
    } else {
      onSaved();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button type="button" className="absolute top-3 right-3 text-gray-400 hover:text-black" onClick={onClose}>&times;</button>
        <h2 className="text-lg font-bold mb-5">{postId ? "Blogartikel bearbeiten" : "Blogartikel erstellen"}</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium">Titel</label>
            <Input value={data.title} onChange={e => setData(v => ({ ...v, title: e.target.value }))} required disabled={loading} />
          </div>
          <div>
            <label className="block font-medium">Slug (URL)</label>
            <Input value={data.slug} onChange={e => setData(v => ({ ...v, slug: e.target.value }))} required disabled={loading} />
          </div>
          <div>
            <label className="block font-medium">Kurzbeschreibung</label>
            <Input value={data.excerpt} onChange={e => setData(v => ({ ...v, excerpt: e.target.value }))} required disabled={loading} />
          </div>
          <div>
            <label className="block font-medium">Inhalt</label>
            <textarea className="w-full border rounded px-3 py-2" rows={6} value={data.content} onChange={e => setData(v => ({ ...v, content: e.target.value }))} required disabled={loading} />
          </div>
          <div className="flex gap-3">
            <div>
              <label className="block font-medium">Thema</label>
              <Input value={data.topic} onChange={e => setData(v => ({ ...v, topic: e.target.value }))} required disabled={loading} />
            </div>
            <div>
              <label className="block font-medium">Farbe</label>
              <Input type="color" value={data.topic_color} onChange={e => setData(v => ({ ...v, topic_color: e.target.value }))} disabled={loading} style={{ width: 48, height: 36, padding: 2 }} />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block font-medium">Status</label>
              <select value={data.status} onChange={e => setData(v => ({ ...v, status: e.target.value }))} disabled={loading}
                className="border rounded px-2 py-1 w-full">
                <option value="draft">Entwurf</option>
                <option value="published">Veröffentlicht</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block font-medium">Veröffentlichungsdatum</label>
              <Input
                type="datetime-local"
                value={data.published_at}
                onChange={e => setData(v => ({ ...v, published_at: e.target.value }))}
                disabled={loading}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Abbrechen</Button>
          <Button type="submit" disabled={loading}>
            {postId ? "Speichern" : "Erstellen"}
          </Button>
        </div>
      </form>
    </div>
  );
}
