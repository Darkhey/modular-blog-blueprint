export interface SuccessStory {
  name: string;
  location: string;
  project: string;
  savings: string;
  rating: number;
  story: string;
  avatar: string;
  likes: number;
  responses: number;
}

export interface ForumTopic {
  title: string;
  author: string;
  replies: number;
  views: number;
  lastActivity: string;
  isHot: boolean;
}

export const successStories: SuccessStory[] = [
  {
    name: "Familie Schneider",
    location: "München",
    project: "Komplette Dachsanierung",
    savings: "€1.200/Jahr",
    rating: 5,
    story: "Durch die professionelle Beratung haben wir 30% mehr Förderung erhalten als ursprünglich geplant.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    likes: 24,
    responses: 8
  },
  {
    name: "Thomas Bauer",
    location: "Hamburg",
    project: "Wärmepumpe Installation",
    savings: "€800/Jahr",
    rating: 5,
    story: "Die Schritt-für-Schritt Anleitung war perfekt. Installation verlief problemlos.",
    avatar: "https://randomuser.me/api/portraits/men/83.jpg",
    likes: 18,
    responses: 12
  },
  {
    name: "Anna und Michael Richter",
    location: "Berlin",
    project: "Altbau-Energiesanierung",
    savings: "€1.500/Jahr",
    rating: 4,
    story: "Mit dem Sanierungsplaner konnten wir die Maßnahmen perfekt aufeinander abstimmen.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    likes: 22,
    responses: 10
  },
  {
    name: "Sabine Klein",
    location: "Köln",
    project: "Dämmung Kellerdecke",
    savings: "€300/Jahr",
    rating: 4,
    story: "Die Tipps aus dem Forum haben mir viel Arbeit erspart.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    likes: 15,
    responses: 5
  },
  {
    name: "Familie Huber",
    location: "Stuttgart",
    project: "Photovoltaik & Speicher",
    savings: "€900/Jahr",
    rating: 5,
    story: "Dank der Förderübersicht haben wir die optimale Finanzierung gefunden.",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    likes: 30,
    responses: 14
  },
  {
    name: "Familie Müller",
    location: "Dresden",
    project: "Fensteraustausch & Wärmedämmung",
    savings: "€600/Jahr",
    rating: 5,
    story: "Mit dem KfW-Kredit 261 konnten wir unsere energetische Sanierung besonders günstig finanzieren.",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    likes: 17,
    responses: 6
  },
  {
    name: "Jonas Krüger",
    location: "Hannover",
    project: "Heizung modernisieren",
    savings: "€400/Jahr",
    rating: 4,
    story: "Die BAFA-Förderung half mir, die Kosten für eine effiziente Wärmepumpe deutlich zu senken.",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    likes: 12,
    responses: 4
  },
  {
    name: "Petra Meier",
    location: "Nürnberg",
    project: "Komplettsanierung Altbau",
    savings: "€2.000/Jahr",
    rating: 5,
    story: "Ein Sanierungsfahrplan vom Energieberater war der Schlüssel zu maximaler Förderung und geringeren Energiekosten.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    likes: 35,
    responses: 16
  }
];

export const forumTopics: ForumTopic[] = [
  {
    title: "Beste Zeit für Dachsanierung?",
    author: "SanierungsProfi23",
    replies: 15,
    views: 234,
    lastActivity: "vor 2 Stunden",
    isHot: true
  },
  {
    title: "Erfahrungen mit KfW-Förderung",
    author: "HausbesitzerHH",
    replies: 23,
    views: 456,
    lastActivity: "vor 4 Stunden",
    isHot: false
  },
  {
    title: "Wärmepumpe vs. Gasheizung 2025",
    author: "EnergieExperte",
    replies: 31,
    views: 789,
    lastActivity: "vor 1 Tag",
    isHot: true
  },
  {
    title: "Erfahrungen mit Innendämmung?",
    author: "Bauherr2024",
    replies: 12,
    views: 198,
    lastActivity: "vor 3 Tagen",
    isHot: false
  },
  {
    title: "Welche Smart-Home-Systeme sind förderfähig?",
    author: "TechRenovator",
    replies: 8,
    views: 123,
    lastActivity: "vor 5 Tagen",
    isHot: false
  },
  {
    title: "Hat jemand Erfahrungen mit BAFA-Förderung für Wärmepumpen?",
    author: "greenEnergy",
    replies: 19,
    views: 342,
    lastActivity: "vor 1 Woche",
    isHot: true
  },
  {
    title: "Wie hoch sind die Sanierungskosten pro Quadratmeter?",
    author: "Bauplaner77",
    replies: 11,
    views: 201,
    lastActivity: "vor 1 Woche",
    isHot: false
  },
  {
    title: "Tipps für energieeffiziente Altbausanierung",
    author: "RenovierPro",
    replies: 27,
    views: 489,
    lastActivity: "vor 2 Wochen",
    isHot: true
  }
];

export const communityDisclaimer =
  "Alle Erfahrungsberichte spiegeln persönliche Erfahrungen wider. Förderkonditionen können sich ändern. Bitte informieren Sie sich über aktuelle Richtlinien.";
