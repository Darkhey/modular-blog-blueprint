import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Star, StarHalf, CheckCircle, XCircle, ChevronDown, ChevronUp, Filter, ArrowUpDown, Wifi, WifiOff, CreditCard, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';
import { allProducts, categoryLabels, type Product } from '@/data/smartHomeProducts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type SortKey = 'rating' | 'price' | 'name' | 'reviews';
type ViewMode = 'table' | 'cards';

const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalf && <StarHalf className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />}
      <span className="ml-1 text-sm font-semibold text-foreground">{rating}</span>
    </div>
  );
};

const ProductDetailCard = ({ product }: { product: Product }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-border">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-44 h-36 sm:h-auto flex-shrink-0 relative overflow-hidden bg-muted">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
          {product.highlight && (
            <Badge className="absolute top-2 left-2 bg-yellow-500 text-yellow-950 text-xs font-bold shadow-md">
              ⭐ {product.highlight}
            </Badge>
          )}
        </div>
        <CardContent className="flex-1 p-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-foreground text-base leading-tight">{product.name}</h3>
              <Badge variant="outline" className="text-xs whitespace-nowrap">{categoryLabels[product.category]}</Badge>
            </div>
            <RatingStars rating={product.rating} />
            <p className="text-sm font-semibold text-primary">{product.price}</p>
            <div className="flex flex-wrap gap-1.5">
              {product.localOperation && (
                <Badge variant="secondary" className="text-xs gap-1"><WifiOff className="w-3 h-3" /> Lokal</Badge>
              )}
              {!product.subscriptionRequired && (
                <Badge variant="secondary" className="text-xs gap-1"><Shield className="w-3 h-3" /> Kein Abo</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            {expanded && (
              <div className="space-y-3 pt-2 border-t border-border mt-3">
                <div>
                  <h5 className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1.5">Vorteile</h5>
                  <ul className="space-y-1">
                    {product.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-sm text-foreground">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-1.5">Nachteile</h5>
                  <ul className="space-y-1">
                    {product.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-sm text-foreground">
                        <XCircle className="w-3.5 h-3.5 text-orange-500 mt-0.5 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1.5">Kompatibilität</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {product.compatibility.map((c, i) => (
                      <Badge key={i} variant="outline" className="text-xs border-border text-muted-foreground">{c}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1.5">Ökosysteme</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {product.ecosystems.map((e, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{e}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <><ChevronUp className="w-4 h-4 mr-1" /> Weniger</> : <><ChevronDown className="w-4 h-4 mr-1" /> Details</>}
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

const SmartHomeProduktePages = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortKey>('rating');
  const [sortAsc, setSortAsc] = useState(false);
  const [localOnly, setLocalOnly] = useState(false);
  const [noSubOnly, setNoSubOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');

  const filtered = useMemo(() => {
    let result = [...allProducts];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.ecosystems.some(e => e.toLowerCase().includes(q))
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter);
    }

    if (localOnly) result = result.filter(p => p.localOperation);
    if (noSubOnly) result = result.filter(p => !p.subscriptionRequired);

    if (maxPrice !== 'all') {
      const max = parseInt(maxPrice);
      result = result.filter(p => p.priceValue <= max);
    }

    result.sort((a, b) => {
      let cmp = 0;
      switch (sortBy) {
        case 'rating': cmp = a.rating - b.rating; break;
        case 'price': cmp = a.priceValue - b.priceValue; break;
        case 'name': cmp = a.name.localeCompare(b.name); break;
        case 'reviews': cmp = a.reviewCount - b.reviewCount; break;
      }
      return sortAsc ? cmp : -cmp;
    });

    return result;
  }, [search, categoryFilter, sortBy, sortAsc, localOnly, noSubOnly, maxPrice]);

  const allEcosystems = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach(p => p.ecosystems.forEach(e => set.add(e)));
    return Array.from(set).sort();
  }, []);

  return (
    <>
      <Helmet>
        <title>Smart Home Produkte Vergleich 2026 | Thermostate, Sensoren & Steuerung</title>
        <meta name="description" content="Alle Smart Home Produkte im direkten Vergleich: Thermostate, Heizungssteuerungen und Sensoren mit Bewertungen, Preisen und Filterfunktion." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8 space-y-8">
          <BreadcrumbNavigation items={[{ label: 'Ratgeber', href: '/wissenswertes' }, { label: 'Smart Home Produkte' }]} />

          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Smart Home Produkte im Vergleich
            </h1>
            <p className="text-lg text-muted-foreground">
              {allProducts.length} Produkte in {Object.keys(categoryLabels).length} Kategorien – unabhängig bewertet mit Filtern für Ihr perfektes Setup
            </p>
          </div>

          {/* Filters */}
          <Card className="border-border">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="font-semibold text-sm text-foreground">Filter & Sortierung</span>
                <span className="text-xs text-muted-foreground ml-auto">{filtered.length} von {allProducts.length} Produkten</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input
                  placeholder="Produkt suchen…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="h-9"
                />

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Kategorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Kategorien</SelectItem>
                    <SelectItem value="thermostat">Smart Thermostate</SelectItem>
                    <SelectItem value="steuerung">Heizungssteuerung</SelectItem>
                    <SelectItem value="sensor">Smart Sensoren</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={maxPrice} onValueChange={setMaxPrice}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Max. Preis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Preise</SelectItem>
                    <SelectItem value="50">bis 50 €</SelectItem>
                    <SelectItem value="100">bis 100 €</SelectItem>
                    <SelectItem value="200">bis 200 €</SelectItem>
                    <SelectItem value="400">bis 400 €</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Sortierung" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Bewertung</SelectItem>
                    <SelectItem value="price">Preis</SelectItem>
                    <SelectItem value="reviews">Beliebtheit</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox checked={localOnly} onCheckedChange={(c) => setLocalOnly(!!c)} />
                  <WifiOff className="w-3.5 h-3.5 text-muted-foreground" />
                  Lokal nutzbar
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox checked={noSubOnly} onCheckedChange={(c) => setNoSubOnly(!!c)} />
                  <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                  Ohne Abo
                </label>

                <div className="ml-auto flex gap-1">
                  <Button
                    variant={sortAsc ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortAsc(!sortAsc)}
                    className="h-8 text-xs gap-1"
                  >
                    <ArrowUpDown className="w-3 h-3" />
                    {sortAsc ? 'Aufsteigend' : 'Absteigend'}
                  </Button>
                  <Button
                    variant={viewMode === 'cards' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('cards')}
                    className="h-8 text-xs"
                  >
                    Karten
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    className="h-8 text-xs"
                  >
                    Tabelle
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">Keine Produkte gefunden. Passen Sie Ihre Filter an.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setSearch(''); setCategoryFilter('all'); setMaxPrice('all'); setLocalOnly(false); setNoSubOnly(false); }}>
                Filter zurücksetzen
              </Button>
            </div>
          ) : viewMode === 'cards' ? (
            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map((product, i) => (
                <ProductDetailCard key={i} product={product} />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Produkt</TableHead>
                    <TableHead>Kategorie</TableHead>
                    <TableHead>Preis</TableHead>
                    <TableHead>Bewertung</TableHead>
                    <TableHead>Ökosysteme</TableHead>
                    <TableHead>Lokal</TableHead>
                    <TableHead>Abo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell className="p-2">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                      </TableCell>
                      <TableCell className="font-medium text-sm">
                        {p.name}
                        {p.highlight && <Badge className="ml-2 bg-yellow-500 text-yellow-950 text-[10px]">{p.highlight}</Badge>}
                      </TableCell>
                      <TableCell className="text-xs">{categoryLabels[p.category]}</TableCell>
                      <TableCell className="text-sm font-semibold text-primary whitespace-nowrap">{p.price}</TableCell>
                      <TableCell><RatingStars rating={p.rating} /></TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {p.ecosystems.map((e, j) => (
                            <Badge key={j} variant="outline" className="text-[10px]">{e}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{p.localOperation ? <Wifi className="w-4 h-4 text-green-600" /> : <span className="text-muted-foreground text-xs">Nein</span>}</TableCell>
                      <TableCell>{p.subscriptionRequired ? <span className="text-orange-600 text-xs font-medium">Ja</span> : <span className="text-green-600 text-xs font-medium">Nein</span>}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Disclaimer */}
          <div className="p-4 bg-muted/50 rounded-xl border border-border text-center">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Hinweis:</strong> Alle Angaben basieren auf Herstellerinformationen und öffentlich verfügbaren Nutzerbewertungen (Stand: März 2026).
              Preise können je nach Händler variieren.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmartHomeProduktePages;
