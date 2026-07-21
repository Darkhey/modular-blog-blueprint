import { describe, it, expect } from 'vitest';
import { runScenario } from '@/lib/scenarioEngine';
import { calculateSolarResults } from '@/utils/solarCalculations';
import { getCO2Price, co2SurchargePerKwh, PRICE_SCENARIOS } from '@/data/energyPrices2026';
import type { SolarInputs } from '@/types/solarCalculator';

describe('scenarioEngine – Preis-Szenarien', () => {
  const base = {
    investition: 20000,
    energieVorherKwh: 20000,
    energieNachherKwh: 0,
    brennstoffVorher: 'gas' as const,
    brennstoffNachher: 'gas' as const,
    jahre: 20,
    wartungProJahr: 200,
  };

  it('vorsichtig > realistisch > optimistisch bei Gesamtersparnis', () => {
    const opt = runScenario(base, 'optimistisch', { includeCo2Path: false });
    const real = runScenario(base, 'realistisch', { includeCo2Path: false });
    const vor = runScenario(base, 'vorsichtig', { includeCo2Path: false });
    expect(vor.gesamtErsparnis).toBeGreaterThan(real.gesamtErsparnis);
    expect(real.gesamtErsparnis).toBeGreaterThan(opt.gesamtErsparnis);
  });

  it('vorsichtiges Szenario amortisiert schneller (höhere Ersparnisse)', () => {
    const opt = runScenario(base, 'optimistisch', { includeCo2Path: false });
    const vor = runScenario(base, 'vorsichtig', { includeCo2Path: false });
    expect(vor.amortisationJahre).not.toBeNull();
    expect(opt.amortisationJahre).not.toBeNull();
    expect(vor.amortisationJahre!).toBeLessThan(opt.amortisationJahre!);
  });

  it('Preise im Szenario steigen jährlich – Jahr N > Jahr 1 (fuel-basiert)', () => {
    const res = runScenario(base, 'realistisch', { includeCo2Path: false });
    const j1 = res.jahre[0].kostenVorher;
    const j10 = res.jahre[9].kostenVorher;
    const expectedFaktor = Math.pow(1 + PRICE_SCENARIOS.realistisch.jaehrlicheSteigerung, 9);
    expect(j10 / j1).toBeCloseTo(expectedFaktor, 2);
  });
});

describe('scenarioEngine – CO₂-Preis-Pfad', () => {
  const base = {
    investition: 20000,
    energieVorherKwh: 20000,
    energieNachherKwh: 0,
    brennstoffVorher: 'gas' as const,
    brennstoffNachher: 'gas' as const,
    jahre: 20,
  };

  it('CO2-Pfad an erhöht Gesamtersparnis vs. aus (fossiler Ersatz)', () => {
    const off = runScenario(base, 'realistisch', { includeCo2Path: false });
    const on = runScenario(base, 'realistisch', { includeCo2Path: true });
    expect(on.gesamtErsparnis).toBeGreaterThan(off.gesamtErsparnis);
  });

  it('CO2-Preis 2030 > 2026 (Pfad steigt monoton)', () => {
    expect(getCO2Price(2030)).toBeGreaterThan(getCO2Price(2026));
    expect(getCO2Price(2027)).toBeGreaterThanOrEqual(getCO2Price(2026));
  });

  it('CO2-Aufschlag Gas ist plausibel (~1–3 ct/kWh in 2026)', () => {
    const s = co2SurchargePerKwh('gas', 2026);
    expect(s).toBeGreaterThan(0.005);
    expect(s).toBeLessThan(0.05);
  });

  it('Nicht-fossile Vergleiche zeigen keinen Unterschied durch CO2-Pfad', () => {
    const wpBase = {
      ...base,
      brennstoffVorher: 'wpStrom' as const,
      brennstoffNachher: 'wpStrom' as const,
    };
    const off = runScenario(wpBase, 'realistisch', { includeCo2Path: false });
    const on = runScenario(wpBase, 'realistisch', { includeCo2Path: true });
    expect(on.gesamtErsparnis).toBeCloseTo(off.gesamtErsparnis, 3);
  });
});

describe('Solar-Rechner – Szenario & CO₂-Pfad', () => {
  const inputs: SolarInputs = {
    dachflaeche: 50,
    stromverbrauch: 4000,
    ausrichtung: 'sued',
    dachneigung: 35,
    verschattung: 'keine',
    modultyp: 'mono',
    plz: '80331',
    mitSpeicher: false,
    speicherkapazitaet: 8,
    mitEAuto: false,
    eAutoFahrleistung: 15000,
    mitWallbox: false,
    tagverbrauchAnteil: 40,
  };

  it('20-Jahres-Bilanz: vorsichtig > realistisch > optimistisch', () => {
    const opt = calculateSolarResults(inputs, undefined, { priceScenario: 'optimistisch' });
    const real = calculateSolarResults(inputs, undefined, { priceScenario: 'realistisch' });
    const vor = calculateSolarResults(inputs, undefined, { priceScenario: 'vorsichtig' });
    expect(vor.zwanzigJahresBilanz).toBeGreaterThan(real.zwanzigJahresBilanz);
    expect(real.zwanzigJahresBilanz).toBeGreaterThan(opt.zwanzigJahresBilanz);
  });

  it('CO2-Pfad an erhöht die 20-Jahres-Bilanz', () => {
    const off = calculateSolarResults(inputs, undefined, { priceScenario: 'realistisch', includeCo2Path: false });
    const on = calculateSolarResults(inputs, undefined, { priceScenario: 'realistisch', includeCo2Path: true });
    expect(on.zwanzigJahresBilanz).toBeGreaterThan(off.zwanzigJahresBilanz);
  });

  it('Ertrag/Anlagengröße unabhängig vom Szenario (rein physikalisch)', () => {
    const opt = calculateSolarResults(inputs, undefined, { priceScenario: 'optimistisch' });
    const vor = calculateSolarResults(inputs, undefined, { priceScenario: 'vorsichtig' });
    expect(opt.jahresertrag).toBe(vor.jahresertrag);
    expect(opt.anlageGroesse).toBe(vor.anlageGroesse);
  });
});
