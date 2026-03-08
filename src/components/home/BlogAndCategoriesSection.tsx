
import { Link } from 'react-router-dom';
import { FolderKanban, TrendingUp, Bookmark, Clock } from 'lucide-react';

import BlogCard from '@/components/blog/BlogCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BlogPost } from '@/hooks/useBlogPosts';
import { BlogCategory } from '@/hooks/useBlogCategories';
import QuickStats from '@/components/shared/QuickStats';
import { useTrendingPosts } from '@/hooks/useTrendingPosts';

interface BlogAndCategoriesSectionProps {
    posts?: BlogPost[];
    isLoadingPosts: boolean;
    isErrorPosts: boolean;
    categories?: BlogCategory[];
    isLoadingCategories: boolean;
    isErrorCategories: boolean;
}

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

const TrendingSidebar = () => {
  const { data: trending, isLoading } = useTrendingPosts(3);

  const isNew = (date: string) => (Date.now() - new Date(date).getTime()) < 7 * 24 * 60 * 60 * 1000;

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/10 border-primary/20 shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg font-semibold text-foreground">
          <TrendingUp className="mr-2 h-5 w-5 text-primary" />
          Trending Ratgeber
        </CardTitle>
      </CardHeader>
      <div className="px-6 pb-6 space-y-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-lg" />)
        ) : (
          trending?.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="flex items-center justify-between p-3 bg-background/70 rounded-lg hover:bg-background transition-colors group border-l-4 border-primary/40 hover:border-primary"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary line-clamp-1">{post.title}</span>
              </div>
              {isNew(post.published_at) && (
                <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded flex-shrink-0 ml-2">NEU</span>
              )}
            </Link>
          ))
        )}
      </div>
    </Card>
  );
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
        <section className="py-16 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                        <h2 className="text-2xl font-bold text-foreground mb-6">
                            Neueste Artikel
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {isLoadingPosts ? (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <Skeleton key={index} className="h-[380px] w-full rounded-2xl" />
                                ))
                            ) : isErrorPosts ? (
                                <p className="col-span-full text-destructive">Artikel konnten nicht geladen werden.</p>
                            ) : (
                                posts?.map((post) => (
                                    <BlogCard key={post.id} post={post} />
                                ))
                            )}
                        </div>

                        {/* Categories */}
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                                <FolderKanban className="mr-3 h-7 w-7 text-primary" />
                                Entdecken Sie unsere Themen
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {isLoadingCategories ? (
                                    Array.from({ length: 6 }).map((_, index) => (
                                        <Skeleton key={index} className="h-[200px] w-full rounded-2xl" />
                                    ))
                                ) : isErrorCategories ? (
                                    <p className="col-span-full text-destructive">Kategorien konnten nicht geladen werden.</p>
                                ) : (
                                    categories?.map((category, index) => (
                                        <Link key={category.id} to={`/themen/${category.slug}`} className="block hover:no-underline group animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
                                            <Card className="glass hover:shadow-glow hover:-translate-y-1 transition-all duration-300 h-full flex flex-col overflow-hidden rounded-2xl">
                                                <div className="w-full h-32 overflow-hidden">
                                                    <img
                                                        src={getCategoryImage(category.name)}
                                                        alt={category.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <CardHeader>
                                                    <CardTitle className="flex items-center text-lg group-hover:text-primary transition-colors">
                                                        <span className="w-3 h-3 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: category.color || '#9ca3af' }} />
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
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="transform hover:scale-[1.02] transition-transform duration-200">
                                <QuickStats />
                            </div>

                            <TrendingSidebar />

                            {/* Quick Links */}
                            <Card className="bg-card border-border shadow-md">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center text-lg font-semibold text-foreground">
                                        <Bookmark className="mr-2 h-5 w-5 text-primary" />
                                        Schnellzugriff
                                    </CardTitle>
                                </CardHeader>
                                <div className="px-6 pb-6 space-y-2">
                                    <Link to="/heizkostenrechner" className="flex items-center p-3 rounded-lg hover:bg-secondary transition-colors group">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                                            <span className="text-sm">💡</span>
                                        </div>
                                        <span className="text-sm text-foreground group-hover:text-primary font-medium">Heizkostenrechner</span>
                                    </Link>
                                    <Link to="/daemmungsrechner" className="flex items-center p-3 rounded-lg hover:bg-secondary transition-colors group">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                                            <span className="text-sm">🏠</span>
                                        </div>
                                        <span className="text-sm text-foreground group-hover:text-primary font-medium">Dämmungsrechner</span>
                                    </Link>
                                    <Link to="/foerdermittel" className="flex items-center p-3 rounded-lg hover:bg-secondary transition-colors group">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                                            <span className="text-sm">💰</span>
                                        </div>
                                        <span className="text-sm text-foreground group-hover:text-primary font-medium">Fördermittel</span>
                                    </Link>
                                </div>
                            </Card>

                            {/* Newsletter Teaser */}
                            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 shadow-md">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center text-lg font-semibold text-foreground">
                                        <Clock className="mr-2 h-5 w-5 text-primary" />
                                        Newsletter
                                    </CardTitle>
                                    <CardDescription>
                                        Bleiben Sie über neue Ratgeber und Fördermöglichkeiten informiert
                                    </CardDescription>
                                </CardHeader>
                                <div className="px-6 pb-6">
                                    <Link to="/blog" className="inline-flex items-center px-4 py-2 gradient-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                                        Jetzt anmelden
                                        <span className="ml-2">→</span>
                                    </Link>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogAndCategoriesSection;
