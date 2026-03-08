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
const baseMockBlogPosts: BlogPost[] = [
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
    title: 'Fördermittel 2025: Diese Zuschüsse sollten Sie kennen',
    excerpt: 'Bis zu 70% Zuschuss für Ihre Sanierung. Ein Überblick über alle Förderprogramme 2025 von Bund, Ländern und Kommunen.',
    content: `# Fördermittel 2025: Diese Zuschüsse sollten Sie kennen

Der Staat fördert energetische Sanierungen auch 2025 mit attraktiven Zuschüssen. Bis zu 70% der Kosten können erstattet werden. Einen vollständigen Überblick finden Sie in unserem <a href="https://sanierenundsparen.de/themen/foerdermittel" target="_blank" rel="noopener">Ratgeber Fördermittel 2025</a>.

## BAFA-Förderung

Das Bundesamt für Wirtschaft und Ausfuhrkontrolle fördert unter anderem:
- [Wärmepumpen](https://www.bafa.de/DE/Energie/Energieeffizienz/Waermepumpe/waermepumpe_node.html) mit bis zu 70%
- [Solarthermie](https://www.bafa.de/DE/Energie/Energieeffizienz/Solarthermie/solarthermie_node.html) mit bis zu 25%
- [Biomasse-Heizungen](https://www.bafa.de/DE/Energie/Energieeffizienz/Biomasse/biomasse_node.html) mit bis zu 20%

## KfW-Programme

### <a href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestandsimmobilien/Energieeffizient-Sanieren-Kredit-(261-262)/" target="_blank" rel="noopener">KfW 261: Wohngebäude – Kredit</a>
- Bis zu 150.000€ pro Wohneinheit
- Tilgungszuschuss bis zu 37.500€
- Zinssatz ab 0,01%

### <a href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestandsimmobilien/Energieeffizient-Sanieren-Zuschuss-(461)/" target="_blank" rel="noopener">KfW 461: Wohngebäude – Zuschuss</a>
- Direkter Zuschuss ohne Kredit
- Bis zu 75.000€ pro Wohneinheit

## Regionale Programme

Viele Bundesländer und Kommunen bieten zusätzliche <a href="/themen/foerdermittel#regionale-programme">Programme</a>. Diese lassen sich häufig mit BAFA und KfW kombinieren.

## Antragstellung

Wichtig: Förderantrag <b>vor Beginn</b> der Maßnahme stellen! Ein <a href="https://www.energie-effizienz-experten.de/" target="_blank" rel="noopener">zertifizierter Energieberater</a> hilft bei der optimalen Beantragung.

## Fazit

2025 bleiben die Förderbedingungen attraktiv. Nutzen Sie die Chance und planen Sie jetzt Ihre energetische Sanierung.`,
    topic: 'Fördermittel',
    topicColor: siteConfig.contentTopics.find(t => t.id === 'foerderung')?.color || '#059669',
    publishedAt: '2025-01-10',
    readTime: 6,
    slug: 'foerdermittel-2025-zuschuss-sanierung',
    seoTitle: 'Fördermittel 2025: Bis zu 70% Zuschuss für Sanierung',
    seoDescription: 'Alle Förderprogramme 2025 im Überblick. BAFA, KfW und regionale Zuschüsse für Ihre energetische Sanierung optimal kombinieren.',
    keywords: ['Fördermittel 2025', 'BAFA', 'KfW', 'Sanierung Zuschuss'],
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
  },
{
    id: '10',
    title: 'Fenster & Türen richtig sanieren: Energiesparen, Sicherheit und Förderung',
    excerpt: 'Ratgeber: Wie moderne Fenster und Türen Kosten senken, Komfort erhöhen und welche Förderungen es 2025 gibt.',
    content: `# Fenster & Türen richtig sanieren: Energiesparen, Sicherheit und Förderung

Fenster und Außentüren zählen zu den größten Schwachstellen eines Gebäudes. Über alte Einfachverglasungen gehen bis zu 25% der Wärme verloren. Moderne Fenstersysteme mit Dreifachverglasung, gedämmten Rahmen und fachgerechter Abdichtung reduzieren diesen Verlust drastisch.

## Warum der Austausch lohnt
- **Energieeinsparung**: Aktuelle Fenstersysteme erreichen Uw-Werte unter 0.9 W/(m²K).
- **Komfortgewinn**: Keine Zugluft, besserer Schallschutz, mehr Tageslicht.
- **Sicherheit**: Neue Beschläge mit Pilzkopfverriegelung erfüllen RC2 oder höher.
- **Förderfähig**: Über die [Bundesförderung für effiziente Gebäude](https://www.bafa.de/DE/Energie/Energieeffizienz/BEG/beg_node.html) gibt es Zuschüsse, bei Kombination mit KfW-Krediten zusätzlich Tilgungszuschüsse.

## Typische Fenstertypen
1. **Dreh-Kipp-Fenster** – Standard, flexibel beim Lüften.
2. **Schiebefenster & -türen** – bodentiefe Verglasung ohne störende Flügel.
3. **Festverglasung** – besonders gut gedämmt, günstig bei großen Glasflächen.

Der Gesamt-U-Wert (Uw) hängt von Verglasung und Rahmen ab. Details zu den Materialarten finden Sie in unserem [Materialvergleich](https://sanierenundsparen.de/blog/fenstermaterialien-vergleich-kunststoff-holz-alu).

## Haustüren im Fokus
Haustüren prägen die Optik und müssen gleichzeitig hohen Sicherheitsanforderungen genügen. Gängige Modelle verfügen über Mehrfachverriegelung und stabile Schließbleche. Für Einfamilienhäuser wird mindestens Widerstandsklasse RC2 empfohlen. Weitere Informationen zum Einbruchschutz bietet die [Polizei-Beratung](https://www.polizei-beratung.de/themen-und-tipps/einbruch/).

## Förderprogramme 2025
Für den Austausch von Fenstern und Türen lässt sich die BEG-Zuschussförderung (BAFA) mit günstigen Krediten der [KfW-Bank](https://www.kfw.de/) kombinieren. Förderfähig sind nur Systeme, die die technischen Mindestanforderungen erfüllen (Uw < 0.95 W/(m²K) bzw. Ud < 1.3 W/(m²K)). Ein Energieberater muss den Antrag begleiten.

## Kostenüberblick (Richtwerte)
| Element | Preis pro Stück (inkl. Einbau) | Förderung |
|----------------------|---------------------------------|------------------|
| Kunststofffenster    | 400 - 800 € | bis 20% BEG |
| Holzfenster          | 600 - 1.200 € | bis 20% BEG |
| Alufenster           | 800 - 1.500 € | bis 20% BEG |
| Holz-Alu-Fenster     | 900 - 1.800 € | bis 20% BEG |
| Haustür (RC2)        | 1.500 - 3.000 € | je nach Modell |

Förderdetails und regionale Programme finden Sie unter [Energie-Förderprogramme.de](https://www.energie-foerderprogramme.de/).

## Ablauf einer Fenstersanierung
1. **Analyse & Beratung** – Energieberater beauftragen, U-Werte prüfen.
2. **Angebote einholen** – Fachbetriebe vergleichen, Material wählen.
3. **Förderantrag stellen** – Vor Vertragsabschluss.
4. **Montage** – Fachgerechte Abdichtung (RAL) vermeidet Bauschäden.
5. **Fördernachweis einreichen** – Rechnungen und Bestätigungen bei BAFA/KfW hochladen.

## Fazit
Der Tausch von Fenstern und Türen erhöht nicht nur die Energieeffizienz, sondern auch Komfort und Sicherheit. Dank staatlicher Förderung amortisiert sich die Investition schneller als viele denken. Weitere Tipps finden Sie auf [sanierenundsparen.de](https://sanierenundsparen.de/themen/fenster-tueren).
`,
    topic: 'Fenster & Türen',
    topicColor: siteConfig.contentTopics.find(t => t.id === 'fenster')?.color || '#0ea5e9',
    publishedAt: '2025-06-15',
    readTime: 12,
    slug: 'fenster-tueren-sanieren-ratgeber-2025',
    seoTitle: 'Fenster & Türen sanieren 2025: Förderung, Kosten & Sicherheit',
    seoDescription: 'Umfassender Ratgeber zu Fenstern und Türen. Energie sparen, Sicherheit erhöhen und alle Förderungen 2025.',
    keywords: ['Fenster', 'Türen', 'Fenster Sanierung', 'BEG Förderung', 'U-Wert'],
    difficulty: 2,
    savingsPotential: 'Bis zu 25% Heizkosten',
    paybackTime: '10-15 Jahre',
    fundingAvailable: 'Ja, BEG-Zuschuss',
    effortLevel: 'Mittel',
    keyBenefits: [
      'Weniger Wärmeverlust',
      'Mehr Sicherheit',
      'Wertsteigerung',
      'Förderungen nutzen'
    ],
    importantNotice: 'Alle Förderanträge müssen vor Vertragsabschluss gestellt werden.',
    tableOfContents: [
      { id: 'warum-austausch', title: 'Warum der Austausch lohnt' },
      { id: 'fenstertypen', title: 'Typische Fenstertypen' },
      { id: 'haustueren', title: 'Haustüren im Fokus' },
      { id: 'foerderung', title: 'Förderprogramme 2025' },
      { id: 'kosten', title: 'Kostenüberblick' },
      { id: 'ablauf', title: 'Ablauf der Sanierung' }
    ],
    costs: [
      { item: 'Kunststofffenster', costPerSqm: 'ca. 350€', totalCost: '400-800€', funding: 'bis 20%' },
      { item: 'Holzfenster', costPerSqm: 'ca. 500€', totalCost: '600-1.200€', funding: 'bis 20%' },
      { item: 'Alufenster', costPerSqm: 'ca. 700€', totalCost: '800-1.500€', funding: 'bis 20%' }
    ]
},
{
    id: '15',
    title: 'Fördermittel & Finanzierungsmodelle für Sanierungen – Zuschüsse, Kredite, Steuervorteile',
    excerpt:
      'So kombinieren Hausbesitzer Bundes-, Landes- und EU-Förderungen mit Krediten, Zuschüssen und Steuervorteilen – inklusive Checkliste zur Antragstellung.',
    content: `# Fördermittel & Finanzierungsmodelle für Sanierungen – Zuschüsse, Kredite, Steuervorteile

<p>Viele Hausbesitzer wissen nicht, welche Förderungen es gibt oder wie sie sie richtig beantragen. Auf www.sanierenundsparen.de zeigen wir dir Schritt für Schritt, wie du dir Zuschüsse sicherst und deine Sanierung solide finanzierst.</p>

<p>Ob Sanierung Fördermittel, KfW Zuschuss, Sanierung Finanzierung oder BAFA Förderung – dieser Leitfaden erklärt, welche Programme es gibt, welche Voraussetzungen gelten und wie du alles optimal kombinierst.</p>

<h2 id="inhaltsverzeichnis">Inhaltsverzeichnis</h2>
<ul>
  <li><a href="#foerderprogramme">Förderprogramme im Überblick</a></li>
  <li><a href="#voraussetzungen">Voraussetzungen</a></li>
  <li><a href="#finanzierungsmodelle">Finanzierungsmodelle</a></li>
  <li><a href="#praxis-tipps">Praxisnahe Tipps</a></li>
  <li><a href="#checkliste">Checkliste: So sicherst du dir Förderungen</a></li>
  <li><a href="#fazit">Fazit</a></li>
</ul>

<p><!-- AFFILIATE_DISCLOSURE -->
Hinweis: Einige Links sind Affiliate-Links. Wenn du darüber kaufst, erhalte ich eine kleine Provision, ohne Mehrkosten für dich.
</p>

<h2 id="foerderprogramme">Förderprogramme im Überblick</h2>
<p>Deutschlandweit stehen verschiedene Fördertöpfe bereit, die Sanierungskosten senken. Wer frühzeitig plant, kann Bundesprogramme mit Landesmitteln und kommunalen Zuschüssen kombinieren und so bis zu 70% der Ausgaben abdecken.</p>

<h3 id="foerderprogramme-bund">Bundesförderungen (BAFA &amp; KfW)</h3>
<ul>
  <li><strong>BAFA-Förderung</strong>: Zuschüsse von 15–70% für Wärmepumpen, Biomasse, Solarthermie und Effizienzmaßnahmen. Wichtig: Energieeffizienz-Experte einbinden und technische Mindestanforderungen erfüllen.</li>
  <li><strong>KfW-Förderkredite</strong>: Programme wie 261/262 für Sanierung zum Effizienzhaus mit Tilgungszuschüssen bis 45%. Der Kredit verbindet günstige Zinsen mit direkter Zuschusskomponente.</li>
  <li><strong>KfW-Zuschuss 461</strong>: Für Eigentümer, die ohne Kredit investieren möchten. Bis zu 75.000&nbsp;€ je Wohneinheit möglich.</li>
</ul>

<h3 id="foerderprogramme-laender">Landes- und Kommunalprogramme</h3>
<p>Viele Bundesländer bezuschussen ergänzend die Sanierung der Gebäudehülle, Energieberatung oder die Installation erneuerbarer Heiztechnik. Kommunen fördern oft individuelle Projekte wie Gründächer, Regenwassernutzung oder lokale Solarkampagnen. Prüfe in Fördermittel-Datenbanken oder beim Energieberater, welche Programme in deiner Region verfügbar sind.</p>

<h3 id="foerderprogramme-eu">EU-Initiativen</h3>
<p>Über EU-Töpfe wie REPowerEU und ELENA fließen Mittel in regionale Beratungsstellen und zinsgünstige Darlehen. Hausbesitzer profitieren indirekt durch kommunale Programme, vergünstigte Energieaudits oder zusätzliche Zuschüsse für innovative Technologien (z.&nbsp;B. Stromspeicher).</p>

<h2 id="voraussetzungen">Voraussetzungen</h2>
<p>Damit Fördermittel bewilligt werden, müssen technische, organisatorische und zeitliche Vorgaben eingehalten werden.</p>

<h3 id="voraussetzungen-energieberater">Energieberater-Pflicht &amp; technische Standards</h3>
<ul>
  <li>Für nahezu alle Programme ist ein <strong>zugelassener Energieeffizienz-Experte</strong> notwendig. Er erstellt die Fachplanung, bestätigt die technischen Daten und begleitet die Umsetzung.</li>
  <li>Die Maßnahme muss <strong>BEG-Mindesteffizienz</strong> erreichen, z.&nbsp;B. U-Werte für Dämmung oder Jahresarbeitszahlen für Wärmepumpen.</li>
  <li><strong>Nachweise</strong> wie Angebote, Rechnungen, Fotos und Protokolle (hydraulischer Abgleich, Inbetriebnahme) sind Pflicht.</li>
</ul>

<h3 id="voraussetzungen-antrag">Zeitliche Abläufe &amp; Stolperfallen</h3>
<ul>
  <li><strong>Antrag vor Maßnahmenbeginn</strong>: Sobald ein Liefer- oder Handwerkervertrag unterschrieben ist, ohne dass die Förderzusage vorliegt, verfällt der Anspruch.</li>
  <li><strong>Fristen</strong>: Zwischen Zusage und Projektstart bleiben meist sechs Monate, die Umsetzung muss häufig binnen 24 Monaten abgeschlossen sein.</li>
  <li><strong>Typische Fehler</strong>: Falsche Kostenschätzungen, fehlende Unterschriften, veraltete Formulare oder das Versäumen von Nachrüstpflichten bei Heizungstausch.</li>
</ul>

<h2 id="finanzierungsmodelle">Finanzierungsmodelle</h2>
<p>Die optimale Sanierung Finanzierung kombiniert Liquidität, Förderkredite und Zuschüsse. So bleibt der Eigenanteil kalkulierbar.</p>

<h3 id="finanzierungsmodelle-kredite">Klassische Bankkredite vs. Förderkredite</h3>
<p>Hausbanken bieten klassische Modernisierungskredite mit flexiblen Laufzeiten, jedoch zu marktnahen Zinsen. Förderkredite wie KfW 261 punkten mit zinsgünstigen Konditionen (ab 0,01% effektiv) und Tilgungszuschüssen. Tipp: Lass dir ein Durchleitungsangebot von deiner Bank machen, damit die Förderkonditionen vollständig weitergegeben werden.</p>

<h3 id="finanzierungsmodelle-zuschuesse">Zuschüsse &amp; steuerliche Vergünstigungen</h3>
<p>BAFA-Zuschüsse, der Steuerbonus für energetische Maßnahmen (§35c EStG) und regionale Prämien lassen sich häufig kombinieren. Wer keinen Zuschuss erhält, kann 20% der Kosten über drei Jahre steuerlich geltend machen und so zusätzlich sparen.</p>

<h3 id="finanzierungsmodelle-kombinationen">Kombinationen clever nutzen</h3>
<ul>
  <li><strong>Eigenleistung + Förderkredit</strong>: Eigenkapital reduziert Darlehensbedarf, der Rest wird über KfW finanziert.</li>
  <li><strong>Zuschuss + Steuerbonus</strong>: Nach Ausschöpfung aller Zuschüsse lassen sich Restkosten steuerlich absetzen.</li>
  <li><strong>Kommunaler Bonus + BAFA Förderung</strong>: Viele Städte zahlen zusätzliche Prämien für erneuerbare Heizsysteme, wenn bereits ein BAFA-Antrag bewilligt wurde.</li>
</ul>

<h2 id="praxis-tipps">Praxisnahe Tipps</h2>

<h3 id="praxis-eigenkapital">Wann lohnt sich Eigenkapital?</h3>
<p>Setze Eigenkapital vor allem für Maßnahmen mit hoher Rendite ein – etwa für Dämmung oder Wärmepumpe. Ein Eigenanteil von 10–20% verbessert die Kreditkonditionen und dient als Puffer für Mehrkosten.</p>

<h3 id="praxis-timing">Förderungen rechtzeitig beantragen</h3>
<p>Beginne mindestens drei Monate vor geplanter Umsetzung mit der Förderplanung. Hol mehrere Angebote ein, damit der Energieberater die förderfähigen Kosten präzise bestätigen kann.</p>

<h3 id="praxis-tools">Tools &amp; Ratgeber nutzen</h3>
<p>Zur Vorbereitung empfehlen sich Fördermittel-Checks und Budgetplaner. Einen praxisnahen Überblick liefert der <a href="https://www.amazon.de/s?k=kfw+sanierung+foerderung+ratgeber&amp;tag=klexgetier0d-21" target="_blank" rel="nofollow noopener sponsored">Ratgeber „KfW &amp; BAFA Förderung für die energetische Sanierung“</a> mit zahlreichen Beispielen und Formularhilfen.</p>

<h2 id="checkliste">Checkliste: So sicherst du dir Förderungen</h2>
<ol>
  <li>Ziele definieren und Ist-Analyse mit Energieberater durchführen.</li>
  <li>Passende Programme (BAFA, KfW, Landes- und Kommunalprogramme) prüfen.</li>
  <li>Kostenangebote einholen und technische Mindestanforderungen abgleichen.</li>
  <li>Förderanträge vollständig vor Maßnahmenbeginn einreichen.</li>
  <li>Bewilligungen abwarten, Verträge unterschreiben und Umsetzung begleiten.</li>
  <li>Nachweisunterlagen fristgerecht einreichen und Zuschüsse/Kredit-Boni abrufen.</li>
</ol>

<h2 id="fazit">Fazit</h2>
<p>Die richtige Kombination aus Finanzierung und Förderungen spart bares Geld und macht die Sanierung planbar. Lass dich beraten, halte Fristen ein und nutze die Ressourcen auf www.sanierenundsparen.de, um jedes Programm optimal auszuschöpfen.</p>
`,
    topic: 'Fördermittel',
    topicColor: siteConfig.contentTopics.find(t => t.id === 'foerderung')?.color || '#059669',
    publishedAt: '2025-06-20',
    readTime: 14,
    slug: 'foerdermittel-finanzierungsmodelle-sanierung',
    seoTitle: 'Fördermittel & Finanzierung für Sanierung: Zuschüsse, Kredite, Steuerbonus',
    seoDescription:
      'So kombinierst du BAFA Förderung, KfW Zuschuss, steuerliche Vorteile und Eigenkapital für deine energetische Sanierung.',
    keywords: [
      'Sanierung Fördermittel',
      'KfW Zuschuss',
      'Sanierung Finanzierung',
      'BAFA Förderung',
      'Steuerbonus Sanierung',
      'Förderprogramme 2025'
    ],
    difficulty: 2,
    savingsPotential: 'Bis zu 70% Zuschüsse + Steuerbonus',
    paybackTime: 'Je nach Maßnahme 5-12 Jahre',
    fundingAvailable: 'Ja, Zuschüsse & Kredite',
    effortLevel: 'Mittel',
    keyBenefits: [
      'Alle relevanten Förderprogramme im Überblick',
      'Vergleich verschiedener Finanzierungsmodelle',
      'Praxis-Tipps für Antragstellung und Timing',
      'Checkliste zur sicheren Fördermittelplanung'
    ],
    importantNotice: 'Förderantrag immer vor Maßnahmenbeginn stellen.',
    tableOfContents: [
      { id: 'inhaltsverzeichnis', title: 'Inhaltsverzeichnis' },
      { id: 'foerderprogramme', title: 'Förderprogramme im Überblick' },
      { id: 'voraussetzungen', title: 'Voraussetzungen' },
      { id: 'finanzierungsmodelle', title: 'Finanzierungsmodelle' },
      { id: 'praxis-tipps', title: 'Praxisnahe Tipps' },
      { id: 'checkliste', title: 'Checkliste: So sicherst du dir Förderungen' },
      { id: 'fazit', title: 'Fazit' }
    ]
}
];

