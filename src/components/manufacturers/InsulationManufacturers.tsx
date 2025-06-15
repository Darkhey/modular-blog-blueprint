
import { useState, useMemo } from 'react';
import { manufacturersData } from '@/data/manufacturersData';
import type { Manufacturer } from '@/data/manufacturersData';
import ManufacturerCard from './ManufacturerCard';
import ManufacturerSearch from './ManufacturerSearch';
import ManufacturerHeader from './ManufacturerHeader';
import NoResults from './NoResults';
import InsulationInfoBox from './InsulationInfoBox';

const InsulationManufacturers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredManufacturers = useMemo(() => {
    const lowercasedTerm = searchTerm.toLowerCase().trim();
    if (!lowercasedTerm) {
      return manufacturersData;
    }
    return manufacturersData.filter(
      (manufacturer: Manufacturer) =>
        manufacturer.name.toLowerCase().includes(lowercasedTerm) ||
        manufacturer.description.toLowerCase().includes(lowercasedTerm) ||
        manufacturer.material.toLowerCase().includes(lowercasedTerm) ||
        (manufacturer.madeIn && manufacturer.madeIn.toLowerCase().includes(lowercasedTerm)) ||
        manufacturer.useCases.some((useCase) => useCase.toLowerCase().includes(lowercasedTerm)) ||
        manufacturer.specialties.some((specialty) =>
          specialty.toLowerCase().includes(lowercasedTerm)
        )
    );
  }, [searchTerm]);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <ManufacturerHeader />
        <ManufacturerSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredManufacturers.length > 0 
            ? filteredManufacturers.map((manufacturer) => (
                <ManufacturerCard key={manufacturer.name} manufacturer={manufacturer} />
              ))
            : <NoResults searchTerm={searchTerm} />
          }
        </div>
        
        <InsulationInfoBox />

      </div>
    </section>
  );
};

export default InsulationManufacturers;
