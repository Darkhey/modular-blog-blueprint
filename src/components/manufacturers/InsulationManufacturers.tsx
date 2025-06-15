
import { Building2, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';

const manufacturersData = [
    {
      name: "Steico",
      description: "Ökologische Dämmstoffe aus nachwachsenden Rohstoffen",
      specialties: ["Holzfaser-Dämmung", "Naturbaustoffe", "Nachhaltige Lösungen"],
      logoPlaceholder: "S",
      color: "bg-green-600",
      website: "https://www.steico.com/de/"
    },
    {
      name: "Thermofloc",
      description: "Einblasdämmung aus recyceltem Zeitungspapier",
      specialties: ["Zellulose-Dämmung", "Einblasdämmung", "Recycling-Material"],
      logoPlaceholder: "T",
      color: "bg-blue-600",
      website: "https://www.thermofloc.com/de/"
    },
    {
      name: "Isofloc",
      description: "Spezialist für Zellulose-Dämmung und Einblasverfahren",
      specialties: ["Zellulose-Dämmung", "Brandschutz", "Schallschutz"],
      logoPlaceholder: "I",
      color: "bg-purple-600",
      website: "https://www.isofloc.de/"
    },
    {
      name: "Isover",
      description: "Glaswolle und Steinwolle für höchste Effizienz",
      specialties: ["Glaswolle", "Steinwolle", "Brandschutz"],
      logoPlaceholder: "IS",
      color: "bg-orange-600",
      website: "https://www.isover.de/"
    },
    {
      name: "Rockwool",
      description: "Steinwolle-Dämmung für optimalen Brandschutz",
      specialties: ["Steinwolle", "Brandschutz", "Schallschutz"],
      logoPlaceholder: "R",
      color: "bg-red-600",
      website: "https://www.rockwool.com/de/"
    },
    {
      name: "Knauf Insulation",
      description: "Mineralwolle und nachhaltige Dämmlösungen",
      specialties: ["Mineralwolle", "Glaswolle", "ECOSE Technology"],
      logoPlaceholder: "K",
      color: "bg-indigo-600",
      website: "https://www.knaufinsulation.de/"
    },
    {
      name: "Ursa",
      description: "Mineralwolle-Dämmstoffe für Neubau und Sanierung",
      specialties: ["Mineralwolle", "Glaswolle", "Steinwolle"],
      logoPlaceholder: "U",
      color: "bg-teal-600",
      website: "https://www.ursa.de/"
    },
    {
      name: "Pavatex",
      description: "Holzfaser-Dämmstoffe für ökologisches Bauen",
      specialties: ["Holzfaser", "Ökologisch", "Diffusionsoffen"],
      logoPlaceholder: "P",
      color: "bg-emerald-600",
      website: "https://www.pavatex.de/"
    },
    {
      name: "Gutex",
      description: "Holzfaser-Dämmstoffe made in Germany",
      specialties: ["Holzfaser", "Made in Germany", "Klimaschutz"],
      logoPlaceholder: "G",
      color: "bg-lime-600",
      website: "https://www.gutex.de/"
    },
    {
      name: "Homatherm",
      description: "Natürliche Holzfaser-Dämmstoffe",
      specialties: ["Holzfaser", "Naturdämmung", "Wohngesundheit"],
      logoPlaceholder: "H",
      color: "bg-yellow-600",
      website: "https://www.homanit.com/de/homatherm/"
    },
    {
      name: "Sto",
      description: "WDVS und Fassadendämmung vom Marktführer",
      specialties: ["WDVS", "Fassadendämmung", "Vollsortiment"],
      logoPlaceholder: "ST",
      color: "bg-pink-600",
      website: "https://www.sto.de/"
    },
    {
      name: "Caparol",
      description: "Wärmedämm-Verbundsysteme und Fassadenlösungen",
      specialties: ["WDVS", "Fassade", "Farbe & Dämmung"],
      logoPlaceholder: "C",
      color: "bg-rose-600",
      website: "https://www.caparol.de/"
    }
  ];

const InsulationManufacturers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredManufacturers = useMemo(() => {
    const lowercasedTerm = searchTerm.toLowerCase().trim();
    if (!lowercasedTerm) {
      return manufacturersData;
    }
    return manufacturersData.filter(
      (manufacturer) =>
        manufacturer.name.toLowerCase().includes(lowercasedTerm) ||
        manufacturer.description.toLowerCase().includes(lowercasedTerm) ||
        manufacturer.specialties.some((specialty) =>
          specialty.toLowerCase().includes(lowercasedTerm)
        )
    );
  }, [searchTerm]);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-bold mb-6">
            <Building2 className="mr-2 w-5 h-5" />
            🏭 DÄMMSTOFF-HERSTELLER
          </div>
          <h2 className="text-5xl font-black text-gray-900 dark:text-gray-100 mb-6">
            Die größten Dämmstoff-Hersteller im Vergleich
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Von ökologischen Holzfaser-Dämmstoffen bis zur klassischen Mineralwolle - 
            <span className="text-blue-600 font-bold dark:text-blue-400"> diese Hersteller bestimmen den Markt!</span>
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12 px-4">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Hersteller suchen (z.B. Steico, Glaswolle...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 text-base rounded-full border-2 border-gray-200 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800"
                    aria-label="Hersteller suchen"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredManufacturers.length > 0 && filteredManufacturers.map((manufacturer) => (
            <a
              key={manufacturer.name}
              href={manufacturer.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col bg-white dark:bg-gray-800/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl dark:shadow-none dark:border dark:border-gray-700/50 transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-500 group"
            >
              <div className="text-center mb-6">
                <div 
                  className={`w-20 h-20 ${manufacturer.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <span className="text-white font-black text-2xl">
                    {manufacturer.logoPlaceholder}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {manufacturer.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {manufacturer.description}
                </p>
              </div>

              <div className="space-y-2 flex-grow">
                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">🎯 Spezialitäten:</h4>
                {manufacturer.specialties.map((specialty, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                    {specialty}
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <div className="text-blue-600 dark:text-blue-400 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Building2 className="mr-2 w-4 h-4" />
                  Zur Hersteller-Website
                </div>
              </div>
            </a>
          ))}
        </div>

        {filteredManufacturers.length === 0 && (
          <div className="text-center w-full col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 py-20">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Keine Ergebnisse</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Für Ihre Suche nach "{searchTerm}" konnten keine Hersteller gefunden werden.
            </p>
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              💡 Welcher Dämmstoff passt zu Ihrem Projekt?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto mb-6">
              Die Wahl des richtigen Dämmstoffs hängt von vielen Faktoren ab: Einsatzbereich, 
              Budget, ökologische Anforderungen und bauphysikalische Eigenschaften.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-4xl mb-2">🌱</div>
                <h4 className="font-bold text-green-600">Ökologisch</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Holzfaser, Zellulose, Naturdämmstoffe</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🔥</div>
                <h4 className="font-bold text-red-600">Brandschutz</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Steinwolle, Mineralwolle</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">💰</div>
                <h4 className="font-bold text-blue-600">Preis-Leistung</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Glaswolle, EPS, Einblasdämmung</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsulationManufacturers;
