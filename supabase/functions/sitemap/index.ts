
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml; charset=utf-8",
};

// IMPORTANT: These are placeholders and should be replaced by environment variables
// in a real-world scenario for better security and configuration management.
const SUPABASE_URL = "https://bmemdtbflrmdymxqpqhs.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtZW1kdGJmbHJtZHlteHFwcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MjUzNTIsImV4cCI6MjA2NTUwMTM1Mn0.fs1wAnmkGCGD7tbMpqot7sqFqYpLYuDzwCiYT32USTY";

serve(async (_req) => {
  if (_req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const domain = "https://sanieren-sparen.de";

    // Static pages from App.tsx
    const staticPages = [
      "",
      "/blog",
      "/wissenswertes",
      "/kontakt",
      "/impressum",
      "/datenschutz",
      "/heizung-modernisieren",
      "/daemmung-isolierung",
      "/foerdermittel",
      "/fenster-tueren",
      "/solarenergie",
      "/smart-home",
    ];

    let urls = staticPages.map(page => `
  <url>
    <loc>${domain}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>${page === "" ? '1.0' : '0.8'}</priority>
  </url>`).join('');

    // Blog posts
    const { data: posts, error: postsError } = await supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("status", "published");

    if (postsError) throw postsError;

    if (posts) {
      urls += posts.map(post => `
  <url>
    <loc>${domain}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at || Date.now()).toISOString().split('T')[0]}</lastmod>
    <priority>0.7</priority>
  </url>`).join('');
    }

    // Categories
    const { data: categories, error: categoriesError } = await supabase
      .from("blog_categories")
      .select("slug, updated_at, created_at");
      
    if (categoriesError) throw categoriesError;

    if (categories) {
      urls += categories.map(cat => `
  <url>
    <loc>${domain}/themen/${cat.slug}</loc>
    <lastmod>${new Date(cat.updated_at || cat.created_at || Date.now()).toISOString().split('T')[0]}</lastmod>
    <priority>0.6</priority>
  </url>`).join('');
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new Response(sitemap, { headers: corsHeaders });

  } catch (err) {
    console.error("Error generating sitemap:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
