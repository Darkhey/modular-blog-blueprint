
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import WissenswertesLayout from '@/components/wissenswertes/WissenswertesLayout';

const WissenswertesLinks = () => {
  const externalLinks = [
    {
      category: "Fördermittel & Beratung",
      links: [
        { name: "BAFA - Bundesförderung", url: "https://www.bafa.de", description: "Überblick über aktuelle Zuschüsse und Programme der Bundesförderung für effiziente Gebäude." },
        { name: "KfW - Förderbank", url: "https://www.kfw.de", description: "Förderkredite, Zuschüsse und Hintergrundwissen für energetische Modernisierungen im Wohngebäude." },
        { name: "Energieberater finden", url: "https://www.energie-effizienz-experten.de", description: "Datenbank der Energieeffizienz-Expertenliste mit zertifizierten Beratern in Ihrer Region." },
        { name: "Verbraucherzentrale Energieberatung", url: "https://www.verbraucherzentrale-energieberatung.de/", description: "Bundesweite Beratungsangebote, Checks und Webinare rund um Energiefragen im Haushalt." },
        { name: "co2online", url: "https://www.co2online.de", description: "Interaktive Rechner, Ratgeber und Aktionen für klimafreundliches Wohnen und Sanieren." }
      ]
    },
    {
      category: "Rechner & Tools",
      links: [
        { name: "Heizspiegel", url: "https://www.heizspiegel.de", description: "Vergleichen Sie Ihre Heizkosten mit bundesweiten Referenzwerten und erhalten Sie Sparhinweise." },
        { name: "U-Wert-Rechner", url: "https://www.ubakus.de/u-wert-rechner/", description: "Bauteile digital nachbilden und Wärmeverluste sowie Taupunktgefahr präzise einschätzen." },
        { name: "Solarrechner der HTW Berlin", url: "https://solar.htw-berlin.de/rechner/", description: "Simulieren Sie den Solarertrag, Autarkiegrad und Wirtschaftlichkeit geplanter Photovoltaik-Anlagen." },
        { name: "Förderdatenbank des Bundes", url: "https://www.foerderdatenbank.de", description: "Filterbare Übersicht aller Förderprogramme von Bund, Ländern und Kommunen." }
      ]
    },
    {
      category: "Fachbetriebe & Verbände",
      links: [
        { name: "ZVSHK", url: "https://www.zvshk.de/fachbetriebssuche.html", description: "Innungsfachbetriebe für Sanitär, Heizung und Klima mit Qualifikationen und Kontaktdaten." },
        { name: "Fachverband WDVS", url: "https://www.fachverband-wdvs.de/mitglieder/mitglieder-finden/", description: "Spezialisierte Betriebe für Wärmedämm-Verbundsysteme inklusive Leistungsprofilen." },
        { name: "Bundesverband Solarwirtschaft", url: "https://www.solarwirtschaft.de/fuer-verbraucher/installateurssuche/", description: "Installateurssuche für Photovoltaik und Solarthermie mit regionaler Filterung." },
        { name: "MyHammer", url: "https://www.my-hammer.de", description: "Online-Plattform, um Handwerksaufträge einzustellen und Angebote zu vergleichen." }
      ]
    },
    {
      category: "Systeme & Hersteller",
      links: [
        { name: "Thermofloc", url: "https://www.thermofloc.de", description: "Produktübersicht, Verarbeitungstipps und Referenzobjekte für Zellulosedämmungen." },
        { name: "Steico", url: "https://www.steico.com/de", description: "Holzbasierte Dämm- und Konstruktionssysteme mit technischen Daten und Planungshilfen." },
        { name: "Viessmann", url: "https://www.viessmann.de", description: "Integrierte Lösungen für Heizung, Kühlung und Photovoltaik inklusive Produktberatern." },
        { name: "Schüco", url: "https://www.schueco.com/de", description: "Fenster-, Türen- und Fassadensysteme mit Inspirationen, Technikdaten und Partnernetzwerk." }
      ]
    },
    {
      category: "Experten & Netzwerke",
      links: [
        { name: "Energie-Wände", url: "https://www.energie-wände.de", description: "Spezialbetrieb für Einblasdämmung mit Projektbeispielen, Leistungen und Ansprechpartnern." },
        { name: "GIH e.V.", url: "https://www.gih.de/", description: "Bundesweiter Verband der Energieberater mit Fachartikeln, Veranstaltungen und Ansprechpartnern vor Ort." },
        { name: "IB-Krieger", url: "https://www.ib-krieger.de/", description: "Ingenieurbüro für Bauphysik und Energieberatung mit Leistungsprofil und Referenzen." }
      ]
    },
    {
      category: "Wissensportale & Ratgeber",
      links: [
        { name: "BINE Informationsdienst", url: "https://www.bine.info", description: "Projektberichte, Dossiers und Forschungsergebnisse rund um Energieeffizienz und Erneuerbare." },
        { name: "BauNetz Wissen", url: "https://www.baunetzwissen.de", description: "Aufbereitete Fachbeiträge, Details und Praxisbeispiele zu allen Gewerken." },
        { name: "Effizienzhaus-online", url: "https://www.effizienzhaus-online.de", description: "Vergleichsrechner, Produkte und Schritt-für-Schritt-Ratgeber für Sanierungsvorhaben." },
        { name: "energieheld", url: "https://www.energieheld.de", description: "Wissensdatenbank mit Sanierungsguides, Kostenvergleichen und Handwerkervermittlung." }
      ]
    },
    {
      category: "Behördliche Informationen",
      links: [
        { name: "Deutsche Energie-Agentur", url: "https://www.dena.de", description: "Programme, Studien und Leitfäden zur Energiewende auf Bundesebene." },
        { name: "Umweltbundesamt", url: "https://www.umweltbundesamt.de", description: "Publikationen, Daten und Empfehlungen zu Klima-, Umwelt- und Ressourcenschutz." },
        { name: "BMWK", url: "https://www.bmwk.de", description: "Aktuelle Gesetzesinitiativen, Förderprogramme und Pressemitteilungen des Wirtschaftsministeriums." },
        { name: "EnEV-online", url: "https://www.enev-online.de", description: "Kommentierungen, Berechnungshilfen und News zum Gebäudeenergiegesetz." }
      ]
    },
    {
      category: "Fachmagazine & Blogs",
      links: [
        { name: "Energie-Fachberater", url: "https://www.energie-fachberater.de", description: "Tägliche News, Produktinformationen und Schritt-für-Schritt-Anleitungen zur Sanierung." },
        { name: "Gebäude-Energieberater Magazin", url: "https://www.geb-info.de", description: "Fachmagazin mit Artikeln, Webinaren und Weiterbildung für Energieberater." },
        { name: "Baulinks", url: "https://www.baulinks.de", description: "Branchenportal mit tagesaktuellen Meldungen, Produktneuheiten und Hintergrundanalysen." }
      ]
    },
    {
      category: "Normen & Gesetze",
      links: [
        { name: "GEG im Volltext", url: "https://www.gesetze-im-internet.de/geg/", description: "Recherchierbare Online-Fassung des Gebäudeenergiegesetzes mit amtlichen Erläuterungen." },
        { name: "DIN-Normen im Beuth Verlag", url: "https://www.beuth.de/de", description: "Offizieller Shop für DIN-Normen mit Vorschauen, Downloads und Bestellmöglichkeit." },
        { name: "Baurechtsportal der Länder", url: "https://www.baurecht.de", description: "Direktzugriff auf Landesbauordnungen, Verwaltungsvorschriften und Rechtsgrundlagen." }
      ]
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('alle');
  const categories = ['alle', ...Array.from(new Set(externalLinks.map((cat) => cat.category)))];

  const filteredLinks = selectedCategory === 'alle'
    ? externalLinks
    : externalLinks.filter((cat) => cat.category === selectedCategory);

  return (
    <WissenswertesLayout
      title="Externe Links & Portale"
      description="Kuratierte Sammlung der wichtigsten Websites und Portale für Sanierung und Energieeffizienz"
    >
      <p className="mb-8 text-gray-700 dark:text-gray-300">
        Unsere Linksammlung führt Sie zu offiziellen Stellen, unabhängigen Ratgebern und praktischen
        Werkzeugen rund um die energetische Sanierung. Alle Empfehlungen sind handverlesen und werden
        regelmäßig aktualisiert, damit Sie schnell die passende Unterstützung finden.
      </p>
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
    </WissenswertesLayout>
  );
};

export default WissenswertesLinks;
