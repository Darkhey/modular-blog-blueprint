import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Activity, TrendingDown, TrendingUp, Leaf, Euro } from 'lucide-react';
import { PRICE_SCENARIOS, PriceScenarioKey, getCO2Price } from '@/data/energyPrices2026';
import { runScenario, ScenarioInput } from '@/lib/scenarioEngine';

export interface FundingBreakdownItem {
  label: string;
  amount: number;
  hint?: string;
  /** true = optionaler Bonus (kann durch User-Wahl an/aus sein) */
  optional?: boolean;
}

interface Props {
  /** Basis-Input ohne Szenario/CO₂ (wird intern über alle Szenarien iteriert) */
  baseInput: ScenarioInput;
  /** Aktuell gewähltes Szenario (wird visuell markiert) */
  activeScenario: PriceScenarioKey;
  activeCo2: boolean;
  /** Aufschlüsselung der Förderung – summiert zur Gesamt-Förderung */
  fundingBreakdown: FundingBreakdownItem[];
  /** Für die Anzeige der Deckung: Bruttoinvestition */
  investBrutto: number;
  className?: string;
}

const fmtEuro = (n: number) =>
  n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

const SCENARIO_ICON = {
  optimistisch: TrendingDown,
  realistisch: Activity,
  vorsichtig: TrendingUp,
} as const;

/**
 * Transparenz-Panel: zeigt Sensitivität pro Szenario, CO₂-Impact und Förder-Zerlegung.
 * Reine Präsentation – Berechnung kommt aus scenarioEngine + gelieferten Inputs.
 */
