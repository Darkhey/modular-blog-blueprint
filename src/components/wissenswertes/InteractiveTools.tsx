import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calculator, PlaneTakeoff, Zap, TrendingUp, Calendar, MapPin } from 'lucide-react';

const InteractiveTools = () => {
  const tools = [
    {
      title: "Sanierungsplaner",
      description: "Schritt-für-Schritt Planung Ihres Renovierungsprojekts",
      icon: PlaneTakeoff,
      comingSoon: false,
      path: "/projektplaner"
    },
    {
      title: "Förderrechner",
      description: "Berechnen Sie alle verfügbaren Fördermittel für Ihr Projekt",
      icon: Calculator,
      comingSoon: true,
      path: "/foerderrechner"
    },
    {
      title: "Energie-Check",
      description: "Schnelle Bewertung Ihres Sanierungsbedarfs",
      icon: Zap,
      comingSoon: true,
      path: "/energie-check"
    },
    {
      title: "ROI-Rechner",
      description: "Amortisationszeiten für verschiedene Sanierungsmaßnahmen",
      icon: TrendingUp,
      comingSoon: true,
      path: "/roi-rechner"
    },
    {
      title: "Jahresplaner",
      description: "Optimale Zeitpunkte für verschiedene Sanierungsarbeiten",
      icon: Calendar,
      comingSoon: true,
      path: "/jahresplaner"
    },
    {
      title: "Regionale Infos",
      description: "Förderprogramme und Bestimmungen in Ihrer Region",
      icon: MapPin,
      comingSoon: true,
      path: "/regional"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Interaktive Tools</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Professionelle Planungs- und Berechnungstools für Ihr Sanierungsprojekt
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow relative">
            {tool.comingSoon && (
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                Bald verfügbar
              </div>
            )}
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <tool.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4 text-base">
                {tool.description}
              </CardDescription>
              <Button
                className="w-full"
                variant={tool.comingSoon ? "outline" : "default"}
                disabled={tool.comingSoon}
                asChild={!tool.comingSoon}
              >
                {tool.comingSoon ? "Bald verfügbar" : <Link to={tool.path}>Tool starten</Link>}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InteractiveTools;