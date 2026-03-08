import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjektCard from '@/components/referenzen/ProjektCard';
import { referenzenData, typFilter } from '@/data/referenzenData';

const ReferenzenPage = () => {
  const [activeFilter, setActiveFilter] = useState('alle');

  const filtered = activeFilter === 'alle'
    ? referenzenData
    : referenzenData.filter((p) => p.typ === activeFilter);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Sanierungsprojekte Vorher/Nachher',
    description: 'Interaktive Vorher/Nachher-Vergleiche von energetischen Sanierungsprojekten in Deutschland.',
    url: 'https://modular-blog-blueprint.lovable.app/referenzen',
    numberOfItems: referenzenData.length,
  };

  return (
    <>
      <Helmet>
        <title>Referenzen – Vorher/Nachher Sanierungsprojekte | Sanieren & Sparen</title>
        <meta name="description" content="Entdecken Sie echte Sanierungsprojekte im Vorher/Nachher-Vergleich. Interaktiver Bild-Slider zeigt den Unterschied bei Dämmung, Heizung & mehr." />
        <link rel="canonical" href="https://modular-blog-blueprint.lovable.app/referenzen" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Building2 className="h-4 w-4" /> Referenzen
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Vorher / Nachher Vergleiche
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Entdecken Sie echte Sanierungsprojekte aus ganz Deutschland. Ziehen Sie den Slider, um den Unterschied zu sehen.
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {typFilter.map((f) => (
            <Button
              key={f.value}
              variant={activeFilter === f.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filtered.map((projekt) => (
            <ProjektCard key={projekt.id} projekt={projekt} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">Keine Projekte in dieser Kategorie gefunden.</p>
        )}
      </div>

      {/* CTA */}
      <section className="bg-primary/5 py-16 mt-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Bereit für Ihre Sanierung?
          </h2>
          <p className="text-muted-foreground mb-6">
            Finden Sie heraus, welche Maßnahmen sich bei Ihrem Gebäude lohnen – mit unserem kostenlosen Sanierungscheck.
          </p>
          <Button asChild size="lg">
            <Link to="/sanierungscheck">
              Sanierungscheck starten <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default ReferenzenPage;