const sanierungsFehlerPost: BlogPost = {
  id: 'sanierung-fehler-risiken',
  title: 'Typische Fehler & Risiken bei Sanierungen – und wie du sie vermeidest',
  excerpt:
    'Warum Sanierungen selten am Budget scheitern, sondern an fehlender Planung – plus konkrete Maßnahmen gegen Baupfusch, Kostenfallen und Schimmel.',
  content: `# Typische Fehler & Risiken bei Sanierungen – und wie du sie vermeidest

<p>Auf <strong><a href="https://www.sanierenundsparen.de" target="_blank" rel="noopener">www.sanierenundsparen.de</a></strong> zeigen wir täglich, dass viele Sanierungen nicht am Budget scheitern, sondern an vermeidbaren Planungsfehlern. Wer typische Sanierung Fehler kennt, erkennt Stolpersteine frühzeitig und schützt die eigene Investition.</p>

<h2 id="typische-fehler-sanierung">Typische Fehler bei der Sanierung</h2>
<p>Die meisten Sanierungsprojekte entgleisen, weil zentrale Schritte übersprungen oder falsch priorisiert werden. Diese Sanierung Fehler solltest du unbedingt kennen.</p>

<h3 id="ohne-energieberatung">Ohne Energieberatung starten</h3>
<p>Ohne fundierte Energieberatung fehlt die Basis für jede Entscheidung: Du kennst weder den tatsächlichen Energiebedarf noch die sinnvollste Reihenfolge der Maßnahmen.</p>
<ul>
  <li><strong>Risiko:</strong> Ineffiziente Investitionen und verlorene Förderchancen.</li>
  <li><strong>Lösung:</strong> Beratung durch zertifizierte Energieeffizienz-Experten einplanen und als roten Faden nutzen.</li>
</ul>

<h3 id="falsche-reihenfolge">Maßnahmen in falscher Reihenfolge</h3>
<p>Eine neue Heizung vor der Dämmung einzubauen ist klassische Fehlplanung. Die Anlage wird zu groß dimensioniert, der Verbrauch bleibt hoch und Nachjustierungen kosten Geld.</p>
<p><strong>Tipp:</strong> Gebäudehülle sanieren, dann Anlagentechnik optimieren – so nutzt du die gesamte Effizienz.</p>

<h3 id="billig-statt-nachhaltig">Billig statt nachhaltig: falsche Materialwahl</h3>
<p>Billigmaterial kann kurzfristig sparen, verursacht aber oft Baupfusch, Reklamationen und vorzeitige Folgesanierungen. Nachhaltige Baustoffe schützen Bausubstanz und Raumklima.</p>
<p><strong>Check:</strong> Auf Umweltlabels, Garantien und Referenzen achten.</p>

<h3 id="foerdermittel-zu-spaet">Fördermittel zu spät beantragt</h3>
<p>Viele Förderprogramme verlangen den Antrag vor Vertragsabschluss. Wer zu spät dran ist, verschenkt tausende Euro Zuschuss oder günstige Kredite.</p>
<p><strong>Merke:</strong> Förderfähigkeit schon in der Konzeptphase prüfen und Fristen im Projektplan verankern.</p>

<h3 id="eigenleistung-ueberschaetzt">Eigenleistungen überschätzt</h3>
<p>DIY-Mut ist gut, doch ohne Fachwissen können Leitungen, Dämmungen oder Abdichtungen schnell zum Sicherheitsrisiko werden.</p>
<ul>
  <li><strong>Gefahr:</strong> Verzögerungen, Nacharbeiten und Haftungsprobleme.</li>
  <li><strong>Besser:</strong> Eigenleistungen nur dort einplanen, wo du Erfahrung und Zeitreserven hast.</li>
</ul>

<h3 id="pfusch-unkualifizierte-handwerker">Pfusch durch unqualifizierte Handwerker</h3>
<p>Fehlende Qualifikationen und fehlende Qualitätskontrollen führen zu Baupfusch, der mühsam und teuer korrigiert werden muss.</p>
<p><strong>So gehst du vor:</strong> Meisterbetriebe mit Referenzen wählen, Leistungen detailliert ausschreiben und Abnahmen dokumentieren.</p>

<h2 id="sanierung-risiken">Risiken bei Sanierungen</h2>
<p>Zu den größten Sanierung Risiken gehören verdeckte Folgeschäden, die erst nach Abschluss sichtbar werden. Wer sie kennt, kann rechtzeitig gegensteuern.</p>

<h3 id="schimmelrisiko">Schimmel durch falsche Dämmung</h3>
<p>Eine falsch ausgeführte Dämmung verschiebt den Taupunkt und begünstigt Schimmel. Kontrollierte Lüftung und luftdichte Anschlüsse sind Pflicht.</p>

<h3 id="kostenexplosion">Kostenexplosion bei fehlendem Puffer</h3>
<p>Preissteigerungen, Lieferengpässe oder Zusatzarbeiten können das Budget sprengen. Ohne Reserven ist die Finanzierung schnell in Gefahr.</p>

<h3 id="wertminderung">Wertminderung bei unsachgemäßer Ausführung</h3>
<p>Fehlerhafte Ausführungen mindern den Immobilienwert, gefährden Gewährleistung und erschweren spätere Verkäufe oder Anschlussfinanzierungen.</p>

<h2 id="loesungen-sanierung-fehler-vermeiden">So vermeidest du Sanierungsfehler</h2>
<p>Strukturierte Planung hilft, Sanierung Risiken zu minimieren und eine zweite Sanierung zu vermeiden. Mit diesen Grundregeln hältst du das Projekt auf Kurs.</p>
<ul>
  <li><strong>Frühzeitige Planung mit Fachleuten:</strong> Architekt, Energieberater und Fachplaner rechtzeitig einbinden, damit Statik, Technik und Förderungen zusammenspielen.</li>
  <li><strong>Realistische Budgetierung:</strong> Alle Kostenpositionen erfassen und einen Puffer von 10–20&nbsp;% für Unvorhergesehenes zurücklegen.</li>
  <li><strong>Qualität vor billig:</strong> Nur geprüfte Materialien und Systeme verbauen, die gängige Normen erfüllen – so verhinderst du Baupfusch von Beginn an.</li>
  <li><strong>Verträge &amp; Garantien prüfen:</strong> Leistungsbeschreibungen, Termine, Gewährleistung und Haftung schriftlich fixieren und regelmäßig kontrollieren.</li>
</ul>
<p>Mit einer strukturierten Planung kannst du Baupfusch verhindern und kostspielige Nacharbeiten sparen – so lässt sich eine zweite Sanierung vermeiden, bevor sie überhaupt nötig wird.</p>

<h3 id="empfehlenswerte-ratgeber">Empfehlenswerte Ratgeber für deinen Projektplan</h3>
<p>Vertiefe dein Wissen mit praxisnahen Handbüchern, die Checklisten und Detailwissen liefern.</p>
<p><!-- AFFILIATE_DISCLOSURE -->
Hinweis: Einige Links sind Affiliate-Links. Wenn du darüber kaufst, erhalte ich eine kleine Provision, ohne Mehrkosten für dich.
</p>
<ul>
  <li><a href="https://www.amazon.de/s?k=bausanierung+fehler+vermeiden&tag=klexgetier0d-21" rel="nofollow noopener" target="_blank">Bausanierung richtig planen – Bestseller-Übersicht</a>: Aktuelle Praxisratgeber rund um Sanierung Fehler, Budgetplanung und rechtliche Absicherung.</li>
</ul>

<h2 id="checkliste-sanierung-fehler">Checkliste: Diese 7 Fehler darfst du nicht machen</h2>
<ol>
  <li>Ohne Energieberatung loslegen und damit falsche Prioritäten setzen.</li>
  <li>Maßnahmenreihenfolge ignorieren – erst Gebäudehülle, dann Technik.</li>
  <li>Billigmaterialien einkaufen, die zu Baupfusch führen.</li>
  <li>Fördermittel nach Vertragsabschluss beantragen und Ansprüche verlieren.</li>
  <li>Eigenleistungen überschätzen und Zeit- sowie Qualitätsprobleme riskieren.</li>
  <li>Handwerker ohne Qualifikationsnachweis beauftragen.</li>
  <li>Finanzpuffer streichen und dadurch Kostenexplosionen nicht auffangen.</li>
</ol>

<h2 id="fazit-sanierung">Fazit: Fehler vermeiden spart Nerven, Geld und Energie</h2>
<p>Wenn du Sanierung Fehler konsequent vermeidest, reduzierst du Stress, Kosten und Energieverbrauch. Die besten Tipps, Checklisten und Tools findest du jederzeit auf <strong><a href="https://www.sanierenundsparen.de" target="_blank" rel="noopener">www.sanierenundsparen.de</a></strong>.</p>`,
  topic: 'Sanierung planen',
  topicColor: '#16a34a',
  publishedAt: '2025-07-16',
  readTime: 11,
  slug: 'typische-sanierungsfehler-vermeiden',
  seoTitle: 'Sanierung Fehler & Risiken: Typische Patzer erkennen und vermeiden',
  seoDescription:
    'Sanierung Fehler vermeiden: Häufige Risiken wie Baupfusch, Schimmel und Kostenexplosion erkennen und mit Experten-Tipps sicher sanieren.',
  keywords: ['Sanierung Fehler', 'Sanierung Risiken', 'Sanierung vermeiden', 'Baupfusch', 'Renovierung planen'],
  difficulty: 1,
  savingsPotential: 'Bis zu 20% Projektkosten sparen',
  paybackTime: 'Direkt nach Umsetzung',
  fundingAvailable: 'Ja, je nach Maßnahme',
  effortLevel: 'Planungsaufwand',
  keyBenefits: [
    'Planungssicherheit vom ersten Schritt an',
    'Kostenkontrolle durch realistische Budgets',
    'Schutz vor Baupfusch und Folgeschäden',
    'Schneller Zugang zu Fördermitteln'
  ],
  importantNotice:
    'Beantrage Fördermittel immer vor der Beauftragung und halte alle Absprachen schriftlich fest.',
  tableOfContents: [
    { id: 'typische-fehler-sanierung', title: 'Typische Fehler bei der Sanierung' },
    { id: 'sanierung-risiken', title: 'Risiken bei Sanierungen' },
    { id: 'loesungen-sanierung-fehler-vermeiden', title: 'So vermeidest du Sanierungsfehler' },
    { id: 'empfehlenswerte-ratgeber', title: 'Empfehlenswerte Ratgeber' },
    { id: 'checkliste-sanierung-fehler', title: 'Checkliste: Diese 7 Fehler darfst du nicht machen' },
    { id: 'fazit-sanierung', title: 'Fazit' }
  ]
};

