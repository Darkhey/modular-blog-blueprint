
import { ArrowRight, BadgePercent } from 'lucide-react';
import { CalculationResult } from './insulationCalculatorData';

interface InsulationCalculatorResultProps {
  result: CalculationResult;
}

const InsulationCalculatorResult = ({ result }: InsulationCalculatorResultProps) => {
  return (
    <div className="mt-8 pt-8 border-t animate-fade-in">
      <h3 className="text-xl font-bold text-center mb-6">Ihr Ergebnis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-muted-foreground">Investitionskosten</p>
          <p className="text-2xl font-bold text-primary">
            {result.investment.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </p>
        </div>
        <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-400">Heizkostenersparnis p.a.</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-500">
            {result.savingsPerYear.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </p>
        </div>
        <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">Amortisationszeit</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-500">
            {isFinite(result.amortization) ? `${result.amortization.toFixed(1)} Jahre` : 'Nie'}
          </p>
        </div>
        <div className="p-4 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
          <p className="text-sm text-teal-700 dark:text-teal-400">CO₂-Einsparung p.a.</p>
          <p className="text-2xl font-bold text-teal-600 dark:text-teal-500">
            {result.co2Savings.toFixed(0)} kg
          </p>
        </div>
      </div>
      <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border-2 border-dashed border-emerald-200 dark:border-emerald-800">
        <div className="flex items-start gap-4">
          <div className="bg-emerald-500 text-white p-3 rounded-full flex-shrink-0">
             <BadgePercent className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">Staatliche Förderung nutzen!</h4>
            <p className="text-muted-foreground mt-1 mb-4">
              Für energetische Sanierungen wie diese können Sie hohe staatliche Zuschüsse (BEG-Förderung) von bis zu 70% erhalten. Das verkürzt die Amortisationszeit erheblich!
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
    </div>
  );
};

export default InsulationCalculatorResult;
