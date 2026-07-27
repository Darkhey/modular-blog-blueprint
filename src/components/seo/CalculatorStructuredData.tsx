import { Helmet } from 'react-helmet-async';

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface CalculatorStructuredDataProps {
  calculatorType:
    | 'heating'
    | 'insulation'
    | 'solar'
    | 'foerder'
    | 'roi'
    | 'energie-check'
    | 'kosten'
    | 'vergleich'
    | 'sanierungscheck';
  title: string;
  description: string;
  path?: string;
  faq?: { question: string; answer: string }[];
  breadcrumbs?: BreadcrumbItem[];
}

const SITE = 'https://sanierenundsparen.de';

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

const CalculatorStructuredData = ({
  calculatorType,
  title,
  description,
  path,
  faq,
  breadcrumbs,
}: CalculatorStructuredDataProps) => {
  const slug = path ?? ROUTE_MAP[calculatorType] ?? '';
  const url = `${SITE}/${slug}`;

  const webApp = {
    '@context': 'https://schema.org',
    '@type': ['WebApplication', 'SoftwareApplication'],
    name: title,
    description,
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: 'Calculator',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    url,
    inLanguage: 'de-DE',
    isAccessibleForFree: true,
    provider: {
      '@type': 'Organization',
      name: 'Sanieren & Sparen',
      url: SITE,
      logo: `${SITE}/favicon.svg`,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
    featureList: [
      'Kostenlose Berechnung',
      'Sofortige Ergebnisse',
      'Keine Anmeldung erforderlich',
      'DSGVO-konform',
      'Aktuelle Förderprogramme 2026',
    ],
  };

  const faqSchema =
    faq && faq.length > 0
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

  const crumbs: BreadcrumbItem[] =
    breadcrumbs ?? [
      { name: 'Start', url: SITE + '/' },
      { name: 'Rechner & Tools', url: SITE + '/rechner' },
      { name: title, url },
    ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.url ? { item: c.url } : {}),
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(webApp)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
    </Helmet>
  );
};

export default CalculatorStructuredData;
