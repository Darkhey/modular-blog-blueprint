import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CalculatorHero from '@/components/calculators/CalculatorHero';
import { Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';
import RelatedCalculators from '@/components/shared/RelatedCalculators';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight, Sparkles } from 'lucide-react';

type Bereich = 'huelle' | 'heizung' | 'fenster' | 'erneuerbar' | 'verhalten';

interface Frage {
  id: string;
  bereich: Bereich;
  text: string;
  /** Antworten von „schlecht" (0) bis „sehr gut" (10) */
  options: { label: string; score: number }[];
  weight: number;
}

const FRAGEN: Frage[] = [
  { id: 'baujahr', bereich: 'huelle', weight: 1.5, text: 'Baujahr deines Gebäudes?',
    options: [
      { label: 'vor 1977', score: 0 }, { label: '1977–1995', score: 3 },
      { label: '1996–2010', score: 7 }, { label: 'nach 2010', score: 10 },
    ] },
  { id: 'daemmung', bereich: 'huelle', weight: 1.5, text: 'Wie ist die Außenwand gedämmt?',
    options: [
      { label: 'Keine Dämmung', score: 0 }, { label: '< 8 cm', score: 3 },
      { label: '8–14 cm', score: 7 }, { label: '> 14 cm / KfW-Niveau', score: 10 },
    ] },
  { id: 'dach', bereich: 'huelle', weight: 1, text: 'Dach- bzw. Oberste Geschossdecke?',
    options: [
      { label: 'Ungedämmt', score: 0 }, { label: 'Teilweise', score: 4 },
      { label: 'Komplett aktuell gedämmt', score: 10 },
    ] },
  { id: 'fenster', bereich: 'fenster', weight: 1, text: 'Fenster-Verglasung?',
    options: [
      { label: 'Einfach / alte Doppel', score: 0 }, { label: '2-Scheiben Standard', score: 5 },
      { label: '3-Scheiben Wärmeschutz', score: 10 },
    ] },
  { id: 'heizungsalter', bereich: 'heizung', weight: 1.5, text: 'Wie alt ist deine Heizung?',
    options: [
      { label: '> 25 Jahre', score: 0 }, { label: '15–25 Jahre', score: 3 },
      { label: '5–15 Jahre', score: 7 }, { label: '< 5 Jahre', score: 10 },
    ] },
  { id: 'energietraeger', bereich: 'heizung', weight: 1.5, text: 'Welcher Energieträger?',
    options: [
      { label: 'Öl / Kohle', score: 0 }, { label: 'Gas', score: 4 },
      { label: 'Fernwärme / Pellet', score: 7 }, { label: 'Wärmepumpe', score: 10 },
    ] },
  { id: 'pv', bereich: 'erneuerbar', weight: 1, text: 'Photovoltaik vorhanden?',
    options: [
      { label: 'Nein', score: 0 }, { label: 'Geplant', score: 4 },
      { label: 'Ja, ohne Speicher', score: 7 }, { label: 'Ja, mit Speicher', score: 10 },
    ] },
  { id: 'solarthermie', bereich: 'erneuerbar', weight: 0.75, text: 'Solarthermie für Warmwasser?',
    options: [{ label: 'Nein', score: 0 }, { label: 'Geplant', score: 5 }, { label: 'Ja', score: 10 }] },
  { id: 'lueftung', bereich: 'huelle', weight: 0.75, text: 'Lüftungsanlage mit Wärmerückgewinnung?',
    options: [{ label: 'Nein', score: 0 }, { label: 'Geplant', score: 5 }, { label: 'Ja', score: 10 }] },
  { id: 'verbrauch', bereich: 'verhalten', weight: 1, text: 'Heizenergieverbrauch (kWh/m²·a)?',
    options: [
      { label: '> 200 (sehr hoch)', score: 0 }, { label: '120–200', score: 3 },
      { label: '70–120', score: 7 }, { label: '< 70 (Effizienzhaus)', score: 10 },
    ] },
  { id: 'isfp', bereich: 'verhalten', weight: 0.5, text: 'Hast du einen iSFP / Energieberatung?',
    options: [{ label: 'Nein', score: 0 }, { label: 'Geplant', score: 5 }, { label: 'Ja', score: 10 }] },
  { id: 'smart', bereich: 'verhalten', weight: 0.5, text: 'Smarte Thermostate / Zeitsteuerung?',
    options: [{ label: 'Nein', score: 0 }, { label: 'Teilweise', score: 5 }, { label: 'Komplett', score: 10 }] },
];

