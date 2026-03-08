
import { Helmet } from 'react-helmet-async';
import { TreePine, Clock, Flower2, Fence, Droplets, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import CostTable from '@/components/ratgeber/CostTable';
import ChecklistSection from '@/components/ratgeber/ChecklistSection';
import FAQSection from '@/components/ratgeber/FAQSection';

const costs = [
  { measure: 'Rasen anlegen (100 m²)', priceRange: '500 – 2.000 €', note: 'Rollrasen teurer als Saat' },
  { measure: 'Terrasse (20–30 m²)', priceRange: '3.000 – 10.000 €', note: 'Material: Stein, Holz oder WPC' },
  { measure: 'Einfahrt pflastern (30 m²)', priceRange: '3.000 – 8.000 €', note: 'Inkl. Unterbau' },
  { measure: 'Zaunanlage (20 lfm)', priceRange: '2.000 – 6.000 €', note: 'Holz, Metall oder Gabionen' },
  { measure: 'Gartenbeleuchtung', priceRange: '1.000 – 4.000 €', note: 'LED-System mit Erdkabel' },
  { measure: 'Bewässerungssystem', priceRange: '1.500 – 5.000 €', note: 'Automatisch, unterirdisch' },
  { measure: 'Komplett-Neugestaltung (200 m²)', priceRange: '15.000 – 40.000 €', note: 'Planung + Ausführung' },
];

const checklist = [
  { id: 'g1', label: 'Grundstück vermessen und Bestandsplan erstellen' },
  { id: 'g2', label: 'Bodenanalyse durchführen (pH-Wert, Beschaffenheit)' },
  { id: 'g3', label: 'Nutzungszonen definieren (Terrasse, Rasen, Beete, Spielfläche)' },
  { id: 'g4', label: 'Budget festlegen – Gartengestaltung in Etappen möglich' },
  { id: 'g5', label: 'Baugenehmigung prüfen (Mauern > 1,80 m, Gartenhäuser > 10 m²)' },
  { id: 'g6', label: 'Nachbarrecht beachten (Grenzabstände für Bäume und Hecken)' },
  { id: 'g7', label: 'Entwässerung und Regenwassernutzung planen' },
  { id: 'g8', label: 'Heimische und pflegeleichte Pflanzen auswählen' },
  { id: 'g9', label: 'Elektrik für Beleuchtung und Bewässerung vorbereiten' },
];

const faqs = [
  { question: 'Was kostet eine professionelle Gartengestaltung?', answer: 'Die Kosten variieren stark: Eine einfache Neugestaltung mit Rasen und Terrasse beginnt ab ca. 5.000 €. Eine aufwändige Komplett-Neugestaltung mit Pflasterarbeiten, Bepflanzung, Beleuchtung und Bewässerung kann 15.000–40.000 € kosten. Die Planungskosten eines Landschaftsarchitekten liegen bei 10–15 % der Bausumme.' },
  { question: 'Wann ist die beste Zeit für die Gartengestaltung?', answer: 'Erdarbeiten und Pflasterungen sind ganzjährig möglich (außer bei Frost). Pflanzungen gelingen am besten im Frühjahr (März–Mai) oder Herbst (September–November). Rasen wird idealerweise im April/Mai oder September gesät. Planen Sie im Winter, um im Frühjahr starten zu können.' },
  { question: 'Brauche ich eine Baugenehmigung?', answer: 'Für reine Gartengestaltung (Beete, Rasen, Terrasse) in der Regel nicht. Genehmigungspflichtig können sein: Mauern über 1,80 m Höhe, Gartenhäuser über 10 m² (je nach Bundesland), Schwimmteiche und Pools, sowie Zufahrten mit Versiegelung.' },
  { question: 'Wie gestalte ich einen pflegeleichten Garten?', answer: 'Setzen Sie auf robuste, heimische Stauden und Gräser statt empfindlicher Exoten. Mulchen reduziert Unkraut. Ein automatisches Bewässerungssystem spart Zeit. Großformatige Pflasterflächen und Kiesbeete minimieren den Pflegeaufwand. Vermeiden Sie zu viele verschiedene Pflanzenarten.' },
  { question: 'Lohnt sich ein Bewässerungssystem?', answer: 'Ja, besonders bei größeren Gärten (ab 200 m²) oder häufiger Abwesenheit. Unterirdische Tropfbewässerung spart bis zu 50 % Wasser gegenüber Rasensprengern. Die Investition (1.500–5.000 €) amortisiert sich durch Zeitersparnis und geringeren Wasserverbrauch innerhalb von 3–5 Jahren.' },
];

const timelineSteps = [
  { icon: TreePine, title: 'Planung & Entwurf', duration: '2–4 Wochen', desc: 'Vermessung, Gestaltungsplan, Angebote' },
  { icon: Fence, title: 'Erdarbeiten & Unterbau', duration: '1–2 Wochen', desc: 'Aushub, Drainage, Fundamente' },
  { icon: Droplets, title: 'Technik & Wege', duration: '1–2 Wochen', desc: 'Bewässerung, Beleuchtung, Pflasterung' },
  { icon: Flower2, title: 'Bepflanzung & Feinarbeit', duration: '1–2 Wochen', desc: 'Pflanzen setzen, Rasen, Mulchen' },
];

const GartengestaltungPage = () => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Gartengestaltung: Kosten, Planung & Ideen – Ratgeber 2025',
    description: 'Kompletter Ratgeber zur Gartengestaltung – Kosten, Planung, Bepflanzung und Bewässerung.',
    url: 'https://sanieren-sparen.de/gartengestaltung',
    publisher: { '@type': 'Organization', name: 'Sanieren & Sparen' },
  };

  return (
    <>
      <Helmet>
        <title>Gartengestaltung: Kosten, Planung & Ideen 2025</title>
        <meta name="description" content="Kompletter Ratgeber zur Gartengestaltung – Kosten von 500 bis 40.000 €, Planung, Bepflanzung, Bewässerung und Checkliste." />
        <link rel="canonical" href="https://sanieren-sparen.de/gartengestaltung" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <RatgeberHero icon={TreePine} title="Gartengestaltung" subtitle="Planung, Kosten und Ideen für Ihren Traumgarten" />

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

      <CostTable title="Kosten Gartengestaltung" rows={costs} />
      <ChecklistSection title="Checkliste Gartengestaltung" items={checklist} />
      <FAQSection faqs={faqs} pageUrl="https://sanieren-sparen.de/gartengestaltung" />

      {/* CTA */}
      <section className="py-12 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Garten neu gestalten?</h2>
          <p className="text-muted-foreground mb-6">Berechnen Sie die Kosten für Ihre Gartengestaltung und planen Sie Ihr Budget.</p>
          <Button asChild size="lg">
            <Link to="/kostenrechner">Zum Kostenrechner <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default GartengestaltungPage;
