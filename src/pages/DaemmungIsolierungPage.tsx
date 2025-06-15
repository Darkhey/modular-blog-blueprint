
import { Helmet } from 'react-helmet-async';
import DaemmungHeroSection from '@/components/daemmung/DaemmungHeroSection';
import DaemmungBenefitsSection from '@/components/daemmung/DaemmungBenefitsSection';
import DaemmungMaterialsSection from '@/components/daemmung/DaemmungMaterialsSection';
import DaemmungAreasSection from '@/components/daemmung/DaemmungAreasSection';
import DaemmungCalculatorSection from '@/components/daemmung/DaemmungCalculatorSection';
import DaemmungCostsSection from '@/components/daemmung/DaemmungCostsSection';
import DaemmungFundingSection from '@/components/daemmung/DaemmungFundingSection';
import DaemmungTipsSection from '@/components/daemmung/DaemmungTipsSection';
import DaemmungFAQSection from '@/components/daemmung/DaemmungFAQSection';
import DaemmungCTASection from '@/components/daemmung/DaemmungCTASection';

const DaemmungIsolierungPage = () => {
  return (
    <>
      <Helmet>
        <title>Dämmung & Isolierung 2025 | Bis zu 50% Heizkosten sparen | Alle Materialien im Vergleich</title>
        <meta name="description" content="Professionelle Dämmung für Dach, Fassade & Keller. Bis zu 50% Heizkosten sparen ✓ Alle Materialien im Vergleich ✓ Förderung bis 40% ✓ Kostenloser Rechner" />
        <meta name="keywords" content="Dämmung, Isolierung, Dach dämmen, Fassadendämmung, Kellerdämmung, Wärmedämmung, Heizkosten sparen, Dämmstoffe, WDVS, Energieberatung" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <DaemmungHeroSection />
        <DaemmungBenefitsSection />
        <DaemmungMaterialsSection />
        <DaemmungAreasSection />
        <DaemmungCalculatorSection />
        <DaemmungCostsSection />
        <DaemmungFundingSection />
        <DaemmungTipsSection />
        <DaemmungFAQSection />
        <DaemmungCTASection />
      </div>
    </>
  );
};

export default DaemmungIsolierungPage;
