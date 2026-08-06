import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { buildSystemPrompt, parseAiJson, buildInsertRow, normalizeFaq } from "../_shared/blogPrompt.ts";
import {
  estimateReadTime,
  sanitizeInternalLinks,
  syncHeadingsAndToc,
  validateArticle,
} from "../_shared/contentStructure.ts";

import { resolveHeroImage } from "../_shared/heroImage.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const UNSPLASH_ACCESS_KEY = Deno.env.get("UNSPLASH_ACCESS_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY");

const MODEL = "google/gemini-3-flash-preview";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/**
 * Picks a keyword with real, unrealised demand: high impressions, weak
 * position and no existing article that already targets it.
 */
async function pickFocusKeyword(supabase: any, topicName: string, existingPosts: any[]) {
  const { data } = await supabase
    .from("search_console_stats")
    .select("query, impressions, clicks, position")
    .eq("dimension", "query")
    .gte("impressions", 5)
    .gte("position", 8)
    .order("impressions", { ascending: false })
    .limit(150);

  if (!data?.length) return { focusKeyword: null as string | null, relatedQueries: [] as string[] };

  const titles = (existingPosts || []).map((p: any) => (p.title || "").toLowerCase());
  const covered = (q: string) => titles.some((t: string) => t.includes(q.toLowerCase()));

  const candidates = data.filter((row: any) => row.query && !covered(row.query));
  if (candidates.length === 0) return { focusKeyword: null, relatedQueries: [] };

  // Prefer candidates that thematically match the selected category.
  const topicTokens = topicName.toLowerCase().split(/[^a-zäöüß]+/).filter((t) => t.length > 4);
  const matching = candidates.filter((row: any) =>
    topicTokens.some((token) => row.query.toLowerCase().includes(token.slice(0, 6))),
  );
  const pool = matching.length > 0 ? matching : candidates;
  const chosen = pool[0];

  const related = pool
    .slice(1, 8)
    .map((r: any) => r.query)
    .filter((q: string) => q !== chosen.query);

  return { focusKeyword: chosen.query as string, relatedQueries: related as string[] };
}

async function callModel(systemPrompt: string, userPrompt: string) {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.85,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    if (res.status === 429) {
      const e = new Error("Rate-Limit erreicht – bitte später erneut versuchen.");
      (e as any).code = "rate_limited";
      throw e;
    }
    if (res.status === 402) {
      const e = new Error(
        "Guthaben aufgebraucht: Bitte Credits im Lovable-Workspace aufladen, sonst pausiert der Auto-Pilot.",
      );
      (e as any).code = "credits_exhausted";
      throw e;
    }
    const e = new Error(`AI Gateway Fehler (${res.status}): ${errText.slice(0, 500)}`);
    (e as any).code = "gateway_error";
    throw e;
  }

  const result = await res.json();
  const output = result.choices?.[0]?.message?.content;
  if (!output) throw new Error("Leere Antwort vom AI Gateway.");
  return parseAiJson(output);
}

/**
 * Picks an existing article worth refreshing: it gets impressions in Search
 * Console but converts badly (weak CTR / position 8-30) and has not been
 * refreshed in the last 90 days.
 */
