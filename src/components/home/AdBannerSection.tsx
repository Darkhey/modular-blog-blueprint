
import AdSlot from '@/components/ui/AdSlot';

const AdBannerSection = () => (
    <section className="py-4 bg-white/80">
        <div className="max-w-7xl mx-auto px-4">
            <AdSlot position="banner" className="w-full" />
        </div>
    </section>
);

export default AdBannerSection;
