
import { Building2, ExternalLink, Hammer, Leaf, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Manufacturer } from '@/data/manufacturersData';

interface ManufacturerCardProps {
  manufacturer: Manufacturer;
}

const ManufacturerCard = ({ manufacturer }: ManufacturerCardProps) => {
  return (
    <a
      href={manufacturer.website}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex flex-col bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl dark:shadow-none dark:border dark:border-gray-700/50 transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-500 group"
    >
      <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-10">
        {manufacturer.ecoFriendly && (
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700 shadow-sm">
            <Leaf className="w-3 h-3 mr-1.5" />
            Öko-Tipp
          </Badge>
        )}
        {manufacturer.madeIn && (
          <Badge variant="outline" className="bg-white/50 backdrop-blur-sm dark:bg-gray-900/50 dark:border-gray-600 shadow-sm">
            <MapPin className="w-3 h-3 mr-1.5" />
            {manufacturer.madeIn}
          </Badge>
        )}
      </div>

      <div className="text-center mb-4">
        <div 
          className={`w-20 h-20 ${manufacturer.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
        >
          <span className="text-white font-black text-2xl">
            {manufacturer.logoPlaceholder}
          </span>
        </div>
        <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {manufacturer.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed min-h-[40px]">
          {manufacturer.description}
        </p>
      </div>

      <div className="space-y-4 my-4 pt-4 border-t border-gray-200 dark:border-gray-600 flex-grow">
          <div>
              <h4 className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 mb-2 flex items-center"><Hammer className="w-4 h-4 mr-2"/>Material & Einsatz</h4>
              <div className="flex flex-wrap gap-1.5">
                  <Badge className="pointer-events-none">{manufacturer.material}</Badge>
                  {manufacturer.useCases.map((useCase) => (
                      <Badge key={useCase} variant="outline" className="pointer-events-none">{useCase}</Badge>
                  ))}
              </div>
          </div>
          <div>
              <h4 className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 mb-2 flex items-center"><Building2 className="w-4 h-4 mr-2"/>Spezialitäten</h4>
              <div className="flex flex-wrap gap-1.5">
                  {manufacturer.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="pointer-events-none">{specialty}</Badge>
                  ))}
              </div>
          </div>
      </div>
      
      <div className="mt-auto text-center pt-2">
        <div className="text-blue-600 dark:text-blue-400 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <ExternalLink className="mr-2 w-4 h-4" />
          Zur Hersteller-Website
        </div>
      </div>
    </a>
  );
};

export default ManufacturerCard;
