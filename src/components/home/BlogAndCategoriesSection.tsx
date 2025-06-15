
import { Link } from 'react-router-dom';
import { FolderKanban } from 'lucide-react';
import AdSlot from '@/components/ui/AdSlot';
import BlogCard from '@/components/blog/BlogCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BlogPost } from '@/hooks/useBlogPosts';
import { BlogCategory } from '@/hooks/useBlogCategories';
import QuickStats from '@/components/shared/QuickStats';

interface BlogAndCategoriesSectionProps {
    posts?: BlogPost[];
    isLoadingPosts: boolean;
    isErrorPosts: boolean;
    categories?: BlogCategory[];
    isLoadingCategories: boolean;
    isErrorCategories: boolean;
}

// Kategorie-spezifische Bilder
const getCategoryImage = (categoryName: string): string => {
  const categoryImages: Record<string, string> = {
    'Heizung modernisieren': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
    'Dämmung & Isolierung': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop',
    'Fassade': 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400&h=300&fit=crop',
    'Fenster': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    'Dach': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
    'Smart Home': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    'Solarenergie': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop',
    'Fördermittel': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop'
  };
  
  return categoryImages[categoryName] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop';
};

const BlogAndCategoriesSection = ({
    posts,
    isLoadingPosts,
    isErrorPosts,
    categories,
    isLoadingCategories,
    isErrorCategories,
}: BlogAndCategoriesSectionProps) => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                        {/* Blog Preview */}
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 animate-fade-in">
                            Neueste Artikel
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {isLoadingPosts ? (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <Skeleton key={index} className="h-[340px] w-full rounded-lg" />
                                ))
                            ) : isErrorPosts ? (
                                <p className="col-span-full text-red-500">Artikel konnten nicht geladen werden.</p>
                            ) : (
                                posts?.map((post) => (
                                    <BlogCard key={post.id} post={post} />
                                ))
                            )}
                        </div>

                        {/* Categories Section */}
                        <div className="mt-16">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center animate-fade-in">
                                <FolderKanban className="mr-3 h-7 w-7 text-green-600" />
                                Entdecken Sie unsere Themen
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {isLoadingCategories ? (
                                    Array.from({ length: 6 }).map((_, index) => (
                                        <Skeleton key={index} className="h-[200px] w-full rounded-lg" />
                                    ))
                                ) : isErrorCategories ? (
                                    <p className="col-span-full text-red-500">Kategorien konnten nicht geladen werden.</p>
                                ) : (
                                    categories?.map((category, index) => (
                                        <Link key={category.id} to={`/themen/${category.slug}`} className="block hover:no-underline group transition-transform duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 100}ms`}}>
                                            <Card className="hover:shadow-lg hover:border-green-500 transition-all duration-300 h-full flex flex-col overflow-hidden">
                                                <div className="w-full h-32 overflow-hidden">
                                                  <img 
                                                    src={getCategoryImage(category.name)} 
                                                    alt={category.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                  />
                                                </div>
                                                <CardHeader>
                                                    <CardTitle className="flex items-center text-xl group-hover:text-green-600 transition-colors">
                                                        <span className="w-3 h-3 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: category.color || '#9ca3af' }}></span>
                                                        {category.name}
                                                    </CardTitle>
                                                    {category.description && (
                                                        <CardDescription className="pt-1 line-clamp-2">{category.description}</CardDescription>
                                                    )}
                                                </CardHeader>
                                            </Card>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8 lg:col-span-1">
                        <QuickStats />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Werbung</h3>
                            <div className="space-y-4">
                                <AdSlot position="sidebar" className="w-full" />
                                <AdSlot position="sidebar" className="w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogAndCategoriesSection;
