
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search, MapPin } from 'lucide-react';

const EnergyAdvisorSearch = () => {
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      const searchUrl = `https://www.energie-effizienz-experten.de/fuer-bauherren/expertensuche/?tx_DENAEXPERTEN_EXPERTSEARCH%5Bsearch%5D%5Blocation%5D=${encodeURIComponent(location.trim())}&tx_DENAEXPERTEN_EXPERTSEARCH%5Baction%5D=list&tx_DENAEXPERTEN_EXPERTSEARCH%5Bcontroller%5D=Expert`;
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
        <form onSubmit={handleSearch} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4 items-end">
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
          <Button type="submit" className="w-full sm:w-auto text-lg py-6 px-8 bg-green-600 hover:bg-green-700">
            <Search className="mr-2 h-5 w-5" />
            Suchen
          </Button>
        </form>
         <p className="text-center text-xs text-gray-500 mt-4 max-w-lg mx-auto">
            Sie werden zur offiziellen Experten-Datenbank der Deutschen Energie-Agentur (dena) weitergeleitet.
        </p>
      </div>
    </section>
  );
};

export default EnergyAdvisorSearch;
