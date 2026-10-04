export interface FoerderProgramm {
  name: string;
  beschreibung: string;
  foerdersumme: string;
  link: string;
  typ: 'zuschuss' | 'kredit' | 'beratung';
}

export interface BundeslandData {
  id: string;
  name: string;
  hauptstadt: string;
  programme: FoerderProgramm[];
  besonderheiten: string;
}

// Stand: Oktober 2026 – Programme und Links regelmäßig gegen die Landesförderbanken prüfen.
export const regionalFoerderung: Record<string, BundeslandData> = {
  'baden-wuerttemberg': {
    id: 'baden-wuerttemberg',
    name: 'Baden-Württemberg',
    hauptstadt: 'Stuttgart',
    besonderheiten: 'Die L-Bank ergänzt die Bundesförderung mit zinsverbilligten Darlehen und Tilgungszuschüssen für Sanierung und Photovoltaik.',
    programme: [
      { name: 'L-Bank Zusatzfinanzierung Energieeffizienz', beschreibung: 'Zinsverbilligter Kredit für die Effizienzhaus-Sanierung, bis zu 100 % der Kosten.', foerdersumme: 'Bis 100 % der Kosten', link: 'https://www.l-bank.de/produkte/wohnimmobilien/zusatzfinanzierung-energieeffizienz.html', typ: 'kredit' },
      { name: 'L-Bank Wohnen mit Zukunft: Photovoltaik', beschreibung: 'Zinsverbilligtes Darlehen für PV-Anlagen und Stromspeicher an Wohngebäuden.', foerdersumme: 'Zinsverbilligung', link: 'https://www.l-bank.de/produkte/wirtschaftsfoerderung/kombi-darlehen-wohnen.html', typ: 'kredit' },
      { name: 'Mietwohnungsfinanzierung BW – Modernisierung', beschreibung: 'Darlehen mit 1,00 % Sollzins plus 3 % Tilgungszuschuss für energetische Sanierung von Mietwohnungen.', foerdersumme: '1 % Zins + 3 % Tilgungszuschuss', link: 'https://www.l-bank.de/produkte/wohnungsunternehmen/mietwohnungsfinanzierung-bw-modernisierung.html', typ: 'kredit' },
    ],
  },
  'bayern': {
    id: 'bayern',
    name: 'Bayern',
    hauptstadt: 'München',
    besonderheiten: 'Das 10.000-Häuser-Programm wurde 2025 abgeschlossen; die BayernLabo fördert Modernisierung jetzt über das Bayerische Modernisierungsprogramm.',
    programme: [
      { name: 'Bayerisches Modernisierungsprogramm (BayModR)', beschreibung: 'Zinsgünstiges Darlehen plus Zuschuss (Basis 300 €/m², Nachhaltigkeit bis 200 €/m²) für die Modernisierung von Mietwohnraum.', foerdersumme: 'Bis 500 €/m² Zuschuss', link: 'https://bayernlabo.de/mietwohnraum/bayerisches-modernisierungsprogramm', typ: 'zuschuss' },
      { name: 'BayernLabo Wohnungsbauprogramm', beschreibung: 'Zinsgünstige Darlehen für Modernisierung und energetische Sanierung von Wohnraum.', foerdersumme: 'Zinsgünstiges Darlehen', link: 'https://bayernlabo.de/', typ: 'kredit' },
      { name: 'Energieberatung Bayern', beschreibung: 'Geförderte Energieberatung für Privathaushalte über das Bayerische Wirtschaftsministerium.', foerdersumme: 'Geförderte Beratung', link: 'https://www.stmwi.bayern.de/', typ: 'beratung' },
    ],
  },
  'berlin': {
    id: 'berlin',
    name: 'Berlin',
    hauptstadt: 'Berlin',
    besonderheiten: 'Die IBB kombiniert KfW-Kredite mit eigener Zinssubvention und bietet mit Effiziente GebäudePLUS hohe Zuschüsse für Anlagentechnik.',
    programme: [
      { name: 'Effiziente GebäudePLUS', beschreibung: 'Zuschuss für Heizungstausch, Heizungsoptimierung, Wärmenetzanschluss und Lüftungsanlagen in Bestandsgebäuden.', foerdersumme: 'Bis 500.000 € je Vorhaben', link: 'https://www.ibb.de/de/foerderprogramme/effiziente-gebaeudeplus.html', typ: 'zuschuss' },
      { name: 'IBB Energetische Gebäudesanierung – Effizienzhaus', beschreibung: 'KfW-261-Darlehen mit IBB-Zinssubvention bis 0,6 % p.a. und Tilgungszuschuss bis 40 %.', foerdersumme: 'Bis 150.000 € je WE', link: 'https://www.ibb.de/de/foerderprogramme/ibb-energetische-gebaeudesanierung-effizienzhaus.html', typ: 'kredit' },
      { name: 'IBB Energetische Gebäudesanierung – Einzelmaßnahmen', beschreibung: 'KfW-359-Ergänzungskredit mit Zinssubvention für Dämmung, Fenster und Heizungsmodernisierung.', foerdersumme: 'Bis 120.000 € je WE', link: 'https://www.ibb.de/de/foerderprogramme/ibb-energetische-gebaeudesanierung-einzelmassnahmen.html', typ: 'kredit' },
    ],
  },
  'brandenburg': {
    id: 'brandenburg',
    name: 'Brandenburg',
    hauptstadt: 'Potsdam',
    besonderheiten: 'Die ILB lockert KfW-Kredite mit Landes-Tilgungszuschüssen und bietet Selbstnutzern ein zinsfreies Darlehen plus Grundzuschuss.',
    programme: [
      { name: 'Brandenburg-Kredit Energieeffizienter Wohnungsbau', beschreibung: 'Darlehen für Effizienzhaus-Sanierung mit 5 % zusätzlichem Tilgungszuschuss des Landes.', foerdersumme: '+5 % Tilgungszuschuss', link: 'https://www.ilb.de/de/wohnungsbau/uebersicht-der-foerderprogramme/brandenburg-kredit-energieeffizienter-wohnungsbau/', typ: 'kredit' },
      { name: 'Wohneigentum – Nachhaltige Modernisierung', beschreibung: 'Zinsfreies Darlehen (20 Jahre) plus 30.000 € Grundzuschuss für energetische Maßnahmen bei Selbstnutzung.', foerdersumme: '30.000 € Zuschuss + zinsfreies Darlehen', link: 'https://www.ilb.de/de/wohnungsbau/uebersicht-der-foerderprogramme/wohneigentum-nachhaltige-modernisierung/', typ: 'zuschuss' },
    ],
  },
  'bremen': {
    id: 'bremen',
    name: 'Bremen',
    hauptstadt: 'Bremen',
    besonderheiten: 'Die BAB fördert mit „Rund ums Haus" unbürokratisch; ein neues Wärmewende-Programm für den Heizungstausch ist ab Herbst 2026 geplant.',
    programme: [
      { name: 'BAB Rund ums Haus', beschreibung: 'Zinsgünstige Kredite für energetische Maßnahmen und Photovoltaik, oft ohne Grundschuldeintrag.', foerdersumme: 'Bis 50.000 €', link: 'https://www.bab-bremen.de/de/page/programm/rund-ums-haus', typ: 'kredit' },
      { name: 'BAB Wärmewende-Programm (ab Herbst 2026)', beschreibung: 'Geplantes bonitätsunabhängiges Kreditprogramm für den Heizungstausch.', foerdersumme: 'In Vorbereitung', link: 'https://www.bab-bremen.de/de/page/news/82957', typ: 'kredit' },
    ],
  },
  'hamburg': {
    id: 'hamburg',
    name: 'Hamburg',
    hauptstadt: 'Hamburg',
    besonderheiten: 'Die IFB Hamburg fördert Einzelmaßnahmen mit Zuschüssen ohne Bindung und Komplettsanierungen mit günstigen Darlehen.',
    programme: [
      { name: 'IFB Energetische Modernisierung (Modul A)', beschreibung: 'Zuschuss für Einzelmaßnahmen an der Gebäudehülle – Dämmung, Fenster, Lüftung – ohne Mietpreisbindung.', foerdersumme: 'Zuschuss pro Maßnahme', link: 'https://www.ifbhh.de/programme/immobilienwirtschaft/mietwohnungen-modernisieren/energetisch-modernisieren/energetische-modernisierung-von-mietwohnungen-mod-a', typ: 'zuschuss' },
      { name: 'IFB Umfassende Modernisierung (Modul B)', beschreibung: 'Darlehen mit 1,25 % Zins plus Baukostenzuschüsse für die Effizienzhaus-Sanierung (mit Mietpreisbindung).', foerdersumme: '1,25 % Darlehen + Zuschüsse', link: 'https://www.ifbhh.de/programme/immobilienwirtschaft/mietwohnungen-modernisieren/umfassend-modernisieren/umfassende-modernisierung-von-mietwohnungen-mod-b', typ: 'kredit' },
      { name: 'Hamburger Energielotsen', beschreibung: 'Kostenlose und unabhängige Energieberatung für Haushalte.', foerdersumme: 'Kostenlos', link: 'https://www.hamburg.de/energielotsen/', typ: 'beratung' },
    ],
  },
  'hessen': {
    id: 'hessen',
    name: 'Hessen',
    hauptstadt: 'Wiesbaden',
    besonderheiten: 'Die WIBank verbilligt KfW-Sanierungskredite zusätzlich und fördert seit 2025 Photovoltaik an selbstgenutzten Immobilien.',
    programme: [
      { name: 'WIBank Zinssubvention KfW-BEG (Mietwohnungen)', beschreibung: 'Zusätzliche Verbilligung des KfW-Zinssatzes für die Effizienzhaus-Sanierung von Mietwohnungen.', foerdersumme: 'Zinssubvention', link: 'https://www.wibank.de/wibank/kfw-beg-wohngebaeude-kredit-effizienzhaus-sanierung/mietwohnungen-kfw-beg-wohngebaeude-kredit-effizienzhaus-sanierung--306930', typ: 'kredit' },
      { name: 'WIBank PV-Darlehen (neu 2025)', beschreibung: 'Zinszuschuss von 1,5 % für Photovoltaik bis 20 kW und Speicher an selbstgenutzten Immobilien.', foerdersumme: '1,5 % Zinszuschuss', link: 'https://gutregiert.hessen.de/presse/darlehensprogramm-fuer-photovoltaikanlagen-bei-der-wi-bank-neu-aufgelegt', typ: 'kredit' },
      { name: 'Hessische Energiesparaktion', beschreibung: 'Beratung und Information rund um energetisches Bauen und Sanieren.', foerdersumme: 'Kostenlos', link: 'https://www.energiesparaktion.de/', typ: 'beratung' },
    ],
  },
  'mecklenburg-vorpommern': {
    id: 'mecklenburg-vorpommern',
    name: 'Mecklenburg-Vorpommern',
    hauptstadt: 'Schwerin',
    besonderheiten: 'Das LFI fördert mit zinslosen Darlehen und hohem Tilgungsnachlass; der EH-85-Zuschuss (Modul B) ist derzeit gestoppt.',
    programme: [
      { name: 'LFI Modernisierungsdarlehen (Modul A)', beschreibung: 'Zinsloses Darlehen mit 25 % Tilgungsnachlass für energetische Modernisierung von Wohnraum.', foerdersumme: '25 % Tilgungsnachlass', link: 'https://www.lfi-mv.de/foerderfinder/modernisierung/', typ: 'kredit' },
      { name: 'Energieberatung MV', beschreibung: 'Beratungsangebote der Landesenergie- und Klimaschutzagentur für Eigentümer.', foerdersumme: 'Kostenlos', link: 'https://www.regierung-mv.de/', typ: 'beratung' },
    ],
  },
  'niedersachsen': {
    id: 'niedersachsen',
    name: 'Niedersachsen',
    hauptstadt: 'Hannover',
    besonderheiten: 'Die NBank kombiniert zinslose Darlehen mit einkommensabhängigen Zuschüssen – für Selbstnutzer und Vermieter.',
    programme: [
      { name: 'NBank Klimagerechte Modernisierung (Selbstnutzer)', beschreibung: 'Zinsloses Darlehen plus einkommensabhängiger Zuschuss für die energetische Verbesserung selbstgenutzten Wohneigentums.', foerdersumme: 'Zinslos + Zuschuss', link: 'https://www.nbank.de/F%C3%B6rderprogramme/Aktuelle-F%C3%B6rderprogramme/Eigentumsf%C3%B6rderung-(Selbst-genutztes-Wohneigentum).html', typ: 'zuschuss' },
      { name: 'NBank Modernisierung von Mietwohnraum', beschreibung: 'Zuschüsse für Vermieter bei Verbesserung der Energieeffizienzklasse um mindestens zwei Stufen.', foerdersumme: 'Zuschuss pro WE', link: 'https://www.nbank.de/F%C3%B6rderprogramme/Aktuelle-F%C3%B6rderprogramme/Modernisierung-von-Mietwohnraum.html', typ: 'zuschuss' },
      { name: 'KEAN Energieberatung', beschreibung: 'Kostenlose Initialberatung durch die Klimaschutz- und Energieagentur Niedersachsen.', foerdersumme: 'Kostenlos', link: 'https://www.klimaschutz-niedersachsen.de/', typ: 'beratung' },
    ],
  },
  'nordrhein-westfalen': {
    id: 'nordrhein-westfalen',
    name: 'Nordrhein-Westfalen',
    hauptstadt: 'Düsseldorf',
    besonderheiten: 'progres.nrw läuft seit Februar 2026 wieder; die NRW.BANK ergänzt mit Darlehen bis 220.000 € und hohen Tilgungsnachlässen.',
    programme: [
      { name: 'progres.nrw – Klimaschutztechnik', beschreibung: 'Zuschüsse für Lüftungsanlagen mit Wärmerückgewinnung, Geothermie und effiziente Wärmetechnik (seit 17.02.2026 wieder geöffnet).', foerdersumme: 'Zuschuss pro Maßnahme', link: 'https://www.progres.nrw/', typ: 'zuschuss' },
      { name: 'NRW.BANK Eigentumsförderung – Modernisierung', beschreibung: 'Darlehen bis 220.000 € mit bis zu 50 % Tilgungsnachlass (einkommensabhängig).', foerdersumme: 'Bis 220.000 €, bis 50 % Nachlass', link: 'https://www.nrwbank.de/de/foerderung/foerderprodukte/15342/eigentumsfoerderung---modernisierung.html', typ: 'kredit' },
      { name: 'NRW.BANK.Gebäudesanierung', beschreibung: 'Zinsgünstiges Darlehen für energetische Sanierung und Photovoltaik – ohne Einkommensgrenze.', foerdersumme: 'Bis 150.000 €', link: 'https://www.nrwbank.de/de/foerderung/foerderprodukte/15603/nrwbank-gebaeudesanierung.html', typ: 'kredit' },
    ],
  },
  'rheinland-pfalz': {
    id: 'rheinland-pfalz',
    name: 'Rheinland-Pfalz',
    hauptstadt: 'Mainz',
    besonderheiten: 'Die ISB fördert Selbstnutzer und Vermieter mit günstigen Darlehen und Tilgungszuschüssen bis 40 %.',
    programme: [
      { name: 'ISB Modernisierung selbstgenutzter Wohnraum (505)', beschreibung: 'Darlehen bis 100.000 € mit bis zu 25 % Tilgungszuschuss für energetische Maßnahmen.', foerdersumme: 'Bis 100.000 €, bis 25 % Zuschuss', link: 'https://isb.rlp.de/foerderung/505', typ: 'kredit' },
      { name: 'ISB Modernisierung vermieteter Wohnraum (553)', beschreibung: 'Darlehen mit 1,0 % Zins und bis zu 40 % Tilgungszuschuss für die Effizienzhaus-Sanierung.', foerdersumme: '1 % Zins, bis 40 % Zuschuss', link: 'https://isb.rlp.de/foerderung/553', typ: 'kredit' },
    ],
  },
  'saarland': {
    id: 'saarland',
    name: 'Saarland',
    hauptstadt: 'Saarbrücken',
    besonderheiten: 'Das Saarland zahlt einen eigenen Sanierungszuschuss von bis zu 30.000 € pro Wohneinheit – zusätzlich zur Bundesförderung.',
    programme: [
      { name: 'Energetische Sanierung Saarland (Zuschuss)', beschreibung: 'Landeszuschuss für die Effizienzhaus-Sanierung von Gebäuden mit Baujahr vor 2002.', foerdersumme: 'Bis 30.000 € je WE', link: 'https://service.saarland.de/sldlp/detail?areaId=&pstCatId=100102551&pstGroupId=&pstId=102732992', typ: 'zuschuss' },
      { name: 'SIKB Modernisierungskredit', beschreibung: 'Durchleitung von KfW-Mitteln mit regionaler Beratung für Effizienzhaus und Einzelmaßnahmen.', foerdersumme: 'KfW-Konditionen', link: 'https://www.sikb.de/modernisieren-sanieren', typ: 'kredit' },
    ],
  },
  'sachsen': {
    id: 'sachsen',
    name: 'Sachsen',
    hauptstadt: 'Dresden',
    besonderheiten: 'Der 2025 neu aufgelegte Sachsenkredit Klimafreundliches Wohnen verbilligt Sanierung und Photovoltaik spürbar.',
    programme: [
      { name: 'SAB Sachsenkredit Klimafreundliches Wohnen (neu 2025)', beschreibung: 'Darlehen bis 100 % der Kosten mit 0,8 % Zinsverbilligung für energetische Sanierung und PV.', foerdersumme: 'Bis 100 % der Kosten', link: 'https://sab.sachsen.de/sab-sachsenkredit-klimafreundlicher-wohnen', typ: 'kredit' },
      { name: 'SAB BEG Wohngebäude Kredit', beschreibung: 'KfW-Durchleitung bis 150.000 € je Wohneinheit mit Tilgungszuschuss für Effizienzhäuser.', foerdersumme: 'Bis 150.000 € je WE', link: 'https://sab.sachsen.de/beg-wohngeb%C3%A4ude-kredit-effizienzhaus', typ: 'kredit' },
      { name: 'SAENA Energieberatung', beschreibung: 'Beratung durch die Sächsische Energieagentur.', foerdersumme: 'Kostenlos', link: 'https://www.saena.de/', typ: 'beratung' },
    ],
  },
  'sachsen-anhalt': {
    id: 'sachsen-anhalt',
    name: 'Sachsen-Anhalt',
    hauptstadt: 'Magdeburg',
    besonderheiten: 'Die IB Sachsen-Anhalt fördert energetische Sanierung mit zinsgünstigen Darlehen aus dem Fonds Wohnraumförderung.',
    programme: [
      { name: 'Sachsen-Anhalt MODERN', beschreibung: 'Zinsgünstiges Darlehen (0,95 %–1,75 %) für die energetische Sanierung von Wohngebäuden.', foerdersumme: 'Ab 0,95 % Zins', link: 'https://www.ib-sachsen-anhalt.de/de/unternehmen/wohnen-vermieten/modern', typ: 'kredit' },
      { name: 'Sachsen-Anhalt ENERGIE', beschreibung: 'Zuschüsse für Energieeffizienzmaßnahmen in Unternehmen und Kommunen.', foerdersumme: 'Bis 200.000 €', link: 'https://www.ib-sachsen-anhalt.de/', typ: 'zuschuss' },
    ],
  },
  'schleswig-holstein': {
    id: 'schleswig-holstein',
    name: 'Schleswig-Holstein',
    hauptstadt: 'Kiel',
    besonderheiten: 'Die IB.SH kombiniert Soziale Wohnraumförderung mit Ergänzungsdarlehen für besonders effiziente Sanierungen.',
    programme: [
      { name: 'IB.SH Soziale Wohnraumförderung – Modernisierung', beschreibung: 'Darlehen und Zuschüsse für die energetische Modernisierung von Mietwohnraum.', foerdersumme: 'Darlehen + Zuschuss', link: 'https://www.ib-sh.de/produkt/soziale-wohnraumfoerderung-fuer-mietwohnungsmassnahmen/', typ: 'zuschuss' },
      { name: 'IB.SH Immo Eigentum', beschreibung: 'Ergänzungsdarlehen bei Effizienzhaus-40-Standard oder für Haushalte mit Kindern.', foerdersumme: 'Bis 200.000 €', link: 'https://www.ib-sh.de/produkt/ibsh-immo-eigentum/', typ: 'kredit' },
    ],
  },
  'thueringen': {
    id: 'thueringen',
    name: 'Thüringen',
    hauptstadt: 'Erfurt',
    besonderheiten: 'Thüringen zahlt einen direkten Sanierungsbonus von 12.000 € und ergänzt ihn seit 2025 mit dem EigenheimPlus-Darlehen.',
    programme: [
      { name: 'Thüringer Sanierungsbonus', beschreibung: 'Direktzuschuss für die Sanierung von Bestandsgebäuden, plus Kinderzulage.', foerdersumme: '12.000 € + Kinderzulage', link: 'https://www.aufbaubank.de/', typ: 'zuschuss' },
      { name: 'TAB EigenheimPlus (neu 2025)', beschreibung: 'Zinsgünstiges Darlehen für Erwerb und Modernisierung von Bestandsimmobilien.', foerdersumme: 'Bis 150.000 €', link: 'https://www.aufbaubank.de/', typ: 'kredit' },
      { name: 'ThEGA Energieberatung', beschreibung: 'Kostenlose Erstberatung durch die Thüringer Energie- und GreenTech-Agentur.', foerdersumme: 'Kostenlos', link: 'https://www.thega.de/', typ: 'beratung' },
    ],
  },
};

export const bundeslaender = Object.values(regionalFoerderung);

export function getBundeslandBySlug(slug: string): BundeslandData | undefined {
  return regionalFoerderung[slug];
}
