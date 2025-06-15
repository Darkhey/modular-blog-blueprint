
import { Rocket, PiggyBank, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesSection = () => (
  <section className="py-12 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8 animate-fade-in">
        Ihre Vorteile als Hausbesitzer
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <Link to="/projektplaner" className="block transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="bg-white p-6 rounded-lg shadow-sm border h-full">
            <Rocket className="text-green-600 mb-4 w-8 h-8" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Starten Sie Ihr Projekt
            </h3>
            <p className="text-gray-600">
              Egal ob Neubau oder Sanierung – wir begleiten Sie von der ersten Idee bis zur finalen Umsetzung.
            </p>
          </div>
        </Link>

        {/* Feature 2 */}
        <Link to="/budgetplan" className="block transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="bg-white p-6 rounded-lg shadow-sm border h-full">
            <PiggyBank className="text-blue-600 mb-4 w-8 h-8" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Finanzen im Blick
            </h3>
            <p className="text-gray-600">
              Maximieren Sie Ihr Budget durch clevere Planung und die richtigen Fördermittel.
            </p>
          </div>
        </Link>

        {/* Feature 3 */}
        <Link to="/wissenswertes" className="block transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="bg-white p-6 rounded-lg shadow-sm border h-full">
            <Lightbulb className="text-orange-600 mb-4 w-8 h-8" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Wissen, das sich auszahlt
            </h3>
            <p className="text-gray-600">
              Profitieren Sie von verständlichen Anleitungen und Experten-Tipps, um teure Fehler zu vermeiden.
            </p>
          </div>
        </Link>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