const BEREICH_LABELS: Record<Bereich, string> = {
  huelle: 'Gebäudehülle', heizung: 'Heizung', fenster: 'Fenster',
  erneuerbar: 'Erneuerbare Energie', verhalten: 'Effizienz & Verhalten',
};

interface Empfehlung { titel: string; route: string; warum: string; }

const EnergieCheckPage = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const result = useMemo(() => {
    const beantwortet = Object.keys(answers).length;
    if (beantwortet === 0) return null;
    const maxPoints = FRAGEN.reduce((s, f) => s + 10 * f.weight, 0);
    const got = FRAGEN.reduce((s, f) => s + (answers[f.id] ?? 0) * f.weight, 0);
    const score = Math.round((got / maxPoints) * 100);

    const perBereich: Record<Bereich, { got: number; max: number }> = {
      huelle: { got: 0, max: 0 }, heizung: { got: 0, max: 0 }, fenster: { got: 0, max: 0 },
      erneuerbar: { got: 0, max: 0 }, verhalten: { got: 0, max: 0 },
    };
    FRAGEN.forEach((f) => {
      perBereich[f.bereich].max += 10 * f.weight;
      perBereich[f.bereich].got += (answers[f.id] ?? 0) * f.weight;
    });

    const empfehlungen: Empfehlung[] = [];
    if ((perBereich.heizung.got / perBereich.heizung.max) < 0.6)
      empfehlungen.push({ titel: 'Heizung modernisieren', route: '/heizkostenrechner', warum: 'Alte Heizung oder fossiler Energieträger – Wärmepumpe oder Hybrid prüfen.' });
    if ((perBereich.huelle.got / perBereich.huelle.max) < 0.6)
      empfehlungen.push({ titel: 'Dämmung verbessern', route: '/daemmungsrechner', warum: 'Wärmeverluste über Wand/Dach reduzieren – U-Wert und ROI vergleichen.' });
    if ((perBereich.erneuerbar.got / perBereich.erneuerbar.max) < 0.6)
      empfehlungen.push({ titel: 'Photovoltaik prüfen', route: '/solarenergie#rechner', warum: 'Eigenstrom senkt Strom- und Heizkosten massiv.' });
    if ((perBereich.fenster.got / perBereich.fenster.max) < 0.6)
      empfehlungen.push({ titel: 'Fenster tauschen', route: '/fenster-tueren', warum: 'Alte Verglasung verursacht hohe Wärmeverluste und Zugluft.' });
    empfehlungen.push({ titel: 'Förderung berechnen', route: '/foerderrechner', warum: 'BAFA, KfW und regionale Boni kombinieren.' });

    const ampel = score >= 70 ? 'gut' : score >= 40 ? 'mittel' : 'schlecht';
    return { score, perBereich, empfehlungen: empfehlungen.slice(0, 4), beantwortet, ampel };
  }, [answers]);

  const progress = (Object.keys(answers).length / FRAGEN.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Energie-Check: Sanierungspotenzial in 2 Minuten</title>
        <meta name="description" content="12 Fragen, ein Score von 0–100 und konkrete Empfehlungen für deine nächsten Sanierungs-Schritte." />
        <link rel="canonical" href="https://sanieren-sparen.de/energie-check" />
      </Helmet>
      <CalculatorHero
        icon={Zap}
        title="Energie-Check für dein Zuhause"
        subtitle="Beantworte 12 Fragen und erhalte einen Score von 0–100 plus konkrete nächste Schritte."
        gradient="from-yellow-500 to-amber-500"
        breadcrumbs={[
          { label: 'Rechner', to: '/rechner' },
          { label: 'Energie-Check' },
        ]}
      />
      <main>
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Fortschritt</span><span>{Object.keys(answers).length} / {FRAGEN.length}</span>
              </div>
              <Progress value={progress} />
            </div>
          </div>

          <div className="space-y-3">
            {FRAGEN.map((f, i) => (
              <Card key={f.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center shrink-0">{i + 1}</span>
                    <div>
                      <CardTitle className="text-base" id={`q-${f.id}`}>{f.text}</CardTitle>
                      <span className="text-xs text-muted-foreground">{BEREICH_LABELS[f.bereich]}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    aria-labelledby={`q-${f.id}`}
                    value={answers[f.id]?.toString() ?? ''}
                    onValueChange={(v) => setAnswers((a) => ({ ...a, [f.id]: Number(v) }))}
                    className="grid sm:grid-cols-2 gap-2"
                  >
                    {f.options.map((o, idx) => (
                      <div key={idx} className="flex items-center space-x-2 rounded-md border p-2 hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value={o.score.toString()} id={`${f.id}-${idx}`} />
                        <Label htmlFor={`${f.id}-${idx}`} className="cursor-pointer flex-1 text-sm">{o.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
          </div>

          {result && (
            <Card className="mt-8 border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" /> Dein Ergebnis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                  <div className="text-sm text-muted-foreground mb-1">Effizienz-Score</div>
                  <div className="text-6xl font-bold text-emerald-600">{result.score}<span className="text-2xl text-muted-foreground">/100</span></div>
                  <div className="mt-3 inline-flex items-center gap-2">
                    {result.ampel === 'gut' && <><CheckCircle2 className="w-5 h-5 text-emerald-600" /><span className="font-medium">Sehr gute Ausgangslage</span></>}
                    {result.ampel === 'mittel' && <><AlertTriangle className="w-5 h-5 text-amber-600" /><span className="font-medium">Solide – mit Optimierungspotenzial</span></>}
                    {result.ampel === 'schlecht' && <><XCircle className="w-5 h-5 text-red-600" /><span className="font-medium">Hoher Sanierungsbedarf</span></>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2">
                  {(Object.keys(result.perBereich) as Bereich[]).map((b) => {
                    const pct = Math.round((result.perBereich[b].got / result.perBereich[b].max) * 100) || 0;
                    const color = pct >= 70 ? 'text-emerald-600' : pct >= 40 ? 'text-amber-600' : 'text-red-600';
                    return (
                      <div key={b} className="text-center p-3 rounded-lg border">
                        <div className="text-xs text-muted-foreground">{BEREICH_LABELS[b]}</div>
                        <div className={`text-2xl font-bold ${color}`}>{pct}%</div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Empfohlene nächste Schritte</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {result.empfehlungen.map((e) => (
                      <Link key={e.route} to={e.route} className="group block p-4 rounded-lg border hover:border-primary hover:bg-accent/50 transition-all">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-medium group-hover:text-primary">{e.titel}</div>
                            <div className="text-sm text-muted-foreground mt-1">{e.warum}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button asChild><Link to="/sanierungscheck">Detaillierten Sanierungs-Check starten</Link></Button>
                  <Button asChild variant="outline"><Link to="/rechner">Alle Rechner</Link></Button>
                </div>
              </CardContent>
            </Card>
          )}

          <RelatedCalculators
            topics={['planung', 'modernisierung', 'foerderung']}
            excludeIds={['energie-check']}
            className="mt-12 -mx-4"
          />
        </div>
      </main>
    </div>
  );
};

export default EnergieCheckPage;