const SensitivityPanel = ({
  baseInput,
  activeScenario,
  activeCo2,
  fundingBreakdown,
  investBrutto,
  className = '',
}: Props) => {
  const matrix = useMemo(() => {
    return (Object.keys(PRICE_SCENARIOS) as PriceScenarioKey[]).map((key) => {
      const withCo2 = runScenario(baseInput, key, { includeCo2Path: true });
      const withoutCo2 = runScenario(baseInput, key, { includeCo2Path: false });
      return {
        key,
        label: PRICE_SCENARIOS[key].label,
        withCo2,
        withoutCo2,
        co2Delta: withCo2.gesamtErsparnis - withoutCo2.gesamtErsparnis,
      };
    });
  }, [baseInput]);

  const totalFunding = fundingBreakdown.reduce((s, x) => s + x.amount, 0);
  const foerderQuote = investBrutto > 0 ? totalFunding / investBrutto : 0;
  const maxAbsBar = Math.max(1, ...fundingBreakdown.map((x) => Math.abs(x.amount)));

  const y2027 = Math.round(getCO2Price(2027));
  const y2030 = Math.round(getCO2Price(2030));

  return (
    <TooltipProvider>
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            Sensitivität & Ergebnis-Transparenz
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Wie stark beeinflussen Energiepreise, CO₂-Pfad und Förderung Ihr 20-Jahres-Ergebnis? Aktive Auswahl ist hervorgehoben.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 1) Szenario-Matrix */}
          <div>
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
              Preis-Szenarien
              <ScenarioTip />
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b">
                    <th className="text-left py-2 pr-3 font-medium">Szenario</th>
                    <th className="text-right py-2 px-2 font-medium">20-J. Ersparnis</th>
                    <th className="text-right py-2 px-2 font-medium">Amortisation</th>
                    <th className="text-right py-2 px-2 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <Leaf className="w-3 h-3" />
                        CO₂-Effekt
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row) => {
                    const Icon = SCENARIO_ICON[row.key];
                    const isActive = row.key === activeScenario;
                    const shown = activeCo2 ? row.withCo2 : row.withoutCo2;
                    return (
                      <tr
                        key={row.key}
                        className={`border-b last:border-0 ${
                          isActive ? 'bg-primary/5 font-medium' : ''
                        }`}
                      >
                        <td className="py-2 pr-3">
                          <span className="inline-flex items-center gap-1.5">
                            <Icon className="w-3.5 h-3.5" />
                            {row.label}
                            {isActive && (
                              <span className="ml-1 text-[10px] uppercase tracking-wide text-primary">
                                aktiv
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="text-right py-2 px-2 tabular-nums">
                          {fmtEuro(shown.gesamtErsparnis)}
                        </td>
                        <td className="text-right py-2 px-2 tabular-nums">
                          {shown.amortisationJahre != null
                            ? `${shown.amortisationJahre.toFixed(1)} J.`
                            : '> 20 J.'}
                        </td>
                        <td className="text-right py-2 px-2 tabular-nums text-emerald-700 dark:text-emerald-400">
                          {row.co2Delta > 0 ? '+' : ''}
                          {fmtEuro(row.co2Delta)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              CO₂-Effekt = Zusatz-Ersparnis durch den ETS-2-Preispfad ({y2027} €/t 2027 → {y2030} €/t 2030) über 20 Jahre. Bei nicht-fossilem Ersatz = 0.
            </p>
          </div>

          {/* 2) Förder-Zerlegung */}
          <div>
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
              <Euro className="w-4 h-4" />
              Förder-Zerlegung
              <span className="ml-auto text-xs font-normal text-muted-foreground">
                Quote: {(foerderQuote * 100).toFixed(0)} % der Investition
              </span>
            </h3>
            <div className="space-y-2">
              {fundingBreakdown.map((item, i) => {
                const width = (Math.abs(item.amount) / maxAbsBar) * 100;
                const share = totalFunding > 0 ? (item.amount / totalFunding) * 100 : 0;
                const zero = item.amount === 0;
                return (
                  <div key={i} className="text-xs">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`flex items-center gap-1 ${zero ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {item.label}
                        {item.optional && (
                          <span className="text-[10px] px-1 rounded bg-muted text-muted-foreground">
                            optional
                          </span>
                        )}
                        {item.hint && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button" aria-label={`Info: ${item.label}`} className="text-muted-foreground hover:text-foreground">
                                <Info className="w-3 h-3" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs text-xs">{item.hint}</TooltipContent>
                          </Tooltip>
                        )}
                      </span>
                      <span className="tabular-nums font-medium">
                        {fmtEuro(item.amount)}
                        {!zero && totalFunding > 0 && (
                          <span className="ml-1 text-muted-foreground">({share.toFixed(0)} %)</span>
                        )}
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          zero
                            ? 'bg-muted-foreground/20'
                            : item.optional
                              ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                              : 'bg-primary'
                        }`}
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between text-sm font-semibold border-t pt-2">
              <span>Summe Förderung</span>
              <span className="tabular-nums">{fmtEuro(totalFunding)}</span>
            </div>
          </div>

          {/* 3) Interpretationshilfe */}
          <div className="rounded-md border bg-muted/30 p-3 text-xs text-muted-foreground space-y-1">
            <p>
              <strong className="text-foreground">Lesehinweis:</strong> Optional markierte Positionen entfallen, wenn Sie die entsprechende Option ausschalten. Der CO₂-Effekt wirkt nur beim Ersatz fossiler Brennstoffe.
            </p>
            <p>
              Für belastbare Zahlen: Nutzen Sie das Szenario „Vorsichtig" als Untergrenze und „Realistisch" als Planungsgröße.
            </p>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

const ScenarioTip = () => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button type="button" aria-label="Erklärung Preis-Szenarien" className="text-muted-foreground hover:text-foreground">
        <Info className="w-3.5 h-3.5" />
      </button>
    </TooltipTrigger>
    <TooltipContent className="max-w-xs text-xs">
      Alle drei Szenarien werden mit Ihren aktuellen Eingaben durchgerechnet – so sehen Sie die Bandbreite, ohne den Toggle umschalten zu müssen.
    </TooltipContent>
  </Tooltip>
);

export default SensitivityPanel;
