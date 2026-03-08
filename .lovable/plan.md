

# Modernisierung und dynamische Inhalte -- Plan

## Analyse des Ist-Zustands

Die Seite wirkt funktional, aber visuell etwas "flat" und statisch:
- **HeroSection**: Statischer Hintergrund, einfacher Text, ein Button
- **BlogCard**: Kein Bild, nur Text-Karten ohne visuelle Anziehung
- **BlogStats**: Hardcodierte Zahlen (40+, 500+, 3.000+) -- nicht dynamisch
- **FeaturesSection**: Einfache weisse Karten auf grauem Hintergrund
- **CalculatorsSection**: Sehr basic, gleiche Icons (Flame zweimal)
- **Top-Ratgeber Kacheln**: Hardcoded im Index, koennte dynamisch sein
- **Trending Sidebar**: Hardcoded Links statt aus DB geladen
- **Farbpalette**: Sehr generisch (gray-50, gray-800), kein modernes Farbsystem

## Plan

### Phase 1: Modernes Farbsystem und Design-Upgrade

**1.1 CSS Custom Properties modernisieren** (`src/index.css`)
- Primary-Farbe von dunklem Navy zu modernem Emerald/Teal wechseln
- Gradient-Utilities als CSS-Klassen definieren
- Moderne Glassmorphism-Effekte hinzufuegen (`backdrop-blur`, halbtransparente Backgrounds)

**1.2 HeroSection modernisieren** (`src/components/home/HeroSection.tsx`)
- Animated gradient Background statt statischem Bild
- Groessere, modernere Typografie mit Gradient-Text-Effekt
- Mehrere CTAs statt nur einem
- Animierte Statistik-Badges im Hero (z.B. "500+ Projekte", "30% Ersparnis")
- Subtile Floating-Elemente fuer Tiefe

**1.3 BlogCard mit Hero-Bild** (`src/components/blog/BlogCard.tsx`)
- `hero_image_url` / `cover_url` als Bild oben in der Karte anzeigen
- Fallback-Bild basierend auf Topic wenn kein Bild vorhanden
- Hover-Overlay mit Lese-CTA
- Modernere Schatten und Border-Radius

### Phase 2: Dynamische Inhalte aus Datenbank

**2.1 BlogStats dynamisch machen** (`src/components/blog/BlogStats.tsx`)
- Anzahl der Blog-Posts aus Supabase laden (`count()`)
- View-Count Summe berechnen
- Animierter Zaehler der von 0 hochzaehlt (CountUp-Effekt)
- Neuer Hook `useBlogStats` erstellen

**2.2 Trending-Sidebar dynamisch** (`src/components/home/BlogAndCategoriesSection.tsx`)
- Statt hardcoded Links: die 3 meistgelesenen Posts (nach `view_count`) laden
- Featured Posts via `useFeaturedPosts` Hook einbinden
- "NEU"-Badge automatisch fuer Posts < 7 Tage alt

**2.3 Top-Ratgeber dynamisch** (`src/pages/Index.tsx`)
- Hardcoded Ratgeber-Kacheln durch dynamische Komponente ersetzen
- Posts mit `is_featured = true` oder hoechstem `view_count` laden
- Neue Komponente `DynamicFeaturedGuides` erstellen

### Phase 3: Moderne UI-Komponenten

**3.1 FeaturesSection modernisieren** (`src/components/home/FeaturesSection.tsx`)
- Gradient-Borders und Glassmorphism-Karten
- Hover: Icon-Animation, farbige Akzente
- Nummerierte Schritte statt nur Icons

**3.2 StatsSection mit animierten Zaehlern** (`src/components/home/StatsSection.tsx`)
- IntersectionObserver fuer Scroll-Trigger
- Zahlen zaehlen animiert hoch wenn sichtbar
- Modernes Layout mit farbigem Hintergrund

**3.3 CalculatorsSection ueberarbeiten** (`src/components/home/CalculatorsSection.tsx`)
- Unterschiedliche, passende Icons (Flame, Home, Sun)
- Gradient-Buttons passend zum Thema
- Einspar-Badge auf jeder Karte

**3.4 NewsletterSection modernisieren** (`src/components/home/NewsletterSection.tsx`)
- Inline Newsletter-Formular mit E-Mail-Eingabe direkt in der Sektion
- Modernes Gradient-Design
- Erfolgs-Animation nach Anmeldung

### Phase 4: Micro-Interactions und Polish

**4.1 Scroll-basierte Animationen**
- IntersectionObserver-Hook erstellen (`useInView`)
- Sektionen faden beim Scrollen ein
- Stagger-Animationen fuer Grid-Items

**4.2 Header modernisieren** (`src/components/layout/Header.tsx`)
- Scroll-abhaengiger Hintergrund (transparent oben, weiss beim Scrollen)

---

## Zusammenfassung der Aenderungen

| Datei | Aenderung |
|-------|-----------|
| `src/index.css` | Moderne CSS-Variablen, Glassmorphism-Utils |
| `src/hooks/useInView.ts` | Neuer IntersectionObserver Hook |
| `src/hooks/useBlogStats.ts` | Dynamische Stats aus Supabase |
| `src/components/home/HeroSection.tsx` | Animated Gradient Hero |
| `src/components/blog/BlogCard.tsx` | Hero-Bilder, modernes Design |
| `src/components/blog/BlogStats.tsx` | Animierte Zaehler, dynamische Daten |
| `src/components/home/FeaturesSection.tsx` | Glassmorphism-Karten |
| `src/components/home/StatsSection.tsx` | Scroll-triggered Counter |
| `src/components/home/CalculatorsSection.tsx` | Passende Icons, Gradient-Buttons |
| `src/components/home/NewsletterSection.tsx` | Inline-Formular |
| `src/components/home/BlogAndCategoriesSection.tsx` | Dynamische Trending-Posts |
| `src/pages/Index.tsx` | Dynamische Ratgeber-Kacheln |
| `src/components/layout/Header.tsx` | Scroll-abhaengiger Hintergrund |

## Erwartete Ergebnisse
- Moderneres, professionelleres Erscheinungsbild
- Dynamische Inhalte die sich automatisch aktualisieren
- Bessere User-Engagement durch Animationen und visuelle Anreize
- Keine hardcodierten Zahlen oder Links mehr auf der Startseite

