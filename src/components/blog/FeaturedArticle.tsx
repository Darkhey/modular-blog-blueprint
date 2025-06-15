
import { Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedArticle = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Aktuelle Highlights</h2>
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border mb-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Award className="text-white w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tipp: Moderne Fenster für mehr Effizienz & Wohnkomfort</h3>
            <p className="text-gray-600 mb-4">
              Von Materialien und Verglasung über Kosten und Förderung bis hin zum richtigen Einbau – erfahren Sie alles im großen Ratgeber 2025.
            </p>
            <Link 
              to="/blog/moderne-fenster-ratgeber-2025"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              Fenster-Ratgeber lesen →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;
