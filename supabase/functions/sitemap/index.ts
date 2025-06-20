
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml; charset=utf-8",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_ANON_KEY");

serve(async (_req) => {
  if (_req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);
    const domain = "https://sanieren-sparen.de";

    // Statische Seiten aus App.tsx - alle wichtigen Seiten
    const staticPages = [
      { url: "", priority: '1.0', changefreq: 'weekly' },
      { url: "/blog", priority: '0.9', changefreq: 'daily' },
      { url: "/wissenswertes", priority: '0.8', changefreq: 'weekly' },
      { url: "/kontakt", priority: '0.7', changefreq: 'monthly' },
      { url: "/impressum", priority: '0.3', changefreq: 'yearly' },
      { url: "/datenschutz", priority: '0.3', changefreq: 'yearly' },
      { url: "/heizung-modernisieren", priority: '0.9', changefreq: 'weekly' },
      { url: "/daemmung-isolierung", priority: '0.9', changefreq: 'weekly' },
      { url: "/foerdermittel", priority: '0.8', changefreq: 'weekly' },
      { url: "/fenster-tueren", priority: '0.8', changefreq: 'weekly' },
      { url: "/solarenergie", priority: '0.8', changefreq: 'weekly' },
      { url: "/smart-home", priority: '0.7', changefreq: 'weekly' },
      { url: "/heizkostenrechner", priority: '0.8', changefreq: 'monthly' },
      { url: "/daemmungsrechner", priority: '0.8', changefreq: 'monthly' },
      { url: "/projektplaner", priority: '0.7', changefreq: 'monthly' },
      { url: "/budgetplan", priority: '0.7', changefreq: 'monthly' },
      { url: "/suche", priority: '0.6', changefreq: 'weekly' },
    ];

    let urls = staticPages.map(page => `
  <url>
    <loc>${domain}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

    // Blog-Artikel
    const { data: posts, error: postsError } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, created_at")
      .eq("status", "published")
      .order('updated_at', { ascending: false });

    if (postsError) throw postsError;

    if (posts) {
      urls += posts.map(post => `
  <url>
    <loc>${domain}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at || post.created_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');
    }

    // Kategorien
    const { data: categories, error: categoriesError } = await supabase
      .from("blog_categories")
      .select("slug, updated_at, created_at")
      .order('updated_at', { ascending: false });
      
    if (categoriesError) throw categoriesError;

    if (categories) {
      urls += categories.map(cat => `
  <url>
    <loc>${domain}/themen/${cat.slug}</loc>
    <lastmod>${new Date(cat.updated_at || cat.created_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('');
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new Response(sitemap, { headers: corsHeaders });

  } catch (err) {
    console.error("Fehler beim Generieren der Sitemap:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
