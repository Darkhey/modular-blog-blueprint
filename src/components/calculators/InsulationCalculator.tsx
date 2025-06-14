import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Info } from 'lucide-react';

const formSchema = z.object({
  area: z.number().min(10, "Fläche muss mindestens 10 m² sein.").max(500, "Fläche darf maximal 500 m² sein."),
  uValueBefore: z.number().min(0.5, "U-Wert muss mind. 0,5 W/(m²K) sein.").max(3.0, "U-Wert ist unrealistisch hoch."),
  insulationSystem: z.string({ required_error: "Bitte wählen Sie ein Dämmsystem." }),
  heatingCost: z.number().min(0.05, "Heizkosten müssen mind. 0,05 €/kWh sein.").max(0.5, "Heizkosten dürfen max. 0,50 €/kWh sein."),
});

type FormValues = z.infer<typeof formSchema>;

interface CalculationResult {
  investment: number;
  savingsPerYear: number;
  amortization: number;
  co2Savings: number;
}

const insulationSystems: Record<string, { name: string; cost: number; uValue: number }> = {
  'wdvs_eps_160': { name: 'WDVS mit EPS (16cm)', cost: 150, uValue: 0.19 },
  'einblas_zellulose_200': { name: 'Einblasdämmung Zellulose (20cm)', cost: 60, uValue: 0.20 },
  'holzfaser_180': { name: 'Holzfaser-Dämmplatte (18cm)', cost: 180, uValue: 0.22 },
};

const InsulationCalculator = () => {
  const [result, setResult] = useState<CalculationResult | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      area: 100,
      uValueBefore: 1.4,
      insulationSystem: 'wdvs_eps_160',
      heatingCost: 0.15,
    },
  });

  const selectedSystemKey = form.watch('insulationSystem');
  const selectedSystem = insulationSystems[selectedSystemKey];

  const onSubmit = (values: FormValues) => {
    const system = insulationSystems[values.insulationSystem];
    if (!system) return;

    const uValueAfter = system.uValue;
    const deltaU = values.uValueBefore - uValueAfter;

    // Vereinfachte Berechnung basierend auf Heizgradtagen (~3600 K*d/a)
    const energySavingsKwh = deltaU * values.area * 3600 * 24 / 1000;
    const savingsPerYear = energySavingsKwh * values.heatingCost;
    const investment = system.cost * values.area;
    const amortization = savingsPerYear > 0 ? investment / savingsPerYear : Infinity;
    const co2Savings = energySavingsKwh * 0.2; // Faktor für Gasheizung

    setResult({
      investment,
      savingsPerYear,
      amortization,
      co2Savings
    });
  };

  return (
    <Card className="max-w-3xl mx-auto animate-fade-in">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 text-primary p-3 rounded-full">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl">Dämmungsrechner</CardTitle>
            <CardDescription>Berechnen Sie Einsparungen und Amortisation Ihrer Dämmmaßnahme.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zu dämmende Fläche</FormLabel>
                  <div className="flex items-center gap-4 pt-2">
                    <FormControl>
                      <Slider
                        min={10} max={500} step={5}
                        value={[field.value]}
                        onValueChange={(val) => field.onChange(val[0])}
                      />
                    </FormControl>
                    <span className="font-bold w-28 text-right shrink-0">{field.value} m²</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="uValueBefore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aktueller U-Wert des Bauteils</FormLabel>
                   <div className="flex items-center gap-2">
                    <FormControl>
                      <Input type="number" step="0.1" {...field} onChange={e => field.onChange(parseFloat(e.target.value))}/>
                    </FormControl>
                     <span>W/(m²K)</span>
                  </div>
                  <FormDescription>
                    Typischer Wert für eine ungedämmte Wand: 1,4. Dach: 1,2.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="insulationSystem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gewähltes Dämmsystem</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(insulationSystems).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedSystem && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start gap-4 animate-fade-in">
                <Info className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-800 dark:text-blue-300">{selectedSystem.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Geschätzte Kosten: <span className="font-semibold text-foreground">{selectedSystem.cost.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} / m²</span>.
                    <br />
                    Neuer U-Wert nach Dämmung: <span className="font-semibold text-foreground">{selectedSystem.uValue.toFixed(2)} W/(m²K)</span>.
                  </p>
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="heatingCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ihre Heizkosten</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))}/>
                    </FormControl>
                    <span>€/kWh</span>
                  </div>
                   <FormDescription>Finden Sie auf Ihrer letzten Heizkostenabrechnung.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" size="lg">
              <Calculator className="mr-2 h-4 w-4" />
              Einsparung berechnen
            </Button>
          </form>
        </Form>

        {result && (
          <div className="mt-8 pt-8 border-t animate-fade-in">
            <h3 className="text-xl font-bold text-center mb-6">Ihr Ergebnis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-muted-foreground">Investitionskosten</p>
                <p className="text-2xl font-bold text-primary">
                  {result.investment.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                </p>
              </div>
              <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-400">Heizkostenersparnis p.a.</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-500">
                  {result.savingsPerYear.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                </p>
              </div>
              <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-400">Amortisationszeit</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-500">
                  {isFinite(result.amortization) ? `${result.amortization.toFixed(1)} Jahre` : 'Nie'}
                </p>
              </div>
              <div className="p-4 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
                <p className="text-sm text-teal-700 dark:text-teal-400">CO₂-Einsparung p.a.</p>
                <p className="text-2xl font-bold text-teal-600 dark:text-teal-500">
                  {result.co2Savings.toFixed(0)} kg
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsulationCalculator;
