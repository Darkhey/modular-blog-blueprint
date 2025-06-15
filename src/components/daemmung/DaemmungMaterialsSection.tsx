
import { Link } from 'react-router-dom';
import { Leaf, Shield, TrendingUp, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import InsulationComparisonTable from '@/components/blog/post/InsulationComparisonTable';

const DaemmungMaterialsSection = () => {
  const materials = [
    {
      name: "Mineralwolle (Glaswolle/Steinwolle)",
      lambda: "0,032-0,040",
      pros: ["Nicht brennbar (A1)", "Günstig", "Vielseitig einsetzbar", "Gute Schalldämmung"],
      cons: ["Juckt bei Verarbeitung", "Feuchtigkeitsempfindlich"],
      applications: ["Dach", "Fassade", "Keller", "Trennwände"],
      eco: "Teils recycelbar",
      price: "€"
    },
    {
      name: "EPS (Styropor)",
      lambda: "0,031-0,040",
      pros: ["Sehr günstig", "Leicht verarbeitbar", "Feuchtigkeitsresistent"],
      cons: ["Brennbar", "Nicht ökologisch", "Geringer Hitzeschutz"],
      applications: ["Fassade (WDVS)", "Kellerdecke", "Bodenplatte"],
      eco: "Nicht recyclebar",
      price: "€"
    },
    {
      name: "Holzfaser",
      lambda: "0,036-0,050",
      pros: ["Ökologisch", "Sehr guter Hitzeschutz", "Atmungsaktiv", "Recyclebar"],
      cons: ["Teurer", "Dickere Dämmung nötig"],
      applications: ["Dach", "Fassade", "Innendämmung"],
      eco: "Vollständig ökologisch",
      price: "€€€"
    },
    {
      name: "PUR/PIR-Hartschaum",
      lambda: "0,022-0,028",
      pros: ["Beste Dämmwirkung", "Dünn", "Druckfest"],
      cons: ["Sehr teuer", "Nicht ökologisch", "Brennbar"],
      applications: ["Dach", "Fassade", "Boden"],
      eco: "Nicht recyclebar",
      price: "€€€€"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Dämmstoffe im Vergleich: Welcher passt zu Ihnen?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Die Wahl des richtigen Dämmstoffs entscheidet über Effizienz, Kosten und Nachhaltigkeit Ihrer Sanierung.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-800">
              📖 <strong>Ausführlicher Ratgeber:</strong> Lesen Sie unseren detaillierten{' '}
              <Link to="/blog/effektive-daemmung-ratgeber" className="text-blue-600 hover:underline font-semibold">
                Dämmungs-Ratgeber mit allen Materialien und Methoden
              </Link>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {materials.map((material, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{material.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      λ: {material.lambda}
                    </span>
                    <span className="text-sm text-gray-500">{material.price}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Vorteile
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {material.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2 flex items-center">
                      <Shield className="h-4 w-4 mr-1" />
                      Nachteile
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {material.cons.map((con, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center">
                      <Leaf className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-gray-600">{material.eco}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {material.applications.join(", ")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Detaillierte Materialvergleich-Tabelle
          </h3>
          <InsulationComparisonTable />
          <div className="text-center mt-6">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link to="/daemmungsrechner">
                <ExternalLink className="mr-2 h-4 w-4" />
                Zum Dämmungsrechner
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaemmungMaterialsSection;
