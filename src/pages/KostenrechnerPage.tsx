import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calculator, Zap, Home, Flame, Sun, DoorOpen, Layers, TriangleAlert, ArrowRight, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BarChart, Bar, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer, Legend } from 'recharts';
import { useKostenrechner } from '@/hooks/useKostenrechner';
import ResultsPDFExport from '@/components/shared/ResultsPDFExport';
import ShareResults from '@/components/shared/ShareResults';
import QuickAccessButtons from '@/components/calculators/QuickAccessButtons';

const InfoTip = ({ content }: { content: React.ReactNode }) => (
  <>
    {/* Desktop hover tooltip */}
    <span className="hidden md:inline-flex">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label="Erläuterung anzeigen"
            className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs text-xs leading-relaxed">
          {content}
        </TooltipContent>
      </Tooltip>
    </span>
    {/* Mobile click popover */}
    <span className="inline-flex md:hidden">
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="Erläuterung anzeigen"
            className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Info className="w-4 h-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent side="top" className="max-w-[260px] text-xs leading-relaxed">
          {content}
        </PopoverContent>
      </Popover>
    </span>
  </>
);


const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-6 h-6" />,
  TriangleAlert: <TriangleAlert className="w-6 h-6" />,
  DoorOpen: <DoorOpen className="w-6 h-6" />,
  Flame: <Flame className="w-6 h-6" />,
  Sun: <Sun className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
};

const fmt = (n: number) => Math.round(n).toLocaleString('de-DE');

