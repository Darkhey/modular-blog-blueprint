
import { Zap, Users, Home, Heater, Info, Building, CalendarDays } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CalculatorInputs, BuildingType, BuildingYear, HeatingType } from '@/hooks/useModernizationCalculator';

interface CalculatorInputSectionProps {
  inputs: CalculatorInputs;
  handleInputChange: (field: keyof CalculatorInputs, value: string) => void;
  calculationMode: 'details' | 'consumption';
  setCalculationMode: (mode: 'details' | 'consumption') => void;
  currentConsumption: string;
  setCurrentConsumption: (value: string) => void;
}

const CalculatorInputSection = ({
  inputs,
  handleInputChange,
  calculationMode,
  setCalculationMode,
  currentConsumption,
  setCurrentConsumption
}: CalculatorInputSectionProps) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white">
      <h3 className="font-bold text-lg text-gray-800">Grunddaten & Aktueller Zustand</h3>
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Label className="text-sm font-semibold text-gray-700 flex items-center cursor-help">
              Berechnungsgrundlage
              <Info className="ml-1.5 h-4 w-4 text-gray-400" />
            </Label>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">Wählen Sie, ob die Berechnung auf Basis Ihrer Gebäudedaten (empfohlen für Schätzung) oder Ihres bekannten Jahresverbrauchs erfolgen soll.</p>
          </TooltipContent>
        </Tooltip>
        <RadioGroup value={calculationMode} onValueChange={(v) => setCalculationMode(v as 'details' | 'consumption')} className="flex space-x-4 pt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="details" id="details" />
            <Label htmlFor="details" className="font-normal">Nach Gebäudedaten</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="consumption" id="consumption" />
            <Label htmlFor="consumption" className="font-normal">Nach Jahresverbrauch</Label>
          </div>
        </RadioGroup>
      </div>

      {calculationMode === 'details' ? (
        <>
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Label htmlFor="houseSize" className="text-sm font-semibold text-gray-700 flex items-center cursor-help">
                  <Home className="mr-2 h-4 w-4" /> Wohnfläche (m²)
                  <Info className="ml-1.5 h-4 w-4 text-gray-400" />
                </Label>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Die beheizte Wohnfläche Ihres Hauses. Diese wird zur Schätzung Ihres Wärmebedarfs verwendet.</p>
              </TooltipContent>
            </Tooltip>
            <div className="flex items-center space-x-4 mt-2">
              <Slider
                id="houseSize"
                min={50}
                max={500}
                step={5}
                value={[parseFloat(inputs.houseSize) || 50]}
                onValueChange={(value) => handleInputChange('houseSize', value[0].toString())}
                className="flex-1"
              />
              <div className="relative w-28">
                <Input
                  type="number"
                  value={inputs.houseSize}
                  onChange={(e) => handleInputChange('houseSize', e.target.value)}
                  className="w-full text-center pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">m²</span>
              </div>
            </div>
          </div>
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="buildingType" className="text-sm font-semibold text-gray-700 flex items-center cursor-help">
                    <Building className="mr-2 h-4 w-4" /> Gebäudetyp
                    <Info className="ml-1.5 h-4 w-4 text-gray-400" />
                  </Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Der Gebäudetyp beeinflusst den Energieverbrauch. Ein Reihenmittelhaus hat z.B. weniger Außenwände als ein Einfamilienhaus und somit geringere Wärmeverluste.</p>
                </TooltipContent>
              </Tooltip>
              <Select value={inputs.buildingType} onValueChange={(value) => handleInputChange('buildingType', value as BuildingType)}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                      <SelectItem value="einfamilienhaus">Einfamilienhaus</SelectItem>
                      <SelectItem value="doppelhaushaelfte">Doppelhaushälfte</SelectItem>
                      <SelectItem value="reihenmittelhaus">Reihenmittelhaus</SelectItem>
                      <SelectItem value="mehrfamilienhaus">Mehrfamilienhaus</SelectItem>
                  </SelectContent>
              </Select>
          </div>
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="buildingYear" className="text-sm font-semibold text-gray-700 flex items-center cursor-help">
                    <CalendarDays className="mr-2 h-4 w-4" /> Baujahr des Gebäudes
                    <Info className="ml-1.5 h-4 w-4 text-gray-400" />
                  </Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Das Baujahr gibt Aufschluss über die damals geltenden Baustandards und Wärmeschutzverordnungen, was den Energiebedarf stark beeinflusst.</p>
                </TooltipContent>
              </Tooltip>
              <Select value={inputs.buildingYear} onValueChange={(value) => handleInputChange('buildingYear', value as BuildingYear)}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                      <SelectItem value="vor-1979">vor 1979 (unsaniert)</SelectItem>
                      <SelectItem value="1979-1994">1979 - 1994 (1. WSchV)</SelectItem>
                      <SelectItem value="1995-2001">1995 - 2001 (2. WSchV)</SelectItem>
                      <SelectItem value="2002-2015">2002 - 2015 (EnEV)</SelectItem>
                      <SelectItem value="nach-2016">nach 2016 (EnEV 2016)</SelectItem>
                  </SelectContent>
              </Select>
          </div>
        </>
      ) : (
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Label htmlFor="currentConsumption" className="text-sm font-semibold text-gray-700 flex items-center cursor-help">
                <Zap className="mr-2 h-4 w-4" /> Jahresverbrauch (kWh)
                <Info className="ml-1.5 h-4 w-4 text-gray-400" />
              </Label>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Geben Sie hier Ihren gesamten Jahres-Energieverbrauch für die Heizung in Kilowattstunden (kWh) an. Sie finden diesen Wert auf Ihrer letzten Jahresabrechnung.</p>
            </TooltipContent>
          </Tooltip>
          <Input
            id="currentConsumption"
            type="number"
            value={currentConsumption}
            onChange={(e) => setCurrentConsumption(e.target.value)}
            className="mt-1"
            placeholder="z.B. 20000"
          />
        </div>
      )}
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Label htmlFor="personCount" className="text-sm font-semibold text-gray-700 flex items-center cursor-help">
              <Users className="mr-2 h-4 w-4" /> Personen im Haushalt
              <Info className="ml-1.5 h-4 w-4 text-gray-400" />
            </Label>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">Die Anzahl der Personen wird zur Schätzung des Warmwasserverbrauchs herangezogen.</p>
          </TooltipContent>
        </Tooltip>
        <div className="flex items-center space-x-4 mt-2">
          <Slider
            id="personCount"
            min={1}
            max={10}
            step={1}
            value={[parseInt(inputs.personCount) || 1]}
            onValueChange={(value) => handleInputChange('personCount', value[0].toString())}
            className="flex-1"
          />
          <Input
            type="number"
            value={inputs.personCount}
            onChange={(e) => handleInputChange('personCount', e.target.value)}
            className="w-28 text-center"
          />
        </div>
      </div>
        <div>
          <Label htmlFor="currentHeating" className="text-sm font-semibold text-gray-700 flex items-center"><Heater className="mr-2 h-4 w-4" /> Aktuelle Heizung</Label>
          <Select value={inputs.currentHeating} onValueChange={(value) => handleInputChange('currentHeating', value as HeatingType)}>
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
    </div>
  );
};

export default CalculatorInputSection;
