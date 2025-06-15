
import { Building2, Search, Leaf, MapPin, Hammer, ExternalLink } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const manufacturersData = [
    {
      name: "Steico",
      description: "Ökologische Dämmstoffe aus nachwachsenden Rohstoffen.",
      specialties: ["Holzfaser-Dämmplatten", "Einblasdämmung", "Luftdichtsysteme"],
      logoPlaceholder: "S",
      color: "bg-green-600",
      website: "https://www.steico.com/de/",
      material: "Holzfaser",
      useCases: ["Dach", "Wand", "Boden"],
      ecoFriendly: true,
      madeIn: "EU"
    },
    {
      name: "Thermofloc",
      description: "Einblasdämmung aus recyceltem Zeitungspapier.",
      specialties: ["Zellulose-Einblasdämmung", "Dampfbremsen", "Recycling"],
      logoPlaceholder: "T",
      color: "bg-blue-600",
      website: "https://www.thermofloc.com/de/",
      material: "Zellulose",
      useCases: ["Dach", "Wand", "Hohlräume"],
      ecoFriendly: true,
      madeIn: "Österreich"
    },
    {
      name: "Isofloc",
      description: "Spezialist für Zellulose-Dämmung und Luftdichtheit.",
      specialties: ["Zellulose", "Brandschutzlösungen", "Schallschutz"],
      logoPlaceholder: "I",
      color: "bg-purple-600",
      website: "https://www.isofloc.de/",
      material: "Zellulose",
      useCases: ["Dach", "Wand", "Decke"],
      ecoFriendly: true,
      madeIn: "EU"
    },
    {
      name: "Isover",
      description: "Glaswolle und Steinwolle für höchste Energieeffizienz.",
      specialties: ["Glaswolle", "Steinwolle", "Brandschutz (A1)"],
      logoPlaceholder: "IS",
      color: "bg-orange-600",
      website: "https://www.isover.de/",
      material: "Glas-/Steinwolle",
      useCases: ["Dach", "Fassade", "Keller"],
      ecoFriendly: false,
      madeIn: "Deutschland"
    },
    {
      name: "Rockwool",
      description: "Steinwolle-Dämmung für Wärme-, Brand- und Schallschutz.",
      specialties: ["Steinwolle", "Nicht brennbar", "Akustikdämmung"],
      logoPlaceholder: "R",
      color: "bg-red-600",
      website: "https://www.rockwool.com/de/",
      material: "Steinwolle",
      useCases: ["Dach", "Fassade", "Brandschutz"],
      ecoFriendly: false,
      madeIn: "EU"
    },
    {
      name: "Knauf Insulation",
      description: "Nachhaltige Dämmlösungen aus Mineralwolle mit ECOSE®.",
      specialties: ["Mineralwolle", "Glaswolle", "ECOSE® Technology"],
      logoPlaceholder: "K",
      color: "bg-indigo-600",
      website: "https://www.knaufinsulation.de/",
      material: "Mineralwolle",
      useCases: ["Dach", "Wand", "Boden"],
      ecoFriendly: false,
      madeIn: "Deutschland"
    },
    {
      name: "Ursa",
      description: "Mineralwolle-Dämmstoffe für Neubau und Sanierung.",
      specialties: ["Mineralwolle", "XPS-Dämmplatten", "Akustik"],
      logoPlaceholder: "U",
      color: "bg-teal-600",
      website: "https://www.ursa.de/",
      material: "Mineralwolle / XPS",
      useCases: ["Dach", "Trennwand", "Boden"],
      ecoFriendly: false,
      madeIn: "EU"
    },
    {
      name: "Pavatex",
      description: "Diffusionsoffene Holzfaser-Dämmstoffe für die Gebäudehülle.",
      specialties: ["Holzfaserdämmung", "Ökologisch", "Diffusionsoffen"],
      logoPlaceholder: "P",
      color: "bg-emerald-600",
      website: "https://www.pavatex.de/",
      material: "Holzfaser",
      useCases: ["Dach", "Fassade", "Innenausbau"],
      ecoFriendly: true,
      madeIn: "EU"
    },
    {
      name: "Gutex",
      description: "Holzfaserdämmplatten aus Schwarzwälder Tannenholz.",
      specialties: ["Holzfaserplatten", "Made in Germany", "Regensicherheit"],
      logoPlaceholder: "G",
      color: "bg-lime-600",
      website: "https://www.gutex.de/",
      material: "Holzfaser",
      useCases: ["Dach", "Fassade", "Innenausbau"],
      ecoFriendly: true,
      madeIn: "Deutschland"
    },
    {
      name: "Homatherm",
      description: "Flexible und stabile Dämmstoffe aus dem Naturstoff Holz.",
      specialties: ["Holzfaser-Matten", "Naturdämmung", "Wohngesundheit"],
      logoPlaceholder: "H",
      color: "bg-yellow-600",
      website: "https://www.homanit.com/de/homatherm/",
      material: "Holzfaser",
      useCases: ["Dach", "Wand", "Boden"],
      ecoFriendly: true,
      madeIn: "Deutschland"
    },
    {
      name: "Sto",
      description: "Marktführer für Wärmedämm-Verbundsysteme (WDVS).",
      specialties: ["WDVS", "Fassadendämmung", "Systemlösungen"],
      logoPlaceholder: "ST",
      color: "bg-pink-600",
      website: "https://www.sto.de/",
      material: "WDVS (EPS/Mineralwolle)",
      useCases: ["Fassade", "Außenwand", "Kellerdecke"],
      ecoFriendly: false,
      madeIn: "Deutschland"
    },
    {
      name: "Caparol",
      description: "Wärmedämm-Verbundsysteme und Fassadenlösungen.",
      specialties: ["WDVS", "Hanfdämmung", "Farbe & Dämmung"],
      logoPlaceholder: "C",
      color: "bg-rose-600",
      website: "https://www.caparol.de/",
      material: "WDVS / Hanf",
      useCases: ["Fassade", "Innendämmung", "Fachwerk"],
      ecoFriendly: false,
      madeIn: "Deutschland"
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
        manufacturer.material.toLowerCase().includes(lowercasedTerm) ||
        (manufacturer.madeIn && manufacturer.madeIn.toLowerCase().includes(lowercasedTerm)) ||
        manufacturer.useCases.some((useCase) => useCase.toLowerCase().includes(lowercasedTerm)) ||
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
                    placeholder="Hersteller, Material oder Einsatz (z.B. Steico, Holzfaser...)"
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
              className="relative flex flex-col bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl dark:shadow-none dark:border dark:border-gray-700/50 transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-500 group"
            >
              <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-10">
                {manufacturer.ecoFriendly && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700 shadow-sm">
                    <Leaf className="w-3 h-3 mr-1.5" />
                    Öko-Tipp
                  </Badge>
                )}
                {manufacturer.madeIn && (
                  <Badge variant="outline" className="bg-white/50 backdrop-blur-sm dark:bg-gray-900/50 dark:border-gray-600 shadow-sm">
                    <MapPin className="w-3 h-3 mr-1.5" />
                    {manufacturer.madeIn}
                  </Badge>
                )}
              </div>

              <div className="text-center mb-4">
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
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed min-h-[40px]">
                  {manufacturer.description}
                </p>
              </div>

              <div className="space-y-4 my-4 pt-4 border-t border-gray-200 dark:border-gray-600 flex-grow">
                  <div>
                      <h4 className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 mb-2 flex items-center"><Hammer className="w-4 h-4 mr-2"/>Material & Einsatz</h4>
                      <div className="flex flex-wrap gap-1.5">
                          <Badge className="pointer-events-none">{manufacturer.material}</Badge>
                          {manufacturer.useCases.map((useCase) => (
                              <Badge key={useCase} variant="outline" className="pointer-events-none">{useCase}</Badge>
                          ))}
                      </div>
                  </div>
                  <div>
                      <h4 className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 mb-2 flex items-center"><Building2 className="w-4 h-4 mr-2"/>Spezialitäten</h4>
                      <div className="flex flex-wrap gap-1.5">
                          {manufacturer.specialties.map((specialty) => (
                              <Badge key={specialty} variant="secondary" className="pointer-events-none">{specialty}</Badge>
                          ))}
                      </div>
                  </div>
              </div>
              
              <div className="mt-auto text-center pt-2">
                <div className="text-blue-600 dark:text-blue-400 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ExternalLink className="mr-2 w-4 h-4" />
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

