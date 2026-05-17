import { useId, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';
import RelatedCalculators from '@/components/shared/RelatedCalculators';
import { TrendingUp, ArrowRight, Leaf } from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine,
} from 'recharts';

type EnergietraegerId = 'gas' | 'oel' | 'strom' | 'pellet' | 'fernwaerme';

const ENERGIETRAEGER: Record<EnergietraegerId, { label: string; preis: number; co2: number /* kg/kWh */ }> = {
  gas:        { label: 'Gas',         preis: 0.11, co2: 0.201 },
  oel:        { label: 'Heizöl',      preis: 0.12, co2: 0.266 },
  strom:      { label: 'Strom (WP)',  preis: 0.30, co2: 0.380 },
  pellet:     { label: 'Pellets',     preis: 0.07, co2: 0.025 },
  fernwaerme: { label: 'Fernwärme',   preis: 0.13, co2: 0.180 },
};

const formatEuro = (n: number) =>
  n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

const ROIRechnerPage = () => {
  const investId = useId();
  const savingsId = useId();
  const foerderId = useId();
  const wartungId = useId();

  const [investition, setInvestition] = useState('25000');
  const [foerderung, setFoerderung] = useState('9000');
  const [einsparungKwh, setEinsparungKwh] = useState('15000');
  const [traeger, setTraeger] = useState<EnergietraegerId>('gas');
  const [preisSteigerung, setPreisSteigerung] = useState([4]); // % p.a.
  const [wartung, setWartung] = useState('250');
  const [lebensdauer, setLebensdauer] = useState([20]); // Jahre

  const data = useMemo(() => {
    const inv = Math.max(0, Number(investition) || 0);
    const f = Math.max(0, Number(foerderung) || 0);
    const eigen = Math.max(0, inv - f);
    const kwh = Math.max(0, Number(einsparungKwh) || 0);
    const t = ENERGIETRAEGER[traeger];
    const wart = Math.max(0, Number(wartung) || 0);
    const steig = preisSteigerung[0] / 100;
    const years = lebensdauer[0];

    const rows: Array<{ jahr: number; kumuliert: number; jaehrlich: number }> = [];
    let kumuliert = -eigen;
    let breakEven: number | null = null;
    let totalCo2 = 0;

    for (let y = 1; y <= years; y++) {
      const preis = t.preis * Math.pow(1 + steig, y - 1);
      const ersparnis = kwh * preis - wart;
      kumuliert += ersparnis;
      rows.push({ jahr: y, kumuliert: Math.round(kumuliert), jaehrlich: Math.round(ersparnis) });
      if (breakEven === null && kumuliert >= 0) breakEven = y;
      totalCo2 += kwh * t.co2;
    }

    const netto = kumuliert;
    // Einfache IRR-Approximation (nur, wenn break-even erreicht)
    const irr = breakEven ? Math.pow(Math.max(1, (netto + eigen) / Math.max(1, eigen)), 1 / years) - 1 : null;

    return { eigen, rows, breakEven, netto, irr, totalCo2: totalCo2 / 1000 };
  }, [investition, foerderung, einsparungKwh, traeger, preisSteigerung, wartung, lebensdauer]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>ROI-Rechner Sanierung: Amortisation & Cashflow</title>
        <meta name="description" content="Berechne, wann sich deine Sanierung rechnet: Amortisationszeit, Cashflow über 20 Jahre, IRR und CO₂-Ersparnis." />
        <link rel="canonical" href="https://sanieren-sparen.de/roi-rechner" />
      </Helmet>
      <CalculatorHero
        icon={TrendingUp}
        title="Wann rechnet sich deine Sanierung?"
        subtitle="Cashflow, Amortisation, IRR und CO₂-Ersparnis – mit Energiepreis-Steigerung und Wartungskosten."
        gradient="from-fuchsia-500 to-pink-500"
        breadcrumbs={[
          { label: 'Rechner', to: '/rechner' },
          { label: 'Amortisations-Rechner' },
        ]}
      />
      <main>
        <div className="container max-w-5xl mx-auto px-4 py-8">

          <div className="grid lg:grid-cols-[380px_1fr] gap-6">
            <Card>
              <CardHeader><CardTitle>Eingaben</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor={investId}>Investition (EUR)</Label>
                  <Input id={investId} type="number" value={investition} onChange={(e) => setInvestition(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor={foerderId}>Förderung/Zuschuss (EUR)</Label>
                  <Input id={foerderId} type="number" value={foerderung} onChange={(e) => setFoerderung(e.target.value)} />
                  <a href="/foerderrechner" className="text-xs text-primary hover:underline">Förderung berechnen →</a>
                </div>
                <div>
                  <Label htmlFor={savingsId}>Einsparung (kWh/Jahr)</Label>
                  <Input id={savingsId} type="number" value={einsparungKwh} onChange={(e) => setEinsparungKwh(e.target.value)} />
                </div>
                <div>
                  <Label>Energieträger (ersetzt)</Label>
                  <Select value={traeger} onValueChange={(v) => setTraeger(v as EnergietraegerId)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(Object.keys(ENERGIETRAEGER) as EnergietraegerId[]).map((k) => (
                        <SelectItem key={k} value={k}>{ENERGIETRAEGER[k].label} ({ENERGIETRAEGER[k].preis.toFixed(2)} €/kWh)</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Energiepreis-Steigerung: {preisSteigerung[0]}% p.a.</Label>
                  <Slider value={preisSteigerung} onValueChange={setPreisSteigerung} min={0} max={10} step={0.5} />
                </div>
                <div>
                  <Label htmlFor={wartungId}>Wartung (EUR/Jahr)</Label>
                  <Input id={wartungId} type="number" value={wartung} onChange={(e) => setWartung(e.target.value)} />
                </div>
                <div>
                  <Label>Betrachtungszeitraum: {lebensdauer[0]} Jahre</Label>
                  <Slider value={lebensdauer} onValueChange={setLebensdauer} min={5} max={30} step={1} />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-3">
                <Card className="border-emerald-500/30">
                  <CardContent className="p-4">
                    <div className="text-xs text-muted-foreground">Amortisation</div>
                    <div className="text-2xl font-bold text-emerald-600">
                      {data.breakEven ? `${data.breakEven} J.` : '—'}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-xs text-muted-foreground">Netto nach {lebensdauer[0]} J.</div>
                    <div className="text-2xl font-bold">{formatEuro(data.netto)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-xs text-muted-foreground flex items-center gap-1"><Leaf className="w-3 h-3" /> CO₂ gespart</div>
                    <div className="text-2xl font-bold text-emerald-600">{data.totalCo2.toFixed(1)} t</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" /> Cashflow-Verlauf</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data.rows} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="cf" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="jahr" tick={{ fontSize: 12 }} label={{ value: 'Jahr', position: 'insideBottom', offset: -5, fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                        <Tooltip formatter={(v: number) => formatEuro(v)} labelFormatter={(l) => `Jahr ${l}`} />
                        <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
                        <Area type="monotone" dataKey="kumuliert" stroke="hsl(var(--primary))" fill="url(#cf)" name="Kumulierter Cashflow" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button asChild variant="outline" size="sm"><a href="/foerderrechner">Förderung erhöhen</a></Button>
                    <Button asChild size="sm"><a href="/kostenrechner">Kosten kalkulieren <ArrowRight className="w-4 h-4 ml-1" /></a></Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <RelatedCalculators
            topics={['kosten', 'foerderung', 'vergleich', 'planung']}
            excludeIds={['roi-rechner']}
            className="mt-12 -mx-4"
          />
        </div>
      </main>
    </div>
  );
};

export default ROIRechnerPage;
