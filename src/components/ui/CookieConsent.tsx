
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Cookie } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [advertisingConsent, setAdvertisingConsent] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        setShowConsent(true);
      }
    } catch (error) {
      console.error("Konnte auf localStorage nicht zugreifen:", error);
    }
  }, []);

  const updateGoogleConsent = (analytics: boolean, advertising: boolean) => {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: advertising ? 'granted' : 'denied',
      });
    }
  };

  const handleSaveConsent = (analytics: boolean, advertising: boolean) => {
    try {
      localStorage.setItem(
        'cookie-consent',
        JSON.stringify({
          necessary: true,
          analytics,
          advertising,
          timestamp: Date.now(),
        })
      );
      updateGoogleConsent(analytics, advertising);
      setShowConsent(false);
    } catch (error) {
      console.error("Konnte auf localStorage nicht zugreifen:", error);
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
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:max-w-md">
      <Card className="p-6 shadow-lg border-2">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <Cookie className="text-amber-600" size={24} />
            <h3 className="font-semibold">Cookie-Einstellungen</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowConsent(false)}
            className="p-1 h-auto"
          >
            <X size={16} />
          </Button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Wir verwenden Cookies, um unsere Website zu verbessern. Sie können Ihre Einstellungen jederzeit anpassen.
        </p>

        <div className="mb-4 space-y-3">
          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <Label htmlFor="analytics-switch" className="flex flex-col space-y-1 cursor-pointer pr-4">
              <span className="font-medium text-sm">Analytics</span>
              <span className="text-xs text-gray-500">Für Websiteoptimierung</span>
            </Label>
            <Switch
              id="analytics-switch"
              checked={analyticsConsent}
              onCheckedChange={setAnalyticsConsent}
              aria-label="Analytics-Cookies an- oder ausschalten"
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <Label htmlFor="advertising-switch" className="flex flex-col space-y-1 cursor-pointer pr-4">
              <span className="font-medium text-sm">Werbung</span>
              <span className="text-xs text-gray-500">Für relevante Werbung</span>
            </Label>
            <Switch
              id="advertising-switch"
              checked={advertisingConsent}
              onCheckedChange={setAdvertisingConsent}
              aria-label="Werbe-Cookies an- oder ausschalten"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Button onClick={acceptAll} className="w-full">
            Alle akzeptieren
          </Button>
          <div className="flex space-x-2">
            <Button 
              variant="secondary"
              onClick={saveSelection}
              className="flex-1" 
            >
              Auswahl speichern
            </Button>
            <Button 
              variant="outline" 
              onClick={acceptNecessary}
              className="flex-1" 
            >
              Nur notwendige
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4 text-center">
            Mehr Infos in unserer <Link to="/datenschutz" className="underline hover:text-primary">Datenschutzerklärung</Link>.
        </p>
      </Card>
    </div>
  );
};

export default CookieConsent;
