import { useCallback, useMemo, useState } from 'react';
import { PRICE_SCENARIOS, PriceScenarioKey } from '@/data/energyPrices2026';

export interface Assumptions {
  /** Energiepreis Jahr 1 in €/kWh */
  energiepreis: number;
  /** jährliche Preissteigerung in % */
  steigerung: number;
  /** Betrachtungs-/Finanzierungslaufzeit in Jahren */
  laufzeit: number;
  /** Kalkulations-/Kreditzinssatz in % */
  zinssatz: number;
}

export type FuelKey = 'strom' | 'gas' | 'oel' | 'pellets' | 'fernwaerme' | 'wpStrom';

/** Kalkulationszins-Vorgabe je Szenario (Finanzierung/Opportunität). */
const ZINS_DEFAULT: Record<PriceScenarioKey, number> = {
  optimistisch: 2.5,
  realistisch: 3.8,
  vorsichtig: 5.5,
};

export const defaultAssumptions = (
  scenario: PriceScenarioKey,
  fuel: FuelKey,
  laufzeit: number
): Assumptions => {
  const s = PRICE_SCENARIOS[scenario];
  return {
    energiepreis: Number(s[fuel].toFixed(3)),
    steigerung: Number((s.jaehrlicheSteigerung * 100).toFixed(1)),
    laufzeit,
    zinssatz: ZINS_DEFAULT[scenario],
  };
};

type Overrides = Partial<Record<PriceScenarioKey, Partial<Assumptions>>>;

/**
 * Verwaltet pro Szenario anpassbare Annahmen (Energiepreis, Steigerung, Laufzeit, Zins).
 * Nicht überschriebene Werte folgen automatisch dem gewählten Szenario.
 */
export const useScenarioAssumptions = (
  scenario: PriceScenarioKey,
  fuel: FuelKey,
  laufzeitDefault = 20
) => {
  const [overrides, setOverrides] = useState<Overrides>({});

  const defaults = useMemo(
    () => defaultAssumptions(scenario, fuel, laufzeitDefault),
    [scenario, fuel, laufzeitDefault]
  );

  const assumptions = useMemo<Assumptions>(
    () => ({ ...defaults, ...(overrides[scenario] ?? {}) }),
    [defaults, overrides, scenario]
  );

  const isCustom = Object.keys(overrides[scenario] ?? {}).length > 0;

  const setAssumption = useCallback(
    (key: keyof Assumptions, value: number) => {
      setOverrides((prev) => ({ ...prev, [scenario]: { ...(prev[scenario] ?? {}), [key]: value } }));
    },
    [scenario]
  );

  const resetScenario = useCallback(() => {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[scenario];
      return next;
    });
  }, [scenario]);

  /** Für geteilte Links: kompletten Override-Satz setzen. */
  const restoreAssumptions = useCallback((value: unknown) => {
    if (value && typeof value === 'object') setOverrides(value as Overrides);
  }, []);

  return { assumptions, defaults, isCustom, setAssumption, resetScenario, overrides, restoreAssumptions };
};
