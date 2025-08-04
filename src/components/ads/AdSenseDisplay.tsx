import { useEffect, useRef } from 'react';
import { siteConfig } from '@/config/site.config';
import { useAdvertisingConsent } from '@/hooks/useAdvertisingConsent';

interface AdSenseDisplayProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  adStyle?: {
    display?: string;
    width?: string;
    height?: string;
  };
  className?: string;
}

export default function AdSenseDisplay({ 
  adSlot, 
  adFormat = 'auto', 
  adStyle = { display: 'block' },
  className = ''
}: AdSenseDisplayProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const advertisingConsent = useAdvertisingConsent();

  useEffect(() => {
    if (!siteConfig.adsEnabled || !siteConfig.googleServices.adsense.enabled || !advertisingConsent) {
      return;
    }

    try {
      if (window.adsbygoogle && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [advertisingConsent]);

  if (!siteConfig.adsEnabled || !siteConfig.googleServices.adsense.enabled || !advertisingConsent) {
    return null;
  }

  return (
    <div className={`ad-container ${className}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client={siteConfig.googleServices.adsense.publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}