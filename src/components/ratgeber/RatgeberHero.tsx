
import { type LucideIcon } from 'lucide-react';

interface RatgeberHeroProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  backgroundImage?: string;
}

const RatgeberHero = ({ title, subtitle, icon: Icon, backgroundImage }: RatgeberHeroProps) => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {backgroundImage ? (
        <>
          <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-background/40" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent to-secondary" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.15),transparent_60%)]" />
        </>
      )}
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 backdrop-blur-sm mb-6">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">{title}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </section>
  );
};

export default RatgeberHero;
