

# Video-Seite verbessern

## Probleme der aktuellen Seite
1. **Kein Kategorie-Filter** -- alle 15 Videos werden untereinander angezeigt, kein schnelles Navigieren
2. **Redundanter Hero-Carousel** -- zeigt nur das erste Video jeder Kategorie, wenig Mehrwert
3. **Kein Suchfeld** -- bei 15+ Videos fehlt eine Suche
4. **Play-Button immer sichtbar** auf Karten (auch ohne Hover), auf Mobile kein Hover-Effekt
5. **"Alle Videos anzeigen"-Link am Ende** verlinkt auf sich selbst (`/wissenswertes/videos`)
6. **Visuell monoton** -- alle Karten gleich groß, keine visuelle Hierarchie, kein Video-Count, keine Kategorie-Icons
7. **Mobile (360px)**: 2-spaltig (`md:grid-cols-2`) greift nicht, aber Carousel-Pfeile ragen raus (`-left-4`, `-right-4`)

## Plan

### 1. Kategorie-Tabs mit Icons und Video-Count
- Tabs oben: "Alle (15)", "Fördermittel & Finanzierung (5)", "Praxis & Eigenleistung (5)", "Planung & Fehlervermeidung (5)"
- Icons pro Kategorie (Euro, Hammer, ClipboardList)
- Filtern der angezeigten Videos nach ausgewähltem Tab

### 2. Suchfeld
- Einfaches Textfeld oberhalb der Grid-Ansicht, filtert nach Titel und Beschreibung
- Zeigt "Keine Videos gefunden" bei leerem Ergebnis

### 3. Featured-Video Hero verbessern
- Statt Carousel: ein großes Featured-Video (das erste der gewählten Kategorie) mit Titel-Overlay, Kategorie-Badge und Beschreibung
- Klick öffnet Dialog wie bisher

### 4. Verbessertes Card-Grid
- 3 Spalten auf Desktop, 2 auf Tablet, 1 auf Mobile
- Play-Button immer sichtbar (nicht nur on hover) auf Mobile
- Kategorie-Badge auf jeder Karte
- Hover-Effekt: leichte Scale-Animation auf dem Thumbnail

### 5. Statistik-Leiste
- Kleine Stats-Bar unter dem Header: "15 Videos", "3 Kategorien", "Von Experten kuratiert"

### 6. Selbst-Link entfernen
- Den "Alle Videos anzeigen"-Button am Ende entfernen (man ist bereits auf der Seite)

### 7. Carousel-Pfeile Fix
- Auf Mobile die Carousel-Pfeile innerhalb des Containers positionieren

## Technische Details

### Geänderte Dateien
| Datei | Aenderung |
|---|---|
| `src/components/wissenswertes/VideoHub.tsx` | Kompletter Umbau: Tabs, Suche, Featured-Hero, verbessertes Grid, Stats-Leiste, Self-Link entfernt |

### Keine neuen Abhängigkeiten noetig
- Tabs: `@/components/ui/tabs` (bereits vorhanden)
- Input: `@/components/ui/input` (bereits vorhanden)
- Badge: `@/components/ui/badge` (bereits vorhanden)
- Icons: `lucide-react` (bereits vorhanden)

