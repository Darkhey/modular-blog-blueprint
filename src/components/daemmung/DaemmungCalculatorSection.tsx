
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, Euro, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DaemmungCalculatorSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Berechnen Sie Ihr individuelles Sparpotenzial
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unser kostenloser Rechner zeigt Ihnen, wie viel Sie mit der optimalen Dämmung sparen können.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-green-600 text-white">
                <CardTitle className="flex items-center text-xl">
                  <Calculator className="mr-3 h-6 w-6" />
                  Dämmungsrechner Features
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Einsparungsberechnung</div>
                      <div className="text-sm text-gray-600">Exakte Heizkosten-Reduktion für Ihr Gebäude</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Euro className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Kostenplanung</div>
                      <div className="text-sm text-gray-600">Realistische Preise für alle Dämmmaßnahmen</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Home className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Materialempfehlung</div>
                      <div className="text-sm text-gray-600">Optimal passende Dämmstoffe für Ihr Projekt</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Beispielrechnung: Einfamilienhaus (140m²)</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Aktuelle Heizkosten:</span>
                  <span className="font-semibold text-red-600">3.200€/Jahr</span>
                </div>
                <div className="flex justify-between">
                  <span>Nach Vollsanierung:</span>
                  <span className="font-semibold text-green-600">1.600€/Jahr</span>
                </div>
                <div className="flex justify-between">
                  <span>Investition:</span>
                  <span className="font-semibold">45.000€</span>
                </div>
                <div className="flex justify-between">
                  <span>Förderung (40%):</span>
                  <span className="font-semibold text-blue-600">-18.000€</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Amortisation:</span>
                  <span className="font-bold text-green-600">17 Jahre</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Kostenloser Dämmungsrechner
              </h3>
              <p className="text-gray-600">
                Erhalten Sie in 3 Minuten eine detaillierte Analyse für Ihr Gebäude
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Haustyp & Baujahr</span>
                  <span className="text-green-600 font-semibold">✓</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Aktuelle Energiekosten</span>
                  <span className="text-green-600 font-semibold">✓</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Geplante Maßnahmen</span>
                  <span className="text-green-600 font-semibold">✓</span>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
              asChild
            >
              <Link to="/daemmungsrechner">
                Jetzt kostenlos berechnen
              </Link>
            </Button>

            <p className="text-center text-sm text-gray-500 mt-4">
              ✓ Kostenlos ✓ Ohne Anmeldung ✓ Sofortiges Ergebnis
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaemmungCalculatorSection;
