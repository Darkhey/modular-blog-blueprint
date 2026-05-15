import { Helmet } from 'react-helmet-async';

interface CalculatorStructuredDataProps {
  calculatorType: 'heating' | 'insulation' | 'solar' | 'foerder' | 'roi' | 'energie-check' | 'kosten' | 'vergleich' | 'sanierungscheck';
  title: string;
  description: string;
  path?: string;
  faq?: { question: string; answer: string }[];
}

const ROUTE_MAP: Record<string, string> = {
  heating: 'heizkostenrechner',
  insulation: 'daemmungsrechner',
  solar: 'solarenergie',
  foerder: 'foerderrechner',
  roi: 'roi-rechner',
  'energie-check': 'energie-check',
  kosten: 'kostenrechner',
  vergleich: 'rechner-vergleich',
  sanierungscheck: 'sanierungscheck',
};

const CalculatorStructuredData = ({ calculatorType, title, description, path, faq }: CalculatorStructuredDataProps) => {
  const slug = path ?? ROUTE_MAP[calculatorType] ?? '';
  const url = `https://sanieren-sparen.de/${slug}`;

  const webApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description,
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: 'Calculator',
    operatingSystem: 'All',
    url,
    provider: {
      '@type': 'Organization',
      name: 'Sanieren & Sparen',
      url: 'https://sanieren-sparen.de',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: 'Kostenloser Online-Rechner',
    },
    featureList: [
      'Kostenlose Berechnung',
      'Sofortige Ergebnisse',
      'Keine Anmeldung erforderlich',
      'DSGVO-konform',
    ],
  };

  const faqSchema = faq && faq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null;

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(webApp)}</script>
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
    </Helmet>
  );
};

export default CalculatorStructuredData;