
import { Link } from 'react-router-dom';

const FensterTuerenHero = ({ topic }: { topic: any }) => {
  return (
    <>
      {/* Hero Image */}
      <div className="w-full rounded-xl overflow-hidden mb-8">
        <img
          src="/photo-1487958449943-2429e8be8625.jpg"
          alt="Große Fenster sorgen für Helligkeit und Design"
          className="w-full h-56 md:h-64 object-cover transition-transform duration-300 hover:scale-105"
          loading="eager"
        />
      </div>
      
      <h1 className="text-4xl font-bold mb-4">{topic?.name || 'Fenster & Türen'}</h1>
      <p className="text-lg text-gray-600 mb-8">
        {topic?.description || 'Energieeffizient bauen oder sanieren: Fenster und Türen entscheiden maßgeblich über Wärmeverlust, Sicherheit, Komfort und Design des Hauses. In dieser Übersicht erhalten Sie wichtige Infos, praktische Tipps und aktuelle Empfehlungen rund um moderne Fenster- und Türlösungen.'}
      </p>
      
      {/* Lesetipp zum Türen-Artikel */}
      <div className="mb-8 bg-blue-50 p-4 rounded-lg border animate-fade-in flex items-center gap-4">
        <img
          src="/photo-1518005020951-eccb494ad742.jpg"
          alt="Stilvolle moderne Tür"
          className="w-16 h-14 object-cover rounded-md hidden sm:block"
          loading="lazy"
        />
        <div>
          <p className="mb-1 font-semibold text-blue-800">Lesetipp: Neue Übersicht</p>
          <Link 
            to="/blog/moderne-tueren-vergleich" 
            className="inline-flex items-center text-blue-700 hover:underline story-link" 
          >
            Moderne Türen: Sicherheit, Energieeffizienz & Design →
          </Link>
        </div>
      </div>
    </>
  );
};

export default FensterTuerenHero;
