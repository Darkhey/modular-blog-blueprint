
import { useState } from 'react';
import { Calculator, Zap, Users, Home, Heater, TrendingUp, ChevronsRight, Info, Landmark, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ModernizationSavingsCalculator = () => {
  const [inputs, setInputs] = useState({
    houseSize: '150',
    personCount: '4',
    currentInsulation: 'mittel',
    currentHeating: 'gas',
    futureInsulation: 'gut',
    futureHeating: 'waermepumpe',
  });
  
  const [calculationMode, setCalculationMode] = useState<'details' | 'consumption'>('details');
  const [currentConsumption, setCurrentConsumption] = useState('20000');
  const [investmentCosts, setInvestmentCosts] = useState('15000');

  const [results, setResults] = useState<{
    current: { total: number; heating: number; hotWater: number; };
    future: { total: number; heating: number; hotWater: number; };
    annualSavings: number;
    savingsPercentage: number;
    amortizationPeriod?: number;
  } | null>(null);

  const calculateSavings = () => {
    const size = parseFloat(inputs.houseSize);
    const persons = parseInt(inputs.personCount);
    const investment = parseFloat(investmentCosts);
    const consumption = parseFloat(currentConsumption);

    if (!persons || (calculationMode === 'details' && !size) || (calculationMode === 'consumption' && !consumption)) return;

    const ENERGY_PRICES = { gas: 0.10, oil: 0.11, waermepumpe: 0.30, pellets: 0.08, nachtspeicher: 0.25 };
    const SPECIFIC_CONSUMPTION = { schlecht: 200, mittel: 140, gut: 60 };
    const HOT_WATER_PER_PERSON_KWH = 1000;
    const HEATPUMP_SCOP = 3.5;

    const hotWaterKwh = persons * HOT_WATER_PER_PERSON_KWH;

    const calculateSingleScenario = (insulation: string, heating: string) => {
        const heatingKwh = size * SPECIFIC_CONSUMPTION[insulation as keyof typeof SPECIFIC_CONSUMPTION];
        
        let pricePerKwh = ENERGY_PRICES[heating as keyof typeof ENERGY_PRICES];
        let finalHeatingKwh = heatingKwh;
        let finalHotWaterKwh = hotWaterKwh;

        if (heating === 'waermepumpe') {
          finalHeatingKwh = heatingKwh / HEATPUMP_SCOP;
          finalHotWaterKwh = hotWaterKwh / HEATPUMP_SCOP;
        }
        
        const heatingCosts = finalHeatingKwh * pricePerKwh;
        const hotWaterCosts = finalHotWaterKwh * pricePerKwh;
        return {
            total: heatingCosts + hotWaterCosts,
            heating: heatingCosts,
            hotWater: hotWaterCosts
        };
    };

    let current;
    if (calculationMode === 'consumption') {
        const pricePerKwh = ENERGY_PRICES[inputs.currentHeating as keyof typeof ENERGY_PRICES];
        const totalCost = consumption * pricePerKwh;

        let hotWaterCost;
        if (inputs.currentHeating === 'waermepumpe') {
            hotWaterCost = (hotWaterKwh / HEATPUMP_SCOP) * pricePerKwh;
        } else {
            hotWaterCost = hotWaterKwh * pricePerKwh;
        }
        
        const heatingCost = Math.max(0, totalCost - hotWaterCost);
        current = { total: totalCost, heating: heatingCost, hotWater: hotWaterCost };
    } else {
        current = calculateSingleScenario(inputs.currentInsulation, inputs.currentHeating);
    }

    const future = calculateSingleScenario(inputs.futureInsulation, inputs.futureHeating);
    const annualSavings = current.total - future.total;
    const savingsPercentage = annualSavings > 0 && current.total > 0 ? (annualSavings / current.total) * 100 : 0;

    let amortizationPeriod;
    if (investment > 0 && annualSavings > 0) {
        amortizationPeriod = investment / annualSavings;
    }

    setResults({ current, future, annualSavings, savingsPercentage, amortizationPeriod });
  };

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-5xl mx-auto bg-gradient-to-br from-white to-green-50 border-2 border-green-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center text-2xl">
          <Calculator className="mr-3 w-8 h-8" />
          Modernisierungs-Einspar-Rechner
        </CardTitle>
        <CardDescription className="text-green-100">Berechnen Sie Ihr Sparpotenzial durch Sanierungsmaßnahmen.</CardDescription>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <div className="space-y-4 p-4 border rounded-lg bg-white">
            <h3 className="font-bold text-lg text-gray-800">Grunddaten & Aktueller Zustand</h3>
              <div>
                <Label className="text-sm font-semibold text-gray-700">Berechnungsgrundlage</Label>
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
                    <Label htmlFor="houseSize" className="text-sm font-semibold text-gray-700 flex items-center"><Home className="mr-2 h-4 w-4" /> Wohnfläche (m²)</Label>
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
                      <Label htmlFor="currentInsulation" className="text-sm font-semibold text-gray-700 flex items-center"><Home className="mr-2 h-4 w-4" /> Dämmungszustand</Label>
                      <Select value={inputs.currentInsulation} onValueChange={(value) => handleInputChange('currentInsulation', value)}>
                          <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                          <SelectContent>
                              <SelectItem value="schlecht">Schlecht (unsaniert)</SelectItem>
                              <SelectItem value="mittel">Mittel (teil-saniert)</SelectItem>
                              <SelectItem value="gut">Gut (saniert/Neubau)</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
                </>
              ) : (
                <div>
                  <Label htmlFor="currentConsumption" className="text-sm font-semibold text-gray-700 flex items-center"><Zap className="mr-2 h-4 w-4" /> Jahresverbrauch (kWh)</Label>
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
                <Label htmlFor="personCount" className="text-sm font-semibold text-gray-700 flex items-center"><Users className="mr-2 h-4 w-4" /> Personen im Haushalt</Label>
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
                  <Select value={inputs.currentHeating} onValueChange={(value) => handleInputChange('currentHeating', value)}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                          <SelectItem value="gas">Gasheizung</SelectItem><SelectItem value="oil">Ölheizung</SelectItem><SelectItem value="waermepumpe">Wärmepumpe</SelectItem><SelectItem value="pellets">Pelletheizung</SelectItem><SelectItem value="nachtspeicher">Nachtspeicher</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
          </div>
          <div className="space-y-4 p-4 border rounded-lg bg-white">
            <h3 className="font-bold text-lg text-gray-800">Geplante Modernisierung</h3>
             <div>
                <Label htmlFor="futureInsulation" className="text-sm font-semibold text-gray-700 flex items-center"><Home className="mr-2 h-4 w-4" /> Zukünftiger Dämmungszustand</Label>
                <Select value={inputs.futureInsulation} onValueChange={(value) => handleInputChange('futureInsulation', value)}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="schlecht">Schlecht (unsaniert)</SelectItem><SelectItem value="mittel">Mittel (teil-saniert)</SelectItem><SelectItem value="gut">Gut (saniert/Neubau)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="futureHeating" className="text-sm font-semibold text-gray-700 flex items-center"><Heater className="mr-2 h-4 w-4" /> Neue Heizung</Label>
                <Select value={inputs.futureHeating} onValueChange={(value) => handleInputChange('futureHeating', value)}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="gas">Gasheizung</SelectItem><SelectItem value="oil">Ölheizung</SelectItem><SelectItem value="waermepumpe">Wärmepumpe</SelectItem><SelectItem value="pellets">Pelletheizung</SelectItem><SelectItem value="nachtspeicher">Nachtspeicher</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="pt-2">
              <Label htmlFor="investmentCosts" className="text-sm font-semibold text-gray-700 flex items-center"><Landmark className="mr-2 h-4 w-4" /> Investitionskosten (€)</Label>
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
        </div>

        <Button onClick={calculateSavings} className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-300">
          <Zap className="mr-2 w-5 h-5" />
          Sparpotenzial berechnen!
        </Button>

        {results && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><TrendingUp className="mr-2 text-green-600" />Ihr Einsparpotenzial</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                    <p className="text-lg font-semibold text-gray-800">Jährliche Ersparnis</p>
                    <p className="text-5xl font-bold text-green-600 my-1">{results.annualSavings.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
                    <p className="text-lg font-semibold text-green-700">({results.savingsPercentage.toFixed(0)}% weniger Kosten)</p>
                </div>
                <div className="text-center">
                  {results.amortizationPeriod ? (
                    <>
                      <p className="text-lg font-semibold text-gray-800 flex items-center justify-center"><TrendingDown className="mr-2 text-blue-600"/> Amortisationszeit</p>
                      <p className="text-5xl font-bold text-blue-600 my-1">
                          {results.amortizationPeriod.toFixed(1)} <span className="text-3xl">Jahre</span>
                      </p>
                    </>
                  ) : parseFloat(investmentCosts) > 0 ? (
                    <>
                      <p className="text-lg font-semibold text-gray-800 flex items-center justify-center"><TrendingDown className="mr-2 text-blue-600"/> Amortisationszeit</p>
                      <p className="text-2xl font-bold text-blue-600 my-1 pt-4">
                          Lohnt sich nicht
                      </p>
                    </>
                  ) : null}
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start text-center mt-6 pt-6 border-t">
              <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
                <p className="text-sm text-gray-600">Kosten vorher</p>
                <div className="text-2xl font-bold text-red-600 mt-1 mb-2">{results.current.total.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
                <div className="text-xs text-gray-500 space-y-1 mt-auto">
                    <p>Heizung: {results.current.heating.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
                    <p>Warmwasser: {results.current.hotWater.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
                </div>
              </div>

              <div className="h-full flex items-center justify-center">
                <ChevronsRight className="w-8 h-8 text-gray-400 mx-auto hidden md:block" />
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-2 border-green-500 h-full flex flex-col">
                <p className="text-sm text-gray-600">Kosten nachher</p>
                <div className="text-2xl font-bold text-green-600 mt-1 mb-2">{results.future.total.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
                <div className="text-xs text-gray-500 space-y-1 mt-auto">
                    <p>Heizung: {results.future.heating.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
                    <p>Warmwasser: {results.future.hotWater.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md">
              <p className="text-sm flex items-center justify-center">
                <Info className="w-5 h-5 mr-2" />
                Diese Berechnung ist eine Schätzung basierend auf typischen Durchschnittswerten (Stand 2024/25).
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ModernizationSavingsCalculator;
