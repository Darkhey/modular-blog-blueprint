// Statisches Pre-Rendering der <head>-Metadaten.
// Läuft via "postbuild" nach `vite build`: kopiert dist/index.html nach
// dist/<route>/index.html und ersetzt Title, Description, Canonical und OG-Tags.
// Deckt statische Routen (scripts/routeMeta.ts), alle in public/sitemap.xml
// gelisteten Seiten sowie dynamische Blogartikel und Kategorien aus Supabase ab.
// So sehen Crawler (auch ohne JS-Ausführung) pro Route korrekte Metadaten und
// vor allem eine selbstreferenzierende Canonical-URL.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import { routeMeta } from './routeMeta';

const BASE_URL = 'https://sanierenundsparen.de';
const DIST = resolve('dist');
const INDEX = join(DIST, 'index.html');
const SITEMAP = resolve('public/sitemap.xml');

const SUPABASE_URL = 'https://bmemdtbflrmdymxqpqhs.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtZW1kdGJmbHJtZHlteHFwcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MjUzNTIsImV4cCI6MjA2NTUwMTM1Mn0.fs1wAnmkGCGD7tbMpqot7sqFqYpLYuDzwCiYT32USTY';

// Publish-Limit: niemals mehr als diese Zahl an Dateien erzeugen.
const MAX_PRERENDER_PAGES = Number(process.env.MAX_PRERENDER_PAGES ?? 5000);

