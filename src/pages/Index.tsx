import { Link } from 'react-router-dom';
import { ArrowDown, Calendar, Clock, Zap, TrendingDown, Battery, Thermometer, Euro, CheckCircle, Lightbulb, Target, Flame, Calculator } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import NewsletterSignup from '@/components/ui/NewsletterSignup';
import AdSlot from '@/components/ui/AdSlot';
import SavingsCalculator from '@/components/calculators/SavingsCalculator';
import InsulationManufacturers from '@/components/manufacturers/InsulationManufacturers';
import { siteConfig } from '@/config/site.config';
import { mockBlogPosts } from '@/data/mockBlogPosts';

const Index = () => {
  const featuredPosts = mockBlogPosts.slice(0, 3);
  const topTopics = siteConfig.contentTopics.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section mit krassen Sparpotential-Highlights */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-blue-600 to-emerald-700">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-yellow-300/20 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-green-300/15 rounded-full blur-md animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 left-1/2 w-20 h-20 bg-blue-300/10 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center text-white">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold mb-6 animate-pulse">
              <Flame className="mr-2 w-4 h-4" />
              🔥 HEISSE SPARPOTENTIALE ENTDECKT!
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-yellow-100 to-green-100 bg-clip-text text-transparent leading-tight">
              KRASS SPAREN
            </h1>
            <p className="text-2xl md:text-3xl text-yellow-200 mb-4 font-bold">
              Bis zu 3.500€ pro Jahr weniger Heizkosten!
            </p>
            <p className="text-lg md:text-xl text-green-100 mb-8 max-w-4xl mx-auto">
              Entdecken Sie die heißesten Tricks für Ihr Eigenheim - Diese Spartipps werden Ihre Energiekosten zum Schmelzen bringen! 🔥
            </p>
          </div>
          
          {/* Krasse Spar-Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm p-8 rounded-2xl border-2 border-red-300/30 hover:border-red-300/60 transition-all duration-300 group hover:scale-105">
              <div className="text-6xl mb-4">🔥</div>
              <div className="text-5xl font-black text-white mb-2">-85%</div>
              <p className="text-yellow-200 font-bold text-lg">HEIZKOSTEN KILLER</p>
              <p className="text-red-100 text-sm mt-2">Mit Wärmepumpe + Dämmung</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm p-8 rounded-2xl border-2 border-green-300/30 hover:border-green-300/60 transition-all duration-300 group hover:scale-105">
              <div className="text-6xl mb-4">💰</div>
              <div className="text-5xl font-black text-white mb-2">25k€</div>
              <p className="text-yellow-200 font-bold text-lg">FÖRDER-JACKPOT</p>
              <p className="text-green-100 text-sm mt-2">Staatliche Zuschüsse 2024</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm p-8 rounded-2xl border-2 border-blue-300/30 hover:border-blue-300/60 transition-all duration-300 group hover:scale-105">
              <div className="text-6xl mb-4">⚡</div>
              <div className="text-5xl font-black text-white mb-2">0€</div>
              <p className="text-yellow-200 font-bold text-lg">SOFORT-TRICKS</p>
              <p className="text-blue-100 text-sm mt-2">Ohne Investition starten</p>
            </div>
          </div>

          {/* Heiße Call-to-Actions */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/blog"
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 font-black text-xl shadow-2xl hover:shadow-3xl transform hover:scale-110 hover:-rotate-1"
            >
              <Target className="mr-3 w-7 h-7 group-hover:animate-spin" />
              SPAAR-HACKS ENTDECKEN
              <ArrowDown className="ml-3 w-6 h-6 animate-bounce" />
            </Link>
            
            <Link 
              to="#calculator"
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-2xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 font-black text-xl shadow-2xl hover:shadow-3xl transform hover:scale-110 hover:rotate-1"
            >
              <Calculator className="mr-3 w-7 h-7 group-hover:animate-pulse" />
              SOFORT BERECHNEN!
            </Link>
          </div>
          
          <div className="mt-8 text-yellow-200 text-lg animate-pulse">
            ⬇️ Scrolle runter für die KRASSESTEN Spartipps! ⬇️
          </div>
        </div>
      </section>

      {/* Sanierungskostenrechner Section */}
      <section id="calculator" className="py-20 bg-gradient-to-br from-gray-50 via-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              💡 Ihr Sparpotential berechnen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Finden Sie in 30 Sekunden heraus, wie viel Sie mit einer Sanierung sparen können!
            </p>
          </div>
          
          <SavingsCalculator />
        </div>
      </section>

      {/* Dämmstoff-Hersteller Vergleich */}
      <InsulationManufacturers />

      {/* Heiße Blog-Artikel Teaser */}
      <section className="py-20 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-full text-lg font-bold mb-6 animate-pulse">
              🔥 BRANDHEISSE SPARTIPPS
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Diese Artikel sparen Ihnen TAUSENDE Euro!
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Unsere Leser haben mit diesen Tipps bereits über 2 Millionen Euro gespart. 
              <span className="text-red-600 font-bold"> Jetzt sind Sie dran!</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <div key={post.id} className="transform hover:scale-105 transition-all duration-300 relative">
                {index === 0 && (
                  <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold z-10 animate-pulse">
                    🔥 MOST POPULAR
                  </div>
                )}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 hover:border-red-200">
                  <BlogCard post={post} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/blog"
              className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 font-black text-2xl shadow-2xl transform hover:scale-110"
            >
              <Lightbulb className="mr-4 w-8 h-8 group-hover:animate-pulse" />
              ALLE SPAR-HACKS ENTDECKEN
              <ArrowDown className="ml-4 w-7 h-7 animate-bounce" />
            </Link>
          </div>
        </div>
      </section>

      {/* Energy savings benefits mit mehr Power */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-blue-50/50"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Warum JETZT sanieren?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Diese 4 Gründe werden Sie überzeugen - und Ihr Konto wird es Ihnen danken!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: TrendingDown, 
                title: "💸 Kosten HALBIEREN", 
                desc: "Bis zu 3.500€ weniger Heizkosten pro Jahr - das sind 35.000€ in 10 Jahren!", 
                color: "text-red-500",
                bgColor: "bg-red-50 hover:bg-red-100"
              },
              { 
                icon: Thermometer, 
                title: "🏠 Wohlfühlen MAXIMIERT", 
                desc: "22°C in JEDEM Raum - gleichmäßige Wärme ohne kalte Ecken", 
                color: "text-orange-500",
                bgColor: "bg-orange-50 hover:bg-orange-100"
              },
              { 
                icon: CheckCircle, 
                title: "📈 Wert EXPLODIERT", 
                desc: "Bis zu 25% höherer Verkaufspreis - Ihre beste Investition!", 
                color: "text-green-500",
                bgColor: "bg-green-50 hover:bg-green-100"
              },
              { 
                icon: Lightbulb, 
                title: "🌱 Klima RETTEN", 
                desc: "80% weniger CO₂ - Ihre Kinder werden es Ihnen danken", 
                color: "text-blue-500",
                bgColor: "bg-blue-50 hover:bg-blue-100"
              }
            ].map((benefit, index) => (
              <div key={index} className={`${benefit.bgColor} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-transparent hover:border-gray-200 transform hover:scale-105`}>
                <benefit.icon className={`w-12 h-12 ${benefit.color} mb-6 group-hover:scale-125 transition-transform duration-300`} />
                <h3 className="text-xl font-black text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-700 font-medium">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topic Overview mit mehr Appeal */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              🎯 Ihre Spar-Kategorien
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wählen Sie Ihren Lieblings-Sparbereich - jeder Klick bringt Sie näher zu Ihrem Traumhaus!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topTopics.map((topic, index) => (
              <Link
                key={topic.id}
                to={`/themen/${topic.id}`}
                className="group bg-white p-10 rounded-3xl border-2 border-transparent hover:border-green-300 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105"
              >
                <div 
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-125 transition-transform duration-300 shadow-lg"
                  style={{ backgroundColor: topic.color }}
                >
                  <span className="text-white font-black text-3xl">
                    {topic.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                  {topic.name}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {topic.description}
                </p>
                <div className="mt-6 text-green-600 font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                  Jetzt sparen! <ArrowDown className="ml-2 w-5 h-5 animate-bounce" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Slot */}
      <AdSlot position="banner" className="py-8 bg-gray-50" />

      {/* Newsletter Signup mit mehr Punch */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-yellow-300/10 rounded-full blur-lg animate-bounce"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-white mb-6">
              🚀 Verpassen Sie KEINE Spartipps!
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Über 50.000 Hausbesitzer erhalten bereits unsere heißesten Spartipps. 
              <span className="text-yellow-300 font-bold"> Seien Sie dabei!</span>
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
