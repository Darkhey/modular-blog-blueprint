
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

  // Echte Ad Unit IDs für verschiedene Positionen
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

  // Optimierte responsive Größen
  const getAdStyle = () => {
    switch (position) {
      case 'banner':
      case 'header':
        return { 
          display: 'block', 
          width: '100%', 
          height: 'auto',
          minHeight: '90px',
          maxHeight: '120px'
        };
      case 'sidebar':
        return { 
          display: 'block', 
          width: '100%', 
          height: 'auto',
          minHeight: '250px',
          maxWidth: '300px'
        };
      case 'footer':
        return { 
          display: 'block', 
          width: '100%', 
          height: 'auto',
          minHeight: '100px',
          maxHeight: '120px'
        };
      case 'article':
      case 'content':
        return { 
          display: 'block', 
          width: '100%', 
          height: 'auto',
          minHeight: '280px',
          maxWidth: '728px',
          margin: '0 auto'
        };
      default:
        return { display: 'block', width: '100%', height: 'auto' };
    }
  };

  // AdSense-konforme Implementierung
  if (siteConfig.googleServices.adsense.enabled) {
    return (
      <div className={`ad-container ${className} my-6`} ref={adRef}>
        <div className="text-xs text-gray-500 text-center mb-2 font-light">
          Anzeige
        </div>
        <div className="flex justify-center">
          <ins
            className="adsbygoogle"
            style={getAdStyle()}
            data-ad-client={siteConfig.googleServices.adsense.publisherId}
            data-ad-slot={getAdSlotId()}
            data-ad-format={responsive ? 'auto' : adFormat}
            data-full-width-responsive={responsive ? 'true' : 'false'}
            data-adtest="off"
          />
        </div>
      </div>
    );
  }

  // Entwicklungs-Platzhalter mit realistischen Dimensionen
  const getPlaceholderContent = () => {
    switch (position) {
      case 'banner':
        return (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-gray-200 rounded-lg p-4 text-center max-w-4xl mx-auto min-h-[90px] flex items-center justify-center">
            <div>
              <div className="text-xs text-gray-400 mb-2">Anzeige</div>
              <div className="text-blue-600 font-medium">Banner Anzeige (728x90)</div>
              <div className="text-xs text-blue-500 mt-1">Responsive Leaderboard</div>
            </div>
          </div>
        );
      case 'sidebar':
        return (
          <div className="bg-gradient-to-b from-purple-50 to-pink-50 border border-gray-200 rounded-lg p-4 text-center w-full max-w-xs min-h-[250px] flex items-center justify-center">
            <div>
              <div className="text-xs text-gray-400 mb-2">Anzeige</div>
              <div className="text-purple-600 font-medium">Sidebar Anzeige</div>
              <div className="text-xs text-purple-500 mt-1">300x250 Medium Rectangle</div>
            </div>
          </div>
        );
      case 'article':
      case 'content':
        return (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-gray-200 rounded-lg p-6 text-center max-w-2xl mx-auto min-h-[280px] flex items-center justify-center">
            <div>
              <div className="text-xs text-gray-400 mb-2">Anzeige</div>
              <div className="text-green-600 font-medium">Content Anzeige</div>
              <div className="text-xs text-green-500 mt-1">Responsive Display Ad</div>
            </div>
          </div>
        );
      case 'footer':
        return (
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-3 text-center max-w-4xl mx-auto min-h-[100px] flex items-center justify-center">
            <div>
              <div className="text-xs text-gray-400 mb-2">Anzeige</div>
              <div className="text-gray-600 font-medium">Footer Anzeige</div>
              <div className="text-xs text-gray-500 mt-1">Responsive Banner</div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-gray-200 rounded p-4 text-center text-sm max-w-md mx-auto min-h-[120px] flex items-center justify-center">
            <div>
              <div className="text-xs text-gray-400 mb-1">Anzeige</div>
              <div className="text-blue-600">Anzeigenplatz - {position}</div>
            </div>
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
