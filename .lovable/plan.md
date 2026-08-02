# Rechner vervollständigen – einheitlicher Funktionsstandard

Ziel: Alle Rechner bekommen denselben Funktionsumfang wie der Kombi-Rechner (Szenarien, Teilen, PDF, Transparenz, Related-Links). Aktuell ist das nur teilweise umgesetzt.

## Ist-Stand (geprüft)

| Rechner | Szenario/CO₂ | Teilen | PDF | Related | Sensitivität |
|---|---|---|---|---|---|
| Kombi | ja | ja | ja | ja | ja |
| Kostenrechner | nein | ja | ja | nein | nein |
| Solar | ja | ja | ja | nein | nein |
| ROI | ja | nein | nein | ja | nein |
| Förderrechner | nein | nein | nein | ja | nein |
| Energie-Check | nein | nein | nein | ja | nein |
| Heizkosten | nein | nein | nein | nein | nein |
| Dämmung | nein | nein | nein | nein | nein |
| Vergleich | nein | nein | nein | nein | nein |
| WDVS / Dachdämmung (Landing) | nein | nein | nein | ja | nein |
| Budgetplan / Projektplaner | keine Hero/FAQ/HowTo/Related | | | | |

## Schritt 1 – Basisfunktionen überall (größter Nutzen)

- Teilbare Eingaben (`useShareableInputs`) + „Ergebnis teilen" (`ShareResults`) für: ROI, Förderrechner, Energie-Check, Heizkosten, Dämmung.
- PDF-Export (`ResultsPDFExport`) für: ROI, Förderrechner, Energie-Check, Heizkosten, Dämmung.
- `RelatedCalculators` auf Kostenrechner, Solar, Heizkosten, Dämmung, Vergleich ergänzen.
- Budgetplan und Projektplaner auf den Standard heben: `CalculatorHero`, FAQ- und HowTo-Sektion, Related-Links, Katalog-Einträge prüfen.

## Schritt 2 – Rechenlogik & Transparenz

- Szenario- und CO₂-Toggle (`scenarioEngine`) für Heizkostenrechner, Dämmungsrechner und Kostenrechner nachziehen, damit alle mit denselben Energiepreis-Pfaden 2026+ rechnen.
- `SensitivityPanel` (Einflussfaktoren-Matrix) zusätzlich auf ROI- und Förderrechner.
- Einheitliche „Wie wird gerechnet?"-Erläuterung (wie im Kostenrechner) für Heizkosten, Dämmung, ROI, Förderrechner.

## Schritt 3 – Konsistenz & Tests

- Zentrale Annahmen (Energiepreise, Förderquoten, CO₂-Preis) durchgängig aus `src/data/energyPrices2026.ts` beziehen – keine hartkodierten Preise mehr in einzelnen Rechnern.
- Vitest-Tests je Rechner: Plausibilität der Ergebnisse, Förderdeckel, Szenario-Reihenfolge (konservativ ≤ realistisch ≤ optimistisch).
- Kurzer Durchklick-Check im Browser (Mobile 390px), inkl. Share-Link-Wiederherstellung.

## Technische Hinweise

- Wiederverwendung bestehender Bausteine: `src/hooks/useShareableInputs.ts`, `src/components/shared/{ShareResults,ShareInputs,ResultsPDFExport,RelatedCalculators}.tsx`, `src/components/calculators/shared/*`, `src/lib/scenarioEngine.ts`.
- Keine neuen Abhängigkeiten nötig (jspdf, qrcode.react, recharts bereits vorhanden).
- FAQ/HowTo-Einträge für neu ausgestattete Rechner in `src/data/calculatorFaqs.ts` und `src/data/calculatorHowTos.ts` ergänzen (SEO-Snippets bleiben konsistent).