interface PageMeta {
  path: string;
  title: string;
  description: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function clamp(value: string, max: number) {
  const clean = (value || '').replace(/\s+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

function titleCaseFromPath(path: string) {
  const last = path.split('/').filter(Boolean).pop() ?? '';
  return last
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function buildHtml(template: string, meta: PageMeta) {
  const url = meta.path === '/' ? `${BASE_URL}/` : `${BASE_URL}${meta.path}`;
  const t = escapeHtml(clamp(meta.title, 70));
  const d = escapeHtml(clamp(meta.description, 165));

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
    .replace(
      /<meta name="description" content="[\s\S]*?" \/>/,
      `<meta name="description" content="${d}" />`,
    )
    .replace(
      /<meta property="og:title" content="[\s\S]*?" \/>/,
      `<meta property="og:title" content="${t}" />`,
    )
    .replace(
      /<meta property="og:description" content="[\s\S]*?" \/>/,
      `<meta property="og:description" content="${d}" />`,
    )
    .replace(
      /<meta property="og:url" content="[\s\S]*?" \/>/,
      `<meta property="og:url" content="${url}" />`,
    )
    .replace(
      /<meta name="twitter:title" content="[\s\S]*?" \/>/,
      `<meta name="twitter:title" content="${t}" />`,
    )
    .replace(
      /<meta name="twitter:description" content="[\s\S]*?" \/>/,
      `<meta name="twitter:description" content="${d}" />`,
    );

  if (meta.image) {
    const img = escapeHtml(meta.image);
    html = html
      .replace(
        /<meta property="og:image" content="[\s\S]*?" \/>/,
        `<meta property="og:image" content="${img}" />`,
      )
      .replace(
        /<meta name="twitter:image" content="[\s\S]*?" \/>/,
        `<meta name="twitter:image" content="${img}" />`,
      );
  }

  const extra = meta.jsonLd
    ? `  <script type="application/ld+json">${JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c')}</script>\n`
    : '';

  // Canonical direkt vor </head> einfügen (Helmet ergänzt später identisch)
  html = html.replace('</head>', `  <link rel="canonical" href="${url}" />\n${extra}  </head>`);
  return html;
}

function writePage(template: string, meta: PageMeta) {
  const html = buildHtml(template, meta);
  if (meta.path === '/') {
    writeFileSync(INDEX, html);
    return;
  }
  const dir = join(DIST, meta.path.replace(/^\//, ''));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}

async function fetchJson<T>(path: string): Promise<T[]> {
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
    });
    if (!r.ok) {
      console.warn(`[prerender] Supabase ${path} -> ${r.status}`);
      return [];
    }
    return (await r.json()) as T[];
  } catch (e) {
    console.warn(`[prerender] Supabase fetch failed (${path}):`, e);
    return [];
  }
}

interface PostRow {
  slug: string;
  title: string;
  excerpt: string | null;
  seo_title: string | null;
  seo_description: string | null;
  hero_image_url: string | null;
  cover_url: string | null;
  published_at: string | null;
  updated_at: string | null;
  topic: string | null;
}

interface CategoryRow {
  slug: string;
  name: string | null;
  description: string | null;
}

function sitemapPaths(): string[] {
  if (!existsSync(SITEMAP)) return [];
  const xml = readFileSync(SITEMAP, 'utf-8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(BASE_URL, ''))
    .map((p) => (p === '' ? '/' : p));
}

async function main() {
  if (!existsSync(INDEX)) {
    console.warn('prerender-head: dist/index.html nicht gefunden – übersprungen.');
    return;
  }
  const template = readFileSync(INDEX, 'utf-8');

  const pages = new Map<string, PageMeta>();

  // 1. Kuratierte statische Metadaten
  for (const r of routeMeta) {
    pages.set(r.path, { path: r.path, title: r.title, description: r.description });
  }

  // 2. Blogartikel
  const posts = await fetchJson<PostRow>(
    'blog_posts?select=slug,title,excerpt,seo_title,seo_description,hero_image_url,cover_url,published_at,updated_at,topic&status=eq.published&order=published_at.desc&limit=2000',
  );
  for (const p of posts) {
    if (!p.slug) continue;
    const path = `/blog/${p.slug}`;
    const title = p.seo_title || `${p.title} | Sanieren & Sparen`;
    const description =
      p.seo_description || p.excerpt || `${p.title} – Ratgeber, Kosten und Förderung im Überblick.`;
    const url = `${BASE_URL}${path}`;
    pages.set(path, {
      path,
      title,
      description,
      image: p.hero_image_url || p.cover_url || undefined,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: clamp(p.title, 110),
        description: clamp(description, 200),
        ...(p.hero_image_url || p.cover_url ? { image: p.hero_image_url || p.cover_url } : {}),
        inLanguage: 'de-DE',
        datePublished: p.published_at ?? undefined,
        dateModified: p.updated_at ?? p.published_at ?? undefined,
        ...(p.topic ? { articleSection: p.topic } : {}),
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        author: { '@type': 'Organization', name: 'Sanieren & Sparen' },
        publisher: {
          '@type': 'Organization',
          name: 'Sanieren & Sparen',
          logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon.svg` },
        },
      },
    });
  }

  // 3. Kategorien
  const cats = await fetchJson<CategoryRow>('blog_categories?select=slug,name,description');
  for (const c of cats) {
    if (!c.slug) continue;
    const path = `/themen/${c.slug}`;
    const name = c.name || titleCaseFromPath(path);
    pages.set(path, {
      path,
      title: `${name} – Ratgeber & Rechner | Sanieren & Sparen`,
      description:
        c.description ||
        `Alle Artikel, Kosten und Förderinfos zum Thema ${name} – mit kostenlosen Rechnern.`,
    });
  }

  // 4. Restliche Sitemap-Routen ohne kuratierte Metadaten
  for (const path of sitemapPaths()) {
    if (pages.has(path)) continue;
    const name = titleCaseFromPath(path) || 'Sanieren & Sparen';
    pages.set(path, {
      path,
      title: `${name} | Sanieren & Sparen`,
      description: `${name}: Kosten, Förderung und Praxistipps zur energieeffizienten Sanierung.`,
    });
  }

  const all = [...pages.values()];
  if (all.length > MAX_PRERENDER_PAGES) {
    all.length = MAX_PRERENDER_PAGES;
    console.warn(`prerender-head: auf ${MAX_PRERENDER_PAGES} Seiten begrenzt.`);
  }

  for (const meta of all) writePage(template, meta);
  console.log(`prerender-head: ${all.length} Routen mit statischen Metadaten erzeugt.`);

  // 5. Verifikation: jede Sitemap-URL muss eine eigene HTML-Datei haben
  const missing = sitemapPaths().filter((p) => {
    if (p === '/') return !existsSync(INDEX);
    return !existsSync(join(DIST, p.replace(/^\//, ''), 'index.html'));
  });
  if (missing.length > 0) {
    console.error(
      `prerender-head: ${missing.length} Sitemap-URLs ohne eigenes HTML:\n  ${missing.slice(0, 20).join('\n  ')}`,
    );
    process.exit(1);
  }
  console.log('prerender-head: Sitemap-Abgleich OK – alle URLs haben eine eigene Canonical.');
}

main();
