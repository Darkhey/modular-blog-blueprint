/**
 * Serialisierung von Rechner-Eingaben in lesbare, freigabefähige URL-Parameter.
 *
 * Beispiel: { area: 120, mitSpeicher: true, gewerke: { dach: { menge: 80 } } }
 *  -> ?area=120&mitSpeicher=true&gewerke.dach.menge=80
 */

type Primitive = string | number | boolean | null | undefined;
export type InputValues = Record<string, unknown>;

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

/** Flacht ein verschachteltes Objekt zu Punkt-Notation ab. */
export function flattenInputs(values: InputValues, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  Object.entries(values).forEach(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value === undefined || value === null || value === '') return;
    if (isPlainObject(value)) {
      Object.assign(out, flattenInputs(value, path));
    } else if (Array.isArray(value)) {
      const scalars = value.filter((v) => typeof v !== 'object');
      if (scalars.length) out[path] = scalars.join(',');
    } else {
      out[path] = String(value as Primitive);
    }
  });
  return out;
}

/** Wandelt einen String zurück in boolean/number/string. */
function parseValue(raw: string): string | number | boolean {
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  if (raw !== '' && !Number.isNaN(Number(raw)) && /^-?\d*[.,]?\d+$/.test(raw)) {
    return Number(raw.replace(',', '.'));
  }
  return raw;
}

/** Baut aus flachen Punkt-Keys wieder ein verschachteltes Objekt. */
export function unflattenInputs(params: URLSearchParams): InputValues {
  const out: InputValues = {};
  params.forEach((raw, key) => {
    const segments = key.split('.');
    let cursor: Record<string, unknown> = out;
    segments.forEach((segment, index) => {
      if (index === segments.length - 1) {
        cursor[segment] = parseValue(raw);
      } else {
        if (!isPlainObject(cursor[segment])) cursor[segment] = {};
        cursor = cursor[segment] as Record<string, unknown>;
      }
    });
  });
  return out;
}

/** Erzeugt den Query-String der Eingaben (ohne führendes "?"). */
export function inputsToQuery(values: InputValues): string {
  const flat = flattenInputs(values);
  const params = new URLSearchParams();
  Object.keys(flat)
    .sort()
    .forEach((k) => params.set(k, flat[k]));
  return params.toString();
}

/** Liest Eingaben aus einem Query-String (oder window.location.search). */
export function inputsFromQuery(search?: string): InputValues {
  const value = search ?? (typeof window !== 'undefined' ? window.location.search : '');
  const params = new URLSearchParams(value);
  params.delete('share');
  if (![...params.keys()].length) return {};
  return unflattenInputs(params);
}

/** Baut die vollständige, teilbare URL für die aktuellen Eingaben. */
export function buildInputsShareUrl(values: InputValues): string {
  if (typeof window === 'undefined') return '';
  const query = inputsToQuery(values);
  const base = `${window.location.origin}${window.location.pathname}`;
  return query ? `${base}?${query}` : base;
}
