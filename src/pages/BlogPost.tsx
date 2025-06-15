
import { useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdSlot from '@/components/ui/AdSlot';
import NewsletterSignup from '@/components/ui/NewsletterSignup';
import ArticleRating from '@/components/blog/ArticleRating';
import ShareButtons from '@/components/blog/ShareButtons';
import { useBlogPost, useBlogPosts } from '@/hooks/useBlogPosts';
import { siteConfig } from '@/config/site.config';

import BlogPostSkeleton from '@/components/blog/post/BlogPostSkeleton';
import BlogPostNotFound from '@/components/blog/post/BlogPostNotFound';
import BlogBreadcrumb from '@/components/blog/post/BlogBreadcrumb';
import BlogPostHeader from '@/components/blog/post/BlogPostHeader';
import QuickSummary from '@/components/blog/post/QuickSummary';
import KeyBenefits from '@/components/blog/post/KeyBenefits';
import ImportantNotice from '@/components/blog/post/ImportantNotice';
import CostBreakdown from '@/components/blog/post/CostBreakdown';
import CallToAction from '@/components/blog/post/CallToAction';
import BlogPostSidebar from '@/components/blog/post/BlogPostSidebar';
import RelatedArticles from '@/components/blog/post/RelatedArticles';
import BlogPostSEO from '@/components/seo/BlogPostSEO';
import ArticleBody from '@/components/blog/post/ArticleBody';

const BlogPost = () => {
  const { slug } = useParams();
  const { data: post, isLoading: postLoading, error: postError } = useBlogPost(slug || '');
  const { data: allPosts } = useBlogPosts();

  if (postLoading) {
    return <BlogPostSkeleton />;
  }

  if (postError || !post) {
    return <BlogPostNotFound />;
  }

  const relatedPosts = allPosts
    ?.filter(p => p.id !== post.id && p.topic === post.topic)
    .slice(0, 2) || [];

  const canonicalUrl = `https://sanieren-sparen.de/blog/${post.slug}`;

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white">
        <BlogPostSEO post={post} canonicalUrl={canonicalUrl} />
        <Header />
        
        <article className="max-w-6xl mx-auto px-4 py-8">
          <BlogBreadcrumb post={post} />
          <BlogPostHeader post={post} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Article Content */}
            <div className="lg:col-span-3">
              <QuickSummary post={post} />
              <KeyBenefits post={post} />
              <ImportantNotice post={post} />
              
              <ArticleBody post={post} />
              
              <ArticleRating postId={post.id} />
              <ShareButtons title={post.title} url={canonicalUrl} />
              
              <CostBreakdown post={post} />

              {siteConfig.adsEnabled && siteConfig.adsSettings.positions.afterParagraph && (
                <div className="my-8">
                  <AdSlot position="banner" />
                </div>
              )}

              <CallToAction />
            </div>

            {/* Sidebar */}
            <BlogPostSidebar post={post} />
          </div>

          <RelatedArticles relatedPosts={relatedPosts} topic={post.topic} />

          {/* Newsletter CTA */}
          <div className="mt-16">
            <NewsletterSignup />
          </div>
        </article>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default BlogPost;
