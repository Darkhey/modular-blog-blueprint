
import { AlertCircle } from "lucide-react";
import { ReactNode } from "react";

interface MistakesWarningBoxProps {
  children: ReactNode;
  title?: string;
}

export default function MistakesWarningBox({ children, title = "Häufige Fehler vermeiden" }: MistakesWarningBoxProps) {
  return (
    <div className="rounded-lg border border-yellow-300 bg-yellow-50 mb-8 px-4 py-3 md:p-5 animate-fade-in">
      <div className="flex items-center mb-2 gap-2">
        <AlertCircle className="text-yellow-500" size={20} />
        <h3 className="font-semibold text-yellow-900">{title}</h3>
      </div>
      <ul className="list-disc pl-6 text-[1rem] text-yellow-900 space-y-1">
        {children}
      </ul>
    </div>
  );
}
