import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, CheckCircle2 } from 'lucide-react';
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
const URL = `${SITE}/wdvs-kosten-rechner`;

const costRows = [
  { label: 'EPS (Styropor), 14–16 cm', price: '110 – 150 €/m²' },
  { label: 'Mineralwolle (nicht brennbar), 16 cm', price: '140 – 190 €/m²' },
  { label: 'Holzfaser (ökologisch), 16 cm', price: '170 – 230 €/m²' },
  { label: 'Resol-Hartschaum (schlank), 10 cm', price: '180 – 240 €/m²' },
  { label: 'Gerüst, Zuschnitt, Anschlussarbeiten', price: '25 – 45 €/m²' },
];

const faqs = [
  {
    q: 'Was kostet ein WDVS pro m² im Jahr 2026?',
    a: 'Ein Wärmedämm-Verbundsystem kostet inklusive Montage, Gerüst und Putz üblicherweise 110–190 € pro m² Fassadenfläche. EPS ist am günstigsten, Mineralwolle und Holzfaser liegen darüber. Bei komplexen Fassaden mit vielen Fensterlaibungen kommen 10–20 % Aufschlag hinzu.',
  },
  {
    q: 'Wie viel Förderung gibt es für die Fassadendämmung?',
    a: 'Über die BEG-Einzelmaßnahmen (BAFA) sind 15 % Zuschuss auf die förderfähigen Kosten möglich, mit individuellem Sanierungsfahrplan (iSFP) 20 %. Der Förderdeckel liegt bei 30.000 € pro Wohneinheit, mit iSFP bei 60.000 €.',
  },
  {
    q: 'Welche Dämmstärke ist beim WDVS sinnvoll?',
    a: 'Für das GEG-Anforderungsniveau (U ≤ 0,24 W/m²K) sind je nach Dämmstoff 14–16 cm nötig. Wirtschaftlich sinnvoll sind meist 16–20 cm, weil die Mehrkosten pro zusätzlichem Zentimeter gering sind, der Einspareffekt aber bleibt.',
  },
  {
    q: 'Wann amortisiert sich eine Fassadendämmung?',
    a: 'Bei ungedämmtem Altbau, aktuellen Energiepreisen und 15–20 % Förderung liegt die Amortisation typischerweise bei 12–18 Jahren. Steigende Energie- und CO₂-Preise verkürzen diesen Zeitraum spürbar.',
  },
];

const WdvsKostenRechnerPage = () => {
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
    name: 'WDVS Kosten Rechner',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    url: URL,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    description:
      'Kostenloser Online-Rechner für die Kosten eines Wärmedämm-Verbundsystems inklusive Förderung und Amortisation.',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Rechner & Tools', item: `${SITE}/rechner` },
      { '@type': 'ListItem', position: 3, name: 'WDVS Kosten Rechner', item: URL },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>WDVS Kosten Rechner 2026 – Fassadendämmung Preis pro m² berechnen</title>
        <meta
          name="description"
          content="WDVS-Kosten pro m² berechnen: Materialpreise, Dämmstärke, Förderung und Amortisation der Fassadendämmung – kostenlos online."
        />
        <link rel="canonical" href={URL} />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content="WDVS Kosten Rechner 2026 – Fassadendämmung Preis pro m²" />
        <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <CalculatorHero
        icon={Home}
        title="WDVS Kosten Rechner"
        subtitle="Was kostet ein Wärmedämm-Verbundsystem pro m²? Berechnen Sie Materialkosten, Dämmstärke, Förderung und Amortisation für Ihre Fassade."
        gradient="from-blue-500 to-cyan-500"
        breadcrumbs={[{ label: 'Rechner', to: '/rechner' }, { label: 'WDVS Kosten Rechner' }]}
      />

      <main id="rechner" tabIndex={-1} className="scroll-mt-24">
        <div className="container max-w-3xl mx-auto px-4 py-8">
          <InsulationCalculator />

          <Card className="mt-8 glass border-blue-200/50">
            <CardHeader>
              <CardTitle className="text-lg">WDVS Kosten pro m² – Richtwerte 2026</CardTitle>
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
                Richtwerte inkl. Montage für Einfamilienhäuser. Regionale Unterschiede und
                Fassadengeometrie können die Preise um 10–20 % verschieben.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6 glass">
            <CardHeader>
              <CardTitle className="text-lg">In 4 Schritten zur WDVS-Kostenschätzung</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm">
                {[
                  'Fassadenfläche ermitteln (Umfang × Höhe abzüglich Fenster und Türen).',
                  'Dämmstoff und Dämmstärke wählen – 14–20 cm sind heute Standard.',
                  'Kosten pro m² mit der Fläche multiplizieren und Gerüst einplanen.',
                  'Förderung (15 % BAFA, 20 % mit iSFP) abziehen und Amortisation prüfen.',
                ].map((step) => (
                  <li key={step} className="flex gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <section className="mt-8" aria-labelledby="wdvs-faq">
            <h2 id="wdvs-faq" className="text-xl font-bold mb-4">
              Häufige Fragen zu WDVS-Kosten
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
            Mehr zum Thema:{' '}
            <Link to="/daemmung-isolierung" className="text-primary hover:underline font-medium">
              Dämmung &amp; Isolierung im Überblick
            </Link>{' '}
            oder{' '}
            <Link to="/foerderrechner" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
              Förderung berechnen <ArrowRight className="w-3 h-3" />
            </Link>
          </p>
        </div>

        <RelatedCalculators topics={['daemmung', 'fassade', 'foerderung']} excludeIds={['daemmungsrechner']} />

        <div className="container max-w-4xl mx-auto px-4 py-12">
          <EnergyAdvisorSearch />
        </div>
      </main>
    </div>
  );
};

export default WdvsKostenRechnerPage;
