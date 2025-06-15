
import { Link } from 'react-router-dom';

const BlogPostNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Artikel nicht gefunden</h1>
        <Link to="/blog" className="text-green-600 hover:text-green-700">
          ← Zurück zum Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogPostNotFound;
