
import { useState } from 'react';
import { Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import TopicFilter from '@/components/blog/TopicFilter';
import AdSlot from '@/components/ui/AdSlot';
import { mockBlogPosts } from '@/data/mockBlogPosts';
import { siteConfig } from '@/config/site.config';

const Blog = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesTopic = !selectedTopic || post.topic === siteConfig.contentTopics.find(t => t.id === selectedTopic)?.name;
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ratgeber & Blog
          </h1>
          <p className="text-xl text-gray-600">
            Praktische Tipps und fundiertes Wissen für Ihre energetische Sanierung
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Artikel durchsuchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Topic Filter */}
        <TopicFilter 
          selectedTopic={selectedTopic}
          onTopicChange={setSelectedTopic}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post, index) => (
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
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Keine Artikel gefunden. Versuchen Sie andere Suchbegriffe.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Sidebar Ad */}
              {siteConfig.adsEnabled && siteConfig.adsSettings.positions.sidebarTop && (
                <AdSlot position="sidebar" />
              )}

              {/* Popular Topics */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-4">Beliebte Themen</h3>
                <div className="space-y-2">
                  {siteConfig.contentTopics.slice(0, 4).map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className="block w-full text-left px-3 py-2 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-colors"
                    >
                      {topic.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-4">Wussten Sie schon?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Heizkosten-Ersparnis:</span>
                    <span className="font-semibold text-green-600">bis 40%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">BAFA-Förderung:</span>
                    <span className="font-semibold text-blue-600">bis 70%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Amortisation:</span>
                    <span className="font-semibold text-orange-600">8-15 Jahre</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
