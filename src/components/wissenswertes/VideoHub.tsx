import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, User, Calendar } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

const VideoHub = () => {
  const videoCategories = [
    {
      title: "Dämmung & Isolierung",
      videos: [
        {
          title: "Dachboden richtig dämmen",
          duration: "12:34",
          expert: "Thomas Müller",
          date: "15.01.2025",
          youtubeId: "SneMaNaJ0XU",
          views: "23.5k",
        },
        {
          title: "Kellerdecke isolieren - Schritt für Schritt",
          duration: "8:45",
          expert: "Sarah Weber",
          date: "12.01.2025",
          youtubeId: "ggUPsc9Lrnp",
          views: "18.2k",
        },
      ],
    },
    {
      title: "Heizung & Energie",
      videos: [
        {
          title: "Wärmepumpe installieren - Anleitung",
          duration: "15:20",
          expert: "Michael Schmidt",
          date: "10.01.2025",
          youtubeId: "Fteg1mhRVch",
          views: "31.8k",
        },
        {
          title: "Heizkörper entlüften und optimieren",
          duration: "6:15",
          expert: "Anna Klein",
          date: "08.01.2025",
          youtubeId: "M4uhtsFVVm8",
          views: "12.4k",
        },
      ],
    },
    {
      title: "Projektplanung",
      videos: [
        {
          title: "Sanierung richtig vorbereiten",
          duration: "9:10",
          expert: "Jens Bauer",
          date: "05.01.2025",
          youtubeId: "JU-9yXLVRlO",
          views: "14.7k",
        },
        {
          title: "Budget realistisch kalkulieren",
          duration: "7:30",
          expert: "Claudia Hoffmann",
          date: "02.01.2025",
          youtubeId: "iYPJU04bCCm",
          views: "11.9k",
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Video-Hub</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Praktische Anleitungen und Expertentipps in HD-Qualität
        </p>
      </div>

      {videoCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">{category.title}</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {category.videos.map((video, videoIndex) => (
              <Dialog key={videoIndex}>
                <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                  <DialogTrigger asChild>
                    <div className="relative cursor-pointer">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                        <Button size="lg" className="rounded-full">
                          <Play className="h-6 w-6 mr-2" />
                          Abspielen
                        </Button>
                      </div>
                      <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                        <Clock className="h-3 w-3 mr-1" />
                        {video.duration}
                      </Badge>
                    </div>
                  </DialogTrigger>

                  <CardHeader>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{video.expert}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{video.date}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{video.views} Aufrufe</span>
                      <Button variant="outline" size="sm">
                        Später ansehen
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <DialogContent className="max-w-3xl">
                  <AspectRatio ratio={16 / 9}>
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
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
        <Button variant="outline" size="lg">
          Alle Videos anzeigen
        </Button>
      </div>
    </div>
  );
};

export default VideoHub;