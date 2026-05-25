import { Helmet } from 'react-helmet-async';
import ModernizationSavingsCalculator from '@/components/calculators/ModernizationSavingsCalculator';
import { Flame } from 'lucide-react';
import CalculatorHero from '@/components/calculators/CalculatorHero';
import CalculatorFaqSection from '@/components/shared/CalculatorFaqSection';
import CalculatorHowToSection from '@/components/shared/CalculatorHowToSection';

const SITE = 'https://sanieren-sparen.de';

const HeizkostenrechnerPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Heizkostenrechner 2026 – Sparpotenzial kostenlos berechnen</title>
        <meta name="description" content="Berechnen Sie kostenlos Ihr Heizkosten-Sparpotenzial nach Modernisierung: Wärmepumpe, Hybrid, Smart Home – mit aktueller BAFA-Förderung 2026." />
        <link rel="canonical" href={`${SITE}/heizkostenrechner`} />
      </Helmet>

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

      <main id="rechner" className="container mx-auto px-4 py-8 scroll-mt-24">
        <ModernizationSavingsCalculator />

        <CalculatorHowToSection howToKey="heizkostenrechner" url="https://sanieren-sparen.de/heizkostenrechner" />

        <CalculatorFaqSection
          faqKey="heizkostenrechner"
          calculatorType="heating"
          title="Heizkostenrechner 2026 – Sparpotenzial berechnen"
          description="Kostenloser Online-Heizkostenrechner mit Modernisierungsvergleich, BAFA-Förderung und Smart-Home-Effekt."
          breadcrumbs={[
            { name: 'Start', url: `${SITE}/` },
            { name: 'Rechner & Tools', url: `${SITE}/rechner` },
            { name: 'Heizkostenrechner', url: `${SITE}/heizkostenrechner` },
          ]}
        />
      </main>
    </div>
  );
};

export default HeizkostenrechnerPage;