const sanierungsfahrplanPost: BlogPost = {
  id: 'sanierungsfahrplan-2025',
  title: 'Der optimale Sanierungsfahrplan 2025: In 5 Schritten zum energieeffizienten Haus',
  excerpt: 'Welche Sanierungsmaßnahme zuerst? Die richtige Reihenfolge spart bis zu 30 % Kosten. Unser Fahrplan zeigt den wirtschaftlich optimalen Weg – von der Gebäudehülle bis zur Heiztechnik.',
  content: `<h1>Der optimale Sanierungsfahrplan 2025: In 5 Schritten zum energieeffizienten Haus</h1>

<p>Wer sein Haus energetisch sanieren möchte, steht vor einer entscheidenden Frage: <strong>Womit anfangen?</strong> Dach, Fassade, Fenster, Heizung oder doch gleich eine Solaranlage? Die Reihenfolge entscheidet nicht nur über die Kosten, sondern auch über die Effektivität jeder einzelnen Maßnahme. In diesem Artikel zeigen wir Ihnen den wissenschaftlich fundierten, wirtschaftlich optimalen Sanierungsfahrplan – mit konkreten Zahlen, Querverweisen zu unseren Rechnern und externen Quellen.</p>

<h2 id="warum-reihenfolge">Warum die Reihenfolge entscheidend ist</h2>

<p>Ein häufiger Fehler: Hauseigentümer installieren zuerst eine neue Heizung und dämmen erst danach. Das Ergebnis? Die Heizung ist überdimensioniert, arbeitet ineffizient und kostet mehr als nötig. Die <a href="https://www.dena.de/themen-projekte/energieeffizienz/gebaeude/" target="_blank" rel="noopener">Deutsche Energie-Agentur (dena)</a> bestätigt: <strong>Erst die Hülle, dann die Technik</strong> – dieses Prinzip spart bis zu 30 % der Gesamtkosten.</p>

<p>Lesen Sie dazu auch unseren Artikel über <a href="/blog/typische-sanierungsfehler-vermeiden">typische Sanierungsfehler und wie Sie diese vermeiden</a>.</p>

<h3>Der Domino-Effekt der richtigen Reihenfolge</h3>
<ul>
  <li>Eine gut gedämmte Hülle <strong>senkt den Wärmebedarf um 40–60 %</strong></li>
  <li>Dadurch kann die neue Heizung <strong>kleiner und günstiger</strong> dimensioniert werden</li>
  <li>Eine Wärmepumpe arbeitet bei niedrigem Wärmebedarf <strong>deutlich effizienter</strong> (höhere JAZ)</li>
  <li>Die Solaranlage deckt einen größeren Anteil des reduzierten Restbedarfs</li>
</ul>

<h2 id="schritt-1-analyse">Schritt 1: Energieberatung und Ist-Analyse (Monat 1)</h2>

<p>Bevor Sie eine einzige Maßnahme planen, brauchen Sie eine <strong>qualifizierte Energieberatung</strong>. Der Energieberater erstellt einen individuellen Sanierungsfahrplan (iSFP), der:</p>

<ul>
  <li>Den Ist-Zustand Ihres Gebäudes dokumentiert (Thermografie, Blower-Door-Test)</li>
  <li>Die wirtschaftlich sinnvollste Reihenfolge der Maßnahmen festlegt</li>
  <li>Die verfügbaren <a href="/foerdermittel">Fördermittel</a> identifiziert</li>
  <li>Einen <strong>zusätzlichen iSFP-Bonus von 5 %</strong> auf alle Einzelmaßnahmen sichert</li>
</ul>

<p><strong>Kosten:</strong> 800–1.500 € für Ein-/Zweifamilienhäuser<br>
<strong>Förderung:</strong> 80 % durch BAFA (max. 1.300 €) – Sie zahlen also oft nur 200–300 €<br>
<strong>Quelle:</strong> <a href="https://www.bafa.de/DE/Energie/Energieberatung/energieberatung_node.html" target="_blank" rel="noopener">BAFA – Energieberatung für Wohngebäude</a></p>

<p>Nutzen Sie unseren <a href="/rechner-vergleich">Sanierungsrechner-Vergleich</a>, um vorab eine erste Einschätzung zu bekommen, welche Maßnahmen bei Ihrem Gebäude das größte Sparpotenzial bieten.</p>

<h2 id="schritt-2-gebaeudehuelle">Schritt 2: Gebäudehülle optimieren (Monat 2–6)</h2>

<p>Die Gebäudehülle ist das Fundament jeder erfolgreichen Sanierung. Hier sollten Sie in dieser Reihenfolge vorgehen:</p>

<h3>2a) Dach / Oberste Geschossdecke</h3>
<p>Über ein ungedämmtes Dach gehen <strong>25–30 % der Heizwärme</strong> verloren. Die Dämmung der obersten Geschossdecke ist die <strong>wirtschaftlichste Einzelmaßnahme</strong> überhaupt:</p>
<ul>
  <li><strong>Kosten:</strong> 15–60 €/m² (je nach Aufbau)</li>
  <li><strong>Einsparung:</strong> 15–20 % der Heizkosten</li>
  <li><strong>Amortisation:</strong> 2–5 Jahre</li>
  <li><strong>Förderung:</strong> 15 % + 5 % iSFP-Bonus = <strong>20 % Zuschuss</strong></li>
</ul>

<h3>2b) Außenwände dämmen</h3>
<p>Die Fassade hat die größte Oberfläche und damit das höchste absolute Einsparpotenzial. Berechnen Sie mit unserem <a href="/daemmungsrechner">Dämmungsrechner</a> genau, welches System sich für Ihre Fassade lohnt.</p>
<ul>
  <li><strong>WDVS (EPS/Mineralwolle):</strong> 120–180 €/m², Einsparung 20–25 %</li>
  <li><strong>Einblasdämmung:</strong> 15–50 €/m² (bei zweischaligem Mauerwerk)</li>
  <li><strong>Förderung:</strong> 15 % + 5 % iSFP = <strong>20 % Zuschuss</strong> (max. 30.000 €)</li>
</ul>
<p>Detailinfos zu allen Dämmstoffen finden Sie in unserem <a href="/blog/daemmung-heizkosten-sparen">Dämmungs-Ratgeber</a>.</p>

<h3>2c) Fenster und Türen erneuern</h3>
<p>Neue Fenster mit 3-fach-Verglasung (U-Wert ≤ 0,95 W/m²K) reduzieren Wärmeverluste um bis zu 50 % gegenüber alten Einfachverglasungen. <strong>Wichtig:</strong> Fenster immer zusammen mit oder nach der Fassadendämmung tauschen, um Wärmebrücken zu vermeiden.</p>
<ul>
  <li><strong>Kosten:</strong> 500–1.200 € pro Fenster (inkl. Einbau)</li>
  <li><strong>Einsparung:</strong> 10–15 % der Heizkosten</li>
  <li><strong>Förderung:</strong> 15 % + 5 % iSFP = <strong>20 % Zuschuss</strong></li>
</ul>
<p>Mehr Details dazu auf unserer Themenseite <a href="/fenster-tueren">Fenster & Türen</a> und im <a href="/blog/fenster-erneuern-3fach-verglasung">Ratgeber 3-fach Verglasung</a>.</p>

<h3>2d) Kellerdecke dämmen</h3>
<p>Die günstigste Maßnahme mit schnellster Amortisation – oft in Eigenleistung möglich.</p>
<ul>
  <li><strong>Kosten:</strong> 25–45 €/m²</li>
  <li><strong>Einsparung:</strong> 5–10 % der Heizkosten</li>
  <li><strong>Amortisation:</strong> 2–4 Jahre</li>
</ul>
<p>Schritt-für-Schritt-Anleitung in unserem Artikel: <a href="/blog/kellerdecke-daemmen-anleitung">Kellerdecke dämmen – Anleitung</a>.</p>

<h2 id="schritt-3-heizung">Schritt 3: Heiztechnik modernisieren (Monat 6–9)</h2>

<p><strong>Erst jetzt</strong>, nach der Optimierung der Gebäudehülle, kommt die Heizung an die Reihe. Durch den reduzierten Wärmebedarf können Sie jetzt eine <strong>kleinere, effizientere Anlage</strong> wählen.</p>

<h3>Die beste Option 2025: Wärmepumpe</h3>
<p>In einem gut gedämmten Bestandsgebäude erreicht eine Luft-Wasser-Wärmepumpe eine <strong>Jahresarbeitszahl von 3,5–4,5</strong>. Das bedeutet: Aus 1 kWh Strom werden 3,5–4,5 kWh Wärme.</p>

<table>
  <thead><tr><th>Heizsystem</th><th>Investition</th><th>Förderung (max.)</th><th>Betriebskosten/Jahr</th></tr></thead>
  <tbody>
    <tr><td>Wärmepumpe (Luft-Wasser)</td><td>15.000–25.000 €</td><td>bis 70 %</td><td>600–1.200 €</td></tr>
    <tr><td>Gas-Brennwert + Solar</td><td>10.000–18.000 €</td><td>bis 30 %</td><td>1.200–2.000 €</td></tr>
    <tr><td>Pelletheizung</td><td>18.000–30.000 €</td><td>bis 35 %</td><td>800–1.500 €</td></tr>
  </tbody>
</table>

<p>Vergleichen Sie die Systeme detailliert mit unserem <a href="/heizkostenrechner">Heizkostenrechner</a> oder lesen Sie den <a href="/blog/waermepumpe-vs-gas-vergleich">Vergleich Wärmepumpe vs. Gas</a>.</p>

<p><strong>Quellen zur Förderung:</strong></p>
<ul>
  <li><a href="https://www.bafa.de/DE/Energie/Effiziente_Gebaeude/effiziente_gebaeude_node.html" target="_blank" rel="noopener">BAFA – Bundesförderung effiziente Gebäude (BEG)</a></li>
  <li><a href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/Energieeffizient-sanieren/" target="_blank" rel="noopener">KfW – Energieeffizient Sanieren</a></li>
</ul>
<p>Einen vollständigen Überblick über alle Programme finden Sie auf unserer <a href="/foerdermittel">Fördermittel-Seite</a> und im <a href="/blog/foerdermittel-finanzierungsmodelle-sanierung">Finanzierungsratgeber</a>.</p>

<h2 id="schritt-4-solar">Schritt 4: Solaranlage installieren (Monat 9–12)</h2>

<p>Mit einer PV-Anlage produzieren Sie Ihren eigenen Strom – ideal als Ergänzung zur Wärmepumpe. In einem sanierten Haus mit Wärmepumpe kann die Solaranlage <strong>30–50 % des Heizstroms</strong> selbst erzeugen.</p>

<h3>Warum Solar erst nach der Heizung?</h3>
<ul>
  <li>Sie kennen den tatsächlichen Stromverbrauch (inkl. Wärmepumpe)</li>
  <li>Die Anlage kann optimal auf den realen Bedarf dimensioniert werden</li>
  <li>Eigenverbrauchsquote ist höher → schnellere Amortisation</li>
</ul>

<h3>Typische Konfiguration für saniertes EFH</h3>
<ul>
  <li><strong>Anlagengröße:</strong> 8–12 kWp</li>
  <li><strong>Jahresertrag:</strong> 8.000–11.000 kWh</li>
  <li><strong>Investition:</strong> 12.000–18.000 € (ohne Speicher)</li>
  <li><strong>Amortisation:</strong> 8–12 Jahre</li>
  <li><strong>20-Jahres-Gewinn:</strong> 15.000–25.000 €</li>
</ul>

<p>Berechnen Sie Ihr individuelles Solar-Potenzial mit unserem <a href="/solarenergie#rechner">professionellen Solar-Rechner</a>. Dort erhalten Sie eine detaillierte 20-Jahres-Prognose inklusive Speicher- und E-Auto-Optionen.</p>

<p>Lesen Sie dazu auch: <a href="/blog/photovoltaik-2024-lohnt-sich-solaranlage">Lohnt sich Photovoltaik 2024?</a> und <a href="/blog/balkonkraftwerk-2025-mini-pv">Balkonkraftwerk als Einstieg</a>.</p>

<h2 id="schritt-5-smart-home">Schritt 5: Smart-Home-Optimierung (laufend)</h2>

<p>Intelligente Steuerungstechnik ist das „Feintuning" nach der Hardware-Sanierung. Smarte Thermostate, Energiemanagementsysteme und Wettersteuerungen können <strong>zusätzlich 10–25 % Energie einsparen</strong>.</p>

<h3>Die wichtigsten Smart-Home-Komponenten</h3>
<ul>
  <li><strong>Smarte Thermostate:</strong> 200–400 € für 6 Räume, 10–15 % Ersparnis. Lesen Sie unseren <a href="/blog/smart-home-heizung-thermostate-test">Thermostat-Test</a>.</li>
  <li><strong>Energiemanagementsystem:</strong> 1.500–2.000 €, optimiert Eigenverbrauch der PV-Anlage</li>
  <li><strong>Wettergesteuerte Heizungsregelung:</strong> 300–500 €, vorausschauendes Heizen</li>
</ul>

<p>Mehr dazu auf unserer Themenseite <a href="/smart-home">Smart Home & Energiemanagement</a>.</p>

<h2 id="kosten-gesamtbild">Das Gesamtbild: Kosten und Ersparnisse</h2>

<p>Für ein typisches Einfamilienhaus (Baujahr 1980, 150 m²) ergibt sich bei vollständiger Sanierung folgendes Bild:</p>

<table>
  <thead><tr><th>Maßnahme</th><th>Investition</th><th>Förderung (20 %)</th><th>Eigenanteil</th><th>Ersparnis/Jahr</th></tr></thead>
  <tbody>
    <tr><td>Dach + Geschossdecke</td><td>8.000 €</td><td>1.600 €</td><td>6.400 €</td><td>450 €</td></tr>
    <tr><td>Fassadendämmung</td><td>22.000 €</td><td>4.400 €</td><td>17.600 €</td><td>700 €</td></tr>
    <tr><td>Fenster (12 Stück)</td><td>12.000 €</td><td>2.400 €</td><td>9.600 €</td><td>350 €</td></tr>
    <tr><td>Kellerdecke</td><td>3.500 €</td><td>700 €</td><td>2.800 €</td><td>200 €</td></tr>
    <tr><td>Wärmepumpe</td><td>22.000 €</td><td>15.400 €</td><td>6.600 €</td><td>1.800 €</td></tr>
    <tr><td>PV-Anlage (10 kWp)</td><td>14.000 €</td><td>–</td><td>14.000 €</td><td>1.200 €</td></tr>
    <tr><td>Smart Home</td><td>2.000 €</td><td>–</td><td>2.000 €</td><td>300 €</td></tr>
    <tr><td><strong>Gesamt</strong></td><td><strong>83.500 €</strong></td><td><strong>24.500 €</strong></td><td><strong>59.000 €</strong></td><td><strong>5.000 €</strong></td></tr>
  </tbody>
</table>

<p><strong>Amortisation des Eigenanteils:</strong> ca. 12 Jahre<br>
<strong>20-Jahres-Gewinn:</strong> ca. 41.000 € (nach Abzug aller Kosten)<br>
<strong>CO₂-Einsparung:</strong> ca. 5–6 Tonnen pro Jahr</p>

<p>Vergleichen Sie die einzelnen Maßnahmen direkt nebeneinander in unserem <a href="/rechner-vergleich">Rechner-Vergleich</a>.</p>

<h2 id="foerderungen-kombinieren">Fördermittel intelligent kombinieren</h2>

<p>Die Kunst liegt in der <strong>optimalen Kombination</strong> verschiedener Fördertöpfe:</p>

<ol>
  <li><strong>iSFP erstellen lassen</strong> (80 % gefördert) → sichert 5 % Bonus auf alle Maßnahmen</li>
  <li><strong>BAFA-Einzelmaßnahmen</strong> für Hülle (15 % + 5 % iSFP) und Heizung (bis 70 %)</li>
  <li><strong>KfW-Kredit 261</strong> für besonders große Maßnahmen (bis 150.000 € zu Minizinsen)</li>
  <li><strong>Steuerbonus</strong> (§ 35c EStG) als Alternative zu BAFA für Hüllenmaßnahmen</li>
  <li><strong>Kommunale Förderungen</strong> zusätzlich prüfen – viele Städte bieten Zuschüsse</li>
</ol>

<p><strong>Wichtig:</strong> Förderanträge <strong>immer vor Vertragsabschluss</strong> stellen! Details dazu in unserem <a href="/blog/foerdermittel-2025-zuschuss-sanierung">Fördermittel-Überblick 2025</a>.</p>

<h2 id="zeitplan">Realistischer Zeitplan</h2>

<p>Eine vollständige energetische Sanierung dauert in der Regel <strong>12–18 Monate</strong>. So können Sie die Phasen realistisch planen:</p>

<ul>
  <li><strong>Monat 1–2:</strong> Energieberatung, iSFP erstellen, Förderanträge vorbereiten</li>
  <li><strong>Monat 2–3:</strong> Angebote einholen (min. 3 pro Gewerk), Förderanträge stellen</li>
  <li><strong>Monat 3–4:</strong> Förderzusagen abwarten, Aufträge vergeben</li>
  <li><strong>Monat 4–8:</strong> Dach, Fassade, Fenster, Keller (parallel möglich)</li>
  <li><strong>Monat 8–10:</strong> Heizungstausch</li>
  <li><strong>Monat 10–12:</strong> PV-Anlage, Smart Home, Feinabstimmung</li>
</ul>

<p>Nutzen Sie unseren <a href="/projektplaner">Projektplaner</a> für die detaillierte Terminplanung und den <a href="/budgetplan">Budgetplaner</a> für die Kostenkontrolle.</p>

<h2 id="fazit">Fazit: Die richtige Reihenfolge ist der Schlüssel</h2>

<p>Ein durchdachter Sanierungsfahrplan spart Ihnen <strong>Tausende Euro</strong> und vermeidet typische Fehler. Die Kernregeln:</p>

<ol>
  <li><strong>Erst planen</strong> (Energieberatung + iSFP)</li>
  <li><strong>Dann die Hülle</strong> (Dach → Wände → Fenster → Keller)</li>
  <li><strong>Dann die Technik</strong> (Heizung passend zum reduzierten Bedarf)</li>
  <li><strong>Dann Solar</strong> (dimensioniert auf realen Verbrauch)</li>
  <li><strong>Dann optimieren</strong> (Smart Home als Feintuning)</li>
</ol>

<p>Starten Sie jetzt mit dem ersten Schritt und nutzen Sie unsere kostenlosen Tools:</p>
<ul>
  <li>🔥 <a href="/heizkostenrechner">Heizkostenrechner</a> – Sparpotenzial bei Heizungstausch</li>
  <li>🏠 <a href="/daemmungsrechner">Dämmungsrechner</a> – Optimale Dämmstärke berechnen</li>
  <li>☀️ <a href="/solarenergie#rechner">Solar-Rechner</a> – PV-Anlage planen</li>
  <li>⚖️ <a href="/rechner-vergleich">Maßnahmen-Vergleich</a> – Alle Optionen nebeneinander</li>
  <li>📋 <a href="/projektplaner">Projektplaner</a> – Sanierung terminlich planen</li>
</ul>

<p><strong>Weiterführende Quellen:</strong></p>
<ul>
  <li><a href="https://www.dena.de/themen-projekte/energieeffizienz/gebaeude/" target="_blank" rel="noopener">dena – Energieeffiziente Gebäude</a></li>
  <li><a href="https://www.verbraucherzentrale.de/wissen/energie/energetische-sanierung" target="_blank" rel="noopener">Verbraucherzentrale – Energetische Sanierung</a></li>
  <li><a href="https://www.co2online.de/modernisieren-und-bauen/" target="_blank" rel="noopener">co2online – Modernisieren und Bauen</a></li>
  <li><a href="https://www.bmwk.de/Redaktion/DE/Dossier/energieeffizienz-im-gebaeudebereich.html" target="_blank" rel="noopener">BMWK – Energieeffizienz im Gebäudebereich</a></li>
</ul>`,
  topic: 'Sanierung planen',
  topicColor: '#16a34a',
  publishedAt: '2025-03-05',
  readTime: 15,
  slug: 'sanierungsfahrplan-2025-optimale-reihenfolge',
  seoTitle: 'Sanierungsfahrplan 2025: Optimale Reihenfolge für maximale Einsparung',
  seoDescription: 'Der optimale Sanierungsfahrplan: In 5 Schritten zum energieeffizienten Haus. Richtige Reihenfolge spart bis zu 30 % – mit konkreten Kosten, Förderungen und Zeitplan.',
  keywords: ['Sanierungsfahrplan', 'Sanierung Reihenfolge', 'energetische Sanierung planen', 'Gebäudesanierung 2025', 'iSFP', 'Fördermittel kombinieren'],
  difficulty: 2,
  savingsPotential: 'Bis zu 70 % Energiekosten',
  paybackTime: '10–14 Jahre (Gesamtpaket)',
  fundingAvailable: 'Ja, bis zu 70 % je Maßnahme',
  effortLevel: 'Hoch (12–18 Monate)',
  keyBenefits: [
    'Bis zu 30 % Kostenvorteil durch richtige Reihenfolge',
    'Optimal dimensionierte Heiztechnik',
    'Maximale Fördermittelausschöpfung',
    'CO₂-Einsparung von 5–6 Tonnen/Jahr',
    'Wertsteigerung der Immobilie um 10–20 %',
    'Unabhängigkeit von steigenden Energiepreisen'
  ],
  importantNotice: 'Erstellen Sie immer zuerst einen individuellen Sanierungsfahrplan (iSFP). Dieser sichert Ihnen einen 5 %-Bonus auf alle Einzelmaßnahmen und wird zu 80 % vom Staat gefördert.',
  tableOfContents: [
    { id: 'warum-reihenfolge', title: 'Warum die Reihenfolge entscheidet' },
    { id: 'schritt-1-analyse', title: 'Schritt 1: Energieberatung' },
    { id: 'schritt-2-gebaeudehuelle', title: 'Schritt 2: Gebäudehülle' },
    { id: 'schritt-3-heizung', title: 'Schritt 3: Heiztechnik' },
    { id: 'schritt-4-solar', title: 'Schritt 4: Solaranlage' },
    { id: 'schritt-5-smart-home', title: 'Schritt 5: Smart Home' },
    { id: 'kosten-gesamtbild', title: 'Kosten-Gesamtbild' },
    { id: 'foerderungen-kombinieren', title: 'Fördermittel kombinieren' },
    { id: 'zeitplan', title: 'Realistischer Zeitplan' },
    { id: 'fazit', title: 'Fazit' }
  ],
  costs: [
    { item: 'Dach + Geschossdecke', costPerSqm: '15–60 €', totalCost: '5.000–10.000 €', funding: '20 % (BAFA + iSFP)' },
    { item: 'Fassadendämmung (WDVS)', costPerSqm: '120–180 €', totalCost: '18.000–27.000 €', funding: '20 % (BAFA + iSFP)' },
    { item: 'Fenster 3-fach', costPerSqm: '500–1.200 €/Stk.', totalCost: '6.000–14.000 €', funding: '20 % (BAFA + iSFP)' },
    { item: 'Kellerdeckendämmung', costPerSqm: '25–45 €', totalCost: '2.500–4.500 €', funding: '20 % (BAFA + iSFP)' },
    { item: 'Wärmepumpe', costPerSqm: '–', totalCost: '15.000–25.000 €', funding: 'Bis zu 70 % (BAFA)' },
    { item: 'PV-Anlage 10 kWp', costPerSqm: '–', totalCost: '12.000–18.000 €', funding: 'KfW-Kredit' },
    { item: 'Smart Home', costPerSqm: '–', totalCost: '1.500–3.000 €', funding: '–' }
  ]
};

