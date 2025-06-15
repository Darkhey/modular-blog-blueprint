
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/site.config';
import TaggedBlogPostsGrid from '@/components/blog/TaggedBlogPostsGrid';
import FensterTuerenHero from '@/components/fenster-tueren/FensterTuerenHero';
import FensterTuerenContent from '@/components/fenster-tueren/FensterTuerenContent';
import FensterTuerenChecklist from '@/components/fenster-tueren/FensterTuerenChecklist';

const FensterTuerenPage = () => {
  const topic = siteConfig.contentTopics.find(t => t.id === 'fenster');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <FensterTuerenHero topic={topic} />
          <FensterTuerenContent />
          <FensterTuerenChecklist />
          
          {/* Weiterführende Blogartikel */}
          <TaggedBlogPostsGrid tag="Fenster" title="Weitere spannende Artikel zu Fenster & Türen:" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FensterTuerenPage;
