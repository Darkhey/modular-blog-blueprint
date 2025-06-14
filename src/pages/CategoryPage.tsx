import { useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle, TrendingUp, Award } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import AdSlot from '@/components/ui/AdSlot';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import CategoryBenefits from '@/components/category/CategoryBenefits';
import QuickStats from '@/components/shared/QuickStats';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CategoryPage = ({ category }: { category?: string }) => {
  const { topic } = useParams();
  const categoryId = category || topic;
  
  const currentTopic = siteConfig.contentTopics.find(t => t.id === categoryId);
  const { data: relatedPosts, isLoading: postsLoading } = useBlogPosts(currentTopic?.name);
  
  if (!currentTopic) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900">Kategorie nicht gefunden</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage>{currentTopic.name}</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: currentTopic.color }}
            >
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {currentTopic.name}
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                {currentTopic.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Benefits Cards */}
            <CategoryBenefits categoryId={categoryId!} color={currentTopic.color} />

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Kostenlose Beratung gewünscht?
                  </h3>
                  <p className="text-gray-600">
                    Lassen Sie sich von unseren Experten beraten und finden Sie die beste Lösung für Ihr Zuhause.
                  </p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  Jetzt beraten lassen
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Related Articles */}
            {postsLoading && <div>Lade Artikel...</div>}
            {!postsLoading && relatedPosts && relatedPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Aktuelle Artikel zu {currentTopic.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((post, index) => (
                    <div key={post.id}>
                      <BlogCard post={post} />
                      {/* Ad after every 4th post */}
                      {(index + 1) % 4 === 0 && siteConfig.adsEnabled && (
                        <div className="mt-6 mb-6">
                          <AdSlot position="banner" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - genau wie im Blog */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Sidebar Ad */}
              {siteConfig.adsEnabled && siteConfig.adsSettings.positions.sidebarTop && (
                <AdSlot position="sidebar" />
              )}

              {/* Popular Topics */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-4">Weitere Themen</h3>
                <div className="space-y-2">
                  {siteConfig.contentTopics.filter(t => t.id !== categoryId).slice(0, 4).map((topic) => (
                    <a
                      key={topic.id}
                      href={topic.seoUrl}
                      className="block w-full text-left px-3 py-2 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-colors"
                    >
                      {topic.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Stats - genau wie im Blog */}
              <QuickStats />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
