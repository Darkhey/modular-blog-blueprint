
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

  useEffect(() => {
    if (siteConfig.googleServices.adsense.enabled && window.adsbygoogle && adSlot) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense Fehler:', error);
      }
    }
  }, [adSlot]);

  if (!siteConfig.adsEnabled) return null;

  // AdSense Ad Unit IDs für verschiedene Positionen
  const getAdSlotId = () => {
    switch (position) {
      case 'banner':
        return '1234567890'; // Ersetzen Sie durch Ihre echten Ad Unit IDs
      case 'sidebar':
        return '1234567891';
      case 'footer':
        return '1234567892';
      case 'article':
        return '1234567893';
      case 'header':
        return '1234567894';
      case 'content':
        return '1234567895';
      default:
        return adSlot || '1234567890';
    }
  };

  // Responsive Größen basierend auf Position (Google-konform)
  const getAdStyle = () => {
    switch (position) {
      case 'banner':
      case 'header':
        return { display: 'block', width: '100%', height: '90px', minWidth: '320px' };
      case 'sidebar':
        return { display: 'block', width: '300px', height: '250px', minWidth: '300px' };
      case 'footer':
        return { display: 'block', width: '100%', height: '100px', minWidth: '320px' };
      case 'article':
      case 'content':
        return { display: 'block', width: '100%', height: '280px', minWidth: '320px', maxWidth: '728px', margin: '0 auto' };
      default:
        return { display: 'block', minWidth: '320px' };
    }
  };

  // Google AdSense konforme Implementierung
  if (siteConfig.googleServices.adsense.enabled) {
    return (
      <div className={`ad-container ${className} my-6`} ref={adRef}>
        {/* Google-konforme Anzeigenkennzeichnung */}
        <div className="text-xs text-gray-500 text-center mb-2 font-light">
          Werbung
        </div>
        <div className="flex justify-center">
          <ins
            className="adsbygoogle"
            style={getAdStyle()}
            data-ad-client="ca-pub-4326654077043920"
            data-ad-slot={getAdSlotId()}
            data-ad-format={responsive ? 'auto' : adFormat}
            data-full-width-responsive={responsive ? 'true' : 'false'}
            data-adtest="off"
          />
        </div>
      </div>
    );
  }

  // Entwicklungs-Platzhalter (Google-konform gestaltet)
  const getPlaceholderContent = () => {
    switch (position) {
      case 'banner':
        return (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-gray-200 rounded-lg p-4 text-center max-w-4xl mx-auto">
            <div className="text-xs text-gray-400 mb-2">Werbung</div>
            <div className="text-blue-600 font-medium">Banner Anzeige (728x90)</div>
            <div className="text-xs text-blue-500 mt-1">Responsive Leaderboard</div>
          </div>
        );
      case 'sidebar':
        return (
          <div className="bg-gradient-to-b from-purple-50 to-pink-50 border border-gray-200 rounded-lg p-4 text-center w-full max-w-xs">
            <div className="text-xs text-gray-400 mb-2">Werbung</div>
            <div className="text-purple-600 font-medium">Sidebar Anzeige</div>
            <div className="text-xs text-purple-500 mt-1">300x250 Medium Rectangle</div>
          </div>
        );
      case 'article':
      case 'content':
        return (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-gray-200 rounded-lg p-6 text-center max-w-2xl mx-auto">
            <div className="text-xs text-gray-400 mb-2">Werbung</div>
            <div className="text-green-600 font-medium">Content Anzeige</div>
            <div className="text-xs text-green-500 mt-1">Responsive Display Ad</div>
          </div>
        );
      case 'footer':
        return (
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-3 text-center max-w-4xl mx-auto">
            <div className="text-xs text-gray-400 mb-2">Werbung</div>
            <div className="text-gray-600 font-medium">Footer Anzeige</div>
            <div className="text-xs text-gray-500 mt-1">Responsive Banner</div>
          </div>
        );
      default:
        return (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-gray-200 rounded p-4 text-center text-sm max-w-md mx-auto">
            <div className="text-xs text-gray-400 mb-1">Werbung</div>
            <div className="text-blue-600">Anzeigenplatz - {position}</div>
          </div>
        );
    }
  };

  return (
    <div className={`ad-slot ${className} my-6`}>
      {getPlaceholderContent()}
    </div>
  );
};

export default AdSlot;
