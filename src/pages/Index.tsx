
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Rocket, PiggyBank, Lightbulb, Flame, FolderKanban } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site.config';
import AdSlot from '@/components/ui/AdSlot';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import BlogCard from '@/components/blog/BlogCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogCategories } from '@/hooks/useBlogCategories';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import BlogStats from '@/components/blog/BlogStats';

const Index = () => {
  const { data: posts, isLoading: isLoadingPosts, isError: isErrorPosts } = useBlogPosts(undefined, 3);
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useBlogCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gray-800 text-white py-32 text-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: "url('/placeholder.svg?id=photo-1487958449943-2429e8be8625')" }}
          ></div>
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          
          <div className="relative max-w-4xl mx-auto px-4 z-10">
            <h1 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight text-shadow-lg animate-fade-in">
              {siteConfig.projectName}
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              {siteConfig.siteMeta.description}
            </p>
            <Link
              to="/blog"
              className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in"
              style={{ animationDelay: '400ms' }}
            >
              Zu den Artikeln
            </Link>
          </div>
        </section>

        {/* Header Banner Ad */}
        <section className="py-4 bg-white/80">
          <div className="max-w-7xl mx-auto px-4">
            <AdSlot position="banner" className="w-full" />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8 animate-fade-in">
              Ihre Vorteile als Hausbesitzer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in" style={{ animationDelay: '200ms' }}>
                <Rocket className="text-green-600 mb-4 w-8 h-8" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Starten Sie Ihr Projekt
                </h3>
                <p className="text-gray-600">
                  Egal ob Neubau oder Sanierung – wir begleiten Sie von der ersten Idee bis zur finalen Umsetzung.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in" style={{ animationDelay: '400ms' }}>
                <PiggyBank className="text-blue-600 mb-4 w-8 h-8" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Finanzen im Blick
                </h3>
                <p className="text-gray-600">
                  Maximieren Sie Ihr Budget durch clevere Planung und die richtigen Fördermittel.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in" style={{ animationDelay: '600ms' }}>
                <Lightbulb className="text-orange-600 mb-4 w-8 h-8" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Wissen, das sich auszahlt
                </h3>
                <p className="text-gray-600">
                  Profitieren Sie von verständlichen Anleitungen und Experten-Tipps, um teure Fehler zu vermeiden.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8 animate-fade-in">
              Auf uns können Sie bauen
            </h2>
            <div className="max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              <BlogStats />
            </div>
          </div>
        </section>

        {/* Article Ad between sections */}
        <section className="py-6">
          <div className="max-w-4xl mx-auto px-4">
            <AdSlot position="article" className="w-full" />
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8 animate-fade-in">
              Sanierungsrechner
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Calculator 1 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in" style={{ animationDelay: '200ms' }}>
                <Flame className="text-red-600 mb-4 w-8 h-8" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Heizkostenrechner
                </h3>
                <p className="text-gray-600 mb-4">
                  Berechnen Sie Ihr Einsparpotenzial bei einer Heizungsmodernisierung.
                </p>
                <Link
                  to="/heizung-modernisieren"
                  className="inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Zum Rechner
                </Link>
              </div>

              {/* Calculator 2 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in" style={{ animationDelay: '400ms' }}>
                <Flame className="text-blue-600 mb-4 w-8 h-8" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Dämmungsrechner
                </h3>
                <p className="text-gray-600 mb-4">
                  Finden Sie die optimale Dämmstärke für Ihr Haus.
                </p>
                <Link
                  to="/daemmung-isolierung"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Zum Rechner
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Blog & Categories Section */}
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

        {/* Newsletter Section */}
        <section className="py-12 bg-green-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4 animate-fade-in">
              {siteConfig.newsletter.title}
            </h2>
            <p className="text-gray-700 mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
              {siteConfig.newsletter.description}
            </p>
            <Link
              to={siteConfig.socialLinks.newsletter}
              className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors animate-fade-in"
              style={{ animationDelay: '400ms' }}
            >
              Zum Newsletter anmelden
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
