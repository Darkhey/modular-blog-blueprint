
import { Home, Heater, Landmark, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CalculatorInputs, HeatingType, InsulationQuality } from '@/hooks/useModernizationCalculator';

interface ModernizationPlanSectionProps {
  inputs: CalculatorInputs;
  handleInputChange: (field: keyof CalculatorInputs, value: string) => void;
  investmentCosts: string;
  setInvestmentCosts: (value: string) => void;
}

const ModernizationPlanSection = ({ inputs, handleInputChange, investmentCosts, setInvestmentCosts }: ModernizationPlanSectionProps) => {
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
