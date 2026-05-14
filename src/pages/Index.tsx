
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useBlogCategories } from '@/hooks/useBlogCategories';
import HeroSection from '@/components/home/HeroSection';
import MuuttoBanner from '@/components/home/MuuttoBanner';
import FeaturedArticleHero from '@/components/home/FeaturedArticleHero';
import CalculatorsBentoSection from '@/components/home/CalculatorsBentoSection';
import FeaturedExpertSection from '@/components/home/FeaturedExpertSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ImageCarouselSection from '@/components/home/ImageCarouselSection';
import StatsSection from '@/components/home/StatsSection';
import BlogAndCategoriesSection from '@/components/home/BlogAndCategoriesSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import DynamicFeaturedGuides from '@/components/home/DynamicFeaturedGuides';
import EnergyAdvisorSearch from '@/components/shared/EnergyAdvisorSearch';

const Index = () => {
  const { data: posts, isLoading: isLoadingPosts, isError: isErrorPosts } = useBlogPosts(undefined, 3);
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useBlogCategories();

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <FeaturedArticleHero />
        <MuuttoBanner />
        <CalculatorsBentoSection />
        <FeaturedExpertSection />
        <FeaturesSection />
        <ImageCarouselSection />
        <StatsSection />
        <BlogAndCategoriesSection
          posts={posts}
          isLoadingPosts={isLoadingPosts}
          isErrorPosts={isErrorPosts}
          categories={categories}
          isLoadingCategories={isLoadingCategories}
          isErrorCategories={isErrorCategories}
        />
        <DynamicFeaturedGuides />
        <EnergyAdvisorSearch />
        <NewsletterSection />
      </main>
    </div>
  );
};

export default Index;
