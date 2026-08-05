# Blog-Automatisierung 2.0: Search-Console-Feedback, bessere Struktur, echte Bilder

## Ausgangslage (geprüft)

- 212 veröffentlichte Artikel, **letzter Artikel vom 30.07.2026**. Die beiden Cronjobs (07:00 / 17:00) laufen weiter, aber die Edge Function antwortet seit Tagen mit
  `{"success":false,"error":"Payment required. Please add credits to your Lovable workspace."}` (HTTP 500). **Die Generierung steht wegen aufgebrauchter AI-Credits still** – das ist unabhängig vom Code und muss im Workspace-Billing gelöst werden.
- Das Inhaltsverzeichnis ist **kaputt**: Die KI liefert `table_of_contents` mit IDs, schreibt die Überschriften im HTML aber ohne `id`-Attribut (in allen geprüften Artikeln kein einziges `<h2 id=...>`). Jeder Anker-Klick springt ins Leere.
- Bilder kommen aus `photos/random` bei Unsplash mit den englischen Keywords – das liefert oft thematisch beliebige Fotos, ohne Qualitätsprüfung und ohne Alt-Text.
- `is_featured` ist bei **keinem** Artikel gesetzt, `view_count` überall 0. Die Startseite zeigt deshalb statisch verdrahtete bzw. Mock-Inhalte (`FeaturedArticleHero` verlinkt hart auf einen Artikel von 2025).
- Es gibt keinerlei Rückkopplung zwischen Search Console und der Themenwahl – die Kategorie mit den wenigsten Artikeln gewinnt, egal ob sie Nachfrage hat.

## Ziel

Ein geschlossener Kreislauf: **Search Console liefert Nachfrage → Themenwahl & Aktualisierung → sauber strukturierter Artikel mit passendem Bild → dynamische Platzierung auf der Startseite → Performance fließt zurück.**

---

## Stufe 1 – Pipeline reparieren und härten

1. **Credit-Fehler sichtbar machen:** Die Function schreibt Erfolg/Fehler in eine neue Tabelle `blog_generation_runs` (Zeitpunkt, Kategorie, Status, Fehlertext, Slug). Im Admin (`AutoPilotStatus`) erscheint eine rote Warnung, wenn der letzte Lauf fehlgeschlagen ist – statt wie jetzt tagelanges stilles Nichts.
2. **Retry & Modell-Fallback:** Bei 429/402 ein zweiter Versuch mit kleinerem Modell; bei 402 zusätzlich klare Meldung „Credits aufgebraucht“.
3. **Anker-Fix (Kernpunkt Inhaltsverzeichnis):** Nach dem Parsen werden Überschriften und TOC serverseitig synchronisiert – jede `<h2>`/`<h3>` bekommt eine aus dem Text abgeleitete, eindeutige `id`, und das `table_of_contents` wird aus dem tatsächlichen HTML neu aufgebaut (statt sich auf die KI zu verlassen). Damit stimmt das Verzeichnis immer.
4. **Backfill-Function** `backfill-blog-structure`, die dieselbe Logik auf alle 212 Bestandsartikel anwendet (IDs setzen, TOC neu berechnen, Lesezeit aus Wortzahl korrigieren).
5. **Frontend-TOC aufwerten:** aktiver Abschnitt per IntersectionObserver hervorgehoben, sanftes Scrollen mit Header-Offset, auf Mobil ein einklappbares Verzeichnis über dem Artikel.

## Stufe 2 – Search-Console-Feedback in die Themenwahl

1. Neue Edge Function `sync-search-console`, täglich per Cron: holt über den bestehenden GSC-Connector die letzten 28 Tage (Query- und Page-Dimension) und speichert sie in `search_console_stats` (Query, URL, Impressionen, Klicks, CTR, Position, Datum).
2. Daraus werden zwei Signale abgeleitet:
   - **Chancen-Queries:** viele Impressionen, Position 8–30, wenig Klicks → dafür fehlt ein eigener Artikel oder der bestehende ist zu schwach.
   - **Ausbaufähige Seiten:** Artikel mit Impressionen, aber schwacher CTR → Titel/Description überarbeiten.
3. Die Generator-Function wählt das Thema künftig **nachfragegetrieben**: zuerst aus den Chancen-Queries (mit dem echten Suchbegriff als Fokus-Keyword im Prompt), erst wenn keine vorliegen, greift die bisherige Kategorie-Balance.
4. Neuer Modus **„Refresh statt Neu“**: Statt jedes Mal einen neuen Artikel zu erzeugen, aktualisiert jeder zweite Lauf einen bestehenden Artikel mit Potenzial (Titel/Description schärfen, Abschnitt ergänzen, `updated_at` setzen). Das ist für Google oft wertvoller als der 213. neue Text.
5. Admin-Ansicht „Search-Console-Chancen“: Liste der Top-Queries ohne passenden Artikel, mit Button „Artikel dazu erstellen“.

## Stufe 3 – Prompt-Überarbeitung

