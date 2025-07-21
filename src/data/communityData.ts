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
    avatar: "/placeholder.svg",
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
    avatar: "/placeholder.svg",
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
    avatar: "/placeholder.svg",
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
    avatar: "/placeholder.svg",
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
    avatar: "/placeholder.svg",
    likes: 30,
    responses: 14
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
  }
];
