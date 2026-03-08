
import { Helmet } from 'react-helmet-async';
import heroImage from '@/assets/blog-hero-badezimmer-sanierung.jpg';
import { Bath, Droplets, Clock, Ruler, Wrench, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import CostTable from '@/components/ratgeber/CostTable';
import ChecklistSection from '@/components/ratgeber/ChecklistSection';
import FAQSection from '@/components/ratgeber/FAQSection';

const costs = [
  { measure: 'Teilsanierung (Armaturen, Fliesen)', priceRange: '3.000 – 8.000 €', note: 'Ohne Grundrissänderung' },
  { measure: 'Komplettsanierung Standard', priceRange: '10.000 – 20.000 €', note: 'Inkl. neue Sanitärobjekte' },
  { measure: 'Komplettsanierung Premium', priceRange: '20.000 – 35.000 €', note: 'Hochwertige Materialien' },
  { measure: 'Barrierefreier Umbau', priceRange: '8.000 – 15.000 €', note: 'Bodengleiche Dusche, Haltegriffe' },
  { measure: 'Fußbodenheizung nachrüsten', priceRange: '1.500 – 3.500 €', note: 'Elektrisch oder Warmwasser' },
];

const checklist = [
  { id: 'b1', label: 'Bestandsaufnahme: Zustand von Fliesen, Armaturen und Rohren dokumentieren' },
  { id: 'b2', label: 'Budget festlegen und Puffer von 15–20 % einplanen' },
  { id: 'b3', label: 'Grundriss und gewünschte Aufteilung skizzieren' },
  { id: 'b4', label: 'Fachbetrieb für Sanitär und Fliesenleger beauftragen' },
  { id: 'b5', label: 'Materialien auswählen (Fliesen, Armaturen, Duschsystem)' },
  { id: 'b6', label: 'Wasseranschlüsse und Abflüsse prüfen lassen' },
  { id: 'b7', label: 'Lüftungskonzept klären (Fenster oder Abluftventilator)' },
  { id: 'b8', label: 'Abnahme nach Fertigstellung und Dichtigkeitsprüfung' },
];

const faqs = [
  { question: 'Wie lange dauert eine Badezimmer-Komplettsanierung?', answer: 'Eine Komplettsanierung dauert in der Regel 2–4 Wochen, je nach Umfang. Bei einer Teilsanierung sind 1–2 Wochen realistisch. Planen Sie zusätzlich 1–2 Wochen für Trocknungszeiten ein.' },
  { question: 'Welche Förderungen gibt es für die Badsanierung?', answer: 'Für barrierefreie Umbauten bietet die KfW Zuschüsse über das Programm 455-B (bis zu 6.250 €). Auch regionale Förderprogramme können relevant sein. Energetische Maßnahmen wie Fußbodenheizung werden teils über BAFA gefördert.' },
  { question: 'Kann ich während der Sanierung im Haus wohnen?', answer: 'Ja, in den meisten Fällen ist das möglich. Stellen Sie sicher, dass ein zweites WC oder Bad nutzbar ist. Der Fachbetrieb stellt die Wasserversorgung in der Regel nur stundenweise ab.' },
  { question: 'Lohnt sich eine Fußbodenheizung im Bad?', answer: 'Ja, besonders bei einer Komplettsanierung ist der Mehraufwand gering. Fußbodenheizung erhöht den Komfort, spart Platz (kein Heizkörper) und harmoniert gut mit Wärmepumpen-Systemen.' },
  { question: 'Welche Fehler sollte ich vermeiden?', answer: 'Häufige Fehler: zu knappe Budgetplanung, fehlende Abdichtung in Nassbereichen, zu kleine Fliesenformate in kleinen Bädern (wirken unruhig) und fehlende Steckdosen für Spiegel und Föhn.' },
];

const timelineSteps = [
  { icon: Ruler, title: 'Planung & Angebote', duration: '1–2 Wochen', desc: 'Aufmaß, Materialwahl, Kostenvergleich' },
  { icon: Wrench, title: 'Demontage & Rohbau', duration: '3–5 Tage', desc: 'Alte Fliesen/Sanitär entfernen, Leitungen verlegen' },
  { icon: Droplets, title: 'Abdichtung & Estrich', duration: '3–7 Tage', desc: 'Feuchtigkeitssperre, Trocknungszeit' },
  { icon: Bath, title: 'Fliesen & Montage', duration: '5–10 Tage', desc: 'Fliesen verlegen, Sanitärobjekte einbauen' },
];

const BadezimmerSanierungPage = () => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Badezimmer-Sanierung: Kosten, Ablauf & Checkliste 2025',
    description: 'Kompletter Ratgeber zur Badsanierung – von Teilsanierung bis Komplettsanierung mit Kostenübersicht, Zeitplan und Checkliste.',
    url: 'https://sanieren-sparen.de/badezimmer-sanierung',
    publisher: { '@type': 'Organization', name: 'Sanieren & Sparen' },
  };

  return (
    <>
      <Helmet>
        <title>Badezimmer-Sanierung: Kosten, Ablauf & Checkliste 2025</title>
        <meta name="description" content="Kompletter Ratgeber zur Badsanierung – Kosten von 3.000 bis 35.000 €, Zeitplan, Checkliste und Fördermöglichkeiten im Überblick." />
        <link rel="canonical" href="https://sanieren-sparen.de/badezimmer-sanierung" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <RatgeberHero icon={Bath} title="Badezimmer-Sanierung" subtitle="Kosten, Ablauf und Checkliste – alles für Ihre Traumbad-Planung" backgroundImage={heroImage} />

      {/* Timeline */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Typischer Ablauf</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {timelineSteps.map((step, i) => (
              <Card key={i} className="relative">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{i + 1}</div>
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                  <Badge variant="secondary" className="mb-2">{step.duration}</Badge>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CostTable title="Kosten Badezimmer-Sanierung" rows={costs} />
      <ChecklistSection title="Checkliste Badsanierung" items={checklist} />
      <FAQSection faqs={faqs} pageUrl="https://sanieren-sparen.de/badezimmer-sanierung" />

      {/* CTA */}
      <section className="py-12 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Badsanierung konkret planen?</h2>
          <p className="text-muted-foreground mb-6">Berechnen Sie die Kosten für Ihre individuelle Sanierung mit unserem Kostenrechner.</p>
          <Button asChild size="lg">
            <Link to="/kostenrechner">Zum Kostenrechner <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default BadezimmerSanierungPage;
