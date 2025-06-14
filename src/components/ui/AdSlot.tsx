
import { useEffect, useRef } from 'react';
import { siteConfig } from '@/config/site.config';

interface AdSlotProps {
  position: 'banner' | 'sidebar' | 'footer' | 'article';
  className?: string;
  adSlot?: string; // AdSense Ad Unit ID
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
}

const AdSlot = ({ 
  position, 
  className = '', 
  adSlot,
  adFormat = 'auto' 
}: AdSlotProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (siteConfig.googleServices.adsense.enabled && window.adsbygoogle && adSlot) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [adSlot]);

  if (!siteConfig.adsEnabled) return null;

  // Fallback für Entwicklung ohne echte Ad Units
  const getAdCode = () => {
    switch (position) {
      case 'banner':
        return siteConfig.adsSettings.adCodes.banner;
      case 'sidebar':
        return siteConfig.adsSettings.adCodes.sidebar;
      case 'footer':
        return siteConfig.adsSettings.adCodes.footer;
      case 'article':
        return '<div class="bg-blue-50 border border-blue-200 p-4 rounded text-center text-sm text-blue-600">Artikel-Werbung</div>';
      default:
        return '';
    }
  };

  // Echte AdSense Integration
  if (siteConfig.googleServices.adsense.enabled && adSlot) {
    return (
      <div className={`ad-slot ${className}`} ref={adRef}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={siteConfig.googleServices.adsense.config.data_ad_client}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Fallback für Entwicklung
  return (
    <div className={`ad-slot ${className}`}>
      <div dangerouslySetInnerHTML={{ __html: getAdCode() }} />
    </div>
  );
};

export default AdSlot;
