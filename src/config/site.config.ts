export const siteConfig = {
  // Projekt-Identität
  projectName: "Sanieren & Sparen",
  tagline: "Ihr Ratgeber für energieeffiziente Sanierung",
  domain: "sanierenundsparen.de",
  
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
  
  // Werbung (Google AdSense Auto Ads aktiviert)
  adsEnabled: true,
  adsSettings: {
    positions: {
      afterParagraph: true,
      sidebarTop: true,
      footerBanner: true,
      headerBanner: true
    }
  },
  
  // Google Services (AdSense Auto Ads optimiert)
  googleServices: {
    // Analytics
    analytics: {
      enabled: true,
      trackingId: "G-XXXXXXXXXX", // Wird später durch echte ID ersetzt
      config: {
        anonymize_ip: true,
        cookie_expires: 63072000, // 2 Jahre
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        send_page_view: false // Manuell gesteuert
      }
    },
    
    // AdSense (Auto Ads - konfiguriert über Dashboard)
    adsense: {
      enabled: true,
      publisherId: "ca-pub-4326654077043920", // Echte Publisher ID
      config: {
        // Auto Ads werden über das AdSense-Dashboard konfiguriert
        // Kein JavaScript-Setup mehr erforderlich
        data_ad_client: "ca-pub-4326654077043920",
        // Test-Modus aktiviert für Entwicklung
        adtest: "on"
      }
    },

    // Tag Manager (optional)
    tagManager: {
      enabled: false,
      containerId: "GTM-XXXXXXX"
    }
  },
  
  // Content-Themen für Generierung mit SEO-URLs
  contentTopics: [
    {
      id: "heizung",
      name: "Heizung modernisieren",
      description: "Effiziente Heizsysteme und Modernisierung für bis zu 40% weniger Heizkosten",
      color: "#dc2626",
      seoUrl: "/heizung-modernisieren",
      seoTitle: "Heizung modernisieren - Bis zu 40% sparen + Förderung 2024",
      seoDescription: "Heizung modernisieren und bis zu 40% Energiekosten sparen. Wärmepumpe, Gas-Brennwert & Co. Alle Fördermittel und Amortisation im Überblick.",
      keywords: ["Heizung modernisieren", "Wärmepumpe", "Gas-Brennwert", "BAFA Förderung", "Heizkosten sparen"]
    },
    {
      id: "daemmung",
      name: "Dämmung & Isolierung", 
      description: "Wärmedämmung für Wände, Dach und Keller - Heizkosten halbieren",
      color: "#7c3aed",
      seoUrl: "/daemmung-isolierung",
      seoTitle: "Dämmung & Isolierung - Heizkosten halbieren + KfW Förderung",
      seoDescription: "Professionelle Dämmung für Wände, Dach & Keller. Bis zu 50% weniger Heizkosten. KfW Förderung bis 150.000€. Alle Materialien im Vergleich.",
      keywords: ["Dämmung", "Wärmedämmung", "WDVS", "Dachdämmung", "KfW Förderung", "Isolierung"]
    },
    {
      id: "foerderung",
      name: "Fördermittel",
      description: "Staatliche Zuschüsse und Finanzierungshilfen optimal nutzen",
      color: "#059669",
      seoUrl: "/foerdermittel",
      seoTitle: "Fördermittel 2024 - Bis zu 70% Zuschuss für Sanierung",
      seoDescription: "Alle Förderprogramme 2024: BAFA bis 70%, KfW bis 150.000€, regionale Zuschüsse. Optimal kombinieren und bis zu 25.000€ sparen.",
      keywords: ["Fördermittel", "BAFA", "KfW", "Sanierung Zuschuss", "Energieförderung", "BEG"]
    },
    {
      id: "fenster",
      name: "Fenster & Türen",
      description: "Energieeffiziente Fenster und Türen für optimale Dämmung",
      color: "#0891b2",
      seoUrl: "/fenster-tueren",
      seoTitle: "Fenster & Türen - Energieeffizient sanieren + Förderung",
      seoDescription: "Neue Fenster & Türen: 3-fach Verglasung, U-Werte, Kosten & Förderung. Bis zu 20% Heizkosten sparen mit modernen Fenstern.",
      keywords: ["Fenster", "Türen", "3-fach Verglasung", "U-Wert", "Fenstertausch", "Energieeffizienz"]
    },
    {
      id: "solar",
      name: "Solarenergie",
      description: "Photovoltaik und Solarthermie für kostenlose Energie",
      color: "#ea580c",
      seoUrl: "/solarenergie",
      seoTitle: "Solarenergie - Photovoltaik & Solarthermie Ratgeber 2024",
      seoDescription: "Solar nutzen: PV-Anlage Kosten, Ertrag & Förderung. Solarthermie für Warmwasser. Bis zu 70% weniger Stromkosten mit eigener Solaranlage.",
      keywords: ["Solarenergie", "Photovoltaik", "Solarthermie", "PV-Anlage", "Solar Förderung", "Eigenverbrauch"]
    },
    {
      id: "smart-home",
      name: "Smart Home",
      description: "Intelligente Haustechnik für automatisches Energiesparen",
      color: "#8b5cf6",
      seoUrl: "/smart-home",
      seoTitle: "Smart Home - Intelligente Haustechnik zum Energiesparen",
      seoDescription: "Smart Home Systeme: Intelligente Heizungssteuerung, smarte Thermostate, automatische Beleuchtung. Bis zu 15% Energieeinsparung.",
      keywords: ["Smart Home", "intelligente Heizung", "smarte Thermostate", "Hausautomation", "Energiemanagement"]
    }
  ],
  
  // Navigation mit SEO-URLs
  navigation: [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Themen", href: "/themen", isDropdown: true },
    { name: "Wissenswertes", href: "/wissenswertes" },
  ],
  
  // Newsletter
  newsletter: {
    enabled: true,
    title: "Kostenlose Sanierungstipps",
    description: "Erhalten Sie wöchentlich neue Tipps zum Energiesparen und aktuelle Förderprogramme direkt in Ihr Postfach."
  }
} as const;

export type SiteConfig = typeof siteConfig;
