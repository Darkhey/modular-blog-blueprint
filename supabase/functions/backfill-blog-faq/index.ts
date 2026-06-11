import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { normalizeFaq, parseAiJson } from "../_shared/blogPrompt.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function stripHtml(html: string): string {
  return (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

async function generateFaq(post: { title: string; topic?: string; excerpt?: string; content?: string }) {
  const context = stripHtml(post.content || "").slice(0, 4000);
  const system =
    "Du bist deutschsprachiger Energie- und Modernisierungs-Redakteur (E-E-A-T). " +
    "Erzeuge suchrelevante FAQ für Google FAQ-Rich-Snippets. Realistische Angaben " +
    "(Einsparungen 20-40 %), keine übertriebenen Versprechen. Antworte AUSSCHLIESSLICH " +
    'mit gültigem JSON: {"faq":[{"question":"...","answer":"..."}]} mit 4-6 Einträgen. ' +
    "Jede Antwort 1-3 prägnante, eigenständige Sätze.";
  const user =
    `Artikel-Titel: ${post.title}\nThema: ${post.topic || ""}\n` +
    `Anreißer: ${post.excerpt || ""}\n\nArtikel-Auszug:\n${context}`;

  const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`AI gateway ${resp.status}: ${text.slice(0, 200)}`);
  }
  const data = await resp.json();
  const output = data.choices?.[0]?.message?.content || "";
  const parsed = parseAiJson(output);
  return normalizeFaq(parsed.faq);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_KEY) {
    return new Response(JSON.stringify({ error: "Missing required environment variables" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let batchSize = 10;
  try {
    const body = await req.json();
    if (typeof body?.batchSize === "number") {
      batchSize = Math.min(Math.max(body.batchSize, 1), 25);
    }
  } catch {
    // no body / use default
  }

  const { createClient } = await import("npm:@supabase/supabase-js");
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("id, title, topic, excerpt, content")
    .eq("status", "published")
    .is("faq", null)
    .limit(batchSize);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { count: remainingBefore } = await supabase
    .from("blog_posts")
    .select("id", { count: "exact", head: true })
    .eq("status", "published")
    .is("faq", null);

  let updated = 0;
  const failures: Array<{ id: string; error: string }> = [];

  for (const post of posts || []) {
    try {
      const faq = await generateFaq(post);
      if (!faq) {
        failures.push({ id: post.id, error: "empty faq" });
        continue;
      }
      const { error: updErr } = await supabase
        .from("blog_posts")
        .update({ faq })
        .eq("id", post.id);
      if (updErr) {
        failures.push({ id: post.id, error: updErr.message });
      } else {
        updated++;
      }
    } catch (e) {
      failures.push({ id: post.id, error: String(e) });
    }
  }

  return new Response(
    JSON.stringify({
      processed: posts?.length || 0,
      updated,
      failures,
      remainingBefore: remainingBefore ?? null,
      remainingAfter: (remainingBefore ?? 0) - updated,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
