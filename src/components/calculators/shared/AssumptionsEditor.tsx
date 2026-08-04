import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PRICE_SCENARIOS, PriceScenarioKey } from '@/data/energyPrices2026';
import type { Assumptions } from '@/hooks/useScenarioAssumptions';

interface AssumptionsEditorProps {
  scenario: PriceScenarioKey;
  assumptions: Assumptions;
  defaults: Assumptions;
  isCustom: boolean;
  onChange: (key: keyof Assumptions, value: number) => void;
  onReset: () => void;
  /** z. B. "Gaspreis" statt generisch "Energiepreis" */
  energyLabel?: string;
  /** z. B. "Kreditlaufzeit" statt "Betrachtungszeitraum" */
  laufzeitLabel?: string;
  zinsLabel?: string;
  hint?: string;
  className?: string;
}

const Field = ({
  id, label, value, defaultValue, unit, step, min, max, onChange,
}: {
  id: string; label: string; value: number; defaultValue: number; unit: string;
  step: number; min: number; max: number; onChange: (v: number) => void;
}) => (
  <div>
    <Label htmlFor={id} className="text-xs">{label} ({unit})</Label>
    <Input
      id={id}
      type="number"
      inputMode="decimal"
      step={step}
      min={min}
      max={max}
      value={value}
      onChange={(e) => {
        const v = Number(e.target.value);
        if (Number.isFinite(v)) onChange(Math.min(max, Math.max(min, v)));
      }}
      className="mt-1"
    />
    <p className="text-[11px] text-muted-foreground mt-1">
      Szenario-Vorgabe: {defaultValue.toLocaleString('de-DE')} {unit}
    </p>
  </div>
);

const AssumptionsEditor = ({
  scenario,
  assumptions,
  defaults,
  isCustom,
  onChange,
  onReset,
  energyLabel = 'Energiepreis',
  laufzeitLabel = 'Laufzeit',
  zinsLabel = 'Kalkulationszins',
  hint,
  className = '',
}: AssumptionsEditorProps) => (
  <Accordion type="single" collapsible className={`border border-border rounded-lg bg-card ${className}`}>
    <AccordionItem value="annahmen" className="border-0">
      <AccordionTrigger className="px-4 hover:no-underline">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          Annahmen anpassen
          <Badge variant={isCustom ? 'default' : 'secondary'} className="text-[10px] font-normal">
            {PRICE_SCENARIOS[scenario].label}{isCustom ? ' · angepasst' : ''}
          </Badge>
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-4">
        <p className="text-xs text-muted-foreground">
          {hint ?? 'Die Werte gelten nur für das aktuell gewählte Szenario. Wechseln Sie das Szenario, greifen dort wieder eigene Vorgaben.'}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Field
            id={`ass-preis-${scenario}`}
            label={energyLabel}
            unit="€/kWh"
            value={assumptions.energiepreis}
            defaultValue={defaults.energiepreis}
            step={0.005}
            min={0.01}
            max={1}
            onChange={(v) => onChange('energiepreis', v)}
          />
          <Field
            id={`ass-steigerung-${scenario}`}
            label="Preissteigerung"
            unit="%/Jahr"
            value={assumptions.steigerung}
            defaultValue={defaults.steigerung}
            step={0.1}
            min={-5}
            max={15}
            onChange={(v) => onChange('steigerung', v)}
          />
          <Field
            id={`ass-laufzeit-${scenario}`}
            label={laufzeitLabel}
            unit="Jahre"
            value={assumptions.laufzeit}
            defaultValue={defaults.laufzeit}
            step={1}
            min={5}
            max={40}
            onChange={(v) => onChange('laufzeit', Math.round(v))}
          />
          <Field
            id={`ass-zins-${scenario}`}
            label={zinsLabel}
            unit="%"
            value={assumptions.zinssatz}
            defaultValue={defaults.zinssatz}
            step={0.1}
            min={0}
            max={15}
            onChange={(v) => onChange('zinssatz', v)}
          />
        </div>
        <Button variant="outline" size="sm" onClick={onReset} disabled={!isCustom}>
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
          Auf Szenario-Vorgaben zurücksetzen
        </Button>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export default AssumptionsEditor;
