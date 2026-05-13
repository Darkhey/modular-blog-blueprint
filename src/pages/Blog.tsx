
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import TopicFilter from '@/components/blog/TopicFilter';
import { siteConfig } from '@/config/site.config';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import BlogStats from '@/components/blog/BlogStats';
import BlogHero from '@/components/blog/BlogHero';
import BlogSearch from '@/components/blog/BlogSearch';
import FeaturedArticle from '@/components/blog/FeaturedArticle';
import BlogPostGrid from '@/components/blog/BlogPostGrid';
import QualityPromise from '@/components/blog/QualityPromise';
import BlogSidebar from '@/components/blog/BlogSidebar';

const Blog = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const topicName = selectedTopic ? siteConfig.contentTopics.find(t => t.id === selectedTopic)?.name : undefined;
  const { data: posts, isLoading } = useBlogPosts(topicName);

  const filteredPosts = posts?.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  }) || [];

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTopic(null);
  };

  const showFeaturedContent = !selectedTopic && !searchQuery;

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Sanierungs-Blog – Aktuelle Tipps & Förderinfos</title>
        <meta name="description" content="Tagesaktuelle Artikel zu energetischer Sanierung: Heizung, Dämmung, Solar, Smart Home und Fördermittel. Praxisnah recherchiert." />
        <link rel="canonical" href="https://sanieren-sparen.de/blog" />
        <meta property="og:title" content="Sanierungs-Blog – Aktuelle Tipps & Förderinfos" />
        <meta property="og:description" content="Tagesaktuelle Artikel zu Heizung, Dämmung, Solar, Smart Home und Fördermitteln." />
        <meta property="og:url" content="https://sanieren-sparen.de/blog" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <BlogHero />
        <BlogStats />
        <BlogSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <TopicFilter 
          selectedTopic={selectedTopic}
          onTopicChange={setSelectedTopic}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <main className="lg:col-span-3">
            {showFeaturedContent && <FeaturedArticle />}

            <BlogPostGrid
              posts={filteredPosts}
              isLoading={isLoading}
              selectedTopic={selectedTopic}
              searchQuery={searchQuery}
              onClearFilters={handleClearFilters}
            />

            {showFeaturedContent && <QualityPromise />}
          </main>

          <BlogSidebar onTopicSelect={setSelectedTopic} />
        </div>
      </div>

    </div>
  );
};

export default Blog;
