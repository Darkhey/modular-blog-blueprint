
import { TrendingUp } from 'lucide-react';
import { BlogCategory } from '@/hooks/useBlogCategories';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface CategoryHeroProps {
  category: BlogCategory;
}

const CategoryHero = ({ category }: CategoryHeroProps) => (
  <>
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbPage>{category.name}</BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: category.color || '#cccccc' }}
        >
          <TrendingUp className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            {category.name}
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            {category.description}
          </p>
        </div>
      </div>
    </div>
  </>
);

export default CategoryHero;
