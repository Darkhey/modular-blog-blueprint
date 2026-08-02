import { useId, useMemo, useState } from 'react';
import CalculatorHero from '@/components/calculators/CalculatorHero';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import RelatedCalculators from '@/components/shared/RelatedCalculators';
import CalculatorFaqSection from '@/components/shared/CalculatorFaqSection';
import CalculatorHowToSection from '@/components/shared/CalculatorHowToSection';
import ShareResults from '@/components/shared/ShareResults';
import ResultsPDFExport from '@/components/shared/ResultsPDFExport';
import { useShareableInputs } from '@/hooks/useShareableInputs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { BEG_2026, REGIONALE_TOPUPS_2026 } from '@/data/energyPrices2026';
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
  { id: 'waermepumpe', label: 'W\u00e4rmepumpe', bafa: BEG_2026.heizungGrund, maxKosten: BEG_2026.heizungMaxKosten, isfpEligible: false, hint: 'Klimageschwindigkeits-Bonus +20 % bis 31.12.2028, Effizienzbonus +5 % f\u00fcr Sole/Wasser-WP, Einkommensbonus +30 % bei zvE \u2264 40.000 \u20ac.' },
  { id: 'biomasse', label: 'Biomasse-Heizung (Pellet)', bafa: 10, maxKosten: BEG_2026.heizungMaxKosten, isfpEligible: false, hint: 'Emissionsminderungs-Zuschlag 2.500 \u20ac bei Feinstaub < 2,5 mg/m\u00b3. Klimageschwindigkeits-Bonus nur beim Heizungstausch.' },
  { id: 'solarthermie', label: 'Solarthermie', bafa: BEG_2026.heizungGrund, maxKosten: BEG_2026.heizungMaxKosten, isfpEligible: false, hint: 'Kombinierbar mit Heizungstausch. Voller Grundzuschuss 30 %.' },
  { id: 'fenster', label: 'Fenster & Au\u00dfent\u00fcren', bafa: BEG_2026.huelleGrund, maxKosten: BEG_2026.huelleMaxKostenOhneIsfp, isfpEligible: true, hint: 'Uw \u2264 0,95 W/m\u00b2K (Fenster) bzw. \u2264 1,3 W/m\u00b2K (Haust\u00fcren). Mit iSFP: 20 % Zuschuss auf bis zu 60.000 \u20ac/WE.' },
  { id: 'daemmung', label: 'D\u00e4mmung H\u00fclle/Dach', bafa: BEG_2026.huelleGrund, maxKosten: BEG_2026.huelleMaxKostenOhneIsfp, isfpEligible: true, hint: 'Mindest-U-Werte nach BEG 2026 (Fassade 0,20 / Dach 0,14). Mit iSFP: 20 % auf 60.000 \u20ac Kostendeckel.' },
  { id: 'lueftung', label: 'L\u00fcftungsanlage mit WRG', bafa: BEG_2026.huelleGrund, maxKosten: BEG_2026.huelleMaxKostenOhneIsfp, isfpEligible: true, hint: 'W\u00e4rmer\u00fcckgewinnungsgrad \u2265 80 %. Zusammen mit D\u00e4mmung als Paket sinnvoll.' },
  { id: 'solar', label: 'Photovoltaik (KfW 270)', bafa: 0, maxKosten: 0, isfpEligible: false, hint: 'Kein Direktzuschuss \u2013 KfW-Kredit 270 mit zinsg\u00fcnstiger Finanzierung. Wirtschaftlichkeit \u00fcber 0 % MwSt., Einspeiseverg\u00fctung und Eigenverbrauch.' },
];

const BUNDESLAENDER = Object.keys(REGIONALE_TOPUPS_2026) as (keyof typeof REGIONALE_TOPUPS_2026)[];

const formatEuro = (n: number) =>
  n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

