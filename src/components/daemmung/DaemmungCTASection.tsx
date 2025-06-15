
import { Link } from 'react-router-dom';
import { Calculator, Phone, FileText, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DaemmungCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Starten Sie jetzt Ihre Dämmung!
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Mit der richtigen Dämmung sparen Sie ab dem ersten Tag Heizkosten und steigern den Wert Ihrer Immobilie. 
            Wir unterstützen Sie bei jedem Schritt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calculator className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Kostenlosen Rechner starten</h3>
              <p className="opacity-90 mb-6">
                Erfahren Sie in 3 Minuten, wie viel Sie mit der optimalen Dämmung sparen können.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 w-full font-semibold"
                asChild
              >
                <Link to="/daemmungsrechner">
                  Zum Rechner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Förderung beantragen</h3>
              <p className="opacity-90 mb-6">
                Bis zu 40% staatliche Förderung sichern. Wir zeigen Ihnen alle aktuellen Programme.
              </p>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-green-600 w-full font-semibold"
                asChild
              >
                <Link to="/foerdermittel">
                  Förderung prüfen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Kostenlose Beratung</h3>
              <p className="opacity-90 mb-6">
                Unsere Experten beraten Sie unverbindlich zu allen Aspekten Ihrer Dämmung.
              </p>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-green-600 w-full font-semibold"
                asChild
              >
                <Link to="/kontakt">
                  Beratung anfragen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-center mb-8">
            ✅ Ihr Weg zur perfekten Dämmung in 5 Schritten
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <div className="font-semibold mb-2">Analyse</div>
              <div className="text-sm opacity-90">Energieberatung oder Online-Rechner</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <div className="font-semibold mb-2">Förderung</div>
              <div className="text-sm opacity-90">Antrag vor Auftragsvergabe stellen</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <div className="font-semibold mb-2">Angebote</div>
              <div className="text-sm opacity-90">Qualifizierte Fachbetriebe finden</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <div className="font-semibold mb-2">Umsetzung</div>
              <div className="text-sm opacity-90">Professionelle Montage</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                5
              </div>
              <div className="font-semibold mb-2">Sparen</div>
              <div className="text-sm opacity-90">Sofortige Kosteneinsparung</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span className="font-semibold">Über 50.000 zufriedene Kunden vertrauen bereits auf unsere Expertise</span>
            </div>
            <p className="opacity-90">
              Profitieren Sie von unserem kostenlosen Service und sparen Sie ab dem ersten Tag!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaemmungCTASection;
