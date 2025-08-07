import { siteConfig } from '@/config/site.config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, ExternalLink, Sun, Zap, ShieldAlert, Euro } from 'lucide-react';
import SolarCalculator from '@/components/calculators/SolarCalculator';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';
import { Helmet } from 'react-helmet-async';
const SolarenergiePage = () => {
  const topic = siteConfig.contentTopics.find(t => t.id === 'solar');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Solar-Rechner & Ratgeber | Photovoltaik berechnen</title>
        <meta name="description" content="Berechnen Sie Ihr Solar-Potenzial: PV-Anlage, Speicher, E-Auto & 20-Jahres-Prognose. Kostenloser Solar-Rechner mit regionaler Optimierung." />
        <link rel="canonical" href="https://energieberater-direkt.de/solarenergie" />
      </Helmet>
      <main className="py-12 md:py-16">
        <div className="container max-w-5xl mx-auto px-4 space-y-12">
          <BreadcrumbNavigation 
            items={[
              { label: 'Ratgeber', href: '/wissenswertes' },
              { label: 'Solarenergie' }
            ]} 
            className="pb-6"
          />
          
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
          <section id="rechner">
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

          {/* Step-by-step Guide Section */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Der Weg zu Ihrer Solaranlage: Schritt für Schritt</CardTitle>
                <CardDescription>Von der Idee bis zum eigenen Solarstrom – so einfach geht's.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">1</div>
                    <div className="w-px h-16 bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Beratung & Planung</h3>
                    <p className="text-muted-foreground">Ein Fachberater analysiert Ihr Dach, Ihren Stromverbrauch und Ihre Wünsche. Sie erhalten eine individuelle Einschätzung zur optimalen Anlagengröße und den potenziellen Erträgen.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">2</div>
                      <div className="w-px h-16 bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Angebotsvergleich</h3>
                    <p className="text-muted-foreground">Holen Sie sich mindestens 2-3 Angebote von verschiedenen qualifizierten Installateuren ein. Achten Sie nicht nur auf den Preis, sondern auch auf die verwendeten Komponenten (Module, Wechselrichter) und die Garantieleistungen.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">3</div>
                      <div className="w-px h-16 bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Installation</h3>
                    <p className="text-muted-foreground">Ein professionelles Team montiert die Solarmodule auf Ihrem Dach und installiert den Wechselrichter sowie ggf. den Stromspeicher. Dies dauert in der Regel nur 1-3 Tage.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">4</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Inbetriebnahme & Anmeldung</h3>
                    <p className="text-muted-foreground">Nach der Installation erfolgt die technische Abnahme. Der Installateur kümmert sich um die Anmeldung Ihrer Anlage beim Netzbetreiber und im Marktstammdatenregister. Danach können Sie Ihren eigenen Sonnenstrom produzieren!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* FAQ Section */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Häufig gestellte Fragen (FAQ)</CardTitle>
                <CardDescription>Antworten auf die wichtigsten Fragen rund um Photovoltaik.</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Wie viel kostet eine Solaranlage?</AccordionTrigger>
                    <AccordionContent>
                      Die Kosten hängen stark von der Größe ab. Eine typische Anlage für ein Einfamilienhaus (ca. 8-10 kWp) kostet inklusive Montage und Wechselrichter zwischen 12.000 € und 20.000 €. Mit einem Stromspeicher kommen weitere 5.000 € bis 10.000 € hinzu. Die gute Nachricht: Die Preise sind in den letzten Jahren stark gefallen.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Lohnt sich ein Stromspeicher?</AccordionTrigger>
                    <AccordionContent>
                      Ein Stromspeicher erhöht Ihren Eigenverbrauchsanteil von ca. 30% auf bis zu 70%. Das macht Sie noch unabhängiger vom Stromnetz. Ob er sich rein finanziell lohnt, hängt von Ihrem Verbrauchsverhalten und dem Strompreis ab. Bei den aktuell hohen Strompreisen wird ein Speicher für die meisten Haushalte immer rentabler.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Was passiert bei einem Stromausfall?</AccordionTrigger>
                    <AccordionContent>
                      Standard-PV-Anlagen schalten sich bei einem Stromausfall aus Sicherheitsgründen ab. Um bei einem Blackout weiterhin Strom zu haben, benötigen Sie eine Anlage mit "Notstrom-" oder "Ersatzstromfähigkeit". Dies erfordert einen speziellen, teureren Wechselrichter und oft einen Stromspeicher.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Wie lange hält eine Solaranlage?</AccordionTrigger>
                    <AccordionContent>
                      Solarmodule sind sehr langlebig. Hersteller geben meist eine Leistungsgarantie von 25-30 Jahren (oft auf 80-87% der ursprünglichen Leistung). Die tatsächliche Lebensdauer ist oft noch länger. Wechselrichter müssen eventuell nach 10-15 Jahren ausgetauscht werden.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Brauche ich eine Baugenehmigung?</AccordionTrigger>
                    <AccordionContent>
                      In den meisten Bundesländern sind Solaranlagen auf Schrägdächern genehmigungsfrei. Bei Flachdächern oder denkmalgeschützten Gebäuden können besondere Vorschriften gelten. Es ist immer ratsam, sich vorab beim lokalen Bauamt zu erkundigen.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
    </div>
  );
};

export default SolarenergiePage;
