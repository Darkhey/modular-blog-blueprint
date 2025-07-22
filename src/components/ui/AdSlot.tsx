
import { useEffect, useRef } from 'react';
import { siteConfig } from '@/config/site.config';

interface AdSlotProps {
  position: 'banner' | 'sidebar' | 'footer' | 'article' | 'header' | 'content';
  className?: string;
  adSlot?: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal' | 'leaderboard';
  responsive?: boolean;
}

const AdSlot = ({ 
  position, 
  className = '', 
  adSlot,
  adFormat = 'auto',
  responsive = true
}: AdSlotProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const adInitialized = useRef(false);

  useEffect(() => {
    // Auto Ads werden automatisch über das AdSense-Dashboard geladen
    // Manuelle Ad-Units nur bei expliziter adSlot-Angabe
    if (siteConfig.googleServices.adsense.enabled && window.adsbygoogle && adSlot && !adInitialized.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adInitialized.current = true;
      } catch (error) {
        console.error('AdSense Fehler:', error);
      }
    }
  }, [adSlot]);

  if (!siteConfig.adsEnabled) return null;

  // Für manuelle Ad-Units (optional - Auto Ads funktionieren ohne diese)
  const getAdSlotId = () => {
    switch (position) {
      case 'banner':
        return '2345678901'; // Banner Ad Unit
      case 'sidebar':
        return '3456789012'; // Sidebar Ad Unit  
      case 'footer':
        return '4567890123'; // Footer Ad Unit
      case 'article':
        return '5678901234'; // Article Ad Unit
      case 'header':
        return '6789012345'; // Header Ad Unit
      case 'content':
        return '7890123456'; // Content Ad Unit
      default:
        return adSlot || '2345678901';
    }
  };

  // Entwicklungs-Platzhalter (Auto Ads sind unsichtbar bis aktiviert)
  const getPlaceholderContent = () => {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-gray-200 rounded-lg p-4 text-center max-w-2xl mx-auto min-h-[120px] flex items-center justify-center">
        <div>
          <div className="text-xs text-gray-400 mb-2">Auto Ads Platzhalter</div>
          <div className="text-blue-600 font-medium">Google Auto Ads - {position}</div>
          <div className="text-xs text-blue-500 mt-1">Wird automatisch über AdSense-Dashboard konfiguriert</div>
        </div>
      </div>
    );
  };

  // In Produktionsumgebung werden Auto Ads automatisch an optimalen Stellen eingefügt
  // Diese Platzhalter dienen nur zur Entwicklungsvisualisierung
  return (
    <div className={`ad-slot ${className} my-6`}>
      {/* Auto Ads werden automatisch eingefügt - kein manueller Code erforderlich */}
      {process.env.NODE_ENV === 'development' && getPlaceholderContent()}
      
      {/* Optionale manuelle Ad-Unit (falls spezifische Platzierung gewünscht) */}
      {adSlot && (
        <div className="flex justify-center" ref={adRef}>
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: 'auto' }}
            data-ad-client={siteConfig.googleServices.adsense.publisherId}
            data-ad-slot={getAdSlotId()}
            data-ad-format={responsive ? 'auto' : adFormat}
            data-full-width-responsive={responsive ? 'true' : 'false'}
            data-adtest={siteConfig.googleServices.adsense.config.adtest}
          />
        </div>
      )}
    </div>
  );
};

export default AdSlot;
