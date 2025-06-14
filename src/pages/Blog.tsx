
import { useState } from 'react';
import { Search, BookOpen, TrendingUp, Award, Users } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import TopicFilter from '@/components/blog/TopicFilter';
import AdSlot from '@/components/ui/AdSlot';
import NewsletterSignup from '@/components/ui/NewsletterSignup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

  const blogStats = [
    {
      icon: BookOpen,
      title: "Ratgeber-Artikel",
      value: "120+",
      description: "Fundierte Artikel zu allen Themen der Sanierung",
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Durchschnittliche Ersparnis",
      value: "25%",
      description: "Energiekosten-Reduktion unserer Leser",
      color: "text-green-600"
    },
    {
      icon: Award,
      title: "Erfolgreiche Projekte",
      value: "2.500+",
      description: "Sanierungen mit unseren Tipps realisiert",
      color: "text-orange-600"
    },
    {
      icon: Users,
      title: "Community",
      value: "15.000+",
      description: "Hausbesitzer vertrauen unserem Ratgeber",
      color: "text-purple-600"
    }
  ];

  const popularTopics = [
    { name: "Heizung tauschen", posts: 25, savings: "bis 40%" },
    { name: "Dämmung planen", posts: 18, savings: "bis 50%" },
    { name: "Förderung beantragen", posts: 22, savings: "bis 70%" },
    { name: "Fenster erneuern", posts: 12, savings: "bis 20%" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ratgeber & Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Praktische Tipps und fundiertes Wissen für Ihre energetische Sanierung. 
            Von der Planung bis zur Umsetzung - wir begleiten Sie auf dem Weg zur Energieeffizienz.
          </p>
        </div>

        {/* Blog Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {blogStats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-3">
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                <CardTitle className="text-lg">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <CardDescription>{stat.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
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
            {/* Featured Article Section */}
            {!selectedTopic && !searchQuery && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Aktuelle Highlights</h2>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="text-white w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Neue BEG-Förderung 2024: Bis zu 70% Zuschuss sichern
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Die aktuellen Änderungen der Bundesförderung für effiziente Gebäude (BEG) 
                        bieten noch bessere Konditionen für Ihre Sanierung. Erfahren Sie, wie Sie 
                        maximal profitieren können.
                      </p>
                      <a 
                        href="/blog/beg-foerderung-2024"
                        className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                      >
                        Artikel lesen →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {filteredPosts.length > 0 ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {selectedTopic ? `Artikel zu "${siteConfig.contentTopics.find(t => t.id === selectedTopic)?.name}"` : 
                   searchQuery ? `Suchergebnisse für "${searchQuery}"` : 
                   'Alle Ratgeber-Artikel'}
                </h2>
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
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-gray-400 w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Keine Artikel gefunden
                </h3>
                <p className="text-gray-500 mb-6">
                  Versuchen Sie andere Suchbegriffe oder wählen Sie eine andere Kategorie.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTopic(null);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Alle Artikel anzeigen
                </button>
              </div>
            )}

            {/* Content Quality Promise */}
            {!selectedTopic && !searchQuery && (
              <div className="mt-12 bg-white p-6 rounded-lg border">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Unser Qualitätsversprechen
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <BookOpen className="text-blue-600 w-6 h-6" />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">Expertenwissen</h4>
                      <p className="text-gray-600 text-center">
                        Alle Artikel werden von Fachexperten geprüft und regelmäßig aktualisiert.
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                        <TrendingUp className="text-green-600 w-6 h-6" />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">Praxisnah</h4>
                      <p className="text-gray-600 text-center">
                        Konkrete Tipps und Anleitungen, die Sie direkt umsetzen können.
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                        <Award className="text-orange-600 w-6 h-6" />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">Aktuell</h4>
                      <p className="text-gray-600 text-center">
                        Immer auf dem neuesten Stand zu Förderungen und Technik.
                      </p>
                    </div>
                  </div>
                </div>
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

              {/* Newsletter Signup */}
              {siteConfig.newsletter.enabled && (
                <NewsletterSignup />
              )}

              {/* Popular Topics with Enhanced Info */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-4">Beliebte Themen</h3>
                <div className="space-y-3">
                  {popularTopics.map((topic, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
                      <button
                        onClick={() => setSelectedTopic(siteConfig.contentTopics.find(t => t.name.includes(topic.name.split(' ')[0]))?.id || null)}
                        className="block w-full text-left group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                            {topic.name}
                          </span>
                          <span className="text-xs text-green-600 font-medium">{topic.savings}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{topic.posts} Artikel</span>
                          <span className="text-xs text-gray-400">→</span>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats - same as other pages */}
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
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">CO2-Einsparung:</span>
                    <span className="font-semibold text-purple-600">bis 80%</span>
                  </div>
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-4">Schnellzugriff</h3>
                <div className="space-y-2">
                  {siteConfig.contentTopics.slice(0, 4).map((topic) => (
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
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
