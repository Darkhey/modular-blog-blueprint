// Generates public/sitemap.xml. Runs via predev/prebuild npm hooks.
import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://sanieren-sparen.de";
const SUPABASE_URL = "https://bmemdtbflrmdymxqpqhs.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtZW1kdGJmbHJtZHlteHFwcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MjUzNTIsImV4cCI6MjA2NTUwMTM1Mn0.fs1wAnmkGCGD7tbMpqot7sqFqYpLYuDzwCiYT32USTY";

interface Entry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticRoutes: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/blog", changefreq: "daily", priority: "0.9" },
  { path: "/foerdermittel", changefreq: "weekly", priority: "0.9" },
  { path: "/foerdermittel/regional", changefreq: "monthly", priority: "0.7" },
  { path: "/foerderrechner", changefreq: "monthly", priority: "0.7" },
  { path: "/energie-check", changefreq: "monthly", priority: "0.7" },
  { path: "/roi-rechner", changefreq: "monthly", priority: "0.7" },
  { path: "/daemmungsrechner", changefreq: "monthly", priority: "0.7" },
  { path: "/daemmung-isolierung", changefreq: "weekly", priority: "0.9" },
  { path: "/heizkostenrechner", changefreq: "monthly", priority: "0.7" },
  { path: "/rechner-vergleich", changefreq: "monthly", priority: "0.7" },
  { path: "/kostenrechner", changefreq: "monthly", priority: "0.8" },
  { path: "/heizung-modernisieren", changefreq: "weekly", priority: "0.9" },
  { path: "/solarenergie", changefreq: "weekly", priority: "0.9" },
  { path: "/fenster-tueren", changefreq: "weekly", priority: "0.9" },
  { path: "/smart-home", changefreq: "weekly", priority: "0.8" },
  { path: "/smart-home-produkte", changefreq: "weekly", priority: "0.7" },
  { path: "/sanierungscheck", changefreq: "monthly", priority: "0.7" },
  { path: "/glossar", changefreq: "monthly", priority: "0.6" },
  { path: "/badezimmer-sanierung", changefreq: "monthly", priority: "0.7" },
  { path: "/barrierefreies-wohnen", changefreq: "monthly", priority: "0.7" },
  { path: "/elektroinstallation", changefreq: "monthly", priority: "0.7" },
  { path: "/schimmelbeseitigung", changefreq: "monthly", priority: "0.7" },
  { path: "/sanierungschecklisten", changefreq: "monthly", priority: "0.7" },
  { path: "/kellersanierung", changefreq: "monthly", priority: "0.7" },
  { path: "/dachausbau", changefreq: "monthly", priority: "0.7" },
  { path: "/gartengestaltung", changefreq: "monthly", priority: "0.6" },
  { path: "/wissenswertes", changefreq: "weekly", priority: "0.7" },
  { path: "/wissenswertes/links", changefreq: "monthly", priority: "0.5" },
  { path: "/wissenswertes/tools", changefreq: "monthly", priority: "0.6" },
  { path: "/wissenswertes/downloads", changefreq: "monthly", priority: "0.6" },
  { path: "/wissenswertes/videos", changefreq: "monthly", priority: "0.6" },
  { path: "/wissenswertes/community", changefreq: "monthly", priority: "0.5" },
  { path: "/wissenswertes/experten", changefreq: "monthly", priority: "0.6" },
  { path: "/referenzen", changefreq: "monthly", priority: "0.6" },
  { path: "/projektplaner", changefreq: "monthly", priority: "0.6" },
  { path: "/budgetplan", changefreq: "monthly", priority: "0.6" },
  { path: "/kontakt", changefreq: "yearly", priority: "0.4" },
  { path: "/impressum", changefreq: "yearly", priority: "0.2" },
  { path: "/datenschutz", changefreq: "yearly", priority: "0.2" },
];

async function fetchDynamic(): Promise<Entry[]> {
  const entries: Entry[] = [];
  try {
    // Blog posts
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,updated_at&status=eq.published&order=published_at.desc&limit=2000`,
      { headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` } }
    );
    if (r.ok) {
      const posts = (await r.json()) as { slug: string; updated_at: string }[];
      for (const p of posts) {
        entries.push({
          path: `/blog/${p.slug}`,
          lastmod: p.updated_at?.slice(0, 10),
          changefreq: "monthly",
          priority: "0.7",
        });
      }
    }
    // Categories -> /themen/:slug
    const c = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_categories?select=slug`,
      { headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` } }
    );
    if (c.ok) {
      const cats = (await c.json()) as { slug: string }[];
      for (const cat of cats) {
        entries.push({ path: `/themen/${cat.slug}`, changefreq: "weekly", priority: "0.7" });
      }
    }
  } catch (e) {
    console.warn("[sitemap] dynamic fetch failed:", e);
  }
  return entries;
}

function render(entries: Entry[]) {
  const urls = entries.map((e) =>
    [
      "  <url>",
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n")
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

(async () => {
  const dyn = await fetchDynamic();
  const all = [...staticRoutes, ...dyn];
  writeFileSync(resolve("public/sitemap.xml"), render(all));
  console.log(`sitemap.xml written (${all.length} entries)`);
})();
