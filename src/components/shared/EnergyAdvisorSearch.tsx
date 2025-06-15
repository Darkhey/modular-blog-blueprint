
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin } from 'lucide-react';

const EnergyAdvisorSearch = () => {
  const [location, setLocation] = useState('');
  const [segment, setSegment] = useState('Sanierungsfahrplan');
  const [preselections, setPreselections] = useState({
    bafa: true,
    kfw: true,
    vorOrt: true,
  });

  const handlePreselectionChange = (key: keyof typeof preselections) => {
    setPreselections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      const queryParts = [
        `Energieberater ${segment} in ${location.trim()}`,
      ];

      const selectionTexts = [];
      if (preselections.bafa) selectionTexts.push('BAFA');
      if (preselections.kfw) selectionTexts.push('KfW');
      if (preselections.vorOrt) selectionTexts.push('Vor-Ort-Beratung');

      if (selectionTexts.length > 0) {
        queryParts.push(selectionTexts.join(' '));
      }

      const searchQuery = queryParts.join(' ');
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-full text-lg font-bold mb-6">
            <MapPin className="mr-2 w-5 h-5" />
            🔎 Energieberater-Suche
          </div>
          <h2 className="text-5xl font-black text-gray-900 dark:text-gray-100 mb-6">
            Finden Sie Experten in Ihrer Nähe
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Geben Sie Ihre Postleitzahl oder Ihren Ort ein, um qualifizierte Energie-Effizienz-Experten für Ihr Sanierungsvorhaben zu finden.
          </p>
        </div>
        <form onSubmit={handleSearch} className="max-w-lg mx-auto flex flex-col gap-6">
            <div className="w-full">
                <Label htmlFor="location-search" className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block">PLZ oder Ort</Label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        id="location-search"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="z.B. 10115 oder Berlin"
                        className="pl-10 text-lg py-6"
                        required
                    />
                </div>
            </div>

            <div className="w-full">
                <Label htmlFor="segment-select" className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Gewünschtes Segment</Label>
                 <Select value={segment} onValueChange={setSegment}>
                    <SelectTrigger id="segment-select" className="text-lg py-6">
                        <SelectValue placeholder="Segment auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Heizung">Heizung</SelectItem>
                        <SelectItem value="Dämmung">Dämmung</SelectItem>
                        <SelectItem value="Fenster & Türen">Fenster & Türen</SelectItem>
                        <SelectItem value="Solar">Solar (Photovoltaik & Solarthermie)</SelectItem>
                        <SelectItem value="Sanierungsfahrplan">Individueller Sanierungsfahrplan (ISFP)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="w-full">
                <Label className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Weitere Kriterien</Label>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="bafa" checked={preselections.bafa} onCheckedChange={() => handlePreselectionChange('bafa')} />
                        <Label htmlFor="bafa" className="font-normal cursor-pointer">BAFA-gelistet</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="kfw" checked={preselections.kfw} onCheckedChange={() => handlePreselectionChange('kfw')} />
                        <Label htmlFor="kfw" className="font-normal cursor-pointer">KfW-gelistet</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="vorOrt" checked={preselelections.vorOrt} onCheckedChange={() => handlePreselectionChange('vorOrt')} />
                        <Label htmlFor="vorOrt" className="font-normal cursor-pointer">Vor-Ort-Beratung</Label>
                    </div>
                </div>
            </div>

          <Button type="submit" className="w-full text-lg py-6 px-8 bg-green-600 hover:bg-green-700">
            <Search className="mr-2 h-5 w-5" />
            Experten finden
          </Button>
        </form>
         <p className="text-center text-xs text-gray-500 mt-4 max-w-lg mx-auto">
            Für die Suche wird eine neue Google-Seite geöffnet.
        </p>
      </div>
    </section>
  );
};

export default EnergyAdvisorSearch;
