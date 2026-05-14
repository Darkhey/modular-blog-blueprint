
import { Helmet } from 'react-helmet-async';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';
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
import EnergyAdvisorSearch from '@/components/shared/EnergyAdvisorSearch';
import RelatedCalculators from '@/components/shared/RelatedCalculators';

const HeizungModernisierenPage = () => {
  return (
    <>
      <Helmet>
        <title>Heizung modernisieren 2025 – Bis zu 70% Förderung</title>
        <meta name="description" content="Heizung modernisieren mit Smart-Home-Integration. Bis zu 40% Energiekosten sparen, 70% BAFA-Förderung. Alle Heizsysteme & Smart Thermostate für 2025." />
        <meta name="keywords" content="Heizung modernisieren, Smart Home, Wärmepumpe, Smart Thermostat, BAFA Förderung, Energiekosten sparen" />
        <link rel="canonical" href="https://sanieren-sparen.de/heizung-modernisieren" />
        <meta property="og:title" content="Heizung modernisieren 2025 – Bis zu 70% Förderung" />
        <meta property="og:description" content="Smart-Home-Integration, Wärmepumpen und BAFA-Förderung im Überblick." />
        <meta property="og:url" content="https://sanieren-sparen.de/heizung-modernisieren" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'Welche Förderungen gibt es 2025 für Smart Home Heizungen?', acceptedAnswer: { '@type': 'Answer', text: 'Die BAFA fördert die Heizung selbst (bis zu 70%) sowie digitale Systemtechnik. Smart-Home-Komponenten zur Effizienzsteigerung sind förderfähig. Zusätzlich KfW-Programme und 20% Klimageschwindigkeits-Bonus.' } },
            { '@type': 'Question', name: 'Wie viel kann ich durch Smart Home Systeme zusätzlich sparen?', acceptedAnswer: { '@type': 'Answer', text: 'Smart-Home-Systeme sparen 15–30% Energie. Smart Thermostate ca. 15%, vollständige Automation bis 30%. Mit Wärmepumpe sind Gesamteinsparungen über 50% möglich.' } },
            { '@type': 'Question', name: 'Sind Smart Home Heizungen sicher und datenschutzkonform?', acceptedAnswer: { '@type': 'Answer', text: 'Moderne Systeme nutzen verschlüsselte Verbindungen und arbeiten oft lokal ohne Cloud-Zwang. Deutsche Hersteller bieten DSGVO-konforme Lösungen.' } },
            { '@type': 'Question', name: 'Kann ich Smart Home Systeme nachträglich zu meiner Heizung hinzufügen?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, fast alle modernen Heizungen sind Smart-Home-nachrüstbar. Smart Thermostate funktionieren mit allen Heizkörpern.' } },
            { '@type': 'Question', name: 'Was kostet ein komplettes Smart Home Heizsystem?', acceptedAnswer: { '@type': 'Answer', text: 'Smart-Home-Integration kostet 1.000–3.000 € zusätzlich zur Heizung. Amortisation meist nach 3–5 Jahren.' } },
          ],
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto space-y-12">
          <div className="pt-4">
            <BreadcrumbNavigation 
              items={[
                { label: 'Ratgeber', href: '/wissenswertes' },
                { label: 'Heizung modernisieren' }
              ]} 
            />
          </div>
          <HeizungHeroSection />
          <HeizungBenefitsSection />
          <SmartHomeSystemsSection />
          <HeatingComparisonSection />
          <ProductRecommendationsSection />
          <OptimizationTipsSection />
          <CalculatorSection />
          <ProcessTimelineSection />
          <HeizungFAQSection />
          <RelatedCalculators topics={['heizung', 'waermepumpe', 'modernisierung', 'gas']} excludeIds={['heizkostenrechner']} />
          <EnergyAdvisorSearch />
          <HeizungCTASection />
        </div>
      </div>
    </>
  );
};

export default HeizungModernisierenPage;
