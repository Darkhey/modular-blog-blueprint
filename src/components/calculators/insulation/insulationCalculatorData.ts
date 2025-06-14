
import * as z from 'zod';

export const formSchema = z.object({
  area: z.number().min(10, "Fläche muss mindestens 10 m² sein.").max(500, "Fläche darf maximal 500 m² sein."),
  uValueBefore: z.number().min(0.5, "U-Wert muss mind. 0,5 W/(m²K) sein.").max(3.0, "U-Wert ist unrealistisch hoch."),
  insulationSystem: z.string({ required_error: "Bitte wählen Sie ein Dämmsystem." }),
  heatingCost: z.number().min(0.05, "Heizkosten müssen mind. 0,05 €/kWh sein.").max(0.5, "Heizkosten dürfen max. 0,50 €/kWh sein."),
});

export type FormValues = z.infer<typeof formSchema>;

export interface CalculationResult {
  investment: number;
  savingsPerYear: number;
  amortization: number;
  co2Savings: number;
}

export const insulationSystems: Record<string, { name: string; cost: number; uValue: number }> = {
  // Fassade
  'wdvs_eps_160': { name: 'WDVS mit EPS (16cm, Fassade)', cost: 150, uValue: 0.19 },
  'wdvs_mineralwolle_160': { name: 'WDVS Mineralwolle (16cm, Fassade)', cost: 165, uValue: 0.21 },
  'holzfaser_180': { name: 'Holzfaser-Dämmplatte (18cm, Fassade)', cost: 180, uValue: 0.22 },
  
  // Hohlräume
  'einblas_zellulose_200': { name: 'Einblasdämmung Zellulose (20cm, Dach)', cost: 60, uValue: 0.20 },
  'kerndaemmung_eps_100': { name: 'Kerndämmung EPS (10cm, Mauerwerk)', cost: 50, uValue: 0.35 },
  
  // Dach / Decke
  'dach_aufsparren_pur_140': { name: 'Aufsparrendämmung PUR (14cm, Dach)', cost: 210, uValue: 0.16 },
  'kellerdecke_eps_100': { name: 'Kellerdeckendämmung EPS (10cm)', cost: 45, uValue: 0.30 },
};
