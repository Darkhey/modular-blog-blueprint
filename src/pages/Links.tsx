
import { ExternalLink, Mail, Instagram, Facebook } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/site.config';

const Links = () => {
  const externalLinks = [
    {
      category: "Fördermittel & Beratung",
      links: [
        { name: "BAFA - Bundesförderung", url: "https://www.bafa.de", description: "Offizielle Förderung für Heizung & Sanierung" },
        { name: "KfW - Förderbank", url: "https://www.kfw.de", description: "Kredite und Zuschüsse für Gebäudesanierung" },
        { name: "Energieberater finden", url: "https://www.energie-effizienz-experten.de", description: "Qualifizierte Energieberater in Ihrer Nähe" },
        { name: "Verbraucherzentrale", url: "https://www.verbraucherzentrale.de", description: "Unabhängige Energieberatung" }
      ]
    },
    {
      category: "Rechner & Tools",
      links: [
        { name: "Heizkostenrechner", url: "#", description: "Potentielle Einsparungen berechnen" },
        { name: "Dämmungsrechner", url: "#", description: "Optimale Dämmstärke ermitteln" },
        { name: "PV-Rechner", url: "#", description: "Photovoltaik Rentabilität prüfen" },
        { name: "Förderrechner", url: "#", description: "Verfügbare Zuschüsse ermitteln" }
      ]
    },
    {
      category: "Fachbetriebe",
      links: [
        { name: "Handwerker-Suche", url: "#", description: "Qualifizierte Fachbetriebe finden" },
        { name: "Heizungsbauer", url: "#", description: "Spezialisierte Heizungsinstallateure" },
        { name: "Dämmungsexperten", url: "#", description: "Professionelle Dämmungsarbeiten" },
        { name: "Solar-Installateure", url: "#", description: "PV und Solarthermie Montage" }
      ]
    },
    {
      category: "Expertenliste",
      links: [
        { name: "Energie-Wände", url: "https://www.energie-wände.de", description: "Experten für Einblasdämmung im Raum Hannover" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nützliche Links & Tools
          </h1>
          <p className="text-xl text-gray-600">
            Hilfreiche Ressourcen für Ihre Sanierungsplanung
          </p>
        </div>

        {/* Social Media Card */}
        <div className="bg-white p-8 rounded-lg shadow-sm border mb-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">S&S</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {siteConfig.projectName}
            </h2>
            <p className="text-gray-600">
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

        {/* External Links */}
        <div className="space-y-8">
          {externalLinks.map((category) => (
            <div key={category.category} className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {category.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border rounded-lg hover:bg-gray-50 hover:border-green-300 transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                          {link.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
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
        <div className="mt-12 text-center bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg border">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Fehlt ein wichtiger Link?
          </h2>
          <p className="text-gray-600 mb-6">
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

      <Footer />
    </div>
  );
};

export default Links;
