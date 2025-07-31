
import { CalculationResults } from '@/hooks/useModernizationCalculator';
import { TrendingUp, TrendingDown, Info, ChevronsRight, Leaf } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface CalculatorResultsProps {
  results: CalculationResults | null;
  investmentCosts: string;
}

const CalculatorResults = ({ results, investmentCosts }: CalculatorResultsProps) => {
  if (!results) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200 animate-fade-in">
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
        <p className="text-center text-sm text-gray-600 mt-4">
          Geschätzte Smart-Home-Investition:{' '}
          {results.smartHomeInvestment.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
        </p>

        {/* CO2-Einsparung */}
        <div className="mt-8">
          <div className="flex items-center justify-center space-x-3">
            <Leaf className="w-7 h-7 text-green-700" />
            <div className="text-center">
              <span className="text-xl font-bold text-green-900">{results.co2Savings.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} kg</span>
              <span className="ml-2 text-base text-gray-700 font-semibold">weniger CO₂ pro Jahr</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 text-center mt-1">Durch Ihre Maßnahmen sinkt Ihr jährlicher Treibhausgas-Ausstoß deutlich.</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start text-center mt-6 pt-6 border-t">
          <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
            <p className="text-sm text-gray-600">Kosten vorher</p>
            <div className="text-2xl font-bold text-red-600 mt-1 mb-2">{results.current.total.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
            <div className="text-xs text-gray-500 space-y-1 mt-auto">
                <p>Heizung: {results.current.heating.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
                <p>Warmwasser: {results.current.hotWater.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
                <p>CO₂: {results.current.co2.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} kg</p>
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
                <p>CO₂: {results.future.co2.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} kg</p>
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
    </TooltipProvider>
  );
};

export default CalculatorResults;

