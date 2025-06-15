
import { Building2 } from 'lucide-react';

const ManufacturerHeader = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-bold mb-6">
        <Building2 className="mr-2 w-5 h-5" />
        🏭 DÄMMSTOFF-HERSTELLER
      </div>
      <h2 className="text-5xl font-black text-gray-900 dark:text-gray-100 mb-6">
        Die größten Dämmstoff-Hersteller im Vergleich
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
        Von ökologischen Holzfaser-Dämmstoffen bis zur klassischen Mineralwolle -
        <span className="text-blue-600 font-bold dark:text-blue-400"> diese Hersteller bestimmen den Markt!</span>
      </p>
    </div>
  );
};

export default ManufacturerHeader;
