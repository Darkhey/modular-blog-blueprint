
import ModernizationSavingsCalculator from '@/components/calculators/ModernizationSavingsCalculator';

const HeizkostenrechnerPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <ModernizationSavingsCalculator />
      </main>
    </div>
  );
};

export default HeizkostenrechnerPage;
