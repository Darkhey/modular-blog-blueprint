
import { CalculationResults } from '@/hooks/useModernizationCalculator';
import { TrendingUp, TrendingDown, Info, ChevronsRight, Leaf, Zap } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import ShareResults from '@/components/shared/ShareResults';
import ResultsPDFExport from '@/components/shared/ResultsPDFExport';
import AnimatedGauge from '../AnimatedGauge';

interface CalculatorResultsProps {
  results: CalculationResults | null;
  investmentCosts: string;
}

const CalculatorResults = ({ results, investmentCosts }: CalculatorResultsProps) => {
  if (!results) return null;

  return (
    <TooltipProvider>
      <div className="mt-8 glass rounded-2xl p-8 border border-border animate-fade-in">
        <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
          <TrendingUp className="text-emerald-500" />
          Ihr Einsparpotenzial
        </h3>
        <p className="text-sm text-muted-foreground mb-8">Basierend auf Ihren Angaben und aktuellen Energiepreisen</p>

        {/* Gauges */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <AnimatedGauge
            value={results.annualSavings}
            max={results.current.total}
            label="Jährliche Ersparnis"
            unit="€"
            color="green"
            size="lg"
          />
          <AnimatedGauge
            value={results.savingsPercentage}
            max={100}
            label="Kostenreduktion"
            unit="%"
            color="blue"
            size="lg"
          />
          <AnimatedGauge
            value={results.co2Savings}
            max={results.current.co2}
            label="CO₂ weniger / Jahr"
            unit="kg"
            color="amber"
            size="lg"
          />
        </div>

        {/* Main Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="text-center glass rounded-xl p-6 border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20">
            <p className="text-sm font-medium text-muted-foreground mb-1">Jährliche Ersparnis</p>
            <p className="text-4xl font-bold text-emerald-600">{results.annualSavings.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
            <p className="text-sm font-semibold text-emerald-700 mt-1">({results.savingsPercentage.toFixed(0)}% weniger Kosten)</p>
          </div>
          <div className="text-center glass rounded-xl p-6 border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
            {results.amortizationPeriod ? (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center justify-center cursor-help gap-1">
                      <TrendingDown className="w-4 h-4 text-blue-500" /> Amortisationszeit
                      <Info className="h-3.5 w-3.5 text-muted-foreground/60" />
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Die Amortisationszeit gibt an, nach wie vielen Jahren sich Ihre Investition durch die jährlichen Energieeinsparungen refinanziert hat.</p>
                  </TooltipContent>
                </Tooltip>
                <p className="text-4xl font-bold text-blue-600">
                  {results.amortizationPeriod.toFixed(1)} <span className="text-2xl">Jahre</span>
                </p>
              </>
            ) : parseFloat(investmentCosts) > 0 ? (
              <>
                <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center justify-center gap-1">
                  <TrendingDown className="w-4 h-4 text-blue-500" /> Amortisationszeit
                </p>
                <p className="text-2xl font-bold text-blue-600 pt-2">Lohnt sich nicht</p>
              </>
            ) : null}
          </div>
        </div>

        {/* Smart Home Investment + CO2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="text-center text-sm text-muted-foreground glass rounded-lg p-3 border border-border">
            Geschätzte Smart-Home-Investition:{' '}
            <span className="font-semibold text-foreground">{results.smartHomeInvestment.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
          </div>
          <div className="flex items-center justify-center gap-2 glass rounded-lg p-3 border border-emerald-200">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-bold text-emerald-700">{results.co2Savings.toLocaleString('de-DE', { maximumFractionDigits: 0 })} kg</span>
            <span className="text-sm text-muted-foreground">weniger CO₂ / Jahr</span>
          </div>
        </div>

        {/* Before / After Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start text-center pt-6 border-t border-border">
          <div className="glass rounded-xl p-5 border border-red-200 bg-red-50/30 dark:bg-red-950/10">
            <p className="text-sm text-muted-foreground mb-1">Kosten vorher</p>
            <div className="text-2xl font-bold text-red-600">{results.current.total.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
            <div className="text-xs text-muted-foreground space-y-0.5 mt-3">
              <p>Heizung: {results.current.heating.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
              <p>Warmwasser: {results.current.hotWater.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
              <p>CO₂: {results.current.co2.toLocaleString('de-DE', { maximumFractionDigits: 0 })} kg</p>
            </div>
          </div>

          <div className="h-full flex items-center justify-center">
            <ChevronsRight className="w-8 h-8 text-muted-foreground/40 hidden md:block" />
            <Zap className="w-6 h-6 text-amber-500 md:hidden" />
          </div>

          <div className="glass rounded-xl p-5 border-2 border-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/10">
            <p className="text-sm text-muted-foreground mb-1">Kosten nachher</p>
            <div className="text-2xl font-bold text-emerald-600">{results.future.total.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
            <div className="text-xs text-muted-foreground space-y-0.5 mt-3">
              <p>Heizung: {results.future.heating.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
              <p>Warmwasser: {results.future.hotWater.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
              <p>CO₂: {results.future.co2.toLocaleString('de-DE', { maximumFractionDigits: 0 })} kg</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center glass rounded-lg border border-blue-200 text-blue-700 dark:text-blue-300 p-4">
          <p className="text-sm flex items-center justify-center gap-2">
            <Info className="w-4 h-4" />
            Diese Berechnung ist eine Schätzung basierend auf typischen Durchschnittswerten (Stand 2024/25).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <ShareResults calculatorType="heating" results={results} />
          <ResultsPDFExport calculatorType="heating" results={results} />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CalculatorResults;
