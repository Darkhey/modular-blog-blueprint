
-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  topic TEXT NOT NULL,
  topic_color TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_time INTEGER NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  keywords TEXT[],
  difficulty INTEGER DEFAULT 2 CHECK (difficulty >= 1 AND difficulty <= 3),
  savings_potential TEXT,
  payback_time TEXT,
  funding_available TEXT,
  effort_level TEXT,
  key_benefits TEXT[],
  important_notice TEXT,
  table_of_contents JSONB,
  costs JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON blog_posts
  FOR SELECT USING (true);

-- Create index for better performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_topic ON blog_posts(topic);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- Insert existing blog posts
INSERT INTO blog_posts (
  title, slug, excerpt, content, topic, topic_color, published_at, read_time,
  seo_title, seo_description, keywords, difficulty, savings_potential, 
  payback_time, funding_available, effort_level, key_benefits, important_notice,
  table_of_contents, costs
) VALUES 
(
  'Heizung modernisieren: Bis zu 40% Energiekosten sparen',
  'heizung-modernisieren-energiekosten-sparen',
  'Erfahren Sie, welche modernen Heizsysteme sich lohnen und wie Sie staatliche Förderungen optimal nutzen können.',
  '# Heizung modernisieren: Bis zu 40% Energiekosten sparen

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

<p>Beginnen Sie noch heute mit der Planung - Ihre Energiekosten und das Klima werden es Ihnen danken!</p>',
  'Heizung modernisieren',
  '#dc2626',
  '2024-01-15T00:00:00Z',
  8,
  'Heizung modernisieren 2024: Bis zu 40% sparen + 70% Förderung',
  'Heizung modernisieren und bis zu 40% Energiekosten sparen. Alle Fördermittel, beste Heizsysteme und Schritt-für-Schritt Anleitung.',
  ARRAY['Heizung modernisieren', 'Energiekosten sparen', 'Wärmepumpe', 'BAFA Förderung'],
  2,
  'Bis zu 40%',
  '8-12 Jahre',
  'Ja, bis zu 70%',
  'Mittel bis hoch',
  ARRAY['Bis zu 40% weniger Heizkosten', 'Staatliche Förderung bis 70%', 'Wertsteigerung der Immobilie', 'Klimaschutz und Nachhaltigkeit', 'Zukunftssichere Technologie', 'Unabhängigkeit von fossilen Brennstoffen'],
  'Förderanträge müssen vor Vertragsabschluss gestellt werden. Eine Energieberatung ist empfehlenswert und wird ebenfalls gefördert.',
  '[{"id": "wann-modernisieren", "title": "Wann modernisieren?"}, {"id": "beste-systeme", "title": "Beste Heizsysteme 2024"}, {"id": "foerderungen", "title": "Staatliche Förderungen"}, {"id": "schritt-fuer-schritt", "title": "Schritt-für-Schritt Anleitung"}, {"id": "fehler-vermeiden", "title": "Häufige Fehler vermeiden"}]',
  '[{"item": "Luft-Wärmepumpe", "costPerSqm": "80-120€", "totalCost": "12.000-20.000€", "funding": "Bis zu 70%"}, {"item": "Gas-Brennwert", "costPerSqm": "50-80€", "totalCost": "8.000-15.000€", "funding": "Bis zu 30%"}, {"item": "Pelletheizung", "costPerSqm": "100-150€", "totalCost": "15.000-25.000€", "funding": "Bis zu 35%"}]'
),
(
  'Dämmung: Der Schlüssel zu niedrigen Heizkosten',
  'daemmung-heizkosten-sparen',
  'Eine gute Dämmung kann Ihre Heizkosten halbieren. Welche Dämmmaßnahmen sich am meisten lohnen und wie Sie optimal vorgehen.',
  '# Dämmung: Der Schlüssel zu niedrigen Heizkosten

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

<p>Mit der richtigen Planung und Umsetzung wird Ihr Haus zur Energiesparimmobilie - gut für Ihren Geldbeutel und die Umwelt!</p>',
  'Dämmung & Isolierung',
  '#7c3aed',
  '2024-01-12T00:00:00Z',
  7,
  'Dämmung: Heizkosten halbieren + alle Fördermittel 2024',
  'Mit der richtigen Dämmung Heizkosten halbieren. Welche Maßnahmen sich lohnen, Kosten, Förderungen und Schritt-für-Schritt Anleitung.',
  ARRAY['Dämmung', 'Heizkosten sparen', 'KfW Förderung', 'Fassadendämmung'],
  2,
  'Bis zu 50%',
  '10-15 Jahre',
  'Ja, bis zu 50%',
  'Mittel bis hoch',
  ARRAY['Bis zu 50% weniger Heizkosten', 'Gleichmäßige, behagliche Temperaturen', 'Schutz vor Feuchtigkeit und Schimmel', 'Wertsteigerung der Immobilie', 'Bessere Energieeffizienzklasse', 'Lärmschutz als Zusatznutzen'],
  'Eine fachgerechte Planung ist entscheidend. Unsachgemäße Dämmung kann zu Feuchteschäden führen.',
  '[{"id": "warum-daemmung", "title": "Warum ist Dämmung wichtig?"}, {"id": "wichtigste-massnahmen", "title": "Wichtigste Dämmmaßnahmen"}, {"id": "daemmstoffe-vergleich", "title": "Dämmstoffe im Vergleich"}, {"id": "foerderungen", "title": "Förderungen und Finanzierung"}, {"id": "vorgehen", "title": "Schritt-für-Schritt Vorgehen"}]',
  '[{"item": "Dachbodendämmung", "costPerSqm": "15-25€", "totalCost": "2.000-4.000€", "funding": "15-20%"}, {"item": "Fassadendämmung", "costPerSqm": "120-180€", "totalCost": "15.000-25.000€", "funding": "15-20%"}, {"item": "Kellerdeckendämmung", "costPerSqm": "25-40€", "totalCost": "3.000-5.000€", "funding": "15-20%"}]'
);

