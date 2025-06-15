
import { ArrowUp } from 'lucide-react';
import AdSlot from '@/components/ui/AdSlot';
import { siteConfig } from '@/config/site.config';
import { BlogPost } from '@/hooks/useBlogPosts';
import TableOfContents from './TableOfContents';
import QuickFacts from './QuickFacts';

interface BlogPostSidebarProps {
  post: BlogPost;
}

const BlogPostSidebar = ({ post }: BlogPostSidebarProps) => {
  const tableOfContents = post.table_of_contents || [];

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 space-y-6">
        <TableOfContents tableOfContents={tableOfContents} />
        <QuickFacts post={post} />

        {siteConfig.adsEnabled && siteConfig.adsSettings.positions.sidebarTop && (
          <AdSlot position="sidebar" />
        )}

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full flex items-center justify-center space-x-2 p-4 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
        >
          <ArrowUp size={16} />
          <span>Nach oben</span>
        </button>
      </div>
    </div>
  );
};

export default BlogPostSidebar;
