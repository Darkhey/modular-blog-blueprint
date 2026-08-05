// Repairs existing articles: adds stable ids to all headings, rebuilds the
// table of contents from the real HTML, removes dead internal links and
// recalculates the reading time. Runs in batches and is idempotent.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import {
  estimateReadTime,
  sanitizeInternalLinks,
  syncHeadingsAndToc,
} from "../_shared/contentStructure.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

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

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (!SUPABASE_URL || !SUPABASE_KEY) return json({ success: false, error: "Supabase-Zugangsdaten fehlen." }, 500);

  let batchSize = 50;
  try {
    const body = await req.json();
    if (typeof body?.batchSize === "number") batchSize = Math.min(200, Math.max(1, body.batchSize));
  } catch {
    // no body – use default
  }

  const { createClient } = await import("npm:@supabase/supabase-js");
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  try {
    const { data: allPosts, error: allErr } = await supabase.from("blog_posts").select("slug");
    if (allErr) throw new Error(allErr.message);
    const existingSlugs = new Set((allPosts || []).map((p: any) => p.slug));

    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("id, slug, content, table_of_contents, read_time")
      .not("content", "like", "%<h2 id=%")
      .limit(batchSize);

    if (error) throw new Error(error.message);
    if (!posts?.length) return json({ success: true, updated: 0, remaining: 0, done: true });

    let updated = 0;
    for (const post of posts) {
      const cleaned = sanitizeInternalLinks(post.content || "", existingSlugs);
      const { content, toc } = syncHeadingsAndToc(cleaned);
      const { error: upErr } = await supabase
        .from("blog_posts")
        .update({
          content,
          table_of_contents: toc.length > 0 ? JSON.stringify(toc) : null,
          read_time: estimateReadTime(content),
        })
        .eq("id", post.id);
      if (upErr) {
        console.error(`[backfill] ${post.slug}: ${upErr.message}`);
      } else {
        updated++;
      }
    }

    const { count } = await supabase
      .from("blog_posts")
      .select("id", { count: "exact", head: true })
      .not("content", "like", "%<h2 id=%");

    return json({ success: true, updated, remaining: count ?? 0, done: (count ?? 0) === 0 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[backfill-blog-structure]", message);
    return json({ success: false, error: message }, 500);
  }
});
