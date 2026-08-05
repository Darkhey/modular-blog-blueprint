// Image selection for generated blog articles.
// Priority: curated local asset -> targeted Unsplash search -> category fallback.

export interface HeroImageResult {
  url: string;
  alt: string;
  credit: string | null;
  source: "local" | "unsplash" | "fallback";
}

/**
 * Curated project assets (served from /assets via the built app).
 * Keys are matched case-insensitively against title + keywords + topic.
 */
const LOCAL_ASSETS: Array<{ keywords: string[]; path: string; alt: string }> = [
  { keywords: ["wärmepumpe", "waermepumpe", "luft-wasser", "heat pump"], path: "/assets/blog-hero-waermepumpe.jpg", alt: "Wärmepumpe an einem sanierten Wohnhaus" },
  { keywords: ["altbau wärmepumpe", "wärmepumpe altbau"], path: "/assets/blog-hero-waermepumpe-altbau.jpg", alt: "Wärmepumpe im Altbau" },
  { keywords: ["einblasdämmung", "kerndämmung", "zweischalig"], path: "/assets/blog-hero-einblasdaemmung.jpg", alt: "Einblasdämmung im zweischaligen Mauerwerk" },
  { keywords: ["dämmung", "daemmung", "wdvs", "dämmstoff", "isolierung"], path: "/assets/blog-hero-daemmung.jpg", alt: "Fassadendämmung an einem Einfamilienhaus" },
  { keywords: ["solar", "photovoltaik", "pv-anlage", "balkonkraftwerk"], path: "/assets/blog-hero-solar.jpg", alt: "Photovoltaikanlage auf einem Hausdach" },
  { keywords: ["fenster", "verglasung", "haustür"], path: "/assets/blog-hero-fenster.jpg", alt: "Moderne Fenster mit Wärmeschutzverglasung" },
  { keywords: ["heizung", "heizkessel", "hydraulischer abgleich", "heizkörper"], path: "/assets/blog-hero-heizung.jpg", alt: "Moderne Heizungsanlage im Keller" },
  { keywords: ["förder", "foerder", "kfw", "bafa", "zuschuss", "prämie"], path: "/assets/blog-hero-foerdermittel.jpg", alt: "Förderantrag für die energetische Sanierung" },
  { keywords: ["smart home", "smarthome", "thermostat", "steuerung"], path: "/assets/blog-hero-smarthome.jpg", alt: "Smart-Home-Steuerung für die Heizung" },
  { keywords: ["dach", "dachausbau", "dachgeschoss"], path: "/assets/blog-hero-dachausbau.jpg", alt: "Ausgebautes und gedämmtes Dachgeschoss" },
  { keywords: ["keller", "kellersanierung", "bodenplatte"], path: "/assets/blog-hero-kellersanierung.jpg", alt: "Sanierter und gedämmter Keller" },
  { keywords: ["schimmel", "feuchtigkeit", "lüften"], path: "/assets/blog-hero-schimmelbeseitigung.jpg", alt: "Schimmelbeseitigung an einer Innenwand" },
  { keywords: ["bad", "badezimmer", "sanitär"], path: "/assets/blog-hero-badezimmer-sanierung.jpg", alt: "Modernisiertes Badezimmer" },
  { keywords: ["barrierefrei", "altersgerecht"], path: "/assets/blog-hero-barrierefreies-wohnen.jpg", alt: "Barrierefrei umgebautes Wohnhaus" },
  { keywords: ["elektro", "leitungen", "wallbox"], path: "/assets/blog-hero-elektroinstallation.jpg", alt: "Erneuerte Elektroinstallation" },
  { keywords: ["kernsanierung", "komplettsanierung"], path: "/assets/blog-hero-kernsanierung.jpg", alt: "Haus in der Kernsanierung" },
  { keywords: ["garten", "außenanlage"], path: "/assets/blog-hero-gartengestaltung.jpg", alt: "Neu gestalteter Garten am sanierten Haus" },
];

const CATEGORY_FALLBACK: Record<string, string> = {
  "Heizung modernisieren": "/assets/blog-hero-heizung.jpg",
  "Dämmung & Isolierung": "/assets/blog-hero-daemmung.jpg",
  "Fenster": "/assets/blog-hero-fenster.jpg",
  "Dach": "/assets/blog-hero-dachausbau.jpg",
  "Smart Home": "/assets/blog-hero-smarthome.jpg",
  "Solarenergie": "/assets/blog-hero-solar.jpg",
  "Fördermittel": "/assets/blog-hero-foerdermittel.jpg",
};

const GENERIC_FALLBACK = "/assets/sanierungsfahrplan-hero.jpg";

function pickLocal(haystack: string) {
  const text = haystack.toLowerCase();
  // longer keyword lists first so specific matches win
  const sorted = [...LOCAL_ASSETS].sort(
    (a, b) => Math.max(...b.keywords.map((k) => k.length)) - Math.max(...a.keywords.map((k) => k.length)),
  );
  return sorted.find((entry) => entry.keywords.some((k) => text.includes(k))) ?? null;
}

async function searchUnsplash(
  query: string,
  accessKey: string,
): Promise<{ url: string; credit: string } | null> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=5&content_filter=high`,
      { headers: { Authorization: `Client-ID ${accessKey}` } },
    );
    if (!res.ok) {
      console.error(`[heroImage] Unsplash search failed [${res.status}]: ${await res.text()}`);
      return null;
    }
    const data = await res.json();
    const candidate = (data.results || []).find((r: any) => (r.width || 0) >= 1200) || data.results?.[0];
    if (!candidate?.urls?.raw && !candidate?.urls?.regular) return null;
    const base = candidate.urls.raw
      ? `${candidate.urls.raw}&w=1200&h=630&fit=crop&q=80`
      : candidate.urls.regular;
    const name = candidate.user?.name || "Unsplash";
    return { url: base, credit: `Foto: ${name} / Unsplash` };
  } catch (err) {
    console.error("[heroImage] Unsplash error:", err);
    return null;
  }
}

/**
 * Resolves the hero image for an article.
 * `imageBrief` should be a short English motif description from the model.
 */
export async function resolveHeroImage(opts: {
  title: string;
  topic: string;
  keywords?: string[];
  imageBrief?: string | null;
  imageAlt?: string | null;
  unsplashKey?: string | null;
}): Promise<HeroImageResult> {
  const { title, topic, keywords = [], imageBrief, imageAlt, unsplashKey } = opts;
  const haystack = `${title} ${topic} ${keywords.join(" ")}`;

  const local = pickLocal(haystack);
  if (local) {
    return { url: local.path, alt: imageAlt || local.alt, credit: null, source: "local" };
  }

  if (unsplashKey) {
    const query = (imageBrief || `${topic} house renovation energy efficiency`).slice(0, 120);
    const found = await searchUnsplash(query, unsplashKey);
    if (found) {
      return {
        url: found.url,
        alt: imageAlt || `${title} – Symbolbild`,
        credit: found.credit,
        source: "unsplash",
      };
    }
  }

  const fallback = CATEGORY_FALLBACK[topic] || GENERIC_FALLBACK;
  return { url: fallback, alt: imageAlt || `${topic} – Symbolbild`, credit: null, source: "fallback" };
}