const altbauKaufenPost: BlogPost = {
  id: 'altbau-kaufen-2025',
  title: 'Altbau kaufen und sanieren 2025: Der ultimative Käufer-Ratgeber',
  excerpt: 'Was Sie vor dem Kauf eines Altbaus wirklich wissen müssen – von der Bausubstanz-Prüfung über versteckte Kosten bis zur optimalen Sanierungsstrategie mit Fördermitteln.',
  content: `
<p>Ein Altbau mit Charme, hohen Decken und gewachsenem Garten – der Traum vieler Hauskäufer. Doch hinter der schönen Fassade lauern oft <strong>energetische Schwachstellen</strong>, die ohne Vorbereitung zur Kostenfalle werden. Dieser Ratgeber zeigt Ihnen, worauf Sie achten müssen und wie Sie Ihren Altbau-Kauf zum wirtschaftlichen Erfolg machen.</p>

<h2 id="vor-dem-kauf">Vor dem Kauf: Die wichtigsten Prüfpunkte</h2>

<p>Bevor Sie einen Kaufvertrag unterschreiben, sollten Sie den <strong>energetischen Zustand</strong> des Gebäudes systematisch bewerten. Ein <a href="/wissenswertes/experten">unabhängiger Energieberater</a> ist dabei unverzichtbar – die Beratung wird mit bis zu 80 % gefördert.</p>

<h3>Checkliste Bausubstanz</h3>
<ul>
  <li><strong>Dach:</strong> Zustand der Eindeckung, vorhandene Dämmung, Zustand der Holzkonstruktion</li>
  <li><strong>Fassade:</strong> Risse, Feuchtigkeit, vorhandenes WDVS oder Kerndämmung</li>
  <li><strong>Fenster:</strong> Verglasung (Einzel-, Doppel-, Dreifach?), Dichtungen, Rahmen-Material</li>
  <li><strong>Keller:</strong> Feuchtigkeit, Abdichtung, Kellerdecken-Dämmung</li>
  <li><strong>Heizung:</strong> Alter, Brennstoff, Effizienz, Wartungszustand</li>
  <li><strong>Elektrik:</strong> Alter der Leitungen, FI-Schutzschalter vorhanden?</li>
  <li><strong>Rohrleitungen:</strong> Material (Blei?), Zustand, Isolierung</li>
</ul>

<p>Tipp: Nutzen Sie unseren <a href="/energie-check">Energie-Check</a>, um eine erste Einschätzung des energetischen Zustands zu bekommen.</p>

<h2 id="energieausweis-lesen">Den Energieausweis richtig lesen</h2>

<p>Seit 2014 ist der <strong>Energieausweis bei Verkauf Pflicht</strong>. Aber was sagen die Zahlen wirklich aus?</p>

<table>
  <thead><tr><th>Effizienzklasse</th><th>kWh/m²·a</th><th>Bewertung</th><th>Typische Sanierungskosten</th></tr></thead>
  <tbody>
    <tr><td>A+/A</td><td>&lt; 50</td><td>Sehr gut – kaum Handlungsbedarf</td><td>0–5.000 €</td></tr>
    <tr><td>B</td><td>50–75</td><td>Gut – Einzelmaßnahmen sinnvoll</td><td>5.000–15.000 €</td></tr>
    <tr><td>C</td><td>75–100</td><td>Mittel – mehrere Maßnahmen empfohlen</td><td>15.000–35.000 €</td></tr>
    <tr><td>D</td><td>100–130</td><td>Unterdurchschnittlich</td><td>30.000–55.000 €</td></tr>
    <tr><td>E/F</td><td>130–200</td><td>Schlecht – umfassende Sanierung nötig</td><td>50.000–90.000 €</td></tr>
    <tr><td>G/H</td><td>&gt; 200</td><td>Sehr schlecht – Kernsanierung</td><td>80.000–150.000+ €</td></tr>
  </tbody>
</table>

<p><strong>Wichtig:</strong> Der Energieausweis gibt nur einen groben Überblick. Für eine belastbare Einschätzung benötigen Sie einen <strong>Bedarfsausweis</strong> (nicht nur den günstigeren Verbrauchsausweis).</p>

<h2 id="versteckte-kosten">Versteckte Kosten, die Käufer übersehen</h2>

<p>Die häufigsten Kostenfallen beim Altbau-Kauf:</p>

<ol>
  <li><strong>Asbest in Dach- und Fassadenplatten</strong> (Eternit) – Entsorgung kostet 30–50 €/m², Gesamtkosten schnell 10.000+ €</li>
  <li><strong>Feuchte Keller</strong> ohne Horizontalsperre – Abdichtung von außen: 500–1.000 €/lfm</li>
  <li><strong>Bleirohre</strong> (in Häusern vor 1970) – Komplett-Austausch: 3.000–8.000 €</li>
  <li><strong>Veraltete Elektrik</strong> ohne FI-Schutzschalter – Nachrüstung: 3.000–12.000 €</li>
  <li><strong>Sanierungspflichten nach GEG</strong> – Heizungstausch-Pflicht bei bestimmten Altanlagen</li>
</ol>

<p>Lesen Sie auch unseren Artikel über <a href="/blog/haeufige-sanierungsfehler-vermeiden">häufige Sanierungsfehler</a>, um typische Fallstricke zu vermeiden.</p>

<h2 id="sanierungskosten-kalkulieren">Sanierungskosten realistisch kalkulieren</h2>

<p>Nutzen Sie unsere Rechner für eine fundierte Kalkulation:</p>

<ul>
  <li>🔥 <a href="/heizkostenrechner">Heizkostenrechner</a> – Was kostet ein neues Heizsystem?</li>
  <li>🏠 <a href="/daemmungsrechner">Dämmungsrechner</a> – Welche Dämmung lohnt sich bei welchem Baujahr?</li>
  <li>☀️ <a href="/solarenergie#rechner">Solar-Rechner</a> – Lohnt sich eine PV-Anlage auf dem Altbau-Dach?</li>
  <li>⚖️ <a href="/rechner-vergleich">Maßnahmen-Vergleich</a> – Alle Optionen nebeneinander vergleichen</li>
</ul>

<h3>Faustformel für die Gesamtkosten</h3>

<p>Als grobe Orientierung für <strong>Einfamilienhäuser (100–150 m²)</strong>:</p>

<table>
  <thead><tr><th>Baujahr</th><th>Typischer Zustand</th><th>Sanierungskosten (ohne Förderung)</th><th>Mit Förderung</th></tr></thead>
  <tbody>
    <tr><td>Vor 1960</td><td>Kernsanierung nötig</td><td>80.000–150.000 €</td><td>50.000–100.000 €</td></tr>
    <tr><td>1960–1978</td><td>Umfassende Sanierung</td><td>50.000–90.000 €</td><td>30.000–60.000 €</td></tr>
    <tr><td>1978–1995</td><td>Teilsanierung</td><td>30.000–60.000 €</td><td>20.000–40.000 €</td></tr>
    <tr><td>1995–2010</td><td>Einzelmaßnahmen</td><td>10.000–35.000 €</td><td>7.000–25.000 €</td></tr>
    <tr><td>Nach 2010</td><td>Wenig Bedarf</td><td>5.000–15.000 €</td><td>3.000–10.000 €</td></tr>
  </tbody>
</table>

<p>Planen Sie Ihre Sanierungskosten detailliert mit unserem <a href="/budgetplan">Budget-Planer</a>.</p>

<h2 id="kaufpreis-verhandeln">Kaufpreis intelligent verhandeln</h2>

<p>Der energetische Zustand ist ein <strong>starkes Verhandlungsargument</strong>. So nutzen Sie es:</p>

<ol>
  <li><strong>Energieausweis analysieren</strong> – Schlechte Klasse = niedrigerer Preis gerechtfertigt</li>
  <li><strong>Sanierungskosten beziffern</strong> – Konkrete Kostenaufstellung vom Energieberater</li>
  <li><strong>GEG-Pflichten betonen</strong> – Käufer muss innerhalb von 2 Jahren bestimmte Maßnahmen umsetzen</li>
  <li><strong>Vergleichspreise heranziehen</strong> – Sanierte Häuser in der Nachbarschaft als Benchmark</li>
  <li><strong>Fördermittel NICHT vom Preis abziehen</strong> – Die Förderung steht dem Käufer zu, nicht dem Verkäufer</li>
</ol>

<p><strong>Praxis-Beispiel:</strong> Ein Haus mit Energieklasse G (Verbrauch 250 kWh/m²·a) hat bei 120 m² Mehrkosten von ca. <strong>2.400 €/Jahr</strong> gegenüber Klasse B. Über 20 Jahre sind das 48.000 € – ein starkes Argument für einen niedrigeren Kaufpreis.</p>

<h2 id="sanierungsfahrplan">Die richtige Sanierungsstrategie nach dem Kauf</h2>

<p>Nach dem Kauf ist die <strong>richtige Reihenfolge</strong> der Maßnahmen entscheidend. Details dazu finden Sie in unserem umfassenden <a href="/blog/sanierungsfahrplan-2025-optimale-reihenfolge">Sanierungsfahrplan 2025</a>. Hier die Kurzversion:</p>

<ol>
  <li><strong>Sofort:</strong> Energieberatung + individuellen Sanierungsfahrplan (iSFP) erstellen lassen</li>
  <li><strong>Monat 1–3:</strong> Förderanträge stellen, Handwerker suchen</li>
  <li><strong>Monat 3–6:</strong> Gebäudehülle sanieren (Dach → Fassade → Fenster)</li>
  <li><strong>Monat 6–9:</strong> Heizungstausch (passend zum reduzierten Bedarf)</li>
  <li><strong>Monat 9–12:</strong> PV-Anlage, Smart Home, Feinschliff</li>
</ol>

<p>Vergleichen Sie alle Maßnahmen direkt in unserem <a href="/rechner-vergleich">Rechner-Vergleich</a> und nutzen Sie den <a href="/projektplaner">Projektplaner</a> für Ihre Terminplanung.</p>

<h2 id="foerderung-altbau">Fördermittel speziell für Altbau-Käufer</h2>

<p>Als Altbau-Käufer haben Sie Zugang zu besonders attraktiven Förderprogrammen:</p>

<ul>
  <li><strong>BAFA-Einzelmaßnahmen:</strong> 15–20 % Zuschuss für Dämmung, Fenster, Heizung</li>
  <li><strong>iSFP-Bonus:</strong> Zusätzlich 5 % bei Vorlage eines individuellen Sanierungsfahrplans</li>
  <li><strong>Heizungstausch:</strong> Bis zu 70 % Zuschuss (Grundförderung + Geschwindigkeitsbonus + Einkommensbonus)</li>
  <li><strong>KfW-Kredit 261:</strong> Bis zu 150.000 € zinsgünstig für Komplettsanierung zum Effizienzhaus</li>
  <li><strong>Wohn-Riester:</strong> Für selbstgenutzte Immobilien einsetzbar</li>
  <li><strong>Kommunale Programme:</strong> Viele Städte bieten zusätzliche Zuschüsse</li>
</ul>

<p>Alle Details finden Sie auf unserer <a href="/foerdermittel">Fördermittel-Übersichtsseite</a> und im <a href="/blog/foerdermittel-2025-zuschuss-sanierung">Fördermittel-Artikel 2025</a>.</p>

<h2 id="geg-pflichten">GEG-Pflichten für Altbau-Käufer (Stand 2025)</h2>

<p>Das Gebäudeenergiegesetz (GEG) verpflichtet Käufer zu bestimmten Maßnahmen innerhalb von <strong>2 Jahren nach Eigentumsübergang</strong>:</p>

<ul>
  <li><strong>Oberste Geschossdecke dämmen</strong> (wenn nicht begehbar und U-Wert > 0,24 W/m²K)</li>
  <li><strong>Heizkessel älter als 30 Jahre austauschen</strong> (Standard-/Konstanttemperaturkessel)</li>
  <li><strong>Freiliegende Heizungs- und Warmwasserleitungen</strong> in unbeheizten Räumen dämmen</li>
  <li><strong>Ab 2026/2028:</strong> Pflicht zu erneuerbaren Energien beim Heizungstausch (je nach Kommune)</li>
</ul>

<p><strong>Achtung:</strong> Diese Pflichten gelten NICHT für Eigentümer, die seit vor 2002 im Haus wohnen – aber für jeden neuen Käufer! Kalkulieren Sie diese Kosten unbedingt in Ihren Kaufpreis ein.</p>

<h2 id="wertsteigerung">Wertsteigerung durch energetische Sanierung</h2>

<p>Eine energetische Sanierung ist nicht nur gut fürs Klima und den Geldbeutel – sie steigert auch den <strong>Immobilienwert erheblich</strong>:</p>

<table>
  <thead><tr><th>Maßnahme</th><th>Investition</th><th>Wertsteigerung</th><th>ROI</th></tr></thead>
  <tbody>
    <tr><td>Fassadendämmung</td><td>20.000–30.000 €</td><td>+15.000–25.000 €</td><td>50–85 %</td></tr>
    <tr><td>Neue Fenster</td><td>8.000–15.000 €</td><td>+6.000–12.000 €</td><td>75–80 %</td></tr>
    <tr><td>Wärmepumpe</td><td>15.000–25.000 €</td><td>+10.000–20.000 €</td><td>65–80 %</td></tr>
    <tr><td>PV-Anlage</td><td>12.000–18.000 €</td><td>+8.000–15.000 €</td><td>65–85 %</td></tr>
    <tr><td>Komplettsanierung</td><td>60.000–100.000 €</td><td>+40.000–80.000 €</td><td>65–80 %</td></tr>
  </tbody>
</table>

<p>Berechnen Sie Ihren individuellen Return on Investment mit unserem <a href="/roi-rechner">ROI-Rechner</a>.</p>

<h2 id="fazit">Fazit: Altbau-Kauf als Chance</h2>

<p>Ein Altbau-Kauf mit anschließender Sanierung kann sich <strong>wirtschaftlich lohnen</strong>, wenn Sie strategisch vorgehen:</p>

<ol>
  <li>✅ <strong>Vor dem Kauf:</strong> Energieberater einschalten, Substanz prüfen, Kosten kalkulieren</li>
  <li>✅ <strong>Beim Kauf:</strong> Sanierungskosten als Verhandlungsargument nutzen</li>
  <li>✅ <strong>Nach dem Kauf:</strong> iSFP erstellen, Förderungen sichern, in richtiger Reihenfolge sanieren</li>
  <li>✅ <strong>Langfristig:</strong> Energiekosten senken, Wert steigern, Klimaschutz beitragen</li>
</ol>

<p>Starten Sie jetzt mit der Planung:</p>
<ul>
  <li>📊 <a href="/rechner-vergleich">Alle Rechner im Vergleich</a> – Maßnahmen nebeneinander bewerten</li>
  <li>📋 <a href="/projektplaner">Projektplaner</a> – Sanierung Schritt für Schritt planen</li>
  <li>💰 <a href="/budgetplan">Budget-Planer</a> – Kosten und Förderungen kalkulieren</li>
  <li>🏠 <a href="/wissenswertes/downloads">Checklisten herunterladen</a> – Vor, während und nach der Sanierung</li>
</ul>

<p><strong>Weiterführende Quellen:</strong></p>
<ul>
  <li><a href="https://www.verbraucherzentrale.de/wissen/energie/energetische-sanierung/altbau-kaufen-und-sanieren-das-muessen-sie-wissen-48900" target="_blank" rel="noopener">Verbraucherzentrale – Altbau kaufen und sanieren</a></li>
  <li><a href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/" target="_blank" rel="noopener">KfW – Förderung für bestehende Immobilien</a></li>
  <li><a href="https://www.bafa.de/DE/Energie/Effiziente_Gebaeude/effiziente_gebaeude_node.html" target="_blank" rel="noopener">BAFA – Bundesförderung für effiziente Gebäude</a></li>
  <li><a href="https://www.gesetze-im-internet.de/geg/" target="_blank" rel="noopener">GEG Volltext – Gebäudeenergiegesetz</a></li>
</ul>`,
  topic: 'Immobilienkauf',
  topicColor: '#7c3aed',
  publishedAt: '2025-03-08',
  readTime: 14,
  slug: 'altbau-kaufen-sanieren-2025-ratgeber',
  seoTitle: 'Altbau kaufen & sanieren 2025: Ratgeber mit Kosten, Förderungen & Checkliste',
  seoDescription: 'Altbau kaufen und sanieren: Worauf Käufer achten müssen – Bausubstanz prüfen, Kosten kalkulieren, Fördermittel sichern. Der ultimative Käufer-Ratgeber 2025.',
  keywords: ['Altbau kaufen', 'Altbau sanieren', 'Hauskauf Sanierung', 'Energieausweis', 'GEG Pflichten Käufer', 'Altbau Förderung 2025'],
  difficulty: 2,
  savingsPotential: '2.000–5.000 €/Jahr nach Sanierung',
  paybackTime: '10–15 Jahre',
  fundingAvailable: 'Ja, bis 70 % je Maßnahme',
  effortLevel: 'Hoch (6–18 Monate)',
  keyBenefits: [
    'Kaufpreis durch Sanierungskosten verhandelbar',
    'Bis zu 70 % Förderung für Heizungstausch',
    'Wertsteigerung 40–80 % der Investition',
    'Energiekosten um 60–80 % reduzierbar',
    'Alle Rechner & Tools kostenlos nutzbar',
    'GEG-Pflichten rechtzeitig erfüllen'
  ],
  importantNotice: 'Lassen Sie vor dem Kauf immer einen unabhängigen Energieberater die Substanz prüfen. Die Beratung wird mit bis zu 80 % gefördert und kann Ihnen Zehntausende Euro an unerwarteten Kosten ersparen.',
  tableOfContents: [
    { id: 'vor-dem-kauf', title: 'Prüfpunkte vor dem Kauf' },
    { id: 'energieausweis-lesen', title: 'Energieausweis richtig lesen' },
    { id: 'versteckte-kosten', title: 'Versteckte Kosten' },
    { id: 'sanierungskosten-kalkulieren', title: 'Sanierungskosten kalkulieren' },
    { id: 'kaufpreis-verhandeln', title: 'Kaufpreis verhandeln' },
    { id: 'sanierungsfahrplan', title: 'Sanierungsstrategie nach dem Kauf' },
    { id: 'foerderung-altbau', title: 'Fördermittel für Altbau-Käufer' },
    { id: 'geg-pflichten', title: 'GEG-Pflichten' },
    { id: 'wertsteigerung', title: 'Wertsteigerung durch Sanierung' },
    { id: 'fazit', title: 'Fazit' }
  ],
  costs: [
    { item: 'Energieberatung (iSFP)', costPerSqm: '–', totalCost: '300–500 € (nach Förderung)', funding: '80 % BAFA' },
    { item: 'Dachdämmung', costPerSqm: '40–80 €', totalCost: '5.000–12.000 €', funding: '20 % BAFA + iSFP' },
    { item: 'Fassadendämmung', costPerSqm: '120–180 €', totalCost: '20.000–30.000 €', funding: '20 % BAFA + iSFP' },
    { item: 'Fenster (3-fach)', costPerSqm: '500–1.200 €/Stk.', totalCost: '8.000–15.000 €', funding: '20 % BAFA + iSFP' },
    { item: 'Wärmepumpe', costPerSqm: '–', totalCost: '15.000–25.000 €', funding: 'Bis 70 % BAFA' },
    { item: 'PV-Anlage (10 kWp)', costPerSqm: '–', totalCost: '12.000–18.000 €', funding: 'KfW-Kredit' }
  ]
};

