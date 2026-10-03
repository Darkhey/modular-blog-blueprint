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
import InsulationInfoSection from "./insulation/InsulationInfoSection";
import QuickAccessButtons from './QuickAccessButtons';

import ShareResults from '../shared/ShareResults';
import ResultsPDFExport from '../shared/ResultsPDFExport';
import ShareInputs from '../shared/ShareInputs';
import { CO2_FACTORS, PRICE_SCENARIOS, DEFAULT_SCENARIO } from '@/data/energyPrices2026';
import ScenarioToggle from './shared/ScenarioToggle';
import type { PriceScenarioKey } from '@/data/energyPrices2026';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { heatingDegreeDaysForPostcode } from '@/lib/heatingDegreeDays';


const InsulationCalculator = () => {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [scenario, setScenario] = useState<PriceScenarioKey>(DEFAULT_SCENARIO);
  const [postcode, setPostcode] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buildingPart: 'facade',
      area: 100,
      uValueBefore: 1.4,
      insulationSystem: 'wdvs_eps_160',
      heatingCost: PRICE_SCENARIOS[DEFAULT_SCENARIO].gas,
    },
  });

  const selectedBuildingPart = form.watch('buildingPart');
  const selectedSystemKey = form.watch('insulationSystem');
  const selectedSystem = insulationSystems[selectedSystemKey];
  const watchedValues = form.watch();

  useEffect(() => {
    const subscription = form.watch(() => setResult(null));
    return () => subscription.unsubscribe();
  }, [form]);

  const restoreFromUrl = (restored: Record<string, unknown>) => {
    const parsed = formSchema.safeParse({ ...form.getValues(), ...restored });
    if (!parsed.success || insulationSystems[parsed.data.insulationSystem]?.part !== parsed.data.buildingPart) return;
    form.reset(parsed.data);
    if (typeof restored.postcode === 'string' && (/^\d{5}$/.test(restored.postcode) || restored.postcode === '')) setPostcode(restored.postcode);
    if (typeof restored.scenario === 'string' && restored.scenario in PRICE_SCENARIOS) setScenario(restored.scenario as PriceScenarioKey);
  };


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

    // Vereinfachte Heizgradtage; ohne PLZ gilt ein bundesweiter Richtwert.
    const energySavingsKwh = Math.max(0, deltaU * values.area * heatingDegreeDaysForPostcode(postcode) * 24 / 1000);
    const savingsPerYear = energySavingsKwh * values.heatingCost;
    const investment = system.cost * values.area;
    const amortization = savingsPerYear > 0 ? investment / savingsPerYear : Infinity;
    const co2Savings = energySavingsKwh * CO2_FACTORS.gas; // Näherung: Gasheizung

    setResult({
      investment,
      savingsPerYear,
      amortization,
      co2Savings
    });
  };

  return (
    <>
      {/* JSON-LD is emitted by the page-level CalculatorFaqSection */}
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
        <div className="space-y-4 mb-6">
          <ScenarioToggle value={scenario} onChange={(value) => {
            setScenario(value);
            form.setValue('heatingCost', PRICE_SCENARIOS[value].gas);
            setResult(null);
          }} />
          <div className="space-y-1 max-w-xs">
            <Label htmlFor="insulation-plz">Postleitzahl (optional)</Label>
            <Input id="insulation-plz" inputMode="numeric" maxLength={5} value={postcode} placeholder="z. B. 80331" onChange={(e) => { setPostcode(e.target.value.replace(/\D/g, '').slice(0, 5)); setResult(null); }} />
            <p className="text-xs text-muted-foreground">Regionale Heizgradtage näherungsweise berücksichtigen; ohne PLZ: 3.600 K·d/Jahr.</p>
          </div>
        </div>
        <InsulationCalculatorForm 
          form={form}
          onSubmit={onSubmit}
          selectedSystem={selectedSystem}
          selectedBuildingPart={selectedBuildingPart}
        />
        <div className="mt-4">
          <ShareInputs values={{ ...watchedValues, postcode, scenario }} onRestore={restoreFromUrl} />
        </div>
        {result && (
          <>
            <InsulationCalculatorResult result={result} />
            <div className="mt-4 flex gap-2 flex-wrap">
              <ShareResults calculatorType="insulation" results={result} inputs={{ ...watchedValues, postcode, scenario }} />
              <ResultsPDFExport calculatorType="insulation" results={{ ...result, inputs: { ...watchedValues, postcode, scenario } }} />
            </div>
          </>
        )}

        <QuickAccessButtons currentCalculator="insulation" className="mt-8" />
        <InsulationInfoSection />
      </CardContent>
    </Card>
    </>
  );
};

export default InsulationCalculator;
