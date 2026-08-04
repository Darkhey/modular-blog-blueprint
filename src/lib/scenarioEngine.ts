/**
 * Cashflow-Simulation f\u00fcr Sanierungsma\u00dfnahmen \u00fcber N Jahre.
 * Ber\u00fccksichtigt Preis-Szenarien, CO\u2082-Preis-Pfad und Wartungskosten.
 *
 * Verwendet von: ROI-Rechner, Heizungsrechner (Amortisation), Solar-Rechner.
 */
import {
  PRICE_SCENARIOS,
  PriceScenarioKey,
  co2SurchargePerKwh,
  CO2_FACTORS,
} from '@/data/energyPrices2026';

export interface ScenarioInput {
  /** Investition in \u20ac (nach Abzug F\u00f6rderung) */
  investition: number;
  /** Endenergie-Bedarf VORHER (kWh/a) im alten Brennstoff */
  energieVorherKwh: number;
  /** Endenergie-Bedarf NACHHER (kWh/a) im neuen Brennstoff */
  energieNachherKwh: number;
  brennstoffVorher: 'gas' | 'oel' | 'pellets' | 'fernwaerme' | 'strom' | 'wpStrom';
  brennstoffNachher: 'gas' | 'oel' | 'pellets' | 'fernwaerme' | 'strom' | 'wpStrom';
  /** J\u00e4hrliche Wartungskosten (\u20ac/a) */
  wartungProJahr?: number;
  /** Betrachtungszeitraum in Jahren */
  jahre?: number;
  /** Zinssatz f\u00fcr Barwertbetrachtung (Dezimal), optional */
  diskontsatz?: number;
}

export interface ScenarioResult {
  jahre: Array<{
    jahr: number;
    kostenVorher: number;
    kostenNachher: number;
    ersparnis: number;
    co2Aufschlag: number;
    kumuliert: number;
  }>;
  amortisationJahre: number | null;
  gesamtErsparnis: number;
  co2VermeidungTonnen: number;
  irrApprox: number | null;
  /** Barwert (NPV) der Ersparnisse abzgl. Investition, mit Diskontsatz */
  barwert: number;
}

/** Manuelle Annahmen, die die Szenario-Defaults überschreiben. */
export interface ScenarioOverrides {
  /** Energiepreis Jahr 1 für den alten Energieträger (€/kWh) */
  preisVorher?: number;
  /** Energiepreis Jahr 1 für den neuen Energieträger (€/kWh) */
  preisNachher?: number;
  /** jährliche Preissteigerung (Dezimal, z. B. 0.035) */
  steigerung?: number;
}

const priceForFuel = (
  scenario: PriceScenarioKey,
  fuel: ScenarioInput['brennstoffVorher'],
  jahr: number,
  startjahr: number,
  basisOverride?: number,
  steigerungOverride?: number
): number => {
  const s = PRICE_SCENARIOS[scenario];
  const base =
    basisOverride != null && basisOverride > 0 ? basisOverride :
    fuel === 'gas' ? s.gas :
    fuel === 'oel' ? s.oel :
    fuel === 'pellets' ? s.pellets :
    fuel === 'fernwaerme' ? s.fernwaerme :
    fuel === 'wpStrom' ? s.wpStrom :
    s.strom;
  const steigerung = steigerungOverride != null ? steigerungOverride : s.jaehrlicheSteigerung;
  return base * Math.pow(1 + steigerung, jahr - startjahr);
};

const isFossil = (fuel: ScenarioInput['brennstoffVorher']): fuel is 'gas' | 'oel' | 'pellets' | 'fernwaerme' =>
  fuel === 'gas' || fuel === 'oel' || fuel === 'pellets' || fuel === 'fernwaerme';

