import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';
import AnimatedGauge from '@/components/calculators/AnimatedGauge';
import { useInView } from '@/hooks/useInView';
import {
  Flame, Home, Sun, Calculator, Zap, ArrowRight, TrendingUp, Leaf, Scale, CheckCircle
} from 'lucide-react';

// Simplified calculation functions inlined for the comparison view

interface ComparisonResult {
  name: string;
  icon: typeof Flame;
  gradient: string;
  investment: number;
  savingsPerYear: number;
  amortization: number;
  co2Savings: number; // kg
  link: string;
}

// ── Heating quick calc ──
function calcHeating(houseSize: number, buildingYear: string): ComparisonResult {
  const consumption: Record<string, number> = {
    'vor-1979': 220, '1979-1994': 160, '1995-2001': 110, '2002-2015': 80, 'nach-2016': 50
  };
  const base = consumption[buildingYear] || 160;
  const currentKwh = houseSize * base;
  const futureKwh = houseSize * 60; // "gut" insulation + heat pump
  const currentCost = currentKwh * 0.10; // gas
  const futureCost = (futureKwh / 3.5) * 0.30; // heat pump
  const savings = currentCost - futureCost;
  const investment = 15000 + houseSize * 30;
  const co2 = (currentKwh * 0.21) - ((futureKwh / 3.5) * 0.38);
  return {
    name: 'Heizungsmodernisierung',
    icon: Flame,
    gradient: 'from-red-500 to-orange-500',
    investment,
    savingsPerYear: Math.max(savings, 0),
    amortization: savings > 0 ? investment / savings : 99,
    co2Savings: Math.max(co2, 0),
    link: '/heizkostenrechner',
  };
}

// ── Insulation quick calc ──
function calcInsulation(area: number, uValueBefore: number): ComparisonResult {
  const uValueAfter = 0.19; // WDVS EPS 16cm
  const deltaU = uValueBefore - uValueAfter;
  const energySavingsKwh = deltaU * area * 3600 * 24 / 1000;
  const savingsPerYear = energySavingsKwh * 0.15;
  const investment = 150 * area;
  const co2 = energySavingsKwh * 0.2;
  return {
    name: 'Fassadendämmung',
    icon: Home,
    gradient: 'from-blue-500 to-cyan-500',
    investment,
    savingsPerYear,
    amortization: savingsPerYear > 0 ? investment / savingsPerYear : 99,
    co2Savings: co2,
    link: '/daemmungsrechner',
  };
}

// ── Solar quick calc ──
function calcSolar(dachflaeche: number, stromverbrauch: number, mitSpeicher: boolean): ComparisonResult {
  const kWp = Math.min(dachflaeche / 6, 30);
  const jahresertrag = kWp * 950;
  const eigenverbrauch = mitSpeicher ? jahresertrag * 0.7 : jahresertrag * 0.3;
  const einspeisung = jahresertrag - eigenverbrauch;
  const ersparnis = eigenverbrauch * 0.32 + einspeisung * 0.082;
  const modulkosten = kWp * 1200;
  const speicherkosten = mitSpeicher ? 6000 : 0;
  const investment = modulkosten + speicherkosten + 2500;
  const co2 = jahresertrag * 0.4;
  return {
    name: 'Solaranlage',
    icon: Sun,
    gradient: 'from-amber-500 to-yellow-500',
    investment,
    savingsPerYear: ersparnis,
    amortization: ersparnis > 0 ? investment / ersparnis : 99,
    co2Savings: co2,
    link: '/solarenergie#rechner',
  };
}

