
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, ArrowLeft, Home, ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import TopicFilter from '@/components/blog/TopicFilter';
import AdSlot from '@/components/ui/AdSlot';
import { mockBlogPosts } from '@/data/mockBlogPosts';
import { siteConfig } from '@/config/site.config';

interface CategoryPageProps {
  category?: string;
}

const CategoryPage = ({ category: propCategory }: CategoryPageProps) => {
  const { topic } = useParams();
  const category = propCategory || topic;
  
  const [searchQuery, setSearchQuery] = useState('');

  // Finde die aktuelle Kategorie
  const currentTopic = siteConfig.contentTopics.find(t => t.id === category);
  
  if (!currentTopic) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kategorie nicht gefunden</h1>
          <Link to="/blog" className="text-green-600 hover:text-green-700">
            ← Zurück zum Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Filtere Posts nach aktueller Kategorie
  const categoryPosts = mockBlogPosts.filter(post => 
    post.topic === currentTopic.name &&
    (!searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const seoTitle = `${currentTopic.name} - Ratgeber & Tipps | ${siteConfig.projectName}`;
  const seoDescription = `${currentTopic.description}. Praktische Tipps, Kosten-Nutzen-Analysen und Förderungen für ${currentTopic.name.toLowerCase()}.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* SEO Meta Tags würden hier über React Helmet o.ä. gesetzt werden */}
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-green-600 flex items-center">
            <Home size={16} className="mr-1" />
            Start
          </Link>
          <ChevronRight size={16} />
          <Link to="/blog" className="hover:text-green-600">
            Blog
          </Link>
          <ChevronRight size={16} />
          <span className="text-gray-900 font-medium">{currentTopic.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 shadow-lg" style={{ backgroundColor: currentTopic.color }}>
            <span className="text-white font-black text-3xl">
              {currentTopic.name.charAt(0)}
            </span>
          </div>
          
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            {currentTopic.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {currentTopic.description}
          </p>
          
          {/* Kategorie-spezifische Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {category === 'heizung' && (
              <>
                <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                  <div className="text-3xl font-black text-red-600 mb-2">-40%</div>
                  <p className="text-red-800 font-semibold">Heizkosten sparen</p>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                  <div className="text-3xl font-black text-green-600 mb-2">70%</div>
                  <p className="text-green-800 font-semibold">BAFA Förderung</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                  <div className="text-3xl font-black text-blue-600 mb-2">10 Jahre</div>
                  <p className="text-blue-800 font-semibold">Amortisation</p>
                </div>
              </>
            )}
            
            {category === 'daemmung' && (
              <>
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
                  <div className="text-3xl font-black text-purple-600 mb-2">-50%</div>
                  <p className="text-purple-800 font-semibold">Wärmeverlust reduzieren</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                  <div className="text-3xl font-black text-orange-600 mb-2">150k€</div>
                  <p className="text-orange-800 font-semibold">KfW Kredit</p>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                  <div className="text-3xl font-black text-green-600 mb-2">15 Jahre</div>
                  <p className="text-green-800 font-semibold">Lebensdauer</p>
                </div>
              </>
            )}
            
            {/* Default Benefits für andere Kategorien */}
            {!['heizung', 'daemmung'].includes(category || '') && (
              <>
                <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                  <div className="text-3xl font-black text-green-600 mb-2">💰</div>
                  <p className="text-green-800 font-semibold">Kosten sparen</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                  <div className="text-3xl font-black text-blue-600 mb-2">🏆</div>
                  <p className="text-blue-800 font-semibold">Beste Qualität</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
                  <div className="text-3xl font-black text-yellow-600 mb-2">⚡</div>
                  <p className="text-yellow-800 font-semibold">Effizient</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={`${currentTopic.name} Artikel durchsuchen...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Topic Filter */}
        <TopicFilter 
          selectedTopic={category}
          onTopicChange={(newTopic) => {
            if (newTopic) {
              const topic = siteConfig.contentTopics.find(t => t.id === newTopic);
              if (topic) {
                window.location.href = `/${topic.id.replace('_', '-')}`;
              }
            } else {
              window.location.href = '/blog';
            }
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {categoryPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryPosts.map((post, index) => (
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
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Noch keine Artikel in dieser Kategorie
                </h3>
                <p className="text-gray-500 text-lg mb-6">
                  Wir arbeiten daran, Ihnen die besten Inhalte zu {currentTopic.name.toLowerCase()} zu liefern.
                </p>
                <Link 
                  to="/blog"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Alle Artikel anzeigen
                </Link>
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

              {/* Related Topics */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-4">Verwandte Themen</h3>
                <div className="space-y-2">
                  {siteConfig.contentTopics
                    .filter(t => t.id !== category)
                    .slice(0, 4)
                    .map((relatedTopic) => (
                    <Link
                      key={relatedTopic.id}
                      to={`/${relatedTopic.id.replace('_', '-')}`}
                      className="block px-3 py-2 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-colors"
                    >
                      {relatedTopic.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Category Stats */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {currentTopic.name} Insights
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Verfügbare Artikel:</span>
                    <span className="font-semibold text-green-600">{categoryPosts.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Ø Lesezeit:</span>
                    <span className="font-semibold text-blue-600">
                      {categoryPosts.length > 0 
                        ? Math.round(categoryPosts.reduce((acc, post) => acc + post.readTime, 0) / categoryPosts.length)
                        : 0
                      } Min
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sparpotential:</span>
                    <span className="font-semibold text-orange-600">Hoch</span>
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

export default CategoryPage;
