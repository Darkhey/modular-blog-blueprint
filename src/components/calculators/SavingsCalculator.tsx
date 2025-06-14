
import { useState } from 'react';
import { Calculator, Euro, Zap, ThermometerSun, ThermometerSnowflake, Users, Home, Heater } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HeatingCostCalculator = () => {
  const [inputs, setInputs] = useState({
    houseSize: '150',
    insulationStatus: 'mittel',
    heatingType: 'gas',
    personCount: '4',
  });
  
  const [results, setResults] = useState<{
    heatingCosts: number;
    hotWaterCosts: number;
    totalCosts: number;
    winterMonthCosts: number;
    summerMonthCosts: number;
    totalKwh: number;
  } | null>(null);

  const calculateCosts = () => {
    const size = parseFloat(inputs.houseSize);
    const persons = parseInt(inputs.personCount);
    
    if (!size || !persons) return;

    // Näherungswerte für Energiepreise (Stand 2024/2025) in €/kWh
    const ENERGY_PRICES = {
      gas: 0.10,
      oil: 0.11,
      waermepumpe: 0.30, // Spezieller Wärmepumpen-Stromtarif
      pellets: 0.08,
      nachtspeicher: 0.25,
    };

    // Spezifischer Wärmebedarf in kWh/m² pro Jahr je nach Dämmung
    const SPECIFIC_CONSUMPTION = {
      schlecht: 200,
      mittel: 140,
      gut: 60,
    };
    
    const HOT_WATER_PER_PERSON_KWH = 1000;
    const HEATPUMP_SCOP = 3.5; // Jahresarbeitszahl für Wärmepumpe

    const heatingKwh = size * SPECIFIC_CONSUMPTION[inputs.insulationStatus as keyof typeof SPECIFIC_CONSUMPTION];
    const hotWaterKwh = persons * HOT_WATER_PER_PERSON_KWH;
    
    let pricePerKwh = ENERGY_PRICES[inputs.heatingType as keyof typeof ENERGY_PRICES];
    let finalHeatingKwh = heatingKwh;
    let finalHotWaterKwh = hotWaterKwh;

    if (inputs.heatingType === 'waermepumpe') {
      // Bei Wärmepumpe wird der Stromverbrauch berechnet
      finalHeatingKwh = heatingKwh / HEATPUMP_SCOP;
      finalHotWaterKwh = hotWaterKwh / HEATPUMP_SCOP;
    }
    
    const heatingCosts = finalHeatingKwh * pricePerKwh;
    const hotWaterCosts = finalHotWaterKwh * pricePerKwh;
    const totalCosts = heatingCosts + hotWaterCosts;

    // Annahme: 7 Heizmonate (Okt-Apr), 5 Sommermonate
    const winterMonthCosts = (heatingCosts / 7) + (hotWaterCosts / 12);
    const summerMonthCosts = hotWaterCosts / 12;

    setResults({
      heatingCosts,
      hotWaterCosts,
      totalCosts,
      winterMonthCosts,
      summerMonthCosts,
      totalKwh: heatingKwh + hotWaterKwh, // Gesamt-Wärmeenergie
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-white to-green-50 border-2 border-green-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center text-2xl">
          <Calculator className="mr-3 w-8 h-8" />
          Heizkostenrechner
        </CardTitle>
        <p className="text-green-100">Ermitteln Sie Ihre voraussichtlichen Heizkosten</p>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="houseSize" className="text-sm font-semibold text-gray-700 flex items-center">
              <Home className="mr-2 h-4 w-4" /> Wohnfläche (m²)
            </Label>
            <Input
              id="houseSize"
              type="number"
              placeholder="z.B. 150"
              value={inputs.houseSize}
              onChange={(e) => setInputs({...inputs, houseSize: e.target.value})}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="personCount" className="text-sm font-semibold text-gray-700 flex items-center">
             <Users className="mr-2 h-4 w-4" /> Personen im Haushalt
            </Label>
            <Input
              id="personCount"
              type="number"
              placeholder="z.B. 4"
              value={inputs.personCount}
              onChange={(e) => setInputs({...inputs, personCount: e.target.value})}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="insulationStatus" className="text-sm font-semibold text-gray-700 flex items-center">
                <Home className="mr-2 h-4 w-4" /> Dämmungszustand
            </Label>
            <Select value={inputs.insulationStatus} onValueChange={(value) => setInputs({...inputs, insulationStatus: value})}>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Zustand wählen" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="schlecht">Schlecht (unsaniert)</SelectItem>
                    <SelectItem value="mittel">Mittel (teil-saniert)</SelectItem>
                    <SelectItem value="gut">Gut (saniert/Neubau)</SelectItem>
                </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="heatingType" className="text-sm font-semibold text-gray-700 flex items-center">
              <Heater className="mr-2 h-4 w-4" /> Aktuelle Heizung
            </Label>
            <Select value={inputs.heatingType} onValueChange={(value) => setInputs({...inputs, heatingType: value})}>
                <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Heizung wählen" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="gas">Gasheizung</SelectItem>
                    <SelectItem value="oil">Ölheizung</SelectItem>
                    <SelectItem value="waermepumpe">Wärmepumpe</SelectItem>
                    <SelectItem value="pellets">Pelletheizung</SelectItem>
                    <SelectItem value="nachtspeicher">Nachtspeicher</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={calculateCosts}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <Zap className="mr-2 w-5 h-5" />
          Heizkosten jetzt berechnen!
        </Button>

        {results && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Euro className="mr-2 text-green-600" />
              Ihre voraussichtlichen Kosten:
            </h3>
            
            <div className="text-center mb-4">
                <p className="text-lg font-semibold text-gray-800">Gesamtkosten pro Jahr</p>
                <p className="text-4xl font-bold text-green-600 my-1">{results.totalCosts.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
                <p className="text-sm text-gray-600">({results.heatingCosts.toFixed(0)}€ für Heizen + {results.hotWaterCosts.toFixed(0)}€ für Warmwasser)</p>
                <p className="text-sm text-gray-600 mt-1">Geschätzter Wärmebedarf: {results.totalKwh.toLocaleString('de-DE')} kWh/Jahr</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <ThermometerSnowflake className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">
                  {results.winterMonthCosts.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                </div>
                <p className="text-sm text-gray-600">pro Wintermonat</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <ThermometerSun className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-500">
                  {results.summerMonthCosts.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                </div>
                <p className="text-sm text-gray-600">pro Sommermonat</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-4">
                💡 Diese Berechnung ist eine Schätzung basierend auf typischen Durchschnittswerten und Energiepreisen (Stand 2024/25). Ihr individueller Verbrauch kann abweichen.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HeatingCostCalculator;
