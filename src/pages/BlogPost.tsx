
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdSlot from '@/components/ui/AdSlot';
import NewsletterSignup from '@/components/ui/NewsletterSignup';
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <article className="max-w-4xl mx-auto px-4 py-8">
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
        <header className="mb-8">
          <div className="mb-4">
            <span 
              className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: post.topicColor }}
            >
              {post.topic}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {post.excerpt}
          </p>

          <div className="flex items-center space-x-6 text-sm text-gray-500 pb-8 border-b">
            <div className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>{new Date(post.publishedAt).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{post.readTime} Min. Lesezeit</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-3">
            {/* Quick Summary Box */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">Kurz erklärt</h3>
              <p className="text-gray-700 text-sm">
                {post.excerpt}
              </p>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
            </div>

            {/* In-Article Ad */}
            {siteConfig.adsEnabled && siteConfig.adsSettings.positions.afterParagraph && (
              <div className="my-8">
                <AdSlot position="banner" />
              </div>
            )}

            {/* Call to Action */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Haben Sie Fragen zu diesem Thema?
              </h3>
              <p className="text-gray-600 mb-4">
                Unser Team berät Sie gerne bei Ihrer individuellen Sanierungsplanung.
              </p>
              <Link 
                to="/kontakt"
                className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Kostenlose Beratung anfragen
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Auf dieser Seite</h4>
                <nav className="space-y-1 text-sm">
                  <a href="#" className="block text-gray-600 hover:text-green-600">
                    Wann modernisieren?
                  </a>
                  <a href="#" className="block text-gray-600 hover:text-green-600">
                    Beste Heizsysteme
                  </a>
                  <a href="#" className="block text-gray-600 hover:text-green-600">
                    Förderungen nutzen
                  </a>
                  <a href="#" className="block text-gray-600 hover:text-green-600">
                    Fazit
                  </a>
                </nav>
              </div>

              {/* Sidebar Ad */}
              {siteConfig.adsEnabled && siteConfig.adsSettings.positions.sidebarTop && (
                <AdSlot position="sidebar" />
              )}

              {/* Back to Top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full flex items-center justify-center space-x-2 p-3 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                <ArrowUp size={16} />
                <span>Nach oben</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-8 border-t">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Weitere Artikel zu {post.topic}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="block bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{relatedPost.title}</h3>
                  <p className="text-gray-600 text-sm">{relatedPost.excerpt}</p>
                </Link>
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
