import AdSenseDisplay from './AdSenseDisplay';

interface NativeAdProps {
  className?: string;
  title?: string;
}

export default function NativeAd({ className = '', title = 'Empfohlene Inhalte' }: NativeAdProps) {
  return (
    <div className={`border border-border rounded-lg p-4 bg-card ${className}`}>
      <h3 className="text-sm font-medium text-muted-foreground mb-3">{title}</h3>
      <AdSenseDisplay
        adSlot="5678901234" // Replace with actual ad slot
        adFormat="auto"
        adStyle={{
          display: 'block'
        }}
        className="w-full"
      />
    </div>
  );
}