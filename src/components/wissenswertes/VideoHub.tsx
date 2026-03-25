import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Search, Euro, Hammer, ClipboardList, Video, FolderOpen, Award } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

interface VideoItem {
  title: string;
  youtubeId: string;
  description: React.ReactNode;
  descriptionText: string;
}

interface VideoCategory {
  title: string;
  icon: React.ReactNode;
  videos: VideoItem[];
}

const videoCategories: VideoCategory[] = [
  {
    title: "Fördermittel & Finanzierung",
    icon: <Euro className="h-4 w-4" />,
    videos: [
      {
        title: "Energieeffizient sanieren - Heizung modernisieren",
        youtubeId: "9q2FXn0a5lc",
        descriptionText: "Moderne Heiztechnik und optimale Förderung für maximale Effizienz.",
        description: (
          <span>
            Moderne Heiztechnik und optimale Förderung für maximale Effizienz.
            Weitere Tipps gibt es im{' '}
            <Link to="/blog/foerdermittel-2025-zuschuss-sanierung" className="text-primary hover:underline">
              Blogartikel zu Fördermitteln
            </Link>.
          </span>
        ),
      },
      {
        title: "Steuertricks für die Sanierung",
        youtubeId: "9q2FXn0a5lc",
        descriptionText: "Wie du Handwerkerrechnungen optimal absetzt und welche Nachweise nötig sind.",
        description: (
          <span>
            Wie du Handwerkerrechnungen optimal absetzt und welche Nachweise
            nötig sind. Noch mehr steuerliche Hinweise findest du in unserem{' '}
            <Link to="/blog/foerdermittel-2025-zuschuss-sanierung" className="text-primary hover:underline">
              Ratgeber zu Fördermitteln
            </Link>.
          </span>
        ),
      },
      {
        title: "Realistische Kosten & Förderbeispiele",
        youtubeId: "ttz54uEL54k",
        descriptionText: "Rechenbeispiele, welche Maßnahmen was kosten und wie viel nach Zuschüssen übrig bleibt.",
        description: (
          <span>
            Rechenbeispiele, welche Maßnahmen was kosten und wie viel nach
            Zuschüssen übrig bleibt. Eine ausführliche Tabelle findest du im{' '}
            <Link to="/blog/foerdermittel-2025-zuschuss-sanierung" className="text-primary hover:underline">
              Artikel zu Förderbeispielen
            </Link>.
          </span>
        ),
      },
      {
        title: "Energieberatung & iSFP erklärt",
        youtubeId: "3uWMx_VQg0M",
        descriptionText: "Warum ein individueller Sanierungsfahrplan wichtig ist und wie du ihn beantragst.",
        description: (
          <span>
            Warum ein individueller Sanierungsfahrplan wichtig ist und wie du
            ihn beantragst. Eine Schritt-für-Schritt-Anleitung gibt es im{' '}
            <Link to="/blog/daemmung-heizkosten-sparen" className="text-primary hover:underline">Artikel zur Dämmung</Link>.
          </span>
        ),
      },
      {
        title: "Viel sparen durch staatliche Förderung",
        youtubeId: "vgtadpskOLQ",
        descriptionText: "Überblick über aktuelle Fördermittel und wie du verschiedene Programme kombinierst.",
        description: (
          <span>
            Überblick über aktuelle Fördermittel und wie du verschiedene
            Programme kombinierst. Einen ausführlichen Leitfaden findest du im{' '}
            <Link to="/blog/foerdermittel-2025-zuschuss-sanierung" className="text-primary hover:underline">
              Blog zu Fördermitteln 2025
            </Link>.
          </span>
        ),
      },
    ],
  },
  {
    title: "Praxis & Eigenleistung",
    icon: <Hammer className="h-4 w-4" />,
    videos: [
      {
        title: "Energieeffizienz von H auf A in wenigen Monaten",
        youtubeId: "FbWOuRJhvFU",
        descriptionText: "Ein reales Projekt zeigt den Weg vom Altbau zur Effizienzklasse A.",
        description: (
          <span>
            Ein reales Projekt zeigt den Weg vom Altbau zur Effizienzklasse A
            und welche Maßnahmen entscheidend waren. Alle Hintergründe im{' '}
            <Link to="/blog/heizung-modernisieren-energiekosten-sparen" className="text-primary hover:underline">
              passenden Blogbeitrag
            </Link>.
          </span>
        ),
      },
      {
        title: "Nachhaltig sanieren und langfristig sparen",
        youtubeId: "4km3S-k2XHI",
        descriptionText: "Ökologische Baustoffe und regionale Planung helfen Klima und Geldbeutel.",
        description: (
          <span>
            Ökologische Baustoffe und regionale Planung helfen Klima und
            Geldbeutel. Mehr zum Thema findest du im{' '}
            <Link to="/blog/daemmung-heizkosten-sparen" className="text-primary hover:underline">Ratgeber Dämmung</Link>.
          </span>
        ),
      },
      {
        title: "Sanieren mit Eigenleistung – was ist realistisch?",
        youtubeId: "zFy4EqREhvk",
        descriptionText: "Was Heimwerker wirklich selbst machen können – inklusive Risiken und Einsparpotenzial.",
        description: (
          <span>
            Was Heimwerker wirklich selbst machen können – inklusive Risiken
            und Einsparpotenzial. Praktische Tipps findest du auch in unserer{' '}
            <Link to="/blog/kellerdecke-daemmen-anleitung" className="text-primary hover:underline">Anleitung zur Kellerdeckendämmung</Link>.
          </span>
        ),
      },
      {
        title: "10 Dinge, die du selbst machen kannst bei der Sanierung",
        youtubeId: "eBAvCdDkkx8",
        descriptionText: "Schnelle Tipps, wo ohne Handwerkerkosten angepackt werden kann.",
        description: (
          <span>
            Schnelle Tipps, wo ohne Handwerkerkosten angepackt werden kann –
            vom Dämmen bis zum Rückbau. Noch mehr DIY-Ideen gibt es im{' '}
            <Link to="/blog/kellerdecke-daemmen-anleitung" className="text-primary hover:underline">Kellerdecken-Guide</Link>.
          </span>
        ),
      },
      {
        title: "Energetisch sanieren – Mega-Ersparnis oder teurer Fehler?",
        youtubeId: "WpBjHE9aeVY",
        descriptionText: "Hausbau Helden zeigen Praxisbeispiele und echte Kostenvergleiche.",
        description: (
          <span>
            Hausbau Helden zeigen Praxisbeispiele und echte Kostenvergleiche.
            Mehr Hintergründe findest du im{' '}
            <Link to="/blog/heizung-modernisieren-energiekosten-sparen" className="text-primary hover:underline">
              Beitrag zur Heizungsmodernisierung
            </Link>.
          </span>
        ),
      },
    ],
  },
  {
    title: "Planung & Fehlervermeidung",
    icon: <ClipboardList className="h-4 w-4" />,
    videos: [
      {
        title: "Energetische Sanierung in 8 Schritten",
        youtubeId: "QdgQrTh5rus",
        descriptionText: "Vom Energieberater bis zur Umsetzung – der strukturierte Ablauf.",
        description: (
          <span>
            Vom Energieberater bis zur Umsetzung – der strukturierte Ablauf.
            Begleitend empfehlen wir den{' '}
            <Link to="/blog/fenster-tueren-sanieren-ratgeber-2025" className="text-primary hover:underline">Sanierungsratgeber</Link>,
            der jeden Schritt ausführlich erklärt.
          </span>
        ),
      },
      {
        title: "Fehler vermeiden beim Sanieren",
        youtubeId: "OZbjTkDOIGM",
        descriptionText: "Nadine Gehrmann fasst typische Planungs- und Ausführungsfehler zusammen.",
        description: (
          <span>
            Nadine Gehrmann fasst typische Planungs- und Ausführungsfehler
            zusammen. Eine Checkliste gibt es im{' '}
            <Link to="/blog/fenster-tueren-sanieren-ratgeber-2025" className="text-primary hover:underline">ausführlichen Artikel</Link>.
          </span>
        ),
      },
      {
        title: "Sanieren lohnt sich – oder?",
        youtubeId: "5jijtL_Ytrc",
        descriptionText: "Beispiele, wann Sanierung wirtschaftlich sinnvoll war und wann nicht.",
        description: (
          <span>
            Beispiele, wann Sanierung wirtschaftlich sinnvoll war und wann
            nicht. Weitere Kosten-Nutzen-Rechnungen findest du im{' '}
            <Link to="/blog/heizung-modernisieren-energiekosten-sparen" className="text-primary hover:underline">
              Artikel zur Heizungsmodernisierung
            </Link>.
          </span>
        ),
      },
      {
        title: "Reihenfolge der Sanierungsschritte",
        youtubeId: "oCNC8PW7EgA",
        descriptionText: "Was zuerst erledigt werden sollte – Fenster, Dach oder Heizung?",
        description: (
          <span>
            Was zuerst erledigt werden sollte – Fenster, Dach oder Heizung?
            Eine empfohlene Reihenfolge findest du im{' '}
            <Link to="/blog/fenster-tueren-sanieren-ratgeber-2025" className="text-primary hover:underline">
              Ratgeber Fenster & Türen
            </Link>.
          </span>
        ),
      },
      {
        title: "Sanieren im Bestand mit Plan",
        youtubeId: "kY6wg3L6UxY",
        descriptionText: "Praxisbeispiele für stressfreie Modernisierung inklusive Förderung.",
        description: (
          <span>
            Praxisbeispiele für stressfreie Modernisierung inklusive Förderung.
            Wie du dabei Schritt für Schritt vorgehst, erklärt der{' '}
            <Link to="/blog/fenster-tueren-sanieren-ratgeber-2025" className="text-primary hover:underline">
              ausführliche Sanierungsratgeber
            </Link>.
          </span>
        ),
      },
    ],
  },
];

