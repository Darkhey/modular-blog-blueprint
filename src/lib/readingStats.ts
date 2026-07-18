// Utility to derive word count and reading time from HTML/text content.
// Uses ~220 wpm (typical German prose reading speed).

const WORDS_PER_MINUTE = 220;

export interface ReadingStats {
  words: number;
  minutes: number;
}

export function getReadingStats(content?: string | null, fallbackMinutes?: number): ReadingStats {
  if (!content) {
    return { words: 0, minutes: fallbackMinutes ?? 0 };
  }
  const text = content
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .trim();
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
  const minutes = words > 0 ? Math.max(1, Math.round(words / WORDS_PER_MINUTE)) : (fallbackMinutes ?? 0);
  return { words, minutes };
}

export function formatWordCount(words: number): string {
  return new Intl.NumberFormat('de-DE').format(words);
}
