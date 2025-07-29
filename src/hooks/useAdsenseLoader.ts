import { useEffect } from 'react';
import { siteConfig } from '@/config/site.config';

export function useAdsenseLoader(advertisingConsent: boolean) {
  useEffect(() => {
    const scriptId = 'adsense-auto-ads';
    if (!siteConfig.adsEnabled || !siteConfig.googleServices.adsense.enabled) {
      return;
    }

    if (advertisingConsent) {
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.googleServices.adsense.publisherId}`;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }
    } else {
      const existing = document.getElementById(scriptId);
      if (existing) {
        existing.remove();
        // cleanup global variable if defined
        delete (window as any).adsbygoogle;
      }
    }
  }, [advertisingConsent]);
}
