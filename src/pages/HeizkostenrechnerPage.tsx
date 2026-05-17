
import ModernizationSavingsCalculator from '@/components/calculators/ModernizationSavingsCalculator';
import { Flame } from 'lucide-react';
import CalculatorHero from '@/components/calculators/CalculatorHero';

const HeizkostenrechnerPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <CalculatorHero
        icon={Flame}
        title="Heizkostenrechner"
        subtitle="Berechnen Sie Ihr Sparpotenzial durch Heizungsmodernisierung mit Smart-Home-Integration – kostenlos und sofort."
        gradient="from-red-500 to-orange-500"
        breadcrumbs={[
          { label: 'Rechner', to: '/rechner' },
          { label: 'Heizkostenrechner' },
        ]}
      />

      <main className="container mx-auto px-4 py-8">
        <ModernizationSavingsCalculator />
      </main>
    </div>
  );
};

export default HeizkostenrechnerPage;
