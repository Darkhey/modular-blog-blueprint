import { SolarInputs, SolarConfiguration, SolarResults, SolarCosts, RegionalData } from '@/types/solarCalculator';

// Regionale Sonneneinstrahlung (vereinfacht nach ersten 2 PLZ-Stellen)
const REGIONAL_DATA: RegionalData = {
  '01': { sonnenstunden: 1650, globalstrahlung: 1050, faktor: 1.0 }, // Sachsen
  '02': { sonnenstunden: 1580, globalstrahlung: 1020, faktor: 0.97 }, // Sachsen
  '03': { sonnenstunden: 1620, globalstrahlung: 1040, faktor: 0.99 }, // Brandenburg
  '04': { sonnenstunden: 1650, globalstrahlung: 1050, faktor: 1.0 }, // Sachsen-Anhalt
  '06': { sonnenstunden: 1720, globalstrahlung: 1100, faktor: 1.05 }, // Hessen
  '07': { sonnenstunden: 1750, globalstrahlung: 1120, faktor: 1.07 }, // Thüringen
  '08': { sonnenstunden: 1800, globalstrahlung: 1150, faktor: 1.1 }, // Baden-Württemberg
  '09': { sonnenstunden: 1780, globalstrahlung: 1140, faktor: 1.09 }, // Bayern
  '10': { sonnenstunden: 1520, globalstrahlung: 980, faktor: 0.93 }, // Berlin
  '12': { sonnenstunden: 1580, globalstrahlung: 1020, faktor: 0.97 }, // Brandenburg
  '13': { sonnenstunden: 1600, globalstrahlung: 1030, faktor: 0.98 }, // Mecklenburg-Vorpommern
  '14': { sonnenstunden: 1650, globalstrahlung: 1050, faktor: 1.0 }, // Sachsen
  '15': { sonnenstunden: 1620, globalstrahlung: 1040, faktor: 0.99 }, // Brandenburg
  '16': { sonnenstunden: 1670, globalstrahlung: 1070, faktor: 1.02 }, // Thüringen
  '18': { sonnenstunden: 1590, globalstrahlung: 1025, faktor: 0.98 }, // Mecklenburg-Vorpommern
  '19': { sonnenstunden: 1610, globalstrahlung: 1035, faktor: 0.99 }, // Mecklenburg-Vorpommern
  '20': { sonnenstunden: 1540, globalstrahlung: 990, faktor: 0.94 }, // Hamburg
  '21': { sonnenstunden: 1520, globalstrahlung: 980, faktor: 0.93 }, // Schleswig-Holstein
  '22': { sonnenstunden: 1530, globalstrahlung: 985, faktor: 0.94 }, // Hamburg
  '23': { sonnenstunden: 1510, globalstrahlung: 975, faktor: 0.93 }, // Schleswig-Holstein
  '24': { sonnenstunden: 1520, globalstrahlung: 980, faktor: 0.93 }, // Schleswig-Holstein
  '25': { sonnenstunden: 1540, globalstrahlung: 990, faktor: 0.94 }, // Schleswig-Holstein
  '26': { sonnenstunden: 1560, globalstrahlung: 1000, faktor: 0.95 }, // Niedersachsen
  '27': { sonnenstunden: 1550, globalstrahlung: 995, faktor: 0.95 }, // Niedersachsen
  '28': { sonnenstunden: 1530, globalstrahlung: 985, faktor: 0.94 }, // Bremen
  '29': { sonnenstunden: 1540, globalstrahlung: 990, faktor: 0.94 }, // Niedersachsen
  '30': { sonnenstunden: 1580, globalstrahlung: 1020, faktor: 0.97 }, // Niedersachsen
  '31': { sonnenstunden: 1590, globalstrahlung: 1025, faktor: 0.98 }, // Niedersachsen
  '32': { sonnenstunden: 1600, globalstrahlung: 1030, faktor: 0.98 }, // Niedersachsen
  '33': { sonnenstunden: 1610, globalstrahlung: 1035, faktor: 0.99 }, // Niedersachsen
  '34': { sonnenstunden: 1620, globalstrahlung: 1040, faktor: 0.99 }, // Niedersachsen
  '35': { sonnenstunden: 1680, globalstrahlung: 1080, faktor: 1.03 }, // Hessen
  '36': { sonnenstunden: 1690, globalstrahlung: 1085, faktor: 1.04 }, // Thüringen
  '37': { sonnenstunden: 1600, globalstrahlung: 1030, faktor: 0.98 }, // Niedersachsen
  '38': { sonnenstunden: 1620, globalstrahlung: 1040, faktor: 0.99 }, // Niedersachsen
  '39': { sonnenstunden: 1650, globalstrahlung: 1050, faktor: 1.0 }, // Sachsen-Anhalt
  '40': { sonnenstunden: 1640, globalstrahlung: 1045, faktor: 1.0 }, // Nordrhein-Westfalen
  '41': { sonnenstunden: 1630, globalstrahlung: 1042, faktor: 0.99 }, // Nordrhein-Westfalen
  '42': { sonnenstunden: 1620, globalstrahlung: 1040, faktor: 0.99 }, // Nordrhein-Westfalen
  '44': { sonnenstunden: 1640, globalstrahlung: 1045, faktor: 1.0 }, // Nordrhein-Westfalen
  '45': { sonnenstunden: 1650, globalstrahlung: 1050, faktor: 1.0 }, // Nordrhein-Westfalen
  '46': { sonnenstunden: 1660, globalstrahlung: 1055, faktor: 1.01 }, // Nordrhein-Westfalen
  '47': { sonnenstunden: 1670, globalstrahlung: 1060, faktor: 1.01 }, // Nordrhein-Westfalen
  '48': { sonnenstunden: 1680, globalstrahlung: 1065, faktor: 1.02 }, // Nordrhein-Westfalen
  '49': { sonnenstunden: 1690, globalstrahlung: 1070, faktor: 1.02 }, // Nordrhein-Westfalen
  '50': { sonnenstunden: 1700, globalstrahlung: 1075, faktor: 1.03 }, // Nordrhein-Westfalen
  '51': { sonnenstunden: 1710, globalstrahlung: 1080, faktor: 1.03 }, // Nordrhein-Westfalen
  '52': { sonnenstunden: 1720, globalstrahlung: 1085, faktor: 1.04 }, // Nordrhein-Westfalen
  '53': { sonnenstunden: 1730, globalstrahlung: 1090, faktor: 1.04 }, // Nordrhein-Westfalen
  '54': { sonnenstunden: 1740, globalstrahlung: 1095, faktor: 1.05 }, // Rheinland-Pfalz
  '55': { sonnenstunden: 1750, globalstrahlung: 1100, faktor: 1.05 }, // Rheinland-Pfalz
  '56': { sonnenstunden: 1760, globalstrahlung: 1105, faktor: 1.06 }, // Rheinland-Pfalz
  '57': { sonnenstunden: 1770, globalstrahlung: 1110, faktor: 1.06 }, // Rheinland-Pfalz
  '58': { sonnenstunden: 1780, globalstrahlung: 1115, faktor: 1.07 }, // Nordrhein-Westfalen
  '59': { sonnenstunden: 1740, globalstrahlung: 1095, faktor: 1.05 }, // Nordrhein-Westfalen
  '60': { sonnenstunden: 1720, globalstrahlung: 1085, faktor: 1.04 }, // Hessen
  '61': { sonnenstunden: 1730, globalstrahlung: 1090, faktor: 1.04 }, // Hessen
  '63': { sonnenstunden: 1740, globalstrahlung: 1095, faktor: 1.05 }, // Hessen
  '64': { sonnenstunden: 1750, globalstrahlung: 1100, faktor: 1.05 }, // Hessen
  '65': { sonnenstunden: 1760, globalstrahlung: 1105, faktor: 1.06 }, // Hessen
  '66': { sonnenstunden: 1780, globalstrahlung: 1115, faktor: 1.07 }, // Saarland
  '67': { sonnenstunden: 1790, globalstrahlung: 1120, faktor: 1.07 }, // Rheinland-Pfalz
  '68': { sonnenstunden: 1800, globalstrahlung: 1125, faktor: 1.08 }, // Baden-Württemberg
  '69': { sonnenstunden: 1810, globalstrahlung: 1130, faktor: 1.08 }, // Baden-Württemberg
  '70': { sonnenstunden: 1820, globalstrahlung: 1135, faktor: 1.09 }, // Baden-Württemberg
  '71': { sonnenstunden: 1830, globalstrahlung: 1140, faktor: 1.09 }, // Baden-Württemberg
  '72': { sonnenstunden: 1840, globalstrahlung: 1145, faktor: 1.1 }, // Baden-Württemberg
  '73': { sonnenstunden: 1850, globalstrahlung: 1150, faktor: 1.1 }, // Baden-Württemberg
  '74': { sonnenstunden: 1860, globalstrahlung: 1155, faktor: 1.11 }, // Baden-Württemberg
  '75': { sonnenstunden: 1870, globalstrahlung: 1160, faktor: 1.11 }, // Baden-Württemberg
  '76': { sonnenstunden: 1880, globalstrahlung: 1165, faktor: 1.12 }, // Baden-Württemberg
  '77': { sonnenstunden: 1890, globalstrahlung: 1170, faktor: 1.12 }, // Baden-Württemberg
  '78': { sonnenstunden: 1900, globalstrahlung: 1175, faktor: 1.13 }, // Baden-Württemberg
  '79': { sonnenstunden: 1910, globalstrahlung: 1180, faktor: 1.13 }, // Baden-Württemberg
  '80': { sonnenstunden: 1850, globalstrahlung: 1150, faktor: 1.1 }, // Bayern
  '81': { sonnenstunden: 1860, globalstrahlung: 1155, faktor: 1.11 }, // Bayern
  '82': { sonnenstunden: 1870, globalstrahlung: 1160, faktor: 1.11 }, // Bayern
  '83': { sonnenstunden: 1880, globalstrahlung: 1165, faktor: 1.12 }, // Bayern
  '84': { sonnenstunden: 1890, globalstrahlung: 1170, faktor: 1.12 }, // Bayern
  '85': { sonnenstunden: 1900, globalstrahlung: 1175, faktor: 1.13 }, // Bayern
  '86': { sonnenstunden: 1910, globalstrahlung: 1180, faktor: 1.13 }, // Bayern
  '87': { sonnenstunden: 1920, globalstrahlung: 1185, faktor: 1.14 }, // Bayern
  '88': { sonnenstunden: 1930, globalstrahlung: 1190, faktor: 1.14 }, // Bayern
  '89': { sonnenstunden: 1940, globalstrahlung: 1195, faktor: 1.15 }, // Bayern
  '90': { sonnenstunden: 1950, globalstrahlung: 1200, faktor: 1.15 }, // Bayern
  '91': { sonnenstunden: 1860, globalstrahlung: 1155, faktor: 1.11 }, // Bayern
  '92': { sonnenstunden: 1870, globalstrahlung: 1160, faktor: 1.11 }, // Bayern
  '93': { sonnenstunden: 1880, globalstrahlung: 1165, faktor: 1.12 }, // Bayern
  '94': { sonnenstunden: 1890, globalstrahlung: 1170, faktor: 1.12 }, // Bayern
  '95': { sonnenstunden: 1900, globalstrahlung: 1175, faktor: 1.13 }, // Bayern
  '96': { sonnenstunden: 1910, globalstrahlung: 1180, faktor: 1.13 }, // Bayern
  '97': { sonnenstunden: 1920, globalstrahlung: 1185, faktor: 1.14 }, // Bayern
  '98': { sonnenstunden: 1930, globalstrahlung: 1190, faktor: 1.14 }, // Bayern
  '99': { sonnenstunden: 1940, globalstrahlung: 1195, faktor: 1.15 }, // Bayern
};

