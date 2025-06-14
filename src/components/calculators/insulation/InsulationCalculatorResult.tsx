
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
    </div>
  );
};

export default InsulationCalculatorResult;
