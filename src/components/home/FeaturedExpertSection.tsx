
import { Star } from 'lucide-react';

const FeaturedExpertSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Vorgestellter Fachmann des Monats</h2>
        <p className="text-center text-gray-600 mb-8">Jeden Monat präsentieren wir einen Top-Handwerksbetrieb aus unserem Netzwerk.</p>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 md:flex animate-fade-in">
          <div className="md:w-1/3">
            <img 
              src="/lovable-uploads/af1b6dc6-40f0-4e96-bd65-6a7ee9fc0070.png" 
              alt="Dämmungsarbeiten von Energie-Wände.de" 
              className="w-full h-48 md:h-full object-cover"
            />
          </div>
          <div className="p-6 md:p-8 md:w-2/3 flex flex-col justify-center">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-400 fill-yellow-400 mr-2 h-5 w-5" />
              <span className="text-sm font-bold text-blue-700 uppercase">Top Partner</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Energie-Wände.de</h3>
            <p className="text-gray-600 mb-4">
              Energie-Wände.de ist Ihr Spezialist für energetische Sanierungen und Fassadendämmung. Mit jahrelanger Erfahrung und einem Fokus auf nachhaltige Materialien hilft das Team, Heizkosten zu senken und den Wohnkomfort zu steigern. Ihre umfassende Beratung stellt sicher, dass für jedes Projekt die optimale Lösung gefunden wird – von der Planung bis zur finalen Umsetzung.
            </p>
            <p className="text-gray-600 font-semibold mb-6">
              Schwerpunkte: Wärmedämmverbundsysteme (WDVS), Fassadengestaltung, Energieberatung.
            </p>
            <a
              href="https://www.energie-wände.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors self-start"
            >
              Zur Website des Fachmanns
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedExpertSection;
