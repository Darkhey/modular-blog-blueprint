export interface DecisionOption {
  id: string;
  label: string;
  icon: string;
  description?: string;
  value: Record<string, number>;
}

export interface DecisionStep {
  id: string;
  question: string;
  subtitle: string;
  options: DecisionOption[];
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: number;
  estimatedCost: string;
  fundingPercent: string;
  paybackYears: string;
  savingsPerYear: string;
  linkTo: string;
  linkLabel: string;
  calculatorLink?: string;
  calculatorLabel?: string;
  icon: string;
}

export const decisionSteps: DecisionStep[] = [
  {
    id: "building-age",
    question: "Wie alt ist Ihr Gebäude?",
    subtitle: "Das Baujahr bestimmt den energetischen Zustand und die sinnvollsten Maßnahmen.",
    options: [
      { id: "pre-1960", label: "Vor 1960", icon: "🏚️", description: "Altbau ohne Dämmung", value: { daemmung: 5, heizung: 4, fenster: 4, solar: 2 } },
      { id: "1960-1980", label: "1960–1980", icon: "🏠", description: "Typischer Nachkriegsbau", value: { daemmung: 4, heizung: 4, fenster: 3, solar: 3 } },
      { id: "1980-2000", label: "1980–2000", icon: "🏡", description: "Erste Wärmeschutzverordnung", value: { daemmung: 3, heizung: 3, fenster: 2, solar: 3 } },
      { id: "post-2000", label: "Nach 2000", icon: "🏢", description: "Moderne Baustandards", value: { daemmung: 1, heizung: 2, fenster: 1, solar: 4 } },
    ],
  },
  {
    id: "heating-type",
    question: "Welche Heizung haben Sie aktuell?",
    subtitle: "Die aktuelle Heizungsart bestimmt das Einsparpotenzial.",
    options: [
      { id: "oil", label: "Ölheizung", icon: "🛢️", description: "Hohe Betriebskosten", value: { heizung: 5, daemmung: 1, fenster: 0, solar: 1 } },
      { id: "gas", label: "Gasheizung", icon: "🔥", description: "Mittlere Effizienz", value: { heizung: 4, daemmung: 0, fenster: 0, solar: 1 } },
      { id: "electric", label: "Elektroheizung", icon: "⚡", description: "Sehr hohe Kosten", value: { heizung: 5, daemmung: 2, fenster: 1, solar: 2 } },
      { id: "heatpump", label: "Wärmepumpe", icon: "♻️", description: "Bereits effizient", value: { heizung: 0, daemmung: 1, fenster: 0, solar: 3 } },
    ],
  },
  {
    id: "insulation-status",
    question: "Wie ist der Dämmzustand Ihres Hauses?",
    subtitle: "Über die Gebäudehülle geht die meiste Energie verloren.",
    options: [
      { id: "none", label: "Keine Dämmung", icon: "❄️", description: "Ungedämmt", value: { daemmung: 5, fenster: 1, heizung: 0, solar: 0 } },
      { id: "partial", label: "Teilweise gedämmt", icon: "🧱", description: "Z.B. nur Dach", value: { daemmung: 3, fenster: 1, heizung: 0, solar: 0 } },
      { id: "good", label: "Gut gedämmt", icon: "🏗️", description: "Fassade & Dach", value: { daemmung: 1, fenster: 0, heizung: 0, solar: 1 } },
      { id: "excellent", label: "Vollständig gedämmt", icon: "✅", description: "KfW-Standard", value: { daemmung: 0, fenster: 0, heizung: 0, solar: 2 } },
    ],
  },
  {
    id: "window-status",
    question: "Wie alt sind Ihre Fenster?",
    subtitle: "Alte Fenster sind eine der größten Schwachstellen bei der Energieeffizienz.",
    options: [
      { id: "single-pane", label: "Einfachverglasung", icon: "🪟", description: "Vor 1980", value: { fenster: 5, daemmung: 1, heizung: 0, solar: 0 } },
      { id: "double-old", label: "Alte Doppelverglasung", icon: "🔲", description: "1980–2000", value: { fenster: 3, daemmung: 0, heizung: 0, solar: 0 } },
      { id: "double-new", label: "Moderne Doppelverglasung", icon: "🖼️", description: "Nach 2000", value: { fenster: 1, daemmung: 0, heizung: 0, solar: 0 } },
      { id: "triple", label: "Dreifachverglasung", icon: "💎", description: "Aktueller Standard", value: { fenster: 0, daemmung: 0, heizung: 0, solar: 1 } },
    ],
  },
  {
    id: "budget",
    question: "Welches Budget haben Sie für die Sanierung?",
    subtitle: "Wir passen die Empfehlungen an Ihre finanziellen Möglichkeiten an.",
    options: [
      { id: "small", label: "Bis 10.000 €", icon: "💰", description: "Einzelmaßnahmen", value: { daemmung: -1, heizung: -2, fenster: 0, solar: -2 } },
      { id: "medium", label: "10.000–30.000 €", icon: "💰💰", description: "Mehrere Maßnahmen", value: { daemmung: 0, heizung: 0, fenster: 0, solar: 0 } },
      { id: "large", label: "30.000–80.000 €", icon: "💰💰💰", description: "Umfassende Sanierung", value: { daemmung: 1, heizung: 1, fenster: 1, solar: 1 } },
      { id: "unlimited", label: "Über 80.000 €", icon: "🏦", description: "Kernsanierung möglich", value: { daemmung: 2, heizung: 2, fenster: 2, solar: 2 } },
    ],
  },
  {
    id: "priority",
    question: "Was ist Ihnen am wichtigsten?",
    subtitle: "Ihre Priorität beeinflusst die Reihenfolge der Empfehlungen.",
    options: [
      { id: "cost-saving", label: "Kosten sparen", icon: "📉", description: "Möglichst schnelle Amortisation", value: { heizung: 2, daemmung: 2, fenster: 1, solar: 1 } },
      { id: "comfort", label: "Wohnkomfort", icon: "🛋️", description: "Behaglichkeit & Raumklima", value: { daemmung: 2, fenster: 2, heizung: 1, solar: 0 } },
      { id: "environment", label: "Umweltschutz", icon: "🌱", description: "CO₂-Reduktion maximieren", value: { solar: 3, heizung: 2, daemmung: 1, fenster: 0 } },
      { id: "value", label: "Wertsteigerung", icon: "📈", description: "Immobilienwert erhöhen", value: { daemmung: 2, heizung: 1, fenster: 2, solar: 2 } },
    ],
  },
];

