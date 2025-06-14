
import { Link } from 'react-router-dom';
import { ArrowDown, Calendar, Clock } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import NewsletterSignup from '@/components/ui/NewsletterSignup';
import AdSlot from '@/components/ui/AdSlot';
import { siteConfig } from '@/config/site.config';
import { mockBlogPosts } from '@/data/mockBlogPosts';

const Index = () => {
  const featuredPosts = mockBlogPosts.slice(0, 3);
  const topTopics = siteConfig.contentTopics.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-blue-50 to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {siteConfig.projectName}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {siteConfig.tagline} - Praktische Tipps für mehr Energieeffizienz 
            und weniger Kosten in Ihrem Zuhause.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">40%</div>
              <p className="text-gray-600">weniger Heizkosten durch Modernisierung</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">70%</div>
              <p className="text-gray-600">staatliche Förderung für Wärmepumpen</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-orange-600 mb-2">15k€</div>
              <p className="text-gray-600">durchschnittliche jährliche Ersparnis</p>
            </div>
          </div>

          <Link 
            to="/blog"
            className="inline-flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Ratgeber entdecken
            <ArrowDown className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* Topic Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Unsere Schwerpunkt-Themen
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topTopics.map((topic) => (
              <Link
                key={topic.id}
                to={`/themen/${topic.id}`}
                className="group bg-white p-6 rounded-lg border hover:shadow-lg transition-all duration-300"
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: topic.color }}
                >
                  <span className="text-white font-bold text-lg">
                    {topic.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {topic.name}
                </h3>
                <p className="text-gray-600">
                  {topic.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Slot */}
      <AdSlot position="banner" className="py-8 bg-gray-50" />

      {/* Featured Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Neueste Ratgeber
            </h2>
            <Link 
              to="/blog"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Alle Artikel →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <NewsletterSignup />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
