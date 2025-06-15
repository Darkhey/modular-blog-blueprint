import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const OPENAI_MODEL = Deno.env.get("OPENAI_MODEL") || "gpt-4o-mini";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_ANON_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Basic request logging
  console.log(`[Edge] AI Blogpost Cronjob gestartet`);

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

  // --- Supabase client initialisieren
  const { createClient } = await import("npm:@supabase/supabase-js");
  const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);

  try {
    // 1. Kategorie bestimmen
    const { data: categories, error: catErr } = await supabase
      .from("blog_categories")
      .select("*");
    if (catErr || !categories || categories.length === 0) {
      throw new Error("Keine Kategorien gefunden oder Fehler: " + (catErr?.message ?? "Unbekannt"));
    }

    // Zufällige Kategorie wählen
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    const topic = randomCat.name;
    const topic_color = randomCat.color || "#2563eb";

    // 2. Prompt für OpenAI bauen
    const sysPrompt = `Du bist ein deutschsprachiger Energie/Modernisierungs-Redakteur.
Erstelle einen SEO-optimierten Fachartikel für Hausbesitzer. 
Antworte ausschließlich mit diesem JSON-Format:

{
"title": String,          // knackige Überschrift
"slug": String,           // URL-Slug (nur Kleinbuchstaben, Bindestriche)
"excerpt": String,        // 1 kurzer Satz als Vorschau/Anreißer, max 200 Zeichen
"content": String,        // HTML. Mit <h2>-Struktur, Links zu /blog/* & passenden /blog/${randomCat.slug}
"seo_title": String,      // max. 65 Zeichen, Keywords vorne
"seo_description": String,// max. 160 Zeichen
"keywords": [String],     // Keywords
"read_time": Number,      // geschätzt (in Minuten, realistisch)
"table_of_contents": Array<{id:string,title:string}>,
"difficulty": 1|2|3,
"savings_potential": String,
"payback_time": String,
"funding_available": String,
"effort_level": String,
"key_benefits": [String],       // Stichworte
"important_notice": String      // Warn- oder Tipp
}

Das Thema ist "${topic}". Betone Crosslinks, Trends, Tipps & Worauf achten.
Antworte ausschließlich mit diesem JSON.`;

    // 3. Anfrage an OpenAI
    const userPrompt = `Bitte schreibe einen neuen, eigenständigen Blogartikel in deinem Stil zum Thema "${topic}" für 2025. Wähle ein Unterthema, das Hausbesitzer interessiert. Baue Links zu verwandten Blogs, binde konkrete Tipps oder Fördermittel mit ein.`;

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          { role: "system", content: sysPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.85,
        max_tokens: 1800,
      }),
    });

    if (!aiResponse.ok) {
      const err = await aiResponse.text();
      console.error("Fehler von OpenAI:", err);
      throw new Error("OpenAI Fehler: " + err);
    }
    const result = await aiResponse.json();
    const out = result.choices?.[0]?.message?.content;

    if (!out) throw new Error("Keine Antwort von OpenAI.");

    // 4. JSON parsen - try direct parsing first, then fallback to regex
    let meta: any = {};
    try {
      meta = JSON.parse(out);
    } catch (e) {
      console.log("Direct JSON parsing failed, trying regex fallback");
      const match = out.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          meta = JSON.parse(match[0]);
        } catch (regexError) {
          throw new Error("Antwort konnte nicht in JSON umgewandelt werden: " + e);
        }
      } else {
        throw new Error("Kein JSON in der AI-Antwort gefunden: " + e);
      }
    }

    // 5. Fallbacks & Validierung
    meta.slug = (meta.slug || meta.title || "").toLowerCase().replace(/[^a-z0-9äöüß]+/g, "-").replace(/-+/g, "-").replace(/(^-|-$)/g, "");
    if (!meta.slug) meta.slug = `ai-artikel-${Math.floor(Math.random()*100000)}`;
    if (!meta.title) meta.title = `AI Artikel ${Date.now()}`;
    if (!meta.topic) meta.topic = topic;
    if (!meta.topic_color) meta.topic_color = topic_color;
    if (!meta.read_time) meta.read_time = 6 + Math.floor(Math.random()*5);

    // 6. AI-Autor als Fallback bestimmen
    const { data: authors, error: authorErr } = await supabase
      .from("blog_authors")
      .select("id")
      .limit(1);

    const authorId = authors?.[0]?.id ?? null;

    // Kategorie-ID ermitteln
    const catId = randomCat.id ?? null;

    // 7. In blog_posts einfügen
    const { error: insErr } = await supabase
      .from("blog_posts")
      .insert([{
        title: meta.title,
        slug: meta.slug,
        excerpt: meta.excerpt,
        content: meta.content,
        category_id: catId,
        author_id: authorId,
        status: "published",
        topic: topic,
        topic_color: topic_color,
        published_at: new Date().toISOString(),
        read_time: meta.read_time,
        seo_title: meta.seo_title,
        seo_description: meta.seo_description,
        keywords: meta.keywords,
        table_of_contents: meta.table_of_contents ? JSON.stringify(meta.table_of_contents) : null,
        difficulty: meta.difficulty ?? 2,
        savings_potential: meta.savings_potential,
        payback_time: meta.payback_time,
        funding_available: meta.funding_available,
        effort_level: meta.effort_level,
        key_benefits: meta.key_benefits,
        important_notice: meta.important_notice,
        costs: null,
        is_featured: false
      }]);

    if (insErr) throw new Error("Fehler beim Speichern im Blog: " + insErr.message);

    console.log("Blogartikel erfolgreich erstellt:", meta.slug);

    return new Response(JSON.stringify({ success: true, slug: meta.slug }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("Konnte AI-Blogartikel nicht erstellen:", err);
    return new Response(JSON.stringify({ error: (err instanceof Error ? err.message : String(err)) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
