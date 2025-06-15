
import { Euro, TrendingUp, Calculator, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DaemmungCostsSection = () => {
  const costData = [
    {
      area: "Dachbodendämmung",
      method: "Oberste Geschossdecke",
      costRange: "25-40 €/m²",
      totalExample: "2.500-4.000€",
      savings: "400-600€/Jahr",
      difficulty: "Einfach",
      duration: "1-2 Tage",
      description: "Einfachste und kostengünstigste Lösung für ungenutzten Dachboden"
    },
    {
      area: "Dachdämmung",
      method: "Zwischensparrendämmung",
      costRange: "50-80 €/m²",
      totalExample: "8.000-12.000€",
      savings: "600-900€/Jahr",
      difficulty: "Mittel",
      duration: "3-5 Tage",
      description: "Komplette Dachdämmung mit Dampfsperre und neuer Verkleidung"
    },
    {
      area: "Fassadendämmung",
      method: "WDVS (Vollwärmeschutz)",
      costRange: "120-180 €/m²",
      totalExample: "18.000-27.000€",
      savings: "800-1.200€/Jahr",
      difficulty: "Schwer",
      duration: "1-2 Wochen",
      description: "Komplettsystem mit Dämmung, Putz und Anstrich"
    },
    {
      area: "Kellerdämmung",
      method: "Kellerdecke von unten",
      costRange: "25-45 €/m²",
      totalExample: "2.000-3.500€",
      savings: "200-400€/Jahr",
      difficulty: "Einfach",
      duration: "1-2 Tage",
      description: "Dämmplatten werden einfach an die Kellerdecke geklebt"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Einfach': return 'bg-green-100 text-green-800';
      case 'Mittel': return 'bg-yellow-100 text-yellow-800';
      case 'Schwer': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Realistische Kosten für Ihre Dämmung
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparente Preise für alle Dämmmaßnahmen - von der einfachen Dachbodendämmung bis zur kompletten Fassadensanierung.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {costData.map((item, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl text-gray-900">{item.area}</span>
                  <Badge className={getDifficultyColor(item.difficulty)}>
                    {item.difficulty}
                  </Badge>
                </CardTitle>
                <p className="text-gray-600 font-medium">{item.method}</p>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Euro className="h-5 w-5 text-blue-600 mr-1" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{item.costRange}</div>
                    <div className="text-sm text-gray-600">pro m²</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600 mr-1" />
                    </div>
                    <div className="text-2xl font-bold text-green-600">{item.savings}</div>
                    <div className="text-sm text-gray-600">Ersparnis/Jahr</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Gesamtkosten (140m² Haus):</span>
                    <span className="font-semibold text-gray-900">{item.totalExample}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Arbeitszeit:</span>
                    <span className="font-semibold text-gray-900">{item.duration}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Kostenschätzung</h3>
              <p className="text-gray-600 text-sm">
                Alle Preise sind Richtwerte inklusive Material und Montage. 
                Regionale Unterschiede möglich.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Schnelle Amortisation</h3>
              <p className="text-gray-600 text-sm">
                Die meisten Dämmmaßnahmen amortisieren sich in 8-15 Jahren 
                über die Energieeinsparung.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Info className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Förderung beachten</h3>
              <p className="text-gray-600 text-sm">
                Mit staatlicher Förderung reduzieren sich die Kosten 
                um bis zu 40%.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            💰 Finanzierungstipp: Die optimale Reihenfolge
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold mb-2">1.</div>
              <div className="font-semibold">Dachboden (2.500€)</div>
              <div className="text-sm opacity-90">Sofort spürbare Wirkung</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold mb-2">2.</div>
              <div className="font-semibold">Keller (3.000€)</div>
              <div className="text-sm opacity-90">Mehr Komfort</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold mb-2">3.</div>
              <div className="font-semibold">Fassade (20.000€)</div>
              <div className="text-sm opacity-90">Maximale Effizienz</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaemmungCostsSection;
