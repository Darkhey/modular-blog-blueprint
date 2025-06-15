
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useBlogCategories } from '@/hooks/useBlogCategories';
import HeroSection from '@/components/home/HeroSection';
import AdBannerSection from '@/components/home/AdBannerSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ImageCarouselSection from '@/components/home/ImageCarouselSection';
import StatsSection from '@/components/home/StatsSection';
import ArticleAdSection from '@/components/home/ArticleAdSection';
import CalculatorsSection from '@/components/home/CalculatorsSection';
import BlogAndCategoriesSection from '@/components/home/BlogAndCategoriesSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import { Link } from 'react-router-dom';
import FeaturedExpertSection from '@/components/home/FeaturedExpertSection';

const Index = () => {
  const { data: posts, isLoading: isLoadingPosts, isError: isErrorPosts } = useBlogPosts(undefined, 3);
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useBlogCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <Header />
      
      <main>
        <HeroSection />
        <AdBannerSection />
        <FeaturedExpertSection />
        <FeaturesSection />
        <ImageCarouselSection />
        <StatsSection />
        <ArticleAdSection />
        <CalculatorsSection />
        <BlogAndCategoriesSection
          posts={posts}
          isLoadingPosts={isLoadingPosts}
          isErrorPosts={isErrorPosts}
          categories={categories}
          isLoadingCategories={isLoadingCategories}
          isErrorCategories={isErrorCategories}
        />

        {/* Kacheln für wichtige Ratgeber */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Top-Ratgeber für Ihr Sanierungsprojekt</h2>
            <p className="text-center text-gray-600 mb-8">Unsere wichtigsten Anleitungen für Ihre Planung.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Dämmstoffe-Artikel */}
              <Link to="/blog/daemmstoffe-vergleich-2025" className="block hover:no-underline group">
                <div className="p-4 border rounded-lg bg-white shadow-sm h-full flex flex-col overflow-hidden">
                  <div className="w-full h-32 mb-3 rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop" 
                      alt="Dämmstoffe und Isolierung" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs font-semibold text-blue-700 uppercase mb-2">DÄMMSTOFF-TIPP</span>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-700 transition-colors">Dämmstoffe im Vergleich: Übersicht 2025</h3>
                  <p className="text-gray-600 text-sm mb-2">Alle wichtigen Materialien, Tipps, Trends & Förderinfos. Ideal vor Planung und Antrag!</p>
                  <span className="text-green-700 font-semibold mt-auto group-hover:underline">➡ Zum Vergleichs-Ratgeber</span>
                </div>
              </Link>
              {/* Fenster-Artikel */}
              <Link to="/blog/moderne-fenster-ratgeber-2025" className="block hover:no-underline group">
                <div className="p-4 border rounded-lg bg-white shadow-sm h-full flex flex-col overflow-hidden">
                  <div className="w-full h-32 mb-3 rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop" 
                      alt="Moderne Fenster" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs font-semibold text-blue-700 uppercase mb-2">FENSTER</span>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-700 transition-colors">Moderne Fenster 2025</h3>
                  <p className="text-gray-600 text-sm mb-2">Der komplette Ratgeber für Austausch, Sanierung, Kosten und Förderung.</p>
                  <span className="text-green-700 font-semibold mt-auto group-hover:underline">➡ Zum Fenster-Ratgeber</span>
                </div>
              </Link>
              {/* Heizung-Artikel */}
              <Link to="/blog/heizung-modernisieren-ratgeber-2025" className="block hover:no-underline group">
                <div className="p-4 border rounded-lg bg-white shadow-sm h-full flex flex-col overflow-hidden">
                  <div className="w-full h-32 mb-3 rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop" 
                      alt="Moderne Heizung" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs font-semibold text-blue-700 uppercase mb-2">HEIZUNG</span>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-700 transition-colors">Heizung modernisieren 2025</h3>
                  <p className="text-gray-600 text-sm mb-2">Alles zu Wärmepumpen, Gas-Hybriden und Co. Inklusive Kosten und Förderungen.</p>
                  <span className="text-green-700 font-semibold mt-auto group-hover:underline">➡ Zum Heizungs-Ratgeber</span>
                </div>
              </Link>
              {/* Solar-Artikel */}
              <Link to="/blog/solaranlage-planen-kaufen-2025" className="block hover:no-underline group">
                <div className="p-4 border rounded-lg bg-white shadow-sm h-full flex flex-col overflow-hidden">
                  <div className="w-full h-32 mb-3 rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop" 
                      alt="Solaranlage auf einem Dach" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs font-semibold text-blue-700 uppercase mb-2">SOLARANLAGE</span>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-700 transition-colors">Solaranlage planen & kaufen</h3>
                  <p className="text-gray-600 text-sm mb-2">Der Weg zur eigenen PV-Anlage. Von der Größe bis zur Wirtschaftlichkeit.</p>
                  <span className="text-green-700 font-semibold mt-auto group-hover:underline">➡ Zum Solar-Ratgeber</span>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
export default Index;