const totalVideos = videoCategories.reduce((sum, c) => sum + c.videos.length, 0);

const VideoHub = () => {
  const [activeTab, setActiveTab] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredCategories = React.useMemo(() => {
    let cats = activeTab === "all"
      ? videoCategories
      : videoCategories.filter((_, i) => i === Number(activeTab));

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      cats = cats
        .map((cat) => ({
          ...cat,
          videos: cat.videos.filter(
            (v) =>
              v.title.toLowerCase().includes(q) ||
              v.descriptionText.toLowerCase().includes(q)
          ),
        }))
        .filter((cat) => cat.videos.length > 0);
    }

    return cats;
  }, [activeTab, searchQuery]);

  const featuredVideo = filteredCategories[0]?.videos[0];
  const featuredCategoryTitle = filteredCategories[0]?.title;

  const remainingCategories = React.useMemo(() => {
    if (!featuredVideo) return filteredCategories;
    return filteredCategories.map((cat, ci) => {
      if (ci === 0) {
        return { ...cat, videos: cat.videos.slice(1) };
      }
      return cat;
    }).filter((cat) => cat.videos.length > 0);
  }, [filteredCategories, featuredVideo]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Video-Hub</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Praktische Anleitungen und Expertentipps in HD-Qualität
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Video className="h-4 w-4 text-primary" />
            {totalVideos} Videos
          </span>
          <span className="flex items-center gap-1.5">
            <FolderOpen className="h-4 w-4 text-primary" />
            {videoCategories.length} Kategorien
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="h-4 w-4 text-primary" />
            Von Experten kuratiert
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setSearchQuery(""); }}>
        <TabsList className="w-full flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="all" className="text-xs sm:text-sm">
            Alle ({totalVideos})
          </TabsTrigger>
          {videoCategories.map((cat, i) => (
            <TabsTrigger key={i} value={String(i)} className="text-xs sm:text-sm gap-1">
              {cat.icon}
              <span className="hidden sm:inline">{cat.title}</span>
              <span className="sm:hidden">{cat.title.split(" ")[0]}</span>
              <span className="text-muted-foreground">({cat.videos.length})</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Videos durchsuchen…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Featured Video */}
      {featuredVideo && (
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={`https://img.youtube.com/vi/${featuredVideo.youtubeId}/maxresdefault.jpg`}
                  alt={`Vorschaubild von ${featuredVideo.title}`}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://img.youtube.com/vi/${featuredVideo.youtubeId}/hqdefault.jpg`;
                  }}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </AspectRatio>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-6">
                {featuredCategoryTitle && (
                  <Badge className="w-fit mb-2 text-xs">{featuredCategoryTitle}</Badge>
                )}
                <h3 className="text-white text-lg sm:text-2xl font-bold mb-1">
                  {featuredVideo.title}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2 hidden sm:block">
                  {featuredVideo.descriptionText}
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-primary/90 rounded-full p-3 sm:p-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground fill-primary-foreground" />
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader className="sr-only">
              <DialogTitle>{featuredVideo.title}</DialogTitle>
              <DialogDescription>Video wird abgespielt</DialogDescription>
            </DialogHeader>
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}?autoplay=1`}
                title={featuredVideo.title}
                referrerPolicy="strict-origin-when-cross-origin"
                sandbox="allow-scripts allow-same-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-md"
              />
            </AspectRatio>
          </DialogContent>
        </Dialog>
      )}

      {/* No results */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <Video className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">Keine Videos gefunden</p>
          <p className="text-muted-foreground text-sm mt-1">Versuche einen anderen Suchbegriff</p>
        </div>
      )}

      {/* Video Grid by Category */}
      {remainingCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            {videoCategories.find((c) => c.title === category.title)?.icon}
            {category.title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.videos.map((video, videoIndex) => (
              <VideoCard
                key={videoIndex}
                video={video}
                categoryTitle={category.title}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const VideoCard = ({
  video,
  categoryTitle,
}: {
  video: VideoItem;
  categoryTitle: string;
}) => (
  <Dialog>
    <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <DialogTrigger asChild>
        <div className="relative cursor-pointer overflow-hidden">
          <img
            src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
            alt={`Vorschaubild von ${video.title}`}
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
            }}
            className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <div className="bg-primary/90 rounded-full p-2.5 shadow-md transition-transform duration-300 group-hover:scale-110">
              <Play className="h-5 w-5 text-primary-foreground fill-primary-foreground" />
            </div>
          </div>
          <Badge variant="secondary" className="absolute top-2 left-2 text-[10px]">
            {categoryTitle.split(" ")[0]}
          </Badge>
        </div>
      </DialogTrigger>

      <CardHeader className="pb-2">
        <CardTitle className="text-sm leading-snug line-clamp-2">{video.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription className="text-xs line-clamp-2">{video.description}</CardDescription>
      </CardContent>
    </Card>

    <DialogContent className="max-w-3xl">
      <DialogHeader className="sr-only">
        <DialogTitle>{video.title}</DialogTitle>
        <DialogDescription>Video wird abgespielt</DialogDescription>
      </DialogHeader>
      <AspectRatio ratio={16 / 9}>
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
          title={video.title}
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full rounded-md"
        />
      </AspectRatio>
    </DialogContent>
  </Dialog>
);

export default VideoHub;
