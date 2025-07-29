
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Cookie } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { siteConfig } from '@/config/site.config';

declare global {
  interface Window {
    adSenseInitialized?: boolean;
  }
}

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [advertisingConsent, setAdvertisingConsent] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        const consentData = {
          necessary: true,
          analytics: true,
          advertising: true,
          timestamp: Date.now(),
          version: '1.1',
          gdpr_applies: true
        };
        localStorage.setItem('cookie-consent', JSON.stringify(consentData));
        initializeGoogleConsent(true, true);
        setAnalyticsConsent(true);
        setAdvertisingConsent(true);
        setShowConsent(true);
      } else {
        const consentData = JSON.parse(consent);
        setAnalyticsConsent(consentData.analytics);
        setAdvertisingConsent(consentData.advertising);
        updateGoogleConsent(consentData.analytics, consentData.advertising);
      }
    } catch (error) {
      console.error("Cookie-Consent Fehler:", error);
      setShowConsent(true);
      initializeGoogleConsent(true, true);
    }
  }, []);

  const initializeGoogleConsent = (analytics: boolean, advertising: boolean) => {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'default', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: advertising ? 'granted' : 'denied',
        ad_user_data: advertising ? 'granted' : 'denied',
        ad_personalization: advertising ? 'granted' : 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted',
        wait_for_update: 500
      });
    }
  };

  const updateGoogleConsent = (analytics: boolean, advertising: boolean) => {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: advertising ? 'granted' : 'denied',
        ad_user_data: advertising ? 'granted' : 'denied',
        ad_personalization: advertising ? 'granted' : 'denied',
      });
    }
  };

  const handleSaveConsent = (analytics: boolean, advertising: boolean) => {
    try {
      const consentData = {
        necessary: true,
        analytics,
        advertising,
        timestamp: Date.now(),
        version: '1.1',
        gdpr_applies: true
      };
      
      localStorage.setItem('cookie-consent', JSON.stringify(consentData));
      updateGoogleConsent(analytics, advertising);
      setShowConsent(false);

      // Tracking-Events für Consent
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'consent_update', {
          event_category: 'privacy',
          analytics_consent: analytics,
          advertising_consent: advertising,
          consent_method: 'manual_selection'
        });
      }
    } catch (error) {
      console.error("Konnte Cookie-Einstellungen nicht speichern:", error);
    }
  };

  const acceptAll = () => {
    setAnalyticsConsent(true);
    setAdvertisingConsent(true);
    handleSaveConsent(true, true);
  };

  const saveSelection = () => {
    handleSaveConsent(analyticsConsent, advertisingConsent);
  };
  
  const acceptNecessary = () => {
    setAnalyticsConsent(false);
    setAdvertisingConsent(false);
    handleSaveConsent(false, false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:max-w-lg">
      <Card className="p-6 shadow-xl border-2 bg-white">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <Cookie className="text-amber-600" size={24} />
            <h3 className="font-semibold text-gray-800">Cookie-Einstellungen</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowConsent(false)}
            className="p-1 h-auto"
            aria-label="Banner schließen"
          >
            <X size={16} />
          </Button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Wir verwenden Cookies und ähnliche Technologien, um unsere Website zu optimieren und personalisierte Werbung anzuzeigen. 
          Sie können Ihre Einstellungen jederzeit anpassen.
        </p>

        <div className="mb-6 space-y-4">
          {/* Notwendige Cookies */}
          <div className="flex items-center justify-between rounded-lg border p-4 bg-gray-50">
            <Label className="flex flex-col space-y-1 cursor-default pr-4">
              <span className="font-medium text-sm">Notwendige Cookies</span>
              <span className="text-xs text-gray-500">Für grundlegende Website-Funktionen</span>
            </Label>
            <div className="text-green-600 text-sm font-medium">Immer aktiv</div>
          </div>

          {/* Analytics Cookies */}
          <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm bg-white">
            <Label htmlFor="analytics-switch" className="flex flex-col space-y-1 cursor-pointer pr-4">
              <span className="font-medium text-sm">Analytics & Statistiken</span>
              <span className="text-xs text-gray-500">Helfen uns die Website zu verbessern (Google Analytics)</span>
            </Label>
            <Switch
              id="analytics-switch"
              checked={analyticsConsent}
              onCheckedChange={setAnalyticsConsent}
              aria-label="Analytics-Cookies aktivieren/deaktivieren"
            />
          </div>

          {/* Advertising Cookies - Erweitert */}
          <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm bg-white">
            <Label htmlFor="advertising-switch" className="flex flex-col space-y-1 cursor-pointer pr-4">
              <span className="font-medium text-sm">Werbung & Personalisierung</span>
              <span className="text-xs text-gray-500">
                Für relevante Anzeigen und personalisierte Inhalte (Google AdSense)
              </span>
            </Label>
            <Switch
              id="advertising-switch"
              checked={advertisingConsent}
              onCheckedChange={setAdvertisingConsent}
              aria-label="Werbe-Cookies aktivieren/deaktivieren"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={acceptAll} className="w-full bg-green-600 hover:bg-green-700">
            Alle Cookies akzeptieren
          </Button>
          <div className="flex space-x-3">
            <Button 
              variant="secondary"
              onClick={saveSelection}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" 
            >
              Auswahl speichern
            </Button>
            <Button 
              variant="outline" 
              onClick={acceptNecessary}
              className="flex-1 border-gray-300 hover:bg-gray-50" 
            >
              Nur notwendige
            </Button>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Mehr Informationen in unserer{' '}
          <Link to="/datenschutz" className="underline hover:text-blue-600 transition-colors">
            Datenschutzerklärung
          </Link>
          {' '}und unserem{' '}
          <Link to="/impressum" className="underline hover:text-blue-600 transition-colors">
            Impressum
          </Link>.
        </p>
      </Card>
    </div>
  );
};

export default CookieConsent;
