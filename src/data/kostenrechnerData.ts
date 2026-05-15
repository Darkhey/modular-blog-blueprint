export interface Gewerk {
  id: string;
  label: string;
  icon: string;
  unit: string;
  unitLabel: string;
  costPerUnit: { min: number; max: number };
  foerderungPercent: number;
  foerderungMax: number;
  description: string;
  detailLink: string;
  defaultValue: number;
  minValue: number;
  maxValue: number;
  step: number;
  tooltip?: string;
  mengeHelp?: string;
}

export const gewerke: Gewerk[] = [
  {
    id: 'fassadendaemmung',
    label: 'Fassadendämmung',
    icon: 'Home',
    unit: 'm²',
    unitLabel: 'Fassadenfläche',
    costPerUnit: { min: 120, max: 250 },
    foerderungPercent: 20,
    foerderungMax: 60000,
    description: 'WDVS oder vorgehängte Fassade inkl. Material & Montage',
    detailLink: '/daemmungsrechner',
    defaultValue: 120,
    minValue: 20,
    maxValue: 400,
    step: 10,
    tooltip: 'WDVS 120–180 €/m², vorgehängte hinterlüftete Fassade 200–250 €/m². BAFA-Förderung Einzelmaßnahme 15 % + 5 % iSFP-Bonus, Deckel 60.000 €/Wohneinheit.',
    mengeHelp: 'Außenwandfläche minus Fenster/Türen. Faustregel: Wohnfläche × 1,2.',
  },
  {
    id: 'dachdaemmung',
    label: 'Dachdämmung',
    icon: 'TriangleAlert',
    unit: 'm²',
    unitLabel: 'Dachfläche',
    costPerUnit: { min: 80, max: 200 },
    foerderungPercent: 20,
    foerderungMax: 60000,
    description: 'Zwischen-, Auf- oder Untersparrendämmung',
    detailLink: '/daemmungsrechner',
    defaultValue: 100,
    minValue: 20,
    maxValue: 300,
    step: 10,
    tooltip: 'Aufsparrendämmung 150–200 €/m², Zwischen-/Untersparren günstiger (80–130 €/m²). BAFA-Förderung 15 % + 5 % iSFP, Deckel 60.000 €/WE.',
    mengeHelp: 'Geneigte Dachfläche (nicht Grundfläche). Bei Steildach ≈ Grundfläche × 1,3.',
  },
  {
    id: 'fenster',
    label: 'Fenster & Türen',
    icon: 'DoorOpen',
    unit: 'Stück',
    unitLabel: 'Anzahl Fenster/Türen',
    costPerUnit: { min: 600, max: 1200 },
    foerderungPercent: 20,
    foerderungMax: 60000,
    description: '2- oder 3-fach Verglasung inkl. Einbau',
    detailLink: '/fenster-tueren',
    defaultValue: 10,
    minValue: 1,
    maxValue: 40,
    step: 1,
  },
  {
    id: 'heizung',
    label: 'Heizung',
    icon: 'Flame',
    unit: 'pauschal',
    unitLabel: 'Wohnfläche (m²)',
    costPerUnit: { min: 80, max: 200 },
    foerderungPercent: 30,
    foerderungMax: 70000,
    description: 'Wärmepumpe, Pelletheizung oder Hybridheizung',
    detailLink: '/heizkostenrechner',
    defaultValue: 120,
    minValue: 50,
    maxValue: 400,
    step: 10,
  },
  {
    id: 'solar',
    label: 'Solaranlage',
    icon: 'Sun',
    unit: 'kWp',
    unitLabel: 'Anlagenleistung (kWp)',
    costPerUnit: { min: 1200, max: 1800 },
    foerderungPercent: 0,
    foerderungMax: 0,
    description: 'PV-Anlage inkl. Montage (Einspeisevergütung statt Zuschuss)',
    detailLink: '/solarenergie',
    defaultValue: 10,
    minValue: 3,
    maxValue: 30,
    step: 1,
  },
  {
    id: 'kellerdecke',
    label: 'Kellerdeckendämmung',
    icon: 'Layers',
    unit: 'm²',
    unitLabel: 'Kellerfläche',
    costPerUnit: { min: 30, max: 80 },
    foerderungPercent: 20,
    foerderungMax: 60000,
    description: 'Dämmplatten oder Einblasdämmung an der Kellerdecke',
    detailLink: '/daemmungsrechner',
    defaultValue: 80,
    minValue: 20,
    maxValue: 200,
    step: 10,
  },
];
