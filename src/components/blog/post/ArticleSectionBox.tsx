
import { ReactNode } from "react";
import { Info, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleSectionBoxProps {
  variant?: "info" | "success" | "warning";
  title: string;
  children: ReactNode;
  className?: string;
}

const iconMap = {
  info: <Info className="text-blue-500" size={22} />,
  success: <CheckCircle className="text-emerald-500" size={22} />,
  warning: <AlertCircle className="text-yellow-500" size={22} />,
};

const bgMap = {
  info: "bg-blue-50 border-blue-200",
  success: "bg-emerald-50 border-emerald-200",
  warning: "bg-yellow-50 border-yellow-200",
};

export const ArticleSectionBox = ({
  variant = "info",
  title,
  children,
  className,
}: ArticleSectionBoxProps) => (
  <div
    className={cn(
      "rounded-lg border px-4 py-3 md:p-5 mb-6 animate-fade-in flex gap-3 items-start",
      bgMap[variant],
      className
    )}
  >
    <div className="mt-1 shrink-0">{iconMap[variant]}</div>
    <div>
      <div className={cn("font-semibold mb-1 text-base leading-tight",
        variant === "warning" ? "text-yellow-900" :
        variant === "success" ? "text-emerald-900" : "text-blue-900"
      )}>
        {title}
      </div>
      <div className="text-sm md:text-base text-gray-800">{children}</div>
    </div>
  </div>
);
