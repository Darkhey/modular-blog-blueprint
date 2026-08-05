// Shared, high-quality SEO blog-generation prompt + DB mapping.
// Used by all blog generator edge functions so every (auto-)generated
// article follows the same SEO & quality standard.

import {
  ALLOWED_ROUTES,
  estimateReadTime,
  sanitizeInternalLinks,
  syncHeadingsAndToc,
} from "./contentStructure.ts";

export interface BuildPromptOptions {
  topicName: string;
  categorySlug?: string;
  lengthInstruction?: string;
  existingTitles?: string[];
  /** Keyword with real search demand (from Search Console) to target. */
  focusKeyword?: string | null;
  /** Additional related queries the article should cover. */
  relatedQueries?: string[];
  /** Slugs of existing articles that may be linked internally. */
  linkableSlugs?: Array<{ slug: string; title: string }>;
}

const DEFAULT_LENGTH =
  "Schreibe einen mittellangen, detaillierten Fachartikel (8-12 Minuten Lesezeit).";

/**
 * One canonical system prompt for all generators. Enforces the full set of
 * metadata fields (incl. faq) and the project's quality guardrails.
 */
export function buildSystemPrompt(opts: BuildPromptOptions): string {
  const { topicName, lengthInstruction, existingTitles, focusKeyword, relatedQueries, linkableSlugs } =
    opts;

  const exclusion =
    existingTitles && existingTitles.length > 0
      ? `\nWICHTIG: Schreibe über ein NEUES Unterthema. Folgende Artikel existieren bereits – wähle ein anderes, frisches Thema und vermeide Überschneidungen:\n${existingTitles
          .map((t) => `- ${t}`)
          .join("\n")}\n`
      : "";

  const keywordBlock = focusKeyword
    ? `\nSUCHDATEN-FOKUS (aus der Google Search Console):
- Fokus-Keyword: "${focusKeyword}". Es MUSS im Titel, im ersten Absatz, in mindestens einer H2 und mehrfach natürlich im Text vorkommen.
${
  relatedQueries && relatedQueries.length > 0
    ? `- Decke zusätzlich diese realen Suchanfragen inhaltlich ab:\n${relatedQueries
        .map((q) => `  - ${q}`)
        .join("\n")}`
    : ""
}
- Beantworte die Suchintention direkt im ersten Absatz (Snippet-tauglich, 40-60 Wörter).\n`
    : "";

  const linkBlock = `\nERLAUBTE INTERNE LINKS (NUR diese Pfade verwenden, keine erfundenen URLs):
${ALLOWED_ROUTES.map((r) => `- ${r}`).join("\n")}
${
  linkableSlugs && linkableSlugs.length > 0
    ? `Passende bestehende Artikel:\n${linkableSlugs
        .slice(0, 25)
        .map((p) => `- /blog/${p.slug} (${p.title})`)
        .join("\n")}`
    : ""
}\n`;

  return `Du bist ein erfahrener deutschsprachiger Energie- und Modernisierungs-Redakteur für Hausbesitzer und schreibst nach E-E-A-T-Prinzipien (Erfahrung, Expertise, Autorität, Vertrauen).

Erstelle einen SEO-optimierten, faktisch korrekten und gut strukturierten Fachartikel zum Themenbereich "${topicName}". ${lengthInstruction || DEFAULT_LENGTH}
${exclusion}${keywordBlock}${linkBlock}
PFLICHT-STRUKTUR DES ARTIKELS (in dieser Reihenfolge):
1. Antwort-Absatz: 40-60 Wörter, beantwortet die Hauptfrage sofort (Featured-Snippet-tauglich).
2. <h2>Das Wichtigste in Kürze</h2> mit <ul> und 4-5 konkreten Kernaussagen (Zahlen, Kosten, Einsparung).
3. 4-7 inhaltliche <h2>-Abschnitte mit je 2-4 Absätzen, bei Bedarf <h3>-Unterpunkte.
4. Mindestens eine <table> mit Kosten-, Einspar- oder Vergleichswerten (mit <thead>/<tbody>).
5. <h2>Förderung & Kosten</h2> mit aktuellen BAFA/KfW-Hinweisen für 2026, klar als Schätzwerte gekennzeichnet.
6. <h2>Fazit</h2> mit klarer Handlungsempfehlung und einem internen Link auf einen passenden Rechner.

QUALITÄTS- UND SEO-REGELN (unbedingt einhalten):
- Realistische Angaben: Einsparungen typischerweise 20-40 %, keine übertriebenen Versprechen, keine erfundenen Studien, Testimonials oder Zertifikate.
- Saubere HTML-Struktur: nur <h2>, <h3>, <p>, <ul>, <ol>, <li>, <table>, <strong>, <a>. KEIN <h1>, kein Markdown, keine style-Attribute.
- Überschriften ohne Nummerierung, prägnant und suchorientiert formuliert.
- Baue 3-5 interne Links aus der obigen Liste ein, sinnvoll im Fließtext verankert (kein "hier klicken").
- Natürliche, lesbare Sprache mit klarem Mehrwert (konkrete Tipps, Kostenbeispiele, Schritt-für-Schritt-Hinweise).
- Mindestens 900 Wörter Fließtext.
- seo_title: max. 60 Zeichen, wichtigstes Keyword vorne.
- seo_description: max. 160 Zeichen, aktiv formuliert, mit Keyword.
- faq: 3-6 echte, suchrelevante Fragen mit prägnanten, eigenständigen Antworten (je 1-3 Sätze) – geeignet für Google FAQ-Rich-Snippets.
- image_brief: kurze englische Motivbeschreibung für die Bildsuche (z. B. "modern heat pump outdoor unit next to renovated german house").
- image_alt: deutscher, beschreibender Alt-Text (max. 120 Zeichen), kein Keyword-Stuffing.

Antworte AUSSCHLIESSLICH mit gültigem JSON in genau diesem Format (keine Erläuterungen, kein Markdown):
{
  "title": "SEO-optimierte Überschrift",
  "slug": "url-slug-kleinbuchstaben-bindestriche",
  "excerpt": "Kurzer Anreißer, max 200 Zeichen",
  "content": "HTML-Content gemäß Pflicht-Struktur",
  "seo_title": "Max 60 Zeichen, Keyword vorne",
  "seo_description": "Max 160 Zeichen",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "focus_keyword": "wichtigstes Keyword",
  "read_time": 10,
  "difficulty": 2,
  "savings_potential": "z.B. Bis zu 30% Energiekosten",
  "payback_time": "z.B. 5-8 Jahre",
  "funding_available": "z.B. Ja, BAFA/KfW",
  "effort_level": "z.B. Mittel",
  "key_benefits": ["Vorteil 1", "Vorteil 2", "Vorteil 3"],
  "important_notice": "Wichtiger Hinweis für Leser",
  "image_brief": "english motif description for photo search",
  "image_alt": "Deutscher Alt-Text für das Titelbild",
  "faq": [
    {"question": "Beispielfrage?", "answer": "Prägnante Antwort."}
  ]
}

Das Inhaltsverzeichnis wird automatisch aus deinen H2/H3-Überschriften erzeugt – gib es NICHT selbst aus.`;
}

