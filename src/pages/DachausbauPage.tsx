
import { Helmet } from 'react-helmet-async';
import { Home, Clock, Ruler, Hammer, Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import CostTable from '@/components/ratgeber/CostTable';
import ChecklistSection from '@/components/ratgeber/ChecklistSection';
import FAQSection from '@/components/ratgeber/FAQSection';

const costs = [
  { measure: 'Dachbodendämmung (begehbar)', priceRange: '2.000 – 5.000 €', note: 'Einfachste Variante' },
  { measure: 'Zwischensparrendämmung', priceRange: '5.000 – 12.000 €', note: 'Standard bei Ausbau' },
  { measure: 'Dachfenster einbauen (pro Stück)', priceRange: '1.500 – 4.000 €', note: 'Inkl. Einbau + Abdichtung' },
  { measure: 'Trockenbau & Elektrik', priceRange: '8.000 – 15.000 €', note: 'Gipskarton, Steckdosen, Licht' },
  { measure: 'Badezimmer im Dachgeschoss', priceRange: '10.000 – 25.000 €', note: 'Sanitärinstallation + Ausstattung' },
  { measure: 'Komplett-Ausbau (50–80 m²)', priceRange: '30.000 – 70.000 €', note: 'Schlüsselfertig' },
  { measure: 'Gaube errichten', priceRange: '8.000 – 20.000 €', note: 'Mehr Platz + Stehhöhe' },
];

const checklist = [
  { id: 'd1', label: 'Statik prüfen lassen – trägt die Dachkonstruktion den Ausbau?' },
  { id: 'd2', label: 'Baugenehmigung einholen (Nutzungsänderung, Gauben, Dachfenster)' },
  { id: 'd3', label: 'Energieberatung durchführen (BAFA-Zuschuss nutzen)' },
  { id: 'd4', label: 'Dachzustand prüfen: Eindeckung, Sparren, Feuchtigkeit' },
  { id: 'd5', label: 'Wohnfläche und Raumhöhen berechnen (mind. 2,30 m Stehhöhe)' },
  { id: 'd6', label: 'Dämmkonzept wählen (Zwischen-, Auf- oder Untersparrendämmung)' },
  { id: 'd7', label: 'Heizungsanbindung klären (Fußbodenheizung empfohlen)' },
  { id: 'd8', label: 'Flucht- und Rettungswege sicherstellen (Dachfenster als 2. Fluchtweg)' },
  { id: 'd9', label: 'Treppe zum Dachgeschoss planen (Platzbedarf ca. 3–5 m²)' },
];

const faqs = [
  { question: 'Brauche ich eine Baugenehmigung für den Dachausbau?', answer: 'In den meisten Bundesländern ja, wenn sich die Nutzung ändert (z. B. von Speicher zu Wohnraum). Auch Gauben und zusätzliche Dachfenster sind oft genehmigungspflichtig. Erkundigen Sie sich beim zuständigen Bauamt.' },
  { question: 'Welche Förderungen gibt es für den Dachausbau?', answer: 'Die Dachdämmung wird als energetische Einzelmaßnahme über BAFA (15 % Zuschuss, mit iSFP 20 %) oder als Steuerbonus (20 % über 3 Jahre) gefördert. KfW-Kredit 261/262 für Effizienzhaus-Standard ist ebenfalls möglich.' },
  { question: 'Wie dick muss die Dämmung sein?', answer: 'Nach GEG 2024 ist ein U-Wert von 0,24 W/(m²K) erforderlich. Das entspricht ca. 16–20 cm Mineralwolle oder 12–16 cm PUR-Dämmung. Für KfW-Förderung werden oft strengere Werte (0,14 W/(m²K)) verlangt.' },
  { question: 'Wie lange dauert ein Dachausbau?', answer: 'Ein einfacher Ausbau (Dämmung + Trockenbau) dauert 4–6 Wochen. Mit Bad, Gaube und Treppe sind 8–12 Wochen realistisch. Die Planung und Genehmigung dauert zusätzlich 4–8 Wochen.' },
  { question: 'Welche Mindesthöhe braucht ein Dachgeschoss?', answer: 'Für Aufenthaltsräume schreiben die Landesbauordnungen meist eine lichte Höhe von mind. 2,30 m über mind. der Hälfte der Grundfläche vor. Unter 1,50 m Höhe zählt die Fläche nicht als Wohnfläche.' },
];

const timelineSteps = [
  { icon: Ruler, title: 'Planung & Genehmigung', duration: '4–8 Wochen', desc: 'Statik, Bauantrag, Energieberatung' },
  { icon: Hammer, title: 'Rohbau & Dämmung', duration: '2–4 Wochen', desc: 'Gaube, Dämmung, Dachfenster' },
  { icon: Lightbulb, title: 'Haustechnik', duration: '1–2 Wochen', desc: 'Elektrik, Heizung, Sanitär' },
  { icon: Home, title: 'Innenausbau', duration: '2–4 Wochen', desc: 'Trockenbau, Boden, Malerarbeiten' },
];

const DachausbauPage = () => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Dachausbau: Kosten, Genehmigung & Dämmung – Ratgeber 2025',
    description: 'Kompletter Ratgeber zum Dachausbau – Kosten, Baugenehmigung, Dämmung und Förderung.',
    url: 'https://sanieren-sparen.de/dachausbau',
    publisher: { '@type': 'Organization', name: 'Sanieren & Sparen' },
  };

  return (
    <>
      <Helmet>
        <title>Dachausbau: Kosten, Genehmigung & Dämmung 2025</title>
        <meta name="description" content="Kompletter Ratgeber zum Dachausbau – Kosten von 2.000 bis 70.000 €, Baugenehmigung, Dämmung und Fördermöglichkeiten im Überblick." />
        <link rel="canonical" href="https://sanieren-sparen.de/dachausbau" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <RatgeberHero icon={Home} title="Dachausbau" subtitle="Vom Speicher zum Wohntraum – Kosten, Planung und Fördermittel" />

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

      <CostTable title="Kosten Dachausbau" rows={costs} />
      <ChecklistSection title="Checkliste Dachausbau" items={checklist} />
      <FAQSection faqs={faqs} pageUrl="https://sanieren-sparen.de/dachausbau" />

      {/* CTA */}
      <section className="py-12 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Dachausbau konkret planen?</h2>
          <p className="text-muted-foreground mb-6">Berechnen Sie die Kosten und finden Sie passende Fördermittel für Ihren Dachausbau.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link to="/kostenrechner">Zum Kostenrechner <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/daemmungsrechner">Zum Dämmungsrechner <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DachausbauPage;
