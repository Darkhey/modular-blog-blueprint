import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, BookOpen, ArrowRight, Calculator } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  glossaryData,
  getAvailableLetters,
  categoryLabels,
  type GlossaryEntry,
} from '@/data/glossaryData';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const GlossarPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const availableLetters = useMemo(() => getAvailableLetters(), []);

  const filtered = useMemo(() => {
    let entries = [...glossaryData];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      entries = entries.filter(
        e => e.term.toLowerCase().includes(q) || e.definition.toLowerCase().includes(q)
      );
    }
    if (activeLetter) {
      entries = entries.filter(e => e.term.charAt(0).toUpperCase() === activeLetter);
    }
    if (activeCategory) {
      entries = entries.filter(e => e.category === activeCategory);
    }
    return entries.sort((a, b) => a.term.localeCompare(b.term, 'de'));
  }, [searchQuery, activeLetter, activeCategory]);

  const groupedByLetter = useMemo(() => {
    const groups: Record<string, GlossaryEntry[]> = {};
    filtered.forEach(e => {
      const l = e.term.charAt(0).toUpperCase();
      (groups[l] ||= []).push(e);
    });
    return groups;
  }, [filtered]);

  const categories = useMemo(
    () => [...new Set(glossaryData.map(e => e.category))].sort(),
    []
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Sanierungs-Glossar – Fachbegriffe der energetischen Sanierung',
    description:
      'Umfassendes Glossar mit über 50 Fachbegriffen rund um Dämmung, Heizung, Förderung und erneuerbare Energien.',
    url: 'https://sanieren-sparen.de/glossar',
    hasDefinedTerm: glossaryData.map(e => ({
      '@type': 'DefinedTerm',
      name: e.term,
      description: e.definition,
      url: `https://sanieren-sparen.de/glossar#${e.slug}`,
    })),
  };

  return (
    <>
      <Helmet>
        <title>Sanierungs-Glossar – 50+ Fachbegriffe einfach erklärt | sanieren-sparen.de</title>
        <meta
          name="description"
          content="Alle wichtigen Fachbegriffe der energetischen Sanierung verständlich erklärt: U-Wert, Wärmepumpe, BAFA, KfW, Dämmung und mehr."
        />
        <link rel="canonical" href="https://sanieren-sparen.de/glossar" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm mb-6">
              <BookOpen className="h-4 w-4" />
              <span>Über {glossaryData.length} Fachbegriffe</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Sanierungs-Glossar
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Alle wichtigen Fachbegriffe rund um energetische Sanierung, Förderung und erneuerbare Energien – verständlich erklärt.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-10">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Begriff suchen…"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setActiveLetter(null);
              }}
              className="pl-11 h-12 text-base"
            />
          </div>

          {/* A-Z Bar */}
          <div className="flex flex-wrap gap-1 mb-6">
            <button
              onClick={() => setActiveLetter(null)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                !activeLetter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              Alle
            </button>
            {ALPHABET.map(letter => {
              const available = availableLetters.includes(letter);
              return (
                <button
                  key={letter}
                  disabled={!available}
                  onClick={() => {
                    setActiveLetter(activeLetter === letter ? null : letter);
                    setSearchQuery('');
                  }}
                  className={`px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeLetter === letter
                      ? 'bg-primary text-primary-foreground'
                      : available
                        ? 'bg-muted text-foreground hover:bg-accent'
                        : 'bg-muted/50 text-muted-foreground/40 cursor-not-allowed'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge
              variant={activeCategory === null ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setActiveCategory(null)}
            >
              Alle Kategorien
            </Badge>
            {categories.map(cat => (
              <Badge
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              >
                {categoryLabels[cat] || cat}
              </Badge>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            {filtered.length} {filtered.length === 1 ? 'Begriff' : 'Begriffe'} gefunden
          </p>

          {/* Glossary entries */}
          {Object.keys(groupedByLetter)
            .sort()
            .map(letter => (
              <div key={letter} className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4 border-b pb-2">{letter}</h2>
                <div className="space-y-4">
                  {groupedByLetter[letter].map(entry => (
                    <Card key={entry.slug} id={entry.slug} className="scroll-mt-24">
                      <CardContent className="p-5">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{entry.term}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {categoryLabels[entry.category] || entry.category}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          {entry.definition}
                        </p>
                        {((entry.relatedArticles?.length ?? 0) > 0 ||
                          (entry.relatedCalculators?.length ?? 0) > 0) && (
                          <div className="flex flex-wrap gap-2 pt-2 border-t">
                            {entry.relatedArticles?.map(a => (
                              <Link
                                key={a.slug}
                                to={`/blog/${a.slug}`}
                                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                              >
                                <ArrowRight className="h-3 w-3" />
                                {a.title}
                              </Link>
                            ))}
                            {entry.relatedCalculators?.map(c => (
                              <Link
                                key={c.path}
                                to={c.path}
                                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                              >
                                <Calculator className="h-3 w-3" />
                                {c.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">Kein Begriff gefunden.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Versuchen Sie einen anderen Suchbegriff oder Filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GlossarPage;
