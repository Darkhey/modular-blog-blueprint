
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
        return '1234567890'; // Banner oben
      case 'sidebar':
        return '1234567891'; // Sidebar rechts
      case 'footer':
        return '1234567892'; // Footer
      case 'article':
        return '1234567893'; // In Artikeln
      case 'header':
        return '1234567894'; // Header-Bereich
      case 'content':
        return '1234567895'; // Content-Bereich
      default:
        return adSlot || '1234567890';
    }
  };

  // Responsive Größen basierend auf Position
  const getAdStyle = () => {
    switch (position) {
      case 'banner':
      case 'header':
        return { display: 'block', width: '100%', height: '90px' };
      case 'sidebar':
        return { display: 'block', width: '300px', height: '250px' };
      case 'footer':
        return { display: 'block', width: '100%', height: '100px' };
      case 'article':
      case 'content':
        return { display: 'block', width: '100%', height: '280px' };
      default:
        return { display: 'block' };
    }
  };

  // Echte AdSense Integration
  if (siteConfig.googleServices.adsense.enabled) {
    return (
      <div className={`ad-container ${className} my-4`} ref={adRef}>
        <div className="text-xs text-gray-400 text-center mb-1">Anzeige</div>
        <ins
          className="adsbygoogle"
          style={getAdStyle()}
          data-ad-client="ca-pub-4326654077043920"
          data-ad-slot={getAdSlotId()}
          data-ad-format={responsive ? 'auto' : adFormat}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    );
  }

  // Fallback für Entwicklung - schöne Platzhalter
  const getPlaceholderContent = () => {
    switch (position) {
      case 'banner':
        return (
          <div className="bg-gradient-to-r from-blue-100 to-green-100 border-2 border-dashed border-blue-300 rounded-lg p-4 text-center">
            <div className="text-blue-600 font-medium">Banner Werbung (728x90)</div>
            <div className="text-xs text-blue-500 mt-1">Hier erscheint Ihre Werbung</div>
          </div>
        );
      case 'sidebar':
        return (
          <div className="bg-gradient-to-b from-purple-100 to-pink-100 border-2 border-dashed border-purple-300 rounded-lg p-4 text-center">
            <div className="text-purple-600 font-medium">Sidebar Werbung</div>
            <div className="text-xs text-purple-500 mt-1">300x250 Medium Rectangle</div>
          </div>
        );
      case 'article':
        return (
          <div className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-dashed border-green-300 rounded-lg p-6 text-center">
            <div className="text-green-600 font-medium">Artikel Werbung</div>
            <div className="text-xs text-green-500 mt-1">Responsive Display Ad</div>
          </div>
        );
      case 'footer':
        return (
          <div className="bg-gradient-to-r from-gray-100 to-blue-100 border-2 border-dashed border-gray-300 rounded-lg p-3 text-center">
            <div className="text-gray-600 font-medium">Footer Werbung</div>
            <div className="text-xs text-gray-500 mt-1">Leaderboard 728x90</div>
          </div>
        );
      default:
        return (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded p-4 text-center text-sm text-blue-600">
            Werbeplatz - {position}
          </div>
        );
    }
  };

  return (
    <div className={`ad-slot ${className} my-4`}>
      {getPlaceholderContent()}
    </div>
  );
};

export default AdSlot;
