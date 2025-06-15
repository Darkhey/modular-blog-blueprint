
import InsulationCalculator from '@/components/calculators/InsulationCalculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import InsulationManufacturers from '@/components/manufacturers/InsulationManufacturers';

const DaemmungsrechnerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">
            Dämmungsrechner
          </h1>
          <p className="text-gray-600 text-lg mb-8 animate-fade-in">
            Berechnen Sie hier die optimale Dämmstoffstärke und das
            Einsparpotenzial für Ihr Gebäude.
          </p>
          {/* NEU: Hinweis auf Dämmstoff-Artikel */}
          <div className="mb-6">
            <Card className="bg-blue-50 shadow-none border-blue-200 animate-fade-in">
              <CardHeader>
                <CardTitle>
                  Dämmstoffe 2025 – Der große Vergleich
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Sie überlegen, welcher Dämmstoff am besten für Ihre Modernisierung passt? Lesen Sie unseren neuen Überblicksartikel: <Link to="/blog/daemmstoffe-vergleich-2025" className="text-green-700 hover:underline font-semibold">Dämmstoffe im Vergleich: Mineralwolle, EPS, Holzfaser & viele mehr</Link>.
                </p>
              </CardContent>
            </Card>
          </div>
          <InsulationCalculator />
        </div>
        <div className="mt-12">
          <InsulationManufacturers />
        </div>
      </main>
    </div>
  );
};

export default DaemmungsrechnerPage;
