

# Kosten-Vergleichsrechner `/kostenrechner`

## Übersicht
Zentraler Meta-Rechner, bei dem Nutzer mehrere Gewerke auswählen (Dämmung, Fenster, Heizung, Solar, Dach), Flächen/Mengen eingeben, und eine Gesamtkostenschätzung mit automatischem Förderabzug und PDF-Export erhalten.

## Neue Dateien

### 1. `src/data/kostenrechnerData.ts`
- Gewerke-Definitionen mit Kostensätzen pro Einheit (€/m² bzw. €/Stück)
- Fördersätze pro Gewerk (BAFA/KfW-Prozentsätze)
- Felder: `id`, `label`, `icon`, `unit`, `costPerUnit` (min/max), `foerderungPercent`, `description`
- 6 Gewerke: Fassadendämmung, Dachdämmung, Fenster, Heizung, Solar, Kellerdecke

### 2. `src/hooks/useKostenrechner.ts`
- State für ausgewählte Gewerke + Mengen/Flächen
- Berechnungslogik: Bruttokosten, Förderabzug, Nettokosten
- Gesamtsumme über alle Gewerke

### 3. `src/pages/KostenrechnerPage.tsx`
- Gewerk-Auswahl via Checkbox-Cards mit Icons
- Pro ausgewähltem Gewerk: Slider/Input für Fläche/Anzahl
- Ergebnis-Sektion: Aufschlüsselung pro Gewerk + Gesamt mit Recharts-Balkendiagramm
- Förderabzug visuell hervorgehoben
- `ResultsPDFExport` mit neuem `kostenrechner`-Case
- `CalculatorStructuredData` SEO-Schema
- Links zu Detail-Rechnern (Dämmungsrechner, Heizkostenrechner, Solar)

### 4. Routing & Navigation
- Route in `App.tsx`
- Link in Footer und Header (Rechner-Dropdown)

## UI-Aufbau
1. Hero-Header (grün/blau Gradient, wie bestehende Rechner)
2. Gewerk-Auswahl: 6 klickbare Cards mit Checkbox, Icon, Kurzinfo
3. Detail-Eingaben: Erscheinen für jedes ausgewählte Gewerk (Fläche/Anzahl Input)
4. "Berechnen" Button
5. Ergebnis: Tabelle + Balkendiagramm (Brutto vs. Netto nach Förderung) + Gesamtsumme
6. PDF-Export + Share-Buttons

