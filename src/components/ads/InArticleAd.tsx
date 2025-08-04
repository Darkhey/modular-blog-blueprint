import AdSenseDisplay from './AdSenseDisplay';

interface InArticleAdProps {
  className?: string;
}

export default function InArticleAd({ className = '' }: InArticleAdProps) {
  return (
    <div className={`my-8 flex justify-center ${className}`}>
      <AdSenseDisplay
        adSlot="1234567890" // Replace with actual ad slot
        adFormat="auto"
        adStyle={{
          display: 'block'
        }}
        className="max-w-full"
      />
    </div>
  );
}