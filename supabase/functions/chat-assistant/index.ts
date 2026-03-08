import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const OPENAI_MODEL = Deno.env.get("OPENAI_MODEL") || "gpt-4o-mini";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_ANON_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!OPENAI_API_KEY || !SUPABASE_URL || !SUPABASE_KEY) {
    return new Response(JSON.stringify({ error: "Missing server configuration" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { createClient } = await import("npm:@supabase/supabase-js");
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "message is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- 1. Search for relevant blog posts ---
    const searchTerms = message
      .toLowerCase()
      .replace(/[^a-zäöüß0-9\s]/g, "")
      .split(/\s+/)
      .filter((w: string) => w.length > 2);

    let articles: any[] = [];
    if (searchTerms.length > 0) {
      const orFilter = searchTerms
        .map((t: string) => `title.ilike.%${t}%,excerpt.ilike.%${t}%`)
        .join(",");

      const { data } = await supabase
        .from("blog_posts")
        .select("title, slug, excerpt, topic, keywords")
        .eq("status", "published")
        .or(orFilter)
        .limit(10);

      if (data) articles = data;
    }

    // If few results, also try a broader query
    if (articles.length < 3) {
      const { data: broadData } = await supabase
        .from("blog_posts")
        .select("title, slug, excerpt, topic, keywords")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(15);

      if (broadData) {
        const existingSlugs = new Set(articles.map((a: any) => a.slug));
        for (const post of broadData) {
          if (!existingSlugs.has(post.slug)) {
            articles.push(post);
          }
          if (articles.length >= 15) break;
        }
      }
    }

    // --- 2. Build context ---
    const articleContext = articles.length > 0
      ? articles
          .map(
            (a: any) =>
              `- "${a.title}" → /blog/${a.slug} (${a.topic}) — ${a.excerpt?.slice(0, 120)}`
          )
          .join("\n")
      : "Keine passenden Artikel gefunden.";

    const systemPrompt = `Du bist der freundliche Sanierungshelfer auf der Webseite "Modernisierungsratgeber". Du hilfst Hausbesitzern bei Fragen zu Sanierung, Dämmung, Heizung, Förderung, Smart Home und mehr.

REGELN:
1. Antworte immer auf Deutsch, freundlich und hilfreich.
2. Wenn es passende Artikel gibt, verlinke sie als Markdown-Links: [Titel](/blog/slug).
3. Halte Antworten kurz und praxisorientiert (max. 200 Wörter).
4. Bei Handwerkersuche: Empfehle Portale wie MyHammer, Check24 Handwerker, oder die lokale Handwerkskammer.
5. Wenn KEIN passender Artikel existiert und die Frage ein konkretes Sanierungsthema betrifft, füge am ENDE deiner Antwort folgenden Tag ein (NICHT sichtbar für den User):
   <!--GENERATE_ARTICLE:{"topic":"<Thema>","categorySlug":"<passende-kategorie>"}-->
   Mögliche categorySlug-Werte: heizung, daemmung, fassade, fenster, dach, smart-home, solarenergie, foerdermittel
   Kündige an: "Ich erstelle gerade einen passenden Artikel für dich – einen Moment!"
6. Beantworte KEINE Fragen, die nichts mit Haus/Sanierung/Energie zu tun haben. Lenke freundlich zurück.

VERFÜGBARE ARTIKEL:
${articleContext}`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.slice(-10),
      { role: "user", content: message },
    ];

    // --- 3. Call OpenAI with streaming ---
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages,
        stream: true,
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!aiResponse.ok) {
      const err = await aiResponse.text();
      console.error("OpenAI error:", aiResponse.status, err);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // We need to intercept the stream to check for GENERATE_ARTICLE tags
    // But for simplicity, we'll stream directly and handle article generation client-side
    // by detecting the tag in the accumulated response.

    return new Response(aiResponse.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("chat-assistant error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
