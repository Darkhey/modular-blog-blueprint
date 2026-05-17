import { useId, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';
import RelatedCalculators from '@/components/shared/RelatedCalculators';
import { Euro, ArrowRight, Sparkles } from 'lucide-react';

type MassnahmeId =
  | 'waermepumpe'
  | 'biomasse'
  | 'solarthermie'
  | 'fenster'
  | 'daemmung'
  | 'lueftung'
  | 'solar';

interface Massnahme {
  id: MassnahmeId;
  label: string;
  /** BAFA-/KfW-Grundförderung in % der förderfähigen Kosten */
  bafa: number;
  /** Maximale förderfähige Kosten (EUR) */
  maxKosten: number;
  /** iSFP-Bonus möglich? */
  isfpEligible: boolean;
  /** Kategorie für Hinweise */
  hint: string;
}

const MASSNAHMEN: Massnahme[] = [
  { id: 'waermepumpe', label: 'Wärmepumpe', bafa: 30, maxKosten: 30000, isfpEligible: true, hint: 'Klima-Geschwindigkeits-Bonus +20 %, Einkommens-Bonus +30 % möglich.' },
  { id: 'biomasse', label: 'Biomasse-Heizung (Pellet)', bafa: 10, maxKosten: 30000, isfpEligible: true, hint: 'Emissionsminderungs-Zuschlag bei Feinstaubgrenzwert.' },
  { id: 'solarthermie', label: 'Solarthermie', bafa: 30, maxKosten: 30000, isfpEligible: true, hint: 'Kombinierbar mit Heizungstausch.' },
  { id: 'fenster', label: 'Fenster & Außentüren', bafa: 15, maxKosten: 30000, isfpEligible: true, hint: 'Uw ≤ 0,95 W/m²K erforderlich.' },
  { id: 'daemmung', label: 'Dämmung Hülle/Dach', bafa: 15, maxKosten: 30000, isfpEligible: true, hint: 'Mindest-U-Werte nach BEG.' },
  { id: 'lueftung', label: 'Lüftungsanlage mit WRG', bafa: 15, maxKosten: 30000, isfpEligible: true, hint: 'Wärmerückgewinnungsgrad ≥ 80 %.' },
  { id: 'solar', label: 'Photovoltaik (KfW 270)', bafa: 0, maxKosten: 0, isfpEligible: false, hint: 'Kein Direktzuschuss – KfW-Kredit 270 mit zinsgünstiger Finanzierung.' },
];

const BUNDESLAENDER = [
  'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg',
  'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen',
  'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen',
] as const;

/** Grobe regionale Top-up-Schätzung in % auf förderfähige Kosten */
const REGIONAL_BONUS: Record<string, number> = {
  Bayern: 5, 'Baden-Württemberg': 5, Hessen: 4, 'Nordrhein-Westfalen': 4,
  Berlin: 6, Hamburg: 6, Bremen: 5,
};

const formatEuro = (n: number) =>
  n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

const FoerderrechnerPage = () => {
  const kostenId = useId();
  const [massnahme, setMassnahme] = useState<MassnahmeId>('waermepumpe');
  const [kosten, setKosten] = useState('25000');
  const [bundesland, setBundesland] = useState<typeof BUNDESLAENDER[number]>('Bayern');
  const [klimaBonus, setKlimaBonus] = useState(true);
  const [einkommensBonus, setEinkommensBonus] = useState(false);
  const [isfp, setIsfp] = useState(false);
  const [selbstnutzer, setSelbstnutzer] = useState(true);

  const result = useMemo(() => {
    const m = MASSNAHMEN.find((x) => x.id === massnahme)!;
    const investition = Math.max(0, Number(kosten.replace(',', '.')) || 0);
    const foerderfaehig = Math.min(investition, m.maxKosten || investition);

    let prozent = m.bafa;
    if (m.id === 'waermepumpe') {
      if (klimaBonus) prozent += 5; // Effizienzbonus für effiziente Wärmequelle (vereinfacht)
      if (selbstnutzer && klimaBonus) prozent += 20; // Klima-Geschwindigkeits-Bonus
      if (selbstnutzer && einkommensBonus) prozent += 30; // Einkommensbonus (≤ 40k €)
    } else if (m.id === 'biomasse' && selbstnutzer && klimaBonus) {
      prozent += 20;
    }

    if (isfp && m.isfpEligible && m.id !== 'waermepumpe') {
      prozent += 5; // iSFP-Bonus nur für Hülle, nicht Heizung-WP
    }

    // Deckel: BEG-Anlage max ca. 70 % für Heizung
    if (['waermepumpe', 'biomasse', 'solarthermie'].includes(m.id)) prozent = Math.min(prozent, 70);
    else prozent = Math.min(prozent, 25);

    const bafaZuschuss = (foerderfaehig * prozent) / 100;
    const regional = ((REGIONAL_BONUS[bundesland] || 0) * foerderfaehig) / 100;
    const gesamt = bafaZuschuss + regional;
    const eigen = Math.max(0, investition - gesamt);

    return { m, investition, foerderfaehig, prozent, bafaZuschuss, regional, gesamt, eigen };
  }, [massnahme, kosten, bundesland, klimaBonus, einkommensBonus, isfp, selbstnutzer]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Förderrechner 2026: BAFA, KfW & Boni berechnen</title>
        <meta name="description" content="Berechne BAFA-Zuschuss, KfW-Förderung, iSFP-Bonus und regionale Programme für deine Sanierung – aktuell für 2026." />
        <link rel="canonical" href="https://sanieren-sparen.de/foerderrechner" />
      </Helmet>
      <CalculatorHero
        icon={Euro}
        title="Förderrechner: BAFA, KfW & Boni kombinieren"
        subtitle="Schätze deinen Zuschuss aus Bundes- und Landesprogrammen in unter einer Minute. Werte sind Richtwerte gemäß BEG-EM und können je nach Antrag abweichen."
        gradient="from-emerald-600 to-green-500"
        breadcrumbs={[
          { label: 'Rechner', to: '/rechner' },
          { label: 'Förderrechner' },
        ]}
      />
      <main>
        <div className="container max-w-4xl mx-auto px-4 py-8">

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Deine Eingaben</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label>Maßnahme</Label>
                  <Select value={massnahme} onValueChange={(v) => setMassnahme(v as MassnahmeId)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {MASSNAHMEN.map((m) => (
                        <SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={kostenId}>Investitionskosten (EUR)</Label>
                  <Input id={kostenId} type="number" min={0} value={kosten} onChange={(e) => setKosten(e.target.value)} />
                </div>
                <div>
                  <Label>Bundesland</Label>
                  <Select value={bundesland} onValueChange={(v) => setBundesland(v as typeof BUNDESLAENDER[number])}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {BUNDESLAENDER.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3 pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="selbst">Selbstnutzer (Wohneigentum)</Label>
                    <Switch id="selbst" checked={selbstnutzer} onCheckedChange={setSelbstnutzer} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="klima">Klimageschwindigkeitsbonus</Label>
                    <Switch id="klima" checked={klimaBonus} onCheckedChange={setKlimaBonus} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="eink">Einkommensbonus (≤ 40.000 €/a)</Label>
                    <Switch id="eink" checked={einkommensBonus} onCheckedChange={setEinkommensBonus} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isfp">iSFP vorhanden (+5 %)</Label>
                    <Switch id="isfp" checked={isfp} onCheckedChange={setIsfp} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" /> Geschätzte Förderung
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                  <div className="text-sm text-muted-foreground mb-1">Gesamter Zuschuss</div>
                  <div className="text-4xl font-bold text-emerald-600">{formatEuro(result.gesamt)}</div>
                  <div className="text-sm text-muted-foreground mt-2">≙ {result.prozent}% der förderfähigen Kosten</div>
                </div>
                <dl className="text-sm space-y-2">
                  <div className="flex justify-between"><dt>Investition</dt><dd className="font-medium">{formatEuro(result.investition)}</dd></div>
                  <div className="flex justify-between"><dt>Förderfähig (Deckel)</dt><dd>{formatEuro(result.foerderfaehig)}</dd></div>
                  <div className="flex justify-between"><dt>BAFA / KfW Zuschuss</dt><dd>{formatEuro(result.bafaZuschuss)}</dd></div>
                  <div className="flex justify-between"><dt>Regional ({bundesland})</dt><dd>{formatEuro(result.regional)}</dd></div>
                  <div className="flex justify-between border-t pt-2"><dt className="font-semibold">Eigenanteil</dt><dd className="font-semibold">{formatEuro(result.eigen)}</dd></div>
                </dl>
                <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                  <strong>Hinweis:</strong> {result.m.hint}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button asChild variant="outline" size="sm"><a href="/foerdermittel"><Euro className="w-4 h-4 mr-1" /> Programme</a></Button>
                  <Button asChild size="sm"><a href="/roi-rechner">Wann rechnet's sich? <ArrowRight className="w-4 h-4 ml-1" /></a></Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <RelatedCalculators
            topics={['foerderung', 'kosten', 'heizung', 'modernisierung']}
            excludeIds={['foerderrechner']}
            className="mt-12 -mx-4"
          />
        </div>
      </main>
    </div>
  );
};

export default FoerderrechnerPage;
