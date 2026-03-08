
import BlogStats from '@/components/blog/BlogStats';
import { useInView } from '@/hooks/useInView';

const StatsSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-3xl font-bold text-foreground text-center mb-10 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
          Auf uns können Sie bauen
        </h2>
        <div className="max-w-5xl mx-auto">
          <BlogStats />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