// Konstanten für Berechnungen
const CONSTANTS = {
  M2_PER_KWP: 7, // m² Dachfläche pro kWp
  BASE_KWH_PER_KWP: 1000, // Basis kWh pro kWp
  KWH_PRICE: 0.32, // €/kWh Strompreis 2024
  FEED_IN_TARIFF: 0.082, // €/kWh Einspeisevergütung
  STROMPREIS_STEIGERUNG: 0.03, // 3% jährliche Steigerung
  DEGRADATION: 0.005, // 0.5% jährliche Leistungsminderung
  CO2_PER_KWH: 0.434, // kg CO2 pro kWh Strommix
  BAEUME_PRO_TONNE_CO2: 16, // Bäume für 1 Tonne CO2
  
  // Kostenstrukturen 2024
  COSTS_PER_KWP: {
    MODULE_MONO: 450,
    MODULE_POLY: 400,
    MODULE_DUENN: 350,
    WECHSELRICHTER: 180,
    MONTAGE: 150,
    INSTALLATION: 280,
  },
  
  SPEICHER_COST_PER_KWH: 750, // €/kWh Speicherkosten
  WALLBOX_COST: 1500, // € Wallbox mit Installation
  E_AUTO_KWH_PER_100KM: 18, // kWh/100km E-Auto Verbrauch
  
  // Faktoren für verschiedene Konfigurationen
  VERSCHATTUNG_FAKTOREN: {
    keine: 1.0,
    gering: 0.93,
    mittel: 0.85,
    stark: 0.7,
  },
  
  MODUL_WIRKUNGSGRAD: {
    mono: 1.0,
    poly: 0.93,
    duennschicht: 0.85,
  },
  
  EIGENVERBRAUCH_OHNE_SPEICHER: 0.3,
  EIGENVERBRAUCH_MIT_SPEICHER: 0.75,
};

