
export interface Manufacturer {
    name: string;
    description: string;
    specialties: string[];
    logoPlaceholder: string;
    color: string;
    website: string;
    material: string;
    useCases: string[];
    ecoFriendly: boolean;
    madeIn: string;
}

export const manufacturersData: Manufacturer[] = [
    {
      name: "Steico",
      description: "Ökologische Dämmstoffe aus nachwachsenden Rohstoffen.",
      specialties: ["Holzfaser-Dämmplatten", "Einblasdämmung", "Luftdichtsysteme"],
      logoPlaceholder: "S",
      color: "bg-green-600",
      website: "https://www.steico.com/de/",
      material: "Holzfaser",
      useCases: ["Dach", "Wand", "Boden"],
      ecoFriendly: true,
      madeIn: "EU"
    },
    {
      name: "Thermofloc",
      description: "Einblasdämmung aus recyceltem Zeitungspapier.",
      specialties: ["Zellulose-Einblasdämmung", "Dampfbremsen", "Recycling"],
      logoPlaceholder: "T",
      color: "bg-blue-600",
      website: "https://www.thermofloc.com/de/",
      material: "Zellulose",
      useCases: ["Dach", "Wand", "Hohlräume"],
      ecoFriendly: true,
      madeIn: "Österreich"
    },
    {
      name: "Isofloc",
      description: "Spezialist für Zellulose-Dämmung und Luftdichtheit.",
      specialties: ["Zellulose", "Brandschutzlösungen", "Schallschutz"],
      logoPlaceholder: "I",
      color: "bg-purple-600",
      website: "https://www.isofloc.de/",
      material: "Zellulose",
      useCases: ["Dach", "Wand", "Decke"],
      ecoFriendly: true,
      madeIn: "EU"
    },
    {
      name: "Isover",
      description: "Glaswolle und Steinwolle für höchste Energieeffizienz.",
      specialties: ["Glaswolle", "Steinwolle", "Brandschutz (A1)"],
      logoPlaceholder: "IS",
      color: "bg-orange-600",
      website: "https://www.isover.de/",
      material: "Glas-/Steinwolle",
      useCases: ["Dach", "Fassade", "Keller"],
      ecoFriendly: false,
      madeIn: "Deutschland"
    },
    {
      name: "Rockwool",
      description: "Steinwolle-Dämmung für Wärme-, Brand- und Schallschutz.",
      specialties: ["Steinwolle", "Nicht brennbar", "Akustikdämmung"],
      logoPlaceholder: "R",
      color: "bg-red-600",
      website: "https://www.rockwool.com/de/",
      material: "Steinwolle",
      useCases: ["Dach", "Fassade", "Brandschutz"],
      ecoFriendly: false,
      madeIn: "EU"
    },
    {
      name: "Knauf Insulation",
      description: "Nachhaltige Dämmlösungen aus Mineralwolle mit ECOSE®.",
      specialties: ["Mineralwolle", "Glaswolle", "ECOSE® Technology"],
      logoPlaceholder: "K",
      color: "bg-indigo-600",
      website: "https://www.knaufinsulation.de/",
      material: "Mineralwolle",
      useCases: ["Dach", "Wand", "Boden"],
      ecoFriendly: false,
      madeIn: "Deutschland"
    },
    {
      name: "Ursa",
      description: "Mineralwolle-Dämmstoffe für Neubau und Sanierung.",
      specialties: ["Mineralwolle", "XPS-Dämmplatten", "Akustik"],
      logoPlaceholder: "U",
      color: "bg-teal-600",
      website: "https://www.ursa.de/",
      material: "Mineralwolle / XPS",
      useCases: ["Dach", "Trennwand", "Boden"],
      ecoFriendly: false,
      madeIn: "EU"
    },
    {
      name: "Pavatex",
      description: "Diffusionsoffene Holzfaser-Dämmstoffe für die Gebäudehülle.",
      specialties: ["Holzfaserdämmung", "Ökologisch", "Diffusionsoffen"],
      logoPlaceholder: "P",
      color: "bg-emerald-600",
      website: "https://www.pavatex.de/",
      material: "Holzfaser",
      useCases: ["Dach", "Fassade", "Innenausbau"],
      ecoFriendly: true,
      madeIn: "EU"
    },
    {
      name: "Gutex",
      description: "Holzfaserdämmplatten aus Schwarzwälder Tannenholz.",
      specialties: ["Holzfaserplatten", "Made in Germany", "Regensicherheit"],
      logoPlaceholder: "G",
      color: "bg-lime-600",
      website: "https://www.gutex.de/",
      material: "Holzfaser",
      useCases: ["Dach", "Fassade", "Innenausbau"],
      ecoFriendly: true,
      madeIn: "Deutschland"
    },
    {
      name: "Homatherm",
      description: "Flexible und stabile Dämmstoffe aus dem Naturstoff Holz.",
      specialties: ["Holzfaser-Matten", "Naturdämmung", "Wohngesundheit"],
      logoPlaceholder: "H",
      color: "bg-yellow-600",
      website: "https://www.homanit.com/de/homatherm/",
      material: "Holzfaser",
      useCases: ["Dach", "Wand", "Boden"],
      ecoFriendly: true,
      madeIn: "Deutschland"
    },
    {
      name: "Sto",
      description: "Marktführer für Wärmedämm-Verbundsysteme (WDVS).",
      specialties: ["WDVS", "Fassadendämmung", "Systemlösungen"],
      logoPlaceholder: "ST",
      color: "bg-pink-600",
      website: "https://www.sto.de/",
      material: "WDVS (EPS/Mineralwolle)",
      useCases: ["Fassade", "Außenwand", "Kellerdecke"],
      ecoFriendly: false,
      madeIn: "Deutschland"
    },
    {
      name: "Caparol",
      description: "Wärmedämm-Verbundsysteme und Fassadenlösungen.",
      specialties: ["WDVS", "Hanfdämmung", "Farbe & Dämmung"],
      logoPlaceholder: "C",
      color: "bg-rose-600",
      website: "https://www.caparol.de/",
      material: "WDVS / Hanf",
      useCases: ["Fassade", "Innendämmung", "Fachwerk"],
      ecoFriendly: false,
      madeIn: "Deutschland"
    }
  ];
