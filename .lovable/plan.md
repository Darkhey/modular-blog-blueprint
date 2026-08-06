# Blog-Automatisierung 2.0 – offene Feinschliff-Punkte

Der Kern des Plans läuft: TOC-Anker, Bildlogik, Search-Console-Sync, Ranking-Engine, View-Tracking und Backfill sind umgesetzt. Vier Punkte aus dem genehmigten Plan fehlen noch – sie sind alle klein, aber genau die, die den Kreislauf schließen.

## 1. Ausfälle sichtbar machen (Admin)

`AutoPilotStatus` zeigt heute nur das Ergebnis eines manuell angestoßenen Laufs. Die Tabelle `blog_generation_runs` wird zwar befüllt, aber nirgends gelesen.

- Letzte 10 Läufe aus `blog_generation_runs` anzeigen (Zeit, Modus, Kategorie/Keyword, Status, Fehlertext, Slug).
- Rote Warnleiste, wenn der jüngste Lauf `error` ist oder länger als 36 Stunden kein erfolgreicher Lauf existiert (typisch bei aufgebrauchten Credits).

## 2. Modus „Refresh statt Neu“

Aktuell erzeugt jeder Lauf einen neuen Artikel. Ergänzung in `auto-generate-daily-post`:

- Jeder zweite Lauf (bzw. der Abendlauf) wählt einen bestehenden Artikel mit Potenzial: Impressionen laut `search_console_stats`, aber schwache CTR oder Position 8–30, und `last_refreshed_at` älter als 90 Tage.
- Die KI schärft Titel, SEO-Description und ergänzt einen fehlenden Abschnitt; danach laufen dieselben Struktur- und Qualitätschecks. `last_refreshed_at` wird gesetzt, `mode: "refresh"` in den Run geloggt.

## 3. Search-Console-Chancen im Admin

Neue Ansicht (Tab im Content-Bereich): Top-Queries aus `search_console_stats` mit vielen Impressionen und ohne passenden Artikel, sortiert nach Potenzial, jeweils mit Button „Artikel dazu erstellen“, der den Generator mit diesem Fokus-Keyword startet.

## 4. Frontend-Restpunkte

- `image_alt` auch in `BlogCard`, `LatestArticlesSection` und im Artikel-Hero statt des Titels ausgeben; `width`/`height` an Hero-Bildern gegen Layoutsprünge.
- „Aktualisiert am …“-Kennzeichnung in `LatestArticlesSection` und im Artikelkopf, wenn `last_refreshed_at` gesetzt ist.
- Startseiten-Block „Meistgesuchte Themen“ aus den Top-Queries, verlinkt auf den jeweils passendsten Artikel.

## Technische Details

- Betroffen: `src/components/admin/AutoPilotStatus.tsx`, neue `SearchConsoleOpportunities.tsx`, `ContentManagementTabs.tsx`, `src/components/blog/BlogCard.tsx`, `src/components/home/LatestArticlesSection.tsx`, Artikel-Hero, neue Homepage-Sektion.
- Backend: `supabase/functions/auto-generate-daily-post/index.ts` (Refresh-Zweig), Wiederverwendung von `_shared/contentStructure.ts` und `_shared/blogPrompt.ts`. Keine neuen Tabellen nötig.
- Hinweis: Ohne AI-Credits im Workspace erzeugt die Pipeline weiterhin nichts – Punkt 1 macht genau das sofort sichtbar.

## Reihenfolge

1 (Sichtbarkeit) → 4 (Frontend) → 2 (Refresh) → 3 (Chancen-Ansicht).
