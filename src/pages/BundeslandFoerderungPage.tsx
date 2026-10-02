import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ExternalLink, MapPin, ArrowRight } from 'lucide-react';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import EnergyAdvisorSearch from '@/components/shared/EnergyAdvisorSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { bundeslaender, getBundeslandBySlug } from '@/data/regionalFoerderung';

const SITE = 'https://sanierenundsparen.de';
const TYP_LABEL = { zuschuss: 'Zuschuss', kredit: 'Kredit', beratung: 'Beratung' } as const;

const BundeslandFoerderungPage = () => {
  const { slug = '' } = useParams();
  const land = getBundeslandBySlug(slug);
  if (!land) return <Navigate to="/foerdermittel/regional" replace />;

  const url = `${SITE}/foerdermittel/regional/${land.id}`;
  const title = `Förderung ${land.name} 2026 – Sanierung, Wärmepumpe & PV`;
  const description = `Förderprogramme in ${land.name} für Sanierung, Heizung und Photovoltaik – Landesprogramme plus BAFA/KfW kombiniert im Überblick.`;

  const faqs = [
    {
      q: `Welche Förderung gibt es für eine Wärmepumpe in ${land.name}?`,
      a: `Die Hauptförderung kommt bundesweit von der KfW (Heizungsförderung, 30 % Grundförderung plus mögliche Boni bis max. 70 %). In ${land.name} können Landes- oder kommunale Programme hinzukommen – prüfen Sie die Programme oben und fragen Sie zusätzlich bei Ihrer Stadt oder Ihrem Energieversorger nach.`,
    },
    {
      q: `Gibt es in ${land.name} Förderung für Photovoltaik?`,
      a: `Für private PV-Anlagen gibt es bundesweit vor allem die Einspeisevergütung und den Nullsteuersatz. Zuschüsse für Speicher oder Balkonkraftwerke vergeben teils Länder und Kommunen – Programme ändern sich häufig, deshalb vor dem Kauf aktuell prüfen.`,
    },
    {
      q: `Kann ich Landesförderung in ${land.name} mit BAFA und KfW kombinieren?`,
      a: `Oft ja, solange dieselbe Maßnahme nicht doppelt über die förderfähigen Kosten hinaus gefördert wird. Die Bedingungen stehen in den jeweiligen Richtlinien – ein Energieberater klärt die beste Kombination.`,
    },
  ];

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Fördermittel', item: `${SITE}/foerdermittel` },
        { '@type': 'ListItem', position: 3, name: 'Regionale Förderung', item: `${SITE}/foerdermittel/regional` },
        { '@type': 'ListItem', position: 4, name: land.name, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
        ))}
      </Helmet>

      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        <BreadcrumbNavigation
          items={[
            { label: 'Fördermittel', href: '/foerdermittel' },
            { label: 'Regionale Förderung', href: '/foerdermittel/regional' },
            { label: land.name },
          ]}
        />

        <header>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <MapPin className="w-8 h-8 text-primary shrink-0" aria-hidden />
            Förderung in {land.name} 2026
          </h1>
          <p className="text-muted-foreground mt-3">{land.besonderheiten}</p>
        </header>

        <section aria-labelledby="programme" className="space-y-4">
          <h2 id="programme" className="text-xl font-bold">Landesprogramme für Sanierung & Heizung</h2>
          {land.programme.map((p) => (
            <Card key={p.name} className="glass">
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-lg">{p.name}</CardTitle>
                  <Badge variant="secondary">{TYP_LABEL[p.typ]}</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-muted-foreground">{p.beschreibung}</p>
                <p className="font-semibold">{p.foerdersumme}</p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                >
                  Zur Antragsstelle <ExternalLink className="h-3 w-3" />
                </a>
              </CardContent>
            </Card>
          ))}
          <p className="text-xs text-muted-foreground">
            Angaben ohne Gewähr – Landesprogramme ändern sich häufig. Bitte vor Antragstellung die aktuellen
            Bedingungen bei der Antragsstelle prüfen.
          </p>
        </section>

        <Card className="glass">
          <CardContent className="pt-6 space-y-3 text-sm">
            <p>
              Zusätzlich zu den Landesprogrammen gelten in {land.name} die bundesweiten Zuschüsse von BAFA und KfW.
              Wie viel Sie insgesamt bekommen, berechnen Sie im Förderrechner.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm">
                <Link to="/foerderrechner">Förderrechner starten</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/foerdermittel/regional">Zur Förderkarte</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/kostenrechner">Sanierungskosten berechnen</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <section aria-labelledby="land-faq">
          <h2 id="land-faq" className="text-xl font-bold mb-4">Häufige Fragen zur Förderung in {land.name}</h2>
          <Accordion type="single" collapsible className="glass rounded-xl px-4">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <nav aria-label="Andere Bundesländer">
          <h2 className="text-lg font-bold mb-3">Förderung in anderen Bundesländern</h2>
          <ul className="flex flex-wrap gap-2">
            {bundeslaender
              .filter((b) => b.id !== land.id)
              .map((b) => (
                <li key={b.id}>
                  <Link
                    to={`/foerdermittel/regional/${b.id}`}
                    className="inline-flex items-center gap-1 min-h-11 px-3 rounded-full border border-border text-sm hover:bg-muted"
                  >
                    {b.name} <ArrowRight className="w-3 h-3" aria-hidden />
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <EnergyAdvisorSearch />
      </div>
    </div>
  );
};

export default BundeslandFoerderungPage;
