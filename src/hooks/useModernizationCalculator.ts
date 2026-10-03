import { useState } from 'react';
import { z } from 'zod';
import {
  PRICE_SCENARIOS,
  PriceScenarioKey,
  DEFAULT_SCENARIO,
  co2SurchargePerKwh,
  CO2_FACTORS,
} from '@/data/energyPrices2026';


export type HeatingType = 'gas' | 'oil' | 'waermepumpe' | 'pellets' | 'nachtspeicher' | 'fernwaerme';
export type BuildingYear = 'vor-1979' | '1979-1994' | '1995-2001' | '2002-2015' | 'nach-2016';
export type BuildingType = 'einfamilienhaus' | 'doppelhaushaelfte' | 'reihenmittelhaus' | 'mehrfamilienhaus';
export type InsulationQuality = 'schlecht' | 'mittel' | 'gut' | 'kfw55';

export interface CalculatorInputs {
  houseSize: string;
  personCount: string;
  buildingType: BuildingType;
  buildingYear: BuildingYear;
  currentHeating: HeatingType;
  futureInsulation: InsulationQuality;
  futureHeating: HeatingType;
}

export type SmartHomeSystem =
  | 'thermostat'
  | 'heizungssteuerung'
  | 'sensoren'
  | 'energiemanagement'
  | 'wetterstation'
  | 'sprachsteuerung';

export interface CustomPrices {
  gas: string;
  oil: string;
  waermepumpe: string;
  pellets: string;
  nachtspeicher: string;
  fernwaerme: string;
}

export interface CalculationResults {
  inputs: CalculatorInputs;
  current: { total: number; heating: number; hotWater: number; co2: number; };
  future: { total: number; heating: number; hotWater: number; co2: number; };
  annualSavings: number;
  savingsPercentage: number;
  co2Savings: number;
  amortizationPeriod?: number;
  smartHomeInvestment: number;
}

const SMART_HOME_SAVINGS: Record<SmartHomeSystem, number> = {
  thermostat: 0.15,
  heizungssteuerung: 0.2,
  sensoren: 0.1,
  energiemanagement: 0.3,
  wetterstation: 0.12,
  sprachsteuerung: 0,
};

const SMART_HOME_COSTS: Record<SmartHomeSystem, number> = {
  thermostat: 275,
  heizungssteuerung: 1000,
  sensoren: 100,
  energiemanagement: 1650,
  wetterstation: 400,
  sprachsteuerung: 125,
};

const numericText = (min: number, max: number) => z.string().refine((value) => {
  if (!/^\d+(?:[.,]\d+)?$/.test(value.trim())) return false;
  const n = Number(value.replace(',', '.'));
  return Number.isFinite(n) && n >= min && n <= max;
});
const inputSchema = z.object({
  houseSize: numericText(20, 500), personCount: numericText(1, 10),
  buildingType: z.enum(['einfamilienhaus', 'doppelhaushaelfte', 'reihenmittelhaus', 'mehrfamilienhaus']),
  buildingYear: z.enum(['vor-1979', '1979-1994', '1995-2001', '2002-2015', 'nach-2016']),
  currentHeating: z.enum(['gas', 'oil', 'waermepumpe', 'pellets', 'nachtspeicher', 'fernwaerme']),
  futureHeating: z.enum(['gas', 'oil', 'waermepumpe', 'pellets', 'nachtspeicher', 'fernwaerme']),
  futureInsulation: z.enum(['schlecht', 'mittel', 'gut', 'kfw55']),
});

