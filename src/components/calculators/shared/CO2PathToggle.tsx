import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Leaf, Info } from 'lucide-react';
import { getCO2Price } from '@/data/energyPrices2026';

interface Props {
  enabled: boolean;
  onChange: (v: boolean) => void;
  className?: string;
}

const CO2PathToggle = ({ enabled, onChange, className = '' }: Props) => {
  const y2027 = Math.round(getCO2Price(2027));
  const y2030 = Math.round(getCO2Price(2030));
  return (
    <TooltipProvider>
      <div className={`flex items-center justify-between gap-3 rounded-lg border p-3 bg-muted/30 ${className}`}>
        <div className="flex items-start gap-2 min-w-0">
          <Leaf className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <div className="min-w-0">
            <Label htmlFor="co2-path" className="text-sm font-medium cursor-pointer flex items-center gap-1.5">
              CO\u2082-Preis-Pfad ber\u00fccksichtigen
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" aria-label="Was ist der CO\u2082-Preis-Pfad?" className="text-muted-foreground hover:text-foreground">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-xs">
                  Ab 2027 startet ETS-2: fossile Brennstoffe werden marktbasiert bepreist.
                  Prognose: {y2027} \u20ac/t (2027) \u2192 {y2030} \u20ac/t (2030).
                  Erh\u00f6ht die j\u00e4hrliche Ersparnis fossiler Ersatzma\u00dfnahmen sp\u00fcrbar.
                </TooltipContent>
              </Tooltip>
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              BEHG bis 2026, ETS-2 ab 2027 (Prognose)
            </p>
          </div>
        </div>
        <Switch id="co2-path" checked={enabled} onCheckedChange={onChange} />
      </div>
    </TooltipProvider>
  );
};

export default CO2PathToggle;
