import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CalculatorHero from '@/components/calculators/CalculatorHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ScenarioToggle from '@/components/calculators/shared/ScenarioToggle';
import CO2PathToggle from '@/components/calculators/shared/CO2PathToggle';
import RelatedCalculators from '@/components/shared/RelatedCalculators';
import CalculatorFaqSection from '@/components/shared/CalculatorFaqSection';
import CalculatorHowToSection from '@/components/shared/CalculatorHowToSection';
import {
  BEG_2026,
  REGIONALE_TOPUPS_2026,
  HANDWERKERPREISE_2026,
  PRICE_SCENARIOS,
  PriceScenarioKey,
  DEFAULT_SCENARIO,
} from '@/data/energyPrices2026';
import { runScenario } from '@/lib/scenarioEngine';
import { Layers, Info, TrendingUp, Leaf, Euro, Wallet, Timer } from 'lucide-react';

type FuelKey = 'gas' | 'oel' | 'pellets' | 'fernwaerme';

// Typische Endenergie-Kennwerte (kWh/m²·a) je Baujahr-Klasse
const KENNWERT_KWH_M2: Record<string, number> = {
  vor1978: 220,
  '1978-1994': 170,
  '1995-2001': 130,
  '2002-2015': 95,
  nach2015: 65,
};

interface HuelleMassnahme {
  id: 'fassade' | 'dach' | 'kellerdecke' | 'fenster';
  label: string;
  /** Faktor der Heizbedarfsreduktion (relativ zum Gesamt-Bedarf, isoliert) */
  einsparAnteil: number;
  /** Kosten-Kalkulation */
  kostenProM2?: number;
  bezugsFlaecheFaktor: number; // Anteil Wohnfläche
  fixKostenProM2Wohn?: number; // bei Fenster: pauschal je m² Wohn
}

const HUELLE: HuelleMassnahme[] = [
  { id: 'fassade', label: 'Fassadendämmung (WDVS)', einsparAnteil: 0.22, kostenProM2: 190, bezugsFlaecheFaktor: 1.2 },
  { id: 'dach', label: 'Dach-/Obergeschossdämmung', einsparAnteil: 0.18, kostenProM2: 145, bezugsFlaecheFaktor: 0.9 },
  { id: 'kellerdecke', label: 'Kellerdecken-Dämmung', einsparAnteil: 0.08, kostenProM2: 55, bezugsFlaecheFaktor: 0.9 },
  { id: 'fenster', label: 'Fenster & Außentüren (3-fach)', einsparAnteil: 0.12, bezugsFlaecheFaktor: 0.18, kostenProM2: 5500 /* €/m² Fensterfläche */ },
];

const formatEuro = (n: number) =>
  n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

