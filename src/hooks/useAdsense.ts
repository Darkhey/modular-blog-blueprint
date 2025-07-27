import { useEffect } from 'react';
import { siteConfig } from '@/config/site.config';

export const useAdsense = () => {
  useEffect(() => {
    if (!siteConfig.adsEnabled || !siteConfig.googleServices.adsense.enabled) {
      return;
    }

    const loadScript = () => {
      if (typeof window === 'undefined' || (window as any).adSenseInitialized) {
        return;
      }
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.googleServices.adsense.publisherId}`;
      script.crossOrigin = 'anonymous';
      const adtest = siteConfig.googleServices.adsense.config.adtest;
      if (adtest) {
        script.setAttribute('data-adbreak-test', adtest);
      }
      document.head.appendChild(script);
      (window as any).adSenseInitialized = true;
    };

    try {
      const consentStr = localStorage.getItem('cookie-consent');
      if (!consentStr) {
        console.log('No consent data found, skipping AdSense loading');
        return;
      }
      const consent = JSON.parse(consentStr);
      if (consent && typeof consent === 'object' && consent.advertising === true) {
        loadScript();
      } else {
        console.log('Advertising consent not granted, skipping AdSense loading');
      }
    } catch (err) {
      console.error('AdSense initialization failed - invalid consent data:', err);
    }
  }, []);
};
