
import { Link } from 'react-router-dom';
import { FolderKanban, TrendingUp, Bookmark, Clock } from 'lucide-react';
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

                    {/* Enhanced Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* AdSense - Top Banner */}
                            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-1 shadow-sm">
                                <AdSlot position="sidebar" className="w-full" />
                            </div>

                            {/* Quick Stats mit verbessertem Design */}
                            <div className="transform hover:scale-105 transition-transform duration-200">
                                <QuickStats />
                            </div>

                            {/* Trending Topics */}
                            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center text-lg font-semibold text-gray-800">
                                        <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                                        Trending Ratgeber
                                    </CardTitle>
                                </CardHeader>
                                <div className="px-6 pb-6 space-y-3">
                                    <Link to="/blog/heizung-modernisieren-ratgeber-2025" className="flex items-center justify-between p-3 bg-white/70 rounded-lg hover:bg-white transition-colors group">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">Heizung modernisieren</span>
                                        </div>
                                        <span className="text-xs text-green-600 font-semibold">bis 40%</span>
                                    </Link>
                                    <Link to="/blog/daemmstoffe-vergleich-2025" className="flex items-center justify-between p-3 bg-white/70 rounded-lg hover:bg-white transition-colors group">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">Dämmung optimieren</span>
                                        </div>
                                        <span className="text-xs text-green-600 font-semibold">bis 50%</span>
                                    </Link>
                                    <Link to="/blog/solaranlage-planen-kaufen-2025" className="flex items-center justify-between p-3 bg-white/70 rounded-lg hover:bg-white transition-colors group">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">Solaranlage planen</span>
                                        </div>
                                        <span className="text-xs text-green-600 font-semibold">bis 80%</span>
                                    </Link>
                                </div>
                            </Card>

                            {/* AdSense - Middle Banner */}
                            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-1 shadow-sm">
                                <AdSlot position="sidebar" className="w-full" />
                            </div>

                            {/* Quick Links */}
                            <Card className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center text-lg font-semibold text-gray-800">
                                        <Bookmark className="mr-2 h-5 w-5 text-blue-600" />
                                        Schnellzugriff
                                    </CardTitle>
                                </CardHeader>
                                <div className="px-6 pb-6 space-y-2">
                                    <Link to="/heizkostenrechner" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                            <span className="text-blue-600 text-sm font-bold">💡</span>
                                        </div>
                                        <span className="text-sm text-gray-700 group-hover:text-blue-600 font-medium">Heizkostenrechner</span>
                                    </Link>
                                    <Link to="/daemmungsrechner" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                            <span className="text-green-600 text-sm font-bold">🏠</span>
                                        </div>
                                        <span className="text-sm text-gray-700 group-hover:text-green-600 font-medium">Dämmungsrechner</span>
                                    </Link>
                                    <Link to="/foerdermittel" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                            <span className="text-purple-600 text-sm font-bold">💰</span>
                                        </div>
                                        <span className="text-sm text-gray-700 group-hover:text-purple-600 font-medium">Fördermittel</span>
                                    </Link>
                                </div>
                            </Card>

                            {/* Newsletter Teaser */}
                            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 shadow-md hover:shadow-lg transition-all duration-300">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center text-lg font-semibold text-gray-800">
                                        <Clock className="mr-2 h-5 w-5 text-indigo-600" />
                                        Newsletter
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Bleiben Sie über neue Ratgeber und Fördermöglichkeiten informiert
                                    </CardDescription>
                                </CardHeader>
                                <div className="px-6 pb-6">
                                    <Link to="/blog" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                                        Jetzt anmelden
                                        <span className="ml-2">→</span>
                                    </Link>
                                </div>
                            </Card>

                            {/* AdSense - Bottom Banner */}
                            <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl p-1 shadow-sm">
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
