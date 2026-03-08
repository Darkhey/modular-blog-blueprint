
import { ArrowRight, BadgePercent, Info, TrendingUp, Leaf, Zap } from 'lucide-react';
import { CalculationResult } from './insulationCalculatorData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ShareResults from '@/components/shared/ShareResults';
import AnimatedGauge from '../AnimatedGauge';

interface InsulationCalculatorResultProps {
  result: CalculationResult;
}

const InsulationCalculatorResult = ({ result }: InsulationCalculatorResultProps) => {
  const savingsPercent = result.investment > 0 ? Math.round((result.savingsPerYear / result.investment) * 100) : 0;

  return (
    <TooltipProvider>
      <div className="mt-8 pt-8 border-t border-border animate-fade-in">
        <h3 className="text-xl font-bold text-center mb-2 text-foreground flex items-center justify-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          Ihr Ergebnis
        </h3>
        <p className="text-center text-sm text-muted-foreground mb-8">Basierend auf Ihren Angaben</p>

        {/* Gauges Row */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <AnimatedGauge
            value={result.savingsPerYear}
            max={result.investment}
            label="Ersparnis / Jahr"
            unit="€"
            color="green"
          />
          <AnimatedGauge
            value={Math.min(result.amortization, 30)}
            max={30}
            label="Amortisation"
            unit={isFinite(result.amortization) ? `${result.amortization.toFixed(1)} J.` : 'Nie'}
            color="blue"
          />
          <AnimatedGauge
            value={result.co2Savings}
            max={Math.max(result.co2Savings * 1.5, 1000)}
            label="CO₂-Einsparung / Jahr"
            unit="kg"
            color="amber"
          />
        </div>

        {/* Detail Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div className="glass rounded-xl p-5 border border-border">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-1">
              <p>Investitionskosten</p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Die geschätzten Gesamtkosten für die Installation<br />des gewählten Dämmsystems auf der angegebenen Fläche.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {result.investment.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </p>
          </div>
          <div className="glass rounded-xl p-5 border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20">
            <div className="flex items-center justify-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 mb-1">
              <Zap className="w-4 h-4" />
              <p>Heizkostenersparnis p.a.</p>
            </div>
            <p className="text-2xl font-bold text-emerald-600">
              {result.savingsPerYear.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </p>
          </div>
          <div className="glass rounded-xl p-5 border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
            <div className="flex items-center justify-center gap-2 text-sm text-blue-700 dark:text-blue-400 mb-1">
              <p>Amortisationszeit</p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Die Zeit, nach der sich die Investition durch<br />eingesparte Heizkosten refinanziert hat.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {isFinite(result.amortization) ? `${result.amortization.toFixed(1)} Jahre` : 'Nie'}
            </p>
          </div>
          <div className="glass rounded-xl p-5 border border-amber-200 bg-amber-50/50 dark:bg-amber-950/20">
            <div className="flex items-center justify-center gap-2 text-sm text-amber-700 dark:text-amber-400 mb-1">
              <Leaf className="w-4 h-4" />
              <p>CO₂-Einsparung p.a.</p>
            </div>
            <p className="text-2xl font-bold text-amber-600">
              {result.co2Savings.toFixed(0)} kg
            </p>
          </div>
        </div>

        {/* Funding CTA */}
        <div className="mt-8 glass rounded-xl p-6 border-2 border-dashed border-emerald-300 dark:border-emerald-700">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-3 rounded-xl flex-shrink-0 shadow-lg">
              <BadgePercent className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground">Staatliche Förderung nutzen!</h4>
              <p className="text-muted-foreground mt-1 mb-4">
                Für energetische Sanierungen können Sie hohe staatliche Zuschüsse (BEG-Förderung) von bis zu 70% erhalten. Das verkürzt die Amortisationszeit erheblich!
              </p>
              <a
                href="/blog/beg-foerderung-2024"
                className="inline-flex items-center gap-2 font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 group"
              >
                Mehr zur BEG-Förderung 2024
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        <ShareResults calculatorType="insulation" results={result} className="mt-8" />
      </div>
    </TooltipProvider>
  );
};

export default InsulationCalculatorResult;
