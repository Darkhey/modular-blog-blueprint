
import { Link } from 'react-router-dom';
import { Calculator, TrendingDown, Home, Award, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DaemmungHeroSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-green-600 to-blue-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="flex items-center space-x-2 mb-6">
              <Home className="h-8 w-8 text-green-300" />
              <span className="text-green-300 font-semibold text-lg">Dämmung & Isolierung 2025</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Bis zu <span className="text-green-300">50%</span> Heizkosten sparen
            </h1>
            
            <p className="text-xl mb-8 leading-relaxed opacity-90">
              Professionelle Dämmung für Dach, Fassade und Keller. Mit staatlicher Förderung bis zu 40% der Kosten sparen und den Wert Ihrer Immobilie steigern.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <TrendingDown className="h-6 w-6 text-green-300" />
                <span className="font-medium">Bis 50% weniger Heizkosten</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-green-300" />
                <span className="font-medium">Bis 40% Förderung</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4">
                <Calculator className="mr-2 h-5 w-5" />
                Kostenlosen Rechner starten
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-green-600 font-semibold px-8 py-4"
                asChild
              >
                <Link to="/foerdermittel">
                  Förderung prüfen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Beispiel-Rechnung</h3>
                <div className="bg-yellow-400/20 text-yellow-200 px-3 py-1 rounded-full text-sm font-semibold border border-yellow-400/30">
                  💡 Beispiel
                </div>
              </div>
              <p className="text-white/80 mb-6 text-sm">
                Typisches Einfamilienhaus (140m², Baujahr 1980)
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                  <span>Ungedämmtes Haus</span>
                  <span className="font-bold text-red-300">3.200€/Jahr</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                  <span>Nach Vollsanierung</span>
                  <span className="font-bold text-green-300">1.600€/Jahr</span>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">Jährliche Ersparnis:</span>
                    <span className="text-2xl font-bold text-green-300">1.600€</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full border-white/30 text-white hover:bg-white/10"
                    asChild
                  >
                    <Link to="/heizkostenrechner" className="flex items-center justify-center">
                      <Calculator className="mr-2 h-4 w-4" />
                      Ihre persönlichen Kosten berechnen
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaemmungHeroSection;
