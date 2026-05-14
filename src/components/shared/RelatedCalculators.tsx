import { Link } from 'react-router-dom';
import { ArrowRight, Calculator } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getRelatedCalculators } from '@/data/calculatorsCatalog';

interface RelatedCalculatorsProps {
  topics: string[];
  excludeIds?: string[];
  title?: string;
  className?: string;
}

const RelatedCalculators = ({
  topics,
  excludeIds = [],
  title = 'Passende Rechner zu diesem Thema',
  className = '',
}: RelatedCalculatorsProps) => {
  const items = getRelatedCalculators(topics, excludeIds, 3);
  if (items.length === 0) return null;

  return (
    <section className={`py-12 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          </div>
          <Link
            to="/rechner"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
          >
            Alle Rechner ansehen <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((entry) => {
            const Icon = entry.icon;
            return (
              <Card
                key={entry.id}
                className="group glass border-border hover:shadow-glow hover:-translate-y-1 transition-all"
              >
                <Link to={entry.route} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
                  <div className={`h-1 bg-gradient-to-r ${entry.gradient}`} />
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${entry.gradient} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">{entry.badge}</Badge>
                    </div>
                    <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{entry.description}</p>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedCalculators;
