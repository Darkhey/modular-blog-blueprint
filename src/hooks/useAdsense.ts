import { useEffect } from 'react';

declare global {
  interface Window {
    adSenseInitialized?: boolean;
  }
}
import { siteConfig } from '@/config/site.config';

export const useAdsense = () => {
  useEffect(() => {
    if (!siteConfig.adsEnabled || !siteConfig.googleServices.adsense.enabled) {
      return;
    }

    const loadScript = () => {
      if (typeof window === 'undefined' || window.adSenseInitialized) {
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
      window.adSenseInitialized = true;
    };

    const tryLoad = () => {
      try {
        const consentStr = localStorage.getItem('cookie-consent');
        const consent = consentStr ? JSON.parse(consentStr) : null;
        if (consent?.advertising) {
          loadScript();
        }
      } catch (err) {
        console.error('AdSense initialization failed', err);
      }
    };

    window.addEventListener('ads_consent_updated', tryLoad);
    tryLoad();
    return () => {
      window.removeEventListener('ads_consent_updated', tryLoad);
    };
  }, []);
};
