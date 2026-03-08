import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SolarResults as SolarResultsType } from '@/types/solarCalculator';
import { 
  Sun, Zap, PiggyBank, TrendingUp, Battery, Car, TreePine, Leaf, Euro, Clock, BarChart3
} from 'lucide-react';
import SolarCharts from './SolarCharts';
import AnimatedGauge from '../AnimatedGauge';

interface SolarResultsProps {
  results: SolarResultsType;
  mitSpeicher: boolean;
  mitEAuto: boolean;
}

const SolarResults = ({ results, mitSpeicher, mitEAuto }: SolarResultsProps) => {
  const formatCurrency = (value: number) => `${value.toLocaleString('de-DE')} €`;
  const formatNumber = (value: number) => value.toLocaleString('de-DE');

  return (
    <div className="space-y-6">
      {/* Schnellübersicht with Gauges */}
      <Card className="glass border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <Sun className="h-6 w-6" />
            Ihr Solar-Potenzial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <AnimatedGauge
              value={results.anlageGroesse}
              max={Math.max(results.anlageGroesse * 1.5, 20)}
              label="Anlagengröße"
              unit="kWp"
              color="amber"
              size="md"
            />
            <AnimatedGauge
              value={results.jahresertrag}
              max={Math.max(results.jahresertrag * 1.3, 15000)}
              label="Jahresertrag"
              unit="kWh"
              color="blue"
              size="md"
            />
            <AnimatedGauge
              value={results.gesamtersparnis}
              max={Math.max(results.gesamtersparnis * 1.5, 3000)}
              label="Ersparnis / Jahr"
              unit="€"
              color="green"
              size="md"
            />
            <AnimatedGauge
              value={results.amortisationMitSpeicher}
              max={25}
              label="Amortisation"
              unit={`${results.amortisationMitSpeicher} J.`}
              color="blue"
              size="md"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="uebersicht" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="uebersicht">Übersicht</TabsTrigger>
          <TabsTrigger value="finanzen">Finanzen</TabsTrigger>
          <TabsTrigger value="umwelt">Umwelt</TabsTrigger>
          <TabsTrigger value="prognose">20-Jahre</TabsTrigger>
        </TabsList>

        {/* Übersicht Tab */}
        <TabsContent value="uebersicht" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="glass border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Stromerzeugung
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Jahresertrag</span>
                  <span className="font-semibold text-foreground">{formatNumber(results.jahresertrag)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Eigenverbrauch</span>
                  <span className="font-semibold text-emerald-600">
                    {formatNumber(mitSpeicher ? results.eigenverbrauchMitSpeicher : results.eigenverbrauchOhneSpeicher)} kWh
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Netzeinspeisung</span>
                  <span className="font-semibold text-foreground">{formatNumber(results.netzeinspeisung)} kWh</span>
                </div>
                {mitSpeicher && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Speichernutzung</span>
                    <span className="font-semibold text-blue-600">{formatNumber(results.speichernutzung)} kWh</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {mitSpeicher && (
              <Card className="glass border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Battery className="h-5 w-5 text-blue-500" />
                    Batteriespeicher
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Eigenverbrauch</span>
                    <span className="font-semibold text-foreground">
                      {((results.eigenverbrauchMitSpeicher / results.jahresertrag) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Zusätzliche Nutzung</span>
                    <span className="font-semibold text-blue-600">{formatNumber(results.speichernutzung)} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Zusatzersparnis</span>
                    <span className="font-semibold text-emerald-600">{formatCurrency(results.speicherersparnis)}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {mitEAuto && (
              <Card className="glass border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Car className="h-5 w-5 text-indigo-500" />
                    E-Mobilität
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Solar-Ladung</span>
                    <span className="font-semibold text-foreground">{formatNumber(results.eAutoLadung)} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Ersparnis</span>
                    <span className="font-semibold text-emerald-600">{formatCurrency(results.eAutoErsparnis)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Solar-Anteil</span>
                    <span className="font-semibold text-foreground">
                      {((results.eAutoLadung / (results.eAutoLadung + 2000)) * 100).toFixed(0)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          <SolarCharts results={results} />
        </TabsContent>

        {/* Finanzen Tab */}
        <TabsContent value="finanzen" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Euro className="h-5 w-5 text-emerald-500" />
                  Investitionskosten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">PV-Module + Montage</span>
                  <span className="font-semibold text-foreground">{formatCurrency(results.kosten.modulkosten + results.kosten.montage)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Wechselrichter</span>
                  <span className="font-semibold text-foreground">{formatCurrency(results.kosten.wechselrichter)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Installation</span>
                  <span className="font-semibold text-foreground">{formatCurrency(results.kosten.installation)}</span>
                </div>
                {mitSpeicher && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Batteriespeicher</span>
                    <span className="font-semibold text-foreground">{formatCurrency(results.kosten.speicherkosten)}</span>
                  </div>
                )}
                {results.kosten.wallboxkosten > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Wallbox</span>
                    <span className="font-semibold text-foreground">{formatCurrency(results.kosten.wallboxkosten)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-foreground">Gesamtinvestition</span>
                  <span className="text-primary">{formatCurrency(results.kosten.gesamtkosten)}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-orange-500" />
                  Jährliche Ersparnis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Solarstrom-Nutzung</span>
                  <span className="font-semibold text-emerald-600">{formatCurrency(results.ersparnisSolarstrom)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Einspeisevergütung</span>
                  <span className="font-semibold text-foreground">{formatCurrency(results.einspeiseverguetung)}</span>
                </div>
                {mitSpeicher && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Speicher-Bonus</span>
                    <span className="font-semibold text-blue-600">{formatCurrency(results.speicherersparnis)}</span>
                  </div>
                )}
                {mitEAuto && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">E-Auto Ersparnis</span>
                    <span className="font-semibold text-indigo-600">{formatCurrency(results.eAutoErsparnis)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-foreground">Gesamtersparnis</span>
                  <span className="text-primary">{formatCurrency(results.gesamtersparnis)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                Amortisation & Rentabilität
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center glass rounded-xl p-4 border border-purple-200 bg-purple-50/50 dark:bg-purple-950/20">
                  <div className="text-2xl font-bold text-purple-600">{results.amortisationMitSpeicher} Jahre</div>
                  <div className="text-sm text-muted-foreground">Amortisationszeit</div>
                </div>
                <div className="text-center glass rounded-xl p-4 border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20">
                  <div className="text-2xl font-bold text-emerald-600">{formatCurrency(results.zwanzigJahresBilanz)}</div>
                  <div className="text-sm text-muted-foreground">20-Jahre Gewinn</div>
                </div>
                <div className="text-center glass rounded-xl p-4 border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
                  <div className="text-2xl font-bold text-blue-600">
                    {((results.zwanzigJahresBilanz / results.kosten.gesamtkosten) * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-muted-foreground">ROI nach 20 Jahren</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Umwelt Tab */}
        <TabsContent value="umwelt" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-emerald-500" />
                  CO₂-Vermeidung
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <AnimatedGauge
                    value={results.co2Vermeidung}
                    max={Math.max(results.co2Vermeidung * 2, 10)}
                    label="Tonnen CO₂ / Jahr"
                    unit="t"
                    color="green"
                    size="lg"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">20-Jahre CO₂-Ersparnis</span>
                    <span className="font-semibold text-foreground">{(results.co2Vermeidung * 20).toFixed(1)} t</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Durchschnitt pro Deutscher</span>
                    <span className="font-semibold text-foreground">11 t CO₂/Jahr</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreePine className="h-5 w-5 text-emerald-600" />
                  Umwelt-Äquivalente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <AnimatedGauge
                    value={results.baumAequivalent}
                    max={Math.max(results.baumAequivalent * 2, 100)}
                    label="Gepflanzte Bäume / Jahr"
                    unit="🌳"
                    color="green"
                    size="lg"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">PKW-Fahrten gespart</span>
                    <span className="font-semibold text-foreground">{Math.round(results.co2Vermeidung * 1000 / 0.15).toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Haushalte 1 Jahr versorgt</span>
                    <span className="font-semibold text-foreground">{Math.round(results.jahresertrag / 3500)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass border-border">
            <CardHeader>
              <CardTitle>Langzeit-Umweltbilanz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="glass rounded-xl p-4 border border-emerald-200">
                  <div className="text-xl font-bold text-emerald-600">{(results.co2Vermeidung * 20).toFixed(0)} t</div>
                  <div className="text-xs text-muted-foreground">CO₂ in 20 Jahren</div>
                </div>
                <div className="glass rounded-xl p-4 border border-emerald-200">
                  <div className="text-xl font-bold text-emerald-600">{results.baumAequivalent * 20}</div>
                  <div className="text-xs text-muted-foreground">Bäume entspricht</div>
                </div>
                <div className="glass rounded-xl p-4 border border-emerald-200">
                  <div className="text-xl font-bold text-emerald-600">{Math.round(results.jahresertrag * 20 / 1000000)} MWh</div>
                  <div className="text-xs text-muted-foreground">Saubere Energie</div>
                </div>
                <div className="glass rounded-xl p-4 border border-emerald-200">
                  <div className="text-xl font-bold text-emerald-600">
                    {Math.round(results.co2Vermeidung * 20 * 1000 / 0.15 / 1000)} Mm
                  </div>
                  <div className="text-xs text-muted-foreground">PKW-Kilometer gespart</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 20-Jahre Prognose Tab */}
        <TabsContent value="prognose" className="space-y-6">
          <Card className="glass border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                20-Jahres-Prognose
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-center text-sm font-medium text-muted-foreground border-b border-border pb-2">
                  <div>Jahr</div>
                  <div>Ertrag (kWh)</div>
                  <div>Ersparnis (€)</div>
                  <div>Kumulativ (€)</div>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {results.jahresprognose.slice(0, 20).map((jahr: any) => (
                    <div key={jahr.jahr} className="grid grid-cols-4 gap-4 text-center text-sm py-1">
                      <div className="text-foreground">{jahr.jahr}</div>
                      <div className="text-foreground">{formatNumber(jahr.ertrag)}</div>
                      <div className="text-foreground">{formatCurrency(jahr.ersparnis)}</div>
                      <div className={jahr.kumulativeErsparnis >= results.kosten.gesamtkosten ? 'text-emerald-600 font-semibold' : 'text-foreground'}>
                        {formatCurrency(jahr.kumulativeErsparnis)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass border-border text-center p-4">
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(results.jahresprognose[19]?.kumulativeErsparnis || 0)}</div>
              <div className="text-sm text-muted-foreground">Gesamtersparnis 20 Jahre</div>
            </Card>
            <Card className="glass border-border text-center p-4">
              <div className="text-2xl font-bold text-emerald-600">{formatCurrency(results.zwanzigJahresBilanz)}</div>
              <div className="text-sm text-muted-foreground">Gewinn nach Abzug Investition</div>
            </Card>
            <Card className="glass border-border text-center p-4">
              <div className="text-2xl font-bold text-purple-600">
                {((results.jahresprognose[19]?.kumulativeErsparnis || 0) / results.kosten.gesamtkosten * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-muted-foreground">Return on Investment</div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SolarResults;
