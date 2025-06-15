
import { Euro, UserCheck } from "lucide-react";

const NetBenefitExample = () => (
  <div className="relative bg-white dark:bg-gray-900/50 rounded-lg border-2 border-green-200 dark:border-green-900 p-7 shadow-xl max-w-lg mx-auto mb-10 animate-fade-in">
    <div className="absolute right-4 top-3 flex items-center gap-1 text-green-900 dark:text-green-300 text-xs font-bold"><UserCheck className="w-4 h-4" /> Praxis-Beispiel</div>
    <div className="flex items-center gap-4 mb-4">
      <Euro className="w-8 h-8 text-green-700" />
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Wie hoch ist der <span className="text-green-700">echte Fördernutzen?</span></h3>
    </div>
    <ul className="text-gray-700 dark:text-gray-200 mb-2 list-disc pl-7 space-y-2 text-base">
      <li>
        <span className="font-medium">Förderfähige Sanierungskosten:</span>{" "}
        <span className="font-bold">30.000&nbsp;€</span>
      </li>
      <li>
        <span className="font-medium">Möglicher Zuschuss (40% BAFA):</span>{" "}
        <span className="font-bold text-green-700">12.000&nbsp;€</span>
      </li>
      <li>
        <span className="font-medium">Energieberater-Kosten (ca.):</span>{" "}
        <span className="font-bold">2.500&nbsp;€</span>
        <span className="text-xs text-gray-400 ml-2">(wird anteilig mitgefördert!)</span>
      </li>
      <li>
        <span className="font-medium">Tatsächlicher Förderbetrag nach Beraterkosten:</span>{" "}
        <span className="text-green-700 font-bold">~9.500&nbsp;€</span>
      </li>
    </ul>
    <div className="text-gray-600 dark:text-green-200 text-sm mt-3">
      Die Kosten für den Energieberater werden bis zu <b>80%</b> extra mitgefördert. Ihr Netto-Vorteil ist damit oft <u>noch höher!</u>
    </div>
  </div>
);

export default NetBenefitExample;
