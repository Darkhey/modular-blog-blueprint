
import AdSlot from '@/components/ui/AdSlot';

const ContentAdSection = () => (
    <section className="py-6">
        <div className="max-w-4xl mx-auto px-4">
            <AdSlot 
                position="content" 
                className="w-full" 
                adFormat="auto"
                responsive={true}
            />
        </div>
    </section>
);

export default ContentAdSection;
