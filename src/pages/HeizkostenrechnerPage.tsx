
import ModernizationSavingsCalculator from '@/components/calculators/ModernizationSavingsCalculator';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

const HeizkostenrechnerPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ModernizationSavingsCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default HeizkostenrechnerPage;
