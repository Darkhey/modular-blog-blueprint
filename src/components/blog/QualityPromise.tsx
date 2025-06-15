
import { BookOpen, TrendingUp, Award } from 'lucide-react';

const QualityPromise = () => {
  return (
    <div className="mt-12 bg-white p-6 rounded-lg border">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Unser Qualitätsversprechen
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <BookOpen className="text-blue-600 w-6 h-6" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Expertenwissen</h4>
            <p className="text-gray-600 text-center">
              Alle Artikel werden von Fachexperten geprüft und regelmäßig aktualisiert.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <TrendingUp className="text-green-600 w-6 h-6" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Praxisnah</h4>
            <p className="text-gray-600 text-center">
              Konkrete Tipps und Anleitungen, die Sie direkt umsetzen können.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
              <Award className="text-orange-600 w-6 h-6" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Aktuell</h4>
            <p className="text-gray-600 text-center">
              Immer auf dem neuesten Stand zu Förderungen und Technik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityPromise;
