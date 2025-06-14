
import { siteConfig } from '@/config/site.config';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  topic: string;
  topicColor: string;
  publishedAt: string;
  readTime: number;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
}

// Erweiterte Mock-Daten für Demo-Zwecke
export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Heizung modernisieren: Bis zu 40% Energiekosten sparen',
    excerpt: 'Erfahren Sie, welche modernen Heizsysteme sich lohnen und wie Sie staatliche Förderungen optimal nutzen können.',
    content: `# Heizung modernisieren: Bis zu 40% Energiekosten sparen

Eine veraltete Heizungsanlage kann Ihre Energiekosten unnötig in die Höhe treiben. Mit einer modernen, effizienten Heizung können Sie bis zu 40% Ihrer jährlichen Heizkosten einsparen.

## Wann sollten Sie Ihre Heizung modernisieren?

- Heizungsanlage ist älter als 15 Jahre
- Hohe Reparaturkosten
- Steigende Energiekosten
- Ungleichmäßige Wärmeverteilung

## Die besten Heizsysteme 2024

### Wärmepumpen
Wärmepumpen nutzen Umweltenergie und sind besonders effizient. Die Investition amortisiert sich bereits nach 8-12 Jahren.

### Gas-Brennwerttechnik
Moderne Gas-Brennwertgeräte nutzen auch die Wärme der Abgase und erreichen Wirkungsgrade von über 90%.

## Staatliche Förderungen nutzen

Die BAFA fördert den Heizungstausch mit bis zu 70% der Investitionskosten. Besonders attraktiv sind die Zuschüsse für Wärmepumpen.

## Fazit

Der Heizungstausch ist eine der effektivsten Maßnahmen zum Energiesparen. Mit den aktuellen Förderprogrammen war der Zeitpunkt nie günstiger.`,
    topic: 'Heizung modernisieren',
    topicColor: siteConfig.contentTopics.find(t => t.id === 'heizung')?.color || '#dc2626',
    publishedAt: '2024-01-15',
    readTime: 5,
    slug: 'heizung-modernisieren-energiekosten-sparen',
    seoTitle: 'Heizung modernisieren 2024: Bis zu 40% sparen + Förderung',
    seoDescription: 'Heizung modernisieren und bis zu 40% Energiekosten sparen. Alle Fördermittel, beste Heizsysteme und Amortisation im Überblick.',
    keywords: ['Heizung modernisieren', 'Energiekosten sparen', 'Wärmepumpe', 'BAFA Förderung']
  },
  {
    id: '2', 
    title: 'Dämmung: Der Schlüssel zu niedrigen Heizkosten',
    excerpt: 'Eine gute Dämmung kann Ihre Heizkosten halbieren. Welche Dämmmaßnahmen sich am meisten lohnen.',
    content: `# Dämmung: Der Schlüssel zu niedrigen Heizkosten

Ohne eine ordentliche Dämmung verpufft teure Heizenergie ungenutzt. Eine professionelle Dämmung kann Ihre Heizkosten um bis zu 50% senken.

## Die wichtigsten Dämmmaßnahmen

### Dach und Dachboden
Über das Dach geht am meisten Wärme verloren. Eine Dachdämmung amortisiert sich bereits nach 10-15 Jahren.

### Außenwände
Die Fassadendämmung ist optisch auffällig, aber sehr effektiv. WDVS-Systeme sind bewährt und langlebig.

### Keller und Bodenplatte
Oft übersehen: Eine Kellerdämmung reduziert kalte Füße und spart Energie.

## Kosten und Förderung

Die KfW fördert Dämmmaßnahmen mit zinsgünstigen Krediten und Tilgungszuschüssen. Bei Komplettsanierungen sind bis zu 150.000€ Kredit möglich.

## Fazit

Dämmung ist die Basis jeder energetischen Sanierung. Beginnen Sie mit dem Dach - hier ist das Einsparpotential am größten.`,
    topic: 'Dämmung & Isolierung',
    topicColor: siteConfig.contentTopics.find(t => t.id === 'daemmung')?.color || '#7c3aed',
    publishedAt: '2024-01-12',
    readTime: 4,
    slug: 'daemmung-heizkosten-sparen',
    seoTitle: 'Dämmung: Heizkosten halbieren + alle Fördermittel 2024',
    seoDescription: 'Mit der richtigen Dämmung Heizkosten halbieren. Welche Maßnahmen sich lohnen und wie Sie Förderungen optimal nutzen.',
    keywords: ['Dämmung', 'Heizkosten sparen', 'KfW Förderung', 'Fassadendämmung']
  },
  {
    id: '3',
    title: 'Fördermittel 2024: Diese Zuschüsse sollten Sie kennen',
    excerpt: 'Bis zu 70% Zuschuss für Ihre Sanierung. Ein Überblick über alle aktuellen Förderprogramme von Bund und Ländern.',
    content: `# Fördermittel 2024: Diese Zuschüsse sollten Sie kennen

Der Staat fördert energetische Sanierungen mit attraktiven Zuschüssen. Bis zu 70% der Kosten können erstattet werden.

## BAFA-Förderung

Das Bundesamt für Wirtschaft und Ausfuhrkontrolle fördert:
- Wärmepumpen: bis zu 70%
- Solarthermie: bis zu 25%
- Biomasse-Heizungen: bis zu 20%

## KfW-Programme

### KfW 261: Wohngebäude - Kredit
- Bis zu 150.000€ pro Wohneinheit
- Tilgungszuschuss bis zu 37.500€
- Zinssatz ab 0,01%

### KfW 461: Wohngebäude - Zuschuss
- Direkter Zuschuss ohne Kredit
- Bis zu 75.000€ pro Wohneinheit

## Regionale Programme

Viele Bundesländer und Kommunen haben zusätzliche Programme. Diese können oft kombiniert werden.

## Antragstellung

Wichtig: Förderantrag VOR Beginn der Maßnahme stellen! Ein Energieberater hilft bei der optimalen Beantragung.

## Fazit

2024 sind die Förderbedingungen so attraktiv wie nie. Nutzen Sie die Chance für Ihre energetische Sanierung.`,
    topic: 'Fördermittel',
    topicColor: siteConfig.contentTopics.find(t => t.id === 'foerderung')?.color || '#059669',
    publishedAt: '2024-01-10',
    readTime: 6,
    slug: 'foerdermittel-2024-zuschuss-sanierung',
    seoTitle: 'Fördermittel 2024: Bis zu 70% Zuschuss für Sanierung',
    seoDescription: 'Alle Förderprogramme 2024 im Überblick. BAFA, KfW und regionale Zuschüsse für Ihre energetische Sanierung optimal kombinieren.',
    keywords: ['Fördermittel 2024', 'BAFA', 'KfW', 'Sanierung Zuschuss']
  },
  {
    id: '4',
    title: 'Wärmepumpe vs. Gas: Der große Vergleich 2024',
    excerpt: 'Wärmepumpe oder Gas-Brennwert? Wir vergleichen Kosten, Effizienz und Förderung der beiden Heizsysteme.',
    content: `# Wärmepumpe vs. Gas: Der große Vergleich 2024

Die Entscheidung zwischen Wärmepumpe und Gas-Brennwerttechnik beschäftigt viele Hausbesitzer. Wir zeigen Ihnen die Vor- und Nachteile beider Systeme.`,
    topic: 'Heizung modernisieren',
    topicColor: siteConfig.contentTopics.find(t => t.id === 'heizung')?.color || '#dc2626',
    publishedAt: '2024-01-08',
    readTime: 7,
    slug: 'waermepumpe-vs-gas-vergleich',
    seoTitle: 'Wärmepumpe vs. Gas 2024: Kosten, Effizienz & Förderung',
    seoDescription: 'Detaillierter Vergleich von Wärmepumpe und Gas-Brennwert. Kosten, Effizienz, Förderung und Umweltaspekte im Überblick.',
    keywords: ['Wärmepumpe', 'Gas Brennwert', 'Heizung Vergleich', 'Heizkosten']
  },
  {
    id: '5',
    title: 'Photovoltaik 2024: Lohnt sich eine Solaranlage noch?',
    excerpt: 'Trotz sinkender Einspeisevergütung kann sich Photovoltaik noch lohnen. Alle Fakten zu Kosten und Rendite.',
    content: `# Photovoltaik 2024: Lohnt sich eine Solaranlage noch?

Die Einspeisevergütung sinkt, aber Photovoltaik kann sich trotzdem noch lohnen. Der Eigenverbrauch macht den Unterschied.`,
    topic: 'Solarenergie',
    topicColor: siteConfig.contentTopics.find(t => t.id === 'solar')?.color || '#f59e0b',
    publishedAt: '2024-01-05',
    readTime: 5,
    slug: 'photovoltaik-2024-lohnt-sich-solaranlage',
    seoTitle: 'Photovoltaik 2024: Rentabilität und Kosten von Solaranlagen',
    seoDescription: 'Lohnt sich Photovoltaik 2024 noch? Kosten, Rendite und Eigenverbrauch von Solaranlagen im Detail erklärt.',
    keywords: ['Photovoltaik', 'Solaranlage', 'Eigenverbrauch', 'Einspeisevergütung']
  },
  {
    id: '6',
    title: 'Fenster erneuern: 3-fach Verglasung lohnt sich',
    excerpt: 'Moderne Fenster mit 3-fach Verglasung sparen nicht nur Energie, sondern steigern auch den Wohnkomfort erheblich.',
    content: `# Fenster erneuern: 3-fach Verglasung lohnt sich

Alte Fenster sind oft die größten Energieverschwender im Haus. Moderne 3-fach verglaste Fenster können hier deutliche Verbesserungen bringen.`,
    topic: 'Fenster & Türen',
    topicColor: siteConfig.contentTopics.find(t => t.id === 'fenster')?.color || '#8b5cf6',
    publishedAt: '2024-01-03',
    readTime: 4,
    slug: 'fenster-erneuern-3fach-verglasung',
    seoTitle: 'Fenster erneuern 2024: 3-fach Verglasung Kosten & Förderung',
    seoDescription: 'Fenster mit 3-fach Verglasung: Kosten, Einsparungen und Förderungen. Wann sich der Fenstertausch lohnt.',
    keywords: ['Fenster erneuern', '3-fach Verglasung', 'U-Wert', 'Wärmeschutz']
  },
  {
    id: '7',
    title: 'Smart Home Heizung: Intelligente Thermostate im Test',
    excerpt: 'Smarte Thermostate können bis zu 15% Energie sparen. Welche Modelle überzeugen und wie die Installation funktioniert.',
    content: `# Smart Home Heizung: Intelligente Thermostate im Test

Intelligente Heizkörperthermostate sind der einfachste Einstieg ins Smart Home. Sie sparen Energie und erhöhen den Komfort.`,
    topic: 'Smart Home',
    topicColor: siteConfig.contentTopics.find(t => t.id === 'smart-home')?.color || '#06b6d4',
    publishedAt: '2024-01-01',
    readTime: 6,
    slug: 'smart-home-heizung-thermostate-test',
    seoTitle: 'Smart Home Heizung: Thermostate Test & Kaufberatung 2024',
    seoDescription: 'Intelligente Thermostate im Test. Welche smarten Heizkörperthermostate sparen am meisten Energie und sind einfach zu installieren.',
    keywords: ['Smart Home', 'Thermostat', 'Heizungssteuerung', 'Energie sparen']
  },
  {
    id: '8',
    title: 'Kellerdecke dämmen: Einfach und effektiv',
    excerpt: 'Die Kellerdeckendämmung ist eine der einfachsten Dämmmaßnahmen. So sparen Sie Heizkosten und vermeiden kalte Füße.',
    content: `# Kellerdecke dämmen: Einfach und effektiv

Die Dämmung der Kellerdecke ist oft übersehen, aber sehr effektiv. Sie reduziert Wärmeverluste und sorgt für wärmere Böden im Erdgeschoss.`,
    topic: 'Dämmung & Isolierung',
    topicColor: siteConfig.contentTopics.find(t => t.id === 'daemmung')?.color || '#7c3aed',
    publishedAt: '2023-12-28',
    readTime: 3,
    slug: 'kellerdecke-daemmen-anleitung',
    seoTitle: 'Kellerdecke dämmen: Anleitung, Kosten & Materialien',
    seoDescription: 'Kellerdecke richtig dämmen: Schritt-für-Schritt Anleitung, beste Materialien und was die Dämmung kostet.',
    keywords: ['Kellerdecke dämmen', 'Kellerdeckendämmung', 'kalte Füße', 'Wärmeverlust']
  }
];
