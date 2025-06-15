
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const BlogPostSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPostSkeleton;
