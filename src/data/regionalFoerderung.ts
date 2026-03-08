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

export const regionalFoerderung: Record<string, BundeslandData> = {
  'baden-wuerttemberg': {
    id: 'baden-wuerttemberg',
    name: 'Baden-Württemberg',
    hauptstadt: 'Stuttgart',
    besonderheiten: 'Vorreiter bei energetischer Sanierung mit eigenen Landesprogrammen zusätzlich zu BAFA/KfW.',
    programme: [
      { name: 'L-Bank Wohnraumförderung', beschreibung: 'Zinsgünstige Darlehen für energetische Sanierung von Wohngebäuden.', foerdersumme: 'Bis 100.000 €', link: 'https://www.l-bank.de/', typ: 'kredit' },
      { name: 'Klimaschutz-Plus', beschreibung: 'Zuschüsse für CO₂-mindernde Maßnahmen in Nichtwohngebäuden.', foerdersumme: 'Bis 200.000 €', link: 'https://um.baden-wuerttemberg.de/', typ: 'zuschuss' },
      { name: 'Energieberatung BW', beschreibung: 'Kostenlose Erstberatung durch die Energieagentur Baden-Württemberg.', foerdersumme: 'Kostenlos', link: 'https://www.zukunftaltbau.de/', typ: 'beratung' },
    ],
  },
  'bayern': {
    id: 'bayern',
    name: 'Bayern',
    hauptstadt: 'München',
    besonderheiten: '10.000-Häuser-Programm als eines der umfangreichsten Landesprogramme Deutschlands.',
    programme: [
      { name: '10.000-Häuser-Programm (EnergieSystemHaus)', beschreibung: 'Zuschuss für innovative Energiesysteme bei Neubau und Sanierung.', foerdersumme: 'Bis 18.000 €', link: 'https://www.energieatlas.bayern.de/', typ: 'zuschuss' },
      { name: 'BayernLabo Wohnungsbauprogramm', beschreibung: 'Zinsgünstige Darlehen für Modernisierung von Mietwohnungen.', foerdersumme: 'Bis 150.000 €', link: 'https://bayernlabo.de/', typ: 'kredit' },
      { name: 'Bayerisches Energieberatungsprogramm', beschreibung: 'Geförderte Energieberatung für Privathaushalte.', foerdersumme: 'Bis 1.200 €', link: 'https://www.stmwi.bayern.de/', typ: 'beratung' },
    ],
  },
  'berlin': {
    id: 'berlin',
    name: 'Berlin',
    hauptstadt: 'Berlin',
    besonderheiten: 'IBB-Förderprogramme speziell für den großstädtischen Gebäudebestand.',
    programme: [
      { name: 'IBB Energetische Gebäudesanierung', beschreibung: 'Zuschüsse für Wärmedämmung, Fenstertausch und Heizungsmodernisierung.', foerdersumme: 'Bis 25.000 €', link: 'https://www.ibb.de/', typ: 'zuschuss' },
      { name: 'BENE – Berliner Programm für Nachhaltige Entwicklung', beschreibung: 'EU-kofinanziertes Programm für Klimaschutzprojekte.', foerdersumme: 'Projektabhängig', link: 'https://www.berlin.de/sen/uvk/', typ: 'zuschuss' },
      { name: 'Stromspar-Check Berlin', beschreibung: 'Kostenlose Energiesparberatung für einkommensschwache Haushalte.', foerdersumme: 'Kostenlos', link: 'https://www.stromspar-check.de/', typ: 'beratung' },
    ],
  },
  'brandenburg': {
    id: 'brandenburg',
    name: 'Brandenburg',
    hauptstadt: 'Potsdam',
    besonderheiten: 'ILB-Förderprogramme mit Fokus auf ländliche Regionen und Altbausanierung.',
    programme: [
      { name: 'ILB Wohnungsmodernisierung', beschreibung: 'Darlehen für die Modernisierung von Wohngebäuden.', foerdersumme: 'Bis 75.000 €', link: 'https://www.ilb.de/', typ: 'kredit' },
      { name: 'RENplus 2024-2030', beschreibung: 'Förderung von Maßnahmen zur Steigerung der Energieeffizienz.', foerdersumme: 'Bis 500.000 €', link: 'https://www.ilb.de/', typ: 'zuschuss' },
    ],
  },
  'bremen': {
    id: 'bremen',
    name: 'Bremen',
    hauptstadt: 'Bremen',
    besonderheiten: 'Kompakte Förderlandschaft mit Fokus auf innerstädtische Gebäudesanierung.',
    programme: [
      { name: 'BAB Energetische Sanierung', beschreibung: 'Zuschüsse für Wärmedämmung und Heizungserneuerung.', foerdersumme: 'Bis 15.000 €', link: 'https://www.bab-bremen.de/', typ: 'zuschuss' },
      { name: 'Bremer Modernisieren', beschreibung: 'Beratungsangebot und Fördermittelübersicht für Hauseigentümer.', foerdersumme: 'Kostenlos', link: 'https://www.bremer-modernisieren.de/', typ: 'beratung' },
    ],
  },
  'hamburg': {
    id: 'hamburg',
    name: 'Hamburg',
    hauptstadt: 'Hamburg',
    besonderheiten: 'IFB Hamburg bietet eines der großzügigsten kommunalen Förderprogramme.',
    programme: [
      { name: 'IFB Wärmeschutz im Gebäudebestand', beschreibung: 'Zuschüsse für Dämmung, Fenster und Lüftungsanlagen.', foerdersumme: 'Bis 50.000 €', link: 'https://www.ifbhh.de/', typ: 'zuschuss' },
      { name: 'IFB Heizungstausch', beschreibung: 'Förderung für den Umstieg auf erneuerbare Heizsysteme.', foerdersumme: 'Bis 25.000 €', link: 'https://www.ifbhh.de/', typ: 'zuschuss' },
      { name: 'Hamburger Energielotsen', beschreibung: 'Kostenlose und unabhängige Energieberatung.', foerdersumme: 'Kostenlos', link: 'https://www.hamburg.de/energielotsen/', typ: 'beratung' },
    ],
  },
  'hessen': {
    id: 'hessen',
    name: 'Hessen',
    hauptstadt: 'Wiesbaden',
    besonderheiten: 'WI Bank Programme speziell für Altbausanierung und erneuerbare Energien.',
    programme: [
      { name: 'WI Bank Energieeffizienz', beschreibung: 'Zinsgünstige Darlehen für energetische Modernisierung.', foerdersumme: 'Bis 100.000 €', link: 'https://www.wibank.de/', typ: 'kredit' },
      { name: 'Hessische Energiesparaktion', beschreibung: 'Beratung und Information rund um energetisches Bauen und Sanieren.', foerdersumme: 'Kostenlos', link: 'https://www.energiesparaktion.de/', typ: 'beratung' },
    ],
  },
  'mecklenburg-vorpommern': {
    id: 'mecklenburg-vorpommern',
    name: 'Mecklenburg-Vorpommern',
    hauptstadt: 'Schwerin',
    besonderheiten: 'Förderschwerpunkt auf Altbausanierung im ländlichen Raum.',
    programme: [
      { name: 'Landesförderinstitut MV – Modernisierung', beschreibung: 'Darlehen für die Modernisierung von Wohnraum.', foerdersumme: 'Bis 80.000 €', link: 'https://www.lfi-mv.de/', typ: 'kredit' },
      { name: 'Klimaschutzförderung MV', beschreibung: 'Zuschüsse für klimaschützende Investitionen in Gebäude.', foerdersumme: 'Bis 30.000 €', link: 'https://www.regierung-mv.de/', typ: 'zuschuss' },
    ],
  },
  'niedersachsen': {
    id: 'niedersachsen',
    name: 'Niedersachsen',
    hauptstadt: 'Hannover',
    besonderheiten: 'NBank-Förderungen mit breitem Spektrum für Wohngebäude und Nichtwohngebäude.',
    programme: [
      { name: 'NBank Modernisierung', beschreibung: 'Zinsgünstige Darlehen für Sanierung und Modernisierung.', foerdersumme: 'Bis 120.000 €', link: 'https://www.nbank.de/', typ: 'kredit' },
      { name: 'Klimaschutz durch Wärmewende', beschreibung: 'Zuschüsse für Heizungstausch und Wärmenetzanschluss.', foerdersumme: 'Bis 20.000 €', link: 'https://www.nbank.de/', typ: 'zuschuss' },
      { name: 'KEAN Energieberatung', beschreibung: 'Kostenlose Initialberatung durch die Klimaschutzagentur.', foerdersumme: 'Kostenlos', link: 'https://www.klimaschutz-niedersachsen.de/', typ: 'beratung' },
    ],
  },
  'nordrhein-westfalen': {
    id: 'nordrhein-westfalen',
    name: 'Nordrhein-Westfalen',
    hauptstadt: 'Düsseldorf',
    besonderheiten: 'progres.nrw als eines der bekanntesten Landesförderprogramme für Energieeffizienz.',
    programme: [
      { name: 'progres.nrw – Klimaschutztechnik', beschreibung: 'Zuschüsse für Solarthermie, Wärmepumpen, Lüftungsanlagen und Batteriespeicher.', foerdersumme: 'Bis 75.000 €', link: 'https://www.progres.nrw/', typ: 'zuschuss' },
      { name: 'NRW.BANK Modernisierung', beschreibung: 'Zinsgünstige Darlehen für energetische Gebäudesanierung.', foerdersumme: 'Bis 150.000 €', link: 'https://www.nrwbank.de/', typ: 'kredit' },
      { name: 'Verbraucherzentrale NRW – Energieberatung', beschreibung: 'Umfassende Energieberatung für Privathaushalte.', foerdersumme: 'Ab 30 € Eigenanteil', link: 'https://www.verbraucherzentrale.nrw/', typ: 'beratung' },
    ],
  },
  'rheinland-pfalz': {
    id: 'rheinland-pfalz',
    name: 'Rheinland-Pfalz',
    hauptstadt: 'Mainz',
    besonderheiten: 'ISB-Programme mit Fokus auf Altbausanierung und soziale Wohnraumförderung.',
    programme: [
      { name: 'ISB Modernisierung', beschreibung: 'Darlehen für energetische Modernisierung von Wohngebäuden.', foerdersumme: 'Bis 100.000 €', link: 'https://isb.rlp.de/', typ: 'kredit' },
      { name: 'Zukunftsfähige Energieinfrastrukturen', beschreibung: 'Zuschüsse für kommunale Wärmenetze und Energieprojekte.', foerdersumme: 'Projektabhängig', link: 'https://mwvlw.rlp.de/', typ: 'zuschuss' },
    ],
  },
  'saarland': {
    id: 'saarland',
    name: 'Saarland',
    hauptstadt: 'Saarbrücken',
    besonderheiten: 'Kompakte Förderlandschaft mit attraktiven Zuschüssen für Privathaushalte.',
    programme: [
      { name: 'Saarländisches Modernisierungsprogramm', beschreibung: 'Zuschüsse für energetische Sanierung von Altbauten.', foerdersumme: 'Bis 20.000 €', link: 'https://www.saarland.de/', typ: 'zuschuss' },
      { name: 'SIKB Wohnraumförderung', beschreibung: 'Zinsgünstige Darlehen für Modernisierung.', foerdersumme: 'Bis 75.000 €', link: 'https://www.sikb.de/', typ: 'kredit' },
    ],
  },
  'sachsen': {
    id: 'sachsen',
    name: 'Sachsen',
    hauptstadt: 'Dresden',
    besonderheiten: 'SAB-Förderprogramme mit besonderem Fokus auf den ostdeutschen Gebäudebestand.',
    programme: [
      { name: 'SAB Energetische Sanierung', beschreibung: 'Darlehen und Zuschüsse für Komplettsanierungen.', foerdersumme: 'Bis 100.000 €', link: 'https://www.sab.sachsen.de/', typ: 'kredit' },
      { name: 'SAENA Energieberatung', beschreibung: 'Beratung durch die Sächsische Energieagentur.', foerdersumme: 'Kostenlos', link: 'https://www.saena.de/', typ: 'beratung' },
    ],
  },
  'sachsen-anhalt': {
    id: 'sachsen-anhalt',
    name: 'Sachsen-Anhalt',
    hauptstadt: 'Magdeburg',
    besonderheiten: 'IB Sachsen-Anhalt fördert gezielt Sanierung im ländlichen Raum.',
    programme: [
      { name: 'IB Sachsen-Anhalt – STARK III', beschreibung: 'Förderung energetischer Sanierung öffentlicher Gebäude.', foerdersumme: 'Projektabhängig', link: 'https://www.ib-sachsen-anhalt.de/', typ: 'zuschuss' },
      { name: 'Sachsen-Anhalt ENERGIE', beschreibung: 'Zuschüsse für Energieeffizienzmaßnahmen in Unternehmen und Kommunen.', foerdersumme: 'Bis 200.000 €', link: 'https://www.ib-sachsen-anhalt.de/', typ: 'zuschuss' },
    ],
  },
  'schleswig-holstein': {
    id: 'schleswig-holstein',
    name: 'Schleswig-Holstein',
    hauptstadt: 'Kiel',
    besonderheiten: 'IB.SH-Programme mit Schwerpunkt auf Windenergie und Wärmewende.',
    programme: [
      { name: 'IB.SH Immobilienförderung', beschreibung: 'Darlehen für Modernisierung und energetische Sanierung.', foerdersumme: 'Bis 100.000 €', link: 'https://www.ib-sh.de/', typ: 'kredit' },
      { name: 'Energiewende- und Klimaschutzgesetz SH', beschreibung: 'Fördermittel für erneuerbare Energien und Gebäudeeffizienz.', foerdersumme: 'Projektabhängig', link: 'https://www.schleswig-holstein.de/', typ: 'zuschuss' },
    ],
  },
  'thueringen': {
    id: 'thueringen',
    name: 'Thüringen',
    hauptstadt: 'Erfurt',
    besonderheiten: 'GreenInvest und SolarInvest als innovative Landesförderprogramme.',
    programme: [
      { name: 'TAB GreenInvest', beschreibung: 'Zuschüsse für investive Klimaschutzmaßnahmen.', foerdersumme: 'Bis 100.000 €', link: 'https://www.aufbaubank.de/', typ: 'zuschuss' },
      { name: 'SolarInvest', beschreibung: 'Förderung von Photovoltaik-Anlagen und Batteriespeichern.', foerdersumme: 'Bis 10.000 €', link: 'https://www.aufbaubank.de/', typ: 'zuschuss' },
      { name: 'ThEGA Energieberatung', beschreibung: 'Kostenlose Erstberatung durch die Thüringer Energieagentur.', foerdersumme: 'Kostenlos', link: 'https://www.thega.de/', typ: 'beratung' },
    ],
  },
};

export const bundeslaender = Object.values(regionalFoerderung);

export function getBundeslandBySlug(slug: string): BundeslandData | undefined {
  return regionalFoerderung[slug];
}
