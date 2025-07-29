import { useEffect, useState } from 'react';

export function useAdvertisingConsent() {
  const [advertisingConsent, setAdvertisingConsent] = useState(() => {
    try {
      const stored = localStorage.getItem('cookie-consent');
      if (!stored) return false;
      const data = JSON.parse(stored);
      return !!data.advertising;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'cookie-consent' && event.newValue) {
        try {
          const data = JSON.parse(event.newValue);
          setAdvertisingConsent(!!data.advertising);
        } catch {
          setAdvertisingConsent(false);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return advertisingConsent;
}
