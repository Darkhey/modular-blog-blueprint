import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { buildSystemPrompt, parseAiJson, buildInsertRow } from "../_shared/blogPrompt.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const OPENAI_MODEL = Deno.env.get("OPENAI_MODEL") || "gpt-4o-mini";
const UNSPLASH_ACCESS_KEY = Deno.env.get("UNSPLASH_ACCESS_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_ANON_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Function to get image from Unsplash
async function getUnsplashImage(query: string): Promise<string | null> {
  if (!UNSPLASH_ACCESS_KEY) {
    console.log("No Unsplash API key found, skipping image fetch");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&w=1200&h=600`,
      {
        headers: {
          "Authorization": `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Unsplash API error:", response.status);
      return null;
    }

    const data = await response.json();
    return data.urls.regular;
  } catch (error) {
    console.error("Error fetching Unsplash image:", error);
    return null;
  }
}

// Function to get fallback image based on category
function getFallbackImage(categoryName: string): string {
  const categoryImages: Record<string, string> = {
    'Heizung modernisieren': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&h=600&fit=crop',
    'Dämmung & Isolierung': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop',
    'Fassade': 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=1200&h=600&fit=crop',
    'Fenster': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=600&fit=crop',
    'Dach': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=1200&h=600&fit=crop',
    'Smart Home': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=600&fit=crop',
    'Solarenergie': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=600&fit=crop',
    'Fördermittel': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop'
  };
  
  return categoryImages[categoryName] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop';
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  console.log(`[Edge] Blog Content Generator started`);

  // Check for required environment variables
  if (!OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: "OPENAI_API_KEY missing in project secrets." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!SUPABASE_URL) {
    return new Response(JSON.stringify({ error: "SUPABASE_URL missing in project secrets." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!SUPABASE_KEY) {
    return new Response(JSON.stringify({ error: "SUPABASE_ANON_KEY missing in project secrets." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { createClient } = await import("npm:@supabase/supabase-js");
  const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);

  try {
    const { topic, categorySlug, articleLength, autoPublish, imageUrl } = await req.json();

    // Fetch categories and author
    const { data: categories, error: catErr } = await supabase
      .from("blog_categories")
      .select("*");
    
    if (catErr) {
      throw new Error("Error fetching categories: " + catErr.message);
    }

    const { data: authors, error: authorErr } = await supabase
      .from("blog_authors")
      .select("id")
      .limit(1);

    const authorId = authors?.[0]?.id ?? null;

    // Select category based on input or random
    let selectedCategory;
    if (categorySlug) {
      selectedCategory = categories.find(cat => cat.slug === categorySlug);
    } else {
      selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    }

    if (!selectedCategory) {
      selectedCategory = categories[0]; // Fallback
    }

    const topic_name = selectedCategory.name;
    const topic_color = selectedCategory.color || "#2563eb";

    // Build AI prompt based on article length
    let lengthInstruction = "";
    switch (articleLength) {
      case "short":
        lengthInstruction = "Schreibe einen kurzen, prägnanten Artikel (4-6 Minuten Lesezeit).";
        break;
      case "medium":
        lengthInstruction = "Schreibe einen mittelangen, detaillierten Artikel (8-12 Minuten Lesezeit).";
        break;
      case "long":
        lengthInstruction = "Schreibe einen ausführlichen, umfassenden Ratgeber (15-20 Minuten Lesezeit).";
        break;
      default:
        lengthInstruction = "Schreibe einen mittelangen Artikel (8-10 Minuten Lesezeit).";
    }

    const systemPrompt = buildSystemPrompt({
      topicName: topic || topic_name,
      lengthInstruction,
    });

    const userPrompt = topic 
      ? `Schreibe einen Artikel zum Thema: "${topic}" in der Kategorie "${topic_name}". Fokussiere auf praktische Tipps für 2025.`
      : `Schreibe einen neuen, aktuellen Artikel in der Kategorie "${topic_name}". Wähle ein relevantes Unterthema für 2025.`;

    // Call OpenAI
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 2500,
      }),
    });

    if (!aiResponse.ok) {
      const err = await aiResponse.text();
      throw new Error("OpenAI Error: " + err);
    }

    const result = await aiResponse.json();
    const output = result.choices?.[0]?.message?.content;

    if (!output) throw new Error("No response from OpenAI.");

    // Parse JSON (direct, with regex fallback)
    const articleData = parseAiJson(output);

    // Get image for the article
    let hero_image_url = imageUrl || null;
    let cover_url = imageUrl || null;

    if (!hero_image_url) {
      if (articleData.image_keywords && articleData.image_keywords.length > 0) {
        hero_image_url = await getUnsplashImage(articleData.image_keywords.join(" "));
        cover_url = hero_image_url;
      }
      if (!hero_image_url) {
        hero_image_url = getFallbackImage(topic_name);
        cover_url = hero_image_url;
      }
    }

    console.log(`Selected image for article: ${hero_image_url}`);

    // Ensure unique slug against existing posts
    const provisionalSlug = (articleData.slug || articleData.title || "")
      .toLowerCase().replace(/[^a-z0-9äöüß]+/g, "-").replace(/-+/g, "-").replace(/(^-|-$)/g, "");
    const existingSlugs = new Set<string>();
    if (provisionalSlug) {
      const { data: existingPost } = await supabase
        .from("blog_posts").select("id").eq("slug", provisionalSlug).maybeSingle();
      if (existingPost) existingSlugs.add(provisionalSlug);
    }

    // Build unified insert row (handles slug, faq, fallbacks, trimming)
    const row = buildInsertRow(articleData, {
      categoryId: selectedCategory.id,
      authorId,
      topicName: topic_name,
      topicColor: topic_color,
      status: autoPublish ? "published" : "draft",
      heroImageUrl: hero_image_url,
      coverUrl: cover_url,
      existingSlugs,
    });
    articleData.slug = row.slug;
    articleData.title = row.title;

    // Insert into database
    const { error: insertErr } = await supabase.from("blog_posts").insert([row]);

    if (insertErr) throw new Error("Database insert error: " + insertErr.message);

    console.log("Blog article successfully created:", articleData.slug);

    return new Response(JSON.stringify({ 
      success: true, 
      slug: articleData.slug,
      title: articleData.title,
      status: autoPublish ? "published" : "draft",
      image_url: hero_image_url
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("Could not create blog article:", err);
    return new Response(JSON.stringify({ 
      error: err instanceof Error ? err.message : String(err) 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
