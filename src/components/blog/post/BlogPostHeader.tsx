
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlogPosts';

interface BlogPostHeaderProps {
  post: Pick<BlogPost, 'topic_color' | 'topic' | 'title' | 'excerpt' | 'published_at' | 'read_time' | 'difficulty'>;
}

const BlogPostHeader = ({ post }: BlogPostHeaderProps) => (
  <header className="mb-12">
    <div className="mb-4">
      <span
        className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white"
        style={{ backgroundColor: post.topic_color }}
      >
        {post.topic}
      </span>
    </div>

    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
      {post.title}
    </h1>

    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
      {post.excerpt}
    </p>

    <div className="flex items-center justify-between pb-8 border-b border-gray-200">
      <div className="flex items-center space-x-6 text-sm text-gray-500">
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
          <span>{post.read_time} Min. Lesezeit</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Schwierigkeit:</span>
        <div className="flex space-x-1">
          {[...Array(post.difficulty || 2)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-green-500 rounded-full"></div>
          ))}
          {[...Array(3 - (post.difficulty || 2))].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  </header>
);

export default BlogPostHeader;