-- Continue with remaining posts...
INSERT INTO blog_posts (
  title, slug, excerpt, content, topic, topic_color, published_at, read_time,
  seo_title, seo_description, keywords, difficulty, savings_potential, 
  payback_time, funding_available, effort_level, key_benefits
) VALUES 
(
  'Fördermittel 2024: Diese Zuschüsse sollten Sie kennen',
  'foerdermittel-2024-zuschuss-sanierung',
  'Bis zu 70% Zuschuss für Ihre Sanierung. Ein Überblick über alle aktuellen Förderprogramme von Bund und Ländern.',
  '# Fördermittel 2024: Diese Zuschüsse sollten Sie kennen

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

2024 sind die Förderbedingungen so attraktiv wie nie. Nutzen Sie die Chance für Ihre energetische Sanierung.',
  'Fördermittel',
  '#059669',
  '2024-01-10T00:00:00Z',
  6,
  'Fördermittel 2024: Bis zu 70% Zuschuss für Sanierung',
  'Alle Förderprogramme 2024 im Überblick. BAFA, KfW und regionale Zuschüsse für Ihre energetische Sanierung optimal kombinieren.',
  ARRAY['Fördermittel 2024', 'BAFA', 'KfW', 'Sanierung Zuschuss'],
  1,
  'Bis zu 70%',
  'Sofort',
  'Ja, das ist das Thema',
  'Niedrig',
  ARRAY['Bis zu 70% der Kosten erstattet', 'Verschiedene Programme kombinierbar', 'Zinsgünstige KfW-Kredite', 'Steuerliche Absetzbarkeit möglich']
),
(
  'Wärmepumpe vs. Gas: Der große Vergleich 2024',
  'waermepumpe-vs-gas-vergleich',
  'Wärmepumpe oder Gas-Brennwert? Wir vergleichen Kosten, Effizienz und Förderung der beiden Heizsysteme.',
  '# Wärmepumpe vs. Gas: Der große Vergleich 2024

Die Entscheidung zwischen Wärmepumpe und Gas-Brennwerttechnik beschäftigt viele Hausbesitzer. Wir zeigen Ihnen die Vor- und Nachteile beider Systeme.',
  'Heizung modernisieren',
  '#dc2626',
  '2024-01-08T00:00:00Z',
  7,
  'Wärmepumpe vs. Gas 2024: Kosten, Effizienz & Förderung',
  'Detaillierter Vergleich von Wärmepumpe und Gas-Brennwert. Kosten, Effizienz, Förderung und Umweltaspekte im Überblick.',
  ARRAY['Wärmepumpe', 'Gas Brennwert', 'Heizung Vergleich', 'Heizkosten'],
  2,
  'Bis zu 60%',
  '8-15 Jahre',
  'Ja, unterschiedlich',
  'Mittel'
);

