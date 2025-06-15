
import { CalendarArrowUp, AlertTriangle } from "lucide-react";

const HighlightedTip = () => (
  <div
    className="relative bg-yellow-100 dark:bg-yellow-800/10 border-l-8 border-yellow-500 rounded-lg px-6 py-5 mb-10 shadow-lg animate-fade-in">
    <span className="absolute -left-4 top-6 flex items-center p-1 rounded-full bg-yellow-500 shadow-md">
      <AlertTriangle className="w-6 h-6 text-white" />
    </span>
    <div className="flex items-start gap-4">
      <CalendarArrowUp className="w-8 h-8 text-yellow-700 flex-shrink-0 mt-1 drop-shadow" />
      <div>
        <span className="inline-block bg-yellow-400 text-yellow-900 font-bold text-xs px-2 py-1 mb-1 rounded badge-shadow uppercase tracking-wide">Wichtig!</span>
        <h3 className="font-bold text-yellow-900 dark:text-yellow-200 mb-1 mt-1 text-lg">Antrag immer <u>VOR</u> Baubeginn einreichen</h3>
        <p className="text-yellow-800 dark:text-yellow-200 text-base">
          Fördermittel gibt es <span className="underline decoration-yellow-950 font-bold">nur</span>, wenn der Antrag <b>vor</b> Auftragsvergabe oder Bau-/Sanierungsbeginn gestellt wird.<br />
          <span className="italic">Lassen Sie sich beraten & stellen Sie alle Anträge rechtzeitig!</span>
        </p>
      </div>
    </div>
  </div>
);

export default HighlightedTip;
