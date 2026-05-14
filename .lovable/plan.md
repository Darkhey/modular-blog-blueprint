# Rechner-Auffindbarkeit & Funktions-Audit

## Bestandsaufnahme: Welche Rechner gibt es?

Im Projekt existieren aktuell **12 Tool-/Rechner-Routen**, verteilt über Pages, Sektionen und Wissenswertes. Sie sind nirgends zentral gebündelt und teils nicht in der Navigation.

| Route | Inhalt | Reife | Auffindbarkeit |
|---|---|---|---|
| `/heizkostenrechner` | ModernizationSavingsCalculator (Vollversion) | Stark | nur via Footer/QuickAccess |
| `/heizung-modernisieren#rechner` | gleicher Rechner als Section | Stark | Themen-Menü |
| `/daemmungsrechner` | InsulationCalculator (Vollversion) | Stark | nur via QuickAccess |
| `/daemmung-isolierung` | Themenseite mit Rechner-Section | Stark | Themen-Menü |
| `/solarenergie#rechner` | SolarCalculator (mit Speicher, Wallbox, PLZ) | Sehr stark | Themen-Menü |
| `/kostenrechner` | KostenrechnerPage (Multi-Gewerk + PDF) | Stark | nirgends verlinkt |
| `/rechner-vergleich` | Vergleichs-Dashboard (Heizung+Dämmung+Solar) | Stark | nirgends prominent |
| `/foerderrechner` | nur GovData-Programmliste, **kein Rechner** | Schwach | nur Wissenswertes/Tools |
| `/roi-rechner` | 3 Inputs → einfache Amortisation | Sehr schwach | nur Wissenswertes/Tools |
| `/energie-check` | 3 Ja/Nein-Fragen, Text-Ergebnis | Sehr schwach | nur Wissenswertes/Tools |
| `/sanierungscheck` | mehrstufiger Wizard mit Priorisierung | Stark | Themen-Menü |
| `/projektplaner`, `/budgetplan` | Erklärseiten, kaum interaktiv | Schwach | Footer |

**Kernprobleme**
1. **Kein zentraler Rechner-Hub** und kein Eintrag „Rechner" in der Header-Navigation.
2. `/kostenrechner` und `/rechner-vergleich` sind **gar nicht verlinkt** außer in vereinzelten CTAs.
3. `InteractiveTools` (Wissenswertes/Tools) listet **6 Tools, davon 2 „Coming soon" und ohne Heizkosten-, Dämmungs-, Solar-, Kosten- und Vergleichsrechner** – die wichtigsten fehlen.
4. Drei Rechner (`/roi-rechner`, `/energie-check`, `/foerderrechner`) sind **funktional zu dünn** für den Anspruch der Seite.
5. Auf der Startseite stehen `CalculatorsSection` und `FeaturedCalculatorsCarousel` redundant nebeneinander und zeigen nur 3 Tools.

---

## Stufe 1 — Auffindbarkeit (UI/Nav, keine Rechner-Logik)

