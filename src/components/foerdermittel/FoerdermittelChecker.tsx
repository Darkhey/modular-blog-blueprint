import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, AlertTriangle, CheckCircle, Info, Euro, Calendar, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const formSchema = z.object({
  buildingYear: z.string().min(4, { message: 'Baujahr angeben' }),
  projectCost: z.string().min(1, { message: 'Kosten angeben' }),
  measure: z.string(),
  buildingType: z.string(),
  livingSpace: z.string().optional(),
  heatingSystem: z.string().optional(),
  energyConsultant: z.boolean(),
  applyBeforeStart: z.boolean(),
  federalState: z.string(),
  zip: z.string().optional(),
  ownerOccupied: z.boolean(),
  incomeBelow90k: z.boolean().optional(),
  combinedMeasures: z.boolean(),
  efficientBuilding: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface FundingResult {
  eligible: boolean;
  programs: Array<{
    name: string;
    amount: string;
    percentage?: number;
    type: 'grant' | 'loan' | 'tax';
    conditions: string[];
    deadline?: string;
    source: string;
    link: string;
  }>;
  warnings: string[];
  tips: string[];
  regionalPrograms: Array<{
    name: string;
    amount: string;
    link: string;
  }>;
  relatedArticles: Array<{
    title: string;
    link: string;
  }>;
}

const getFundingResults = (values: FormValues): FundingResult => {
  const year = parseInt(values.buildingYear, 10);
  const cost = parseFloat(values.projectCost);
  const isOldBuilding = year <= 2009;
  const result: FundingResult = {
    eligible: false,
    programs: [],
    warnings: [],
    tips: [],
    regionalPrograms: [],
    relatedArticles: []
  };

  // BAFA BEG Einzelmaßnahmen
  if (values.energyConsultant && values.applyBeforeStart && cost >= 2000) {
    result.eligible = true;
    
    let bafaPercentage = 15;
    if (values.measure === 'heizung') {
      if (values.heatingSystem === 'waermepumpe') bafaPercentage = 25;
      if (values.heatingSystem === 'biomasse') bafaPercentage = 20;
      if (values.heatingSystem === 'solar') bafaPercentage = 25;
    }
    if (values.measure === 'daemmung') bafaPercentage = 15;
    if (values.measure === 'fenster') bafaPercentage = 15;

    // Bonus für Heizungs-Tauschprämie
    if (values.measure === 'heizung' && values.heatingSystem === 'waermepumpe' && isOldBuilding) {
      bafaPercentage += 10; // Heizungs-Tauschprämie
    }

    result.programs.push({
      name: 'BAFA BEG Einzelmaßnahmen',
      amount: `${(cost * bafaPercentage / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} (${bafaPercentage}%)`,
      percentage: bafaPercentage,
      type: 'grant',
      conditions: [
        'Antrag vor Vertragsabschluss',
        'Zertifizierter Energieberater erforderlich',
        'Förderfähige Kosten bis 60.000€ pro Maßnahme'
      ],
      deadline: 'Laufend bis 31.12.2025',
      source: 'BAFA - Bundesamt für Wirtschaft und Ausfuhrkontrolle',
      link: 'https://www.bafa.de/DE/Energie/Effiziente_Gebaeude/Sanierung_Wohngebaeude/sanierung_wohngebaeude_node.html'
    });
  }

  // KfW 261/262 Kredit
  if (values.efficientBuilding && values.energyConsultant && cost >= 10000) {
    result.programs.push({
      name: 'KfW 261 Wohngebäude-Kredit',
      amount: 'Bis 150.000€ Kredit + bis zu 37.500€ Tilgungszuschuss',
      type: 'loan',
      conditions: [
        'Erreichen eines Effizienzhaus-Standards',
        'Energieberater verpflichtend',
        'Antrag vor Vorhabenbeginn'
      ],
      deadline: 'Laufend, vorbehaltlich verfügbarer Mittel',
      source: 'KfW Bankengruppe',
      link: 'https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/F%C3%B6rderprodukte/Bundesf%C3%B6rderung-f%C3%BCr-effiziente-Geb%C3%A4ude-Wohngeb%C3%A4ude-Kredit-(261-262)/'
    });
  }

  // Steuerliche Förderung
  if (!values.energyConsultant || cost < 2000) {
    result.programs.push({
      name: 'Steuerliche Förderung (§ 35c EStG)',
      amount: `${Math.min(cost * 0.2, 40000).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} (20%)`,
      percentage: 20,
      type: 'tax',
      conditions: [
        'Selbstgenutztes Wohneigentum',
        'Gebäude älter als 10 Jahre',
        'Verteilung über 3 Jahre'
      ],
      deadline: 'Laufend bis 31.12.2025',
      source: 'Bundesministerium der Finanzen',
      link: 'https://www.bundesfinanzministerium.de/Content/DE/FAQ/energetische-sanierungsmassnahmen.html'
    });
  }

  // Regionale Programme
  const regionalPrograms = getRegionalPrograms(values.federalState);
  result.regionalPrograms = regionalPrograms;

  // Warnungen
  if (!values.applyBeforeStart) {
    result.warnings.push('⚠️ BAFA/KfW-Förderung erfordert Antragstellung VOR Vertragsabschluss!');
  }
  if (!values.energyConsultant && values.measure !== 'solar') {
    result.warnings.push('⚠️ Ohne Energieberater nur steuerliche Förderung möglich (meist weniger lukrativ)');
  }
  if (cost < 2000) {
    result.warnings.push('⚠️ Mindestinvestition für BAFA-Förderung: 2.000€');
  }
  if (year > 2009 && values.measure === 'heizung') {
    result.warnings.push('💡 Bei Gebäuden nach 2009: Prüfung der Austauschpflicht nach GEG');
  }

  // Tipps
  if (values.combinedMeasures) {
    result.tips.push('💰 Kombination mehrerer Maßnahmen erhöht oft die Fördersätze');
  }
  if (values.incomeBelow90k && values.ownerOccupied) {
    result.tips.push('💰 Bei niedrigem Einkommen: Prüfung zusätzlicher Landesprogramme empfohlen');
  }
  if (values.measure === 'heizung' && !values.heatingSystem) {
    result.tips.push('🔥 Wärmepumpen erhalten die höchsten Fördersätze (bis 35%)');
  }

  // Relevante Artikel
  result.relatedArticles = [
    { title: 'BAFA-Förderung 2025: Kompletter Leitfaden', link: '/blog/bafa-foerderung-2025' },
    { title: 'KfW vs. BAFA: Welche Förderung ist besser?', link: '/blog/kfw-vs-bafa-vergleich' },
    { title: 'Heizung modernisieren: Schritt-für-Schritt', link: '/heizung-modernisieren' },
    { title: 'Dämmung fördern lassen: Alle Programme', link: '/blog/daemmung-foerderung' }
  ];

  return result;
};

const getRegionalPrograms = (federalState: string) => {
  const programs: Record<string, Array<{ name: string; amount: string; link: string }>> = {
    'bayern': [
      { name: 'BayernFonds Energie', amount: 'Bis 10.000€ Zuschuss', link: 'https://www.lfa.de/website/de/foerderangebote/foerderprogramme_a-z/index.php' },
      { name: 'PV-Speicher-Programm', amount: 'Bis 3.200€', link: 'https://www.bayern.de/politik/energie/foerderung/' }
    ],
    'nrw': [
      { name: 'progres.nrw', amount: 'Variable Zuschüsse', link: 'https://www.bezreg-arnsberg.nrw.de/themen/p/progres_nrw/index.php' },
      { name: 'Wärmepumpen-Förderung NRW', amount: 'Bis 8.000€', link: 'https://www.energieagentur.nrw/foerderung' }
    ],
    'baden-wuerttemberg': [
      { name: 'Klimaschutz-Plus BW', amount: 'Bis 50.000€', link: 'https://um.baden-wuerttemberg.de/de/energie/energieeffizienz/klimaschutz-plus/' }
    ],
    // ... weitere Bundesländer
  };
  
  return programs[federalState] || [];
};

const FoerdermittelChecker = () => {
  const [result, setResult] = useState<FundingResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buildingYear: '1995',
      projectCost: '25000',
      measure: 'heizung',
      buildingType: 'einfamilienhaus',
      livingSpace: '150',
      heatingSystem: 'gas',
      energyConsultant: true,
      applyBeforeStart: true,
      federalState: 'nrw',
      zip: '',
      ownerOccupied: true,
      incomeBelow90k: false,
      combinedMeasures: false,
      efficientBuilding: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    // Simulate API call for better UX
    setTimeout(() => {
      const fundingResult = getFundingResults(values);
      setResult(fundingResult);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* SEO-optimierte Einleitung */}
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-bold text-foreground">Fördermittel-Check 2025</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Ermitteln Sie in wenigen Schritten Ihre individuelle Förderung für Heizung, Dämmung, Fenster und Solar. 
          Aktuelle Programme von BAFA, KfW und allen Bundesländern werden berücksichtigt.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">BAFA BEG</Badge>
          <Badge variant="secondary">KfW 261/262</Badge>
          <Badge variant="secondary">Steuerbonus</Badge>
          <Badge variant="secondary">Landesprogramme</Badge>
        </div>
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Euro className="h-5 w-5" />
            Förderberechnung - Alle aktuellen Programme
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Stand: Januar 2025 | Quellen: BAFA, KfW, Bundesländer
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Grunddaten */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="buildingYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Baujahr des Gebäudes *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="z.B. 1990" {...field} />
                      </FormControl>
                      <FormDescription>
                        Entscheidend für Förderfähigkeit und -höhe
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="buildingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gebäudetyp</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Gebäudetyp wählen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="einfamilienhaus">Einfamilienhaus</SelectItem>
                          <SelectItem value="zweifamilienhaus">Zweifamilienhaus</SelectItem>
                          <SelectItem value="mehrfamilienhaus">Mehrfamilienhaus</SelectItem>
                          <SelectItem value="reihenhaus">Reihenhaus</SelectItem>
                          <SelectItem value="wohnung">Eigentumswohnung</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="measure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Geplante Hauptmaßnahme *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Maßnahme wählen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="heizung">🔥 Heizung tauschen</SelectItem>
                          <SelectItem value="daemmung">🏠 Dämmung</SelectItem>
                          <SelectItem value="solar">☀️ Solarenergie</SelectItem>
                          <SelectItem value="fenster">🪟 Fenster/Türen</SelectItem>
                          <SelectItem value="lueftung">🌬️ Lüftungsanlage</SelectItem>
                          <SelectItem value="komplettsanierung">🏗️ Komplettsanierung</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {form.watch('measure') === 'heizung' && (
                  <FormField
                    control={form.control}
                    name="heatingSystem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Neue Heizungsart</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Heizung wählen" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="waermepumpe">Wärmepumpe (bis 35% Förderung)</SelectItem>
                            <SelectItem value="biomasse">Biomasse/Pellets (bis 30%)</SelectItem>
                            <SelectItem value="solar">Solarthermie (bis 25%)</SelectItem>
                            <SelectItem value="hybrid">Hybrid-System</SelectItem>
                            <SelectItem value="gas-brennwert">Gas-Brennwert</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="projectCost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Geschätzte Bruttokosten (€) *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="z.B. 25000" 
                          {...field} 
                          onChange={e => field.onChange(e.target.value)} 
                        />
                      </FormControl>
                      <FormDescription>
                        Inkl. Material, Arbeitskosten und Nebenkosten
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="federalState"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bundesland</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Bundesland wählen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="baden-wuerttemberg">Baden-Württemberg</SelectItem>
                          <SelectItem value="bayern">Bayern</SelectItem>
                          <SelectItem value="berlin">Berlin</SelectItem>
                          <SelectItem value="brandenburg">Brandenburg</SelectItem>
                          <SelectItem value="bremen">Bremen</SelectItem>
                          <SelectItem value="hamburg">Hamburg</SelectItem>
                          <SelectItem value="hessen">Hessen</SelectItem>
                          <SelectItem value="mecklenburg-vorpommern">Mecklenburg-Vorpommern</SelectItem>
                          <SelectItem value="niedersachsen">Niedersachsen</SelectItem>
                          <SelectItem value="nrw">Nordrhein-Westfalen</SelectItem>
                          <SelectItem value="rheinland-pfalz">Rheinland-Pfalz</SelectItem>
                          <SelectItem value="saarland">Saarland</SelectItem>
                          <SelectItem value="sachsen">Sachsen</SelectItem>
                          <SelectItem value="sachsen-anhalt">Sachsen-Anhalt</SelectItem>
                          <SelectItem value="schleswig-holstein">Schleswig-Holstein</SelectItem>
                          <SelectItem value="thueringen">Thüringen</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Für regionale Förderprogramme relevant
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Erweiterte Optionen */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Weitere Angaben (optional)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="livingSpace"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wohnfläche (m²)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="z.B. 150" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postleitzahl</FormLabel>
                        <FormControl>
                          <Input placeholder="z.B. 44137" {...field} />
                        </FormControl>
                        <FormDescription>
                          Für kommunale Förderprogramme
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="energyConsultant"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Energieberater einbinden?
                          </FormLabel>
                          <FormDescription>
                            Für BAFA/KfW meist verpflichtend, erhöht Fördersätze
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="applyBeforeStart"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Antrag vor Maßnahmenbeginn?
                          </FormLabel>
                          <FormDescription>
                            Für BAFA/KfW zwingend erforderlich!
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="ownerOccupied"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Selbst bewohnt?
                          </FormLabel>
                          <FormDescription>
                            Eigennutzung oft Fördervoraussetzung
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="combinedMeasures"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Weitere Maßnahmen geplant?
                          </FormLabel>
                          <FormDescription>
                            Kombinationen oft lukrativer
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {form.watch('measure') === 'komplettsanierung' && (
                  <FormField
                    control={form.control}
                    name="efficientBuilding"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Effizienzhaus-Standard geplant?
                          </FormLabel>
                          <FormDescription>
                            Für KfW 261 erforderlich (höchste Förderung)
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Berechne Förderung...
                  </>
                ) : (
                  <>
                    <Euro className="mr-2 h-4 w-4" />
                    Förderung berechnen (kostenlos)
                  </>
                )}
              </Button>
            </form>
          </Form>

          {/* Detaillierte Ergebnisse */}
          {result && (
            <div className="mt-8 space-y-6" data-testid="checker-result">
              {result.eligible && result.programs.length > 0 ? (
                <>
                  <Alert className="border-green-200 bg-green-50 dark:bg-green-950/50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800 dark:text-green-200">
                      <strong>Glückwunsch!</strong> Ihr Projekt ist für mehrere Förderprogramme geeignet.
                    </AlertDescription>
                  </Alert>

                  {/* Förderprogramme */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Euro className="h-5 w-5" />
                      Verfügbare Förderprogramme
                    </h3>
                    {result.programs.map((program, index) => (
                      <Card key={index} className="border-l-4 border-l-green-500">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{program.name}</h4>
                                <Badge 
                                  variant={program.type === 'grant' ? 'default' : program.type === 'loan' ? 'secondary' : 'outline'}
                                >
                                  {program.type === 'grant' ? 'Zuschuss' : program.type === 'loan' ? 'Kredit' : 'Steuerbonus'}
                                </Badge>
                              </div>
                              <p className="text-2xl font-bold text-green-600">{program.amount}</p>
                              <div className="space-y-1">
                                {program.conditions.map((condition, i) => (
                                  <p key={i} className="text-sm text-muted-foreground">
                                    • {condition}
                                  </p>
                                ))}
                              </div>
                              {program.deadline && (
                                <p className="text-sm text-orange-600 flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {program.deadline}
                                </p>
                              )}
                              <div className="flex items-center justify-between pt-2">
                                <p className="text-xs text-muted-foreground">
                                  Quelle: {program.source}
                                </p>
                                <a
                                  href={program.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline text-sm flex items-center gap-1"
                                >
                                  Details <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800 dark:text-orange-200">
                    Nach Ihren Angaben ist eine direkte BAFA/KfW-Förderung aktuell nicht möglich. 
                    Die steuerliche Förderung könnte jedoch eine Alternative sein.
                  </AlertDescription>
                </Alert>
              )}

              {/* Warnungen */}
              {result.warnings.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-orange-600 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Wichtige Hinweise
                  </h3>
                  {result.warnings.map((warning, index) => (
                    <Alert key={index} className="border-orange-200 bg-orange-50 dark:bg-orange-950/50">
                      <AlertDescription className="text-orange-800 dark:text-orange-200">
                        {warning}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}

              {/* Tipps */}
              {result.tips.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Optimierungstipps
                  </h3>
                  {result.tips.map((tip, index) => (
                    <Alert key={index} className="border-blue-200 bg-blue-50 dark:bg-blue-950/50">
                      <AlertDescription className="text-blue-800 dark:text-blue-200">
                        {tip}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}

              {/* Regionale Programme */}
              {result.regionalPrograms.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Badge variant="outline">Regional</Badge>
                    Zusätzliche Landesprogramme
                  </h3>
                  <div className="grid gap-3">
                    {result.regionalPrograms.map((program, index) => (
                      <Card key={index} className="border-l-4 border-l-blue-500">
                        <CardContent className="pt-3 pb-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{program.name}</h4>
                              <p className="text-sm text-muted-foreground">{program.amount}</p>
                            </div>
                            <a
                              href={program.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline text-sm flex items-center gap-1"
                            >
                              Info <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Weiterführende Artikel */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Weiterführende Ratgeber
                </h3>
                <div className="grid gap-2">
                  {result.relatedArticles.map((article, index) => (
                    <Link
                      key={index}
                      to={article.link}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium">{article.title}</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Expertenempfehlung */}
              <Alert className="border-primary/20 bg-primary/5">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Empfehlung:</strong> Lassen Sie sich von einem zertifizierten Energieberater beraten. 
                  Diese sind oft für höhere Fördersätze verpflichtend und optimieren Ihre Förderausschöpfung.
                  <br />
                  <a 
                    href="https://www.energie-effizienz-experten.de/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline mt-2 inline-flex items-center gap-1"
                  >
                    Experten in Ihrer Nähe finden <ExternalLink className="h-3 w-3" />
                  </a>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SEO-Content */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <h3>Fördermittel 2025: Aktuelle Programme im Überblick</h3>
            <p>
              Unser Fördermittel-Check berücksichtigt alle aktuellen Bundesprogramme sowie regionale Förderungen. 
              Die Berechnung basiert auf den neuesten Richtlinien von BAFA (Bundesamt für Wirtschaft und Ausfuhrkontrolle) 
              und KfW (Kreditanstalt für Wiederaufbau) sowie den Landesprogrammen aller 16 Bundesländer.
            </p>
            <h4>Wichtige Förderquellen 2025:</h4>
            <ul>
              <li><strong>BAFA BEG Einzelmaßnahmen:</strong> 15-35% Zuschuss für Einzelmaßnahmen</li>
              <li><strong>KfW 261/262:</strong> Bis 150.000€ Kredit + bis zu 25% Tilgungszuschuss</li>
              <li><strong>Steuerliche Förderung:</strong> 20% über 3 Jahre verteilt</li>
              <li><strong>Landesprogramme:</strong> Zusätzliche regionale Förderungen</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoerdermittelChecker;
