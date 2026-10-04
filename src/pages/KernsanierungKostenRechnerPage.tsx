import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Hammer, ArrowRight } from 'lucide-react';
import CalculatorHero from '@/components/calculators/CalculatorHero';
import RelatedCalculators from '@/components/shared/RelatedCalculators';
import EnergyAdvisorSearch from '@/components/shared/EnergyAdvisorSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const SITE = 'https://sanierenundsparen.de';
const URL = `${SITE}/kernsanierung-kosten-rechner`;

const STANDARDS = {
  einfach: { label: 'Einfach', min: 700, max: 1000, hint: 'Funktionale Ausstattung, Eigenleistung möglich' },
  standard: { label: 'Standard', min: 1000, max: 1500, hint: 'Solide Markenprodukte, energetisch auf aktuellem Stand' },
  gehoben: { label: 'Gehoben', min: 1500, max: 2200, hint: 'Hochwertige Materialien, Effizienzhaus-Niveau' },
} as const;
type StandardKey = keyof typeof STANDARDS;

// Typische Kostenanteile einer Kernsanierung (Richtwerte, gerundet)
const SHARES = [
  { label: 'Rückbau & Entsorgung', share: 0.08 },
  { label: 'Dach & Fassade (inkl. Dämmung)', share: 0.22 },
  { label: 'Fenster & Türen', share: 0.1 },
  { label: 'Heizung & Sanitär', share: 0.2 },
  { label: 'Elektrik', share: 0.1 },
  { label: 'Innenausbau (Böden, Wände, Decken)', share: 0.22 },
  { label: 'Planung & Baunebenkosten', share: 0.08 },
];

const faqs = [
  {
    q: 'Was kostet eine Kernsanierung pro m²?',
    a: 'Als Richtwert für Einfamilienhäuser gelten etwa 700–1.000 € pro m² Wohnfläche bei einfacher Ausstattung, 1.000–1.500 € bei Standard und 1.500–2.200 € bei gehobener Ausstattung. Regionale Handwerkerpreise und der Zustand der Bausubstanz können deutlich abweichen.',
  },
  {
    q: 'Was kostet die Kernsanierung eines Einfamilienhauses mit 120 m²?',
    a: 'Bei Standard-Ausstattung liegen die Kosten grob zwischen 120.000 und 180.000 €. Eine verbindliche Zahl liefert nur ein Angebot nach Besichtigung.',
  },
  {
    q: 'Gibt es Förderung für eine Kernsanierung?',
    a: 'Ja. Wird das Haus zum Effizienzhaus saniert, ist ein KfW-Kredit mit Tilgungszuschuss möglich (Programm 261). Einzelmaßnahmen wie Dämmung, Fenster oder Heizung werden über BAFA bzw. KfW bezuschusst. Zusätzlich gibt es Landesprogramme je nach Bundesland.',
  },
  {
    q: 'Wann lohnt sich eine Kernsanierung gegenüber einem Neubau?',
    a: 'Meist dann, wenn Tragwerk und Keller in gutem Zustand sind. Liegen die Sanierungskosten über etwa 70–80 % eines vergleichbaren Neubaus, sollte ein Abriss mit Neubau geprüft werden.',
  },
];

const eur = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 }) + ' €';

