
import { Calculator, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from "@/components/ui/tooltip";
import { useModernizationCalculator } from '@/hooks/useModernizationCalculator';
import CalculatorInputSection from './modernization/CalculatorInputSection';
import ModernizationPlanSection from './modernization/ModernizationPlanSection';
import ExpertSettings from './modernization/ExpertSettings';
import CalculatorResults from './modernization/CalculatorResults';

const ModernizationSavingsCalculator = () => {
  const {
    inputs,
    calculationMode,
    currentConsumption,
    investmentCosts,
    customPrices,
    results,
    handleInputChange,
    setCalculationMode,
    setCurrentConsumption,
    setInvestmentCosts,
    handlePriceChange,
    calculateSavings
  } = useModernizationCalculator();

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
            />
          </div>

          <ExpertSettings
            customPrices={customPrices}
            handlePriceChange={handlePriceChange}
          />

          <Button onClick={calculateSavings} className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-300">
            <Zap className="mr-2 w-5 h-5" />
            Sparpotenzial berechnen!
          </Button>

          <CalculatorResults results={results} investmentCosts={investmentCosts} />
          
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default ModernizationSavingsCalculator;
