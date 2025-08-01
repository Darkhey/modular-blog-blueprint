
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import QuickAccessButtons from './QuickAccessButtons';
import CalculatorStructuredData from '../seo/CalculatorStructuredData';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, PiggyBank, Zap, Sun, TrendingUp } from 'lucide-react';

interface SolarResults {
  anlageGroesse: number;
  stromertrag: number;
  eigenverbrauch: number;
  netzeinspeisung: number;
  ersparnis: number;
  einspeiseverguetung: number;
  gesamtersparnis: number;
  amortisation: number;
}

const SolarCalculator = () => {
  const [dachflaeche, setDachflaeche] = useState('50');
  const [stromverbrauch, setStromverbrauch] = useState('4000');
  const [ausrichtung, setAusrichtung] = useState('sued');
  const [results, setResults] = useState<SolarResults | null>(null);

  // Constants for calculation - simplified
  const KWH_PER_KWP = 950; // kWh produced per kWp per year (average for Germany)
  const COST_PER_KWP = 1500; // € per kWp installed
  const KWH_PRICE = 0.30; // € per kWh from grid
  const FEED_IN_TARIFFF = 0.082; // € per kWh fed into grid
  const SELF_CONSUMPTION_RATIO = 0.3; // 30% of produced energy is self-consumed
  const M2_PER_KWP = 7; // m² roof area needed per kWp

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const area = parseFloat(dachflaeche);
    const consumption = parseFloat(stromverbrauch);

    if (isNaN(area) || isNaN(consumption) || area <= 0 || consumption <= 0) {
      setResults(null);
      return;
    }

    const anlageGroesse = parseFloat((area / M2_PER_KWP).toFixed(2));
    
    let ertragModifier = 1;
    if (ausrichtung === 'ost-west') ertragModifier = 0.85;
    if (ausrichtung === 'nord') ertragModifier = 0.6;

    const stromertrag = anlageGroesse * KWH_PER_KWP * ertragModifier;
    const eigenverbrauch = Math.min(stromertrag * SELF_CONSUMPTION_RATIO, consumption);
    const netzeinspeisung = stromertrag - eigenverbrauch;
    const ersparnis = eigenverbrauch * KWH_PRICE;
    const einspeiseverguetung = netzeinspeisung * FEED_IN_TARIFFF;
    const gesamtersparnis = ersparnis + einspeiseverguetung;
    const anlagekosten = anlageGroesse * COST_PER_KWP;
    const amortisation = anlagekosten / gesamtersparnis;

    setResults({
      anlageGroesse,
      stromertrag: Math.round(stromertrag),
      eigenverbrauch: Math.round(eigenverbrauch),
      netzeinspeisung: Math.round(netzeinspeisung),
      ersparnis: Math.round(ersparnis),
      einspeiseverguetung: Math.round(einspeiseverguetung),
      gesamtersparnis: Math.round(gesamtersparnis),
      amortisation: parseFloat(amortisation.toFixed(1)),
    });
  };

  return (
    <>
      <CalculatorStructuredData 
        calculatorType="solar" 
        title="Solar-Potenzial Rechner - Solaranlage berechnen"
        description="Ermitteln Sie das Potenzial Ihrer Dachfläche für eine Solaranlage. Dachflächenanalyse, Ertragsberechnung und Wirtschaftlichkeit."
      />
      <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="text-primary" />
          Solar-Potenzial Rechner
        </CardTitle>
        <CardDescription>
          Ermitteln Sie schnell und einfach das Potenzial Ihrer Dachfläche für eine Solaranlage.
          Die Werte sind Schätzungen.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleCalculate}>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="dachflaeche">Verfügbare Dachfläche (in m²)</Label>
            <Input id="dachflaeche" type="number" value={dachflaeche} onChange={(e) => setDachflaeche(e.target.value)} placeholder="z.B. 50" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stromverbrauch">Jährlicher Stromverbrauch (in kWh)</Label>
            <Input id="stromverbrauch" type="number" value={stromverbrauch} onChange={(e) => setStromverbrauch(e.target.value)} placeholder="z.B. 4000" required />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="ausrichtung">Dachausrichtung</Label>
            <Select value={ausrichtung} onValueChange={setAusrichtung}>
              <SelectTrigger id="ausrichtung">
                <SelectValue placeholder="Ausrichtung wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sued">Südausrichtung</SelectItem>
                <SelectItem value="ost-west">Ost/West-Ausrichtung</SelectItem>
                <SelectItem value="nord">Nordausrichtung (weniger empfohlen)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full md:w-auto">
            <Zap className="mr-2" />
            Potenzial berechnen
          </Button>
        </CardFooter>
      </form>
      {results && (
        <CardContent className="mt-6 border-t pt-6 bg-green-50/50 rounded-b-lg">
          <h3 className="text-lg font-semibold mb-4">Ihr geschätztes Solar-Potenzial:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <Sun className="text-yellow-500" size={20} />
              <div>
                <p className="text-muted-foreground">Mögliche Anlagengröße</p>
                <p className="font-bold">{results.anlageGroesse} kWp</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="text-blue-500" size={20} />
              <div>
                <p className="text-muted-foreground">Jährlicher Stromertrag</p>
                <p className="font-bold">{results.stromertrag.toLocaleString('de-DE')} kWh</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PiggyBank className="text-green-600" size={20} />
              <div>
                <p className="text-muted-foreground">Gesamtersparnis pro Jahr</p>
                <p className="font-bold text-green-600">~ {results.gesamtersparnis.toLocaleString('de-DE')} €</p>
              </div>
            </div>
             <div className="flex items-center gap-3">
              <TrendingUp className="text-indigo-500" size={20} />
              <div>
                <p className="text-muted-foreground">Amortisationszeit</p>
                <p className="font-bold">{results.amortisation} Jahre</p>
              </div>
            </div>
          </div>
        </CardContent>
      )}
      
      {results && (
        <CardContent className="pt-0">
          <QuickAccessButtons currentCalculator="solar" className="mt-6" />
        </CardContent>
      )}
    </Card>
    </>
  );
};

export default SolarCalculator;
