import { Link } from 'react-router-dom';
import { ArrowRight, Calculator } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useInView } from '@/hooks/useInView';
import { calculatorsCatalog } from '@/data/calculatorsCatalog';

// Curated featured set – 6 of the strongest tools
const FEATURED_IDS = [
  'heizkostenrechner',
  'daemmungsrechner',
  'solarrechner',
  'kostenrechner',
  'rechner-vergleich',
  'foerderrechner',
];

const CalculatorsBentoSection = () => {
  const { ref, isInView } = useInView();
  const featured = FEATURED_IDS
    .map((id) => calculatorsCatalog.find((c) => c.id === id)!)
    .filter(Boolean);

  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <Calculator className="w-7 h-7 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Kostenlose Sanierungsrechner</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Heizung, Dämmung, Solar, Förderung – alle Rechner sofort und ohne Anmeldung nutzen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((entry, i) => {
            const Icon = entry.icon;
            return (
              <Card
                key={entry.id}
                className={`group glass border-border hover:shadow-glow hover:-translate-y-1 transition-all overflow-hidden ${
                  isInView ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <Link
                  to={entry.route}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${entry.gradient}`} />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${entry.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">{entry.badge}</Badge>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{entry.description}</p>
                    <div className="flex items-center justify-between">
                      {entry.highlight && (
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          {entry.highlight}
                        </span>
                      )}
                      <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 gap-1 transition-all ml-auto">
                        Öffnen <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/rechner"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            Alle {calculatorsCatalog.length} Rechner & Tools ansehen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CalculatorsBentoSection;
