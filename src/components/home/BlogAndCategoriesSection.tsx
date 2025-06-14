
import { Link } from 'react-router-dom';
import { FolderKanban } from 'lucide-react';
import AdSlot from '@/components/ui/AdSlot';
import BlogCard from '@/components/blog/BlogCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BlogPost } from '@/hooks/useBlogPosts';
import { BlogCategory } from '@/hooks/useBlogCategories';

interface BlogAndCategoriesSectionProps {
    posts?: BlogPost[];
    isLoadingPosts: boolean;
    isErrorPosts: boolean;
    categories?: BlogCategory[];
    isLoadingCategories: boolean;
    isErrorCategories: boolean;
}

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
                                        <Skeleton key={index} className="h-[120px] w-full rounded-lg" />
                                    ))
                                ) : isErrorCategories ? (
                                    <p className="col-span-full text-red-500">Kategorien konnten nicht geladen werden.</p>
                                ) : (
                                    categories?.map((category, index) => (
                                        <Link key={category.id} to={`/themen/${category.slug}`} className="block hover:no-underline group transition-transform duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 100}ms`}}>
                                            <Card className="hover:shadow-lg hover:border-green-500 transition-all duration-300 h-full flex flex-col">
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
                    <div className="space-y-6 lg:col-span-1">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Werbung</h3>
                        <AdSlot position="sidebar" className="w-full" />
                        <AdSlot position="sidebar" className="w-full" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogAndCategoriesSection;
