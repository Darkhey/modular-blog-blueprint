import AdSenseDisplay from './AdSenseDisplay';
import { siteConfig } from '@/config/site.config';

export default function InArticleAd({ className = '' }: { className?: string }) {
  return (
    <AdSenseDisplay
      adSlot={siteConfig.adSlots.inArticle}
      adFormat="fluid"
      adLayout="in-article"
      minHeight={160}
      className={`max-w-2xl mx-auto my-10 ${className}`}
    />
  );
}
