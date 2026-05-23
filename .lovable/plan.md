# Ziel
Damit Google die Rechner als prominente Rich Results (Sitelinks, "WebApplication"-Karten, FAQ-Akkordeons, Breadcrumbs) ausspielt, brauchen wir ein konsistentes, sauber verschachteltes JSON-LD-Setup plus ergänzende On-Page-Signale auf jeder Rechner-Seite.

## Was Google bei "Rechner-Boxen" tatsächlich rendert
- **Sitelinks Search Box / Sitelinks** unter dem Haupttreffer → `WebSite` + `SearchAction` auf der Startseite + saubere interne Verlinkung & Breadcrumbs.
- **Rich Snippet "FAQ-Akkordeon"** → `FAQPage` JSON-LD pro Rechner (3–5 Fragen).
- **App-/Tool-Karte** → `SoftwareApplication` (oder `WebApplication`) mit `name`, `applicationCategory`, `offers` (Preis 0), `aggregateRating` (optional, nur wenn echte Bewertungen vorhanden).
- **Breadcrumb-Pfad im Snippet** → `BreadcrumbList` JSON-LD + sichtbare Breadcrumbs (haben wir bereits via `CalculatorHero`).
- **Hub-Box mit allen Rechnern** → `ItemList` auf `/rechner` (vorhanden) + zusätzlich `CollectionPage`-Wrapper.

## Status quo
- `CalculatorStructuredData.tsx` liefert bereits `WebApplication` + optional `FAQPage`, wird aber nicht überall mit FAQs gefüttert.
- `RechnerHubPage` hat `ItemList`, aber ohne `CollectionPage`-Hülle und ohne Beschreibungstexte je Item.
- Breadcrumbs sichtbar via `CalculatorHero`, aber **kein** `BreadcrumbList`-JSON-LD.
- `index.html` hat vermutlich kein `WebSite` + `SearchAction` (Sitelinks Search Box). Muss geprüft/ergänzt werden.

## Umsetzung

### 1. Pro Rechner-Seite (9 Seiten)
- `CalculatorStructuredData` erweitern um:
  - `BreadcrumbList`-Schema (aus den Hero-Breadcrumbs ableiten).
  - `SoftwareApplication` zusätzlich zu `WebApplication` (bessere Trefferquote bei Google für "Tool/Rechner"-Queries).
  - Pflicht-Felder: `name`, `url`, `description`, `applicationCategory: "FinanceApplication"`, `operatingSystem: "Any"`, `offers { price: 0 }`, `inLanguage: "de-DE"`, `isAccessibleForFree: true`.
- Jede Rechner-Seite ruft `CalculatorStructuredData` mit **kuratiertem FAQ-Block (3–5 Q&A)** auf. FAQs zentral in `src/data/calculatorFaqs.ts` pflegen.
- Sichtbares FAQ-Accordion unterhalb des Rechners (Google verlangt, dass FAQ-JSON-LD-Inhalt auch on-page sichtbar ist – sonst Rich-Result-Strike).

### 2. Hub-Seite `/rechner`
- JSON-LD um `CollectionPage` + `ItemList` mit `description`, `image`, `url` pro Item erweitern.
- Zusätzlich `BreadcrumbList`.
- H1/Intro semantisch klarer (Keywords "Sanierungsrechner", "kostenlos", "online").

### 3. Sitewide (`index.html`)
- `WebSite` JSON-LD mit `potentialAction: SearchAction` ergänzen (target: `/suche?q={search_term_string}` – Route existiert via `SearchPage`).
- `Organization` JSON-LD prüfen/sicherstellen.

### 4. Interne Verlinkung & Sitelinks-Steuerung
- Footer-/Header-Link "Rechner" → bereits vorhanden, plus Liste der Top-Rechner im Footer (begünstigt Sitelinks).
- Konsistente, aussagekräftige `<title>`-Pattern: `"{Rechnername} 2026 – kostenlos online | Sanieren & Sparen"`.
- `meta description` jeweils mit klarer Nutzenformulierung + Keyword "Rechner".

### 5. Validierung
- Nach Deploy: Hinweis an Nutzer, im **Google Rich Results Test** und in der **Search Console → Verbesserungen** zu prüfen. Kein automatischer Check möglich.

## Betroffene Dateien
- `src/components/seo/CalculatorStructuredData.tsx` (erweitern: SoftwareApplication, BreadcrumbList, breadcrumbs-Prop)
- `src/data/calculatorFaqs.ts` (neu, zentrale FAQs)
- `src/components/shared/CalculatorFaqSection.tsx` (neu, sichtbares Accordion)
- 9 Rechner-Seiten: FAQ-Block einbinden + Structured-Data-Aufruf vereinheitlichen (`Heizkostenrechner`, `Daemmungsrechner`, `Kostenrechner`, `RechnerVergleich`, `Foerderrechner`, `ROIRechner`, `EnergieCheck`, `Sanierungscheck`, `Solarenergie`)
- `src/pages/RechnerHubPage.tsx` (CollectionPage + BreadcrumbList)
- `index.html` (WebSite + SearchAction, sofern fehlt)
- `src/data/calculatorsCatalog.ts` (sicherstellen, dass `description` SEO-tauglich ist – ggf. minimal nachschärfen)

## Out of Scope (für separaten Schritt)
- Aggregierte Bewertungen (`aggregateRating`) – nur wenn echte User-Reviews vorhanden, sonst Google-Spam-Strike.
- Bundesland-Förderpages (B2) – bleibt offen.
