import { useId, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CalculatorHero from '@/components/calculators/CalculatorHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import RelatedCalculators from '@/components/shared/RelatedCalculators';
import CalculatorFaqSection from '@/components/shared/CalculatorFaqSection';
import CalculatorHowToSection from '@/components/shared/CalculatorHowToSection';
import ShareResults from '@/components/shared/ShareResults';
import ResultsPDFExport from '@/components/shared/ResultsPDFExport';
import ScenarioToggle from '@/components/calculators/shared/ScenarioToggle';
import CO2PathToggle from '@/components/calculators/shared/CO2PathToggle';
import SensitivityPanel from '@/components/calculators/shared/SensitivityPanel';
import AssumptionsEditor from '@/components/calculators/shared/AssumptionsEditor';
import { useScenarioAssumptions } from '@/hooks/useScenarioAssumptions';
import { useShareableInputs } from '@/hooks/useShareableInputs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { TrendingUp, ArrowRight, Leaf } from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine,
} from 'recharts';
import { runScenario } from '@/lib/scenarioEngine';
import { DEFAULT_SCENARIO, PriceScenarioKey, PRICE_SCENARIOS } from '@/data/energyPrices2026';

type EnergietraegerId = 'gas' | 'oel' | 'strom' | 'pellets' | 'fernwaerme';

const TRAEGER_LABEL: Record<EnergietraegerId, string> = {
  gas: 'Gas',
  oel: 'Heizöl',
  strom: 'Strom (WP)',
  pellets: 'Pellets',
  fernwaerme: 'Fernwärme',
};