async function pickRefreshCandidate(supabase: any) {
  const { data: stats } = await supabase
    .from("search_console_stats")
    .select("page, impressions, clicks, ctr, position")
    .eq("dimension", "page")
    .order("impressions", { ascending: false })
    .limit(400);

  const perf = new Map<string, { impressions: number; clicks: number; position: number }>();
  for (const row of stats || []) {
    const match = String(row.page || "").match(/\/blog\/([^/?#]+)/);
    if (!match) continue;
    const current = perf.get(match[1]) || { impressions: 0, clicks: 0, position: 0 };
    perf.set(match[1], {
      impressions: current.impressions + Number(row.impressions || 0),
      clicks: current.clicks + Number(row.clicks || 0),
      position: Number(row.position || current.position || 0),
    });
  }

  const { data: posts } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, title, excerpt, content, topic, seo_title, seo_description, focus_keyword, keywords, published_at, last_refreshed_at",
    )
    .eq("status", "published");

  const ninetyDaysAgo = Date.now() - 90 * 86_400_000;
  const eligible = (posts || []).filter((p: any) => {
    const stamp = p.last_refreshed_at ? new Date(p.last_refreshed_at).getTime() : 0;
    return stamp < ninetyDaysAgo;
  });
  if (eligible.length === 0) return null;

  const scored = eligible.map((post: any) => {
    const p = perf.get(post.slug);
    if (!p) return { post, score: 0, perf: null };
    const ctr = p.impressions > 0 ? p.clicks / p.impressions : 0;
    const positionBonus = p.position >= 8 && p.position <= 30 ? 1.5 : 1;
    const ctrPenalty = ctr < 0.02 ? 1.5 : 1;
    return { post, score: p.impressions * positionBonus * ctrPenalty, perf: p };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];
  if (!best || best.score <= 0) return null;
  return best;
}

function buildRefreshPrompt(post: any, perf: any, linkableSlugs: Array<{ slug: string; title: string }>) {
  return `Du bist erfahrener SEO-Fachredakteur für Gebäudesanierung in Deutschland (Stand 2026).
Deine Aufgabe: Einen bestehenden Artikel überarbeiten und deutlich verbessern – NICHT neu erfinden.

BESTEHENDER ARTIKEL
Titel: ${post.title}
SEO-Titel: ${post.seo_title || "-"}
SEO-Description: ${post.seo_description || "-"}
Fokus-Keyword: ${post.focus_keyword || "-"}
${perf ? `Search Console: ${Math.round(perf.impressions)} Impressionen, ${Math.round(perf.clicks)} Klicks, Position ${perf.position.toFixed(1)}.` : ""}

HTML des Artikels:
${String(post.content || "").slice(0, 22000)}

AUFGABEN
1. Titel und SEO-Titel (max. 60 Zeichen) sowie SEO-Description (max. 160 Zeichen) klickstärker formulieren – konkret, ohne Clickbait.
2. Erster Absatz: direkte, snippet-taugliche Antwort (40-60 Wörter).
3. Bestehende Inhalte behalten und aktualisieren (Zahlen mit Jahresangabe, Förderstand 2026), mindestens EINEN neuen, substanziellen H2-Abschnitt ergänzen.
4. Mindestens 3 FAQ-Einträge liefern.
5. Nur diese internen Links verwenden: ${linkableSlugs.slice(0, 20).map((l) => `/blog/${l.slug}`).join(", ")} sowie die Rechner-/Themenrouten der Seite. Keine erfundenen URLs.
6. HTML nur mit <h2>, <h3>, <p>, <ul>, <li>, <strong>, <table>, <a>. Kein <h1>.

Antworte AUSSCHLIESSLICH mit JSON:
{"title":"...","seo_title":"...","seo_description":"...","excerpt":"...","content":"<p>...</p>","faq":[{"question":"...","answer":"..."}],"keywords":["..."]}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  console.log("[Auto-Generate] Daily blog post generation started");

  if (!LOVABLE_API_KEY) return json({ success: false, error: "LOVABLE_API_KEY missing" }, 500);
  if (!SUPABASE_URL || !SUPABASE_KEY)
    return json({ success: false, error: "SUPABASE_URL or SUPABASE_KEY missing" }, 500);

  const { createClient } = await import("npm:@supabase/supabase-js");
  const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  // Evening cron run refreshes an existing article instead of adding a new one.
  const requestedMode: "create" | "refresh" =
    body?.mode === "refresh" || body?.mode === "create"
      ? body.mode
      : new Date().getUTCHours() >= 12
        ? "refresh"
        : "create";
  const keywordOverride: string | null =
    typeof body?.focus_keyword === "string" && body.focus_keyword.trim()
      ? body.focus_keyword.trim()
      : null;

  let runContext: Record<string, unknown> = { mode: requestedMode, model: MODEL };

  const logRun = async (fields: Record<string, unknown>) => {
    try {
      await supabase.from("blog_generation_runs").insert([{ ...runContext, ...fields }]);
    } catch (e) {
      console.error("[Auto-Generate] Could not log run:", e);
    }
  };

  try {

    // 1. Existing posts (duplicate avoidance + link targets)
    const { data: existingPosts, error: postsErr } = await supabase
      .from("blog_posts")
      .select("slug, title, topic, published_at")
      .order("published_at", { ascending: false });

    if (postsErr) throw new Error("Error fetching existing posts: " + postsErr.message);

    const existingTitles = (existingPosts || []).slice(0, 120).map((p: any) => p.title);
    const existingSlugs = new Set((existingPosts || []).map((p: any) => p.slug));
    const linkableSlugs = (existingPosts || [])
      .slice(0, 40)
      .map((p: any) => ({ slug: p.slug, title: p.title }));

    // 1b. Refresh mode – improve an existing article instead of adding a new one
    if (requestedMode === "refresh") {
      const candidate = await pickRefreshCandidate(supabase);
      if (!candidate) {
        console.log("[Auto-Generate] No refresh candidate found – falling back to create mode.");
        runContext = { ...runContext, mode: "create" };
      } else {
        const post = candidate.post;
        runContext = {
          ...runContext,
          category: post.topic,
          focus_keyword: post.focus_keyword ?? null,
        };

        const refreshed = await callModel(
          buildRefreshPrompt(post, candidate.perf, linkableSlugs),
          `Überarbeite den Artikel "${post.title}" vollständig nach den Vorgaben.`,
        );

        const issues = validateArticle(refreshed, post.focus_keyword);
        if (issues.length > 0) {
          throw new Error(
            "Refresh-Qualitätsprüfung fehlgeschlagen: " + issues.map((i) => i.message).join("; "),
          );
        }

        const linked = sanitizeInternalLinks(refreshed.content || "", existingSlugs);
        const { content, toc } = syncHeadingsAndToc(linked);

        const { error: updateErr } = await supabase
          .from("blog_posts")
          .update({
            title: refreshed.title || post.title,
            excerpt: (refreshed.excerpt || post.excerpt || "").slice(0, 200),
            content,
            seo_title: (refreshed.seo_title || post.seo_title || "").slice(0, 60) || null,
            seo_description:
              (refreshed.seo_description || post.seo_description || "").slice(0, 160) || null,
            keywords: Array.isArray(refreshed.keywords) ? refreshed.keywords : post.keywords,
            faq: normalizeFaq(refreshed.faq) ?? undefined,
            table_of_contents: toc.length > 0 ? JSON.stringify(toc) : null,
            read_time: estimateReadTime(content),
            last_refreshed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", post.id);

        if (updateErr) throw new Error("Database update error: " + updateErr.message);

        console.log(`[Auto-Generate] Refreshed "${post.slug}"`);
        await logRun({ status: "success", post_slug: post.slug, post_title: refreshed.title || post.title });

        return json({
          success: true,
          mode: "refresh",
          slug: post.slug,
          title: refreshed.title || post.title,
          category: post.topic,
          toc_entries: toc.length,
        });
      }
    }

    // 2. Category balancing – pick the least covered category
    const { data: categories, error: catErr } = await supabase.from("blog_categories").select("*");
    if (catErr || !categories?.length) {
      throw new Error("Error fetching categories: " + (catErr?.message || "No categories found"));
    }

    const topicCounts: Record<string, number> = {};
    for (const cat of categories) topicCounts[cat.name] = 0;
    for (const post of existingPosts || []) {
      if (topicCounts[post.topic] !== undefined) topicCounts[post.topic]++;
    }
    const selectedCategory = [...categories].sort(
      (a, b) => (topicCounts[a.name] || 0) - (topicCounts[b.name] || 0),
    )[0];
    const topic_name = selectedCategory.name;
    const topic_color = selectedCategory.color || "#2563eb";

    // 3. Search-Console driven keyword focus (explicit override wins)
    const picked = await pickFocusKeyword(supabase, topic_name, existingPosts || []);
    const focusKeyword = keywordOverride ?? picked.focusKeyword;
    const relatedQueries = keywordOverride ? [] : picked.relatedQueries;
    runContext = { ...runContext, mode: "create", category: topic_name, focus_keyword: focusKeyword };

    console.log(
      `[Auto-Generate] Category: ${topic_name} | Focus keyword: ${focusKeyword ?? "(keine GSC-Daten)"}`,
    );

    // 4. Author
    const { data: authors } = await supabase.from("blog_authors").select("id").limit(1);
    const authorId = authors?.[0]?.id ?? null;

    // 5. Prompt
    const systemPrompt = buildSystemPrompt({
      topicName: topic_name,
      lengthInstruction:
        "Schreibe einen ausführlichen, hochwertigen Fachartikel (8-12 Minuten Lesezeit, mind. 900 Wörter) zu einem frischen Unterthema für 2026.",
      existingTitles,
      focusKeyword,
      relatedQueries,
      linkableSlugs,
    });

    const userPrompt = focusKeyword
      ? `Schreibe einen neuen Artikel in der Kategorie "${topic_name}", der die Suchanfrage "${focusKeyword}" bestmöglich beantwortet. Das Thema darf nicht mit der Liste bestehender Artikel überlappen.`
      : `Schreibe einen neuen Artikel in der Kategorie "${topic_name}". Wähle ein Unterthema, das noch NICHT in der obigen Liste vorkommt.`;

    // 6. Generate + one quality retry
    let articleData = await callModel(systemPrompt, userPrompt);
    let issues = validateArticle(articleData, focusKeyword);
    if (issues.length > 0) {
      console.warn("[Auto-Generate] Quality issues, retrying once:", issues);
      articleData = await callModel(
        systemPrompt,
        `${userPrompt}\n\nDer vorherige Versuch war fehlerhaft: ${issues
          .map((i) => `${i.field}: ${i.message}`)
          .join("; ")}. Behebe diese Punkte vollständig.`,
      );
      issues = validateArticle(articleData, focusKeyword);
      if (issues.length > 0) {
        throw new Error(
          "Qualitätsprüfung fehlgeschlagen: " + issues.map((i) => i.message).join("; "),
        );
      }
    }

    // 7. Hero image: curated local asset first, then targeted Unsplash search
    const image = await resolveHeroImage({
      title: articleData.title,
      topic: topic_name,
      keywords: Array.isArray(articleData.keywords) ? articleData.keywords : [],
      imageBrief: articleData.image_brief,
      imageAlt: articleData.image_alt,
      unsplashKey: UNSPLASH_ACCESS_KEY,
    });

    // 8. Build row (heading ids, TOC, link validation happen here)
    const row = buildInsertRow(articleData, {
      categoryId: selectedCategory.id,
      authorId,
      topicName: topic_name,
      topicColor: topic_color,
      status: "published",
      heroImageUrl: image.url,
      imageAlt: image.alt,
      imageCredit: image.credit,
      focusKeyword,
      existingSlugs,
    });

    const { error: insertErr } = await supabase.from("blog_posts").insert([row]);
    if (insertErr) throw new Error("Database insert error: " + insertErr.message);

    console.log(`[Auto-Generate] Created "${row.title}" (${row.slug}) – image: ${image.source}`);

    await logRun({ status: "success", post_slug: row.slug, post_title: row.title });

    return json({
      success: true,
      mode: "create",
      slug: row.slug,

      title: row.title,
      category: topic_name,
      focus_keyword: focusKeyword,
      image_url: image.url,
      image_source: image.source,
      toc_entries: row.table_of_contents ? JSON.parse(row.table_of_contents).length : 0,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const code = (err as any)?.code ?? "error";
    console.error("[Auto-Generate] Error:", message);
    await logRun({ status: code, error_message: message });
    return json({ success: false, error: message, code }, 500);
  }
});
