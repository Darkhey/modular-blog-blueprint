
import AdSlot from '@/components/ui/AdSlot';

const HeaderAdSection = () => (
    <section className="py-2 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
            <AdSlot 
                position="header" 
                className="w-full max-w-4xl mx-auto" 
                adFormat="leaderboard"
            />
        </div>
    </section>
);

export default HeaderAdSection;
