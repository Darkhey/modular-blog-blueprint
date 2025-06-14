
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Skeleton } from '@/components/ui/skeleton';

const CategoryPageSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Skeleton className="h-8 w-1/4 mb-6" />
      <Skeleton className="h-16 w-1/2 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default CategoryPageSkeleton;
