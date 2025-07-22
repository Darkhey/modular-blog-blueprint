

import NewsletterSignup from '@/components/ui/NewsletterSignup';
import PopularTopics from '@/components/blog/sidebar/PopularTopics';
import QuickStats from '@/components/shared/QuickStats';
import QuickNavigation from '@/components/blog/sidebar/QuickNavigation';
import { siteConfig } from '@/config/site.config';

interface BlogSidebarProps {
  onTopicSelect: (topicId: string | null) => void;
}

const BlogSidebar = ({ onTopicSelect }: BlogSidebarProps) => {
  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-24 space-y-6 max-w-full">
        {/* Auto Ads are handled via AdSense dashboard */}

        {siteConfig.newsletter.enabled && (
          <div className="w-full max-w-full overflow-hidden">
            <NewsletterSignup />
          </div>
        )}

        <PopularTopics onTopicSelect={onTopicSelect} />
        
        <QuickStats />
        
        <QuickNavigation />
      </div>
    </aside>
  );
};

export default BlogSidebar;
