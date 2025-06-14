
import { Link } from 'react-router-dom';
import { ArrowDown, Calendar, Clock, Zap, TrendingDown, Battery, Thermometer, Euro, CheckCircle, Lightbulb } from 'lucide-react';
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
      
      {/* Hero Section mit coolem Gradient und Animationen */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-blue-600 to-emerald-700">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-yellow-300/20 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-green-300/15 rounded-full blur-md animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <Zap className="w-12 h-12 text-yellow-300 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
            {siteConfig.projectName}
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-4xl mx-auto font-light">
            Revolutionieren Sie Ihr Zuhause - Sparen Sie bis zu 70% Energiekosten 
            mit intelligenten Sanierungslösungen
          </p>
          
          {/* Energy savings showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <TrendingDown className="w-8 h-8 text-red-300 mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-bold text-white mb-2">-70%</div>
              <p className="text-green-100">Heizkosten senken</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <Battery className="w-8 h-8 text-blue-300 mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-bold text-white mb-2">85%</div>
              <p className="text-green-100">Effizienzsteigerung</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <Euro className="w-8 h-8 text-yellow-300 mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-bold text-white mb-2">25k€</div>
              <p className="text-green-100">jährliche Ersparnis</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/blog"
              className="inline-flex items-center px-8 py-4 bg-white text-green-700 rounded-xl hover:bg-green-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Lightbulb className="mr-2 w-5 h-5" />
              Energiespar-Ratgeber
            </Link>
            <Link 
              to="/themen/foerderung"
              className="inline-flex items-center px-8 py-4 bg-yellow-500 text-white rounded-xl hover:bg-yellow-400 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Förderungen entdecken
              <ArrowDown className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Energy savings benefits */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-blue-50/50"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Warum Energiesparen jetzt wichtiger denn je ist
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingDown, title: "Kosten senken", desc: "Bis zu 2.000€ weniger Heizkosten pro Jahr", color: "text-red-500" },
              { icon: Thermometer, title: "Komfort steigern", desc: "Gleichmäßige Temperatur in allen Räumen", color: "text-orange-500" },
              { icon: CheckCircle, title: "Wertsteigerung", desc: "Bis zu 15% höherer Immobilienwert", color: "text-green-500" },
              { icon: Lightbulb, title: "Umwelt schonen", desc: "60% weniger CO₂-Emissionen", color: "text-blue-500" }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group border border-gray-100">
                <benefit.icon className={`w-10 h-10 ${benefit.color} mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topic Overview mit verbessertem Design */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ihre Energiespar-Themen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Von Heizungsmodernisierung bis zu Smart Home - entdecken Sie alle Möglichkeiten zum Energiesparen
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topTopics.map((topic, index) => (
              <Link
                key={topic.id}
                to={`/themen/${topic.id}`}
                className="group bg-white p-8 rounded-2xl border-2 border-transparent hover:border-green-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: topic.color }}
                >
                  <span className="text-white font-bold text-2xl">
                    {topic.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {topic.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {topic.description}
                </p>
                <div className="mt-4 text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Mehr erfahren →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Slot */}
      <AdSlot position="banner" className="py-8 bg-gray-50" />

      {/* Featured Blog Posts mit verbessertem Design */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Neueste Energiespar-Tipps
              </h2>
              <p className="text-gray-600">Praktische Anleitungen für sofortige Kosteneinsparungen</p>
            </div>
            <Link 
              to="/blog"
              className="hidden md:inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Alle Artikel →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <div key={post.id} className="transform hover:scale-105 transition-transform duration-300">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 md:hidden">
            <Link 
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Alle Artikel →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup mit verbessertem Design */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