export const useModernizationCalculator = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    houseSize: '150',
    personCount: '4',
    buildingType: 'einfamilienhaus',
    buildingYear: '1979-1994',
    currentHeating: 'gas',
    futureInsulation: 'gut',
    futureHeating: 'waermepumpe',
  });

  const [calculationMode, setCalculationMode] = useState<'details' | 'consumption'>('details');
  const [currentConsumption, setCurrentConsumption] = useState('20000');
  const [investmentCosts, setInvestmentCosts] = useState('15000');

  const [priceScenario, setPriceScenario] = useState<PriceScenarioKey>(DEFAULT_SCENARIO);
  const [co2Path, setCo2Path] = useState(true);

  const scenarioToCustomPrices = (s: PriceScenarioKey): CustomPrices => {
    const p = PRICE_SCENARIOS[s];
    return {
      gas: p.gas.toFixed(3),
      oil: p.oel.toFixed(3),
      waermepumpe: p.wpStrom.toFixed(3),
      pellets: p.pellets.toFixed(3),
      nachtspeicher: p.strom.toFixed(3),
      fernwaerme: p.fernwaerme.toFixed(3),
    };
  };

  const [customPrices, setCustomPrices] = useState<CustomPrices>(() =>
    scenarioToCustomPrices(DEFAULT_SCENARIO),
  );

  const [selectedSmartSystems, setSelectedSmartSystems] = useState<SmartHomeSystem[]>([]);


  const [results, setResults] = useState<CalculationResults | null>(null);

  const estimateSmartInvestment = () => {
    const size = parseFloat(inputs.houseSize);
    const rooms = Math.max(1, Math.floor(size / 20));   // Estimate ~20m² per room
    const sensors = Math.max(1, Math.floor(size / 30)); // Estimate 1 sensor per 30m²
    return selectedSmartSystems.reduce((sum, system) => {
      const cost = SMART_HOME_COSTS[system];
      if (system === 'thermostat') {
        return sum + cost * rooms;
      }
      if (system === 'sensoren') {
        return sum + cost * sensors;
      }
      return sum + cost;
    }, 0);
  };

  const calculateSavings = () => {
    const size = parseFloat(inputs.houseSize);
    const persons = parseInt(inputs.personCount);
    const investment = parseFloat(investmentCosts);
    const consumption = parseFloat(currentConsumption);

    if (!inputSchema.safeParse(inputs).success || !numericText(0, 1000000).safeParse(investmentCosts).success ||
      (calculationMode === 'consumption' && !numericText(1, 200000).safeParse(currentConsumption).success)) {
      setResults(null);
      return 'Bitte prüfen Sie Wohnfläche, Personenanzahl, Verbrauch und Investitionskosten.';
    }

    const ENERGY_PRICES = { 
        gas: parseFloat(customPrices.gas), 
        oil: parseFloat(customPrices.oil), 
        waermepumpe: parseFloat(customPrices.waermepumpe), 
        pellets: parseFloat(customPrices.pellets), 
        nachtspeicher: parseFloat(customPrices.nachtspeicher),
        fernwaerme: parseFloat(customPrices.fernwaerme)
    };
    // Emissionsfaktoren in kg/kWh (Stand 2026, Strommix sinkend)
    const emissionFactors = {
      gas: CO2_FACTORS.gas,
      oil: CO2_FACTORS.oel,
      waermepumpe: CO2_FACTORS.strom_mix_2026,
      pellets: CO2_FACTORS.pellets,
      nachtspeicher: CO2_FACTORS.strom_mix_2026,
      fernwaerme: CO2_FACTORS.fernwaerme
    };
    const SPECIFIC_CONSUMPTION_BY_YEAR = {
        'vor-1979': 220,
        '1979-1994': 160,
        '1995-2001': 110,
        '2002-2015': 80,
        'nach-2016': 50,
    };
    const BUILDING_TYPE_FACTOR = {
        einfamilienhaus: 1.0,
        doppelhaushaelfte: 0.85,
        reihenmittelhaus: 0.7,
        mehrfamilienhaus: 0.9,
    };
    const SPECIFIC_CONSUMPTION_FUTURE = { schlecht: 200, mittel: 140, gut: 60, kfw55: 40 };
    const HOT_WATER_PER_PERSON_KWH = 1000;
    const HEATPUMP_SCOP = 3.5;

    const hotWaterKwh = persons * HOT_WATER_PER_PERSON_KWH;
    if (Object.values(customPrices).some((price) => !numericText(0.001, 2).safeParse(price).success)) {
      setResults(null);
      return 'Bitte geben Sie gültige Energiepreise zwischen 0 und 2 €/kWh ein.';
    }

    const currentYear = new Date().getFullYear();
    const HEATING_TO_FUEL: Record<HeatingType, 'gas' | 'oel' | 'pellets' | 'fernwaerme' | null> = {
      gas: 'gas',
      oil: 'oel',
      pellets: 'pellets',
      fernwaerme: 'fernwaerme',
      waermepumpe: null,
      nachtspeicher: null,
    };
    const co2Extra = (heatingType: HeatingType, kwh: number): number => {
      if (!co2Path) return 0;
      const fuel = HEATING_TO_FUEL[heatingType];
      if (!fuel) return 0;
      return kwh * co2SurchargePerKwh(fuel, currentYear);
    };

    const calculateCosts = (heatingKwh: number, hotWaterKwh: number, heatingType: HeatingType) => {
        const pricePerKwh = ENERGY_PRICES[heatingType];
        let finalHeatingKwh = heatingKwh;
        let finalHotWaterKwh = hotWaterKwh;
        const emissionFactor = emissionFactors[heatingType];

        if (heatingType === 'waermepumpe') {
          finalHeatingKwh /= HEATPUMP_SCOP;
          finalHotWaterKwh /= HEATPUMP_SCOP;
        }

        const kwhSum = finalHeatingKwh + finalHotWaterKwh;
        const heatingCosts = finalHeatingKwh * pricePerKwh;
        const hotWaterCosts = finalHotWaterKwh * pricePerKwh;
        const co2Surcharge = co2Extra(heatingType, kwhSum);
        // CO2 nur für effektiven Verbrauch
        const co2 = kwhSum * emissionFactor;

        return {
            total: heatingCosts + hotWaterCosts + co2Surcharge,
            heating: heatingCosts + co2Surcharge,
            hotWater: hotWaterCosts,
            co2: co2
        };
    };


    let current;
    if (calculationMode === 'consumption') {
        const pricePerKwh = ENERGY_PRICES[inputs.currentHeating];
        const emissionFactor = emissionFactors[inputs.currentHeating];

        let finalHotWaterKwh = hotWaterKwh;
        if (inputs.currentHeating === 'waermepumpe') finalHotWaterKwh /= HEATPUMP_SCOP;
        // Der angegebene Zählerverbrauch ist bereits Endenergie, auch bei Wärmepumpen.
        const hotWaterCost = finalHotWaterKwh * pricePerKwh;
        const totalCost = consumption * pricePerKwh; // Original Kosten

        const heatingCost = Math.max(0, totalCost - hotWaterCost);
        const co2 = consumption * emissionFactor;
        const co2Surcharge = co2Extra(inputs.currentHeating, consumption);
        current = {
            total: totalCost + co2Surcharge,
            heating: heatingCost + co2Surcharge,
            hotWater: hotWaterCost,
            co2,
        };
    } else {

        const baseConsumption = SPECIFIC_CONSUMPTION_BY_YEAR[inputs.buildingYear];
        const typeFactor = BUILDING_TYPE_FACTOR[inputs.buildingType];
        const currentHeatingKwh = size * baseConsumption * typeFactor;
        current = calculateCosts(currentHeatingKwh, hotWaterKwh, inputs.currentHeating);
    }

    const measuredHeatDemand = Math.max(0, consumption - hotWaterKwh / (inputs.currentHeating === 'waermepumpe' ? HEATPUMP_SCOP : 1))
      * (inputs.currentHeating === 'waermepumpe' ? HEATPUMP_SCOP : 1);
    const futureHeatingKwh = calculationMode === 'consumption'
      ? measuredHeatDemand * SPECIFIC_CONSUMPTION_FUTURE[inputs.futureInsulation] / SPECIFIC_CONSUMPTION_BY_YEAR[inputs.buildingYear]
      : size * SPECIFIC_CONSUMPTION_FUTURE[inputs.futureInsulation] * BUILDING_TYPE_FACTOR[inputs.buildingType];
    let future = calculateCosts(futureHeatingKwh, hotWaterKwh, inputs.futureHeating);

    const dynamicSavings: Record<SmartHomeSystem, number> = {
      ...SMART_HOME_SAVINGS,
      energiemanagement: inputs.futureHeating === 'waermepumpe' ? 0.3 : 0,
    };


    const smartFactor = Math.max(0.6, selectedSmartSystems.reduce((acc, system) => {
      const s = dynamicSavings[system];
      return acc * (1 - s);
    }, 1));

    const smartInvestment = estimateSmartInvestment();

    if (selectedSmartSystems.length > 0) {
      future = calculateCosts(
        futureHeatingKwh * smartFactor,
         hotWaterKwh,
        inputs.futureHeating
      );
    }

    const annualSavings = current.total - future.total;
    const savingsPercentage = annualSavings > 0 && current.total > 0 ? (annualSavings / current.total) * 100 : 0;
    const co2Savings = current.co2 - future.co2;

    let amortizationPeriod;
    const totalInvestment = investment + smartInvestment;
    if (totalInvestment > 0 && annualSavings > 0) {
        amortizationPeriod = totalInvestment / annualSavings;
    }

    setResults({ inputs: { ...inputs }, current, future, annualSavings, savingsPercentage, co2Savings, amortizationPeriod, smartHomeInvestment: smartInvestment });
    return undefined;
  };

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    setResults(null);
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handlePriceChange = (field: keyof CustomPrices, value: string) => {
    setResults(null);
    setCustomPrices(prev => ({ ...prev, [field]: value }));
  };

  const toggleSmartSystem = (system: SmartHomeSystem) => {
    setResults(null);
    setSelectedSmartSystems(prev =>
      prev.includes(system) ? prev.filter(s => s !== system) : [...prev, system]
    );
  };

  return {
    inputs,
    calculationMode,
    currentConsumption,
    investmentCosts,
    customPrices,
    selectedSmartSystems,
    results,
    priceScenario,
    co2Path,
    setPriceScenario: (value: PriceScenarioKey) => { setResults(null); setPriceScenario(value); setCustomPrices(scenarioToCustomPrices(value)); },
    setCo2Path: (value: boolean) => { setResults(null); setCo2Path(value); },
    handleInputChange,
    setCalculationMode: (value: 'details' | 'consumption') => { setResults(null); setCalculationMode(value); },
    setCurrentConsumption: (value: string) => { setResults(null); setCurrentConsumption(value); },
    setInvestmentCosts: (value: string) => { setResults(null); setInvestmentCosts(value); },
    handlePriceChange,
    estimateSmartInvestment,
    toggleSmartSystem,
    calculateSavings
  };

};
