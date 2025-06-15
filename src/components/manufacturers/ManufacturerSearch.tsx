
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ManufacturerSearchProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const ManufacturerSearch = ({ searchTerm, setSearchTerm }: ManufacturerSearchProps) => {
    return (
        <div className="max-w-2xl mx-auto mb-12 px-4">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Hersteller, Material oder Einsatz (z.B. Steico, Holzfaser...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 text-base rounded-full border-2 border-gray-200 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800"
                    aria-label="Hersteller suchen"
                />
            </div>
        </div>
    );
};

export default ManufacturerSearch;
