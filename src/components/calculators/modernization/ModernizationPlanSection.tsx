
import { useState } from 'react';
import { Home, Heater, Landmark, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CalculatorInputs, HeatingType, InsulationQuality, SmartHomeSystem } from '@/hooks/useModernizationCalculator';
import { Checkbox } from '@/components/ui/checkbox';

const SMART_HOME_INFOS: Record<SmartHomeSystem, string> = {
  thermostat: 'Intelligente Thermostate optimieren automatisch die Raumtemperatur.',
  heizungssteuerung: 'Zentrale Steuerung der gesamten Heizungsanlage.',
  sensoren: 'Erkennt offene Fenster und passt die Heizung an.',
  energiemanagement: 'Optimiert Eigenverbrauch und Lastspitzen.',
  wetterstation: 'Passt die Heizung an aktuelle Wetterdaten an.',
  sprachsteuerung: 'Ermöglicht komfortable Sprachbefehle.',
};

interface ModernizationPlanSectionProps {
  inputs: CalculatorInputs;
  handleInputChange: (field: keyof CalculatorInputs, value: string) => void;
  investmentCosts: string;
  setInvestmentCosts: (value: string) => void;
  selectedSmartSystems: SmartHomeSystem[];
  toggleSmartSystem: (system: SmartHomeSystem) => void;
  estimateSmartInvestment: () => number;
  recommendedSystems: SmartHomeSystem[];
}

const ModernizationPlanSection = ({
  inputs,
  handleInputChange,
  investmentCosts,
  setInvestmentCosts,
  selectedSmartSystems,
  toggleSmartSystem,
  estimateSmartInvestment,
  recommendedSystems,
}: ModernizationPlanSectionProps) => {
  const [showSmartOptions, setShowSmartOptions] = useState(false);
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white">
      <h3 className="font-bold text-lg text-gray-800">Geplante Modernisierung</h3>
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Label htmlFor="futureInsulation" className="text-sm font-semibold text-gray-700 flex items-center cursor-help">
              <Home className="mr-2 h-4 w-4" /> Zukünftiger Dämmungszustand
              <Info className="ml-1.5 h-4 w-4 text-gray-400" />
            </Label>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">Schätzen Sie den energetischen Zustand Ihres Gebäudes nach der Sanierung ein. "Gut" entspricht einem typischen Neubau-Standard, "KfW 55" einem Effizienzhaus.</p>
          </TooltipContent>
        </Tooltip>
        <Select value={inputs.futureInsulation} onValueChange={(value) => handleInputChange('futureInsulation', value as InsulationQuality)}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
                <SelectItem value="schlecht">Schlecht (wie bisher)</SelectItem>
                <SelectItem value="mittel">Mittel (teil-saniert)</SelectItem>
                <SelectItem value="gut">Gut (saniert/Neubau)</SelectItem>
                <SelectItem value="kfw55">Sehr gut (KfW 55)</SelectItem>
            </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="futureHeating" className="text-sm font-semibold text-gray-700 flex items-center"><Heater className="mr-2 h-4 w-4" /> Neue Heizung</Label>
        <Select value={inputs.futureHeating} onValueChange={(value) => handleInputChange('futureHeating', value as HeatingType)}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
                <SelectItem value="gas">Gasheizung</SelectItem>
                <SelectItem value="oil">Ölheizung</SelectItem>
                <SelectItem value="waermepumpe">Wärmepumpe</SelectItem>
                <SelectItem value="pellets">Pelletheizung</SelectItem>
                <SelectItem value="nachtspeicher">Nachtspeicher</SelectItem>
                <SelectItem value="fernwaerme">Fernwärme</SelectItem>
            </SelectContent>
        </Select>
      </div>
      <div>
        <button
          type="button"
          onClick={() => setShowSmartOptions(!showSmartOptions)}
          className="text-sm font-semibold text-gray-700 underline"
        >
          {showSmartOptions ? 'Smart Home Optionen verbergen' : 'Smart Home Optionen anzeigen'}
        </button>
        {showSmartOptions && (
          <div className="mt-2">
            <Label className="text-sm font-semibold text-gray-700">Smart Home Systeme</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                { id: 'thermostat', label: 'Thermostate' },
                { id: 'heizungssteuerung', label: 'Heizungssteuerung' },
                { id: 'sensoren', label: 'Sensoren' },
                { id: 'energiemanagement', label: 'Energie-Management' },
                { id: 'wetterstation', label: 'Wetterstation' },
                { id: 'sprachsteuerung', label: 'Sprachsteuerung' },
              ].map((opt) => (
                <Tooltip key={opt.id}>
                  <TooltipTrigger asChild>
                    <label className="flex items-center space-x-2 text-sm">
                      <Checkbox
                        id={opt.id}
                        checked={selectedSmartSystems.includes(opt.id as SmartHomeSystem)}
                        onCheckedChange={() => toggleSmartSystem(opt.id as SmartHomeSystem)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">{SMART_HOME_INFOS[opt.id as SmartHomeSystem]}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Geschätzte Zusatzkosten:{' '}
              {estimateSmartInvestment().toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </p>
            {recommendedSystems.length > 0 && (
              <p className="text-xs text-green-700 mt-1">Empfohlen: {recommendedSystems.join(', ')}</p>
            )}
          </div>
        )}
      </div>
      <div className="pt-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Label htmlFor="investmentCosts" className="text-sm font-semibold text-gray-700 flex items-center cursor-help">
              <Landmark className="mr-2 h-4 w-4" /> Investitionskosten (€)
              <Info className="ml-1.5 h-4 w-4 text-gray-400" />
            </Label>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">Tragen Sie hier die Gesamtkosten für die Modernisierungsmaßnahmen ein (z.B. neue Heizung, Dämmung). Berücksichtigen Sie eventuelle staatliche Förderungen, indem Sie diese von den Kosten abziehen.</p>
          </TooltipContent>
        </Tooltip>
        <Input
            id="investmentCosts"
            type="number"
            value={investmentCosts}
            onChange={(e) => setInvestmentCosts(e.target.value)}
            className="mt-1"
            placeholder="z.B. 15000"
        />
      </div>
    </div>
  );
};

export default ModernizationPlanSection;
