
import { Link } from 'react-router-dom';
import { BlogPost } from '@/hooks/useBlogPosts';

interface BlogBreadcrumbProps {
  post: Pick<BlogPost, 'title'>;
}

const BlogBreadcrumb = ({ post }: BlogBreadcrumbProps) => (
  <nav className="mb-8">
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <Link to="/" className="hover:text-green-600">Home</Link>
      <span>/</span>
      <Link to="/blog" className="hover:text-green-600">Blog</Link>
      <span>/</span>
      <span className="text-gray-900">{post.title}</span>
    </div>
  </nav>
);

export default BlogBreadcrumb;
