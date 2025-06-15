
import { Link } from 'react-router-dom';
import { Euro, FileText, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DaemmungFundingSection = () => {
  const fundingOptions = [
    {
      title: "BAFA Einzelmaßnahmen",
      amount: "Bis zu 20%",
      maxAmount: "12.000€",
      conditions: ["Mindest-U-Wert erreichen", "Fachbetrieb erforderlich", "Antrag vor Beginn"],
      areas: ["Dach", "Fassade", "Keller", "Oberste Geschossdecke"],
      processing: "4-6 Wochen",
      color: "bg-green-100 text-green-800"
    },
    {
      title: "BAFA + iSFP Bonus",
      amount: "Bis zu 25%",
      maxAmount: "15.000€",
      conditions: ["Individueller Sanierungsfahrplan", "Energieberater beauftragen", "Umsetzung innerhalb 15 Jahre"],
      areas: ["Alle Dämmmaßnahmen im Fahrplan"],
      processing: "6-8 Wochen",
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "KfW Effizienzhaus",
      amount: "Bis zu 40%",
      maxAmount: "48.000€",
      conditions: ["Erreichen Effizienzhaus-Standard", "Energieberater zwingend", "Gesamtsanierung"],
      areas: ["Kombination mehrerer Maßnahmen"],
      processing: "8-12 Wochen",
      color: "bg-purple-100 text-purple-800"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Bis zu 40% Förderung für Ihre Dämmung
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Der Staat unterstützt energetische Sanierungen großzügig. Nutzen Sie die attraktiven Förderprogramme 
            und reduzieren Sie Ihre Investitionskosten erheblich.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-800">
              📋 <strong>Detaillierte Informationen:</strong> Alle aktuellen Förderprogramme finden Sie auf unserer{' '}
              <Link to="/foerdermittel" className="text-blue-600 hover:underline font-semibold">
                Fördermittel-Übersichtsseite
              </Link>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {fundingOptions.map((option, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 animate-fade-in h-full"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="text-center">
                <Badge className={option.color}>{option.title}</Badge>
                <CardTitle className="text-3xl font-bold text-green-600 mt-4">
                  {option.amount}
                </CardTitle>
                <p className="text-gray-600">bis maximal {option.maxAmount}</p>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      Voraussetzungen
                    </h4>
                    <ul className="space-y-1">
                      {option.conditions.map((condition, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 mt-2"></span>
                          {condition}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Förderfähige Bereiche</h4>
                    <div className="flex flex-wrap gap-1">
                      {option.areas.map((area, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600">{option.processing}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                🚀 Förderoptimierung: So holen Sie das Maximum heraus
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <div className="font-semibold">Energieberater beauftragen</div>
                    <div className="text-sm text-gray-600">Erhöht die Förderung um 5% und ist bei größeren Projekten Pflicht</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <div className="font-semibold">Antrag VOR Auftragsvergabe</div>
                    <div className="text-sm text-gray-600">Unbedingt vor Vertragsabschluss beantragen!</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <div className="font-semibold">Maßnahmen kombinieren</div>
                    <div className="text-sm text-gray-600">Gesamtsanierung bringt höhere Förderquoten</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="text-lg font-semibold mb-4 text-center">
                Beispielrechnung: Förderoptimierung
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Gesamtkosten Dämmung:</span>
                  <span className="font-semibold">45.000€</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>BAFA Förderung (20%):</span>
                  <span className="font-semibold">-9.000€</span>
                </div>
                <div className="flex justify-between text-blue-600">
                  <span>iSFP Bonus (5%):</span>
                  <span className="font-semibold">-2.250€</span>
                </div>
                <div className="flex justify-between text-purple-600">
                  <span>Steuerbonus (20%):</span>
                  <span className="font-semibold">-6.750€</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Ihr Eigenanteil:</span>
                  <span className="text-green-600">27.000€</span>
                </div>
                <div className="text-center text-sm text-gray-600">
                  Ersparnis: 40% der Gesamtkosten!
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <Link to="/foerdermittel">
                <FileText className="mr-2 h-5 w-5" />
                Alle Förderprogramme anzeigen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaemmungFundingSection;
