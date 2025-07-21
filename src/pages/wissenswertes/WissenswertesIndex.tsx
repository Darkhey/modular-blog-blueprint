
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calculator, Download, Video, Users, Search } from 'lucide-react';

const WissenswertesIndex = () => {
  const sections = [
    {
      title: "Externe Links & Portale",
      description: "Kuratierte Sammlung der wichtigsten Websites und Portale für Sanierung und Energieeffizienz",
      icon: ExternalLink,
      href: "/wissenswertes/links",
      color: "text-blue-600"
    },
    {
      title: "Rechner & Tools",
      description: "Interaktive Berechnungstools für Kosten, Einsparungen und Planungshilfen",
      icon: Calculator,
      href: "/wissenswertes/tools",
      color: "text-green-600"
    },
    {
      title: "Downloads & Checklisten",
      description: "Kostenlose PDFs, Excel-Vorlagen und Checklisten für Ihr Sanierungsprojekt",
      icon: Download,
      href: "/wissenswertes/downloads",
      color: "text-purple-600"
    },
    {
      title: "Videos & Tutorials",
      description: "Lehrreiche Videos und Schritt-für-Schritt Anleitungen von Experten",
      icon: Video,
      href: "/wissenswertes/videos",
      color: "text-red-600"
    },
    {
      title: "Community & Erfahrungen",
      description: "Erfolgsgeschichten, Forum und Erfahrungsaustausch mit anderen Hausbesitzern",
      icon: Users,
      href: "/wissenswertes/community",
      color: "text-orange-600"
    },
    {
      title: "Hersteller & Experten",
      description: "Energieberater-Suche, Hersteller-Verzeichnis und Fachbetriebe-Finder",
      icon: Search,
      href: "/wissenswertes/experten",
      color: "text-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Wissenswertes & Ressourcen
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Entdecken Sie unsere umfassende Sammlung von Tools, Ressourcen und Expertenwissen 
            für Ihre Sanierung und Modernisierung
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sections.map((section) => (
            <Card key={section.href} className="hover:shadow-lg transition-shadow group">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <section.icon className={`h-8 w-8 ${section.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {section.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-base">
                  {section.description}
                </CardDescription>
                <Button asChild className="w-full">
                  <Link to={section.href}>
                    Bereich erkunden
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access Section */}
        <div className="bg-white dark:bg-gray-900/50 p-8 rounded-lg shadow-sm border dark:border-gray-800">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Schnellzugriff
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" asChild>
              <Link to="/wissenswertes/tools">
                <Calculator className="h-4 w-4 mr-2" />
                Rechner starten
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/wissenswertes/downloads">
                <Download className="h-4 w-4 mr-2" />
                Downloads
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/wissenswertes/experten">
                <Search className="h-4 w-4 mr-2" />
                Experten finden
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/wissenswertes/community">
                <Users className="h-4 w-4 mr-2" />
                Community
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WissenswertesIndex;
