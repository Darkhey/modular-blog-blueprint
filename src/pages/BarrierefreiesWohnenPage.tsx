
import { Helmet } from 'react-helmet-async';
import { Accessibility, DoorOpen, Bath, ChefHat, Stairs, ArrowRight, BadgeEuro } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import CostTable from '@/components/ratgeber/CostTable';
import ChecklistSection from '@/components/ratgeber/ChecklistSection';
import FAQSection from '@/components/ratgeber/FAQSection';

const measures = [
  { icon: Bath, title: 'Badezimmer', desc: 'Bodengleiche Dusche, rutschfeste Fliesen, Haltegriffe, unterfahrbares Waschbecken', cost: '8.000 – 15.000 €' },
  { icon: Stairs, title: 'Treppen & Aufzüge', desc: 'Treppenlift, Rampen, Handläufe beidseitig, Aufzug nachrüsten', cost: '3.000 – 25.000 €' },
  { icon: DoorOpen, title: 'Türen & Schwellen', desc: 'Türverbreiterung auf ≥80 cm, schwellenlose Übergänge, automatische Türöffner', cost: '1.500 – 5.000 €' },
  { icon: ChefHat, title: 'Küche', desc: 'Unterfahrbare Arbeitsflächen, absenkbare Oberschränke, Einhandmischer', cost: '4.000 – 12.000 €' },
];

const costs = [
  { measure: 'Bodengleiche Dusche einbauen', priceRange: '3.500 – 7.000 €', note: 'Inkl. Abdichtung' },
  { measure: 'Treppenlift (gerade)', priceRange: '3.000 – 8.000 €', note: 'Kurventreppenlift teurer' },
  { measure: 'Türverbreiterung (pro Tür)', priceRange: '800 – 2.500 €', note: 'Je nach Wandstärke' },
  { measure: 'Aufzug nachrüsten', priceRange: '15.000 – 40.000 €', note: 'Homelift / Plattformlift' },
  { measure: 'Rampe außen', priceRange: '500 – 3.000 €', note: 'Material- und längenabhängig' },
];

const checklist = [
  { id: 'bf1', label: 'Aktuellen Bedarf und zukünftige Anforderungen analysieren' },
  { id: 'bf2', label: 'Wohnberatung der Kommune oder des Landkreises nutzen (oft kostenlos)' },
  { id: 'bf3', label: 'KfW-Zuschuss 455-B vor Maßnahmenbeginn beantragen' },
  { id: 'bf4', label: 'Pflegekasse kontaktieren (bis 4.000 € Zuschuss bei Pflegegrad)' },
  { id: 'bf5', label: 'Zertifizierten Fachbetrieb für barrierefreies Bauen beauftragen' },
  { id: 'bf6', label: 'Schwellenlose Übergänge in allen Haupträumen prüfen' },
  { id: 'bf7', label: 'Ausreichende Bewegungsflächen (≥150 cm Wendekreis) sicherstellen' },
  { id: 'bf8', label: 'Beleuchtung und Kontraste für Seheingeschränkte optimieren' },
];

const faqs = [
  { question: 'Welche KfW-Förderung gibt es für barrierefreies Wohnen?', answer: 'Die KfW bietet über das Programm 455-B einen Zuschuss von bis zu 6.250 € für Einzelmaßnahmen zur Barrierereduzierung. Für den Standard „Altersgerechtes Haus" sind bis zu 12.500 € möglich. Der Antrag muss vor Beginn der Maßnahme gestellt werden.' },
  { question: 'Zahlt die Pflegekasse einen Zuschuss?', answer: 'Ja, bei vorhandenem Pflegegrad gewährt die Pflegekasse bis zu 4.000 € pro Maßnahme für wohnumfeldverbessernde Maßnahmen. Bei mehreren Pflegebedürftigen im Haushalt sind bis zu 16.000 € möglich.' },
  { question: 'Ab wann lohnt sich ein barrierefreier Umbau?', answer: 'Experten empfehlen, spätestens ab 50 Jahren vorausschauend zu planen. Viele Maßnahmen (schwellenlose Duschen, breitere Türen) steigern auch den Wohnkomfort und den Immobilienwert.' },
  { question: 'Was bedeutet „barrierefrei" vs. „rollstuhlgerecht"?', answer: 'Barrierefrei nach DIN 18040-2 bedeutet stufenlose Zugänge, ausreichend breite Türen (≥80 cm) und Bewegungsflächen. Rollstuhlgerecht erfordert zusätzlich breitere Türen (≥90 cm) und größere Bewegungsflächen (≥150 cm Wendekreis).' },
];

const BarrierefreiesWohnenPage = () => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Barrierefreies Wohnen: Maßnahmen, Kosten & Förderung 2025',
    description: 'Umfassender Ratgeber zu barrierefreiem Umbau – Maßnahmen für Bad, Treppen und Türen mit KfW-Förderung und Kostenübersicht.',
    url: 'https://sanieren-sparen.de/barrierefreies-wohnen',
    publisher: { '@type': 'Organization', name: 'Sanieren & Sparen' },
  };

  return (
    <>
      <Helmet>
        <title>Barrierefreies Wohnen: Maßnahmen, Kosten & Förderung 2025</title>
        <meta name="description" content="Ratgeber barrierefreier Umbau – Maßnahmen für Bad, Treppen, Türen & Küche. KfW-Förderung bis 12.500 €, Pflegekassen-Zuschuss und Checkliste." />
        <link rel="canonical" href="https://sanieren-sparen.de/barrierefreies-wohnen" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <RatgeberHero icon={Accessibility} title="Barrierefreies Wohnen" subtitle="Selbstständig leben in jedem Alter – Maßnahmen, Kosten und Fördermittel" />

      {/* Maßnahmen-Übersicht */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Maßnahmen nach Bereich</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {measures.map((m, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <m.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{m.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{m.desc}</p>
                  <Badge variant="outline" className="gap-1"><BadgeEuro className="w-3 h-3" />{m.cost}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Förder-Highlight */}
      <section className="py-8 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4">
          <div className="rounded-xl border border-primary/20 bg-card p-6">
            <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
              <BadgeEuro className="w-5 h-5 text-primary" /> Förderung auf einen Blick
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>KfW 455-B:</strong> Bis 6.250 € (Einzelmaßnahmen) oder 12.500 € (Standard „Altersgerechtes Haus")</li>
              <li>• <strong>Pflegekasse:</strong> Bis 4.000 € pro Maßnahme bei vorhandenem Pflegegrad</li>
              <li>• <strong>Regionale Programme:</strong> Viele Bundesländer bieten zusätzliche Zuschüsse</li>
            </ul>
          </div>
        </div>
      </section>

      <CostTable title="Kosten barrierefreier Umbau" rows={costs} />
      <ChecklistSection title="Checkliste Barrierefreies Wohnen" items={checklist} />
      <FAQSection faqs={faqs} pageUrl="https://sanieren-sparen.de/barrierefreies-wohnen" />

      {/* CTA */}
      <section className="py-12 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Förderung prüfen?</h2>
          <p className="text-muted-foreground mb-6">Finden Sie heraus, welche Zuschüsse Ihnen zustehen.</p>
          <Button asChild size="lg">
            <Link to="/foerderrechner">Zum Förderrechner <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default BarrierefreiesWohnenPage;
