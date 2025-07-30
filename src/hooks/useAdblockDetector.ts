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
      const hasAdsbygoogle = typeof (window as Window & { adsbygoogle?: any }).adsbygoogle !== 'undefined';
      setAdblockDetected(!hasAdsbygoogle);
    }, 3000);

    return () => clearTimeout(timer);
  }, [enabled]);

  return adblockDetected;
}
