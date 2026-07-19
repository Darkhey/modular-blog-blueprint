/**
 * Zentrale Preise, F\u00f6rders\u00e4tze und Faktoren f\u00fcr Sanierungs-Rechner (Stand 2026/2027).
 *
 * Quellen (Prognose-Stand):
 * - BAFA/KfW BEG-Richtlinien 2026 (BEG-EM, KfW 458, KfW 261)
 * - BMWK CO\u2082-Preispfad BEHG 2025\u20132026 + ETS-2 Prognose ab 2027
 * - BDEW Strompreisanalyse 2026, verivox Gas-/\u00d6lpreise 2026
 * - Fraunhofer ISE: PV-Systempreise 2026
 * - GEG 2026 Anforderungswerte
 *
 * WICHTIG: Diese Datei ist die Single Source of Truth f\u00fcr alle Rechner.
 * \u00c4nderungen hier propagieren automatisch in Heizung, Solar, ROI, F\u00f6rder & Kosten.
 */

// -----------------------------------------------------------
// Energiepreise 2026 (\u20ac/kWh, Brutto Endkundenpreis)
// -----------------------------------------------------------
export interface PriceScenario {
  label: string;
  strom: number;      // Haushaltsstrom
  gas: number;
  oel: number;
  pellets: number;
  fernwaerme: number;
  wpStrom: number;    // Sondertarif W\u00e4rmepumpenstrom
  /** j\u00e4hrliche Preissteigerung (Dezimal) */
  jaehrlicheSteigerung: number;
}

export const PRICE_SCENARIOS = {
  optimistisch: {
    label: 'Optimistisch',
    strom: 0.28,
    gas: 0.09,
    oel: 0.095,
    pellets: 0.075,
    fernwaerme: 0.11,
    wpStrom: 0.24,
    jaehrlicheSteigerung: 0.02,
  },
  realistisch: {
    label: 'Realistisch',
    strom: 0.34,
    gas: 0.115,
    oel: 0.12,
    pellets: 0.085,
    fernwaerme: 0.14,
    wpStrom: 0.28,
    jaehrlicheSteigerung: 0.035,
  },
  vorsichtig: {
    label: 'Vorsichtig',
    strom: 0.42,
    gas: 0.15,
    oel: 0.155,
    pellets: 0.10,
    fernwaerme: 0.18,
    wpStrom: 0.32,
    jaehrlicheSteigerung: 0.05,
  },
} as const satisfies Record<string, PriceScenario>;

export type PriceScenarioKey = keyof typeof PRICE_SCENARIOS;

export const DEFAULT_SCENARIO: PriceScenarioKey = 'realistisch';

// -----------------------------------------------------------
// CO\u2082-Preis-Pfad (\u20ac/t CO\u2082)
// BEHG bis 2026, ETS-2 ab 2027 (Prognose-Bandbreite)
// -----------------------------------------------------------
export const CO2_PRICE_PATH: Record<number, { min: number; expected: number; max: number }> = {
  2025: { min: 45, expected: 55, max: 55 },
  2026: { min: 55, expected: 65, max: 65 },
  2027: { min: 55, expected: 75, max: 120 },   // ETS-2 Marktstart
  2028: { min: 60, expected: 90, max: 140 },
  2029: { min: 65, expected: 105, max: 160 },
  2030: { min: 70, expected: 120, max: 180 },
};

/** Interpoliert linear zwischen St\u00fctzstellen; extrapoliert flach. */
export const getCO2Price = (year: number, mode: 'min' | 'expected' | 'max' = 'expected'): number => {
  const years = Object.keys(CO2_PRICE_PATH).map(Number).sort((a, b) => a - b);
  if (year <= years[0]) return CO2_PRICE_PATH[years[0]][mode];
  if (year >= years[years.length - 1]) return CO2_PRICE_PATH[years[years.length - 1]][mode];
  const lower = years.filter((y) => y <= year).pop()!;
  const upper = years.filter((y) => y >= year).shift()!;
  if (lower === upper) return CO2_PRICE_PATH[lower][mode];
  const t = (year - lower) / (upper - lower);
  return CO2_PRICE_PATH[lower][mode] + t * (CO2_PRICE_PATH[upper][mode] - CO2_PRICE_PATH[lower][mode]);
};

// CO\u2082-Emissionsfaktoren (kg CO\u2082 / kWh Endenergie)
export const CO2_FACTORS = {
  gas: 0.201,
  oel: 0.266,
  pellets: 0.024,
  fernwaerme: 0.180,
  strom_mix_2026: 0.363,   // sinkend durch EE-Ausbau
  strom_gruen: 0.0,
  wp_effektiv: 0.104,      // Strommix / JAZ 3.5
} as const;

/** Zus\u00e4tzliche CO\u2082-Kosten pro kWh (\u20ac/kWh) f\u00fcr ein Brennstoff im Jahr. */
export const co2SurchargePerKwh = (
  fuel: 'gas' | 'oel' | 'pellets' | 'fernwaerme',
  year: number,
  mode: 'min' | 'expected' | 'max' = 'expected'
): number => {
  const pricePerTon = getCO2Price(year, mode);
  return (CO2_FACTORS[fuel] * pricePerTon) / 1000;
};