const RechnerVergleichPage = () => {
  // Shared inputs
  const [houseSize, setHouseSize] = useState(150);
  const [buildingYear, setBuildingYear] = useState('1979-1994');
  const [facadeArea, setFacadeArea] = useState(120);
  const [uValue, setUValue] = useState(1.4);
  const [dachflaeche, setDachflaeche] = useState(50);
  const [stromverbrauch, setStromverbrauch] = useState(4000);
  const [mitSpeicher, setMitSpeicher] = useState(false);
  const [results, setResults] = useState<ComparisonResult[] | null>(null);
  const { ref, isInView } = useInView();

  const handleCalculate = () => {
    setResults([
      calcHeating(houseSize, buildingYear),
      calcInsulation(facadeArea, uValue),
      calcSolar(dachflaeche, stromverbrauch, mitSpeicher),
    ]);
  };

  const bestSavings = results ? results.reduce((a, b) => a.savingsPerYear > b.savingsPerYear ? a : b) : null;
  const bestAmort = results ? results.reduce((a, b) => a.amortization < b.amortization ? a : b) : null;
  const bestCo2 = results ? results.reduce((a, b) => a.co2Savings > b.co2Savings ? a : b) : null;
  const totalSavings = results ? results.reduce((s, r) => s + r.savingsPerYear, 0) : 0;
  const totalCo2 = results ? results.reduce((s, r) => s + r.co2Savings, 0) : 0;
  const totalInvestment = results ? results.reduce((s, r) => s + r.investment, 0) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sanierungsrechner-Vergleich | Alle Maßnahmen auf einen Blick</title>
        <meta name="description" content="Vergleichen Sie Heizungsmodernisierung, Fassadendämmung und Solaranlage: Kosten, Ersparnisse und CO₂-Einsparung auf einen Blick." />
      </Helmet>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0djJoLTJ2LTJoMnptMCAwdjJoLTJ2LTJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container max-w-6xl mx-auto px-4 py-12 md:py-16 relative z-10">
          <BreadcrumbNavigation
            items={[
              { label: 'Ratgeber', href: '/wissenswertes' },
              { label: 'Rechner & Tools', href: '/wissenswertes/tools' },
              { label: 'Vergleich' }
            ]}
            className="mb-6 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/50 [&_li]:text-white/90"
          />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Scale className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Sanierungsmaßnahmen vergleichen
            </h1>
          </div>
          <p className="text-emerald-100 text-lg max-w-2xl">
            Geben Sie Ihre Gebäudedaten ein und sehen Sie alle drei Sanierungsoptionen im direkten Vergleich – Kosten, Ersparnisse und Umweltwirkung.
          </p>
        </div>
      </div>

      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Input Section */}
        <Card className="glass border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Ihre Gebäudedaten
            </CardTitle>
            <CardDescription>Passen Sie die Werte an Ihr Gebäude an – die Ergebnisse werden sofort berechnet.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Column 1: Gebäude */}
              <div className="space-y-4 glass rounded-xl p-5 border border-red-200/50">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-500" /> Heizung
                </h4>
                <div>
                  <Label className="text-sm">Wohnfläche</Label>
                  <div className="flex items-center gap-3 mt-1">
                    <Slider min={50} max={400} step={10} value={[houseSize]} onValueChange={v => setHouseSize(v[0])} className="flex-1" />
                    <span className="text-sm font-semibold w-16 text-right">{houseSize} m²</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Baujahr</Label>
                  <Select value={buildingYear} onValueChange={setBuildingYear}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vor-1979">vor 1979</SelectItem>
                      <SelectItem value="1979-1994">1979–1994</SelectItem>
                      <SelectItem value="1995-2001">1995–2001</SelectItem>
                      <SelectItem value="2002-2015">2002–2015</SelectItem>
                      <SelectItem value="nach-2016">nach 2016</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Column 2: Dämmung */}
              <div className="space-y-4 glass rounded-xl p-5 border border-blue-200/50">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Home className="w-4 h-4 text-blue-500" /> Dämmung
                </h4>
                <div>
                  <Label className="text-sm">Fassadenfläche</Label>
                  <div className="flex items-center gap-3 mt-1">
                    <Slider min={30} max={300} step={10} value={[facadeArea]} onValueChange={v => setFacadeArea(v[0])} className="flex-1" />
                    <span className="text-sm font-semibold w-16 text-right">{facadeArea} m²</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Aktueller U-Wert</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input type="number" step="0.1" min={0.5} max={3.0} value={uValue} onChange={e => setUValue(parseFloat(e.target.value) || 1.4)} className="w-24" />
                    <span className="text-xs text-muted-foreground">W/(m²K)</span>
                  </div>
                </div>
              </div>

              {/* Column 3: Solar */}
              <div className="space-y-4 glass rounded-xl p-5 border border-amber-200/50">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-500" /> Solar
                </h4>
                <div>
                  <Label className="text-sm">Dachfläche</Label>
                  <div className="flex items-center gap-3 mt-1">
                    <Slider min={20} max={150} step={5} value={[dachflaeche]} onValueChange={v => setDachflaeche(v[0])} className="flex-1" />
                    <span className="text-sm font-semibold w-16 text-right">{dachflaeche} m²</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Stromverbrauch (kWh/Jahr)</Label>
                  <Input type="number" step={500} min={1000} max={20000} value={stromverbrauch} onChange={e => setStromverbrauch(parseInt(e.target.value) || 4000)} className="mt-1" />
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={mitSpeicher} onCheckedChange={setMitSpeicher} id="speicher" />
                  <Label htmlFor="speicher" className="text-sm">Mit Batteriespeicher</Label>
                </div>
              </div>
            </div>

            <Button onClick={handleCalculate} size="lg" className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold shadow-lg transform hover:scale-[1.02] transition-all">
              <Zap className="mr-2 w-5 h-5" />
              Alle Maßnahmen vergleichen
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <div ref={ref} className="space-y-8 animate-fade-in">
            {/* Summary Row */}
            <Card className="glass border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                  Gesamtpotenzial aller Maßnahmen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-center gap-8">
                  <AnimatedGauge value={totalSavings} max={totalSavings * 1.3} label="Gesamtersparnis / Jahr" unit="€" color="green" size="lg" />
                  <AnimatedGauge value={totalCo2} max={totalCo2 * 1.3} label="CO₂-Reduktion / Jahr" unit="kg" color="amber" size="lg" />
                  <AnimatedGauge value={totalInvestment} max={totalInvestment * 1.3} label="Gesamtinvestition" unit="€" color="blue" size="lg" />
                </div>
              </CardContent>
            </Card>

            {/* Side-by-side comparison cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.map((r, i) => {
                const Icon = r.icon;
                const isBestSavings = bestSavings === r;
                const isBestAmort = bestAmort === r;
                const isBestCo2 = bestCo2 === r;

                return (
                  <Card
                    key={r.name}
                    className={`glass border-border overflow-hidden ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    {/* Colored header */}
                    <div className={`bg-gradient-to-r ${r.gradient} p-5 text-white`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{r.name}</h3>
                        </div>
                      </div>
                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {isBestSavings && <Badge className="bg-white/20 text-white border-0 text-xs">💰 Höchste Ersparnis</Badge>}
                        {isBestAmort && <Badge className="bg-white/20 text-white border-0 text-xs">⚡ Schnellste Amortisation</Badge>}
                        {isBestCo2 && <Badge className="bg-white/20 text-white border-0 text-xs">🌱 Beste CO₂-Bilanz</Badge>}
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-5">
                      {/* Gauge */}
                      <div className="flex justify-center">
                        <AnimatedGauge
                          value={r.savingsPerYear}
                          max={Math.max(...results.map(x => x.savingsPerYear)) * 1.2}
                          label="Ersparnis / Jahr"
                          unit="€"
                          color="green"
                          size="md"
                        />
                      </div>

                      <Separator />

                      {/* Details */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Investition</span>
                          <span className="font-semibold text-foreground">{r.investment.toLocaleString('de-DE')} €</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Ersparnis / Jahr</span>
                          <span className="font-semibold text-emerald-600">{r.savingsPerYear.toLocaleString('de-DE', { maximumFractionDigits: 0 })} €</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Amortisation</span>
                          <span className="font-semibold text-blue-600">{r.amortization.toFixed(1)} Jahre</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">CO₂-Einsparung</span>
                          <span className="font-semibold text-amber-600">{r.co2Savings.toLocaleString('de-DE', { maximumFractionDigits: 0 })} kg/Jahr</span>
                        </div>
                      </div>

                      <Button asChild variant="outline" className="w-full group">
                        <Link to={r.link}>
                          Zum Detailrechner
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recommendation */}
            <Card className="glass border-emerald-300 bg-emerald-50/30 dark:bg-emerald-950/10">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Unsere Empfehlung</h3>
                    <p className="text-muted-foreground mb-3">
                      Kombinieren Sie alle drei Maßnahmen für maximale Wirkung: Mit einer Gesamtinvestition von{' '}
                      <strong className="text-foreground">{totalInvestment.toLocaleString('de-DE')} €</strong> sparen Sie jährlich{' '}
                      <strong className="text-emerald-600">{totalSavings.toLocaleString('de-DE', { maximumFractionDigits: 0 })} €</strong> und reduzieren Ihren CO₂-Ausstoß um{' '}
                      <strong className="text-amber-600">{(totalCo2 / 1000).toFixed(1)} Tonnen</strong> pro Jahr.
                      Das entspricht einer Amortisationszeit von ca.{' '}
                      <strong className="text-blue-600">{(totalInvestment / totalSavings).toFixed(1)} Jahren</strong>.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                        <Link to="/foerdermittel">
                          <Leaf className="mr-2 w-4 h-4" />
                          Fördermittel prüfen
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link to="/projektplaner">Sanierung planen</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default RechnerVergleichPage;
