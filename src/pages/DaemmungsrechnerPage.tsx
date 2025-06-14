
import InsulationCalculator from '@/components/calculators/InsulationCalculator';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

const DaemmungsrechnerPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <InsulationCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default DaemmungsrechnerPage;