export const recommendations: Record<string, Recommendation> = {
  daemmung: {
    id: "daemmung",
    title: "Wärmedämmung",
    description: "Fassaden-, Dach- oder Kellerdeckendämmung reduziert den Heizenergiebedarf um bis zu 40%. Die effektivste Einzelmaßnahme für Altbauten.",
    priority: 0,
    estimatedCost: "15.000–40.000 €",
    fundingPercent: "Bis zu 20%",
    paybackYears: "8–15 Jahre",
    savingsPerYear: "1.500–3.000 €",
    linkTo: "/daemmung-isolierung",
    linkLabel: "Dämmung im Detail",
    calculatorLink: "/daemmungsrechner",
    calculatorLabel: "Dämmungsrechner",
    icon: "🧱",
  },
  heizung: {
    id: "heizung",
    title: "Heizungsmodernisierung",
    description: "Der Umstieg auf eine Wärmepumpe oder effiziente Brennwerttechnik senkt die Heizkosten drastisch und wird mit bis zu 70% gefördert.",
    priority: 0,
    estimatedCost: "15.000–35.000 €",
    fundingPercent: "Bis zu 70%",
    paybackYears: "5–12 Jahre",
    savingsPerYear: "1.000–3.500 €",
    linkTo: "/heizung-modernisieren",
    linkLabel: "Heizung modernisieren",
    calculatorLink: "/heizkostenrechner",
    calculatorLabel: "Heizkostenrechner",
    icon: "🔥",
  },
  fenster: {
    id: "fenster",
    title: "Fenster & Türen erneuern",
    description: "Neue Fenster mit Dreifachverglasung verbessern die Energieeffizienz, den Schallschutz und den Wohnkomfort erheblich.",
    priority: 0,
    estimatedCost: "8.000–25.000 €",
    fundingPercent: "Bis zu 20%",
    paybackYears: "10–18 Jahre",
    savingsPerYear: "500–1.500 €",
    linkTo: "/fenster-tueren",
    linkLabel: "Fenster & Türen",
    icon: "🪟",
  },
  solar: {
    id: "solar",
    title: "Solarenergie nutzen",
    description: "Photovoltaik und Solarthermie machen Sie unabhängiger von steigenden Energiepreisen und liefern kostenlosen Strom oder Warmwasser.",
    priority: 0,
    estimatedCost: "10.000–25.000 €",
    fundingPercent: "Einspeisevergütung",
    paybackYears: "8–14 Jahre",
    savingsPerYear: "800–2.500 €",
    linkTo: "/solarenergie",
    linkLabel: "Solarenergie",
    icon: "☀️",
  },
};

export function calculateRecommendations(
  answers: Record<string, string>
): Recommendation[] {
  const scores: Record<string, number> = { daemmung: 0, heizung: 0, fenster: 0, solar: 0 };

  for (const [stepId, optionId] of Object.entries(answers)) {
    const step = decisionSteps.find((s) => s.id === stepId);
    if (!step) continue;
    const option = step.options.find((o) => o.id === optionId);
    if (!option) continue;
    for (const [key, val] of Object.entries(option.value)) {
      scores[key] = (scores[key] || 0) + val;
    }
  }

  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .filter(([, score]) => score > 0)
    .map(([key, score], index) => ({
      ...recommendations[key],
      priority: index + 1,
    }));
}
