export type GlossaryItem = {
  term: string;
  definition: string;
};

export const glossary: GlossaryItem[] = [
  {
    term: "BEG",
    definition:
      "Bundesf\u00f6rderung f\u00fcr effiziente Geb\u00e4ude \u2013 zentrales deutsches F\u00f6rderprogramm f\u00fcr Sanierungen.",
  },
  {
    term: "KfW",
    definition:
      "Kreditanstalt f\u00fcr Wiederaufbau, bietet zinsg\u00fcnstige Kredite und Zusch\u00fcsse f\u00fcr Effizienzma\u00dfnahmen.",
  },
  {
    term: "WDVS",
    definition:
      "W\u00e4rmed\u00e4mmverbundsystem \u2013 au\u00dfen aufgebrachte D\u00e4mmung zur Verbesserung der Energieeffizienz von Geb\u00e4uden.",
  },
  {
    term: "Photovoltaik",
    definition:
      "Technik zur Stromerzeugung aus Sonnenlicht mittels Solarzellen auf Dachfl\u00e4chen oder Freianlagen.",
  },
  {
    term: "Smart Meter",
    definition:
      "Intelligenter Stromz\u00e4hler, der den Energieverbrauch digital erfasst und an den Versorger \u00fcbermittelt.",
  },
];

export default glossary;
