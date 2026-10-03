
import { Calculator, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from "@/components/ui/tooltip";
import { useModernizationCalculator } from '@/hooks/useModernizationCalculator';
import CalculatorInputSection from './modernization/CalculatorInputSection';
import ModernizationPlanSection from './modernization/ModernizationPlanSection';
import ExpertSettings from './modernization/ExpertSettings';
import CalculatorResults from './modernization/CalculatorResults';
import QuickAccessButtons from './QuickAccessButtons';
import ScenarioToggle from './shared/ScenarioToggle';
import CO2PathToggle from './shared/CO2PathToggle';

import ShareResults from '../shared/ShareResults';
import ResultsPDFExport from '../shared/ResultsPDFExport';
import ShareInputs from '../shared/ShareInputs';
import { toast } from '@/hooks/use-toast';
import { PRICE_SCENARIOS, type PriceScenarioKey } from '@/data/energyPrices2026';


const ModernizationSavingsCalculator = () => {
  const {
    inputs,
    calculationMode,
    currentConsumption,
    investmentCosts,
    customPrices,
    selectedSmartSystems,
    estimateSmartInvestment,
    results,
    priceScenario,
    co2Path,
    setPriceScenario,
    setCo2Path,
    handleInputChange,
    setCalculationMode,
    setCurrentConsumption,
    setInvestmentCosts,
    handlePriceChange,
    toggleSmartSystem,
    calculateSavings
  } = useModernizationCalculator();


  return (
    <>
      {/* JSON-LD is emitted by the page-level CalculatorFaqSection */}
      <TooltipProvider>
      <Card className="w-full max-w-5xl mx-auto glass border-2 border-border shadow-xl">
        <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center text-2xl">
            <Calculator className="mr-3 w-8 h-8" />
            Modernisierungs-Einspar-Rechner
          </CardTitle>
            <CardDescription className="text-primary-foreground/80">Berechnen Sie Ihr Sparpotenzial durch Sanierungsmaßnahmen.</CardDescription>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            <CalculatorInputSection
              inputs={inputs}
              handleInputChange={handleInputChange}
              calculationMode={calculationMode}
              setCalculationMode={setCalculationMode}
              currentConsumption={currentConsumption}
              setCurrentConsumption={setCurrentConsumption}
            />
            <ModernizationPlanSection
              inputs={inputs}
              handleInputChange={handleInputChange}
              investmentCosts={investmentCosts}
              setInvestmentCosts={setInvestmentCosts}
              selectedSmartSystems={selectedSmartSystems}
              toggleSmartSystem={toggleSmartSystem}
              estimateSmartInvestment={estimateSmartInvestment}
            />
          </div>

          <ExpertSettings
            customPrices={customPrices}
            handlePriceChange={handlePriceChange}
          />

          <div className="grid gap-3 md:grid-cols-2 mb-4">
            <ScenarioToggle value={priceScenario} onChange={setPriceScenario} />
            <CO2PathToggle enabled={co2Path} onChange={setCo2Path} />
          </div>


          <Button onClick={() => { const error = calculateSavings(); if (error) toast({ title: 'Eingaben prüfen', description: error, variant: 'destructive' }); }} className="w-full font-bold py-4 text-lg">
            <Zap className="mr-2 w-5 h-5" />
            Sparpotenzial berechnen!
          </Button>

          <div className="mt-4">
            <ShareInputs values={{ ...inputs, calculationMode, currentConsumption, investmentCosts, customPrices, selectedSmartSystems, priceScenario, co2Path }} onRestore={(restored) => {
              for (const field of Object.keys(inputs) as (keyof typeof inputs)[]) {
                if (typeof restored[field] === 'string' || typeof restored[field] === 'number') handleInputChange(field, String(restored[field]));
              }
              if (restored.calculationMode === 'details' || restored.calculationMode === 'consumption') setCalculationMode(restored.calculationMode);
              if (typeof restored.currentConsumption === 'string' || typeof restored.currentConsumption === 'number') setCurrentConsumption(String(restored.currentConsumption));
              if (typeof restored.investmentCosts === 'string' || typeof restored.investmentCosts === 'number') setInvestmentCosts(String(restored.investmentCosts));
              if (typeof restored.priceScenario === 'string' && restored.priceScenario in PRICE_SCENARIOS) setPriceScenario(restored.priceScenario as PriceScenarioKey);
              if (typeof restored.co2Path === 'boolean') setCo2Path(restored.co2Path);
              if (restored.customPrices && typeof restored.customPrices === 'object') {
                for (const field of Object.keys(customPrices) as (keyof typeof customPrices)[]) {
                  const value = (restored.customPrices as Record<string, unknown>)[field];
                  if (typeof value === 'number' || typeof value === 'string') handlePriceChange(field, String(value));
                }
              }
              const systems = typeof restored.selectedSmartSystems === 'string'
                ? restored.selectedSmartSystems.split(',') : restored.selectedSmartSystems;
              if (Array.isArray(systems)) {
                for (const system of systems) {
                  if (typeof system === 'string' && !selectedSmartSystems.includes(system as typeof selectedSmartSystems[number])) toggleSmartSystem(system as typeof selectedSmartSystems[number]);
                }
              }
            }} />
          </div>

          <CalculatorResults results={results} investmentCosts={investmentCosts} />
          
          <QuickAccessButtons currentCalculator="heating" className="mt-8" />
        </CardContent>
      </Card>
    </TooltipProvider>
    </>
  );
};

export default ModernizationSavingsCalculator;
