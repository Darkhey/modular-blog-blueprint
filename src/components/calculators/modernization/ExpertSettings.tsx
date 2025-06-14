
import { Settings2, ChevronsUpDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CustomPrices } from '@/hooks/useModernizationCalculator';

interface ExpertSettingsProps {
    customPrices: CustomPrices;
    handlePriceChange: (field: keyof CustomPrices, value: string) => void;
}

const ExpertSettings = ({ customPrices, handlePriceChange }: ExpertSettingsProps) => {
    return (
        <Collapsible className="mb-6">
            <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full flex items-center justify-center text-gray-600 hover:text-gray-900">
                    <Settings2 className="mr-2 h-4 w-4" />
                    Experteneinstellungen (Energiepreise anpassen)
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 p-4 border rounded-lg bg-gray-50">
                    <div>
                        <Label htmlFor="price-gas" className="text-xs">Gas (€/kWh)</Label>
                        <Input id="price-gas" type="number" step="0.01" value={customPrices.gas} onChange={e => handlePriceChange('gas', e.target.value)} className="mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="price-oil" className="text-xs">Öl (€/kWh)</Label>
                        <Input id="price-oil" type="number" step="0.01" value={customPrices.oil} onChange={e => handlePriceChange('oil', e.target.value)} className="mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="price-strom" className="text-xs">Strom (€/kWh)</Label>
                        <Input id="price-strom" type="number" step="0.01" value={customPrices.waermepumpe} onChange={e => { handlePriceChange('waermepumpe', e.target.value); handlePriceChange('nachtspeicher', e.target.value); }} className="mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="price-pellets" className="text-xs">Pellets (€/kWh)</Label>
                        <Input id="price-pellets" type="number" step="0.01" value={customPrices.pellets} onChange={e => handlePriceChange('pellets', e.target.value)} className="mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="price-fernwaerme" className="text-xs">Fernwärme (€/kWh)</Label>
                        <Input id="price-fernwaerme" type="number" step="0.01" value={customPrices.fernwaerme} onChange={e => handlePriceChange('fernwaerme', e.target.value)} className="mt-1" />
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default ExpertSettings;
