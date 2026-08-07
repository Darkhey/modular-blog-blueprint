# Neuer Startseiten-Header (Hero + Artikel-Bento)

Der obere Bereich der Startseite wird überarbeitet: kompakterer Hero, sofort sichtbare Inhalte, klare Wortmarke und behobene Kontrastprobleme – mit Fokus auf Mobil.

## Probleme im Ist-Zustand

- Der mobile Hero füllt fast den ganzen Screen; erst nach langem Scrollen kommt Inhalt.
- Die Glass-Badges (212+ / bis 30% / 500+) sind blass; die hellgrünen Labels auf hellem Glas sind kaum lesbar (Kontrast unter WCAG AA).
- Die Kopfzeile zeigt nur das Blitz-Icon ohne Namen; weiße Leiste über dunklem Hero wirkt abgeschnitten.
- Zentrierter Text-über-Farbverlauf ohne Bild/Inhalt wirkt generisch, nicht wie ein moderner Ratgeber-Blog.

## Neuer Aufbau

```text
┌──────────────────────────────────────┐
│ [⚡ Sanieren & Sparen]     [Suche][☰] │  Navi transparent über Hero
├──────────────────────────────────────┤
│  Ihr unabhängiger Sanierungsratgeber │
│  Sanierung smart planen              │  linksbündig, kompakter
│  Kurzer Untertitel (1 Satz)          │
│  [Ratgeber entdecken] [Zum Rechner]  │
│  Chips: Heizung · Dämmung · Förderung│  ersetzen die Zahlen-Badges
│         · Solar · Fenster            │
├──────────────────────────────────────┤
│  BENTO (direkt anschließend)         │
│  ┌───────────────┬─────────┐         │
│  │ Top-Artikel   │ Artikel │         │
│  │ (groß, Bild)  ├─────────┤         │
│  │               │ Artikel │         │
│  ├───────┬───────┴─────────┤         │
│  │Rechner│ Förder-Check    │         │
│  └───────┴─────────────────┘         │
└──────────────────────────────────────┘
```

Mobil: Hero deutlich kürzer (kein Vollbild), Chips horizontal scrollbar, Bento einspaltig gestapelt – der erste Artikel ist ohne Scrollen angeschnitten sichtbar.

## Design

- Emerald/Teal bleibt, aber ruhiger: dunkler Grundton mit einem einzigen weichen Lichtakzent statt drei pulsierender Blobs; feines Grid-Overlay bleibt.
- Kontrast: Fließtext und Chip-Labels auf mindestens AA (helles Weiß statt Emerald-200 auf Glas); Chips bekommen sichtbaren Rand und dunkleren Glas-Hintergrund.
- Typografie: Headline enger geführt, kleinere Mobil-Größe, Subtitle auf einen prägnanten Satz gekürzt.
- Übergang Hero → Bento über weichen Verlauf, damit die harte Kante verschwindet.
- Animationen dezent (Fade-in mit Staffelung), keine Dauer-Pulsation – ruhiger und batterieschonender auf Mobil.

## Kopfzeile

- Logo-Icon plus Wortmarke „Sanieren & Sparen" (auf sehr kleinen Screens nur Icon).
- Navi liegt transparent über dem Hero und wird beim Scrollen zur bekannten hellen Sticky-Leiste (bestehende `scrolled`-Logik wird dafür genutzt).
- Suche-Icon mit Link auf `/suche` neben dem Burger-Menü; Touch-Ziele mindestens 44 px.
- Mobiles Menü behält Inhalt und Struktur, bekommt nur saubere Abstände und Kontrast.

## Technische Umsetzung

- `src/components/home/HeroSection.tsx`: Neuaufbau (linksbündig, kompakt, Themen-Chips aus `siteConfig.contentTopics` statt Statistik-Badges). `useBlogStats` entfällt hier.
- Neu `src/components/home/HeroBentoSection.tsx`: Bento-Raster aus `useRankedPosts(3)` (Top-Artikel groß + zwei kleine) plus zwei feste Kacheln (Rechner-Hub, Förder-Check). Skeletons beim Laden, `image_alt` für Bilder.
- `src/pages/Index.tsx`: `HeroSection` + neues `HeroBentoSection`; das bisherige `FeaturedArticleHero` entfällt an dieser Stelle, damit der Top-Artikel nicht doppelt erscheint.
- `src/components/layout/Header.tsx`: Wortmarke, transparente Variante über dem Hero, Suche-Icon.
- Farben/Verläufe nur über bestehende Tokens in `src/index.css` bzw. neue semantische Hero-Tokens – keine hartkodierten Farbwerte in Komponenten.
- Kontrolle per Screenshot in 390 px und 1280 px nach der Umsetzung.

## Nicht Teil dieser Änderung

Restliche Startseiten-Sektionen, Blog-Detailseiten und Rechner bleiben unverändert.