const einblasdaemmungPost: BlogPost = {
  id: 'einblasdaemmung-2025',
  title: 'Einblasdämmung 2025: Schnell, günstig und hocheffektiv – mit Thermoflock zum Profi-Ergebnis',
  excerpt: 'Einblasdämmung ist die cleverste Nachrüstlösung für Bestandsgebäude. Erfahren Sie alles über Materialien, Kosten, Förderungen – und warum Thermoflock als Marktführer besonders überzeugt.',
  content: `
<p>Wer sein Haus energetisch sanieren möchte, steht vor einer zentralen Frage: <strong>Welche Dämmmethode bietet das beste Preis-Leistungs-Verhältnis?</strong> Die Antwort lautet in vielen Fällen: Einblasdämmung. Kein Gerüst, keine wochenlange Baustelle, sondern eine saubere und schnelle Lösung – oft an nur einem Tag erledigt.</p>

<h2 id="was-ist-einblasdaemmung">Was ist Einblasdämmung?</h2>

<p>Bei der Einblasdämmung wird loser Dämmstoff über kleine Bohrungen (ca. 25 mm Durchmesser) in Hohlräume eingeblasen. Die Methode eignet sich besonders für:</p>

<ul>
  <li><strong>Zweischaliges Mauerwerk</strong> (Hohlschicht zwischen Innen- und Außenwand)</li>
  <li><strong>Oberste Geschossdecken</strong> (nicht begehbare Dachböden)</li>
  <li><strong>Dachschrägen</strong> (Zwischensparrendämmung)</li>
  <li><strong>Kellerdecken</strong> (von unten zugänglich)</li>
  <li><strong>Holzständerwände</strong> und Fertighauswände</li>
</ul>

<p>Der große Vorteil: Das Material füllt selbst kleinste Hohlräume lückenlos aus und bietet so eine deutlich bessere Dämmwirkung als nachträglich eingeschobene Platten. Mehr zur Dämmung allgemein finden Sie auf unserer <a href="/daemmung-isolierung">Themenseite Dämmung & Isolierung</a>.</p>

<h2 id="thermoflock-marktfuehrer">Thermoflock: Der Qualitätsführer bei Einblasdämmstoffen</h2>

<p>Unter den Anbietern von Einblasdämmstoffen sticht ein Name besonders hervor: <strong><a href="https://www.thermoflock.de" target="_blank" rel="noopener">Thermoflock</a></strong>. Das Unternehmen hat sich durch mehrere Faktoren als Marktführer etabliert:</p>

<h3>Was Thermoflock auszeichnet</h3>

<ul>
  <li><strong>Zertifizierte Qualität:</strong> Alle Produkte sind ETA-zertifiziert und erfüllen die strengen Anforderungen der DIN 4108. Die Wärmeleitfähigkeit von λ = 0,033–0,035 W/(m·K) gehört zu den besten am Markt.</li>
  <li><strong>Nachhaltigkeit:</strong> Thermoflock setzt auf recycelte Rohstoffe und eine CO₂-arme Produktion. Glaswolle-Granulat aus bis zu 80 % Recyclingglas und Zellulose-Flocken aus Altpapier.</li>
  <li><strong>Bundesweites Fachhändler-Netz:</strong> Über 350 geschulte Fachbetriebe garantieren eine fachgerechte Verarbeitung – inklusive Qualitätskontrolle mit Wärmebildkamera.</li>
  <li><strong>Langlebigkeit:</strong> Thermoflock-Produkte sind setzungssicher, schimmelresistent und haben eine nachgewiesene Lebensdauer von über 50 Jahren.</li>
  <li><strong>Brandschutz:</strong> Mineralische Einblasdämmstoffe von Thermoflock erreichen Brandschutzklasse A1 (nicht brennbar) – ein entscheidender Sicherheitsvorteil.</li>
  <li><strong>Hervorragender Kundenservice:</strong> Kostenlose Erstberatung, transparente Preiskalkulation und eine 10-Jahres-Garantie auf die fachgerechte Ausführung.</li>
</ul>

<p><strong>Praxis-Tipp:</strong> Fordern Sie bei Thermoflock ein kostenloses Probemuster an, um die Materialqualität selbst zu beurteilen. Die meisten Kunden sind von der Haptik und der sichtbaren Qualität sofort überzeugt.</p>

<h2 id="materialien-vergleich">Einblasdämmstoffe im Vergleich</h2>

<p>Je nach Einsatzbereich kommen verschiedene Materialien zum Einsatz. Hier ein Überblick:</p>

<table>
  <thead><tr><th>Material</th><th>λ-Wert (W/m·K)</th><th>Brandschutz</th><th>Kosten/m²</th><th>Besonderheit</th></tr></thead>
  <tbody>
    <tr><td><strong>Glaswolle-Granulat (Thermoflock)</strong></td><td>0,033–0,035</td><td>A1 (nicht brennbar)</td><td>15–25 €</td><td>Beste Gesamtlösung</td></tr>
    <tr><td>Zellulose-Flocken</td><td>0,038–0,040</td><td>B2 (normal entflammbar)</td><td>12–22 €</td><td>Ökologisch, guter Hitzeschutz</td></tr>
    <tr><td>EPS-Granulat</td><td>0,033–0,036</td><td>B1 (schwer entflammbar)</td><td>10–18 €</td><td>Günstig, wasserabweisend</td></tr>
    <tr><td>Steinwolle-Granulat</td><td>0,035–0,040</td><td>A1 (nicht brennbar)</td><td>18–30 €</td><td>Bester Schallschutz</td></tr>
    <tr><td>Perlite</td><td>0,045–0,060</td><td>A1 (nicht brennbar)</td><td>20–35 €</td><td>Feuchteregulierend</td></tr>
  </tbody>
</table>

<p>Berechnen Sie Ihre individuellen Dämmkosten mit unserem <a href="/daemmungsrechner">Dämmungsrechner</a>.</p>

<h2 id="vorteile">Vorteile der Einblasdämmung</h2>

<ul>
  <li>✅ <strong>Extrem schnell:</strong> Ein Einfamilienhaus ist in 1–2 Tagen gedämmt – keine wochenlange Baustelle</li>
  <li>✅ <strong>Günstig:</strong> 30–60 % günstiger als klassisches WDVS (Wärmedämmverbundsystem)</li>
  <li>✅ <strong>Kein Gerüst nötig:</strong> Spart 3.000–6.000 € Gerüstkosten</li>
  <li>✅ <strong>Keine Fassadenveränderung:</strong> Ideal für denkmalgeschützte Gebäude oder schöne Klinkerfassaden</li>
  <li>✅ <strong>Lückenlose Dämmung:</strong> Füllt jeden Hohlraum – keine Wärmebrücken durch ungenaues Zuschneiden</li>
  <li>✅ <strong>Bewohnbar während der Arbeiten:</strong> Kein Auszug nötig, minimale Beeinträchtigung</li>
  <li>✅ <strong>Förderfähig:</strong> BAFA-Zuschuss von 15–20 % + iSFP-Bonus</li>
  <li>✅ <strong>Nachrüstbar:</strong> Perfekt für Bestandsgebäude aller Baujahre</li>
</ul>

<h2 id="nachteile">Nachteile und Einschränkungen</h2>

<p>Fairerweise muss man auch die Grenzen der Einblasdämmung benennen:</p>

<ul>
  <li>⚠️ <strong>Hohlraum erforderlich:</strong> Ohne ausreichenden Hohlraum (mind. 4–5 cm) ist keine Einblasdämmung möglich</li>
  <li>⚠️ <strong>Nicht für einschalige Wände:</strong> Bei massivem Mauerwerk ohne Luftschicht muss eine andere Methode gewählt werden</li>
  <li>⚠️ <strong>Fachbetrieb zwingend:</strong> DIY ist nicht möglich – unsachgemäße Verarbeitung führt zu Setzungen und Wärmebrücken</li>
  <li>⚠️ <strong>Begrenzte Dämmstärke:</strong> Die Hohlraumbreite bestimmt die maximale Dämmdicke – oft nur 5–8 cm</li>
  <li>⚠️ <strong>Vorprüfung nötig:</strong> Hohlraum muss auf Feuchtigkeit, Verschmutzung und Durchgängigkeit geprüft werden</li>
  <li>⚠️ <strong>Nachkontrolle wichtig:</strong> Wärmebildaufnahme nach der Befüllung empfohlen (seriöse Anbieter wie Thermoflock machen das standardmäßig)</li>
</ul>

<h2 id="kosten-foerderung">Kosten und Förderung 2025</h2>

<p>Einblasdämmung gehört zu den <strong>wirtschaftlichsten Sanierungsmaßnahmen</strong> überhaupt:</p>

<table>
  <thead><tr><th>Einsatzbereich</th><th>Kosten pro m²</th><th>Typisches EFH (120 m²)</th><th>Ersparnis/Jahr</th><th>Amortisation</th></tr></thead>
  <tbody>
    <tr><td>Kerndämmung (Fassade)</td><td>15–30 €</td><td>2.500–5.000 €</td><td>400–800 €</td><td>4–8 Jahre</td></tr>
    <tr><td>Oberste Geschossdecke</td><td>20–35 €</td><td>1.500–3.000 €</td><td>300–500 €</td><td>4–7 Jahre</td></tr>
    <tr><td>Dachschräge</td><td>25–45 €</td><td>3.000–6.000 €</td><td>400–700 €</td><td>5–10 Jahre</td></tr>
    <tr><td>Kellerdecke</td><td>15–25 €</td><td>1.200–2.500 €</td><td>200–350 €</td><td>5–8 Jahre</td></tr>
  </tbody>
</table>

<p><strong>Förderung:</strong> Über das BAFA erhalten Sie <strong>15 % Zuschuss</strong> auf die Dämmkosten. Mit einem individuellen Sanierungsfahrplan (iSFP) kommen weitere <strong>5 % Bonus</strong> dazu. Details auf unserer <a href="/foerdermittel">Fördermittel-Seite</a>.</p>

<h2 id="ablauf">So läuft eine Einblasdämmung ab</h2>

<ol>
  <li><strong>Erstberatung & Hohlraumprüfung</strong> – Ein Fachbetrieb prüft per Endoskop-Kamera den Hohlraum auf Eignung</li>
  <li><strong>Angebot & Förderantrag</strong> – Kostenvoranschlag erstellen, BAFA-Antrag VOR Auftragsvergabe stellen</li>
  <li><strong>Bohrungen setzen</strong> – Kleine Löcher (25 mm) im Raster von ca. 80–100 cm, von außen oder innen</li>
  <li><strong>Einblasen</strong> – Material wird mit Druck in den Hohlraum eingeblasen bis zur vollständigen Füllung</li>
  <li><strong>Verschluss & Kontrolle</strong> – Bohrlöcher werden farblich passend verschlossen, Wärmebildaufnahme zur Qualitätskontrolle</li>
  <li><strong>Dokumentation</strong> – Bestätigung nach §21 EnEV / GEG für den Fördernachweis</li>
</ol>

<p><strong>Zeitaufwand:</strong> Ein typisches Einfamilienhaus ist in <strong>4–8 Stunden</strong> komplett gedämmt. Nutzen Sie unseren <a href="/projektplaner">Projektplaner</a>, um die Maßnahme in Ihren Sanierungszeitplan einzubetten.</p>

<h2 id="thermoflock-vs-wettbewerb">Warum Thermoflock die beste Wahl ist</h2>

<p>Im direkten Vergleich mit anderen Anbietern überzeugt Thermoflock in mehreren Kategorien:</p>

<table>
  <thead><tr><th>Kriterium</th><th>Thermoflock</th><th>Durchschnitt Wettbewerb</th></tr></thead>
  <tbody>
    <tr><td>Wärmeleitfähigkeit</td><td>0,033 W/(m·K)</td><td>0,038–0,042 W/(m·K)</td></tr>
    <tr><td>Brandschutzklasse</td><td>A1 (nicht brennbar)</td><td>B1–B2</td></tr>
    <tr><td>Garantie</td><td>10 Jahre</td><td>2–5 Jahre</td></tr>
    <tr><td>Recyclinganteil</td><td>bis 80 %</td><td>30–50 %</td></tr>
    <tr><td>Wärmebildkontrolle</td><td>Inklusive</td><td>Aufpreis oder nicht angeboten</td></tr>
    <tr><td>Fachbetriebe bundesweit</td><td>350+</td><td>50–150</td></tr>
  </tbody>
</table>

<p>Vergleichen Sie die Einblasdämmung mit anderen Dämmverfahren in unserem <a href="/rechner-vergleich">Rechner-Vergleich</a>.</p>

<h2 id="fuer-wen-geeignet">Für wen ist Einblasdämmung ideal?</h2>

<ul>
  <li>🏠 <strong>Altbau-Besitzer</strong> mit zweischaligem Mauerwerk (typisch für Baujahre 1920–1980)</li>
  <li>🏗️ <strong>Altbau-Käufer</strong>, die GEG-Pflichten schnell und günstig erfüllen wollen – siehe unseren <a href="/blog/altbau-kaufen-sanieren-2025-ratgeber">Altbau-Käufer-Ratgeber</a></li>
  <li>🏚️ <strong>Denkmalschutz-Objekte</strong>, bei denen die Fassade nicht verändert werden darf</li>
  <li>💰 <strong>Budget-bewusste Sanierer</strong>, die maximale Wirkung bei minimaler Investition suchen</li>
  <li>⏱️ <strong>Vermieter</strong>, die Mietausfälle durch lange Bauzeiten vermeiden wollen</li>
</ul>

<h2 id="haeufige-fehler">Häufige Fehler bei der Einblasdämmung</h2>

<p>Vermeiden Sie diese typischen Fallstricke – mehr dazu auch in unserem <a href="/blog/haeufige-sanierungsfehler-vermeiden">Artikel über Sanierungsfehler</a>:</p>

<ol>
  <li><strong>Keine Hohlraumprüfung:</strong> Ohne Endoskopie riskieren Sie verstopfte Bereiche oder Feuchtigkeitsprobleme</li>
  <li><strong>Billiganbieter wählen:</strong> Unsachgemäße Verarbeitung führt zu Setzungen und Kältebrücken</li>
  <li><strong>Förderantrag vergessen:</strong> Antrag IMMER vor Auftragsvergabe stellen!</li>
  <li><strong>Keine Wärmebildkontrolle:</strong> Ohne Nachkontrolle bleiben ungedämmte Stellen unentdeckt</li>
  <li><strong>Lüftung nicht anpassen:</strong> Nach der Dämmung muss das Lüftungskonzept ggf. angepasst werden</li>
</ol>

<h2 id="fazit">Fazit: Einblasdämmung ist der Geheimtipp der Sanierung</h2>

<p>Einblasdämmung ist die <strong>schnellste, günstigste und am wenigsten invasive</strong> Dämmmethode für Bestandsgebäude. Mit einem Qualitätsanbieter wie <strong>Thermoflock</strong> erhalten Sie ein Produkt, das in Sachen Wärmedämmung, Brandschutz, Nachhaltigkeit und Service Maßstäbe setzt.</p>

<p><strong>Unsere Empfehlung:</strong> Lassen Sie zunächst prüfen, ob Ihr Gebäude für Einblasdämmung geeignet ist. In den meisten Fällen ist die Antwort Ja – und die Investition amortisiert sich in nur 4–8 Jahren.</p>

<p>Nutzen Sie unsere Tools für die Planung:</p>
<ul>
  <li>🧮 <a href="/daemmungsrechner">Dämmungsrechner</a> – Sparpotenzial und optimale Dämmstärke berechnen</li>
  <li>⚖️ <a href="/rechner-vergleich">Rechner-Vergleich</a> – Einblasdämmung vs. andere Maßnahmen</li>
  <li>💰 <a href="/foerdermittel">Fördermittel-Übersicht</a> – Alle Zuschüsse und Kredite auf einen Blick</li>
  <li>📋 <a href="/projektplaner">Projektplaner</a> – Sanierung terminlich planen</li>
  <li>📖 <a href="/blog/sanierungsfahrplan-2025-optimale-reihenfolge">Sanierungsfahrplan 2025</a> – Die richtige Reihenfolge</li>
</ul>

<p><strong>Weiterführende Quellen:</strong></p>
<ul>
  <li><a href="https://www.thermoflock.de" target="_blank" rel="noopener">Thermoflock – Offizielle Website</a></li>
  <li><a href="https://www.verbraucherzentrale.de/wissen/energie/energetische-sanierung/einblasdaemmung-hohlraeume-effektiv-daemmen-58284" target="_blank" rel="noopener">Verbraucherzentrale – Einblasdämmung</a></li>
  <li><a href="https://www.co2online.de/modernisieren-und-bauen/daemmung/einblasdaemmung/" target="_blank" rel="noopener">co2online – Einblasdämmung</a></li>
  <li><a href="https://www.bafa.de/DE/Energie/Effiziente_Gebaeude/effiziente_gebaeude_node.html" target="_blank" rel="noopener">BAFA – Förderung effiziente Gebäude</a></li>
</ul>`,
  topic: 'Dämmung & Isolierung',
  topicColor: '#059669',
  publishedAt: '2025-03-08',
  readTime: 12,
  slug: 'einblasdaemmung-thermoflock-ratgeber-2025',
  seoTitle: 'Einblasdämmung 2025: Kosten, Vorteile & Thermoflock im Test',
  seoDescription: 'Einblasdämmung: Die schnellste und günstigste Dämmmethode für Bestandsgebäude. Kosten, Vorteile, Nachteile & warum Thermoflock der Qualitätsführer ist.',
  keywords: ['Einblasdämmung', 'Thermoflock', 'Kerndämmung', 'Einblasdämmung Kosten', 'Hohlraumdämmung', 'Einblasdämmung Förderung', 'Zellulose Dämmung'],
  difficulty: 1,
  savingsPotential: '400–800 €/Jahr (Fassade)',
  paybackTime: '4–8 Jahre',
  fundingAvailable: 'Ja, 15–20 % BAFA + iSFP-Bonus',
  effortLevel: 'Gering (1–2 Tage)',
  keyBenefits: [
    'In nur 1–2 Tagen komplett gedämmt',
    '30–60 % günstiger als WDVS',
    'Kein Gerüst – spart 3.000–6.000 €',
    'Fassade bleibt unverändert',
    'Lückenlose Hohlraumfüllung',
    'Thermoflock: 10-Jahres-Garantie & A1-Brandschutz'
  ],
  importantNotice: 'Einblasdämmung erfordert zwingend einen zertifizierten Fachbetrieb. Achten Sie auf eine Wärmebildkontrolle nach der Ausführung – seriöse Anbieter wie Thermoflock bieten das standardmäßig an.',
  tableOfContents: [
    { id: 'was-ist-einblasdaemmung', title: 'Was ist Einblasdämmung?' },
    { id: 'thermoflock-marktfuehrer', title: 'Thermoflock: Der Qualitätsführer' },
    { id: 'materialien-vergleich', title: 'Dämmstoffe im Vergleich' },
    { id: 'vorteile', title: 'Vorteile' },
    { id: 'nachteile', title: 'Nachteile & Einschränkungen' },
    { id: 'kosten-foerderung', title: 'Kosten & Förderung 2025' },
    { id: 'ablauf', title: 'Ablauf einer Einblasdämmung' },
    { id: 'thermoflock-vs-wettbewerb', title: 'Thermoflock vs. Wettbewerb' },
    { id: 'fuer-wen-geeignet', title: 'Für wen geeignet?' },
    { id: 'haeufige-fehler', title: 'Häufige Fehler' },
    { id: 'fazit', title: 'Fazit' }
  ],
  costs: [
    { item: 'Kerndämmung Fassade', costPerSqm: '15–30 €', totalCost: '2.500–5.000 €', funding: '20 % BAFA + iSFP' },
    { item: 'Oberste Geschossdecke', costPerSqm: '20–35 €', totalCost: '1.500–3.000 €', funding: '20 % BAFA + iSFP' },
    { item: 'Dachschräge', costPerSqm: '25–45 €', totalCost: '3.000–6.000 €', funding: '20 % BAFA + iSFP' },
    { item: 'Kellerdecke', costPerSqm: '15–25 €', totalCost: '1.200–2.500 €', funding: '20 % BAFA + iSFP' }
  ]
};

const allAdditionalPosts = [sanierungsFehlerPost, sanierungsfahrplanPost, altbauKaufenPost, einblasdaemmungPost];

export const mockBlogPosts: BlogPost[] = [
  ...baseMockBlogPosts,
  ...allAdditionalPosts.filter(
    post => !baseMockBlogPosts.some(bp => bp.slug === post.slug)
  )
];