/** Slugify a string the same way across all generators. */
export function slugify(input: string): string {
  return (input || "")
    .toLowerCase()
    .replace(/[^a-z0-9äöüß]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Trim a string to a max length without cutting mid-noise too harshly. */
function trim(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (!v) return null;
  return v.length > max ? v.slice(0, max).trim() : v;
}

/** Normalize the faq field into a clean [{question, answer}] array or null. */
export function normalizeFaq(raw: unknown): Array<{ question: string; answer: string }> | null {
  if (!Array.isArray(raw)) return null;
  const items = raw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const q = (item as any).question;
      const a = (item as any).answer;
      if (typeof q !== "string" || typeof a !== "string") return null;
      const question = q.trim();
      const answer = a.trim();
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((x): x is { question: string; answer: string } => x !== null);
  return items.length > 0 ? items : null;
}

export interface InsertContext {
  categoryId: string | null;
  authorId: string | null;
  topicName: string;
  topicColor: string;
  status: "published" | "draft";
  heroImageUrl?: string | null;
  coverUrl?: string | null;
  imageAlt?: string | null;
  imageCredit?: string | null;
  focusKeyword?: string | null;
  existingSlugs?: Set<string>;
}

/**
 * Map the parsed AI response onto a blog_posts insert row with consistent
 * fallbacks, length trimming, heading/TOC sync, link validation and a
 * guaranteed-unique slug.
 */
export function buildInsertRow(articleData: any, ctx: InsertContext) {
  let slug = slugify(articleData.slug || articleData.title || "");
  if (!slug) slug = `artikel-${Date.now()}`;

  if (ctx.existingSlugs) {
    let finalSlug = slug;
    let suffix = 1;
    while (ctx.existingSlugs.has(finalSlug)) {
      finalSlug = `${slug}-${suffix}`;
      suffix++;
    }
    slug = finalSlug;
  }

  const heroImage = ctx.heroImageUrl ?? null;
  const cover = ctx.coverUrl ?? heroImage;

  // Structure hardening: unique heading ids + TOC that matches the anchors.
  const linked = sanitizeInternalLinks(articleData.content || "", ctx.existingSlugs ?? new Set());
  const { content, toc } = syncHeadingsAndToc(linked);

  return {
    title: articleData.title || `Artikel ${Date.now()}`,
    slug,
    excerpt: trim(articleData.excerpt, 200) || "",
    content,
    category_id: ctx.categoryId,
    author_id: ctx.authorId,
    status: ctx.status,
    topic: ctx.topicName,
    topic_color: ctx.topicColor,
    published_at: ctx.status === "published" ? new Date().toISOString() : null,
    read_time: estimateReadTime(content),
    seo_title: trim(articleData.seo_title, 60),
    seo_description: trim(articleData.seo_description, 160),
    keywords: Array.isArray(articleData.keywords) ? articleData.keywords : null,
    focus_keyword: ctx.focusKeyword ?? trim(articleData.focus_keyword, 120),
    table_of_contents: toc.length > 0 ? JSON.stringify(toc) : null,
    difficulty: articleData.difficulty ?? 2,
    savings_potential: articleData.savings_potential ?? null,
    payback_time: articleData.payback_time ?? null,
    funding_available: articleData.funding_available ?? null,
    effort_level: articleData.effort_level ?? null,
    key_benefits: Array.isArray(articleData.key_benefits) ? articleData.key_benefits : null,
    important_notice: articleData.important_notice ?? null,
    faq: normalizeFaq(articleData.faq),
    costs: null,
    is_featured: false,
    hero_image_url: heroImage,
    cover_url: cover,
    image_alt: trim(ctx.imageAlt ?? articleData.image_alt, 160),
    image_credit: ctx.imageCredit ?? null,
  };
}

/** Parse a model response that should contain JSON, with a regex fallback. */
export function parseAiJson(output: string): any {
  try {
    return JSON.parse(output);
  } catch {
    const match = output.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Could not parse AI response as JSON");
  }
}
