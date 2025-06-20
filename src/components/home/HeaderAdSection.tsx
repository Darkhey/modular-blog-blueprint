
import AdSlot from '@/components/ui/AdSlot';

const HeaderAdSection = () => (
    <section className="py-3 bg-gray-50/80 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
            <AdSlot 
                position="header" 
                className="w-full" 
                adFormat="auto"
                responsive={true}
            />
        </div>
    </section>
);

export default HeaderAdSection;
