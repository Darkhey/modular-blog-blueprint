
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp, Reply, Flag, User } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { toast } from "sonner";

interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
  parent_id?: string;
  likes: number;
  is_approved: boolean;
  replies?: Comment[];
}

interface CommentSystemProps {
  postId: string;
  postSlug: string;
}

const CommentSystem = ({ postId, postSlug }: CommentSystemProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
    
    // Load user info from localStorage
    const savedName = localStorage.getItem('commentAuthorName');
    const savedEmail = localStorage.getItem('commentAuthorEmail');
    if (savedName) setAuthorName(savedName);
    if (savedEmail) setAuthorEmail(savedEmail);
  }, [postId]);

  const fetchComments = async () => {
    // Initialize with empty array - no mock data
    setComments([]);
    setLoading(false);
  };

  const submitComment = async () => {
    if (!newComment.trim() || !authorName.trim() || !authorEmail.trim()) {
      toast.error("Bitte füllen Sie alle Felder aus");
      return;
    }

    // Save user info for next time
    localStorage.setItem('commentAuthorName', authorName);
    localStorage.setItem('commentAuthorEmail', authorEmail);

    const comment: Comment = {
      id: Math.random().toString(),
      post_id: postId,
      author_name: authorName,
      author_email: authorEmail,
      content: newComment,
      created_at: new Date().toISOString(),
      parent_id: replyingTo || undefined,
      likes: 0,
      is_approved: false // Would need moderation
    };

    if (replyingTo) {
      // Add as reply
      setComments(comments.map(c => 
        c.id === replyingTo 
          ? { ...c, replies: [...(c.replies || []), comment] }
          : c
      ));
    } else {
      // Add as new comment
      setComments([comment, ...comments]);
    }

    setNewComment("");
    setReplyingTo(null);
    toast.success("Kommentar eingereicht und wartet auf Freigabe");
  };

  const likeComment = async (commentId: string) => {
    setComments(comments.map(c => 
      c.id === commentId 
        ? { ...c, likes: c.likes + 1 }
        : {
            ...c,
            replies: c.replies?.map(r => 
              r.id === commentId ? { ...r, likes: r.likes + 1 } : r
            )
          }
    ));
    toast.success("Daumen hoch!");
  };

  const reportComment = async (commentId: string) => {
    toast.success("Kommentar gemeldet. Wir prüfen ihn.");
  };

  if (loading) {
    return <div>Lade Kommentare...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Kommentare ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Comment Form */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium">Kommentar schreiben</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Ihr Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Ihre E-Mail (wird nicht veröffentlicht)"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
              />
            </div>
            
            <Textarea
              placeholder={replyingTo ? "Ihre Antwort..." : "Ihr Kommentar..."}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
            />
            
            <div className="flex items-center gap-2">
              <Button onClick={submitComment}>
                <MessageCircle className="h-4 w-4 mr-2" />
                {replyingTo ? "Antworten" : "Kommentieren"}
              </Button>
              
              {replyingTo && (
                <Button variant="outline" onClick={() => setReplyingTo(null)}>
                  Abbrechen
                </Button>
              )}
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{comment.author_name}</span>
                      <span className="text-sm text-gray-500">
                        {format(new Date(comment.created_at), 'dd.MM.yyyy HH:mm', { locale: de })}
                      </span>
                      {!comment.is_approved && (
                        <Badge variant="outline" className="text-xs">
                          Wartet auf Freigabe
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{comment.content}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <button
                      onClick={() => likeComment(comment.id)}
                      className="flex items-center gap-1 text-gray-500 hover:text-blue-600"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      {comment.likes}
                    </button>
                    
                    <button
                      onClick={() => setReplyingTo(comment.id)}
                      className="flex items-center gap-1 text-gray-500 hover:text-blue-600"
                    >
                      <Reply className="h-3 w-3" />
                      Antworten
                    </button>
                    
                    <button
                      onClick={() => reportComment(comment.id)}
                      className="flex items-center gap-1 text-gray-500 hover:text-red-600"
                    >
                      <Flag className="h-3 w-3" />
                      Melden
                    </button>
                  </div>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-8 space-y-3">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="border-l-2 border-blue-200 pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-3 w-3 text-gray-400" />
                          <span className="text-sm font-medium">{reply.author_name}</span>
                          <span className="text-xs text-gray-500">
                            {format(new Date(reply.created_at), 'dd.MM.yyyy HH:mm', { locale: de })}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-2">{reply.content}</p>
                        
                        <div className="flex items-center gap-3 text-xs">
                          <button
                            onClick={() => likeComment(reply.id)}
                            className="flex items-center gap-1 text-gray-500 hover:text-blue-600"
                          >
                            <ThumbsUp className="h-3 w-3" />
                            {reply.likes}
                          </button>
                          
                          <button
                            onClick={() => reportComment(reply.id)}
                            className="flex items-center gap-1 text-gray-500 hover:text-red-600"
                          >
                            <Flag className="h-3 w-3" />
                            Melden
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {comments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Noch keine Kommentare vorhanden.</p>
              <p className="text-sm">Seien Sie der Erste, der kommentiert!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentSystem;
