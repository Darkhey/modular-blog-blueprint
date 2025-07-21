import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, CheckSquare, Calculator } from 'lucide-react';

const DownloadCenter = () => {
  const downloadItems = [
    {
      title: "Sanierungs-Checkliste",
      description: "Schritt-für-Schritt Anleitung für Ihre Renovierung",
      icon: CheckSquare,
      type: "PDF",
      size: "2.3 MB"
    },
    {
      title: "Kostenschätzer-Tabelle",
      description: "Realistische Preise für alle Sanierungsmaßnahmen",
      icon: Calculator,
      type: "Excel",
      size: "1.8 MB"
    },
    {
      title: "Fördermittel-Übersicht 2025",
      description: "Alle aktuellen Förderprogramme im Überblick",
      icon: FileText,
      type: "PDF",
      size: "3.1 MB"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Download-Center</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Kostenlose Checklisten, Kalkulatoren und Ratgeber für Ihr Sanierungsprojekt
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {downloadItems.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{item.type}</span>
                    <span>•</span>
                    <span>{item.size}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {item.description}
              </CardDescription>
              <Button className="w-full" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Herunterladen
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Alle Downloads sind kostenlos und sofort verfügbar. Weitere Materialien werden regelmäßig hinzugefügt.
        </p>
      </div>
    </div>
  );
};

export default DownloadCenter;