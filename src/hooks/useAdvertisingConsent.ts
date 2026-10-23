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
    // Einwilligung im selben Tab (CookieConsent sendet dieses Event beim Speichern)
    const handleConsentChanged = (event: Event) => {
      const detail = (event as CustomEvent<{ advertising?: boolean }>).detail;
      setAdvertisingConsent(!!detail?.advertising);
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('cookie-consent-changed', handleConsentChanged);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('cookie-consent-changed', handleConsentChanged);
    };
  }, []);

  return advertisingConsent;
}
