import { UseFormReturn } from 'react-hook-form';
import { FormValues, insulationSystems, buildingParts } from './insulationCalculatorData';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface InsulationCalculatorFormProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => void;
  selectedSystem: { name: string; cost: number; uValue: number; } | undefined;
  selectedBuildingPart: string;
}

const InsulationCalculatorForm = ({ form, onSubmit, selectedSystem, selectedBuildingPart }: InsulationCalculatorFormProps) => {
  const availableSystems = Object.entries(insulationSystems).filter(
    ([, system]) => system.part === selectedBuildingPart
  );

  return (
    <TooltipProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="buildingPart"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zu dämmendes Bauteil</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Bauteil wählen..." /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(buildingParts).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Zu dämmende Fläche</FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Geben Sie die gesamte zu dämmende Außenwand- <br /> oder Dachfläche in Quadratmetern an.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
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
                <div className="flex items-center gap-2">
                  <FormLabel>Aktueller U-Wert des Bauteils</FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Der U-Wert (Wärmedurchgangskoeffizient) gibt an, wie viel Wärme durch ein Bauteil verloren geht.
                        Ein niedriger Wert bedeutet eine bessere Dämmung. Ungedämmte Wände haben oft einen Wert von ca. 1,4 W/(m²K).
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
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
                <div className="flex items-center gap-2">
                  <FormLabel>Gewähltes Dämmsystem</FormLabel>
                   <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                       <p className="max-w-xs">
                        Wählen Sie das für Ihr Gebäude passende System.
                        WDVS ist für Außenwände, Kerndämmung für zweischaliges Mauerwerk
                        und Aufsparrendämmung für die Dachsanierung von außen.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                 <Select onValueChange={field.onChange} value={field.value} disabled={availableSystems.length === 0}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={availableSystems.length > 0 ? "System wählen..." : "Keine Systeme verfügbar"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableSystems.map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                 {availableSystems.length === 0 && (
                  <FormDescription className="text-destructive">
                    Für dieses Bauteil sind keine Dämmsysteme hinterlegt.
                  </FormDescription>
                )}
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
                <div className="flex items-center gap-2">
                  <FormLabel>Ihre Heizkosten</FormLabel>
                   <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Tragen Sie hier Ihren aktuellen Arbeitspreis pro <br />
                        Kilowattstunde (kWh) ein. Sie finden diesen Wert <br />
                        auf Ihrer letzten Heizkostenabrechnung.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
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
    </TooltipProvider>
  );
};

export default InsulationCalculatorForm;
