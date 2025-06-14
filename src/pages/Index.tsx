
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useBlogCategories } from '@/hooks/useBlogCategories';
import HeroSection from '@/components/home/HeroSection';
import AdBannerSection from '@/components/home/AdBannerSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import StatsSection from '@/components/home/StatsSection';
import ArticleAdSection from '@/components/home/ArticleAdSection';
import CalculatorsSection from '@/components/home/CalculatorsSection';
import BlogAndCategoriesSection from '@/components/home/BlogAndCategoriesSection';
import NewsletterSection from '@/components/home/NewsletterSection';

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
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
