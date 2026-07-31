## Was die Search Console aktuell zeigt

Die Property ist erst seit 27.07.2026 aktiv, entsprechend dünn sind die Daten (Zeitraum 01.05.–30.07.2026):

- **0 Klicks, 4 Impressionen gesamt.** Sichtbare Queries: „solar markise" (Pos. 89), „zweischaliges mauerwerk nachträglich dämmen kosten" (Pos. 100).
- **Positiv:** Vier Blogartikel wurden bereits auf guten Positionen ausgespielt (Umsteigeprämie Wärmepumpe Pos. 6, Hochwasserschutz-Türen Pos. 7, Lehm-Dämmung Pos. 8), Startseite Pos. 1, /kontakt Pos. 2. Thematisch trägt also der Förder-/Dämmungs-Content.
- **Sitemap:** 256 URLs eingereicht, fehlerfrei, zuletzt am 30.07. abgerufen — **0 davon indexiert**.

## Das eigentliche Problem (verifiziert)

Die URL-Inspection zeigt für `/blog/foerderung-umsteigepraemie-waermepumpe-2025-2026`:
`coverageState: "Alternate page with proper canonical tag"`, Google-Canonical = ein **anderer** Blogartikel.

Ursache im Live-HTML bestätigt: Der Abruf eines Blogartikels liefert
`<title>Sanieren & Sparen – Energieeffiziente Sanierung</title>` und
`<link rel="canonical" href="https://sanierenundsparen.de/" />`.

Das Head-Prerendering (`scripts/prerender-head.ts` + `scripts/routeMeta.ts`) deckt nur 22 statische Routen ab. Alle Blog-, Kategorie- und Landingpage-URLs fallen auf `dist/index.html` zurück — und die trägt die Startseiten-Canonical. Google sieht dadurch 250+ identische Seiten und indexiert keine davon. Weitere Befunde: `/wdvs-kosten-rechner` = „Discovered – currently not indexed", `/blog` und `/rechner` = „URL is unknown to Google", und `www.sanierenundsparen.de` antwortet mit HTTP 200 statt einer Weiterleitung (Duplikat-Host, taucht auch in Googles referringUrls auf).

## Plan

**1. Prerendering auf alle dynamischen Routen ausweiten**
`scripts/prerender-head.ts` holt beim Build die veröffentlichten Blogposts und Kategorien aus Supabase (gleiche Filter wie `generate-sitemap.ts`) und schreibt pro Slug `dist/blog/<slug>/index.html` bzw. `dist/themen/<slug>/index.html` mit echtem Titel, Description, Canonical, og:url, og:image und Article-JSON-LD.

**2. Fallback-Canonical entschärfen**
Die Startseiten-Canonical darf nicht mehr für unbekannte Routen ausgeliefert werden: Root-`index.html` behält `/`, aber jede in Sitemap/routeMeta gelistete Route bekommt garantiert ihre eigene Datei. Ein Build-Check vergleicht Sitemap-Einträge gegen erzeugte HTML-Dateien und bricht bei Lücken ab.

**3. www-Duplikat beseitigen**
`www` per Domain-Konfiguration auf die Apex-Domain weiterleiten; zusätzlich in Search Console eine `sc-domain:`-Property anlegen, damit beide Hosts in einer Datenansicht landen.

**4. Auf das aufbauen, was schon rankt**
Die vier rankenden Artikel sind Förder- und Dämmungsthemen. Konkret:
- Interne Verlinkung von diesen vier Artikeln auf `/foerderrechner`, `/rechner/kombi` und `/daemmungsrechner` verstärken.
- Zwei Vertiefungsseiten zu genau den Queries, die schon Impressionen erzeugen: „zweischaliges Mauerwerk nachträglich dämmen – Kosten" und „Solarmarkise Kosten/Ertrag", jeweils mit Rechner-Einbindung statt reinem Text.
- Erst nach Fix 1–3 sinnvoll, weil sonst nichts indexiert wird.

**5. Kontrolle**
Nach dem nächsten Publish: Sitemap neu einreichen, URL-Inspection für je einen Blogartikel, `/blog` und `/rechner` erneut abfragen und prüfen, ob `googleCanonical` jetzt selbstreferenziell ist.

## Technische Details

- Betroffene Dateien: `scripts/prerender-head.ts`, `scripts/routeMeta.ts`, ggf. neuer `scripts/verify-prerender.ts`, `package.json` (postbuild-Kette).
- Supabase-Zugriff im Build über die bereits in `scripts/generate-sitemap.ts` genutzten Anon-Credentials.
- Kein Eingriff in Runtime-Code oder React-Helmet-Logik; die Client-Tags bleiben als Ergänzung bestehen.
