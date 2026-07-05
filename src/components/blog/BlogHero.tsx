import { Sparkles } from 'lucide-react';

const BlogHero = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full glass border border-primary/20">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Ratgeber & Wissen
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
        Ratgeber & <span className="gradient-text">Blog</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
        Praktische Tipps und fundiertes Wissen für Ihre energetische Sanierung.
        Von der Planung bis zur Umsetzung – wir begleiten Sie auf dem Weg zur Energieeffizienz.
      </p>
    </div>
  );
};

export default BlogHero;
