
import { Helmet } from 'react-helmet-async';
import heroImage from '@/assets/blog-hero-elektroinstallation.jpg';
import { Plug, ShieldAlert, Wifi, Zap, ArrowRight, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import CostTable from '@/components/ratgeber/CostTable';
import ChecklistSection from '@/components/ratgeber/ChecklistSection';
import FAQSection from '@/components/ratgeber/FAQSection';

const warningSignals = [
  'Sicherungskasten mit Schraubsicherungen (vor 1970)',
  'Häufig auslösende Sicherungen oder FI-Schalter',
  'Verfärbte oder brüchige Kabelisolierungen',
  'Fehlende Schutzkontaktsteckdosen in Nassräumen',
  'Zu wenig Steckdosen – Mehrfachstecker im Dauereinsatz',
  'Kein FI-Schutzschalter (RCD) vorhanden',
];

const costs = [
  { measure: 'Komplette Neuinstallation (Wohnung 80 m²)', priceRange: '8.000 – 15.000 €', note: 'Inkl. Sicherungskasten' },
  { measure: 'Einzelne Räume erneuern', priceRange: '1.500 – 3.500 €/Raum', note: 'Je nach Steckdosenanzahl' },
  { measure: 'Sicherungskasten austauschen', priceRange: '1.200 – 3.000 €', note: 'Neuer Verteiler mit RCD' },
  { measure: 'FI-Schutzschalter nachrüsten', priceRange: '150 – 400 €', note: 'Pro Stromkreis' },
  { measure: 'Smart-Home-Verkabelung', priceRange: '2.000 – 5.000 €', note: 'KNX/Leerrohr-Vorbereitung' },
  { measure: 'Wallbox für E-Auto', priceRange: '1.500 – 3.000 €', note: 'Inkl. Zuleitung und Installation' },
];

const smartHomeFeatures = [
  { icon: Wifi, title: 'Smart-Home-Vorbereitung', desc: 'Leerrohre für Bus-Systeme (KNX), Cat7-Kabel in jeden Raum, zentrale Verteilung.' },
  { icon: Zap, title: 'Wallbox & Energiemanagement', desc: 'E-Auto laden zu Hause, PV-Überschuss intelligent nutzen, Verbrauch messen.' },
  { icon: Plug, title: 'Ausreichend Steckdosen', desc: 'Mindestens 3–4 Doppelsteckdosen pro Raum, USB-Steckdosen in Küche und Arbeitszimmer.' },
];

const checklist = [
  { id: 'e1', label: 'E-Check vom Fachbetrieb durchführen lassen (Zustandsbewertung)' },
  { id: 'e2', label: 'Anzahl und Position der Steckdosen pro Raum planen' },
  { id: 'e3', label: 'FI-Schutzschalter (RCD) für alle Stromkreise vorsehen' },
  { id: 'e4', label: 'Leerrohre für zukünftige Erweiterungen einplanen' },
  { id: 'e5', label: 'Smart-Home-Kompatibilität prüfen (KNX, WLAN-Abdeckung)' },
  { id: 'e6', label: 'Netzwerkverkabelung (Cat7) in alle wichtigen Räume' },
  { id: 'e7', label: 'Wallbox-Anschluss vorbereiten (separate Zuleitung)' },
  { id: 'e8', label: 'Abnahme und Prüfprotokoll vom Elektriker erstellen lassen' },
];

const faqs = [
  { question: 'Wann muss die Elektroinstallation erneuert werden?', answer: 'Spätestens nach 30–40 Jahren sollte die Elektroinstallation überprüft und ggf. erneuert werden. Anzeichen sind alte Schraubsicherungen, fehlende FI-Schalter, brüchige Kabel oder häufig auslösende Sicherungen. Ein E-Check gibt Klarheit.' },
  { question: 'Darf ich Elektroarbeiten selbst durchführen?', answer: 'Nein. In Deutschland dürfen Arbeiten an der festen Elektroinstallation nur von eingetragenen Elektrofachbetrieben ausgeführt werden. Ausnahme: Austausch von Steckdosen-Abdeckungen und Lampenmontage an bestehenden Anschlüssen.' },
  { question: 'Was kostet ein E-Check?', answer: 'Ein E-Check kostet je nach Wohnungsgröße zwischen 120 und 300 €. Er deckt Sicherheitsmängel auf und ist oft Voraussetzung für Versicherungsschutz. Der TÜV empfiehlt ihn alle 4 Jahre.' },
  { question: 'Lohnt sich Smart-Home-Verkabelung bei der Sanierung?', answer: 'Ja, der Mehraufwand für Leerrohre und Datenkabel ist im Rahmen einer Sanierung gering (ca. 2.000–5.000 €). Nachrüsten ist deutlich teurer. Auch wenn Sie Smart Home noch nicht nutzen, sind Sie so vorbereitet.' },
  { question: 'Brauche ich eine Wallbox oder reicht eine Steckdose?', answer: 'Eine normale Haushaltssteckdose ist nicht für Dauerlast ausgelegt und lädt sehr langsam. Eine Wallbox (11 kW) lädt etwa 5× schneller und ist sicherer. Seit 2024 gibt es keine KfW-Wallbox-Förderung mehr, aber regionale Programme existieren teils noch.' },
];

const ElektroinstallationPage = () => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Elektroinstallation erneuern: Kosten, Sicherheit & Smart Home 2025',
    description: 'Ratgeber zur Erneuerung der Elektroinstallation – Wann ist es nötig? Was kostet es? Inklusive Smart-Home-Vorbereitung und Sicherheits-Checkliste.',
    url: 'https://sanieren-sparen.de/elektroinstallation',
    publisher: { '@type': 'Organization', name: 'Sanieren & Sparen' },
  };

  return (
    <>
      <Helmet>
        <title>Elektroinstallation erneuern: Kosten, Sicherheit & Smart Home 2025</title>
        <meta name="description" content="Ratgeber Elektroinstallation – Kosten ab 8.000 €, Warnzeichen für veraltete Leitungen, Smart-Home-Vorbereitung und Sicherheits-Checkliste." />
        <link rel="canonical" href="https://sanieren-sparen.de/elektroinstallation" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <RatgeberHero icon={Plug} title="Elektroinstallation erneuern" subtitle="Sicherheit, Komfort und Zukunftsfähigkeit – wann eine Erneuerung nötig ist" backgroundImage={heroImage} />

      {/* Warning Signs */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <Alert variant="destructive" className="mb-8">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Sicherheitshinweis</AlertTitle>
            <AlertDescription>Veraltete Elektroinstallationen sind eine häufige Brandursache. Lassen Sie den Zustand regelmäßig von einem Fachbetrieb prüfen.</AlertDescription>
          </Alert>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Warnzeichen – Wann erneuern?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {warningSignals.map((signal, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                <span className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                <span className="text-sm text-foreground">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Home */}
      <section className="py-8 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-6">Zukunftssicher: Smart Home & E-Mobilität</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {smartHomeFeatures.map((f, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CostTable title="Kosten Elektroinstallation" rows={costs} />
      <ChecklistSection title="Checkliste Elektroinstallation" items={checklist} />
      <FAQSection faqs={faqs} pageUrl="https://sanieren-sparen.de/elektroinstallation" />

      {/* CTA */}
      <section className="py-12 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Smart Home entdecken?</h2>
          <p className="text-muted-foreground mb-6">Vergleichen Sie smarte Thermostate, Sensoren und Steuerungen.</p>
          <Button asChild size="lg">
            <Link to="/smart-home-produkte">Zu Smart Home Produkten <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default ElektroinstallationPage;
