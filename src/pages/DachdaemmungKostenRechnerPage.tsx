import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import CalculatorHero from '@/components/calculators/CalculatorHero';
import InsulationCalculator from '@/components/calculators/InsulationCalculator';
import RelatedCalculators from '@/components/shared/RelatedCalculators';
import EnergyAdvisorSearch from '@/components/shared/EnergyAdvisorSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const SITE = 'https://sanierenundsparen.de';
const URL = `${SITE}/dachdaemmung-kosten-rechner`;

const costRows = [
  { label: 'Oberste Geschossdecke (begehbar)', price: '30 – 60 €/m²' },
  { label: 'Zwischensparrendämmung (von innen)', price: '60 – 110 €/m²' },
  { label: 'Aufsparrendämmung inkl. neuer Eindeckung', price: '180 – 300 €/m²' },
  { label: 'Einblasdämmung im Sparrenfeld', price: '35 – 70 €/m²' },
  { label: 'Dampfbremse, Lattung, Verkleidung', price: '25 – 50 €/m²' },
];

const faqs = [
  {
    q: 'Was kostet eine Dachdämmung pro m²?',
    a: 'Die Dämmung der obersten Geschossdecke ist mit 30–60 € pro m² am günstigsten. Eine Zwischensparrendämmung liegt bei 60–110 € pro m², eine Aufsparrendämmung mit neuer Eindeckung bei 180–300 € pro m².',
  },
  {
    q: 'Welche Dachdämmung ist am wirtschaftlichsten?',
    a: 'Wird das Dachgeschoss nicht bewohnt, ist die Dämmung der obersten Geschossdecke die mit Abstand wirtschaftlichste Maßnahme – sie amortisiert sich oft in unter 8 Jahren. Bei ausgebautem Dach ist die Zwischensparrendämmung der beste Kompromiss; eine Aufsparrendämmung lohnt vor allem, wenn das Dach ohnehin neu eingedeckt wird.',
  },
  {
    q: 'Wird die Dachdämmung gefördert?',
    a: 'Ja. Über die BEG-Einzelmaßnahmen gibt es 15 % Zuschuss vom BAFA, mit individuellem Sanierungsfahrplan 20 %. Voraussetzung ist das Erreichen der geforderten U-Werte (Dach ≤ 0,14 W/m²K, oberste Geschossdecke ≤ 0,14 W/m²K).',
  },
  {
    q: 'Wie viel Energie spart eine Dachdämmung?',
    a: 'Über ein ungedämmtes Dach gehen bis zu 30 % der Heizwärme verloren. Eine fachgerechte Dämmung senkt den Heizwärmebedarf typischerweise um 15–25 %, bei sehr schlechtem Ausgangszustand auch mehr.',
  },
];

const DachdaemmungKostenRechnerPage = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Dachdämmung Kosten Rechner',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    url: URL,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    description:
      'Kostenloser Online-Rechner für die Kosten der Dachdämmung inklusive Förderung, U-Wert und Amortisation.',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Rechner & Tools', item: `${SITE}/rechner` },
      { '@type': 'ListItem', position: 3, name: 'Dachdämmung Kosten Rechner', item: URL },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dachdämmung Kosten Rechner 2026 – Preis pro m² & Förderung</title>
        <meta
          name="description"
          content="Kosten der Dachdämmung berechnen: Zwischensparren, Aufsparren und oberste Geschossdecke inkl. BAFA-Förderung und Einsparung."
        />
        <link rel="canonical" href={URL} />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content="Dachdämmung Kosten Rechner 2026 – Preis pro m² & Förderung" />
        <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <CalculatorHero
        icon={Layers}
        title="Dachdämmung Kosten Rechner"
        subtitle="Zwischensparren, Aufsparren oder oberste Geschossdecke? Berechnen Sie Kosten pro m², U-Wert, Förderung und Amortisation Ihrer Dachdämmung."
        gradient="from-amber-500 to-orange-500"
        breadcrumbs={[{ label: 'Rechner', to: '/rechner' }, { label: 'Dachdämmung Kosten Rechner' }]}
      />

      <main id="rechner" tabIndex={-1} className="scroll-mt-24">
        <div className="container max-w-3xl mx-auto px-4 py-8">
          <InsulationCalculator />

          <Card className="mt-8 glass border-amber-200/50">
            <CardHeader>
              <CardTitle className="text-lg">Dachdämmung Kosten pro m² – Richtwerte 2026</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border text-sm">
                {costRows.map((row) => (
                  <li key={row.label} className="flex justify-between gap-4 py-2">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-semibold whitespace-nowrap">{row.price}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-4">
                Richtwerte inkl. Handwerkerleistung für Einfamilienhäuser. Gerüst, Dachfenster und
                Entsorgung alter Dämmung sind gesondert zu kalkulieren.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6 glass">
            <CardHeader>
              <CardTitle className="text-lg">So kalkulieren Sie Ihre Dachdämmung</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm">
                {[
                  'Dachfläche bzw. Fläche der obersten Geschossdecke bestimmen.',
                  'Dämmvariante wählen – ausgebautes Dach oder ungenutzter Spitzboden.',
                  'Dämmstärke für U-Wert ≤ 0,14 W/m²K festlegen (meist 20–24 cm).',
                  'BAFA-Förderung (15 %, mit iSFP 20 %) abziehen und Einsparung gegenrechnen.',
                ].map((step) => (
                  <li key={step} className="flex gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <section className="mt-8" aria-labelledby="dach-faq">
            <h2 id="dach-faq" className="text-xl font-bold mb-4">
              Häufige Fragen zur Dachdämmung
            </h2>
            <Accordion type="single" collapsible className="glass rounded-xl px-4">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <p className="mt-8 text-sm text-muted-foreground">
            Weiterlesen:{' '}
            <Link to="/dachausbau" className="text-primary hover:underline font-medium">
              Dachausbau planen
            </Link>{' '}
            oder{' '}
            <Link to="/kostenrechner" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
              Gesamtkosten der Sanierung berechnen <ArrowRight className="w-3 h-3" />
            </Link>
          </p>
        </div>

        <RelatedCalculators topics={['daemmung', 'dach', 'foerderung']} excludeIds={['daemmungsrechner']} />

        <div className="container max-w-4xl mx-auto px-4 py-12">
          <EnergyAdvisorSearch />
        </div>
      </main>
    </div>
  );
};

export default DachdaemmungKostenRechnerPage;
