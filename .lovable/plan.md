# Tooltips & Erläuterungen für den Kostenrechner

Ziel: Nutzer verstehen sofort, was Begriffe wie "Bruttokosten", "Förderabzug", "Eigenanteil" bedeuten und woher die Zahlen pro Gewerk kommen — ohne die Seite zu verlassen.

## Umfang (rein UI/Inhalt, keine Logik-Änderungen)

Datei: `src/pages/KostenrechnerPage.tsx` — Tooltip-Icons (`Info` aus lucide) neben den erklärungsbedürftigen Stellen, Inhalte über `Tooltip` (Desktop) und `Popover` (Touch/Mobile).

Datei: `src/data/kostenrechnerData.ts` — pro Gewerk ein neues Feld `tooltip` (kurze Erklärung zu Kostenspanne & Förderbasis), z. B.:
- Fassadendämmung: "WDVS 120–180 €/m², vorgehängte hinterlüftete Fassade 200–250 €/m². BAFA-Förderung 15 % + 5 % iSFP-Bonus."
- Heizung: "Pauschale auf Wohnfläche, da Wärmepumpe/Pellet stark variieren. KfW 458 bis zu 70 % (Sockel 30 % + Boni)."
- Solar: "Keine Direktförderung; Wirtschaftlichkeit über Einspeisevergütung & Eigenverbrauch — siehe Solar-Rechner."
- analog Dach, Fenster, Kellerdecke

## Stellen mit Info-Tooltip

1. Sektion "1. Gewerke auswählen" — Überschrift bekommt einen Info-Hinweis ("Mehrfachauswahl möglich, Werte werden im nächsten Schritt verfeinert.")
2. Pro Gewerk-Karte — kleines Info-Icon neben dem Label zeigt die `tooltip`-Erklärung (Kostenspanne, Förderbasis, Quelle).
3. Förderungs-Badge ("20 % Förderung") — Tooltip: "Geschätzter BAFA/KfW-Satz auf förderfähige Kosten, gedeckelt bei {foerderungMax} €/Wohneinheit."
4. Kostenspanne-Badge ("120–250 €/m²") — Tooltip: "Marktübliche Spanne 2025 inkl. Material & Montage, ohne Gerüst/Sonderbauten."
5. Sektion "2. Mengen & Flächen" — Slider-Label bekommt Tooltip mit Mess-Hilfe (z. B. "Fassadenfläche = Außenwandfläche minus Fenster/Türen").
6. Ergebnis-Karten — drei Info-Icons:
   - **Bruttokosten (Ø)**: "Mittelwert aus Min/Max-Spanne aller gewählten Gewerke, vor Förderung."
   - **Förderabzug**: "Summe der geschätzten Zuschüsse (BAFA/KfW). Tatsächliche Höhe nach Energieberater-Antrag."
   - **Eigenanteil**: "Bruttokosten minus Förderung — der Betrag, den Sie selbst tragen oder finanzieren."
7. Tabellenkopf — Tooltips auf "Förderung" und "Eigenanteil" (gleiche Kurztexte wie 6).
8. Chart — kleiner Hinweis unter dem Titel: "Balken zeigen pro Gewerk Brutto, Förderung und Netto im direkten Vergleich."
9. Footnote bleibt, wird aber durch einen prominenteren "Wie wird gerechnet?"-Collapsible (Accordion) am Seitenende ergänzt mit Formel `Eigenanteil = Menge × Ø-Preis − min(Förderquote × Kosten, Deckel)`.

## Technische Umsetzung

- `TooltipProvider` umschließt die Seite (sofern noch nicht via Layout vorhanden — kurz prüfen, sonst lokal hinzufügen).
- Komponente `<InfoTip content="…" />` als kleines internes Hilfs-JSX in derselben Datei (Info-Icon `w-3.5 h-3.5 text-muted-foreground`, on Touch über `Popover`-Fallback). Hält den Diff klein und vermeidet eine neue Datei.
- A11y: `aria-label="Erläuterung anzeigen"`, fokussierbar via Tab.
- Keine Änderungen an `useKostenrechner`, Berechnung oder Datenstruktur außer optionalem `tooltip?: string` auf `Gewerk`.

## Out of scope

- Keine neuen Berechnungen, keine neuen Eingabefelder, keine Designüberarbeitung der Cards.
- Keine Änderungen an PDF-Export oder Share-Link.
