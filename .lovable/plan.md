# Einheitliche SEO- & Qualitätsstandards für (auto-)generierte Blogartikel

## Ausgangslage (Befunde)

- Es gibt **drei** Generator-Edge-Functions mit **unterschiedlichen** Prompts, Modellen und Metadaten:
  - `auto-generate-daily-post` — läuft per Cron 2×/Tag (07:00 & 17:00), nutzt Lovable AI Gateway (Gemini), reichste Metadaten + Duplikat-Vermeidung.
  - `generate-blog-content` — manueller Admin-Generator, OpenAI `gpt-4o-mini`.
  - `generate-ai-blogpost` — Legacy, OpenAI, weniger Felder, kein Bild.
- **Kritische Lücke:** Die Komponente `BlogPostSEO.tsx` (Helmet-Title/Description/Canonical/OG + Article- & Breadcrumb-JSON-LD) wird **nirgends eingebunden**. `BlogPost.tsx` rendert nur `BlogPostContentSEO` (statischer Inhalt für einen einzigen Slug). → Die generierten SEO-Felder landen aktuell **nicht** im HTML-`<head>`.
- `blog_posts` hat keine FAQ-Spalte, daher kein FAQ-Rich-Snippet möglich.
- `HelmetProvider` ist bereits in `App.tsx` aktiv; `react-helmet-async` ist installiert.

## Ziel

Alle (auch zukünftig) generierten Artikel erhalten denselben hohen SEO-/Qualitätsstandard: vollständige, valide Metadaten inkl. FAQ, plus tatsächliche Ausgabe als Meta-Tags und strukturierte Daten (Article, Breadcrumb, FAQPage) auf der Artikelseite.

## Umsetzung

### 1. Datenbank: FAQ-Spalte
- Migration: `ALTER TABLE public.blog_posts ADD COLUMN faq jsonb;` (nullable, Default `null`).
- Keine Grant-/RLS-Änderung nötig (bestehende Policies decken die Spalte ab).

### 2. Gemeinsamer Prompt-/Mapping-Baustein
- Neue Datei `supabase/functions/_shared/blogPrompt.ts` mit:
  - `buildSystemPrompt({ topicName, lengthInstruction, existingTitles })` — ein einziger, hochwertiger SEO-Prompt (siehe technische Details).
  - `buildInsertRow(articleData, ctx)` — einheitliches Mapping der KI-Antwort auf die `blog_posts`-Spalten (inkl. `faq`, Slug-Bereinigung, Fallbacks, Längen-Trim für `seo_title`/`seo_description`).
- Beide aktiven Functions (`auto-generate-daily-post`, `generate-blog-content`) importieren diesen Baustein, damit Standard und Felder identisch sind.

### 3. Prompt-Qualität anheben (im gemeinsamen Baustein)
- Erzwingt alle Felder: `title`, `slug`, `excerpt`, `content` (saubere `<h2>/<h3>/<p>/<ul>` Struktur mit internen Links zu `/blog/*` und passenden Rechnern), `seo_title` (≤60 Z., Keyword vorne), `seo_description` (≤160 Z.), `keywords`, `read_time`, `table_of_contents`, `difficulty`, `savings_potential`, `payback_time`, `funding_available`, `effort_level`, `key_benefits`, `important_notice`, `image_keywords` und **neu** `faq` (3–6 prägnante Frage/Antwort-Paare als `[{question, answer}]`).
- Qualitäts-Leitplanken gemäß Projekt-Memory: realistische Einsparungen (20–40 %), keine übertriebenen Versprechen, E-E-A-T-Ton, aktuelle Förderhinweise 2025/2026.
- `generate-blog-content` behält Längen-Steuerung (short/medium/long); `auto-generate-daily-post` behält Kategorie-Balancing + Duplikat-Liste.

### 4. Legacy-Generator
- `generate-ai-blogpost` entweder auf denselben Baustein umstellen oder als veraltet markieren (Empfehlung: auf Baustein umstellen, damit kein zweiter Standard existiert). Cron bleibt unverändert auf `auto-generate-daily-post`.

### 5. Per-Artikel-SEO tatsächlich ausgeben
- `BlogPostSEO.tsx` in `BlogPost.tsx` einbinden (mit korrekter `canonicalUrl` auf Basis von `siteConfig.siteUrl` + `/blog/<slug>`).
- `BlogPostSEO.tsx` erweitern: zusätzlich **FAQPage-JSON-LD**, wenn `post.faq` vorhanden ist.
- Sicherstellen, dass `index.html` keinen doppelten `<link rel="canonical">` setzt (sonst entfernen), um Konflikte mit Helmet zu vermeiden.

### 6. Sichtbare FAQ-Sektion im Artikel
- Neue Komponente `BlogPostFaqSection.tsx` (Accordion analog zu `CalculatorFaqSection`), die `post.faq` rendert; in `BlogPost.tsx` unterhalb des Artikels eingebunden.
- `BlogPost`-Typ in `src/hooks/useBlogPosts.ts` um `faq` erweitern (Query nutzt `select('*')`, daher kommt die Spalte automatisch mit).

### 7. Verifikation
- Edge Functions deployen, je einen Test-Aufruf machen und Antwort/DB-Eintrag prüfen (alle Felder inkl. `faq` gefüllt).
- Artikelseite öffnen und prüfen, dass Title/Description/Canonical/OG sowie Article-, Breadcrumb- und FAQPage-JSON-LD im DOM erscheinen und die FAQ-Sektion sichtbar ist.

## Technische Details

### Gemeinsamer System-Prompt (Kern, gekürzt)
```text
Du bist deutschsprachiger Energie-/Modernisierungs-Redakteur (E-E-A-T).
Schreibe einen SEO-optimierten, faktisch korrekten Fachartikel.
Realistische Einsparungen (20–40%), keine übertriebenen Versprechen.
Struktur: <h2>/<h3>/<p>/<ul>, interne Links zu /blog/* und passenden Rechnern.
Antworte AUSSCHLIESSLICH mit gültigem JSON:
{ title, slug, excerpt(<=200), content(HTML), seo_title(<=60),
  seo_description(<=160), keywords[], read_time, table_of_contents[],
  difficulty(1-3), savings_potential, payback_time, funding_available,
  effort_level, key_benefits[], important_notice, image_keywords[],
  faq: [{ "question": string, "answer": string }]  // 3-6 Einträge
}
```

### FAQPage-Schema (Ausgabe in BlogPostSEO)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "…",
      "acceptedAnswer": { "@type": "Answer", "text": "…" } }
  ]
}
```

### Betroffene Dateien
- Migration (neu): `faq jsonb` auf `blog_posts`
- Neu: `supabase/functions/_shared/blogPrompt.ts`
- Geändert: `supabase/functions/auto-generate-daily-post/index.ts`, `supabase/functions/generate-blog-content/index.ts`, `supabase/functions/generate-ai-blogpost/index.ts`
- Geändert: `src/pages/BlogPost.tsx`, `src/components/seo/BlogPostSEO.tsx`, `src/hooks/useBlogPosts.ts`, ggf. `index.html`
- Neu: `src/components/blog/post/BlogPostFaqSection.tsx`

## Nicht enthalten
- Rückwirkende FAQ-Generierung für bereits bestehende Artikel (FAQ erscheint nur bei vorhandenem `faq`-Feld). Auf Wunsch als separater Batch-Lauf nachrüstbar.
