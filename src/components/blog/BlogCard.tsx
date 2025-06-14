
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  topic: string;
  topic_color: string;
  published_at: string;
  read_time: number;
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300">
      {/* Topic Badge */}
      <div className="p-4 pb-0">
        <span 
          className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
          style={{ backgroundColor: post.topic_color }}
        >
          {post.topic}
        </span>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          <Link to={`/blog/${post.slug}`} className="hover:text-green-600 transition-colors">
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{new Date(post.published_at).toLocaleDateString('de-DE')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{post.read_time} Min. Lesezeit</span>
            </div>
          </div>
          
          <Link 
            to={`/blog/${post.slug}`}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Weiterlesen →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
