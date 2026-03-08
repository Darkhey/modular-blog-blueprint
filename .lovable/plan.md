

# Neue Ratgeber-Seiten + FAQ & Checklisten

## Neue Inhaltsseiten (4 Ratgeber + 1 FAQ-Hub)

### 1. `/badezimmer-sanierung` – Ratgeber Badezimmer-Sanierung
- Hero, Kostentabelle (Teilsanierung vs. Komplettsanierung), Checkliste, Zeitplan-Timeline, FAQ-Accordion, CTA zu Kostenrechner
- SEO: JSON-LD `Article` + `FAQPage` Schema

### 2. `/barrierefreies-wohnen` – Ratgeber Barrierefreies Wohnen
- Maßnahmen-Übersicht (Bad, Treppen, Türen, Küche), Fördermittel-Hinweise (KfW 455-B), Kosten-Badges, Checkliste "Barrierefrei-Check", FAQ-Accordion
- SEO: JSON-LD `Article` + `FAQPage`

### 3. `/elektroinstallation` – Ratgeber Elektroinstallation
- Wann ist Erneuerung nötig, Kosten pro Raum, Sicherheitshinweise, Smart-Home-Integration, Checkliste, FAQ
- SEO: JSON-LD `Article` + `FAQPage`

### 4. `/schimmelbeseitigung` – Ratgeber Schimmelbeseitigung
- Ursachen, Gesundheitsrisiken, DIY vs. Fachbetrieb Entscheidungshilfe, Kosten, Präventionsmaßnahmen (Lüften/Dämmen), FAQ
- SEO: JSON-LD `Article` + `FAQPage`

### 5. `/sanierungschecklisten` – Checklisten-Hub
- 3 druckbare Checklisten als Accordion-Sektionen:
  - Vor der Sanierung (Planung, Genehmigungen, Budget)
  - Während der Sanierung (Bauüberwachung, Mängel)
  - Nach der Sanierung (Abnahme, Förderanträge)
- Jede Checkliste mit interaktiven Checkboxen (State), Fortschrittsbalken, PDF-Download-Link
- SEO: JSON-LD `HowTo` Schema

## Technische Umsetzung

### Neue Dateien (9 Dateien)
1. `src/pages/BadezimmerSanierungPage.tsx` – Komplette Ratgeber-Seite
2. `src/pages/BarrierefreiesWohnenPage.tsx` – Komplette Ratgeber-Seite
3. `src/pages/ElektroinstallationPage.tsx` – Komplette Ratgeber-Seite
4. `src/pages/SchimmelbeseitigungPage.tsx` – Komplette Ratgeber-Seite
5. `src/pages/SanierungsChecklistenPage.tsx` – Checklisten-Hub mit interaktiven Checkboxen
6. `src/components/ratgeber/RatgeberHero.tsx` – Wiederverwendbarer Hero für alle Ratgeber
7. `src/components/ratgeber/FAQSection.tsx` – Wiederverwendbare FAQ-Accordion-Komponente mit JSON-LD
8. `src/components/ratgeber/CostTable.tsx` – Wiederverwendbare Kostentabelle
9. `src/components/ratgeber/ChecklistSection.tsx` – Interaktive Checkliste mit Fortschrittsbalken

### Geänderte Dateien
- `src/App.tsx` – 5 neue Routes
- `src/components/layout/Footer.tsx` – Links zu neuen Seiten
- `src/components/layout/Header.tsx` – Ratgeber ins Themen-Dropdown

### UI-Muster
Alle Ratgeber folgen demselben Aufbau:
1. RatgeberHero (Gradient-Header mit Icon + Titel)
2. Inhaltsblöcke (Cards mit Icons, Kosten-Badges)
3. CostTable (Maßnahmen + Preisrahmen)
4. ChecklistSection (druckbare Checkliste)
5. FAQSection (Accordion + JSON-LD FAQPage)
6. CTA-Banner (Link zu passenden Rechnern)

