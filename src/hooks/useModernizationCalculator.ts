
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

export interface CustomPrices {
  gas: string;
  oil: string;
  waermepumpe: string;
  pellets: string;
  nachtspeicher: string;
  fernwaerme: string;
}

export interface CalculationResults {
  current: { total: number; heating: number; hotWater: number; };
  future: { total: number; heating: number; hotWater: number; };
  annualSavings: number;
  savingsPercentage: number;
  amortizationPeriod?: number;
}

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

  const [results, setResults] = useState<CalculationResults | null>(null);

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

        if (heatingType === 'waermepumpe') {
          finalHeatingKwh /= HEATPUMP_SCOP;
          finalHotWaterKwh /= HEATPUMP_SCOP;
        }
        
        const heatingCosts = finalHeatingKwh * pricePerKwh;
        const hotWaterCosts = finalHotWaterKwh * pricePerKwh;
        return {
            total: heatingCosts + hotWaterCosts,
            heating: heatingCosts,
            hotWater: hotWaterCosts
        };
    };

    let current;
    if (calculationMode === 'consumption') {
        const pricePerKwh = ENERGY_PRICES[inputs.currentHeating];
        const totalCost = consumption * pricePerKwh;

        let hotWaterCost;
        if (inputs.currentHeating === 'waermepumpe') {
            hotWaterCost = (hotWaterKwh / HEATPUMP_SCOP) * pricePerKwh;
        } else {
            hotWaterCost = hotWaterKwh * pricePerKwh;
        }
        
        const heatingCost = Math.max(0, totalCost - hotWaterCost);
        current = { total: totalCost, heating: heatingCost, hotWater: hotWaterCost };
    } else {
        const baseConsumption = SPECIFIC_CONSUMPTION_BY_YEAR[inputs.buildingYear];
        const typeFactor = BUILDING_TYPE_FACTOR[inputs.buildingType];
        const currentHeatingKwh = size * baseConsumption * typeFactor;
        current = calculateCosts(currentHeatingKwh, hotWaterKwh, inputs.currentHeating);
    }

    const futureHeatingKwh = size * SPECIFIC_CONSUMPTION_FUTURE[inputs.futureInsulation];
    const future = calculateCosts(futureHeatingKwh, hotWaterKwh, inputs.futureHeating);

    const annualSavings = current.total - future.total;
    const savingsPercentage = annualSavings > 0 && current.total > 0 ? (annualSavings / current.total) * 100 : 0;

    let amortizationPeriod;
    if (investment > 0 && annualSavings > 0) {
        amortizationPeriod = investment / annualSavings;
    }

    setResults({ current, future, annualSavings, savingsPercentage, amortizationPeriod });
  };

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handlePriceChange = (field: keyof CustomPrices, value: string) => {
    setCustomPrices(prev => ({ ...prev, [field]: value }));
  };

  return {
    inputs,
    calculationMode,
    currentConsumption,
    investmentCosts,
    customPrices,
    results,
    handleInputChange,
    setCalculationMode,
    setCurrentConsumption,
    setInvestmentCosts,
    handlePriceChange,
    calculateSavings
  };
};
