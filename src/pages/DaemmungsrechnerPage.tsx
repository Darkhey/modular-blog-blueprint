
import InsulationCalculator from '@/components/calculators/InsulationCalculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import InsulationManufacturers from '@/components/manufacturers/InsulationManufacturers';
import { Home, ArrowRight } from 'lucide-react';
import CalculatorHero from '@/components/calculators/CalculatorHero';

const DaemmungsrechnerPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <CalculatorHero
        icon={Home}
        title="Dämmungsrechner"
        subtitle="Berechnen Sie hier die optimale Dämmstoffstärke und das Einsparpotenzial für Ihr Gebäude – kostenlos und sofort."
        gradient="from-blue-500 to-cyan-500"
        breadcrumbs={[
          { label: 'Rechner', to: '/rechner' },
          { label: 'Dämmungsrechner' },
        ]}
      />

      <main>
        <div className="container max-w-3xl mx-auto px-4 py-8">
          {/* Article Hint */}
          <Card className="mb-6 glass border-blue-200/50 animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Dämmstoffe 2025 – Der große Vergleich</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Welcher Dämmstoff passt am besten?{' '}
                <Link to="/blog/daemmstoffe-vergleich-2025" className="text-primary hover:underline font-semibold inline-flex items-center gap-1">
                  Zum Überblicksartikel <ArrowRight className="w-3 h-3" />
                </Link>
              </p>
            </CardContent>
          </Card>
          <InsulationCalculator />
        </div>
        <div className="mt-12">
          <InsulationManufacturers />
        </div>
      </main>
    </div>
  );
};

export default DaemmungsrechnerPage;
