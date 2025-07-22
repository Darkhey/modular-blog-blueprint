
import QuickStats from '@/components/shared/QuickStats';

import { siteConfig } from '@/config/site.config';
import { useBlogCategories } from '@/hooks/useBlogCategories';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';

interface CategorySidebarProps {
  currentCategorySlug?: string;
}

const CategorySidebar = ({ currentCategorySlug }: CategorySidebarProps) => {
  const { data: categories, isLoading } = useBlogCategories();

  const otherTopics = categories
    ?.filter(c => c.slug !== currentCategorySlug)
    .slice(0, 5);

  return (
    <div className="sticky top-24 space-y-6">
      {/* Auto Ads are handled via AdSense dashboard */}

      <div className="bg-white p-6 rounded-lg border">
        <h3 className="font-semibold text-gray-900 mb-4">Weitere Themen</h3>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        ) : (
          <div className="space-y-2">
            {otherTopics?.map((topic) => (
              <Link
                key={topic.id}
                to={`/themen/${topic.slug}`}
                className="block w-full text-left px-3 py-2 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-colors"
              >
                {topic.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <QuickStats />
    </div>
  );
};

export default CategorySidebar;
