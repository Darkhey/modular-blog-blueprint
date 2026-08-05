// Server-side HTML post-processing for generated blog articles.
// Guarantees that every heading has a stable anchor id, that the
// table of contents matches the real HTML, that internal links point
// to routes that actually exist and that read_time reflects the text.

const UMLAUTS: Record<string, string> = {
  ä: "ae",
  ö: "oe",
  ü: "ue",
  ß: "ss",
};

export function anchorSlug(input: string): string {
  return (input || "")
    .toLowerCase()
    .replace(/[äöüß]/g, (c) => UMLAUTS[c] ?? c)
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

/**
 * Adds unique ids to every <h2>/<h3> and returns the rebuilt TOC that is
 * guaranteed to match the anchors in the returned HTML.
 */
export function syncHeadingsAndToc(html: string): { content: string; toc: TocItem[] } {
  const used = new Set<string>();
  const toc: TocItem[] = [];

  const content = (html || "").replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_match, levelRaw: string, attrs: string, inner: string) => {
      const level = Number(levelRaw);
      const title = stripTags(inner);
      let id = anchorSlug(title) || `abschnitt-${toc.length + 1}`;
      let candidate = id;
      let i = 2;
      while (used.has(candidate)) {
        candidate = `${id}-${i}`;
        i++;
      }
      id = candidate;
      used.add(id);
      toc.push({ id, title, level });

      const cleanedAttrs = attrs.replace(/\sid\s*=\s*("[^"]*"|'[^']*')/gi, "").trim();
      const attrString = cleanedAttrs ? ` ${cleanedAttrs}` : "";
      return `<h${level} id="${id}"${attrString}>${inner}</h${level}>`;
    },
  );

  return { content, toc };
}

/** Rough reading time (German average ~200 words/min), min 3 minutes. */
export function estimateReadTime(html: string): number {
  const words = stripTags(html).split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(words / 200));
}

export function wordCount(html: string): number {
  return stripTags(html).split(/\s+/).filter(Boolean).length;
}

/** Static app routes the model is allowed to link to. */
export const ALLOWED_ROUTES = [
  "/rechner",
  "/rechner/kombi",
  "/rechner-vergleich",
  "/heizkostenrechner",
  "/daemmungsrechner",
  "/foerderrechner",
  "/kostenrechner",
  "/roi-rechner",
  "/energie-check",
  "/sanierungscheck",
  "/solarenergie",
  "/heizung-modernisieren",
  "/daemmung-isolierung",
  "/fenster-tueren",
  "/foerdermittel",
  "/regionale-foerderung",
  "/smart-home",
  "/glossar",
  "/referenzen",
  "/sanierungschecklisten",
  "/wissenswertes",
  "/blog",
];

/**
 * Removes links that point to routes or blog slugs that do not exist
 * (keeps the link text). Prevents the model from inventing URLs.
 */
export function sanitizeInternalLinks(html: string, existingSlugs: Set<string>): string {
  return (html || "").replace(
    /<a\s+[^>]*href\s*=\s*("([^"]*)"|'([^']*)')[^>]*>([\s\S]*?)<\/a>/gi,
    (match, _q, hrefD: string, hrefS: string, inner: string) => {
      const href = (hrefD ?? hrefS ?? "").trim();
      if (/^https?:\/\//i.test(href)) return match; // external links stay
      if (!href.startsWith("/")) return inner;

      const path = href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
      if (path.startsWith("/blog/")) {
        const slug = path.slice("/blog/".length);
        return existingSlugs.has(slug) ? match : inner;
      }
      if (ALLOWED_ROUTES.includes(path)) return match;
      return inner;
    },
  );
}

export interface QualityIssue {
  field: string;
  message: string;
}

/** Validates the generated article; a non-empty result triggers one retry. */
export function validateArticle(data: any, focusKeyword?: string | null): QualityIssue[] {
  const issues: QualityIssue[] = [];
  const content: string = typeof data?.content === "string" ? data.content : "";
  const title: string = typeof data?.title === "string" ? data.title : "";

  if (!title) issues.push({ field: "title", message: "Titel fehlt" });
  if (wordCount(content) < 700) {
    issues.push({ field: "content", message: "Artikel zu kurz (< 700 Wörter)" });
  }
  if ((content.match(/<h2/gi) || []).length < 3) {
    issues.push({ field: "content", message: "Weniger als 3 H2-Abschnitte" });
  }
  if (/<h1/i.test(content)) issues.push({ field: "content", message: "H1 im Content" });
  if (!data?.excerpt) issues.push({ field: "excerpt", message: "Excerpt fehlt" });
  if (!data?.seo_title) issues.push({ field: "seo_title", message: "SEO-Titel fehlt" });
  if (!data?.seo_description) issues.push({ field: "seo_description", message: "SEO-Description fehlt" });
  if (!Array.isArray(data?.faq) || data.faq.length < 3) {
    issues.push({ field: "faq", message: "Weniger als 3 FAQ-Einträge" });
  }
  if (focusKeyword) {
    const needle = focusKeyword.toLowerCase();
    const haystack = `${title} ${content}`.toLowerCase();
    if (!haystack.includes(needle.split(" ")[0])) {
      issues.push({ field: "focus_keyword", message: `Fokus-Keyword "${focusKeyword}" fehlt` });
    }
  }
  return issues;
}
