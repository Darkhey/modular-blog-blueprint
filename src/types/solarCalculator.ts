export interface SolarInputs {
  dachflaeche: number;
  stromverbrauch: number;
  ausrichtung: 'sued' | 'ost-west' | 'nord';
  dachneigung: number;
  verschattung: 'keine' | 'gering' | 'mittel' | 'stark';
  modultyp: 'mono' | 'poly' | 'duennschicht';
  plz: string;
  mitSpeicher: boolean;
  speicherkapazitaet: number;
  mitEAuto: boolean;
  eAutoFahrleistung: number;
  mitWallbox: boolean;
  tagverbrauchAnteil: number; // 0-100% Anteil des Verbrauchs am Tag
}

export interface SolarConfiguration {
  regionalFaktor: number;
  verschattungsFaktor: number;
  neigungsFaktor: number;
  modulWirkungsgrad: number;
  eigenverbrauchOhneSpeicher: number;
  eigenverbrauchMitSpeicher: number;
}

export interface SolarCosts {
  modulkosten: number;
  wechselrichter: number;
  montage: number;
  installation: number;
  speicherkosten: number;
  wallboxkosten: number;
  gesamtkosten: number;
}

export interface SolarResults {
  anlageGroesse: number;
  jahresertrag: number;
  eigenverbrauchOhneSpeicher: number;
  eigenverbrauchMitSpeicher: number;
  netzeinspeisung: number;
  speichernutzung: number;
  eAutoLadung: number;
  ersparnisSolarstrom: number;
  einspeiseverguetung: number;
  speicherersparnis: number;
  eAutoErsparnis: number;
  gesamtersparnis: number;
  co2Vermeidung: number;
  baumAequivalent: number;
  amortisationOhneSpeicher: number;
  amortisationMitSpeicher: number;
  zwanzigJahresBilanz: number;
  kosten: SolarCosts;
  monatlicheErtraege: number[];
  jahresprognose: Array<{
    jahr: number;
    ertrag: number;
    ersparnis: number;
    kumulativeErsparnis: number;
  }>;
}

export interface RegionalData {
  [key: string]: {
    sonnenstunden: number;
    globalstrahlung: number;
    faktor: number;
  };
}