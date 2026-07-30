import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { buildInputsShareUrl, inputsFromQuery, inputsToQuery, type InputValues } from '@/lib/shareableInputs';

interface Options<T extends InputValues> {
  /** Aktuelle Eingaben des Rechners */
  values: T;
  /** Wird einmalig beim Laden aufgerufen, wenn URL-Parameter vorhanden sind */
  onRestore?: (restored: InputValues) => void;
  /** URL beim Tippen live aktualisieren (history.replaceState) */
  syncUrl?: boolean;
}

/**
 * Macht Rechner-Eingaben als URL-Parameter teilbar und stellt sie
 * beim Aufruf eines geteilten Links automatisch wieder her.
 */
export function useShareableInputs<T extends InputValues>({ values, onRestore, syncUrl = true }: Options<T>) {
  const restored = useRef(false);
  const [wasRestored, setWasRestored] = useState(false);

  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    const fromUrl = inputsFromQuery();
    if (Object.keys(fromUrl).length && onRestore) {
      onRestore(fromUrl);
      setWasRestored(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const query = useMemo(() => inputsToQuery(values), [values]);
  const shareUrl = useMemo(() => buildInputsShareUrl(values), [values]);

  useEffect(() => {
    if (!syncUrl || typeof window === 'undefined' || !restored.current) return;
    const next = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
    window.history.replaceState(null, '', next);
  }, [query, syncUrl]);

  const clearUrl = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  return { shareUrl, query, wasRestored, clearUrl };
}
