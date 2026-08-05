// Fetches Search Console performance data (queries + pages) via the Lovable
// connector gateway and stores it in public.search_console_stats so the blog
// generator can target real, unrealised search demand.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const GSC_KEY = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const TARGET_SITE = "https://sanierenundsparen.de/";

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

function headers() {
  return {
    Authorization: `Bearer ${LOVABLE_API_KEY}`,
    "X-Connection-Api-Key": GSC_KEY!,
  };
}

function coversTarget(siteUrl: string, target: URL) {
  if (siteUrl.startsWith("sc-domain:")) {
    const domain = siteUrl.slice("sc-domain:".length).toLowerCase();
    const host = target.hostname.toLowerCase();
    return host === domain || host.endsWith(`.${domain}`);
  }
  try {
    return target.href.startsWith(new URL(siteUrl).href);
  } catch {
    return false;
  }
}

async function resolveSiteUrl(selected?: string) {
  const res = await fetch(`${GATEWAY}/webmasters/v3/sites`, { headers: headers() });
  if (!res.ok) throw new Error(`Konnte Properties nicht laden [${res.status}]: ${await res.text()}`);
  const { siteEntry = [] } = await res.json();
  const target = new URL(TARGET_SITE);
  const matches = siteEntry.filter(
    (e: any) => e.permissionLevel !== "siteUnverifiedUser" && coversTarget(e.siteUrl, target),
  );
  if (selected) {
    const hit = matches.find((m: any) => m.siteUrl === selected);
    if (!hit) throw new Error("Ausgewählte Property ist nicht verifiziert.");
    return hit.siteUrl as string;
  }
  if (matches.length === 0) throw new Error("Keine verifizierte Search-Console-Property gefunden.");
  return matches[0].siteUrl as string;
}

async function query(siteUrl: string, body: Record<string, unknown>) {
  const res = await fetch(
    `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) {
    throw new Error(`Search-Console-Abfrage fehlgeschlagen [${res.status}]: ${await res.text()}`);
  }
  return res.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  if (!LOVABLE_API_KEY || !GSC_KEY) {
    return json({ success: false, error: "Search-Console-Zugangsdaten fehlen." }, 500);
  }
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return json({ success: false, error: "Supabase-Zugangsdaten fehlen." }, 500);
  }

  try {
    const siteUrl = await resolveSiteUrl();

    const end = new Date(Date.now() - 3 * 86_400_000);
    const start = new Date(end.getTime() - 27 * 86_400_000);
    const iso = (d: Date) => d.toISOString().slice(0, 10);

    const [queries, pages] = await Promise.all([
      query(siteUrl, {
        startDate: iso(start),
        endDate: iso(end),
        dimensions: ["query"],
        rowLimit: 500,
      }),
      query(siteUrl, {
        startDate: iso(start),
        endDate: iso(end),
        dimensions: ["page"],
        rowLimit: 500,
      }),
    ]);

    const rows = [
      ...(queries.rows || []).map((r: any) => ({
        dimension: "query",
        query: r.keys?.[0] ?? null,
        page: null,
        clicks: r.clicks ?? 0,
        impressions: r.impressions ?? 0,
        ctr: r.ctr ?? 0,
        position: r.position ?? 0,
        period_start: iso(start),
        period_end: iso(end),
        synced_at: new Date().toISOString(),
      })),
      ...(pages.rows || []).map((r: any) => ({
        dimension: "page",
        query: null,
        page: r.keys?.[0] ?? null,
        clicks: r.clicks ?? 0,
        impressions: r.impressions ?? 0,
        ctr: r.ctr ?? 0,
        position: r.position ?? 0,
        period_start: iso(start),
        period_end: iso(end),
        synced_at: new Date().toISOString(),
      })),
    ];

    const { createClient } = await import("npm:@supabase/supabase-js");
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // Replace the snapshot for this period.
    await supabase.from("search_console_stats").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    for (let i = 0; i < rows.length; i += 200) {
      const { error } = await supabase.from("search_console_stats").insert(rows.slice(i, i + 200));
      if (error) throw new Error("Insert-Fehler: " + error.message);
    }

    return json({
      success: true,
      site_url: siteUrl,
      period: { start: iso(start), end: iso(end) },
      queries: (queries.rows || []).length,
      pages: (pages.rows || []).length,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[sync-search-console]", message);
    return json({ success: false, error: message }, 500);
  }
});
