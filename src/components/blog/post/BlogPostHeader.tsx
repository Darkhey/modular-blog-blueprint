
import { Calendar, Clock, FileText, RefreshCw } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlogPosts';
import { getReadingStats, formatWordCount } from '@/lib/readingStats';

interface BlogPostHeaderProps {
  post: Pick<BlogPost, 'topic_color' | 'topic' | 'title' | 'excerpt' | 'published_at' | 'read_time' | 'difficulty' | 'content'> & {
    last_refreshed_at?: string | null;
  };
}


const BlogPostHeader = ({ post }: BlogPostHeaderProps) => {
  const { words, minutes } = getReadingStats(post.content, post.read_time);
  return (
  <header className="mb-8">
    <div className="mb-4">
      <span
        className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white"
        style={{ backgroundColor: post.topic_color }}
      >
        {post.topic}
      </span>
    </div>

    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight max-w-4xl">
      {post.title}
    </h1>

    <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl">
      {post.excerpt}
    </p>

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-8 border-b border-border gap-4">
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Calendar size={16} />
          <span>{new Date(post.published_at).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={16} />
          <span>{minutes} Min. Lesezeit</span>
        </div>
        {post.last_refreshed_at && (
          <div className="flex items-center space-x-2 text-emerald-600">
            <RefreshCw size={16} />
            <span>
              Aktualisiert am{' '}
              {new Date(post.last_refreshed_at).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        )}
        {words > 0 && (
          <div className="flex items-center space-x-2" title="Wortanzahl des Artikels">
            <FileText size={16} />
            <span>{formatWordCount(words)} Wörter</span>
          </div>
        )}

      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Schwierigkeit:</span>
        <div className="flex space-x-1">
          {[...Array(post.difficulty || 2)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-green-500 rounded-full"></div>
          ))}
          {[...Array(3 - (post.difficulty || 2))].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-muted rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  </header>
  );
};

export default BlogPostHeader;
