
import { ArrowUp } from 'lucide-react';

import { siteConfig } from '@/config/site.config';
import { BlogPost } from '@/hooks/useBlogPosts';
import TableOfContents from './TableOfContents';
import QuickFacts from './QuickFacts';
import SidebarAd from '@/components/ads/SidebarAd';
import NativeAd from '@/components/ads/NativeAd';

interface BlogPostSidebarProps {
  post: BlogPost;
}

const BlogPostSidebar = ({ post }: BlogPostSidebarProps) => {
  const tableOfContents = post.table_of_contents || [];

  return (
    <div className="sticky top-24 space-y-6 max-w-sm">
      <TableOfContents tableOfContents={tableOfContents} />
      <SidebarAd />
      <QuickFacts post={post} />
      <NativeAd title="Weitere Sanierungstipps" />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full flex items-center justify-center space-x-2 p-4 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
      >
        <ArrowUp size={16} />
        <span>Nach oben</span>
      </button>
    </div>
  );
};

export default BlogPostSidebar;
