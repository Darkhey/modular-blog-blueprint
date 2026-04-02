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
import EnergyAdvisorSearch from '@/components/shared/EnergyAdvisorSearch';

const SolarenergiePage = () => {
  const topic = siteConfig.contentTopics.find(t => t.id === 'solar');

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Solar-Rechner & Ratgeber | Photovoltaik berechnen</title>
        <meta name="description" content="Berechnen Sie Ihr Solar-Potenzial: PV-Anlage, Speicher, E-Auto & 20-Jahres-Prognose. Kostenloser Solar-Rechner mit regionaler Optimierung." />
        <link rel="canonical" href="https://energieberater-direkt.de/solarenergie" />
      </Helmet>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0djJoLTJ2LTJoMnptMCAwdjJoLTJ2LTJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container max-w-5xl mx-auto px-4 py-12 md:py-16 relative z-10">
          <BreadcrumbNavigation
            items={[
              { label: 'Ratgeber', href: '/wissenswertes' },
              { label: 'Solarenergie' }
            ]}
            className="mb-6 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/50 [&_li]:text-white/90"
          />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Sun className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">
              {topic?.name || 'Solarenergie'}
            </h1>
          </div>
          <p className="text-amber-100 text-lg md:text-xl max-w-3xl">
            {topic?.description || 'Nutzen Sie die Kraft der Sonne für kostenlose Energie, Unabhängigkeit und eine saubere Zukunft.'}
          </p>
        </div>
      </div>

      <main className="py-12 md:py-16">
        <div className="container max-w-5xl mx-auto px-4 space-y-12">

          {/* Calculator Section */}
          <section id="rechner">
            <SolarCalculator />
          </section>

          {/* Warning Section */}
          <Alert variant="destructive" className="glass border-red-200 dark:border-red-800 bg-red-50/80 dark:bg-red-950/20">
            <ShieldAlert className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertTitle className="font-bold text-red-800 dark:text-red-300">Vorsicht vor Miet- und Pachtmodellen (z.B. Enpal)</AlertTitle>
            <AlertDescription className="text-red-700 dark:text-red-300/90 space-y-2 mt-2">
              <p>Anbieter wie Enpal werben mit "Solaranlagen für 0 € Anschaffungskosten". Diese Mietmodelle können jedoch über die lange Laufzeit (oft 20 Jahre) deutlich teurer sein als ein Direktkauf.</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong>Hohe Gesamtkosten:</strong> Die Summe der Mietzahlungen übersteigt die Kauf- und Installationskosten oft bei Weitem.</li>
                <li><strong>Geringe Flexibilität:</strong> Sie sind für 20 Jahre an einen Vertrag gebunden.</li>
                <li><strong>Kein Eigentum:</strong> Die Anlage gehört Ihnen nicht.</li>
              </ul>
              <p className="font-semibold mt-3">Unsere Empfehlung: Vergleichen Sie immer ein Kaufangebot mit einem Mietangebot.</p>
            </AlertDescription>
          </Alert>

          {/* How it works vs. types */}
          <section className="grid md:grid-cols-2 gap-8 items-start">
            <Card className="glass border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sun className="text-amber-500" /> Photovoltaik vs. Solarthermie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Photovoltaik (PV)</h3>
                  <p className="text-muted-foreground">Wandelt Sonnenlicht direkt in <strong>elektrischen Strom</strong> um. Ideal zur Deckung des eigenen Strombedarfs.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Solarthermie</h3>
                  <p className="text-muted-foreground">Nutzt die <strong>Wärme der Sonne</strong>, um Wasser für den Haushalt oder zur Heizungsunterstützung zu erwärmen.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Zap className="text-blue-500"/> Wie funktioniert eine PV-Anlage?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">Eine Photovoltaikanlage ist ein einfaches, aber geniales System:</p>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li><strong>Solarmodule</strong> auf dem Dach fangen Sonnenlicht ein und erzeugen Gleichstrom.</li>
                  <li>Ein <strong>Wechselrichter</strong> wandelt den Gleichstrom in nutzbaren Wechselstrom um.</li>
                  <li>Der Strom wird direkt verbraucht oder ins <strong>öffentliche Netz</strong> eingespeist bzw. in einem <strong>Stromspeicher</strong> gesichert.</li>
                </ol>
              </CardContent>
            </Card>
          </section>

          {/* Benefits Section */}
          <section>
            <Card className="glass border-border">
              <CardHeader>
                <CardTitle>Die unschlagbaren Vorteile von Solarenergie</CardTitle>
                <CardDescription>Warum sich eine eigene Solaranlage für Sie und die Umwelt lohnt.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Kosten senken', desc: 'Produzieren Sie Ihren eigenen Strom für nur 8-12 Cent/kWh statt über 30 Cent/kWh.' },
                  { title: 'Unabhängigkeit gewinnen', desc: 'Machen Sie sich unabhängig von steigenden Strompreisen und Energiekonzernen.' },
                  { title: 'Umwelt schützen', desc: 'Erzeugen Sie 100% sauberen Strom und reduzieren Sie aktiv Ihren CO₂-Fußabdruck.' },
                  { title: 'Immobilienwert steigern', desc: 'Ein Haus mit Solaranlage erzielt höhere Verkaufspreise.' },
                ].map((b) => (
                  <div key={b.title} className="flex items-start gap-3">
                    <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">{b.title}</h3>
                      <p className="text-muted-foreground">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Step-by-step Guide */}
          <section>
            <Card className="glass border-border">
              <CardHeader>
                <CardTitle>Der Weg zu Ihrer Solaranlage: Schritt für Schritt</CardTitle>
                <CardDescription>Von der Idee bis zum eigenen Solarstrom – so einfach geht's.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { step: 1, title: 'Beratung & Planung', desc: 'Ein Fachberater analysiert Ihr Dach, Ihren Stromverbrauch und Ihre Wünsche.' },
                  { step: 2, title: 'Angebotsvergleich', desc: 'Holen Sie sich mindestens 2-3 Angebote von verschiedenen qualifizierten Installateuren ein.' },
                  { step: 3, title: 'Installation', desc: 'Ein professionelles Team montiert die Solarmodule – dies dauert in der Regel nur 1-3 Tage.' },
                  { step: 4, title: 'Inbetriebnahme & Anmeldung', desc: 'Nach der Installation erfolgt die technische Abnahme und Anmeldung beim Netzbetreiber.' },
                ].map((s, i, arr) => (
                  <div key={s.step} className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold text-lg shadow-lg">{s.step}</div>
                      {i < arr.length - 1 && <div className="w-px h-16 bg-border" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{s.title}</h3>
                      <p className="text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* FAQ Section */}
          <section>
            <Card className="glass border-border">
              <CardHeader>
                <CardTitle>Häufig gestellte Fragen (FAQ)</CardTitle>
                <CardDescription>Antworten auf die wichtigsten Fragen rund um Photovoltaik.</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Wie viel kostet eine Solaranlage?</AccordionTrigger>
                    <AccordionContent>
                      Eine typische Anlage für ein Einfamilienhaus (ca. 8-10 kWp) kostet inklusive Montage zwischen 12.000 € und 20.000 €. Mit Stromspeicher kommen weitere 5.000 € bis 10.000 € hinzu.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Lohnt sich ein Stromspeicher?</AccordionTrigger>
                    <AccordionContent>
                      Ein Stromspeicher erhöht Ihren Eigenverbrauchsanteil von ca. 30% auf bis zu 70%. Bei den aktuell hohen Strompreisen wird ein Speicher für die meisten Haushalte immer rentabler.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Was passiert bei einem Stromausfall?</AccordionTrigger>
                    <AccordionContent>
                      Standard-PV-Anlagen schalten sich bei einem Stromausfall aus Sicherheitsgründen ab. Für Notstrom benötigen Sie einen speziellen Wechselrichter und oft einen Stromspeicher.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Wie lange hält eine Solaranlage?</AccordionTrigger>
                    <AccordionContent>
                      Hersteller geben meist eine Leistungsgarantie von 25-30 Jahren. Wechselrichter müssen eventuell nach 10-15 Jahren ausgetauscht werden.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Brauche ich eine Baugenehmigung?</AccordionTrigger>
                    <AccordionContent>
                      In den meisten Bundesländern sind Solaranlagen auf Schrägdächern genehmigungsfrei. Bei denkmalgeschützten Gebäuden können besondere Vorschriften gelten.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </section>

          {/* Funding and Links */}
          <section className="grid md:grid-cols-2 gap-8">
            <Card className="glass border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-300"><Euro /> Staatliche Förderungen nutzen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 dark:text-blue-300/90 mb-4">Der Staat unterstützt Sie bei der Anschaffung mit zinsgünstigen Krediten und Zuschüssen.</p>
                <Button asChild>
                  <Link to="/foerdermittel">
                    Zur Förderungs-Übersicht <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="glass border-border">
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

          <EnergyAdvisorSearch />
        </div>
      </main>
    </div>
  );
};

export default SolarenergiePage;
