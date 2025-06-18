
import { Helmet } from 'react-helmet-async';
import HeizungHeroSection from '@/components/heizung-modernisieren/HeizungHeroSection';
import HeizungBenefitsSection from '@/components/heizung-modernisieren/HeizungBenefitsSection';
import SmartHomeSystemsSection from '@/components/heizung-modernisieren/SmartHomeSystemsSection';
import HeatingComparisonSection from '@/components/heizung-modernisieren/HeatingComparisonSection';
import ProductRecommendationsSection from '@/components/heizung-modernisieren/ProductRecommendationsSection';
import OptimizationTipsSection from '@/components/heizung-modernisieren/OptimizationTipsSection';
import CalculatorSection from '@/components/heizung-modernisieren/CalculatorSection';
import ProcessTimelineSection from '@/components/heizung-modernisieren/ProcessTimelineSection';
import HeizungFAQSection from '@/components/heizung-modernisieren/HeizungFAQSection';
import HeizungCTASection from '@/components/heizung-modernisieren/HeizungCTASection';

const HeizungModernisierenPage = () => {
  return (
    <>
      <Helmet>
        <title>Heizung modernisieren 2025 | Smart Home Integration | Bis zu 70% Förderung</title>
        <meta name="description" content="Heizung modernisieren mit Smart Home Integration. Bis zu 40% Energiekosten sparen, 70% BAFA Förderung. Alle Heizsysteme, Smart Thermostate und digitale Steuerung für 2025." />
        <meta name="keywords" content="Heizung modernisieren, Smart Home, Wärmepumpe, Smart Thermostat, BAFA Förderung, Energiekosten sparen, Heizungsmodernisierung, digitale Heizungssteuerung" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto space-y-12">
          <HeizungHeroSection />
          <HeizungBenefitsSection />
          <SmartHomeSystemsSection />
          <HeatingComparisonSection />
          <ProductRecommendationsSection />
          <OptimizationTipsSection />
          <CalculatorSection />
          <ProcessTimelineSection />
          <HeizungFAQSection />
          <HeizungCTASection />
        </div>
      </div>
    </>
  );
};

export default HeizungModernisierenPage;
