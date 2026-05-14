import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calculator } from 'lucide-react';
import { calculatorsCatalog, calculatorCategories } from '@/data/calculatorsCatalog';

const InteractiveTools = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <Calculator className="w-7 h-7 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Interaktive Rechner & Tools</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {calculatorsCatalog.length} Rechner und Planungstools – kostenlos, ohne Anmeldung,
          DSGVO-konform.
        </p>
      </div>

      {calculatorCategories.map((cat) => {
        const items = calculatorsCatalog.filter((c) => c.category === cat.id);
        if (items.length === 0) return null;
        return (
          <section key={cat.id}>
            <div className="mb-3">
              <h3 className="text-xl font-bold text-foreground">{cat.label}</h3>
              <p className="text-sm text-muted-foreground">{cat.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((entry) => {
                const Icon = entry.icon;
                return (
                  <Card
                    key={entry.id}
                    className="group glass border-border hover:shadow-glow hover:-translate-y-0.5 transition-all overflow-hidden"
                  >
                    <Link to={entry.route} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      <div className={`h-1 bg-gradient-to-r ${entry.gradient}`} />
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${entry.gradient} flex items-center justify-center shadow-sm`}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <Badge variant="secondary" className="text-xs">{entry.badge}</Badge>
                        </div>
                        <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {entry.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{entry.description}</p>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                          Tool öffnen <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default InteractiveTools;
