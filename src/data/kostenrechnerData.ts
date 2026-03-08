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
