
import { CalendarArrowUp } from "lucide-react";

const HighlightedTip = () => (
  <div className="bg-yellow-100 dark:bg-yellow-800/10 border-l-4 border-yellow-500 rounded-r-lg px-6 py-4 mb-10 flex items-start gap-3 animate-fade-in">
    <CalendarArrowUp className="w-7 h-7 text-yellow-600 flex-shrink-0 mt-1" />
    <div>
      <h3 className="font-bold text-yellow-900 dark:text-yellow-300 mb-1">Wichtig: Antrag immer VOR Baubeginn!</h3>
      <p className="text-yellow-800 dark:text-yellow-200 text-base">
        Fördermittel gibt es nur, wenn der Antrag vor Auftragsvergabe oder Bau-/Sanierungsbeginn gestellt wird. Planen Sie rechtzeitig und sprechen Sie mit Ihrem Energieberater!
      </p>
    </div>
  </div>
);

export default HighlightedTip;
