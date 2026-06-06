// Shared, high-quality SEO blog-generation prompt + DB mapping.
// Used by all blog generator edge functions so every (auto-)generated
// article follows the same SEO & quality standard.

export interface BuildPromptOptions {
  topicName: string;
  categorySlug?: string;
  lengthInstruction?: string;
  existingTitles?: string[];
}

const DEFAULT_LENGTH =
  "Schreibe einen mittellangen, detaillierten Fachartikel (8-12 Minuten Lesezeit).";

/**
 * One canonical system prompt for all generators. Enforces the full set of
 * metadata fields (incl. faq) and the project's quality guardrails.
 */
export function buildSystemPrompt(opts: BuildPromptOptions): string {
  const { topicName, lengthInstruction, existingTitles } = opts;

  const exclusion =
    existingTitles && existingTitles.length > 0
      ? `\nWICHTIG: Schreibe über ein NEUES Unterthema. Folgende Artikel existieren bereits – wähle ein anderes, frisches Thema und vermeide Überschneidungen:\n${existingTitles
          .map((t) => `- ${t}`)
          .join("\n")}\n`
      : "";

  return `Du bist ein erfahrener deutschsprachiger Energie- und Modernisierungs-Redakteur für Hausbesitzer und schreibst nach E-E-A-T-Prinzipien (Erfahrung, Expertise, Autorität, Vertrauen).

Erstelle einen SEO-optimierten, faktisch korrekten und gut strukturierten Fachartikel zum Themenbereich "${topicName}". ${lengthInstruction || DEFAULT_LENGTH}
${exclusion}
QUALITÄTS- UND SEO-REGELN (unbedingt einhalten):
- Realistische Angaben: Einsparungen typischerweise 20-40 %, keine übertriebenen Versprechen.
- Aktuelle Förder- und Kostenhinweise für 2025/2026 (BAFA, KfW), klar als Schätzwerte gekennzeichnet.
- Saubere HTML-Struktur: genau eine logische Gliederung mit <h2>/<h3>, kurze <p>-Absätze, <ul>/<li> für Aufzählungen. KEIN <h1> (Titel wird separat gesetzt).
- Baue 2-4 interne Links ein: zu verwandten Blog-Artikeln (/blog/...) und passenden Rechnern (z. B. /heizkostenrechner, /daemmungsrechner, /solarenergie, /foerderrechner, /kostenrechner).
- Natürliche, lesbare Sprache mit klarem Mehrwert (konkrete Tipps, Kostenbeispiele, Schritt-für-Schritt-Hinweise).
- seo_title: max. 60 Zeichen, wichtigstes Keyword vorne.
- seo_description: max. 160 Zeichen, aktiv formuliert, mit Keyword.
- faq: 3-6 echte, suchrelevante Fragen mit prägnanten, eigenständigen Antworten (je 1-3 Sätze) – geeignet für Google FAQ-Rich-Snippets.

Antworte AUSSCHLIESSLICH mit gültigem JSON in genau diesem Format (keine Erläuterungen, kein Markdown):
{
  "title": "SEO-optimierte Überschrift",
  "slug": "url-slug-kleinbuchstaben-bindestriche",
  "excerpt": "Kurzer Anreißer, max 200 Zeichen",
  "content": "HTML-Content mit <h2>, <h3>, <p>, <ul>, <li> und internen Links",
  "seo_title": "Max 60 Zeichen, Keyword vorne",
  "seo_description": "Max 160 Zeichen",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "read_time": 10,
  "table_of_contents": [{"id": "section-id", "title": "Section Title"}],
  "difficulty": 2,
  "savings_potential": "z.B. Bis zu 30% Energiekosten",
  "payback_time": "z.B. 5-8 Jahre",
  "funding_available": "z.B. Ja, BAFA/KfW",
  "effort_level": "z.B. Mittel",
  "key_benefits": ["Vorteil 1", "Vorteil 2", "Vorteil 3"],
  "important_notice": "Wichtiger Hinweis für Leser",
  "image_keywords": ["english", "search", "terms"],
  "faq": [
    {"question": "Beispielfrage?", "answer": "Prägnante Antwort."}
  ]
}`;
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
  existingSlugs?: Set<string>;
}

/**
 * Map the parsed AI response onto a blog_posts insert row with consistent
 * fallbacks, length trimming and a guaranteed-unique slug.
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

  return {
    title: articleData.title || `Artikel ${Date.now()}`,
    slug,
    excerpt: trim(articleData.excerpt, 200) || "",
    content: articleData.content || "",
    category_id: ctx.categoryId,
    author_id: ctx.authorId,
    status: ctx.status,
    topic: ctx.topicName,
    topic_color: ctx.topicColor,
    published_at: ctx.status === "published" ? new Date().toISOString() : null,
    read_time: typeof articleData.read_time === "number" ? articleData.read_time : 10,
    seo_title: trim(articleData.seo_title, 60),
    seo_description: trim(articleData.seo_description, 160),
    keywords: Array.isArray(articleData.keywords) ? articleData.keywords : null,
    table_of_contents: articleData.table_of_contents
      ? JSON.stringify(articleData.table_of_contents)
      : null,
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
