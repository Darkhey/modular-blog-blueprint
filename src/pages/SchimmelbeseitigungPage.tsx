
import { Helmet } from 'react-helmet-async';
import heroImage from '@/assets/blog-hero-schimmelbeseitigung.jpg';
import { Bug, Wind, Thermometer, ShieldCheck, ArrowRight, AlertTriangle, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import CostTable from '@/components/ratgeber/CostTable';
import ChecklistSection from '@/components/ratgeber/ChecklistSection';
import FAQSection from '@/components/ratgeber/FAQSection';

const causes = [
  { icon: Droplets, title: 'Feuchtigkeit', desc: 'Undichte Dächer, defekte Rohrleitungen, aufsteigende Feuchtigkeit aus dem Keller oder Kondenswasser an kalten Wänden.' },
  { icon: Wind, title: 'Falsches Lüften', desc: 'Zu seltenes oder falsches Lüften, besonders in Bad und Küche. Warme, feuchte Luft kondensiert an kalten Oberflächen.' },
  { icon: Thermometer, title: 'Wärmebrücken', desc: 'Schlecht gedämmte Außenwände, Fensterlaibungen oder Rollladenkästen – Kälte dringt ein, Feuchtigkeit schlägt nieder.' },
];

const diyVsProfi = [
  { category: 'Kleiner Befall (<0,5 m²)', diy: true, desc: 'Oberflächlicher Schimmel auf Fugen oder glatten Flächen – mit 70% Alkohol oder Schimmelentferner behandelbar.' },
  { category: 'Mittlerer Befall (0,5–1 m²)', diy: false, desc: 'Ursache muss professionell geklärt werden. Behandlung ggf. selbst möglich, aber Fachberatung empfohlen.' },
  { category: 'Großer Befall (>1 m²)', diy: false, desc: 'Unbedingt Fachbetrieb beauftragen. Gesundheitsrisiko! Ursachenforschung und fachgerechte Sanierung notwendig.' },
];

const costs = [
  { measure: 'Kleine Schimmelstelle selbst entfernen', priceRange: '20 – 50 €', note: 'Materialkosten (Reiniger, Schutz)' },
  { measure: 'Fachbetrieb: Ursachenanalyse', priceRange: '150 – 500 €', note: 'Feuchtemessung, Gutachten' },
  { measure: 'Professionelle Schimmelsanierung', priceRange: '1.000 – 5.000 €', note: 'Je nach Fläche und Ursache' },
  { measure: 'Innendämmung gegen Wärmebrücken', priceRange: '50 – 120 €/m²', note: 'Kalziumsilikatplatten o.ä.' },
  { measure: 'Dezentrale Lüftungsanlage', priceRange: '500 – 1.500 €/Gerät', note: 'Mit Wärmerückgewinnung' },
];

const checklist = [
  { id: 's1', label: 'Alle Räume auf sichtbaren Schimmel und muffigen Geruch prüfen' },
  { id: 's2', label: 'Feuchtigkeitsquellen identifizieren (undichte Stellen, Kondenswasser)' },
  { id: 's3', label: 'Raumtemperatur in allen Räumen auf mindestens 16°C halten' },
  { id: 's4', label: 'Stoßlüften: 3–4× täglich für 5–10 Minuten (Fenster ganz öffnen)' },
  { id: 's5', label: 'Möbel mindestens 5–10 cm von Außenwänden abrücken' },
  { id: 's6', label: 'Luftfeuchtigkeit mit Hygrometer kontrollieren (Ziel: 40–60%)' },
  { id: 's7', label: 'Bei Befall >0,5 m²: Fachbetrieb für Ursachenanalyse kontaktieren' },
  { id: 's8', label: 'Nach Sanierung: Wärmebrücken dämmen und Lüftungskonzept erstellen' },
];

const faqs = [
  { question: 'Ist Schimmel in der Wohnung gefährlich?', answer: 'Ja, Schimmelsporen können Atemwegserkrankungen, Allergien und bei längerem Kontakt chronische Beschwerden auslösen. Besonders gefährdet sind Kinder, Ältere und Immungeschwächte. Ab 0,5 m² Befall sollte ein Fachbetrieb hinzugezogen werden.' },
  { question: 'Hilft Schimmelfarbe dauerhaft?', answer: 'Anti-Schimmel-Farbe kann vorbeugend wirken, bekämpft aber nicht die Ursache. Ohne Beseitigung der Feuchtigkeitsquelle kehrt der Schimmel zurück. Farbe ist nur als Ergänzung nach fachgerechter Sanierung sinnvoll.' },
  { question: 'Wer zahlt die Schimmelsanierung – Mieter oder Vermieter?', answer: 'Ist bauliche Feuchtigkeit die Ursache, muss der Vermieter sanieren. Liegt die Ursache in falschem Heiz-/Lüftungsverhalten, kann der Mieter in der Pflicht sein. Ein Gutachten klärt die Ursache verbindlich.' },
  { question: 'Kann Dämmung Schimmel verursachen?', answer: 'Eine fachgerecht ausgeführte Außendämmung reduziert Schimmelrisiko, da Wärmebrücken beseitigt werden. Fehlerhafte Innendämmung ohne Dampfsperre kann jedoch Feuchtigkeit einschließen und Schimmel begünstigen.' },
  { question: 'Was bringt eine Lüftungsanlage gegen Schimmel?', answer: 'Dezentrale Lüftungsanlagen mit Wärmerückgewinnung sorgen für kontinuierlichen Luftaustausch ohne Energieverlust. Sie sind besonders effektiv nach energetischer Sanierung, wenn die Gebäudehülle sehr dicht ist.' },
];

const SchimmelbeseitigungPage = () => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Schimmelbeseitigung: Ursachen, Kosten & Prävention 2025',
    description: 'Ratgeber Schimmel – Ursachen erkennen, richtig entfernen, dauerhaft vorbeugen. DIY vs. Fachbetrieb Entscheidungshilfe mit Kostenübersicht.',
    url: 'https://sanieren-sparen.de/schimmelbeseitigung',
    publisher: { '@type': 'Organization', name: 'Sanieren & Sparen' },
  };

  return (
    <>
      <Helmet>
        <title>Schimmelbeseitigung: Ursachen, Kosten & Prävention 2025</title>
        <meta name="description" content="Ratgeber Schimmel – Ursachen erkennen, richtig entfernen, dauerhaft vorbeugen. Kosten, DIY-Tipps und Fachbetrieb-Entscheidungshilfe." />
        <link rel="canonical" href="https://sanieren-sparen.de/schimmelbeseitigung" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <RatgeberHero icon={Bug} title="Schimmelbeseitigung" subtitle="Ursachen erkennen, richtig entfernen und dauerhaft vorbeugen" backgroundImage={heroImage} />

      {/* Health Warning */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Gesundheitsrisiko</AlertTitle>
            <AlertDescription>Schimmelsporen können Atemwegserkrankungen und Allergien auslösen. Bei großflächigem Befall (&gt;0,5 m²) immer einen Fachbetrieb beauftragen und betroffene Räume gut lüften.</AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Ursachen */}
      <section className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Die 3 Hauptursachen</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {causes.map((c, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DIY vs Profi */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-primary" /> Selbst machen oder Fachbetrieb?
          </h2>
          <div className="space-y-4">
            {diyVsProfi.map((item, i) => (
              <div key={i} className="p-4 rounded-xl border bg-card">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-foreground">{item.category}</h3>
                  <Badge variant={item.diy ? 'secondary' : 'destructive'}>{item.diy ? 'DIY möglich' : 'Fachbetrieb'}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CostTable title="Kosten Schimmelbeseitigung" rows={costs} />
      <ChecklistSection title="Checkliste Schimmelprävention" items={checklist} />
      <FAQSection faqs={faqs} pageUrl="https://sanieren-sparen.de/schimmelbeseitigung" />

      {/* CTA */}
      <section className="py-12 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Dämmung als Schimmelschutz?</h2>
          <p className="text-muted-foreground mb-6">Berechnen Sie das Einsparpotenzial einer professionellen Dämmung.</p>
          <Button asChild size="lg">
            <Link to="/daemmungsrechner">Zum Dämmungsrechner <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default SchimmelbeseitigungPage;
