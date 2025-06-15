
import { Phone, Euro } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeizungCTASection = () => {
  return (
    <section id="beratung" className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Bereit für Ihre Smart-Heizung der Zukunft?
        </h2>
        <p className="text-xl text-green-100 mb-8">
          Lassen Sie sich kostenlos beraten und planen Sie Ihre intelligente Heizungsmodernisierung. 
          Unsere Smart Home Experten finden die optimale Lösung für maximale Effizienz und Komfort.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/kontakt">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
              <Phone className="mr-2 w-5 h-5" />
              Kostenlose Smart Home Beratung
            </Button>
          </Link>
          <Link to="/foerdermittel">
            <Button size="lg" variant="outline" className="border-white text-black bg-white hover:bg-gray-100">
              <Euro className="mr-2 w-5 h-5" />
              Fördercheck starten
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-yellow-300">100%</div>
            <div className="text-sm text-green-100">kostenlose Beratung</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-300">Smart</div>
            <div className="text-sm text-green-100">Home Integration</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-300">5.000+</div>
            <div className="text-sm text-green-100">zufriedene Kunden</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-300">15+</div>
            <div className="text-sm text-green-100">Jahre Erfahrung</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeizungCTASection;
