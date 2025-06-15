
import { Home, ArrowUp, Building, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DaemmungAreasSection = () => {
  const areas = [
    {
      icon: ArrowUp,
      title: "Dach & Dachboden",
      priority: "Höchste Priorität",
      priorityColor: "bg-red-100 text-red-800",
      savings: "30-40%",
      costs: "25-80 €/m²",
      description: "Da warme Luft nach oben steigt, entstehen hier die größten Wärmeverluste. Eine Dachdämmung ist oft die rentabelste Einzelmaßnahme.",
      methods: [
        "Zwischensparrendämmung (innen)",
        "Aufsparrendämmung (außen)", 
        "Untersparrendämmung (zusätzlich)",
        "Oberste Geschossdecke (einfachste Lösung)"
      ],
      materials: ["Mineralwolle", "Holzfaser", "Zellulose", "PUR"],
      tips: "Tipp: Bei ungenutztem Dachboden reicht oft die Dämmung der obersten Geschossdecke für 80% der Wirkung bei 30% der Kosten."
    },
    {
      icon: Building,
      title: "Fassade & Außenwände", 
      priority: "Hohe Priorität",
      priorityColor: "bg-orange-100 text-orange-800",
      savings: "20-30%",
      costs: "100-250 €/m²",
      description: "Die Außenwände haben die größte Fläche und bieten enormes Sparpotenzial. Verschiedene Dämmsysteme für jeden Haustyp verfügbar.",
      methods: [
        "WDVS (Wärmedämm-Verbundsystem)",
        "Vorgehängte hinterlüftete Fassade",
        "Einblasdämmung (zweischalig)",
        "Innendämmung (Sonderfälle)"
      ],
      materials: ["EPS", "Mineralwolle", "Holzfaser", "Phenolharz"],
      tips: "Tipp: WDVS ist am günstigsten, VHF am langlebigsten. Bei denkmalgeschützten Häusern oft nur Innendämmung möglich."
    },
    {
      icon: ArrowDown,
      title: "Keller & Bodenplatte",
      priority: "Mittlere Priorität", 
      priorityColor: "bg-yellow-100 text-yellow-800",
      savings: "10-15%",
      costs: "20-60 €/m²",
      description: "Verhindert kalte Füße und Zugluft. Relativ einfach nachrüstbar und kosteneffizient, besonders bei der Kellerdeckendämmung.",
      methods: [
        "Kellerdeckendämmung (von unten)",
        "Kellerwanddämmung (innen/außen)",
        "Perimeterdämmung (erdberührend)",
        "Bodenplattendämmung (Neubau)"
      ],
      materials: ["EPS", "XPS", "Mineralwolle", "PUR"],
      tips: "Tipp: Kellerdeckendämmung von unten ist die einfachste Maßnahme. Platten einfach ankleben oder anschrauben."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Wo Sie am meisten sparen: Die wichtigsten Dämmungsarten
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nicht alle Dämmmaßnahmen sind gleich effektiv. Hier erfahren Sie, wo Sie das beste Kosten-Nutzen-Verhältnis erzielen.
          </p>
        </div>

        <div className="space-y-12">
          {areas.map((area, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <area.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900">{area.title}</CardTitle>
                      <Badge className={area.priorityColor}>{area.priority}</Badge>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{area.savings}</div>
                      <div className="text-sm text-gray-500">Einsparung</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{area.costs}</div>
                      <div className="text-sm text-gray-500">Kosten</div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-8">
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {area.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Home className="h-4 w-4 mr-2 text-green-600" />
                      Dämmverfahren
                    </h4>
                    <ul className="space-y-2">
                      {area.methods.map((method, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          {method}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Geeignete Materialien
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {area.materials.map((material, idx) => (
                        <Badge key={idx} variant="outline" className="text-gray-600">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-800 font-medium">
                    💡 {area.tips}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Optimale Reihenfolge für maximale Effizienz
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-300 mb-2">1.</div>
                <div className="font-semibold">Dach & Dachboden</div>
                <div className="text-sm opacity-90">Größte Wirkung</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-300 mb-2">2.</div>
                <div className="font-semibold">Fassade</div>
                <div className="text-sm opacity-90">Größte Fläche</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-300 mb-2">3.</div>
                <div className="font-semibold">Keller</div>
                <div className="text-sm opacity-90">Komfort-Boost</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaemmungAreasSection;
