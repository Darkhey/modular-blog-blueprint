

# Vorher/Nachher Referenzen-Seite `/referenzen`

## Neue Dateien

### 1. `src/data/referenzenData.ts`
- 6 Beispielprojekte mit Feldern: `id`, `title`, `description`, `location`, `typ` (Dämmung/Heizung/Komplett/Fenster), `beforeImage`, `afterImage` (Unsplash-URLs), `kosten`, `foerderung`, `energieeinsparung` (%), `zeitraum`, `massnahmen[]`, `relatedLinks[]`

### 2. `src/components/referenzen/BeforeAfterSlider.tsx`
- CSS-basierter Bild-Vergleichs-Slider (kein extra Package)
- Zwei übereinanderliegende Bilder, mittiger Drag-Handle mit clip-path
- Touch- und Maus-Support, Tastatur-zugänglich
- "Vorher"/"Nachher" Labels

### 3. `src/components/referenzen/ProjektCard.tsx`
- Card pro Projekt: BeforeAfterSlider, Titel, Ort, Kosten/Förderung/Einsparung als Badges, Maßnahmen-Liste, Links zu Rechnern

### 4. `src/pages/ReferenzenPage.tsx`
- Hero-Header mit Gradient
- Filter-Leiste nach Sanierungstyp (Alle/Dämmung/Heizung/Fenster/Komplett)
- Projekt-Grid (responsive 1-2 Spalten)
- JSON-LD `ImageGallery` Schema, Helmet SEO-Meta
- CTA-Banner am Ende (Link zu /sanierungscheck)

### 5. Routing & Navigation
- Route in `App.tsx`
- Link in Footer

## Slider-Mechanik
```
Container (relative, overflow hidden)
├── After-Image (volle Breite)
├── Before-Image (clip-path: inset(0 {100-position}% 0 0))
└── Handle (absolute, left: {position}%, cursor: ew-resize)
```
onMouseMove/onTouchMove aktualisiert `position` State (0-100%).

