
# Rechner-Ausbau 2026/2027

Alle 9 Rechner werden systematisch überarbeitet: aktualisierte Werte, geprüfte Formeln, plus 4 neue Querschnittsfunktionen (CO₂-Pfad, Preis-Szenarien, Kombi-Berechnung, Sensitivitätsanalyse).

## Phase 1 — Fundament (zentrale Daten & Utilities)

Neue Datei `src/data/energyPrices2026.ts` als Single Source of Truth:
- Strompreis-Szenarien (Best/Normal/Worst): 0,28 / 0,34 / 0,42 €/kWh; Steigerung 2–5 %/a
- Gas-/Ölpreis 2026 + Prognose
- **CO₂-Preis-Pfad**: 55 €/t (2025) → 65 €/t (2026) → 55–65 €/t (2027, ETS-2-Übergang), ab 2027 marktbasiert (Prognose 80–120 €/t)
- Einspeisevergütung 2026 (aktuelle degression), 0 % MwSt. bestätigt
- BAFA/KfW 2026: KfW-458 Sätze, iSFP-Bonus, Klimageschwindigkeit, Einkommensbonus (neue Grenzen)
- GEG-2026 U-Wert-Anforderungen (Fassade 0,24 / Dach 0,20 / Fenster 1,3)

Neue Utility `src/lib/scenarioEngine.ts`:
- `runScenario(inputs, priceScenario, co2Path)` → berechnet Cashflow inkl. CO₂-Aufschlag auf fossile Brennstoffe
- Genutzt von ROI-, Heizungs-, Solar-Rechner

## Phase 2 — Rechner-für-Rechner Update

| Rechner | Werte-Update | Logik-/Feature-Ausbau |
|---|---|---|
| **Förderrechner** | KfW-458 2026 Sätze, neue Einkommensgrenzen, Klimabonus-Fristen | Wechselwirkung Einzelmaßnahme vs. Sanierungsfahrplan-Paket; iSFP-Kaskade korrekt |
| **Heizungsrechner** | Gas/Öl/WP/Pellet-Preise 2026, JAZ-Bandbreiten aktualisiert | CO₂-Pfad in Amortisation, Szenario-Toggle Best/Normal/Worst |
| **Solar-Rechner** | Einspeisevergütung Feb 2026, Modul-/Speicherpreise, §14a EnWG | 20-Jahres-Chart mit Szenarien, Netzentgelt-Reduktion §14a |
| **Dämmungsrechner** | GEG-U-Werte, Materialkosten 2026 | Bauteil-Kombi (Fassade+Dach+Keller) mit Gesamt-Einsparung; CO₂-Ersparnis mit Preis-Pfad |
| **Kostenrechner** | Handwerkerpreise 2026 (+ ~4 %) | Kombi-Rabatt bei ≥3 Gewerken (realistischer Skaleneffekt), iSFP-Bonus-Toggle |
| **ROI-Rechner** | Referenz-Energiepreise 2026 | **Sensitivitäts-Slider** (Strompreis, Zinssatz, Inflation) mit Live-Chart-Update; CO₂-Pfad ein/aus |
| **Energie-Check** | Fragenkatalog an GEG-2026 ausrichten | Score-Gewichte neu kalibriert; Ausgabe verlinkt jetzt konkrete Maßnahmen-Kombi |
| **Fenster/Türen-Rechner** | U-Wert-Anforderungen, Preise 2026 | Amortisation über realistischen Wärmebrücken-Faktor |
| **Foerdermittel-Checker** | Programmliste 2026 (BEG-Novelle) | Regionale Top-ups aktualisiert |

## Phase 3 — Neue Querschnitts-Features

### 3.1 Szenario-Umschalter (in ROI, Heizung, Solar)
UI-Component `ScenarioToggle` (3 Buttons: Optimistisch / Realistisch / Vorsichtig) → verändert Preispfade in der Live-Berechnung.

### 3.2 CO₂-Preis-Pfad
Optional aktivierbar in Amortisationsberechnungen. Zeigt zusätzliche Einsparung fossiler Systeme durch steigenden CO₂-Preis. Info-Tooltip erklärt ETS-2.

### 3.3 Sensitivitätsanalyse (ROI-Rechner)
Drei Slider (Strompreissteigerung, Zinssatz, Wartungskosten) mit Live-Update des Amortisations-Charts. Kein neuer Rechner, sondern Panel im bestehenden ROI-Rechner.

### 3.4 Kombi-Berechnung (neue Seite `/rechner/kombi`)
Neuer Rechner der 2–4 Maßnahmen kombiniert und Wechselwirkungen berücksichtigt:
- Dämmung senkt Heizlast → kleinere/günstigere WP möglich
- Solar + WP: erhöhter Eigenverbrauch
- Zeigt: Einzel-Summe vs. Kombi-Realität (Ersparnis ~10–15 % höher, aber Investitionsüberlagerung)
- Empfiehlt Reihenfolge (Hülle vor Technik)

## Phase 4 — Qualitätssicherung

- **Test-Skript** `scripts/testCalculators.ts`: prüft alle Rechner mit Referenz-Szenarien gegen erwartete Bandbreiten (Regressionstest bei zukünftigen Werte-Updates)
- Edge Cases: 0-Werte, Maximal-Werte, ungültige PLZ
- Ergebnis-Konsistenz zwischen Rechnern (Solar-CO₂ = ROI-CO₂ bei gleichen Inputs)
- FAQ + HowTo Texte an neue Features anpassen

## Technische Details

### Neue Dateien
- `src/data/energyPrices2026.ts` — zentrale Preise/Pfade/Förderwerte
- `src/lib/scenarioEngine.ts` — Cashflow-Simulation mit Szenarien + CO₂-Pfad
- `src/components/calculators/shared/ScenarioToggle.tsx`
- `src/components/calculators/shared/CO2PathToggle.tsx`
- `src/components/calculators/shared/SensitivitySliders.tsx`
- `src/pages/KombiRechnerPage.tsx` + Route `/rechner/kombi`
- `scripts/testCalculators.ts`

### Geänderte Dateien
- Alle 9 Rechner-Pages/Hooks (Werte + Wiring der neuen Components)
- `src/data/kostenrechnerData.ts`, `insulationCalculatorData.ts`, `useModernizationCalculator.ts`, `solarCalculations.ts`
- `src/data/calculatorsCatalog.ts` (Kombi-Rechner aufnehmen)
- `src/data/calculatorFaqs.ts` + `calculatorHowTos.ts` (Ergänzungen)

### Rollout-Reihenfolge
1. Phase 1 (Fundament) — 1 Turn
2. Phase 2 A: Förder/Heizung/Solar (traffic-stark) — 1 Turn
3. Phase 2 B: Dämmung/Kosten/ROI/Energie-Check/Fenster — 1 Turn
4. Phase 3 (Kombi-Rechner + neue Toggles wiring) — 1 Turn
5. Phase 4 (Tests + FAQ/HowTo Update) — 1 Turn

Nach Approval starte ich mit Phase 1 + 2A im ersten Schritt.
