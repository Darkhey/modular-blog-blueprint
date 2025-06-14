
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Cookie, Shield, BarChart3 } from 'lucide-react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: true,
      advertising: true,
      timestamp: Date.now()
    }));
    setShowConsent(false);
    // Analytics und AdSense aktivieren
    enableGoogleServices();
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: false,
      advertising: false,
      timestamp: Date.now()
    }));
    setShowConsent(false);
  };

  const enableGoogleServices = () => {
    // Analytics aktivieren
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      });
    }
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:max-w-md">
      <Card className="p-6 shadow-lg border-2">
        <div className="flex justify-between items-start mb-4">
          <Cookie className="text-amber-600 mt-1" size={24} />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowConsent(false)}
            className="p-1 h-auto"
          >
            <X size={16} />
          </Button>
        </div>

        <h3 className="font-semibold mb-2">Cookie-Einstellungen</h3>
        <p className="text-sm text-gray-600 mb-4">
          Wir verwenden Cookies für Analytics und Werbung, um Ihnen die beste Erfahrung zu bieten.
        </p>

        {showDetails && (
          <div className="mb-4 space-y-3">
            <div className="flex items-start space-x-3">
              <Shield className="text-green-600 mt-1" size={16} />
              <div>
                <p className="text-sm font-medium">Notwendige Cookies</p>
                <p className="text-xs text-gray-500">Für die Grundfunktionen der Website</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <BarChart3 className="text-blue-600 mt-1" size={16} />
              <div>
                <p className="text-sm font-medium">Analytics Cookies</p>
                <p className="text-xs text-gray-500">Google Analytics für Websiteoptimierung</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Cookie className="text-orange-600 mt-1" size={16} />
              <div>
                <p className="text-sm font-medium">Werbe-Cookies</p>
                <p className="text-xs text-gray-500">Google AdSense für relevante Werbung</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Button onClick={acceptAll} className="w-full" size="sm">
            Alle akzeptieren
          </Button>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={acceptNecessary}
              className="flex-1" 
              size="sm"
            >
              Nur notwendige
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1" 
              size="sm"
            >
              {showDetails ? 'Weniger' : 'Details'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;
