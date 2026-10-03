/** Vereinfachte regionale Heizgradtage (K·d/Jahr); kein Ersatz für lokale Klimadaten. */
export function heatingDegreeDaysForPostcode(postcode: string): number {
  if (!/^\d{5}$/.test(postcode)) return 3600;
  const prefix = Number(postcode.slice(0, 2));
  if ((prefix >= 80 && prefix <= 97) || (prefix >= 7 && prefix <= 9)) return 3900;
  if (prefix >= 10 && prefix <= 29) return 3700;
  return 3600;
}