-- Add more posts with shorter content for brevity
INSERT INTO blog_posts (
  title, slug, excerpt, content, topic, topic_color, published_at, read_time,
  seo_title, seo_description, keywords, difficulty, savings_potential, 
  payback_time, funding_available, effort_level
) VALUES 
(
  'Photovoltaik 2024: Lohnt sich eine Solaranlage noch?',
  'photovoltaik-2024-lohnt-sich-solaranlage',
  'Trotz sinkender Einspeisevergütung kann sich Photovoltaik noch lohnen. Alle Fakten zu Kosten und Rendite.',
  '# Photovoltaik 2024: Lohnt sich eine Solaranlage noch?

Die Einspeisevergütung sinkt, aber Photovoltaik kann sich trotzdem noch lohnen. Der Eigenverbrauch macht den Unterschied.',
  'Solarenergie',
  '#f59e0b',
  '2024-01-05T00:00:00Z',
  5,
  'Photovoltaik 2024: Rentabilität und Kosten von Solaranlagen',
  'Lohnt sich Photovoltaik 2024 noch? Kosten, Rendite und Eigenverbrauch von Solaranlagen im Detail erklärt.',
  ARRAY['Photovoltaik', 'Solaranlage', 'Eigenverbrauch', 'Einspeisevergütung'],
  2,
  'Bis zu 80%',
  '8-12 Jahre',
  'Ja, regional unterschiedlich',
  'Mittel'
),
(
  'Fenster erneuern: 3-fach Verglasung lohnt sich',
  'fenster-erneuern-3fach-verglasung',
  'Moderne Fenster mit 3-fach Verglasung sparen nicht nur Energie, sondern steigern auch den Wohnkomfort erheblich.',
  '# Fenster erneuern: 3-fach Verglasung lohnt sich

Alte Fenster sind oft die größten Energieverschwender im Haus. Moderne 3-fach verglaste Fenster können hier deutliche Verbesserungen bringen.',
  'Fenster & Türen',
  '#8b5cf6',
  '2024-01-03T00:00:00Z',
  4,
  'Fenster erneuern 2024: 3-fach Verglasung Kosten & Förderung',
  'Fenster mit 3-fach Verglasung: Kosten, Einsparungen und Förderungen. Wann sich der Fenstertausch lohnt.',
  ARRAY['Fenster erneuern', '3-fach Verglasung', 'U-Wert', 'Wärmeschutz'],
  1,
  'Bis zu 25%',
  '15-20 Jahre',
  'Ja, 15% Zuschuss',
  'Niedrig bis mittel'
),
(
  'Smart Home Heizung: Intelligente Thermostate im Test',
  'smart-home-heizung-thermostate-test',
  'Smarte Thermostate können bis zu 15% Energie sparen. Welche Modelle überzeugen und wie die Installation funktioniert.',
  '# Smart Home Heizung: Intelligente Thermostate im Test

Intelligente Heizkörperthermostate sind der einfachste Einstieg ins Smart Home. Sie sparen Energie und erhöhen den Komfort.',
  'Smart Home',
  '#06b6d4',
  '2024-01-01T00:00:00Z',
  6,
  'Smart Home Heizung: Thermostate Test & Kaufberatung 2024',
  'Intelligente Thermostate im Test. Welche smarten Heizkörperthermostate sparen am meisten Energie und sind einfach zu installieren.',
  ARRAY['Smart Home', 'Thermostat', 'Heizungssteuerung', 'Energie sparen'],
  1,
  'Bis zu 15%',
  '2-4 Jahre',
  'Nein',
  'Niedrig'
),
(
  'Kellerdecke dämmen: Einfach und effektiv',
  'kellerdecke-daemmen-anleitung',
  'Die Kellerdeckendämmung ist eine der einfachsten Dämmmaßnahmen. So sparen Sie Heizkosten und vermeiden kalte Füße.',
  '# Kellerdecke dämmen: Einfach und effektiv

Die Dämmung der Kellerdecke ist oft übersehen, aber sehr effektiv. Sie reduziert Wärmeverluste und sorgt für wärmere Böden im Erdgeschoss.',
  'Dämmung & Isolierung',
  '#7c3aed',
  '2023-12-28T00:00:00Z',
  3,
  'Kellerdecke dämmen: Anleitung, Kosten & Materialien',
  'Kellerdecke richtig dämmen: Schritt-für-Schritt Anleitung, beste Materialien und was die Dämmung kostet.',
  ARRAY['Kellerdecke dämmen', 'Kellerdeckendämmung', 'kalte Füße', 'Wärmeverlust'],
  1,
  'Bis zu 15%',
  '5-8 Jahre',
  'Ja, 15% Zuschuss',
  'Niedrig'
);
