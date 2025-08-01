import { Helmet } from 'react-helmet-async';

interface CalculatorStructuredDataProps {
  calculatorType: 'heating' | 'insulation' | 'solar';
  title: string;
  description: string;
}

const CalculatorStructuredData = ({ calculatorType, title, description }: CalculatorStructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "applicationCategory": "FinanceApplication",
    "applicationSubCategory": "Calculator",
    "operatingSystem": "All",
    "permissions": "browserPermissions",
    "url": `https://energieberater-direkt.de/${calculatorType === 'heating' ? 'heizung-modernisieren' : calculatorType === 'insulation' ? 'daemmungsrechner' : 'solarenergie'}`,
    "provider": {
      "@type": "Organization",
      "name": "Energieberater Direkt",
      "url": "https://energieberater-direkt.de"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Kostenloser Online-Rechner"
    },
    "featureList": [
      "Kostenlose Berechnung",
      "Sofortige Ergebnisse",
      "Keine Anmeldung erforderlich",
      calculatorType === 'heating' ? "Smart Home Integration" : "",
      calculatorType === 'insulation' ? "Materialvergleich" : "",
      calculatorType === 'solar' ? "Dachflächenanalyse" : "",
      "Amortisationsberechnung",
      "CO2-Einsparung",
      "Förderungshinweise"
    ].filter(Boolean)
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default CalculatorStructuredData;