// Dachneigungsoptimierung (Faktor basierend auf Neigung)
const calculateNeigungsFaktor = (neigung: number): number => {
  // Optimal bei 30-35°, 0° und 90° sind ungünstig
  if (neigung >= 25 && neigung <= 40) return 1.0;
  if (neigung >= 15 && neigung <= 50) return 0.95;
  if (neigung >= 5 && neigung <= 60) return 0.85;
  return 0.7;
};

// Monatliche Ertragskurve (Deutschland)
const MONTHLY_FACTORS = [0.4, 0.6, 0.9, 1.2, 1.4, 1.5, 1.5, 1.3, 1.1, 0.8, 0.5, 0.3];

export const getConfiguration = (inputs: SolarInputs): SolarConfiguration => {
  const plzPrefix = inputs.plz.substring(0, 2);
  const regionalData = REGIONAL_DATA[plzPrefix] || REGIONAL_DATA['50']; // Fallback auf NRW
  
  return {
    regionalFaktor: regionalData.faktor,
    verschattungsFaktor: CONSTANTS.VERSCHATTUNG_FAKTOREN[inputs.verschattung],
    neigungsFaktor: calculateNeigungsFaktor(inputs.dachneigung),
    modulWirkungsgrad: CONSTANTS.MODUL_WIRKUNGSGRAD[inputs.modultyp],
    eigenverbrauchOhneSpeicher: CONSTANTS.EIGENVERBRAUCH_OHNE_SPEICHER,
    eigenverbrauchMitSpeicher: inputs.mitSpeicher ? CONSTANTS.EIGENVERBRAUCH_MIT_SPEICHER : CONSTANTS.EIGENVERBRAUCH_OHNE_SPEICHER,
  };
};