const KombiRechnerPage = () => {
  const [flaeche, setFlaeche] = useState('140');
  const [baujahr, setBaujahr] = useState<keyof typeof KENNWERT_KWH_M2>('1978-1994');
  const [aktBrennstoff, setAktBrennstoff] = useState<FuelKey>('gas');
  const [bundesland, setBundesland] = useState<string>('Bayern');

  const [selected, setSelected] = useState<Record<string, boolean>>({
    fassade: true,
    dach: true,
    kellerdecke: false,
    fenster: false,
    waermepumpe: true,
  });

  const [isfp, setIsfp] = useState(true);
  const [klimaBonus, setKlimaBonus] = useState(true);
  const [einkommensBonus, setEinkommensBonus] = useState(false);
  const [effizienzBonus, setEffizienzBonus] = useState(false);

  const [scenario, setScenario] = useState<PriceScenarioKey>(DEFAULT_SCENARIO);
  const [co2Path, setCo2Path] = useState(true);

  const toggle = (id: string) => setSelected((s) => ({ ...s, [id]: !s[id] }));

  const result = useMemo(() => {
    const flz = Math.max(30, Number(flaeche) || 0);
    const kennwert = KENNWERT_KWH_M2[baujahr];
    const energieVorher = flz * kennwert; // kWh/a

    // 1) Kombinierte Hüllen-Einsparung (multiplikativ, damit nicht > 100 %)
    const aktiveHuelle = HUELLE.filter((h) => selected[h.id]);
    const restFaktor = aktiveHuelle.reduce((acc, h) => acc * (1 - h.einsparAnteil), 1);
    const huelleEinsparAnteil = 1 - restFaktor; // 0…1

    // 2) Hüllen-Kosten
    const huelleKosten = aktiveHuelle.reduce((sum, h) => {
      const flaecheM2 = flz * h.bezugsFlaecheFaktor;
      const einheit = h.kostenProM2 ?? 0;
      // Fenster: kostenProM2 ist bereits €/m² Fensterfläche
      return sum + flaecheM2 * (h.id === 'fenster' ? einheit / 30 /* Grobskala Wohn→Fenster kein doppelt */ : einheit);
    }, 0);
    // (Fenster-Zeile: der /30-Fudge entspricht historischer Kalkulation nicht sauber -> wir rechnen sauber je Zeile:)
    const huelleKostenSauber = aktiveHuelle.reduce((sum, h) => {
      if (h.id === 'fenster') {
        // Fensterfläche ~ 18 % der Wohnfläche, Preis ~ 900 €/m² Fenster
        return sum + flz * 0.18 * 900;
      }
      return sum + flz * h.bezugsFlaecheFaktor * (h.kostenProM2 ?? 0);
    }, 0);

    // 3) Wärmepumpe – Kosten & Wechselwirkung
    const wpAktiv = selected.waermepumpe;
    // Skaleneffekt: kleinere WP bei stark gedämmter Hülle
    const wpBasisKosten =
      (HANDWERKERPREISE_2026.waermepumpe.min + HANDWERKERPREISE_2026.waermepumpe.max) / 2;
    const wpKosten = wpAktiv
      ? wpBasisKosten * (1 - Math.min(0.18, huelleEinsparAnteil * 0.35))
      : 0;

    // 4) Neuer Endenergiebedarf nach Hülle
    const energieNachHuelle = energieVorher * restFaktor;

    // 5) Neuer Brennstoff/Bedarf nach Heizungstausch
    const jaz = 3.5;
    const energieNachher = wpAktiv ? energieNachHuelle / jaz : energieNachHuelle;
    const brennstoffNachher: 'wpStrom' | FuelKey = wpAktiv ? 'wpStrom' : aktBrennstoff;

    // 6) Cashflow via Scenario Engine
    const investBrutto = huelleKostenSauber + wpKosten;

    // ---- Förderlogik ----
    // Hülle: BAFA-Einzelmaßnahme, 15 % (+5 % mit iSFP), Deckel 30k / 60k mit iSFP
    const huelleDeckel = isfp ? BEG_2026.huelleMaxKostenMitIsfp : BEG_2026.huelleMaxKostenOhneIsfp;
    const huelleFaehig = Math.min(huelleKostenSauber, huelleDeckel);
    const huelleProz = (BEG_2026.huelleGrund + (isfp ? BEG_2026.isfpBonus : 0)) / 100;
    const huelleZuschuss = aktiveHuelle.length > 0 ? huelleFaehig * huelleProz : 0;

    // Heizung: KfW-458, 30 % Grund + Boni bis 70 %, Deckel 30k
    const heizungProz = wpAktiv
      ? Math.min(
          BEG_2026.heizungMaxProzent / 100,
          (BEG_2026.heizungGrund +
            (klimaBonus ? BEG_2026.klimaBonus : 0) +
            (effizienzBonus ? BEG_2026.effizienzBonus : 0) +
            (einkommensBonus ? BEG_2026.einkommensBonus : 0)) /
            100,
        )
      : 0;
    const heizungFaehig = Math.min(wpKosten, BEG_2026.heizungMaxKosten);
    const heizungZuschuss = wpAktiv ? heizungFaehig * heizungProz : 0;

    // Regionaler Top-up (Prozent des Zuschusses, grobe Größenordnung)
    const topupProz = (REGIONALE_TOPUPS_2026[bundesland] ?? 0) / 100;
    const regionalTopup = (huelleZuschuss + heizungZuschuss) * topupProz;

    const foerderungGesamt = huelleZuschuss + heizungZuschuss + regionalTopup;
    const netto = Math.max(0, investBrutto - foerderungGesamt);

    // Deckel-Warnungen
    const deckelWarnungen: string[] = [];
    if (huelleKostenSauber > huelleDeckel && aktiveHuelle.length > 0) {
      deckelWarnungen.push(
        `Hülle-Kosten (${formatEuro(huelleKostenSauber)}) übersteigen den ${
          isfp ? 'iSFP-' : ''
        }Deckel von ${formatEuro(huelleDeckel)} – Überschuss ist nicht förderfähig.`,
      );
    }
    if (wpKosten > BEG_2026.heizungMaxKosten) {
      deckelWarnungen.push(
        `Heizungs-Kosten (${formatEuro(wpKosten)}) übersteigen den Deckel ${formatEuro(BEG_2026.heizungMaxKosten)} – nur der Anteil bis Deckel ist gefördert.`,
      );
    }

    const sc = runScenario(
      {
        investition: netto,
        energieVorherKwh: energieVorher,
        energieNachherKwh: energieNachher,
        brennstoffVorher: aktBrennstoff,
        brennstoffNachher: brennstoffNachher,
        wartungProJahr: wpAktiv ? 250 : 120,
        jahre: 20,
      },
      scenario,
      { includeCo2Path: co2Path },
    );

    // Vergleich Einzel-Summe (naiv addiert) vs. Kombi
    const naiveSummeEinspar =
      aktiveHuelle.reduce((s, h) => s + h.einsparAnteil, 0) + (wpAktiv ? 0.6 : 0);

    return {
      energieVorher,
      energieNachher,
      huelleEinsparAnteil,
      investBrutto,
      huelleKostenSauber,
      wpKosten,
      huelleZuschuss,
      heizungZuschuss,
      regionalTopup,
      foerderungGesamt,
      netto,
      deckelWarnungen,
      scenario: sc,
      naiveSummeEinspar,
      brennstoffNachher,
    };
  }, [
    flaeche,
    baujahr,
    aktBrennstoff,
    bundesland,
    selected,
    isfp,
    klimaBonus,
    einkommensBonus,
    effizienzBonus,
    scenario,
    co2Path,
  ]);

  const ersparnisJahr1 = result.scenario.jahre[0]?.ersparnis ?? 0;

  return (
    <>
      <Helmet>
        <title>Kombi-Rechner: Heizung + Hülle gemeinsam simulieren | Sanieren & Sparen</title>
        <meta
          name="description"
          content="Kombinieren Sie Dämmung, Fenster und Wärmepumpe in einer Berechnung. Konsolidierte BAFA-/KfW-Förderung 2026 inkl. Deckel, iSFP- und Klimabonus."
        />
        <link rel="canonical" href="https://sanieren-sparen.de/rechner/kombi" />
      </Helmet>

      <CalculatorHero
        icon={Layers}
        title="Kombi-Rechner"
        subtitle="Heizung und Gebäudehülle in einer Simulation – mit Wechselwirkungen, konsolidierter Förderung und Deckel-Logik."
        gradient="from-teal-500 to-emerald-500"
        breadcrumbs={[
          { label: 'Start', to: '/' },
          { label: 'Rechner', to: '/rechner' },
          { label: 'Kombi-Rechner' },
        ]}
      />

      <div id="rechner" tabIndex={-1} className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-[1fr_1.1fr] gap-6">
        {/* Inputs */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Gebäude & Ist-Zustand</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="flaeche">Wohnfläche (m²)</Label>
                  <Input id="flaeche" type="number" value={flaeche} onChange={(e) => setFlaeche(e.target.value)} />
                </div>
                <div>
                  <Label>Baujahr</Label>
                  <Select value={baujahr} onValueChange={(v) => setBaujahr(v as keyof typeof KENNWERT_KWH_M2)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vor1978">vor 1978 (220 kWh/m²)</SelectItem>
                      <SelectItem value="1978-1994">1978–1994 (170)</SelectItem>
                      <SelectItem value="1995-2001">1995–2001 (130)</SelectItem>
                      <SelectItem value="2002-2015">2002–2015 (95)</SelectItem>
                      <SelectItem value="nach2015">nach 2015 (65)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Aktueller Brennstoff</Label>
                  <Select value={aktBrennstoff} onValueChange={(v) => setAktBrennstoff(v as FuelKey)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gas">Gas</SelectItem>
                      <SelectItem value="oel">Öl</SelectItem>
                      <SelectItem value="pellets">Pellets</SelectItem>
                      <SelectItem value="fernwaerme">Fernwärme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Bundesland</Label>
                  <Select value={bundesland} onValueChange={setBundesland}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.keys(REGIONALE_TOPUPS_2026).map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Maßnahmen-Paket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                Wechselwirkung: Bei stark gedämmter Hülle wird die Wärmepumpe automatisch kleiner dimensioniert (bis −18 % Investition).
              </p>
              {HUELLE.map((h) => (
                <label key={h.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer">
                  <Checkbox checked={!!selected[h.id]} onCheckedChange={() => toggle(h.id)} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{h.label}</div>
                    <div className="text-xs text-muted-foreground">−{Math.round(h.einsparAnteil * 100)} % Heizbedarf (isoliert)</div>
                  </div>
                </label>
              ))}
              <Separator />
              <label className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer">
                <Checkbox checked={!!selected.waermepumpe} onCheckedChange={() => toggle('waermepumpe')} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">Wärmepumpe (statt aktueller Heizung)</div>
                  <div className="text-xs text-muted-foreground">JAZ 3,5 · WP-Sondertarif · KfW-458-förderfähig</div>
                </div>
              </label>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Förder-Optionen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <Label htmlFor="isfp">iSFP-Sanierungsfahrplan liegt vor</Label>
                <Switch id="isfp" checked={isfp} onCheckedChange={setIsfp} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="kb">Klimageschwindigkeits-Bonus (+20 %)</Label>
                <Switch id="kb" checked={klimaBonus} onCheckedChange={setKlimaBonus} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="ef">Effizienzbonus Sole/Wasser-WP (+5 %)</Label>
                <Switch id="ef" checked={effizienzBonus} onCheckedChange={setEffizienzBonus} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="ek">Einkommensbonus zvE ≤ 40.000 € (+30 %)</Label>
                <Switch id="ek" checked={einkommensBonus} onCheckedChange={setEinkommensBonus} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preis-Annahmen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScenarioToggle value={scenario} onChange={setScenario} />
              <CO2PathToggle enabled={co2Path} onChange={setCo2Path} />
              <p className="text-xs text-muted-foreground">
                Aktuelle Preise ({PRICE_SCENARIOS[scenario].label}): Gas {PRICE_SCENARIOS[scenario].gas.toFixed(2)} €/kWh · WP-Strom {PRICE_SCENARIOS[scenario].wpStrom.toFixed(2)} €/kWh · Steigerung {(PRICE_SCENARIOS[scenario].jaehrlicheSteigerung * 100).toFixed(1)} %/a
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <Card className="border-primary/30 bg-gradient-to-br from-emerald-50/60 via-background to-teal-50/40 dark:from-emerald-950/20 dark:to-teal-950/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
                Kombi-Ergebnis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Kpi icon={Wallet} label="Investition brutto" value={formatEuro(result.investBrutto)} />
                <Kpi icon={Euro} label="Konsolidierte Förderung" value={formatEuro(result.foerderungGesamt)} accent />
                <Kpi icon={Wallet} label="Eigenanteil" value={formatEuro(result.netto)} />
                <Kpi
                  icon={Timer}
                  label="Amortisation"
                  value={
                    result.scenario.amortisationJahre != null
                      ? `${result.scenario.amortisationJahre.toFixed(1)} Jahre`
                      : '> 20 Jahre'
                  }
                />
                <Kpi icon={TrendingUp} label="Ersparnis Jahr 1" value={formatEuro(ersparnisJahr1)} />
                <Kpi
                  icon={Leaf}
                  label="CO₂-Vermeidung (20 J.)"
                  value={`${result.scenario.co2VermeidungTonnen.toFixed(1)} t`}
                />
              </div>

              <Separator />

              <div className="text-sm space-y-2">
                <Row label="Endenergie vorher" value={`${Math.round(result.energieVorher).toLocaleString('de-DE')} kWh/a`} />
                <Row
                  label="Endenergie nachher"
                  value={`${Math.round(result.energieNachher).toLocaleString('de-DE')} kWh/a (${result.brennstoffNachher === 'wpStrom' ? 'WP-Strom' : result.brennstoffNachher})`}
                />
                <Row label="Hüllen-Einsparung (kombiniert)" value={`−${Math.round(result.huelleEinsparAnteil * 100)} %`} />
              </div>

              {result.deckelWarnungen.length > 0 && (
                <div className="rounded-md border border-amber-400/50 bg-amber-50 dark:bg-amber-950/30 p-3 text-xs space-y-1">
                  {result.deckelWarnungen.map((w, i) => (
                    <div key={i} className="text-amber-800 dark:text-amber-200">⚠ {w}</div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Förder-Aufschlüsselung 2026</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Row
                label={`Hülle-Zuschuss (${isfp ? '20 %' : '15 %'}, Deckel ${formatEuro(isfp ? BEG_2026.huelleMaxKostenMitIsfp : BEG_2026.huelleMaxKostenOhneIsfp)})`}
                value={formatEuro(result.huelleZuschuss)}
              />
              <Row
                label={`Heizungs-Zuschuss (KfW 458, max ${BEG_2026.heizungMaxProzent} %)`}
                value={formatEuro(result.heizungZuschuss)}
              />
              <Row
                label={`Regionaler Top-up ${bundesland} (+${REGIONALE_TOPUPS_2026[bundesland] ?? 0} %)`}
                value={formatEuro(result.regionalTopup)}
              />
              <Separator />
              <Row label="Summe Förderung" value={formatEuro(result.foerderungGesamt)} bold />
              <p className="text-xs text-muted-foreground pt-2">
                Hinweis: Hüllen- und Heizungs-Deckel werden getrennt geprüft. Der Klima-, Einkommens- und Effizienzbonus greifen nur auf die Heizung.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Kombi vs. Einzel-Summe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                Naiv addiert würden die gewählten Maßnahmen {Math.round(result.naiveSummeEinspar * 100)} % Einsparung ergeben. Tatsächlich (multiplikativ und mit WP-Faktor) sind es realistisch {Math.round(result.huelleEinsparAnteil * 100)} % Hüllen-Einsparung – der Rest kommt über die effizientere Wärmequelle.
              </p>
              <p className="text-muted-foreground">
                Empfohlene Reihenfolge: <strong className="text-foreground">Hülle vor Technik</strong>. So kann die Wärmepumpe kleiner ausgelegt werden ({formatEuro((HANDWERKERPREISE_2026.waermepumpe.min + HANDWERKERPREISE_2026.waermepumpe.max) / 2 - result.wpKosten)} weniger Invest bei aktueller Auswahl).
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <CalculatorHowToSection howToKey="kombi-rechner" url="https://sanieren-sparen.de/rechner/kombi" />
        <CalculatorFaqSection
          faqKey="kombi-rechner"
          calculatorType="vergleich"
          title="Kombi-Rechner Heizung + Hülle"
          description="Simulieren Sie Dämmung und Wärmepumpe gemeinsam mit konsolidierter Förderung, Deckel- und Bonus-Logik nach BEG 2026."
          path="rechner/kombi"
        />
      </div>

      <RelatedCalculators
        topics={['heizung', 'daemmung', 'foerderung', 'kombination', 'waermepumpe']}
        excludeIds={['rechner-vergleich']}
      />
    </>
  );
};

const Kpi = ({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
  accent?: boolean;
}) => (
  <div className={`rounded-lg border p-3 ${accent ? 'border-primary/40 bg-primary/5' : 'bg-background'}`}>
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </div>
    <div className="text-lg font-bold text-foreground mt-0.5">{value}</div>
  </div>
);

const Row = ({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) => (
  <div className="flex items-center justify-between">
    <span className={bold ? 'font-semibold' : 'text-muted-foreground'}>{label}</span>
    <span className={bold ? 'font-bold text-foreground' : 'font-medium text-foreground'}>{value}</span>
  </div>
);

export default KombiRechnerPage;
