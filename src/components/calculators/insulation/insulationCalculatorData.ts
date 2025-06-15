
import * as z from 'zod';

export type BuildingPart = 'facade' | 'roof' | 'top-floor' | 'cellar-ceiling';

export const buildingParts: Record<BuildingPart, { name: string }> = {
  facade: { name: 'Fassade / Außenwand' },
  roof: { name: 'Dach' },
  'top-floor': { name: 'Oberste Geschossdecke' },
  'cellar-ceiling': { name: 'Kellerdecke' },
};

export const formSchema = z.object({
  buildingPart: z.string({ required_error: "Bitte wählen Sie ein Bauteil aus." }),
  area: z.number().min(10, "Fläche muss mindestens 10 m² sein.").max(500, "Fläche darf maximal 500 m² sein."),
  uValueBefore: z.number().min(0.5, "U-Wert muss mind. 0,5 W/(m²K) sein.").max(3.0, "U-Wert ist unrealistisch hoch."),
  insulationSystem: z.string({ required_error: "Bitte wählen Sie ein Dämmsystem." }).min(1, "Bitte wählen Sie ein Dämmsystem."),
  heatingCost: z.number().min(0.05, "Heizkosten müssen mind. 0,05 €/kWh sein.").max(0.5, "Heizkosten dürfen max. 0,50 €/kWh sein."),
});

export type FormValues = z.infer<typeof formSchema>;

export interface CalculationResult {
  investment: number;
  savingsPerYear: number;
  amortization: number;
  co2Savings: number;
}

export const insulationSystems: Record<string, { 
  name: string; 
  cost: number; 
  uValue: number; 
  part: BuildingPart;
  manufacturer?: string;
  manufacturerUrl?: string;
  productExample?: string;
}> = {
  // Fassade
  'wdvs_eps_160': { 
    name: 'WDVS mit EPS (16cm)', 
    cost: 150, 
    uValue: 0.19, 
    part: 'facade',
    manufacturer: 'Sto',
    manufacturerUrl: 'https://www.sto.de/',
    productExample: 'StoTherm Classic®'
  },
  'wdvs_mineralwolle_160': { 
    name: 'WDVS Mineralwolle (16cm)', 
    cost: 165, 
    uValue: 0.21, 
    part: 'facade',
    manufacturer: 'Rockwool',
    manufacturerUrl: 'https://www.rockwool.com/de/',
    productExample: 'Frontrock'
  },
  'kerndaemmung_eps_100': { name: 'Kerndämmung EPS (10cm, für zweischaliges Mauerwerk)', cost: 50, uValue: 0.35, part: 'facade' },
  
  // Dach
  'dach_aufsparren_pur_140': { 
    name: 'Aufsparrendämmung PUR (14cm)', 
    cost: 210, 
    uValue: 0.16, 
    part: 'roof',
    manufacturer: 'Isover',
    manufacturerUrl: 'https://www.isover.de/',
    productExample: 'Integra AP'
  },
  'holzfaser_180': { 
    name: 'Holzfaser-Dämmplatte (18cm, z.B. für Dach)', 
    cost: 180, 
    uValue: 0.22, 
    part: 'roof',
    manufacturer: 'Steico',
    manufacturerUrl: 'https://www.steico.com/de/',
    productExample: 'steicoflex'
  },

  // Oberste Geschossdecke
  'einblas_zellulose_200': { 
    name: 'Einblasdämmung Zellulose (20cm)', 
    cost: 60, 
    uValue: 0.20, 
    part: 'top-floor',
    manufacturer: 'Isofloc',
    manufacturerUrl: 'https://www.isofloc.de/',
    productExample: 'isofloc L'
  },
  
  // Kellerdecke
  'kellerdecke_eps_100': { 
    name: 'Kellerdeckendämmung EPS (10cm)', 
    cost: 45, 
    uValue: 0.30, 
    part: 'cellar-ceiling',
    manufacturer: 'Sto',
    manufacturerUrl: 'https://www.sto.de/',
    productExample: 'Sto-Kellerdecken-Dämmplatte'
  },
};
