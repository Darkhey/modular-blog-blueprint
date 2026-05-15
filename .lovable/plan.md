# Gesamt-Verbesserungs-Roadmap für sanieren-sparen.de

Nach Stufe 1+2 der Rechner-Optimierung sind die größten verbleibenden Hebel: **Conversion**, **SEO-Tiefe**, **Performance**, **Personalisierung** und **Vertrauen/Monetarisierung**. Vorschlag in 4 Stufen, sortiert nach Wirkung/Aufwand.

---

## Stufe A — Konsolidierung & Politur (schneller Win)

**A1 Rechner-Stufe 3 abschließen**
- Einheitliche `CalculatorHero`-Komponente für alle 12 Rechner (heute 3 abweichende Varianten).
- `CalculatorStructuredData` korrigieren (`energieberater-direkt.de` → `sanieren-sparen.de`) + auf alle Rechner anwenden, FAQ-Schema pro Rechner.
- `useAnalytics` Events: `calc_started`, `calc_completed`, `calc_shared`, `calc_pdf_exported`.
- localStorage-Persistenz + Share-Link mit URL-Params für Heizkosten-, Solar-, Dämm-Rechner.

**A2 Home-Seite entrümpeln**
- `FeaturedCalculatorsCarousel` & alte `CalculatorsSection` entfernen (durch Bento ersetzt, aber Dateien existieren noch).
- Reihenfolge optimieren: Hero → Bento → Stats → Featured Article → Guides → Newsletter (kürzerer Scroll bis Conversion).

**A3 Header/Mega-Menü Politur**
- Mobile-Variante des Rechner-Mega-Menüs prüfen (390px Viewport).
- Aktiver Zustand markieren, Keyboard-Navigation testen.

---

## Stufe B — SEO-Tiefe & Auffindbarkeit

**B1 Programmatic SEO: Bundesland × Maßnahme**
- 16 Bundesländer × 5 Maßnahmen = 80 Landingpages `/foerderung/{bundesland}/{massnahme}` aus `regionalFoerderung.ts` generiert.
- Jede mit lokalem Förderbetrag, Beispielrechnung, Förderrechner-CTA.

**B2 Glossar → Hub-Verlinkung**
- Inline-Tooltips auf Themenseiten („U-Wert", „BAFA", „iSFP") → `/glossar#term`.
- `DefinedTerm` JSON-LD bereits da, aber inkommende Links fehlen.

**B3 Blog-Cluster-Strategie**
- Themen-Hub-Seiten (Heizung, Dämmung, Solar) als „Pillar" mit Listing aller passenden Blogartikel + Rechner + Förderung. Heute sind die Themenseiten reine Marketing-LPs ohne Blog-Cluster.
- Internal-Link-Audit: Orphan-Pages identifizieren.

**B4 Sitemap & robots**
- `sitemap.xml` dynamisch aus Supabase blog_posts + statischer Liste (heute manuell, veraltet schnell).
- Bilder-Sitemap für AI-generierte Assets.

---

## Stufe C — Conversion & Lead-Generierung

**C1 Rechner-Ergebnis → Lead**
- Nach Berechnung: „Ergebnis per E-Mail erhalten" + „Fachmann in Ihrer Region anfragen" (E-Mail via Resend, Lead in Supabase).
- Aktuell endet jeder Rechner ohne Lead-Capture.

**C2 Multi-Step-Lead-Funnel**
- `/sanierungscheck` heute Self-Service. Zusätzlich: Optional am Ende Kontaktformular → Energieberater-Match aus `EnergyAdvisorSearch`.

**C3 Vertrauens-Layer**
- Testimonials/Bewertungen-Sektion mit `Review` JSON-LD.
- „Stand: Mai 2026" Timestamp + Autor auf jeder Rechner-/Förder-Seite (E-E-A-T).

**C4 Newsletter-Reaktivierung**
- Inhalt-spezifische Lead-Magnete: PDF „Förderung 2026 Komplettübersicht" als Opt-in im Förderrechner.

---

## Stufe D — Performance, A11y, Personalisierung

**D1 Performance**
- Bilder: AVIF/WebP + `loading="lazy"` + explizite width/height (CLS).
- `recharts` per Code-Splitting nur in ROI-Rechner laden.
- Lighthouse-Audit-Pass (Ziel: 90+ mobile).

**D2 Accessibility**
- Audit aller Rechner-Forms: Label-Bindung, ARIA-Live für Ergebnisse, Fokus-Reihenfolge.
- Kontrast-Check Glassmorphism in Light-Mode.

**D3 Personalisierung leichtgewichtig**
- Cookie-Profil „Hauseigentümer / Vermieter / Planer" → angepasste CTAs + Empfehlungen.
- „Zuletzt benutzte Rechner" im Header-Mega-Menü.

**D4 Chat-Bot → Action**
- Heute reiner Q&A-Bot. Erweitern: bei Frage „Was kostet Wärmepumpe?" direkter Deep-Link mit vorausgefüllten Rechner-Params.

---

## Reihenfolge & Empfehlung

```text
A (1–2 Tage) → B1+B3 (3–4 Tage) → C1+C3 (2–3 Tage) → D1+D2 (2 Tage)
```

**Empfehlung zu starten:** Stufe A komplett (rundet die Rechner-Arbeit ab und entfernt toten Code), dann **C1 (Lead-Capture in Rechnern)** als größter Business-Hebel, dann **B1 (Programmatic SEO Bundesland-Pages)** für organischen Traffic.

## Offene Fragen

1. Ist **Lead-Generierung mit E-Mail-Versand** (Resend, Supabase-Tabelle `leads`) gewünscht, oder bleibt die Seite rein informativ/AdSense-basiert?
2. Sollen die **80 Bundesland-Förder-Pages** statisch im Build oder dynamisch aus Supabase kommen?
3. Priorität: **mehr Traffic** (Stufe B) oder **mehr Conversion aus bestehendem Traffic** (Stufe C) zuerst?
