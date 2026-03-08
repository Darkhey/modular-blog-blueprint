import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_KEY = Deno.env.get("SUPABASE_ANON_KEY");

  if (!LOVABLE_API_KEY) {
    return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { message, history = [], currentPage = "" } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "message is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- 1. Search for relevant blog posts in Supabase ---
    let articles: any[] = [];
    if (SUPABASE_URL && SUPABASE_KEY) {
      const { createClient } = await import("npm:@supabase/supabase-js");
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

      const searchTerms = message
        .toLowerCase()
        .replace(/[^a-zäöüß0-9\s]/g, "")
        .split(/\s+/)
        .filter((w: string) => w.length > 2);

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

      // Broader fallback
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
    }

    // --- 2. Static article catalog (mock posts not in DB) ---
    const staticArticles = [
      { title: "Heizung modernisieren: Bis zu 40% Energiekosten sparen", slug: "heizung-modernisieren-energiekosten-sparen", topic: "Heizung", excerpt: "Moderne Heizsysteme, Förderungen und Schritt-für-Schritt Anleitung." },
      { title: "Dämmung: Der Schlüssel zu niedrigen Heizkosten", slug: "daemmung-heizkosten-sparen", topic: "Dämmung", excerpt: "Welche Dämmmaßnahmen sich lohnen, Kosten und Förderungen." },
      { title: "Fördermittel 2025: Bis zu 70% Zuschuss für Sanierung", slug: "foerdermittel-2025-zuschuss-sanierung", topic: "Fördermittel", excerpt: "BAFA, KfW und regionale Zuschüsse für energetische Sanierung." },
      { title: "Wärmepumpe vs. Gas: Der große Vergleich", slug: "waermepumpe-vs-gas-vergleich", topic: "Heizung", excerpt: "Kosten, Effizienz, Förderung und Umweltaspekte im Vergleich." },
      { title: "Photovoltaik 2024: Lohnt sich eine Solaranlage?", slug: "photovoltaik-2024-lohnt-sich-solaranlage", topic: "Solarenergie", excerpt: "Kosten, Rendite und Eigenverbrauch von Solaranlagen." },
      { title: "Fenster erneuern: 3-fach Verglasung", slug: "fenster-erneuern-3fach-verglasung", topic: "Fenster", excerpt: "Kosten, Einsparungen und Förderungen beim Fenstertausch." },
      { title: "Smart Home Thermostate im Test", slug: "smart-home-heizung-thermostate-test", topic: "Smart Home", excerpt: "Intelligente Thermostate für optimale Heizungssteuerung." },
      { title: "Kellerdecke dämmen: Anleitung", slug: "kellerdecke-daemmen-anleitung", topic: "Dämmung", excerpt: "Schritt-für-Schritt Anleitung, Materialien und Kosten." },
      { title: "Balkonkraftwerk 2025: Mini-PV-Anlage", slug: "balkonkraftwerk-2025-mini-pv", topic: "Solarenergie", excerpt: "Installation, Kosten und Förderungen für Mini-Solaranlagen." },
      { title: "Fenster & Türen sanieren: Ratgeber 2025", slug: "fenster-tueren-sanieren-ratgeber-2025", topic: "Fenster & Türen", excerpt: "Energie sparen, Sicherheit erhöhen, Förderungen nutzen." },
      { title: "Fördermittel & Finanzierung für Sanierung", slug: "foerdermittel-finanzierungsmodelle-sanierung", topic: "Fördermittel", excerpt: "Zuschüsse, Kredite und Steuerbonus optimal kombinieren." },
      { title: "Typische Sanierungsfehler vermeiden", slug: "typische-sanierungsfehler-vermeiden", topic: "Sanierung planen", excerpt: "Häufige Fehler bei Sanierungen und wie man sie vermeidet." },
      { title: "Sanierungsfahrplan 2025: Optimale Reihenfolge", slug: "sanierungsfahrplan-2025-optimale-reihenfolge", topic: "Sanierung planen", excerpt: "In 5 Schritten zum energieeffizienten Haus." },
      { title: "Altbau kaufen & sanieren 2025: Ratgeber", slug: "altbau-kaufen-sanieren-2025-ratgeber", topic: "Immobilienkauf", excerpt: "Bausubstanz prüfen, Kosten kalkulieren, Fördermittel sichern." },
      { title: "Einblasdämmung: Günstigste Dämmmethode", slug: "einblasdaemmung-ratgeber-2025", topic: "Dämmung", excerpt: "Schnelle, günstige Dämmung für Bestandsgebäude." },
      { title: "Renovierungstrends 2026", slug: "renovierungstrends-2026", topic: "Sanierung planen", excerpt: "KI-Energiemanagement, modulare Sanierung, neue Förderprogramme." },
      { title: "Badezimmer renovieren & Feuchträume sanieren", slug: "badezimmer-renovierung-feuchtraeume-2026", topic: "Sanierung planen", excerpt: "Abdichtung, barrierefreie Dusche, Schimmelschutz und KfW-Förderung." },
    ];

    // Merge, avoid duplicates
    const dbSlugs = new Set(articles.map((a: any) => a.slug));
    const allArticles = [
      ...articles,
      ...staticArticles.filter(a => !dbSlugs.has(a.slug))
    ];

    const articleContext = allArticles
      .map((a: any) => `- "${a.title}" → /blog/${a.slug} (${a.topic})`)
      .join("\n");

    // --- 3. Build page-aware context ---
    let pageContext = "";
    if (currentPage) {
      if (currentPage.includes("/blog/")) pageContext = "Der Nutzer liest gerade einen Blog-Artikel.";
      else if (currentPage.includes("/foerdermittel")) pageContext = "Der Nutzer ist auf der Fördermittel-Seite.";
      else if (currentPage.includes("/daemmung")) pageContext = "Der Nutzer informiert sich über Dämmung.";
      else if (currentPage.includes("/heizung")) pageContext = "Der Nutzer informiert sich über Heizungsmodernisierung.";
      else if (currentPage.includes("/solarenergie")) pageContext = "Der Nutzer informiert sich über Solarenergie.";
      else if (currentPage.includes("/rechner") || currentPage.includes("/budgetplan")) pageContext = "Der Nutzer nutzt einen Rechner/Planer.";
      else if (currentPage === "/" || currentPage === "") pageContext = "Der Nutzer ist auf der Startseite.";
    }

    // --- 4. System prompt ---
    const systemPrompt = `Du bist der freundliche "Sanierungshelfer" auf der Webseite "Sanieren & Sparen" – ein Ratgeber-Portal für energetische Haussanierung in Deutschland.

DEINE FÄHIGKEITEN:
1. **Artikel empfehlen**: Verlinke passende Artikel als Markdown-Links [Titel](/blog/slug)
2. **Rechner empfehlen**: Verweise auf die richtigen Tools:
   - Heizkostenrechner: [Heizkostenrechner](/heizkostenrechner)
   - Dämmungsrechner: [Dämmungsrechner](/daemmungsrechner)
   - Förderrechner: [Förderrechner](/foerderrechner)
   - Solar-Rechner: [Solar-Rechner](/solarenergie#rechner)
   - ROI-Rechner: [ROI-Rechner](/roi-rechner)
   - Budgetplaner: [Budgetplaner](/budgetplan)
   - Projektplaner: [Projektplaner](/projektplaner)
   - Rechner-Vergleich: [Alle Rechner vergleichen](/rechner-vergleich)
3. **Kosten grob einschätzen**: Gib typische Kostenrahmen für Sanierungsmaßnahmen an (z.B. Fassadendämmung 100-200 €/m², Wärmepumpe 15.000-25.000 €)
4. **Förderungen erklären**: BAFA (15-20% Zuschuss + 5% iSFP-Bonus), KfW (Kredite, Zuschüsse bis 70%), regionale Programme
5. **Sanierungsreihenfolge beraten**: Erst Hülle, dann Technik (Dämmung → Fenster → Heizung → Solar → Smart Home)
6. **Energieberater empfehlen**: Verweise auf die [Energieberater-Suche](/wissenswertes/experten) oder die Energieeffizienz-Expertenliste der dena

REGELN:
- Antworte immer auf Deutsch, freundlich und mit "Du"
- Halte Antworten kurz und praxisorientiert (max. 250 Wörter)
- Verlinke IMMER mindestens einen passenden Artikel oder Rechner
- Bei Handwerkersuche: Empfehle MyHammer, Check24 Profis, oder die lokale Handwerkskammer
- Bei Fragen zu Kosten: Gib Richtwerte und empfehle den passenden Rechner
- Beantworte KEINE Fragen, die nichts mit Haus/Sanierung/Energie/Wohnen zu tun haben – lenke freundlich zurück
- Nutze Emojis sparsam aber gezielt (🏠 💰 ☀️ 🔧)
- Wenn du Förderungen nennst, weise darauf hin: "Antrag immer VOR Auftragsvergabe stellen!"

${pageContext ? `KONTEXT: ${pageContext}` : ""}

VERFÜGBARE ARTIKEL AUF DER SEITE:
${articleContext}`;

    const aiMessages = [
      { role: "system", content: systemPrompt },
      ...history.slice(-10),
      { role: "user", content: message },
    ];

    // --- 5. Call Lovable AI Gateway with streaming ---
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: aiMessages,
        stream: true,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Zu viele Anfragen. Bitte versuche es in einer Minute erneut." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI-Kontingent erschöpft. Bitte später erneut versuchen." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await aiResponse.text();
      console.error("Lovable AI error:", aiResponse.status, errText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
