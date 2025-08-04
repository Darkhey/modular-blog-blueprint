import AdSenseDisplay from './AdSenseDisplay';

interface SidebarAdProps {
  className?: string;
}

export default function SidebarAd({ className = '' }: SidebarAdProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="text-xs text-muted-foreground mb-2 text-center">Anzeige</div>
      <AdSenseDisplay
        adSlot="0987654321" // Replace with actual ad slot
        adFormat="rectangle"
        adStyle={{
          display: 'block',
          width: '300px',
          height: '250px'
        }}
        className="mx-auto"
      />
    </div>
  );
}