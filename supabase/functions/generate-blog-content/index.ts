
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  console.log(`[Edge] Blog Content Generator started`);

  if (!OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: "OPENAI_API_KEY missing in project secrets." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { createClient } = await import("npm:@supabase/supabase-js");
  const SUPABASE_URL = "https://bmemdtbflrmdymxqpqhs.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtZW1kdGJmbHJtZHlteHFwcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MjUzNTIsImV4cCI6MjA2NTUwMTM1Mn0.fs1wAnmkGCGD7tbMpqot7sqFqYpLYuDzwCiYT32USTY";
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  try {
    const { topic, categorySlug, articleLength, autoPublish } = await req.json();

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

    const systemPrompt = `Du bist ein deutschsprachiger Energie/Modernisierungs-Redakteur für Hausbesitzer.
Erstelle einen SEO-optimierten Fachartikel. ${lengthInstruction}

Gib zurück als JSON:
{
"title": String,          // SEO-optimierte Überschrift
"slug": String,           // URL-Slug (nur Kleinbuchstaben, Bindestriche)
"excerpt": String,        // Kurzer Anreißer, max 200 Zeichen
"content": String,        // HTML-Content mit <h2>, <h3>, <p>, <ul>, <li>, Links
"seo_title": String,      // max. 65 Zeichen, Keywords vorne
"seo_description": String,// max. 160 Zeichen
"keywords": [String],     // SEO Keywords Array
"read_time": Number,      // geschätzte Lesezeit in Minuten
"table_of_contents": Array<{id:string,title:string}>,
"difficulty": 1|2|3,      // 1=einfach, 2=mittel, 3=schwer
"savings_potential": String,
"payback_time": String,
"funding_available": String,
"effort_level": String,
"key_benefits": [String],
"important_notice": String
}

Thema: "${topic || topic_name}". 
Kategorie: "${topic_name}".
Baue praktische Tipps, Kostenbeispiele und Hinweise auf Förderungen ein.
Verwende moderne HTML-Struktur und verlinke zu verwandten Themen.`;

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
        model: "gpt-4o-mini",
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

    // Parse JSON
    let articleData: any = {};
    try {
      const match = output.match(/\{[\s\S]*\}/);
      articleData = match ? JSON.parse(match[0]) : JSON.parse(output);
    } catch (e) {
      throw new Error("Could not parse AI response as JSON: " + e);
    }

    // Fallbacks and validation
    articleData.slug = (articleData.slug || articleData.title || "").toLowerCase()
      .replace(/[^a-z0-9äöüß]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    if (!articleData.slug) {
      articleData.slug = `artikel-${Date.now()}`;
    }
    
    if (!articleData.title) articleData.title = `Artikel ${Date.now()}`;
    if (!articleData.read_time) articleData.read_time = 8;

    // Check for duplicate slugs
    const { data: existingPost } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", articleData.slug)
      .single();

    if (existingPost) {
      articleData.slug += `-${Date.now()}`;
    }

    // Insert into database
    const { error: insertErr } = await supabase
      .from("blog_posts")
      .insert([{
        title: articleData.title,
        slug: articleData.slug,
        excerpt: articleData.excerpt,
        content: articleData.content,
        category_id: selectedCategory.id,
        author_id: authorId,
        status: autoPublish ? "published" : "draft",
        topic: topic_name,
        topic_color: topic_color,
        published_at: autoPublish ? new Date().toISOString() : null,
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
        is_featured: false
      }]);

    if (insertErr) throw new Error("Database insert error: " + insertErr.message);

    console.log("Blog article successfully created:", articleData.slug);

    return new Response(JSON.stringify({ 
      success: true, 
      slug: articleData.slug,
      title: articleData.title,
      status: autoPublish ? "published" : "draft"
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
