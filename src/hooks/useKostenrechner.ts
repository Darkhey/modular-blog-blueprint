import { useState, useCallback } from 'react';
import { gewerke, type Gewerk } from '@/data/kostenrechnerData';

export interface GewerkInput {
  selected: boolean;
  menge: number;
}

export interface GewerkResult {
  gewerk: Gewerk;
  menge: number;
  kostenMin: number;
  kostenMax: number;
  kostenAvg: number;
  foerderung: number;
  nettoMin: number;
  nettoMax: number;
  nettoAvg: number;
}

export interface KostenrechnerResults {
  gewerke: GewerkResult[];
  totalBruttoMin: number;
  totalBruttoMax: number;
  totalBruttoAvg: number;
  totalFoerderung: number;
  totalNettoMin: number;
  totalNettoMax: number;
  totalNettoAvg: number;
}

export const useKostenrechner = () => {
  const [inputs, setInputs] = useState<Record<string, GewerkInput>>(() => {
    const initial: Record<string, GewerkInput> = {};
    gewerke.forEach((g) => {
      initial[g.id] = { selected: false, menge: g.defaultValue };
    });
    return initial;
  });

  const [results, setResults] = useState<KostenrechnerResults | null>(null);

  const toggleGewerk = useCallback((id: string) => {
    setInputs((prev) => ({
      ...prev,
      [id]: { ...prev[id], selected: !prev[id].selected },
    }));
  }, []);

  const setMenge = useCallback((id: string, menge: number) => {
    setInputs((prev) => ({
      ...prev,
      [id]: { ...prev[id], menge },
    }));
  }, []);

  const selectedCount = Object.values(inputs).filter((i) => i.selected).length;

  const calculate = useCallback(() => {
    const selectedGewerke = gewerke.filter((g) => inputs[g.id].selected);

    const gewerkResults: GewerkResult[] = selectedGewerke.map((g) => {
      const menge = inputs[g.id].menge;
      const kostenMin = menge * g.costPerUnit.min;
      const kostenMax = menge * g.costPerUnit.max;
      const kostenAvg = (kostenMin + kostenMax) / 2;
      const foerderungRaw = kostenAvg * (g.foerderungPercent / 100);
      const foerderung = Math.min(foerderungRaw, g.foerderungMax);
      return {
        gewerk: g,
        menge,
        kostenMin,
        kostenMax,
        kostenAvg,
        foerderung,
        nettoMin: kostenMin - foerderung,
        nettoMax: kostenMax - foerderung,
        nettoAvg: kostenAvg - foerderung,
      };
    });

    const totals = gewerkResults.reduce(
      (acc, r) => ({
        totalBruttoMin: acc.totalBruttoMin + r.kostenMin,
        totalBruttoMax: acc.totalBruttoMax + r.kostenMax,
        totalBruttoAvg: acc.totalBruttoAvg + r.kostenAvg,
        totalFoerderung: acc.totalFoerderung + r.foerderung,
        totalNettoMin: acc.totalNettoMin + r.nettoMin,
        totalNettoMax: acc.totalNettoMax + r.nettoMax,
        totalNettoAvg: acc.totalNettoAvg + r.nettoAvg,
      }),
      {
        totalBruttoMin: 0,
        totalBruttoMax: 0,
        totalBruttoAvg: 0,
        totalFoerderung: 0,
        totalNettoMin: 0,
        totalNettoMax: 0,
        totalNettoAvg: 0,
      }
    );

    setResults({ gewerke: gewerkResults, ...totals });
  }, [inputs]);

  return { inputs, toggleGewerk, setMenge, selectedCount, results, calculate, gewerke };
};
