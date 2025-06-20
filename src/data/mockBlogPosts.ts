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
  difficulty?: number; // 1-3
  savingsPotential?: string;
  paybackTime?: string;
  fundingAvailable?: string;
  effortLevel?: string;
  keyBenefits?: string[];
  importantNotice?: string;
  tableOfContents?: { id: string; title: string }[];
  costs?: { item: string; costPerSqm: string; totalCost: string; funding: string }[];
}

// Erweiterte Mock-Daten für Demo-Zwecke
export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Heizung modernisieren: Bis zu 40% Energiekosten sparen',
    excerpt: 'Erfahren Sie, welche modernen Heizsysteme sich lohnen und wie Sie staatliche Förderungen optimal nutzen können.',
    content: `# Heizung modernisieren: Bis zu 40% Energiekosten sparen

<p>Eine veraltete Heizungsanlage kann Ihre Energiekosten unnötig in die Höhe treiben. Mit einer modernen, effizienten Heizung können Sie bis zu 40% Ihrer jährlichen Heizkosten einsparen und gleichzeitig einen wichtigen Beitrag zum Klimaschutz leisten.</p>

## Wann sollten Sie Ihre Heizung modernisieren?

<p>Die Entscheidung für eine Heizungsmodernisierung sollte nicht nur vom Alter der Anlage abhängen. Hier sind die wichtigsten Indikatoren:</p>

### Technische Indikatoren
- **Heizungsanlage ist älter als 15 Jahre**: Ab diesem Alter sinkt die Effizienz deutlich
- **Häufige Reparaturen**: Steigen die Reparaturkosten über 50% einer Neuanlage
- **Hoher Energieverbrauch**: Verbrauch deutlich über dem Durchschnitt ähnlicher Gebäude
- **Ungleichmäßige Wärmeverteilung**: Einzelne Räume werden nicht mehr richtig warm

### Wirtschaftliche Faktoren
- **Steigende Energiekosten**: Besonders bei alten Öl- und Gasheizungen
- **Niedrige Zinsen**: Günstige Finanzierungsmöglichkeiten nutzen
- **Hohe Förderungen**: Aktuell bis zu 70% staatliche Unterstützung möglich

## Die besten Heizsysteme 2024

### Luft-Wasser-Wärmepumpen
<p>**Effizienz**: Jahresarbeitszahl 3,0-4,5<br>
**Kosten**: 12.000-20.000€ für Ein- bis Zweifamilienhaus<br>
**Förderung**: Bis zu 70% durch BAFA</p>

**Vorteile:**
- Sehr niedrige Betriebskosten
- Klimafreundlich bei Ökostrom
- Wartungsarm
- Kombinierbar mit Photovoltaik

**Nachteile:**
- Höhere Anschaffungskosten
- Bei sehr alten Gebäuden ggf. zusätzliche Dämmung nötig

### Gas-Brennwerttechnik mit erneuerbaren Energien
<p>**Effizienz**: Normnutzungsgrad bis 98%<br>
**Kosten**: 8.000-15.000€ inkl. Installation<br>
**Förderung**: 30% bei Hybrid-Systemen</p>

**Besonders geeignet für:**
- Übergangszeit bis zum kompletten Umstieg
- Kombination mit Solarthermie
- Gut gedämmte Bestandsgebäude

### Pelletheizungen
<p>**Effizienz**: Wirkungsgrad bis 95%<br>
**Kosten**: 15.000-25.000€ komplett<br>
**Förderung**: Bis zu 35% Zuschuss</p>

**Ideal für:**
- Ländliche Gebiete mit Platz für Lagerung
- Umweltbewusste Hausbesitzer
- Unabhängigkeit von fossilen Brennstoffen

## Staatliche Förderungen optimal nutzen

### BAFA-Förderung 2024
Die Bundesförderung für effiziente Gebäude (BEG) bietet attraktive Zuschüsse:

**Wärmepumpen:**
- Grundförderung: 25%
- Effizienzbonus: +5%
- Klimageschwindigkeitsbonus: +20%
- Einkommensbonus: +30% (bei zu versteuerndem Einkommen unter 40.000€)
- **Maximum: 70% Förderung**

**Biomasse- und Solarthermieanlagen:**
- Grundförderung: 10%
- Effizienzbonus: +5%
- Emissionsminderungsbonus: +2,5%
- Klimageschwindigkeitsbonus: +20%

### KfW-Kredite
- **KfW 261**: Bis zu 150.000€ pro Wohneinheit
- **Zinssatz**: Ab 0,01% effektiver Jahreszins
- **Tilgungszuschuss**: Bis zu 37.500€ möglich

### Wichtige Tipps zur Antragstellung
1. **Antrag vor Vertragsabschluss stellen**
2. **Energieberater hinzuziehen** (wird auch gefördert)
3. **Verschiedene Fördertöpfe kombinieren**
4. **Fristen beachten** (meist 6 Monate Umsetzungszeit)

## Schritt-für-Schritt zum neuen Heizsystem

### 1. Ist-Analyse (Woche 1-2)
- Energieberatung durch zertifizierten Experten
- Analyse der Gebäudehülle
- Berechnung des Wärmebedarfs
- Prüfung der bestehenden Infrastruktur

### 2. Systemauswahl (Woche 3-4)
- Vergleich verschiedener Heizsysteme
- Wirtschaftlichkeitsberechnung
- Prüfung der Fördermöglichkeiten
- Angebotseinholung von Fachbetrieben

### 3. Förderantrag (Woche 5-6)
- Antragstellung bei BAFA/KfW
- Einreichung aller erforderlichen Unterlagen
- Warten auf Förderzusage (4-8 Wochen)

### 4. Installation (Woche 10-12)
- Beauftragung des Fachbetriebs
- Demontage der alten Anlage
- Installation des neuen Systems
- Inbetriebnahme und Einweisung

## Häufige Fehler vermeiden

### Dimensionierung
**Häufiger Fehler**: Heizung zu groß dimensioniert
**Lösung**: Professionelle Heizlastberechnung nach DIN EN 12831

### Hydraulischer Abgleich
**Häufiger Fehler**: Verzicht auf hydraulischen Abgleich
**Lösung**: Immer durchführen - wird zusätzlich gefördert

### Fördermittel
**Häufiger Fehler**: Antrag zu spät gestellt
**Lösung**: Erst Förderantrag, dann Angebot annehmen

## Fazit und Ausblick

<p>Der Heizungstausch ist eine der effektivsten Maßnahmen zum Energiesparen und Klimaschutz. Mit den aktuellen Förderprogrammen war der Zeitpunkt für eine Modernisierung nie günstiger. Wichtig ist eine professionelle Planung und die optimale Nutzung der verfügbaren Förderungen.</p>

**Die wichtigsten Erfolgsfaktoren:**
- Energieberatung als Basis
- Passende Systemauswahl für Ihr Gebäude
- Professionelle Installation durch Fachbetrieb  
- Optimale Nutzung der Fördermittel

<p>Beginnen Sie noch heute mit der Planung - Ihre Energiekosten und das Klima werden es Ihnen danken!</p>`,
    topic: 'Heizung modernisieren',
    topicColor: siteConfig.contentTopics.find(t => t.id === 'heizung')?.color || '#dc2626',
    publishedAt: '2024-01-15',
    readTime: 8,
    slug: 'heizung-modernisieren-energiekosten-sparen',
    seoTitle: 'Heizung modernisieren 2024: Bis zu 40% sparen + 70% Förderung',
    seoDescription: 'Heizung modernisieren und bis zu 40% Energiekosten sparen. Alle Fördermittel, beste Heizsysteme und Schritt-für-Schritt Anleitung.',
    keywords: ['Heizung modernisieren', 'Energiekosten sparen', 'Wärmepumpe', 'BAFA Förderung'],
    difficulty: 2,
    savingsPotential: 'Bis zu 40%',
    paybackTime: '8-12 Jahre',
    fundingAvailable: 'Ja, bis zu 70%',
    effortLevel: 'Mittel bis hoch',
    keyBenefits: [
      'Bis zu 40% weniger Heizkosten',
      'Staatliche Förderung bis 70%',
      'Wertsteigerung der Immobilie',
      'Klimaschutz und Nachhaltigkeit',
      'Zukunftssichere Technologie',
      'Unabhängigkeit von fossilen Brennstoffen'
    ],
    importantNotice: 'Förderanträge müssen vor Vertragsabschluss gestellt werden. Eine Energieberatung ist empfehlenswert und wird ebenfalls gefördert.',
    tableOfContents: [
      { id: 'wann-modernisieren', title: 'Wann modernisieren?' },
      { id: 'beste-systeme', title: 'Beste Heizsysteme 2024' },
      { id: 'foerderungen', title: 'Staatliche Förderungen' },
      { id: 'schritt-fuer-schritt', title: 'Schritt-für-Schritt Anleitung' },
      { id: 'fehler-vermeiden', title: 'Häufige Fehler vermeiden' }
    ],
    costs: [
      { item: 'Luft-Wärmepumpe', costPerSqm: '80-120€', totalCost: '12.000-20.000€', funding: 'Bis zu 70%' },
      { item: 'Gas-Brennwert', costPerSqm: '50-80€', totalCost: '8.000-15.000€', funding: 'Bis zu 30%' },
      { item: 'Pelletheizung', costPerSqm: '100-150€', totalCost: '15.000-25.000€', funding: 'Bis zu 35%' }
    ]
  },
  {
    id: '2', 
    title: 'Dämmung: Der Schlüssel zu niedrigen Heizkosten',
    excerpt: 'Eine gute Dämmung kann Ihre Heizkosten halbieren. Welche Dämmmaßnahmen sich am meisten lohnen und wie Sie optimal vorgehen.',
    content: `# Dämmung: Der Schlüssel zu niedrigen Heizkosten

<p>Ohne eine ordentliche Dämmung verpufft teure Heizenergie ungenutzt durch Wände, Dach und Keller. Eine professionelle Dämmung kann Ihre Heizkosten um bis zu 50% senken und ist oft die Grundvoraussetzung für effiziente Heizsysteme wie Wärmepumpen.</p>

## Warum ist Dämmung so wichtig?

### Die Physik dahinter
<p>Wärme fließt immer vom warmen zum kalten Bereich. Je größer der Temperaturunterschied und je schlechter die Dämmung, desto mehr Energie geht verloren. Eine gute Dämmung wirkt wie eine Thermoskanne für Ihr Haus.</p>

**Wärmeverluste im ungedämmten Haus:**
- Dach: 25-30%
- Außenwände: 20-25%  
- Fenster: 15-20%
- Keller/Bodenplatte: 10-15%
- Lüftung: 10-15%

### Wirtschaftliche Vorteile
- **Sofortige Kosteneinsparung**: Niedrigere Heizkosten ab der ersten Heizperiode
- **Wertsteigerung**: Bessere Energieeffizienzklasse erhöht Immobilienwert
- **Zukunftssicherheit**: Schutz vor steigenden Energiepreisen
- **Komfortsteigerung**: Gleichmäßige Temperaturen, keine kalte Wände

## Die wichtigsten Dämmmaßnahmen im Detail

### Dach- und Obergeschossdeckendämmung

**Oberste Geschossdecke (nicht begehbar):**
- **Material**: Mineralwolle, Zellulose oder Einblasdämmung
- **Dicke**: 25-30 cm (WLG 035)
- **Kosten**: 15-25€/m²
- **Einsparung**: 15-20% der Heizkosten

**Dachschrägen (von innen):**
- **Material**: Mineralwolle zwischen/unter den Sparren
- **Dicke**: 18-24 cm
- **Kosten**: 40-80€/m²
- **Zusatznutzen**: Ausgebauter Dachboden nutzbar

**Aufsparrendämmung (von außen):**
- **Vorteil**: Keine Wärmebrücken, volle Raumnutzung
- **Nachteil**: Höhere Kosten, nur bei Dachsanierung sinnvoll
- **Kosten**: 150-250€/m²

### Außenwanddämmung

**Wärmedämmverbundsystem (WDVS):**
- **Material**: EPS, Mineralwolle oder Holzfaser
- **Dicke**: 14-20 cm
- **Kosten**: 120-180€/m²
- **Lebensdauer**: 30-40 Jahre

**Kerndämmung (zweischaliges Mauerwerk):**
- **Verfahren**: Einblasung von Dämmstoff in Hohlschicht
- **Kosten**: 15-25€/m²
- **Vorteil**: Keine optische Veränderung der Fassade

**Innendämmung:**
- **Wann sinnvoll**: Denkmalschutz, keine Außendämmung möglich
- **Nachteile**: Wärmebrücken, Raumverlust, Feuchteschutz beachten
- **Kosten**: 40-100€/m²

### Keller- und Bodenplattendämmung

**Kellerdeckendämmung von unten:**
- **Material**: Dämmplatten aus EPS oder Mineralwolle
- **Dicke**: 10-14 cm
- **Kosten**: 25-40€/m²
- **Vorteil**: Einfache Montage, wärmere Böße im EG

**Perimeterdämmung (Außendämmung Keller):**
- **Wann**: Bei ohnehin anstehender Kellersanierung
- **Material**: Extrudierter Polystyrol (XPS)
- **Kosten**: 80-120€/m²

## Dämmstoffe im Vergleich

### Synthetische Dämmstoffe
**EPS (Styropor):**
- Günstig, einfach zu verarbeiten
- WLG 032-040
- Brandverhalten: normal entflammbar

**XPS (Extrudierter Polystyrol):**
- Wasserabweisend, druckfest
- Ideal für Perimeterdämmung
- Höhere Kosten als EPS

### Mineralische Dämmstoffe
**Mineralwolle (Glas-/Steinwolle):**
- Nicht brennbar, dampfdiffusionsoffen
- WLG 032-040
- Gut für Dachschrägen geeignet

**Kalziumsilikat:**
- Feuchteregulierend, schimmelhemmend
- Ideal für Innendämmung
- Höhere Kosten

### Natürliche Dämmstoffe
**Holzfaser:**
- Nachwachsend, guter Hitzeschutz
- WLG 040-050
- Höhere Kosten, ökologisch vorteilhaft

**Zellulose:**
- Recyclingprodukt, gute Einblasdämmung
- WLG 040
- Günstig, umweltfreundlich

## Förderungen und Finanzierung

### BAFA-Förderung
**Einzelmaßnahmen:**
- Dachdämmung: 15% Zuschuss
- Außenwanddämmung: 15% Zuschuss  
- Kellerdeckendämmung: 15% Zuschuss
- **iSFP-Bonus**: +5% bei Sanierungsfahrplan

### KfW-Programme
**KfW 261 - Wohngebäude Kredit:**
- Bis zu 150.000€ pro Wohneinheit
- Tilgungszuschuss bis 37.500€
- Ab 0,01% Zinssatz

**KfW 461 - Wohngebäude Zuschuss:**
- Direktzuschuss ohne Kredit
- Bis zu 75.000€ pro Wohneinheit

### Steuerliche Absetzbarkeit
- 20% über 3 Jahre absetzbar (max. 40.000€)
- Alternativ zu BAFA/KfW-Förderung
- Einfacher Antrag über Steuererklärung

## Schritt-für-Schritt Vorgehen

### 1. Analyse und Planung
- **Energieberatung**: Schwachstellenanalyse mit Thermografie
- **Sanierungsfahrplan**: Optimale Reihenfolge der Maßnahmen
- **Wirtschaftlichkeitsberechnung**: ROI und Amortisationszeit

### 2. Priorisierung der Maßnahmen
**Reihenfolge nach Wirtschaftlichkeit:**
1. Oberste Geschossdecke
2. Kellerdecke  
3. Außenwände
4. Dachschrägen

### 3. Fachbetrieb finden
- **Qualifikation prüfen**: Zertifizierungen und Referenzen
- **Mehrere Angebote**: Mindestens 3 Kostenvoranschläge
- **Garantien**: Gewährleistung und Versicherung

### 4. Qualitätssicherung
- **Blower-Door-Test**: Luftdichtheit prüfen
- **Thermografie**: Wärmebrücken aufspüren
- **Abnahme**: Fachgerechte Ausführung kontrollieren

## Häufige Fehler und wie Sie sie vermeiden

### Planungsfehler
❌ **Fehler**: Dämmung zu dünn dimensioniert
✅ **Lösung**: Mindestdicken nach EnEV beachten, besser überdämmen

❌ **Fehler**: Wärmebrücken nicht berücksichtigt
✅ **Lösung**: Durchgehende Dämmebene planen

### Ausführungsfehler
❌ **Fehler**: Unsaubere Verklebung der Dämmplatten
✅ **Lösung**: Qualifizierte Handwerker, Qualitätskontrolle

❌ **Fehler**: Unzureichende Luftdichtheit
✅ **Lösung**: Blower-Door-Test vor und nach der Sanierung

### Feuchteschäden
❌ **Fehler**: Keine dampfbremsende Schicht
✅ **Lösung**: Feuchteschutzkonzept vom Fachmann

## Fazit und Handlungsempfehlungen

<p>Dämmung ist die Basis jeder energetischen Sanierung und die Voraussetzung für niedrige Heizkosten. Beginnen Sie mit den wirtschaftlichsten Maßnahmen: Oberste Geschossdecke und Kellerdecke lassen sich oft mit geringem Aufwand und hoher Wirkung realisieren.</p>

**Ihre nächsten Schritte:**
1. **Energieberatung beauftragen** (wird zu 80% gefördert)
2. **Sanierungsfahrplan erstellen lassen**
3. **Mit einfachen Maßnahmen beginnen** (Kellerdecke, oberste Geschossdecke)
4. **Förderanträge rechtzeitig stellen**
5. **Qualifizierte Fachbetriebe beauftragen**

<p>Mit der richtigen Planung und Umsetzung wird Ihr Haus zur Energiesparimmobilie - gut für Ihren Geldbeutel und die Umwelt!</p>`,
    topic: 'Dämmung & Isolierung',
    topicColor: siteConfig.contentTopics.find(t => t.id === 'daemmung')?.color || '#7c3aed',
    publishedAt: '2024-01-12',
    readTime: 7,
    slug: 'daemmung-heizkosten-sparen',
    seoTitle: 'Dämmung: Heizkosten halbieren + alle Fördermittel 2024',
    seoDescription: 'Mit der richtigen Dämmung Heizkosten halbieren. Welche Maßnahmen sich lohnen, Kosten, Förderungen und Schritt-für-Schritt Anleitung.',
    keywords: ['Dämmung', 'Heizkosten sparen', 'KfW Förderung', 'Fassadendämmung'],
    difficulty: 2,
    savingsPotential: 'Bis zu 50%',
    paybackTime: '10-15 Jahre',
    fundingAvailable: 'Ja, bis zu 50%',
    effortLevel: 'Mittel bis hoch',
    keyBenefits: [
      'Bis zu 50% weniger Heizkosten',
      'Gleichmäßige, behagliche Temperaturen',
      'Schutz vor Feuchtigkeit und Schimmel',
      'Wertsteigerung der Immobilie',
      'Bessere Energieeffizienzklasse',
      'Lärmschutz als Zusatznutzen'
    ],
    importantNotice: 'Eine fachgerechte Planung ist entscheidend. Unsachgemäße Dämmung kann zu Feuchteschäden führen.',
    tableOfContents: [
      { id: 'warum-daemmung', title: 'Warum ist Dämmung wichtig?' },
      { id: 'wichtigste-massnahmen', title: 'Wichtigste Dämmmaßnahmen' },
      { id: 'daemmstoffe-vergleich', title: 'Dämmstoffe im Vergleich' },
      { id: 'foerderungen', title: 'Förderungen und Finanzierung' },
      { id: 'vorgehen', title: 'Schritt-für-Schritt Vorgehen' }
    ],
    costs: [
      { item: 'Dachbodendämmung', costPerSqm: '15-25€', totalCost: '2.000-4.000€', funding: '15-20%' },
      { item: 'Fassadendämmung', costPerSqm: '120-180€', totalCost: '15.000-25.000€', funding: '15-20%' },
      { item: 'Kellerdeckendämmung', costPerSqm: '25-40€', totalCost: '3.000-5.000€', funding: '15-20%' }
    ]
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
    keywords: ['Fördermittel 2024', 'BAFA', 'KfW', 'Sanierung Zuschuss'],
    difficulty: 1,
    savingsPotential: 'Bis zu 70%',
    paybackTime: 'Sofort',
    fundingAvailable: 'Ja, das ist das Thema',
    effortLevel: 'Niedrig',
    keyBenefits: [
      'Bis zu 70% der Kosten erstattet',
      'Verschiedene Programme kombinierbar',
      'Zinsgünstige KfW-Kredite',
      'Steuerliche Absetzbarkeit möglich'
    ]
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
    keywords: ['Wärmepumpe', 'Gas Brennwert', 'Heizung Vergleich', 'Heizkosten'],
    difficulty: 2,
    savingsPotential: 'Bis zu 60%',
    paybackTime: '8-15 Jahre',
    fundingAvailable: 'Ja, unterschiedlich',
    effortLevel: 'Mittel'
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
    keywords: ['Photovoltaik', 'Solaranlage', 'Eigenverbrauch', 'Einspeisevergütung'],
    difficulty: 2,
    savingsPotential: 'Bis zu 80%',
    paybackTime: '8-12 Jahre',
    fundingAvailable: 'Ja, regional unterschiedlich',
    effortLevel: 'Mittel'
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
    keywords: ['Fenster erneuern', '3-fach Verglasung', 'U-Wert', 'Wärmeschutz'],
    difficulty: 1,
    savingsPotential: 'Bis zu 25%',
    paybackTime: '15-20 Jahre',
    fundingAvailable: 'Ja, 15% Zuschuss',
    effortLevel: 'Niedrig bis mittel'
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
    keywords: ['Smart Home', 'Thermostat', 'Heizungssteuerung', 'Energie sparen'],
    difficulty: 1,
    savingsPotential: 'Bis zu 15%',
    paybackTime: '2-4 Jahre',
    fundingAvailable: 'Nein',
    effortLevel: 'Niedrig'
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
    keywords: ['Kellerdecke dämmen', 'Kellerdeckendämmung', 'kalte Füße', 'Wärmeverlust'],
    difficulty: 1,
    savingsPotential: 'Bis zu 15%',
    paybackTime: '5-8 Jahre',
    fundingAvailable: 'Ja, 15% Zuschuss',
    effortLevel: 'Niedrig'
  },
  {
    id: '9',
    title: 'Balkonkraftwerk 2025: Strom vom eigenen Balkon',
    excerpt: 'Mit einem Balkonkraftwerk erzeugen Sie Solarstrom selbst. So funktioniert die Mini-PV-Anlage und was Sie beachten sollten.',
    content: `# Balkonkraftwerk 2025: Strom vom eigenen Balkon

Mini-Photovoltaikanlagen machen Sie unabhängiger vom Stromanbieter und lassen sich fast überall installieren.

## Vorteile der Mini-PV-Anlage
- Einfache Montage ohne Fachbetrieb
- Anschaffungskosten ab 500€
- Senkt die Stromrechnung spürbar

## Installation und Förderung
Vor dem Anschluss muss das Balkonkraftwerk beim Netzbetreiber gemeldet werden. Manche Bundesländer bieten Zuschüsse an.

## Fazit
Mit einem Balkonkraftwerk nutzen Sie die Sonne optimal und produzieren Ihren eigenen Strom.`,
    topic: 'Solarenergie',
    topicColor: siteConfig.contentTopics.find(t => t.id === 'solar')?.color || '#f59e0b',
    publishedAt: '2024-07-04',
    readTime: 4,
    slug: 'balkonkraftwerk-2025-mini-pv',
    seoTitle: 'Balkonkraftwerk 2025: Mini-PV-Anlage Kosten & Tipps',
    seoDescription: 'Balkonkraftwerk 2025: Installation, Kosten und mögliche Förderungen für die eigene Mini-Solaranlage.',
    keywords: ['Balkonkraftwerk', 'Mini-PV', 'Solar Balkonanlage', 'Eigenverbrauch'],
    difficulty: 1,
    savingsPotential: 'Bis zu 15% Stromkosten',
    paybackTime: '5-7 Jahre',
    fundingAvailable: 'Regional möglich',
    effortLevel: 'Niedrig'
  }
];
