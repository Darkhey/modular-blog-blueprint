import { describe, expect, it } from 'vitest';
import { calculateSolarResults, getConfiguration } from '@/utils/solarCalculations';
import { BEG_2026, HANDWERKERPREISE_2026 } from '@/data/energyPrices2026';
import { gewerke } from '@/data/kostenrechnerData';
import { heatingDegreeDaysForPostcode } from '@/lib/heatingDegreeDays';
import type { SolarInputs } from '@/types/solarCalculator';

const solar: SolarInputs = {
  dachflaeche: 50, stromverbrauch: 4000, ausrichtung: 'sued', dachneigung: 35,
  verschattung: 'keine', modultyp: 'mono', plz: '80331', mitSpeicher: false,
  speicherkapazitaet: 8, mitEAuto: false, eAutoFahrleistung: 15000,
  mitWallbox: false, tagverbrauchAnteil: 40,
};

describe('Solarrechner: Eingaben wirken sich auf Ergebnisse aus', () => {
  it('berücksichtigt Tagesverbrauch ohne Speicher und in der 20-Jahres-Prognose', () => {
    expect(getConfiguration(solar).eigenverbrauchOhneSpeicher).toBe(0.4);
    const low = calculateSolarResults({ ...solar, tagverbrauchAnteil: 10 });
    const high = calculateSolarResults({ ...solar, tagverbrauchAnteil: 70 });
    expect(high.eigenverbrauchOhneSpeicher).toBeGreaterThan(low.eigenverbrauchOhneSpeicher);
    expect(high.gesamtersparnis).toBeGreaterThan(low.gesamtersparnis);
    expect(high.zwanzigJahresBilanz).toBeGreaterThan(low.zwanzigJahresBilanz);
    expect(high.jahresprognose[0].ersparnis).toBe(high.gesamtersparnis);
  });

  it('zeigt unterschiedliche Amortisation mit und ohne Speicher', () => {
    const result = calculateSolarResults({ ...solar, mitSpeicher: true, tagverbrauchAnteil: 20 });
    expect(result.amortisationMitSpeicher).not.toBe(result.amortisationOhneSpeicher);
    expect(result.speichernutzung).toBeGreaterThan(0);
  });
  it('rechnet Speicherersparnis nur als Mehrwert gegenüber Einspeisung', () => {
    const result = calculateSolarResults({ ...solar, mitSpeicher: true, tagverbrauchAnteil: 20 });
    expect(result.speicherersparnis).toBeGreaterThan(0);
    expect(result.gesamtersparnis).toBe(result.ersparnisSolarstrom + result.einspeiseverguetung);
  });
  it('hat im ersten Prognosejahr auch mit hohem Tagesverbrauch ohne Speicher dieselbe Ersparnis', () => {
    const result = calculateSolarResults({ ...solar, mitSpeicher: false, tagverbrauchAnteil: 70 });
    expect(result.jahresprognose[0].ersparnis).toBe(result.gesamtersparnis);
  });
});

describe('Dämmungsrechner: Klimazonen', () => {
  it('nutzt Standardwert ohne PLZ und differenziert grob nach Region', () => {
    expect(heatingDegreeDaysForPostcode('')).toBe(3600);
    expect(heatingDegreeDaysForPostcode('80331')).toBeGreaterThan(heatingDegreeDaysForPostcode('50667'));
  });
});

describe('Kostenrechner: gemeinsame Richtwerte', () => {
  it('nutzt 2026-Preise und den tatsächlichen KfW-Kostenrahmen', () => {
    expect(gewerke.find((g) => g.id === 'fenster')?.costPerUnit).toEqual(HANDWERKERPREISE_2026.fenster);
    expect(gewerke.find((g) => g.id === 'heizung')?.foerderungMax).toBe(BEG_2026.heizungMaxKosten);
  });
});