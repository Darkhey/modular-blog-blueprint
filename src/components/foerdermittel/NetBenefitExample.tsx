
import { Euro } from "lucide-react";

const NetBenefitExample = () => (
  <div className="bg-white dark:bg-gray-900/50 rounded-lg border p-6 shadow-sm max-w-lg mx-auto animate-fade-in">
    <div className="flex items-center gap-3 mb-4">
      <Euro className="w-6 h-6 text-green-700" />
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Beispiel: Ihr tatsächlicher Vorteil</h3>
    </div>
    <ul className="text-gray-700 dark:text-gray-300 mb-2 list-disc pl-5 space-y-2">
      <li>
        <span className="font-medium">Förderfähige Sanierungskosten:</span> 30.000&nbsp;€
      </li>
      <li>
        <span className="font-medium">Möglicher Zuschuss (40% BAFA):</span> 12.000&nbsp;€
      </li>
      <li>
        <span className="font-medium">Energieberater-Kosten (ca.):</span> 2.500&nbsp;€<span className="text-xs text-gray-400"> (wird anteilig mitgefördert!)</span>
      </li>
      <li>
        <span className="font-medium">Tatsächlicher Förderbetrag nach Beraterkosten:</span> <span className="text-green-700 font-bold">~9.500&nbsp;€</span>
      </li>
    </ul>
    <div className="text-gray-500 text-sm mt-2">
      <span>
        Die Kosten für den Energieberater können bis zu 80% mitgefördert werden. Ihr Netto-Vorteil ist damit oft noch höher!
      </span>
    </div>
  </div>
);

export default NetBenefitExample;