export const runScenario = (
  input: ScenarioInput,
  scenario: PriceScenarioKey = 'realistisch',
  options: {
    includeCo2Path?: boolean;
    co2Mode?: 'min' | 'expected' | 'max';
    startjahr?: number;
    overrides?: ScenarioOverrides;
  } = {}
): ScenarioResult => {

  const jahre = input.jahre ?? 20;
  const startjahr = options.startjahr ?? new Date().getFullYear();
  const includeCo2 = options.includeCo2Path ?? true;
  const co2Mode = options.co2Mode ?? 'expected';

  const rows: ScenarioResult['jahre'] = [];
  let kumuliert = -input.investition;
  let amortisationJahre: number | null = null;
  let co2VermeidungTonnen = 0;

  for (let i = 0; i < jahre; i++) {
    const jahr = startjahr + i;
    const ov = options.overrides ?? {};
    const preisVorher = priceForFuel(scenario, input.brennstoffVorher, jahr, startjahr, ov.preisVorher, ov.steigerung);
    const preisNachher = priceForFuel(scenario, input.brennstoffNachher, jahr, startjahr, ov.preisNachher, ov.steigerung);

    let kostenVorher = input.energieVorherKwh * preisVorher;
    let kostenNachher = input.energieNachherKwh * preisNachher;

    let co2Aufschlag = 0;
    if (includeCo2) {
      if (isFossil(input.brennstoffVorher)) {
        const surcharge = co2SurchargePerKwh(input.brennstoffVorher, jahr, co2Mode);
        kostenVorher += input.energieVorherKwh * surcharge;
        co2Aufschlag += input.energieVorherKwh * surcharge;
      }
      if (isFossil(input.brennstoffNachher)) {
        const surcharge = co2SurchargePerKwh(input.brennstoffNachher, jahr, co2Mode);
        kostenNachher += input.energieNachherKwh * surcharge;
      }
    }

    const wartung = input.wartungProJahr ?? 0;
    kostenNachher += wartung;

    const ersparnis = kostenVorher - kostenNachher;
    kumuliert += ersparnis;

    if (amortisationJahre === null && kumuliert >= 0) {
      const vorher = kumuliert - ersparnis;
      const anteil = ersparnis > 0 ? -vorher / ersparnis : 0;
      amortisationJahre = i + anteil;
    }

    // CO\u2082-Vermeidung (t): Delta Emissionen der Endenergie
    const co2Vorher = isFossil(input.brennstoffVorher)
      ? (input.energieVorherKwh * CO2_FACTORS[input.brennstoffVorher === 'oel' ? 'oel' : input.brennstoffVorher]) / 1000
      : (input.energieVorherKwh * CO2_FACTORS.strom_mix_2026) / 1000;
    const co2Nachher = isFossil(input.brennstoffNachher)
      ? (input.energieNachherKwh * CO2_FACTORS[input.brennstoffNachher === 'oel' ? 'oel' : input.brennstoffNachher]) / 1000
      : (input.energieNachherKwh * CO2_FACTORS.strom_mix_2026) / 1000;
    co2VermeidungTonnen += Math.max(0, co2Vorher - co2Nachher);

    rows.push({ jahr, kostenVorher, kostenNachher, ersparnis, co2Aufschlag, kumuliert });
  }

  const gesamtErsparnis = kumuliert + input.investition;

  // IRR-Approximation (Newton, sehr grob)
  let irrApprox: number | null = null;
  if (input.investition > 0 && gesamtErsparnis > 0) {
    let r = 0.05;
    for (let iter = 0; iter < 40; iter++) {
      let npv = -input.investition;
      let dnpv = 0;
      rows.forEach((row, idx) => {
        const t = idx + 1;
        npv += row.ersparnis / Math.pow(1 + r, t);
        dnpv += (-t * row.ersparnis) / Math.pow(1 + r, t + 1);
      });
      if (Math.abs(dnpv) < 1e-6) break;
      const rn = r - npv / dnpv;
      if (Math.abs(rn - r) < 1e-5) { r = rn; break; }
      r = Math.max(-0.5, Math.min(1, rn));
    }
    irrApprox = r;
  }

  // Barwert (NPV) mit optionalem Diskontsatz
  const disk = input.diskontsatz ?? 0;
  const barwert = rows.reduce(
    (acc, row, idx) => acc + row.ersparnis / Math.pow(1 + disk, idx + 1),
    -input.investition
  );

  return { jahre: rows, amortisationJahre, gesamtErsparnis, co2VermeidungTonnen, irrApprox, barwert };
};