export const calculateCosts = (inputs: SolarInputs, anlageGroesse: number): SolarCosts => {
  const modulKostenProKwp = inputs.modultyp === 'mono' ? CONSTANTS.COSTS_PER_KWP.MODULE_MONO :
                           inputs.modultyp === 'poly' ? CONSTANTS.COSTS_PER_KWP.MODULE_POLY :
                           CONSTANTS.COSTS_PER_KWP.MODULE_DUENN;
  
  const modulkosten = anlageGroesse * modulKostenProKwp;
  const wechselrichter = anlageGroesse * CONSTANTS.COSTS_PER_KWP.WECHSELRICHTER;
  const montage = anlageGroesse * CONSTANTS.COSTS_PER_KWP.MONTAGE;
  const installation = anlageGroesse * CONSTANTS.COSTS_PER_KWP.INSTALLATION;
  const speicherkosten = inputs.mitSpeicher ? inputs.speicherkapazitaet * CONSTANTS.SPEICHER_COST_PER_KWH : 0;
  const wallboxkosten = inputs.mitWallbox ? CONSTANTS.WALLBOX_COST : 0;
  
  return {
    modulkosten,
    wechselrichter,
    montage,
    installation,
    speicherkosten,
    wallboxkosten,
    gesamtkosten: modulkosten + wechselrichter + montage + installation + speicherkosten + wallboxkosten,
  };
};

