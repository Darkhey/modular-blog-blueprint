// Statisches Pre-Rendering der <head>-Metadaten.
// Läuft via "postbuild" nach `vite build`: kopiert dist/index.html nach
// dist/<route>/index.html und ersetzt Title, Description, Canonical und OG-Tags.
// So sehen Crawler (auch ohne JS-Ausführung) pro Route korrekte Metadaten.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import { routeMeta } from './routeMeta';

const BASE_URL = 'https://sanierenundsparen.de';
const DIST = resolve('dist');
const INDEX = join(DIST, 'index.html');

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHtml(template: string, title: string, description: string, url: string) {
  const t = escapeHtml(title);
  const d = escapeHtml(description);

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

  // Canonical direkt vor </head> einfügen (Helmet ergänzt später identisch)
  html = html.replace('</head>', `  <link rel="canonical" href="${url}" />\n  </head>`);
  return html;
}

if (!existsSync(INDEX)) {
  console.warn('prerender-head: dist/index.html nicht gefunden – übersprungen.');
  process.exit(0);
}

const template = readFileSync(INDEX, 'utf-8');
let count = 0;

for (const route of routeMeta) {
  const url = route.path === '/' ? `${BASE_URL}/` : `${BASE_URL}${route.path}`;
  const html = buildHtml(template, route.title, route.description, url);

  if (route.path === '/') {
    writeFileSync(INDEX, html);
  } else {
    const dir = join(DIST, route.path.replace(/^\//, ''));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
  }
  count++;
}

console.log(`prerender-head: ${count} Routen mit statischen Metadaten erzeugt.`);