Der Superprompt in `_shared/blogPrompt.ts` wird erweitert um:
- **Fokus-Keyword + Suchintention** aus der Search Console als Pflichtvorgabe (Keyword in Titel, erstem Absatz, einer H2).
- **Verbindliche Artikelstruktur:** Antwortabsatz direkt am Anfang (2–3 Sätze, snippet-tauglich), danach Kosten/Zahlen-Block, Praxisteil, Förderteil, Fazit, FAQ.
- **Fakten-Disziplin:** Zahlen nur mit Jahresangabe und Kennzeichnung als Schätzwert; keine erfundenen Studien, Zertifikate oder Testimonials.
- **Interne Verlinkung mit echten Zielen:** Der Prompt bekommt eine Liste vorhandener Slugs und Rechner-Routen übergeben, damit keine Links auf nicht existierende Seiten entstehen (heute möglich). Ungültige Links werden nach der Generierung serverseitig entfernt.
- **Bild-Briefing:** statt drei losen englischen Keywords ein strukturiertes Feld `image_brief` (Motiv, Umgebung, Stimmung) plus deutscher `image_alt`-Text.
- Prüfschritt nach der Generierung: Wenn Pflichtfelder fehlen, zu kurz sind oder das Keyword nicht vorkommt, wird die Generierung einmal wiederholt.

## Stufe 4 – Bilderauswahl neu denken

Vorgeschlagene Reihenfolge (jede Stufe greift nur, wenn die vorherige nichts liefert):
1. **Kuratierte lokale Assets zuerst:** Die vorhandenen projekteigenen Bilder (Heizung, Dämmung, Solar, Fenster, Wärmepumpe, Smart Home, Fördermittel …) werden in einer Mapping-Tabelle mit Stichwörtern hinterlegt und bei Treffern direkt verwendet – thematisch immer passend, keine API-Abhängigkeit.
2. **Unsplash gezielt statt zufällig:** `search/photos` statt `photos/random`, deutschsprachiges Motiv ins Englische übersetzt aus `image_brief`, Mindestbreite und Querformat gefordert, Ergebnis 1 von 5 nach Relevanz gewählt. Fotografen-Credit wird mitgespeichert (Unsplash-Lizenzanforderung).
3. **Kategorie-Fallback** wie bisher.
- Zusätzlich: `image_alt` wird in der Datenbank gespeichert und überall statt des Titels als Alt-Text ausgegeben; Hero-Bilder bekommen `width/height` gegen Layoutsprünge.
- Optional (auf Wunsch): statt Unsplash KI-generierte Titelbilder in einheitlichem Stil – konsistenter, aber teurer pro Artikel. Sag Bescheid, wenn du das willst; im Plan ist zunächst der Unsplash-Weg vorgesehen.

## Stufe 5 – Dynamische Präsentation auf der Startseite

1. **Automatische Kuratierung statt `is_featured`-Handarbeit:** Eine Datenbank-View `blog_posts_ranked` berechnet je Artikel einen Score aus Aktualität, Search-Console-Klicks/Impressionen, Aufrufen und Kategorie-Vielfalt.
2. **`FeaturedArticleHero` wird dynamisch:** zeigt den bestbewerteten Artikel (statt des fest verdrahteten Links von 2025), mit echtem Bild, Kategorie, Lesezeit und Kernaussage.
3. **`DynamicFeaturedGuides`** zieht künftig die Top-4 aus dem Score inkl. Kategorie-Mischung, statt auf Mock-Fallbacks zurückzufallen.
4. **`LatestArticlesSection`** bleibt chronologisch, bekommt aber eine „Aktualisiert“-Kennzeichnung für aufgefrischte Artikel.
5. **View-Tracking reparieren:** `view_count` wird beim Artikelaufruf über eine RPC hochgezählt (heute überall 0), damit der Score echte Nutzungsdaten hat.
6. Startseite erhält einen kompakten Block „Meistgesuchte Themen“, gespeist aus den Top-Queries der Search Console, verlinkt auf die jeweils passenden Artikel.

---

## Technische Details

- Neue Tabellen: `blog_generation_runs`, `search_console_stats`, jeweils mit GRANTs und RLS (öffentlich lesbar nur `search_console_stats`-Aggregate, Schreibrechte nur `service_role`).
- Neue Spalten auf `blog_posts`: `image_alt`, `image_credit`, `focus_keyword`, `last_refreshed_at`, `quality_score`.
- Neue Edge Functions: `sync-search-console`, `backfill-blog-structure`; erweitert werden `auto-generate-daily-post`, `generate-blog-content`, `_shared/blogPrompt.ts`.
- Search Console läuft über den bereits verbundenen Connector (`GOOGLE_SEARCH_CONSOLE_API_KEY`) via Connector-Gateway, serverseitig; die Property wird zur Laufzeit über `/webmasters/v3/sites` aufgelöst.
- Frontend betroffen: `TableOfContents.tsx`, `ArticleBody.tsx`, `FeaturedArticleHero.tsx`, `DynamicFeaturedGuides.tsx`, `LatestArticlesSection.tsx`, `useFeaturedPosts.ts`, `AutoPilotStatus.tsx`.

## Reihenfolge der Umsetzung

Stufe 1 (Reparatur + TOC) → Stufe 3 (Prompt) → Stufe 4 (Bilder) → Stufe 2 (Search-Console-Loop) → Stufe 5 (Startseite).

## Wichtig vorab

Solange die AI-Credits aufgebraucht sind, erzeugt die Pipeline keine Artikel – unabhängig von diesen Verbesserungen. Bitte die Credits im Workspace aufladen; Stufe 1 sorgt dafür, dass so ein Ausfall künftig sofort im Admin sichtbar ist.
