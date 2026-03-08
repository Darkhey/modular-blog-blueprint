
import { Helmet } from 'react-helmet-async';
import heroImage from '@/assets/blog-hero-kellersanierung.jpg';
import { Warehouse, Droplets, Clock, Shield, Thermometer, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import CostTable from '@/components/ratgeber/CostTable';
import ChecklistSection from '@/components/ratgeber/ChecklistSection';
import FAQSection from '@/components/ratgeber/FAQSection';

const costs = [
  { measure: 'Kellerabdichtung von außen', priceRange: '15.000 – 30.000 €', note: 'Aufgraben + Abdichtung' },
  { measure: 'Kellerabdichtung von innen', priceRange: '3.000 – 8.000 €', note: 'Injektionsverfahren' },
  { measure: 'Kellerdämmung (Decke)', priceRange: '2.000 – 5.000 €', note: 'Einfachste Maßnahme' },
  { measure: 'Kellerdämmung (Wände + Boden)', priceRange: '8.000 – 18.000 €', note: 'Perimeterdämmung' },
  { measure: 'Kellerausbau zum Wohnraum', priceRange: '20.000 – 50.000 €', note: 'Inkl. Lüftung, Heizung, Estrich' },
  { measure: 'Drainage verlegen', priceRange: '5.000 – 12.000 €', note: 'Rund um das Gebäude' },
];

const checklist = [
  { id: 'k1', label: 'Feuchtigkeitsursache analysieren (aufsteigende Feuchte, Sickerwasser, Kondensation)' },
  { id: 'k2', label: 'Bausubstanz und Mauerwerk begutachten lassen' },
  { id: 'k3', label: 'Nutzungszweck des Kellers festlegen (Lager, Wohnraum, Hobbyraum)' },
  { id: 'k4', label: 'Angebote von mind. 3 Fachbetrieben einholen' },
  { id: 'k5', label: 'Abdichtungsmethode wählen (Innen- vs. Außenabdichtung)' },
  { id: 'k6', label: 'Lüftungskonzept planen (kontrollierte Lüftung bei Wohnraumnutzung)' },
  { id: 'k7', label: 'Baugenehmigung prüfen (bei Nutzungsänderung zu Wohnraum)' },
  { id: 'k8', label: 'Raumhöhe und Fluchtwege kontrollieren' },
];

const faqs = [
  { question: 'Wann lohnt sich eine Kellersanierung?', answer: 'Sobald Feuchteschäden sichtbar sind (Salzausblühungen, Schimmel, muffiger Geruch), ist eine Sanierung dringend nötig. Auch wenn der Keller als Wohnraum genutzt werden soll, ist eine Sanierung unumgänglich. Frühzeitiges Handeln verhindert teure Folgeschäden an der Bausubstanz.' },
  { question: 'Außenabdichtung oder Innenabdichtung – was ist besser?', answer: 'Die Außenabdichtung gilt als dauerhafteste Lösung, erfordert aber Erdarbeiten und ist teurer. Die Innenabdichtung (z. B. Injektionsverfahren) ist günstiger und schneller, stoppt aber nur den Wassereintritt – die Feuchtigkeit bleibt im Mauerwerk. Ideal: Kombination beider Methoden.' },
  { question: 'Welche Förderungen gibt es für die Kellersanierung?', answer: 'Energetische Maßnahmen wie Kellerdämmung werden über BAFA (BEG-Einzelmaßnahmen, 15 % Zuschuss) oder KfW gefördert. Eine Energieberatung (BAFA-gefördert mit 80 % Zuschuss) hilft, die optimalen Maßnahmen zu identifizieren.' },
  { question: 'Kann man einen Keller nachträglich dämmen?', answer: 'Ja. Die Kellerdeckendämmung von unten ist besonders einfach und effektiv (30–50 mm Dämmplatten). Für Kellerwände empfiehlt sich eine Perimeterdämmung von außen. Bei Innendämmung muss auf Dampfbremsen geachtet werden, um Kondensat zu vermeiden.' },
  { question: 'Wie lange dauert eine Kellersanierung?', answer: 'Eine reine Kellerdeckendämmung dauert 1–2 Tage. Eine Innenabdichtung 1–2 Wochen. Eine Komplettsanierung mit Außenabdichtung und Drainage 3–6 Wochen, je nach Gebäudegröße und Bodenverhältnissen.' },
];

const timelineSteps = [
  { icon: Droplets, title: 'Analyse & Diagnose', duration: '1–2 Wochen', desc: 'Feuchtigkeitsursache ermitteln, Gutachten erstellen' },
  { icon: Shield, title: 'Abdichtung', duration: '1–4 Wochen', desc: 'Innen- oder Außenabdichtung durchführen' },
  { icon: Thermometer, title: 'Dämmung & Ausbau', duration: '1–3 Wochen', desc: 'Perimeterdämmung, Estrich, Heizung' },
  { icon: Warehouse, title: 'Innenausbau', duration: '1–2 Wochen', desc: 'Bodenbelag, Wände, Elektrik' },
];

const KellersanierungPage = () => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Kellersanierung: Kosten, Abdichtung & Dämmung – Ratgeber 2025',
    description: 'Kompletter Ratgeber zur Kellersanierung – Abdichtung, Dämmung, Ausbau mit Kostenübersicht und Checkliste.',
    url: 'https://sanieren-sparen.de/kellersanierung',
    publisher: { '@type': 'Organization', name: 'Sanieren & Sparen' },
  };

  return (
    <>
      <Helmet>
        <title>Kellersanierung: Kosten, Abdichtung & Dämmung 2025</title>
        <meta name="description" content="Kompletter Ratgeber zur Kellersanierung – Kosten von 2.000 bis 50.000 €, Abdichtungsmethoden, Dämmung und Fördermöglichkeiten." />
        <link rel="canonical" href="https://sanieren-sparen.de/kellersanierung" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <RatgeberHero icon={Warehouse} title="Kellersanierung" subtitle="Abdichtung, Dämmung und Ausbau – so wird Ihr Keller trocken und nutzbar" backgroundImage={heroImage} />

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

      <CostTable title="Kosten Kellersanierung" rows={costs} />
      <ChecklistSection title="Checkliste Kellersanierung" items={checklist} />
      <FAQSection faqs={faqs} pageUrl="https://sanieren-sparen.de/kellersanierung" />

      {/* CTA */}
      <section className="py-12 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Kellersanierung planen?</h2>
          <p className="text-muted-foreground mb-6">Berechnen Sie die Kosten für Ihre Kellersanierung und finden Sie passende Fördermittel.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link to="/kostenrechner">Zum Kostenrechner <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/foerdermittel">Fördermittel prüfen <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default KellersanierungPage;
