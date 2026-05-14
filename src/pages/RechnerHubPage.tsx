import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calculator, ArrowRight, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';
import {
  calculatorsCatalog,
  calculatorCategories,
  type CalculatorEntry,
} from '@/data/calculatorsCatalog';

const SITE = 'https://sanieren-sparen.de';

const CalcCard = ({ entry }: { entry: CalculatorEntry }) => {
  const Icon = entry.icon;
  return (
    <Card className="group h-full glass border-border hover:shadow-glow hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <Link to={entry.route} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
        <div className={`h-1.5 bg-gradient-to-r ${entry.gradient}`} />
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${entry.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <Badge variant="secondary" className="text-xs">{entry.badge}</Badge>
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {entry.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 flex-1">{entry.description}</p>
          <div className="flex items-center justify-between">
            {entry.highlight ? (
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {entry.highlight}
              </span>
            ) : (
              <span />
            )}
            <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 gap-1 transition-all">
              Öffnen <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

const RechnerHubPage = () => {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'all' | string>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return calculatorsCatalog.filter((c) => {
      const matchesTab = tab === 'all' || c.category === tab;
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.topics.some((t) => t.includes(q));
      return matchesTab && matchesQuery;
    });
  }, [query, tab]);

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sanierungsrechner & Tools',
    itemListElement: calculatorsCatalog.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}${c.route.split('#')[0]}`,
      name: c.title,
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sanierungsrechner & Tools – Heizung, Dämmung, Solar, Förderung</title>
        <meta
          name="description"
          content="Alle kostenlosen Sanierungsrechner an einem Ort: Heizkosten, Dämmung, Solar, Förderung, Amortisation, Vergleich und Planungstools. Sofort und ohne Anmeldung."
        />
        <link rel="canonical" href={`${SITE}/rechner`} />
        <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600">
        <div className="container max-w-6xl mx-auto px-4 py-12 md:py-16 relative z-10">
          <BreadcrumbNavigation
            items={[{ label: 'Rechner & Tools' }]}
            className="mb-6 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/50 [&_li]:text-white/90"
          />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Alle Sanierungsrechner an einem Ort
            </h1>
          </div>
          <p className="text-emerald-50 text-lg max-w-2xl mb-6">
            {calculatorsCatalog.length} kostenlose Rechner und Planungstools für Heizung, Dämmung,
            Solar, Förderung und Amortisation – sofort nutzbar, ohne Anmeldung.
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-white/90">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">100 % kostenlos</span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">Ohne Anmeldung</span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">DSGVO-konform</span>
          </div>
        </div>
      </div>

      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechner suchen … (z. B. Solar, BAFA, Amortisation)"
            className="pl-10"
            aria-label="Rechner suchen"
          />
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex flex-wrap h-auto">
            <TabsTrigger value="all">Alle ({calculatorsCatalog.length})</TabsTrigger>
            {calculatorCategories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={tab} className="mt-6">
            {filtered.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">
                Keine Rechner gefunden. Bitte Suchbegriff anpassen.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((entry) => (
                  <CalcCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default RechnerHubPage;
