import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  buildingYear: z.string().min(4, { message: 'Baujahr angeben' }),
  projectCost: z.string().min(1, { message: 'Kosten angeben' }),
  measure: z.string(),
  energyConsultant: z.boolean(),
  applyBeforeStart: z.boolean(),
  zip: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const FoerdermittelChecker = () => {
  const [result, setResult] = useState<{ eligible: boolean; subsidy: number } | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buildingYear: '1990',
      projectCost: '20000',
      measure: 'heizung',
      energyConsultant: true,
      applyBeforeStart: true,
      zip: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    const year = parseInt(values.buildingYear, 10);
    const cost = parseFloat(values.projectCost);
    const oldEnough = year <= new Date().getFullYear() - 5;
    const costEnough = cost >= 2000;
    const eligible = oldEnough && costEnough && values.energyConsultant && values.applyBeforeStart;
    const subsidy = eligible ? cost * 0.3 : 0;
    setResult({ eligible, subsidy });
  };

  return (
    <Card className="mb-10 animate-fade-in">
      <CardHeader>
        <CardTitle>Fördermittel-Check</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="buildingYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Baujahr des Gebäudes</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="measure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Geplante Maßnahme</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Maßnahme wählen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="heizung">Heizung tauschen</SelectItem>
                      <SelectItem value="daemmung">Dämmung</SelectItem>
                      <SelectItem value="solar">Solarenergie</SelectItem>
                      <SelectItem value="fenster">Fenster/Türen</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Geschätzte Kosten (€)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(e.target.value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="energyConsultant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>zertifizierter Energieberater eingebunden?</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="applyBeforeStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Antrag vor Maßnahmenbeginn?</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postleitzahl (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Jetzt prüfen</Button>
          </form>
        </Form>
        {result && (
          <div className="mt-6 p-4 border rounded-lg" data-testid="checker-result">
            {result.eligible ? (
              <div className="text-green-700">
                <p className="font-bold mb-2">Ihr Projekt ist voraussichtlich förderfähig!</p>
                <p>Mögliche Förderung: {result.subsidy.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
                <p className="mt-2 text-sm">Energieberater in Ihrer Nähe finden Sie über die <a href="https://www.energie-effizienz-experten.de/" target="_blank" rel="noopener noreferrer" className="underline">Expertenliste</a>.</p>
              </div>
            ) : (
              <div className="text-red-700">
                <p className="font-bold">Nach Ihren Angaben ist das Projekt aktuell nicht förderfähig.</p>
                <p className="mt-2 text-sm">Lassen Sie sich individuell beraten, ob dennoch Möglichkeiten bestehen.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FoerdermittelChecker;
