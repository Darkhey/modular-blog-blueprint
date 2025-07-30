import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site.config';

export function useAdblockDetector(enabled: boolean) {
  const [adblockDetected, setAdblockDetected] = useState(false);

  useEffect(() => {
    if (!enabled || !siteConfig.adsEnabled) {
      setAdblockDetected(false);
      return;
    }

    const timer = setTimeout(() => {
      if (typeof (window as any).adsbygoogle === 'undefined') {
        setAdblockDetected(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [enabled]);

  return adblockDetected;
}
