/**
 * Zentrale HowTo-Daten ("Kurz erklärt") für alle Rechner-Seiten.
 * Wird sowohl als sichtbarer Block als auch als HowTo JSON-LD ausgegeben.
 * Wichtig: Schritte kurz und imperativ formulieren (1 Satz pro Step).
 */
export interface CalculatorHowToStep {
  /** Kurzer Titel des Schritts (≤ 60 Zeichen) */
  name: string;
  /** 1–2 Sätze, was zu tun ist */
  text: string;
}

export interface CalculatorHowTo {
  /** Gesamt-Titel, z. B. "So nutzen Sie den Heizkostenrechner" */
  name: string;
  /** Kurzbeschreibung (≤ 160 Zeichen) */
  description: string;
  /** Geschätzte Dauer in Minuten (für totalTime im JSON-LD) */
  totalTimeMinutes?: number;
  steps: CalculatorHowToStep[];
}

export const calculatorHowTos: Record<string, CalculatorHowTo> = {
  heizkostenrechner: {
    name: 'So nutzen Sie den Heizkostenrechner in 4 Schritten',
    description:
      'Sparpotenzial durch Heizungsmodernisierung in unter 2 Minuten berechnen – inkl. BAFA-Förderung 2026.',
    totalTimeMinutes: 2,
    steps: [
      { name: 'Gebäudedaten eingeben', text: 'Tragen Sie Baujahr, Wohnfläche und aktuellen Energieträger ein.' },
      { name: 'Verbrauch erfassen', text: 'Wählen Sie zwischen Schätzwert oder echtem Jahresverbrauch in kWh.' },
      { name: 'Modernisierung wählen', text: 'Aktivieren Sie geplante Maßnahmen wie Wärmepumpe, Dämmung oder Smart Home.' },
      { name: 'Ergebnis & Förderung prüfen', text: 'Sehen Sie Einsparung, Amortisation und BAFA-Zuschuss auf einen Blick.' },
    ],
  },

  daemmungsrechner: {
    name: 'So berechnen Sie Ihre optimale Dämmung',
    description:
      'In 4 Schritten zur passenden Dämmstärke, U-Wert und Einsparung inkl. Materialvergleich.',
    totalTimeMinutes: 2,
    steps: [
      { name: 'Bauteil wählen', text: 'Wählen Sie Fassade, Dach, Kellerdecke oder oberste Geschossdecke.' },
      { name: 'Fläche & Ist-Zustand eingeben', text: 'Tragen Sie Quadratmeter und vorhandene Dämmung ein.' },
      { name: 'Material vergleichen', text: 'Vergleichen Sie EPS, Mineralwolle, Holzfaser & Co. nach U-Wert und Preis.' },
      { name: 'Förderung & Amortisation ablesen', text: 'BAFA-Zuschuss und Amortisationszeit werden sofort angezeigt.' },
    ],
  },

  solarrechner: {
    name: 'So planen Sie Ihre Photovoltaik-Anlage',
    description:
      'PV-Ertrag, Speichergröße und 20-Jahres-Prognose anhand Postleitzahl & Dachfläche berechnen.',
    totalTimeMinutes: 3,
    steps: [
      { name: 'Standort eingeben', text: 'PLZ angeben – regionale Sonneneinstrahlung wird automatisch geladen.' },
      { name: 'Dach & Verbrauch', text: 'Dachfläche, Ausrichtung, Neigung und Jahresverbrauch eintragen.' },
      { name: 'Speicher & Wallbox', text: 'Optional Batteriespeicher und E-Auto-Wallbox berücksichtigen.' },
      { name: '20-Jahres-Prognose', text: 'Eigenverbrauch, Einspeisevergütung und Amortisation ablesen.' },
    ],
  },

  foerderrechner: {
    name: 'So finden Sie die richtige Förderung',
    description:
      'BAFA-, KfW- und Landesförderung für Ihre Sanierung kombiniert berechnen.',
    totalTimeMinutes: 2,
    steps: [
      { name: 'Maßnahme wählen', text: 'Heizung, Dämmung, Fenster oder Komplettsanierung auswählen.' },
      { name: 'Investitionssumme eingeben', text: 'Geplante Kosten netto eintragen – Boni werden automatisch geprüft.' },
      { name: 'Boni aktivieren', text: 'iSFP-Bonus, Klimageschwindigkeitsbonus & einkommensabhängige Förderung wählen.' },
      { name: 'Maximalförderung erhalten', text: 'Konkrete Förderhöhe inkl. Eigenanteil wird angezeigt.' },
    ],
  },

  'roi-rechner': {
    name: 'So prüfen Sie, ob sich Ihre Sanierung rechnet',
    description:
      'Amortisation, Cashflow und IRR Ihrer Sanierung über bis zu 30 Jahre simulieren.',
    totalTimeMinutes: 2,
    steps: [
      { name: 'Investition & Förderung', text: 'Gesamtkosten und erwarteten Zuschuss eintragen.' },
      { name: 'Einsparung pro Jahr', text: 'Jährliche Energieeinsparung in kWh und Energieträger wählen.' },
      { name: 'Preissteigerung setzen', text: 'Erwartete Energiepreissteigerung pro Jahr in Prozent angeben.' },
      { name: 'Break-Even ablesen', text: 'Amortisationsjahr, Netto-Cashflow und CO₂-Ersparnis prüfen.' },
    ],
  },

  'energie-check': {
    name: 'So führen Sie den Energie-Check durch',
    description:
      'Energieeffizienz Ihres Gebäudes in wenigen Klicks einstufen.',
    totalTimeMinutes: 2,
    steps: [
      { name: 'Gebäudetyp wählen', text: 'EFH, MFH oder Reihenhaus mit Baujahr-Klasse auswählen.' },
      { name: 'Heizung & Dämmung', text: 'Aktuellen Heizungs- und Dämmstandard angeben.' },
      { name: 'Verbrauch eintragen', text: 'Jahresverbrauch oder Schätzwert pro m² hinterlegen.' },
      { name: 'Effizienzklasse erhalten', text: 'Sie sehen Ihre Klasse A+ bis H und konkrete Maßnahmen.' },
    ],
  },

  kostenrechner: {
    name: 'So kalkulieren Sie Ihre Sanierungskosten',
    description:
      'Gewerkeübergreifende Kostenkalkulation für Ihre Sanierung – inkl. PDF-Export.',
    totalTimeMinutes: 3,
    steps: [
      { name: 'Gewerke auswählen', text: 'Heizung, Dämmung, Fenster, Bad, Elektrik etc. aktivieren.' },
      { name: 'Mengen eingeben', text: 'Flächen, Stückzahlen oder Pauschalen pro Gewerk eintragen.' },
      { name: 'Region wählen', text: 'Regionale Preisniveaus West/Ost/Süd anpassen.' },
      { name: 'Gesamtkosten & PDF', text: 'Detaillierte Kostenaufstellung ansehen und als PDF exportieren.' },
    ],
  },

  'rechner-vergleich': {
    name: 'So vergleichen Sie Sanierungsmaßnahmen',
    description:
      'Heizung, Dämmung und Solar nebeneinander vergleichen – Kosten, Einsparung, Amortisation.',
    totalTimeMinutes: 2,
    steps: [
      { name: 'Gebäudedaten einmal eintragen', text: 'Wohnfläche, Baujahr und Verbrauch werden für alle Vergleiche genutzt.' },
      { name: 'Maßnahmen aktivieren', text: 'Wählen Sie 2–3 Maßnahmen für den direkten Vergleich.' },
      { name: 'Werte feinjustieren', text: 'Pro Maßnahme Investitionssumme und Förderhöhe anpassen.' },
      { name: 'Sieger ermitteln', text: 'Beste Amortisation und höchste Einsparung farblich hervorgehoben.' },
    ],
  },

  sanierungscheck: {
    name: 'So priorisieren Sie Ihre Sanierung',
    description:
      'In 5 Minuten zur priorisierten Sanierungs-Roadmap inkl. Förderprognose.',
    totalTimeMinutes: 5,
    steps: [
      { name: 'Gebäude beschreiben', text: 'Baujahr, Größe und aktuellen Zustand angeben.' },
      { name: 'Schwachstellen markieren', text: 'Fenster, Dach, Heizung, Keller etc. nach Zustand bewerten.' },
      { name: 'Budget setzen', text: 'Verfügbares Budget und Zeithorizont angeben.' },
      { name: 'Roadmap erhalten', text: 'Priorisierte Maßnahmenliste mit Reihenfolge und Förderprognose.' },
    ],
  },
};
