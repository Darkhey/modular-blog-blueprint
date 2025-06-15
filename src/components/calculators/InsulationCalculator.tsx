import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';
import {
  formSchema,
  insulationSystems,
  type FormValues,
  type CalculationResult,
} from './insulation/insulationCalculatorData';
import InsulationCalculatorForm from './insulation/InsulationCalculatorForm';
import InsulationCalculatorResult from './insulation/InsulationCalculatorResult';

const InsulationCalculator = () => {
  const [result, setResult] = useState<CalculationResult | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buildingPart: 'facade',
      area: 100,
      uValueBefore: 1.4,
      insulationSystem: 'wdvs_eps_160',
      heatingCost: 0.15,
    },
  });

  const selectedBuildingPart = form.watch('buildingPart');
  const selectedSystemKey = form.watch('insulationSystem');
  const selectedSystem = insulationSystems[selectedSystemKey];

  // Effekt, um das Dämmsystem zurückzusetzen, wenn sich das Bauteil ändert
  useEffect(() => {
    const availableSystems = Object.entries(insulationSystems).filter(
      ([, system]) => system.part === selectedBuildingPart
    );
    
    if (availableSystems.length > 0) {
      const currentSystemStillValid = availableSystems.some(([key]) => key === selectedSystemKey);
      if (!currentSystemStillValid) {
        form.setValue('insulationSystem', availableSystems[0][0]);
      }
    } else {
      form.setValue('insulationSystem', '');
    }
    setResult(null); // Ergebnis zurücksetzen, wenn Auswahl geändert wird
  }, [selectedBuildingPart, form, selectedSystemKey]);

  const onSubmit = (values: FormValues) => {
    const system = insulationSystems[values.insulationSystem];
    if (!system) return;

    const uValueAfter = system.uValue;
    const deltaU = values.uValueBefore - uValueAfter;

    // Vereinfachte Berechnung basierend auf Heizgradtagen (~3600 K*d/a)
    const energySavingsKwh = deltaU * values.area * 3600 * 24 / 1000;
    const savingsPerYear = energySavingsKwh * values.heatingCost;
    const investment = system.cost * values.area;
    const amortization = savingsPerYear > 0 ? investment / savingsPerYear : Infinity;
    const co2Savings = energySavingsKwh * 0.2; // Faktor für Gasheizung

    setResult({
      investment,
      savingsPerYear,
      amortization,
      co2Savings
    });
  };

  return (
    <Card className="max-w-3xl mx-auto animate-fade-in">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 text-primary p-3 rounded-full">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl">Dämmungsrechner</CardTitle>
            <CardDescription>Berechnen Sie Einsparungen und Amortisation Ihrer Dämmmaßnahme.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <InsulationCalculatorForm 
          form={form}
          onSubmit={onSubmit}
          selectedSystem={selectedSystem}
          selectedBuildingPart={selectedBuildingPart}
        />
        {result && <InsulationCalculatorResult result={result} />}
      </CardContent>
    </Card>
  );
};

export default InsulationCalculator;
