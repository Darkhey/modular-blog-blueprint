
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

const Index = () => {
  const { data: posts, isLoading: isLoadingPosts, isError: isErrorPosts } = useBlogPosts(undefined, 3);
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useBlogCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <Header />
      
      <main>
        <HeroSection />
        <AdBannerSection />
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
        {/* NEU: Startseitige Ratgeber-Kachel für Dämmstoffe */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* ... eventuell andere bestehende Kachel-Sektionen ... */}
              {/* NEU: Dämmstoffe Artikel-Highlight */}
              <Link to="/blog/daemmstoffe-vergleich-2025" className="block hover:no-underline group">
                <div className="p-4 border rounded-lg bg-white shadow-sm h-full flex flex-col">
                  <span className="text-xs font-semibold text-blue-700 uppercase mb-2">DÄMMSTOFF-TIPP</span>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-700 transition-colors">Dämmstoffe im Vergleich: Übersicht 2025</h3>
                  <p className="text-gray-600 text-sm mb-2">Alle wichtigen Materialien, Tipps, Trends & Förderinfos. Ideal vor Planung und Antrag!</p>
                  <span className="text-green-700 font-semibold mt-auto group-hover:underline">➡ Zum Vergleichs-Ratgeber</span>
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
};

export default Index;
