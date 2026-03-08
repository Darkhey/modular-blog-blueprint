import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ExternalLink, Euro, BookOpen, CreditCard, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';
import GermanyMap from '@/components/foerdermittel/GermanyMap';
import { getBundeslandBySlug, bundeslaender, type FoerderProgramm } from '@/data/regionalFoerderung';

const typIcons: Record<FoerderProgramm['typ'], React.ReactNode> = {
  zuschuss: <Euro className="h-4 w-4" />,
  kredit: <CreditCard className="h-4 w-4" />,
  beratung: <BookOpen className="h-4 w-4" />,
};

const typLabels: Record<FoerderProgramm['typ'], string> = {
  zuschuss: 'Zuschuss',
  kredit: 'Kredit',
  beratung: 'Beratung',
};

const typColors: Record<FoerderProgramm['typ'], string> = {
  zuschuss: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  kredit: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  beratung: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
};

const RegionalFoerderungPage = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const bundesland = selectedState ? getBundeslandBySlug(selectedState) : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Regionale Fördermittel Deutschland – Interaktive Karte',
    description: 'Finden Sie regionale Förderprogramme für energetische Sanierung in Ihrem Bundesland. Interaktive Karte mit allen 16 Bundesländern.',
    url: 'https://www.sanieren-sparen.de/foerdermittel/regional',
  };

  return (
    <>
      <Helmet>
        <title>Regionale Fördermittel nach Bundesland | sanieren-sparen.de</title>
        <meta name="description" content="Interaktive Karte: Finden Sie Förderprogramme für energetische Sanierung in Ihrem Bundesland. Zuschüsse, Kredite und Beratung in allen 16 Bundesländern." />
        <link rel="canonical" href="https://www.sanieren-sparen.de/foerdermittel/regional" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <BreadcrumbNavigation
            items={[
              { label: 'Fördermittel', href: '/foerdermittel' },
              { label: 'Regionale Förderung' },
            ]}
            className="mb-6"
          />

          <div className="text-center mb-10">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
              <MapPin className="h-3 w-3 mr-1" /> 16 Bundesländer
            </Badge>
            <h1 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              Regionale Fördermittel für Ihre Sanierung
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Klicken Sie auf Ihr Bundesland, um regionale Förderprogramme zu entdecken –
              zusätzlich zu BAFA und KfW.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Map */}
            <Card className="sticky top-24">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Deutschland – Ihr Bundesland wählen</CardTitle>
              </CardHeader>
              <CardContent>
                <GermanyMap selectedState={selectedState} onSelectState={setSelectedState} />
                {!selectedState && (
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    👆 Klicken Sie auf ein Bundesland
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Details panel */}
            <div className="space-y-6">
              {bundesland ? (
                <>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <CardTitle className="text-2xl">{bundesland.name}</CardTitle>
                        <Badge variant="outline">{bundesland.hauptstadt}</Badge>
                      </div>
                      <p className="text-muted-foreground mt-1">{bundesland.besonderheiten}</p>
                    </CardHeader>
                  </Card>

                  {bundesland.programme.map((prog, i) => (
                    <Card key={i} className="transition-all hover:shadow-md">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="font-bold text-lg leading-tight">{prog.name}</h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${typColors[prog.typ]}`}>
                            {typIcons[prog.typ]} {typLabels[prog.typ]}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-3">{prog.beschreibung}</p>
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <span className="font-bold text-primary text-lg">{prog.foerdersumme}</span>
                          <a
                            href={prog.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                          >
                            Zur Antragsstelle <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6 text-center">
                      <p className="text-sm text-muted-foreground mb-3">
                        Diese Förderungen können Sie mit Bundesprogrammen (BAFA, KfW) kombinieren!
                      </p>
                      <div className="flex flex-wrap justify-center gap-3">
                        <Button asChild variant="outline" size="sm">
                          <Link to="/foerdermittel">← Alle Fördermittel</Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link to="/foerderrechner">Förderrechner starten</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                /* List all states when none selected */
                <Card>
                  <CardHeader>
                    <CardTitle>Alle Bundesländer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {bundeslaender.map((bl) => (
                        <button
                          key={bl.id}
                          onClick={() => setSelectedState(bl.id)}
                          className="text-left p-3 rounded-lg border hover:bg-accent transition-colors"
                        >
                          <span className="font-medium text-sm">{bl.name}</span>
                          <span className="block text-xs text-muted-foreground">
                            {bl.programme.length} Programme
                          </span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegionalFoerderungPage;
