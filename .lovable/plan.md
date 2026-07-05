# Blog modernisieren

Ziel: Der Blog (Übersicht + Artikelseite) soll dem modernen Look der Startseite entsprechen – Emerald/Teal-Palette, Glassmorphism, weiche Schatten, konsistente Design-Tokens. Aktuell bricht der Blog optisch aus, weil er noch harte Graustufen und ein flaches Kartenraster nutzt.

## Warum jetzt
- Blog-Seiten verwenden hartkodierte Farben (`bg-gray-50`, `text-gray-900`, `text-gray-600`) statt der semantischen Tokens (`background`, `foreground`, `muted-foreground`) – dadurch wirken sie älter und inkonsistent zur Startseite.
- Karten sind flach; die Startseite (`LatestArticlesSection`) nutzt bereits `glass`, `hover:shadow-glow`, `-translate-y-1` und Fade-in-Animationen.
- Ladezustände zeigen nur „Lade Artikel…" statt Skeletons.

## Umfang der Änderungen (reine UI/Präsentation)

### 1. Blog-Übersicht (`src/pages/Blog.tsx`)
- Hintergrund von `bg-gray-50` auf semantisches `bg-background` bzw. dezenten Verlauf (`bg-gradient-to-b from-secondary/30`) umstellen.
- Optischer Header-Bereich mit mehr Luft und Akzent, passend zur Startseite.

### 2. Hero (`src/components/blog/BlogHero.tsx`)
- Graustufen durch Tokens ersetzen, kleines Emerald-Akzent-Badge/Icon (analog „Frisch veröffentlicht"), größere Typo-Hierarchie.

### 3. Karten (`src/components/blog/BlogCard.tsx`)
- Auf `glass`-Optik + `hover:shadow-glow` vereinheitlichen (konsistent mit `LatestArticlesSection`).
- Bild-Overlay, Badges und Meta-Zeile feinschleifen; sanfte Fade-in-Einblendung beim Scrollen (`useInView`).

### 4. Grid & Ladezustand (`src/components/blog/BlogPostGrid.tsx`)
- Graustufen → Tokens.
- „Lade Artikel…" durch `Skeleton`-Karten ersetzen.
- Optional dichteres, moderneres Raster (3 Spalten ab `xl`).

### 5. Featured-Bereich (`src/components/blog/FeaturedArticle.tsx`)
- An Glass-/Emerald-Stil angleichen, größere Bildfläche, klarere Sekundär-Kacheln.

### 6. Artikelseite (`src/pages/BlogPost.tsx` + `post/`-Komponenten)
- Header und Body-Container auf Tokens umstellen (statt `text-gray-900`).
- Prose-Typografie verfeinern (Zwischenüberschriften, Zitat-/Info-Boxen, Bild-Rundungen), bessere Lesbreite und Zeilenabstände.
- Lesefortschritts-Indikator (dünner Balken oben) als moderner Standard.

## Technische Details
- Keine Business-Logik/Datenänderungen – nur Präsentationsschicht (Tailwind-Klassen, Tokens, kleine Animationskomponenten).
- Wiederverwendung vorhandener Hooks (`useInView`) und `Skeleton`.
- Farben ausschließlich über bestehende semantische Tokens aus `index.css`/`tailwind.config.ts` (Emerald/Teal), kein Hardcoding.

## Optional (auf Wunsch)
- Umschaltbare Listen-/Rasteransicht.
- „Geschätzte Lesezeit + Datum" als kompakte Pills.
- Kategorie-Filter als moderne Chips mit aktivem Emerald-Zustand.

Sag Bescheh, ob ich alle Punkte 1–6 umsetzen soll oder nur einen Teil davon.