const FoerderrechnerPage = () => {
  const kostenId = useId();
  const [massnahme, setMassnahme] = useState<MassnahmeId>('waermepumpe');
  const [kosten, setKosten] = useState('25000');
  const [bundesland, setBundesland] = useState<string>('Bayern');
  const [klimaBonus, setKlimaBonus] = useState(true);
  const [effizienzBonus, setEffizienzBonus] = useState(false);
  const [einkommensBonus, setEinkommensBonus] = useState(false);
  const [isfp, setIsfp] = useState(false);
  const [selbstnutzer, setSelbstnutzer] = useState(true);

  const result = useMemo(() => {
    const m = MASSNAHMEN.find((x) => x.id === massnahme)!;
    const investition = Math.max(0, Number(kosten.replace(',', '.')) || 0);

    // Deckel h\u00e4ngt beim H\u00fcllensegment davon ab, ob iSFP vorliegt
    const isHuelle = ['fenster', 'daemmung', 'lueftung'].includes(m.id);
    const maxKosten = isHuelle
      ? (isfp ? BEG_2026.huelleMaxKostenMitIsfp : BEG_2026.huelleMaxKostenOhneIsfp)
      : m.maxKosten;
    const foerderfaehig = Math.min(investition, maxKosten || investition);

    let prozent = m.bafa;
    const isHeizung = ['waermepumpe', 'biomasse', 'solarthermie'].includes(m.id);

    if (isHeizung && selbstnutzer && klimaBonus) prozent += BEG_2026.klimaBonus; // +20
    if (m.id === 'waermepumpe' && effizienzBonus) prozent += BEG_2026.effizienzBonus; // +5
    if (isHeizung && selbstnutzer && einkommensBonus) prozent += BEG_2026.einkommensBonus; // +30

    if (isfp && m.isfpEligible) prozent += BEG_2026.isfpBonus; // +5 (nur H\u00fclle)

    // Deckel
    if (isHeizung) prozent = Math.min(prozent, BEG_2026.heizungMaxProzent);
    else if (isHuelle) prozent = Math.min(prozent, BEG_2026.huelleMaxProzent);
    else prozent = Math.min(prozent, 25);

    const bafaZuschuss = (foerderfaehig * prozent) / 100;
    const emZuschlag = m.id === 'biomasse' ? BEG_2026.biomasseEmZuschlag : 0;
    const regional = ((REGIONALE_TOPUPS_2026[bundesland] || 0) * foerderfaehig) / 100;
    const gesamt = bafaZuschuss + regional + emZuschlag;
    const eigen = Math.max(0, investition - gesamt);

    return { m, investition, foerderfaehig, prozent, bafaZuschuss, emZuschlag, regional, gesamt, eigen, isHeizung };
  }, [massnahme, kosten, bundesland, klimaBonus, effizienzBonus, einkommensBonus, isfp, selbstnutzer]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Förderrechner 2026 – BAFA, KfW & Boni kostenlos berechnen</title>
        <meta name="description" content="BAFA-Zuschuss, KfW-Förderung, iSFP-Bonus und regionale Programme für Ihre Sanierung in Sekunden online berechnen – aktuell 2026." />
        <link rel="canonical" href="https://sanierenundsparen.de/foerderrechner" />
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
      <main id="rechner" tabIndex={-1} className="scroll-mt-24">
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
                  <Select value={bundesland} onValueChange={(v) => setBundesland(v)}>
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
                  {result.isHeizung && (
                    <>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="klima">Klimageschwindigkeitsbonus (+20 %)</Label>
                        <Switch id="klima" checked={klimaBonus} onCheckedChange={setKlimaBonus} />
                      </div>
                      {massnahme === 'waermepumpe' && (
                        <div className="flex items-center justify-between">
                          <Label htmlFor="eff">Effizienzbonus Sole/Wasser (+5 %)</Label>
                          <Switch id="eff" checked={effizienzBonus} onCheckedChange={setEffizienzBonus} />
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <Label htmlFor="eink">Einkommensbonus (zvE ≤ 40.000 €/a, +30 %)</Label>
                        <Switch id="eink" checked={einkommensBonus} onCheckedChange={setEinkommensBonus} />
                      </div>
                    </>
                  )}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isfp">iSFP vorhanden (+5 %, nur Hülle)</Label>
                    <Switch id="isfp" checked={isfp} onCheckedChange={setIsfp} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" /> Geschätzte Förderung 2026
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
                  {result.emZuschlag > 0 && (
                    <div className="flex justify-between"><dt>Emissionsminderungs-Zuschlag</dt><dd>{formatEuro(result.emZuschlag)}</dd></div>
                  )}
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

          <CalculatorHowToSection howToKey="foerderrechner" url="https://sanierenundsparen.de/foerderrechner" />

          <CalculatorFaqSection
            faqKey="foerderrechner"
            calculatorType="foerder"
            title="Förderrechner 2026"
            description="BAFA, KfW, iSFP-Bonus und regionale Top-ups für Ihre Sanierung online berechnen."
            breadcrumbs={[
              { name: 'Start', url: 'https://sanierenundsparen.de/' },
              { name: 'Rechner & Tools', url: 'https://sanierenundsparen.de/rechner' },
              { name: 'Förderrechner', url: 'https://sanierenundsparen.de/foerderrechner' },
            ]}
          />

        </div>
      </main>
    </div>
  );
};

export default FoerderrechnerPage;
