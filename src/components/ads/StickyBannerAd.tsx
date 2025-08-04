import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdSenseDisplay from './AdSenseDisplay';

interface StickyBannerAdProps {
  position?: 'top' | 'bottom';
}

export default function StickyBannerAd({ position = 'bottom' }: StickyBannerAdProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || !isSticky) {
    return null;
  }

  return (
    <div className={`fixed ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 z-40 bg-background border-t shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex-1 flex justify-center">
          <AdSenseDisplay
            adSlot="1357924680" // Replace with actual ad slot
            adFormat="horizontal"
            adStyle={{
              display: 'inline-block',
              width: '728px',
              height: '90px'
            }}
            className="hidden md:block"
          />
          <AdSenseDisplay
            adSlot="2468013579" // Replace with actual ad slot  
            adFormat="horizontal"
            adStyle={{
              display: 'inline-block',
              width: '320px',
              height: '50px'
            }}
            className="md:hidden"
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="ml-2"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}