**1.1 Neue Hub-Seite `/rechner`**
- `RechnerHubPage.tsx` mit Hero, Filter/Tabs nach Kategorie (Energie • Kosten • Förderung • Planung • Vergleich) und Karten für **alle 12 Tools**.
- Jede Karte: Icon, Titel, Kurzbeschreibung, Badge („Detailrechner" / „Quick-Check" / „Vergleich"), CTA „Jetzt rechnen".
- Strukturierte Daten: `ItemList` JSON-LD aller Rechner für SEO.

**1.2 Header-Navigation erweitern**
- Neuer Top-Level-Eintrag **„Rechner"** mit Mega-Menü (4 Spalten: Heizen / Dämmen / Solar / Förderung & Vergleich) – Desktop und Mobile.
- Bestehende Themen-Dropdowns bleiben unverändert.

**1.3 Footer-Block „Rechner & Tools"**
- Im Footer eine eigene Spalte mit den 6 wichtigsten Rechner-Links statt sie nur unter Themen zu führen.

**1.4 `InteractiveTools` & `QuickAccessButtons` reparieren**
- `InteractiveTools` (Wissenswertes/Tools) auf den vollständigen, kategorisierten Rechner-Katalog umstellen, „Coming soon" entfernen.
- `QuickAccessButtons` von 3 auf alle relevanten Rechner erweitern, Kontext-bewusst (aktueller Rechner wird ausgeblendet) – schon implementiert, nur Liste erweitern.

**1.5 Startseite konsolidieren**
- `FeaturedCalculatorsCarousel` durch eine **Rechner-Bento-Sektion** ersetzen, die 6 Rechner + Link „Alle Rechner ansehen" → `/rechner` zeigt.
- Redundanten `CalculatorsSection`-Block entfernen.

**1.6 Cross-Linking auf Themenseiten**
- Am Ende jeder Themenseite (Heizung, Dämmung, Solar, Fenster, Förderung) ein einheitliches `<RelatedCalculators />`-Modul mit 3 passenden Rechnern + Link zum Hub.

**1.7 Globale Suche & Sitemap**
- `FullTextSearch` um Rechner-Einträge ergänzen, damit „Solarrechner", „Amortisation", „Förderung berechnen" sofort treffen.
- `scripts/generate-sitemap.ts` statische Liste um alle Rechner-Routen ergänzen mit `priority` 0.8.

---

## Stufe 2 — Funktions-Audit & Ausbau der schwachen Rechner

**2.1 `/foerderrechner` zum echten Rechner ausbauen**
- Eingaben: Maßnahme (Heizung/Dämmung/Fenster/Solar/Komplett), Investitionshöhe, Bundesland, Effizienzhaus-Stufe, Selbstnutzer/Vermieter.
- Ausgabe: kombinierte BAFA + KfW + iSFP-Bonus + regionaler Topf, Netto-Investition, Tilgungszuschuss vs. direkter Zuschuss.
- Datenbasis: `regionalFoerderung.ts` + statische BAFA/KfW-Sätze; GovData-Liste als Sekundär-Tab erhalten.

**2.2 `/roi-rechner` aufwerten**
- Mehr Inputs: Energieträger heute (Gas/Öl/Strom/Wärmepumpe), Preis-Steigerung p.a., Förderung in EUR, Lebensdauer, Wartung p.a.
- Ausgabe: dynamische Kurve (recharts) Cashflow über 20 Jahre, Break-Even-Punkt, Barwert/IRR, CO₂-Einsparung.
- Vorlagen-Buttons: „Wärmepumpe", „PV mit Speicher", „Fassadendämmung" – füllen die Felder vor.

**2.3 `/energie-check` zum echten Quick-Audit**
- Von 3 auf 10–12 gewichtete Fragen (Baujahr, Heizung, Dämmstand, Fenster, Lüftung, Verbrauch, PV, Smart Home).
- Ergebnis-Score 0–100, Ampel pro Bereich, Top-3-Empfehlungen mit Deep-Link in passenden Rechner und in `/sanierungscheck`.

**2.4 `/budgetplan` & `/projektplaner`**
- Aus den Erklärseiten interaktive Tools machen: Budget-Slider mit Reserve-Empfehlung, Gewerk-Checkliste mit Kostenbereichen, Export → PDF (vorhandene `ResultsPDFExport`-Logik wiederverwenden).

**2.5 Bestehende Rechner – kleine Lücken**
- `ModernizationSavingsCalculator`: Speichern der Eingaben in `localStorage`, Share-Link mit URL-Parametern.
- `SolarCalculator`: Vergleich „mit/ohne Wallbox" als parallele Ergebnis-Karte statt Toggle.
- `InsulationCalculator`: Material-Empfehlung je U-Wert-Ziel + Link zum Hersteller-Verzeichnis.
- `KostenrechnerPage`: vorausgefüllte Szenarien („Reihenhaus 120 m²", „EFH 180 m²") als Quick-Start-Buttons.

---

## Stufe 3 — SEO, Tracking, Politur

**3.1 SEO pro Rechner**
- Eindeutige `<title>`, Meta-Description, Canonical, OG-Image für jede Rechner-Route.
- `WebApplication`/`HowTo` JSON-LD mittels bestehender `CalculatorStructuredData`-Komponente, erweitert um die neuen Rechner.
- FAQ-Schema pro Rechner-Seite (3–5 Fragen).

**3.2 Tracking-Events**
- `useAnalytics`: Events `calc_started`, `calc_completed`, `calc_shared`, `calc_pdf_exported` mit Rechner-ID – erlaubt später Auswertung welcher Rechner genutzt wird.

**3.3 Konsistente Hero/Karten**
- Einheitliche Hero-Komponente `CalculatorHero` (Icon, Titel, Sub, Trust-Bar „kostenlos • ohne Anmeldung • DSGVO") für alle Rechner-Pages, ersetzt drei abweichende Hero-Varianten.

---

## Reihenfolge & Abhängigkeiten

```text
Stufe 1 (Auffindbarkeit)
   |-- 1.1 Hub /rechner ------------+
   |-- 1.2 Header-Mega-Menü         |
   |-- 1.3 Footer-Block             |--> Voraussetzung für 1.5/1.6/1.7
   |-- 1.4 InteractiveTools fix     |
   |-- 1.5 Home-Bento ersetzen      |
   |-- 1.6 Cross-Links Themenseiten |
   |-- 1.7 Suche + Sitemap          |
        |
        v
Stufe 2 (Funktionsausbau schwacher Rechner)
   |-- 2.1 Förderrechner echt
   |-- 2.2 ROI-Rechner V2
   |-- 2.3 Energie-Check V2
   |-- 2.4 Budget/Projektplaner interaktiv
   |-- 2.5 Bestandspflege
        |
        v
Stufe 3 (SEO + Tracking + Hero-Konsolidierung)
```

## Technische Details

- Neue Datei: `src/data/calculatorsCatalog.ts` als Single Source of Truth (id, route, kategorie, icon, kurzbeschreibung, status). Wird von Hub, Header-Menü, Footer, `InteractiveTools`, `QuickAccessButtons`, `RelatedCalculators` und Sitemap gelesen.
- Neue Komponenten: `RechnerHubPage`, `CalculatorMegaMenu`, `RelatedCalculators`, `CalculatorHero`.
- Neue Edge-Function: keine.
- Neue Dependencies: keine (recharts, jspdf, lucide bereits vorhanden).
- Bestehende `CalculatorStructuredData` korrigiert (aktuell `energieberater-direkt.de` → `sanieren-sparen.de`).

## Empfehlung für den Start

Stufe 1 als ein zusammenhängender Build-Schritt (hoher Effekt, geringes Risiko, keine Berechnungslogik berührt). Danach Stufe 2 in 3 Teilschritten (Förderrechner zuerst, dann ROI, dann Energie-Check). Stufe 3 abschließend in einem Polish-Pass.

Soll ich mit **Stufe 1 komplett** beginnen, oder zuerst nur die Hub-Seite `/rechner` + Header-Eintrag bauen, damit du das Ergebnis siehst, bevor wir den Rest umstellen?