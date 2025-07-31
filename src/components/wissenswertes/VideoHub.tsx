import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

interface VideoItem {
  title: string;
  youtubeId: string;
  description: React.ReactNode;
}

interface VideoCategory {
  title: string;
  videos: VideoItem[];
}

const VideoHub = () => {
  const plugin = React.useRef(Autoplay({ delay: 5000 }));

  const videoCategories: VideoCategory[] = [
    {
      title: "Fördermittel & Finanzierung",
      videos: [
        {
          title: "Energieeffizient sanieren - Heizung modernisieren",
          youtubeId: "9q2FXn0a5lc",
          description: (
            <span>
              Moderne Heiztechnik und optimale Förderung für maximale Effizienz.
              Weitere Tipps gibt es im{' '}
              <Link to="/blog/foerdermittel-2025-zuschuss-sanierung">
                Blogartikel zu Fördermitteln
              </Link>
              .
            </span>
          ),
        },
        {
          title: "Steuertricks für die Sanierung",
          youtubeId: "9q2FXn0a5lc",
          description: (
            <span>
              Wie du Handwerkerrechnungen optimal absetzt und welche Nachweise
              nötig sind. Noch mehr steuerliche Hinweise findest du in unserem{' '}
              <Link to="/blog/foerdermittel-2025-zuschuss-sanierung">
                Ratgeber zu Fördermitteln
              </Link>
              .
            </span>
          ),
        },
        {
          title: "Realistische Kosten & Förderbeispiele",
          youtubeId: "ttz54uEL54k",
          description: (
            <span>
              Rechenbeispiele, welche Maßnahmen was kosten und wie viel nach
              Zuschüssen übrig bleibt. Eine ausführliche Tabelle findest du im{' '}
              <Link to="/blog/foerdermittel-2025-zuschuss-sanierung">
                Artikel zu Förderbeispielen
              </Link>
              .
            </span>
          ),
        },
        {
          title: "Energieberatung & iSFP erklärt",
          youtubeId: "3uWMx_VQg0M",
          description: (
            <span>
              Warum ein individueller Sanierungsfahrplan wichtig ist und wie du
              ihn beantragst. Eine Schritt-für-Schritt-Anleitung gibt es im{' '}
              <Link to="/blog/daemmung-heizkosten-sparen">Artikel zur Dämmung</Link>.
            </span>
          ),
        },
        {
          title: "Viel sparen durch staatliche Förderung",
          youtubeId: "vgtadpskOLQ",
          description: (
            <span>
              Überblick über aktuelle Fördermittel und wie du verschiedene
              Programme kombinierst. Einen ausführlichen Leitfaden findest du im{' '}
              <Link to="/blog/foerdermittel-2025-zuschuss-sanierung">
                Blog zu Fördermitteln 2025
              </Link>
              .
            </span>
          ),
        },
      ],
    },
    {
      title: "Praxis & Eigenleistung",
      videos: [
        {
          title: "Energieeffizienz von H auf A in wenigen Monaten",
          youtubeId: "FbWOuRJhvFU",
          description: (
            <span>
              Ein reales Projekt zeigt den Weg vom Altbau zur Effizienzklasse A
              und welche Maßnahmen entscheidend waren. Alle Hintergründe im{' '}
              <Link to="/blog/heizung-modernisieren-energiekosten-sparen">
                passenden Blogbeitrag
              </Link>
              .
            </span>
          ),
        },
        {
          title: "Nachhaltig sanieren und langfristig sparen",
          youtubeId: "4km3S-k2XHI",
          description: (
            <span>
              Ökologische Baustoffe und regionale Planung helfen Klima und
              Geldbeutel. Mehr zum Thema findest du im{' '}
              <Link to="/blog/daemmung-heizkosten-sparen">Ratgeber Dämmung</Link>
              .
            </span>
          ),
        },
        {
          title: "Sanieren mit Eigenleistung – was ist realistisch?",
          youtubeId: "zFy4EqREhvk",
          description: (
            <span>
              Was Heimwerker wirklich selbst machen können – inklusive Risiken
              und Einsparpotenzial. Praktische Tipps findest du auch in unserer{' '}
              <Link to="/blog/kellerdecke-daemmen-anleitung">Anleitung zur Kellerdeckendämmung</Link>
              .
            </span>
          ),
        },
        {
          title: "10 Dinge, die du selbst machen kannst bei der Sanierung",
          youtubeId: "eBAvCdDkkx8",
          description: (
            <span>
              Schnelle Tipps, wo ohne Handwerkerkosten angepackt werden kann –
              vom Dämmen bis zum Rückbau. Noch mehr DIY-Ideen gibt es im{' '}
              <Link to="/blog/kellerdecke-daemmen-anleitung">Kellerdecken-Guide</Link>
              .
            </span>
          ),
        },
        {
          title: "Energetisch sanieren – Mega-Ersparnis oder teurer Fehler?",
          youtubeId: "WpBjHE9aeVY",
          description: (
            <span>
              Hausbau Helden zeigen Praxisbeispiele und echte Kostenvergleiche.
              Mehr Hintergründe findest du im{' '}
              <Link to="/blog/heizung-modernisieren-energiekosten-sparen">
                Beitrag zur Heizungsmodernisierung
              </Link>
              .
            </span>
          ),
        },
      ],
    },
    {
      title: "Planung & Fehlervermeidung",
      videos: [
        {
          title: "Energetische Sanierung in 8 Schritten",
          youtubeId: "QdgQrTh5rus",
          description: (
            <span>
              Vom Energieberater bis zur Umsetzung – der strukturierte Ablauf.
              Begleitend empfehlen wir den{' '}
              <Link to="/blog/fenster-tueren-sanieren-ratgeber-2025">Sanierungsratgeber</Link>
              , der jeden Schritt ausführlich erklärt.
            </span>
          ),
        },
        {
          title: "Fehler vermeiden beim Sanieren",
          youtubeId: "OZbjTkDOIGM",
          description: (
            <span>
              Nadine Gehrmann fasst typische Planungs- und Ausführungsfehler
              zusammen. Eine Checkliste gibt es im{' '}
              <Link to="/blog/fenster-tueren-sanieren-ratgeber-2025">ausführlichen Artikel</Link>
              .
            </span>
          ),
        },
        {
          title: "Sanieren lohnt sich – oder?",
          youtubeId: "5jijtL_Ytrc",
          description: (
            <span>
              Beispiele, wann Sanierung wirtschaftlich sinnvoll war und wann
              nicht. Weitere Kosten-Nutzen-Rechnungen findest du im{' '}
              <Link to="/blog/heizung-modernisieren-energiekosten-sparen">
                Artikel zur Heizungsmodernisierung
              </Link>
              .
            </span>
          ),
        },
        {
          title: "Reihenfolge der Sanierungsschritte",
          youtubeId: "oCNC8PW7EgA",
          description: (
            <span>
              Was zuerst erledigt werden sollte – Fenster, Dach oder Heizung?
              Eine empfohlene Reihenfolge findest du im{' '}
              <Link to="/blog/fenster-tueren-sanieren-ratgeber-2025">
                Ratgeber Fenster & Türen
              </Link>
              .
            </span>
          ),
        },
        {
          title: "Sanieren im Bestand mit Plan",
          youtubeId: "kY6wg3L6UxY",
          description: (
            <span>
              Praxisbeispiele für stressfreie Modernisierung inklusive Förderung.
              Wie du dabei Schritt für Schritt vorgehst, erklärt der{' '}
              <Link to="/blog/fenster-tueren-sanieren-ratgeber-2025">
                ausführliche Sanierungsratgeber
              </Link>
              .
            </span>
          ),
        },
      ],
    },
  ];

  const featuredVideos = videoCategories.map((c) => c.videos[0]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Video-Hub</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Praktische Anleitungen und Expertentipps in HD-Qualität
        </p>
      </div>

      <div className="relative">
        <Carousel
          plugins={[plugin.current]}
          opts={{ loop: true }}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="w-full"
        >
          <CarouselContent>
            {featuredVideos.map((video, index) => (
              <CarouselItem key={index} className="pl-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative group cursor-pointer rounded-lg overflow-hidden">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                          alt={`Vorschaubild von ${video.title}`}
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              "/placeholder.svg";
                          }}
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="lg" className="rounded-full">
                          <Play className="h-6 w-6 mr-2" />
                          Abspielen
                        </Button>
                      </div>
                    </div>
                  </DialogTrigger>
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>

      {videoCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">
            {category.title}
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {category.videos.map((video, videoIndex) => (
              <Dialog key={videoIndex}>
                <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                  <DialogTrigger asChild>
                    <div className="relative group cursor-pointer">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt={`Vorschaubild von ${video.title}`}
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "/placeholder.svg";
                        }}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                        <Button size="lg" className="rounded-full">
                          <Play className="h-6 w-6 mr-2" />
                          Abspielen
                        </Button>
                      </div>
                    </div>
                  </DialogTrigger>

                  <CardHeader>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <CardDescription>{video.description}</CardDescription>
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
            ))}
          </div>
        </div>
      ))}

      <div className="text-center">
        <Button variant="outline" size="lg" asChild>
          <Link to="/wissenswertes/videos">Alle Videos anzeigen</Link>
        </Button>
      </div>
    </div>
  );
};

export default VideoHub;
