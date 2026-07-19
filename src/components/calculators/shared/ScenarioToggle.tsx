import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PRICE_SCENARIOS, PriceScenarioKey } from '@/data/energyPrices2026';
import { TrendingDown, Activity, TrendingUp, Info } from 'lucide-react';

interface Props {
  value: PriceScenarioKey;
  onChange: (v: PriceScenarioKey) => void;
  className?: string;
}

const ICONS = {
  optimistisch: TrendingDown,
  realistisch: Activity,
  vorsichtig: TrendingUp,
} as const;

const HINTS: Record<PriceScenarioKey, string> = {
  optimistisch: 'Niedrige Energiepreise, 2 % j\u00e4hrliche Steigerung. F\u00fcr Best-Case-Betrachtung.',
  realistisch: 'Mittleres Preisniveau 2026, 3,5 % j\u00e4hrliche Steigerung. Empfohlene Standard-Annahme.',
  vorsichtig: 'Hohe Preise, 5 % j\u00e4hrliche Steigerung. F\u00fcr konservative Amortisationsplanung.',
};

const ScenarioToggle = ({ value, onChange, className = '' }: Props) => {
  return (
    <TooltipProvider>
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center gap-1.5 text-sm font-medium">
          Preis-Szenario 2026\u201345
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" aria-label="Erkl\u00e4rung Preis-Szenarien" className="text-muted-foreground hover:text-foreground">
                <Info className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-xs">
              Legt Energiepreise und deren j\u00e4hrliche Steigerung f\u00fcr die Amortisationsberechnung fest.
              W\u00e4hle vorsichtig, wenn du eine belastbare Untergrenze willst.
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(PRICE_SCENARIOS) as PriceScenarioKey[]).map((key) => {
            const Icon = ICONS[key];
            const active = value === key;
            return (
              <Tooltip key={key}>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant={active ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onChange(key)}
                    className="justify-start gap-1.5 h-auto py-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{PRICE_SCENARIOS[key].label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-xs">{HINTS[key]}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ScenarioToggle;