export const calculateSolarResults = (inputs: SolarInputs): SolarResults => {
  const config = getConfiguration(inputs);
  const anlageGroesse = parseFloat((inputs.dachflaeche / CONSTANTS.M2_PER_KWP).toFixed(2));
  
  // Jahresertrag berechnen
  const jahresertrag = Math.round(
    anlageGroesse * 
    CONSTANTS.BASE_KWH_PER_KWP * 
    config.regionalFaktor * 
    config.verschattungsFaktor * 
    config.neigungsFaktor * 
    config.modulWirkungsgrad
  );
  
  // E-Auto Bedarf
  const eAutoJahresverbrauch = inputs.mitEAuto ? (inputs.eAutoFahrleistung * CONSTANTS.E_AUTO_KWH_PER_100KM) / 100 : 0;
  const gesamtStromverbrauch = inputs.stromverbrauch + eAutoJahresverbrauch;
  
  // Eigenverbrauch ohne Speicher
  const maxEigenverbrauchOhne = Math.min(
    jahresertrag * config.eigenverbrauchOhneSpeicher,
    gesamtStromverbrauch
  );
  
  // Eigenverbrauch mit Speicher
  const maxEigenverbrauchMit = inputs.mitSpeicher ? 
    Math.min(jahresertrag * config.eigenverbrauchMitSpeicher, gesamtStromverbrauch) : 
    maxEigenverbrauchOhne;
  
  // Speicher optimierung
  const optimaleEigenverbrauch = inputs.mitSpeicher ? maxEigenverbrauchMit : maxEigenverbrauchOhne;
  const speichernutzung = inputs.mitSpeicher ? (maxEigenverbrauchMit - maxEigenverbrauchOhne) : 0;
  
  // E-Auto Anteil am Eigenverbrauch
  const eAutoLadung = inputs.mitEAuto ? 
    Math.min(eAutoJahresverbrauch, optimaleEigenverbrauch * 0.6) : 0; // 60% des Eigenverbrauchs kann E-Auto sein
  
  const netzeinspeisung = jahresertrag - optimaleEigenverbrauch;
  
  // Ersparnisse berechnen
  const ersparnisSolarstrom = optimaleEigenverbrauch * CONSTANTS.KWH_PRICE;
  const einspeiseverguetung = netzeinspeisung * CONSTANTS.FEED_IN_TARIFF;
  const speicherersparnis = speichernutzung * CONSTANTS.KWH_PRICE;
  const eAutoErsparnis = eAutoLadung * CONSTANTS.KWH_PRICE;
  const gesamtersparnis = ersparnisSolarstrom + einspeiseverguetung;
  
  // Umwelt
  const co2Vermeidung = (jahresertrag * CONSTANTS.CO2_PER_KWH) / 1000; // in Tonnen
  const baumAequivalent = Math.round(co2Vermeidung * CONSTANTS.BAEUME_PRO_TONNE_CO2);
  
  // Kosten
  const kosten = calculateCosts(inputs, anlageGroesse);
  
  // Amortisation
  const amortisationOhneSpeicher = kosten.gesamtkosten / gesamtersparnis;
  const amortisationMitSpeicher = inputs.mitSpeicher ? 
    (kosten.gesamtkosten / gesamtersparnis) : amortisationOhneSpeicher;
  
  // 20-Jahres-Prognose
  const jahresprognose = [];
  let kumulativeErsparnis = 0;
  
  for (let jahr = 1; jahr <= 20; jahr++) {
    const degradationsFaktor = Math.pow(1 - CONSTANTS.DEGRADATION, jahr - 1);
    const strompreisFaktor = Math.pow(1 + CONSTANTS.STROMPREIS_STEIGERUNG, jahr - 1);
    
    const jahresErtragAngepasst = jahresertrag * degradationsFaktor;
    const eigenverbrauchAngepasst = Math.min(
      jahresErtragAngepasst * config.eigenverbrauchMitSpeicher,
      gesamtStromverbrauch
    );
    const einspeisungAngepasst = jahresErtragAngepasst - eigenverbrauchAngepasst;
    
    const ersparnis = (eigenverbrauchAngepasst * CONSTANTS.KWH_PRICE * strompreisFaktor) +
                     (einspeisungAngepasst * CONSTANTS.FEED_IN_TARIFF);
    
    kumulativeErsparnis += ersparnis;
    
    jahresprognose.push({
      jahr,
      ertrag: Math.round(jahresErtragAngepasst),
      ersparnis: Math.round(ersparnis),
      kumulativeErsparnis: Math.round(kumulativeErsparnis),
    });
  }
  
  const zwanzigJahresBilanz = kumulativeErsparnis - kosten.gesamtkosten;
  
  // Monatliche Erträge
  const monatlicheErtraege = MONTHLY_FACTORS.map(faktor => 
    Math.round((jahresertrag * faktor) / 12)
  );
  
  return {
    anlageGroesse,
    jahresertrag,
    eigenverbrauchOhneSpeicher: Math.round(maxEigenverbrauchOhne),
    eigenverbrauchMitSpeicher: Math.round(maxEigenverbrauchMit),
    netzeinspeisung: Math.round(netzeinspeisung),
    speichernutzung: Math.round(speichernutzung),
    eAutoLadung: Math.round(eAutoLadung),
    ersparnisSolarstrom: Math.round(ersparnisSolarstrom),
    einspeiseverguetung: Math.round(einspeiseverguetung),
    speicherersparnis: Math.round(speicherersparnis),
    eAutoErsparnis: Math.round(eAutoErsparnis),
    gesamtersparnis: Math.round(gesamtersparnis),
    co2Vermeidung: parseFloat(co2Vermeidung.toFixed(1)),
    baumAequivalent,
    amortisationOhneSpeicher: parseFloat(amortisationOhneSpeicher.toFixed(1)),
    amortisationMitSpeicher: parseFloat(amortisationMitSpeicher.toFixed(1)),
    zwanzigJahresBilanz: Math.round(zwanzigJahresBilanz),
    kosten,
    monatlicheErtraege,
    jahresprognose,
  };
};