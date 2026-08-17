# Förderrechner: Begriffe verständlich erklären

Ziel: Alle Fachbegriffe im Förderrechner (BAFA, KfW, iSFP, Klimageschwindigkeitsbonus, Effizienzbonus, Einkommensbonus/zvE, Selbstnutzer, Kostendeckel, förderfähige Kosten, Emissionsminderungs-Zuschlag, regionaler Top-up, Eigenanteil) werden direkt im Kontext erklärt – nicht nur im Methodik-Block ganz unten.

## Was sich ändert

**1. Info-Tooltips an jedem Eingabefeld**
Neben jedem Label ein kleines Info-Icon (Touch-tauglich, 44 px Trefferfläche, auch per Tastatur bedienbar) mit 1–2 Sätzen Klartext, z. B.:
- Maßnahme: was zur „Hülle" bzw. „Heizung" zählt und warum das die Förderhöhe bestimmt.
- Investitionskosten: welche Kosten zählen (Material, Einbau, Fachplanung/Baubegleitung) – Eigenleistung nicht.
- Selbstnutzer: nur wer selbst im Haus wohnt, bekommt Klimageschwindigkeits- und Einkommensbonus.
- Klimageschwindigkeitsbonus: Austausch einer alten fossilen Heizung, befristet bis Ende 2028.
- Effizienzbonus: nur für Sole/Wasser-Wärmepumpen oder natürliches Kältemittel.
- Einkommensbonus: zu versteuerndes Haushaltseinkommen (zvE) ≤ 40.000 €/Jahr, Nachweis per Steuerbescheid.
- iSFP: individueller Sanierungsfahrplan vom Energieberater – erhöht Bonus und Kostendeckel bei Hüllen-Maßnahmen.
- Bundesland: steuert den regionalen Top-up.

**2. Ergebnis-Zeilen erklärt**
Gleiche Tooltips auf „Förderfähig (Deckel)", „BAFA/KfW Zuschuss", „Emissionsminderungs-Zuschlag", „Regional", „Eigenanteil" – damit klar wird, warum die Summe kleiner ist als erwartet, wenn der Kostendeckel greift. Zusätzlich ein Hinweis-Satz, sobald die Investition über dem Deckel liegt.

**3. Neuer Abschnitt „Begriffe kurz erklärt"**
Aufklappbare Glossar-Sektion unter dem Rechner (neben „Wie wird gerechnet?") mit allen Begriffen in Langform, jeweils 2–3 Sätze plus Verlinkung auf das bestehende Glossar und die Fördermittel-Seite. Diese Sektion ist auch ohne Hover nutzbar – wichtig auf Mobil.

**4. Mobil-Verhalten**
Auf Touch-Geräten öffnen die Info-Icons ein antippbares Popover statt eines Hover-Tooltips, damit die Erklärungen auf dem Handy erreichbar bleiben.

## Technische Hinweise

- Neue Komponente `src/components/calculators/shared/InfoHint.tsx`: kapselt Tooltip + Popover-Fallback (bestehende shadcn `tooltip`/`popover`), Muster analog `CO2PathToggle.tsx`.
- Begriffstexte zentral in `src/data/foerderGlossar.ts`, damit Tooltip und Glossar-Sektion dieselbe Quelle nutzen (auch für spätere Wiederverwendung im Kombi-Rechner).
- Änderungen nur in `src/pages/FoerderrechnerPage.tsx` (Labels/Ergebnisliste/Accordion) – Rechenlogik bleibt unverändert.
- Passende Begriffe zusätzlich als `DefinedTerm`-Einträge prüfen, damit die bestehende Glossar-SEO-Struktur konsistent bleibt.