const KernsanierungKostenRechnerPage = () => {
  const [flaeche, setFlaeche] = useState(120);
  const [standard, setStandard] = useState<StandardKey>('standard');

  const result = useMemo(() => {
    const s = STANDARDS[standard];
    const a = Math.max(0, Math.min(flaeche || 0, 2000));
    return { min: a * s.min, max: a * s.max, mid: (a * (s.min + s.max)) / 2 };
  }, [flaeche, standard]);

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Kernsanierung Kosten Rechner',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: URL,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Rechner & Tools', item: `${SITE}/rechner` },
        { '@type': 'ListItem', position: 3, name: 'Kernsanierung Kosten Rechner', item: URL },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Kernsanierung Rechner 2026 – Kosten pro m² kostenlos berechnen</title>
        <meta
          name="description"
          content="Kernsanierung Rechner: Kosten pro m² für einfach, Standard oder gehoben berechnen – mit Kostenaufteilung nach Gewerken und möglicher Förderung. Kostenlos online."
        />
        <link rel="canonical" href={URL} />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kernsanierung Rechner 2026 – Kosten pro m² kostenlos berechnen" />
        <meta property="og:description" content="Kernsanierung Kosten pro m² berechnen: Ausstattung wählen, Kostenspanne pro Gewerk sehen, Förderung prüfen – kostenlos online." />
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
        ))}
      </Helmet>

      <CalculatorHero
        icon={Hammer}
        title="Kernsanierung Kosten Rechner"
        subtitle="Wohnfläche und Ausstattung wählen – Sie sehen sofort die Kostenspanne Ihrer Kernsanierung und wie sie sich auf die Gewerke verteilt."
        gradient="from-emerald-500 to-teal-500"
        breadcrumbs={[{ label: 'Rechner', to: '/rechner' }, { label: 'Kernsanierung Kosten Rechner' }]}
      />

      <main id="rechner" tabIndex={-1} className="scroll-mt-24">
        <div className="container max-w-3xl mx-auto px-4 py-8 space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Ihre Angaben</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="flaeche">Wohnfläche in m²</Label>
                <Input
                  id="flaeche"
                  type="number"
                  inputMode="numeric"
                  min={20}
                  max={2000}
                  value={flaeche}
                  onChange={(e) => setFlaeche(Number(e.target.value))}
                  className="h-11"
                />
              </div>
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium mb-2">Ausstattung</legend>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(Object.keys(STANDARDS) as StandardKey[]).map((key) => {
                    const s = STANDARDS[key];
                    const active = key === standard;
                    return (
                      <button
                        key={key}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setStandard(key)}
                        className={`min-h-11 rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          active ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted'
                        }`}
                      >
                        <span className="block font-semibold text-sm">{s.label}</span>
                        <span className="block text-xs text-muted-foreground">
                          {s.min.toLocaleString('de-DE')}–{s.max.toLocaleString('de-DE')} €/m²
                        </span>
                        <span className="block text-xs text-muted-foreground mt-1">{s.hint}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </CardContent>
          </Card>

          <Card className="glass border-primary/30" aria-live="polite">
            <CardHeader>
              <CardTitle className="text-lg">Geschätzte Kosten der Kernsanierung</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                {eur(result.min)} – {eur(result.max)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Mittelwert ca. {eur(result.mid)}, vor Förderung</p>
              <ul className="divide-y divide-border text-sm mt-5">
                {SHARES.map((row) => (
                  <li key={row.label} className="flex justify-between gap-4 py-2">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-semibold whitespace-nowrap">ca. {eur(result.mid * row.share)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-4">
                Richtwerte für Einfamilienhäuser 2026 inkl. Handwerkerleistung. Statik, Schadstoffsanierung
                (z. B. Asbest) und Außenanlagen sind nicht enthalten.
              </p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="pt-6 text-sm space-y-2">
              <p>
                Genauer rechnen? Im{' '}
                <Link to="/kostenrechner" className="text-primary hover:underline font-medium">
                  Sanierungskosten Rechner
                </Link>{' '}
                kalkulieren Sie jedes Gewerk einzeln. Was Sie an Zuschüssen bekommen, zeigt der{' '}
                <Link to="/foerderrechner" className="text-primary hover:underline font-medium">
                  Förderrechner
                </Link>
                , Landesprogramme finden Sie auf der{' '}
                <Link to="/foerdermittel/regional" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                  regionalen Förderkarte <ArrowRight className="w-3 h-3" />
                </Link>
              </p>
            </CardContent>
          </Card>

          <section aria-labelledby="kern-faq">
            <h2 id="kern-faq" className="text-xl font-bold mb-4">Häufige Fragen zur Kernsanierung</h2>
            <Accordion type="single" collapsible className="glass rounded-xl px-4">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        <RelatedCalculators topics={['kosten', 'daemmung', 'heizung', 'foerderung']} excludeIds={['kernsanierung']} />

        <div className="container max-w-4xl mx-auto px-4 py-12">
          <EnergyAdvisorSearch />
        </div>
      </main>
    </div>
  );
};

export default KernsanierungKostenRechnerPage;
