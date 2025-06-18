import { useState } from 'react';
import { ExternalLink, Mail, Instagram, Facebook } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import InsulationManufacturers from '@/components/manufacturers/InsulationManufacturers';
import EnergyAdvisorSearch from '@/components/shared/EnergyAdvisorSearch';

const Wissenswertes = () => {
  const externalLinks = [
    {
      category: "Fördermittel & Beratung",
      links: [
        { name: "BAFA - Bundesförderung", url: "https://www.bafa.de", description: "Offizielle Förderung für Heizung & Sanierung" },
        { name: "KfW - Förderbank", url: "https://www.kfw.de", description: "Kredite und Zuschüsse für Gebäudesanierung" },
        { name: "Energieberater finden", url: "https://www.energie-effizienz-experten.de", description: "Qualifizierte Energieberater in Ihrer Nähe" },
        { name: "Verbraucherzentrale Energieberatung", url: "https://www.verbraucherzentrale-energieberatung.de/", description: "Unabhängige Beratung zu Energiefragen" },
        { name: "co2online", url: "https://www.co2online.de", description: "Gemeinnützige Beratung für Klimaschutz" }
      ]
    },
    {
      category: "Rechner & Tools",
      links: [
        { name: "Heizspiegel", url: "https://www.heizspiegel.de", description: "Vergleichen Sie Ihren Heizenergieverbrauch" },
        { name: "U-Wert-Rechner", url: "https://www.ubakus.de/u-wert-rechner/", description: "U-Werte für Bauteile online berechnen" },
        { name: "Solarrechner der HTW Berlin", url: "https://solar.htw-berlin.de/rechner/", description: "Unabhängigkeitsrechner für Photovoltaik" },
        { name: "Förderdatenbank des Bundes", url: "https://www.foerderdatenbank.de", description: "Umfassende Fördermittel-Suche" }
      ]
    },
    {
      category: "Fachbetriebe & Verbände",
      links: [
        { name: "ZVSHK", url: "https://www.zvshk.de/fachbetriebssuche.html", description: "Fachbetriebssuche für Sanitär, Heizung, Klima" },
        { name: "Fachverband WDVS", url: "https://www.fachverband-wdvs.de/mitglieder/mitglieder-finden/", description: "Experten für Wärmedämm-Verbundsysteme" },
        { name: "Bundesverband Solarwirtschaft", url: "https://www.solarwirtschaft.de/fuer-verbraucher/installateurssuche/", description: "Installateurs-Suche für Solaranlagen" },
        { name: "MyHammer", url: "https://www.my-hammer.de", description: "Handwerker und Aufträge finden" }
      ]
    },
    {
      category: "Systeme & Hersteller",
      links: [
        { name: "Thermofloc", url: "https://www.thermofloc.de", description: "Hersteller von Zellulosedämmung" },
        { name: "Steico", url: "https://www.steico.com/de", description: "Anbieter von Holzfaser-Dämmstoffen" },
        { name: "Viessmann", url: "https://www.viessmann.de", description: "Systemlösungen für Wärme, Kälte und Strom" },
        { name: "Schüco", url: "https://www.schueco.com/de", description: "Anbieter für Fenster-, Türen- und Fassadensysteme" }
      ]
    },
    {
      category: "Experten & Netzwerke",
      links: [
        { name: "Energie-Wände", url: "https://www.energie-wände.de", description: "Experten für Einblasdämmung im Raum Hannover" },
        { name: "GIH e.V.", url: "https://www.gih.de/", description: "Bundesverband der Gebäude-Energieberater" },
        { name: "IB-Krieger", url: "https://www.ib-krieger.de/", description: "Ingenieurbüro für Bauphysik & Energieberatung" }
      ]
    },
    {
      category: "Wissensportale & Ratgeber",
      links: [
        { name: "BINE Informationsdienst", url: "https://www.bine.info", description: "Fachinfos zu Energieeffizienz und Erneuerbaren" },
        { name: "BauNetz Wissen", url: "https://www.baunetzwissen.de", description: "Bautechnisches Fachwissen und Praxisbeispiele" },
        { name: "Effizienzhaus-online", url: "https://www.effizienzhaus-online.de", description: "Ratgeber für energieeffizientes Bauen und Sanieren" },
        { name: "energieheld", url: "https://www.energieheld.de", description: "Sanierungsratgeber und Kostenschätzung" }
      ]
    },
    {
      category: "Behördliche Informationen",
      links: [
        { name: "Deutsche Energie-Agentur", url: "https://www.dena.de", description: "Energieeffizienz und Klimaschutz auf Bundesebene" },
        { name: "Umweltbundesamt", url: "https://www.umweltbundesamt.de", description: "Informationen zu Umwelt- und Klimaschutz" },
        { name: "BMWK", url: "https://www.bmwk.de", description: "Aktuelle Gesetze und Förderprogramme" },
        { name: "EnEV-online", url: "https://www.enev-online.de", description: "Fachportal zum Gebäudeenergiegesetz" }
      ]
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('alle');

  const categories = ['alle', ...Array.from(new Set(externalLinks.map((cat) => cat.category)))];
  
  const filteredLinks = selectedCategory === 'alle'
    ? externalLinks
    : externalLinks.filter((cat) => cat.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <main>
        <div className="container max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Wissenswertes & Links
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Hilfreiche Ressourcen und Hersteller für Ihre Sanierungsplanung
            </p>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
              In dieser Sammlung finden Sie nützliche Ansprechpartner, Tools und Hintergrundwissen rund um effizientes Bauen und Modernisieren.
            </p>
          </div>

          <div className="container max-w-4xl mx-auto">
            {/* Social Media Card */}
            <div className="bg-white dark:bg-gray-900/50 p-8 rounded-lg shadow-sm border dark:border-gray-800 mb-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">S&S</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {siteConfig.projectName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {siteConfig.tagline}
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                {siteConfig.socialLinks.newsletter && (
                  <a
                    href={siteConfig.socialLinks.newsletter}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Mail size={20} />
                    <span>Newsletter</span>
                  </a>
                )}
                {siteConfig.socialLinks.instagram && (
                  <a
                    href={siteConfig.socialLinks.instagram}
                    className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    <Instagram size={20} />
                    <span>Instagram</span>
                  </a>
                )}
                {siteConfig.socialLinks.facebook && (
                  <a
                    href={siteConfig.socialLinks.facebook}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Facebook size={20} />
                    <span>Facebook</span>
                  </a>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
                <ToggleGroup
                    type="single"
                    value={selectedCategory}
                    onValueChange={(value) => {
                        if (value) setSelectedCategory(value);
                    }}
                    className="flex flex-wrap justify-center gap-2"
                    aria-label="Kategorienfilter"
                >
                    {categories.map((category) => (
                        <ToggleGroupItem key={category} value={category} aria-label={`Filter für ${category}`}>
                            {category === 'alle' ? 'Alle Kategorien' : category}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>

            {/* External Links */}
            <div className="space-y-8">
              {filteredLinks.map((category) => (
                <div key={category.category} className="bg-white dark:bg-gray-900/50 p-6 rounded-lg shadow-sm border dark:border-gray-800">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    {category.category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.links.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-green-300 dark:hover:border-green-700 transition-colors group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-green-600 transition-colors">
                              {link.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {link.description}
                            </p>
                          </div>
                          <ExternalLink size={16} className="text-gray-400 group-hover:text-green-600 transition-colors ml-2 flex-shrink-0" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 p-8 rounded-lg border dark:border-gray-800">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Fehlt ein wichtiger Link?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Lassen Sie uns wissen, welche Ressourcen wir noch ergänzen sollten.
              </p>
              <a
                href={siteConfig.socialLinks.kontakt}
                className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Link vorschlagen
              </a>
            </div>
          </div>
        </div>

        <EnergyAdvisorSearch />
        <InsulationManufacturers />
      </main>

    </div>
  );
};

export default Wissenswertes;
