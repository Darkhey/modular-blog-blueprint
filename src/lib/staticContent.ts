import sanitizeHtml from 'sanitize-html';
import { withEditorialRelatedLink } from '../data/editorialLinks';

export interface StaticPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  heroImageUrl?: string;
  imageAlt?: string;
  imageCredit?: string;
  authorName?: string;
  seoTitle?: string;
  seoDescription?: string;
  schemaType?: string;
}

export const escapeText = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function safeArticleHtml(content: string) {
  return sanitizeHtml(content, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'figure', 'figcaption'],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['id', 'class'],
      a: ['href', 'rel', 'title'],
      img: ['src', 'alt', 'width', 'height', 'loading'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  });
}

const footer = `<footer class="border-t border-border px-4 py-8 text-sm text-muted-foreground"><nav aria-label="Rechtliches"><a href="/impressum">Impressum</a> · <a href="/datenschutz">Datenschutz</a> · <a href="/kontakt">Kontakt</a></nav><p><a href="https://ahansdampf.de" rel="nofollow">Website: A Hansdampf</a></p></footer>`;
const header = `<header class="border-b border-border px-4 py-6"><a href="/" class="text-xl font-bold text-primary">Sanieren &amp; Sparen</a><nav aria-label="Hauptnavigation" class="mt-3 flex flex-wrap gap-4"><a href="/blog">Ratgeber</a><a href="/rechner">Rechner</a><a href="/foerdermittel">Fördermittel</a></nav></header>`;

export function staticArticleBody(post: StaticPost) {
  const image = post.heroImageUrl ? `<figure><img src="${escapeText(post.heroImageUrl)}" alt="${escapeText(post.imageAlt || post.title)}" width="1200" height="630" />${post.imageCredit ? `<figcaption>${escapeText(post.imageCredit)}</figcaption>` : ''}</figure>` : '';
  return `${header}<main class="container max-w-4xl mx-auto px-4 py-10"><article class="prose prose-lg max-w-none"><h1>${escapeText(post.title)}</h1><p>${escapeText(post.excerpt)}</p><p>${post.authorName ? `Von ${escapeText(post.authorName)} · ` : ''}<time datetime="${escapeText(post.publishedAt)}">${escapeText(post.publishedAt.slice(0, 10))}</time></p>${image}${safeArticleHtml(withEditorialRelatedLink(post.slug, post.content))}</article></main>${footer}`;
}

export function staticHomepageBody(featured: StaticPost, posts: StaticPost[]) {
  const guides = posts.filter(p => p.slug !== featured.slug).slice(0, 8);
  return `${header}<main><section class="container max-w-6xl mx-auto px-4 py-12"><h1 class="text-4xl font-bold">Sanierung smart planen</h1><p class="mt-4 text-lg">Unabhängige Ratgeber, aktuelle Fördermittel und Rechner für Heizung, Dämmung und Solar.</p><nav class="mt-6 flex gap-6"><a href="/blog">Ratgeber entdecken</a><a href="/rechner">Zu den Rechnern</a></nav></section><section class="container max-w-6xl mx-auto px-4 py-10"><h2 class="text-2xl font-bold">Aktuell empfohlen</h2><article class="mt-6"><a href="/blog/${escapeText(featured.slug)}"><img src="${escapeText(featured.heroImageUrl || '')}" alt="${escapeText(featured.imageAlt || featured.title)}" width="1200" height="630" class="w-full max-w-3xl rounded-lg" /><h3 class="mt-4 text-2xl font-bold">${escapeText(featured.title)}</h3></a><p class="mt-3">${escapeText(featured.excerpt)}</p></article></section><section class="container max-w-6xl mx-auto px-4 py-10"><h2 class="text-2xl font-bold">Rechner für Ihr Sanierungsprojekt</h2><nav class="mt-6 flex flex-wrap gap-6"><a href="/foerderrechner">Förderrechner Sanierung</a><a href="/kostenrechner">Sanierungskosten berechnen</a><a href="/kernsanierung-kosten-rechner">Kernsanierungs-Rechner</a><a href="/daemmungsrechner">Dämmungsrechner</a><a href="/heizkostenrechner">Heizkostenrechner</a><a href="/solarenergie">Solarenergie</a></nav></section><section class="container max-w-6xl mx-auto px-4 py-10"><h2 class="text-2xl font-bold">Ratgeber für Ihr Sanierungsprojekt</h2>${guides.map(p => `<article class="py-5"><h3 class="text-xl font-semibold"><a href="/blog/${escapeText(p.slug)}">${escapeText(p.title)}</a></h3><p>${escapeText(p.excerpt)}</p></article>`).join('')}</section></main>${footer}`;
}