import AdSenseDisplay from './AdSenseDisplay';
import { siteConfig } from '@/config/site.config';

export default function SidebarAd({ className = '' }: { className?: string }) {
  return (
    <AdSenseDisplay
      adSlot={siteConfig.adSlots.sidebar}
      adFormat="auto"
      minHeight={250}
      className={`hidden lg:block ${className}`}
    />
  );
}
