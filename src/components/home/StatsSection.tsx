
import BlogStats from '@/components/blog/BlogStats';

const StatsSection = () => (
    <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8 animate-fade-in">
                Auf uns können Sie bauen
            </h2>
            <div className="max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
                <BlogStats />
            </div>
        </div>
    </section>
);

export default StatsSection;
