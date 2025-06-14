
export const siteConfig = {
  // Projekt-Identität
  projectName: "Sanieren & Sparen",
  tagline: "Ihr Ratgeber für energieeffiziente Sanierung",
  domain: "sanieren-sparen.de",
  
  // Design & Branding
  themeColors: {
    primary: "#16a34a", // Grün für Nachhaltigkeit
    secondary: "#0ea5e9", // Blau für Vertrauen
    accent: "#f59e0b", // Orange für Highlights
    neutral: "#64748b",
    background: "#ffffff",
    muted: "#f8fafc"
  },
  
  fonts: {
    primary: "Inter, sans-serif",
    secondary: "Inter, sans-serif"
  },
  
  // SEO Meta-Daten
  siteMeta: {
    title: "Sanieren & Sparen - Ratgeber für energieeffiziente Sanierung",
    description: "Entdecken Sie praktische Tipps zur Haussanierung, Energieeinsparung und Fördermitteln. Sparen Sie Kosten bei Heizung, Dämmung und Renovierung.",
    keywords: "Sanierung, Energieeffizienz, Heizung modernisieren, Dämmung, Fördermittel, Renovierung, Kosteneinsparung",
    defaultOGImage: "/og-default.jpg",
    author: "Sanieren & Sparen Redaktion"
  },
  
  // Social Media & Links
  socialLinks: {
    instagram: "",
    facebook: "",
    newsletter: "/newsletter",
    impressum: "/impressum",
    datenschutz: "/datenschutz",
    kontakt: "/kontakt"
  },
  
  // Werbung
  adsEnabled: true,
  adsSettings: {
    positions: {
      afterParagraph: true,
      sidebarTop: true,
      footerBanner: true,
      headerBanner: false
    },
    adCodes: {
      banner: '<div class="bg-gray-100 p-4 rounded text-center text-sm text-gray-600">Werbung</div>',
      sidebar: '<div class="bg-gray-100 p-4 rounded text-center text-sm text-gray-600">Sidebar Ad</div>',
      footer: '<div class="bg-gray-100 p-8 rounded text-center text-sm text-gray-600">Footer Banner</div>'
    }
  },
  
  // Content-Themen für Generierung
  contentTopics: [
    {
      id: "heizung",
      name: "Heizung modernisieren",
      description: "Effiziente Heizsysteme und Modernisierung",
      color: "#dc2626"
    },
    {
      id: "daemmung",
      name: "Dämmung & Isolierung", 
      description: "Wärmedämmung für Wände, Dach und Keller",
      color: "#7c3aed"
    },
    {
      id: "foerderung",
      name: "Fördermittel",
      description: "Staatliche Zuschüsse und Finanzierungshilfen",
      color: "#059669"
    },
    {
      id: "fenster",
      name: "Fenster & Türen",
      description: "Energieeffiziente Fenster und Türen",
      color: "#0891b2"
    },
    {
      id: "solar",
      name: "Solarenergie",
      description: "Photovoltaik und Solarthermie",
      color: "#ea580c"
    },
    {
      id: "smart-home",
      name: "Smart Home",
      description: "Intelligente Haustechnik für Energiesparen",
      color: "#8b5cf6"
    }
  ],
  
  // Navigation
  navigation: [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Themen", href: "/themen" },
    { name: "Ratgeber", href: "/ratgeber" },
    { name: "Links", href: "/links" }
  ],
  
  // Newsletter
  newsletter: {
    enabled: true,
    title: "Kostenlose Sanierungstipps",
    description: "Erhalten Sie wöchentlich neue Tipps zum Energiesparen und aktuelle Förderprogramme direkt in Ihr Postfach."
  }
} as const;

export type SiteConfig = typeof siteConfig;
