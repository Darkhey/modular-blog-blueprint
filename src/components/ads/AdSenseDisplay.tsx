import { useEffect, useRef } from 'react';
import { siteConfig } from '@/config/site.config';
import { useAdvertisingConsent } from '@/hooks/useAdvertisingConsent';

interface AdSenseDisplayProps {
  /** Echte AdSense-Anzeigenblock-ID. Leer = nichts rendern. */
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid';
  adLayout?: string;
  /** Reservierte Mindesthöhe gegen Layout-Springen */
  minHeight?: number;
  className?: string;
}

/**
 * Dezente, eingebettete Anzeige: kleines „Anzeige"-Label, reservierte Höhe,
 * blendet sich automatisch aus, wenn Google nichts ausliefert.
 */
export default function AdSenseDisplay({
  adSlot,
  adFormat = 'auto',
  adLayout,
  minHeight = 120,
  className = '',
}: AdSenseDisplayProps) {
  const pushed = useRef(false);
  const advertisingConsent = useAdvertisingConsent();
  const enabled =
    siteConfig.adsEnabled &&
    siteConfig.googleServices.adsense.enabled &&
    advertisingConsent &&
    /^\d{6,}$/.test(adSlot);

  useEffect(() => {
    if (!enabled || pushed.current) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      pushed.current = true;
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [enabled]);

  if (!enabled) return null;

  return (
    <aside aria-label="Anzeige" className={`ad-slot not-prose ${className}`}>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground text-center mb-1.5">
        Anzeige
      </div>
      <ins
        className="adsbygoogle block rounded-xl overflow-hidden"
        style={{ display: 'block', minHeight }}
        data-ad-client={siteConfig.googleServices.adsense.publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        {...(adLayout ? { 'data-ad-layout': adLayout } : {})}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
