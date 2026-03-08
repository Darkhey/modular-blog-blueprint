import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const UNSPLASH_ACCESS_KEY = Deno.env.get("UNSPLASH_ACCESS_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function getUnsplashImage(query: string): Promise<string | null> {
  if (!UNSPLASH_ACCESS_KEY) return null;
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&w=1200&h=600`,
      { headers: { "Authorization": `Client-ID ${UNSPLASH_ACCESS_KEY}` } }
    );
    if (!response.ok) { await response.text(); return null; }
    const data = await response.json();
    return data.urls?.regular || null;
  } catch { return null; }
}

function getFallbackImage(categoryName: string): string {
  const categoryImages: Record<string, string> = {
    'Heizung modernisieren': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&h=600&fit=crop',
    'Dämmung & Isolierung': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop',
    'Fassade': 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=1200&h=600&fit=crop',
    'Fenster': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=600&fit=crop',
    'Dach': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=1200&h=600&fit=crop',
    'Smart Home': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=600&fit=crop',
    'Solarenergie': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=600&fit=crop',
    'Fördermittel': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop',
  };
  return categoryImages[categoryName] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop';
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  console.log("[Auto-Generate] Daily blog post generation started");

  if (!LOVABLE_API_KEY) {
    return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return new Response(JSON.stringify({ error: "SUPABASE_URL or SUPABASE_KEY missing" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { createClient } = await import("npm:@supabase/supabase-js");
  const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);

  try {
    // 1. Load ALL existing posts for duplicate avoidance
    const { data: existingPosts, error: postsErr } = await supabase
      .from("blog_posts")
      .select("slug, title, topic");

    if (postsErr) throw new Error("Error fetching existing posts: " + postsErr.message);

    const existingTitles = (existingPosts || []).map((p: any) => p.title);
    const existingSlugs = new Set((existingPosts || []).map((p: any) => p.slug));

    // 2. Category balancing - pick category with fewest posts
    const { data: categories, error: catErr } = await supabase
      .from("blog_categories")
      .select("*");

    if (catErr || !categories || categories.length === 0) {
      throw new Error("Error fetching categories: " + (catErr?.message || "No categories found"));
    }

    const topicCounts: Record<string, number> = {};
    for (const cat of categories) {
      topicCounts[cat.name] = 0;
    }
    for (const post of existingPosts || []) {
      if (topicCounts[post.topic] !== undefined) {
        topicCounts[post.topic]++;
      }
    }

    // Sort categories by post count (ascending) and pick the least covered
    const sortedCategories = [...categories].sort(
      (a, b) => (topicCounts[a.name] || 0) - (topicCounts[b.name] || 0)
    );
    const selectedCategory = sortedCategories[0];
    const topic_name = selectedCategory.name;
    const topic_color = selectedCategory.color || "#2563eb";

    console.log(`[Auto-Generate] Selected category: ${topic_name} (${topicCounts[topic_name] || 0} existing posts)`);

    // 3. Get author
    const { data: authors } = await supabase.from("blog_authors").select("id").limit(1);
    const authorId = authors?.[0]?.id ?? null;

    // 4. Build prompt with existing titles as exclusion list
    const existingTitlesList = existingTitles.length > 0
      ? existingTitles.map((t: string) => `- ${t}`).join("\n")
      : "Noch keine Artikel vorhanden.";

    const systemPrompt = `Du bist ein deutschsprachiger Energie- und Modernisierungs-Redakteur für Hausbesitzer.
Erstelle einen SEO-optimierten Fachartikel (8-12 Minuten Lesezeit) zum Thema "${topic_name}".

WICHTIG: Schreibe über ein NEUES Unterthema. Folgende Artikel existieren bereits – schreibe NICHT über diese Themen:
${existingTitlesList}

Wähle ein frisches, aktuelles Unterthema für 2025/2026, das noch nicht abgedeckt ist.

Antworte ausschließlich mit diesem JSON-Format:
{
  "title": "SEO-optimierte Überschrift",
  "slug": "url-slug-kleinbuchstaben-bindestriche",
  "excerpt": "Kurzer Anreißer, max 200 Zeichen",
  "content": "HTML-Content mit <h2>, <h3>, <p>, <ul>, <li>",
  "seo_title": "Max 65 Zeichen, Keywords vorne",
  "seo_description": "Max 160 Zeichen",
  "keywords": ["keyword1", "keyword2"],
  "read_time": 10,
  "table_of_contents": [{"id": "section-id", "title": "Section Title"}],
  "difficulty": 2,
  "savings_potential": "z.B. Bis zu 30% Energiekosten",
  "payback_time": "z.B. 5-8 Jahre",
  "funding_available": "z.B. Ja, BAFA/KfW",
  "effort_level": "z.B. Mittel",
  "key_benefits": ["Vorteil 1", "Vorteil 2", "Vorteil 3"],
  "important_notice": "Wichtiger Hinweis für Leser",
  "image_keywords": ["english", "search", "terms"]
}

Baue praktische Tipps, Kostenbeispiele und Hinweise auf Förderungen ein.
Verwende moderne HTML-Struktur. Antworte ausschließlich mit JSON.`;

    // 5. Call Lovable AI Gateway
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Schreibe einen neuen Artikel in der Kategorie "${topic_name}". Wähle ein Unterthema, das noch NICHT in der obigen Liste vorkommt.` },
        ],
        temperature: 0.9,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      if (aiResponse.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      if (aiResponse.status === 402) {
        throw new Error("Payment required. Please add credits to your Lovable workspace.");
      }
      throw new Error(`AI Gateway error (${aiResponse.status}): ${errText}`);
    }

    const result = await aiResponse.json();
    const output = result.choices?.[0]?.message?.content;
    if (!output) throw new Error("No response from AI Gateway.");

    // 6. Parse JSON response
    let articleData: any = {};
    try {
      articleData = JSON.parse(output);
    } catch {
      const match = output.match(/\{[\s\S]*\}/);
      if (match) {
        articleData = JSON.parse(match[0]);
      } else {
        throw new Error("Could not parse AI response as JSON");
      }
    }

    // Validate & clean slug
    articleData.slug = (articleData.slug || "").toLowerCase()
      .replace(/[^a-z0-9äöüß]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (!articleData.slug) articleData.slug = `artikel-${Date.now()}`;
    if (!articleData.title) articleData.title = `Artikel ${Date.now()}`;
    if (!articleData.read_time) articleData.read_time = 10;

    // 7. Ensure unique slug
    let finalSlug = articleData.slug;
    let suffix = 1;
    while (existingSlugs.has(finalSlug)) {
      finalSlug = `${articleData.slug}-${suffix}`;
      suffix++;
    }
    articleData.slug = finalSlug;

    // 8. Get Unsplash image
    let hero_image_url: string | null = null;
    if (articleData.image_keywords?.length > 0) {
      hero_image_url = await getUnsplashImage(articleData.image_keywords.join(" "));
    }
    if (!hero_image_url) {
      hero_image_url = getFallbackImage(topic_name);
    }

    // 9. Insert as published
    const { error: insertErr } = await supabase
      .from("blog_posts")
      .insert([{
        title: articleData.title,
        slug: articleData.slug,
        excerpt: articleData.excerpt || "",
        content: articleData.content || "",
        category_id: selectedCategory.id,
        author_id: authorId,
        status: "published",
        topic: topic_name,
        topic_color: topic_color,
        published_at: new Date().toISOString(),
        read_time: articleData.read_time,
        seo_title: articleData.seo_title,
        seo_description: articleData.seo_description,
        keywords: articleData.keywords,
        table_of_contents: articleData.table_of_contents ? JSON.stringify(articleData.table_of_contents) : null,
        difficulty: articleData.difficulty ?? 2,
        savings_potential: articleData.savings_potential,
        payback_time: articleData.payback_time,
        funding_available: articleData.funding_available,
        effort_level: articleData.effort_level,
        key_benefits: articleData.key_benefits,
        important_notice: articleData.important_notice,
        costs: null,
        is_featured: false,
        hero_image_url,
        cover_url: hero_image_url,
      }]);

    if (insertErr) throw new Error("Database insert error: " + insertErr.message);

    console.log(`[Auto-Generate] Successfully created: "${articleData.title}" (${articleData.slug})`);

    return new Response(JSON.stringify({
      success: true,
      slug: articleData.slug,
      title: articleData.title,
      category: topic_name,
      image_url: hero_image_url,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("[Auto-Generate] Error:", err);
    return new Response(JSON.stringify({
      success: false,
      error: err instanceof Error ? err.message : String(err),
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
