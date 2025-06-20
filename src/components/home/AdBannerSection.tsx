
import AdSlot from '@/components/ui/AdSlot';

const AdBannerSection = () => (
    <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <AdSlot 
                position="banner" 
                className="w-full" 
                adFormat="auto"
                responsive={true}
            />
        </div>
    </section>
);

export default AdBannerSection;
