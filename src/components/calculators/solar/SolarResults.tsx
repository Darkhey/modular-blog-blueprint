import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SolarResults as SolarResultsType } from '@/types/solarCalculator';
import { 
  Sun, 
  Zap, 
  PiggyBank, 
  TrendingUp, 
  Battery, 
  Car, 
  TreePine, 
  Leaf,
  Euro,
  Clock,
  BarChart3
} from 'lucide-react';
import SolarCharts from './SolarCharts';

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
      {/* Schnellübersicht */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Sun className="h-6 w-6" />
            Ihr Solar-Potenzial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{results.anlageGroesse} kWp</div>
              <div className="text-sm text-muted-foreground">Anlagengröße</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{formatNumber(results.jahresertrag)} kWh</div>
              <div className="text-sm text-muted-foreground">Jahresertrag</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{formatCurrency(results.gesamtersparnis)}</div>
              <div className="text-sm text-muted-foreground">Ersparnis/Jahr</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{results.amortisationMitSpeicher} Jahre</div>
              <div className="text-sm text-muted-foreground">Amortisation</div>
            </div>
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
            {/* Stromerzeugung */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Stromerzeugung
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Jahresertrag</span>
                  <span className="font-semibold">{formatNumber(results.jahresertrag)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Eigenverbrauch</span>
                  <span className="font-semibold text-green-600">
                    {formatNumber(mitSpeicher ? results.eigenverbrauchMitSpeicher : results.eigenverbrauchOhneSpeicher)} kWh
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Netzeinspeisung</span>
                  <span className="font-semibold">{formatNumber(results.netzeinspeisung)} kWh</span>
                </div>
                {mitSpeicher && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Speichernutzung</span>
                    <span className="font-semibold text-blue-600">{formatNumber(results.speichernutzung)} kWh</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Batteriespeicher */}
            {mitSpeicher && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Battery className="h-5 w-5 text-blue-500" />
                    Batteriespeicher
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Eigenverbrauch</span>
                    <span className="font-semibold">
                      {((results.eigenverbrauchMitSpeicher / results.jahresertrag) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Zusätzliche Nutzung</span>
                    <span className="font-semibold text-blue-600">{formatNumber(results.speichernutzung)} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Zusatzersparnis</span>
                    <span className="font-semibold text-green-600">{formatCurrency(results.speicherersparnis)}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* E-Mobilität */}
            {mitEAuto && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Car className="h-5 w-5 text-indigo-500" />
                    E-Mobilität
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Solar-Ladung</span>
                    <span className="font-semibold">{formatNumber(results.eAutoLadung)} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Ersparnis</span>
                    <span className="font-semibold text-green-600">{formatCurrency(results.eAutoErsparnis)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Solar-Anteil</span>
                    <span className="font-semibold">
                      {((results.eAutoLadung / (results.eAutoLadung + 2000)) * 100).toFixed(0)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Diagramme */}
          <SolarCharts results={results} />
        </TabsContent>

        {/* Finanzen Tab */}
        <TabsContent value="finanzen" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Investitionskosten */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Euro className="h-5 w-5 text-green-500" />
                  Investitionskosten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">PV-Module + Montage</span>
                  <span className="font-semibold">{formatCurrency(results.kosten.modulkosten + results.kosten.montage)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Wechselrichter</span>
                  <span className="font-semibold">{formatCurrency(results.kosten.wechselrichter)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Installation</span>
                  <span className="font-semibold">{formatCurrency(results.kosten.installation)}</span>
                </div>
                {mitSpeicher && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Batteriespeicher</span>
                    <span className="font-semibold">{formatCurrency(results.kosten.speicherkosten)}</span>
                  </div>
                )}
                {results.kosten.wallboxkosten > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Wallbox</span>
                    <span className="font-semibold">{formatCurrency(results.kosten.wallboxkosten)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Gesamtinvestition</span>
                  <span className="text-primary">{formatCurrency(results.kosten.gesamtkosten)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Jährliche Ersparnis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-orange-500" />
                  Jährliche Ersparnis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Solarstrom-Nutzung</span>
                  <span className="font-semibold text-green-600">{formatCurrency(results.ersparnisSolarstrom)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Einspeisevergütung</span>
                  <span className="font-semibold">{formatCurrency(results.einspeiseverguetung)}</span>
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
                  <span>Gesamtersparnis</span>
                  <span className="text-primary">{formatCurrency(results.gesamtersparnis)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Amortisation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                Amortisation & Rentabilität
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{results.amortisationMitSpeicher} Jahre</div>
                  <div className="text-sm text-muted-foreground">Amortisationszeit</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{formatCurrency(results.zwanzigJahresBilanz)}</div>
                  <div className="text-sm text-muted-foreground">20-Jahre Gewinn</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-500" />
                  CO₂-Vermeidung
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{results.co2Vermeidung}</div>
                  <div className="text-lg text-muted-foreground">Tonnen CO₂ pro Jahr</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">20-Jahre CO₂-Ersparnis</span>
                    <span className="font-semibold">{(results.co2Vermeidung * 20).toFixed(1)} t</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Durchschnitt pro Deutscher</span>
                    <span className="font-semibold">11 t CO₂/Jahr</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreePine className="h-5 w-5 text-green-600" />
                  Umwelt-Äquivalente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{results.baumAequivalent}</div>
                  <div className="text-lg text-muted-foreground">Gepflanzte Bäume/Jahr</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">PKW-Fahrten gespart</span>
                    <span className="font-semibold">{Math.round(results.co2Vermeidung * 1000 / 0.15).toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Haushalte 1 Jahr versorgt</span>
                    <span className="font-semibold">{Math.round(results.jahresertrag / 3500)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Langzeit-Umweltbilanz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-green-600">{(results.co2Vermeidung * 20).toFixed(0)} t</div>
                  <div className="text-xs text-muted-foreground">CO₂ in 20 Jahren</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">{results.baumAequivalent * 20}</div>
                  <div className="text-xs text-muted-foreground">Bäume entspricht</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">{Math.round(results.jahresertrag * 20 / 1000000)} MWh</div>
                  <div className="text-xs text-muted-foreground">Saubere Energie</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                20-Jahres-Prognose
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-center text-sm font-medium text-muted-foreground border-b pb-2">
                  <div>Jahr</div>
                  <div>Ertrag (kWh)</div>
                  <div>Ersparnis (€)</div>
                  <div>Kumulativ (€)</div>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {results.jahresprognose.slice(0, 20).map((jahr) => (
                    <div key={jahr.jahr} className="grid grid-cols-4 gap-4 text-center text-sm py-1">
                      <div>{jahr.jahr}</div>
                      <div>{formatNumber(jahr.ertrag)}</div>
                      <div>{formatCurrency(jahr.ersparnis)}</div>
                      <div className={jahr.kumulativeErsparnis >= results.kosten.gesamtkosten ? 'text-green-600 font-semibold' : ''}>
                        {formatCurrency(jahr.kumulativeErsparnis)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(results.jahresprognose[19]?.kumulativeErsparnis || 0)}</div>
              <div className="text-sm text-muted-foreground">Gesamtersparnis 20 Jahre</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-green-600">{formatCurrency(results.zwanzigJahresBilanz)}</div>
              <div className="text-sm text-muted-foreground">Gewinn nach Abzug Investition</div>
            </Card>
            <Card className="text-center p-4">
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