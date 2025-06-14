
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';

const CalculatorsSection = () => (
  <section className="py-12 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8 animate-fade-in">
        Sanierungsrechner
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calculator 1 */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in" style={{ animationDelay: '200ms' }}>
          <Flame className="text-red-600 mb-4 w-8 h-8" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Heizkostenrechner
          </h3>
          <p className="text-gray-600 mb-4">
            Berechnen Sie Ihr Einsparpotenzial bei einer Heizungsmodernisierung.
          </p>
          <Link
            to="/heizung-modernisieren"
            className="inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Zum Rechner
          </Link>
        </div>

        {/* Calculator 2 */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Flame className="text-blue-600 mb-4 w-8 h-8" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Dämmungsrechner
          </h3>
          <p className="text-gray-600 mb-4">
            Finden Sie die optimale Dämmstärke für Ihr Haus.
          </p>
          <Link
            to="/daemmung-isolierung"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Zum Rechner
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default CalculatorsSection;
