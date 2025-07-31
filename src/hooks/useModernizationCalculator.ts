import { useState } from 'react';

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
  const [customPrices, setCustomPrices] = useState<CustomPrices>({
    gas: '0.10',
    oil: '0.11',
    waermepumpe: '0.30',
    pellets: '0.08',
    nachtspeicher: '0.25',
    fernwaerme: '0.12',
  });

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

    if (!persons || (calculationMode === 'details' && !size) || (calculationMode === 'consumption' && !consumption)) return;

    const ENERGY_PRICES = { 
        gas: parseFloat(customPrices.gas), 
        oil: parseFloat(customPrices.oil), 
        waermepumpe: parseFloat(customPrices.waermepumpe), 
        pellets: parseFloat(customPrices.pellets), 
        nachtspeicher: parseFloat(customPrices.nachtspeicher),
        fernwaerme: parseFloat(customPrices.fernwaerme)
    };
    // Emissionsfaktoren in kg/kWh
    const CO2_FACTORS = {
      gas: 0.21,
      oil: 0.27,
      waermepumpe: 0.38,
      pellets: 0.02,
      nachtspeicher: 0.38,
      fernwaerme: 0.17
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

    const calculateCosts = (heatingKwh: number, hotWaterKwh: number, heatingType: HeatingType) => {
        const pricePerKwh = ENERGY_PRICES[heatingType];
        let finalHeatingKwh = heatingKwh;
        let finalHotWaterKwh = hotWaterKwh;
        const emissionFactor = CO2_FACTORS[heatingType];

        if (heatingType === 'waermepumpe') {
          finalHeatingKwh /= HEATPUMP_SCOP;
          finalHotWaterKwh /= HEATPUMP_SCOP;
        }
        
        const heatingCosts = finalHeatingKwh * pricePerKwh;
        const hotWaterCosts = finalHotWaterKwh * pricePerKwh;
        // CO2 nur für effektiven Verbrauch
        const co2 = (finalHeatingKwh + finalHotWaterKwh) * emissionFactor;

        return {
            total: heatingCosts + hotWaterCosts,
            heating: heatingCosts,
            hotWater: hotWaterCosts,
            co2: co2
        };
    };

    let current;
    if (calculationMode === 'consumption') {
        const pricePerKwh = ENERGY_PRICES[inputs.currentHeating];
        const emissionFactor = CO2_FACTORS[inputs.currentHeating];

        let finalHotWaterKwh = hotWaterKwh;
        let consumptionKwh = consumption;
        if (inputs.currentHeating === 'waermepumpe') {
            finalHotWaterKwh /= HEATPUMP_SCOP;
            consumptionKwh /= HEATPUMP_SCOP;
        }
        const hotWaterCost = finalHotWaterKwh * pricePerKwh;
        const totalCost = consumption * pricePerKwh; // Original Kosten

        const heatingCost = Math.max(0, totalCost - hotWaterCost);
        const co2 = (consumption + (finalHotWaterKwh - hotWaterKwh)) * emissionFactor;
        current = { total: totalCost, heating: heatingCost, hotWater: hotWaterCost, co2 };
    } else {
        const baseConsumption = SPECIFIC_CONSUMPTION_BY_YEAR[inputs.buildingYear];
        const typeFactor = BUILDING_TYPE_FACTOR[inputs.buildingType];
        const currentHeatingKwh = size * baseConsumption * typeFactor;
        current = calculateCosts(currentHeatingKwh, hotWaterKwh, inputs.currentHeating);
    }

    const futureHeatingKwh = size * SPECIFIC_CONSUMPTION_FUTURE[inputs.futureInsulation];
    let future = calculateCosts(futureHeatingKwh, hotWaterKwh, inputs.futureHeating);

    const dynamicSavings: Record<SmartHomeSystem, number> = {
      ...SMART_HOME_SAVINGS,
      energiemanagement: inputs.futureHeating === 'waermepumpe' ? 0.3 : 0,
    };


    const smartFactor = selectedSmartSystems.reduce((acc, system) => {
      const s = dynamicSavings[system];
      return acc * (1 - s);
    }, 1);

    const smartInvestment = estimateSmartInvestment();

    if (selectedSmartSystems.length > 0) {
      future = calculateCosts(
        futureHeatingKwh * smartFactor,
        hotWaterKwh * smartFactor,
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

    setResults({ current, future, annualSavings, savingsPercentage, co2Savings, amortizationPeriod, smartHomeInvestment: smartInvestment });
  };

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handlePriceChange = (field: keyof CustomPrices, value: string) => {
    setCustomPrices(prev => ({ ...prev, [field]: value }));
  };

  const toggleSmartSystem = (system: SmartHomeSystem) => {
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
    handleInputChange,
    setCalculationMode,
    setCurrentConsumption,
    setInvestmentCosts,
    handlePriceChange,
    estimateSmartInvestment,
    toggleSmartSystem,
    calculateSavings
  };
};
