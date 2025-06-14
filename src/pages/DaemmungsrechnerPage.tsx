
import InsulationCalculator from '@/components/calculators/InsulationCalculator';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import InsulationManufacturers from '@/components/manufacturers/InsulationManufacturers';

const DaemmungsrechnerPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-background">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-8 md:py-12">
            <InsulationCalculator />
        </section>
        <InsulationManufacturers />
      </main>
      <Footer />
    </div>
  );
};

export default DaemmungsrechnerPage;
