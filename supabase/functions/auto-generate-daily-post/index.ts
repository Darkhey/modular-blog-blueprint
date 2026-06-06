import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { buildSystemPrompt, parseAiJson, buildInsertRow } from "../_shared/blogPrompt.ts";

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

    // 4. Build unified, high-quality SEO prompt with exclusion list
    const systemPrompt = buildSystemPrompt({
      topicName: topic_name,
      lengthInstruction:
        "Schreibe einen ausführlichen, hochwertigen Fachartikel (8-12 Minuten Lesezeit) zu einem frischen Unterthema für 2025/2026.",
      existingTitles,
    });

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
    const articleData = parseAiJson(output);

    // 7. Get Unsplash image
    let hero_image_url: string | null = null;
    if (articleData.image_keywords?.length > 0) {
      hero_image_url = await getUnsplashImage(articleData.image_keywords.join(" "));
    }
    if (!hero_image_url) {
      hero_image_url = getFallbackImage(topic_name);
    }

    // 8. Build unified insert row (handles slug, faq, fallbacks, trimming)
    const row = buildInsertRow(articleData, {
      categoryId: selectedCategory.id,
      authorId,
      topicName: topic_name,
      topicColor: topic_color,
      status: "published",
      heroImageUrl: hero_image_url,
      existingSlugs,
    });
    articleData.slug = row.slug;
    articleData.title = row.title;

    // 9. Insert as published
    const { error: insertErr } = await supabase.from("blog_posts").insert([row]);

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
