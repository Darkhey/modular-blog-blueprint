import { useState } from 'react';
import { Calculator, Zap, Users, Home, Heater, TrendingUp, ChevronsRight, Info, Landmark, TrendingDown, Building, CalendarDays, Settings2, ChevronsUpDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

const ModernizationSavingsCalculator = () => {
  const [inputs, setInputs] = useState({
    houseSize: '150',
    personCount: '4',
    buildingType: 'einfamilienhaus',
    buildingYear: '1979-1994',
    currentHeating: 'gas',
    futureInsulation: 'gut',
    futureHeating: 'waermepumpe',
  });
  
  const [calculationMode, setCalculationMode] = useState<'details' | 'consumption'>('details');
  const [currentConsumption, setCurrentConsumption] = useState('20000');
  const [investmentCosts, setInvestmentCosts] = useState('15000');
  const [customPrices, setCustomPrices] = useState({
    gas: '0.10',
    oil: '0.11',
    waermepumpe: '0.30',
    pellets: '0.08',
    nachtspeicher: '0.25',
    fernwaerme: '0.12',
  });

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

    const ENERGY_PRICES = { 
        gas: parseFloat(customPrices.gas), 
        oil: parseFloat(customPrices.oil), 
        waermepumpe: parseFloat(customPrices.waermepumpe), 
        pellets: parseFloat(customPrices.pellets), 
        nachtspeicher: parseFloat(customPrices.nachtspeicher),
        fernwaerme: parseFloat(customPrices.fernwaerme)
    };
    const SPECIFIC_CONSUMPTION_BY_YEAR = {
        'vor-1979': 220,
        '1979-1994': 160,
        '1995-2001': 110,
        '2002-2015': 80,
        'nach-2016': 50,
    };
    const BUILDING_TYPE_FACTOR = {
        einfamilienhaus: 1.0,
        doppelhaushaelfte: 0.85,
        reihenmittelhaus: 0.7,
        mehrfamilienhaus: 0.9,
    };
    const SPECIFIC_CONSUMPTION_FUTURE = { schlecht: 200, mittel: 140, gut: 60, kfw55: 40 };
    const HOT_WATER_PER_PERSON_KWH = 1000;
    const HEATPUMP_SCOP = 3.5;

    const hotWaterKwh = persons * HOT_WATER_PER_PERSON_KWH;

    const calculateCosts = (heatingKwh: number, hotWaterKwh: number, heatingType: keyof typeof ENERGY_PRICES) => {
        const pricePerKwh = ENERGY_PRICES[heatingType];
        let finalHeatingKwh = heatingKwh;
        let finalHotWaterKwh = hotWaterKwh;

        if (heatingType === 'waermepumpe') {
          finalHeatingKwh /= HEATPUMP_SCOP;
          finalHotWaterKwh /= HEATPUMP_SCOP;
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
        const baseConsumption = SPECIFIC_CONSUMPTION_BY_YEAR[inputs.buildingYear as keyof typeof SPECIFIC_CONSUMPTION_BY_YEAR];
        const typeFactor = BUILDING_TYPE_FACTOR[inputs.buildingType as keyof typeof BUILDING_TYPE_FACTOR];
        const currentHeatingKwh = size * baseConsumption * typeFactor;
        current = calculateCosts(currentHeatingKwh, hotWaterKwh, inputs.currentHeating as keyof typeof ENERGY_PRICES);
    }

    const futureHeatingKwh = size * SPECIFIC_CONSUMPTION_FUTURE[inputs.futureInsulation as keyof typeof SPECIFIC_CONSUMPTION_FUTURE];
    const future = calculateCosts(futureHeatingKwh, hotWaterKwh, inputs.futureHeating as keyof typeof ENERGY_PRICES);

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

  const handlePriceChange = (field: keyof typeof customPrices, value: string) => {
    setCustomPrices(prev => ({ ...prev, [field]: value }));
  };

  return (
    <TooltipProvider>
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
                      <Select value={inputs.buildingType} onValueChange={(value) => handleInputChange('buildingType', value)}>
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
                      <Select value={inputs.buildingYear} onValueChange={(value) => handleInputChange('buildingYear', value)}>
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
                  <Select value={inputs.currentHeating} onValueChange={(value) => handleInputChange('currentHeating', value)}>
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
                  <Select value={inputs.futureInsulation} onValueChange={(value) => handleInputChange('futureInsulation', value)}>
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
                  <Select value={inputs.futureHeating} onValueChange={(value) => handleInputChange('futureHeating', value)}>
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
          </div>

          <Collapsible className="mb-6">
            <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full flex items-center justify-center text-gray-600 hover:text-gray-900">
                    <Settings2 className="mr-2 h-4 w-4" />
                    Experteneinstellungen (Energiepreise anpassen)
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 p-4 border rounded-lg bg-gray-50">
                    <div>
                        <Label htmlFor="price-gas" className="text-xs">Gas (€/kWh)</Label>
                        <Input id="price-gas" type="number" step="0.01" value={customPrices.gas} onChange={e => handlePriceChange('gas', e.target.value)} className="mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="price-oil" className="text-xs">Öl (€/kWh)</Label>
                        <Input id="price-oil" type="number" step="0.01" value={customPrices.oil} onChange={e => handlePriceChange('oil', e.target.value)} className="mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="price-strom" className="text-xs">Strom (€/kWh)</Label>
                        <Input id="price-strom" type="number" step="0.01" value={customPrices.waermepumpe} onChange={e => { handlePriceChange('waermepumpe', e.target.value); handlePriceChange('nachtspeicher', e.target.value); }} className="mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="price-pellets" className="text-xs">Pellets (€/kWh)</Label>
                        <Input id="price-pellets" type="number" step="0.01" value={customPrices.pellets} onChange={e => handlePriceChange('pellets', e.target.value)} className="mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="price-fernwaerme" className="text-xs">Fernwärme (€/kWh)</Label>
                        <Input id="price-fernwaerme" type="number" step="0.01" value={customPrices.fernwaerme} onChange={e => handlePriceChange('fernwaerme', e.target.value)} className="mt-1" />
                    </div>
                </div>
            </CollapsibleContent>
          </Collapsible>

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
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="text-lg font-semibold text-gray-800 flex items-center justify-center cursor-help">
                              <TrendingDown className="mr-2 text-blue-600"/> Amortisationszeit
                              <Info className="ml-1.5 h-4 w-4 text-gray-400" />
                            </p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Die Amortisationszeit gibt an, nach wie vielen Jahren sich Ihre Investition durch die jährlichen Energieeinsparungen refinanziert hat.</p>
                          </TooltipContent>
                        </Tooltip>
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
    </TooltipProvider>
  );
};

export default ModernizationSavingsCalculator;
