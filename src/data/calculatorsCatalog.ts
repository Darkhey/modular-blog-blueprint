import {
  Flame,
  Home,
  Sun,
  Calculator,
  Scale,
  Euro,
  TrendingUp,
  Zap,
  ClipboardList,
  PlaneTakeoff,
  Wallet,
  CheckSquare,
  type LucideIcon,
} from 'lucide-react';

export type CalculatorCategory = 'energie' | 'kosten' | 'foerderung' | 'planung' | 'vergleich';
export type CalculatorBadge = 'Detailrechner' | 'Quick-Check' | 'Vergleich' | 'Planer';

export interface CalculatorEntry {
  id: string;
  title: string;
  shortTitle?: string;
  description: string;
  route: string;
  icon: LucideIcon;
  category: CalculatorCategory;
  badge: CalculatorBadge;
  /** Used by RelatedCalculators to find topical matches */
  topics: string[];
  /** Tailwind gradient classes for accents */
  gradient: string;
  highlight?: string;
}

export const calculatorsCatalog: CalculatorEntry[] = [
  {
    id: 'heizkostenrechner',
    title: 'Heizkostenrechner',
    description: 'Sparpotenzial bei Heizungstausch berechnen – inkl. Smart-Home-Effekt und Förderung.',
    route: '/heizkostenrechner',
    icon: Flame,
    category: 'energie',
    badge: 'Detailrechner',
    topics: ['heizung', 'waermepumpe', 'gas', 'modernisierung'],
    gradient: 'from-red-500 to-orange-500',
    highlight: 'bis 40 % sparen',
  },
  {
    id: 'daemmungsrechner',
    title: 'Dämmungsrechner',
    description: 'Optimale Dämmstärke und U-Wert ermitteln – Materialien im Vergleich.',
    route: '/daemmungsrechner',
    icon: Home,
    category: 'energie',
    badge: 'Detailrechner',
    topics: ['daemmung', 'fassade', 'dach', 'keller', 'u-wert'],
    gradient: 'from-blue-500 to-cyan-500',
    highlight: 'bis 50 % weniger',
  },
  {
    id: 'solarrechner',
    title: 'Solarrechner',
    description: 'PV-Ertrag, Speicher, Wallbox und 20-Jahres-Prognose mit regionalem Sonnenertrag.',
    route: '/solarenergie#rechner',
    icon: Sun,
    category: 'energie',
    badge: 'Detailrechner',
    topics: ['solar', 'photovoltaik', 'pv', 'batterie', 'wallbox'],
    gradient: 'from-amber-500 to-yellow-500',
    highlight: 'bis 70 % weniger Stromkosten',
  },
  {
    id: 'kostenrechner',
    title: 'Sanierungs-Kostenrechner',
    description: 'Mehrere Gewerke kombinieren, Förderung abziehen und Ergebnis als PDF exportieren.',
    route: '/kostenrechner',
    icon: Calculator,
    category: 'kosten',
    badge: 'Detailrechner',
    topics: ['kosten', 'gewerk', 'pdf', 'gesamt'],
    gradient: 'from-emerald-500 to-teal-500',
    highlight: 'PDF-Export',
  },
  {
    id: 'rechner-vergleich',
    title: 'Maßnahmen-Vergleich',
    description: 'Heizung, Dämmung und Solar Seite an Seite – Investition, Ersparnis und CO₂.',
    route: '/rechner-vergleich',
    icon: Scale,
    category: 'vergleich',
    badge: 'Vergleich',
    topics: ['vergleich', 'kombination', 'planung'],
    gradient: 'from-indigo-500 to-purple-500',
    highlight: 'alle Maßnahmen',
  },
  {
    id: 'foerderrechner',
    title: 'Förderrechner',
    description: 'BAFA, KfW und regionale Programme kombinieren – aktuelle Bundesförderprogramme.',
    route: '/foerderrechner',
    icon: Euro,
    category: 'foerderung',
    badge: 'Quick-Check',
    topics: ['foerderung', 'bafa', 'kfw', 'zuschuss'],
    gradient: 'from-emerald-600 to-green-500',
    highlight: 'bis 70 % Zuschuss',
  },
  {
    id: 'roi-rechner',
    title: 'Amortisations-Rechner',
    description: 'Wann rechnet sich Ihre Investition? Payback-Zeit und ROI auf einen Blick.',
    route: '/roi-rechner',
    icon: TrendingUp,
    category: 'kosten',
    badge: 'Quick-Check',
    topics: ['amortisation', 'roi', 'wirtschaftlichkeit'],
    gradient: 'from-fuchsia-500 to-pink-500',
    highlight: 'Payback in Jahren',
  },
  {
    id: 'energie-check',
    title: 'Energie-Check',
    description: 'Schnelle Einschätzung Ihres Sanierungsbedarfs in unter zwei Minuten.',
    route: '/energie-check',
    icon: Zap,
    category: 'planung',
    badge: 'Quick-Check',
    topics: ['energie', 'check', 'bedarf'],
    gradient: 'from-yellow-500 to-amber-500',
    highlight: '< 2 Minuten',
  },
  {
    id: 'sanierungscheck',
    title: 'Sanierungscheck-Wizard',
    description: 'In 6 Schritten zur priorisierten Empfehlung mit Förderprognose.',
    route: '/sanierungscheck',
    icon: ClipboardList,
    category: 'planung',
    badge: 'Planer',
    topics: ['sanierung', 'priorisierung', 'wizard'],
    gradient: 'from-teal-500 to-emerald-500',
    highlight: 'Empfehlung & Plan',
  },
  {
    id: 'projektplaner',
    title: 'Projektplaner',
    description: 'Phasen, Reihenfolge und Zeitachse Ihrer Sanierung strukturiert planen.',
    route: '/projektplaner',
    icon: PlaneTakeoff,
    category: 'planung',
    badge: 'Planer',
    topics: ['projekt', 'planung', 'phasen'],
    gradient: 'from-sky-500 to-blue-500',
  },
  {
    id: 'budgetplan',
    title: 'Budgetplaner',
    description: 'Material, Lohn, Reserve – realistischer Budgetrahmen mit Förder-Hinweisen.',
    route: '/budgetplan',
    icon: Wallet,
    category: 'kosten',
    badge: 'Planer',
    topics: ['budget', 'kosten', 'reserve'],
    gradient: 'from-emerald-500 to-lime-500',
  },
  {
    id: 'sanierungschecklisten',
    title: 'Sanierungschecklisten',
    description: 'Interaktive Checklisten für jede Phase – Vor, während und nach der Sanierung.',
    route: '/sanierungschecklisten',
    icon: CheckSquare,
    category: 'planung',
    badge: 'Planer',
    topics: ['checkliste', 'planung', 'phasen'],
    gradient: 'from-violet-500 to-indigo-500',
  },
];

export const calculatorCategories: { id: CalculatorCategory; label: string; description: string }[] = [
  { id: 'energie', label: 'Energie', description: 'Heizung, Dämmung, Solar' },
  { id: 'kosten', label: 'Kosten & ROI', description: 'Investition, Amortisation, Budget' },
  { id: 'foerderung', label: 'Förderung', description: 'BAFA, KfW, regional' },
  { id: 'vergleich', label: 'Vergleich', description: 'Maßnahmen direkt gegenüberstellen' },
  { id: 'planung', label: 'Planung', description: 'Wizards, Checklisten, Projektplaner' },
];

export function getRelatedCalculators(topics: string[], excludeIds: string[] = [], limit = 3): CalculatorEntry[] {
  const scored = calculatorsCatalog
    .filter((c) => !excludeIds.includes(c.id))
    .map((c) => ({
      c,
      score: c.topics.filter((t) => topics.includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.c);
}

export function getCalculatorsByCategory(category: CalculatorCategory): CalculatorEntry[] {
  return calculatorsCatalog.filter((c) => c.category === category);
}
