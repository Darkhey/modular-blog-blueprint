
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useBlogCategories } from '@/hooks/useBlogCategories';
import HeroSection from '@/components/home/HeroSection';
import MuuttoBanner from '@/components/home/MuuttoBanner';
import FeaturedArticleHero from '@/components/home/FeaturedArticleHero';
import FeaturedCalculatorsCarousel from '@/components/home/FeaturedCalculatorsCarousel';
import FeaturedExpertSection from '@/components/home/FeaturedExpertSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ImageCarouselSection from '@/components/home/ImageCarouselSection';
import StatsSection from '@/components/home/StatsSection';
import CalculatorsSection from '@/components/home/CalculatorsSection';
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
        <FeaturedCalculatorsCarousel />
        <FeaturedExpertSection />
        <FeaturesSection />
        <ImageCarouselSection />
        <StatsSection />
        <CalculatorsSection />
        <BlogAndCategoriesSection
          posts={posts}
          isLoadingPosts={isLoadingPosts}
          isErrorPosts={isErrorPosts}
          categories={categories}
          isLoadingCategories={isLoadingCategories}
          isErrorCategories={isErrorCategories}
        />
        <DynamicFeaturedGuides />
        <NewsletterSection />
      </main>
    </div>
  );
};

export default Index;
