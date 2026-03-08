

# Feature-Plan: Wertsteigernde Erweiterungen fur sanieren-sparen.de

Basierend auf deinen Prioritaten (Monetarisierung, Content/SEO-Wert, Interaktive Tools) hier ein umfassender Plan mit den wirkungsvollsten Features:

---

## 1. Sanierungs-Glossar / Lexikon (`/glossar`)

**Warum:** Enorm SEO-wirksam -- hunderte Long-Tail-Keywords ("Was ist ein U-Wert?", "Einblasdammung Definition") ziehen organischen Traffic an. Jeder Glossar-Eintrag wird eine eigene indexierbare Seite.

**Umsetzung:**
- Neue Seite `/glossar` mit alphabetischer Navigation (A-Z Filterleiste)
- Suchfeld mit Echtzeit-Filterung
- 50-80 Fachbegriffe als Datei `src/data/glossaryData.ts` mit Feldern: `term`, `slug`, `definition`, `relatedArticles[]`, `relatedCalculators[]`, `category`
- Jeder Begriff verlinkt automatisch auf passende Blog-Artikel und Rechner
- JSON-LD DefinedTermSet Schema fur Google-Snippets
- Interne Verlinkung: Blog-Artikel konnen automatisch Glossar-Begriffe als Tooltips anzeigen

---

## 2. Interaktiver Sanierungs-Entscheidungsbaum (`/sanierungscheck`)

**Warum:** Hohes Nutzer-Engagement, Lead-Generierung, und ein einzigartiges Tool das Konkurrenz-Seiten nicht haben.

**Umsetzung:**
- Wizard-Komponente mit 6-8 Fragen (Gebudealter, Heizungstyp, Budget, Prioritat etc.)
- Schritt-fur-Schritt UI mit Progress-Bar und animierten Ubergangen
- Am Ende: Personalisierte Empfehlung mit Priorisierung (z.B. "1. Dammung, 2. Fenster, 3. Heizung")
- Ergebnis zeigt geschatzte Kosten, Forderung und Amortisationszeit
- CTA-Buttons zu den passenden Rechnern und Blog-Artikeln
- Optional: E-Mail-Ergebnis-Versand (Newsletter-Lead-Generierung)
- Datenstruktur als State-Machine in `src/data/decisionTreeData.ts`

---

## 3. Vorher/Nachher Showcase mit Slider (`/referenzen`)

**Warum:** Visuell uberzeugend, Trust-Building, gut fur Social Sharing und Backlinks.

**Umsetzung:**
- Neue Seite `/referenzen` mit Projekt-Galerie
- Interaktiver Vorher/Nachher-Bild-Slider (CSS-basiert, kein extra Package)
- 6-8 Beispielprojekte mit: Bilder, Kosten, Fordersumme, Energieeinsparung, Zeitraum
- Filter nach Sanierungstyp (Dammung, Heizung, Komplett)
- Jedes Projekt mit Kurztext und Links zu relevanten Rechnern
- Schema.org ImageObject Markup

---

## 4. Affiliate-Optimierung fur Smart-Home-Produkte

**Warum:** Direkte Monetarisierung der bestehenden Produktseite `/smart-home-produkte`.

**Umsetzung:**
- Affiliate-Links (Amazon PartnerNet) mit UTM-Tracking zu jedem Produkt
- "Preis prufen" Buttons mit externem Link-Icon
- Affiliate-Disclaimer im Footer der Produktseite
- Click-Tracking via Supabase Edge Function (anonymisiert) fur Conversion-Analyse
- Vergleichstabelle mit "Gunstigster Preis" Spalte

---

## 5. Regionale Fordermittel-Karte (`/foerdermittel/regional`)

**Warum:** Extrem SEO-relevant -- "Forderung Sanierung Bayern/NRW/Hamburg" sind hochvolumige Suchanfragen. Kein Konkurrent bietet das interaktiv.

**Umsetzung:**
- Interaktive Deutschland-Karte (SVG-basiert, kein externer Map-Provider notig)
- Klick auf Bundesland zeigt regionale Forderprogramme
- Datei `src/data/regionalFoerderung.ts` mit 16 Bundeslander-Datensatzen
- Jedes Bundesland: Programme, Fordersummen, Links zu Antragsstellen
- Kombiniert mit bestehenden BAFA/KfW-Infos
- Breadcrumb-SEO: `/foerdermittel/regional/bayern` etc.

---

## 6. Kosten-Vergleichsrechner ("Was kostet meine Sanierung?")

**Warum:** Das hochste Suchvolumen im Sanierungsbereich sind Kostenfragen. Ein zentraler Rechner bindet alle bestehenden Rechner zusammen.

**Umsetzung:**
- Neue Seite `/kostenrechner` als Meta-Rechner
- Nutzer wahlt Gewerke aus (Dammung, Fenster, Heizung, Solar, Dach)
- Pro Gewerk: Flache/Anzahl eingeben, automatische Kostenschatzung
- Gesamtkostenubersicht mit Diagramm (Recharts)
- Forderabzug automatisch berechnet
- PDF-Export der Kostenschatzung (bestehende `ResultsPDFExport` Komponente nutzen)
- Links zu Detail-Rechnern fur jedes Gewerk

---

## Empfohlene Reihenfolge

| Prioritat | Feature | Impact |
|-----------|---------|--------|
| 1 | Sanierungs-Entscheidungsbaum | Engagement + Leads |
| 2 | Glossar/Lexikon | SEO (Long-Tail) |
| 3 | Regionale Fordermittel-Karte | SEO (High-Volume) |
| 4 | Kosten-Vergleichsrechner | Nutzer-Wert + SEO |
| 5 | Affiliate-Optimierung | Direkte Einnahmen |
| 6 | Vorher/Nachher Showcase | Trust + Social |

Jedes Feature wurde als eigener Schritt umgesetzt werden. Welche Features soll ich zuerst bauen?

