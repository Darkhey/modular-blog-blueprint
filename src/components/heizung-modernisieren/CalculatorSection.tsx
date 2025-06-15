
import ModernizationSavingsCalculator from '@/components/calculators/ModernizationSavingsCalculator';

const CalculatorSection = () => {
  return (
    <section id="rechner" className="py-16 bg-white/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Berechnen Sie Ihr Sparpotenzial
          </h2>
          <p className="text-xl text-gray-600">
            Inklusive Smart Home Einsparungen - finden Sie heraus, wie viel Sie sparen können
          </p>
        </div>
        <ModernizationSavingsCalculator />
      </div>
    </section>
  );
};

export default CalculatorSection;
