// Zentrale Head-Metadaten pro Route – Quelle für das statische Pre-Rendering
// (scripts/prerender-head.ts). Muss mit den Helmet-Tags der jeweiligen Seite
// übereinstimmen.

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
}

export const routeMeta: RouteMeta[] = [
  {
    path: '/',
    title: 'Sanieren & Sparen – Energieeffiziente Sanierung',
    description:
      'Praktische Tipps, Rechner & Förderinfos für Heizung, Dämmung, Solar und Smart Home – clever sanieren und sparen.',
  },
  {
    path: '/rechner',
    title: 'Sanierungsrechner 2026 – alle Rechner & Tools im Überblick',
    description:
      'Alle kostenlosen Rechner für Heizung, Dämmung, Solar, Förderung und ROI auf einen Blick – sofort online nutzbar.',
  },
  {
    path: '/heizkostenrechner',
    title: 'Heizkostenrechner 2026 – Heizkosten & Sparpotenzial berechnen',
    description:
      'Heizkosten vergleichen und Sparpotenzial beim Heizungstausch berechnen – inkl. Wärmepumpe, Förderung und Amortisation.',
  },
  {
    path: '/daemmungsrechner',
    title: 'Dämmungsrechner 2026 – Dämmstärke & U-Wert kostenlos berechnen',
    description:
      'Optimale Dämmstärke, U-Wert und Einsparpotenzial online berechnen. Materialvergleich, BAFA-Förderung und Amortisation auf einen Blick.',
  },
  {
    path: '/foerderrechner',
    title: 'Förderrechner 2026 – BAFA & KfW Zuschuss berechnen',
    description:
      'Berechnen Sie Ihren BEG-Zuschuss inkl. Klimageschwindigkeits-, Einkommens- und iSFP-Bonus – mit Förderdeckeln 2026.',
  },
  {
    path: '/roi-rechner',
    title: 'ROI-Rechner Sanierung – Amortisation & Rendite berechnen',
    description:
      'Wirtschaftlichkeit Ihrer Sanierung berechnen: 20-Jahres-Cashflow, Amortisationszeit und Rendite mit Energiepreis-Szenarien.',
  },
  {
    path: '/kostenrechner',
    title: 'Sanierungskosten-Rechner 2026 – Kosten aller Gewerke berechnen',
    description:
      'Sanierungskosten für Dach, Fassade, Fenster, Heizung und mehr kalkulieren – inkl. Förderung und PDF-Export.',
  },
  {
    path: '/rechner/kombi',
    title: 'Kombi-Rechner – Heizung & Gebäudehülle zusammen simulieren',
    description:
      'Heizungstausch und Dämmung gemeinsam berechnen: konsolidierte Förderung, Gesamtkosten und Wechselwirkungen.',
  },
  {
    path: '/energie-check',
    title: 'Energie-Check – Effizienz Ihres Hauses in 12 Fragen',
    description:
      'Kostenloser Energie-Check: Effizienzklasse ermitteln, Schwachstellen erkennen und passende Maßnahmen priorisieren.',
  },
  {
    path: '/rechner-vergleich',
    title: 'Rechner-Vergleich – Heizung, Dämmung & Solar gegenüberstellen',
    description:
      'Vergleichen Sie Sanierungsmaßnahmen direkt: Kosten, Einsparung und Amortisation nebeneinander.',
  },
  {
    path: '/wdvs-kosten-rechner',
    title: 'WDVS Kosten Rechner 2026 – Fassadendämmung Preis pro m² berechnen',
    description:
      'WDVS-Kosten pro m² berechnen: Materialpreise, Dämmstärke, Förderung und Amortisation der Fassadendämmung – kostenlos online.',
  },
  {
    path: '/dachdaemmung-kosten-rechner',
    title: 'Dachdämmung Kosten Rechner 2026 – Preis pro m² & Förderung',
    description:
      'Kosten der Dachdämmung berechnen: Zwischensparren, Aufsparren und oberste Geschossdecke inkl. BAFA-Förderung und Einsparung.',
  },
  {
    path: '/foerdermittel',
    title: 'Fördermittel Sanierung 2026 – BAFA, KfW & regionale Zuschüsse',
    description:
      'Alle Förderprogramme für die energetische Sanierung 2026 im Überblick – Zuschüsse, Kredite und Boni verständlich erklärt.',
  },
  {
    path: '/heizung-modernisieren',
    title: 'Heizung modernisieren 2026 – Kosten, Förderung & Wärmepumpe',
    description:
      'Heizungsmodernisierung planen: Systeme im Vergleich, Kosten, Förderung und Einsparpotenzial mit Rechner.',
  },
  {
    path: '/daemmung-isolierung',
    title: 'Dämmung & Isolierung – Kosten, Materialien und Förderung',
    description:
      'Fassade, Dach und Keller richtig dämmen: Materialvergleich, U-Werte, Kosten und Förderung mit Rechner.',
  },
  {
    path: '/solarenergie',
    title: 'Solarenergie & Photovoltaik – Ertrag, Speicher & Rechner',
    description:
      'PV-Anlage planen: Ertragsprognose, Speicher, Wallbox und 20-Jahres-Wirtschaftlichkeit mit regionalem Sonnenertrag.',
  },
  {
    path: '/fenster-tueren',
    title: 'Fenster & Türen tauschen – Kosten, U-Werte und Förderung',
    description:
      'Fenstertausch planen: U-Werte, Verglasung, Kosten und Förderung – inkl. Einsparrechner.',
  },
  {
    path: '/blog',
    title: 'Sanierungs-Blog – Ratgeber, News & Praxistipps',
    description:
      'Aktuelle Artikel zu Sanierung, Förderung, Heizung, Dämmung und Energiesparen – regelmäßig aktualisiert.',
  },
  {
    path: '/glossar',
    title: 'Sanierungs-Glossar – Fachbegriffe verständlich erklärt',
    description:
      'Über 50 Fachbegriffe rund um energetische Sanierung, Förderung und Haustechnik einfach erklärt.',
  },
  {
    path: '/sanierungscheck',
    title: 'Sanierungs-Check – Maßnahmen priorisieren & Förderung schätzen',
    description:
      'Interaktiver Sanierungs-Check: Reihenfolge der Maßnahmen, Kostenrahmen und Förderprognose für Ihr Haus.',
  },
  {
    path: '/referenzen',
    title: 'Referenzen – Sanierungen vorher/nachher mit Kennzahlen',
    description:
      'Echte Sanierungsprojekte mit Vorher-Nachher-Vergleich, Kosten, Einsparung und Amortisation.',
  },
  {
    path: '/kontakt',
    title: 'Kontakt – Sanieren & Sparen',
    description: 'Fragen zu Sanierung, Förderung oder unseren Rechnern? Schreiben Sie uns.',
  },
];
