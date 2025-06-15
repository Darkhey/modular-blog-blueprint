import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/site.config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, ExternalLink, Sun, Zap, ShieldAlert, Euro } from 'lucide-react';
import SolarCalculator from '@/components/calculators/SolarCalculator';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SolarenergiePage = () => {
  const topic = siteConfig.contentTopics.find(t => t.id === 'solar');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="py-12 md:py-16">
        <div className="container max-w-5xl mx-auto px-4 space-y-12">
          
          {/* Hero Section */}
          <section className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
              {topic?.name || 'Solarenergie'}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {topic?.description || 'Nutzen Sie die Kraft der Sonne für kostenlose Energie, Unabhängigkeit und eine saubere Zukunft.'}
            </p>
          </section>

          {/* Calculator Section */}
          <section>
            <SolarCalculator />
          </section>

          {/* Warning Section */}
          <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <ShieldAlert className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertTitle className="font-bold text-red-800 dark:text-red-300">Vorsicht vor Miet- und Pachtmodellen (z.B. Enpal)</AlertTitle>
            <AlertDescription className="text-red-700 dark:text-red-300/90 space-y-2 mt-2">
              <p>Anbieter wie Enpal werben mit "Solaranlagen für 0 € Anschaffungskosten". Diese Mietmodelle können jedoch über die lange Laufzeit (oft 20 Jahre) deutlich teurer sein als ein Direktkauf. </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong>Hohe Gesamtkosten:</strong> Die Summe der Mietzahlungen übersteigt die Kauf- und Installationskosten oft bei Weitem.</li>
                <li><strong>Geringe Flexibilität:</strong> Sie sind für 20 Jahre an einen Vertrag gebunden. Ein Verkauf des Hauses kann kompliziert werden.</li>
                <li><strong>Kein Eigentum:</strong> Die Anlage gehört Ihnen nicht. Nach Vertragsende muss sie oft teuer abgelöst oder abgebaut werden.</li>
              </ul>
              <p className="font-semibold mt-3">Unsere Empfehlung: Vergleichen Sie immer ein Kaufangebot mit einem Mietangebot. Meist ist der Kauf die wirtschaftlich sinnvollere Option.</p>
            </AlertDescription>
          </Alert>
          
          {/* How it works vs. types */}
          <section className="grid md:grid-cols-2 gap-8 items-start">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sun className="text-yellow-500" /> Photovoltaik vs. Solarthermie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Photovoltaik (PV)</h3>
                  <p className="text-muted-foreground">Wandelt Sonnenlicht direkt in <strong>elektrischen Strom</strong> um. Ideal zur Deckung des eigenen Strombedarfs, zum Laden von E-Autos und zur Einspeisung ins Netz.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Solarthermie</h3>
                  <p className="text-muted-foreground">Nutzt die <strong>Wärme der Sonne</strong>, um Wasser für den Haushalt (Duschen, Waschen) oder zur Heizungsunterstützung zu erwärmen.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Zap className="text-blue-500"/> Wie funktioniert eine PV-Anlage?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                 <p className="text-muted-foreground">Eine Photovoltaikanlage ist ein einfaches, aber geniales System:</p>
                 <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li><strong>Solarmodule</strong> auf dem Dach fangen Sonnenlicht ein und erzeugen Gleichstrom.</li>
                    <li>Ein <strong>Wechselrichter</strong> wandelt den Gleichstrom in nutzbaren Wechselstrom für Ihren Haushalt um.</li>
                    <li>Der Strom wird direkt verbraucht. Überschüssiger Strom wird ins <strong>öffentliche Netz</strong> eingespeist oder in einem <strong>Stromspeicher</strong> für später gesichert.</li>
                 </ol>
              </CardContent>
            </Card>
          </section>

          {/* Benefits Section */}
          <section>
             <Card>
              <CardHeader>
                <CardTitle>Die unschlagbaren Vorteile von Solarenergie</CardTitle>
                <CardDescription>Warum sich eine eigene Solaranlage für Sie und die Umwelt lohnt.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Kosten senken</h3>
                    <p className="text-muted-foreground">Produzieren Sie Ihren eigenen Strom für nur 8-12 Cent/kWh statt über 30 Cent/kWh vom Anbieter zu zahlen.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Unabhängigkeit gewinnen</h3>
                    <p className="text-muted-foreground">Machen Sie sich unabhängig von steigenden Strompreisen und Energiekonzernen.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Umwelt schützen</h3>
                    <p className="text-muted-foreground">Erzeugen Sie 100% sauberen Strom und reduzieren Sie aktiv Ihren CO2-Fußabdruck.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Immobilienwert steigern</h3>
                    <p className="text-muted-foreground">Ein Haus mit Solaranlage ist attraktiver auf dem Immobilienmarkt und erzielt höhere Verkaufspreise.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Funding and Links */}
          <section className="grid md:grid-cols-2 gap-8">
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                 <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-300"><Euro /> Staatliche Förderungen nutzen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 dark:text-blue-300/90 mb-4">Der Staat unterstützt Sie bei der Anschaffung Ihrer Solaranlage mit zinsgünstigen Krediten und Zuschüssen. Informieren Sie sich über Ihre Möglichkeiten!</p>
                <Button asChild>
                  <Link to="/foerdermittel">
                    Zur Förderungs-Übersicht <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
               <CardHeader>
                 <CardTitle>Weiterführende Informationen</CardTitle>
               </CardHeader>
               <CardContent className="space-y-2">
                 <a href="https://www.verbraucherzentrale.de/wissen/energie/erneuerbare-energien/photovoltaik-was-bei-planung-und-angebot-wichtig-ist-5645" target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline">
                    Verbraucherzentrale: Ratgeber Photovoltaik <ExternalLink className="ml-2 h-4 w-4" />
                 </a>
                 <a href="https://www.pv-magazine.de" target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline">
                    PV Magazine: Aktuelle News & Tests <ExternalLink className="ml-2 h-4 w-4" />
                 </a>
               </CardContent>
            </Card>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SolarenergiePage;