// -----------------------------------------------------------
// BEG-F\u00f6rderung 2026 (BAFA / KfW-458)
// -----------------------------------------------------------
export const BEG_2026 = {
  /** Grundzuschuss Heizung (KfW-458) */
  heizungGrund: 30,
  /** Klimageschwindigkeits-Bonus (bis 31.12.2028 f\u00fcr Selbstnutzer) */
  klimaBonus: 20,
  /** Effizienzbonus f\u00fcr besonders effiziente W\u00e4rmequellen (Sole/Wasser, nat. K\u00e4ltemittel) */
  effizienzBonus: 5,
  /** Einkommensbonus (zu versteuerndes Haushaltseinkommen \u2264 40.000 \u20ac) */
  einkommensBonus: 30,
  einkommensGrenze: 40000,
  /** Deckel Heizungsf\u00f6rderung gesamt */
  heizungMaxProzent: 70,
  /** F\u00f6rderf\u00e4hige Kosten Heizung (\u20ac / 1. WE) */
  heizungMaxKosten: 30000,
  /** Zus\u00e4tzliche WE Staffel */
  heizungMaxKostenZusaetzlicheWE: 15000,

  /** BAFA-Einzelma\u00dfnahme H\u00fclle (D\u00e4mmung, Fenster, L\u00fcftung) */
  huelleGrund: 15,
  /** iSFP-Bonus (nur H\u00fclle) */
  isfpBonus: 5,
  huelleMaxProzent: 20,
  /** F\u00f6rderf\u00e4higer Deckel H\u00fcllenma\u00dfnahmen mit iSFP */
  huelleMaxKostenMitIsfp: 60000,
  huelleMaxKostenOhneIsfp: 30000,

  /** Emissionsminderungs-Zuschlag Biomasse (Feinstaub < 2,5 mg/m\u00b3) */
  biomasseEmZuschlag: 2500,
} as const;

// -----------------------------------------------------------
// GEG 2026 Anforderungswerte (U-Werte, W/m\u00b2K)
// -----------------------------------------------------------
export const GEG_2026_U_WERTE = {
  aussenwand: 0.24,
  dach: 0.20,
  oberste_geschossdecke: 0.24,
  kellerdecke: 0.30,
  fenster: 1.3,
  haustuer: 1.8,
} as const;

// -----------------------------------------------------------
// PV / Solar 2026
// -----------------------------------------------------------
export const SOLAR_2026 = {
  /** Systempreis \u20ac/kWp (schl\u00fcsselfertig, netto = brutto durch 0 % MwSt.) */
  systempreisProKwp: {
    klein: 1650,   // < 10 kWp
    mittel: 1350,  // 10\u201320 kWp
    gross: 1100,   // > 20 kWp
  },
  speicherPreisProKwh: 550,  // gefallen von 750 (2024)
  wallboxPreis: 1400,
  /** Einspeiseverg\u00fctung nach EEG 2026 (Teileinspeisung, ct/kWh) */
  einspeiseverguetungCtKwh: {
    bis10kwp: 7.86,
    bis40kwp: 6.80,
    bis100kwp: 5.56,
  },
  /** \u00a7 14a EnWG: reduziertes Netzentgelt f\u00fcr steuerbare Verbrauchseinrichtungen (WP, Wallbox) */
  paragraph14aRabatt: 190, // \u20ac/a pauschal
  /** Degradation Modulleistung */
  degradationJahr: 0.005,
} as const;

// -----------------------------------------------------------
// Handwerkerpreise 2026 (Kostenrechner-Aktualisierung, ~4 % vs. 2025)
// -----------------------------------------------------------
export const HANDWERKERPREISE_2026 = {
  fassadendaemmung:    { min: 130, max: 260 },    // \u20ac/m\u00b2
  dachdaemmung:        { min: 85, max: 210 },     // \u20ac/m\u00b2
  fenster:             { min: 650, max: 1300 },   // \u20ac/St\u00fcck
  heizungPauschal:     { min: 90, max: 210 },     // \u20ac/m\u00b2 Wohnfl\u00e4che
  kellerdecke:         { min: 32, max: 85 },      // \u20ac/m\u00b2
  waermepumpe:         { min: 22000, max: 42000 },
  pelletheizung:       { min: 24000, max: 36000 },
} as const;

/** Kombi-Rabatt bei ausgef\u00fchrter Ma\u00dfnahmenanzahl (Skaleneffekt Ger\u00fcst, Planung). */
export const kombiRabatt = (anzahlGewerke: number): number => {
  if (anzahlGewerke <= 1) return 0;
  if (anzahlGewerke === 2) return 0.03;
  if (anzahlGewerke === 3) return 0.06;
  return 0.08; // ab 4 Gewerken
};

// -----------------------------------------------------------
// Regionale F\u00f6rder-Top-ups (\u20ac/Ma\u00dfnahme, grob)
// -----------------------------------------------------------
export const REGIONALE_TOPUPS_2026: Record<string, number> = {
  'Baden-W\u00fcrttemberg': 5,
  Bayern: 5,
  Berlin: 6,
  Brandenburg: 3,
  Bremen: 5,
  Hamburg: 6,
  Hessen: 4,
  'Mecklenburg-Vorpommern': 2,
  Niedersachsen: 3,
  'Nordrhein-Westfalen': 4,
  'Rheinland-Pfalz': 3,
  Saarland: 3,
  Sachsen: 3,
  'Sachsen-Anhalt': 2,
  'Schleswig-Holstein': 3,
  Th\u00fcringen: 2,
};
