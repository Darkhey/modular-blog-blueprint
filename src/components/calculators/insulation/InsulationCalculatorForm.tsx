
import { UseFormReturn } from 'react-hook-form';
import { FormValues, insulationSystems } from './insulationCalculatorData';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Info } from 'lucide-react';

interface InsulationCalculatorFormProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => void;
  selectedSystem: { name: string; cost: number; uValue: number; } | undefined;
}

const InsulationCalculatorForm = ({ form, onSubmit, selectedSystem }: InsulationCalculatorFormProps) => {
  return (
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
  );
};

export default InsulationCalculatorForm;