const KostenrechnerPage = () => {
  const { inputs, toggleGewerk, setMenge, selectedCount, results, calculate, gewerke } = useKostenrechner();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Kosten-Vergleichsrechner für Sanierung',
    description: 'Berechnen Sie die Gesamtkosten Ihrer Sanierung mit Förderabzug. Wählen Sie mehrere Gewerke und erhalten Sie eine detaillierte Kostenschätzung.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    url: 'https://sanieren-sparen.de/kostenrechner',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  };

  const chartData = results?.gewerke.map((r) => ({
    name: r.gewerk.label,
    Bruttokosten: Math.round(r.kostenAvg),
    Förderung: Math.round(r.foerderung),
    Nettokosten: Math.round(r.nettoAvg),
  }));

  const pdfResults = results
    ? {
        gewerke: results.gewerke.map((r) => ({
          label: r.gewerk.label,
          menge: r.menge,
          unit: r.gewerk.unit,
          bruttoAvg: r.kostenAvg,
          foerderung: r.foerderung,
          nettoAvg: r.nettoAvg,
        })),
        totalBruttoAvg: results.totalBruttoAvg,
        totalFoerderung: results.totalFoerderung,
        totalNettoAvg: results.totalNettoAvg,
      }
    : null;

  return (
    <>
      <Helmet>
        <title>Sanierungskosten berechnen – Kostenrechner</title>
        <meta name="description" content="Berechnen Sie die Gesamtkosten Ihrer Sanierung inkl. Förderabzug. Wählen Sie Gewerke wie Dämmung, Heizung, Solar und erhalten Sie eine detaillierte Schätzung." />
        <link rel="canonical" href="https://sanieren-sparen.de/kostenrechner" />
        <meta property="og:title" content="Sanierungskosten berechnen – Kostenrechner" />
        <meta property="og:description" content="Mehrere Gewerke kombinieren und Gesamtkosten inkl. Förderung ermitteln." />
        <meta property="og:url" content="https://sanieren-sparen.de/kostenrechner" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        {/* Hero */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <Calculator className="w-12 h-12" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Kosten-Vergleichsrechner</h1>
            <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
              Wählen Sie Ihre Sanierungsmaßnahmen, geben Sie Flächen ein und erhalten Sie eine Gesamtkostenschätzung mit automatischem Förderabzug.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
          {/* Gewerk-Auswahl */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
              1. Gewerke auswählen
              <InfoTip content="Mehrfachauswahl möglich. Im nächsten Schritt verfeinern Sie die Mengen pro Gewerk. Sie können jederzeit Gewerke hinzufügen oder entfernen." />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gewerke.map((g) => {
                const checked = inputs[g.id].selected;
                return (
                  <Card
                    key={g.id}
                    className={`cursor-pointer transition-all border-2 ${checked ? 'border-primary bg-primary/5 shadow-md' : 'border-border hover:border-primary/40'}`}
                    onClick={() => toggleGewerk(g.id)}
                  >
                    <CardContent className="p-4 flex items-start gap-3">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => toggleGewerk(g.id)}
                        className="mt-1"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-primary">{iconMap[g.icon]}</span>
                          <span className="font-semibold text-foreground">{g.label}</span>
                          {g.tooltip && <InfoTip content={g.tooltip} />}
                        </div>
                        <p className="text-sm text-muted-foreground">{g.description}</p>
                        <div className="flex gap-2 mt-2 flex-wrap items-center">
                          <Badge variant="secondary" className="text-xs inline-flex items-center gap-1">
                            {g.costPerUnit.min}–{g.costPerUnit.max} €/{g.unit}
                            <InfoTip content={`Marktübliche Spanne 2025 inkl. Material & Montage. Untergrenze = einfache Ausführung, Obergrenze = Premium / aufwendige Bestandsanpassung. Ohne Gerüst und Sonderbauten.`} />
                          </Badge>
                          {g.foerderungPercent > 0 && (
                            <Badge variant="outline" className="text-xs text-emerald-700 border-emerald-300 inline-flex items-center gap-1">
                              {g.foerderungPercent}% Förderung
                              <InfoTip content={`Geschätzter BAFA/KfW-Zuschuss auf förderfähige Kosten, gedeckelt bei ${g.foerderungMax.toLocaleString('de-DE')} € pro Wohneinheit. Nur mit Energieberater (iSFP) und vor Auftragsvergabe beantragt.`} />
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Detail-Eingaben */}
          {selectedCount > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                2. Mengen & Flächen angeben
                <InfoTip content="Schieben Sie den Regler oder geben Sie die Menge direkt ein. Pro Gewerk finden Sie unter dem Slider eine Live-Kostenspanne." />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gewerke
                  .filter((g) => inputs[g.id].selected)
                  .map((g) => (
                    <Card key={g.id} className="border-border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <span className="text-primary">{iconMap[g.icon]}</span>
                          {g.label}
                          {g.mengeHelp && <InfoTip content={g.mengeHelp} />}
                        </CardTitle>
                        <CardDescription>{g.unitLabel}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-4">
                          <Slider
                            value={[inputs[g.id].menge]}
                            onValueChange={([v]) => setMenge(g.id, v)}
                            min={g.minValue}
                            max={g.maxValue}
                            step={g.step}
                            className="flex-1"
                          />
                          <div className="flex items-center gap-1">
                            <Input
                              type="number"
                              value={inputs[g.id].menge}
                              onChange={(e) => setMenge(g.id, Number(e.target.value))}
                              className="w-20 text-right"
                              min={g.minValue}
                              max={g.maxValue}
                            />
                            <span className="text-sm text-muted-foreground w-10">{g.unit}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Geschätzte Kosten: {fmt(inputs[g.id].menge * g.costPerUnit.min)} – {fmt(inputs[g.id].menge * g.costPerUnit.max)} €
                        </p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </section>
          )}

          {/* Berechnen */}
          <Button
            onClick={calculate}
            disabled={selectedCount === 0}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 text-lg shadow-lg"
          >
            <Zap className="mr-2 w-5 h-5" />
            {selectedCount === 0 ? 'Bitte Gewerke auswählen' : `Kosten für ${selectedCount} Gewerk${selectedCount > 1 ? 'e' : ''} berechnen`}
          </Button>

          {/* Ergebnisse */}
          {results && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-foreground">3. Ihre Kostenschätzung</h2>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-border">
                  <CardContent className="p-5 text-center">
                    <p className="text-sm text-muted-foreground mb-1 inline-flex items-center gap-1 justify-center">
                      Bruttokosten (Ø)
                      <InfoTip content="Mittelwert aus Min/Max-Spanne aller gewählten Gewerke, vor Förderung. Min/Max darunter zeigt die Bandbreite je nach Ausführung." />
                    </p>
                    <p className="text-2xl font-bold text-foreground">{fmt(results.totalBruttoAvg)} €</p>
                    <p className="text-xs text-muted-foreground">{fmt(results.totalBruttoMin)} – {fmt(results.totalBruttoMax)} €</p>
                  </CardContent>
                </Card>
                <Card className="border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30">
                  <CardContent className="p-5 text-center">
                    <p className="text-sm text-emerald-700 dark:text-emerald-400 mb-1 inline-flex items-center gap-1 justify-center">
                      Förderabzug
                      <InfoTip content="Summe der geschätzten BAFA/KfW-Zuschüsse über alle Gewerke. Tatsächliche Höhe wird im Antragsverfahren mit Energieberater (iSFP) festgelegt." />
                    </p>
                    <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">– {fmt(results.totalFoerderung)} €</p>
                  </CardContent>
                </Card>
                <Card className="border-primary bg-primary/5">
                  <CardContent className="p-5 text-center">
                    <p className="text-sm text-primary mb-1 inline-flex items-center gap-1 justify-center">
                      Eigenanteil (Ø)
                      <InfoTip content="Bruttokosten minus Förderung — der Betrag, den Sie selbst tragen oder finanzieren müssen." />
                    </p>
                    <p className="text-2xl font-bold text-primary">{fmt(results.totalNettoAvg)} €</p>
                    <p className="text-xs text-muted-foreground">{fmt(results.totalNettoMin)} – {fmt(results.totalNettoMax)} €</p>
                  </CardContent>
                </Card>
              </div>

              {/* Table */}
              <Card className="border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Gewerk</TableHead>
                      <TableHead className="text-right">Menge</TableHead>
                      <TableHead className="text-right">Kosten (Ø)</TableHead>
                      <TableHead className="text-right">
                        <span className="inline-flex items-center gap-1 justify-end">
                          Förderung
                          <InfoTip content="Geschätzter BAFA/KfW-Zuschuss für dieses Gewerk, gedeckelt am gesetzlichen Höchstbetrag pro Wohneinheit." />
                        </span>
                      </TableHead>
                      <TableHead className="text-right">
                        <span className="inline-flex items-center gap-1 justify-end">
                          Eigenanteil
                          <InfoTip content="Kosten minus Förderung — Ihr verbleibender Finanzierungsbedarf für dieses Gewerk." />
                        </span>
                      </TableHead>
                      <TableHead className="text-right">Detail</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.gewerke.map((r) => (
                      <TableRow key={r.gewerk.id}>
                        <TableCell className="font-medium">{r.gewerk.label}</TableCell>
                        <TableCell className="text-right">{r.menge} {r.gewerk.unit}</TableCell>
                        <TableCell className="text-right">{fmt(r.kostenAvg)} €</TableCell>
                        <TableCell className="text-right text-emerald-600">– {fmt(r.foerderung)} €</TableCell>
                        <TableCell className="text-right font-semibold">{fmt(r.nettoAvg)} €</TableCell>
                        <TableCell className="text-right">
                          <Link to={r.gewerk.detailLink}>
                            <Button variant="ghost" size="sm">
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50 font-bold">
                      <TableCell>Gesamt</TableCell>
                      <TableCell />
                      <TableCell className="text-right">{fmt(results.totalBruttoAvg)} €</TableCell>
                      <TableCell className="text-right text-emerald-600">– {fmt(results.totalFoerderung)} €</TableCell>
                      <TableCell className="text-right">{fmt(results.totalNettoAvg)} €</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>

              {/* Chart */}
              {chartData && chartData.length > 0 && (
                <Card className="border-border p-4">
                  <h3 className="font-semibold mb-1 text-foreground flex items-center gap-2">
                    Kostenverteilung pro Gewerk
                    <InfoTip content="Pro Gewerk sehen Sie drei Balken: graue Bruttokosten, grüne Förderung und farbige Nettokosten (Ihr Eigenanteil)." />
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">Balken zeigen Brutto, Förderung und Netto im direkten Vergleich.</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <ChartTooltip formatter={(value: number) => [`${fmt(value)} €`, '']} />
                      <Legend />
                      <Bar dataKey="Bruttokosten" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Förderung" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Nettokosten" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              )}

              {/* Export */}
              <div className="flex gap-2 flex-wrap">
                <ShareResults calculatorType="kostenrechner" results={pdfResults} />
                <ResultsPDFExport calculatorType="kostenrechner" results={pdfResults} />
              </div>

              <p className="text-xs text-muted-foreground text-center">
                * Die Angaben sind Schätzungen auf Basis aktueller Durchschnittswerte (Stand 2025). 
                Tatsächliche Kosten können je nach Region, Anbieter und Gebäudezustand abweichen. 
                Fördersätze basieren auf BAFA/KfW-Programmen und können sich ändern.
              </p>
            </section>
          )}

          <QuickAccessButtons currentCalculator="heating" className="mt-4" />
        </div>
      </div>
    </>
  );
};

export default KostenrechnerPage;
