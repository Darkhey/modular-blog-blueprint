
import { Thermometer, Clock, Wifi, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const tippsOptimierung = [
  {
    icon: <Thermometer className="w-6 h-6 text-orange-600" />,
    title: 'Vorlauftemperatur optimieren',
    description: 'Jedes Grad weniger spart 6% Energie. Smart Thermostate helfen dabei automatisch.',
    tipp: 'Zieltemperatur: 35-45°C je nach Heizsystem'
  },
  {
    icon: <Clock className="w-6 h-6 text-orange-600" />,
    title: 'Heizzeiten anpassen',
    description: 'Nur heizen wenn nötig. Präsenzerkennung macht es automatisch.',
    tipp: 'Nachtabsenkung um 3-5°C, tagsüber bei Abwesenheit reduzieren'
  },
  {
    icon: <Wifi className="w-6 h-6 text-orange-600" />,
    title: 'Smart Home nutzen',
    description: 'Vernetzte Systeme optimieren automatisch und sparen bis zu 30% Energie.',
    tipp: 'Wetterprognose, Anwesenheit und Energiepreise berücksichtigen'
  },
  {
    icon: <Wrench className="w-6 h-6 text-orange-600" />,
    title: 'Regelmäßige Wartung',
    description: 'Smart Systeme überwachen kontinuierlich und melden Optimierungsbedarf.',
    tipp: 'Jährliche Wartung erhält Effizienz und verlängert Lebensdauer'
  }
];

const OptimizationTipsSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Profi-Tipps für maximale Effizienz
          </h2>
          <p className="text-xl text-gray-600">
            So holen Sie das Maximum aus Ihrer modernen Heizung heraus
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {tippsOptimierung.map((tipp, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-orange-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-orange-100 rounded-lg">
                    {tipp.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">{tipp.title}</h3>
                    <p className="text-gray-600">{tipp.description}</p>
                    <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                      <p className="text-sm font-medium text-orange-800">
                        💡 <strong>Profi-Tipp:</strong> {tipp.tipp}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OptimizationTipsSection;