const toEngineFuel = (id: EnergietraegerId): 'gas' | 'oel' | 'pellets' | 'fernwaerme' | 'wpStrom' =>
  id === 'strom' ? 'wpStrom' : id;

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
  const [wartung, setWartung] = useState('250');
  const [lebensdauer, setLebensdauer] = useState([20]);
  const [priceScenario, setPriceScenario] = useState<PriceScenarioKey>(DEFAULT_SCENARIO);
  const [co2Path, setCo2Path] = useState(true);

  const data = useMemo(() => {
    const inv = Math.max(0, Number(investition) || 0);
    const f = Math.max(0, Number(foerderung) || 0);
    const eigen = Math.max(0, inv - f);
    const kwh = Math.max(0, Number(einsparungKwh) || 0);
    const wart = Math.max(0, Number(wartung) || 0);
    const years = lebensdauer[0];
    const fuel = toEngineFuel(traeger);

    const baseInput = {
      investition: eigen,
      energieVorherKwh: kwh,
      energieNachherKwh: 0,
      brennstoffVorher: fuel,
      brennstoffNachher: fuel,
      wartungProJahr: wart,
      jahre: years,
    };

    // ROI-Modell: die gesparten kWh im "alten" Energieträger sind das Ersparnis-Delta.
    const result = runScenario(baseInput, priceScenario, { includeCo2Path: co2Path });

    const rows = result.jahre.map((r, i) => ({
      jahr: i + 1,
      kumuliert: Math.round(r.kumuliert),
      jaehrlich: Math.round(r.ersparnis),
    }));

    return {
      eigen,
      rows,
      baseInput,
      investBrutto: inv,
      foerderung: f,
      breakEven: result.amortisationJahre ? Math.ceil(result.amortisationJahre) : null,
      netto: Math.round(result.gesamtErsparnis - eigen),
      irr: result.irrApprox,
      totalCo2: result.co2VermeidungTonnen,
      inputs: {
        investition: inv,
        foerderung: f,
        einsparungKwh: kwh,
        traeger: TRAEGER_LABEL[traeger],
        wartung: wart,
        jahre: years,
        szenario: PRICE_SCENARIOS[priceScenario].label,
        co2Pfad: co2Path ? 'aktiv (ETS-2)' : 'aus',
      },
    };
  }, [investition, foerderung, einsparungKwh, traeger, wartung, lebensdauer, priceScenario, co2Path]);

  // Eingaben teilbar machen (URL-Parameter) und aus geteilten Links wiederherstellen
  useShareableInputs({
    values: {
      investition,
      foerderung,
      einsparungKwh,
      traeger,
      wartung,
      lebensdauer: lebensdauer[0],
      szenario: priceScenario,
      co2: co2Path,
    },
    onRestore: (r) => {
      if (r.investition != null) setInvestition(String(r.investition));
      if (r.foerderung != null) setFoerderung(String(r.foerderung));
      if (r.einsparungKwh != null) setEinsparungKwh(String(r.einsparungKwh));
      if (typeof r.traeger === 'string' && r.traeger in TRAEGER_LABEL) setTraeger(r.traeger as EnergietraegerId);
      if (r.wartung != null) setWartung(String(r.wartung));
      if (r.lebensdauer != null) setLebensdauer([Number(r.lebensdauer)]);
      if (typeof r.szenario === 'string' && r.szenario in PRICE_SCENARIOS) setPriceScenario(r.szenario as PriceScenarioKey);
      if (typeof r.co2 === 'boolean') setCo2Path(r.co2);
    },
  });


  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>ROI-Rechner Sanierung 2026 – Amortisation & Cashflow kostenlos</title>
        <meta name="description" content="Wann rechnet sich Ihre Sanierung? Amortisation, Cashflow über 20 Jahre, IRR und CO₂-Ersparnis – mit Preis-Szenarien und CO₂-Preis-Pfad." />
        <link rel="canonical" href="https://sanierenundsparen.de/roi-rechner" />
      </Helmet>
      <CalculatorHero
        icon={TrendingUp}
        title="Wann rechnet sich deine Sanierung?"
        subtitle="Cashflow, Amortisation, IRR und CO₂-Ersparnis – mit Preis-Szenarien und CO₂-Pfad ab 2027 (ETS-2)."
        gradient="from-fuchsia-500 to-pink-500"
        breadcrumbs={[
          { label: 'Rechner', to: '/rechner' },
          { label: 'Amortisations-Rechner' },
        ]}
      />
      <main id="rechner" tabIndex={-1} className="scroll-mt-24">
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
                      {(Object.keys(TRAEGER_LABEL) as EnergietraegerId[]).map((k) => (
                        <SelectItem key={k} value={k}>{TRAEGER_LABEL[k]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Preisniveau nach Szenario „{PRICE_SCENARIOS[priceScenario].label}".
                  </p>
                </div>
                <div>
                  <Label htmlFor={wartungId}>Wartung (EUR/Jahr)</Label>
                  <Input id={wartungId} type="number" value={wartung} onChange={(e) => setWartung(e.target.value)} />
                </div>
                <div>
                  <Label>Betrachtungszeitraum: {lebensdauer[0]} Jahre</Label>
                  <Slider value={lebensdauer} onValueChange={setLebensdauer} min={5} max={30} step={1} />
                </div>

                <div className="pt-2 border-t space-y-3">
                  <ScenarioToggle value={priceScenario} onChange={setPriceScenario} />
                  <CO2PathToggle enabled={co2Path} onChange={setCo2Path} />
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
                    {data.irr !== null && (
                      <div className="text-xs text-muted-foreground mt-0.5">IRR ≈ {(data.irr * 100).toFixed(1)} %</div>
                    )}
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

              <div className="grid sm:grid-cols-2 gap-3">
                <ShareResults calculatorType="roi" results={data} inputs={data.inputs} />
                <ResultsPDFExport calculatorType="roi" results={data} />
              </div>
            </div>
          </div>

          <SensitivityPanel
            baseInput={data.baseInput}
            activeScenario={priceScenario}
            activeCo2={co2Path}
            investBrutto={data.investBrutto}
            fundingBreakdown={[
              { label: 'Zuschuss / Förderung', amount: data.foerderung, hint: 'Aus dem Förderrechner übernehmbar – reduziert direkt den Eigenanteil.' },
            ]}
            className="mt-8"
          />

          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="methodik">
              <AccordionTrigger className="text-base font-semibold">Wie wird gerechnet?</AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                <pre className="bg-muted/50 rounded p-3 text-xs text-foreground whitespace-pre-wrap font-mono">
Eigenanteil   = Investition − Förderung
Ersparnis(t)  = eingesparte kWh × Energiepreis(t) − Wartung
Cashflow(t)   = Summe Ersparnis bis Jahr t − Eigenanteil
Amortisation  = erstes Jahr mit Cashflow ≥ 0
                </pre>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Energiepreis(t):</strong> Startpreis 2026 mit jährlicher Steigerung je nach Szenario (optimistisch / realistisch / vorsichtig).</li>
                  <li><strong>CO₂-Pfad:</strong> Ab 2027 wird der ETS-2-Preisaufschlag auf fossile Energieträger aufgeschlagen.</li>
                  <li><strong>IRR:</strong> Näherung der internen Verzinsung über den gewählten Betrachtungszeitraum.</li>
                  <li>Preissteigerungen bei Wartung sowie Reparaturen sind nicht enthalten.</li>
                </ul>
                <p className="text-xs">Unverbindliche Schätzung – verbindliche Zahlen liefert eine Energieberatung.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>


          <RelatedCalculators
            topics={['kosten', 'foerderung', 'vergleich', 'planung']}
            excludeIds={['roi-rechner']}
            className="mt-12 -mx-4"
          />

          <CalculatorHowToSection howToKey="roi-rechner" url="https://sanierenundsparen.de/roi-rechner" />

          <CalculatorFaqSection
            faqKey="roi-rechner"
            calculatorType="roi"
            title="ROI-Rechner Sanierung 2026"
            description="Amortisation, Cashflow und IRR Ihrer Sanierung über bis zu 30 Jahre – inklusive Preis-Szenarien und CO₂-Pfad."
            breadcrumbs={[
              { name: 'Start', url: 'https://sanierenundsparen.de/' },
              { name: 'Rechner & Tools', url: 'https://sanierenundsparen.de/rechner' },
              { name: 'Amortisations-Rechner', url: 'https://sanierenundsparen.de/roi-rechner' },
            ]}
          />
        </div>
      </main>
    </div>
  );
};

export default ROIRechnerPage;
