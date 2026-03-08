
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
        { name: "co2online", url: "https://www.co2online.de", description: "Interaktive Rechner, Ratgeber und Aktionen für klimafreundliches Wohnen und Sanieren." },
        { name: "Sanierungskonfigurator (BMI)", url: "https://www.sanierungskonfigurator.de", description: "Kostenloses Tool des BMI zur Planung energetischer Sanierungsmaßnahmen mit Fördermittelprüfung." }
      ]
    },
    {
      category: "Rechner & Tools",
      links: [
        { name: "Heizspiegel", url: "https://www.heizspiegel.de", description: "Vergleichen Sie Ihre Heizkosten mit bundesweiten Referenzwerten und erhalten Sie Sparhinweise." },
        { name: "U-Wert-Rechner", url: "https://www.ubakus.de/u-wert-rechner/", description: "Bauteile digital nachbilden und Wärmeverluste sowie Taupunktgefahr präzise einschätzen." },
        { name: "Solarrechner der HTW Berlin", url: "https://solar.htw-berlin.de/rechner/", description: "Simulieren Sie den Solarertrag, Autarkiegrad und Wirtschaftlichkeit geplanter Photovoltaik-Anlagen." },
        { name: "Förderdatenbank des Bundes", url: "https://www.foerderdatenbank.de", description: "Filterbare Übersicht aller Förderprogramme von Bund, Ländern und Kommunen." },
        { name: "Wärmepumpen-Check", url: "https://www.waermepumpe.de/waermepumpe/onlinecheck/", description: "Schnelltest des BWP, ob Ihr Gebäude für eine Wärmepumpe geeignet ist." },
        { name: "Stromspiegel", url: "https://www.stromspiegel.de", description: "Vergleichen Sie Ihren Stromverbrauch mit dem Bundesdurchschnitt und erhalten Sie Spartipps." }
      ]
    },
    {
      category: "Fachbetriebe & Verbände",
      links: [
        { name: "ZVSHK", url: "https://www.zvshk.de", description: "Innungsfachbetriebe für Sanitär, Heizung und Klima mit Qualifikationen und Kontaktdaten." },
        { name: "Fachverband WDVS", url: "https://www.fachverband-wdvs.de", description: "Spezialisierte Betriebe für Wärmedämm-Verbundsysteme inklusive Leistungsprofilen." },
        { name: "Bundesverband Solarwirtschaft", url: "https://www.solarwirtschaft.de", description: "Installateurssuche für Photovoltaik und Solarthermie mit regionaler Filterung." },
        { name: "MyHammer", url: "https://www.my-hammer.de", description: "Online-Plattform, um Handwerksaufträge einzustellen und Angebote zu vergleichen." },
        { name: "Bundesverband Wärmepumpe (BWP)", url: "https://www.waermepumpe.de", description: "Verband der Wärmepumpen-Branche mit Installateurssuche, Marktdaten und Verbrauchertipps." },
        { name: "Dachdecker-Innung", url: "https://www.dachdecker.de", description: "Innungsbetriebe für Dacharbeiten, Abdichtung und Dachbegrünung mit bundesweiter Suche." }
      ]
    },
    {
      category: "Systeme & Hersteller",
      links: [
        { name: "Thermoflock", url: "https://www.thermoflock.de", description: "Marktführer für Einblasdämmstoffe – zertifizierte Qualität, A1-Brandschutz und bundesweites Partnernetz." },
        { name: "Steico", url: "https://www.steico.com/de", description: "Holzbasierte Dämm- und Konstruktionssysteme mit technischen Daten und Planungshilfen." },
        { name: "Viessmann", url: "https://www.viessmann.de", description: "Integrierte Lösungen für Heizung, Kühlung und Photovoltaik inklusive Produktberatern." },
        { name: "Schüco", url: "https://www.schueco.com/de", description: "Fenster-, Türen- und Fassadensysteme mit Inspirationen, Technikdaten und Partnernetzwerk." },
        { name: "Vaillant", url: "https://www.vaillant.de", description: "Wärmepumpen, Gasbrennwertgeräte und Solartechnik mit Produktberater und Fachpartnersuche." },
        { name: "SMA Solar Technology", url: "https://www.sma.de", description: "Wechselrichter und Energiemanagement-Lösungen für Photovoltaik-Anlagen." },
        { name: "Knauf Insulation", url: "https://www.knaufinsulation.de", description: "Mineralwolle- und Naturdämmstoffe für alle Anwendungsbereiche mit Planungstools." },
        { name: "Rockwool", url: "https://www.rockwool.com/de", description: "Steinwolle-Dämmstoffe für Wärme-, Schall- und Brandschutz mit umfangreicher Fachberatung." }
      ]
    },
    {
      category: "Smart Home & Gebäudetechnik",
      links: [
        { name: "Smart Home Initiative", url: "https://www.smarthome-deutschland.de", description: "Verband für Smart-Home-Technologien mit Marktübersicht, Events und Beratungsangeboten." },
        { name: "Home Assistant", url: "https://www.home-assistant.io", description: "Open-Source-Plattform für Heimautomation – herstellerunabhängig und datenschutzfreundlich." },
        { name: "tado°", url: "https://www.tado.com/de", description: "Intelligente Heizungssteuerung mit Geofencing und Raumklima-Optimierung per App." },
        { name: "Homematic IP", url: "https://www.homematic-ip.com/de", description: "Smart-Home-System für Heizung, Sicherheit und Licht – Made in Germany mit lokaler Datenverarbeitung." }
      ]
    },
    {
      category: "Solarenergie & Speicher",
      links: [
        { name: "Solarserver", url: "https://www.solarserver.de", description: "Tagesaktuelle Nachrichten, Marktdaten und Fachwissen rund um Photovoltaik und Solarthermie." },
        { name: "PV Magazine Deutschland", url: "https://www.pv-magazine.de", description: "Fachmagazin für die Solarbranche mit Marktanalysen, Technologie-News und Installationsberichten." },
        { name: "Solaranlagen-Portal", url: "https://www.solaranlagen-portal.com", description: "Vergleichsportal mit Kostenübersicht, Ertragsrechner und regionaler Installateurssuche." },
        { name: "SENEC", url: "https://www.senec.com/de", description: "Stromspeicher und Cloud-Lösungen für maximale Eigenverbrauchsquote bei PV-Anlagen." },
        { name: "Marktstammdatenregister", url: "https://www.marktstammdatenregister.de", description: "Pflichtregistrierung für PV-Anlagen – offizielles Portal der Bundesnetzagentur." }
      ]
    },
    {
      category: "Experten & Netzwerke",
      links: [
        { name: "GIH e.V.", url: "https://www.gih.de/", description: "Bundesweiter Verband der Energieberater mit Fachartikeln, Veranstaltungen und Ansprechpartnern vor Ort." },
        { name: "Energie-Wände", url: "https://www.energie-wände.de", description: "Spezialbetrieb für Einblasdämmung mit Projektbeispielen, Leistungen und Ansprechpartnern." },
        { name: "IB-Krieger", url: "https://www.ib-krieger.de/", description: "Ingenieurbüro für Bauphysik und Energieberatung mit Leistungsprofil und Referenzen." },
        { name: "Zukunft Altbau", url: "https://www.zukunftaltbau.de", description: "Informationsprogramm des Landes Baden-Württemberg für energetische Gebäudesanierung." },
        { name: "Passivhaus Institut", url: "https://www.passivhaus.de", description: "Forschungsinstitut für hocheffiziente Gebäude mit Zertifizierung, Datenbank und Weiterbildung." }
      ]
    },
    {
      category: "Wissensportale & Ratgeber",
      links: [
        { name: "BINE Informationsdienst", url: "https://www.bine.info", description: "Projektberichte, Dossiers und Forschungsergebnisse rund um Energieeffizienz und Erneuerbare." },
        { name: "BauNetz Wissen", url: "https://www.baunetzwissen.de", description: "Aufbereitete Fachbeiträge, Details und Praxisbeispiele zu allen Gewerken." },
        { name: "Effizienzhaus-online", url: "https://www.effizienzhaus-online.de", description: "Vergleichsrechner, Produkte und Schritt-für-Schritt-Ratgeber für Sanierungsvorhaben." },
        { name: "energieheld", url: "https://www.energieheld.de", description: "Wissensdatenbank mit Sanierungsguides, Kostenvergleichen und Handwerkervermittlung." },
        { name: "Wohnglück", url: "https://www.wohnglueck.de", description: "Ratgeber für Hausbau, Modernisierung und Wohnen mit praxisnahen Anleitungen und Kostenübersichten." },
        { name: "Hausjournal", url: "https://www.hausjournal.net", description: "Umfangreiches Heimwerker- und Sanierungsportal mit Schritt-für-Schritt-Anleitungen und Kosteneinschätzungen." }
      ]
    },
    {
      category: "Nachhaltigkeit & Klimaschutz",
      links: [
        { name: "NABU – Gebäude & Energie", url: "https://www.nabu.de/umwelt-und-ressourcen/energie/index.html", description: "Naturschutzbund mit Ratgebern zu nachhaltigem Bauen, Sanieren und erneuerbaren Energien." },
        { name: "Deutsche Gesellschaft für Nachhaltiges Bauen (DGNB)", url: "https://www.dgnb.de", description: "Zertifizierungssystem für nachhaltige Gebäude mit Bewertungskriterien und Projektdatenbank." },
        { name: "Öko-Test Bauen & Wohnen", url: "https://www.oekotest.de/bauen-wohnen/", description: "Unabhängige Tests und Ratgeber zu Baustoffen, Dämmmaterialien und Haustechnik." },
        { name: "Klimaschutz- und Energieagentur (KEA-BW)", url: "https://www.kea-bw.de", description: "Landesweite Beratung und Förderprogramme für Energieeffizienz und Klimaschutz in Baden-Württemberg." }
      ]
    },
    {
      category: "Behördliche Informationen",
      links: [
        { name: "Deutsche Energie-Agentur", url: "https://www.dena.de", description: "Programme, Studien und Leitfäden zur Energiewende auf Bundesebene." },
        { name: "Umweltbundesamt", url: "https://www.umweltbundesamt.de", description: "Publikationen, Daten und Empfehlungen zu Klima-, Umwelt- und Ressourcenschutz." },
        { name: "BMWK", url: "https://www.bmwk.de", description: "Aktuelle Gesetzesinitiativen, Förderprogramme und Pressemitteilungen des Wirtschaftsministeriums." },
        { name: "EnEV-online", url: "https://www.enev-online.de", description: "Kommentierungen, Berechnungshilfen und News zum Gebäudeenergiegesetz." },
        { name: "Bundesnetzagentur", url: "https://www.bundesnetzagentur.de", description: "Regulierungsbehörde für Strom, Gas und Telekommunikation mit Verbraucherinformationen und Marktdaten." }
      ]
    },
    {
      category: "Fachmagazine & Blogs",
      links: [
        { name: "Energie-Fachberater", url: "https://www.energie-fachberater.de", description: "Tägliche News, Produktinformationen und Schritt-für-Schritt-Anleitungen zur Sanierung." },
        { name: "Gebäude-Energieberater Magazin", url: "https://www.geb-info.de", description: "Fachmagazin mit Artikeln, Webinaren und Weiterbildung für Energieberater." },
        { name: "Baulinks", url: "https://www.baulinks.de", description: "Branchenportal mit tagesaktuellen Meldungen, Produktneuheiten und Hintergrundanalysen." },
        { name: "Haustec", url: "https://www.haustec.de", description: "Fachportal für Gebäudetechnik, Heizung und Sanitär mit News, Webinaren und Produkttests." },
        { name: "enbausa.de", url: "https://www.enbausa.de", description: "Nachrichten und Hintergrund zu energetischem Bauen und Sanieren mit Fokus auf Praxisrelevanz." }
      ]
    },
    {
      category: "Normen & Gesetze",
      links: [
        { name: "GEG im Volltext", url: "https://www.gesetze-im-internet.de/geg/", description: "Recherchierbare Online-Fassung des Gebäudeenergiegesetzes mit amtlichen Erläuterungen." },
        { name: "DIN-Normen im Beuth Verlag", url: "https://www.beuth.de/de", description: "Offizieller Shop für DIN-Normen mit Vorschauen, Downloads und Bestellmöglichkeit." },
        { name: "Baurechtsportal der Länder", url: "https://www.baurecht.de", description: "Direktzugriff auf Landesbauordnungen, Verwaltungsvorschriften und Rechtsgrundlagen." },
        { name: "EEG 2023 Volltext", url: "https://www.gesetze-im-internet.de/eeg_2014/", description: "Erneuerbare-Energien-Gesetz im Volltext – Einspeisevergütung, Eigenverbrauch und Mieterstrom." }
      ]
    },
    {
      category: "Community & Foren",
      links: [
        { name: "Energiesparforum", url: "https://www.energiesparhaus.at/forum/", description: "Aktive Community für Bauherren und Sanierer mit Erfahrungsberichten und Expertenwissen." },
        { name: "Photovoltaikforum", url: "https://www.photovoltaikforum.com", description: "Deutschlands größtes PV-Forum – Anlagenplanung, Speicher, Ertragsvergleiche und Erfahrungsaustausch." },
        { name: "Haustechnikdialog", url: "https://www.haustechnikdialog.de", description: "Forum für Heizung, Sanitär und Lüftung mit Fachleuten und Heimwerkern – ideal für konkrete Planungsfragen." }
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
