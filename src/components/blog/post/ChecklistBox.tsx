
import { CheckCircle } from "lucide-react";
import { ReactNode } from "react";

interface ChecklistBoxProps {
  children: ReactNode;
  title?: string;
}

export default function ChecklistBox({ children, title = "Checkliste" }: ChecklistBoxProps) {
  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 mb-6 px-4 py-3 md:p-5 animate-fade-in">
      <div className="flex items-center mb-2 gap-2">
        <CheckCircle className="text-emerald-500" size={20} />
        <h3 className="font-semibold text-emerald-900">{title}</h3>
      </div>
      <ul className="list-disc pl-6 text-[1rem] text-gray-800 space-y-1">
        {children}
      </ul>
    </div>
  );
}
