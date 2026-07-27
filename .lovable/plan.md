
# Traffic & Sichtbarkeit — Stufe 1: der blockierende Fehler

## Befund (geprüft)

Die Seite läuft live auf `sanierenundsparen.de` (und `www.sanierenundsparen.de`, beide antworten mit 200). Im Code steht aber überall eine andere Domain:

- `src/config/site.config.ts` → `siteUrl: "https://sanieren-sparen.de"`
- `scripts/generate-sitemap.ts` → `BASE_URL = "https://sanieren-sparen.de"`
- `public/sitemap.xml` → alle 254 URLs zeigen auf `https://sanieren-sparen.de/...`
- `public/robots.txt` → `Sitemap: https://sanieren-sparen.de/sitemap.xml`

`sanieren-sparen.de` (mit Bindestrich) existiert nicht — DNS löst nicht auf. Das heißt: sämtliche Canonicals, og:url-Angaben und alle Sitemap-Einträge verweisen auf eine tote Domain. Google bekommt für jede Seite die Anweisung „die echte Adresse ist woanders" — und dieses Woanders gibt es nicht. Semrush bestätigt das Ergebnis: 3 rankende Keywords, geschätzt 0 Besucher/Monat, beste Position 76.

Das ist die Erklärung für den fehlenden Traffic. Alles andere ist zweitrangig, bis das behoben ist.

## Schritt 1 — Domain überall korrigieren

- `site.config.ts` und `generate-sitemap.ts` auf `https://sanierenundsparen.de` umstellen.
- Sitemap neu generieren (alle 254 Einträge inkl. Blogposts aus Supabase).
- `robots.txt`: Sitemap-Direktive auf die richtige Domain; Kommentarzeile korrigieren.
- Alle weiteren Hardcodings der alten Domain im Code suchen und ersetzen (Canonical-Helper, Structured Data, Share-Links, llms.txt).
- Entscheidung www vs. ohne www: aktuell antworten beide mit 200 → Duplicate Content. Wir setzen **`https://sanierenundsparen.de` ohne www** als kanonische Variante (so ist es auch in den Projekt-Domains hinterlegt); Semrush indexiert bisher die www-Variante, der Canonical konsolidiert das.

## Schritt 2 — Google Search Console anbinden

Der SEO-Scanner meldet GSC als nicht eingerichtet. Ablauf:

1. Search-Console-Connector verbinden (OAuth, Klick durch dich).
2. Meta-Tag-Verifizierung für `https://sanierenundsparen.de/` einbauen und veröffentlichen.
3. Property anlegen + Sitemap einreichen.
4. Danach sehen wir echte Impressionen/Klicks pro Seite statt nur Schätzwerten — Grundlage für alles Weitere.

## Schritt 3 — Indexierbarkeit für die wichtigen Seiten

Das Projekt ist eine reine Client-App: Crawler, die kein JavaScript ausführen, sehen nur die statische `index.html`. Googlebot rendert zwar JS, aber verzögert und unzuverlässig bei vielen Seiten.

Maßnahme mit dem besten Verhältnis von Aufwand zu Wirkung: **Pre-Rendering der Rechner- und Kernseiten beim Build** — die ~20 wichtigsten Routen werden als echte HTML-Dateien mit Titel, Description, Text und JSON-LD ausgeliefert. Blogartikel bleiben vorerst client-seitig.

## Schritt 4 — Keyword-Basis schärfen

Bereits sichtbar (Positionen 76–94, also knapp am Rand der Sichtbarkeit):
`wdvs kosten rechner` (140/mo), `dachdämmung kosten rechner` (170/mo), `sanierungsrechner haus` (140/mo)

Diese drei zeigen alle auf `/daemmungsrechner` bzw. `/`. Statt neue Seiten zu bauen, holen wir sie erst nach vorne:

- Eigene Landingpages `/daemmungsrechner/wdvs-kosten` und `/daemmungsrechner/dachdaemmung-kosten` mit passgenauem Title/H1, Preistabellen und dem Rechner darunter.
- Startseiten-Title auf „Sanierungsrechner Haus" ausrichten.
- Interne Verlinkung von Blogartikeln gezielt auf diese Ziele.

## Technische Details

**Geänderte Dateien:** `src/config/site.config.ts`, `scripts/generate-sitemap.ts`, `public/robots.txt`, `public/sitemap.xml` (regeneriert), `public/llms.txt`, `index.html` (GSC-Meta-Tag), plus alle Fundstellen der alten Domain.

**Neu (Schritt 3/4):** Prerender-Setup in `vite.config.ts` bzw. Post-Build-Skript, zwei neue Landingpage-Komponenten + Routen in `src/App.tsx`, Einträge im Sitemap-Generator.

**Reihenfolge:** Schritt 1 sofort (ein Turn). Schritt 2 direkt danach, braucht deine Bestätigung im OAuth-Dialog. Schritte 3 und 4 danach als eigene Turns.

Wichtig zur Erwartung: Nach der Korrektur braucht Google typischerweise 2–6 Wochen, bis die Seiten neu bewertet sind. Der Effekt kommt nicht über Nacht.
