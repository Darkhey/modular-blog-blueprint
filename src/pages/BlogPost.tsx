
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowUp, CheckCircle, AlertCircle, Info, TrendingUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdSlot from '@/components/ui/AdSlot';
import NewsletterSignup from '@/components/ui/NewsletterSignup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockBlogPosts } from '@/data/mockBlogPosts';
import { siteConfig } from '@/config/site.config';

const BlogPost = () => {
  const { slug } = useParams();
  const post = mockBlogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Artikel nicht gefunden</h1>
          <Link to="/blog" className="text-green-600 hover:text-green-700">
            ← Zurück zum Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedPosts = mockBlogPosts
    .filter(p => p.id !== post.id && p.topic === post.topic)
    .slice(0, 2);

  const tableOfContents = post.tableOfContents || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <article className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-green-600">Blog</Link>
            <span>/</span>
            <span className="text-gray-900">{post.title}</span>
          </div>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-4">
            <span 
              className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: post.topicColor }}
            >
              {post.topic}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pb-8 border-b border-gray-200">
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{new Date(post.publishedAt).toLocaleDateString('de-DE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{post.readTime} Min. Lesezeit</span>
              </div>
            </div>
            
            {/* Article Rating/Difficulty */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Schwierigkeit:</span>
              <div className="flex space-x-1">
                {[...Array(post.difficulty || 2)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-green-500 rounded-full"></div>
                ))}
                {[...Array(3 - (post.difficulty || 2))].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Article Content */}
          <div className="lg:col-span-3">
            {/* Quick Summary Box */}
            <Card className="mb-8 border-l-4 border-l-green-500">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-lg text-green-700">
                  <Info size={20} />
                  <span>Das Wichtigste auf einen Blick</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Einsparpotential:</h4>
                    <p className="text-2xl font-bold text-green-600">{post.savingsPotential || 'Bis zu 40%'}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Amortisation:</h4>
                    <p className="text-2xl font-bold text-blue-600">{post.paybackTime || '8-12 Jahre'}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Förderung möglich:</h4>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="text-green-500" size={20} />
                      <span className="text-green-600 font-medium">{post.fundingAvailable || 'Ja, bis zu 70%'}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Aufwand:</h4>
                    <p className="text-gray-700">{post.effortLevel || 'Mittel'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Benefits */}
            {post.keyBenefits && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="text-green-600" size={24} />
                    <span>Hauptvorteile</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {post.keyBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Important Notice */}
            {post.importantNotice && (
              <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-yellow-800 font-medium mb-1">Wichtiger Hinweis:</p>
                    <p className="text-yellow-700">{post.importantNotice}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
            </div>

            {/* Cost Breakdown */}
            {post.costs && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Kostenübersicht</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4">Maßnahme</th>
                          <th className="text-left py-2 px-4">Kosten pro m²</th>
                          <th className="text-left py-2 px-4">Gesamtkosten (EFH)</th>
                          <th className="text-left py-2 px-4">Förderung</th>
                        </tr>
                      </thead>
                      <tbody>
                        {post.costs.map((cost, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2 px-4 font-medium">{cost.item}</td>
                            <td className="py-2 px-4">{cost.costPerSqm}</td>
                            <td className="py-2 px-4">{cost.totalCost}</td>
                            <td className="py-2 px-4 text-green-600">{cost.funding}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* In-Article Ad */}
            {siteConfig.adsEnabled && siteConfig.adsSettings.positions.afterParagraph && (
              <div className="my-8">
                <AdSlot position="banner" />
              </div>
            )}

            {/* Call to Action */}
            <Card className="mt-12 bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Bereit für Ihre energetische Sanierung?
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Lassen Sie sich von unseren Experten beraten und finden Sie die optimale Lösung für Ihr Zuhause. 
                  Wir helfen Ihnen bei der Planung, Finanzierung und Umsetzung.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/kontakt"
                    className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Kostenlose Beratung anfragen
                  </Link>
                  <Link 
                    to="/foerdermittel"
                    className="inline-flex items-center justify-center px-8 py-4 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors"
                  >
                    Fördermittel prüfen
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              {tableOfContents.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Inhaltsverzeichnis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav className="space-y-2">
                      {tableOfContents.map((item, index) => (
                        <a 
                          key={index} 
                          href={`#${item.id}`} 
                          className="block text-sm text-gray-600 hover:text-green-600 py-1 border-l-2 border-transparent hover:border-green-600 pl-3 transition-colors"
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              )}

              {/* Quick Facts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Schnelle Fakten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-sm text-gray-600">Schwierigkeit</span>
                    <div className="flex space-x-1">
                      {[...Array(post.difficulty || 2)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-green-500 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-sm text-gray-600">Lesezeit</span>
                    <span className="text-sm font-medium">{post.readTime} Min.</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-sm text-gray-600">Kategorie</span>
                    <span className="text-sm font-medium text-green-600">{post.topic}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Sidebar Ad */}
              {siteConfig.adsEnabled && siteConfig.adsSettings.positions.sidebarTop && (
                <AdSlot position="sidebar" />
              )}

              {/* Back to Top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full flex items-center justify-center space-x-2 p-4 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                <ArrowUp size={16} />
                <span>Nach oben</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Weitere Artikel zu {post.topic}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <span 
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: relatedPost.topicColor }}
                      >
                        {relatedPost.topic}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      <Link to={`/blog/${relatedPost.slug}`} className="hover:text-green-600 transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">{relatedPost.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{relatedPost.readTime} Min. Lesezeit</span>
                      <Link 
                        to={`/blog/${relatedPost.slug}`}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        Weiterlesen →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16">
          <NewsletterSignup />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
