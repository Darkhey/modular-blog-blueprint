import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, TrendingUp } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import sanierungsfahrplanImg from '@/assets/sanierungsfahrplan-hero.jpg';

const FeaturedArticleHero = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-12 bg-muted/30">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-5 h-5 text-primary fill-primary" />
          <span className="text-sm font-bold uppercase tracking-wider text-primary">
            Empfohlener Artikel
          </span>
        </div>

        <Link
          to="/blog/sanierungsfahrplan-2025-optimale-reihenfolge"
          className={`group block hover:no-underline ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="glass rounded-2xl overflow-hidden hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-64 md:h-full min-h-[280px] overflow-hidden">
                <img
                  src={sanierungsfahrplanImg}
                  alt="Sanierungsfahrplan 2025 – Modernes energieeffizientes Haus"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r" />
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold uppercase px-3 py-1 rounded-full">
                  Sanierung planen
                </span>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                  Der optimale Sanierungsfahrplan 2025: In 5 Schritten zum energieeffizienten Haus
                </h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Welche Sanierungsmaßnahme zuerst? Die richtige Reihenfolge spart bis zu 30 % Kosten. 
                  Unser Fahrplan zeigt den wirtschaftlich optimalen Weg – von der Gebäudehülle bis zur Heiztechnik.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-5 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> 15 Min. Lesezeit
                  </span>
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-primary" /> Bis zu 70 % Einsparung
                  </span>
                </div>

                <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:underline">
                  Jetzt den Fahrplan lesen <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedArticleHero;
